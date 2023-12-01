import {
  Grid,
  TextField,
  ListItemButton,
  Typography,
  Divider,
  List,
  Box,
  Paper,
  styled,
  Collapse,
  Tooltip,
  InputLabel,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { FormulaDialogMA } from "../formulasDialog/FormulaDialogMA";
import { IComponenteRF, IFrecuencias } from "./interfacesRaffi";
import { IComponenteActividad, IMIR } from "../tabsMir/interfaces mir/IMIR";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { queries } from "../../queries";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { FormulaDialogRF } from "../formulasDialog/FormulaDialogRF";
import { IRFEdit } from "./interfacesRaffi";
import { alertaError } from "../genericComponents/Alertas";

export const TabActividadRf = ({
  MIR,
  MA,
  RF,
  componentes,
  asignarCValor,
  compAct,
  valoresComponenteRFFnc,
  ComponentesRF,
  setRFactividadesPadre,
  showMirFnc,
  setTxtShowFnc,
  raffiboolean,
}: {
  MA: string;
  MIR: string;
  RF: string;
  componentes: number[];
  asignarCValor: Function;
  compAct: Array<IComponenteActividad>;
  valoresComponenteRFFnc: Function;
  setRFactividadesPadre: Function;
  ComponentesRF: IComponenteRF[];
  showMirFnc: Function;
  setTxtShowFnc: Function;
  raffiboolean: IRFEdit;
}) => {
  const componenteActividad = [
    {
      componentes: componentes.map((x) => compAct),
    },
  ];

  const [componentesActividadesValues, setComponentesActividadesValues] =
    useState<Array<IComponenteRF>>(ComponentesRF);

  useEffect(() => {
    setRFactividadesPadre(componentesActividadesValues);
    //setComponentes(componentesActividadesValues);
  }, [componentesActividadesValues]);

  // const [componentesValuesRF, setComponentesValuesRF] = useState<
  //   Array<ICValorRF>
  // >([]);

  const [openFormulaDialog, setOpenFormulaDialog] = useState(false);
  const [tipoFormula, setTipoFormula] = useState("");
  const [elementoFormula, setElementoFormula] = useState("");
  const [componenteSelect, setComponenteSelect] = useState(0);
  const [actividadSelect, setActividadSelect] = useState(0);
  const [errorIndicador, setErrorIndicador] = useState(-1);
  const handleClose = () => {
    setOpenFormulaDialog(false);
  };
  function mapeaindice(c = 0, a = 0) {
    let x = 0;
    //Componente 1
    c == 0 && a == 0
      ? (x = 0)
      : c == 0 && a == 1
      ? (x = 1)
      : c == 1 && a == 0
      ? (x = 2)
      : (x = 3);

    return x;
  }

  const changeFormula = (txt: string) => {
    console.log("txt: ", txt);

    switch (frecuencia) {
      case "trimestre1":
        componentesActividadesValues[componenteSelect].actividades[
          actividadSelect
        ].metasPorFrecuencia[0].trimestre1 = txt.split(",")[2];
        // componentesActividadesValues[
        //   componenteSelect
        // ].actividades[actividadSelect].metasPorFrecuencia[0].trimestre1 = txt.split(",")[0];
        // componentesActividadesValues[
        //   componenteSelect
        // ].actividades[actividadSelect].metasPorFrecuencia[0].trimestre1 = txt.split(",")[1];
        break;
      case "trimestre2":
        componentesActividadesValues[componenteSelect].actividades[
          actividadSelect
        ].metasPorFrecuencia[0].trimestre2 = txt.split(",")[2];
        // componentesActividadesValues[
        //   componenteSelect
        // ].actividades[actividadSelect].metasPorFrecuencia[0].trimestre2 = txt.split(",")[0];
        // componentesActividadesValues[
        //   componenteSelect
        // ].actividades[actividadSelect].metasPorFrecuencia[0].trimestre2 = txt.split(",")[1];
        break;
      case "trimestre3":
        componentesActividadesValues[componenteSelect].actividades[
          actividadSelect
        ].metasPorFrecuencia[0].trimestre3 = txt.split(",")[2];
        // componentesActividadesValues[
        //   componenteSelect
        // ].actividades[actividadSelect].metasPorFrecuencia[0].trimestre3 = txt.split(",")[0];
        // componentesActividadesValues[
        //   componenteSelect
        // ].actividades[actividadSelect].metasPorFrecuencia[0].trimestre3 = txt.split(",")[1];
        break;
      case "trimestre4":
        componentesActividadesValues[componenteSelect].actividades[
          actividadSelect
        ].metasPorFrecuencia[0].trimestre4 = txt.split(",")[2];
        // componentesActividadesValues[
        //   componenteSelect
        // ].actividades[actividadSelect].metasPorFrecuencia[0].trimestre4 = txt.split(",")[0];
        // componentesActividadesValues[
        //   componenteSelect
        // ].actividades[actividadSelect].metasPorFrecuencia[0].trimestre4 = txt.split(",")[1];
        break;

      default:
        alertaError("No aplica");
    }
    setComponentesActividadesValues([...componentesActividadesValues]);
  };
  const [open, setOpen] = useState(0);

  const handleClickComponente = (index: number) => {
    setOpen(index);
  };

  // const handleClickOpen = () => {
  //   //setPrevTextFormula("Porcentaje");
  //   setOpenFormulaDialog(true);
  // };

  const [frecuencia, setFrecuencia] = useState("");

  const handleClickOpen = (frecuencia: string) => {
    setFrecuencia(frecuencia);

    setTipoFormula(
      JSON.parse(MIR)
        .componentes[componenteSelect].actividades[
          actividadSelect
        ].indicador.toUpperCase()
        .includes("PORCENTAJE") ||
        JSON.parse(MIR)
          .componentes[componenteSelect].actividades[
            actividadSelect
          ].indicador.toUpperCase()
          .includes("PORCENTAJE")
        ? "Porcentaje"
        : JSON.parse(MIR)
            .componentes[componenteSelect].actividades[
              actividadSelect
            ].indicador.toUpperCase()
            .includes("TASA") ||
          JSON.parse(MIR)
            .componentes[componenteSelect].actividades[
              actividadSelect
            ].indicador.toUpperCase()
            .includes("TASA")
        ? "Tasa"
        : JSON.parse(MIR)
            .componentes[componenteSelect].actividades[
              actividadSelect
            ].indicador.toUpperCase()
            .includes("INDICE" || "ÍNDICE") ||
          JSON.parse(MIR)
            .componentes[componenteSelect].actividades[
              actividadSelect
            ].indicador.toUpperCase()
            .includes("INDICE") ||
          JSON.parse(MIR)
            .componentes[componenteSelect].actividades[
              actividadSelect
            ].indicador.toUpperCase()
            .includes("ÍNDICE")
        ? "Índice"
        : JSON.parse(MIR)
            .componentes[componenteSelect].actividades[
              actividadSelect
            ].indicador.toUpperCase()
            .includes("PROMEDIO") ||
          JSON.parse(MIR)
            .componentes[componenteSelect].actividades[
              actividadSelect
            ].indicador.toUpperCase()
            .includes("PROMEDIO")
        ? "Promedio"
        : ""
    );
    setElementoFormula(
      "C" +
        (componenteSelect + 1).toString() +
        "A" +
        (actividadSelect + 1).toString()
    );
    setOpenFormulaDialog(true);
  };

  let jsonMIR =
    MIR === ""
      ? ""
      : JSON.parse(MIR).length > 1
      ? JSON.parse(MIR)[0]
      : JSON.parse(MIR);

  let jsonMA =
    MA === ""
      ? ""
      : JSON.parse(MA).length > 1
      ? JSON.parse(MA)[0]
      : JSON.parse(MA);

  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  return (
    <>
      <Grid
        sx={{
          display: "flex",
          width: "93vw",
          height: ["90vh", "82vh", "82vh", "82vh", "82vh"],
          boxShadow: 10,
          borderRadius: 5,
          flexDirection: "column",
          backgroundColor: "#fff",
          // justifyContent: "center",
          // alignItems: "center",
        }}
      >
        <FormulaDialogMA
          open={openFormulaDialog}
          close={handleClose}
          textoSet={changeFormula}
          tipo={tipoFormula}
          elemento={elementoFormula}
          elementoA={""}
          MIR={MIR}
        />

        <Grid
          sx={{
            width: "100%",
            display: "flex",
            height: "7vh",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Tooltip title="RESUMEN ACTIVIDAD">
            <InfoOutlinedIcon
              onClick={() => {
                showMirFnc(true);
                setTxtShowFnc("Actividades");
              }}
              fontSize="large"
              sx={{ cursor: "pointer" }}
            ></InfoOutlinedIcon>
          </Tooltip>
          <Typography
            sx={{
              mr: "1vw",
              fontFamily: "MontserratSemiBold",
              fontSize: "1.5vw",
            }}
          >
            COMPONENTE #{componenteSelect + 1} - ACTIVIDAD #{" "}
            {actividadSelect + 1}
          </Typography>
        </Grid>
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
              {componentesActividadesValues.map((componente, index) => {
                return (
                  <Grid
                    key={index}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Divider />
                    <ListItemButton
                      selected={index === componenteSelect ? true : false}
                      key={index}
                      onClick={() => {
                        setComponenteSelect(index);
                        setOpen(index);
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
                          fontSize: "0.7vw",
                        }}
                      >
                        COMPONENTE {index + 1}
                      </Typography>
                      {open === index ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>

                    <Collapse in={open === index} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {componente.actividades.map((actividad, index) => (
                          <ListItemButton
                            selected={index === actividadSelect ? true : false}
                            key={index}
                            onClick={() => {
                              setActividadSelect(index);
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
                                //  fontSize: "1vw",
                                fontFamily: "MontserratMedium",
                              }}
                            >
                              ACTIVIDAD {index + 1}
                            </Typography>
                          </ListItemButton>
                        ))}
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
                {componentesActividadesValues.map((componente, index) => {
                  return (
                    <Grid
                      key={index}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <Divider />
                      <ListItemButton
                        selected={index === componenteSelect ? true : false}
                        key={index}
                        onClick={() => {
                          setComponenteSelect(index);
                          setOpen(index);
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
                            fontSize: "0.7vw",
                          }}
                        >
                          COMPONENTE {index + 1}
                        </Typography>
                        {open === index ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>

                      <Collapse
                        in={open === index}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List component="div" disablePadding>
                          {componente.actividades.map((actividad, index) => (
                            <ListItemButton
                              selected={
                                index === actividadSelect ? true : false
                              }
                              key={index}
                              onClick={() => {
                                setActividadSelect(index);
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
                                  //  fontSize: "1vw",
                                  fontFamily: "MontserratMedium",
                                }}
                              >
                                ACTIVIDAD {index + 1}
                              </Typography>
                            </ListItemButton>
                          ))}
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
              xl={3}
              lg={3}
              md={2}
              sm={2}
              xs={12}
              sx={{
                alignContent: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <TextField
                disabled={true}
                fullWidth
                sx={{ boxShadow: 2 }}
                variant={"filled"}
                label={
                  <Typography
                    sx={{
                      fontSize: [10, 10, 10, 15, 15, 18],
                      fontFamily: "MontserratMedium",
                    }}
                  >
                    META ANUAL 2023
                  </Typography>
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
                // value={componentesActividadesValues[componenteSelect ]?.metaAnual || ""}
                value={jsonMA?.componentes[componenteSelect]?.metaAnual || ""}
              />
            </Grid>

            <Grid
              item
              xl={3}
              lg={3}
              md={2}
              sm={2}
              xs={12}
              sx={{
                alignContent: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <TextField
                fullWidth
                disabled={true}
                sx={{ boxShadow: 2 }}
                variant={"filled"}
                label={
                  <Typography
                    sx={{
                      fontSize: [10, 10, 10, 15, 15, 18],
                      fontFamily: "MontserratMedium",
                    }}
                  >
                    LINEA BASE 2021
                  </Typography>
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
                // value={componentesActividadesValues[componenteSelect ]?.lineaBase || ""}
                value={jsonMA?.componentes[componenteSelect]?.lineaBase || ""}
              />
            </Grid>

            <Grid
              container
              direction={"row"}
              // xl={12}
              // lg={12}
              // md={12}
              // sm={12}
              // xs={12}
              // sx={{
              //   alignContent: "center",
              //   display: "flex",
              //   justifyContent: "center",
              // }}
            >
              <Grid
                container
                item
                direction={"row"}
                sx={{
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
                gap={2}
              >
                <Grid
                  item
                  xl={2.5}
                  lg={2.5}
                  md={2.5}
                  sm={12}
                  xs={12}
                  direction={"column"}
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <Grid item>
                    <InputLabel sx={queries.medium_text}>
                      TRIMESTRE 1
                    </InputLabel>
                  </Grid>

                  <Grid item>
                    <TextField
                      //fullWidth
                      disabled={true}
                      size="small"
                      sx={{ boxShadow: 2 }}
                      variant={"filled"}
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
                      value={
                        jsonMA?.componentes[componenteSelect]?.actividades[
                          actividadSelect
                        ]?.metasPorFrecuencia[0]?.trimestre1
                      }
                    />
                  </Grid>
                </Grid>

                <Grid
                  item
                  xl={2.5}
                  lg={2.5}
                  md={2.5}
                  sm={12}
                  xs={12}
                  direction={"column"}
                  sx={{
                    //alignContent: "center",
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <Grid item>
                    <InputLabel sx={queries.medium_text}>
                      TRIMESTRE 2
                    </InputLabel>
                  </Grid>

                  <Grid item>
                    <TextField
                      //fullWidth
                      disabled={true}
                      size="small"
                      sx={{ boxShadow: 2 }}
                      variant={"filled"}
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
                      value={
                        jsonMA?.componentes[componenteSelect]?.actividades[
                          actividadSelect
                        ]?.metasPorFrecuencia[0]?.trimestre2
                      }
                    />
                  </Grid>
                </Grid>

                <Grid
                  item
                  xl={2.5}
                  lg={2.5}
                  md={2.5}
                  sm={12}
                  xs={12}
                  direction={"column"}
                  sx={{
                    //alignContent: "center",
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <Grid item>
                    <InputLabel sx={queries.medium_text}>
                      TRIMESTRE 3
                    </InputLabel>
                  </Grid>

                  <Grid item>
                    <TextField
                      //fullWidth
                      disabled={true}
                      size="small"
                      sx={{ boxShadow: 2 }}
                      variant={"filled"}
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
                      value={
                        jsonMA?.componentes[componenteSelect]?.actividades[
                          actividadSelect
                        ]?.metasPorFrecuencia[0]?.trimestre3
                      }
                    />
                  </Grid>
                </Grid>

                <Grid
                  item
                  xl={2.5}
                  lg={2.5}
                  md={2.5}
                  sm={12}
                  xs={12}
                  direction={"column"}
                  sx={{
                    //alignContent: "center",
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <Grid item>
                    <InputLabel sx={queries.medium_text}>
                      TRIMESTRE 4
                    </InputLabel>
                  </Grid>

                  <Grid item>
                    <TextField
                      //fullWidth
                      disabled={true}
                      size="small"
                      sx={{ boxShadow: 2 }}
                      variant={"filled"}
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
                      value={
                        jsonMA?.componentes[componenteSelect]?.actividades[
                          actividadSelect
                        ]?.metasPorFrecuencia[0]?.trimestre4
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              container
              direction={"row"}
              // xl={12}
              // lg={12}
              // md={12}
              // sm={12}
              // xs={12}
              // sx={{
              //   alignContent: "center",
              //   display: "flex",
              //   justifyContent: "center",
              // }}
            >
              <Grid
                container
                item
                direction={"row"}
                sx={{
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
                gap={2}
              >
                <Grid
                  item
                  xl={2.5}
                  lg={2.5}
                  md={2.5}
                  sm={12}
                  xs={12}
                  direction={"column"}
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <Grid item>
                    <InputLabel sx={queries.medium_text}>
                      TRIMESTRE 1
                    </InputLabel>
                  </Grid>

                  <Grid item>
                    {/* {JSON.stringify(componentesActividadesValues)}; */}
                    <TextField
                      //fullWidth

                      size="small"
                      sx={{ boxShadow: 2 }}
                      variant={"filled"}
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
                      onClick={() => handleClickOpen("trimestre1")}
                      value={
                        // jsonMA?.componentes[componenteSelect]
                        //   ?.metasPorFrecuencia[0]?.semestre1
                        componentesActividadesValues[componenteSelect]
                          .actividades[actividadSelect].metasPorFrecuencia[0]
                          ?.trimestre1 || ""
                      }
                    />
                  </Grid>
                </Grid>

                <Grid
                  item
                  xl={2.5}
                  lg={2.5}
                  md={2.5}
                  sm={12}
                  xs={12}
                  direction={"column"}
                  sx={{
                    //alignContent: "center",
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <Grid item>
                    <InputLabel sx={queries.medium_text}>
                      TRIMESTRE 2
                    </InputLabel>
                  </Grid>

                  <Grid item>
                    <TextField
                      //fullWidth

                      size="small"
                      sx={{ boxShadow: 2 }}
                      variant={"filled"}
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
                      onClick={() => handleClickOpen("trimestre2")}
                      value={
                        // jsonMA?.componentes[componenteSelect]
                        //   ?.metasPorFrecuencia[0]?.semestre1
                        componentesActividadesValues[componenteSelect]
                          .actividades[actividadSelect].metasPorFrecuencia[0]
                          ?.trimestre2 || ""
                      }
                    />
                  </Grid>
                </Grid>

                <Grid
                  item
                  xl={2.5}
                  lg={2.5}
                  md={2.5}
                  sm={12}
                  xs={12}
                  direction={"column"}
                  sx={{
                    //alignContent: "center",
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <Grid item>
                    <InputLabel sx={queries.medium_text}>
                      TRIMESTRE 3
                    </InputLabel>
                  </Grid>

                  <Grid item>
                    <TextField
                      //fullWidth

                      size="small"
                      sx={{ boxShadow: 2 }}
                      variant={"filled"}
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
                      onClick={() => handleClickOpen("trimestre3")}
                      value={
                        // jsonMA?.componentes[componenteSelect]
                        //   ?.metasPorFrecuencia[0]?.semestre1
                        componentesActividadesValues[componenteSelect]
                          .actividades[actividadSelect].metasPorFrecuencia[0]
                          ?.trimestre3 || ""
                      }
                    />
                  </Grid>
                </Grid>
                <Grid
                  item
                  xl={2.5}
                  lg={2.5}
                  md={2.5}
                  sm={12}
                  xs={12}
                  direction={"column"}
                  sx={{
                    //alignContent: "center",
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <Grid item>
                    <InputLabel sx={queries.medium_text}>
                      TRIMESTRE 4
                    </InputLabel>
                  </Grid>

                  <Grid item>
                    <TextField
                      //fullWidth

                      size="small"
                      sx={{ boxShadow: 2 }}
                      variant={"filled"}
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
                      onClick={() => handleClickOpen("trimestre4")}
                      value={
                        // jsonMA?.componentes[componenteSelect]
                        //   ?.metasPorFrecuencia[0]?.semestre1
                        componentesActividadesValues[componenteSelect]
                          .actividades[actividadSelect].metasPorFrecuencia[0]
                          ?.trimestre4 || ""
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
// function setAIactividadesPadre(componentesActividadesValues: IComponenteRF[]) {
//   throw new Error("Function not implemented.");
// }
