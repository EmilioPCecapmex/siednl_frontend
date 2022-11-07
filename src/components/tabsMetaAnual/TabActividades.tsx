import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItemButton,
  TextField,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { IActividadesMir, IComponenteActividad } from "./AddMetaAnual";

//funcion main
export const TabActividadesMA = ({
  show,
  componentes,
  asignarCValor,
  compAct,
  actividadesMir,
}: {
  show: boolean;
  componentes: number[];
  asignarCValor: Function;
  compAct: Array<IComponenteActividad>;
  actividadesMir: Array<IActividadesMir>;
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
              actividad: "A1" + "C" + (prevState[0].componentes.length + 1),
              resumen: "",
              indicador: "",
              frecuencia: "",
              formula: "",
              medios: "",
              supuestos: "",
            },
            {
              actividad: "A2" + "C" + (prevState[0].componentes.length + 1),
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
      setComponenteSelect(0);
    }
  }, [show]);

  const [cValor, setCValor] = useState(
    componenteActividad.map((item) => {
      return {
        componentes: item.componentes.map((x, index) => {
          return {
            actividades: x.map((c, index2) => {
              return {
                actividad: "A" + (index2 + 1) + "C" + (index + 1),
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

  const [aValorMA, setAValorMA] = useState(
    componenteActividad.map((item) => {
      return {
        componentes: item.componentes.map((x, index) => {
          return {
            actividades: x.map((c, index2) => {
              return {
                actividad: "A" + (index2 + 1) + "C" + (index + 1),
                componentes: "",
                metaAnual: "",
                lineaBase: "",
                metasPorFrecuencia: [],
                valorNumerador: "",
                valorDenominador: "",
                orden: "",
                unidadResponsable: "",
                descIndicador: "",
                descNumerador: "",
                descDenominador: "",
              };
            }),
          };
        }),
      };
    })
  );

  useEffect(() => {
    asignarCValor(cValor);
  }, [cValor, componentes]);

  useEffect(() => {
    if (compAct.length > 0) {
      loadActividadesMir();
    }
  }, [compAct]);

  const loadActividadesMir = () => {
    let y = componenteActividad.map((item) => {
      return {
        componentes: compAct.map((x, index) => {
          return {
            actividades: x.actividades.map((c, index2) => {
              return {
                actividad: "",
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
    });

    actividadesMir.map((x, index) => {
      let act = x.actividad?.split("A")[1]?.split("C")[0];
      let comp = x.actividad?.split("C")[1].substring(0, 1);

      y[0].componentes[parseInt(comp) - 1].actividades[
        parseInt(act) - 1
      ].actividad = x.actividad;

      y[0].componentes[parseInt(comp) - 1].actividades[
        parseInt(act) - 1
      ].resumen = x?.resumen;
      y[0].componentes[parseInt(comp) - 1].actividades[
        parseInt(act) - 1
      ].indicador = x?.indicador;
      y[0].componentes[parseInt(comp) - 1].actividades[
        parseInt(act) - 1
      ].formula = x?.formula;
      y[0].componentes[parseInt(comp) - 1].actividades[
        parseInt(act) - 1
      ].frecuencia = x?.frecuencia;
      y[0].componentes[parseInt(comp) - 1].actividades[
        parseInt(act) - 1
      ].medios = x?.medios;
      y[0].componentes[parseInt(comp) - 1].actividades[
        parseInt(act) - 1
      ].supuestos = x?.supuestos;
    });
    setCValor(y);
  };

  const [componenteSelect, setComponenteSelect] = useState(0);
  const [actividadSelect, setActividadSelect] = useState(0);

  const [open, setOpen] = useState(0);

  const handleClickComponente = (index: number) => {
    setOpen(index);
  };

  //return main
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
          height: "7vh",
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
          Componente {componenteSelect + 1} - Actividad {actividadSelect + 1}
        </Typography>
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
          {componentes.map((item, index) => {
            return (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Divider />

                <ListItemButton
                  selected={item == componenteSelect + 1 ? true : false}
                  key={item}
                  onClick={() => {
                    setComponenteSelect(item - 1);
                    handleClickComponente(item);
                    setActividadSelect(0);
                  }}
                  sx={{
                    height: "7vh",
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

                  {open === item ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open === item} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {cValor[0].componentes[componenteSelect].actividades.map(
                      (value, x) => {
                        return (
                          <ListItemButton
                            selected={x == actividadSelect ? true : false}
                            key={x}
                            onClick={() => {
                              setActividadSelect(x);
                            }}
                            sx={{
                              pl: 4,
                              "&.Mui-selected ": {
                                backgroundColor: "#efd8b9",
                              },
                              "&.Mui-selected:hover": {
                                backgroundColor: "#cbcbcb",
                              },
                            }}
                          >
                            Actividad {x + 1}
                          </ListItemButton>
                        );
                      }
                    )}
                  </List>
                </Collapse>

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
              display: "flex",
              width: "100%",
              height: "30%",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <TextField
              rows={3}
              multiline
              sx={{ width: "15%", boxShadow: 2 }}
              variant={"filled"}
              label={"Meta anual 2023"}
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
            />
            <TextField
              rows={3}
              multiline
              sx={{ width: "15%", boxShadow: 2 }}
              variant={"filled"}
              label={"Linea Base 2021"}
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
            />
            <TextField
              rows={3}
              multiline
              sx={{ width: "15%", boxShadow: 2 }}
              variant={"filled"}
              label={"Valor númerador"}
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
            />
            <TextField
              rows={3}
              multiline
              sx={{ width: "15%", boxShadow: 2 }}
              variant={"filled"}
              label={"Valor del denominador"}
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
            />
            <TextField
              rows={3}
              multiline
              sx={{ width: "15%", boxShadow: 2 }}
              variant={"filled"}
              label={"Sentido del indicador"}
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
            />
          </Box>
          <Box
            sx={{
              display: "flex",

              width: "100%",
              height: "20%",
              alignItems: "center",
              justifyContent: "space-evenly",
              flexWrap: "wrap",
            }}
          >
            <TextField
              rows={3}
              multiline
              sx={{ width: "18%", boxShadow: 2 }}
              variant={"filled"}
              label={"Trimestre 1"}
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
            />
            <TextField
              rows={3}
              multiline
              sx={{ width: "18%", boxShadow: 2 }}
              variant={"filled"}
              label={"Trimestre 2"}
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
            />
            <TextField
              rows={3}
              multiline
              sx={{ width: "18%", boxShadow: 2 }}
              variant={"filled"}
              label={"Trimestre 3"}
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
            />
            <TextField
              rows={3}
              multiline
              sx={{ width: "18%", boxShadow: 2 }}
              variant={"filled"}
              label={"Trimestre 4"}
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
            />
          </Box>
          <Box
            sx={{
              display: "flex",

              width: "100%",
              height: "33%",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <TextField
              rows={5}
              multiline
              sx={{ width: "40%", boxShadow: 2 }}
              variant={"filled"}
              label={"Unidad responsable de reportar el indicador"}
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
            />
            <TextField
              rows={5}
              multiline
              sx={{ width: "40%", boxShadow: 2 }}
              variant={"filled"}
              label={"Descripción del indicador"}
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
            />
          </Box>
          <Box
            sx={{
              display: "flex",

              width: "100%",
              height: "33%",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <TextField
              rows={5}
              multiline
              sx={{ width: "40%", boxShadow: 2 }}
              variant={"filled"}
              label={"Descripción del numerador"}
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
            />
            <TextField
              rows={5}
              multiline
              sx={{ width: "40%", boxShadow: 2 }}
              variant={"filled"}
              label={"Descripcion del denominador"}
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
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
