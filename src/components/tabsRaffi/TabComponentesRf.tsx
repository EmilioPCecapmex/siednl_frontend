import {
  Grid,
  TextField,
  ListItemButton,
  Typography,
  Divider,
  List,
  Box,
  Paper,
  styled,
  Tooltip,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useEffect, useState } from "react";
import { IComponenteMA, IComponenteRF, IFrecuencias } from "./Interfaces";
import { IComponente } from "../tabsMetaAnual/IComponente";
import { ClassNames } from "@emotion/react";
import { FormulaDialogRF } from "../formulasDialog/FormulaDialogRF";

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

export const TabComponenteRf = ({
  MIR,
  MA,
  RF,
  noComponentes,
  valoresComponenteRFFnc,
  showMirFnc,
  setTxtShowFnc,
  setComponentes,
  componentesRF,
}: {
  MA: string;
  MIR: string;
  RF: string;
  noComponentes: number[];
  valoresComponenteRFFnc: Function;
  showMirFnc: Function;
  setTxtShowFnc: Function;
  setComponentes: Function;
  componentesRF: IComponenteRF[];
}) => {
  let encabezado = JSON.parse(MIR).encabezado;
  const [componentSelect, setComponentSelect] = useState(1);

  const [openFormulaDialog, setOpenFormulaDialog] = useState(false);
  const [prevTextFormula, setPrevTextFormula] = useState("");
  const [tipoFormula, setTipoFormula] = useState("");
  const [elementoFormula, setElementoFormula] = useState("");
  const [errorIndicador, setErrorIndicador] = useState(-1);
  const handleClickOpen = () => {
    //setPrevTextFormula("Porcentaje");
    setOpenFormulaDialog(true);
  };

  const evalueTxtIndicador = (dato: string) => {
    const cIndicador =
      jsonMIR.componentes[componentSelect - 1].indicador?.toLowerCase();
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
        let prevLocal = [...jsonRF.componentes];
        prevLocal[componentSelect - 1].indicador = "";
        setComponentesValues(prevLocal);
      }
    }
  };

  const handleClose = () => {
    setOpenFormulaDialog(false);
  };

  const [componentesValues, setComponentesValues] = useState<
    Array<IComponenteRF>
  >([]);

  let jsonMA =
    MA === ""
      ? ""
      : JSON.parse(MA).length > 1
      ? JSON.parse(MA)[0]
      : JSON.parse(MA);

  let jsonMIR =
    MIR === ""
      ? ""
      : JSON.parse(MIR).length > 1
      ? JSON.parse(MIR)[0]
      : JSON.parse(MIR);

  let jsonRF = RF === "" ? "" : JSON.parse(RF);

  useEffect(() => {
    let comp: IComponenteRF[] = [];

    noComponentes.map((x, index) => {
      return comp.push({
        componentes: "C" + (index + 1),
        metasPorFrecuencia: [
          {
            semestre1: "",
            semestre2: "",
            trimestre1: "",
            trimestre2: "",
            trimestre3: "",
            trimestre4: "",
          },
        ],
        numeradorPorFrecuencia: [
          {
            semestre1: "",
            semestre2: "",
            trimestre1: "",
            trimestre2: "",
            trimestre3: "",
            trimestre4: "",
          },
        ],
        denominadorPorFrecuencia: [
          {
            semestre1: "",
            semestre2: "",
            trimestre1: "",
            trimestre2: "",
            trimestre3: "",
            trimestre4: "",
          },
        ],
      });
    });

    setComponentesValues(comp);
    setComponentes(comp);
  }, [noComponentes]);

  useEffect(() => {
    valoresComponenteRFFnc(componentesValues);
    setComponentes(componentesValues);
  }, [componentesValues]);

  const changeFormula = (txt: string) => {
    if (
      JSON.parse(MIR)
        .componentes[componentSelect - 1].indicador.toLowerCase()
        .includes("indice") ||
      JSON.parse(MIR)
        .componentes[componentSelect - 1].indicador.toLowerCase()
        .includes("índice")
    ) {
      componentesValues[
        componentSelect - 1
      ].numeradorPorFrecuencia[0].trimestre2 = txt;
      componentesValues[componentSelect - 1].metasPorFrecuencia[0].trimestre2 =
        txt;
    } else {
      let frec = txt.split(",")[3];
      console.log(componentesValues);
      componentesValues[componentSelect - 1].numeradorPorFrecuencia[0][
        frec as keyof IFrecuencias
      ] = txt.split(",")[0];
      componentesValues[componentSelect - 1].denominadorPorFrecuencia[0][
        frec as keyof IFrecuencias
      ] = txt.split(",")[1];
      componentesValues[componentSelect - 1].metasPorFrecuencia[0][
        frec as keyof IFrecuencias
      ] = txt.split(",")[2];
    }

    setComponentesValues([...componentesValues]);
  };

  useEffect(() => {
   
       setComponentesValues(componentesRF);


  }, []);



  return (
    <>
      <Grid
        container
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
        <FormulaDialogRF
          open={openFormulaDialog}
          close={handleClose}
          textoSet={changeFormula}
          tipo={tipoFormula}
          elemento={"Componente " + componentSelect.toString()}
          dato={elementoFormula}
          MIR={MIR}
        />
        {/* COLUMNA IZQUIERDA QUE MUESTRA LOS COMPONENTES */}
        <Grid item xs={2}>
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
            {noComponentes.map((item) => {
              return (
                <Box
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
                      sx={{ fontFamily: "MontserratMedium", fontSize: "0.7vw" }}
                    >
                      COMPONENTE {item}
                    </Typography>
                  </ListItemButton>

                  <Divider />
                </Box>
              );
            })}
          </List>
        </Grid>

        {/* RESTO DE CONTENEDOR EN DONDE SE MOSTRARÁ LA TABLE */}
        <Grid container item xs={10}>
          <Grid
            container
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end" }}
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
            container
            item
            xs={10}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <TextField
              fullWidth
              variant="standard"
              value={
                encabezado?.institucion === "Selecciona"
                  ? ""
                  : encabezado?.institucion
              }
              disabled={true}
              label="INSTITUCION"
            ></TextField>
          </Grid>

          <Grid
            container
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "space-around" }}
          >
            <Grid item xs={3}>
              <TextField
                disabled={true}
                fullWidth
                sx={{ boxShadow: 2 }}
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
                // value={componentesValues[componentSelect - 1]?.metaAnual || ""}
                value={
                  jsonMA?.componentes[componentSelect - 1]?.metaAnual || ""
                }
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                fullWidth
                disabled={true}
                sx={{ boxShadow: 2 }}
                variant={"filled"}
                label={
                  <Typography
                    sx={{ fontSize: "0.7vw", fontFamily: "MontserratMedium" }}
                  >
                    LINEA BASE 2021
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
                // value={componentesValues[componentSelect - 1]?.lineaBase || ""}
                value={
                  jsonMA?.componentes[componentSelect - 1]?.lineaBase || ""
                }
              />
            </Grid>
          </Grid>

          <Grid
            container
            item
            sx={{ display: "flex", justifyContent: "center" }}
            xs={12}
          >
            <Grid item xs={6}>
              <GridTablePer
                periodo={
                  jsonMA?.componentes[componentSelect - 1]
                    ?.metasPorFrecuencia[0]?.semestre1 === ""
                    ? "TRIMESTRE"
                    : "SEMESTRE"
                }
              />
            </Grid>
          </Grid>

          <Grid
            container
            item
            sx={{ display: "flex", justifyContent: "center" }}
            xs={12}
          >
            <Grid item xs={6}>
              {jsonMA?.componentes[componentSelect - 1]?.metasPorFrecuencia[0]
                ?.semestre1 === "" ? (
                <GridTableTrim
                  d1={
                    jsonMA?.componentes[componentSelect - 1]
                      ?.metasPorFrecuencia[0]?.trimestre1
                  }
                  d2={
                    jsonMA?.componentes[componentSelect - 1]
                      ?.metasPorFrecuencia[0]?.trimestre2
                  }
                  d3={
                    jsonMA?.componentes[componentSelect - 1]
                      ?.metasPorFrecuencia[0]?.trimestre3
                  }
                  d4={
                    jsonMA?.componentes[componentSelect - 1]
                      ?.metasPorFrecuencia[0]?.trimestre4
                  }
                />
              ) : (
                <GridTableSem
                  d1={
                    jsonMA?.componentes[componentSelect - 1]
                      ?.metasPorFrecuencia[0]?.semestre1
                  }
                  d2={
                    jsonMA?.componentes[componentSelect - 1]
                      ?.metasPorFrecuencia[0]?.semestre2
                  }
                />
              )}
            </Grid>
          </Grid>

          <Grid
            container
            item
            sx={{ display: "flex", justifyContent: "center" }}
            xs={12}
          >
            <Grid item xs={6}>
              <GridTableMetasTitulo />
            </Grid>
          </Grid>

          <Grid
            container
            item
            sx={{ display: "flex", justifyContent: "center" }}
            xs={12}
          >
            <Grid item xs={6}></Grid>
          </Grid>
          <Grid
            container
            item
            sx={{ display: "flex", justifyContent: "center" }}
            xs={12}
          >
            <Grid item xs={6}>
              {jsonMA?.componentes[componentSelect - 1]?.metasPorFrecuencia[0]
                ?.semestre1 === "" ? (
                <div
                  className="grid-container"
                  style={{ width: "100%", textAlign: "center" }}
                >
                  <table style={{ width: "100%" }}>
                    <tbody>
                      <tr style={{ borderColor: "black" }}>
                        <td style={{ width: "25%" }}>
                          <TextField
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
                              componentesValues[componentSelect - 1]
                                ?.metasPorFrecuencia[0]?.trimestre1 || ""
                            }
                          />
                        </td>
                        <td style={{ width: "25%" }}>
                          <TextField
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
                              componentesValues[componentSelect - 1]
                                ?.metasPorFrecuencia[0]?.trimestre2 || ""
                            }
                          />
                        </td>
                        <td style={{ width: "25%" }}>
                          <TextField
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
                              componentesValues[componentSelect - 1]
                                ?.metasPorFrecuencia[0]?.trimestre3 || ""
                            }
                          />
                        </td>
                        <td style={{ width: "25%" }}>
                          <TextField
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
                              componentesValues[componentSelect - 1]
                                ?.metasPorFrecuencia[0]?.trimestre4 || ""
                            }
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <div
                  className="grid-container"
                  style={{ width: "100%", textAlign: "center" }}
                >
                  <table style={{ width: "100%" }}>
                    <tbody>
                      <tr style={{ borderColor: "black" }}>
                        <td style={{ width: "25%" }}>
                          <TextField
                            // sx={{
                            //   backgroundColor: (d1==""
                            //   ?""
                            //   :(parseInt(r1)-parseInt(d1))/parseInt(d1)<.05
                            //   ? "#CEE9B6"
                            //   : (parseInt(r1)-parseInt(d1))/parseInt(d1)<.1
                            //   ? "#FFDE6A"
                            //   : "#EF6969")
                            // }}
                            //disabled={new Date()>dateSem[0]}
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
                              evalueTxtIndicador("DATO I,semestre1")
                            }
                            // error={
                            //   (parseFloat(componentesValues[componentSelect - 1]?.metasPorFrecuencia[0]?.semestre1) <
                            //     0 ||
                            //     isNaN(
                            //       parseFloat(
                            //         componentesValues[componentSelect - 1]?.metasPorFrecuencia[0]?.semestre1
                            //       )
                            //     )) &&
                            //   componentesValues[componentSelect - 1]?.metasPorFrecuencia[0]?.semestre1 !== ""
                            //     ? true
                            //     : false
                            // }
                            // helperText={
                            //   (parseFloat(componentesValues[componentSelect - 1]?.metasPorFrecuencia[0]?.semestre1) <
                            //     0 ||
                            //     isNaN(
                            //       parseFloat(
                            //         componentesValues[componentSelect - 1]?.metasPorFrecuencia[0]?.semestre1
                            //       )
                            //     )) &&
                            //   componentesValues[componentSelect - 1]?.metasPorFrecuencia[0]?.semestre1 !== ""
                            //     ? "Introducir valor mayor que 0."
                            //     : null
                            // }
                            value={
                              componentesValues[componentSelect - 1]
                                ?.metasPorFrecuencia[0]?.semestre1 || ""
                            }
                          />
                        </td>
                        <td style={{ width: "25%" }}>
                          <TextField
                            disabled={new Date() > dateSem[1]}
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
                            onClick={() =>
                              evalueTxtIndicador("DATO II,semestre2")
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
                              componentesValues[componentSelect - 1]
                                ?.metasPorFrecuencia[0]?.semestre2 || ""
                            }
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
