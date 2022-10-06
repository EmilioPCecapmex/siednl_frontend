import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
<<<<<<< HEAD
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
=======

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
>>>>>>> dev_emilio
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input,
  TextField,
  Box,
  Autocomplete,
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
  SelectChangeEvent,
} from "@mui/material";
import axios from "axios";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

export default function FullModalMir() {
<<<<<<< HEAD
  //arrays
=======
>>>>>>> dev_emilio
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
<<<<<<< HEAD

  const [numeroActividades, setNumeroActividades] = React.useState([
    {
      index: 0,
      label: "Actividad No. 1",
      nombre: "C1",
      visible: true,
      Componente: 0,
      Actividad: 0,
    },
    {
      index: 1,
      label: "Actividad No. 2",
      nombre: "C2",
      visible: true,
      Componente: 0,
      Actividad: 1,
    },
    {
      index: 2,
      label: "Actividad No. 3",
      nombre: "C3",
      visible: false,
      Componente: 0,
      Actividad: 2,
    },
    {
      index: 3,
      label: "Actividad No. 4",
      nombre: "C4",
      visible: false,
      Componente: 0,
      Actividad: 3,
    },
    {
      index: 4,
      label: "Actividad No. 5",
      nombre: "C5",
      visible: false,
      Componente: 0,
      Actividad: 4,
    },
    {
      index: 5,
      label: "Actividad No. 6",
      nombre: "C6",
      visible: false,
      Componente: 0,
      Actividad: 5,
    },

    {
      index: 6,
      label: "Actividad No. 1",
      nombre: "C1",
      visible: true,
      Componente: 1,
      Actividad: 0,
    },
    {
      index: 7,
      label: "Actividad No. 2",
      nombre: "C2",
      visible: true,
      Componente: 1,
      Actividad: 1,
    },
    {
      index: 8,
      label: "Actividad No. 3",
      nombre: "C3",
      visible: false,
      Componente: 1,
      Actividad: 2,
    },
    {
      index: 9,
      label: "Actividad No. 4",
      nombre: "C4",
      visible: false,
      Componente: 1,
      Actividad: 3,
    },
    {
      index: 10,
      label: "Actividad No. 5",
      nombre: "C5",
      visible: false,
      Componente: 1,
      Actividad: 4,
    },
    {
      index: 11,
      label: "Actividad No. 6",
      nombre: "C6",
      visible: false,
      Componente: 1,
      Actividad: 5,
    },

    {
      index: 12,
      label: "Actividad No. 1",
      nombre: "C1",
      visible: true,
      Componente: 2,
      Actividad: 0,
    },
    {
      index: 13,
      label: "Actividad No. 2",
      nombre: "C2",
      visible: true,
      Componente: 2,
      Actividad: 1,
    },
    {
      index: 14,
      label: "Actividad No. 3",
      nombre: "C3",
      visible: false,
      Componente: 2,
      Actividad: 2,
    },
    {
      index: 15,
      label: "Actividad No. 4",
      nombre: "C4",
      visible: false,
      Componente: 2,
      Actividad: 3,
    },
    {
      index: 16,
      label: "Actividad No. 5",
      nombre: "C5",
      visible: false,
      Componente: 2,
      Actividad: 4,
    },
    {
      index: 17,
      label: "Actividad No. 6",
      nombre: "C6",
      visible: false,
      Componente: 2,
      Actividad: 5,
    },

    {
      index: 18,
      label: "Actividad No. 1",
      nombre: "C1",
      visible: true,
      Componente: 3,
      Actividad: 0,
    },
    {
      index: 19,
      label: "Actividad No. 2",
      nombre: "C2",
      visible: true,
      Componente: 3,
      Actividad: 1,
    },
    {
      index: 20,
      label: "Actividad No. 3",
      nombre: "C3",
      visible: false,
      Componente: 3,
      Actividad: 2,
    },
    {
      index: 21,
      label: "Actividad No. 4",
      nombre: "C4",
      visible: false,
      Componente: 3,
      Actividad: 3,
    },
    {
      index: 22,
      label: "Actividad No. 5",
      nombre: "C5",
      visible: false,
      Componente: 3,
      Actividad: 4,
    },
    {
      index: 23,
      label: "Actividad No. 6",
      nombre: "C6",
      visible: false,
      Componente: 3,
      Actividad: 5,
    },


    {
      index: 24,
      label: "Actividad No. 1",
      nombre: "C1",
      visible: true,
      Componente: 4,
      Actividad: 0,
    },
    {
      index: 25,
      label: "Actividad No. 2",
      nombre: "C2",
      visible: true,
      Componente: 4,
      Actividad: 1,
    },
    {
      index: 26,
      label: "Actividad No. 3",
      nombre: "C3",
      visible: false,
      Componente: 4,
      Actividad: 2,
    },
    {
      index: 27,
      label: "Actividad No. 4",
      nombre: "C4",
      visible: false,
      Componente: 4,
      Actividad: 3,
    },
    {
      index: 28,
      label: "Actividad No. 5",
      nombre: "C5",
      visible: false,
      Componente: 4,
      Actividad: 4,
    },
    {
      index: 29,
      label: "Actividad No. 6",
      nombre: "C6",
      visible: false,
      Componente: 4,
      Actividad: 5,
    },

    {
      index: 30,
      label: "Actividad No. 1",
      nombre: "C1",
      visible: true,
      Componente: 5,
      Actividad: 0,
    },
    {
      index: 31,
      label: "Actividad No. 2",
      nombre: "C2",
      visible: true,
      Componente: 5,
      Actividad: 1,
    },
    {
      index: 32,
      label: "Actividad No. 3",
      nombre: "C3",
      visible: false,
      Componente: 5,
      Actividad: 2,
    },
    {
      index: 33,
      label: "Actividad No. 4",
      nombre: "C4",
      visible: false,
      Componente: 5,
      Actividad: 3,
    },
    {
      index: 34,
      label: "Actividad No. 5",
      nombre: "C5",
      visible: false,
      Componente: 5,
      Actividad: 4,
    },
    {
      index: 35,
      label: "Actividad No. 6",
      nombre: "C6",
      visible: false,
      Componente: 5,
      Actividad: 5,
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
      componente: 0,
      actividad: 0,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 1,
      componente: 0,
      actividad: 0,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 2,
      componente: 0,
      actividad: 0,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 3,
      componente: 0,
      actividad: 0,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 4,
      componente: 0,
      actividad: 0,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 5,
      componente: 0,
      actividad: 0,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 0 actividadd 1
    {
      index: 6,
      componente: 0,
      actividad: 1,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 7,
      componente: 0,
      actividad: 1,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 8,
      componente: 0,
      actividad: 1,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 9,
      componente: 0,
      actividad: 1,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 10,
      componente: 0,
      actividad: 1,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 11,
      componente: 0,
      actividad: 1,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 0 actividadd 2
    {
      index: 12,
      componente: 0,
      actividad: 2,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 13,
      componente: 0,
      actividad: 2,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 14,
      componente: 0,
      actividad: 2,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 15,
      componente: 0,
      actividad: 2,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 16,
      componente: 0,
      actividad: 2,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 17,
      componente: 0,
      actividad: 2,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 0 actividadd 3
    {
      index: 18,
      componente: 0,
      actividad: 3,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 19,
      componente: 0,
      actividad: 3,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 20,
      componente: 0,
      actividad: 3,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 21,
      componente: 0,
      actividad: 3,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 22,
      componente: 0,
      actividad: 3,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 23,
      componente: 0,
      actividad: 3,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 0 actividadd 4
    {
      index: 24,
      componente: 0,
      actividad: 4,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 25,
      componente: 0,
      actividad: 4,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 26,
      componente: 0,
      actividad: 4,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 27,
      componente: 0,
      actividad: 4,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 28,
      componente: 0,
      actividad: 4,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 29,
      componente: 0,
      actividad: 4,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 0 actividadd 5
    {
      index: 30,
      componente: 0,
      actividad: 5,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 31,
      componente: 0,
      actividad: 5,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 32,
      componente: 0,
      actividad: 5,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 33,
      componente: 0,
      actividad: 5,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 34,
      componente: 0,
      actividad: 5,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 35,
      componente: 0,
      actividad: 5,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 1 actividadd 0
    {
      index: 36,
      componente: 1,
      actividad: 0,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 37,
      componente: 1,
      actividad: 0,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 38,
      componente: 1,
      actividad: 0,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 39,
      componente: 1,
      actividad: 0,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 40,
      componente: 1,
      actividad: 0,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 41,
      componente: 1,
      actividad: 0,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 1 actividadd 1
    {
      index: 42,
      componente: 1,
      actividad: 1,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 43,
      componente: 1,
      actividad: 1,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 44,
      componente: 1,
      actividad: 1,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 45,
      componente: 1,
      actividad: 1,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 46,
      componente: 1,
      actividad: 1,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 47,
      componente: 1,
      actividad: 1,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 1 actividadd 2
    {
      index: 48,
      componente: 1,
      actividad: 2,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 49,
      componente: 1,
      actividad: 2,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 50,
      componente: 1,
      actividad: 2,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 51,
      componente: 1,
      actividad: 2,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 52,
      componente: 1,
      actividad: 2,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 53,
      componente: 1,
      actividad: 2,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 1 actividadd 3
    {
      index: 54,
      componente: 1,
      actividad: 3,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 55,
      componente: 1,
      actividad: 3,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 56,
      componente: 1,
      actividad: 3,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 57,
      componente: 1,
      actividad: 3,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 58,
      componente: 1,
      actividad: 3,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 59,
      componente: 1,
      actividad: 3,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 1 actividadd 4
    {
      index: 60,
      componente: 1,
      actividad: 4,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 61,
      componente: 1,
      actividad: 4,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 62,
      componente: 1,
      actividad: 4,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 63,
      componente: 1,
      actividad: 4,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 64,
      componente: 1,
      actividad: 4,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 65,
      componente: 1,
      actividad: 4,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 1 actividadd 5
    {
      index: 66,
      componente: 1,
      actividad: 5,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 67,
      componente: 1,
      actividad: 5,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 68,
      componente: 1,
      actividad: 5,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 69,
      componente: 1,
      actividad: 5,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 70,
      componente: 1,
      actividad: 5,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 71,
      componente: 1,
      actividad: 5,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 2 actividadd 0
    {
      index: 72,
      componente: 2,
      actividad: 0,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 73,
      componente: 2,
      actividad: 0,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 74,
      componente: 2,
      actividad: 0,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 75,
      componente: 2,
      actividad: 0,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 76,
      componente: 2,
      actividad: 0,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 77,
      componente: 2,
      actividad: 0,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 2 actividadd 1
    {
      index: 78,
      componente: 2,
      actividad: 1,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 79,
      componente: 2,
      actividad: 1,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 80,
      componente: 2,
      actividad: 1,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 81,
      componente: 2,
      actividad: 1,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 82,
      componente: 2,
      actividad: 1,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 83,
      componente: 2,
      actividad: 1,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 2 actividadd 2
    {
      index: 84,
      componente: 2,
      actividad: 2,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 85,
      componente: 2,
      actividad: 2,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 86,
      componente: 2,
      actividad: 2,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 87,
      componente: 2,
      actividad: 2,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 88,
      componente: 2,
      actividad: 2,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 89,
      componente: 2,
      actividad: 2,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 2 actividadd 3
    {
      index: 90,
      componente: 2,
      actividad: 3,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 91,
      componente: 2,
      actividad: 3,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 92,
      componente: 2,
      actividad: 3,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 93,
      componente: 2,
      actividad: 3,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 94,
      componente: 2,
      actividad: 3,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 95,
      componente: 2,
      actividad: 3,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 2 actividadd 4
    {
      index: 96,
      componente: 2,
      actividad: 4,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 97,
      componente: 2,
      actividad: 4,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 98,
      componente: 2,
      actividad: 4,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 99,
      componente: 2,
      actividad: 4,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 100,
      componente: 2,
      actividad: 4,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 101,
      componente: 2,
      actividad: 4,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 2 actividadd 5
    {
      index: 102,
      componente: 2,
      actividad: 5,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 103,
      componente: 2,
      actividad: 5,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 104,
      componente: 2,
      actividad: 5,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 105,
      componente: 2,
      actividad: 5,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 106,
      componente: 2,
      actividad: 5,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 107,
      componente: 2,
      actividad: 5,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 3 actividadd 0
    {
      index: 108,
      componente: 3,
      actividad: 0,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 109,
      componente: 3,
      actividad: 0,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 110,
      componente: 3,
      actividad: 0,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 111,
      componente: 3,
      actividad: 0,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 112,
      componente: 3,
      actividad: 0,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 113,
      componente: 3,
      actividad: 0,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 3 actividadd 1
    {
      index: 114,
      componente: 3,
      actividad: 1,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 115,
      componente: 3,
      actividad: 1,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 116,
      componente: 3,
      actividad: 1,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 117,
      componente: 3,
      actividad: 1,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 118,
      componente: 3,
      actividad: 1,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 119,
      componente: 3,
      actividad: 1,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 3 actividadd 2
    {
      index: 120,
      componente: 3,
      actividad: 2,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 121,
      componente: 3,
      actividad: 2,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 122,
      componente: 3,
      actividad: 2,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 123,
      componente: 3,
      actividad: 2,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 124,
      componente: 3,
      actividad: 2,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 125,
      componente: 3,
      actividad: 2,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 3 actividadd 3
    {
      index: 126,
      componente: 3,
      actividad: 3,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 127,
      componente: 3,
      actividad: 3,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 128,
      componente: 3,
      actividad: 3,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 129,
      componente: 3,
      actividad: 3,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 130,
      componente: 3,
      actividad: 3,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 131,
      componente: 3,
      actividad: 3,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 3 actividadd 4
    {
      index: 132,
      componente: 3,
      actividad: 4,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 133,
      componente: 3,
      actividad: 4,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 134,
      componente: 3,
      actividad: 4,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 135,
      componente: 3,
      actividad: 4,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 136,
      componente: 3,
      actividad: 4,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 137,
      componente: 3,
      actividad: 4,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 3 actividadd 5
    {
      index: 138,
      componente: 3,
      actividad: 5,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 139,
      componente: 3,
      actividad: 5,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 140,
      componente: 3,
      actividad: 5,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 141,
      componente: 3,
      actividad: 5,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 142,
      componente: 3,
      actividad: 5,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 143,
      componente: 3,
      actividad: 5,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 4 actividadd 0
    {
      index: 144,
      componente: 4,
      actividad: 0,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 145,
      componente: 4,
      actividad: 0,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 146,
      componente: 4,
      actividad: 0,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 147,
      componente: 4,
      actividad: 0,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 148,
      componente: 4,
      actividad: 0,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 149,
      componente: 4,
      actividad: 0,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 4 actividadd 1
    {
      index: 150,
      componente: 4,
      actividad: 1,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 151,
      componente: 4,
      actividad: 1,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 152,
      componente: 4,
      actividad: 1,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 153,
      componente: 4,
      actividad: 1,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 154,
      componente: 4,
      actividad: 1,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 155,
      componente: 4,
      actividad: 1,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 4 actividadd 2
    {
      index: 156,
      componente: 4,
      actividad: 2,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 157,
      componente: 4,
      actividad: 2,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 158,
      componente: 4,
      actividad: 2,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 159,
      componente: 4,
      actividad: 2,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 160,
      componente: 4,
      actividad: 2,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 161,
      componente: 4,
      actividad: 2,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 4 actividadd 3
    {
      index: 162,
      componente: 4,
      actividad: 3,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 163,
      componente: 4,
      actividad: 3,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 164,
      componente: 4,
      actividad: 3,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 165,
      componente: 4,
      actividad: 3,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 166,
      componente: 4,
      actividad: 3,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 167,
      componente: 4,
      actividad: 3,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 4 actividadd 4
    {
      index: 168,
      componente: 4,
      actividad: 4,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 169,
      componente: 4,
      actividad: 4,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 170,
      componente: 4,
      actividad: 4,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 171,
      componente: 4,
      actividad: 4,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 172,
      componente: 4,
      actividad: 4,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 173,
      componente: 4,
      actividad: 4,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 4 actividadd 5
    {
      index: 174,
      componente: 4,
      actividad: 5,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 175,
      componente: 4,
      actividad: 5,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 176,
      componente: 4,
      actividad: 5,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 177,
      componente: 4,
      actividad: 5,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 178,
      componente: 4,
      actividad: 5,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 179,
      componente: 4,
      actividad: 5,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 5 actividadd 0
    {
      index: 180,
      componente: 5,
      actividad: 0,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 187,
      componente: 5,
      actividad: 0,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 182,
      componente: 5,
      actividad: 0,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 183,
      componente: 5,
      actividad: 0,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 184,
      componente: 5,
      actividad: 0,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 185,
      componente: 5,
      actividad: 0,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 5 actividadd 1
    {
      index: 186,
      componente: 5,
      actividad: 1,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 187,
      componente: 5,
      actividad: 1,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 188,
      componente: 5,
      actividad: 1,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 189,
      componente: 5,
      actividad: 1,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 190,
      componente: 5,
      actividad: 1,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 191,
      componente: 5,
      actividad: 1,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 5 actividadd 2
    {
      index: 192,
      componente: 5,
      actividad: 2,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 193,
      componente: 5,
      actividad: 2,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 194,
      componente: 5,
      actividad: 2,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 195,
      componente: 5,
      actividad: 2,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 196,
      componente: 5,
      actividad: 2,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 197,
      componente: 5,
      actividad: 2,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 5 actividadd 3
    {
      index: 198,
      componente: 5,
      actividad: 3,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 199,
      componente: 5,
      actividad: 3,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 200,
      componente: 5,
      actividad: 3,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 201,
      componente: 5,
      actividad: 3,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 202,
      componente: 5,
      actividad: 3,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 203,
      componente: 5,
      actividad: 3,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 5 actividadd 4
    {
      index: 204,
      componente: 5,
      actividad: 4,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 205,
      componente: 5,
      actividad: 4,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 206,
      componente: 5,
      actividad: 4,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 207,
      componente: 5,
      actividad: 4,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 208,
      componente: 5,
      actividad: 4,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 209,
      componente: 5,
      actividad: 4,
      label: "Supuestos",
      descripcion: "",
    },
    //Componente 5 actividadd 5
    {
      index: 210,
      componente: 5,
      actividad: 5,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 211,
      componente: 5,
      actividad: 5,
      label: "Indicador",
      descripcion: "",
    },
    {
      index: 212,
      componente: 5,
      actividad: 5,
      label: "Formula",
      descripcion: "",
    },
    {
      index: 213,
      componente: 5,
      actividad: 5,
      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 214,
      componente: 5,
      actividad: 5,
      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 215,
      componente: 5,
      actividad: 5,
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


  const [componenteSeleccionado, setComponenteSeleccionado] = React.useState(0);
  console.log(componenteSeleccionado);
  // const handleChangeComponenteSeleccionado = (event: SelectChangeEvent) => {
  //   setComponenteSeleccionado(event.target.value as unknown as number);
  // };

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
    if (componentesActivos < 6) {
      setComponentesActivos((componentesActivos + 1));
      numeroComponentes[componentesActivos].visible = true;
=======
  //Componentes
  var [componentesActivos, setComponentesActivos] = React.useState(2);

  const incrementaComponente = () => {
    if (componentesActivos < 6) {
      console.log(componentesActivos);
      setComponentesActivos(componentesActivos++);
      numeroComponentes[componentesActivos].visible = true;
      console.log("+1: " + componentesActivos);
>>>>>>> dev_emilio
    }
  };

  const eliminaComponente = () => {
<<<<<<< HEAD
    console.log(componentesActivos)
    if (componentesActivos >= 2) {
      setComponentesActivos((componentesActivos - 1));
      numeroComponentes[componentesActivos].visible = false;
    }
  };


  let [actividadesActivasC0, setActividadesActivasC0] = React.useState(2);
  let [actividadesActivasC1, setActividadesActivasC1] = React.useState(8);
  let [actividadesActivasC2, setActividadesActivasC2] = React.useState(14);
  let [actividadesActivasC3, setActividadesActivasC3] = React.useState(20);
  let [actividadesActivasC4, setActividadesActivasC4] = React.useState(26);
  let [actividadesActivasC5, setActividadesActivasC5] = React.useState(32);

  const incrementaActividades = () => {
    switch (componenteSeleccionado) {
      case 0:
        // setActividadesActivas()
        if (actividadesActivasC0 < 6) {
          setActividadesActivasC0((actividadesActivasC0 + 1));
          numeroActividades[actividadesActivasC0].visible = true;
        }
        break;

      case 1:
        if (actividadesActivasC1 < 12) {
          setActividadesActivasC1((actividadesActivasC1 + 1));
          numeroActividades[actividadesActivasC1].visible = true;
        }
        break;

      case 2:
        if (actividadesActivasC2 < 18) {
          setActividadesActivasC2((actividadesActivasC2 + 1));
          numeroActividades[actividadesActivasC2].visible = true;
        }
        break;

      case 3:
        if (actividadesActivasC3 < 24) {
          setActividadesActivasC3((actividadesActivasC3 + 1));
          numeroActividades[actividadesActivasC3].visible = true;
        }
        break;

      case 4:
        if (actividadesActivasC4 < 30) {
          setActividadesActivasC4((actividadesActivasC4 + 1));
          numeroActividades[actividadesActivasC4].visible = true;
        }
        break;

      case 5:
        if (actividadesActivasC5 < 36) {
          setActividadesActivasC5((actividadesActivasC5 + 1));
          numeroActividades[actividadesActivasC5].visible = true;
        }
        break;

    }
  };

  const eliminaActividades = () => {
    switch (componenteSeleccionado) {
      case 0:
        if (actividadesActivasC0 >= 2) {
          setActividadesActivasC0((actividadesActivasC0 - 1));
          numeroActividades[actividadesActivasC0].visible = false;
        }
        break;

      case 1:
        if (actividadesActivasC1 >= 8) {
          setActividadesActivasC1((actividadesActivasC1 - 1));
          numeroActividades[actividadesActivasC1].visible = false;
        }
        break;

      case 2:
        if (actividadesActivasC2 >= 14) {
          setActividadesActivasC2((actividadesActivasC2 - 1));
          numeroActividades[actividadesActivasC2].visible = false;
        }
        break;

      case 3:
        if (actividadesActivasC3 >= 20) {
          setActividadesActivasC3((actividadesActivasC3 - 1));
          numeroActividades[actividadesActivasC3].visible = false;
        }
        break;

      case 4:
        if (actividadesActivasC4 >= 26) {
          setActividadesActivasC4((actividadesActivasC4 - 1));
          numeroActividades[actividadesActivasC4].visible = false;
        }
        break;

      case 5:
        if (actividadesActivasC5 >= 32) {
          setActividadesActivasC5((actividadesActivasC5 - 1));
          numeroActividades[actividadesActivasC5].visible = false;
        }
        break;

    }


=======
    if (componentesActivos >= 2) {
      numeroComponentes[componentesActivos].visible = false;
      setComponentesActivos(componentesActivos--);
    }
    console.log(componentesActivos);
>>>>>>> dev_emilio
  };
  //________________________________
  const [value, setValue] = React.useState(10);

  const [nombreArchivo, setNombreArchivo] = useState(
    " Arrastre o de click aquí para seleccionar archivo"
  );

  const [anioFiscal, setAnioFiscal] = useState("Ejercicio Fiscal");
  const [institution, setInstitution] = useState("Institución");
  const [programa, setPrograma] = useState("Programa");
  const [eje, setEje] = useState("Eje");
  const [tematica, setTematica] = useState("Temática");
  const [objetivo, setObjetivo] = useState("Objetivo");
  const [estrategia, setEstrategia] = useState("Estrategia");
  const [lineaDeAccion, setLineaDeAccion] = useState([
    { Id: "", LineaDeAccion: "Lineas de Acción" },
  ]);
  const [beneficiario, setBeneficiario] = useState("Beneficiario");

  const [catalogoAniosFiscales, setCatalogoAniosFiscales] = useState([
    { Id: "", AnioFiscal: "" },
  ]);
  const [catalogoInstituciones, setCatalogoInstituciones] = useState([
    { Id: "", NombreInstitucion: "" },
  ]);
  const [catalogoProgramas, setCatalogoProgramas] = useState([
    { Id: "", NombrePrograma: "" },
  ]);
  const [catalogoEjes, setCatalogoEjes] = useState([{ Id: "", Eje: "" }]);
  const [catalogoTematicas, setCatalogoTematicas] = useState([
    { Id: "", Tematica: "" },
  ]);
  const [catalogoObjetivos, setCatalogoObjetivos] = useState([
    { Id: "", Objetivo: "" },
  ]);
  const [catalogoEstrategias, setCatalogoEstrategias] = useState([
    { Id: "", Estrategia: "" },
  ]);
  const [catalogoLineasDeAccion, setCatalogoLineasDeAccion] = useState([
    { Id: "", LineaDeAccion: "" },
  ]);
  const [catalogoBeneficiarios, setCatalogoBeneficiarios] = useState([
    { Id: "", Beneficiario: "" },
  ]);

  const getAniosFiscales = () => {
    axios
      .get("http://10.200.4.105:8000/api/aniosFiscales", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setCatalogoAniosFiscales(r.data.data);
      });
  };
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
  const getTematicas = () => {
    axios
      .get("http://10.200.4.105:8000/api/tematica", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setCatalogoTematicas(r.data.data);
      });
  };
  const getObjetivos = () => {
    axios
      .get("http://10.200.4.105:8000/api/objetivos", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setCatalogoObjetivos(r.data.data);
      });
  };
  const getEstrategias = () => {
    axios
      .get("http://10.200.4.105:8000/api/estrategias", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setCatalogoEstrategias(r.data.data);
      });
  };
  const getLineasDeAccion = () => {
    axios
      .get("http://10.200.4.105:8000/api/lineasDeAccion", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setCatalogoLineasDeAccion(r.data.data);
      });
  };
  const getBeneficiarios = () => {
    axios
      .get("http://10.200.4.105:8000/api/beneficiarios", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setCatalogoBeneficiarios(r.data.data);
      });
  };

  useEffect(() => {
    getAniosFiscales();
    getInstituciones();
    getProgramas();
    getEjes();
    getTematicas();
    getObjetivos();
    getEstrategias();
    getLineasDeAccion();
    getBeneficiarios();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [expandedActividades, setExpandedActividades] = React.useState<string | false>(false);

  const handleChangeAcordion =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const handleChangeAcordionActividades =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedActividades(isExpanded ? panel : false);
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
          borderRadius: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs"
            textColor="inherit"
            sx={{ backgroundColor: "#fff", borderRadius: "10px 10px 0 0" }}
          >
            <Tab
              label="Encabezado"
              value={10}
              sx={{
                borderRight: "5px solid #b3afaf",
                color: "black",
                fontFamily: "MontserratBold",
                backgroundColor: "#ccc",
              }}
            />
            <Tab
              label="Fin / Propósito"
              value={20}
              sx={{
                borderRight: "5px solid #b3afaf",
                color: "black",
                fontFamily: "MontserratBold",
                backgroundColor: "#ccc",
              }}
            />
            <Tab
              label="Componentes"
              value={30}
              sx={{
                borderRight: "5px solid #b3afaf",
                color: "black",
                fontFamily: "MontserratBold",
                backgroundColor: "#ccc",
              }}
            />
            <Tab
              label="Actividades"
              value={40}
              sx={{
                borderRight: "5px solid #b3afaf",
                color: "black",
                fontFamily: "MontserratBold",
                backgroundColor: "#ccc",
              }}
            />
            <Tab
              label="Resumen"
              value={50}
              sx={{
                color: "black",
                fontFamily: "MontserratBold",
                backgroundColor: "#ccc",
              }}
            />
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
              borderRadius: 5,
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",

              gridTemplateRows: "1fr 1fr 1fr 2fr",
            }}
          >
            <FormControl sx={{ gridRow: "1", width: "20vw", mt: "6vh" }}>
              <Autocomplete
                disablePortal
                sx={{}}
                options={catalogoAniosFiscales}
                getOptionLabel={(option) => option.AnioFiscal}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={anioFiscal}
                    placeholder="Ejercicio Fiscal"
                  ></TextField>
                )}
                onChange={(event, value) =>
                  setAnioFiscal(value?.AnioFiscal as string)
                }
                isOptionEqualToValue={(option, value) => option.Id === value.Id}
              />
            </FormControl>
            <Box
              sx={{
                width: "20vw",
                height: "10vh",
                border: 1,
                borderRadius: 3,
                borderColor: "#af8c55",
                borderStyle: "dashed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: "6vh",
              }}
            >
              <Typography
                sx={{
                  position: "absolute",
                  fontFamily: "MontserratLight",
                  fontSize: ".7vw",
                }}
              >
                {nombreArchivo}
              </Typography>
              <TextField
                type="file"
                onChange={(v) =>
                  setNombreArchivo(v.target.value.split("\\")[2])
                }
                sx={{
                  color: "#fff",
                  opacity: 0,
                  width: "100%",
                  "& .MuiInputBase-root": {
                    height: "10vh",
                  },
                }}
              ></TextField>
            </Box>

            {/* 
            <InputLabel
              id="file-upload"
              sx={[
                {
                  gridColumn: "2/4",
                  border: "5px dotted #ccc",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  mt: "5vh",
                  cursor: "pointer",
                  height: "10vh",
                  width: "15vw",
                },
                {
                  "&:hover": {
                    color: "Blue",
                    border: "5px dotted blue",
                  },
                },
              ]}
            >
              {nombreArchivo}
              <Input
                onChange={(e) =>
                  setNombreArchivo(e.target.value.split("\\")[2])
                }
                id="file-upload"
                type="file"
                sx={{}}
              />
            </InputLabel> */}

            <FormControl sx={{ width: "20vw", mt: "6vh" }}>
              <Autocomplete
                disablePortal
                sx={{}}
                options={catalogoInstituciones}
                getOptionLabel={(option) => option.NombreInstitucion}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={institution}
                    placeholder="Institución"
                  ></TextField>
                )}
                onChange={(event, value) =>
                  setInstitution(value?.NombreInstitucion as string)
                }
                isOptionEqualToValue={(option, value) => option.Id === value.Id}
              />
            </FormControl>

            <FormControl sx={{ width: "20vw", mt: "6vh" }}>
              <Autocomplete
                disablePortal
                sx={{}}
                options={catalogoProgramas}
                getOptionLabel={(option) => option.NombrePrograma}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={programa}
                    placeholder="Nombre del Programa"
                  ></TextField>
                )}
                onChange={(event, value) =>
                  setPrograma(value?.NombrePrograma as string)
                }
                isOptionEqualToValue={(option, value) => option.Id === value.Id}
              />
            </FormControl>

            <FormControl required sx={{ width: "20vw", mt: "6vh" }}>
              <Autocomplete
                disablePortal
                sx={{}}
                options={catalogoEjes}
                getOptionLabel={(option) => option.Eje}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={eje}
                    placeholder="Eje"
                  ></TextField>
                )}
                onChange={(event, value) => setEje(value?.Eje as string)}
                isOptionEqualToValue={(option, value) => option.Id === value.Id}
              />
            </FormControl>

            <FormControl required sx={{ width: "20vw", mt: "4vh" }}>
              <Autocomplete
                disablePortal
                sx={{}}
                options={catalogoTematicas}
                getOptionLabel={(option) => option.Tematica}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={tematica}
                    placeholder="Temática"
                  ></TextField>
                )}
                onChange={(event, value) =>
                  setTematica(value?.Tematica as string)
                }
                isOptionEqualToValue={(option, value) => option.Id === value.Id}
              />
            </FormControl>

            <FormControl required sx={{ width: "20vw", mt: "4vh" }}>
              <Autocomplete
                disablePortal
                sx={{}}
                options={catalogoObjetivos}
                getOptionLabel={(option) => option.Objetivo}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={objetivo}
                    placeholder="Objetivo"
                  ></TextField>
                )}
                onChange={(event, value) =>
                  setObjetivo(value?.Objetivo as string)
                }
                isOptionEqualToValue={(option, value) => option.Id === value.Id}
              />
            </FormControl>

            <FormControl required sx={{ width: "20vw", mt: "4vh" }}>
              <Autocomplete
                disablePortal
                sx={{}}
                options={catalogoEstrategias}
                getOptionLabel={(option) => option.Estrategia}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={estrategia}
                    placeholder="Estrategia"
                  ></TextField>
                )}
                onChange={(event, value) =>
                  setEstrategia(value?.Estrategia as string)
                }
                isOptionEqualToValue={(option, value) => option.Id === value.Id}
              />
            </FormControl>

            <FormControl
              required
              sx={{
                gridColumnStart: "1",
                gridColumnEnd: "3",
                width: "35vw",
              }}
            >
              <Autocomplete
                multiple
                disablePortal
                disableCloseOnSelect
                // inputValue={lineaDeAccion}
                limitTags={4}
                options={catalogoLineasDeAccion}
                getOptionLabel={(option) => option.LineaDeAccion}
                renderInput={(params) => (
                  <TextField {...params} label="Lineas de Acción" />
                )}
                onChange={(event, value) => setLineaDeAccion(value)}
                isOptionEqualToValue={(option, value) => option.Id === value.Id}
              />
            </FormControl>

            <FormControl required sx={{ width: "20vw" }}>
              <Autocomplete
                disablePortal
                sx={{}}
                options={catalogoBeneficiarios}
                getOptionLabel={(option) => option.Beneficiario}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={beneficiario}
                    placeholder="Beneficiario"
                  ></TextField>
                )}
                onChange={(event, value) =>
                  setBeneficiario(value?.Beneficiario as string)
                }
                isOptionEqualToValue={(option, value) => option.Id === value.Id}
              />
            </FormControl>
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
<<<<<<< HEAD
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

=======
              borderRadius: 5,
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "repeat(1fr 3fr 3fr)",
            }}
          >
            <Typography
              sx={{
                gridColumn: "1/4",
                alignContent: "flex-start",
                fontFamily: "MontserratBold",
                fontSize: "1.5rem",
              }}
            >
              FIN
            </Typography>

            <TextField
              multiline
              rows={4}
              required
              id="outlined-basic"
              label="Resumen Narrativo"
              variant="outlined"
              sx={{ width: "20vw" }}
            />
            <TextField
              multiline
              rows={4}
              required
              id="outlined-basic"
              label="Indicador"
              variant="outlined"
              sx={{ width: "20vw" }}
            />
            <TextField
              multiline
              rows={4}
              required
              id="outlined-basic"
              label="Fórmula"
              variant="outlined"
              sx={{ width: "20vw" }}
            />
            <TextField
              multiline
              rows={4}
              required
              id="outlined-basic"
              label="Frecuencia"
              variant="outlined"
              sx={{ width: "20vw" }}
            />
            <TextField
              multiline
              rows={4}
              required
              id="outlined-basic"
              label="Medios de verificación y fuente de información"
              variant="outlined"
              sx={{ width: "20vw" }}
            />
            <TextField
              multiline
              rows={4}
              required
              id="outlined-basic"
              label="Supuestos"
              variant="outlined"
              sx={{ width: "20vw" }}
            />
            <Typography
              sx={{
                gridColumn: "1/4",
                fontFamily: "MontserratBold",
                fontSize: "1.5rem",
              }}
            >
              PROPÓSITO
            </Typography>
            <TextField
              multiline
              rows={4}
              required
              id="outlined-basic"
              label="Resumen Narrativo"
              variant="outlined"
              sx={{ width: "20vw" }}
            />
            <TextField
              multiline
              rows={4}
              required
              id="outlined-basic"
              label="Indicador"
              variant="outlined"
              sx={{ width: "20vw" }}
            />
            <TextField
              multiline
              rows={4}
              required
              id="outlined-basic"
              label="Fórmula"
              variant="outlined"
              sx={{ width: "20vw" }}
            />
            <TextField
              multiline
              rows={4}
              required
              id="outlined-basic"
              label="Frecuencia"
              variant="outlined"
              sx={{ width: "20vw" }}
            />
            <TextField
              multiline
              rows={4}
              required
              id="outlined-basic"
              label="Medios de verificación y fuente de información"
              variant="outlined"
              sx={{ width: "20vw" }}
            />
            <TextField
              multiline
              rows={4}
              required
              id="outlined-basic"
              label="Supuestos"
              variant="outlined"
              sx={{ width: "20vw" }}
            />
>>>>>>> dev_emilio
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
<<<<<<< HEAD
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

=======
            <Button variant="contained" onClick={() => incrementaComponente()}>
              Agregar Componente
            </Button>

            {numeroComponentes.map((item) => {
              if (item.visible) {
                return <TextField value={item.componente}></TextField>;
              }
            })}

            <Button variant="contained" onClick={() => eliminaComponente()}>
              Eliminar Componente
            </Button>
            <Box>
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChangeAcordion("panel1")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography
                    sx={{
                      width: "33%",
                      flexShrink: 0,
                      justifyContent: "center",
                    }}
                  >
                    Componente
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gridTemplateRows: "3fr 1fr 3fr ",
                    }}
                  >
                    <TextField
                      multiline
                      rows={4}
                      required
                      id="outlined-basic"
                      label="Resumen Narrativo"
                      variant="outlined"
                      sx={{ gridRow: "1", width: "20vw" }}
                    />
                    <TextField
                      multiline
                      rows={4}
                      required
                      id="outlined-basic"
                      label="Indicador"
                      variant="outlined"
                      sx={{ gridRow: "1", width: "20vw" }}
                    />
                    <TextField
                      multiline
                      rows={4}
                      required
                      id="outlined-basic"
                      label="Fórmula"
                      variant="outlined"
                      sx={{ gridRow: "1", width: "20vw" }}
                    />
                    <TextField
                      multiline
                      rows={4}
                      required
                      id="outlined-basic"
                      label="Frecuencia"
                      variant="outlined"
                      sx={{ gridRow: "3", width: "20vw" }}
                    />
                    <TextField
                      multiline
                      rows={4}
                      required
                      id="outlined-basic"
                      label="Medios de verificación y fuente de información"
                      variant="outlined"
                      sx={{ gridRow: "3", width: "20vw" }}
                    />
                    <TextField
                      multiline
                      rows={4}
                      required
                      id="outlined-basic"
                      label="Supuestos"
                      variant="outlined"
                      sx={{ gridRow: "3", width: "20vw" }}
                    />
                  </Box>
                </AccordionDetails>
              </Accordion>
>>>>>>> dev_emilio
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

                  value={componenteSeleccionado}
                  label="Componentes"
                  onChange={(x) => setComponenteSeleccionado(x.target.value as number)}
                >
                  {numeroComponentes.map((item) => {
                    if (item.visible) {
                      return (
                        <MenuItem value={item.nocomponente}>{item.label}</MenuItem>
                      );
                    }
                  })}

                </Select>

                <IconButton onClick={() => incrementaActividades()}>
                  <AddCircleIcon fontSize="large" />
                </IconButton >

                <IconButton onClick={() => eliminaActividades()}>
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
                  if (item.visible && item.nocomponente === componenteSeleccionado) {
                    return <Box sx={{ backgroundColor: "", width: "100%", boxShadow: 4, }}>
                      <Accordion id={item.nombre} key={item.nombre} expanded={expanded === item.nombre} onChange={handleChangeAcordion(item.nombre)} sx={{ mt: "3vh" }}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                        >

                          <Typography sx={{ width: '33%', flexShrink: 0, justifyContent: "center" }}>
                            {item.label}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Box sx={{
                            display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "10px"
                          }}>

                            {numeroActividades.map((itemNumeroActividades) => {
                              if (itemNumeroActividades.visible && itemNumeroActividades.Componente === item.nocomponente) {
                                return <Box sx={{ backgroundColor: "", width: "100%", boxShadow: 4, }}>
                                  <Accordion id={itemNumeroActividades.nombre} key={itemNumeroActividades.nombre} expanded={expandedActividades === itemNumeroActividades.nombre} onChange={handleChangeAcordionActividades(itemNumeroActividades.nombre)} sx={{ mt: "3vh" }}>
                                    <AccordionSummary
                                      expandIcon={<ExpandMoreIcon />}
                                    >

                                      <Typography sx={{ width: '33%', flexShrink: 0, justifyContent: "center" }}>
                                        {itemNumeroActividades.label}
                                      </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                      <Box sx={{
                                        display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "10px"
                                      }}>

                                        {actividades.map((itemActividades) => {
                                          if (item.visible && itemActividades.componente === componenteSeleccionado && itemActividades.actividad===itemNumeroActividades.Actividad) {
                                            return (
                                              <TextField
                                                key={itemActividades.index}
                                                multiline
                                                rows={6}
                                                id="outlined-basic"
                                                label={`${itemActividades.componente}` + ` ${itemActividades.actividad} `}
                                                variant="outlined"
                                                onChange={(x) => changeValor(itemActividades.index, x.target.value, "componentes")}
                                                sx={{ width: "30%" }}
                                              />
                                            );
                                          }
                                        })}


                                      </Box>
                                    </AccordionDetails>
                                  </Accordion>
                                </Box>;
                              }
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
