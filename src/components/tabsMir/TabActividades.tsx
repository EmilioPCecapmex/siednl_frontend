import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Typography,
  List,
  ListItemButton,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Divider from "@mui/material/Divider";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import { IComponente } from "./IComponente";
import { ICValor } from "./ICValor";
import Collapse from "@mui/material/Collapse";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { FormulaDialog } from "../formulasDialog/FormulaDialog";
import { IActividadesMir, IComponenteActividad } from "./AddMir";
import { IMIREdit } from "./IMIR";
//funcion main
export const TabActividades = ({
  show,
  componentes,
  asignarCValor,
  compAct,
  actividadesMir,
  mirEdit,
}: {
  show: boolean;
  componentes: number[];
  asignarCValor: Function;
  compAct: Array<IComponenteActividad>;
  actividadesMir: Array<IActividadesMir>;
  mirEdit?: IMIREdit;
}) => {
  // business logic-------------------------------------------------------------------------------
  const [actividades, setActividades] = React.useState([1, 2]);

  const [componenteActividad, setComponenteActividad] = useState([
    {
      componentes: componentes.map((x) => actividades),
    },
  ]);

  useEffect(() => {
    if (show === true && componentes.length > cValor[0].componentes.length) {
      let restantes = componentes.length - cValor[0].componentes.length;
      let prevState = [...cValor];
      for (let index = 1; index <= restantes; index++) {
        prevState[0].componentes.push({
          actividades: [
            {
              actividad: "A1" + "C" + (prevState[0].componentes.length + 1),
              resumen: "",
              indicador: "",
              frecuencia: "",
              formula: "",
              medios: "",
              supuestos: "",
            },
            {
              actividad: "A2" + "C" + (prevState[0].componentes.length + 1),
              resumen: "",
              indicador: "",
              frecuencia: "",
              formula: "",
              medios: "",
              supuestos: "",
            },
          ],
        });
        setCValor(prevState);
      }
    } else if (
      show === true &&
      componentes.length < cValor[0].componentes.length
    ) {
      let prevState = [...cValor];
      let restantes = cValor[0].componentes.length - componentes.length;
      for (let index = 1; index <= restantes; index++) {
        prevState[0].componentes.pop();
        setCValor(prevState);
      }
      setComponenteSelect(0);
    }
  }, [show]);

  const [cValor, setCValor] = useState(
    componenteActividad.map((item) => {
      return {
        componentes: item.componentes.map((x, index) => {
          return {
            actividades: x.map((c, index2) => {
              return {
                actividad: "A" + (index2 + 1) + "C" + (index + 1),
                resumen: "",
                indicador: "",
                formula: "",
                frecuencia: "",
                medios: "",
                supuestos: "",
              };
            }),
          };
        }),
      };
    })
  );

  useEffect(() => {
    asignarCValor(cValor);
  }, [cValor, componentes]);

  useEffect(() => {
    if (compAct.length > 0) {
      loadActividadesMir();
    }
  }, [compAct]);

  const loadActividadesMir = () => {
    let y = componenteActividad.map((item) => {
      return {
        componentes: compAct.map((x, index) => {
          return {
            actividades: x.actividades.map((c, index2) => {
              return {
                actividad: "",
                resumen: "",
                indicador: "",
                formula: "",
                frecuencia: "",
                medios: "",
                supuestos: "",
              };
            }),
          };
        }),
      };
    });

    actividadesMir.map((x, index) => {
      let act = x.actividad?.split("A")[1]?.split("C")[0];
      let comp = x.actividad?.split("C")[1].substring(0, 1);

      y[0].componentes[parseInt(comp) - 1].actividades[
        parseInt(act) - 1
      ].actividad = x.actividad;

      y[0].componentes[parseInt(comp) - 1].actividades[
        parseInt(act) - 1
      ].resumen = x?.resumen;
      y[0].componentes[parseInt(comp) - 1].actividades[
        parseInt(act) - 1
      ].indicador = x?.indicador;
      y[0].componentes[parseInt(comp) - 1].actividades[
        parseInt(act) - 1
      ].formula = x?.formula;
      y[0].componentes[parseInt(comp) - 1].actividades[
        parseInt(act) - 1
      ].frecuencia = x?.frecuencia;
      y[0].componentes[parseInt(comp) - 1].actividades[
        parseInt(act) - 1
      ].medios = x?.medios;
      y[0].componentes[parseInt(comp) - 1].actividades[
        parseInt(act) - 1
      ].supuestos = x?.supuestos;
    });
    setCValor(y);
  };

  const agregarAFnc = (index: number) => {
    let act = cValor[0].componentes[componenteSelect].actividades;
    let v = act.length;

    if (v < 7) {
      let a = [...actividades];
      a.push(actividades.length + 1);
      setActividades(a);
      let xArray = [...componenteActividad];
      xArray[0]["componentes"][index] = [
        ...actividades,
        actividades.length + 1,
      ];
      setComponenteActividad(xArray);
      if (cValor[0].componentes[index].actividades.length < 6) {
        let prevState = [...cValor];
        prevState[0].componentes[index].actividades.push({
          actividad:
            "A" +
            (cValor[0].componentes[index].actividades.length + 1) +
            "C" +
            (index + 1),
          resumen: "",
          indicador: "",
          frecuencia: "",
          formula: "",
          medios: "",
          supuestos: "",
        });
        setCValor(prevState);
      }
    }
  };

  const eliminarAFnc = () => {
    let act = cValor[0].componentes[componenteSelect].actividades;
    let v = act.length;

    if (v > 2) {
      let a = actividades;
      a.pop();
      setActividades(a);
      let prevState = [...cValor];
      prevState[0].componentes[componenteSelect].actividades.pop();
      setCValor(prevState);
    }
  };

  const [componenteSelect, setComponenteSelect] = useState(0);
  const [actividadSelect, setActividadSelect] = useState(0);

  const [open, setOpen] = useState(0);

  const handleClickComponente = (index: number) => {
    setOpen(index);
  };

  const [openFormulaDialog, setOpenFormulaDialog] = useState(false);
  const [prevTextFormula, setPrevTextFormula] = useState("");
  const [tipoFormula, setTipoFormula] = useState("");
  const [elementoFormula, setElementoFormula] = useState("");
  const [errorIndicadorComponente, setErrorIndicadorComponente] = useState(-1);
  const [errorIndicadorActividad, setErrorIndicadorActividad] = useState(-1);


  const [errorFrecuenciaComponente, setErrorFrecuenciaComponente] = useState(-1);
  const [errorFrecuenciaActividad, setErrorFrecuenciaActividad] = useState(-1);

  const evalueTxtFrecuencia = () => {
    const cIndicador = cValor[0].componentes[componenteSelect].actividades[actividadSelect].frecuencia?.toLowerCase();
    if(cIndicador !== undefined){
      if (cIndicador===("trimestral")) {
        
        setErrorFrecuenciaComponente(-1)
        setErrorFrecuenciaActividad(-1)
      }else{
        setErrorFrecuenciaComponente(componenteSelect)
        setErrorFrecuenciaActividad(actividadSelect)

      }
    }
  }


  const handleClickOpen = () => {
    setPrevTextFormula(
      cValor[0].componentes[componenteSelect].actividades[actividadSelect]
        .formula
    );
    setOpenFormulaDialog(true);
  };

  const handleClose = () => {
    setOpenFormulaDialog(false);
  };

  const changeFormula = (txt: string) => {
    cValor[0].componentes[componenteSelect].actividades[
      actividadSelect
    ].formula = txt;
  };

  const evalueTxtIndicador = () => {
    const cIndicador =
      cValor[0].componentes[componenteSelect].actividades[
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
      }
    }
  };

  
  

  useEffect(() => {
    let act: number[] = [];
    let comp: string[] = [];
    let ambos: any = [];
    let i = 1;
    let j = 1;
  }, [actividades]);

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
        {/* Botones Componentes */}
        <Typography
          sx={{
            mr: "1vw",
            fontFamily: "MontserratSemiBold",
            fontSize: "1.5vw",
          }}
        >
          Componente {componenteSelect + 1} - Actividad {actividadSelect + 1}
        </Typography>
        <IconButton
          onClick={() => {
            agregarAFnc(componenteSelect);
          }}
        >
          <AddCircleIcon fontSize="large" />
        </IconButton>

        <IconButton onClick={() => eliminarAFnc()} sx={{ mr: "1vw" }}>
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
                  selected={item == componenteSelect + 1 ? true : false}
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
                  <Typography sx={{ fontFamily: "MontserratMedium" }}>
                    Componente {item}
                  </Typography>

                  {open === item ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open === item} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {cValor[0].componentes[componenteSelect].actividades.map(
                      (value, x) => {
                        return (
                          <ListItemButton
                            selected={x == actividadSelect ? true : false}
                            key={x}
                            onClick={() => {
                              setActividadSelect(x);
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
                            Actividad {x + 1}
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
          {/* Textfields box */}

          {/* Renderizado de Actividades */}

          {/* <Box>
              <Typography>Actividad {actividadSelect + 1} - Componente {parseInt(componenteSelect) + 1}</Typography>
            </Box> */}
          <Box
            sx={{
              width: "100%",
              height: "40%",
              justifyContent: "space-evenly",
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              disabled={mirEdit?.actividades[componenteSelect].resumen}
              variant="filled"
              multiline
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
              rows={4}
              sx={{ width: "30%", boxShadow: 2 }}
              label={"Resumen Narrativo"}
              value={
                cValor[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ].resumen
              }
              onChange={(c) => {
                let y = [...cValor];
                y[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ].resumen = c.target.value;
                setCValor(y);
              }}
            />
            <TextField
              disabled={mirEdit?.actividades[componenteSelect].indicador}
              variant="filled"
              multiline
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
              rows={4}
              sx={{ width: "30%", boxShadow: 2 }}
              label={"Indicador"}
              onBlur={() => evalueTxtIndicador()}
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
              value={
                cValor[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ].indicador
              }
              onChange={(c) => {
                let y = [...cValor];
                y[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ].indicador = c.target.value;
                setCValor(y);
              }}
            />
            <TextField
              disabled={mirEdit?.actividades[componenteSelect].formula}
              variant="filled"
              multiline
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
              rows={4}
              sx={{ width: "30%", boxShadow: 2 }}
              label={"Fórmula"}
              onClick={() => evalueTxtIndicador()}
              value={
                cValor[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ].formula
              }
              onChange={(c) => {
                let y = [...cValor];
                y[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ].formula = c.target.value;
                setCValor(y);
              }}
            />
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "40%",

              justifyContent: "space-evenly",
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              disabled={mirEdit?.actividades[componenteSelect].frecuencia}
              variant="filled"
              multiline
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
              rows={4}
              sx={{ width: "30%", boxShadow: 2 }}
              label={"Frecuencia"}
              value={
                cValor[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ].frecuencia
              }
              onChange={(c) => {
                let y = [...cValor];
                y[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ].frecuencia = c.target.value;
                setCValor(y);
              }}

              onBlur={() => evalueTxtFrecuencia()}
              error={errorFrecuenciaComponente === (componenteSelect) && errorFrecuenciaActividad === (actividadSelect)   ? true : false}
              helperText={
                errorFrecuenciaComponente === (componenteSelect) && errorFrecuenciaActividad === (actividadSelect)
                  ? "Frecuencia debe ser Trimestral"
                  : null
              }
            />
            <TextField
              disabled={mirEdit?.actividades[componenteSelect].medios}
              variant="filled"
              multiline
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
              rows={4}
              sx={{ width: "30%", boxShadow: 2 }}
              label={"Medios de Verificación"}
              value={
                cValor[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ].medios
              }
              onChange={(c) => {
                let y = [...cValor];
                y[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ].medios = c.target.value;
                setCValor(y);
              }}
            />
            <TextField
              disabled={mirEdit?.actividades[componenteSelect].supuestos}
              variant="filled"
              multiline
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
              rows={4}
              sx={{ width: "30%", boxShadow: 2 }}
              label={"Supuestos"}
              value={
                cValor[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ].supuestos
              }
              onChange={(c) => {
                let y = [...cValor];
                y[0].componentes[componenteSelect].actividades[
                  actividadSelect
                ].supuestos = c.target.value;
                setCValor(y);
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
