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
import { ICValor } from "../tabsMir/ICValor";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import { FormulaDialogMA } from "../formulasDialog/FormulaDialogMA";
import { FormulaDialogMACA } from "../formulasDialog/FormulaDialogMACA";
import { IComponenteActividad } from "../tabsMir/AddMir";

//funcion main
export const TabActividadesFT = ({
  show,
  componentes,
  asignarCValor,
  asignarCValorMIR,
  compAct,
  actividadesMir,
  showMirFnc,
  showFnc,
  MA,
  MIR,
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
  MIR: string;
}) => {
  // business logic-------------------------------------------------------------------------------

  const [componenteActividad, setComponenteActividad] = useState([
    {
      componentes: componentes.map((x) => [1, 2]),
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
                tipoDeIndicador: "",
                claridad: "",
                relevancia: "",
                economia: "",
                monitoreable: "",
                adecuado: "",
                aporte_marginal: "",
                dimension: "",
                unidadDeMedida: "",
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
                tipoDeIndicador: "",
                claridad: "",
                relevancia: "",
                economia: "",
                monitoreable: "",
                adecuado: "",
                aporte_marginal: "",
                dimension: "",
                unidadDeMedida: "",
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
                  <Typography
                    sx={{ fontFamily: "MontserratMedium", fontSize: "0.7vw" }}
                  >
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
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            width: "90%",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <FormControl
            sx={{
              width: "90%",
              height: "60%",
              backgroundColor: "#f0f0f0",
              boxShadow: 2,
              fontFamily: "MontserratMedium",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <FormLabel
              sx={{
                fontFamily: "MontserratBold",
                fontSize: "0.6vw",
              }}
            >
              TIPO DE INDICADOR
            </FormLabel>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <FormControlLabel
                value={"SELECCIÓN ESTRATEGICO"}
                label={"SELECCIÓN ESTRATEGICO"}
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      aValorMA[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].tipoDeIndicador === "SELECCIÓN ESTRATEGICO"
                    }
                    onChange={(c) => {
                      let y = [...aValorMA];
                      y[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].tipoDeIndicador = c.target.value;
                      setAValorMA(y);
                    }}
                  />
                }
              />
              <FormControlLabel
                value={"DE GESTIÓN"}
                label={"DE GESTIÓN"}
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      aValorMA[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].tipoDeIndicador === "DE GESTIÓN"
                    }
                    onChange={(c) => {
                      let y = [...aValorMA];
                      y[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].tipoDeIndicador = c.target.value;
                      setAValorMA(y);
                    }}
                  />
                }
              />
            </Box>
          </FormControl>

          <FormControl
            sx={{
              width: "90%",
              height: "60%",
              backgroundColor: "#f0f0f0",
              boxShadow: 2,
              fontFamily: "MontserratMedium",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <FormLabel
              sx={{
                fontFamily: "MontserratBold",
                fontSize: "0.6vw",
              }}
            >
              DIMENSIÓN
            </FormLabel>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <FormControlLabel
                value={"EFICIENCIA"}
                label={"EFICIENCIA"}
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      aValorMA[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].dimension === "EFICIENCIA"
                    }
                    onChange={(c) => {
                      let y = [...aValorMA];
                      y[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].dimension = c.target.value;
                      setAValorMA(y);
                    }}
                  />
                }
              />
              <FormControlLabel
                value={"EFICACIA"}
                label={"EFICACIA"}
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      aValorMA[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].dimension === "EFICACIA"
                    }
                    onChange={(c) => {
                      let y = [...aValorMA];
                      y[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].dimension = c.target.value;
                      setAValorMA(y);
                    }}
                  />
                }
              />
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
              <FormControlLabel
                value={"CALIDAD"}
                label={"CALIDAD"}
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      aValorMA[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].dimension === "CALIDAD"
                    }
                    onChange={(c) => {
                      let y = [...aValorMA];
                      y[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].dimension = c.target.value;
                      setAValorMA(y);
                    }}
                  />
                }
              />

              <FormControlLabel
                value={"ECONOMÍA"}
                label={"ECONOMÍA"}
                sx={{
                  fontFamily: "MontserratMedium",
                  ml:"0.5vw",
                }}
                control={
                  <Radio
                    checked={
                      aValorMA[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].dimension === "ECONOMÍA"
                    }
                    onChange={(c) => {
                      let y = [...aValorMA];
                      y[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].dimension = c.target.value;
                      setAValorMA(y);
                    }}
                  />
                }
              />
              </Box>
            </Box>
          </FormControl>

          <TextField
            rows={8}
            multiline
            variant="filled"
            sx={{ width: "90%", boxShadow: 2 }}
            label={"UNIDAD DE MEDIDA"}
            InputLabelProps={{
              style: {
                fontFamily: "MontserratMedium",
                fontSize: ".8vw",
              },
            }}
            InputProps={{
              style: {
                fontFamily: "MontserratRegular",
              },
            }}
            onChange={(c) => {
              let y = [...aValorMA];
              y[0].componentes[componenteSelect].actividades[
                actividadSelect
              ].unidadDeMedida = c.target.value;
              setAValorMA(y);
            }}
            value={
              aValorMA[0].componentes[componenteSelect].actividades[
                actividadSelect
              ].unidadDeMedida || ""
            }
          />

          <FormControl
            sx={{
              width: "90%",
              height: "60%",
              backgroundColor: "#f0f0f0",
              boxShadow: 2,
              fontFamily: "MontserratMedium",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <FormLabel
              sx={{
                fontFamily: "MontserratBold",
                fontSize: "0.6vw",
              }}
            >
              CLARIDAD
            </FormLabel>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <FormControlLabel
                value={"SI"}
                label={"SI"}
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      aValorMA[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].claridad === "SI"
                    }
                    onChange={(c) => {
                      let y = [...aValorMA];
                      y[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].claridad = c.target.value;
                      setAValorMA(y);
                    }}
                  />
                }
              />
              <FormControlLabel
                value={"NO"}
                label={"NO"}
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      aValorMA[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].claridad === "NO"
                    }
                    onChange={(c) => {
                      let y = [...aValorMA];
                      y[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].claridad = c.target.value;
                      setAValorMA(y);
                    }}
                  />
                }
              />
            </Box>
          </FormControl>

          <FormControl
            sx={{
              width: "90%",
              height: "60%",
              backgroundColor: "#f0f0f0",
              boxShadow: 2,
              fontFamily: "MontserratMedium",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <FormLabel
              sx={{
                fontFamily: "MontserratBold",
                fontSize: "0.6vw",
              }}
            >
              RELEVANCIA
            </FormLabel>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <FormControlLabel
                value={"SI"}
                label={"SI"}
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      aValorMA[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].relevancia === "SI"
                    }
                    onChange={(c) => {
                      let y = [...aValorMA];
                      y[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].relevancia = c.target.value;
                      setAValorMA(y);
                    }}
                  />
                }
              />
              <FormControlLabel
                value={"NO"}
                label={"NO"}
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      aValorMA[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].relevancia === "NO"
                    }
                    onChange={(c) => {
                      let y = [...aValorMA];
                      y[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].relevancia = c.target.value;
                      setAValorMA(y);
                    }}
                  />
                }
              />
            </Box>
          </FormControl>

          <FormControl
            sx={{
              width: "90%",
              height: "60%",
              backgroundColor: "#f0f0f0",
              boxShadow: 2,
              fontFamily: "MontserratMedium",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <FormLabel
              sx={{
                fontFamily: "MontserratBold",
                fontSize: "0.6vw",
              }}
            >
              ECONOMÍA
            </FormLabel>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <FormControlLabel
                value={"SI"}
                label={"SI"}
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      aValorMA[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].economia === "SI"
                    }
                    onChange={(c) => {
                      let y = [...aValorMA];
                      y[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].economia = c.target.value;
                      setAValorMA(y);
                    }}
                  />
                }
              />
              <FormControlLabel
                value={"NO"}
                label={"NO"}
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      aValorMA[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].economia === "NO"
                    }
                    onChange={(c) => {
                      let y = [...aValorMA];
                      y[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].economia = c.target.value;
                      setAValorMA(y);
                    }}
                  />
                }
              />
            </Box>
          </FormControl>

          <FormControl
            sx={{
              width: "90%",
              height: "60%",
              backgroundColor: "#f0f0f0",
              boxShadow: 2,
              fontFamily: "MontserratMedium",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <FormLabel
              sx={{
                fontFamily: "MontserratBold",
                fontSize: "0.6vw",
              }}
            >
              MONITOREABLE
            </FormLabel>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <FormControlLabel
                value={"SI"}
                label={"SI"}
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      aValorMA[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].monitoreable === "SI"
                    }
                    onChange={(c) => {
                      let y = [...aValorMA];
                      y[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].monitoreable = c.target.value;
                      setAValorMA(y);
                    }}
                  />
                }
              />
              <FormControlLabel
                value={"NO"}
                label={"NO"}
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      aValorMA[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].monitoreable === "NO"
                    }
                    onChange={(c) => {
                      let y = [...aValorMA];
                      y[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].monitoreable = c.target.value;
                      setAValorMA(y);
                    }}
                  />
                }
              />
            </Box>
          </FormControl>

          <FormControl
            sx={{
              width: "90%",
              height: "60%",
              backgroundColor: "#f0f0f0",
              boxShadow: 2,
              fontFamily: "MontserratMedium",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <FormLabel
              sx={{
                fontFamily: "MontserratBold",
                fontSize: "0.6vw",
              }}
            >
              ADECUADO
            </FormLabel>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <FormControlLabel
                value={"SI"}
                label={"SI"}
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      aValorMA[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].adecuado === "SI"
                    }
                    onChange={(c) => {
                      let y = [...aValorMA];
                      y[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].adecuado = c.target.value;
                      setAValorMA(y);
                    }}
                  />
                }
              />
              <FormControlLabel
                value={"NO"}
                label={"NO"}
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      aValorMA[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].adecuado === "NO"
                    }
                    onChange={(c) => {
                      let y = [...aValorMA];
                      y[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].adecuado = c.target.value;
                      setAValorMA(y);
                    }}
                  />
                }
              />
            </Box>
          </FormControl>

          <FormControl
            sx={{
              width: "90%",
              height: "60%",
              backgroundColor: "#f0f0f0",
              boxShadow: 2,
              fontFamily: "MontserratMedium",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <FormLabel
              sx={{
                fontFamily: "MontserratBold",
                fontSize: "0.6vw",
              }}
            >
              APORTE MARGINAL
            </FormLabel>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <FormControlLabel
                value={"SI"}
                label={"SI"}
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      aValorMA[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].aporte_marginal === "SI"
                    }
                    onChange={(c) => {
                      let y = [...aValorMA];
                      y[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].aporte_marginal = c.target.value;
                      setAValorMA(y);
                    }}
                  />
                }
              />
              <FormControlLabel
                value={"NO"}
                label={"NO"}
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      aValorMA[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].aporte_marginal === "NO"
                    }
                    onChange={(c) => {
                      let y = [...aValorMA];
                      y[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].aporte_marginal = c.target.value;
                      setAValorMA(y);
                    }}
                  />
                }
              />
              <FormControlLabel
                value={"NA"}
                label={"NA"}
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      aValorMA[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].aporte_marginal === "NA"
                    }
                    onChange={(c) => {
                      let y = [...aValorMA];
                      y[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].aporte_marginal = c.target.value;
                      setAValorMA(y);
                    }}
                  />
                }
              />
            </Box>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};
