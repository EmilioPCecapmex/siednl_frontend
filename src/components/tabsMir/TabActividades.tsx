
import { useState, useEffect } from "react";
import {
  Grid,
  IconButton,
  Typography,
  List,
  ListItemButton,
  TextField,
  FormControl,
  useMediaQuery,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { FormulaDialog } from "../formulasDialog/FormulaDialog";
import { IMIR, IMIREdit } from "./interfaces mir/IMIR";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import DeleteCompActMir from "../modalsMIR/ModalEliminarCompActMir";
import { IComponente } from "./interfaces mir/IMIR";
import { clearInfo } from "../genericComponents/GenericMethods";

export const TabActividades = ({
  edit,
  addActividad,
  removeActividad,
  MIR,
  setMIR,
  idMir,
  mirEdit,
}: {
  edit: boolean;
  addActividad: Function;
  removeActividad: Function;
  MIR: IMIR;
  setMIR: Function;
  idMir: string;
  mirEdit: IMIREdit;
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
      
      componentes[componenteSelect].actividades[actividadSelect].formula
    );
    setOpenFormulaDialog(true);
  };

  const handleClose = () => {
    setOpenFormulaDialog(false);
  };

  const changeFormula = (txt: string) => {
    componentes[componenteSelect].actividades[actividadSelect].formula = txt;
  };

  const evalueTxtIndicador = () => {
    const cIndicador =
      MIR.componentes[componenteSelect].actividades[
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

        let prevLocal = [...MIR.componentes];
        prevLocal[componenteSelect - 1].actividades[actividadSelect].indicador =
          "".replaceAll('"', "").replaceAll("'", "").replaceAll("\n", "");
        setComponentes(prevLocal);
      }
    }
  };

  const [componentes, setComponentes] = useState<Array<IComponente>>(
    MIR.componentes
  );

  useEffect(() => {
    setComponentes(MIR.componentes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [MIR]);

  useEffect(() => {
    setMIR((MIR: IMIR) => ({
      ...MIR,
      ...{
        componentes: componentes,
      },
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentes]);

  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  return (
    <Grid
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
      <FormulaDialog
        open={openFormulaDialog}
        close={handleClose}
        textoSet={changeFormula}
        prevText={prevTextFormula}
        tipo={tipoFormula}
        elemento={elementoFormula}
      />

      <Grid
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
            // fontSize: "1vw",
          }}
        >
          ACTIVIDAD # {actividadSelect + 1}
        </Typography>
        <IconButton
          onClick={() => {
            addActividad(componenteSelect + 1);
            setActividadSelect(
              MIR.componentes[componenteSelect].actividades.length - 1
            );
            // setAddA(!addA);
          }}
        >
          <AddCircleIcon fontSize="large" />
        </IconButton>

        <DeleteCompActMir
          tipoelemento={"actividad"}
          numerocomponente={componenteSelect + 1}
          numeroactividad={actividadSelect + 1}
          functelim={() => {
            removeActividad(componenteSelect + 1, actividadSelect + 1);
            setActividadSelect(0);
          }}
          idMir={idMir}
        />

        {/* <IconButton
          onClick={() => {
            removeActividad(componenteSelect+1,actividadSelect+1);
          }}
        >
          <DoDisturbOnIcon fontSize="large" />
        </IconButton> */}
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
              justifyContent:
                MIR.componentes.length > 9 ? "flex-start" : "center",
              borderColor: "#BCBCBC",
              overflow: MIR.componentes.length > 9 ? "scroll" : "",
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
            {MIR.componentes.map((componente, index) => {
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
                      sx={{ fontFamily: "MontserratMedium", fontSize: "1vw" }}
                    >
                      COMPONENTE {index + 1}
                    </Typography>

                    {open === index ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={open === index} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {componente.actividades.map((actividad, index) => (
                        <ListItemButton
                          selected={index === actividadSelect ? true : false}
                          key={index}
                          onClick={() => {
                            setActividadSelect(index);
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
                              //  fontSize: "1vw",
                              fontFamily: "MontserratMedium",
                            }}
                          >
                            ACTIVIDAD {index + 1}
                          </Typography>
                        </ListItemButton>
                      ))}
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
              {MIR.componentes.map((componente, index) => {
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
                        setOpen(index);
                        setActividadSelect(0);
                      }}
                      sx={{
                        //height: "7vh",
                        "&.Mui-selected ": {
                          backgroundColor: "#c4a57b",
                        },
                        "&.Mui-selected:hover": {
                          backgroundColor: "#cbcbcb",
                        },
                      }}
                    >
                      <Typography
                        sx={{ fontFamily: "MontserratMedium", 
                        //fontSize: "6vw" 
                      }}
                      >
                        COMPONENTE {index + 1}
                      </Typography>

                      {open === index ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open === index} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {componente.actividades.map((actividad, index) => (
                          <ListItemButton
                            selected={index === actividadSelect ? true : false}
                            key={index}
                            onClick={() => {
                              setActividadSelect(index);
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
                                // fontSize: "1vw",
                                fontFamily: "MontserratMedium",
                              }}
                            >
                              ACTIVIDAD {index + 1}
                            </Typography>
                          </ListItemButton>
                        ))}
                      </List>
                    </Collapse>

                    <Divider />
                  </Grid>
                );
              })}
            </List>
          )}

          <Grid sx={{ width: "90%", gridColumn: "1/4" }}
            // item
            // xl={3.5}
            // lg={3.5}
            // md={3.5}
            // sm={3.5}
            // xs={11}
            // sx={{
            //   alignContent: "center",
            //   display: "flex",
            //   justifyContent: "center",
            // }}
          >
            <Typography
              sx={{
                fontFamily: "MontserratSemiBold",
                // fontSize: "1vw",
                textAlign: "center",
              }}
            >
              COMPONENTE # {componenteSelect + 1}
            </Typography>
            <Typography
              sx={{
                fontFamily: "MontserratLight",
                // fontSize: ".8vw",
                textAlign: "center",
              }}
            >
              {MIR.componentes[componenteSelect]?.resumen}
            </Typography>
          </Grid>

          <Grid
            item
            xl={4}
            lg={4}
            md={4}
            sm={4}
            xs={12}
            sx={{
              alignContent: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TextField
              disabled={
                edit &&
                !mirEdit?.componentes[componenteSelect].actividades[
                  actividadSelect
                ]?.resumen
              }
              rows={8}
              multiline
              sx={{
                width: ["none", "30vh", "40vh", "50vh", "50vh"],
                boxShadow: 2,
              }}
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
              // onChange={(c) => {
              //   let y = [...valoresComponenteActividad];
              //   y[componenteSelect][actividadSelect].resumen = c.target.value
              //     .replaceAll('"', "")
              //     .replaceAll("'", "")
              //     .replaceAll("\n", "");
              //   setValoresComponenteActividad(y);
              // }}
              // value={
              //   valoresComponenteActividad[componenteSelect][actividadSelect]
              //     ?.resumen || ""
              // }
              onChange={(c) => {
                let prevLocal = [...componentes];
                prevLocal[componenteSelect].actividades[
                  actividadSelect
                ].resumen = clearInfo(c.target.value);

                setComponentes(prevLocal);
              }}
              value={
                componentes[componenteSelect].actividades[actividadSelect]
                  ?.resumen
              }
            />
          </Grid>

          <Grid
            item
            xl={4}
            lg={4}
            md={4}
            sm={4}
            xs={12}
            sx={{
              alignContent: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TextField
              // disabled={mirEdit?.actividades[componenteSelect].indicador}
              disabled={
                edit &&
                !mirEdit?.componentes[componenteSelect].actividades[
                  actividadSelect
                ]?.indicador
              }
              rows={8}
              multiline
              sx={{
                width: ["none", "30vh", "40vh", "50vh", "50vh"],
                boxShadow: 2,
              }}
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
                  ? "INCLUIR TIPO DE INDICADOR: PORCENTAJE, TASA, ÍNDICE Ó PROMEDIO."
                  : null
              }
              onChange={(c) => {
                let prevLocal = [...componentes];
                prevLocal[componenteSelect].actividades[
                  actividadSelect
                ].indicador = clearInfo(c.target.value);
                prevLocal[componenteSelect].actividades[
                  actividadSelect
                ].formula = "";
                setComponentes(prevLocal);
              }}
              value={
                componentes[componenteSelect].actividades[actividadSelect]
                  ?.indicador || ""
              }
            />
          </Grid>

          <Grid
            item
            xl={4}
            lg={4}
            md={4}
            sm={4}
            xs={12}
            sx={{
              alignContent: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TextField
              // disabled={mirEdit?.actividades[componenteSelect].formula}
              disabled={
                edit &&
                !mirEdit?.componentes[componenteSelect].actividades[
                  actividadSelect
                ]?.formula
              }
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
              sx={{
                width: ["none", "30vh", "40vh", "50vh", "50vh"],
                boxShadow: 2,
              }}
              label={"FÓRMULA"}
              onClick={() => evalueTxtIndicador()}
              value={
                componentes[componenteSelect].actividades[actividadSelect]
                  ?.formula
              }
            />
          </Grid>

          <Grid
            item
            xl={4}
            lg={4}
            md={4}
            sm={4}
            xs={12}
            sx={{
              alignContent: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <FormControl
              sx={{
                width: ["33vh", "30vh", "40vh", "50vh", "50vh"],
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
                      componentes[componenteSelect].actividades[actividadSelect]
                        ?.frecuencia === "TRIMESTRAL"
                    }
                    onChange={(c) => {
                      let prevLocal = [...componentes];
                      prevLocal[componenteSelect].actividades[
                        actividadSelect
                      ].frecuencia = clearInfo(c.target.value);

                      setComponentes(prevLocal);
                    }}
                  />
                }
              />
            </FormControl>
          </Grid>

          <Grid
            item
            xl={4}
            lg={4}
            md={4}
            sm={4}
            xs={12}
            sx={{
              alignContent: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TextField
              // disabled={mirEdit?.actividades[componenteSelect].medios}
              disabled={
                edit &&
                !mirEdit?.componentes[componenteSelect].actividades[
                  actividadSelect
                ]?.medios
              }
              rows={8}
              multiline
              variant="filled"
              sx={{
                boxShadow: 2,
                width: ["none", "30vh", "40vh", "50vh", "50vh"],
                //top: ["-4vh", "none", "none", "none", "none", "none"]
              }}
              label={"MEDIOS DE VERIFICACIÓN Y FUENTE INFORMACION"}
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
                let prevLocal = [...componentes];
                prevLocal[componenteSelect].actividades[
                  actividadSelect
                ].medios = clearInfo(c.target.value);

                setComponentes(prevLocal);
              }}
              value={
                componentes[componenteSelect].actividades[actividadSelect]
                  ?.medios
              }
            />
          </Grid>

          <Grid
            item
            xl={4}
            lg={4}
            md={4}
            sm={4}
            xs={12}
            sx={{
              alignContent: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TextField
              // disabled={mirEdit?.actividades[componenteSelect].supuestos}
              disabled={
                edit &&
                !mirEdit?.componentes[componenteSelect].actividades[
                  actividadSelect
                ]?.supuestos
              }
              rows={8}
              multiline
              variant="filled"
              sx={{
                boxShadow: 2,
                width: ["none", "30vh", "40vh", "50vh", "50vh"],
                //top: ["-4vh", "none", "none", "none", "none", "none"]
              }}
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
                let prevLocal = [...componentes];
                prevLocal[componenteSelect].actividades[
                  actividadSelect
                ].supuestos = clearInfo(c.target.value);

                setComponentes(prevLocal);
              }}
              value={
                componentes[componenteSelect].actividades[actividadSelect]
                  ?.supuestos
              }
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
