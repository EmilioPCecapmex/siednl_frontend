import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Typography,
  TextField,
  Divider,
  List,
  ListItemButton,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import { IComponente } from "./IComponente";
import { FormulaDialog } from "../formulasDialog/FormulaDialog";
import { IMIREdit } from "./IMIR";

export const TabComponente = ({
  show,
  noComponentesFnc,
  // valoresComponenteFnc,
  noComponentes,
  valoresComponente,
  mirEdit,
}: {
  show: boolean;
  noComponentesFnc: Function;
  // valoresComponenteFnc: Function;
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
  const [errorFrecuencia, setErrorFrecuencia] = useState(-2);

  const evalueTxtFrecuencia = () => {
    const cFrecuencia =
      valoresComponente[componentSelect - 1].frecuencia?.toLowerCase();
    if (cFrecuencia !== undefined) {
      if (cFrecuencia === "semestral") {
        setErrorFrecuencia(-1);
      } else if (cFrecuencia === "trimestral") {
        setErrorFrecuencia(-1);
      } else {
        setErrorFrecuencia(componentSelect - 1);
      }
    }
  };

  const handleClickOpen = () => {
    setPrevTextFormula(valoresComponente[componentSelect - 1].formula);
    setOpenFormulaDialog(true);
  };

  const handleClose = () => {
    setOpenFormulaDialog(false);
  };

  const changeFormula = (txt: string) => {
    valoresComponente[componentSelect - 1].formula = txt;
  };

  const evalueTxtIndicador = () => {
    const cIndicador =
      valoresComponente[componentSelect - 1].indicador?.toLowerCase();
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
          resumen: valoresComponente[index].resumen || "",
          indicador: valoresComponente[index].indicador || "",
          frecuencia: valoresComponente[index].frecuencia || "",
          formula: valoresComponente[index].formula || "",
          medios: valoresComponente[index].medios || "",
          supuestos: valoresComponente[index].supuestos || ""
        };
      })
    )
  },[noComponentes])


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
            fontSize: "1.5vw",
            textTransform:"uppercase"
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
                  <Typography sx={{ fontFamily: "MontserratMedium",textTransform:"uppercase" }}>
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
              rows={4}
              sx={{ width: "30%", boxShadow: 2 }}
              label={"Resumen Narrativo".toUpperCase()}
              value={componenteValor[componentSelect - 1]?.resumen}
              onChange={(c) => {
                let prev = [...valoresComponente]
                prev[componentSelect - 1].resumen = c.target.value;
                setComponenteValor(prev);
              }}
            />
            <TextField
              disabled={mirEdit?.componentes[componentSelect - 1].indicador}
              multiline
              rows={4}
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
                let prev = [...valoresComponente]
                prev[componentSelect - 1].indicador = c.target.value;
                setComponenteValor(prev);
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
              rows={4}
              sx={{ width: "30%", boxShadow: 2 }}
              label={"Fórmula".toUpperCase()}
              value={componenteValor[componentSelect - 1]?.formula}
              onClick={() => evalueTxtIndicador()}
              onChange={(c) => {
                let prev = [...valoresComponente]
                prev[componentSelect - 1].formula = c.target.value;
                setComponenteValor(prev);
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
            <TextField
              disabled={mirEdit?.componentes[componentSelect - 1].frecuencia}
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
              rows={4}
              sx={{ width: "30%", boxShadow: 2 }}
              label={"Frecuencia".toUpperCase()}
              value={componenteValor[componentSelect - 1]?.frecuencia}
              onChange={(c) => {
                let prev = [...valoresComponente]
                prev[componentSelect - 1].frecuencia = c.target.value;
                setComponenteValor(prev);
              }}
              onBlur={() => evalueTxtFrecuencia()}
              error={errorFrecuencia === componentSelect - 1 ? true : false}
              helperText={
                errorFrecuencia === componentSelect - 1
                  ? "Frecuencia debe ser Semestral ó Trimestral "
                  : null
              }
            />
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
              rows={4}
              sx={{ width: "30%", boxShadow: 2 }}
              label={"Medios de Verificación".toUpperCase()}
              value={componenteValor[componentSelect - 1]?.medios}
              onChange={(c) => {
                let prev = [...valoresComponente]
                prev[componentSelect - 1].medios = c.target.value;
                setComponenteValor(prev);
              }}
            />
            <TextField
              disabled={mirEdit?.componentes[componentSelect - 1].supuestos}
              variant="filled"
              multiline
              rows={4}
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
                let prev = [...valoresComponente]
                prev[componentSelect - 1].supuestos = c.target.value;
                setComponenteValor(prev);
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
