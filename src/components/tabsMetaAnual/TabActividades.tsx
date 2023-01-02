import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItemButton,
  TextField,
  FormControl,
  Autocomplete,
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
  const [componenteActividad, setComponenteActividad] = useState([
    {
      componentes: componentes.map((x) => compAct),
    },
  ]);

  const [componenteSelect, setComponenteSelect] = useState(0);
  const [actividadSelect, setActividadSelect] = useState(0);

  let jsonMA = MA === "" ? "" : JSON.parse(MA);

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
  }, [compAct]);

  useEffect(() => {
    asignarCValor(aValorMA);
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
      JSON.parse(MIR).actividades[actividadSelect].indicador.includes(
        "PORCENTAJE"
      ) ||
      JSON.parse(MIR).actividades[actividadSelect].indicador.toUpperCase() === "PORCENTAJE"
        ? "Porcentaje"
        : JSON.parse(MIR).actividades[actividadSelect].indicador.includes(
            "TASA"
          ) ||
          JSON.parse(MIR).actividades[actividadSelect].indicador.toUpperCase() === "TASA"
        ? "Tasa"
        : JSON.parse(MIR).actividades[actividadSelect].indicador.includes(
            "INDICE" || "ÍNDICE"
          ) ||
          JSON.parse(MIR).actividades[actividadSelect].indicador.toUpperCase() === "INDICE" ||
          JSON.parse(MIR).actividades[actividadSelect].indicador.toUpperCase() === "ÍNDICE"
        ? "Índice"
        : JSON.parse(MIR).actividades[actividadSelect].indicador.includes(
            "PROMEDIO"
          ) ||
          JSON.parse(MIR).actividades[actividadSelect].indicador.toUpperCase() === "PROMEDIO"
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
    aValorMA[0].componentes[componenteSelect].actividades[
      actividadSelect
    ].valorNumerador = txt.split(",")[0];
    aValorMA[0].componentes[componenteSelect].actividades[
      actividadSelect
    ].valorDenominador = txt.split(",")[1];
    aValorMA[0].componentes[componenteSelect].actividades[
      actividadSelect
    ].metaAnual = txt.split(",")[2] ;
    setAValorMA([...aValorMA]);
  };
  const [openFormulaDialogMACA, setOpenFormulaDialogMACA] = useState(false);

  const handleClickOpen2 = () => {
    setTipoFormula(
      JSON.parse(MIR).actividades[actividadSelect].indicador.includes(
        "PORCENTAJE"
      ) ||
      JSON.parse(MIR).actividades[actividadSelect].indicador.toUpperCase() === "PORCENTAJE"
        ? "Porcentaje"
        : JSON.parse(MIR).actividades[actividadSelect].indicador.includes(
            "TASA"
          ) ||
          JSON.parse(MIR).actividades[actividadSelect].indicador.toUpperCase() === "TASA"
        ? "Tasa"
        : JSON.parse(MIR).actividades[actividadSelect].indicador.includes(
            "INDICE" || "ÍNDICE"
          ) ||
          JSON.parse(MIR).actividades[actividadSelect].indicador.toUpperCase() === "INDICE" ||
          JSON.parse(MIR).actividades[actividadSelect].indicador.toUpperCase() === "ÍNDICE"
        ? "Índice"
        : JSON.parse(MIR).actividades[actividadSelect].indicador.includes(
            "PROMEDIO"
          ) ||
          JSON.parse(MIR).actividades[actividadSelect].indicador.toUpperCase() === "PROMEDIO"
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
    ].metasPorFrecuencia[0].trimestre1 = txt.split(",")[0] ;
    aValorMA[0].componentes[componenteSelect].actividades[
      actividadSelect
    ].metasPorFrecuencia[0].trimestre2 = txt.split(",")[1] ;
    aValorMA[0].componentes[componenteSelect].actividades[
      actividadSelect
    ].metasPorFrecuencia[0].trimestre3 = txt.split(",")[2] ;
    aValorMA[0].componentes[componenteSelect].actividades[
      actividadSelect
    ].metasPorFrecuencia[0].trimestre4 = txt.split(",")[3] ;
    setAValorMA([...aValorMA]);
  };

  const [catalogoUnidadResponsable, setCatalogoUnidadResponsable] = useState([
    {
      Id: 0,
      Unidad: "",
    },
  ]);

  const getUnidades = () => {
    axios
      .get("http://10.200.4.105:8000/api/listadoUnidadesInst", {
        params: {
          Institucion: "a52a01f1-56cf-11ed-a988-040300000000",
        },

        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })

      .then((r) => {
        setCatalogoUnidadResponsable(r.data.data);
      })

      .catch((err) => {});
  };

  useEffect(() => {
    getUnidades();
  }, []);

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
                    {aValorMA[0].componentes[componenteSelect].actividades.map(
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
                              fontSize: "0.7vw",
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
            display: "flex",
            flexDirection: "column",
            width: "90%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              height: "33%",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <TextField
              disabled
              sx={{ width: "18%", boxShadow: 2 }}
              variant={"filled"}
              label={
                <Typography
                  sx={{ fontSize: "0.7vw", fontFamily: "MontserratMedium" }}
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
            <TextField
              sx={{ width: "18%", boxShadow: 2 }}
              variant={"filled"}
              label={
                <Typography
                  sx={{ fontSize: "0.7vw", fontFamily: "MontserratMedium" }}
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
                ].lineaBase = c.target.value;
                setAValorMA(y);
              }}
            />
            <TextField
              sx={{ width: "18%", boxShadow: 2 }}
              variant={"filled"}
              label={
                <Typography
                  sx={{ fontSize: "0.7vw", fontFamily: "MontserratMedium" }}
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
              onClick={() => handleClickOpen()}
              value={
                aValorMA[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ]?.valorNumerador || ""
              }
            />
            <TextField
              sx={{ width: "18%", boxShadow: 2 }}
              variant={"filled"}
              label={
                <Typography
                  sx={{ fontSize: "0.7vw", fontFamily: "MontserratMedium" }}
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
              onClick={() => handleClickOpen()}
              value={
                aValorMA[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ]?.valorDenominador || ""
              }
            />

            <FormControl
              sx={{
                width: "15%",
                height: "80%",
                backgroundColor: "#f0f0f0",
                boxShadow: 2,
                fontFamily: "MontserratMedium",
                justifyContent: "space-evenly",
                alignItems: "flex-start",
              }}
            >
              <FormLabel
                sx={{
                  fontFamily: "MontserratBold",
                  fontSize: "0.6vw",
                }}
              >
                SENTIDO DEL INDICADOR
              </FormLabel>
              <FormControlLabel
                value={"ASCENDENTE"}
                label={
                  <Typography
                    sx={{ fontSize: "0.6vw", fontFamily: "MontserratMedium" }}
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
                    sx={{ fontSize: "0.6vw", fontFamily: "MontserratMedium" }}
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
                    sx={{ fontSize: "0.6vw", fontFamily: "MontserratMedium" }}
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
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              height: "20%",
              alignItems: "center",
              justifyContent: "space-evenly",
              flexWrap: "wrap",
            }}
          >
            <TextField
              sx={{ width: "18%", boxShadow: 2 }}
              variant={"filled"}
              onClick={() => handleClickOpen2()}
              label={
                <Typography
                  sx={{ fontSize: "0.7vw", fontFamily: "MontserratMedium" }}
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
            <TextField
              sx={{ width: "18%", boxShadow: 2 }}
              variant={"filled"}
              onClick={() => handleClickOpen2()}
              label={
                <Typography
                  sx={{ fontSize: "0.7vw", fontFamily: "MontserratMedium" }}
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
            <TextField
              sx={{ width: "18%", boxShadow: 2 }}
              variant={"filled"}
              onClick={() => handleClickOpen2()}
              label={
                <Typography
                  sx={{ fontSize: "0.7vw", fontFamily: "MontserratMedium" }}
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
            <TextField
              sx={{ width: "18%", boxShadow: 2 }}
              variant={"filled"}
              onClick={() => handleClickOpen2()}
              label={
                <Typography
                  sx={{ fontSize: "0.7vw", fontFamily: "MontserratMedium" }}
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
          </Box>

          <Box
            sx={{
              display: "flex",
              width: "100%",
              height: "30%",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: 2,
                width: "40%",
                height: "12vh",
                backgroundColor: "#f0f0f0",
              }}
            >
              <FormControl sx={{ width: "25vw" }}>
                <Autocomplete
                  disabled={false}
                  options={catalogoUnidadResponsable}
                  getOptionLabel={(option) => option.Unidad}
                  value={{
                    Id: catalogoUnidadResponsable[0].Id,
                    Unidad:
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
                          {option.Unidad}
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
                          fontSize: ".7vw",
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
                    ].unidadResponsable = value?.Unidad || "";
                    setAValorMA(y);
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option.Id === value.Id
                  }
                />
              </FormControl>{" "}
            </Box>
            <TextField
              rows={5}
              multiline
              sx={{ width: "40%", boxShadow: 2 }}
              variant={"filled"}
              label={
                <Typography
                  sx={{ fontSize: "0.7vw", fontFamily: "MontserratMedium" }}
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
                ].descIndicador = c.target.value;
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
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              height: "30%",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <TextField
              rows={5}
              multiline
              sx={{ width: "40%", boxShadow: 2 }}
              variant={"filled"}
              label={
                <Typography
                  sx={{ fontSize: "0.7vw", fontFamily: "MontserratMedium" }}
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
                ].descNumerador = c.target.value;
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
            <TextField
              rows={5}
              multiline
              sx={{ width: "40%", boxShadow: 2 }}
              variant={"filled"}
              label={
                <Typography
                  sx={{ fontSize: "0.7vw", fontFamily: "MontserratMedium" }}
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
                ].descDenominador = c.target.value;
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
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
