import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  ButtonGroup,
  Button,
  Typography,
  TextField,
  Divider,
  List,
  ListItemButton,
} from "@mui/material";
import * as React from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import StarBorder from "@mui/icons-material/StarBorder";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { grid } from "@mui/system";
import { IEncabezado } from "./TabEncabezado";
import { IFin, IProposito } from "./TabFinProposito";
import { IComponente } from "./IComponente";
import { ICValor } from "./ICValor";

export function TabResumen({
  show,
  encabezado,
  fin,
  proposito,
  componentes,
  componenteValor,
  cValor,
  asignarCValor,
}: {
  show: boolean;
  encabezado: Array<IEncabezado>;
  fin: Array<IFin>;
  proposito: Array<IProposito>;
  componentes: number[];
  componenteValor: Array<IComponente>;
  cValor: Array<ICValor>;
  asignarCValor: Function;
}) {
  const [tabSelect, setTabSelect] = useState(1);

  //
  //setComponentes(retornarComponentes());

  const [componenteSelect, setComponenteSelect] = useState(0);
  const [actividadSelect, setActividadSelect] = useState(0);

  const [openComponentes, setOpenComponentes] = useState(false);

  useEffect(() => {
    if (show === true && componentes.length > cValor[0].componentes.length) {
      let restantes = componentes.length - cValor[0].componentes.length;
      let prevState = [...cValor];
      for (let index = 1; index <= restantes; index++) {
        prevState[0].componentes.push({
          actividades: [
            {
              resumen: "",
              indicador: "",
              frecuencia: "",
              formula: "",
              medios: "",
              supuestos: "",
            },
            {
              resumen: "",
              indicador: "",
              frecuencia: "",
              formula: "",
              medios: "",
              supuestos: "",
            },
          ],
        });
        asignarCValor(prevState);
      }
    } else if (
      show === true &&
      componentes.length < cValor[0].componentes.length
    ) {
      let prevState = [...cValor];
      let restantes = cValor[0].componentes.length - componentes.length;
      for (let index = 1; index <= restantes; index++) {
        prevState[0].componentes.pop();
        asignarCValor(prevState);
      }
      setComponenteSelect(0);
    }
  }, [show]);

  return (
    <Box
      visibility={show ? "visible" : "hidden"}
      position="absolute"
      sx={{
        display: "flex",
        width: "75vw",
        height: "85vh",
        boxShadow: 10,
        borderRadius: 5,
        flexDirection: "row",
        backgroundColor: "#fff",
      }}
    >
      <Box>
        <List
          sx={{
            width: "10vw",
            height: "85vh",
            borderRight: "1px solid",
            display: "flex",
            flexDirection: "column",
            borderColor: "#BCBCBC",
            padding: "0",
            // overflow:'hidden',
            // overflowY:'scroll',
            // "&::-webkit-scrollbar": {
            //   width: ".3vw",
            // },
            // "&::-webkit-scrollbar-thumb": {
            //   backgroundColor: "rgba(0,0,0,.5)",
            //   outline: "1px solid slategrey",
            //   borderRadius: 10,
            // },
          }}
        >
          <ListItemButton
            key={100}
            selected={100 === tabSelect ? true : false}
            onClick={() => setTabSelect(100)}
            sx={{
              "&.Mui-selected ": {
                backgroundColor: "#c4a57b",
              },
              "&.Mui-selected:hover": {
                backgroundColor: "#cbcbcb",
              },
              borderRadius: "20px 0 0 0",
            }}
          >
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              Encabezado
            </Typography>
          </ListItemButton>

          <Divider />

          <ListItemButton
            key={101}
            selected={101 === tabSelect ? true : false}
            onClick={() => setTabSelect(101)}
            sx={{
              "&.Mui-selected ": {
                backgroundColor: "#c4a57b",
              },
              "&.Mui-selected:hover": {
                backgroundColor: "#cbcbcb",
              },
            }}
          >
            <Typography sx={{ fontFamily: "MontserratMedium" }}>Fin</Typography>
          </ListItemButton>

          <Divider />

          <ListItemButton
            key={102}
            selected={102 === tabSelect ? true : false}
            onClick={() => setTabSelect(102)}
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
              Proposito
            </Typography>
          </ListItemButton>

          <Divider />

          <ListItemButton
            key={103}
            selected={103 === tabSelect ? true : false}
            onClick={() => {
              setTabSelect(103);
              setOpenComponentes(!openComponentes);
            }}
            sx={{
              fontFamily: "MontserratMedium",
              "&.Mui-selected ": {
                backgroundColor: "#c4a57b",
              },
              "&.Mui-selected:hover": {
                backgroundColor: "#cbcbcb",
              },
              borderRadius: openComponentes ? 0 : "0 0 0 20px",
            }}
          >
            <ListItemText primary="Componentes" />
            {openComponentes ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openComponentes} timeout="auto" unmountOnExit>
            <List disablePadding>
              {componentes?.map((item) => {
                return (
                  <ListItemButton
                    selected={item === tabSelect ? true : false}
                    key={item}
                    onClick={() => {
                      setComponenteSelect(item - 1);
                    }}
                    sx={{
                      "&.Mui-selected ": {
                        backgroundColor: "#c4a57b",
                      },
                      "&.Mui-selected:hover": {
                        backgroundColor: "#cbcbcb",
                      },
                    }}
                  >
                    <ListItemText primary={`Componente ${item}`} />
                  </ListItemButton>
                );
              })}
            </List>
          </Collapse>
        </List>
      </Box>

      <Box
        sx={{
          width: "65vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {tabSelect === 100 ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateRows: "repeat(5, 1fr)",
              gridTemplateColumns: "repeat(2, 1fr)",
              width: "60vw",
              height: "60vh",
            }}
          >
            <TextField
              variant="standard"
              multiline
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratMedium",
                  fontSize: "0.8vw",
                  color:
                    encabezado[0]?.ejercicioFiscal === "Selecciona"
                      ? "red"
                      : "rgba(0, 0, 0, 0.6)",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratRegular",
                  marginTop: "2.4vh",
                },
              }}
              rows={1.5}
              label={"Ejercicio Fiscal"}
              value={
                encabezado[0]?.ejercicioFiscal === "Selecciona"
                  ? ""
                  : encabezado[0]?.ejercicioFiscal
              }
              sx={{ width: "25vw" }}
            />
            <TextField
              variant="standard"
              multiline
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratMedium",
                  fontSize: "0.8vw",
                  color:
                    encabezado[0]?.institucion === "Selecciona"
                      ? "red"
                      : "rgba(0, 0, 0, 0.6)",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratRegular",
                },
              }}
              rows={2}
              value={
                encabezado[0]?.institucion === "Selecciona"
                  ? ""
                  : encabezado[0]?.institucion
              }
              sx={{ width: "25vw" }}
              label={"Institución"}
            />
            <TextField
              variant="standard"
              multiline
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratMedium",
                  color: "black",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratRegular",
                },
              }}
              rows={3}
              value={
                encabezado[0]?.programa === "Selecciona"
                  ? ""
                  : encabezado[0]?.programa
              }
              sx={{ width: "25vw" }}
              label={"Programa"}
            />
            <TextField
              variant="standard"
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
              rows={3}
              value={
                encabezado[0]?.eje === "Selecciona" ? "" : encabezado[0]?.eje
              }
              sx={{ width: "25vw" }}
              label={"Eje"}
            />
            <TextField
              variant="standard"
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
              rows={3}
              value={
                encabezado[0]?.tematica === "Selecciona"
                  ? ""
                  : encabezado[0]?.tematica
              }
              sx={{ width: "25vw" }}
              label={"Temática"}
            />
            <TextField
              variant="standard"
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
              rows={3}
              value={
                encabezado[0]?.objetivo === "Selecciona"
                  ? ""
                  : encabezado[0]?.objetivo
              }
              sx={{ width: "25vw" }}
              label={"Objetivo"}
            />
            <TextField
              variant="standard"
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
              rows={3}
              value={
                encabezado[0]?.estrategia === "Selecciona"
                  ? ""
                  : encabezado[0]?.estrategia
              }
              sx={{ width: "25vw" }}
              label={"Estrategia"}
            />
            <TextField
              variant="standard"
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
              rows={3}
              value={
                encabezado[0]?.lineasDeAccion === "Selecciona"
                  ? ""
                  : encabezado[0]?.lineasDeAccion
              }
              sx={{ width: "25vw" }}
              label={"Lineas de acción"}
            />
            <TextField
              variant="standard"
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
              rows={3}
              value={
                encabezado[0]?.beneficiario === "Selecciona"
                  ? ""
                  : encabezado[0]?.beneficiario
              }
              sx={{ width: "25vw" }}
              label={"Beneficiario"}
            />
          </Box>
        ) : null}
        {tabSelect === 101 ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateRows: "1fr 2fr 2fr 2fr",
              gridTemplateColumns: "repeat(2, 1fr)",
              width: "60vw",
              height: "60vh",
            }}
          >
            <Typography
              sx={{
                gridColumn: "1/3",
                fontFamily: "MontserratMedium",
                fontSize: "1.5vw",
              }}
            >
              Fin
            </Typography>
            <TextField
              variant="standard"
              multiline
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratMedium",
                  fontSize: "0.8vw",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratRegular",
                  marginTop: "2.4vh",
                },
              }}
              rows={3}
              label={"Resumen Narrativo"}
              value={fin[0]?.resumen}
              sx={{ width: "25vw" }}
            />
            <TextField
              variant="standard"
              multiline
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratMedium",
                  fontSize: "0.8vw",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratRegular",
                  marginTop: "2.4vh",
                },
              }}
              rows={3}
              label={"Indicador"}
              value={fin[0]?.indicador}
              sx={{ width: "25vw" }}
            />
            <TextField
              variant="standard"
              multiline
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratMedium",
                  fontSize: "0.8vw",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratRegular",
                  marginTop: "2.4vh",
                },
              }}
              rows={3}
              label={"Fórmula"}
              value={fin[0]?.formula}
              sx={{ width: "25vw" }}
            />
            <TextField
              variant="standard"
              multiline
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratMedium",
                  fontSize: "0.8vw",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratRegular",
                  marginTop: "2.4vh",
                },
              }}
              rows={3}
              label={"Frecuencia"}
              value={fin[0]?.frecuencia}
              sx={{ width: "25vw" }}
            />
            <TextField
              variant="standard"
              multiline
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratMedium",
                  fontSize: "0.8vw",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratRegular",
                  marginTop: "2.4vh",
                },
              }}
              rows={3}
              label={"Medios de verificación"}
              value={fin[0]?.medios}
              sx={{ width: "25vw" }}
            />
            <TextField
              variant="standard"
              multiline
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratMedium",
                  fontSize: "0.8vw",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratRegular",
                  marginTop: "2.4vh",
                },
              }}
              rows={3}
              label={"Supuestos"}
              value={fin[0]?.supuestos}
              sx={{ width: "25vw" }}
            />
          </Box>
        ) : null}
        {tabSelect === 102 ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateRows: "1fr 2fr 2fr 2fr",
              gridTemplateColumns: "repeat(2, 1fr)",
              width: "60vw",
              height: "60vh",
            }}
          >
            <Typography
              sx={{
                gridColumn: "1/3",
                fontFamily: "MontserratMedium",
                fontSize: "1.5vw",
              }}
            >
              Propósito
            </Typography>

            <TextField
              variant="standard"
              multiline
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratMedium",
                  fontSize: "0.8vw",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratRegular",
                  marginTop: "2.4vh",
                },
              }}
              rows={3}
              label={"Resumen Narrativo"}
              value={proposito[0]?.resumen}
              sx={{ width: "25vw" }}
            />
            <TextField
              variant="standard"
              multiline
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratMedium",
                  fontSize: "0.8vw",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratRegular",
                  marginTop: "2.4vh",
                },
              }}
              rows={3}
              label={"Indicador"}
              value={proposito[0]?.indicador}
              sx={{ width: "25vw" }}
            />
            <TextField
              variant="standard"
              multiline
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratMedium",
                  fontSize: "0.8vw",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratRegular",
                  marginTop: "2.4vh",
                },
              }}
              rows={3}
              label={"Fórmula"}
              value={proposito[0]?.formula}
              sx={{ width: "25vw" }}
            />
            <TextField
              variant="standard"
              multiline
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratMedium",
                  fontSize: "0.8vw",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratRegular",
                  marginTop: "2.4vh",
                },
              }}
              rows={3}
              label={"Frecuencia"}
              value={proposito[0]?.frecuencia}
              sx={{ width: "25vw" }}
            />
            <TextField
              variant="standard"
              multiline
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratMedium",
                  fontSize: "0.8vw",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratRegular",
                  marginTop: "2.4vh",
                },
              }}
              rows={3}
              label={"Medios de verificación"}
              value={proposito[0]?.medios}
              sx={{ width: "25vw" }}
            />
            <TextField
              variant="standard"
              multiline
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratMedium",
                  fontSize: "0.8vw",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratRegular",
                  marginTop: "2.4vh",
                },
              }}
              rows={3}
              label={"Supuestos"}
              value={proposito[0]?.supuestos}
              sx={{ width: "25vw" }}
            />
          </Box>
        ) : null}
      </Box>

      <Box
        sx={{
          width: "65vw",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* mi box*/}
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "center",
              // backgroundColor: ""
            }}
          >
            <Accordion
              sx={{
                width: "100%",
                height: "100%",
                justifyContent: "space-evenly",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                //     backgroundColor:"pink"
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Componente {componenteSelect + 1}</Typography>
              </AccordionSummary>

              <AccordionDetails>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",

                      justifyContent: "space-evenly",
                      display: "flex",
                      alignItems: "center",
                      //   backgroundColor: "brown"
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
                      value={componenteValor[componenteSelect]?.resumen}
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
                      value={componenteValor[componenteSelect]?.indicador}
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
                      value={componenteValor[componenteSelect]?.formula}
                    />
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      height: "40%",

                      justifyContent: "space-evenly",
                      display: "flex",
                      alignItems: "center",
                      // backgroundColor: "pink"
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
                      value={componenteValor[componenteSelect]?.frecuencia}
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
                      value={componenteValor[componenteSelect]?.medios}
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
                      value={componenteValor[componenteSelect]?.supuestos}
                    />
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
          {/* Actividades */}

          <Box>
            <Box>
              <ButtonGroup variant="text" aria-label="text button group">
                {cValor[0]?.componentes[componenteSelect].actividades?.map(
                  (value, x) => {
                    return (
                      <Button
                        onClick={() => {
                          setActividadSelect(x);
                        }}
                      >
                        Actividad No. {x + 1}
                      </Button>
                    );
                  }
                )}
              </ButtonGroup>
            </Box>
            {/* Textfield Actividades */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                alignItems: "flex-start",
                justifyContent: "center",
                // backgroundColor: ""
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "0%",
                    justifyContent: "space-evenly",
                    display: "flex",
                    alignItems: "center",
                    //   backgroundColor: "brown"
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
                    value={
                      cValor[0]?.componentes[componenteSelect].actividades[
                        actividadSelect
                      ]?.resumen
                    }
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
                    value={
                      cValor[0]?.componentes[componenteSelect].actividades[
                        actividadSelect
                      ]?.indicador
                    }
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
                    value={
                      cValor[0]?.componentes[componenteSelect].actividades[
                        actividadSelect
                      ]?.formula
                    }
                  />
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    height: "40%",

                    justifyContent: "space-evenly",
                    display: "flex",
                    alignItems: "center",
                    // backgroundColor: "pink"
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
                    value={
                      cValor[0]?.componentes[componenteSelect].actividades[
                        actividadSelect
                      ]?.frecuencia
                    }
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
                    value={
                      cValor[0]?.componentes[componenteSelect].actividades[
                        actividadSelect
                      ]?.medios
                    }
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
                    value={
                      cValor[0]?.componentes[componenteSelect].actividades[
                        actividadSelect
                      ]?.supuestos
                    }
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default TabResumen;
