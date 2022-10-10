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
}: {
  show: boolean;
  componentes: number[];
}) => {

  // business logic-------------------------------------------------------------------------------
  const [actividades, setActividades] = React.useState([1, 2]);

  const [componenteActividad, setComponenteActividad] = useState([
    {
      componentes: componentes.map((x) => actividades),
    },
  ]);

  const [cValor, setCValor] = useState(
    componenteActividad.map((item) => {
      return {
        components: item.componentes.map((x) => {
          return {
            c: x.map((c) => {
              return {
                a: {
                  resumen: "",
                  indicador: "",
                  formula: "",
                  frecuencia: "",
                  medios: "",
                  supuestos: "",
                },
              };
            }),
          };
        }),
      };
    })
  );

  useEffect(() => {
    setComponenteActividad([
        {
          componentes: componentes.map((x) => actividades),
        },
      ])
    setCValor(
      componenteActividad.map((item) => {
        return {
          components: item.componentes.map((x) => {
            return {
              c: x.map((c) => {
                return {
                  a: {
                    resumen: "",
                    indicador: "",
                    formula: "",
                    frecuencia: "",
                    medios: "",
                    supuestos: "",
                  },
                };
              }),
            };
          }),
        };
      })
    );
    console.log(cValor);
  }, [actividades]);

  const [ActividadValor, setActividadValor] = React.useState<
    Array<IComponente>
  >([]);

  const agregarAFnc = (index: number) => {
    let v = actividades.length + 1;
    if (v > 6) {
    } else {
      setActividades([...actividades, v]);

      let xArray = [...componenteActividad];

      xArray[0]["componentes"][parseInt(componenteSelect)] = [
        ...actividades,
        v,
      ];

      setComponenteActividad(xArray);
    }
  };

  const eliminarAFnc = () => {
    let act = componenteActividad[0]["componentes"][parseInt(componenteSelect)];
    let v = act.length - 1;
    if (v < 2) {
    } else {
      let xArray = [...componenteActividad];

      xArray[0]["componentes"][parseInt(componenteSelect)] = act.splice(0, v);

      setComponenteActividad(xArray);
    }
  };

  useEffect(() => {
    let array = componenteActividad.map((x) => {
      return {
        resumen: "",
        indicador: "",
        frecuencia: "",
        formula: "",
        medios: "",
        supuestos: "",
      };
    });
    setActividadValor(array);
  }, []);

  const cargarArray = () => {
    let arrayComponente = [
      {
        componentes: ActividadValor,
      },
    ];
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
                sx={{
                  width: "95%",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: 4,
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
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
                        onChange={(c) => {
                          //     cValor[0].comp[x - 1].resumen = c.target.value;
                          //     console.log(cValor)
                          //   ActividadValor[x - 1].resumen = c.target.value;
                          //   cargarArray();
                        }}
                      />
                      <TextField
                        label={"Indicador"}
                        rows={5}
                        onChange={(c) => {
                          ActividadValor[x - 1].indicador = c.target.value;
                          cargarArray();
                        }}
                      />
                      <TextField
                        label={"Fórmula"}
                        onChange={(c) => {
                          ActividadValor[x - 1].formula = c.target.value;
                          cargarArray();
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
                        onChange={(c) => {
                          ActividadValor[x - 1].frecuencia = c.target.value;
                          cargarArray();
                        }}
                      />
                      <TextField
                        label={"Medios de Verificación"}
                        onChange={(c) => {
                          ActividadValor[x - 1].medios = c.target.value;
                          cargarArray();
                        }}
                      />
                      <TextField
                        label={"Supuestos"}
                        onChange={(c) => {
                          ActividadValor[x - 1].supuestos = c.target.value;
                          cargarArray();
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
