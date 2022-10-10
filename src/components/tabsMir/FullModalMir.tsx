import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

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
import { TabActividades } from "./TabActividades";

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

  const asignarComponente=( state:[])=>{
    setComponentes(state);
    let a =componentes;
    //console.log(a)
  }
  const asignarComponenteValor=( state:Array<IComponente>)=>{
    setComponenteValor(state);
    let a =componenteValor;
    console.log(a)
  }

  function obtenerComponentes (params:any){
    return params;
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
          <Box sx={{gridRow: value === 10 ? 1 : 3}}>
            <TabEncabezado show={value === 10 ? true : false}></TabEncabezado>
          </Box>
          <Box>
            <TabComponente show={value === 30 ? true : false } asignarComponente={asignarComponente} asignarComponenteValor={asignarComponenteValor} ></TabComponente>
          </Box>
          <Box>
          <TabActividades show={value === 40 ? true : false} componentesX={componentes}></TabActividades>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
