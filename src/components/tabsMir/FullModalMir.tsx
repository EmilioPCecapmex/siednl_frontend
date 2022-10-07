import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  TextField,
  Box,
  Typography,
  IconButton,
  Button,
  ButtonGroup,
} from "@mui/material";
import { IComponente } from "./IComponente";
import TabEncabezado from "./TabEncabezado";
import { TabComponente } from "./TabComponente";

export default function FullModalMir() {
  const [value, setValue] = React.useState(10);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [expandedActividades, setExpandedActividades] = React.useState<
    string | false
  >(false);

  // business logic-------------------------------------------------------------------------------
  const [componentes, setComponentes] = React.useState([1, 2]);
  const [actividades, setActividades] = React.useState([1, 2]);

  const [componenteActividad, setComponenteActividad] = React.useState([
    {
      componentes: componentes.map((x) => actividades),
    },
  ]);

  const [componenteValor, setComponenteValor] = React.useState<
    Array<IComponente>
  >([]);

  const asignarComponente=( state:[number])=>{
    setComponentes(state);
    let a =componentes;
    console.log(a)
  }

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
    setComponenteValor(array);
  }, []);

  const cargarArray = () => {
    let arrayComponente = [
      {
        componentes: componenteValor,
      },
    ];
  };

  const obtenerValor = (x: number) => {
    let arrayComponente = [
      {
        componentes: componenteValor,
      },
    ];

    return arrayComponente[0].componentes[x - 1].resumen;
  };

  const [componentExpanded, setComponentExpanded] = useState(0);
  const [focusTextField, setFocusTextField] = useState(2);

  const GuardarComponente = (x: number) => {
    setComponenteValor([...componenteValor, componenteValor[x - 1]]);
  };

  const AcordeonComponentes = ({ x }: { x: number }) => {
    return (
      <Accordion
        sx={{
          width: "95%",
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          boxShadow: 4,
        }}
        expanded={componentExpanded === x}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          onClick={() => {
            let y = componentExpanded == x ? 0 : x;
            setComponentExpanded(y);
          }}
        >
          <Typography
            sx={{
              width: "33%",
              flexShrink: 0,
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            Componente {x}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{}}>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              height: "40vh",
              flexDirection: "column",
              backgroundColor: "",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "50%",
                justifyContent: "space-evenly",
                backgroundColor: "",
                display: "flex",
                alignItems: "center",
              }}
            >
              <TextField
                sx={{ with: "30%", maxWidth: "30%" }}
                fullWidth
                multiline
                rows={5}
                label={"Resumen Narrativo"}
                autoFocus
                value={componenteValor[x - 1].resumen}
                onChange={(c) => {
                  componenteValor[x - 1].resumen = c.target.value;
                  setComponenteValor([
                    ...componenteValor,
                    componenteValor[x - 1],
                  ]);
                  //setFocusTextField(1);
                }}
              />
              <TextField
                sx={{ with: "30%", maxWidth: "30%" }}
                fullWidth
                multiline
                rows={5}
                label={"Indicador"}
                placeholder={componenteValor[x - 1].indicador}
                //autoFocus={focusTextField === 1 ? true:false}
                value={componenteValor[x - 1].indicador}
                onChange={(c) => {
                  componenteValor[x - 1].indicador = c.target.value;
                  setComponenteValor([
                    ...componenteValor,
                    componenteValor[x - 1],
                  ]);
                }}
              />
              <TextField
                sx={{ with: "30%", maxWidth: "30%" }}
                fullWidth
                multiline
                rows={5}
                value={componenteValor[x - 1].formula}
                label={"Fórmula"}
                onChange={(c) => {
                  componenteValor[x - 1].formula = c.target.value;
                  setComponenteValor([
                    ...componenteValor,
                    componenteValor[x - 1],
                  ]);
                }}
              />
            </Box>
            <Box
              sx={{
                width: "100%",
                height: "50%",
                justifyContent: "space-evenly",
                backgroundColor: "",
                display: "flex",
                alignItems: "center",
              }}
            >
              <TextField
                sx={{ with: "30%", maxWidth: "30%" }}
                fullWidth
                multiline
                rows={5}
                label={"Frecuencia"}
                value={componenteValor[x - 1].frecuencia}
                onChange={(c) => {
                  componenteValor[x - 1].frecuencia = c.target.value;
                  cargarArray();
                }}
              />
              <TextField
                sx={{ with: "30%", maxWidth: "30%" }}
                fullWidth
                multiline
                rows={5}
                label={"Medios de Verificación"}
                value={componenteValor[x - 1].medios}
                onChange={(c) => {
                  componenteValor[x - 1].medios = c.target.value;
                  cargarArray();
                }}
              />
              <TextField
                sx={{ with: "30%", maxWidth: "30%" }}
                fullWidth
                multiline
                rows={5}
                label={"Supuestos"}
                value={componenteValor[x - 1].supuestos}
                onChange={(c) => {
                  componenteValor[x - 1].supuestos = c.target.value;
                  cargarArray();
                }}
              />
            </Box>
          </Box>
          <Box>
            <Button> Guardar</Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    );
  };

  const AcordeonActividades = ({ x, comp }: { x: number; comp: string }) => {
    return (
      <Accordion
        sx={{
          width: "95%",
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          boxShadow: 4,
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography
            sx={{
              width: "33%",
              flexShrink: 0,
              height: "5vh",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            Actividad {x} - Componente {comp}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              height: "40vh",
              flexDirection: "column",
              backgroundColor: "",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "50%",
                justifyContent: "space-evenly",
                display: "flex",
                alignItems: "center",
              }}
            >
              <TextField
                sx={{ with: "30%", maxWidth: "30%" }}
                fullWidth
                multiline
                rows={5}
                label={"Resumen Narrativo"}
                onChange={(c) => {
                  componenteValor[x - 1].resumen = c.target.value;
                  cargarArray();
                }}
              />
              <TextField
                sx={{ with: "30%", maxWidth: "30%" }}
                fullWidth
                multiline
                rows={5}
                label={"Indicador"}
                onChange={(c) => {
                  componenteValor[x - 1].indicador = c.target.value;
                  cargarArray();
                }}
              />
              <TextField
                sx={{ with: "30%", maxWidth: "30%" }}
                fullWidth
                multiline
                rows={5}
                label={"Fórmula"}
                onChange={(c) => {
                  componenteValor[x - 1].formula = c.target.value;
                  cargarArray();
                }}
              />
            </Box>
            <Box
              sx={{
                width: "100%",
                height: "50%",
                justifyContent: "space-evenly",
                backgroundColor: "",
                display: "flex",
                alignItems: "center",
              }}
            >
              <TextField
                sx={{ with: "30%", maxWidth: "30%" }}
                fullWidth
                multiline
                rows={5}
                label={"Frecuencia"}
                onChange={(c) => {
                  componenteValor[x - 1].frecuencia = c.target.value;
                  cargarArray();
                }}
              />
              <TextField
                sx={{ with: "30%", maxWidth: "30%" }}
                fullWidth
                multiline
                rows={5}
                label={"Medios de Verificación"}
                onChange={(c) => {
                  componenteValor[x - 1].medios = c.target.value;
                  cargarArray();
                }}
              />
              <TextField
                sx={{ with: "30%", maxWidth: "30%" }}
                fullWidth
                multiline
                rows={5}
                label={"Supuestos"}
                onChange={(c) => {
                  componenteValor[x - 1].supuestos = c.target.value;
                  cargarArray();
                }}
              />
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    );
  };

  const [componenteSelect, setComponenteSelect] = React.useState("0");
  //----------------------------------------------------------------------------------------------
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
            sx={{
              backgroundColor: "#fff",
              borderRadius: "10px 10px 0 0",
              boxShadow: 20,
            }}
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

        <Box sx={{ display: "grid" }}>
          <Box sx={{gridRow: value === 10 ? 1 : 2}}>
            <TabEncabezado show={value === 10 ? true : false}></TabEncabezado>
          </Box>
          <Box>
            <TabComponente show={value === 30 ? true : false } asignarComponente={asignarComponente} ></TabComponente>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
