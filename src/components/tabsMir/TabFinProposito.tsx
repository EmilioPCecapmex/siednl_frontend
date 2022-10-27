import { useEffect, useState } from "react";
import {
  TextField,
  Box,
  Typography,
  List,
  ListItemButton,
  Divider,
} from "@mui/material";
import axios from "axios";
import { FormulaDialog } from "../formulasDialog/FormulaDialog";

export function TabFinProposito({
  show,
  resumenFin,
  resumenProposito,
  cargaFin,
  cargaProposito,
}: {
  show: boolean;
  resumenFin: Function;
  resumenProposito: Function;
  cargaFin: Array<IFin>;
  cargaProposito: Array<IProposito>;
}) {
  const [tabFin, setTabFin] = useState([
    {
      resumen: "",
      indicador: "",
      formula: "",
      frecuencia: "",
      medios: "",
      supuestos: "",
    },
  ]);

  const [tabProposito, setTabProposito] = useState([
    {
      resumen: "",
      indicador: "",
      formula: "",
      frecuencia: "",
      medios_verificacion: "",
      supuestos: "",
    },
  ]);

  const [fin, setFin] = useState({
    resumen: "",
    indicador: "",
    formula: "",
    frecuencia: "",
    medios: "",
    supuestos: "",
  });

  const [proposito, setProposito] = useState({
    resumen: "",
    indicador: "",
    formula: "",
    frecuencia: "",
    medios_verificacion: "",
    supuestos: "",
  });

  const [showFin, setShowFin] = useState(true);
  const [showProposito, setShowProposito] = useState(false);

  const [indicador, setIndicador] = useState<Array<IIndicadores>>([]);

  const [frecuencias, setFrecuencias] = useState<Array<IFrecuencias>>([]);

  const getIndicadores = () => {
    axios
      .get("http://10.200.4.105:8000/api/tipoDeIndicador", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          setIndicador(r.data.data);
        }
      });
  };

  useEffect(() => {
    getIndicadores();
    getFrecuencias();
  }, []);

  const [errorIndicadorFin, setErrorIndicadorFin] = useState("");
  const [errorIndicadorProposito, setErrorIndicadorProposito] = useState("");

  const [errorFrecuenciaFin, setErrorFrecuenciaFin] = useState("");
  const [errorFrecuenciaProposito, setErrorFrecuenciaProposito] = useState("");

  const evalueTxtFrecuenciaFin = () => {
    let txt = fin.frecuencia?.toLowerCase();
    if (txt === "anual" || txt === "bienal") {
      setErrorFrecuenciaFin("");
    } else {
      setErrorFrecuenciaFin("Frecuencia debe ser tipo Anual ó Bienal.");
    }
  };

  const evalueTxtFrecuenciaProposito = () => {
    let txt = proposito.frecuencia?.toLowerCase();
    if (txt === "anual") {
      setErrorFrecuenciaProposito("");
    } else {
      setErrorFrecuenciaProposito("Frecuencia debe ser tipo Anual.");
    }
  };

  const evalueTxtindicador = (v: string) => {
    if (v === "fin") {
      const findicador = fin.indicador?.toLowerCase();
      if(findicador !== undefined){
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
          setFin({...fin, formula: ""})

        }
      }
 
    }

    if (v === "proposito") {
      const pindicador = proposito.indicador?.toLowerCase();
      if(pindicador !== undefined){
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
          setProposito({...proposito, formula: ""})

        }
      }

   
    }
  };

  useEffect(() => {
    
    setTabFin([
      {
        resumen: fin.resumen,
        indicador: fin.indicador,
        formula: fin.formula,
        frecuencia: fin.frecuencia,
        medios: fin.medios,
        supuestos: fin.supuestos,
      },
    ]);
    setTabProposito([
      {
        resumen: proposito.resumen,
        indicador: proposito.indicador,
        formula: proposito.formula,
        frecuencia: proposito.frecuencia,
        medios_verificacion: proposito.medios_verificacion,
        supuestos: proposito.supuestos,
      },
    ]);
  }, [fin, proposito]);

  useEffect(() => {
    setFin({
      resumen: cargaFin[0]?.resumen,
      indicador: cargaFin[0]?.indicador,
      formula: cargaFin[0]?.formula,
      frecuencia: cargaFin[0]?.frecuencia,
      medios: cargaFin[0]?.medios,
      supuestos: cargaFin[0]?.supuestos,
    });
    
    setTimeout(() => {
      setProposito({
        resumen: cargaProposito[0]?.resumen,
        indicador: cargaProposito[0]?.indicador,
        formula: cargaProposito[0]?.formula,
        frecuencia: cargaProposito[0]?.frecuencia,
        medios_verificacion: cargaProposito[0]?.medios_verificacion,
        supuestos: cargaProposito[0]?.supuestos,
      });
    }, 1000);
   

  }, [cargaFin, cargaProposito]);

  useEffect(() => {
    resumenFin(tabFin);
    resumenProposito(tabProposito);
  }, [tabFin, tabProposito]);

  const getFrecuencias = () => {
    axios
      .get("http://10.200.4.105:8000/api/frecuencias", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          setFrecuencias(r.data.data);
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
      setFin({ ...fin, formula: txt });
    }else if(elementoFormula === "Proposito"){
      setProposito({ ...proposito, formula: txt });

    }
  };


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
          justifyContent: "flex-end",
          alignItems: "center",
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
          {showFin ? "Fin" : null}
          {showProposito ? "Propósito" : null}
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
          <Box
            sx={{
              height: "10vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Divider />
            <ListItemButton
              selected={showFin}
              onClick={() => {
                setShowFin(!showFin);
                setShowProposito(false);
              }}
              sx={{
                "&.Mui-selected ": {
                  backgroundColor: "#c4a57b",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "#cbcbcb",
                },
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                Fin
              </Typography>
            </ListItemButton>

            <Divider />
          </Box>
          <Box
            sx={{
              height: "10vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <ListItemButton
              selected={showProposito}
              onClick={() => {
                setShowProposito(!showProposito);
                setShowFin(false);
              }}
              sx={{
                "&.Mui-selected ": {
                  backgroundColor: "#c4a57b",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "#cbcbcb",
                },
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                Propósito
              </Typography>
            </ListItemButton>
            <Divider />
          </Box>
        </List>

        {showFin ? (
          <>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                width: "90%",
                alignItems: "center",
                justifyItems: "center",
              }}
            >
              <TextField
                rows={4}
                multiline
                sx={{ width: "90%", boxShadow: 2 }}
                variant={"filled"}
                label={"Resumen Narrativo"}
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
                  setFin({ ...fin, resumen: c.target.value });
                }}
                value={fin.resumen}
              />
              <TextField
                rows={4}
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
                onBlur={() =>
                  fin.indicador === "" ? null : evalueTxtindicador("fin")
                }
                label={"Indicador"}
                error={errorIndicadorFin === "fin" ? true : false}
                helperText={
                  errorIndicadorFin
                    ? "Incluir tipo de indicador: Porcentaje, Tasa, Indice ó Promedio. "
                    : null
                }
                onChange={(c) => {
                  setFin({ ...fin, indicador: c.target.value });
                }}
                value={fin.indicador}
              />
              <TextField
                rows={4}
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
                label={"Fórmula"}
                onClick={() => handleClickOpen()}
                value={fin.formula}
              />

              <TextField
                rows={4}
                multiline
                variant="filled"
                sx={{ width: "90%", boxShadow: 2 }}
                label={"Frecuencia"}
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
                  setFin({ ...fin, frecuencia: c.target.value });
                }}
                value={fin.frecuencia}
                onBlur={() => evalueTxtFrecuenciaFin()}
                error={errorFrecuenciaFin !== "" ? true : false}
                helperText={errorFrecuenciaFin ? errorFrecuenciaFin : null}
              />

              <TextField
                rows={4}
                multiline
                variant="filled"
                sx={{ width: "90%", boxShadow: 2 }}
                label={"Medios de Verificación"}
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
                  setFin({ ...fin, medios: c.target.value });
                }}
                value={fin.medios}
              />
              <TextField
                rows={4}
                multiline
                variant="filled"
                sx={{ width: "90%", boxShadow: 2 }}
                label={"Supuestos"}
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
                  setFin({ ...fin, supuestos: c.target.value });
                }}
                value={fin.supuestos}
              />
            </Box>
          </>
        ) : null}

        {showProposito ? (
          <>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                width: "90%",
                alignItems: "center",
                justifyItems: "center",
              }}
            >
              <TextField
                rows={4}
                multiline
                variant="filled"
                sx={{ width: "90%", boxShadow: 2 }}
                label={"Resumen Narrativo"}
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
                  setProposito({ ...proposito, resumen: c.target.value });
                }}
                value={proposito.resumen}
              />

              <TextField
                rows={4}
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
                onBlur={() =>
                  proposito.indicador === ""
                    ? null
                    : evalueTxtindicador("proposito")
                }
                label={"Indicador"}
                error={errorIndicadorProposito === "proposito" ? true : false}
                helperText={
                  errorIndicadorProposito
                    ? "Incluir tipo de indicador: Porcentaje, Tasa, Indice ó Promedio. "
                    : null
                }
                onChange={(c) => {
                  setProposito({ ...proposito, indicador: c.target.value });
                }}
                value={proposito.indicador}
              />
              <TextField
                rows={4}
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
                label={"Fórmula"}
                onClick={() => handleClickOpen()}
                value={proposito.formula}
              />

              <TextField
                rows={4}
                multiline
                variant="filled"
                sx={{ width: "90%", boxShadow: 2 }}
                label={"Frecuencia"}
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
                  setProposito({ ...proposito, frecuencia: c.target.value });
                }}
                value={proposito.frecuencia}
                onBlur={() => evalueTxtFrecuenciaProposito()}
                error={errorFrecuenciaProposito !== "" ? true : false}
                helperText={
                  errorFrecuenciaProposito ? errorFrecuenciaProposito : null
                }
              />
              <TextField
                rows={4}
                multiline
                variant="filled"
                sx={{ width: "90%", boxShadow: 2 }}
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
                label={"Medios de Verificación"}
                onChange={(c) => {
                  setProposito({ ...proposito, medios_verificacion: c.target.value });
                }}
                value={proposito.medios_verificacion}
              />
              <TextField
                rows={4}
                multiline
                variant="filled"
                sx={{ width: "90%", boxShadow: 2 }}
                label={"Supuestos"}
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
                  setProposito({ ...proposito, supuestos: c.target.value });
                }}
                value={proposito.supuestos}
              />
            </Box>
          </>
        ) : null}
      </Box>
    </Box>
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
