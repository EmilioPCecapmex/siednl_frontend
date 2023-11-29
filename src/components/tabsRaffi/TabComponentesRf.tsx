import {
  TextField,
  ListItemButton,
  Typography,
  Divider,
  List,
  Grid,
  Paper,
  styled,
  Tooltip,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useEffect, useState } from "react";
import { IComponente } from "../tabsMetaAnual/IComponente";
import { ClassNames } from "@emotion/react";
import { FormulaDialogRF } from "../formulasDialog/FormulaDialogRF";
import { IComponenteRF, IFrecuencias } from "./interfacesRaffi";

const dateSem = [new Date("2023-06-30"), new Date("2023-12-31")];
const dateTrim = [
  new Date("2023-03-31"),
  new Date("2023-06-30"),
  new Date("2023-09-30"),
  new Date("2023-12-31"),
];

export const TabComponenteRf = ({
  MIR,
  MA,
  RF,
  showMirFnc,
  setTxtShowFnc,
  setAIcomponentesPadre,
  ComponentesRF,
}: {
  MA: string;
  MIR: string;
  RF: string;
  setAIcomponentesPadre: Function;
  ComponentesRF: IComponenteRF[];
  showMirFnc: Function;
  setTxtShowFnc: Function;

  //
}) => {
  let encabezado = JSON.parse(MIR).encabezado;
  const [componentSelect, setComponentSelect] = useState(0);

  const [openFormulaDialog, setOpenFormulaDialog] = useState(false);
  const [prevTextFormula, setPrevTextFormula] = useState("");
  const [tipoFormula, setTipoFormula] = useState("");
  const [elementoFormula, setElementoFormula] = useState("");
  const [errorIndicador, setErrorIndicador] = useState(-1);
  const handleClickOpen = () => {
    //setPrevTextFormula("Porcentaje");
    setOpenFormulaDialog(true);
  };

  const evalueTxtIndicador = (dato: string) => {
    const cIndicador =
      jsonMIR.componentes[componentSelect].indicador?.toLowerCase();
    if (cIndicador !== undefined) {
      if (cIndicador.includes("porcentaje")) {
        setTipoFormula("Porcentaje");
        setElementoFormula(dato);
        handleClickOpen();
        setErrorIndicador(-1);
      } else if (cIndicador.includes("tasa")) {
        setTipoFormula("Tasa");
        setElementoFormula(dato);
        handleClickOpen();
        setErrorIndicador(-1);
      } else if (cIndicador.includes("indice" || "índice")) {
        setTipoFormula("Índice");
        setElementoFormula(dato);
        handleClickOpen();
        setErrorIndicador(-1);
      } else if (cIndicador.includes("promedio")) {
        setTipoFormula("Promedio");
        setElementoFormula(dato);
        handleClickOpen();
        setErrorIndicador(-1);
      } else {
        setErrorIndicador(componentSelect);
        let prevLocal = [...jsonRF.componentes];
        prevLocal[componentSelect].indicador = "";
        setComponentesValues(prevLocal);
      }
    }
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

  let jsonMIR =
    MIR === ""
      ? ""
      : JSON.parse(MIR).length > 1
      ? JSON.parse(MIR)[0]
      : JSON.parse(MIR);

  let jsonRF = RF === "" ? "" : JSON.parse(RF);

  // useEffect(() => {
  //   let comp: IComponenteRF[] = [];

  //   noComponentes.map((x, index) => {
  //     return comp.push({
  //       componentes: "C" + (index + 1),
  //       metasPorFrecuencia: [
  //         {
  //           semestre1: "",
  //           semestre2: "",
  //           trimestre1: "",
  //           trimestre2: "",
  //           trimestre3: "",
  //           trimestre4: "",
  //         },
  //       ],
  //       numeradorPorFrecuencia: [
  //         {
  //           semestre1: "",
  //           semestre2: "",
  //           trimestre1: "",
  //           trimestre2: "",
  //           trimestre3: "",
  //           trimestre4: "",
  //         },
  //       ],
  //       denominadorPorFrecuencia: [
  //         {
  //           semestre1: "",
  //           semestre2: "",
  //           trimestre1: "",
  //           trimestre2: "",
  //           trimestre3: "",
  //           trimestre4: "",
  //         },
  //       ],
  //     });
  //   });

  //   setComponentesValues(comp);
  //   setComponentes(comp);
  // }, [noComponentes]);

  // useEffect(() => {
  //   valoresComponenteRFFnc(componentesValues);
  //   setComponentes(componentesValues);
  // }, [componentesValues]);

  const changeFormula = (txt: string) => {
    if (
      JSON.parse(MIR)
        .componentes[componentSelect].indicador.toLowerCase()
        .includes("indice") ||
      JSON.parse(MIR)
        .componentes[componentSelect].indicador.toLowerCase()
        .includes("índice")
    ) {
      componentesValues[componentSelect].numeradorPorFrecuencia[0].trimestre2 =
        txt;
      componentesValues[componentSelect].metasPorFrecuencia[0].trimestre2 = txt;
    } else {
      let frec = txt.split(",")[3];

      componentesValues[componentSelect].numeradorPorFrecuencia[0][
        frec as keyof IFrecuencias
      ] = txt.split(",")[0];
      componentesValues[componentSelect].denominadorPorFrecuencia[0][
        frec as keyof IFrecuencias
      ] = txt.split(",")[1];
      componentesValues[componentSelect].metasPorFrecuencia[0][
        frec as keyof IFrecuencias
      ] = txt.split(",")[2];
    }

    setComponentesValues([...componentesValues]);
  };

  // useEffect(() => {
  //   setComponentesValues(componentesRF);
  // }, []);

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
      <FormulaDialogRF
        open={openFormulaDialog}
        close={handleClose}
        textoSet={changeFormula}
        tipo={tipoFormula}
        elemento={"Componente " + componentSelect.toString()}
        //dato={elementoFormula}
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
                    sx={{ fontFamily: "MontserratMedium", fontSize: "0.7vw" }}
                  >
                    COMPONENTE {index + 1}
                  </Typography>
                </ListItemButton>

                <Divider />
              </Grid>
            );
          })}
        </List>

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

          {jsonMA?.componentes[componentSelect]?.metasPorFrecuencia[0]
            ?.semestre1 === "" ? (
            <Grid
              item
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              sx={{
                alignContent: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Grid
                item
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                sx={{
                  alignContent: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <TextField
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
                  label={
                    <Typography
                      sx={{
                        fontSize: [10, 10, 10, 15, 15, 18],
                        fontFamily: "MontserratMedium",
                      }}
                    >
                      Trimestre 1{" "}
                      {
                        jsonMA?.componentes[componentSelect - 1]
                          ?.metasPorFrecuencia[0]?.trimestre1
                      }
                    </Typography>
                  }
                />
              </Grid>

              <Grid
                item
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                sx={{
                  alignContent: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              ></Grid>
            </Grid>
          ) : (
            <Grid
              item
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              sx={{
                alignContent: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Grid
                item
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                sx={{
                  alignContent: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <TextField
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
                  label={
                    <Typography
                      sx={{
                        fontSize: [10, 10, 10, 15, 15, 18],
                        fontFamily: "MontserratMedium",
                      }}
                    >
                      Trimestre 1{" "}
                      {
                        jsonMA?.componentes[componentSelect - 1]
                          ?.metasPorFrecuencia[0]?.trimestre1
                      }
                    </Typography>
                  }
                />
              </Grid>

              <Grid
                item
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                sx={{
                  alignContent: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                 <TextField
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
                  label={
                    <Typography
                      sx={{
                        fontSize: [10, 10, 10, 15, 15, 18],
                        fontFamily: "MontserratMedium",
                      }}
                    >
                      Trimestre 2{" "}
                      {
                        jsonMA?.componentes[componentSelect - 1]
                          ?.metasPorFrecuencia[0]?.trimestre2
                      }
                    </Typography>
                  }
                />
              </Grid>

              <Grid
                item
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                sx={{
                  alignContent: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                 <TextField
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
                  label={
                    <Typography
                      sx={{
                        fontSize: [10, 10, 10, 15, 15, 18],
                        fontFamily: "MontserratMedium",
                      }}
                    >
                      Trimestre 3{" "}
                      {
                        jsonMA?.componentes[componentSelect - 1]
                          ?.metasPorFrecuencia[0]?.trimestre3
                      }
                    </Typography>
                  }
                />
              </Grid>

              <Grid
                item
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                sx={{
                  alignContent: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                 <TextField
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
                  label={
                    <Typography
                      sx={{
                        fontSize: [10, 10, 10, 15, 15, 18],
                        fontFamily: "MontserratMedium",
                      }}
                    >
                      Trimestre 4{" "}
                      {
                        jsonMA?.componentes[componentSelect - 1]
                          ?.metasPorFrecuencia[0]?.trimestre4
                      }
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
          )}
          
        </Grid>
      </Grid>

      {/* RESTO DE CONTENEDOR EN DONDE SE MOSTRARÁ LA TABLE */}

      {/* <Grid
            container
            item
            xs={10}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <TextField
              fullWidth
              variant="standard"
              value={
                encabezado?.institucion === "Selecciona"
                  ? ""
                  : encabezado?.institucion
              }
              disabled={true}
              label="INSTITUCION"
            ></TextField>
          </Grid> */}
    </Grid>
  );
};
