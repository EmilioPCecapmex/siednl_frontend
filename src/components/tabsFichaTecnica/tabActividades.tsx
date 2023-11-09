import { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  List,
  ListItemButton,
  TextField,
  FormControl,
  useMediaQuery,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import { IComponenteActividad } from "../tabsMir/interfaces mir/IMIR";
import { IComponentesFT } from "./Interfaces";

//funcion main
export const TabActividadesFT = ({
  show,

  //asignarCValor,
  compAct,
  showMirFnc,
  setTxtShowFnc,
  FT,
  setFTcomponentesActividadPadre,
  componentesActividad,
  setComponenteActividadFT,
}: {
  show: boolean;

  //asignarCValor: Function;
  compAct: Array<IComponenteActividad>;
  showMirFnc: Function;
  setTxtShowFnc: Function;
  FT: string;
  setFTcomponentesActividadPadre: Function;
  componentesActividad: IComponentesFT[];
  setComponenteActividadFT: Function;
}) => {
  // business logic-------------------------------------------------------------------------------

  // const componenteActividad = [
  //   {
  //     componentes: componentes.map((x) => compAct),
  //   },
  // ];

  const [componentesActividadValues, setComponentesActividadValues] =
    useState<IComponentesFT[]>(componentesActividad);

  const [componenteSelect, setComponenteSelect] = useState(0);
  const [actividadSelect, setActividadSelect] = useState(0);

  let jsonFT = FT === undefined || FT === "" ? "" : JSON.parse(FT);

  useEffect(() => {
    // valoresComponenteFTFnc(componentesValues);
    setComponentesActividadValues(componentesActividad);
  }, []);

  useEffect(() => {
    setFTcomponentesActividadPadre(componentesActividadValues);
  }, [componentesActividadValues]);

  useEffect(() => {
    setFTcomponentesActividadPadre(componentesActividadValues);
  }, []);
  // const [aValorFT, setAValorFT] = useState(
  //   componenteActividad.map((item) => {
  //     return {
  //       componentes: item.componentes.map((x, index) => {
  //         return {
  //           actividades: x.map((c, index2) => {
  //             return {
  //               actividad: "A" + (index2 + 1) + "C" + (index + 1),
  //               tipoDeIndicador: "",
  //               claridad: "",
  //               relevancia: "",
  //               economia: "",
  //               monitoreable: "",
  //               adecuado: "",
  //               aporte_marginal: "",
  //               dimension: "",
  //               unidadDeMedida: "",
  //             };
  //           }),
  //         };
  //       }),
  //     };
  //   })
  // );

  // useEffect(() => {
  //   asignarCValor(aValorFT);
  // }, [aValorFT]);

  // useEffect(() => {
  //   if (componentes.length > componentesActividadValues.length) {
  //     let restantes = componentes.length - aValorFT[0].componentes.length;
  //     let prevState = [...componentesActividadValues];
  //     for (let index = 1; index <= restantes; index++) {
  //       prevState[0].componentes.push({
  //         actividades: [
  //           {
  //             actividad: "A1" + "C" + (prevState[0].componentes.length + 1),
  //             tipoDeIndicador: "",
  //             claridad: "",
  //             relevancia: "",
  //             economia: "",
  //             monitoreable: "",
  //             adecuado: "",
  //             aporte_marginal: "",
  //             dimension: "",
  //             unidadDeMedida: "",
  //           },
  //           {
  //             actividad: "A2" + "C" + (prevState[0].componentes.length + 1),
  //             tipoDeIndicador: "",
  //             claridad: "",
  //             relevancia: "",
  //             economia: "",
  //             monitoreable: "",
  //             adecuado: "",
  //             aporte_marginal: "",
  //             dimension: "",
  //             unidadDeMedida: "",
  //           },
  //         ],
  //       });
  //       setAValorFT(prevState);
  //     }
  //   } else if (componentes.length < aValorFT[0].componentes.length) {
  //     let prevState = [...componentesActividadValues];
  //     let restantes = aValorFT[0].componentes.length - componentes.length;
  //     for (let index = 1; index <= restantes; index++) {
  //       prevState[0].componentes.pop();
  //       setAValorFT(prevState);
  //     }
  //     setComponenteSelect(0);
  //   }
  // }, [compAct]);

  // useEffect(() => {
  //   if (compAct.length > 0) {
  //     loadActividadesFT();
  //   }
  // }, [compAct]);

  // useEffect(() => {
  //   asignarCValor(aValorFT);
  // }, [aValorFT]);

  let aument_number = -1;

  // const loadActividadesFT = () => {
  //   let y = componenteActividad.map((item) => {
  //     return {
  //       componentes: compAct.map((x, index) => {
  //         return {
  //           actividades: x.actividades.map((c, index2) => {
  //             aument_number++;

  //             return {
  //               actividad: "A" + (index2 + 1) + "C" + (index + 1),
  //               tipoDeIndicador:
  //                 FT === ""
  //                   ? ""
  //                   : jsonFT?.actividades[aument_number]?.tipoDeIndicador || "",
  //               claridad:
  //                 FT === ""
  //                   ? ""
  //                   : jsonFT?.actividades[aument_number]?.claridad || "",
  //               relevancia:
  //                 FT === ""
  //                   ? ""
  //                   : jsonFT?.actividades[aument_number]?.relevancia || "",
  //               economia:
  //                 FT === ""
  //                   ? ""
  //                   : jsonFT?.actividades[aument_number]?.economia || "",
  //               monitoreable:
  //                 FT === ""
  //                   ? ""
  //                   : jsonFT?.actividades[aument_number]?.monitoreable || "",
  //               adecuado:
  //                 FT === ""
  //                   ? ""
  //                   : jsonFT?.actividades[aument_number]?.adecuado || "",
  //               aporte_marginal:
  //                 FT === ""
  //                   ? ""
  //                   : jsonFT?.actividades[aument_number]?.aporte_marginal || "",
  //               dimension:
  //                 FT === ""
  //                   ? ""
  //                   : jsonFT?.actividades[aument_number]?.dimension || "",
  //               unidadDeMedida:
  //                 FT === ""
  //                   ? ""
  //                   : jsonFT?.actividades[aument_number]?.unidadDeMedida || "",
  //             };
  //           }),
  //         };
  //       }),
  //     };
  //   });

  //  setComponentesActividadValues(y);
  // };

  const [open, setOpen] = useState(1);

  const handleClickComponente = (index: number) => {
    setOpen(index);
  };
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  //return main
  return (
    <Grid
      visibility={show ? "visible" : "hidden"}
      position="absolute"
      sx={{
        display: "flex",
        width: "93vw",
        height: "82vh",
        boxShadow: 10,
        borderRadius: 5,
        flexDirection: "column",
        backgroundColor: "#fff",
        overflow: "auto",
      }}
    >
      {!isSmallScreen ? (
        <Grid
          sx={{
            width: "100%",
            display: "flex",
            height: "7vh",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              mr: "1vw",
              fontFamily: "MontserratSemiBold",
              fontSize: [10, 10, 15, 18, 25, 25],
            }}
          >
            COMPONENTE #{componenteSelect + 1} - ACTIVIDAD #{" "}
            {actividadSelect + 1}
          </Typography>
        </Grid>
      ) : null}
      <Grid
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
        }}
      >
        {!isSmallScreen && (
          <List
            sx={{
              width: "15vw",
              height: "95%",
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
            {componentesActividadValues.map((componente, index) => {
              return (
                <Grid key={index}>
                  <Divider />

                  <ListItemButton
                    selected={index === componenteSelect ? true : false}
                    key={index}
                    onClick={() => {
                      setComponenteSelect(index);
                      handleClickComponente(index);
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
                      sx={{
                        fontFamily: "MontserratMedium",
                        fontSize: [10, 10, 12, 15, 18, 20],
                      }}
                    >
                      COMPONENTE {index + 1}
                    </Typography>

                    {open === index ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={open === index} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {componente.actividades.map((value, x) => {
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
                            <Typography
                              sx={{
                                fontSize: [10, 10, 12, 15, 18, 20],
                                fontFamily: "MontserratMedium",
                              }}
                            >
                              ACTIVIDAD {x + 1}
                            </Typography>
                          </ListItemButton>
                        );
                      })}
                    </List>
                  </Collapse>

                  <Divider />
                </Grid>
              );
            })}
          </List>
        )}

        <Grid
          item
          container
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            "& > .MuiGrid-item": {
              marginBottom: "20px", // Ajusta la cantidad de espacio vertical entre los elementos
            },
          }}
        >
          {isSmallScreen && (
            <List>
              {componentesActividadValues.map((componente, index) => {
                return (
                  <Grid key={index}>
                    <Divider />

                    <ListItemButton
                      selected={index === componenteSelect ? true : false}
                      key={index}
                      onClick={() => {
                        setComponenteSelect(index);
                        handleClickComponente(index);
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
                        sx={{
                          fontFamily: "MontserratMedium",
                          fontSize: [10, 10, 12, 15, 18, 20],
                        }}
                      >
                        COMPONENTE {index + 1}
                      </Typography>

                      {open === index ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open === index} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {componente.actividades.map((value, x) => {
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
                              <Typography
                                sx={{
                                  fontSize: [10, 10, 12, 15, 18, 20],
                                  fontFamily: "MontserratMedium",
                                }}
                              >
                                ACTIVIDAD {x + 1}
                              </Typography>
                            </ListItemButton>
                          );
                        })}
                      </List>
                    </Collapse>

                    <Divider />
                  </Grid>
                );
              })}
            </List>
          )}

          <Grid
            item
            xl={3.5}
            lg={3.5}
            md={3.5}
            sm={3.5}
            xs={11}
            sx={{
              alignContent: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <FormControl
              fullWidth
              sx={{
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
                  fontSize: [10, 10, 13, 15, 18],
                }}
              >
                TIPO DE INDICADOR
              </FormLabel>
              <Grid sx={{ display: "flex", flexDirection: "column" }}>
                <FormControlLabel
                  value={"SELECCIÓN ESTRATEGICO"}
                  label={
                    <Typography
                      sx={{
                        fontSize: [10, 10, 11, 12, 13],
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
                        componentesActividadValues[componenteSelect]
                          .actividades[actividadSelect]?.tipoDeIndicador ===
                        "SELECCIÓN ESTRATEGICO"
                      }
                      onChange={(c) => {
                        let y = [...componentesActividadValues];
                        y[componenteSelect].actividades[
                          actividadSelect
                        ].tipoDeIndicador = c.target.value;
                        setComponentesActividadValues(y);
                      }}
                    />
                  }
                />
                <FormControlLabel
                  value={"DE GESTIÓN"}
                  label={
                    <Typography
                      sx={{
                        fontSize: [10, 10, 11, 12, 13],
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
                        componentesActividadValues[componenteSelect]
                          .actividades[actividadSelect]?.tipoDeIndicador ===
                        "DE GESTIÓN"
                      }
                      onChange={(c) => {
                        let y = [...componentesActividadValues];
                        y[componenteSelect].actividades[
                          actividadSelect
                        ].tipoDeIndicador = c.target.value;
                        setComponentesActividadValues(y);
                      }}
                    />
                  }
                />
              </Grid>
            </FormControl>
          </Grid>

          <Grid
            item
            xl={3.5}
            lg={3.5}
            md={3.5}
            sm={3.5}
            xs={11}
            sx={{
              alignContent: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <FormControl
              fullWidth
              sx={{
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
                  fontSize: [10, 10, 13, 15, 18],
                }}
              >
                DIMENSIÓN
              </FormLabel>

              <Grid
                sx={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)" }}
              >
                <FormControlLabel
                  value={"EFICIENCIA"}
                  label={
                    <Typography
                      sx={{
                        fontSize: [10, 10, 11, 12, 13],
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
                        componentesActividadValues[componenteSelect]
                          .actividades[actividadSelect]?.dimension ===
                        "EFICIENCIA"
                      }
                      onChange={(c) => {
                        let y = [...componentesActividadValues];
                        y[componenteSelect].actividades[
                          actividadSelect
                        ].dimension = c.target.value;
                        setComponentesActividadValues(y);
                      }}
                    />
                  }
                />
                <FormControlLabel
                  value={"EFICACIA"}
                  label={
                    <Typography
                      sx={{
                        fontSize: [10, 10, 11, 12, 13],
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
                        componentesActividadValues[componenteSelect]
                          .actividades[actividadSelect]?.dimension ===
                        "EFICACIA"
                      }
                      onChange={(c) => {
                        let y = [...componentesActividadValues];
                        y[componenteSelect].actividades[
                          actividadSelect
                        ].dimension = c.target.value;
                        setComponentesActividadValues(y);
                      }}
                    />
                  }
                />
                <FormControlLabel
                  value={"CALIDAD"}
                  label={
                    <Typography
                      sx={{
                        fontSize: [10, 10, 11, 12, 13],
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
                        componentesActividadValues[componenteSelect]
                          .actividades[actividadSelect]?.dimension === "CALIDAD"
                      }
                      onChange={(c) => {
                        let y = [...componentesActividadValues];
                        y[componenteSelect].actividades[
                          actividadSelect
                        ].dimension = c.target.value;
                        setComponentesActividadValues(y);
                      }}
                    />
                  }
                />

                <FormControlLabel
                  value={"ECONOMÍA"}
                  label={
                    <Typography
                      sx={{
                        fontSize: [10, 10, 11, 12, 13],
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
                        componentesActividadValues[componenteSelect]
                          .actividades[actividadSelect]?.dimension ===
                        "ECONOMÍA"
                      }
                      onChange={(c) => {
                        let y = [...componentesActividadValues];
                        y[componenteSelect].actividades[
                          actividadSelect
                        ].dimension = c.target.value;
                        setComponentesActividadValues(y);
                      }}
                    />
                  }
                />
              </Grid>
            </FormControl>
          </Grid>

          <Grid
            item
            xl={3.5}
            lg={3.5}
            md={3.5}
            sm={3.5}
            xs={11}
            sx={{
              alignContent: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TextField
              fullWidth
              rows={5}
              multiline
              variant="filled"
              sx={{
                fontSize: [10, 10, 13, 15, 18],

                boxShadow: 2,
              }}
              label={"UNIDAD DE MEDIDA"}
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratMedium",
                  fontSize: "1vw",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratRegular",
                },
              }}
              onChange={(c) => {
                let y = [...componentesActividadValues];
                y[componenteSelect].actividades[
                  actividadSelect
                ].unidadDeMedida = c.target.value
                  .replaceAll('"', "")
                  .replaceAll("'", "")
                  .replaceAll("\n", "");
                setComponentesActividadValues(y);
              }}
              value={
                componentesActividadValues[componenteSelect]?.actividades[
                  actividadSelect
                ]?.unidadDeMedida || ""
              }
            />
          </Grid>

          <Grid
            item
            xl={3.5}
            lg={3.5}
            md={3.5}
            sm={3.5}
            xs={11}
            sx={{
              alignContent: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <FormControl
              fullWidth
              sx={{
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
                  fontSize: [10, 10, 13, 15, 18],
                }}
              >
                CLARIDAD
              </FormLabel>
              <Grid sx={{ display: "flex", flexDirection: "column" }}>
                <FormControlLabel
                  value={"SI"}
                  label={
                    <Typography
                      sx={{
                        fontSize: [10, 10, 11, 12, 13],
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
                        componentesActividadValues[componenteSelect]
                          .actividades[actividadSelect]?.claridad === "SI"
                      }
                      onChange={(c) => {
                        let y = [...componentesActividadValues];
                        y[componenteSelect].actividades[
                          actividadSelect
                        ].claridad = c.target.value;
                        setComponentesActividadValues(y);
                      }}
                    />
                  }
                />
                <FormControlLabel
                  value={"NO"}
                  label={
                    <Typography
                      sx={{
                        fontSize: [10, 10, 11, 12, 13],
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
                        componentesActividadValues[componenteSelect]
                          .actividades[actividadSelect]?.claridad === "NO"
                      }
                      onChange={(c) => {
                        let y = [...componentesActividadValues];
                        y[componenteSelect].actividades[
                          actividadSelect
                        ].claridad = c.target.value;
                        setComponentesActividadValues(y);
                      }}
                    />
                  }
                />
              </Grid>
            </FormControl>
          </Grid>

          <Grid
            item
            xl={3.5}
            lg={3.5}
            md={3.5}
            sm={3.5}
            xs={11}
            sx={{
              alignContent: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <FormControl
              fullWidth
              sx={{
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
                  fontSize: [10, 10, 13, 15, 18],
                }}
              >
                RELEVANCIA
              </FormLabel>
              <Grid sx={{ display: "flex", flexDirection: "column" }}>
                <FormControlLabel
                  value={"SI"}
                  label={
                    <Typography
                      sx={{
                        fontSize: [10, 10, 11, 12, 13],
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
                        componentesActividadValues[componenteSelect]
                          .actividades[actividadSelect]?.relevancia === "SI"
                      }
                      onChange={(c) => {
                        let y = [...componentesActividadValues];
                        y[componenteSelect].actividades[
                          actividadSelect
                        ].relevancia = c.target.value;
                        setComponentesActividadValues(y);
                      }}
                    />
                  }
                />
                <FormControlLabel
                  value={"NO"}
                  label={
                    <Typography
                      sx={{
                        fontSize: [10, 10, 11, 12, 13],
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
                        componentesActividadValues[componenteSelect]
                          .actividades[actividadSelect]?.relevancia === "NO"
                      }
                      onChange={(c) => {
                        let y = [...componentesActividadValues];
                        y[componenteSelect].actividades[
                          actividadSelect
                        ].relevancia = c.target.value;
                        setComponentesActividadValues(y);
                      }}
                    />
                  }
                />
              </Grid>
            </FormControl>
          </Grid>

          <Grid
            item
            xl={3.5}
            lg={3.5}
            md={3.5}
            sm={3.5}
            xs={11}
            sx={{
              alignContent: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <FormControl
              fullWidth
              sx={{
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
                  fontSize: [10, 10, 13, 15, 18],
                }}
              >
                ECONOMÍA
              </FormLabel>
              <Grid sx={{ display: "flex", flexDirection: "column" }}>
                <FormControlLabel
                  value={"SI"}
                  label={
                    <Typography
                      sx={{
                        fontSize: [10, 10, 11, 12, 13],
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
                        componentesActividadValues[componenteSelect]
                          .actividades[actividadSelect]?.economia === "SI"
                      }
                      onChange={(c) => {
                        let y = [...componentesActividadValues];
                        y[componenteSelect].actividades[
                          actividadSelect
                        ].economia = c.target.value;
                        setComponentesActividadValues(y);
                      }}
                    />
                  }
                />
                <FormControlLabel
                  value={"NO"}
                  label={
                    <Typography
                      sx={{
                        fontSize: [10, 10, 11, 12, 13],
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
                        componentesActividadValues[componenteSelect]
                          .actividades[actividadSelect]?.economia === "NO"
                      }
                      onChange={(c) => {
                        let y = [...componentesActividadValues];
                        y[componenteSelect].actividades[
                          actividadSelect
                        ].economia = c.target.value;
                        setComponentesActividadValues(y);
                      }}
                    />
                  }
                />
              </Grid>
            </FormControl>
          </Grid>

          <Grid
            item
            xl={3.5}
            lg={3.5}
            md={3.5}
            sm={3.5}
            xs={11}
            sx={{
              alignContent: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <FormControl
              fullWidth
              sx={{
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
                  fontSize: [10, 10, 13, 15, 18],
                }}
              >
                MONITOREABLE
              </FormLabel>
              <Grid sx={{ display: "flex", flexDirection: "column" }}>
                <FormControlLabel
                  value={"SI"}
                  label={
                    <Typography
                      sx={{
                        fontSize: [10, 10, 11, 12, 13],
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
                        componentesActividadValues[componenteSelect]
                          .actividades[actividadSelect]?.monitoreable === "SI"
                      }
                      onChange={(c) => {
                        let y = [...componentesActividadValues];
                        y[componenteSelect].actividades[
                          actividadSelect
                        ].monitoreable = c.target.value;
                        setComponentesActividadValues(y);
                      }}
                    />
                  }
                />
                <FormControlLabel
                  value={"NO"}
                  label={
                    <Typography
                      sx={{
                        fontSize: [10, 10, 11, 12, 13],
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
                        componentesActividadValues[componenteSelect]
                          .actividades[actividadSelect]?.monitoreable === "NO"
                      }
                      onChange={(c) => {
                        let y = [...componentesActividadValues];
                        y[componenteSelect].actividades[
                          actividadSelect
                        ].monitoreable = c.target.value;
                        setComponentesActividadValues(y);
                      }}
                    />
                  }
                />
              </Grid>
            </FormControl>
          </Grid>

          <Grid
            item
            xl={3.5}
            lg={3.5}
            md={3.5}
            sm={3.5}
            xs={11}
            sx={{
              alignContent: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <FormControl
              fullWidth
              sx={{
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
                  fontSize: [10, 10, 13, 15, 18],
                }}
              >
                ADECUADO
              </FormLabel>
              <Grid sx={{ display: "flex", flexDirection: "column" }}>
                <FormControlLabel
                  value={"SI"}
                  label={
                    <Typography
                      sx={{
                        fontSize: [10, 10, 11, 12, 13],
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
                        componentesActividadValues[componenteSelect]
                          .actividades[actividadSelect]?.adecuado === "SI"
                      }
                      onChange={(c) => {
                        let y = [...componentesActividadValues];
                        y[componenteSelect].actividades[
                          actividadSelect
                        ].adecuado = c.target.value;
                        setComponentesActividadValues(y);
                      }}
                    />
                  }
                />
                <FormControlLabel
                  value={"NO"}
                  label={
                    <Typography
                      sx={{
                        fontSize: [10, 10, 11, 12, 13],
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
                        componentesActividadValues[componenteSelect]
                          .actividades[actividadSelect]?.adecuado === "NO"
                      }
                      onChange={(c) => {
                        let y = [...componentesActividadValues];
                        y[componenteSelect].actividades[
                          actividadSelect
                        ].adecuado = c.target.value;
                        setComponentesActividadValues(y);
                      }}
                    />
                  }
                />
              </Grid>
            </FormControl>
          </Grid>

          <Grid
            item
            xl={3.5}
            lg={3.5}
            md={3.5}
            sm={3.5}
            xs={11}
            sx={{
              alignContent: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <FormControl
              fullWidth
              sx={{
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
                  fontSize: [10, 10, 13, 15, 18],
                }}
              >
                APORTE MARGINAL
              </FormLabel>
              <Grid sx={{ display: "flex", flexDirection: "column" }}>
                <FormControlLabel
                  value={"SI"}
                  label={
                    <Typography
                      sx={{
                        fontSize: [10, 10, 11, 12, 13],
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
                        componentesActividadValues[componenteSelect]
                          .actividades[actividadSelect]?.aporte_marginal ===
                        "SI"
                      }
                      onChange={(c) => {
                        let y = [...componentesActividadValues];
                        y[componenteSelect].actividades[
                          actividadSelect
                        ].aporte_marginal = c.target.value;
                        setComponentesActividadValues(y);
                      }}
                    />
                  }
                />
                <FormControlLabel
                  value={"NO"}
                  label={
                    <Typography
                      sx={{
                        fontSize: [10, 10, 11, 12, 13],
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
                        componentesActividadValues[componenteSelect]
                          .actividades[actividadSelect]?.aporte_marginal ===
                        "NO"
                      }
                      onChange={(c) => {
                        let y = [...componentesActividadValues];
                        y[componenteSelect].actividades[
                          actividadSelect
                        ].aporte_marginal = c.target.value;
                        setComponentesActividadValues(y);
                      }}
                    />
                  }
                />
                <FormControlLabel
                  value={"NA"}
                  label={
                    <Typography
                      sx={{
                        fontSize: [10, 10, 11, 12, 13],
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
                        componentesActividadValues[componenteSelect]
                          .actividades[actividadSelect]?.aporte_marginal ===
                        "NA"
                      }
                      onChange={(c) => {
                        let y = [...componentesActividadValues];
                        y[componenteSelect].actividades[
                          actividadSelect
                        ].aporte_marginal = c.target.value;
                        setComponentesActividadValues(y);
                      }}
                    />
                  }
                />
              </Grid>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
