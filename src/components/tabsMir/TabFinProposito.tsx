import { useEffect, useState } from "react";
import {
  TextField,
  Grid,
  Typography,
  List,
  ListItemButton,
  Divider,
  FormControl,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import { FormulaDialog } from "../formulasDialog/FormulaDialog";
import { IMIR, IMIREdit } from "./interfaces mir/IMIR";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";

export function TabFinProposito({
  MIR,
  setMIR,
  mirEdit,
  edit,
}: {
  edit: boolean;
  MIR: IMIR;
  setMIR: Function;
  mirEdit: IMIREdit;
}) {
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  const [fin, setFin] = useState<IFin>({
    resumen: MIR.fin?.resumen || "",
    indicador: MIR.fin?.indicador || "",
    formula: MIR.fin?.formula || "",
    frecuencia: MIR.fin?.frecuencia || "",
    medios: MIR.fin?.medios || "",
    supuestos: MIR.fin?.supuestos || "",
  });

  const [proposito, setProposito] = useState<IProposito>({
    resumen: MIR.proposito?.resumen || "",
    indicador: MIR.proposito?.indicador || "",
    formula: MIR.proposito?.formula || "",
    frecuencia: "ANUAL",
    medios_verificacion: MIR.proposito?.medios_verificacion || "",
    supuestos: MIR.proposito?.supuestos || "",
  });

  const [showFin, setShowFin] = useState(true);
  const [showProposito, setShowProposito] = useState(false);

  const getIndicadores = () => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/tipoDeIndicador", {
        params: {
          Rol: localStorage.getItem("Rol"),
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
        }
      });
  };

  useEffect(() => {
    getIndicadores();
    getFrecuencias();
  }, []);

  const [errorIndicadorFin, setErrorIndicadorFin] = useState("");
  const [errorIndicadorProposito, setErrorIndicadorProposito] = useState("");

  const evalueTxtindicador = (v: string) => {
    if (v === "fin") {
      const findicador = fin.indicador?.toLowerCase();
      if (findicador !== undefined) {
        if (findicador.includes("porcentaje")) {
          setTipoFormula("Porcentaje");
          setErrorIndicadorFin("");
          setElementoFormula("Fin");
        } else if (findicador.includes("tasa")) {
          setTipoFormula("Tasa");
          setErrorIndicadorFin("");
          setElementoFormula("Fin");
        } else if (findicador.includes("indice" || "índice")) {
          setTipoFormula("Índice");
          setErrorIndicadorFin("");
          setElementoFormula("Fin");
        } else if (findicador.includes("promedio")) {
          setTipoFormula("Promedio");
          setErrorIndicadorFin("");
          setElementoFormula("Fin");
        } else {
          setErrorIndicadorFin(v);
          setFin({
            ...fin,
            indicador: "",
          });
        }
      }
    }

    if (v === "proposito") {
      const pindicador = proposito.indicador?.toLowerCase();
      if (pindicador !== undefined) {
        if (pindicador.includes("porcentaje")) {
          setTipoFormula("Porcentaje");
          setErrorIndicadorProposito("");
          setElementoFormula("Proposito");
        } else if (pindicador.includes("tasa")) {
          setTipoFormula("Tasa");
          setErrorIndicadorProposito("");
          setElementoFormula("Proposito");
        } else if (pindicador.includes("indice" || "índice")) {
          setTipoFormula("Índice");
          setErrorIndicadorProposito("");
          setElementoFormula("Proposito");
        } else if (pindicador.includes("promedio")) {
          setTipoFormula("Promedio");
          setErrorIndicadorProposito("");
          setElementoFormula("Proposito");
        } else {
          setErrorIndicadorProposito(v);
          setProposito({ ...proposito, formula: "algo" });
          setProposito({ ...proposito, indicador: "" });
        }
      }
    }
  };

  useEffect(() => {
    setMIR((MIR: IMIR) => ({
      ...MIR,
      ...{
        fin: {
          resumen: fin.resumen,
          indicador: fin.indicador,
          formula: fin.formula,
          frecuencia: fin.frecuencia,
          medios: fin.medios,
          supuestos: fin.supuestos,
        },
      },
      ...{
        proposito: {
          resumen: proposito.resumen,
          indicador: proposito.indicador,
          formula: proposito.formula,
          frecuencia: proposito.frecuencia,
          medios_verificacion: proposito.medios_verificacion,
          supuestos: proposito.supuestos,
        },
      },
    }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fin, proposito]);

  const getFrecuencias = () => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/frecuencias", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          // setFrecuencias(r.data.data);
        }
      });
  };

  const [openFormulaDialog, setOpenFormulaDialog] = useState(false);
  const [prevTextFormula, setPrevTextFormula] = useState("");
  const [tipoFormula, setTipoFormula] = useState("");
  const [elementoFormula, setElementoFormula] = useState("");

  const handleClickOpen = () => {
    if (errorIndicadorFin === "" && fin.indicador !== undefined && showFin) {
      setPrevTextFormula(fin.formula);
      setOpenFormulaDialog(true);
    }
    if (
      errorIndicadorProposito === "" &&
      proposito.indicador !== undefined &&
      showProposito
    ) {
      setPrevTextFormula(proposito.formula);
      setOpenFormulaDialog(true);
    }
  };

  const handleClose = () => {
    setOpenFormulaDialog(false);
  };

  const changeFormula = (txt: string) => {
    if (elementoFormula === "Fin") {
      setFin({
        ...fin,
        formula: txt
          .replaceAll('"', "")
          .replaceAll("'", "")
          .replaceAll("\n", ""),
      });
    } else if (elementoFormula === "Proposito") {
      setProposito({
        ...proposito,
        formula: txt
          .replaceAll('"', "")
          .replaceAll("'", "")
          .replaceAll("\n", ""),
      });
    }
  };

  

  return (
    <Grid
      //position="absolute"
      sx={{
        display: "flex",
        width: "93vw",
        height: ["82vh", "82vh", "82vh", "82vh", "82vh", "82vh"],
        flexDirection: "column",
        backgroundColor: "#fff",
        ...(!isSmallScreen ? { boxShadow: 10, borderRadius: 5 } : {}),
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

      {!isSmallScreen ? (
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
              fontSize: "1.5vw",
            }}
          >
            {showFin ? "FIN" : null}
            {showProposito ? "PROPÓSITO" : null}
          </Typography>
        </Grid>
      ) : null}

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
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Divider />
              <ListItemButton
                selected={showFin}
                onClick={() => {
                  setShowFin(true);
                  setShowProposito(false);
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
                  sx={{ fontSize: "1vw", fontFamily: "MontserratMedium" }}
                >
                  FIN
                </Typography>
              </ListItemButton>

              <Divider />
            </Grid>

            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <ListItemButton
                selected={showProposito}
                onClick={() => {
                  setShowProposito(true);
                  setShowFin(false);
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
                  PROPÓSITO
                </Typography>
              </ListItemButton>

              <Divider />
            </Grid>
          </List>
        )}

        {showFin ? (
          <>
            <Grid
              item
              container
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                "& > .MuiGrid-item": {
                  marginBottom: "20px", // Ajusta la cantidad de espacio vertical entre los elementos
                },
              }}
            >
              {isSmallScreen && (
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <List sx={{}}>
                    <Divider />
                    <ListItemButton
                      selected={showFin}
                      onClick={() => {
                        setShowFin(true);
                        setShowProposito(false);
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
                        FIN
                      </Typography>
                    </ListItemButton>

                    <Divider />

                    <Grid
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <ListItemButton
                        selected={showProposito}
                        onClick={() => {
                          setShowProposito(true);
                          setShowFin(false);
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
                          PROPÓSITO
                        </Typography>
                      </ListItemButton>

                      <Divider />
                    </Grid>
                  </List>
                </Grid>
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
                  rows={8}
                  multiline
                  variant="filled"
                  disabled={edit && !mirEdit?.fin.resumen && fin.resumen !== ""}
                  sx={{
                    boxShadow: 2,
                    width: ["none", "30vh", "40vh", "50vh", "50vh"],
                    //top: ["15vh", "block", "none", "none", "none", "none"]
                  }}
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
                    setFin({
                      ...fin,
                      resumen: c.target.value
                        .replaceAll('"', "")
                        .replaceAll("'", "")
                        .replaceAll("\n", "")
                        .trimEnd(),
                    });
                  }}
                  value={fin.resumen}
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
                  disabled={
                    edit && !mirEdit?.fin.indicador && fin.indicador !== ""
                  }
                  rows={8}
                  multiline
                  sx={{
                    boxShadow: 2,
                    width: ["none", "30vh", "40vh", "50vh", "50vh"],
                    //top: ["10vh", "none", "none", "none", "none", "none"]
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
                  onBlur={() =>
                    fin.indicador === "" ? null : evalueTxtindicador("fin")
                  }
                  label={"INDICADOR"}
                  error={errorIndicadorFin === "fin" ? true : false}
                  helperText={
                    errorIndicadorFin
                      ? "Incluir tipo de indicador: Porcentaje, Tasa, Indice ó Promedio. "
                      : null
                  }
                  onChange={(c) => {
                    setFin({
                      ...fin,
                      indicador: c.target.value
                        .replaceAll('"', "")
                        .replaceAll("'", "")
                        .replaceAll("\n", "")
                        .trimEnd(),
                      formula: "",
                    });
                  }}
                  value={fin.indicador}
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
                  disabled={edit && !mirEdit?.fin.formula && fin.formula !== ""}
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
                    boxShadow: 2,
                    width: ["none", "30vh", "40vh", "50vh", "50vh"],
                    //top: ["5vh", "none", "none", "none", "none", "none"]
                  }}
                  label={"FÓRMULA"}
                  onClick={() => handleClickOpen()}
                  value={fin.formula}
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
                    //top: ["1vh", "none", "none", "none", "none", "none"]
                  }}
                >
                  <FormLabel>FRECUENCIA</FormLabel>
                  <FormControlLabel
                    value={"ANUAL"}
                    label={"ANUAL"}
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={fin.frecuencia === "ANUAL"}
                        onChange={(c) => {
                          setFin({
                            ...fin,
                            frecuencia: c.target.value,
                          });
                        }}
                      />
                    }
                  />
                  <FormControlLabel
                    value={"BIENAL"}
                    label={"BIENAL"}
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={fin.frecuencia === "BIENAL"}
                        onChange={(c) => {
                          setFin({
                            ...fin,
                            frecuencia: c.target.value,
                          });
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
                  disabled={edit && !mirEdit?.fin.medios && fin.medios !== ""}
                  rows={8}
                  multiline
                  variant="filled"
                  sx={{
                    boxShadow: 2,
                    width: ["none", "30vh", "40vh", "50vh", "50vh"],
                    //top: ["-4vh", "none", "none", "none", "none", "none"]
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
                  label={"MEDIOS DE VERIFICACIÓN"}
                  onChange={(c) => {
                    setFin({
                      ...fin,
                      medios: c.target.value
                        .replaceAll('"', "")
                        .replaceAll("'", "")
                        .replaceAll("\n", "")
                        .trimEnd(),
                    });
                  }}
                  value={fin.medios}
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
                  disabled={
                    edit && !mirEdit?.fin.supuestos && fin.supuestos !== ""
                  }
                  rows={8}
                  multiline
                  variant="filled"
                  sx={{
                    boxShadow: 2,
                    width: ["none", "30vh", "40vh", "50vh", "50vh"],
                    //top: ["-8vh", "none", "none", "none", "none", "none"]
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
                    setFin({
                      ...fin,
                      supuestos: c.target.value
                        .replaceAll('"', "")
                        .replaceAll("'", "")
                        .replaceAll("\n", "")
                        .trimEnd(),
                    });
                  }}
                  value={fin.supuestos}
                />
              </Grid>
            </Grid>
          </>
        ) : null}

        {showProposito ? (
          <>
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
                  <Divider />
                  <ListItemButton
                    selected={showFin}
                    onClick={() => {
                      setShowFin(true);
                      setShowProposito(false);
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
                    
                      sx={{  fontFamily: "MontserratMedium",fontSize: [10, 10, 10, 13, 15, 18], }}
                    >
                      FIN
                    </Typography>
                  </ListItemButton>

                  <Divider />

                  <Grid
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <ListItemButton
                      selected={showProposito}
                      onClick={() => {
                        setShowProposito(true);
                        setShowFin(false);
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
                          fontSize: [10, 10, 10, 13, 15, 18],
                          fontFamily: "MontserratMedium",
                        }}
                      >
                        PROPÓSITO
                      </Typography>
                    </ListItemButton>

                    <Divider />
                  </Grid>
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
                  disabled={
                    edit &&
                    !mirEdit?.proposito.resumen &&
                    proposito.resumen !== ""
                  }
                  rows={8}
                  multiline
                  variant="filled"
                  sx={{
                    boxShadow: 2,
                    width: ["none", "30vh", "40vh", "50vh", "50vh"],
                  }}
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
                    setProposito({
                      ...proposito,
                      resumen: c.target.value
                        .replaceAll('"', "")
                        .replaceAll("'", "")
                        .replaceAll("\n", "")
                        .trimEnd(),
                    });
                  }}
                  value={proposito.resumen}
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
                  disabled={
                    edit &&
                    !mirEdit?.proposito.indicador &&
                    proposito.indicador !== ""
                  }
                  rows={8}
                  multiline
                  sx={{
                    boxShadow: 2,
                    width: ["none", "30vh", "40vh", "50vh", "50vh"],
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
                  onBlur={() =>
                    proposito.indicador === ""
                      ? null
                      : evalueTxtindicador("proposito")
                  }
                  label={"INDICADOR"}
                  error={errorIndicadorProposito === "proposito" ? true : false}
                  helperText={
                    errorIndicadorProposito
                      ? "INCLUIR TIPO DE INDICADOR: PORCENTAJE, TASA, ÍNDICE Ó PROMEDIO."
                      : null
                  }
                  onChange={(c) => {
                    setProposito({
                      ...proposito,
                      indicador: c.target.value
                        .replaceAll('"', "")
                        .replaceAll("'", "")
                        .replaceAll("\n", "")
                        .trimEnd(),
                      formula: "",
                    });
                  }}
                  value={proposito.indicador}
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
                  disabled={
                    edit &&
                    !mirEdit?.proposito.formula &&
                    proposito.formula !== ""
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
                    boxShadow: 2,
                    width: ["none", "30vh", "40vh", "50vh", "50vh"],
                  }}
                  label={"FÓRMULA"}
                  onClick={() => handleClickOpen()}
                  value={proposito.formula}
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
                    backgroundColor: "#f0f0f0",
                    width: ["33vh", "30vh", "40vh", "50vh", "50vh"],
                    boxShadow: 2,
                    fontFamily: "MontserratMedium",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <FormLabel>FRECUENCIA</FormLabel>
                  <FormControlLabel
                    value={"ANUAL"}
                    label={"ANUAL"}
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={proposito.frecuencia === "ANUAL"}
                        onChange={(c) => {
                          setProposito({
                            ...proposito,
                            frecuencia: c.target.value,
                          });
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
                  disabled={
                    edit &&
                    !mirEdit?.proposito.medios &&
                    proposito.medios_verificacion !== ""
                  }
                  rows={8}
                  multiline
                  variant="filled"
                  sx={{
                    boxShadow: 2,
                    width: ["none", "30vh", "40vh", "50vh", "50vh"],
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
                  label={"MEDIOS DE VERIFICACIÓN"}
                  onChange={(c) => {
                    setProposito({
                      ...proposito,
                      medios_verificacion: c.target.value
                        .replaceAll('"', "")
                        .replaceAll("'", "")
                        .replaceAll("\n", "")
                        .trimEnd(),
                    });
                  }}
                  value={proposito.medios_verificacion}
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
                  disabled={
                    edit &&
                    !mirEdit?.proposito.supuestos &&
                    proposito.supuestos !== ""
                  }
                  rows={8}
                  multiline
                  variant="filled"
                  sx={{
                    boxShadow: 2,
                    width: ["none", "30vh", "40vh", "50vh", "50vh"],
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
                    setProposito({
                      ...proposito,
                      supuestos: c.target.value
                        .replaceAll('"', "")
                        .replaceAll("'", "")
                        .replaceAll("\n", "")
                        .trimEnd(),
                    });
                  }}
                  value={proposito.supuestos}
                />
              </Grid>
            </Grid>
          </>
        ) : null}
      </Grid>
    </Grid>
  );
}

export default TabFinProposito;

export interface IIndicadores {
  Id: string;
  TipoDeIndicador: string;
  FechaCreacion: string;
  CreadoPor: string;
  UltimaModificacion: string;
  ModificadoPor: string;
  Deleted: number;
}

export interface IFrecuencias {
  Id: string;
  Frecuencia: string;
  FechaCreacion: string;
  CreadoPor: string;
  UltimaModificacion: string;
  ModificadoPor: string;
  Deleted: number;
}

export interface IFin {
  resumen: string;
  indicador: string;
  formula: string;
  frecuencia: string;
  medios: string;
  supuestos: string;
}
export interface IProposito {
  resumen: string;
  indicador: string;
  formula: string;
  frecuencia: string;
  medios_verificacion: string;
  supuestos: string;
}
