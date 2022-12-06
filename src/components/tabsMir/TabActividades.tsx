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
import { IComponente } from "./IComponente";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { FormulaDialog } from "../formulasDialog/FormulaDialog";
import { IActividadesMir, IComponenteActividad } from "./AddMir";
import { IMIREdit } from "./IMIR";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { stringify } from "querystring";
//funcion main
export const TabActividades = ({
  show,
  componentes,
  asignarCValor,
  compAct,
  actividadesMir,
  mirEdit,
  componentesTextos,
}: {
  show: boolean;
  componentes: number[];
  asignarCValor: Function;
  compAct: Array<IComponenteActividad>;
  actividadesMir: Array<IActividadesMir>;
  mirEdit?: IMIREdit;
  componentesTextos: Array<IComponente>;
}) => {
  // business logic-------------------------------------------------------------------------------
  const [actividades, setActividades] = React.useState([1, 2]);

  const [componenteActividad, setComponenteActividad] = useState([
    {
      componentes: componentes.map((x) => actividades),
    },
  ]);

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
                frecuencia: "TRIMESTRAL",
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
    if (componentes.length > cValor[0].componentes.length) {   
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
        asignarCValor(prevState);

      }
    } else if (
      componentes.length < cValor[0].componentes.length
    ) {
      let prevState = [...cValor];
      let restantes = cValor[0].componentes.length - componentes.length;

      for (let index = 1; index <= restantes; index++) {
        prevState[0].componentes.pop();
        setCValor(prevState);

        asignarCValor(prevState)

      }
      setComponenteSelect(0);
    }
  }, [compAct, componentes]);




  // useEffect(() => {
  //   asignarCValor(cValor);
  // }, [cValor]);

  useEffect(() => {
    if (compAct.length > 0) {
      loadActividadesMir();
    }
  }, [compAct, componentes]);

  let aument_number = -1;

  const loadActividadesMir = () => {
    let y = componenteActividad.map((item) => {
      return {
        componentes: compAct.map((x, index) => {
          return {
            actividades: x.actividades.map((c, index2) => {
              aument_number++;

              return {
                actividad:
                  actividadesMir[index2]?.actividad ||
                  "A" +
                    (cValor[0].componentes[index].actividades.length + 1) +
                    "C" +
                    (index + 1),
                resumen: actividadesMir[aument_number]?.resumen || "",
                indicador: actividadesMir[aument_number]?.indicador || "",
                formula: actividadesMir[aument_number]?.formula || "",
                frecuencia: "TRIMESTRAL",
                medios: actividadesMir[aument_number]?.medios || "",
                supuestos: actividadesMir[aument_number]?.supuestos || "",
              };
            }),
          };
        }),
      };
    });

    actividadesMir.map((x) => {
      let act = x.actividad?.split("")[1];
      let comp = x.actividad?.split("")[3];

      y[0].componentes[parseInt(comp) - 1].actividades[
        parseInt(act) - 1
      ].actividad = x?.actividad;
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
        asignarCValor(prevState);

      }
    }
  };

  const eliminarAFnc = () => {
    let act = cValor[0].componentes[componenteSelect].actividades;
    let v = act.length - 1;

    if (v < 2) {
    } else {
      let a = actividades;
      a.pop();
      setActividades(a);
      let prevState = [...cValor];
      prevState[0].componentes[componenteSelect].actividades.pop();
      setCValor(prevState);
      asignarCValor(prevState);

    }
  };

  const [componenteSelect, setComponenteSelect] = useState(0);
  const [actividadSelect, setActividadSelect] = useState(0);

  const [open, setOpen] = useState(1);

  const handleClickComponente = (index: number) => {
    setOpen(index);
  };

  const [openFormulaDialog, setOpenFormulaDialog] = useState(false);
  const [prevTextFormula, setPrevTextFormula] = useState("");
  const [tipoFormula, setTipoFormula] = useState("");
  const [elementoFormula, setElementoFormula] = useState("");
  const [errorIndicadorComponente, setErrorIndicadorComponente] = useState(-1);
  const [errorIndicadorActividad, setErrorIndicadorActividad] = useState(-1);

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
        let y = [...cValor];
        y[0].componentes[componenteSelect].actividades[
          actividadSelect
        ].indicador = "";
        setCValor(y);
      }
    }
  };

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
            agregarAFnc(componenteSelect);

            if (
              actividadSelect + 1 ===
              cValor[0].componentes[componenteSelect].actividades.length - 1
            ) {
              setActividadSelect(
                cValor[0].componentes[componenteSelect].actividades.length - 1
              );
            }
          }}
          disabled={
            mirEdit === undefined ? false : mirEdit === null ? false : true
          }
        >
          <AddCircleIcon fontSize="large" />
        </IconButton>

        <IconButton
          onClick={() => {
            eliminarAFnc();
            setActividadSelect(
              cValor[0].componentes[componenteSelect].actividades.length - 1
            );
          }}
          sx={{ mr: "1vw" }}
          disabled={
            mirEdit === undefined ? false : mirEdit === null ? false : true
          }
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
                  <Typography sx={{ fontFamily: "MontserratMedium" }}>
                    COMPONENTE {item}
                  </Typography>

                  {open === item ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open === item} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {cValor[0].componentes[componenteSelect].actividades.map(
                      (value, x) => {
                        return (
                          <ListItemButton
                            selected={x === actividadSelect ? true : false}
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
                            <Typography sx={{ fontFamily: "MontserratMedium" }}>
                              Actividad {x + 1}
                            </Typography>
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
              {componentesTextos[componenteSelect]?.resumen}
            </Typography>
          </Box>

          <TextField
            disabled={mirEdit?.actividades[componenteSelect].resumen}
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
              let y = [...cValor];
              y[0].componentes[componenteSelect].actividades[
                actividadSelect
              ].resumen = c.target.value
                .replaceAll('"', "")
                .replaceAll("'", "")
                .replaceAll("\n", "");
              setCValor(y);
            }}
            value={
              cValor[0].componentes[componenteSelect].actividades[
                actividadSelect
              ]?.resumen
            }
          />
          <TextField
            disabled={mirEdit?.actividades[componenteSelect].indicador}
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
            onChange={(c) => {
              let y = [...cValor];
              y[0].componentes[componenteSelect].actividades[
                actividadSelect
              ].indicador = c.target.value
                .replaceAll('"', "")
                .replaceAll("'", "")
                .replaceAll("\n", "");
              setCValor(y);
            }}
            value={
              cValor[0].componentes[componenteSelect].actividades[
                actividadSelect
              ]?.indicador
            }
          />
          <TextField
            disabled={mirEdit?.actividades[componenteSelect].formula}
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
              cValor[0].componentes[componenteSelect].actividades[
                actividadSelect
              ]?.formula
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
                    cValor[0].componentes[componenteSelect].actividades[
                      actividadSelect
                    ]?.frecuencia === "TRIMESTRAL"
                  }
                  onChange={(c) => {
                    let y = [...cValor];
                    y[0].componentes[componenteSelect].actividades[
                      actividadSelect
                    ].frecuencia = c.target.value
                      .replaceAll('"', "")
                      .replaceAll("'", "")
                      .replaceAll("\n", "");
                    setCValor(y);
                  }}
                />
              }
            />
          </FormControl>

          <TextField
            disabled={mirEdit?.actividades[componenteSelect].medios}
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
              let y = [...cValor];
              y[0].componentes[componenteSelect].actividades[
                actividadSelect
              ].medios = c.target.value
              .replaceAll('"', "")
              .replaceAll("'", "")
              .replaceAll("\n", "");
              setCValor(y);
            }}
            value={
              cValor[0].componentes[componenteSelect].actividades[
                actividadSelect
              ]?.medios
            }
          />
          <TextField
            disabled={mirEdit?.actividades[componenteSelect].supuestos}
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
            value={
              cValor[0].componentes[componenteSelect].actividades[
                actividadSelect
              ]?.supuestos
            }
            onChange={(c) => {
              let y = [...cValor];
              y[0].componentes[componenteSelect].actividades[
                actividadSelect
              ].supuestos = c.target.value
                .replaceAll('"', "")
                .replaceAll("'", "")
                .replaceAll("\n", "");
              setCValor(y);
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
