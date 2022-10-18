import { useEffect, useState } from "react";
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
  Button,
} from "@mui/material";
import * as React from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import StarBorder from "@mui/icons-material/StarBorder";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { grid } from "@mui/system";
import { IEncabezado } from "./TabEncabezado";
import { IComponente } from "./IComponente";
import { ICValor } from "./ICValor";
import { IFin, IProposito } from "./TabFinProposito";

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

  const [componenteSelect, setComponenteSelect] = useState(0);
  const [actividadSelect, setActividadSelect] = useState(0);

  const [openComponentes, setOpenComponentes] = useState(false);

  useEffect(() => {
    //  console.log(encabezado[0].eje);
  }, [encabezado]);

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
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
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
          width: "90%",
          border: 0.1,
          borderColor: "#909090",
          height: "80%",
          overflow: "auto",
          borderRadius: 1,
          "&::-webkit-scrollbar": {
            width: ".3vw",
            mt: 1,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,.5)",
            outline: "1px solid slategrey",
            borderRadius: 1,
          },
        }}
      >
        <Box sx={{ p: 5, display: "flex", flexDirection: "column" }}>
          <Typography sx={{ fontFamily: "MontserratBold", borderBottom: 1 }}>
            Datos Generales
          </Typography>

          <Box sx={{ display: "flex" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "50%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Ejercicio Fiscal:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                {encabezado[0]?.ejercicioFiscal === "Selecciona"
                  ? ""
                  : encabezado[0]?.ejercicioFiscal}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "50%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Institución:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                {encabezado[0]?.institucion === "Selecciona"
                  ? ""
                  : encabezado[0]?.institucion}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "50%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Programa:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                {encabezado[0]?.programa === "Selecciona"
                  ? ""
                  : encabezado[0]?.programa}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "50%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Eje:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                {encabezado[0]?.eje === "Selecciona" ? "" : encabezado[0]?.eje}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "50%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Temática:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                {encabezado[0]?.tematica === "Selecciona"
                  ? ""
                  : encabezado[0]?.tematica}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "50%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Objetivo:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                {encabezado[0]?.objetivo === "Selecciona"
                  ? ""
                  : encabezado[0]?.objetivo}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "50%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Estrategia:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                {encabezado[0]?.estrategia === "Selecciona"
                  ? ""
                  : encabezado[0]?.estrategia}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "50%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Lineas de Acción:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                {encabezado[0]?.lineasDeAccion === "Selecciona"
                  ? ""
                  : encabezado[0]?.lineasDeAccion}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "center",
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
                  }}
                >
                  Componente {index}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    mt: 1,
                    alignItems: "center",
                    borderBottom: 1,
                    borderColor: "#cfcfcf",
                  }}
                >
                  <Typography
                    sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                  >
                    Resumen Narrativo:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
                    {componenteValor[index - 1].resumen}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    mt: 1,
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                  >
                    Indicador:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
                    {componenteValor[index - 1].indicador}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    mt: 1,
                    alignItems: "center",
                    borderBottom: 1,
                    borderColor: "#cfcfcf",
                  }}
                >
                  <Typography
                    sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                  >
                    Fórmula:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
                    {componenteValor[index - 1].formula}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    mt: 1,
                    alignItems: "center",
                    borderBottom: 1,
                    borderColor: "#cfcfcf",
                  }}
                >
                  <Typography
                    sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                  >
                    Frecuencia:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
                    {componenteValor[index - 1].frecuencia}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    mt: 1,
                    alignItems: "center",
                    borderBottom: 1,
                    borderColor: "#cfcfcf",
                  }}
                >
                  <Typography
                    sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                  >
                    Medios de Verificación:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
                    {componenteValor[index - 1].medios}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    mt: 1,
                    alignItems: "center",
                    borderBottom: 1,
                    borderColor: "#cfcfcf",
                  }}
                >
                  <Typography
                    sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                  >
                    Supuestos:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
                    {componenteValor[index - 1].supuestos}
                  </Typography>
                </Box>
              </Box>
            );
          })}

          <Typography
            sx={{ fontFamily: "MontserratBold", borderBottom: 1, mt: 5 }}
          >
            Actividades
          </Typography>

          {cValor[0]?.componentes.map((item, indexComponentes) => {
            return item.actividades.map((value, indexActividades) => {
              return (
                <Box>
                  <Typography
                    sx={{
                      fontFamily: "MontserratMedium",
                      borderBottom: 1,
                      mt: 5,
                      textAlign: "center",
                    }}
                  >
                    Componente {indexComponentes + 1} - Actividad{" "}
                    {indexActividades + 1}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      mt: 1,
                      alignItems: "center",
                      borderBottom: 1,
                      borderColor: "#cfcfcf",
                    }}
                  >
                    <Typography
                      sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                    >
                      Resumen Narrativo:
                    </Typography>
                    <Typography
                      sx={{ fontFamily: "MontserratLight", width: "80%" }}
                    >
                      {
                        cValor[0].componentes[indexComponentes].actividades[
                          indexActividades
                        ].resumen
                      }
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      mt: 1,
                      alignItems: "center",
                      borderBottom: 1,
                      borderColor: "#cfcfcf",
                    }}
                  >
                    <Typography
                      sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                    >
                      Indicador:
                    </Typography>
                    <Typography
                      sx={{ fontFamily: "MontserratLight", width: "80%" }}
                    >
                      {
                        cValor[0].componentes[indexComponentes].actividades[
                          indexActividades
                        ].indicador
                      }
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      mt: 1,
                      alignItems: "center",
                      borderBottom: 1,
                      borderColor: "#cfcfcf",
                    }}
                  >
                    <Typography
                      sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                    >
                      Fórmula:
                    </Typography>
                    <Typography
                      sx={{ fontFamily: "MontserratLight", width: "80%" }}
                    >
                      {
                        cValor[0].componentes[indexComponentes].actividades[
                          indexActividades
                        ].formula
                      }
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      mt: 1,
                      alignItems: "center",
                      borderBottom: 1,
                      borderColor: "#cfcfcf",
                    }}
                  >
                    <Typography
                      sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                    >
                      Frecuencia:
                    </Typography>
                    <Typography
                      sx={{ fontFamily: "MontserratLight", width: "80%" }}
                    >
                      {
                        cValor[0].componentes[indexComponentes].actividades[
                          indexActividades
                        ].frecuencia
                      }
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      mt: 1,
                      alignItems: "center",
                      borderBottom: 1,
                      borderColor: "#cfcfcf",
                    }}
                  >
                    <Typography
                      sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                    >
                      Medios de Verificación:
                    </Typography>
                    <Typography
                      sx={{ fontFamily: "MontserratLight", width: "80%" }}
                    >
                      {
                        cValor[0].componentes[indexComponentes].actividades[
                          indexActividades
                        ].medios
                      }
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      mt: 1,
                      alignItems: "center",
                      borderBottom: 1,
                      borderColor: "#cfcfcf",
                    }}
                  >
                    <Typography
                      sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                    >
                      Supuestos:
                    </Typography>
                    <Typography
                      sx={{ fontFamily: "MontserratLight", width: "80%" }}
                    >
                      {
                        cValor[0].componentes[indexComponentes].actividades[
                          indexActividades
                        ].supuestos
                      }
                    </Typography>
                  </Box>
                </Box>
              );
            });
          })}
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
          mt: 2,
        }}
      >
        <Button color="error" variant="outlined">
          Cancelar
        </Button>
        <Button color="warning" variant="outlined">
          Borrador
        </Button>
        <Button color="success" variant="outlined">
          Enviar
        </Button>
      </Box>
    </Box>
  );
}

export default TabResumen;
