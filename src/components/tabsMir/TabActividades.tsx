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
import { ICValor } from "./ICValor";
//funcion main
export const TabActividades = ({
  show,
  componentes,
  actualizoComponentes,
  asignarCValor,
}: {
  show: boolean;
  componentes: number[];
  actualizoComponentes: number;
  asignarCValor:Function;
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
    } else if (
      show === true &&
      componentes.length < cValor[0].componentes.length
    ) {
      let prevState = [...cValor];
      let restantes = cValor[0].componentes.length - componentes.length;
      for (let index = 1; index <= restantes; index++) {
        prevState[0].componentes.pop();
        setCValor(prevState);
      }
      setComponenteSelect("0");
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

 useEffect(() => {
  asignarCValor(cValor);
 }, [cValor])
 

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
    let act = cValor[0].componentes[parseInt(componenteSelect)].actividades;
    let v = act.length;
    console.log(v)
    if (v > 2) {
      let a = actividades;
      a.pop();
      setActividades(a);
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
          <ButtonGroup variant="text">
            {componentes.map((x) => {
              return (
                <Button
                  key={x}
                  onClick={() => {
                    setComponenteSelect((x - 1).toString());

                    setActividades([1, 2]);
                    let xArray = [...componenteActividad];

                    xArray[0]["componentes"][x] = xArray[0]["componentes"][
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
        {cValor[0].componentes[parseInt(componenteSelect)].actividades.map(
          (value, x) => {
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
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ width: "33%", flexShrink: 0 }}>
                    Actividad {x + 1} - Componente {" "}{(parseInt(componenteSelect) + 1).toString()}
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
                            .actividades[x].resumen
                        }
                        onChange={(c) => {
                          let y = [...cValor];
                          y[0].componentes[
                            parseInt(componenteSelect)
                          ].actividades[x].resumen = c.target.value;
                          setCValor(y);
                        }}
                      />
                      <TextField
                        label={"Indicador"}
                        rows={5}
                        value={
                          cValor[0].componentes[parseInt(componenteSelect)]
                            .actividades[x].indicador
                        }
                        onChange={(c) => {
                          let y = [...cValor];
                          y[0].componentes[
                            parseInt(componenteSelect)
                          ].actividades[x].indicador = c.target.value;
                          setCValor(y);
                        }}
                      />
                      <TextField
                        label={"Fórmula"}
                        value={
                          cValor[0].componentes[parseInt(componenteSelect)]
                            .actividades[x].formula
                        }
                        onChange={(c) => {
                          let y = [...cValor];
                          y[0].componentes[
                            parseInt(componenteSelect)
                          ].actividades[x].formula = c.target.value;
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
                            .actividades[x].frecuencia
                        }
                        onChange={(c) => {
                          let y = [...cValor];
                          y[0].componentes[
                            parseInt(componenteSelect)
                          ].actividades[x].frecuencia = c.target.value;
                          setCValor(y);
                        }}
                      />
                      <TextField
                        label={"Medios de Verificación"}
                        value={
                          cValor[0].componentes[parseInt(componenteSelect)]
                            .actividades[x].medios
                        }
                        onChange={(c) => {
                          let y = [...cValor];
                          y[0].componentes[
                            parseInt(componenteSelect)
                          ].actividades[x].medios = c.target.value;
                          setCValor(y);
                        }}
                      />
                      <TextField
                        label={"Supuestos"}
                        value={
                          cValor[0].componentes[parseInt(componenteSelect)]
                            .actividades[x].supuestos
                        }
                        onChange={(c) => {
                          let y = [...cValor];
                          y[0].componentes[
                            parseInt(componenteSelect)
                          ].actividades[x].supuestos = c.target.value;
                          setCValor(y);
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
      <Button onClick={() => console.log(cValor)}>
        Enviar
      </Button>
    </Box>
  );
};
