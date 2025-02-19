import { useEffect, useState } from "react";
import {
  TextField,
  Grid,
  Typography,
  List,
  Divider,
  ListItemButton,
  Autocomplete,
  FormControl,
  IconButton,
  Tooltip,
  useMediaQuery,
  InputLabel,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
//import { IAI } from "../../screens/InterfacesActividadesInstitucionales";
import { IAI } from "../../screens/actividadesInstitucionales/InterfacesActividadesInstitucionales";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import { IAccion } from "./IAccion1";
import { clearInfo } from "../genericComponents/GenericMethods";
import { queries } from "../../queries";
export function TabAccion1({
  AI,
  noAcciones,
  addAccion,
  addremoveAccion,
  setAi,
}: {
  AI: IAI;
  noAcciones: number[];
  addAccion: Function;
  addremoveAccion: Function;
  setAi: Function;
}) {
  const [componentSelect, setComponentSelect] = useState(1);
  const [openFormulaDialog, setOpenFormulaDialog] = useState(false);
  const [acciones, setAcciones] = useState<Array<IAccion>>(AI.acciones);
  const [prevTextFormula, setPrevTextFormula] = useState("");
  const [errorIndicador, setErrorIndicador] = useState(-1);
  const [tipoFormula, setTipoFormula] = useState("");
  const [elementoFormula, setElementoFormula] = useState("");

  useEffect(() => {
    setAcciones(AI.acciones);
  }, [AI]);

  useEffect(() => {
    setAi((AI: IAI) => ({
      ...AI,
      ...{
        acciones: acciones,
      },
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acciones]);

  

  const handleClickOpen = () => {
    setPrevTextFormula(AI.acciones[componentSelect - 1].formula);
    setOpenFormulaDialog(true);
  };

  const evalueTxtIndicador = (dato: string) => {
    const cIndicador =
      // jsonMIR.componentes[componentSelect - 1].indicador?.toLowerCase();
      "1";
    if (cIndicador !== undefined) {
      if (cIndicador.includes("porcentaje")) {
        setTipoFormula("Porcentaje");
        setElementoFormula(dato);
        handleClickOpen();
        setErrorIndicador(-1);
      } else if (cIndicador.includes("tasa")) {
        setTipoFormula("Tasa");
        setElementoFormula(dato);
        handleClickOpen();
        setErrorIndicador(-1);
      } else if (cIndicador.includes("indice" || "índice")) {
        setTipoFormula("Índice");
        setElementoFormula(dato);
        handleClickOpen();
        setErrorIndicador(-1);
      } else if (cIndicador.includes("promedio")) {
        setTipoFormula("Promedio");
        setElementoFormula(dato);
        handleClickOpen();
        setErrorIndicador(-1);
      } else {
        setErrorIndicador(componentSelect - 1);
        // let prevLocal = [...jsonRF.componentes];
        // prevLocal[componentSelect - 1].indicador = "";
        // setComponentesValues(prevLocal);
      }
    }
  };

  const isSmallScreen = useMediaQuery("(max-width: 600px)");






































  const dateSem = [new Date("2023-06-30"), new Date("2023-12-31")];
  const dateTrim = [
    new Date("2023-03-31"),
    new Date("2023-06-30"),
    new Date("2023-09-30"),
    new Date("2023-12-31"),
  ];
  
  const d1 = "",
    d2 = "",
    d3 = "",
    d4 = "",
    r1 = "",
    r2 = "",
    r3 = "",
    r4 = "";
  
  const GridTablePer = ({ periodo }: { periodo: string }) => {
    return (
      <div
        className="grid-container"
        style={{
          backgroundColor: "lightgray",
          boxShadow: "1px 2px 2px",
          textAlign: "center",
          width: "100%",
        }}
      >
        <table style={{ width: "100%", textAlign: "center" }}>
          <thead style={{ width: "100%", textAlign: "center" }}>
            <tr>
              <th style={{ textAlign: "center" }}>{periodo}</th>
            </tr>
          </thead>
        </table>
      </div>
    );
  };
  
  const GridTableTrim = ({
    d1,
    d2,
    d3,
    d4,
  }: {
    d1: string;
    d2: string;
    d3: string;
    d4: string;
  }) => {
    return (
      <div className="grid-container" style={{ width: "100%" }}>
        <table style={{ width: "100%" }}>
          <thead
            style={{
              backgroundColor: "lightgray",
              boxShadow: "1px 2px 2px",
              textAlign: "center",
            }}
          >
            <tr>
              <th>I</th>
              <th>II</th>
              <th>III</th>
              <th>IV</th>
            </tr>
          </thead>
          <tbody style={{ width: "100%", textAlign: "center" }}>
            <tr>
              <td>{d1}</td>
              <td>{d2}</td>
              <td>{d3}</td>
              <td>{d4}</td>
            </tr>
            {/* <tr>
              <td>100</td>
              <td>100</td>
              <td>100</td>
              <td><input></input></td>
            </tr> */}
          </tbody>
        </table>
      </div>
    );
  };
  
  const GridTableSem = ({ d1, d2 }: { d1: string; d2: string }) => {
    return (
      <div className="grid-container" style={{ width: "100%" }}>
        <table style={{ width: "100%" }}>
          <thead
            style={{
              backgroundColor: "lightgray",
              boxShadow: "1px 2px 2px",
              textAlign: "center",
            }}
          >
            <tr>
              <th>I</th>
              <th>II</th>
            </tr>
          </thead>
          <tbody style={{ width: "100%", textAlign: "center" }}>
            <tr>
              <td>{d1}</td>
              <td>{d2}</td>
            </tr>
            {/* <tr>
              <td>100</td>
              <td>100</td>
              <td>100</td>
              <td><input></input></td>
            </tr> */}
          </tbody>
        </table>
      </div>
    );
  };
  
  const Logmensaje = ({ d1 }: { d1: string }) => {
    return <div></div>;
  };
  const GridTableMetasTitulo = () => {
    return (
      <div
        style={{
          backgroundColor: "lightgray",
          boxShadow: "1px 2px 2px",
          textAlign: "center",
          width: "100%",
        }}
      >
        <table style={{ width: "100%", textAlign: "center" }}>
          <thead style={{ width: "100%", textAlign: "center" }}>
            <tr>
              <th style={{ width: "100%", textAlign: "center" }}>METAS</th>
            </tr>
          </thead>
        </table>
      </div>
    );
  };
  

























  return (
    <Grid
      sx={{
        width: "93vw",
        height: "82vh",
        justifyContent: "center",
        alignItems: "center",
        justifyItems: "center",
        backgroundColor: "#fff",
        boxShadow: 20,
        borderRadius: 5,
        overflow: "auto",
      }}
    >
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
              height: "100%",
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
            {noAcciones.map((item) => {
              return (
                <Grid
                  sx={{
                    //height: "15vh",
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
                      Accion {item}
                    </Typography>
                  </ListItemButton>
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
          {/* <Grid
            item
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            sx={{
              //alignContent: "center",
              display: "flex",
              //justifyContent: "center",
              justifyContent: "flex-end",
              alignItems: "center",
              //backgroundColor: "blue"
            }}
          > */}
          {isSmallScreen && (
            <List
             
            >
              {noAcciones.map((item) => {
                return (
                  <Grid
                    sx={{
                      //height: "15vh",
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
                        Accion {item}
                      </Typography>
                    </ListItemButton>
                  </Grid>
                );
              })}
            </List>
          )}

          
          <Grid
            item
            xl={11}
            lg={11}
            md={11}
            sm={11}
            xs={11}
            sx={{
              //alignContent: "center",
              display: "flex",
              //justifyContent: "center",
              justifyContent: ["center", "flex-end", "flex-end", "flex-end", "flex-end"],
              alignItems: "center",
              //backgroundColor: "blue"
            }}
          >
            <IconButton
              onClick={() => {
                addAccion();
                setComponentSelect(AI.acciones.length + 1);
              }}
              disabled={AI.acciones.length === 2}
            >
              <AddCircleIcon fontSize="large" />
            </IconButton>
            <IconButton
              onClick={() => {
                addremoveAccion();
                setComponentSelect(AI.acciones.length - 1);
              }}
              disabled={AI.acciones.length <= 1}
            >
              <DoDisturbOnIcon fontSize="large" />
            </IconButton>
            <Typography
              sx={{
                mr: "1vw",
                fontFamily: "MontserratSemiBold",
                fontSize: ["2vh", "2vh", "2vh", "3vh", "4vh", "4vh"],
              }}
            >
              ACCION #{componentSelect}
            </Typography>
          </Grid>

          {/* </Grid> */}

          {/* <Grid
            item
            xl={11}
            lg={11}
            md={11}
            sm={11}
            xs={11}
            sx={{
              //alignContent: "center",
              display: "flex",
              //justifyContent: "center",
              justifyContent: "flex-end",
              //alignItems: "flex-start"
              //backgroundColor: "blue"
            }}
          ></Grid> */}

          <Grid
            item
            xl={3.5}
            lg={3.5}
            md={3.5}
            sm={3.5}
            xs={11}
            sx={{
              alignContent: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TextField
              multiline
              fullWidth
              rows={4}
              InputLabelProps={{
                style: { fontFamily: "MontserratSemiBold" },
              }}
              InputProps={{ style: { fontFamily: "MontserratRegular" } }}
              variant="filled"
              sx={{ boxShadow: 2 }}
              label={"Descripción de la accion"}
              onChange={(c) => {
                let prevLocal = [...acciones];
                prevLocal[componentSelect - 1].descripcion = clearInfo(c.target.value)
                setAcciones(prevLocal);
              }}
              value={acciones[componentSelect - 1]?.descripcion}
            />
          </Grid>

          <Grid
            item
            xl={3.5}
            lg={3.5}
            md={3.5}
            sm={3.5}
            xs={11}
            sx={{
              alignContent: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TextField
              multiline
              fullWidth
              InputLabelProps={{
                style: { fontFamily: "MontserratSemiBold" },
              }}
              InputProps={{ style: { fontFamily: "MontserratRegular" } }}
              rows={4}
              variant="filled"
              sx={{ boxShadow: 2 }}
              label={"Nombre del Indicador"}
              error={errorIndicador === componentSelect - 1 ? true : false}
              helperText={
                errorIndicador === componentSelect - 1
                  ? "Incluir tipo de indicador: Porcentaje, Tasa, Indice ó Promedio. "
                  : null
              }
              onChange={(c) => {
                let prevLocal = [...acciones];
                prevLocal[componentSelect - 1].nombreIndicador = clearInfo(c.target.value)
                setAcciones(prevLocal);
              }}
              value={acciones[componentSelect - 1]?.nombreIndicador}
            />
          </Grid>

          <Grid
            item
            xl={3.5}
            lg={3.5}
            md={3.5}
            sm={3.5}
            xs={11}
            sx={{
              alignContent: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TextField
              multiline
              fullWidth
              rows={4}
              variant="filled"
              InputLabelProps={{
                style: { fontFamily: "MontserratSemiBold" },
              }}
              InputProps={{ style: { fontFamily: "MontserratRegular" } }}
              sx={{ boxShadow: 2 }}
              label={"Fórmula de Cálculo"}
              // onClick={() => {
              //   evalueTxtIndicador();
              // }}
              value={acciones[componentSelect - 1]?.formula}
            />
          </Grid>

          <Grid
            item
            xl={3.5}
            lg={3.5}
            md={3.5}
            sm={3.5}
            xs={11}
            sx={{
              alignContent: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TextField
              multiline
              fullWidth
              rows={4}
              variant="filled"
              InputLabelProps={{
                style: { fontFamily: "MontserratSemiBold" },
              }}
              InputProps={{ style: { fontFamily: "MontserratRegular" } }}
              sx={{ boxShadow: 2 }}
              label={"MV / FI"}
              onChange={(c) => {
                let prevLocal = [...acciones];
                prevLocal[componentSelect - 1].numerador = clearInfo(c.target.value)
                setAcciones(prevLocal);
              }}
              value={acciones[componentSelect - 1]?.numerador}
            />
          </Grid>

          <Grid
            item
            xl={3.5}
            lg={3.5}
            md={3.5}
            sm={3.5}
            xs={11}
            sx={{
              alignContent: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TextField
              multiline
              fullWidth
              rows={4}
              variant="filled"
              sx={{ boxShadow: 2 }}
              label={"Frecuencia"}
              InputLabelProps={{
                style: { fontFamily: "MontserratSemiBold" },
              }}
              InputProps={{ style: { fontFamily: "MontserratRegular" } }}
              onChange={(c) => {
                let prevLocal = [...acciones];
                prevLocal[componentSelect - 1].unidadMedida = clearInfo(c.target.value)
                setAcciones(prevLocal);
              }}
              value={acciones[componentSelect - 1]?.unidadMedida}
            />
          </Grid>

          <Grid
            item
            xl={3.5}
            lg={3.5}
            md={3.5}
            sm={3.5}
            xs={11}
            sx={{
              alignContent: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TextField
              multiline
              fullWidth
              rows={4}
              variant="filled"
              sx={{ boxShadow: 2 }}
              label={"Unidad de medida"}
              InputLabelProps={{
                style: { fontFamily: "MontserratSemiBold" },
              }}
              InputProps={{ style: { fontFamily: "MontserratRegular" } }}
              onChange={(c) => {
                let prevLocal = [...acciones];
                prevLocal[componentSelect - 1].medio_fuente = clearInfo(c.target.value)
                setAcciones(prevLocal);
              }}
              value={acciones[componentSelect - 1]?.medio_fuente}
            />
          </Grid>

          <Grid
            item
            xl={3.5}
            lg={3.5}
            md={3.5}
            sm={3.5}
            xs={11}
            sx={{
              alignContent: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TextField
              multiline
              fullWidth
              rows={4}
              variant="filled"
              sx={{ boxShadow: 2 }}
              label={"Sentido"}
              InputLabelProps={{
                style: { fontFamily: "MontserratSemiBold" },
              }}
              InputProps={{ style: { fontFamily: "MontserratRegular" } }}
              onChange={(c) => {
                let prevLocal = [...acciones];
                prevLocal[componentSelect - 1].denomidador = clearInfo(c.target.value)
                setAcciones(prevLocal);
              }}
              value={acciones[componentSelect - 1]?.denomidador}
            />
          </Grid>

          <Grid
            item
            xl={3.5}
            lg={3.5}
            md={3.5}
            sm={3.5}
            xs={11}
            sx={{
              alignContent: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TextField
              multiline
              fullWidth
              rows={4}
              variant="filled"
              sx={{ boxShadow: 2 }}
              label={"Frecuencia"}
              InputLabelProps={{
                style: { fontFamily: "MontserratSemiBold" },
              }}
              InputProps={{ style: { fontFamily: "MontserratRegular" } }}
              onChange={(c) => {
                let prevLocal = [...acciones];
                prevLocal[componentSelect - 1].unidadMedida = clearInfo(c.target.value)
                setAcciones(prevLocal);
              }}
              value={acciones[componentSelect - 1]?.unidadMedida}
            />
          </Grid>

          <Grid
            item
            xl={3.5}
            lg={3.5}
            md={3.5}
            sm={3.5}
            xs={11}
            sx={{
              alignContent: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TextField
              multiline
              fullWidth
              rows={4}
              variant="filled"
              InputLabelProps={{
                style: { fontFamily: "MontserratSemiBold" },
              }}
              InputProps={{ style: { fontFamily: "MontserratRegular" } }}
              sx={{ boxShadow: 2 }}
              label={"Medio de Verificación / Fuente de Información"}
              onChange={(c) => {
                let prevLocal = [...acciones];
                prevLocal[componentSelect - 1].medio_fuente2 = clearInfo(c.target.value)
                setAcciones(prevLocal);
              }}
              value={acciones[componentSelect - 1]?.medio_fuente2}
            />
          </Grid>
          
          





























          {/* <Grid
            container
            item
            sx={{ display: "flex", justifyContent: "center" }}
            xs={12}
          >
            <Grid item xs={6}>
              <GridTablePer
                periodo={
                  "METAS POR FRECUENCIA"
                }
              />
            </Grid>
          </Grid> */}

          
          
                <TableContainer sx={{ width: "75vw", overflow: "auto"}}
                  
                >
                  <Table size="small" sx={{ width: "100%" }} >
                  <TableHead sx={{ position: "sticky", top: 0, backgroundColor: "#ccc", zIndex: 2 }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", textAlign: "center", border: "1px solid #ddd" }} colSpan={7}>METAS POR FRECUENCIA</TableCell>
                  </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold", textAlign: "center", border: "1px solid #ddd" }}>CONCEPTO</TableCell>
                      <TableCell sx={{ fontWeight: "bold", textAlign: "center", border: "1px solid #ddd" }}>LÍNEA BASE 2021</TableCell>
                      <TableCell sx={{ fontWeight: "bold", textAlign: "center", border: "1px solid #ddd" }}>DATO I</TableCell>
                      <TableCell sx={{ fontWeight: "bold", textAlign: "center", border: "1px solid #ddd" }}>DATO II</TableCell>
                      <TableCell sx={{ fontWeight: "bold", textAlign: "center", border: "1px solid #ddd" }}>DATO III</TableCell>
                      <TableCell sx={{ fontWeight: "bold", textAlign: "center", border: "1px solid #ddd" }}>DATO IV</TableCell>
                      <TableCell sx={{ fontWeight: "bold", textAlign: "center", border: "1px solid #ddd" }}>ANUAL</TableCell>
                    </TableRow>
                  </TableHead>
                    <TableBody>
                      


                      <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                        <TableCell sx={{ fontWeight: "bold", border: "1px solid #ddd", padding: "5px", flex: 1 }}>
                        <TextField sx={{ width: "100%" }}
                            // disabled={new Date()>dateTrim[0]}
                            value={
                              
                                "VALOR"
                              
                            }
                            
                            
                          />
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold", border: "1px solid #ddd", padding: "2px", flex: 1 }}>
                          <TextField sx={{ width: "100%" }}
                            // disabled={new Date()>dateTrim[0]}
                            variant={"filled"}
                            label={
                              <Typography
                                sx={{
                                  fontSize: "0.7vw",
                                  fontFamily: "MontserratMedium",
                                }}
                              >
                                DATO I
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
                              evalueTxtIndicador("DATO I,trimestre1")
                            }
                            value={
                              // componentesValues[componentSelect - 1]
                              //   ?.metasPorFrecuencia[0]?.trimestre1 || ""
                              1
                            }
                          />
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold", border: "1px solid #ddd", padding: "2px", flex: 1 }}>
                          <TextField sx={{ width: "100%" }}
                            // disabled={new Date()>dateTrim[1]}
                            variant={"filled"}
                            label={
                              <Typography
                                sx={{
                                  fontSize: "0.7vw",
                                  fontFamily: "MontserratMedium",
                                }}
                              >
                                DATO II
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
                              evalueTxtIndicador("DATO II,trimestre2")
                            }
                            value={
                              // componentesValues[componentSelect - 1]
                              //   ?.metasPorFrecuencia[0]?.trimestre2 || ""
                              2
                            }
                          />
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold", border: "1px solid #ddd", padding: "2px", flex: 1 }}>
                          <TextField sx={{ width: "100%" }}
                            // disabled={new Date()>dateTrim[2]}
                            variant={"filled"}
                            label={
                              <Typography
                                sx={{
                                  fontSize: "0.7vw",
                                  fontFamily: "MontserratMedium",
                                }}
                              >
                                DATO III
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
                              evalueTxtIndicador("DATO III,trimestre3")
                            }
                            value={
                              // componentesValues[componentSelect - 1]
                              //   ?.metasPorFrecuencia[0]?.trimestre3 || ""
                              3
                            }
                          />
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold", border: "1px solid #ddd", padding: "2px", flex: 1 }}>
                          <TextField sx={{ width: "100%" }}
                            // disabled={new Date()>dateTrim[3]}
                            variant={"filled"}
                            label={
                              <Typography
                                sx={{
                                  fontSize: "0.7vw",
                                  fontFamily: "MontserratMedium",
                                }}
                              >
                                DATO IV
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
                              evalueTxtIndicador("DATO IV,trimestre4")
                            }
                            value={
                              // componentesValues[componentSelect - 1]
                              //   ?.metasPorFrecuencia[0]?.trimestre4 || ""
                              4
                            }
                          />
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold", border: "1px solid #ddd", padding: "2px", flex: 1 }}>
                          <TextField sx={{ width: "100%" }}
                            // disabled={new Date()>dateTrim[3]}
                            variant={"filled"}
                            label={
                              <Typography
                                sx={{
                                  fontSize: "0.7vw",
                                  fontFamily: "MontserratMedium",
                                }}
                              >
                                DATO IV
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
                              evalueTxtIndicador("DATO IV,trimestre4")
                            }
                            value={
                              // componentesValues[componentSelect - 1]
                              //   ?.metasPorFrecuencia[0]?.trimestre4 || ""
                              4
                            }
                          />
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold", border: "1px solid #ddd", padding: "2px", flex: 1 }}>
                          <TextField sx={{ width: "100%" }}
                            // disabled={new Date()>dateTrim[3]}
                            variant={"filled"}
                            label={
                              <Typography
                                sx={{
                                  fontSize: "0.7vw",
                                  fontFamily: "MontserratMedium",
                                }}
                              >
                                ANUAL
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
                              evalueTxtIndicador("DATO IV,trimestre4")
                            }
                            value={
                              // componentesValues[componentSelect - 1]
                              //   ?.metasPorFrecuencia[0]?.trimestre4 || ""
                              4
                            }
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              {/* // ) : (
              //   <div
              //     className="grid-container"
              //     style={{ width: "100%", textAlign: "center" }}
              //   >
              //     <table style={{ width: "100%" }}>
              //       <tbody>
              //         <tr style={{ borderColor: "black" }}>
              //           <td style={{ width: "25%" }}>
              //             <TextField
                           
              //               variant={"filled"}
              //               label={
              //                 <Typography
              //                   sx={{
              //                     fontSize: "0.7vw",
              //                     fontFamily: "MontserratMedium",
              //                   }}
              //                 >
              //                   DATO I
              //                 </Typography>
              //               }
              //               InputLabelProps={{
              //                 style: {
              //                   fontFamily: "MontserratMedium",
              //                 },
              //               }}
              //               InputProps={{
              //                 style: {
              //                   fontFamily: "MontserratRegular",
              //                 },
              //               }}
              //               onClick={() =>
              //                 evalueTxtIndicador("DATO I,semestre1")
              //               }
                            
              //               value={
              //                 componentesValues[componentSelect - 1]
              //                   ?.metasPorFrecuencia[0]?.semestre1 || ""
              //               }
              //             />
              //           </td>
              //           <td style={{ width: "25%" }}>
              //             <TextField
              //               disabled={new Date() > dateSem[1]}
              //               variant={"filled"}
              //               label={
              //                 <Typography
              //                   sx={{
              //                     fontSize: "0.7vw",
              //                     fontFamily: "MontserratMedium",
              //                   }}
              //                 >
              //                   DATO II
              //                 </Typography>
              //               }
              //               onClick={() =>
              //                 evalueTxtIndicador("DATO II,semestre2")
              //               }
              //               InputLabelProps={{
              //                 style: {
              //                   fontFamily: "MontserratMedium",
              //                 },
              //               }}
              //               InputProps={{
              //                 style: {
              //                   fontFamily: "MontserratRegular",
              //                 },
              //               }}
              //               value={
              //                 componentesValues[componentSelect - 1]
              //                   ?.metasPorFrecuencia[0]?.semestre2 || ""
              //               }
              //             />
              //           </td>
              //         </tr>
              //       </tbody>
              //     </table>
              //   </div>
              // )} */}
            </Grid>
        




















































              
          {/* ---------------------------------------------------------------------------------------------------------------------------- */}
        </Grid>
      </Grid>
    
   
  );
}

export default TabAccion1;


const periodo = [2021, 2022, 2023, 2024, 2025, 2026, 2027];
