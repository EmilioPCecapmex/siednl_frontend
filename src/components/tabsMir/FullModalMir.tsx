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
import { TabActividades } from "./TabActividades";
import TabFinProposito from "./TabFinProposito";
import TabResumen from "./TabResumen";

export default function FullModalMir() {
  const [value, setValue] = React.useState(10);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  //----------------------------------------------------------------------------------------------
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        width: "100%",
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
            onChange={() => handleChange(value)}
            textColor="inherit"
            sx={{
              backgroundColor: "#fff",
              borderRadius: "10px 10px 0 0",
              boxShadow: 20,
            }}
          >
            <Tab
              label="Encabezado"
              onClick={() => setValue(10)}
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
              onClick={() => setValue(20)}
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
              onClick={() => setValue(30)}
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
              onClick={() => setValue(40)}
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
              onClick={() => setValue(50)}
              value={50}
              sx={{
                color: "black",
                fontFamily: "MontserratBold",
                backgroundColor: "#ccc",
              }}
            />
          </Tabs>
        </Box>

        <Box
          sx={{
            width: "75vw",
            height: "77vh",
          }}
        >
          <TabEncabezado show={value === 10 ? true : false}></TabEncabezado>
          <TabFinProposito show={value === 20 ? true : false}></TabFinProposito>
          <TabComponente show={value === 30 ? true : false}></TabComponente>
          <TabResumen show={value === 50 ? true : false}></TabResumen>
        </Box>
      </Box>
    </Box>
  );
}
