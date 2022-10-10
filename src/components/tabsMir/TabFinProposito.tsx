import React, { useEffect, useState } from "react";
import {
  FormControl,
  TextField,
  Box,
  Typography,
  IconButton,
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

  const [showFin, setShowFin] = useState(true);
  const [showProposito, setShowProposito] = useState(false);

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
            fontFamily: "MontserratBold",
            fontSize: "40px",
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
              setFin({...fin, resumen: c.target.value})
            }}
            value={fin.resumen}
          />
          <TextField
            rows={3}
            multiline
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
            label={"Indicador"}
            onChange={(c) => {
              // valor[0].indicador = c.target.value;
            }}
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
              console.log(c.target.value);

              // valor[0].formula = c.target.value;
            }}
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
              // valor[0].frecuencia = c.target.value;
            }}
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
              // valor[0].medios = c.target.value;
            }}
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
              // valor[0].supuestos = c.target.value;
            }}
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
            fontFamily: "MontserratBold",
            fontSize: "40px",
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
              // valor[1].resumen = c.target.value;
              // cargarArray();
            }}
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
              // valor[1].indicador = c.target.value;
              // cargarArray();
            }}
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
              console.log(c.target.value);

              // valor[1].formula = c.target.value;
              // cargarArray();
            }}
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
              // valor[1].frecuencia = c.target.value;
              // cargarArray();
            }}
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
              // valor[1].medios = c.target.value;
              // cargarArray();
            }}
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
              // valor[1].supuestos = c.target.value;
              // cargarArray();
            }}
          />
        </>
      ) : null}
    </Box>
  );
}

export default TabFinProposito;
