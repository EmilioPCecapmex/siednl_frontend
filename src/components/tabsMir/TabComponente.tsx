import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Typography,
  TextField,
  Divider,
  List,
  ListItemButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import { IComponente } from "./IComponente";
import { FormulaDialog } from "../formulasDialog/FormulaDialog";
import { IMIREdit } from "./IMIR";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

export const TabComponente = ({
  show,
  noComponentesFnc,
  valoresComponenteFnc,
  noComponentes,
  valoresComponente,
  mirEdit,
}: {
  show: boolean;
  noComponentesFnc: Function;
  valoresComponenteFnc: Function;
  noComponentes: number[];
  valoresComponente: Array<IComponente>;
  mirEdit?: IMIREdit;
}) => {
  const agregarFnc = () => {
    let v = noComponentes.length + 1;
    if (v > 6) {
    } else {
      noComponentesFnc([...noComponentes, v]);

      if (valoresComponente.length < 6) {
        let prevState = [...valoresComponente];
        prevState.push({
          componentes: "C" + (noComponentes.length + 1),
          resumen: "",
          indicador: "",
          frecuencia: "",
          formula: "",
          medios: "",
          supuestos: "",
        });
        setComponenteValor(prevState);
        valoresComponenteFnc(prevState);
      }
    }
  };

  const eliminarFnc = () => {
    let v = noComponentes.length - 1;
    if (v < 2) {
    } else {
      noComponentesFnc(noComponentes.splice(0, v));
      let prevState = [...valoresComponente];
      prevState.pop();
      setComponenteValor(prevState);
      valoresComponenteFnc(prevState);
      if (v < componentSelect) {
        setComponentSelect(v);
      }
    }
  };

  const [componentSelect, setComponentSelect] = useState(1);

  //----------------------------------------------------------------------------------------------

  const [openFormulaDialog, setOpenFormulaDialog] = useState(false);
  const [prevTextFormula, setPrevTextFormula] = useState("");
  const [tipoFormula, setTipoFormula] = useState("");
  const [elementoFormula, setElementoFormula] = useState("");
  const [errorIndicador, setErrorIndicador] = useState(-1);

  const handleClickOpen = () => {
    setPrevTextFormula(componenteValor[componentSelect - 1].formula);
    setOpenFormulaDialog(true);
  };

  const handleClose = () => {
    setOpenFormulaDialog(false);
  };

  const changeFormula = (txt: string) => {
    let prev = [...valoresComponente];
    let prevLocal = [...componenteValor];
    prevLocal[componentSelect - 1].formula = txt;
    prev[componentSelect - 1].formula = txt;
    setComponenteValor(prevLocal);
  };

  const evalueTxtIndicador = () => {
    const cIndicador =
      componenteValor[componentSelect - 1].indicador?.toLowerCase();
    if (cIndicador !== undefined) {
      if (cIndicador.includes("porcentaje")) {
        setTipoFormula("Porcentaje");
        setElementoFormula("Componente " + componentSelect.toString());
        handleClickOpen();
        setErrorIndicador(-1);
      } else if (cIndicador.includes("tasa")) {
        setTipoFormula("Tasa");
        setElementoFormula("Componente " + componentSelect.toString());
        handleClickOpen();
        setErrorIndicador(-1);
      } else if (cIndicador.includes("indice" || "índice")) {
        setTipoFormula("Índice");
        setElementoFormula("Componente " + componentSelect.toString());
        handleClickOpen();
        setErrorIndicador(-1);
      } else if (cIndicador.includes("promedio")) {
        setTipoFormula("Promedio");
        setElementoFormula("Componente " + componentSelect.toString());
        handleClickOpen();
        setErrorIndicador(-1);
      } else {
        setErrorIndicador(componentSelect - 1);
      }
    }
  };

  const [componenteValor, setComponenteValor] = useState<Array<IComponente>>(
    noComponentes.map((x, index) => {
      return {
        componentes: "C" + (index + 1),
        resumen: "",
        indicador: "",
        frecuencia: "",
        formula: "",
        medios: "",
        supuestos: "",
      };
    })
  );

  useEffect(() => {
    setComponenteValor(
      noComponentes.map((x, index) => {
        return {
          componentes: "C" + (index + 1),
          resumen: valoresComponente[index]?.resumen || "",
          indicador: valoresComponente[index]?.indicador || "",
          frecuencia: valoresComponente[index]?.frecuencia || "",
          formula: valoresComponente[index]?.formula || "",
          medios: valoresComponente[index]?.medios || "",
          supuestos: valoresComponente[index]?.supuestos || "",
        };
      })
    );
  }, [noComponentes]);

  return (
    <Box
      visibility={show ? "visible" : "hidden"}
      position="absolute"
      sx={{
        display: "flex",
        width: "75vw",
        height: "77vh",
        boxShadow: 10,
        borderRadius: 5,
        flexDirection: "column",
        backgroundColor: "#fff",
      }}
    >
      <FormulaDialog
        open={openFormulaDialog}
        close={handleClose}
        textoSet={changeFormula}
        prevText={prevTextFormula}
        tipo={tipoFormula}
        elemento={elementoFormula}
      />

      <Box
        sx={{
          width: "100%",
          height: "7vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        {/* Botones Componentes */}
        <Typography
          sx={{
            mr: "1vw",
            fontFamily: "MontserratSemiBold",
            fontSize: "1.2vw",
            textTransform: "uppercase",
          }}
        >
          Componente {componentSelect}
        </Typography>
        <IconButton onClick={() => agregarFnc()}>
          <AddCircleIcon fontSize="large" />
        </IconButton>
        <IconButton onClick={() => eliminarFnc()} sx={{ mr: "1vw" }}>
          <DoDisturbOnIcon fontSize="large" />
        </IconButton>
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
        }}
      >
        <List
          sx={{
            width: "10vw",
            height: "65vh",
            borderRight: "solid",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            borderColor: "#BCBCBC",
            "&::-webkit-scrollbar": {
              width: ".3vw",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,0,.5)",
              outline: "1px solid slategrey",
              borderRadius: 10,
            },
          }}
        >
          {noComponentes.map((item) => {
            return (
              <Box
                key={item}
                sx={{
                  height: "10vh",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Divider />

                <ListItemButton
                  selected={item === componentSelect ? true : false}
                  key={item}
                  onClick={() => setComponentSelect(item)}
                  sx={{
                    "&.Mui-selected ": {
                      backgroundColor: "#c4a57b",
                    },
                    "&.Mui-selected:hover": {
                      backgroundColor: "#cbcbcb",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "MontserratMedium",
                      textTransform: "uppercase",
                    }}
                  >
                    Componente {item}
                  </Typography>
                </ListItemButton>

                <Divider />
              </Box>
            );
          })}
        </List>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "90%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "40%",
              justifyContent: "space-evenly",
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              disabled={mirEdit?.componentes[componentSelect - 1].resumen}
              variant="filled"
              multiline
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratMedium",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratRegular",
                },
              }}
              rows={8}
              sx={{ width: "30%", boxShadow: 2 }}
              label={"Resumen Narrativo".toUpperCase()}
              value={componenteValor[componentSelect - 1]?.resumen}
              onChange={(c) => {
                let prev = [...valoresComponente];
                let prevLocal = [...componenteValor];
                prevLocal[componentSelect - 1].resumen = c.target.value
                  .replaceAll('"', "")
                  .replaceAll("'", "")
                  .replaceAll("\n", "");
                prev[componentSelect - 1].resumen = c.target.value
                  .replaceAll('"', "")
                  .replaceAll("'", "")
                  .replaceAll("\n", "");
                setComponenteValor(prevLocal);
              }}
            />
            <TextField
              disabled={mirEdit?.componentes[componentSelect - 1].indicador}
              multiline
              rows={8}
              variant="filled"
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratMedium",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratRegular",
                },
              }}
              onBlur={() => evalueTxtIndicador()}
              error={errorIndicador === componentSelect - 1 ? true : false}
              helperText={
                errorIndicador === componentSelect - 1
                  ? "Incluir tipo de indicador: Porcentaje, Tasa, Indice ó Promedio. "
                  : null
              }
              sx={{ width: "30%", boxShadow: 2 }}
              label={"Indicador".toUpperCase()}
              value={componenteValor[componentSelect - 1]?.indicador}
              onChange={(c) => {
                let prev = [...valoresComponente];
                let prevLocal = [...componenteValor];
                prevLocal[componentSelect - 1].indicador = c.target.value
                  .replaceAll('"', "")
                  .replaceAll("'", "")
                  .replaceAll("\n", "");
                prev[componentSelect - 1].indicador = c.target.value
                  .replaceAll('"', "")
                  .replaceAll("'", "")
                  .replaceAll("\n", "");
                setComponenteValor(prevLocal);
              }}
            />
            <TextField
              disabled={mirEdit?.componentes[componentSelect - 1].formula}
              variant="filled"
              multiline
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratMedium",
                },
              }}
              InputProps={{
                readOnly: true,
                style: {
                  fontFamily: "MontserratRegular",
                },
              }}
              rows={8}
              sx={{ width: "30%", boxShadow: 2 }}
              label={"Fórmula".toUpperCase()}
              value={componenteValor[componentSelect - 1]?.formula}
              onClick={() => evalueTxtIndicador()}
              onChange={(c) => {
                let prev = [...valoresComponente];
                let prevLocal = [...componenteValor];
                prevLocal[componentSelect - 1].formula = c.target.value
                  .replaceAll('"', "")
                  .replaceAll("'", "")
                  .replaceAll("\n", "");
                prev[componentSelect - 1].formula = c.target.value
                  .replaceAll('"', "")
                  .replaceAll("'", "")
                  .replaceAll("\n", "");
                setComponenteValor(prevLocal);
              }}
            />
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "40%",

              justifyContent: "space-evenly",
              display: "flex",
              alignItems: "center",
            }}
          >
            <FormControl
              sx={{
                width: "30%",
                height: "70%",
                backgroundColor: "#f0f0f0",
                boxShadow: 2,
                fontFamily: "MontserratMedium",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <FormLabel>FRECUENCIA</FormLabel>
                <FormControlLabel
                  value={"SEMESTRAL"}
                  label={"SEMESTRAL"}
                  sx={{
                    fontFamily: "MontserratMedium", 
                  }}
                  control={
                    <Radio
                      checked={
                        componenteValor[componentSelect - 1]?.frecuencia ===
                        "SEMESTRAL"
                      }
                      onChange={(c) => {
                        let prev = [...valoresComponente];
                        let prevLocal = [...componenteValor];
                        prevLocal[componentSelect - 1].frecuencia =
                          c.target.value;
                        prev[componentSelect - 1].frecuencia = c.target.value;
                        setComponenteValor(prevLocal);
                      }}
                    />
                  }
                />
                <FormControlLabel
                  value={"TRIMESTRAL"}
                  label={"TRIMESTRAL"}
                  sx={{
                    fontFamily: "MontserratMedium",
                    fontWeight:'light'
                  }}
                  control={
                    <Radio
                      checked={
                        componenteValor[componentSelect - 1]?.frecuencia ===
                        "TRIMESTRAL"
                      }
                      onChange={(c) => {
                        let prev = [...valoresComponente];
                        let prevLocal = [...componenteValor];
                        prevLocal[componentSelect - 1].frecuencia =
                          c.target.value;
                        prev[componentSelect - 1].frecuencia = c.target.value;
                        setComponenteValor(prevLocal);
                      }}
                    />
                  }
                />
            </FormControl>

            <TextField
              disabled={mirEdit?.componentes[componentSelect - 1].medios}
              multiline
              variant="filled"
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratMedium",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratRegular",
                },
              }}
              rows={8}
              sx={{ width: "30%", boxShadow: 2 }}
              label={"Medios de Verificación".toUpperCase()}
              value={componenteValor[componentSelect - 1]?.medios}
              onChange={(c) => {
                let prev = [...valoresComponente];
                let prevLocal = [...componenteValor];
                prevLocal[componentSelect - 1].medios = c.target.value
                  .replaceAll('"', "")
                  .replaceAll("'", "")
                  .replaceAll("\n", "");
                prev[componentSelect - 1].medios = c.target.value
                  .replaceAll('"', "")
                  .replaceAll("'", "")
                  .replaceAll("\n", "");
                setComponenteValor(prevLocal);
              }}
            />
            <TextField
              disabled={mirEdit?.componentes[componentSelect - 1].supuestos}
              variant="filled"
              multiline
              rows={8}
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratMedium",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratRegular",
                },
              }}
              sx={{ width: "30%", boxShadow: 2 }}
              label={"Supuestos".toUpperCase()}
              value={componenteValor[componentSelect - 1]?.supuestos}
              onChange={(c) => {
                let prev = [...valoresComponente];
                let prevLocal = [...componenteValor];
                prevLocal[componentSelect - 1].supuestos = c.target.value
                  .replaceAll('"', "")
                  .replaceAll("'", "")
                  .replaceAll("\n", "");
                prev[componentSelect - 1].supuestos = c.target.value
                  .replaceAll('"', "")
                  .replaceAll("'", "")
                  .replaceAll("\n", "");
                setComponenteValor(prevLocal);
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
