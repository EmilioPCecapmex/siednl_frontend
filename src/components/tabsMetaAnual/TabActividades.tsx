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
import { ICValor } from "../tabsMir/ICValor";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

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

  let jsonMA = JSON.parse(MA);

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
                  MA === "" ? "" : jsonMA?.actividades[index2]?.metaAnual || '',
                lineaBase:
                  MA === "" ? "" : jsonMA?.actividades[index2]?.lineaBase || '',
                metasPorFrecuencia: [
                  {
                    semestre1:
                      MA === ""
                        ? ""
                        : jsonMA?.actividades[index2]?.metasPorFrecuencia[0]
                            ?.semestre1 || '',
                    semestre2:
                      MA === ""
                        ? ""
                        : jsonMA?.actividades[index2]?.metasPorFrecuencia[0]
                            ?.semestre2 || '',
                    trimestre1:
                      MA === ""
                        ? ""
                        : jsonMA?.actividades[index2]?.metasPorFrecuencia[0]
                            ?.trimestre1 || '',
                    trimestre2:
                      MA === ""
                        ? ""
                        : jsonMA?.actividades[index2]?.metasPorFrecuencia[0]
                            ?.trimestre2 || '',
                    trimestre3:
                      MA === ""
                        ? ""
                        : jsonMA?.actividades[index2]?.metasPorFrecuencia[0]
                            ?.trimestre3 || '',
                    trimestre4:
                      MA === ""
                        ? ""
                        : jsonMA?.actividades[index2]?.metasPorFrecuencia[0]
                            ?.trimestre4 || '',
                  },
                ],
                valorNumerador:
                  MA === "" ? "" : jsonMA?.actividades[index2]?.valorNumerador || '',
                valorDenominador:
                  MA === ""
                    ? ""
                    : jsonMA?.actividades[index2]?.valorDenominador || '',
                sentidoDelIndicador:
                  MA === ""
                    ? ""
                    : jsonMA?.actividades[index2]?.sentidoDelIndicador || '',
                unidadResponsable:
                  MA === ""
                    ? ""
                    : jsonMA?.actividades[index2]?.unidadResponsable || '',
                descIndicador:
                  MA === "" ? "" : jsonMA?.actividades[index2]?.descIndicador || '',
                descNumerador:
                  MA === "" ? "" : jsonMA?.actividades[index2]?.descNumerador || '',
                descDenominador:
                  MA === "" ? "" : jsonMA?.actividades[index2]?.descDenominador || '',
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
          justifyContent: "flex-end",
          alignItems: "center",
        }}
        onClick={() => {
          showMirFnc(true);
          showFnc("Actividades");
        }}
      >
        <InfoOutlinedIcon
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
                    {aValorMA[0].componentes[componenteSelect].actividades.map(
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
              sx={{ width: "20%", boxShadow: 2 }}
              variant={"filled"}
              label={"Meta Anual 2023"}
              error={
                (parseFloat(
                  aValorMA[0].componentes[componenteSelect].actividades[
                    actividadSelect
                  ].metaAnual
                ) < 0 ||
                  parseFloat(
                    aValorMA[0].componentes[componenteSelect].actividades[
                      actividadSelect
                    ].metaAnual
                  ) > 100 ||
                  isNaN(
                    parseFloat(
                      aValorMA[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].metaAnual
                    )
                  )) &&
                aValorMA[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ].metaAnual != ""
                  ? true
                  : false
              }
              helperText={
                (parseFloat(
                  aValorMA[0].componentes[componenteSelect].actividades[
                    actividadSelect
                  ].metaAnual
                ) < 0 ||
                  parseFloat(
                    aValorMA[0].componentes[componenteSelect].actividades[
                      actividadSelect
                    ].metaAnual
                  ) > 100 ||
                  isNaN(
                    parseFloat(
                      aValorMA[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].metaAnual
                    )
                  )) &&
                aValorMA[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ].metaAnual != ""
                  ? "Introducir valor entre 0 y 100. "
                  : null
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
              sx={{ width: "20%", boxShadow: 2 }}
              variant={"filled"}
              label={"Linea Base 2021"}
              error={
                (parseFloat(
                  aValorMA[0].componentes[componenteSelect].actividades[
                    actividadSelect
                  ].lineaBase
                ) < 0 ||
                  parseFloat(
                    aValorMA[0].componentes[componenteSelect].actividades[
                      actividadSelect
                    ].lineaBase
                  ) > 100 ||
                  isNaN(
                    parseFloat(
                      aValorMA[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].lineaBase
                    )
                  )) &&
                aValorMA[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ].lineaBase != ""
                  ? true
                  : false
              }
              helperText={
                (parseFloat(
                  aValorMA[0].componentes[componenteSelect].actividades[
                    actividadSelect
                  ].lineaBase
                ) < 0 ||
                  parseFloat(
                    aValorMA[0].componentes[componenteSelect].actividades[
                      actividadSelect
                    ].lineaBase
                  ) > 100 ||
                  isNaN(
                    parseFloat(
                      aValorMA[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].lineaBase
                    )
                  )) &&
                aValorMA[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ].lineaBase != ""
                  ? "Introducir valor entre 0 y 100. "
                  : null
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
              sx={{ width: "20%", boxShadow: 2 }}
              variant={"filled"}
              label={"Valor númerador"}
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
              rows={3}
              multiline
              sx={{ width: "20%", boxShadow: 2 }}
              variant={"filled"}
              label={"Valor del denominador"}
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
            <TextField
              rows={3}
              multiline
              sx={{ width: "20%", boxShadow: 2 }}
              variant={"filled"}
              label={"Sentido del indicador"}
              value={
                aValorMA[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ].sentidoDelIndicador
              }
              onChange={(c) => {
                let y = [...aValorMA];
                y[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ].sentidoDelIndicador = c.target.value;
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
              rows={3}
              multiline
              sx={{ width: "18%", boxShadow: 2 }}
              variant={"filled"}
              label={"Trimestre 2"}
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
              rows={3}
              multiline
              sx={{ width: "18%", boxShadow: 2 }}
              variant={"filled"}
              label={"Trimestre 3"}
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
              rows={3}
              multiline
              sx={{ width: "18%", boxShadow: 2 }}
              variant={"filled"}
              label={"Trimestre 4"}
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
              label={"Descripción del indicador"}
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
              label={"Descripcion del denominador"}
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
