import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Typography,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import { IComponente } from "./IComponente";
//funcion main
export const TabActividades = ({
  show,
  componentes,
  actualizoComponentes,
}: {
  show: boolean;
  componentes: number[];
  actualizoComponentes: number;
}) => {
  // business logic-------------------------------------------------------------------------------
  const [actividades, setActividades] = React.useState([1, 2]);

  const [componenteActividad, setComponenteActividad] = useState([
    {
      componentes: componentes.map((x) => actividades),
    },
  ]);

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
        setCValor(prevState);
      }
      console.log(prevState);
    } else if (
      show === true &&
      componentes.length < cValor[0].componentes.length
    ) {
      let prevState = [...cValor];
      let restantes = cValor[0].componentes.length - componentes.length;
      console.log(restantes);
      for (let index = 1; index <= restantes; index++) {
        prevState[0].componentes.pop();
        setCValor(prevState);
      }
      setComponenteSelect("0");
      console.log(prevState);
    }
  }, [show]);

  const [cValor, setCValor] = useState(
    componenteActividad.map((item) => {
      return {
        componentes: item.componentes.map((x) => {
          return {
            actividades: x.map((c) => {
              return {
                resumen: "",
                indicador: "",
                formula: "",
                frecuencia: "",
                medios: "",
                supuestos: "",
              };
            }),
          };
        }),
      };
    })
  );

  const agregarAFnc = (index: number) => {
    if (actividades.length + 1 < 7) {
      let a = [...actividades];
      a.push(actividades.length + 1);
      setActividades(a);
      let xArray = [...componenteActividad];
      xArray[0]["componentes"][index] = [
        ...actividades,
        actividades.length + 1,
      ];
      setComponenteActividad(xArray);
      if (cValor[0].componentes[index].actividades.length < 6) {
        let prevState = [...cValor];
        prevState[0].componentes[index].actividades.push({
          resumen: "",
          indicador: "",
          frecuencia: "",
          formula: "",
          medios: "",
          supuestos: "",
        });
        setCValor(prevState);
      }
    }
  };

  const eliminarAFnc = () => {
    let act = componenteActividad[0]["componentes"][parseInt(componenteSelect)];
    let v = act.length - 1;
    if (v < 2) {
    } else {
      let a = actividades;
      a.pop();
      setActividades(a);
      let xArray = [...componenteActividad];
      xArray[0]["componentes"][parseInt(componenteSelect)] = act.splice(0, v);
      setComponenteActividad(xArray);
      let prevState = [...cValor];
      prevState[0].componentes[parseInt(componenteSelect)].actividades.pop();
      setCValor(prevState);
    }
  };

  const [componenteSelect, setComponenteSelect] = React.useState("0");

  //return main
  return (
    <Box
      visibility={show ? "visible" : "hidden"}
      position="absolute"
      sx={{
        display: "flex",
        width: "75vw",
        height: "77vh",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: 10,
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "10%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Render seleccionar componente */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            "& > *": {
              m: 1,
            },
          }}
        >
          <ButtonGroup variant="text" sx={{}}>
            {componentes.map((x) => {
              return (
                <Button
                  key={x}
                  onClick={() => {
                    setActividades([1, 2]);
                    setComponenteSelect((x - 1).toString());
                    let xArray = [...componenteActividad];

                    xArray[0]["componentes"][x - 1] = xArray[0]["componentes"][
                      x - 1
                    ] || [1, 2];

                    setComponenteActividad(xArray);
                  }}
                >
                  Componente No. {x}
                </Button>
              );
            })}
          </ButtonGroup>
        </Box>

        <Box sx={{ display: "flex", mr: "9vw" }}>
          <IconButton
            onClick={() => {
              agregarAFnc(parseInt(componenteSelect));
            }}
          >
            <AddCircleIcon fontSize="large" />
          </IconButton>

          <IconButton onClick={() => eliminarAFnc()}>
            <DoDisturbOnIcon fontSize="large" />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          width: "95%",
          height: "90%",
          pb: 2,
          pt: 2,
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
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
        {/* Renderizado de Actividades */}
        {componenteActividad[0]["componentes"][parseInt(componenteSelect)].map(
          (x) => {
            return (
              <Accordion
                key={x}
                sx={{
                  width: "95%",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: 4,
                }}
              >
                <AccordionSummary key={x} expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ width: "33%", flexShrink: 0 }}>
                    Actividad {x} - Componente{" "}
                    {(parseInt(componenteSelect) + 1).toString()}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      height: "40vh",
                      flexDirection: "column",
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                        justifyContent: "space-evenly",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <TextField
                        label={"Resumen Narrativo"}
                        value={
                          cValor[0].componentes[parseInt(componenteSelect)]
                            .actividades[x - 1].resumen
                        }
                        onChange={(c) => {
                          let y = [...cValor];
                          y[0].componentes[
                            parseInt(componenteSelect)
                          ].actividades[x - 1].resumen = c.target.value;
                          setCValor(y);
                        }}
                      />
                      <TextField
                        label={"Indicador"}
                        rows={5}
                        value={
                          cValor[0].componentes[parseInt(componenteSelect)]
                            .actividades[x - 1].indicador
                        }
                        onChange={(c) => {
                          let y = [...cValor];
                          y[0].componentes[
                            parseInt(componenteSelect)
                          ].actividades[x - 1].indicador = c.target.value;
                          setCValor(y);
                        }}
                      />
                      <TextField
                        label={"Fórmula"}
                        value={
                          cValor[0].componentes[parseInt(componenteSelect)]
                            .actividades[x - 1].formula
                        }
                        onChange={(c) => {
                          let y = [...cValor];
                          y[0].componentes[
                            parseInt(componenteSelect)
                          ].actividades[x - 1].formula = c.target.value;
                          setCValor(y);
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        width: "100%",
                        height: "50%",
                        justifyContent: "space-evenly",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <TextField
                        label={"Frecuencia"}
                        value={
                          cValor[0].componentes[parseInt(componenteSelect)]
                            .actividades[x - 1].frecuencia
                        }
                        onChange={(c) => {
                          let y = [...cValor];
                          y[0].componentes[
                            parseInt(componenteSelect)
                          ].actividades[x - 1].frecuencia = c.target.value;
                          setCValor(y);
                        }}
                      />
                      <TextField
                        label={"Medios de Verificación"}
                        value={
                          cValor[0].componentes[parseInt(componenteSelect)]
                            .actividades[x - 1].medios
                        }
                        onChange={(c) => {
                          let y = [...cValor];
                          y[0].componentes[
                            parseInt(componenteSelect)
                          ].actividades[x - 1].medios = c.target.value;
                          setCValor(y);
                        }}
                      />
                      <TextField
                        label={"Supuestos"}
                        value={
                          cValor[0].componentes[parseInt(componenteSelect)]
                            .actividades[x - 1].supuestos
                        }
                        onChange={(c) => {
                          let y = [...cValor];
                          y[0].componentes[
                            parseInt(componenteSelect)
                          ].actividades[x - 1].supuestos = c.target.value;
                          setCValor(y);
                          console.log(y);
                        }}
                      />
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>
            );
          }
        )}
      </Box>
    </Box>
  );
};
