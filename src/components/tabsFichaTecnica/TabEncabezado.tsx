import React, { useEffect, useRef, useState } from "react";
import {
  FormControl,
  TextField,
  Box,
  Typography,
  Alert,
  Button,
} from "@mui/material";

export function TabEncabezado({
  show,
  resumenEncabezado,
  cargaFin,
  cargaProposito,
  fichaTecnica,
  asignarComponente,
  asignarComponenteValor,
  componenteActividad,
  actividadesFichaTecnica,
  anioFiscalEdit,
  fichaTecnicaEdit,
}: {
  show: boolean;
  resumenEncabezado: Function;
  cargaFin: Function;
  cargaProposito: Function;
  fichaTecnica: string;
  asignarComponente: Function;
  asignarComponenteValor: Function;
  componenteActividad: Function;
  actividadesFichaTecnica: Function;
  anioFiscalEdit: string;
  fichaTecnicaEdit: any;
}) {
  //PROGRAMA SECTORIAL, ESPECIAL O REGIONAL
    //OBJETIVO SECTORIAL, ESPECIAL O REGIONAL
    //OBJETIVO ODS
    //META ODS
  return (
    <Box
      visibility={show ? "visible" : "hidden"}
      position="absolute"
      sx={{
        width: "75vw",
        height: "75vh",
        justifyContent: "center",
        alignItems: "center",
        justifyItems: "center",
        backgroundColor: "#fff",
        boxShadow: 20,
        borderRadius: 5,
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "1fr 1fr 1fr 2fr",
      }}
    >
      <Box
        sx={{
          width: "5vw",
          height: "3vh",
          position: "absolute",
          top: "1vh",
          right: "1vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        
          <Typography sx={{ fontFamily: "MontserratMedium", color: "#616161" }}>
            Plantilla
          </Typography>
        
      </Box>
    </Box>
  );
}
