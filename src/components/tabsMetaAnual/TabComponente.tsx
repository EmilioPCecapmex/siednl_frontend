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
import { FormulaDialog } from "../formulasDialog/FormulaDialog";
import { IComponente } from "../tabsMir/IComponente";

export const TabComponente = ({
  show,
  asignarComponente,
  asignarComponenteValor,
  componentesMir,
  componenteValorMir,
}: {
  show: boolean;
  asignarComponente: Function;
  asignarComponenteValor: Function;
  componentesMir: number[];
  componenteValorMir: Array<IComponente>;
}) => {
  const agregarFnc = () => {
    let v = componentesMir.length + 1;
    if (v > 6) {
    } else {
      asignarComponente([...componentesMir, v]);

      if (componenteValorMir.length < 6) {
        let prevState = [...componenteValorMir];
        prevState.push({
          componentes: "C" + (componentesMir.length + 1),
          resumen: "",
          indicador: "",
          frecuencia: "",
          formula: "",
          medios: "",
          supuestos: "",
        });
        asignarComponenteValor(prevState);
      }
    }
  };

  const eliminarFnc = () => {
    let v = componentesMir.length - 1;
    if (v < 2) {
    } else {
      asignarComponente(componentesMir.splice(0, v));
      let prevState = [...componenteValorMir];
      prevState.pop();
      asignarComponenteValor(prevState);
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
    setPrevTextFormula(componenteValorMir[componentSelect - 1].formula);
    setOpenFormulaDialog(true);
  };

  const handleClose = () => {
    setOpenFormulaDialog(false);
  };

  const changeFormula = (txt: string) => {
    componenteValorMir[componentSelect - 1].formula = txt;
  };

  const evalueTxtIndicador = () => {
    const cIndicador =
      componenteValorMir[componentSelect - 1].indicador?.toLowerCase();
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
          {componentesMir.map((item) => {
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
                  <Typography sx={{ fontFamily: "MontserratMedium" }}>
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
              label={"Resumen Narrativo"}
              value={componenteValorMir[componentSelect - 1].resumen}
              onChange={(c) => {
                componenteValorMir[componentSelect - 1].resumen =
                  c.target.value;
                asignarComponenteValor([...componenteValorMir]);
              }}
            />
            <TextField
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
              error={errorIndicador === componentSelect - 1 ? true : false}
              helperText={
                errorIndicador === componentSelect - 1
                  ? "Incluir tipo de indicador: Porcentaje, Tasa, Indice ó Promedio. "
                  : null
              }
              sx={{ width: "30%", boxShadow: 2 }}
              label={"Indicador"}
              value={componenteValorMir[componentSelect - 1].indicador}
              onBlur={() => evalueTxtIndicador()}
              onChange={(c) => {
                componenteValorMir[componentSelect - 1].indicador =
                  c.target.value;
                asignarComponenteValor([...componenteValorMir]);
              }}
            />
            <TextField
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
              label={"Fórmula"}
              value={componenteValorMir[componentSelect - 1].formula}
              onClick={() => evalueTxtIndicador()}
              onChange={(c) => {
                componenteValorMir[componentSelect - 1].formula =
                  c.target.value;
                asignarComponenteValor([...componenteValorMir]);
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
              label={"Frecuencia"}
              value={componenteValorMir[componentSelect - 1].frecuencia}
              onChange={(c) => {
                componenteValorMir[componentSelect - 1].frecuencia =
                  c.target.value;
                asignarComponenteValor([...componenteValorMir]);
              }}
            />
            <TextField
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
              label={"Medios de Verificación"}
              value={componenteValorMir[componentSelect - 1].medios}
              onChange={(c) => {
                componenteValorMir[componentSelect - 1].medios = c.target.value;
                asignarComponenteValor([...componenteValorMir]);
              }}
            />
            <TextField
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
              label={"Supuestos"}
              value={componenteValorMir[componentSelect - 1].supuestos}
              onChange={(c) => {
                componenteValorMir[componentSelect - 1].supuestos =
                  c.target.value;
                asignarComponenteValor([...componenteValorMir]);
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
