import { useState, useEffect } from "react";
import {
  Grid,
  IconButton,
  Typography,
  TextField,
  Divider,
  List,
  ListItemButton,
  FormControl,
  useMediaQuery,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import { IComponente } from "./IComponente";
import { FormulaDialog } from "../formulasDialog/FormulaDialog";
import { IMIR } from "./IMIR";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

export const TabComponente = ({
  // show,
  noComponentes,
  addComponente,
  removeComponente,
  MIR,
  setMIR,
}: {
  // show: boolean;
  noComponentes: number[];
  addComponente: Function;
  removeComponente: Function;
  MIR: IMIR;
  setMIR: Function;
}) => {
  const [componentSelect, setComponentSelect] = useState(1);

  const [openFormulaDialog, setOpenFormulaDialog] = useState(false);
  const [prevTextFormula, setPrevTextFormula] = useState("");
  const [tipoFormula, setTipoFormula] = useState("");
  const [elementoFormula, setElementoFormula] = useState("");
  const [errorIndicador, setErrorIndicador] = useState(-1);

  const handleClickOpen = () => {
    setPrevTextFormula(MIR.componentes[componentSelect - 1].formula);
    setOpenFormulaDialog(true);
  };

  const handleClose = () => {
    setOpenFormulaDialog(false);
  };

  const changeFormula = (txt: string) => {
    let prevLocal = [...MIR.componentes];
    prevLocal[componentSelect - 1].formula = txt;
    setComponentes(prevLocal);
  };

  const evalueTxtIndicador = () => {
    const cIndicador =
      MIR.componentes[componentSelect - 1].indicador?.toLowerCase();
    if (cIndicador !== undefined) {
      if (cIndicador.includes("porcentaje" || "PORCENTAJE")) {
        setTipoFormula("Porcentaje");
        setElementoFormula("Componente " + componentSelect.toString());
        handleClickOpen();
        setErrorIndicador(-1);
      } else if (cIndicador.includes("tasa")) {
        setTipoFormula("Tasa");
        setElementoFormula("Componente " + componentSelect.toString());
        handleClickOpen();
        setErrorIndicador(-1);
      } else if (cIndicador.includes("indice" || "índice" || "Índice")) {
        setTipoFormula("Índice");
        setElementoFormula("Componente " + componentSelect.toString());
        handleClickOpen();
        setErrorIndicador(-1);
      } else if (cIndicador.includes("promedio")) {
        setTipoFormula("Promedio");
        setElementoFormula("Componente " + componentSelect.toString());
        handleClickOpen();
        setErrorIndicador(-1);
      } else {
        setErrorIndicador(componentSelect - 1);
        let prevLocal = [...MIR.componentes];
        prevLocal[componentSelect - 1].indicador = "";
        setComponentes(prevLocal);
      }
    }
  };

  const [componentes, setComponentes] = useState<Array<IComponente>>(
    MIR.componentes
  );

  useEffect(() => {
    setComponentes(MIR.componentes);
    console.log("formula: ", componentes[componentSelect - 1]?.formula);
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
      //visibility={show ? "visible" : "hidden"}
      //position="absolute"
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
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            mr: "1vw",
            fontFamily: "MontserratSemiBold",
            fontSize: ["3vh", "10", "13", "14", "15", "18"],
          }}
        >
          COMPONENTE #{componentSelect}
        </Typography>
        <IconButton
          onClick={() => {
            addComponente();
            setComponentSelect(MIR.componentes.length + 1);
          }}
        >
          <AddCircleIcon fontSize="large" />
        </IconButton>
        <IconButton
          onClick={() => {
            removeComponente();
            setComponentSelect(MIR.componentes.length - 1);
          }}
          disabled={MIR.componentes.length <= 2}
        >
          <DoDisturbOnIcon fontSize="large" />
        </IconButton>
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
                    onClick={() => setComponentSelect(item)}
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
                      COMPONENTE {item}
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
            <List sx={{}}>
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
                      onClick={() => setComponentSelect(item)}
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
                        sx={{ fontFamily: "MontserratMedium", fontSize: "6vw" }}
                      >
                        COMPONENTE {item}
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
              // disabled={mirEdit?.componentes[componentSelect - 1].resumen}
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
              onChange={(c) => {
                let prevLocal = [...componentes];
                prevLocal[componentSelect - 1].resumen = c.target.value
                  .replaceAll('"', "")
                  .replaceAll("'", "")
                  .replaceAll("\n", "");
                setComponentes(prevLocal);
              }}
              value={componentes[componentSelect - 1]?.resumen}
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
              // disabled={mirEdit?.componentes[componentSelect - 1].indicador}
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
              // onBlur={() => evalueTxtIndicador()}
              label={"INDICADOR"}
              error={errorIndicador === componentSelect - 1 ? true : false}
              helperText={
                errorIndicador === componentSelect - 1
                  ? "Incluir tipo de indicador: Porcentaje, Tasa, Indice ó Promedio. "
                  : null
              }
              onChange={(c) => {
                let prevLocal = [...componentes];
                prevLocal[componentSelect - 1].indicador = c.target.value
                  .replaceAll('"', "")
                  .replaceAll("'", "")
                  .replaceAll("\n", "");
                prevLocal[componentSelect - 1].formula = "";
                setComponentes(prevLocal);
              }}
              value={componentes[componentSelect - 1]?.indicador}
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
              // disabled={mirEdit?.componentes[componentSelect - 1].formula}
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
              onClick={() => {
                evalueTxtIndicador();
                console.log(
                  "formula: ",
                  componentes[componentSelect - 1]?.formula
                );
              }}
              value={componentes[componentSelect - 1]?.formula}
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
                value={"SEMESTRAL"}
                label={"SEMESTRAL"}
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      componentes[componentSelect - 1]?.frecuencia ===
                      "SEMESTRAL"
                    }
                    onChange={(c) => {
                      let prevLocal = [...componentes];
                      prevLocal[componentSelect - 1].frecuencia = c.target.value
                        .replaceAll('"', "")
                        .replaceAll("'", "")
                        .replaceAll("\n", "");
                      setComponentes(prevLocal);
                    }}
                  />
                }
              />
              <FormControlLabel
                value={"TRIMESTRAL"}
                label={"TRIMESTRAL"}
                sx={{
                  fontFamily: "MontserratMedium",
                }}
                control={
                  <Radio
                    checked={
                      componentes[componentSelect - 1]?.frecuencia ===
                      "TRIMESTRAL"
                    }
                    onChange={(c) => {
                      let prevLocal = [...componentes];
                      prevLocal[componentSelect - 1].frecuencia = c.target.value
                        .replaceAll('"', "")
                        .replaceAll("'", "")
                        .replaceAll("\n", "");
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
              // disabled={mirEdit?.componentes[componentSelect - 1].medios}
              rows={8}
              multiline
              variant="filled"
              sx={{
                boxShadow: 2,
                width: ["none", "30vh", "40vh", "50vh", "50vh"],
                //top: ["-4vh", "none", "none", "none", "none", "none"]
              }}
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
                let prevLocal = [...componentes];
                prevLocal[componentSelect - 1].medios = c.target.value
                  .replaceAll('"', "")
                  .replaceAll("'", "")
                  .replaceAll("\n", "");
                setComponentes(prevLocal);
              }}
              value={componentes[componentSelect - 1]?.medios}
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
              // disabled={mirEdit?.componentes[componentSelect - 1].supuestos}
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
                prevLocal[componentSelect - 1].supuestos = c.target.value
                  .replaceAll('"', "")
                  .replaceAll("'", "")
                  .replaceAll("\n", "");
                setComponentes(prevLocal);
              }}
              value={componentes[componentSelect - 1]?.supuestos}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
