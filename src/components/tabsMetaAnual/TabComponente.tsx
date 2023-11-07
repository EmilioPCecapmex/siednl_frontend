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
import { newComponente, newActividad } from "./AddMetaAnual";
export const TabComponenteMA = ({
  show,
  valoresComponenteMAFnc,
 
  showMirFnc,
  setTxtShowFnc,

  MA,
  MIR,
  ComponentesMA,
}: {
  show: boolean;
  valoresComponenteMAFnc: Function;
  
  showMirFnc: Function;
  setTxtShowFnc: Function;
  MA: string;
  MIR: string;
  ComponentesMA: IComponenteMA[]

}) => {
  const [componentSelect, setComponentSelect] = useState(1);

  // const [componentesValues, setComponentesValues] = useState<
  //   Array<IComponenteMA>
  // >([]);

  let jsonMA =
    MA === ""
      ? ""
      : JSON.parse(MA).length > 1
      ? JSON.parse(MA)[0]
      : JSON.parse(MA);

  let MAEdit =
    MA === "" ? "" : JSON.parse(MA).length > 1 ? JSON.parse(MA)[1] : "";

    useEffect(() => {
      console.log("componentSelect",componentSelect);
      
    }, [componentSelect])
    
  // useEffect(() => {
  //   let comp: IComponenteMA[] = [];

  //   noComponentes.map((x, index) => {
  //     return comp.push({
  //       componentes: "C" + (index + 1),
  //       metaAnual: MA === "" ? "" : jsonMA?.componentes[index]?.metaAnual || "",
  //       lineaBase: MA === "" ? "" : jsonMA?.componentes[index]?.lineaBase || "",
  //       metasPorFrecuencia: [
  //         {
  //           semestre1:
  //             MA === ""
  //               ? ""
  //               : jsonMA?.componentes[index]?.metasPorFrecuencia[0]
  //                   ?.semestre1 || "",
  //           semestre2:
  //             MA === ""
  //               ? ""
  //               : jsonMA?.componentes[index]?.metasPorFrecuencia[0]
  //                   ?.semestre2 || "",
  //           trimestre1:
  //             MA === ""
  //               ? ""
  //               : jsonMA?.componentes[index]?.metasPorFrecuencia[0]
  //                   ?.trimestre1 || "",
  //           trimestre2:
  //             MA === ""
  //               ? ""
  //               : jsonMA?.componentes[index]?.metasPorFrecuencia[0]
  //                   ?.trimestre2 || "",
  //           trimestre3:
  //             MA === ""
  //               ? ""
  //               : jsonMA?.componentes[index]?.metasPorFrecuencia[0]
  //                   ?.trimestre3 || "",
  //           trimestre4:
  //             MA === ""
  //               ? ""
  //               : jsonMA?.componentes[index]?.metasPorFrecuencia[0]
  //                   ?.trimestre4 || "",
  //         },
  //       ],

  //       valorNumerador:
  //         MA === "" ? "" : jsonMA?.componentes[index]?.valorNumerador || "",
  //       valorDenominador:
  //         MA === "" ? "" : jsonMA?.componentes[index]?.valorDenominador || "",
  //       sentidoDelIndicador:
  //         MA === ""
  //           ? ""
  //           : jsonMA?.componentes[index]?.sentidoDelIndicador || "",

  //       unidadResponsable:
  //         MA === "" ? "" : jsonMA?.componentes[index]?.unidadResponsable || "",

  //       descIndicador:
  //         MA === "" ? "" : jsonMA?.componentes[index]?.descIndicador || "",
  //       descNumerador:
  //         MA === "" ? "" : jsonMA?.componentes[index]?.descNumerador || "",
  //       descDenominador:
  //         MA === "" ? "" : jsonMA?.componentes[index]?.descDenominador || "",
  //         actividades: MA === "" ? "" : jsonMA?.componentes[index].actividades || ""
  //     });

  //   });

  //   setComponentesValues(comp);
  //   eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [noComponentes]);

  useEffect(() => {
    console.log("valoresComponenteMA en tab de componentes: ",ComponentesMA);
  }, [])
  

  // useEffect(() => {
  //   valoresComponenteMAFnc(componentesValues);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [componentesValues]);

  const [openFormulaDialog, setOpenFormulaDialog] = useState(false);
  const [tipoFormula, setTipoFormula] = useState("");
  const [elementoFormula, setElementoFormula] = useState("");

  const [openFormulaDialogMACA, setOpenFormulaDialogMACA] = useState(false);
  const [frecuencia, setFrecuencia] = useState("");

  const handleClickOpen = () => {
    setTipoFormula(
      JSON.parse(MIR)
        .componentes[componentSelect - 1].indicador.toUpperCase()
        .includes("PORCENTAJE") ||
        JSON.parse(MIR)
          .componentes[componentSelect - 1].indicador.toUpperCase()
          .includes("PORCENTAJE")
        ? "Porcentaje"
        : JSON.parse(MIR)
            .componentes[componentSelect - 1].indicador.toUpperCase()
            .includes("TASA") ||
          JSON.parse(MIR)
            .componentes[componentSelect - 1].indicador.toUpperCase()
            .includes("TASA")
        ? "Tasa"
        : JSON.parse(MIR)
            .componentes[componentSelect - 1].indicador.toUpperCase()
            .includes("INDICE" || "ÍNDICE") ||
          JSON.parse(MIR)
            .componentes[componentSelect - 1].indicador.toUpperCase()
            .includes("INDICE") ||
          JSON.parse(MIR)
            .componentes[componentSelect - 1].indicador.toUpperCase()
            .includes("ÍNDICE")
        ? "Índice"
        : JSON.parse(MIR)
            .componentes[componentSelect - 1].indicador.toUpperCase()
            .includes("PROMEDIO") ||
          JSON.parse(MIR)
            .componentes[componentSelect - 1].indicador.toUpperCase()
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

  const handleClickOpen2 = () => {
    setFrecuencia(
      JSON.parse(MIR).componentes[componentSelect - 1].frecuencia?.toLowerCase()
    );
    setTipoFormula(
      JSON.parse(MIR)
        .componentes[componentSelect - 1].indicador.toUpperCase()
        .includes("PORCENTAJE") ||
        JSON.parse(MIR)
          .componentes[componentSelect - 1].indicador.toLowerCase()
          .includes("porcentaje")
        ? "Porcentaje"
        : JSON.parse(MIR)
            .componentes[componentSelect - 1].indicador.toUpperCase()
            .includes("TASA") ||
          JSON.parse(MIR)
            .componentes[componentSelect - 1].indicador.toLowerCase()
            .includes("tasa")
        ? "Tasa"
        : JSON.parse(MIR)
            .componentes[componentSelect - 1].indicador.toUpperCase()
            .includes("INDICE" || "ÍNDICE") ||
          JSON.parse(MIR)
            .componentes[componentSelect - 1].indicador.toLowerCase()
            .includes("indice") ||
          JSON.parse(MIR)
            .componentes[componentSelect - 1].indicador.toLowerCase()
            .includes("índice")
        ? "Indice"
        : JSON.parse(MIR)
            .componentes[componentSelect - 1].indicador.toUpperCase()
            .includes("PROMEDIO") ||
          JSON.parse(MIR)
            .componentes[componentSelect - 1].indicador.toLowerCase()
            .includes("promedio")
        ? "Promedio"
        : ""
    );
    setElementoFormula("Componente " + componentSelect.toString());
    setOpenFormulaDialogMACA(true);
  };

  const handleClose2 = () => {
    setOpenFormulaDialogMACA(false);
  };

  const changeFormula = (txt: string) => {
    if (
      JSON.parse(MIR)
        .componentes[componentSelect - 1].indicador.toLowerCase()
        .includes("indice") ||
      JSON.parse(MIR)
        .componentes[componentSelect - 1].indicador.toLowerCase()
        .includes("índice")
    ) {
      componentesValues[componentSelect - 1].valorNumerador = txt;
      componentesValues[componentSelect - 1].metaAnual = txt;
    } else {
      componentesValues[componentSelect - 1].valorNumerador = txt.split(",")[0];
      componentesValues[componentSelect - 1].valorDenominador =
        txt.split(",")[1];
      componentesValues[componentSelect - 1].metaAnual = txt.split(",")[2];
    }

    setComponentesValues([...componentesValues]);
  };

  const changeFormula2 = (txt: string) => {
    if (frecuencia === "trimestral") {
      valoresComponenteMA[componentSelect - 1].metasPorFrecuencia[0].trimestre1 =
        txt.split(",")[0];
      componentesValues[componentSelect - 1].metasPorFrecuencia[0].trimestre2 =
        txt.split(",")[1];
      componentesValues[componentSelect - 1].metasPorFrecuencia[0].trimestre3 =
        txt.split(",")[2];
      componentesValues[componentSelect - 1].metasPorFrecuencia[0].trimestre4 =
        txt.split(",")[3];
    } else {
      componentesValues[componentSelect - 1].metasPorFrecuencia[0].semestre1 =
        txt.split(",")[0];
      componentesValues[componentSelect - 1].metasPorFrecuencia[0].semestre2 =
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
      <FormulaDialogMA
        open={openFormulaDialog}
        close={handleClose}
        textoSet={changeFormula}
        tipo={tipoFormula}
        elemento={elementoFormula}
        MIR={MIR}
      />

      <FormulaDialogMACA
        open={openFormulaDialogMACA}
        close={handleClose2}
        textoSet={changeFormula2}
        tipo={tipoFormula}
        elemento={elementoFormula}
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
          COMPONENTE {componentSelect}
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
            {valoresComponenteMA.map((item, index) => {
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
                      COMPONENTE {index}
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
                {noComponentes.map((item) => {
                  return (
                    <Grid
                      key={item}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <Divider />
                      <ListItemButton
                        selected={item === componentSelect ? true : false}
                        key={item}
                        onClick={() => {
                          setComponentSelect(item);
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
                          COMPONENTE {item}
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
                  ? MAEdit?.componentes[componentSelect - 1].metaAnual
                  : false) &&
                componentesValues[componentSelect - 1]?.metaAnual !== ""
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
                  ? MAEdit?.componentes[componentSelect - 1].metaAnual
                  : false) &&
                componentesValues[componentSelect - 1]?.metaAnual !== ""
                  ? ""
                  : handleClickOpen()
              }
              value={componentesValues[componentSelect - 1]?.metaAnual || ""}
              error={
                parseFloat(componentesValues[componentSelect - 1]?.metaAnual) <
                  0 ||
                (componentesValues[componentSelect - 1]?.metaAnual !==
                  componentesValues[componentSelect - 1]?.metasPorFrecuencia[0]
                    ?.trimestre4 &&
                  componentesValues[componentSelect - 1]?.metaAnual !==
                    componentesValues[componentSelect - 1]
                      ?.metasPorFrecuencia[0]?.semestre2)
                  ? true
                  : false
              }
              helperText={
                parseFloat(componentesValues[componentSelect - 1]?.metaAnual) <
                  0 ||
                (componentesValues[componentSelect - 1]?.metaAnual !==
                  componentesValues[componentSelect - 1]?.metasPorFrecuencia[0]
                    ?.trimestre4 &&
                  componentesValues[componentSelect - 1]?.metaAnual !==
                    componentesValues[componentSelect - 1]
                      ?.metasPorFrecuencia[0]?.semestre2)
                  ? JSON.parse(MIR).componentes[
                      componentSelect - 1
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
                  ? MAEdit?.componentes[componentSelect - 1].lineaBase
                  : false) &&
                componentesValues[componentSelect - 1]?.lineaBase !== ""
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
                (parseFloat(componentesValues[componentSelect - 1]?.lineaBase) <
                  0 ||
                  isNaN(
                    parseFloat(
                      componentesValues[componentSelect - 1]?.lineaBase
                    )
                  )) &&
                componentesValues[componentSelect - 1]?.lineaBase !== ""
                  ? true
                  : false
              }
              helperText={
                (parseFloat(componentesValues[componentSelect - 1]?.lineaBase) <
                  0 ||
                  isNaN(
                    parseFloat(
                      componentesValues[componentSelect - 1]?.lineaBase
                    )
                  )) &&
                componentesValues[componentSelect - 1]?.lineaBase !== ""
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
                componentesValues[componentSelect - 1].lineaBase =
                  c.target.value
                    .replaceAll('"', "")
                    .replaceAll("'", "")
                    .replaceAll("\n", "");
                setComponentesValues([...componentesValues]);
              }}
              value={componentesValues[componentSelect - 1]?.lineaBase || ""}
            />
          </Grid>

          {JSON.parse(MIR)
            .componentes[componentSelect - 1].indicador.toLowerCase()
            .includes("indice") ||
          JSON.parse(MIR)
            .componentes[componentSelect - 1].indicador.toLowerCase()
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
                    ? MAEdit?.componentes[componentSelect - 1].valorNumerador
                    : false) &&
                  componentesValues[componentSelect - 1]?.valorNumerador !== ""
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
                    ? MAEdit?.componentes[componentSelect - 1].valorNumerador
                    : false) &&
                  componentesValues[componentSelect - 1]?.valorNumerador !== ""
                    ? ""
                    : handleClickOpen()
                }
                value={
                  componentesValues[componentSelect - 1]?.valorNumerador || ""
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
              }}
            >
              <TextField
                disabled={
                  (MAEdit !== ""
                    ? MAEdit?.componentes[componentSelect - 1].valorNumerador
                    : false) &&
                  componentesValues[componentSelect - 1]?.valorNumerador !== ""
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
                    VALOR DEL NUMERADOR
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
                    ? MAEdit?.componentes[componentSelect - 1].valorNumerador
                    : false) &&
                  componentesValues[componentSelect - 1]?.valorNumerador !== ""
                    ? ""
                    : handleClickOpen()
                }
                value={
                  componentesValues[componentSelect - 1]?.valorNumerador || ""
                }
              />
              <TextField
                disabled={
                  (MAEdit !== ""
                    ? MAEdit?.componentes[componentSelect - 1].valorDenominador
                    : false) &&
                  componentesValues[componentSelect - 1]?.valorDenominador !==
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
                    VALOR DEL DENOMINADOR
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
                    ? MAEdit?.componentes[componentSelect - 1].valorDenominador
                    : false) &&
                  componentesValues[componentSelect - 1]?.valorDenominador !==
                    ""
                    ? ""
                    : handleClickOpen()
                }
                value={
                  componentesValues[componentSelect - 1]?.valorDenominador || ""
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
                  ? MAEdit?.componentes[componentSelect - 1].sentidoDelIndicador
                  : false) &&
                componentesValues[componentSelect - 1]?.sentidoDelIndicador !==
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
                      componentesValues[componentSelect - 1]
                        ?.sentidoDelIndicador === "ASCENDENTE"
                    }
                    onChange={(c) => {
                      componentesValues[
                        componentSelect - 1
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
                      componentesValues[componentSelect - 1]
                        ?.sentidoDelIndicador === "DESCENDENTE"
                    }
                    onChange={(c) => {
                      componentesValues[
                        componentSelect - 1
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
                      componentesValues[componentSelect - 1]
                        ?.sentidoDelIndicador === "NORMAL"
                    }
                    onChange={(c) => {
                      componentesValues[
                        componentSelect - 1
                      ].sentidoDelIndicador = c.target.value;
                      setComponentesValues([...componentesValues]);
                    }}
                  />
                }
              />
            </FormControl>
          </Grid>

          {JSON.parse(MIR).componentes[
            componentSelect - 1
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
                      ? MAEdit?.componentes[componentSelect - 1]
                          .metasPorFrecuencia[0].trimestre1
                      : false) &&
                    componentesValues[componentSelect - 1]
                      ?.metasPorFrecuencia[0]?.trimestre1 !== ""
                  }
                  sx={{ boxShadow: 2 }}
                  variant={"filled"}
                  onClick={() =>
                    (MAEdit !== ""
                      ? MAEdit?.componentes[componentSelect - 1]
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
                      ? MAEdit?.componentes[componentSelect - 1]
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
                      ? MAEdit?.componentes[componentSelect - 1]
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
                      ? MAEdit?.componentes[componentSelect - 1]
                          .metasPorFrecuencia[0].trimestre4
                      : false) &&
                    componentesValues[componentSelect - 1]
                      ?.metasPorFrecuencia[0]?.trimestre4 !== ""
                  }
                  sx={{ boxShadow: 2 }}
                  variant={"filled"}
                  onClick={() =>
                    (MAEdit !== ""
                      ? MAEdit?.componentes[componentSelect - 1]
                          .metasPorFrecuencia[0].trimestre4
                      : false) &&
                    componentesValues[componentSelect - 1]
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
                    componentesValues[componentSelect - 1]
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
                      ? MAEdit?.componentes[componentSelect - 1]
                          .metasPorFrecuencia[0].semestre1
                      : false) &&
                    componentesValues[componentSelect - 1]
                      ?.metasPorFrecuencia[0]?.semestre1 !== ""
                  }
                  sx={{ boxShadow: 2 }}
                  variant={"filled"}
                  onClick={() =>
                    (MAEdit !== ""
                      ? MAEdit?.componentes[componentSelect - 1]
                          .metasPorFrecuencia[0].semestre1
                      : false) &&
                    componentesValues[componentSelect - 1]
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
                    componentesValues[componentSelect - 1]
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
                      ? MAEdit?.componentes[componentSelect - 1]
                          .metasPorFrecuencia[0].semestre2
                      : false) &&
                    componentesValues[componentSelect - 1]
                      ?.metasPorFrecuencia[0]?.semestre2 !== ""
                  }
                  sx={{ boxShadow: 2 }}
                  variant={"filled"}
                  onClick={() =>
                    (MAEdit !== ""
                      ? MAEdit?.componentes[componentSelect - 1]
                          .metasPorFrecuencia[0].semestre2
                      : false) &&
                    componentesValues[componentSelect - 1]
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
                    componentesValues[componentSelect - 1]
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
                    ? MAEdit?.componentes[componentSelect - 1].unidadResponsable
                    : false) &&
                  componentesValues[componentSelect - 1]?.unidadResponsable !==
                    ""
                }
                options={catalogoUnidadResponsable}
                getOptionLabel={(option) => option.Label}
                value={{
                  Id: catalogoUnidadResponsable[0].Id || "",
                  Label:
                    componentesValues[componentSelect - 1]?.unidadResponsable ||
                    "",
                }}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.Id}>
                      <p
                        style={{
                          fontFamily: "MontserratRegular",
                          fontSize: ".7vw",
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
                        fontSize: "1vw",
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
                  componentesValues[componentSelect - 1].unidadResponsable =
                    value?.Label || "";
                  setComponentesValues([...componentesValues]);
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
                  ? MAEdit?.componentes[componentSelect - 1].descIndicador
                  : false) &&
                componentesValues[componentSelect - 1]?.descIndicador !== ""
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
                componentesValues[componentSelect - 1]?.descIndicador || ""
              }
              onChange={(c) => {
                componentesValues[componentSelect - 1].descIndicador =
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
                  ? MAEdit?.componentes[componentSelect - 1].descNumerador
                  : false) &&
                componentesValues[componentSelect - 1]?.descNumerador !== ""
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
                componentesValues[componentSelect - 1]?.descNumerador || ""
              }
              onChange={(c) => {
                componentesValues[componentSelect - 1].descNumerador =
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
                  ? MAEdit?.componentes[componentSelect - 1].descDenominador
                  : false) &&
                componentesValues[componentSelect - 1]?.descDenominador !== ""
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
                componentesValues[componentSelect - 1]?.descDenominador || ""
              }
              onChange={(c) => {
                componentesValues[componentSelect - 1].descDenominador =
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
