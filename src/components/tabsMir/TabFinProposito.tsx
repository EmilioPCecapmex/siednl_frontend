import React, { useEffect, useState } from "react";
import {
  FormControl,
  TextField,
  Box,
  Typography,
  IconButton,
  Autocomplete,
} from "@mui/material";
import axios from "axios";
import { IComponente } from "./IComponente";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

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
  medios: string;
  supuestos: string;
}

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
      medios: "",
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
    medios: "",
    supuestos: "",
  });

  const [showFin, setShowFin] = useState(true);
  const [showProposito, setShowProposito] = useState(false);

  const [indicadorSelect, setIndicadorSelect] = useState<Array<IIndicadores>>(
    []
  );
  const [indicadorTxt, setIndicadorTxt] = useState("hola");

  const [indicador, setIndicador] = useState<Array<IIndicadores>>([]);

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
  }, []);

  const [errorIndicador, setErrorIndicador] = useState("");

  const evalueTxtindicador = (v: string) => {
    const findicador = fin.indicador.toLowerCase();
    const pindicador = proposito.indicador.toLowerCase();

    if (
      findicador.includes("porcentaje") ||
      findicador.includes("tasa") ||
      findicador.includes("indice" || "índice") ||
      findicador.includes("promedio")
    ) {
      setErrorIndicador("");
    } else if (
      pindicador.includes("porcentaje") ||
      pindicador.includes("tasa") ||
      pindicador.includes("indice" || "índice") ||
      pindicador.includes("promedio")
    ) {
      setErrorIndicador("");
    } else {
      setErrorIndicador(v);
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
        medios: proposito.medios,
        supuestos: proposito.supuestos,
      },
    ]);
  }, [fin, proposito]);

  useEffect(() => {
    setFin(
      {
        resumen: cargaFin[0]?.resumen,
        indicador: cargaFin[0]?.indicador,
        formula: cargaFin[0]?.formula,
        frecuencia: cargaFin[0]?.frecuencia,
        medios: cargaFin[0]?.medios,
        supuestos: cargaFin[0]?.supuestos,
      },
    );
    setProposito(
      {
        resumen: cargaProposito[0]?.resumen,
        indicador: cargaProposito[0]?.indicador,
        formula: cargaProposito[0]?.formula,
        frecuencia: cargaProposito[0]?.frecuencia,
        medios: cargaProposito[0]?.medios,
        supuestos: cargaProposito[0]?.supuestos,
      },
    );
  }, [cargaFin, cargaProposito]);

  useEffect(() => {
    resumenFin(tabFin);
    resumenProposito(tabProposito);
  }, [tabFin, tabProposito]);

  return (
    <Box
      visibility={show ? "visible" : "hidden"}
      position="absolute"
      sx={{
        width: "75vw",
        height: "77vh",
        justifyContent: "center",
        alignItems: "center",
        justifyItems: "center",
        backgroundColor: "#fff",
        boxShadow: 20,
        borderRadius: 5,
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: showFin
          ? "1fr 1fr 1fr 2fr"
          : showProposito
          ? "1fr 1fr 1fr 2fr"
          : "repeat(2, 1fr 2fr)",
      }}
    >
      <Box
        sx={{
          width: "100%",
          gridColumn: "1/4",
          gridRow: showFin ? "1" : showProposito ? "1" : "2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            width: "90%",
            fontFamily: "MontserratSemiBold",
            fontSize: "2vw",
            borderBottom: 1,
            textAlign: "left",
            borderColor: "#3c3f42",
          }}
        >
          Fin
        </Typography>
        <IconButton
          onClick={() => {
            setShowFin(!showFin);
            setShowProposito(false);
          }}
        >
          {showFin ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </IconButton>
      </Box>

      {showFin ? (
        <>
          <TextField
            rows={4}
            multiline
            sx={{ width: "90%", boxShadow: 4 }}
            variant={"filled"}
            label={"Resumen Narrativo"}
            InputLabelProps={{
              style: {
                fontFamily: "MontserratSemiBold",
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
            sx={{ width: "90%", boxShadow: 4 }}
            variant="filled"
            InputLabelProps={{
              style: {
                fontFamily: "MontserratSemiBold",
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
            error={errorIndicador === "fin" ? true : false}
            helperText={
              errorIndicador
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
                fontFamily: "MontserratSemiBold",
              },
            }}
            InputProps={{
              style: {
                fontFamily: "MontserratRegular",
              },
            }}
            sx={{ width: "90%", boxShadow: 4 }}
            label={"Fórmula"}
            onChange={(c) => {
              setFin({ ...fin, formula: c.target.value });
            }}
            value={fin.formula}
          />
          <TextField
            rows={4}
            multiline
            variant="filled"
            sx={{ width: "90%", boxShadow: 4 }}
            label={"Frecuencia"}
            InputLabelProps={{
              style: {
                fontFamily: "MontserratSemiBold",
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
          />
          <TextField
            rows={4}
            multiline
            variant="filled"
            sx={{ width: "90%", boxShadow: 4 }}
            label={"Medios de Verificación"}
            InputLabelProps={{
              style: {
                fontFamily: "MontserratSemiBold",
              },
            }}
            InputProps={{
              style: {
                fontFamily: "MontserratRegular",
              },
            }}
            //value={componenteValor[x - 1].medios}
            onChange={(c) => {
              setFin({ ...fin, medios: c.target.value });
            }}
            value={fin.medios}
          />
          <TextField
            rows={4}
            multiline
            variant="filled"
            sx={{ width: "90%", boxShadow: 4 }}
            label={"Supuestos"}
            InputLabelProps={{
              style: {
                fontFamily: "MontserratSemiBold",
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
        </>
      ) : null}

      <Box
        sx={{
          width: "100%",
          gridColumn: "1/4",
          gridRow: showProposito ? "2" : showFin ? "4" : "3",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            width: "90%",
            fontFamily: "MontserratSemiBold",
            fontSize: "2vw",
            borderBottom: 1,
            textAlign: "left",
            borderColor: "#3c3f42",
            cursor: "pointer",
            ":hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
          onClick={() => {
            setShowProposito(!showProposito);
            setShowFin(false);
          }}
        >
          Propósito
        </Typography>
        <IconButton
          onClick={() => {
            setShowProposito(!showProposito);
            setErrorIndicador("");
            setShowFin(false);
          }}
        >
          {showProposito ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </IconButton>
      </Box>
      {showProposito ? (
        <>
          <TextField
            rows={4}
            multiline
            variant="filled"
            sx={{ width: "90%", boxShadow: 4 }}
            label={"Resumen Narrativo"}
            InputLabelProps={{
              style: {
                fontFamily: "MontserratSemiBold",
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
            sx={{ width: "90%", boxShadow: 4 }}
            variant="filled"
            InputLabelProps={{
              style: {
                fontFamily: "MontserratSemiBold",
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
            error={errorIndicador === "proposito" ? true : false}
            helperText={
              errorIndicador
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
            sx={{ width: "90%", boxShadow: 4 }}
            label={"Fórmula"}
            InputLabelProps={{
              style: {
                fontFamily: "MontserratSemiBold",
              },
            }}
            InputProps={{
              style: {
                fontFamily: "MontserratRegular",
              },
            }}
            onChange={(c) => {
              setProposito({ ...proposito, formula: c.target.value });
            }}
            value={
              proposito.indicador.split(" ")[0] === "Porcentaje"
                ? `(${proposito.indicador.split(" ")[2]} / ${
                    proposito.indicador.split(" ")[4]
                  } )*100`
                : proposito.formula
            }
          />

          <TextField
            rows={4}
            multiline
            variant="filled"
            sx={{ width: "90%", boxShadow: 4 }}
            label={"Frecuencia"}
            InputLabelProps={{
              style: {
                fontFamily: "MontserratSemiBold",
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
          />
          <TextField
            rows={4}
            multiline
            variant="filled"
            sx={{ width: "90%", boxShadow: 4 }}
            InputLabelProps={{
              style: {
                fontFamily: "MontserratSemiBold",
              },
            }}
            InputProps={{
              style: {
                fontFamily: "MontserratRegular",
              },
            }}
            label={"Medios de Verificación"}
            onChange={(c) => {
              setProposito({ ...proposito, medios: c.target.value });
            }}
            value={proposito.medios}
          />
          <TextField
            rows={4}
            multiline
            variant="filled"
            sx={{ width: "90%", boxShadow: 4 }}
            label={"Supuestos"}
            InputLabelProps={{
              style: {
                fontFamily: "MontserratSemiBold",
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
        </>
      ) : null}
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
