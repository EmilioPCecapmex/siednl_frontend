import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItemButton,
  TextField,
  FormControl,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { IComponenteActividad } from "./AddMetaAnual";
import { ICValor } from "../tabsMir/ICValor";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";

//funcion main
export const TabActividadesMA = ({
  show,
  componentes,
  asignarCValor,
  asignarCValorMIR,
  compAct,
  actividadesMir,
  showMirFnc,
  showFnc,
  MA,
}: {
  show: boolean;
  componentes: number[];
  asignarCValor: Function;
  asignarCValorMIR: Function;
  compAct: Array<IComponenteActividad>;
  actividadesMir: Array<ICValor>;
  showMirFnc: Function;
  showFnc: Function;
  MA: string;
}) => {
  // business logic-------------------------------------------------------------------------------
  const [actividades, setActividades] = React.useState([1, 2]);

  const [componenteActividad, setComponenteActividad] = useState([
    {
      componentes: componentes.map((x) => actividades),
    },
  ]);

  const [componenteSelect, setComponenteSelect] = useState(0);
  const [actividadSelect, setActividadSelect] = useState(0);

  let jsonMA = MA === "" ? "" : JSON.parse(MA);

  const [aValorMA, setAValorMA] = useState(
    componenteActividad.map((item) => {
      return {
        componentes: item.componentes.map((x, index) => {
          return {
            actividades: x.map((c, index2) => {
              return {
                actividad: "A" + (index2 + 1) + "C" + (index + 1),
                metaAnual: "",
                lineaBase: "",
                metasPorFrecuencia: [
                  {
                    semestre1: "",
                    semestre2: "",
                    trimestre1: "",
                    trimestre2: "",
                    trimestre3: "",
                    trimestre4: "",
                  },
                ],
                valorNumerador: "",
                valorDenominador: "",
                sentidoDelIndicador: "",
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
    if (compAct.length > 0) {
      loadActividadesMA();
    }
  }, [compAct]);

  useEffect(() => {
    asignarCValor(aValorMA);
  }, [aValorMA]);

  const loadActividadesMA = () => {
    let y = componenteActividad.map((item) => {
      return {
        componentes: compAct.map((x, index) => {
          return {
            actividades: x.actividades.map((c, index2) => {
              return {
                actividad: "A" + (index2 + 1) + "C" + (index + 1),
                metaAnual:
                  MA === "" ? "" : jsonMA?.actividades[index2]?.metaAnual || "",
                lineaBase:
                  MA === "" ? "" : jsonMA?.actividades[index2]?.lineaBase || "",
                metasPorFrecuencia: [
                  {
                    semestre1:
                      MA === ""
                        ? ""
                        : jsonMA?.actividades[index2]?.metasPorFrecuencia[0]
                            ?.semestre1 || "",
                    semestre2:
                      MA === ""
                        ? ""
                        : jsonMA?.actividades[index2]?.metasPorFrecuencia[0]
                            ?.semestre2 || "",
                    trimestre1:
                      MA === ""
                        ? ""
                        : jsonMA?.actividades[index2]?.metasPorFrecuencia[0]
                            ?.trimestre1 || "",
                    trimestre2:
                      MA === ""
                        ? ""
                        : jsonMA?.actividades[index2]?.metasPorFrecuencia[0]
                            ?.trimestre2 || "",
                    trimestre3:
                      MA === ""
                        ? ""
                        : jsonMA?.actividades[index2]?.metasPorFrecuencia[0]
                            ?.trimestre3 || "",
                    trimestre4:
                      MA === ""
                        ? ""
                        : jsonMA?.actividades[index2]?.metasPorFrecuencia[0]
                            ?.trimestre4 || "",
                  },
                ],
                valorNumerador:
                  MA === ""
                    ? ""
                    : jsonMA?.actividades[index2]?.valorNumerador || "",
                valorDenominador:
                  MA === ""
                    ? ""
                    : jsonMA?.actividades[index2]?.valorDenominador || "",
                sentidoDelIndicador:
                  MA === ""
                    ? ""
                    : jsonMA?.actividades[index2]?.sentidoDelIndicador || "",
                unidadResponsable:
                  MA === ""
                    ? ""
                    : jsonMA?.actividades[index2]?.unidadResponsable || "",
                descIndicador:
                  MA === ""
                    ? ""
                    : jsonMA?.actividades[index2]?.descIndicador || "",
                descNumerador:
                  MA === ""
                    ? ""
                    : jsonMA?.actividades[index2]?.descNumerador || "",
                descDenominador:
                  MA === ""
                    ? ""
                    : jsonMA?.actividades[index2]?.descDenominador || "",
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
    });
    setAValorMA(y);
  };

  const [cValorMIR, setCValorMIR] = useState(
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
    setCValorMIR(y);
  };

  useEffect(() => {
    asignarCValorMIR(cValorMIR);
  }, [cValorMIR, componentes]);

  const [open, setOpen] = useState(1);

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
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <InfoOutlinedIcon
          onClick={() => {
            showMirFnc(true);
            showFnc("Actividades");
          }}
          fontSize="large"
          sx={{ cursor: "pointer" }}
        ></InfoOutlinedIcon>
        <Typography
          sx={{
            mr: "1vw",
            fontFamily: "MontserratSemiBold",
            fontSize: "1.5vw",
          }}
        >
          COMPONENTE #{componenteSelect + 1} - ACTIVIDAD # {actividadSelect + 1}
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
                  selected={item === componenteSelect + 1 ? true : false}
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
                  <Typography sx={{ fontFamily: "MontserratMedium", fontSize:'0.7vw' }}>
                    COMPONENTE {item}
                  </Typography>

                  {open === item ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open === item} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {aValorMA[0].componentes[componenteSelect].actividades.map(
                      (value, x) => {
                        return (
                          <ListItemButton
                            selected={x === actividadSelect ? true : false}
                            key={x}
                            onClick={() => {
                              setActividadSelect(x);
                            }}
                            sx={{
                              height: "3vh",
                              pl: 4,
                              "&.Mui-selected ": {
                                backgroundColor: "#efd8b9",
                              },
                              "&.Mui-selected:hover": {
                                backgroundColor: "#cbcbcb",
                              },
                            }}
                          >
                            ACTIVIDAD {x + 1}
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
              rows={1}
              multiline
              sx={{ width: "18%", boxShadow: 2 }}
              variant={"filled"}
              label={
                <Typography
                  sx={{ fontSize: '0.7vw', fontFamily: "MontserratMedium" }}
                >
                  META ANUAL 2023
                </Typography>
              }
              value={
                aValorMA[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ].metaAnual
              }
              onChange={(c) => {
                let y = [...aValorMA];
                y[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ].metaAnual = c.target.value;
                setAValorMA(y);
              }}
              error={
                (parseFloat(
                  aValorMA[0].componentes[componenteSelect].actividades[
                    actividadSelect
                  ].metaAnual
                ) < 0 ||
                  isNaN(
                    parseFloat(
                      aValorMA[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].metaAnual
                    )
                  )) &&
                aValorMA[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ].metaAnual !== ""
                  ? true
                  : false
              }
              helperText={
                (parseFloat(
                  aValorMA[0].componentes[componenteSelect].actividades[
                    actividadSelect
                  ].metaAnual
                ) < 0 ||
                  isNaN(
                    parseFloat(
                      aValorMA[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].metaAnual
                    )
                  )) &&
                aValorMA[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ].metaAnual !== ""
                  ? "Introducir valor mayor que 0."
                  : null
              }
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
              rows={1}
              multiline
              sx={{ width: "18%", boxShadow: 2 }}
              variant={"filled"}
              label={
                <Typography
                  sx={{ fontSize: '0.7vw', fontFamily: "MontserratMedium" }}
                >
                LÍNEA BASE 2021
                </Typography>
              }
              value={
                aValorMA[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ].lineaBase
              }
              onChange={(c) => {
                let y = [...aValorMA];
                y[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ].lineaBase = c.target.value;
                setAValorMA(y);
              }}
              error={
                (parseFloat(
                  aValorMA[0].componentes[componenteSelect].actividades[
                    actividadSelect
                  ].lineaBase
                ) < 0 ||
                  isNaN(
                    parseFloat(
                      aValorMA[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].lineaBase
                    )
                  )) &&
                aValorMA[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ].lineaBase !== ""
                  ? true
                  : false
              }
              helperText={
                (parseFloat(
                  aValorMA[0].componentes[componenteSelect].actividades[
                    actividadSelect
                  ].lineaBase
                ) < 0 ||
                  isNaN(
                    parseFloat(
                      aValorMA[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].lineaBase
                    )
                  )) &&
                aValorMA[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ].lineaBase !== ""
                  ? "Introducir valor mayor que 0."
                  : null
              }
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
              rows={1}
              multiline
              sx={{ width: "18%", boxShadow: 2 }}
              variant={"filled"}
              label={
                <Typography
                  sx={{ fontSize: '0.7vw', fontFamily: "MontserratMedium" }}
                >
                  VALOR DEL NUMERADOR
                </Typography>
              }
              value={
                aValorMA[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ].valorNumerador
              }
              onChange={(c) => {
                let y = [...aValorMA];
                y[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ].valorNumerador = c.target.value;
                setAValorMA(y);
              }}
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
              rows={1}
              multiline
              sx={{ width: "18%", boxShadow: 2 }}
              variant={"filled"}
              label={
                <Typography
                  sx={{ fontSize: '0.7vw', fontFamily: "MontserratMedium" }}
                >
                  VALOR DEL DENOMINADOR
                </Typography>
              }
              value={
                aValorMA[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ].valorDenominador
              }
              onChange={(c) => {
                let y = [...aValorMA];
                y[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ].valorDenominador = c.target.value;
                setAValorMA(y);
              }}
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

            <FormControl
              sx={{
                width: "15%",
                height: "80%",
                backgroundColor: "#f0f0f0",
                boxShadow: 2,
                fontFamily: "MontserratMedium",
                justifyContent: "space-evenly",
                alignItems: "flex-start",
              }}
            >
              <FormLabel
                sx={{
                  fontFamily: "MontserratBold",
                  fontSize: 12,
                }}
              >
                SENTIDO DEL INDICADOR
              </FormLabel>
              <FormControlLabel
                value={"ASCENDENTE"}
                label={
                  <Typography
                    sx={{ fontSize: '0.6vw', fontFamily: "MontserratMedium" }}
                  >
                    ASCENDENTE
                  </Typography>
                }
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      aValorMA[0]?.componentes[componenteSelect].actividades[
                        actividadSelect
                      ].sentidoDelIndicador === "ASCENDENTE"
                    }
                    onChange={(c) => {
                      let y = [...aValorMA];
                      y[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].sentidoDelIndicador = c.target.value;
                      setAValorMA(y);
                    }}
                  />
                }
              />
              <FormControlLabel
                value={"DESCENDENTE"}
                label={
                  <Typography
                    sx={{ fontSize: '0.6vw', fontFamily: "MontserratMedium" }}
                  >
                    DESCENDENTE
                  </Typography>
                }
                control={
                  <Radio
                    checked={
                      aValorMA[0]?.componentes[componenteSelect].actividades[
                        actividadSelect
                      ].sentidoDelIndicador === "DESCENDENTE"
                    }
                    onChange={(c) => {
                      let y = [...aValorMA];
                      y[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].sentidoDelIndicador = c.target.value;
                      setAValorMA(y);
                    }}
                  />
                }
              />
              <FormControlLabel
                value={"NORMAL"}
                label={
                  <Typography
                    sx={{ fontSize: '0.6vw', fontFamily: "MontserratMedium" }}
                  >
                    NORMAL
                  </Typography>
                }
                control={
                  <Radio
                    checked={
                      aValorMA[0]?.componentes[componenteSelect].actividades[
                        actividadSelect
                      ].sentidoDelIndicador === "NORMAL"
                    }
                    onChange={(c) => {
                      let y = [...aValorMA];
                      y[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].sentidoDelIndicador = c.target.value;
                      setAValorMA(y);
                    }}
                  />
                }
              />
            </FormControl>
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
              rows={1}
              multiline
              sx={{ width: "18%", boxShadow: 2 }}
              variant={"filled"}
              label={
                <Typography
                  sx={{ fontSize: '0.7vw', fontFamily: "MontserratMedium" }}
                >
                  TRIMESTRE 1
                </Typography>
              }
              value={
                aValorMA[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ].metasPorFrecuencia[0].trimestre1
              }
              onChange={(c) => {
                let y = [...aValorMA];
                y[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ].metasPorFrecuencia[0].trimestre1 = c.target.value;
                setAValorMA(y);
              }}
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
              rows={1}
              multiline
              sx={{ width: "18%", boxShadow: 2 }}
              variant={"filled"}
              label={
                <Typography
                  sx={{ fontSize: '0.7vw', fontFamily: "MontserratMedium" }}
                >
                  TRIMESTRE 2
                </Typography>
              }
              value={
                aValorMA[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ].metasPorFrecuencia[0].trimestre2
              }
              onChange={(c) => {
                let y = [...aValorMA];
                y[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ].metasPorFrecuencia[0].trimestre2 = c.target.value;
                setAValorMA(y);
              }}
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
              rows={1}
              multiline
              sx={{ width: "18%", boxShadow: 2 }}
              variant={"filled"}
              label={
                <Typography
                  sx={{ fontSize: '0.7vw', fontFamily: "MontserratMedium" }}
                >
                  TRIMESTRE 3
                </Typography>
              }
              value={
                aValorMA[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ].metasPorFrecuencia[0].trimestre3
              }
              onChange={(c) => {
                let y = [...aValorMA];
                y[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ].metasPorFrecuencia[0].trimestre3 = c.target.value;
                setAValorMA(y);
              }}
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
              rows={1}
              multiline
              sx={{ width: "18%", boxShadow: 2 }}
              variant={"filled"}
              label={
                <Typography
                  sx={{ fontSize: '0.7vw', fontFamily: "MontserratMedium" }}
                >
                  TRIMESTRE 4
                </Typography>
              }
              value={
                aValorMA[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ].metasPorFrecuencia[0].trimestre4
              }
              onChange={(c) => {
                let y = [...aValorMA];
                y[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ].metasPorFrecuencia[0].trimestre4 = c.target.value;
                setAValorMA(y);
              }}
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
              height: "30%",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <TextField
              rows={5}
              multiline
              sx={{ width: "40%", boxShadow: 2 }}
              variant={"filled"}
              label={
                <Typography
                  sx={{ fontSize: '0.7vw', fontFamily: "MontserratMedium" }}
                >
                  UNIDAD RESPONSABLE DE REPORTAR EL INDICADOR
                </Typography>
              }
              value={
                aValorMA[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ].unidadResponsable
              }
              onChange={(c) => {
                let y = [...aValorMA];
                y[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ].unidadResponsable = c.target.value;
                setAValorMA(y);
              }}
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
              label={
                <Typography
                  sx={{ fontSize: '0.7vw', fontFamily: "MontserratMedium" }}
                >
                  DESCRIPCIÓN DEL INDICADOR
                </Typography>
              }
              value={
                aValorMA[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ].descIndicador
              }
              onChange={(c) => {
                let y = [...aValorMA];
                y[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ].descIndicador = c.target.value;
                setAValorMA(y);
              }}
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
              height: "30%",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <TextField
              rows={5}
              multiline
              sx={{ width: "40%", boxShadow: 2 }}
              variant={"filled"}
              label={
                <Typography
                  sx={{ fontSize: '0.7vw', fontFamily: "MontserratMedium" }}
                >
                  DESCRIPCIÓN DEL NUMERADOR
                </Typography>
              }
              value={
                aValorMA[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ].descNumerador
              }
              onChange={(c) => {
                let y = [...aValorMA];
                y[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ].descNumerador = c.target.value;
                setAValorMA(y);
              }}
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
              label={
                <Typography
                  sx={{ fontSize: '0.7vw', fontFamily: "MontserratMedium" }}
                >
                  DESCRIPCIÓN DEL DENOMINADOR
                </Typography>
              }
              value={
                aValorMA[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ].descDenominador
              }
              onChange={(c) => {
                let y = [...aValorMA];
                y[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ].descDenominador = c.target.value;
                setAValorMA(y);
              }}
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
