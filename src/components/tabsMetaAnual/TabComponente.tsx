import { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  TextField,
  Divider,
  List,
  ListItemButton,
  FormControl,
  Autocomplete,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { IComponenteMA } from "./Interfaces";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import { FormulaDialogMA } from "../formulasDialog/FormulaDialogMA";
import { FormulaDialogMACA } from "../formulasDialog/FormulaDialogMACA";
import axios from "axios";
import { isValidComponenteMA } from "../../funcs/ValidatorMA";
import { alertaError } from "../genericComponents/Alertas";
import { IMA, IMAEdit } from "./IMA";
export const TabComponenteMA = ({
  //show,
  edit,
  setComponenteMA,
  setMAcomponentesPadre,
  showMirFnc,
  setTxtShowFnc,
  MA,
  MIR,
  ComponentesMA,
  maPadreEdit,
}: {
  edit:boolean;
  //show: boolean;
  setComponenteMA: Function;
  setMAcomponentesPadre: Function;
  showMirFnc: Function;
  setTxtShowFnc: Function;
  MA: string;
  MIR: string;
  ComponentesMA: IComponenteMA[];
  maPadreEdit: IMAEdit;
}) => {
  const [componentSelect, setComponentSelect] = useState(0);

  const [componentesValues, setComponentesValues] = useState<IComponenteMA[]>(ComponentesMA);

  let jsonMA =
    MA === ""
      ? ""
      : JSON.parse(MA).length > 1
      ? JSON.parse(MA)[0]
      : JSON.parse(MA);

  let MAEdit =
    MA === "" ? "" : JSON.parse(MA).length > 1 ? JSON.parse(MA)[1] : "";

  useEffect(() => {
    //console.log("componentSelect",componentSelect);
    //console.log("COMPONENTESMA: ", ComponentesMA);
    setComponentesValues(ComponentesMA);
    console.log("componentesValues: ",componentesValues);
    
    // if (isValidComponenteMA(ComponentesMA[0])) {
    //   setComponentesValues(ComponentesMA);
    // } else {
    //   alertaError("La información puede estar dañada");
    // }
    // console.log("componentesValues: ",componentesValues);
    
  }, []);

 


  useEffect(() => {
    console.log("valoresComponenteMA en tab de componentes: ", ComponentesMA);
    // console.log("valoresComponenteMA en tab de componentes: ",valoresComponenteMAFnc);
  }, []);

  useEffect(() => {
    console.log("componentesValues: ",componentesValues);
    
    setMAcomponentesPadre(componentesValues)
    
  }, [componentesValues]);

  const [openFormulaDialog, setOpenFormulaDialog] = useState(false);
  const [tipoFormula, setTipoFormula] = useState("");
  const [elementoFormula, setElementoFormula] = useState("");

  const [openFormulaDialogMACA, setOpenFormulaDialogMACA] = useState(false);
  const [frecuencia, setFrecuencia] = useState("");

  const handleClickOpen = () => {
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
    setElementoFormula("Componente " + (componentSelect).toString());
    setOpenFormulaDialog(true);
  };

  const handleClose = () => {
    setOpenFormulaDialog(false);
  };

  const handleClickOpen2 = () => {
    setFrecuencia(
      JSON.parse(MIR).componentes[componentSelect].frecuencia?.toLowerCase()
    );
    setTipoFormula(
      JSON.parse(MIR)
        .componentes[componentSelect].indicador.toUpperCase()
        .includes("PORCENTAJE") ||
        JSON.parse(MIR)
          .componentes[componentSelect].indicador.toLowerCase()
          .includes("porcentaje")
        ? "Porcentaje"
        : JSON.parse(MIR)
            .componentes[componentSelect].indicador.toUpperCase()
            .includes("TASA") ||
          JSON.parse(MIR)
            .componentes[componentSelect].indicador.toLowerCase()
            .includes("tasa")
        ? "Tasa"
        : JSON.parse(MIR)
            .componentes[componentSelect].indicador.toUpperCase()
            .includes("INDICE" || "ÍNDICE") ||
          JSON.parse(MIR)
            .componentes[componentSelect].indicador.toLowerCase()
            .includes("indice") ||
          JSON.parse(MIR)
            .componentes[componentSelect].indicador.toLowerCase()
            .includes("índice")
        ? "Indice"
        : JSON.parse(MIR)
            .componentes[componentSelect].indicador.toUpperCase()
            .includes("PROMEDIO") ||
          JSON.parse(MIR)
            .componentes[componentSelect].indicador.toLowerCase()
            .includes("promedio")
        ? "Promedio"
        : ""
    );
    setElementoFormula("Componente " + (componentSelect ).toString());
    setOpenFormulaDialogMACA(true);
  };

  const handleClose2 = () => {
    setOpenFormulaDialogMACA(false);
  };

  const changeFormula = (txt: string) => {
    if (
      JSON.parse(MIR)
        .componentes[componentSelect].indicador.toLowerCase()
        .includes("indice") ||
      JSON.parse(MIR)
        .componentes[componentSelect].indicador.toLowerCase()
        .includes("índice")
    ) {
      componentesValues[componentSelect].valorNumerador = txt;
      componentesValues[componentSelect].metaAnual = txt;
    } else {
      componentesValues[componentSelect].valorNumerador = txt.split(",")[0];
      componentesValues[componentSelect].valorDenominador = txt.split(",")[1];
      componentesValues[componentSelect].metaAnual = txt.split(",")[2];
    }

    setComponentesValues([...componentesValues]);
  };

  

  const changeFormula2 = (txt: string) => {
    if (frecuencia === "trimestral") {
      componentesValues[componentSelect].metasPorFrecuencia[0].trimestre1 =
        txt.split(",")[0];
        componentesValues[componentSelect].metasPorFrecuencia[0].trimestre2 =
        txt.split(",")[1];
        componentesValues[componentSelect].metasPorFrecuencia[0].trimestre3 =
        txt.split(",")[2];
        componentesValues[componentSelect].metasPorFrecuencia[0].trimestre4 =
        txt.split(",")[3];
    } else {
      componentesValues[componentSelect].metasPorFrecuencia[0].semestre1 =
        txt.split(",")[0];
        componentesValues[componentSelect].metasPorFrecuencia[0].semestre2 =
        txt.split(",")[1];
    }

    setComponentesValues([...componentesValues]);
  };

  const [catalogoUnidadResponsable, setCatalogoUnidadResponsable] = useState([
    {
      Id: "",
      Label: "",
    },
  ]);

  const getUnidades = () => {
    // axios
    //   .get(process.env.REACT_APP_APPLICATION_BACK + "/api/listadoUnidadesInst", {
    //     params: {
    //       Institucion: "a52a01f1-56cf-11ed-a988-040300000000",
    //     },

    //     headers: {
    //       Authorization: localStorage.getItem("jwtToken") || "",
    //     },
    //   })

    //   .then((r) => {
    //     setCatalogoUnidadResponsable(r.data.data);
    //   })

    //   .catch((err) => {});
    axios
      .get(process.env.REACT_APP_APPLICATION_LOGIN + "/api/lista-entidades", {
        params: {
          IdUsuario: localStorage.getItem("IdUsuario"),
          Rol: localStorage.getItem("Rol"),
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setCatalogoUnidadResponsable(r.data.data);
      });
  };

  const getListasLogin = (datos: any, setState: Function) => {
    axios
      .get(process.env.REACT_APP_APPLICATION_LOGIN + "/api/listas", {
        params: datos,
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setState(r.data.data);
      });
  };
  useEffect(() => {
    // getUnidades();
    getListasLogin(
      {
        Tabla: "EntidadesHijas",
        ValorCondicion: JSON.parse(MIR).encabezado.entidad.Id,
      },
      setCatalogoUnidadResponsable
    );
  }, []);

  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  return (
    <Grid
      // visibility={show ? "visible" : "hidden"}
      // position="absolute"
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
      <FormulaDialogMA
        open={openFormulaDialog}
        close={handleClose}
        textoSet={changeFormula}
        tipo={tipoFormula}
        elemento={elementoFormula}
        elementoA={""}
        MIR={MIR}
      />

      <FormulaDialogMACA
        open={openFormulaDialogMACA}
        close={handleClose2}
        textoSet={changeFormula2}
        tipo={tipoFormula}
        elemento={elementoFormula}
        elementoA={""}
        MIR={MIR}
        frecuencia={frecuencia}
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
                    selected={index === componentSelect? true : false}
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
            <Grid>
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
                        selected={index === componentSelect? true : false}
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
            </Grid>
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
              disabled={
                (MAEdit !== ""
                  ? edit && !MAEdit?.componentes[componentSelect].metaAnual
                  : false) &&
                componentesValues[componentSelect]?.metaAnual !== ""
              }
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
              onClick={() =>
                (MAEdit !== ""
                  ? MAEdit?.componentes[componentSelect].metaAnual
                  : false) &&
                componentesValues[componentSelect]?.metaAnual !== ""
                  ? ""
                  : handleClickOpen()
              }
              value={componentesValues[componentSelect]?.metaAnual || ""}
              error={
                parseFloat(componentesValues[componentSelect]?.metaAnual) <
                  0 ||
                (componentesValues[componentSelect]?.metaAnual !==
                  componentesValues[componentSelect]?.metasPorFrecuencia[0]
                    ?.trimestre4 &&
                  componentesValues[componentSelect]?.metaAnual !==
                    componentesValues[componentSelect]
                      ?.metasPorFrecuencia[0]?.semestre2)
                  ? true
                  : false
              }
              helperText={
                parseFloat(componentesValues[componentSelect]?.metaAnual) <
                  0 ||
                (componentesValues[componentSelect]?.metaAnual !==
                  componentesValues[componentSelect]?.metasPorFrecuencia[0]
                    ?.trimestre4 &&
                  componentesValues[componentSelect]?.metaAnual !==
                    componentesValues[componentSelect]
                      ?.metasPorFrecuencia[0]?.semestre2)
                  ? JSON.parse(MIR).componentes[
                      componentSelect
                    ].frecuencia?.toLowerCase() === "trimestral"
                    ? "El valor de la meta anual debe coincidir con el valor del trimestre 4, verifica los valores"
                    : "El valor de la meta anual debe coincidir con el valor del semestre 2, verifica los valores"
                  : null
              }
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
            disabled={
              (MAEdit !== ""
                ? edit && !MAEdit?.componentes[componentSelect].lineaBase
                : false) &&
              componentesValues[componentSelect]?.lineaBase !== ""
            }
            sx={{ boxShadow: 2 }}
            variant={"filled"}
            label={
              <Typography
                sx={{
                  fontSize: [10, 10, 10, 15, 15, 18],
                  fontFamily: "MontserratMedium",
                }}
              >
                LÍNEA BASE 2021
              </Typography>
            }
            error={
              (parseFloat(componentesValues[componentSelect]?.lineaBase) <
                0 ||
                isNaN(
                  parseFloat(
                    componentesValues[componentSelect]?.lineaBase
                  )
                )) &&
              componentesValues[componentSelect]?.lineaBase !== ""
                ? true
                : false
            }
            helperText={
              (parseFloat(componentesValues[componentSelect]?.lineaBase) <
                0 ||
                isNaN(
                  parseFloat(
                    componentesValues[componentSelect]?.lineaBase
                  )
                )) &&
              componentesValues[componentSelect]?.lineaBase !== ""
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
            onChange={(c) => {
              componentesValues[componentSelect].lineaBase =
                c.target.value
                  .replaceAll('"', "")
                  .replaceAll("'", "")
                  .replaceAll("\n", "");
              setComponentesValues([...componentesValues]);
            }}
            value={componentesValues[componentSelect]?.lineaBase || ""}
            />
          </Grid>

          {JSON.parse(MIR)
            .componentes[componentSelect].indicador.toLowerCase()
            .includes("indice") ||
          JSON.parse(MIR)
            .componentes[componentSelect].indicador.toLowerCase()
            .includes("índice") ? (
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
              disabled={
                (MAEdit !== ""
                  ? edit && !MAEdit?.componentes[componentSelect].valorNumerador
                  : false) &&
                componentesValues[componentSelect]?.valorNumerador !== ""
              }
              sx={{ boxShadow: 2 }}
              variant={"filled"}
              label={
                // fontSize: [10, 10, 10, 15, 15, 18]
                //fontSize: [10, 10, 10, 11, 12, 13]
                <Typography
                  sx={{
                    fontSize: [10, 10, 10, 15, 15, 18],
                    fontFamily: "MontserratMedium",
                  }}
                >
                  ÍNDICE
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
              onClick={() =>
                (MAEdit !== ""
                  ? MAEdit?.componentes[componentSelect].valorNumerador
                  : false) &&
                componentesValues[componentSelect]?.valorNumerador !== ""
                  ? ""
                  : handleClickOpen()
              }
              value={
                componentesValues[componentSelect]?.valorNumerador || ""
              }
              />
            </Grid>
          ) : (
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
                columnGap: 2
              }}
            >
              <TextField
              disabled={
                (MAEdit !== ""
                  ? edit && !MAEdit?.componentes[componentSelect].valorNumerador
                  : false) &&
                componentesValues[componentSelect]?.valorNumerador !== ""
              }
              sx={{
                boxShadow: 2,
                // mr: "2%"
              }}
              variant={"filled"}
              label={
                <Typography
                  sx={{
                    fontSize: [10, 10, 10, 15, 15, 18],
                    fontFamily: "MontserratMedium",
                  }}
                >
                   NUMERADOR
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
              onClick={() =>
                (MAEdit !== ""
                  ? MAEdit?.componentes[componentSelect ].valorNumerador
                  : false) &&
                componentesValues[componentSelect ]?.valorNumerador !== ""
                  ? ""
                  : handleClickOpen()
              }
              value={
                componentesValues[componentSelect ]?.valorNumerador || ""
              }
              />
              <TextField
              disabled={
                (MAEdit !== ""
                  ? edit && !MAEdit?.componentes[componentSelect ].valorDenominador
                  : false) &&
                componentesValues[componentSelect ]?.valorDenominador !==
                  ""
              }
              sx={{ boxShadow: 2 }}
              variant={"filled"}
              label={
                <Typography
                  sx={{
                    fontSize: [10, 10, 10, 15, 15, 18],
                    fontFamily: "MontserratMedium",
                  }}
                >
                   DENOMINADOR
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
              onClick={() =>
                (MAEdit !== ""
                  ? MAEdit?.componentes[componentSelect ].valorDenominador
                  : false) &&
                componentesValues[componentSelect ]?.valorDenominador !==
                  ""
                  ? ""
                  : handleClickOpen()
              }
              value={
                componentesValues[componentSelect ]?.valorDenominador || ""
              }
              />
            </Grid>
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
            <FormControl
            disabled={
              (MAEdit !== ""
                ? edit && !MAEdit?.componentes[componentSelect ].sentidoDelIndicador
                : false) &&
              componentesValues[componentSelect ]?.sentidoDelIndicador !==
                ""
            }
            sx={{
              backgroundColor: "#f0f0f0",
              boxShadow: 6,
              fontFamily: "MontserratMedium",
              justifyContent: "space-evenly",
              alignItems: "flex-start",
            }}
            >
              <FormLabel
                sx={{
                  fontFamily: "MontserratBold",
                  fontSize: [10, 10, 10, 11, 12, 13],
                }}
              >
                SENTIDO DEL INDICADOR
              </FormLabel>
               <FormControlLabel
                value={"ASCENDENTE"}
                label={
                  <Typography
                    sx={{
                      fontSize: [10, 10, 10, 11, 12, 13],
                      fontFamily: "MontserratMedium",
                    }}
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
                      componentesValues[componentSelect]
                        ?.sentidoDelIndicador === "ASCENDENTE"
                    }
                    onChange={(c) => {
                      componentesValues[
                        componentSelect
                      ].sentidoDelIndicador = c.target.value;
                      setComponentesValues([...componentesValues]);
                    }}
                  />
                }
              />
                <FormControlLabel
                value={"DESCENDENTE"}
                label={
                  <Typography
                    sx={{
                      fontSize: [10, 10, 10, 11, 12, 13],
                      fontFamily: "MontserratMedium",
                    }}
                  >
                    DESCENDENTE
                  </Typography>
                } 
                 control={ 
                  <Radio
                    checked={
                      componentesValues[componentSelect]
                        ?.sentidoDelIndicador === "DESCENDENTE"
                    }
                    onChange={(c) => {
                      componentesValues[
                        componentSelect
                      ].sentidoDelIndicador = c.target.value;
                      setComponentesValues([...componentesValues]);
                    }}
                  />
                }
              />
              <FormControlLabel
                value={"NORMAL"}
                label={
                  <Typography
                    sx={{
                      fontSize: [10, 10, 10, 11, 12, 13],
                      fontFamily: "MontserratMedium",
                    }}
                  >
                    NORMAL
                  </Typography>
                }
                control={
                  <Radio
                    checked={
                      componentesValues[componentSelect]
                        ?.sentidoDelIndicador === "NORMAL"
                    }
                    onChange={(c) => {
                      componentesValues[
                        componentSelect
                      ].sentidoDelIndicador = c.target.value;
                      setComponentesValues([...componentesValues]);
                    }}
                  />
                }
              />
            </FormControl>
          </Grid>

          {JSON.parse(MIR).componentes[
            componentSelect
          ].frecuencia?.toLowerCase() === "trimestral" ? (
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
                  disabled={
                    (MAEdit !== ""
                      ? edit && !MAEdit?.componentes[componentSelect]
                          .metasPorFrecuencia[0].trimestre1
                      : false) &&
                    componentesValues[componentSelect]
                      ?.metasPorFrecuencia[0]?.trimestre1 !== ""
                  }
                  sx={{ boxShadow: 2 }}
                  variant={"filled"}
                  onClick={() =>
                    (MAEdit !== ""
                      ? MAEdit?.componentes[componentSelect]
                          .metasPorFrecuencia[0].trimestre1
                      : false) &&
                    componentesValues[componentSelect - 1]
                      ?.metasPorFrecuencia[0]?.trimestre1 !== ""
                      ? ""
                      : handleClickOpen2()
                  }
                  label={
                    <Typography
                      sx={{
                        fontSize: [10, 10, 10, 15, 15, 18],
                        fontFamily: "MontserratMedium",
                      }}
                    >
                      TRIMESTRE 1
                    </Typography>
                  }
                  value={
                    componentesValues[componentSelect - 1]
                      ?.metasPorFrecuencia[0]?.trimestre1 || ""
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
                  disabled={
                    (MAEdit !== ""
                      ? edit && !MAEdit?.componentes[componentSelect - 1]
                          .metasPorFrecuencia[0].trimestre2
                      : false) &&
                    componentesValues[componentSelect - 1]
                      ?.metasPorFrecuencia[0]?.trimestre2 !== ""
                  }
                  sx={{ boxShadow: 2 }}
                  variant={"filled"}
                  onClick={() =>
                    (MAEdit !== ""
                      ? MAEdit?.componentes[componentSelect - 1]
                          .metasPorFrecuencia[0].trimestre2
                      : false) &&
                    componentesValues[componentSelect - 1]
                      ?.metasPorFrecuencia[0]?.trimestre2 !== ""
                      ? ""
                      : handleClickOpen2()
                  }
                  label={
                    <Typography
                      sx={{
                        fontSize: [10, 10, 10, 15, 15, 18],
                        fontFamily: "MontserratMedium",
                      }}
                    >
                      TRIMESTRE 2
                    </Typography>
                  }
                  value={
                    componentesValues[componentSelect - 1]
                      ?.metasPorFrecuencia[0]?.trimestre2 || ""
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
                  disabled={
                    (MAEdit !== ""
                      ? edit && !MAEdit?.componentes[componentSelect - 1]
                          .metasPorFrecuencia[0].trimestre3
                      : false) &&
                    componentesValues[componentSelect - 1]
                      ?.metasPorFrecuencia[0]?.trimestre3 !== ""
                  }
                  sx={{ boxShadow: 2 }}
                  variant={"filled"}
                  onClick={() =>
                    (MAEdit !== ""
                      ? MAEdit?.componentes[componentSelect - 1]
                          .metasPorFrecuencia[0].trimestre3
                      : false) &&
                    componentesValues[componentSelect - 1]
                      ?.metasPorFrecuencia[0]?.trimestre3 !== ""
                      ? ""
                      : handleClickOpen2()
                  }
                  label={
                    <Typography
                      sx={{
                        fontSize: [10, 10, 10, 15, 15, 18],
                        fontFamily: "MontserratMedium",
                      }}
                    >
                      TRIMESTRE 3
                    </Typography>
                  }
                  value={
                    componentesValues[componentSelect - 1]
                      ?.metasPorFrecuencia[0]?.trimestre3 || ""
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
                  disabled={
                    (MAEdit !== ""
                      ? edit && !MAEdit?.componentes[componentSelect]
                          .metasPorFrecuencia[0].trimestre4
                      : false) &&
                    componentesValues[componentSelect]
                      ?.metasPorFrecuencia[0]?.trimestre4 !== ""
                  }
                  sx={{ boxShadow: 2 }}
                  variant={"filled"}
                  onClick={() =>
                    (MAEdit !== ""
                      ? MAEdit?.componentes[componentSelect]
                          .metasPorFrecuencia[0].trimestre4
                      : false) &&
                    componentesValues[componentSelect]
                      ?.metasPorFrecuencia[0]?.trimestre4 !== ""
                      ? ""
                      : handleClickOpen2()
                  }
                  label={
                    <Typography
                      sx={{
                        fontSize: [10, 10, 10, 15, 15, 18],
                        fontFamily: "MontserratMedium",
                      }}
                    >
                      TRIMESTRE 4
                    </Typography>
                  }
                  value={
                    componentesValues[componentSelect]
                      ?.metasPorFrecuencia[0]?.trimestre4 || ""
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
              </Grid>
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
                  disabled={
                    (MAEdit !== ""
                      ? edit && !MAEdit?.componentes[componentSelect]
                          .metasPorFrecuencia[0].semestre1
                      : false) &&
                    componentesValues[componentSelect]
                      ?.metasPorFrecuencia[0]?.semestre1 !== ""
                  }
                  sx={{ boxShadow: 2 }}
                  variant={"filled"}
                  onClick={() =>
                    (MAEdit !== ""
                      ? MAEdit?.componentes[componentSelect]
                          .metasPorFrecuencia[0].semestre1
                      : false) &&
                    componentesValues[componentSelect]
                      ?.metasPorFrecuencia[0]?.semestre1 !== ""
                      ? ""
                      : handleClickOpen2()
                  }
                  label={
                    <Typography
                      sx={{
                        fontSize: [10, 10, 10, 15, 15, 18],
                        fontFamily: "MontserratMedium",
                      }}
                    >
                      SEMESTRE 1
                    </Typography>
                  }
                  value={
                    componentesValues[componentSelect]
                      ?.metasPorFrecuencia[0]?.semestre1 || ""
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
                  disabled={
                    (MAEdit !== ""
                      ? edit && !MAEdit?.componentes[componentSelect]
                          .metasPorFrecuencia[0].semestre2
                      : false) &&
                    componentesValues[componentSelect]
                      ?.metasPorFrecuencia[0]?.semestre2 !== ""
                  }
                  sx={{ boxShadow: 2 }}
                  variant={"filled"}
                  onClick={() =>
                    (MAEdit !== ""
                      ? MAEdit?.componentes[componentSelect]
                          .metasPorFrecuencia[0].semestre2
                      : false) &&
                    componentesValues[componentSelect]
                      ?.metasPorFrecuencia[0]?.semestre2 !== ""
                      ? ""
                      : handleClickOpen2()
                  }
                  label={
                    <Typography
                      sx={{
                        fontSize: [10, 10, 10, 15, 15, 18],
                        fontFamily: "MontserratMedium",
                      }}
                    >
                      SEMESTRE 2
                    </Typography>
                  }
                  value={
                    componentesValues[componentSelect]
                      ?.metasPorFrecuencia[0]?.semestre2 || ""
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
              </Grid>
            </Grid>
          )}

          <Grid
            item
            xl={2}
            lg={2}
            md={4}
            sm={4}
            xs={11}
            sx={{
              alignContent: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <FormControl required fullWidth>
              <Autocomplete
                clearText="Borrar"
                noOptionsText="Sin opciones"
                closeText="Cerrar"
                openText="Abrir"
                disabled={
                  (MAEdit !== ""
                    ? edit && !MAEdit?.componentes[componentSelect].unidadResponsable
                    : false) &&
                  componentesValues[componentSelect]?.unidadResponsable !==
                    ""
                }
                options={catalogoUnidadResponsable}
                getOptionLabel={(option) => option.Label}
                value={{
                  Id: catalogoUnidadResponsable[0].Id || "",
                  Label:
                    componentesValues[componentSelect]?.unidadResponsable ||
                    "",
                }}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.Id}>
                      <p
                        style={{
                          fontFamily: "MontserratRegular",
                          //fontSize: ".7vw",
                        }}
                      >
                        {option.Label}
                      </p>
                    </li>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={"UNIDAD RESPONSABLE"}
                    variant="standard"
                    InputLabelProps={{
                      style: {
                        fontFamily: "MontserratSemiBold",
                       // fontSize: "1vw",
                      },
                    }}
                    sx={{
                      "& .MuiAutocomplete-input": {
                        fontFamily: "MontserratRegular",
                      },
                    }}
                  ></TextField>
                )}
                onChange={(event, value) => {
                  componentesValues[componentSelect].unidadResponsable =
                    value?.Label || "";
                  setComponentesValues([...componentesValues]);
                  console.log(" componentesValues[componentSelect].unidadResponsable =value?.Label: ",   value?.Label);
                  
                }}
                isOptionEqualToValue={(option, value) => option.Id === value.Id}
              />
            </FormControl>{" "}
          </Grid>

          <Grid
            item
            xl={2}
            lg={2}
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
            disabled={
              (MAEdit !== ""
                ? edit && !MAEdit?.componentes[componentSelect].descIndicador
                : false) &&
              componentesValues[componentSelect]?.descIndicador !== ""
            }
            rows={5}
            multiline
            sx={{ boxShadow: 2 }}
            variant={"filled"}
            label={
              <Typography
                sx={{
                  fontSize: [10, 10, 10, 15, 15, 18],
                  fontFamily: "MontserratMedium",
                }}
              >
                DESCRIPCIÓN DEL INDICADOR
              </Typography>
            }
            value={
              componentesValues[componentSelect]?.descIndicador || ""
            }
            onChange={(c) => {
              componentesValues[componentSelect].descIndicador =
                c.target.value
                  .replaceAll('"', "")
                  .replaceAll("'", "")
                  .replaceAll("\n", "");
              setComponentesValues([...componentesValues]);
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
            disabled={
              (MAEdit !== ""
                ? edit && !MAEdit?.componentes[componentSelect].descNumerador
                : false) &&
              componentesValues[componentSelect]?.descNumerador !== ""
            }
            rows={5}
            multiline
            sx={{ boxShadow: 2 }}
            variant={"filled"}
            label={
              <Typography
                sx={{
                  fontSize: [10, 10, 10, 15, 15, 18],
                  fontFamily: "MontserratMedium",
                }}
              >
                DESCRIPCIÓN DEL NUMERADOR
              </Typography>
            }
            value={
              componentesValues[componentSelect]?.descNumerador || ""
            }
            onChange={(c) => {
              componentesValues[componentSelect].descNumerador =
                c.target.value
                  .replaceAll('"', "")
                  .replaceAll("'", "")
                  .replaceAll("\n", "");
              setComponentesValues([...componentesValues]);
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
            disabled={
              (MAEdit !== ""
                ? edit && !MAEdit?.componentes[componentSelect].descDenominador
                : false) &&
              componentesValues[componentSelect]?.descDenominador !== ""
            }
            rows={5}
            multiline
            sx={{ boxShadow: 2 }}
            variant={"filled"}
            label={
              <Typography
                sx={{
                  fontSize: [10, 10, 10, 15, 15, 18],
                  fontFamily: "MontserratMedium",
                }}
              >
                DESCRIPCIÓN DEL DENOMINADOR
              </Typography>
            }
            value={
              componentesValues[componentSelect]?.descDenominador || ""
            }
            onChange={(c) => {
              componentesValues[componentSelect].descDenominador =
                c.target.value
                  .replaceAll('"', "")
                  .replaceAll("'", "")
                  .replaceAll("\n", "");
              setComponentesValues([...componentesValues]);
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
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
