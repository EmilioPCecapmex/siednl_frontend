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
import { IComponenteActividad } from "../tabsMir/AddMir";
import axios from "axios";

//funcion main
export const TabActividadesMA = ({
  show,
  componentes,
  asignarCValor,
  compAct,
  showMirFnc,
  setTxtShowFnc,
  MA,
  MIR,
}: {
  show: boolean;
  componentes: number[];
  asignarCValor: Function;
  compAct: Array<IComponenteActividad>;
  showMirFnc: Function;
  setTxtShowFnc: Function;
  MA: string;
  MIR: string;
}) => {
  // business logic-------------------------------------------------------------------------------
  const componenteActividad = [
    {
      componentes: componentes.map((x) => compAct),
    },
  ];

  const [componenteSelect, setComponenteSelect] = useState(0);
  const [actividadSelect, setActividadSelect] = useState(0);

  let jsonMA =
    MA === ""
      ? ""
      : JSON.parse(MA).length > 1
      ? JSON.parse(MA)[0]
      : JSON.parse(MA);

  let MAEdit =
    MA === "" ? "" : JSON.parse(MA).length > 1 ? JSON.parse(MA)[1] : "";

  const [aValorMA, setAValorMA] = useState(
    componenteActividad.map((item) => {
      return {
        componentes: item.componentes.map((x, index) => {
          return {
            actividades: x.map((c, index2) => {
              return {
                actividad: "A" + (index2 + 1) + "C" + (index + 1),
                metaAnual: "",
                lineaBase: "",
                metasPorFrecuencia: [
                  {
                    trimestre1: "",
                    trimestre2: "",
                    trimestre3: "",
                    trimestre4: "",
                  },
                ],
                valorNumerador: "",
                valorDenominador: "",
                sentidoDelIndicador: "",
                unidadResponsable: "",
                descIndicador: "",
                descNumerador: "",
                descDenominador: "",
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compAct]);

  useEffect(() => {
    asignarCValor(aValorMA);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aValorMA]);

  let aument_number = -1;

  const loadActividadesMA = () => {
    let y = componenteActividad.map((item) => {
      return {
        componentes: compAct.map((x, index) => {
          return {
            actividades: x.actividades.map((c, index2) => {
              aument_number++;

              return {
                actividad: "A" + (index2 + 1) + "C" + (index + 1),
                metaAnual:
                  MA === ""
                    ? ""
                    : jsonMA.actividades[aument_number]?.metaAnual || "",
                lineaBase:
                  MA === ""
                    ? ""
                    : jsonMA.actividades[aument_number]?.lineaBase || "",
                metasPorFrecuencia: [
                  {
                    trimestre1:
                      MA === ""
                        ? ""
                        : jsonMA.actividades[aument_number]
                            ?.metasPorFrecuencia[0]?.trimestre1 || "",
                    trimestre2:
                      MA === ""
                        ? ""
                        : jsonMA.actividades[aument_number]
                            ?.metasPorFrecuencia[0]?.trimestre2 || "",
                    trimestre3:
                      MA === ""
                        ? ""
                        : jsonMA.actividades[aument_number]
                            ?.metasPorFrecuencia[0]?.trimestre3 || "",
                    trimestre4:
                      MA === ""
                        ? ""
                        : jsonMA.actividades[aument_number]
                            ?.metasPorFrecuencia[0]?.trimestre4 || "",
                  },
                ],
                valorNumerador:
                  MA === ""
                    ? ""
                    : jsonMA.actividades[aument_number]?.valorNumerador || "",
                valorDenominador:
                  MA === ""
                    ? ""
                    : jsonMA.actividades[aument_number]?.valorDenominador || "",
                sentidoDelIndicador:
                  MA === ""
                    ? ""
                    : jsonMA.actividades[aument_number]?.sentidoDelIndicador ||
                      "",
                unidadResponsable:
                  MA === ""
                    ? ""
                    : jsonMA.actividades[aument_number]?.unidadResponsable ||
                      "",
                descIndicador:
                  MA === ""
                    ? ""
                    : jsonMA.actividades[aument_number]?.descIndicador || "",
                descNumerador:
                  MA === ""
                    ? ""
                    : jsonMA.actividades[aument_number]?.descNumerador || "",
                descDenominador:
                  MA === ""
                    ? ""
                    : jsonMA.actividades[aument_number]?.descDenominador || "",
              };
            }),
          };
        }),
      };
    });
    console.log("y:", y);

    setAValorMA(y);
  };

  const [open, setOpen] = useState(1);

  const handleClickComponente = (index: number) => {
    setOpen(index);
  };

  const [openFormulaDialog, setOpenFormulaDialog] = useState(false);
  const [tipoFormula, setTipoFormula] = useState("");
  const [elementoFormula, setElementoFormula] = useState("");

  const handleClickOpen = () => {
    setTipoFormula(
      JSON.parse(MIR)
        .actividades[actividadSelect].indicador.toUpperCase()
        .includes("PORCENTAJE") ||
        JSON.parse(MIR)
          .actividades[actividadSelect].indicador.toUpperCase()
          .includes("PORCENTAJE")
        ? "Porcentaje"
        : JSON.parse(MIR)
            .actividades[actividadSelect].indicador.toUpperCase()
            .includes("TASA") ||
          JSON.parse(MIR)
            .actividades[actividadSelect].indicador.toUpperCase()
            .includes("TASA")
        ? "Tasa"
        : JSON.parse(MIR)
            .actividades[actividadSelect].indicador.toUpperCase()
            .includes("INDICE" || "ÍNDICE") ||
          JSON.parse(MIR)
            .actividades[actividadSelect].indicador.toUpperCase()
            .includes("INDICE") ||
          JSON.parse(MIR)
            .actividades[actividadSelect].indicador.toUpperCase()
            .includes("ÍNDICE")
        ? "Índice"
        : JSON.parse(MIR)
            .actividades[actividadSelect].indicador.toUpperCase()
            .includes("PROMEDIO") ||
          JSON.parse(MIR)
            .actividades[actividadSelect].indicador.toUpperCase()
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

  const handleClose = () => {
    setOpenFormulaDialog(false);
  };

  const changeFormula = (txt: string) => {
    if (
      JSON.parse(MIR)
        .actividades[actividadSelect].indicador.toUpperCase()
        .includes("INDICE") ||
      JSON.parse(MIR)
        .actividades[actividadSelect].indicador.toUpperCase()
        .includes("ÍNDICE")
    ) {
      aValorMA[0].componentes[componenteSelect].actividades[
        actividadSelect
      ].valorNumerador = txt;
      aValorMA[0].componentes[componenteSelect].actividades[
        actividadSelect
      ].metaAnual = txt;
    } else {
      aValorMA[0].componentes[componenteSelect].actividades[
        actividadSelect
      ].valorNumerador = txt.split(",")[0];
      aValorMA[0].componentes[componenteSelect].actividades[
        actividadSelect
      ].valorDenominador = txt.split(",")[1];
      aValorMA[0].componentes[componenteSelect].actividades[
        actividadSelect
      ].metaAnual = txt.split(",")[2];
    }
    setAValorMA([...aValorMA]);
  };
  const [openFormulaDialogMACA, setOpenFormulaDialogMACA] = useState(false);

  const handleClickOpen2 = () => {
    setTipoFormula(
      JSON.parse(MIR).actividades[actividadSelect].indicador.includes(
        "PORCENTAJE"
      ) ||
        JSON.parse(MIR)
          .actividades[actividadSelect].indicador.toUpperCase()
          .includes("PORCENTAJE")
        ? "Porcentaje"
        : JSON.parse(MIR).actividades[actividadSelect].indicador.includes(
            "TASA"
          ) ||
          JSON.parse(MIR)
            .actividades[actividadSelect].indicador.toUpperCase()
            .includes("TASA")
        ? "Tasa"
        : JSON.parse(MIR).actividades[actividadSelect].indicador.includes(
            "INDICE" || "ÍNDICE"
          ) ||
          JSON.parse(MIR)
            .actividades[actividadSelect].indicador.toUpperCase()
            .includes("INDICE") ||
          JSON.parse(MIR)
            .actividades[actividadSelect].indicador.toUpperCase()
            .includes("ÍNDICE")
        ? "Índice"
        : JSON.parse(MIR).actividades[actividadSelect].indicador.includes(
            "PROMEDIO"
          ) ||
          JSON.parse(MIR)
            .actividades[actividadSelect].indicador.toUpperCase()
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
    setOpenFormulaDialogMACA(true);
  };

  const handleClose2 = () => {
    setOpenFormulaDialogMACA(false);
  };

  const changeFormula2 = (txt: string) => {
    aValorMA[0].componentes[componenteSelect].actividades[
      actividadSelect
    ].metasPorFrecuencia[0].trimestre1 = txt.split(",")[0];
    aValorMA[0].componentes[componenteSelect].actividades[
      actividadSelect
    ].metasPorFrecuencia[0].trimestre2 = txt.split(",")[1];
    aValorMA[0].componentes[componenteSelect].actividades[
      actividadSelect
    ].metasPorFrecuencia[0].trimestre3 = txt.split(",")[2];
    aValorMA[0].componentes[componenteSelect].actividades[
      actividadSelect
    ].metasPorFrecuencia[0].trimestre4 = txt.split(",")[3];
    setAValorMA([...aValorMA]);
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





  const getListasLogin = (datos:any,setState:Function) => {
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
    // console.log("MA: ",MA);
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
        frecuencia={"trimestral"}
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
          COMPONENTE #{componenteSelect + 1} - ACTIVIDAD # {actividadSelect + 1}
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
            {componentes.map((item, index) => {
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
                      sx={{
                        fontFamily: "MontserratMedium",
                        fontSize: [10, 10, 10, 13, 15, 18],
                      }}
                    >
                      COMPONENTE {item}
                    </Typography>

                    {open === item ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={open === item} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {aValorMA[0].componentes[
                        componenteSelect
                      ].actividades.map((value, x) => {
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
              {componentes.map((item, index) => {
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
                        sx={{
                          fontFamily: "MontserratMedium",
                          fontSize: [10, 10, 10, 13, 15, 18],
                        }}
                      >
                        COMPONENTE {item}
                      </Typography>

                      {open === item ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open === item} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {aValorMA[0].componentes[
                          componenteSelect
                        ].actividades.map((value, x) => {
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
                  ? MAEdit?.actividades[
                      mapeaindice(componenteSelect, actividadSelect)
                    ]?.metaAnual
                  : false) &&
                aValorMA[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ]?.metaAnual !== ""
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
              onClick={() =>
                (MAEdit !== ""
                  ? MAEdit?.actividades[
                      mapeaindice(componenteSelect, actividadSelect)
                    ]?.metaAnual
                  : false) &&
                aValorMA[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ]?.metaAnual !== ""
                  ? ""
                  : handleClickOpen()
              }
              value={
                aValorMA[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ]?.metaAnual || ""
              }
              error={
                parseFloat(
                  aValorMA[0].componentes[componenteSelect].actividades[
                    actividadSelect
                  ]?.metaAnual
                ) < 0 ||
                aValorMA[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ]?.metaAnual !==
                  aValorMA[0].componentes[componenteSelect].actividades[
                    actividadSelect
                  ]?.metasPorFrecuencia[0]?.trimestre4
                  ? true
                  : false
              }
              helperText={
                parseFloat(
                  aValorMA[0].componentes[componenteSelect].actividades[
                    actividadSelect
                  ]?.metaAnual
                ) < 0 ||
                aValorMA[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ]?.metaAnual !==
                  aValorMA[0].componentes[componenteSelect].actividades[
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
              disabled={
                (MAEdit !== ""
                  ? MAEdit?.actividades[
                      mapeaindice(componenteSelect, actividadSelect)
                    ]?.lineaBase
                  : false) &&
                aValorMA[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ]?.lineaBase !== ""
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
                  aValorMA[0].componentes[componenteSelect].actividades[
                    actividadSelect
                  ]?.lineaBase
                ) < 0 ||
                  isNaN(
                    parseFloat(
                      aValorMA[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ]?.lineaBase
                    )
                  )) &&
                aValorMA[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ]?.lineaBase !== ""
                  ? true
                  : false
              }
              helperText={
                (parseFloat(
                  aValorMA[0].componentes[componenteSelect].actividades[
                    actividadSelect
                  ]?.lineaBase
                ) < 0 ||
                  isNaN(
                    parseFloat(
                      aValorMA[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ]?.lineaBase
                    )
                  )) &&
                aValorMA[0].componentes[componenteSelect].actividades[
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
                aValorMA[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ]?.lineaBase || ""
              }
              onChange={(c) => {
                let y = [...aValorMA];
                y[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ].lineaBase = c.target.value
                  .replaceAll('"', "")
                  .replaceAll("'", "")
                  .replaceAll("\n", "");
                setAValorMA(y);
              }}
            />
          </Grid>

          {JSON.parse(MIR)
            .actividades[actividadSelect].indicador.toUpperCase()
            .includes("INDICE") ||
          JSON.parse(MIR)
            .actividades[actividadSelect].indicador.toUpperCase()
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
                disabled={
                  (MAEdit !== ""
                    ? MAEdit?.actividades[
                        mapeaindice(componenteSelect, actividadSelect)
                      ]?.valorNumerador
                    : false) &&
                  aValorMA[0].componentes[componenteSelect].actividades[
                    actividadSelect
                  ]?.valorNumerador !== ""
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
                onClick={() =>
                  (MAEdit !== ""
                    ? MAEdit?.actividades[
                        mapeaindice(componenteSelect, actividadSelect)
                      ]?.valorNumerador
                    : false) &&
                  aValorMA[0].componentes[componenteSelect].actividades[
                    actividadSelect
                  ]?.valorNumerador !== ""
                    ? ""
                    : handleClickOpen()
                }
                value={
                  aValorMA[0].componentes[componenteSelect].actividades[
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
              }}
            >
              <TextField
                disabled={
                  (MAEdit !== ""
                    ? MAEdit?.actividades[
                        mapeaindice(componenteSelect, actividadSelect)
                      ]?.valorNumerador
                    : false) &&
                  aValorMA[0].componentes[componenteSelect].actividades[
                    actividadSelect
                  ]?.valorNumerador !== ""
                }
                sx={{ width: "45%", boxShadow: 2, mr: "2%" }}
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
                    ? MAEdit?.actividades[
                        mapeaindice(componenteSelect, actividadSelect)
                      ]?.valorNumerador
                    : false) &&
                  aValorMA[0].componentes[componenteSelect].actividades[
                    actividadSelect
                  ]?.valorNumerador !== ""
                    ? ""
                    : handleClickOpen()
                }
                value={
                  aValorMA[0].componentes[componenteSelect].actividades[
                    actividadSelect
                  ]?.valorNumerador || ""
                }
              />
              <TextField
                disabled={
                  (MAEdit !== ""
                    ? MAEdit?.actividades[
                        mapeaindice(componenteSelect, actividadSelect)
                      ]?.valorDenominador
                    : false) &&
                  aValorMA[0].componentes[componenteSelect].actividades[
                    actividadSelect
                  ]?.valorDenominador !== ""
                }
                sx={{ width: "45%", boxShadow: 2 }}
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
                    ? MAEdit?.actividades[
                        mapeaindice(componenteSelect, actividadSelect)
                      ]?.valorDenominador
                    : false) &&
                  aValorMA[0].componentes[componenteSelect].actividades[
                    actividadSelect
                  ]?.valorDenominador !== ""
                    ? ""
                    : handleClickOpen()
                }
                value={
                  aValorMA[0].componentes[componenteSelect].actividades[
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
              disabled={
                (MAEdit !== ""
                  ? MAEdit?.actividades[
                      mapeaindice(componenteSelect, actividadSelect)
                    ]?.sentidoDelIndicador
                  : false) &&
                aValorMA[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ]?.sentidoDelIndicador !== ""
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
                      aValorMA[0]?.componentes[componenteSelect].actividades[
                        actividadSelect
                      ]?.sentidoDelIndicador === "ASCENDENTE"
                    }
                    onChange={(c) => {
                      let y = [...aValorMA];
                      y[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].sentidoDelIndicador = c.target.value;
                      setAValorMA(y);
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
                      aValorMA[0]?.componentes[componenteSelect].actividades[
                        actividadSelect
                      ]?.sentidoDelIndicador === "DESCENDENTE"
                    }
                    onChange={(c) => {
                      let y = [...aValorMA];
                      y[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].sentidoDelIndicador = c.target.value;
                      setAValorMA(y);
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
                      aValorMA[0]?.componentes[componenteSelect].actividades[
                        actividadSelect
                      ]?.sentidoDelIndicador === "NORMAL"
                    }
                    onChange={(c) => {
                      let y = [...aValorMA];
                      y[0].componentes[componenteSelect].actividades[
                        actividadSelect
                      ].sentidoDelIndicador = c.target.value;
                      setAValorMA(y);
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
                disabled={
                  (MAEdit !== ""
                    ? MAEdit?.actividades[
                        mapeaindice(componenteSelect, actividadSelect)
                      ]?.metasPorFrecuencia[0].trimestre1
                    : false) &&
                  aValorMA[0].componentes[componenteSelect].actividades[
                    actividadSelect
                  ]?.metasPorFrecuencia[0].trimestre1 !== ""
                }
                sx={{ boxShadow: 2 }}
                variant={"filled"}
                onClick={() =>
                  (MAEdit !== ""
                    ? MAEdit?.actividades[
                        mapeaindice(componenteSelect, actividadSelect)
                      ]?.metasPorFrecuencia[0].trimestre1
                    : false) &&
                  aValorMA[0].componentes[componenteSelect].actividades[
                    actividadSelect
                  ]?.metasPorFrecuencia[0].trimestre1 !== ""
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
                  aValorMA[0].componentes[componenteSelect].actividades[
                    actividadSelect
                  ]?.metasPorFrecuencia[0].trimestre1 || ""
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
                    ? MAEdit?.actividades[
                        mapeaindice(componenteSelect, actividadSelect)
                      ]?.metasPorFrecuencia[0].trimestre2
                    : false) &&
                  aValorMA[0].componentes[componenteSelect].actividades[
                    actividadSelect
                  ]?.metasPorFrecuencia[0].trimestre2 !== ""
                }
                sx={{ boxShadow: 2 }}
                variant={"filled"}
                onClick={() =>
                  (MAEdit !== ""
                    ? MAEdit?.actividades[
                        mapeaindice(componenteSelect, actividadSelect)
                      ]?.metasPorFrecuencia[0].trimestre2
                    : false) &&
                  aValorMA[0].componentes[componenteSelect].actividades[
                    actividadSelect
                  ]?.metasPorFrecuencia[0].trimestre2 !== ""
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
                  aValorMA[0].componentes[componenteSelect].actividades[
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
                disabled={
                  (MAEdit !== ""
                    ? MAEdit?.actividades[
                        mapeaindice(componenteSelect, actividadSelect)
                      ]?.metasPorFrecuencia[0].trimestre3
                    : false) &&
                  aValorMA[0].componentes[componenteSelect].actividades[
                    actividadSelect
                  ]?.metasPorFrecuencia[0].trimestre3 !== ""
                }
                sx={{ boxShadow: 2 }}
                variant={"filled"}
                onClick={() =>
                  (MAEdit !== ""
                    ? MAEdit?.actividades[
                        mapeaindice(componenteSelect, actividadSelect)
                      ]?.metasPorFrecuencia[0].trimestre3
                    : false) &&
                  aValorMA[0].componentes[componenteSelect].actividades[
                    actividadSelect
                  ]?.metasPorFrecuencia[0].trimestre3 !== ""
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
                  aValorMA[0].componentes[componenteSelect].actividades[
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
                disabled={
                  (MAEdit !== ""
                    ? MAEdit?.actividades[
                        mapeaindice(componenteSelect, actividadSelect)
                      ]?.metasPorFrecuencia[0].trimestre4
                    : false) &&
                  aValorMA[0].componentes[componenteSelect].actividades[
                    actividadSelect
                  ]?.metasPorFrecuencia[0].trimestre4 !== ""
                }
                sx={{ boxShadow: 2 }}
                variant={"filled"}
                onClick={() =>
                  (MAEdit !== ""
                    ? MAEdit?.actividades[
                        mapeaindice(componenteSelect, actividadSelect)
                      ]?.metasPorFrecuencia[0].trimestre4
                    : false) &&
                  aValorMA[0].componentes[componenteSelect].actividades[
                    actividadSelect
                  ]?.metasPorFrecuencia[0].trimestre4 !== ""
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
                  aValorMA[0].componentes[componenteSelect].actividades[
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
                disabled={
                  (MAEdit !== ""
                    ? MAEdit?.actividades[
                        mapeaindice(componenteSelect, actividadSelect)
                      ]?.unidadResponsable
                    : false) &&
                  aValorMA[0].componentes[componenteSelect].actividades[
                    actividadSelect
                  ]?.unidadResponsable !== ""
                }
                options={catalogoUnidadResponsable}
                getOptionLabel={(option) => option.Label}
                value={{
                  Id: catalogoUnidadResponsable[0].Id,
                  Label:
                    aValorMA[0].componentes[componenteSelect].actividades[
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
                      },
                    }}
                  ></TextField>
                )}
                onChange={(event, value) => {
                  let y = [...aValorMA];
                  y[0].componentes[componenteSelect].actividades[
                    actividadSelect
                  ].unidadResponsable = value?.Label || "";
                  setAValorMA(y);
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
                  ? MAEdit?.actividades[
                      mapeaindice(componenteSelect, actividadSelect)
                    ]?.descIndicador
                  : false) &&
                aValorMA[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ]?.descIndicador !== ""
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
                aValorMA[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ]?.descIndicador || ""
              }
              onChange={(c) => {
                let y = [...aValorMA];
                y[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ].descIndicador = c.target.value
                  .replaceAll('"', "")
                  .replaceAll("'", "")
                  .replaceAll("\n", "");
                setAValorMA(y);
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
                  ? MAEdit?.actividades[
                      mapeaindice(componenteSelect, actividadSelect)
                    ]?.descNumerador
                  : false) &&
                aValorMA[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ]?.descNumerador !== ""
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
                aValorMA[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ]?.descNumerador || ""
              }
              onChange={(c) => {
                let y = [...aValorMA];
                y[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ].descNumerador = c.target.value
                  .replaceAll('"', "")
                  .replaceAll("'", "")
                  .replaceAll("\n", "");
                setAValorMA(y);
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
                  ? MAEdit?.actividades[
                      mapeaindice(componenteSelect, actividadSelect)
                    ]?.descDenominador
                  : false) &&
                aValorMA[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ]?.descDenominador !== ""
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
                aValorMA[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ]?.descDenominador || ""
              }
              onChange={(c) => {
                let y = [...aValorMA];
                y[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ].descDenominador = c.target.value
                  .replaceAll('"', "")
                  .replaceAll("'", "")
                  .replaceAll("\n", "");
                setAValorMA(y);
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
