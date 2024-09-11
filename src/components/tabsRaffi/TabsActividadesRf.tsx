import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  Collapse,
  Divider,
  Grid,
  InputLabel,
  List,
  ListItemButton,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { queries } from "../../queries";
import { getValueOperacion } from "../../services/validations";
import { FormulaDialogMA } from "../formulasDialog/FormulaDialogMA";
import { alertaError } from "../genericComponents/Alertas";
import { IComponenteRF, IRFEdit } from "./interfacesRaffi";
import { useTheme } from '@mui/material/styles';

export const TabActividadRf = ({
  edit,
  MIR,
  MA,
  ComponentesRF,
  setRFactividadesPadre,
  raffiboolean,
}: {
  edit: boolean;
  MIR: string;
  MA: string;
  ComponentesRF: IComponenteRF[];
  setRFactividadesPadre: Function;
  raffiboolean: IRFEdit;
}) => {
  const [componentesActividadesValues, setComponentesActividadesValues] =
    useState<Array<IComponenteRF>>(ComponentesRF);

  useEffect(() => {
    setRFactividadesPadre(componentesActividadesValues);
  }, [componentesActividadesValues]);

  const [openFormulaDialog, setOpenFormulaDialog] = useState(false);
  const [tipoFormula, setTipoFormula] = useState("");
  const [elementoFormula, setElementoFormula] = useState("");
  const [componenteSelect, setComponenteSelect] = useState(0);
  const [actividadSelect, setActividadSelect] = useState(0);
  const [index, setIndex] = useState(0);
  const [index2, setIndex2] = useState(0);
  const theme = useTheme();

  const handleClose = () => {
    setOpenFormulaDialog(false);
  };

  const changeFormula = (txt: string) => {
    switch (frecuencia) {
      case "trimestre1":
        componentesActividadesValues[componenteSelect].actividades[
          actividadSelect
        ].metasPorFrecuencia[0].trimestre1 = getValueOperacion(
          txt,
          tipoFormula
        );
        break;
      case "trimestre2":
        componentesActividadesValues[componenteSelect].actividades[
          actividadSelect
        ].metasPorFrecuencia[0].trimestre2 = getValueOperacion(
          txt,
          tipoFormula
        );
        break;
      case "trimestre3":
        componentesActividadesValues[componenteSelect].actividades[
          actividadSelect
        ].metasPorFrecuencia[0].trimestre3 = getValueOperacion(
          txt,
          tipoFormula
        );
        break;
      case "trimestre4":
        componentesActividadesValues[componenteSelect].actividades[
          actividadSelect
        ].metasPorFrecuencia[0].trimestre4 = getValueOperacion(
          txt,
          tipoFormula
        );
        break;

      default:
        alertaError("No aplica");
    }
    setComponentesActividadesValues([...componentesActividadesValues]);
  };
  const [open, setOpen] = useState(0);

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
      "C" + (componenteSelect + 1).toString() + "A" + (actividadSelect + 1).toString()
    );
    setOpenFormulaDialog(true);
  };


  const year = new Date().getFullYear();
  const dateSem = [new Date(year, 5, 30), new Date(year, 11, 31)];
  const dateTrim = [
    new Date(year, 2, 31),
    new Date(year, 5, 30),
    new Date(year, 8, 30),
    new Date(year, 11, 31),
  ];


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
          ...(!isSmallScreen ? { boxShadow: 10, borderRadius: 5 } : {}),
          flexDirection: "column",
          backgroundColor: "#fff",
          overflow: "auto",
        }}
      >
        <FormulaDialogMA
          open={openFormulaDialog}
          close={handleClose}
          textoSet={changeFormula}
          tipo={tipoFormula}
          elemento={elementoFormula}
          elementoA={frecuencia}
          MIR={MIR}
          MA={MA || ""}
          index={index}
          tab={"ACTIVIDADES"}
          index2={index2}
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
              onClick={() => { }}
              fontSize="large"
              sx={{ cursor: "pointer" }}
            ></InfoOutlinedIcon>
          </Tooltip>
          <Typography
            sx={{
              mr: "1vw",
              fontFamily: "MontserratSemiBold",
              fontSize: [10, 10, 10, 13, 15, 18],
            }}
          >
            A{actividadSelect + 1}C{componenteSelect + 1}
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
                [theme.breakpoints.between(587, 769)]: {
                  width: "30vw",
                },
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
                  outline: "px solid slategrey",
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
                          fontSize: [10, 10, 10, 13, 15, 18],
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
                                fontSize: [8, 9, 10, 13, 15, 18],
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
            {/* ############################################################### */}
            <Grid
              item
              container
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              sx={{ display: 'flex', justifyContent: 'center' }}>
              <Grid
                xl={11}
                lg={11}
                md={11}
                sm={11}
                xs={11} sx={{ display: 'flex', justifyContent: 'left' }}>
                <Typography
                  sx={{
                    fontFamily: "MontserratSemiBold",
                    // fontSize: "1vw",
                    textAlign: "center",
                  }}
                >
                  {JSON.parse(MIR).componentes[componenteSelect]?.actividades[
                    actividadSelect]?.resumen}
                </Typography>

              </Grid>

              <Grid
                xl={11}
                lg={11}
                md={11}
                sm={11}
                xs={11}
                sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Grid
                  item
                  xl={5}
                  lg={5}
                  md={5}
                  sm={11}
                  xs={11}
                  sx={{
                    alignContent: "center",
                    display: "flex", flexDirection: 'column',
                    justifyContent: "center", mt: '1vh'
                  }}
                >
                  <InputLabel sx={{ width: '100%' }}>META ANUAL 2023</InputLabel>
                  <TextField
                    disabled={true}
                    fullWidth
                    sx={{ boxShadow: 2, width:'100%' }}
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
                    value={jsonMA?.componentes[componenteSelect]?.metaAnual || ""}
                  />
                </Grid>

                <Grid
                  item
                  xl={5}
                  lg={5}
                  md={5}
                  sm={11}
                  xs={11}
                  sx={{
                    alignContent: "center",
                    display: "flex", flexDirection: 'column',
                    justifyContent: "center", mt: '1vh'
                  }}
                >
                  <InputLabel sx={{ width: '100%' }}> LINEA BASE 2021</InputLabel>
                  <TextField
                    fullWidth
                    disabled={true}
                    sx={{ boxShadow: 2, width:'100%' }}
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
                    value={jsonMA?.componentes[componenteSelect]?.lineaBase || ""}
                  />
                </Grid>
              </Grid>

            </Grid>
            {/* #################################################################### */}

            {isSmallScreen && (
              <List>
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
                          setIndex(index);
                        }}

                        sx={{
                          fontSize: { xs: 8, sm: 13, md: 15, lg: 18 },
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
                                setIndex2(index)
                              }}
                              sx={{
                                fontSize: { xs: 8, sm: 13, md: 15, lg: 18 },
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

            {/* ############################################################### */}
            <Grid
              item
              container
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              sx={{ display: 'flex', justifyContent: 'center' }}>
              <Grid
                xl={11}
                lg={11}
                md={11}
                sm={11}
                xs={11} sx={{ display: 'flex', justifyContent: 'left' }}>
                <Typography
                  sx={{
                    fontFamily: "MontserratSemiBold",
                    // fontSize: "1vw",
                    textAlign: "center",
                  }}
                >
                  METAS
                </Typography>

              </Grid>

              <Grid
                xl={11}
                lg={11}
                md={11}
                sm={11}
                xs={11}
                sx={{ display: 'flex', justifyContent: 'space-between',mt:'1vh' }}>


                <>

                  <Grid
                    item
                    xl={2.5}
                    lg={2.5}
                    md={2.5}
                    sm={11}
                    xs={11}
                    direction={"column"}
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                   
                      <InputLabel sx={{...queries.medium_text,width: '100%'}}>
                        TRIMESTRE 1
                      </InputLabel>
                      <TextField
                        disabled={true}
                        size="small"
                        sx={{ boxShadow: 2,width: '100%' }}
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

                  <Grid
                    item
                    xl={2.5}
                    lg={2.5}
                    md={2.5}
                    sm={11}
                    xs={11}
                    direction={"column"}
                    sx={{
                      //alignContent: "center",
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                      <InputLabel sx={{...queries.medium_text,width: '100%'}}>
                        TRIMESTRE 2
                      </InputLabel>
                      <TextField
                        disabled={true}
                        size="small"
                        sx={{ boxShadow: 2,width: '100%' }}
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

                  <Grid
                    item
                    xl={2.5}
                    lg={2.5}
                    md={2.5}
                    sm={11}
                    xs={11}
                    direction={"column"}
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                      <InputLabel sx={{...queries.medium_text,width: '100%'}}>
                        TRIMESTRE 3
                      </InputLabel>
                      <TextField
                        disabled={true}
                        size="small"
                        sx={{ boxShadow: 2,width: '100%' }}
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

                  <Grid
                    item
                    xl={2.5}
                    lg={2.5}
                    md={2.5}
                    sm={11}
                    xs={11}
                    direction={"column"}
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                      <InputLabel sx={{...queries.medium_text,width: '100%'}}>
                        TRIMESTRE 4
                      </InputLabel>
                      <TextField
                        disabled={true}
                        size="small"
                        sx={{ boxShadow: 2,width: '100%' }}
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

                </>
              </Grid>

            </Grid>
            {/* #################################################################### */}

            {/* ############################################################### */}
            <Grid
              item
              container
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              sx={{ display: 'flex', justifyContent: 'center' }}>
              <Grid
                xl={11}
                lg={11}
                md={11}
                sm={11}
                xs={11} sx={{ display: 'flex', justifyContent: 'left' }}>
                <Typography
                  sx={{
                    fontFamily: "MontserratSemiBold",
                    // fontSize: "1vw",
                    textAlign: "center",
                  }}
                >
                  CAPTURA AVANCE
                </Typography>

              </Grid>

              <Grid
                xl={11}
                lg={11}
                md={11}
                sm={11}
                xs={11}
                sx={{ display: 'flex', justifyContent: 'space-between',mt:'1vh' }}>


                <>

                  <Grid
                    item
                    xl={2.5}
                    lg={2.5}
                    md={2.5}
                    sm={11}
                    xs={11}
                    direction={"column"}
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                   
                      <InputLabel sx={{...queries.medium_text,width: '100%'}}>
                        TRIMESTRE 1
                      </InputLabel>
                      <TextField
                      disabled={localStorage.getItem("Rol") === "Administrador" ? false : ((edit && raffiboolean?.componentes[componenteSelect]?.actividades[actividadSelect].metasPorFrecuencia[0]?.trimestre1) ? false : (edit && !raffiboolean?.componentes[componenteSelect]?.actividades[actividadSelect].metasPorFrecuencia[0]?.trimestre1 || (new Date() > dateTrim[0])))}
                      size="small"
                      sx={{ boxShadow: 2, width:'100%' }}
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
                        componentesActividadesValues[componenteSelect]
                          .actividades[actividadSelect].metasPorFrecuencia[0]
                          ?.trimestre1 || ""
                      }
                    />
                    
                  </Grid>

                  <Grid
                    item
                    xl={2.5}
                    lg={2.5}
                    md={2.5}
                    sm={11}
                    xs={11}
                    direction={"column"}
                    sx={{
                      //alignContent: "center",
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                      <InputLabel sx={{...queries.medium_text,width: '100%'}}>
                        TRIMESTRE 2
                      </InputLabel>
                      <TextField
                      disabled={localStorage.getItem("Rol") === "Administrador" ? false : ((edit && raffiboolean?.componentes[componenteSelect]?.actividades[actividadSelect].metasPorFrecuencia[0]?.trimestre2) ? false : (edit && !raffiboolean?.componentes[componenteSelect]?.actividades[actividadSelect].metasPorFrecuencia[0]?.trimestre2) || !(new Date() < dateTrim[1] && new Date() > dateTrim[0]))}
                      size="small"
                      sx={{ boxShadow: 2, width:'100%' }}
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
                        componentesActividadesValues[componenteSelect]
                          .actividades[actividadSelect].metasPorFrecuencia[0]
                          ?.trimestre2 || ""
                      }
                    />
                  </Grid>

                  <Grid
                    item
                    xl={2.5}
                    lg={2.5}
                    md={2.5}
                    sm={11}
                    xs={11}
                    direction={"column"}
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                      <InputLabel sx={{...queries.medium_text,width: '100%'}}>
                        TRIMESTRE 3
                      </InputLabel>
                      <TextField
                      disabled={localStorage.getItem("Rol") === "Administrador" ? false : (edit && raffiboolean?.componentes[componenteSelect]?.actividades[actividadSelect].metasPorFrecuencia[0]?.trimestre3) ? false : (edit && !raffiboolean?.componentes[componenteSelect]?.actividades[actividadSelect].metasPorFrecuencia[0]?.trimestre3) || !(new Date() < dateTrim[2] && new Date() > dateTrim[1])}
                      size="small"
                      sx={{ boxShadow: 2, width:'100%' }}
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
                        componentesActividadesValues[componenteSelect]
                          .actividades[actividadSelect].metasPorFrecuencia[0]
                          ?.trimestre3 || ""
                      }
                    />
                  </Grid>

                  <Grid
                    item
                    xl={2.5}
                    lg={2.5}
                    md={2.5}
                    sm={11}
                    xs={11}
                    direction={"column"}
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                      <InputLabel sx={{...queries.medium_text,width: '100%'}}>
                        TRIMESTRE 4
                      </InputLabel>
                      <TextField
                      disabled={localStorage.getItem("Rol") === "Administrador" ? false : (edit && raffiboolean?.componentes[componenteSelect]?.actividades[actividadSelect].metasPorFrecuencia[0]?.trimestre4) ? false : (edit && !raffiboolean?.componentes[componenteSelect]?.actividades[actividadSelect].metasPorFrecuencia[0]?.trimestre4) || !(new Date() < dateTrim[3] && new Date() > dateTrim[2])}
                      size="small"
                      sx={{ boxShadow: 2, width:'100%' }}
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
                        componentesActividadesValues[componenteSelect]
                          .actividades[actividadSelect].metasPorFrecuencia[0]
                          ?.trimestre4 || ""
                      }
                    />
                  </Grid>

                </>
              </Grid>

            </Grid>
            {/* #################################################################### */}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
