import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  Typography,
  TextField,
  Divider,
  List,
  ListItemButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import { IComponente } from "./IComponente";

export const TabComponente = ({ show, asignarComponente, asignarComponenteValor }: { show: boolean, asignarComponente: Function, asignarComponenteValor:Function}) => {
  // business logic-------------------------------------------------------------------------------
  const [componentes, setComponentes] = useState([1, 2]);

  const [componenteValor, setComponenteValor] = useState<Array<IComponente>>(
    componentes.map((x) => {
      return {
        resumen: "",
        indicador: "",
        frecuencia: "",
        formula: "",
        medios: "",
        supuestos: "",
      };
    })
  );

  const agregarFnc = () => {
    let v = componentes.length + 1;
    if (v > 6) {
    } else {
      setComponentes([...componentes, v]);

      if (componenteValor.length < 6) {
        let prevState = [...componenteValor]
        prevState.push(
          {
            resumen: "",
            indicador: "",
            frecuencia: "",
            formula: "",
            medios: "",
            supuestos: "",
          }
        )
        setComponenteValor(prevState);
      }
    }
    asignarComponente(componentes);
  };

  const eliminarFnc = () => {
    let v = componentes.length - 1;
    if (v < 2) {
    } else {
      setComponentes(componentes.splice(0, v));
      let prevState = [...componenteValor];
      prevState.pop()
      setComponenteValor(prevState)
      if (v < componentSelect) {
        setComponentSelect(v)

      }
    }
  };

  useEffect(() => {
    asignarComponente(componentes);
    asignarComponenteValor(componenteValor);
  }, [componentes,componenteValor])


  const [componentSelect, setComponentSelect] = useState(1);

  //----------------------------------------------------------------------------------------------
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
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {/* Botones Componentes */}
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
          {componentes.map((item) => {
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
              sx={{ width: "30%" }}
              label={"Resumen Narrativo"}
              value={componenteValor[componentSelect - 1].resumen}
              onChange={(c) => {
                componenteValor[componentSelect - 1].resumen = c.target.value;
                setComponenteValor([...componenteValor]);
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
              sx={{ width: "30%" }}
              label={"Indicador"}
              value={componenteValor[componentSelect - 1].indicador}
              onChange={(c) => {
                componenteValor[componentSelect - 1].indicador = c.target.value;
                setComponenteValor([...componenteValor]);
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
                style: {
                  fontFamily: "MontserratRegular",
                },
              }}
              rows={4}
              sx={{ width: "30%" }}
              label={"Fórmula"}
              value={componenteValor[componentSelect - 1].formula}
              onChange={(c) => {
                componenteValor[componentSelect - 1].formula = c.target.value;
                setComponenteValor([...componenteValor]);
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
              sx={{ width: "30%" }}
              label={"Frecuencia"}
              value={componenteValor[componentSelect - 1].frecuencia}
              onChange={(c) => {
                componenteValor[componentSelect - 1].frecuencia =
                  c.target.value;
                setComponenteValor([...componenteValor]);
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
              sx={{ width: "30%" }}
              label={"Medios de Verificación"}
              value={componenteValor[componentSelect - 1].medios}
              onChange={(c) => {
                componenteValor[componentSelect - 1].medios = c.target.value;
                setComponenteValor([...componenteValor]);
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
              sx={{ width: "30%" }}
              label={"Supuestos"}
              value={componenteValor[componentSelect - 1].supuestos}
              onChange={(c) => {
                componenteValor[componentSelect - 1].supuestos = c.target.value;
                setComponenteValor([...componenteValor]);
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
