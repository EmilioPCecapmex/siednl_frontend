import { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  List,
  ListItemButton,
  TextField,
  FormControl,
  Autocomplete,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import { FormulaDialogMA } from "../formulasDialog/FormulaDialogMA";
import { FormulaDialogMACA } from "../formulasDialog/FormulaDialogMACA";
import axios from "axios";
import { IComponenteMA } from "./Interfaces";
import { clearInfo } from "../genericComponents/GenericMethods";

//funcion main
export const TabActividadesMA = ({
  edit,
  setMAActividadesPadre,
  ComponentesActividadMA,
  MA,
  MIR,
}: {
  edit: boolean;
  setMAActividadesPadre: Function;
  ComponentesActividadMA: IComponenteMA[];
  MA: string;
  MIR: string;
}) => {
  const [componentesActividadValues, setComponentesActividadValues] = useState<
    IComponenteMA[]
  >(ComponentesActividadMA);

  const [componenteSelect, setComponenteSelect] = useState(0);
  const [actividadSelect, setActividadSelect] = useState(0);

  let MAEdit =
    MA === "" ? "" : JSON.parse(MA).length > 1 ? JSON.parse(MA)[1] : "";

  useEffect(() => {
    setMAActividadesPadre(componentesActividadValues);
  }, []);

  const [open, setOpen] = useState(0);

  const handleClickComponente = (index: number) => {
    setOpen(index);
  };

  const [openFormulaDialog, setOpenFormulaDialog] = useState(false);
  const [tipoFormula, setTipoFormula] = useState("");
  const [elementoFormula, setElementoFormula] = useState("");
  const [elementoFormulaActividad, setElementoFormulaActividad] = useState("");
  // revisado
  const handleClickOpen = () => {
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

    setElementoFormula("Componente " + componenteSelect.toString());
    setElementoFormulaActividad(
      "C" +
        (componenteSelect + 1).toString() +
        "A" +
        (actividadSelect + 1).toString()
    );
    setOpenFormulaDialog(true);
  };
  // revisado
  const handleClose = () => {
    setOpenFormulaDialog(false);
  };

  const changeFormula = (txt: string) => {
    if (
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
    ) {
      componentesActividadValues[componenteSelect].actividades[
        actividadSelect
      ].valorNumerador = txt;
      componentesActividadValues[componenteSelect].actividades[
        actividadSelect
      ].metaAnual = txt;
    } else {
      componentesActividadValues[componenteSelect].actividades[
        actividadSelect
      ].valorNumerador = txt.split(",")[0];
      componentesActividadValues[componenteSelect].actividades[
        actividadSelect
      ].valorDenominador = txt.split(",")[1];
      componentesActividadValues[componenteSelect].actividades[
        actividadSelect
      ].metaAnual = txt.split(",")[2];
    }
    setComponentesActividadValues([...componentesActividadValues]);
  };

  const [openFormulaDialogMACA, setOpenFormulaDialogMACA] = useState(false);

  const handleClickOpen2 = () => {
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
            .includes("tasa")
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
    setElementoFormula("Componente " + componenteSelect.toString());
    setElementoFormulaActividad(
      "C" +
        (componenteSelect + 1).toString() +
        "A" +
        (actividadSelect + 1).toString()
    );
    setOpenFormulaDialogMACA(true);
  };

  const handleClose2 = () => {
    setOpenFormulaDialogMACA(false);
  };

  const changeFormula2 = (txt: string, txtValores: string) => {
    if (
      tipoFormula.toLowerCase() === "índice" ||
      tipoFormula.toLowerCase() === "indice"
    ) {
      componentesActividadValues[componenteSelect].actividades[
        actividadSelect
      ].metasPorFrecuencia[0].trimestre1 = txt.split(",")[0];

      componentesActividadValues[componenteSelect].actividades[
        actividadSelect
      ].metasPorFrecuencia[0].trimestre2 = txt.split(",")[1];

      componentesActividadValues[componenteSelect].actividades[
        actividadSelect
      ].metasPorFrecuencia[0].trimestre3 = txt.split(",")[2];

      componentesActividadValues[componenteSelect].actividades[
        actividadSelect
      ].metasPorFrecuencia[0].trimestre4 = txt.split(",")[3];
    } else {
      componentesActividadValues[componenteSelect].actividades[
        actividadSelect
      ].metasPorFrecuencia[0].trimestre1 = txt.split(",")[0];

      componentesActividadValues[componenteSelect].actividades[
        actividadSelect
      ].metasPorFrecuencia[0].trimestre2 = txt.split(",")[1];

      componentesActividadValues[componenteSelect].actividades[
        actividadSelect
      ].metasPorFrecuencia[0].trimestre3 = txt.split(",")[2];

      componentesActividadValues[componenteSelect].actividades[
        actividadSelect
      ].metasPorFrecuencia[0].trimestre4 = txt.split(",")[3];

      componentesActividadValues[componenteSelect].actividades[
        actividadSelect
      ].valoresPorFrecuencia[0].valorA = txtValores.split(",")[0];
      componentesActividadValues[componenteSelect].actividades[
        actividadSelect
      ].valoresPorFrecuencia[0].valorB = txtValores.split(",")[1];
      componentesActividadValues[componenteSelect].actividades[
        actividadSelect
      ].valoresPorFrecuencia[0].valorC = txtValores.split(",")[2];
      componentesActividadValues[componenteSelect].actividades[
        actividadSelect
      ].valoresPorFrecuencia[0].valorD = txtValores.split(",")[3];
      componentesActividadValues[componenteSelect].actividades[
        actividadSelect
      ].valoresPorFrecuencia[0].valorE = txtValores.split(",")[4];
      componentesActividadValues[componenteSelect].actividades[
        actividadSelect
      ].valoresPorFrecuencia[0].valorF = txtValores.split(",")[5];
      componentesActividadValues[componenteSelect].actividades[
        actividadSelect
      ].valoresPorFrecuencia[0].valorG = txtValores.split(",")[6];
      componentesActividadValues[componenteSelect].actividades[
        actividadSelect
      ].valoresPorFrecuencia[0].valorH = txtValores.split(",")[7];
    }
    setComponentesActividadValues([...componentesActividadValues]);
  };

  const [catalogoUnidadResponsable, setCatalogoUnidadResponsable] = useState([
    {
      Id: "",
      Label: "",
    },
  ]);

  const getUnidades = () => {
    // axios
    //   .get(
    //     process.env.REACT_APP_APPLICATION_BACK + "/api/listadoUnidadesInst",
    //     {
    //       params: {
    //         Institucion: "a52a01f1-56cf-11ed-a988-040300000000",
    //       },

    //       headers: {
    //         Authorization: localStorage.getItem("jwtToken") || "",
    //       },
    //     }
    //   )

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
    getListasLogin(
      {
        Tabla: "EntidadesHijas",
        ValorCondicion: JSON.parse(MIR).encabezado.entidad.Id,
      },
      setCatalogoUnidadResponsable
    );
  }, [MA]);

  //Se crea funcion para encontrar indice, funciona hasta para 3 componentes y hasta para 3 actividades por componente
  //Se realiza de está manera por formato de JSON
  function mapeaindice(c = 0, a = 0) {
    let x = 0;
    //Componente 1
    c === 0 && a === 0
      ? (x = 0)
      : c === 0 && a === 1
      ? (x = 1)
      : c === 1 && a === 0
      ? (x = 2)
      : (x = 3);

    return x;
  }

  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const initialPadding = '\n\n';
  //return main
  return (
    <Grid
      // visibility={show ? "visible" : "hidden"}
      // position="absolute"
      sx={{
        display: "flex",
        width: "93vw",
        height: "82vh",
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
        elementoA={elementoFormulaActividad}
        MIR={MIR}
        MA={MA || ""}
        index={0}
        tab={""}
        index2={0}
      />
      <FormulaDialogMACA
        open={openFormulaDialogMACA}
        close={handleClose2}
        textoSet={changeFormula2}
        tipo={tipoFormula}
        elemento={elementoFormula}
        elementoA={elementoFormulaActividad}
        MIR={MIR}
        frecuencia={"trimestral"}
        valores={JSON.stringify(
          componentesActividadValues[componenteSelect].actividades[
            actividadSelect
          ]
        )}
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
        <Tooltip title="RESUMEN ACTIVIDADES">
          <InfoOutlinedIcon
            onClick={() => {
              // showMirFnc(true);
              // setTxtShowFnc("Actividades");
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
                        fontSize: [10, 10, 10, 13, 15, 18],
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
                                fontSize: [10, 10, 10, 13, 15, 18],
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
          display={"flex"}
          justifyContent={"space-evenly"}
          alignItems={"center"}
          sx={{
            "& > .MuiGrid-item": {
              marginBottom: "20px", // Ajusta la cantidad de espacio vertical entre los elementos
            },
          }}
        >
          {isSmallScreen && (
            <List>
              {componentesActividadValues.map((componente, index) => {
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
                          fontSize: [10, 10, 10, 13, 15, 18],
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
                                  fontSize: [10, 10, 10, 13, 15, 18],
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
          <Grid sx={{ width: "90%", gridColumn: "1/4" }}>
            <Typography
              sx={{
                fontFamily: "MontserratSemiBold",
                // fontSize: "1vw",
                textAlign: "center",
              }}
            >
              {
                JSON.parse(MIR).componentes[componenteSelect].actividades[
                  actividadSelect
                ].resumen
              }
            </Typography>
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
              // disabled={
              //   (MAEdit !== ""
              //     ? MAEdit?.actividades[
              //         mapeaindice(componenteSelect, actividadSelect)
              //       ]?.metaAnual
              //     : false) &&
              //   componentesActividadValues[componenteSelect].actividades[
              //     actividadSelect
              //   ]?.metaAnual !== ""
              // }

              disabled={
                edit &&
                !MAEdit?.componentes[componenteSelect].actividades[
                  actividadSelect
                ]?.metaAnual
              }
              sx={{ boxShadow: 2 }}
              variant={"filled"}
              label={
                <Typography
                  sx={{
                    fontSize: [10, 10, 10, 13, 15, 18],
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
              onClick={() => handleClickOpen()}
              value={
                componentesActividadValues[componenteSelect].actividades[
                  actividadSelect
                ]?.metaAnual || ""
              }
              error={
                parseFloat(
                  componentesActividadValues[componenteSelect].actividades[
                    actividadSelect
                  ]?.metaAnual
                ) <= 0 ||
                componentesActividadValues[componenteSelect].actividades[
                  actividadSelect
                ]?.metaAnual !==
                  componentesActividadValues[componenteSelect].actividades[
                    actividadSelect
                  ]?.metasPorFrecuencia[0]?.trimestre4
                  ? true
                  : false
              }
              helperText={
                parseFloat(
                  componentesActividadValues[componenteSelect].actividades[
                    actividadSelect
                  ]?.metaAnual
                ) <= 0 ||
                componentesActividadValues[componenteSelect].actividades[
                  actividadSelect
                ]?.metaAnual !==
                  componentesActividadValues[componenteSelect].actividades[
                    actividadSelect
                  ]?.metasPorFrecuencia[0]?.trimestre4
                  ? "El valor de la meta anual debe coincidir con el valor del trimestre 4, verifica los valores"
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
              // disabled={
              //   (MAEdit !== ""
              //     ? MAEdit?.actividades[
              //         mapeaindice(componenteSelect, actividadSelect)
              //       ]?.lineaBase
              //     : false) &&
              //   componentesActividadValues[componenteSelect].actividades[
              //     actividadSelect
              //   ]?.lineaBase !== ""
              // }
              disabled={
                edit &&
                !MAEdit?.componentes[componenteSelect].actividades[
                  actividadSelect
                ]?.lineaBase
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
                (parseFloat(
                  componentesActividadValues[componenteSelect].actividades[
                    actividadSelect
                  ]?.lineaBase
                ) < 0 ||
                  isNaN(
                    parseFloat(
                      componentesActividadValues[componenteSelect].actividades[
                        actividadSelect
                      ]?.lineaBase
                    )
                  )) &&
                componentesActividadValues[componenteSelect].actividades[
                  actividadSelect
                ]?.lineaBase !== ""
                  ? true
                  : false
              }
              helperText={
                (parseFloat(
                  componentesActividadValues[componenteSelect].actividades[
                    actividadSelect
                  ]?.lineaBase
                ) <= 0 ||
                  isNaN(
                    parseFloat(
                      componentesActividadValues[componenteSelect].actividades[
                        actividadSelect
                      ]?.lineaBase
                    )
                  )) &&
                componentesActividadValues[componenteSelect].actividades[
                  actividadSelect
                ]?.lineaBase !== ""
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
              value={
                componentesActividadValues[componenteSelect].actividades[
                  actividadSelect
                ]?.lineaBase || ""
              }
              onChange={(c) => {
                let y = [...componentesActividadValues];
                y[componenteSelect].actividades[actividadSelect].lineaBase =
                  clearInfo(c.target.value);

                setComponentesActividadValues(y);
              }}
            />
          </Grid>

          {JSON.parse(MIR)
            .componentes[componenteSelect].actividades[
              actividadSelect
            ].indicador.toUpperCase()
            .includes("INDICE") ||
          JSON.parse(MIR)
            .componentes[componenteSelect].actividades[
              actividadSelect
            ].indicador.toUpperCase()
            .includes("ÍNDICE") ? (
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
                // disabled={
                //   (MAEdit !== ""
                //     ? MAEdit?.actividades[
                //         mapeaindice(componenteSelect, actividadSelect)
                //       ]?.valorNumerador
                //     : false) &&
                //   componentesActividadValues[componenteSelect].actividades[
                //     actividadSelect
                //   ]?.valorNumerador !== ""
                // }
                disabled={
                  edit &&
                  !MAEdit?.componentes[componenteSelect].actividades[
                    actividadSelect
                  ]?.valorNumerador
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
                onClick={() => handleClickOpen()}
                value={
                  componentesActividadValues[componenteSelect].actividades[
                    actividadSelect
                  ]?.valorNumerador || ""
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
                columnGap: 2,
              }}
            >
              <TextField
                // disabled={
                //   (MAEdit !== ""
                //     ? MAEdit?.actividades[
                //         mapeaindice(componenteSelect, actividadSelect)
                //       ]?.valorNumerador
                //     : false) &&
                //   componentesActividadValues[componenteSelect].actividades[
                //     actividadSelect
                //   ]?.valorNumerador !== ""
                // }
                disabled={
                  edit &&
                  !MAEdit?.componentes[componenteSelect].actividades[
                    actividadSelect
                  ]?.valorNumerador
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
                    ? MAEdit?.actividades[
                        mapeaindice(componenteSelect, actividadSelect)
                      ]?.valorNumerador
                    : false) &&
                  componentesActividadValues[componenteSelect].actividades[
                    actividadSelect
                  ]?.valorNumerador !== ""
                    ? ""
                    : handleClickOpen()
                }
                value={
                  componentesActividadValues[componenteSelect].actividades[
                    actividadSelect
                  ]?.valorNumerador || ""
                }
              />
              <TextField
                // disabled={
                //   (MAEdit !== ""
                //     ? MAEdit?.actividades[
                //         mapeaindice(componenteSelect, actividadSelect)
                //       ]?.valorDenominador
                //     : false) &&
                //   componentesActividadValues[componenteSelect].actividades[
                //     actividadSelect
                //   ]?.valorDenominador !== ""
                // }
                disabled={
                  edit &&
                  !MAEdit?.componentes[componenteSelect].actividades[
                    actividadSelect
                  ]?.valorDenominador
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
                onClick={() => handleClickOpen()}
                value={
                  componentesActividadValues[componenteSelect].actividades[
                    actividadSelect
                  ]?.valorDenominador || ""
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
              // disabled={
              //   (MAEdit !== ""
              //     ? MAEdit?.actividades[
              //         mapeaindice(componenteSelect, actividadSelect)
              //       ]?.sentidoDelIndicador
              //     : false) &&
              //   componentesActividadValues[componenteSelect].actividades[
              //     actividadSelect
              //   ]?.sentidoDelIndicador !== ""
              // }
              disabled={
                edit &&
                !MAEdit?.componentes[componenteSelect].actividades[
                  actividadSelect
                ]?.sentidoDelIndicador
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
                      componentesActividadValues[componenteSelect].actividades[
                        actividadSelect
                      ]?.sentidoDelIndicador === "ASCENDENTE"
                    }
                    onChange={(c) => {
                      let y = [...componentesActividadValues];
                      y[componenteSelect].actividades[
                        actividadSelect
                      ].sentidoDelIndicador = c.target.value;
                      setComponentesActividadValues(y);
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
                      componentesActividadValues[componenteSelect].actividades[
                        actividadSelect
                      ]?.sentidoDelIndicador === "DESCENDENTE"
                    }
                    onChange={(c) => {
                      let y = [...componentesActividadValues];
                      y[componenteSelect].actividades[
                        actividadSelect
                      ].sentidoDelIndicador = c.target.value;
                      setComponentesActividadValues(y);
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
                      componentesActividadValues[componenteSelect].actividades[
                        actividadSelect
                      ]?.sentidoDelIndicador === "NORMAL"
                    }
                    onChange={(c) => {
                      let y = [...componentesActividadValues];
                      y[componenteSelect].actividades[
                        actividadSelect
                      ].sentidoDelIndicador = c.target.value;
                      setComponentesActividadValues(y);
                    }}
                  />
                }
              />
            </FormControl>
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
                // disabled={
                //   (MAEdit !== ""
                //     ? MAEdit?.actividades[
                //         mapeaindice(componenteSelect, actividadSelect)
                //       ]?.metasPorFrecuencia[0].trimestre1
                //     : false) &&
                //   componentesActividadValues[componenteSelect].actividades[
                //     actividadSelect
                //   ]?.metasPorFrecuencia[0].trimestre1 !== ""
                // }
                disabled={
                  edit &&
                  !MAEdit?.componentes[componenteSelect].actividades[
                    actividadSelect
                  ]?.metasPorFrecuencia[0].trimestre1
                }
                sx={{ boxShadow: 2 }}
                variant={"filled"}
                onClick={() => handleClickOpen2()}
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
                  componentesActividadValues[componenteSelect].actividades[
                    actividadSelect
                  ]?.metasPorFrecuencia[0].trimestre1
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
                // disabled={
                //   (MAEdit !== ""
                //     ? MAEdit?.actividades[
                //         mapeaindice(componenteSelect, actividadSelect)
                //       ]?.metasPorFrecuencia[0].trimestre2
                //     : false) &&
                //   componentesActividadValues[componenteSelect].actividades[
                //     actividadSelect
                //   ]?.metasPorFrecuencia[0].trimestre2 !== ""
                // }
                disabled={
                  edit &&
                  !MAEdit?.componentes[componenteSelect].actividades[
                    actividadSelect
                  ]?.metasPorFrecuencia[0].trimestre2
                }
                sx={{ boxShadow: 2 }}
                variant={"filled"}
                onClick={() => handleClickOpen2()}
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
                  componentesActividadValues[componenteSelect].actividades[
                    actividadSelect
                  ]?.metasPorFrecuencia[0].trimestre2 || ""
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
                // disabled={
                //   (MAEdit !== ""
                //     ? MAEdit?.actividades[
                //         mapeaindice(componenteSelect, actividadSelect)
                //       ]?.metasPorFrecuencia[0].trimestre3
                //     : false) &&
                //   componentesActividadValues[componenteSelect].actividades[
                //     actividadSelect
                //   ]?.metasPorFrecuencia[0].trimestre3 !== ""
                // }
                disabled={
                  edit &&
                  !MAEdit?.componentes[componenteSelect].actividades[
                    actividadSelect
                  ]?.metasPorFrecuencia[0].trimestre3
                }
                sx={{ boxShadow: 2 }}
                variant={"filled"}
                onClick={() => handleClickOpen2()}
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
                  componentesActividadValues[componenteSelect].actividades[
                    actividadSelect
                  ]?.metasPorFrecuencia[0].trimestre3 || ""
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
                // disabled={
                //   (MAEdit !== ""
                //     ? MAEdit?.actividades[
                //         mapeaindice(componenteSelect, actividadSelect)
                //       ]?.metasPorFrecuencia[0].trimestre4
                //     : false) &&
                //   componentesActividadValues[componenteSelect].actividades[
                //     actividadSelect
                //   ]?.metasPorFrecuencia[0].trimestre4 !== ""
                // }
                disabled={
                  edit &&
                  !MAEdit?.componentes[componenteSelect].actividades[
                    actividadSelect
                  ]?.metasPorFrecuencia[0].trimestre4
                }
                sx={{ boxShadow: 2 }}
                variant={"filled"}
                onClick={() => handleClickOpen2()}
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
                  componentesActividadValues[componenteSelect].actividades[
                    actividadSelect
                  ]?.metasPorFrecuencia[0].trimestre4 || ""
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
            <FormControl sx={{ width: "25vw" }}>
              <Autocomplete
                clearText="Borrar"
                noOptionsText="Sin opciones"
                closeText="Cerrar"
                openText="Abrir"
                // disabled={
                //   (MAEdit !== ""
                //     ? MAEdit?.actividades[
                //         mapeaindice(componenteSelect, actividadSelect)
                //       ]?.unidadResponsable
                //     : false) &&
                //   componentesActividadValues[componenteSelect].actividades[
                //     actividadSelect
                //   ]?.unidadResponsable !== ""
                // }
                disabled={
                  edit &&
                  !MAEdit?.componentes[componenteSelect].actividades[
                    actividadSelect
                  ]?.unidadResponsable
                }
                options={catalogoUnidadResponsable}
                getOptionLabel={(option) => option.Label}
                value={{
                  Id: catalogoUnidadResponsable[0].Id,
                  Label:
                    componentesActividadValues[componenteSelect].actividades[
                      actividadSelect
                    ]?.unidadResponsable,
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
                        whiteSpace: "pre-wrap",
                      },
                    }}
                  ></TextField>
                )}
                onChange={(event, value) => {
                  let y = [...componentesActividadValues];
                  componentesActividadValues[componenteSelect].actividades[
                    actividadSelect
                  ].unidadResponsable = value?.Label || "";
                  setComponentesActividadValues(y);
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
              // disabled={
              //   (MAEdit !== ""
              //     ? MAEdit?.actividades[
              //         mapeaindice(componenteSelect, actividadSelect)
              //       ]?.descIndicador
              //     : false) &&
              //   componentesActividadValues[componenteSelect].actividades[
              //     actividadSelect
              //   ]?.descIndicador !== ""
              // }
              disabled={
                edit &&
                !MAEdit?.componentes[componenteSelect].actividades[
                  actividadSelect
                ]?.descIndicador
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
                    whiteSpace: "pre-wrap",
                  }}
                >
                  DESCRIPCIÓN DEL INDICADOR
                </Typography>
              }
              value={
                initialPadding+componentesActividadValues[componenteSelect].actividades[
                  actividadSelect
                ]?.descIndicador || ""
              }
              onChange={(c) => {
                let y = [...componentesActividadValues];
                componentesActividadValues[componenteSelect].actividades[
                  actividadSelect
                ].descIndicador = clearInfo(c.target.value);
                setComponentesActividadValues(y);
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
              // disabled={
              //   (MAEdit !== ""
              //     ? MAEdit?.actividades[
              //         mapeaindice(componenteSelect, actividadSelect)
              //       ]?.descNumerador
              //     : false) &&
              //   componentesActividadValues[componenteSelect].actividades[
              //     actividadSelect
              //   ]?.descNumerador !== ""
              // }
              disabled={
                edit &&
                !MAEdit?.componentes[componenteSelect].actividades[
                  actividadSelect
                ]?.descNumerador
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
                    whiteSpace: "pre-wrap",
                  }}
                >
                  DESCRIPCIÓN DEL NUMERADOR
                </Typography>
              }
              value={
                initialPadding+componentesActividadValues[componenteSelect].actividades[
                  actividadSelect
                ]?.descNumerador || ""
              }
              onChange={(c) => {
                let y = [...componentesActividadValues];
                componentesActividadValues[componenteSelect].actividades[
                  actividadSelect
                ].descNumerador = clearInfo(c.target.value);
                setComponentesActividadValues(y);
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
              // disabled={
              //   (MAEdit !== ""
              //     ? MAEdit?.actividades[
              //         mapeaindice(componenteSelect, actividadSelect)
              //       ]?.descDenominador
              //     : false) &&
              //   componentesActividadValues[componenteSelect].actividades[
              //     actividadSelect
              //   ]?.descDenominador !== ""
              // }
              disabled={
                edit &&
                !MAEdit?.componentes[componenteSelect].actividades[
                  actividadSelect
                ]?.descDenominador
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
                    whiteSpace: "pre-wrap",
                  }}
                >
                  DESCRIPCIÓN DEL DENOMINADOR
                </Typography>
              }
              value={
                initialPadding+componentesActividadValues[componenteSelect].actividades[
                  actividadSelect
                ]?.descDenominador || ""
              }
              onChange={(c) => {
                let y = [...componentesActividadValues];
                componentesActividadValues[componenteSelect].actividades[
                  actividadSelect
                ].descDenominador = clearInfo(c.target.value);
                setComponentesActividadValues(y);
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
