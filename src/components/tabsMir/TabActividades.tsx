/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Typography,
  List,
  ListItemButton,
  TextField,
  FormControl,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { FormulaDialog } from "../formulasDialog/FormulaDialog";
import { IActividadesMir } from "./AddMir";
import { IMIR } from "./IMIR";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
//funcion main
export const TabActividades = ({
  show,
  noActividades,
  addActividad,
  removeActividad,
  MIR,
  setMIR,
  noComponentes,
}: {
  show: boolean;
  noActividades: Array<number[]>;
  addActividad: Function;
  removeActividad: Function;
  MIR: IMIR;
  setMIR: Function;
  noComponentes: number[];
}) => {
  const [componenteSelect, setComponenteSelect] = useState(0);
  const [actividadSelect, setActividadSelect] = useState(0);

  const [open, setOpen] = useState(0);

  const [openFormulaDialog, setOpenFormulaDialog] = useState(false);
  const [prevTextFormula, setPrevTextFormula] = useState("");
  const [tipoFormula, setTipoFormula] = useState("");
  const [elementoFormula, setElementoFormula] = useState("");
  const [errorIndicadorComponente, setErrorIndicadorComponente] = useState(-1);
  const [errorIndicadorActividad, setErrorIndicadorActividad] = useState(-1);

  const handleClickOpen = () => {
    setPrevTextFormula(
      valoresComponenteActividad[componenteSelect][actividadSelect].formula
    );
    setOpenFormulaDialog(true);
  };

  const handleClose = () => {
    setOpenFormulaDialog(false);
  };

  const changeFormula = (txt: string) => {
    valoresComponenteActividad[componenteSelect][actividadSelect].formula = txt;
  };

  const evalueTxtIndicador = () => {
    const cIndicador =
      valoresComponenteActividad[componenteSelect][
        actividadSelect
      ].indicador?.toLowerCase();
    if (cIndicador !== undefined) {
      if (cIndicador.includes("porcentaje")) {
        setTipoFormula("Porcentaje");
        setElementoFormula(
          "C" +
            (componenteSelect + 1).toString() +
            "A" +
            (actividadSelect + 1).toString()
        );
        handleClickOpen();
        setErrorIndicadorComponente(-1);
        setErrorIndicadorActividad(-1);
      } else if (cIndicador.includes("tasa")) {
        setTipoFormula("Tasa");
        setElementoFormula(
          "C" +
            (componenteSelect + 1).toString() +
            "A" +
            (actividadSelect + 1).toString()
        );
        handleClickOpen();
        setErrorIndicadorComponente(-1);
        setErrorIndicadorActividad(-1);
      } else if (cIndicador.includes("indice" || "índice")) {
        setTipoFormula("Índice");
        setElementoFormula(
          "C" +
            (componenteSelect + 1).toString() +
            "A" +
            (actividadSelect + 1).toString()
        );
        handleClickOpen();
        setErrorIndicadorComponente(-1);
        setErrorIndicadorActividad(-1);
      } else if (cIndicador.includes("promedio")) {
        setTipoFormula("Promedio");
        setElementoFormula(
          "C" +
            (componenteSelect + 1).toString() +
            "A" +
            (actividadSelect + 1).toString()
        );
        handleClickOpen();
        setErrorIndicadorComponente(-1);
        setErrorIndicadorActividad(-1);
      } else {
        setErrorIndicadorComponente(componenteSelect);
        setErrorIndicadorActividad(actividadSelect);

        let y = [...valoresComponenteActividad];
        y[componenteSelect][actividadSelect].indicador = ""
          .replaceAll('"', "")
          .replaceAll("'", "")
          .replaceAll("\n", "");
        setValoresComponenteActividad(y);
      }
    }
  };

  const [valoresComponenteActividad, setValoresComponenteActividad] = useState<
    Array<Array<IActividadesMir>>
  >([
    [
      {
        actividad: "A1C1",
        resumen: "",
        indicador: "",
        frecuencia: "TRIMESTRAL",
        formula: "",
        medios: "",
        supuestos: "",
      },
      {
        actividad: "A2C1",
        resumen: "",
        indicador: "",
        frecuencia: "TRIMESTRAL",
        formula: "",
        medios: "",
        supuestos: "",
      },
    ],
    [
      {
        actividad: "A1C2",
        resumen: "",
        indicador: "",
        frecuencia: "TRIMESTRAL",
        formula: "",
        medios: "",
        supuestos: "",
      },
      {
        actividad: "A2C2",
        resumen: "",
        indicador: "",
        frecuencia: "TRIMESTRAL",
        formula: "",
        medios: "",
        supuestos: "",
      },
    ],
  ]);

  useEffect(() => {

    let n: Array<Array<IActividadesMir>> = [];

    MIR.componenteActividad.map((v, index) => {
      let indexActividades = 0;
      let aux: Array<IActividadesMir> = [];
      v.actividades.map((x) => {
        aux.push(MIR.actividades[indexActividades]);
        indexActividades++;
      });
      n[index] = aux;
    });
    setValoresComponenteActividad(n);

    
  }, [MIR, noComponentes]);

  useEffect(() => {
    let arr: Array<IActividadesMir> = [];
    valoresComponenteActividad.map((v, index) => {
      v.map((val, index2) => {
        arr.push(val);
      });
    });

    setMIR((MIR: IMIR) => ({
      ...MIR,
      ...{
        actividades: arr,
      },
    }));
  }, []);

  useEffect(() => {
    console.log(MIR);
    console.log(noComponentes);
    console.log(noActividades);
    // console.log(actividades);
    console.log(valoresComponenteActividad);
  }, []);

  return (
    <Box
      visibility={show ? "visible" : "hidden"}
      position="absolute"
      sx={{
        display: "flex",
        width: "75vw",
        height: "75vh",
        boxShadow: 10,
        borderRadius: 5,
        flexDirection: "column",
        backgroundColor: "#fff",
      }}
    >
      <FormulaDialog
        open={openFormulaDialog}
        close={handleClose}
        textoSet={changeFormula}
        prevText={prevTextFormula}
        tipo={tipoFormula}
        elemento={elementoFormula}
      />

      <Box
        sx={{
          width: "100%",
          display: "flex",
          height: "7vh",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Typography
          sx={{
            mr: "1vw",
            fontFamily: "MontserratSemiBold",
            fontSize: "1.5vw",
          }}
        >
          ACTIVIDAD # {actividadSelect + 1}
        </Typography>
        <IconButton
          onClick={() => {
            addActividad(componenteSelect);
            setActividadSelect(noActividades[componenteSelect].length - 1);
          }}
        >
          <AddCircleIcon fontSize="large" />
        </IconButton>

        <IconButton
          onClick={() => {
            removeActividad(componenteSelect);
            setActividadSelect(noActividades[componenteSelect].length - 1);
          }}
          // disabled={MIR.actividades.length <= 2}
        >
          <DoDisturbOnIcon fontSize="large" />
        </IconButton>
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
            justifyContent:
              MIR.componentes.length > 9 ? "flex-start" : "center",
            borderColor: "#BCBCBC",
            overflow: "scroll",
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
          {noComponentes.map((item, index) => {
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
                    sx={{ fontFamily: "MontserratMedium", fontSize: "0.9rem" }}
                  >
                    COMPONENTE {index + 1}
                  </Typography>

                  {open === index ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open === index} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {noActividades[componenteSelect].map((value, index) => (
                      <ListItemButton
                        selected={index === actividadSelect ? true : false}
                        key={index}
                        onClick={() => {
                          setActividadSelect(index);
                        }}
                        sx={{
                          pl: 4,
                          "&.Mui-selected ": {
                            backgroundColor: "#efd8b9",
                          },
                          "&.Mui-selected:hover": {
                            backgroundColor: "#cbcbcb",
                          },
                        }}
                      >
                        <Typography sx={{ fontFamily: "MontserratMedium" }}>
                          Actividad {value}
                        </Typography>
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>

                <Divider />
              </Box>
            );
          })}
        </List>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            width: "90%",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <Box sx={{ width: "90%", gridColumn: "1/4" }}>
            <Typography
              sx={{
                fontFamily: "MontserratSemiBold",
                fontSize: "1vw",
                textAlign: "center",
              }}
            >
              COMPONENTE # {componenteSelect + 1}
            </Typography>
            <Typography
              sx={{
                fontFamily: "MontserratLight",
                fontSize: ".8vw",
                textAlign: "center",
              }}
            >
              {MIR.componentes[componenteSelect]?.resumen}
            </Typography>
          </Box>

          <TextField
            // disabled={mirEdit?.actividades[componenteSelect].resumen}
            rows={8}
            multiline
            sx={{ width: "90%", boxShadow: 2 }}
            variant="filled"
            label={"RESUMEN NARRATIVO"}
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
              let y = [...valoresComponenteActividad];
              y[componenteSelect][actividadSelect].resumen = c.target.value
                .replaceAll('"', "")
                .replaceAll("'", "")
                .replaceAll("\n", "");
              setValoresComponenteActividad(y);
            }}
            value={
              valoresComponenteActividad[componenteSelect][actividadSelect]
                ?.resumen || ""
            }
          />
          <TextField
            // disabled={mirEdit?.actividades[componenteSelect].indicador}
            rows={8}
            multiline
            sx={{ width: "90%", boxShadow: 2 }}
            variant="filled"
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
            label={"INDICADOR"}
            // onBlur={() => evalueTxtIndicador()}
            error={
              errorIndicadorComponente === componenteSelect &&
              errorIndicadorActividad === actividadSelect
                ? true
                : false
            }
            helperText={
              errorIndicadorComponente === componenteSelect &&
              errorIndicadorActividad === actividadSelect
                ? "Incluir tipo de indicador: Porcentaje, Tasa, Indice ó Promedio. "
                : null
            }
            onChange={(c) => {
              let y = [...valoresComponenteActividad];
              y[componenteSelect][actividadSelect].indicador = c.target.value
                .replaceAll('"', "")
                .replaceAll("'", "")
                .replaceAll("\n", "");
              setValoresComponenteActividad(y);
            }}
            value={
              valoresComponenteActividad[componenteSelect][actividadSelect]
                ?.indicador || ""
            }
          />
          <TextField
            // disabled={mirEdit?.actividades[componenteSelect].formula}
            rows={8}
            multiline
            variant="filled"
            InputLabelProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
            InputProps={{
              readOnly: true,
              style: {
                fontFamily: "MontserratRegular",
              },
            }}
            sx={{ width: "90%", boxShadow: 2 }}
            label={"FÓRMULA"}
            onClick={() => evalueTxtIndicador()}
            value={
              valoresComponenteActividad[componenteSelect][actividadSelect]
                ?.formula || ""
            }
          />

          <FormControl
            sx={{
              width: "90%",
              height: "64%",
              backgroundColor: "#f0f0f0",
              boxShadow: 2,
              fontFamily: "MontserratMedium",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <FormLabel>FRECUENCIA</FormLabel>
            <FormControlLabel
              value={"TRIMESTRAL"}
              label={"TRIMESTRAL"}
              sx={{
                fontFamily: "MontserratMedium",
              }}
              control={
                <Radio
                  sx={{
                    fontFamily: "MontserratMedium",
                  }}
                  checked={
                    valoresComponenteActividad[componenteSelect][
                      actividadSelect
                    ]?.frecuencia === "TRIMESTRAL"
                  }
                  onChange={(c) => {
                    let y = [...valoresComponenteActividad];
                    y[componenteSelect][actividadSelect].frecuencia =
                      c.target.value
                        .replaceAll('"', "")
                        .replaceAll("'", "")
                        .replaceAll("\n", "");
                    setValoresComponenteActividad(y);
                  }}
                />
              }
            />
          </FormControl>

          <TextField
            // disabled={mirEdit?.actividades[componenteSelect].medios}
            rows={8}
            multiline
            variant="filled"
            sx={{ width: "90%", boxShadow: 2 }}
            label={"MEDIOS DE VERIFICACIÓN"}
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
              let y = [...valoresComponenteActividad];
              y[componenteSelect][actividadSelect].medios = c.target.value
                .replaceAll('"', "")
                .replaceAll("'", "")
                .replaceAll("\n", "");
              setValoresComponenteActividad(y);
            }}
            value={
              valoresComponenteActividad[componenteSelect][actividadSelect]
                ?.medios || ""
            }
          />
          <TextField
            // disabled={mirEdit?.actividades[componenteSelect].supuestos}
            rows={8}
            multiline
            variant="filled"
            sx={{ width: "90%", boxShadow: 2 }}
            label={"SUPUESTOS"}
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
              let y = [...valoresComponenteActividad];
              y[componenteSelect][actividadSelect].supuestos = c.target.value
                .replaceAll('"', "")
                .replaceAll("'", "")
                .replaceAll("\n", "");
              setValoresComponenteActividad(y);
            }}
            value={
              valoresComponenteActividad[componenteSelect][actividadSelect]
                ?.supuestos || ""
            }
          />
        </Box>
      </Box>
    </Box>
  );
};
