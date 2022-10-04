import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input,
  TextField,
  Box,
  TableContainer,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Tooltip,
  IconButton,
  Button,
  TablePagination,
  Autocomplete,
} from "@mui/material";
import axios from "axios";
import { hover } from "@testing-library/user-event/dist/hover";

export default function FullModalMir() {
  //arrays
  const [numeroComponentes, setNumeroComponentes] = React.useState([
    {
      label: "Componente No. 1",
      nombre: "C1",
      visible: true,
      nocomponente: 0,
    },
    {
      label: "Componente No. 2",
      nombre: "C2",
      visible: true,
      nocomponente: 1,
    },
    {
      label: "Componente No. 3",
      nombre: "C3",
      visible: false,
      nocomponente: 2,
    },
    {
      label: "Componente No. 4",
      nombre: "C4",
      visible: false,
      nocomponente: 3,
    },
    {
      label: "Componente No. 5",
      nombre: "C5",
      visible: false,
      nocomponente: 4,
    },
    {
      label: "Componente No. 6",
      nombre: "C6",
      visible: false,
      nocomponente: 5,
    },
  ]);

  const [fin, setFin] = React.useState([
    {
      index: 0,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 1,

      label: "Indicador",
      descripcion: "",
    },
    {
      index: 2,

      label: "Formula",
      descripcion: "",
    },
    {
      index: 3,

      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 4,

      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 5,

      label: "Supuestos",
      descripcion: "",
    },
  ]);
  const [componentes, setComponentes] = React.useState([
    {
      index: 0,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 1,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 2,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 3,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 4,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 5,
      label: "Supuestos",
      descripcion: "",
    },
  ]);

  const [actividades, setAvtividades] = React.useState([
    {
      index: 0,
      componente:0,
      actividad:0,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 1,
      componente:0,
      actividad:0,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 2,
      componente:0,
      actividad:0,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 3,
      componente:0,
      actividad:0,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 4,
      componente:0,
      actividad:0,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 5,
      componente:0,
      actividad:0,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 0 actividadd 1
    {
      index: 6,
      componente:0,
      actividad:1,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 7,
      componente:0,
      actividad:1,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 8,
      componente:0,
      actividad:1,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 9,
      componente:0,
      actividad:1,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 10,
      componente:0,
      actividad:1,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 11,
      componente:0,
      actividad:1,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 0 actividadd 2
    {
      index: 12,
      componente:0,
      actividad:2,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 13,
      componente:0,
      actividad:2,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 14,
      componente:0,
      actividad:2,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 15,
      componente:0,
      actividad:2,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 16,
      componente:0,
      actividad:2,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 17,
      componente:0,
      actividad:2,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 0 actividadd 3
    {
      index: 18,
      componente:0,
      actividad:3,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 19,
      componente:0,
      actividad:3,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 20,
      componente:0,
      actividad:3,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 21,
      componente:0,
      actividad:3,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 22,
      componente:0,
      actividad:3,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 23,
      componente:0,
      actividad:3,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 0 actividadd 4
    {
      index: 24,
      componente:0,
      actividad:4,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 25,
      componente:0,
      actividad:4,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 26,
      componente:0,
      actividad:4,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 27,
      componente:0,
      actividad:4,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 28,
      componente:0,
      actividad:4,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 29,
      componente:0,
      actividad:4,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 0 actividadd 5
    {
      index: 30,
      componente:0,
      actividad:5,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 31,
      componente:0,
      actividad:5,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 32,
      componente:0,
      actividad:5,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 33,
      componente:0,
      actividad:5,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 34,
      componente:0,
      actividad:5,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 35,
      componente:0,
      actividad:5,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 1 actividadd 0
    {
      index: 36,
      componente:1,
      actividad:0,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 37,
      componente:1,
      actividad:0,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 38,
      componente:1,
      actividad:0,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 39,
      componente:1,
      actividad:0,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 40,
      componente:1,
      actividad:0,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 41,
      componente:1,
      actividad:0,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 1 actividadd 1
    {
      index: 42,
      componente:1,
      actividad:1,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 43,
      componente:1,
      actividad:1,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 44,
      componente:1,
      actividad:1,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 45,
      componente:1,
      actividad:1,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 46,
      componente:1,
      actividad:1,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 47,
      componente:1,
      actividad:1,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 1 actividadd 2
    {
      index: 48,
      componente:1,
      actividad:2,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 49,
      componente:1,
      actividad:2,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 50,
      componente:1,
      actividad:2,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 51,
      componente:1,
      actividad:2,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 52,
      componente:1,
      actividad:2,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 53,
      componente:1,
      actividad:2,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 1 actividadd 3
    {
      index: 54,
      componente:1,
      actividad:3,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 55,
      componente:1,
      actividad:3,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 56,
      componente:1,
      actividad:3,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 57,
      componente:1,
      actividad:3,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 58,
      componente:1,
      actividad:3,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 59,
      componente:1,
      actividad:3,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 1 actividadd 4
    {
      index: 60,
      componente:1,
      actividad:4,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 61,
      componente:1,
      actividad:4,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 62,
      componente:1,
      actividad:4,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 63,
      componente:1,
      actividad:4,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 64,
      componente:1,
      actividad:4,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 65,
      componente:1,
      actividad:4,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 1 actividadd 5
    {
      index: 66,
      componente:1,
      actividad:5,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 67,
      componente:1,
      actividad:5,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 68,
      componente:1,
      actividad:5,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 69,
      componente:1,
      actividad:5,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 70,
      componente:1,
      actividad:5,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 71,
      componente:1,
      actividad:5,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 2 actividadd 0
    {
      index: 72,
      componente:2,
      actividad:0,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 73,
      componente:2,
      actividad:0,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 74,
      componente:2,
      actividad:0,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 75,
      componente:2,
      actividad:0,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 76,
      componente:2,
      actividad:0,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 77,
      componente:2,
      actividad:0,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 2 actividadd 1
    {
      index: 78,
      componente:2,
      actividad:1,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 79,
      componente:2,
      actividad:1,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 80,
      componente:2,
      actividad:1,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 81,
      componente:2,
      actividad:1,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 82,
      componente:2,
      actividad:1,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 83,
      componente:2,
      actividad:1,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 2 actividadd 2
    {
      index: 84,
      componente:2,
      actividad:2,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 85,
      componente:2,
      actividad:2,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 86,
      componente:2,
      actividad:2,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 87,
      componente:2,
      actividad:2,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 88,
      componente:2,
      actividad:2,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 89,
      componente:2,
      actividad:2,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 2 actividadd 3
    {
      index: 90,
      componente:2,
      actividad:3,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 91,
      componente:2,
      actividad:3,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 92,
      componente:2,
      actividad:3,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 93,
      componente:2,
      actividad:3,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 94,
      componente:2,
      actividad:3,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 95,
      componente:2,
      actividad:3,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 2 actividadd 4
    {
      index: 96,
      componente:2,
      actividad:4,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 97,
      componente:2,
      actividad:4,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 98,
      componente:2,
      actividad:4,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 99,
      componente:2,
      actividad:4,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 100,
      componente:2,
      actividad:4,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 101,
      componente:2,
      actividad:4,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 2 actividadd 5
    {
      index: 102,
      componente:2,
      actividad:5,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 103,
      componente:2,
      actividad:5,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 104,
      componente:2,
      actividad:5,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 105,
      componente:2,
      actividad:5,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 106,
      componente:2,
      actividad:5,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 107,
      componente:2,
      actividad:5,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 3 actividadd 0
    {
      index: 108,
      componente:3,
      actividad:0,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 109,
      componente:3,
      actividad:0,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 110,
      componente:3,
      actividad:0,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 111,
      componente:3,
      actividad:0,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 112,
      componente:3,
      actividad:0,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 113,
      componente:3,
      actividad:0,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 3 actividadd 1
    {
      index: 114,
      componente:3,
      actividad:1,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 115,
      componente:3,
      actividad:1,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 116,
      componente:3,
      actividad:1,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 117,
      componente:3,
      actividad:1,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 118,
      componente:3,
      actividad:1,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 119,
      componente:3,
      actividad:1,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 3 actividadd 2
    {
      index: 120,
      componente:3,
      actividad:2,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 121,
      componente:3,
      actividad:2,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 122,
      componente:3,
      actividad:2,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 123,
      componente:3,
      actividad:2,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 124,
      componente:3,
      actividad:2,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 125,
      componente:3,
      actividad:2,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 3 actividadd 3
    {
      index: 126,
      componente:3,
      actividad:3,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 127,
      componente:3,
      actividad:3,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 128,
      componente:3,
      actividad:3,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 129,
      componente:3,
      actividad:3,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 130,
      componente:3,
      actividad:3,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 131,
      componente:3,
      actividad:3,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 3 actividadd 4
    {
      index: 132,
      componente:3,
      actividad:4,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 133,
      componente:3,
      actividad:4,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 134,
      componente:3,
      actividad:4,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 135,
      componente:3,
      actividad:4,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 136,
      componente:3,
      actividad:4,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 137,
      componente:3,
      actividad:4,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 3 actividadd 5
    {
      index: 138,
      componente:3,
      actividad:5,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 139,
      componente:3,
      actividad:5,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 140,
      componente:3,
      actividad:5,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 141,
      componente:3,
      actividad:5,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 142,
      componente:3,
      actividad:5,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 143,
      componente:3,
      actividad:5,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 4 actividadd 0
    {
      index: 144,
      componente:4,
      actividad:0,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 145,
      componente:4,
      actividad:0,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 146,
      componente:4,
      actividad:0,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 147,
      componente:4,
      actividad:0,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 148,
      componente:4,
      actividad:0,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 149,
      componente:4,
      actividad:0,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 4 actividadd 1
    {
      index: 150,
      componente:4,
      actividad:1,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 151,
      componente:4,
      actividad:1,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 152,
      componente:4,
      actividad:1,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 153,
      componente:4,
      actividad:1,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 154,
      componente:4,
      actividad:1,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 155,
      componente:4,
      actividad:1,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 4 actividadd 2
    {
      index: 156,
      componente:4,
      actividad:2,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 157,
      componente:4,
      actividad:2,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 158,
      componente:4,
      actividad:2,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 159,
      componente:4,
      actividad:2,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 160,
      componente:4,
      actividad:2,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 161,
      componente:4,
      actividad:2,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 4 actividadd 3
    {
      index: 162,
      componente:4,
      actividad:3,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 163,
      componente:4,
      actividad:3,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 164,
      componente:4,
      actividad:3,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 165,
      componente:4,
      actividad:3,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 166,
      componente:4,
      actividad:3,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 167,
      componente:4,
      actividad:3,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 4 actividadd 4
    {
      index: 168,
      componente:4,
      actividad:4,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 169,
      componente:4,
      actividad:4,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 170,
      componente:4,
      actividad:4,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 171,
      componente:4,
      actividad:4,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 172,
      componente:4,
      actividad:4,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 173,
      componente:4,
      actividad:4,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 4 actividadd 5
    {
      index: 174,
      componente:4,
      actividad:5,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 175,
      componente:4,
      actividad:5,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 176,
      componente:4,
      actividad:5,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 177,
      componente:4,
      actividad:5,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 178,
      componente:4,
      actividad:5,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 179,
      componente:4,
      actividad:5,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 5 actividadd 0
    {
      index: 180,
      componente:5,
      actividad:0,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 187,
      componente:5,
      actividad:0,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 182,
      componente:5,
      actividad:0,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 183,
      componente:5,
      actividad:0,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 184,
      componente:5,
      actividad:0,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 185,
      componente:5,
      actividad:0,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 5 actividadd 1
    {
      index: 186,
      componente:5,
      actividad:1,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 187,
      componente:5,
      actividad:1,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 188,
      componente:5,
      actividad:1,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 189,
      componente:5,
      actividad:1,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 190,
      componente:5,
      actividad:1,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 191,
      componente:5,
      actividad:1,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 5 actividadd 2
    {
      index: 192,
      componente:5,
      actividad:2,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 193,
      componente:5,
      actividad:2,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 194,
      componente:5,
      actividad:2,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 195,
      componente:5,
      actividad:2,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 196,
      componente:5,
      actividad:2,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 197,
      componente:5,
      actividad:2,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 5 actividadd 3
    {
      index: 198,
      componente:5,
      actividad:3,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 199,
      componente:5,
      actividad:3,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 200,
      componente:5,
      actividad:3,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 201,
      componente:5,
      actividad:3,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 202,
      componente:5,
      actividad:3,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 203,
      componente:5,
      actividad:3,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 5 actividadd 4
    {
      index: 204,
      componente:5,
      actividad:4,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 205,
      componente:5,
      actividad:4,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 206,
      componente:5,
      actividad:4,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 207,
      componente:5,
      actividad:4,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 208,
      componente:5,
      actividad:4,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 209,
      componente:5,
      actividad:4,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 5 actividadd 5
    {
      index: 210,
      componente:5,
      actividad:5,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 211,
      componente:5,
      actividad:5,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 212,
      componente:5,
      actividad:5,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 213,
      componente:5,
      actividad:5,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 214,
      componente:5,
      actividad:5,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 215,
      componente:5,
      actividad:5,
      label: "Supuestos",
      descripcion: "",
    },
  ])

  const changeValor = (index: number, v: string, Tab: string) => {
    switch (Tab) {
      case 'fin':
        fin[index].descripcion = v
        break;
      case 'componentes':
        componentes[index].descripcion = v

    }


  }


  const changeValue = (index: number, v: string) => {
    if (fin[index].descripcion != "") {
      return fin[index].descripcion
    }
    else
      return null
  }


  //Componentes 
  let [componentesActivos, setComponentesActivos] = React.useState(2);

  const incrementaComponente = () => {
    console.log(componentesActivos)
    if (componentesActivos < 6) {
      setComponentesActivos((componentesActivos + 1));
      numeroComponentes[componentesActivos].visible = true;
    }
    console.log(componentesActivos)


  };

  const eliminaComponente = () => {
    console.log(componentesActivos)
    if (componentesActivos >= 2) {
      setComponentesActivos((componentesActivos - 1));
      numeroComponentes[componentesActivos].visible = false;

    }
    console.log(componentesActivos)
  };
  //________________________________
  const [value, setValue] = React.useState(10);

  const [nombreArchivo, setNombreArchivo] = useState('Arrastre o seleccione para cargar archivo');

  const [institution, setInstitution] = useState("0");
  const [programa, setPrograma] = useState("0");
  const [eje, setEje] = useState("0");

  const [catalogoInstituciones, setCatalogoInstituciones] = useState([
    { Id: "", NombreInstitucion: "" },
  ]);
  const [catalogoProgramas, setCatalogoProgramas] = useState([
    { Id: "", NombrePrograma: "" },
  ]);
  const [catalogoEjes, setCatalogoEjes] = useState([{ Id: "", Eje: "" }]);


  const getInstituciones = () => {
    axios
      .get("http://10.200.4.105:8000/api/instituciones", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setCatalogoInstituciones(r.data.data);
      });
  };
  const getProgramas = () => {
    axios
      .get("http://10.200.4.105:8000/api/programaPresupuestario", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setCatalogoProgramas(r.data.data);
      });
  };
  const getEjes = () => {
    axios
      .get("http://10.200.4.105:8000/api/ejes", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setCatalogoEjes(r.data.data);
      });
  };

  useEffect(() => {
    getInstituciones();
    getProgramas();
    getEjes();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChangeAcordion =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        width: "87%",
        height: "92%",
        mt: "8vh",
      }}
    >
      <Box
        sx={{
          width: "80vw",
          height: "86vh",
          backgroundColor: "#dedbdb",
          borderRadius: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "black" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              label="Encabezado"
              value={10}
            // sx={{ backgroundColor: "yellow", borderRadius: 50 }}
            />
            <Tab label="Fin / Propósito" value={20} />
            <Tab label="Componentes" value={30} />
            <Tab label="Actividades" value={40} />
            <Tab label="Resumen" value={50} />
          </Tabs>
        </Box>

        {value === 10 ? (
          <Box
            sx={{
              width: "75vw",
              height: "77vh",
              justifyContent: "center",
              alignItems: "center",
              justifyItems: "center",
              backgroundColor: "#fff",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",

              gridTemplateRows: "repeat(4, 1fr)",
            }}
          >
            <FormControl sx={{ gridRow: "1", width: "20vw", height: "5vh" }}>
              <InputLabel id="demo-simple-select-label">
                Ejercicio Fiscal
              </InputLabel>
              <Select
                required
                label="Ejercicio Fiscal"
                value="0"
                sx={{ width: "15vw" }}
              >
                <MenuItem value={"0"} key={0} disabled>
                  Seleccione Ejercicio Fiscal
                </MenuItem>
              </Select>
            </FormControl>

            <InputLabel
              id="file-upload"
              sx={[{
                border: "5px dotted #ccc",
                display: "inline-block",
                padding: "3vh 2vw",
                cursor: 'pointer',
              }, {
                "&:hover": {
                  color: "Blue",
                  border: "5px dotted blue",
                },
              },]}
            >
              {nombreArchivo}
              <Input
                id="file-upload"
                type="file"
                sx={{
                  position: "absolute",
                  width: "1px",
                  height: "1px",
                  padding: "0",
                  margin: "-1px",
                  border: "0"
                }}
              />
            </InputLabel>

            <FormControl sx={{ gridRow: "2", width: "20vw" }}>
              <InputLabel id="demo-simple-select-label">Institución</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={institution}
                label="Institución"
                onChange={(x) => setInstitution(x.target.value)}
                sx={{}}
              >
                <MenuItem value={"0"} key={0} disabled>
                  Institución
                </MenuItem>
                {catalogoInstituciones.map((item) => {
                  return (
                    <MenuItem value={item.Id} key={item.Id}>
                      {item.NombreInstitucion}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <FormControl sx={{ gridRow: "2", width: "20vw", height: "5vh" }}>
              <InputLabel id="demo-simple-select-label">Programa</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={programa}
                label="Programa"
                onChange={(x) => setPrograma(x.target.value)}
                sx={{}}
              >
                <MenuItem value={"0"} key={0} disabled>
                  Programa Presupuestario
                </MenuItem>
                {catalogoProgramas.map((item) => {
                  return (
                    <MenuItem value={item.Id} key={item.Id}>
                      {item.NombrePrograma}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <FormControl sx={{ gridRow: "2", width: "20vw", height: "5vh" }}>
              <InputLabel id="demo-simple-select-label">Eje</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={eje}
                label="Eje"
                onChange={(x) => setEje(x.target.value)}
                sx={{}}
              >
                <MenuItem value={"0"} key={0} disabled>
                  Eje
                </MenuItem>
                {catalogoEjes.map((item) => {
                  return (
                    <MenuItem value={item.Id} key={item.Id}>
                      {item.Eje}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <TextField
              multiline
              rows={4}
              required
              id="outlined-basic"
              label="1"
              variant="outlined"
              sx={{ gridRow: "3", width: "20vw" }}
            />
            <TextField
              multiline
              rows={4}
              required
              id="outlined-basic"
              label="1"
              variant="outlined"
              sx={{ gridRow: "3", width: "20vw" }}
            />
            <TextField
              multiline
              rows={4}
              required
              id="outlined-basic"
              label="1"
              variant="outlined"
              sx={{ gridRow: "3", width: "20vw" }}
            />
            <TextField
              multiline
              rows={4}
              required
              id="outlined-basic"
              label="1"
              variant="outlined"
              sx={{ gridRow: "4", width: "20vw" }}
            />
            <TextField
              multiline
              rows={4}
              required
              id="outlined-basic"
              label="1"
              variant="outlined"
              sx={{ gridRow: "4", width: "20vw" }}
            />
          </Box>
        ) : null}

        {value === 20 ? (
          <Box
            sx={{
              width: "75vw",
              height: "77vh",
              justifyContent: "center",
              alignItems: "center",
              justifyItems: "center",
              backgroundColor: "#fff",
            }}
          >

            {fin.map((item) => {
              return (<TextField
                multiline
                rows={4}
                required
                id={item.label}
                label={item.label}
                value={changeValue(item.index, item.descripcion)}
                onChange={(x) => changeValor(item.index, x.target.value, "fin")}
                variant="outlined"
                sx={{ width: "20vw" }}
              />);
            })}

          </Box>
        ) : null}
        {/* Componentes */}
        {value === 30 ? (
          <Box
            sx={{
              display: "flex",
              width: "75vw",
              height: "77vh",
              justifyContent: "center",
              alignItems: "center",
              justifyItems: "center",
              backgroundColor: "#fff",
            }}

          >
            <Box sx={{ display: "flex", backgroundColor: "", width: "100%", height: "100%", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>

              <Box sx={{ display: "flex", backgroundColor: "", width: "100%", height: "10%", alignItems: "center", justifyContent: "flex-end", mr: "15vw" }}>

                <IconButton onClick={() => incrementaComponente()}>
                  <AddCircleIcon fontSize="large" />

                </IconButton >


                <IconButton onClick={() => eliminaComponente()}>
                  <DoDisturbOnIcon fontSize="large" />
                </IconButton >
              </Box>
              <Box sx={{
                width: "95%",
                height: "90%",
                backgroundColor: "",
                pb: 2,
                pt: 2,
                borderRight: "solid 1px",
                overflow: "auto",
                borderRadius: ".4vw",
                borderColor: "#BCBCBC",
                "&::-webkit-scrollbar": {
                  width: ".3vw",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "rgba(0,0,0,.5)",
                  outline: "1px solid slategrey",
                  borderRadius: 10,
                },
              }}>
                {numeroComponentes.map((item) => {
                  if (item.visible) {
                    return <Box sx={{ backgroundColor: "", width: "100%", boxShadow: 4, }}>
                      <Accordion id={item.nombre} key={item.nombre} expanded={expanded === item.nombre} onChange={handleChangeAcordion(item.nombre)} sx={{ mt: "3vh" }}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                        >

                          <Typography sx={{ width: '33%', flexShrink: 0, justifyContent: "center" }}>
                            {item.label}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Box sx={{
                            display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "10px"
                          }}>
                            {componentes.map((item) => {
                              return (
                                <TextField
                                  key={item.index}
                                  multiline
                                  rows={6}
                                  id="outlined-basic"
                                  label={item.label}
                                  variant="outlined"
                                  onChange={(x) => changeValor(item.index, x.target.value, "componentes")}
                                  sx={{ width: "30%" }}
                                />
                              );
                            })}



                          </Box>
                        </AccordionDetails>
                      </Accordion>
                    </Box>;
                  }
                })}
              </Box>

            </Box>
          </Box>
        ) : null}
        {value === 40 ? (
          <Box
            sx={{
              display: "flex",
              width: "75vw",
              height: "77vh",
              justifyContent: "center",
              alignItems: "center",
              justifyItems: "center",
              backgroundColor: "#fff",
            }}

          >
            <Box sx={{ display: "flex", backgroundColor: "", width: "100%", height: "100%", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>

              <Box sx={{ display: "flex", backgroundColor: "", width: "100%", height: "10%", alignItems: "center", justifyContent: "flex-end", mr: "15vw" }}>

                <Select
                //  value={age}
                  label="Age"
                 // onChange={handleChange}
                >
                  {numeroComponentes.map((item) =>{
                    if(item.visible)
                    {
                      return(<MenuItem>{item.label}</MenuItem>);
                    }
                  })}
                  
                </Select>

                <IconButton onClick={() => incrementaComponente()}>
                  <AddCircleIcon fontSize="large" />
                </IconButton >

                <IconButton onClick={() => eliminaComponente()}>
                  <DoDisturbOnIcon fontSize="large" />
                </IconButton >

              </Box>
              <Box sx={{
                width: "95%",
                height: "90%",
                backgroundColor: "",
                pb: 2,
                pt: 2,
                borderRight: "solid 1px",
                overflow: "auto",
                borderRadius: ".4vw",
                borderColor: "#BCBCBC",
                "&::-webkit-scrollbar": {
                  width: ".3vw",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "rgba(0,0,0,.5)",
                  outline: "1px solid slategrey",
                  borderRadius: 10,
                },
              }}>
                {numeroComponentes.map((item) => {
                  if (item.visible) {
                    return <Box sx={{ backgroundColor: "", width: "100%", boxShadow: 4, }}>
                      <Accordion id={item.nombre} key={item.nombre} expanded={expanded === item.nombre} onChange={handleChangeAcordion(item.nombre)} sx={{ mt: "3vh" }}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                        >

                          <Typography sx={{ width: '33%', flexShrink: 0, justifyContent: "center" }}>
                            {item.label}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Box sx={{
                            display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "10px"
                          }}>
                            {componentes.map((item) => {
                              return (
                                <TextField
                                  key={item.index}
                                  multiline
                                  rows={6}
                                  id="outlined-basic"
                                  label={item.label}
                                  variant="outlined"
                                  onChange={(x) => changeValor(item.index, x.target.value, "componentes")}
                                  sx={{ width: "30%" }}
                                />
                              );
                            })}



                          </Box>
                        </AccordionDetails>
                      </Accordion>
                    </Box>;
                  }
                })}
              </Box>

            </Box>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}
