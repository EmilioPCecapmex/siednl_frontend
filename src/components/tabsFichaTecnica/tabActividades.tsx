import { useState, useEffect } from "react";
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
import { IComponenteActividad } from "../tabsMir/AddMir";

//funcion main
export const TabActividadesFT = ({
  show,
  componentes,
  asignarCValor,
  compAct,
  showMirFnc,
  setTxtShowFnc,
  FT,
}: {
  show: boolean;
  componentes: number[];
  asignarCValor: Function;
  compAct: Array<IComponenteActividad>;
  showMirFnc: Function;
  setTxtShowFnc: Function;
  FT: string;
}) => {
  // business logic-------------------------------------------------------------------------------

  const [componenteActividad, setComponenteActividad] = useState([
    {
      componentes: componentes.map((x) => compAct),
    },
  ]);

  const [componenteSelect, setComponenteSelect] = useState(0);
  const [actividadSelect, setActividadSelect] = useState(0);

  let jsonFT = FT === undefined || FT === "" ? "" : JSON.parse(FT);

  const [aValorFT, setAValorFT] = useState(
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
      loadActividadesFT();
    }
  }, [compAct]);

  useEffect(() => {
    asignarCValor(aValorFT);
  }, [aValorFT]);

  const loadActividadesFT = () => {
    let y = componenteActividad.map((item) => {
      return {
        componentes: compAct.map((x, index) => {
          return {
            actividades: x.actividades.map((c, index2) => {
              return {
                actividad:
                  FT === "" || FT === undefined
                    ? ""
                    : "A" + (index2 + 1) + "C" + (index + 1),
                tipoDeIndicador:
                  FT === "" || FT === undefined
                    ? ""
                    : jsonFT?.actividades[index2]?.tipoDeIndicador,
                claridad:
                  FT === "" || FT === undefined
                    ? ""
                    : jsonFT?.actividades[index2]?.claridad,
                relevancia:
                  FT === "" || FT === undefined
                    ? ""
                    : jsonFT?.actividades[index2]?.relevancia,
                economia:
                  FT === "" || FT === undefined
                    ? ""
                    : jsonFT?.actividades[index2]?.economia,
                monitoreable:
                  FT === "" || FT === undefined
                    ? ""
                    : jsonFT?.actividades[index2]?.monitoreable,
                adecuado:
                  FT === "" || FT === undefined
                    ? ""
                    : jsonFT?.actividades[index2]?.adecuado,
                aporte_marginal:
                  FT === "" || FT === undefined
                    ? ""
                    : jsonFT?.actividades[index2]?.aporte_marginal,
                dimension:
                  FT === "" || FT === undefined
                    ? ""
                    : jsonFT?.actividades[index2]?.dimension,
                unidadDeMedida:
                  FT === "" || FT === undefined
                    ? ""
                    : jsonFT?.actividades[index2]?.unidadDeMedida,
              };
            }),
          };
        }),
      };
    });

    setAValorFT(y);
  };

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
            setTxtShowFnc("Actividades");
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
                    {aValorFT[0].componentes[componenteSelect].actividades.map(
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
                fontSize: "0.8vw",
              }}
            >
              TIPO DE INDICADOR
            </FormLabel>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <FormControlLabel
                value={"SELECCIÓN ESTRATEGICO"}
                label={
                  <Typography
                    sx={{
                      fontSize: "0.7vw",
                      fontFamily: "MontserratMedium",
                    }}
                  >
                    SELECCIÓN ESTRATEGICO
                  </Typography>
                }
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      aValorFT[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ]?.tipoDeIndicador === "SELECCIÓN ESTRATEGICO"
                    }
                    onChange={(c) => {
                      let y = [...aValorFT];
                      y[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].tipoDeIndicador = c.target.value;
                      setAValorFT(y);
                    }}
                  />
                }
              />
              <FormControlLabel
                value={"DE GESTIÓN"}
                label={
                  <Typography
                    sx={{
                      fontSize: "0.7vw",
                      fontFamily: "MontserratMedium",
                    }}
                  >
                    DE GESTIÓN
                  </Typography>
                }
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      aValorFT[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ]?.tipoDeIndicador === "DE GESTIÓN"
                    }
                    onChange={(c) => {
                      let y = [...aValorFT];
                      y[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].tipoDeIndicador = c.target.value;
                      setAValorFT(y);
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
                fontSize: "0.8vw",
              }}
            >
              DIMENSIÓN
            </FormLabel>

            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)" }}>
              <FormControlLabel
                value={"EFICIENCIA"}
                label={
                  <Typography
                    sx={{
                      fontSize: "0.7vw",
                      fontFamily: "MontserratMedium",
                    }}
                  >
                    EFICIENCIA
                  </Typography>
                }
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      aValorFT[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ]?.dimension === "EFICIENCIA"
                    }
                    onChange={(c) => {
                      let y = [...aValorFT];
                      y[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].dimension = c.target.value;
                      setAValorFT(y);
                    }}
                  />
                }
              />
              <FormControlLabel
                value={"EFICACIA"}
                label={
                  <Typography
                    sx={{
                      fontSize: "0.7vw",
                      fontFamily: "MontserratMedium",
                    }}
                  >
                    EFICACIA
                  </Typography>
                }
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      aValorFT[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ]?.dimension === "EFICACIA"
                    }
                    onChange={(c) => {
                      let y = [...aValorFT];
                      y[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].dimension = c.target.value;
                      setAValorFT(y);
                    }}
                  />
                }
              />
              <FormControlLabel
                value={"CALIDAD"}
                label={
                  <Typography
                    sx={{
                      fontSize: "0.7vw",
                      fontFamily: "MontserratMedium",
                    }}
                  >
                    CALIDAD
                  </Typography>
                }
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      aValorFT[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ]?.dimension === "CALIDAD"
                    }
                    onChange={(c) => {
                      let y = [...aValorFT];
                      y[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].dimension = c.target.value;
                      setAValorFT(y);
                    }}
                  />
                }
              />

              <FormControlLabel
                value={"ECONOMÍA"}
                label={
                  <Typography
                    sx={{
                      fontSize: "0.7vw",
                      fontFamily: "MontserratMedium",
                    }}
                  >
                    ECONOMÍA
                  </Typography>
                }
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      aValorFT[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ]?.dimension === "ECONOMÍA"
                    }
                    onChange={(c) => {
                      let y = [...aValorFT];
                      y[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].dimension = c.target.value;
                      setAValorFT(y);
                    }}
                  />
                }
              />
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
              let y = [...aValorFT];
              y[0].componentes[componenteSelect].actividades[
                actividadSelect
              ].unidadDeMedida = c.target.value;
              setAValorFT(y);
            }}
            value={
              aValorFT[0].componentes[componenteSelect]?.actividades[
                actividadSelect
              ]?.unidadDeMedida || ""
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
                fontSize: "0.8vw",
              }}
            >
              CLARIDAD
            </FormLabel>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <FormControlLabel
                value={"SI"}
                label={
                  <Typography
                    sx={{
                      fontSize: "0.7vw",
                      fontFamily: "MontserratMedium",
                    }}
                  >
                    SI
                  </Typography>
                }
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      aValorFT[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ]?.claridad === "SI"
                    }
                    onChange={(c) => {
                      let y = [...aValorFT];
                      y[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].claridad = c.target.value;
                      setAValorFT(y);
                    }}
                  />
                }
              />
              <FormControlLabel
                value={"NO"}
                label={
                  <Typography
                    sx={{
                      fontSize: "0.7vw",
                      fontFamily: "MontserratMedium",
                    }}
                  >
                    NO
                  </Typography>
                }
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      aValorFT[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ]?.claridad === "NO"
                    }
                    onChange={(c) => {
                      let y = [...aValorFT];
                      y[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].claridad = c.target.value;
                      setAValorFT(y);
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
                fontSize: "0.8vw",
              }}
            >
              RELEVANCIA
            </FormLabel>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <FormControlLabel
                value={"SI"}
                label={
                  <Typography
                    sx={{
                      fontSize: "0.7vw",
                      fontFamily: "MontserratMedium",
                    }}
                  >
                    SI
                  </Typography>
                }
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      aValorFT[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ]?.relevancia === "SI"
                    }
                    onChange={(c) => {
                      let y = [...aValorFT];
                      y[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].relevancia = c.target.value;
                      setAValorFT(y);
                    }}
                  />
                }
              />
              <FormControlLabel
                value={"NO"}
                label={
                  <Typography
                    sx={{
                      fontSize: "0.7vw",
                      fontFamily: "MontserratMedium",
                    }}
                  >
                    NO
                  </Typography>
                }
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      aValorFT[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ]?.relevancia === "NO"
                    }
                    onChange={(c) => {
                      let y = [...aValorFT];
                      y[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].relevancia = c.target.value;
                      setAValorFT(y);
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
                fontSize: "0.8vw",
              }}
            >
              ECONOMÍA
            </FormLabel>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <FormControlLabel
                value={"SI"}
                label={
                  <Typography
                    sx={{
                      fontSize: "0.7vw",
                      fontFamily: "MontserratMedium",
                    }}
                  >
                    SI
                  </Typography>
                }
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      aValorFT[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ]?.economia === "SI"
                    }
                    onChange={(c) => {
                      let y = [...aValorFT];
                      y[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].economia = c.target.value;
                      setAValorFT(y);
                    }}
                  />
                }
              />
              <FormControlLabel
                value={"NO"}
                label={
                  <Typography
                    sx={{
                      fontSize: "0.7vw",
                      fontFamily: "MontserratMedium",
                    }}
                  >
                    NO
                  </Typography>
                }
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      aValorFT[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ]?.economia === "NO"
                    }
                    onChange={(c) => {
                      let y = [...aValorFT];
                      y[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].economia = c.target.value;
                      setAValorFT(y);
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
                fontSize: "0.8vw",
              }}
            >
              MONITOREABLE
            </FormLabel>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <FormControlLabel
                value={"SI"}
                label={
                  <Typography
                    sx={{
                      fontSize: "0.7vw",
                      fontFamily: "MontserratMedium",
                    }}
                  >
                    SI
                  </Typography>
                }
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      aValorFT[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ]?.monitoreable === "SI"
                    }
                    onChange={(c) => {
                      let y = [...aValorFT];
                      y[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].monitoreable = c.target.value;
                      setAValorFT(y);
                    }}
                  />
                }
              />
              <FormControlLabel
                value={"NO"}
                label={
                  <Typography
                    sx={{
                      fontSize: "0.7vw",
                      fontFamily: "MontserratMedium",
                    }}
                  >
                    NO
                  </Typography>
                }
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      aValorFT[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ]?.monitoreable === "NO"
                    }
                    onChange={(c) => {
                      let y = [...aValorFT];
                      y[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].monitoreable = c.target.value;
                      setAValorFT(y);
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
                fontSize: "0.8vw",
              }}
            >
              ADECUADO
            </FormLabel>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <FormControlLabel
                value={"SI"}
                label={
                  <Typography
                    sx={{
                      fontSize: "0.7vw",
                      fontFamily: "MontserratMedium",
                    }}
                  >
                    SI
                  </Typography>
                }
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      aValorFT[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ]?.adecuado === "SI"
                    }
                    onChange={(c) => {
                      let y = [...aValorFT];
                      y[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].adecuado = c.target.value;
                      setAValorFT(y);
                    }}
                  />
                }
              />
              <FormControlLabel
                value={"NO"}
                label={
                  <Typography
                    sx={{
                      fontSize: "0.7vw",
                      fontFamily: "MontserratMedium",
                    }}
                  >
                    NO
                  </Typography>
                }
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      aValorFT[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ]?.adecuado === "NO"
                    }
                    onChange={(c) => {
                      let y = [...aValorFT];
                      y[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].adecuado = c.target.value;
                      setAValorFT(y);
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
                fontSize: "0.8vw",
              }}
            >
              APORTE MARGINAL
            </FormLabel>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <FormControlLabel
                value={"SI"}
                label={
                  <Typography
                    sx={{
                      fontSize: "0.7vw",
                      fontFamily: "MontserratMedium",
                    }}
                  >
                    SI
                  </Typography>
                }
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      aValorFT[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ]?.aporte_marginal === "SI"
                    }
                    onChange={(c) => {
                      let y = [...aValorFT];
                      y[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].aporte_marginal = c.target.value;
                      setAValorFT(y);
                    }}
                  />
                }
              />
              <FormControlLabel
                value={"NO"}
                label={
                  <Typography
                    sx={{
                      fontSize: "0.7vw",
                      fontFamily: "MontserratMedium",
                    }}
                  >
                    NO
                  </Typography>
                }
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      aValorFT[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ]?.aporte_marginal === "NO"
                    }
                    onChange={(c) => {
                      let y = [...aValorFT];
                      y[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].aporte_marginal = c.target.value;
                      setAValorFT(y);
                    }}
                  />
                }
              />
              <FormControlLabel
                value={"NA"}
                label={
                  <Typography
                    sx={{
                      fontSize: "0.7vw",
                      fontFamily: "MontserratMedium",
                    }}
                  >
                    NA
                  </Typography>
                }
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      aValorFT[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ]?.aporte_marginal === "NA"
                    }
                    onChange={(c) => {
                      let y = [...aValorFT];
                      y[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].aporte_marginal = c.target.value;
                      setAValorFT(y);
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
