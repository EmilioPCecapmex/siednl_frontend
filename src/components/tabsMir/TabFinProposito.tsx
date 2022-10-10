import React, { useEffect, useState } from "react";
import {
  FormControl,
  TextField,
  Box,
  Typography,
  Alert,
  Button,
  Autocomplete,
} from "@mui/material";
import axios from "axios";
import { IComponente } from "./IComponente";

export function TabFinProposito({ show }: { show: boolean }) {
  const [componentes, setComponentes] = React.useState([1, 2]);

  const [valor, setValor] = React.useState<Array<IComponente>>([]);

  const cargarArray = () => {
    let arrayComponente = [{ componentes: valor }];
  };
  
  useEffect(() => {
    let array = componentes.map((x) => {
      return {
        resumen: "",
        indicador: "",
        frecuencia: "",
        formula: "",
        medios: "",
        supuestos: "",
      };
    });
    setValor(array);
  }, []);

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
      <Typography
        sx={{
          gridColumn: "1/4",
          fontFamily: "monsterratBold",
          fontSize: "40px",
        }}
      >
        Fin
      </Typography>
      <TextField
        label={"Resumen Narrativo"}
        onChange={(c) => {
          valor[0].resumen = c.target.value;
          cargarArray();
        }}
      />
      <TextField
        label={"Indicador"}
        onChange={(c) => {
          valor[0].indicador = c.target.value;
          cargarArray();
        }}
      />
      <TextField
        label={"Fórmula"}
        onChange={(c) => {
          // console.log(c.target.value);

          valor[0].formula = c.target.value;
          cargarArray();
        }}
      />
      <TextField
        label={"Frecuencia"}
        onChange={(c) => {
          valor[0].frecuencia = c.target.value;
          cargarArray();
        }}
      />
      <TextField
        label={"Medios de Verificación"}
        //value={componenteValor[x - 1].medios}
        onChange={(c) => {
          valor[0].medios = c.target.value;
          cargarArray();
        }}
      />
      <TextField
        label={"Supuestos"}
        onChange={(c) => {
          valor[0].supuestos = c.target.value;
          cargarArray();
        }}
      />
      <Typography
        sx={{
          gridColumn: "1/4",
          fontFamily: "monsterratBold",
          fontSize: "40px",
        }}
      >
        Propósito
      </Typography>
      <TextField
        label={"Resumen Narrativo"}
        onChange={(c) => {
          valor[1].resumen = c.target.value;
          cargarArray();
        }}
      />
      <TextField
        label={"Indicador"}
        onChange={(c) => {
          valor[1].indicador = c.target.value;
          cargarArray();
        }}
      />
      <TextField
        label={"Fórmula"}
        onChange={(c) => {
          // console.log(c.target.value);

          valor[1].formula = c.target.value;
          cargarArray();
        }}
      />
      <TextField
        label={"Frecuencia"}
        onChange={(c) => {
          valor[1].frecuencia = c.target.value;
          cargarArray();
        }}
      />
      <TextField
        label={"Medios de Verificación"}
        //value={componenteValor[x - 1].medios}
        onChange={(c) => {
          valor[1].medios = c.target.value;
          cargarArray();
        }}
      />
      <TextField
        label={"Supuestos"}
        onChange={(c) => {
          valor[1].supuestos = c.target.value;
          cargarArray();
        }}
      />
    </Box>
  );
}

export default TabFinProposito;
