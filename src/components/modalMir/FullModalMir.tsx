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

  const agregarFnc = () => {
    let v = componentes.length + 1;
    if (v > 6) {
    } else {
      setComponentes([...componentes, v]);

      let array = [...componentes, v].map((x) => {
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
    }
  };

  const eliminarFnc = () => {
    let v = componentes.length - 1;
    if (v < 2) {
    } else {
      setComponentes(componentes.splice(0, v));
    }
  };

  const agregarAFnc = (index: number) => {
    let v = actividades.length + 1;
    if (v > 6) {
    } else {
      setActividades([...actividades, v]);

      let xArray = [...componenteActividad];

      xArray[0]["componentes"][parseInt(componenteSelect)] = [
        ...actividades,
        v,
      ];

      setComponenteActividad(xArray);
    }
  };

  const eliminarAFnc = () => {
    let act = componenteActividad[0]["componentes"][parseInt(componenteSelect)];
    let v = act.length - 1;
    if (v < 2) {
    } else {
      let xArray = [...componenteActividad];

      xArray[0]["componentes"][parseInt(componenteSelect)] = act.splice(0, v);

      setComponenteActividad(xArray);
    }
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
    setComponenteValor(array);
  }, []);

  const cargarArray = () => {
    let arrayComponente = [
      {
        componentes: componenteValor,
      },
    ];
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
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
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

        <TabEncabezado show={value === 10 ? true : false}></TabEncabezado>
      </Box>
    </Box>
  );
}
