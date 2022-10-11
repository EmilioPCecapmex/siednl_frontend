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

export function TabFinProposito({ show }: { show: boolean }) {
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

  const [showFin, setShowFin] = useState(false);
  const [showProposito, setShowProposito] = useState(true);


  const [indicadorSelect, setIndicadorSelect] = useState<Array<IIndicadores>>([]);
  const [indicadorTxt, setIndicadorTxt] = useState("hola")

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
        setIndicador(r.data.data)
      }
    });
};

useEffect(() => {
  getIndicadores()
},[])

const [errorIndicador, setErrorIndicador] = useState(false);
const [tipoIndicador, setTipoIndicador] = useState("");

const evalueTxtindicador = () => {
if(fin.indicador.toLowerCase().includes("porcentaje")){
  setErrorIndicador(false)
  setTipoIndicador("Porcentaje")
}else if(fin.indicador.toLowerCase().includes("tasa")) {
  setErrorIndicador(false)
  setTipoIndicador("Tasa")
  }
  else if(fin.indicador.toLowerCase().includes("indice" || "índice")) {
    setErrorIndicador(false)
    setTipoIndicador("Indice")
    }
    else if(fin.indicador.toLowerCase().includes("promedio")) {
      setErrorIndicador(false)
      setTipoIndicador("Promedio")
      }else{
        setErrorIndicador(true)
      }
} 


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
        gridTemplateRows: "repeat(2, 1fr 2fr 2fr)",
      }}
    >
      <Box
        sx={{
          width: "100%",
          gridColumn: "1/4",
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
        <IconButton onClick={() => setShowFin(!showFin)}>
          {showFin ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </IconButton>
      </Box>

      {showFin ? (
        <>
          <TextField
            rows={3}
            multiline
            sx={{ width: "90%" }}
            variant="filled"
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
            rows={3}
            multiline
            error={errorIndicador}
            helperText={errorIndicador? "Incluir tipo de indicador en descripción: Porcentaje, Índice, Tasa de Variación ó Promedio." : null}
            sx={{ width: "90%" }}
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
            onBlur={() => evalueTxtindicador()}
            label={"Indicador"}
            onChange={(c) => {
              setFin({ ...fin, indicador: c.target.value });
            }}
            value={fin.indicador}
          />
          <TextField
            rows={3}
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
            sx={{ width: "90%" }}
            label={"Fórmula"}
            onChange={(c) => {
              setFin({ ...fin, formula: c.target.value });
            }}
            value={fin.formula}
          />
          <TextField
            rows={3}
            multiline
            variant="filled"
            sx={{ width: "90%" }}
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
            rows={3}
            multiline
            variant="filled"
            sx={{ width: "90%" }}
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
            rows={3}
            multiline
            variant="filled"
            sx={{ width: "90%" }}
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
          Propósito
        </Typography>
        <IconButton onClick={() => setShowProposito(!showProposito)}>
          {showProposito ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </IconButton>
      </Box>
      {showProposito ? (
        <>
          <TextField
            rows={3}
            multiline
            variant="filled"
            sx={{ width: "90%" }}
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
            rows={3}
            multiline
            variant="filled"
            sx={{ width: "90%" }}
            label={"Indicador"}
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
              setProposito({...proposito, indicador: c.target.value})
            }}
            value={proposito.indicador}
          />

          <TextField
            rows={3}
            multiline
            variant="filled"
            sx={{ width: "90%" }}
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
            value={proposito.formula}
          />
          <TextField
            rows={3}
            multiline
            variant="filled"
            sx={{ width: "90%" }}
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
            rows={3}
            multiline
            variant="filled"
            sx={{ width: "90%" }}
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
            rows={3}
            multiline
            variant="filled"
            sx={{ width: "90%" }}
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
  Id:                 string;
  TipoDeIndicador:    string;
  FechaCreacion:      string;
  CreadoPor:          string;
  UltimaModificacion: string;
  ModificadoPor:      string;
  Deleted:            number;
}
