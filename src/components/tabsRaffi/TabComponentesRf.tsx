import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
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
import { FormulaDialogMA } from "../formulasDialog/FormulaDialogMA";
//import { FormulaDialogRF } from "../formulasDialog/FormulaDialogRF";
import { queries } from "../../queries";
import { alertaError } from "../genericComponents/Alertas";
import { IMIR } from "../tabsMir/interfaces mir/IMIR";
import { IComponenteRF, IRFEdit } from "./interfacesRaffi";
import { getValueOperacion } from "../../services/validations";

export const TabComponenteRf = ({
  edit,
  MIR,
  MA,
  RF,
  showMirFnc,
  setTxtShowFnc,
  setRFcomponentesPadre,
  ComponentesRF,
  raffiboolean,
}: {
  edit:boolean;
  MA: string;
  MIR: string;
  RF: string;
  setRFcomponentesPadre: Function;
  ComponentesRF: IComponenteRF[];
  showMirFnc: Function;
  setTxtShowFnc: Function;
  raffiboolean: IRFEdit;

  //
}) => {
  let encabezado = JSON.parse(MIR).encabezado;
  const [componentSelect, setComponentSelect] = useState(0);

  const [openFormulaDialog, setOpenFormulaDialog] = useState(false);
  const [prevTextFormula, setPrevTextFormula] = useState("");
  const [tipoFormula, setTipoFormula] = useState("");
  const [elementoFormula, setElementoFormula] = useState("");
  const [errorIndicador, setErrorIndicador] = useState(-1);

  const [frecuencia, setFrecuencia] = useState("");

  const handleClickOpen = (frecuencia: string) => {
    setFrecuencia(frecuencia);
    setTipoFormula(
      JSON.parse(MIR)
        .componentes[componentSelect].indicador.toUpperCase()
        .includes("PORCENTAJE") ||
        JSON.parse(MIR)
          .componentes[componentSelect].indicador.toUpperCase()
          .includes("PORCENTAJE")
        ? "Porcentaje"
        : JSON.parse(MIR)
            .componentes[componentSelect].indicador.toUpperCase()
            .includes("TASA") ||
          JSON.parse(MIR)
            .componentes[componentSelect].indicador.toUpperCase()
            .includes("TASA")
        ? "Tasa"
        : JSON.parse(MIR)
            .componentes[componentSelect].indicador.toUpperCase()
            .includes("INDICE" || "ÍNDICE") ||
          JSON.parse(MIR)
            .componentes[componentSelect].indicador.toUpperCase()
            .includes("INDICE") ||
          JSON.parse(MIR)
            .componentes[componentSelect].indicador.toUpperCase()
            .includes("ÍNDICE")
        ? "Índice"
        : JSON.parse(MIR)
            .componentes[componentSelect].indicador.toUpperCase()
            .includes("PROMEDIO") ||
          JSON.parse(MIR)
            .componentes[componentSelect].indicador.toUpperCase()
            .includes("PROMEDIO")
        ? "Promedio"
        : ""
    );
    setElementoFormula("Componente " + componentSelect.toString());
    setOpenFormulaDialog(true);
  };

  const handleClose = () => {
    setOpenFormulaDialog(false);
  };

  const [componentesValues, setComponentesValues] =
    useState<Array<IComponenteRF>>(ComponentesRF);

  let jsonMA =
    MA === ""
      ? ""
      : JSON.parse(MA).length > 1
      ? JSON.parse(MA)[0]
      : JSON.parse(MA);

  let jsonMIR: IMIR =
    MIR === ""
      ? ""
      : JSON.parse(MIR).length > 1
      ? JSON.parse(MIR)[0]
      : JSON.parse(MIR);

  let jsonRF = RF === "" ? "" : JSON.parse(RF);

  useEffect(() => {
    setRFcomponentesPadre(componentesValues);
    //setComponentes(componentesValues);
  }, [componentesValues]);

  

  const changeFormula = (txt: string) => {
    console.log("txt: ", txt);

    switch (frecuencia) {
      case "semestre1":
        componentesValues[componentSelect].metasPorFrecuencia[0].semestre1 =
        getValueOperacion(txt, tipoFormula);
        componentesValues[componentSelect].numeradorPorFrecuencia[0].semestre1 =
          txt.split(",")[0];
        break;
      case "semestre2":
        componentesValues[componentSelect].metasPorFrecuencia[0].semestre2 =
       getValueOperacion(txt, tipoFormula);
        componentesValues[componentSelect].numeradorPorFrecuencia[0].semestre2 =
          txt.split(",")[0];
        break;
      case "trimestre1":
        componentesValues[componentSelect].metasPorFrecuencia[0].trimestre1 =
       getValueOperacion(txt, tipoFormula);
        // componentesActividadesValues[
        componentesValues[
          componentSelect
        ].numeradorPorFrecuencia[0].trimestre1 = txt.split(",")[0];
        componentesValues[
          componentSelect
        ].denominadorPorFrecuencia[0].trimestre1 = txt.split(",")[1];
        break;
      case "trimestre2":
        componentesValues[componentSelect].metasPorFrecuencia[0].trimestre2 =
       getValueOperacion(txt, tipoFormula);
        // componentesActividadesValues[
        componentesValues[
          componentSelect
        ].numeradorPorFrecuencia[0].trimestre2 = txt.split(",")[0];
        componentesValues[
          componentSelect
        ].denominadorPorFrecuencia[0].trimestre2 = txt.split(",")[1];
        break;
      case "trimestre3":
        componentesValues[componentSelect].metasPorFrecuencia[0].trimestre3 =
       getValueOperacion(txt, tipoFormula);
        // componentesActividadesValues[
        componentesValues[
          componentSelect
        ].numeradorPorFrecuencia[0].trimestre3 = txt.split(",")[0];
        componentesValues[
          componentSelect
        ].denominadorPorFrecuencia[0].trimestre3 = txt.split(",")[1];
        break;
      case "trimestre4":
        componentesValues[componentSelect].metasPorFrecuencia[0].trimestre4 =
       getValueOperacion(txt, tipoFormula);
        // componentesActividadesValues[
        componentesValues[
          componentSelect
        ].numeradorPorFrecuencia[0].trimestre4 = txt.split(",")[0];
        componentesValues[
          componentSelect
        ].denominadorPorFrecuencia[0].trimestre4 = txt.split(",")[1];
        break;

      default:
        alertaError("No aplica");
    }

    setComponentesValues([...componentesValues]);
    console.log("componentesValues-changeformula: ", componentesValues);
  };

  // useEffect(() => {
  //   setComponentesValues(componentesRF);
  // }, []);

  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  return (
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
      {/* <FormulaDialogRF
        open={openFormulaDialog}
        close={handleClose}
        textoSet={changeFormula}
        tipo={tipoFormula}
        elemento={"Componente " + (componentSelect + 1).toString()}
        dato={elementoFormula}
        MIR={MIR}
      /> */}

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
        <Tooltip title="RESUMEN COMPONENTE">
          <InfoOutlinedIcon
            onClick={() => {
              showMirFnc(true);
              setTxtShowFnc("Componentes");
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
          COMPONENTE {componentSelect + 1}
        </Typography>
      </Grid>

      {/* COLUMNA IZQUIERDA QUE MUESTRA LOS COMPONENTES */}
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
            {componentesValues.map((item, index) => {
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
                    selected={index === componentSelect ? true : false}
                    key={index}
                    onClick={() => {
                      setComponentSelect(index);
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
                  </ListItemButton>

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
              {componentesValues.map((item, index) => {
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
                      selected={index === componentSelect ? true : false}
                      key={index}
                      onClick={() => {
                        setComponentSelect(index);
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
                    </ListItemButton>

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
              // value={componentesValues[componentSelect ]?.metaAnual || ""}
              value={jsonMA?.componentes[componentSelect]?.metaAnual || ""}
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
              // value={componentesValues[componentSelect ]?.lineaBase || ""}
              value={jsonMA?.componentes[componentSelect]?.lineaBase || ""}
            />
          </Grid>

          {jsonMIR?.componentes[componentSelect]?.frecuencia === "SEMESTRAL" ? (
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
                  xl={5}
                  lg={12}
                  md={12}
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
                    <InputLabel sx={queries.medium_text}>SEMESTRE 1</InputLabel>
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
                        jsonMA?.componentes[componentSelect]
                          ?.metasPorFrecuencia[0]?.semestre1
                      }
                    />
                  </Grid>
                </Grid>

                <Grid
                  item
                  xl={5}
                  lg={12}
                  md={12}
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
                    <InputLabel sx={queries.medium_text}>SEMESTRE 2</InputLabel>
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
                        jsonMA?.componentes[componentSelect]
                          ?.metasPorFrecuencia[0]?.semestre2
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            // si es vacio se muestra el primero

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
                        jsonMA?.componentes[componentSelect]
                          ?.metasPorFrecuencia[0]?.trimestre1
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
                        jsonMA?.componentes[componentSelect]
                          ?.metasPorFrecuencia[0]?.trimestre2
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
                        jsonMA?.componentes[componentSelect]
                          ?.metasPorFrecuencia[0]?.trimestre3
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
                        jsonMA?.componentes[componentSelect]
                          ?.metasPorFrecuencia[0]?.trimestre4
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}

          {jsonMIR?.componentes[componentSelect]?.frecuencia === "SEMESTRAL" ? (
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
                  xl={5}
                  lg={12}
                  md={12}
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
                    <InputLabel sx={queries.medium_text}>SEMESTRE 1</InputLabel>
                  </Grid>

                  <Grid item>
                    <TextField
                      //fullWidth
                      disabled={edit && raffiboolean?.componentes[componentSelect]?.metasPorFrecuencia[0]?.semestre1}
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
                      // label={
                      //   "SEMESTRE 1"
                      // }
                      onClick={() => handleClickOpen("semestre1")}
                      value={
                        // jsonMA?.componentes[componentSelect]
                        //   ?.metasPorFrecuencia[0]?.semestre1
                        componentesValues[componentSelect].metasPorFrecuencia[0]
                          ?.semestre1 || ""
                      }
                    />
                  </Grid>
                </Grid>

                <Grid
                  item
                  xl={5}
                  lg={12}
                  md={12}
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
                    <InputLabel sx={queries.medium_text}>SEMESTRE 2</InputLabel>
                  </Grid>

                  <Grid item>
                    <TextField
                      //fullWidth
                      disabled={edit && raffiboolean?.componentes[componentSelect]?.metasPorFrecuencia[0]?.semestre2}
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
                      onClick={() => handleClickOpen("semestre2")}
                      value={
                        componentesValues[componentSelect].metasPorFrecuencia[0]
                          ?.semestre2 || ""
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ) : (
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
                      disabled={edit && raffiboolean?.componentes[componentSelect]?.metasPorFrecuencia[0]?.trimestre1}
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
                        // jsonMA?.componentes[componentSelect]
                        //   ?.metasPorFrecuencia[0]?.semestre1
                        componentesValues[componentSelect].metasPorFrecuencia[0]
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
                      disabled={edit && raffiboolean?.componentes[componentSelect]?.metasPorFrecuencia[0]?.trimestre2}
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
                        // jsonMA?.componentes[componentSelect]
                        //   ?.metasPorFrecuencia[0]?.semestre1
                        componentesValues[componentSelect].metasPorFrecuencia[0]
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
                      disabled={edit && raffiboolean?.componentes[componentSelect]?.metasPorFrecuencia[0]?.trimestre3}
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
                        // jsonMA?.componentes[componentSelect]
                        //   ?.metasPorFrecuencia[0]?.semestre1
                        componentesValues[componentSelect].metasPorFrecuencia[0]
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
                      disabled={edit && raffiboolean?.componentes[componentSelect]?.metasPorFrecuencia[0]?.trimestre4}
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
                        // jsonMA?.componentes[componentSelect]
                        //   ?.metasPorFrecuencia[0]?.semestre1
                        componentesValues[componentSelect].metasPorFrecuencia[0]
                          ?.trimestre4 || ""
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};
