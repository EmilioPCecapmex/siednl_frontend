import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  Tabs,
  Tab,
  Grid,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { TabComponenteRf } from "./TabComponentesRf";
import { TabActividadRf } from "./TabsActividadesRf";

export default function CapturaRaffi() {
  const [value, setValue] = useState(10);

  const cambiarTab = (option: string) => {
    if (option === "adelante") {
      if (value < 30) setValue(value + 10);
    } else {
      if (value > 10) setValue(value - 10);
    }
  };

  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
      }}
    >
      <Grid
        item
        sx={{
          width: "auto",
          height: "90vh",
          borderRadius: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Tabs
          value={value}
          textColor="inherit"
          sx={{
            backgroundColor: "#e0e0e0",
            borderRadius: "10px 10px 0 0",
            boxShadow: 20,
          }}
        >
          <Tab
            label={<ArrowCircleLeftIcon></ArrowCircleLeftIcon>}
            sx={{
              borderRight: "5px solid #b3afaf",
              color: "#af8c55",
              fontFamily: "MontserratSemiBold",
              backgroundColor: "#ccc",
            }}
            onClick={() => {
              cambiarTab("atras");
            }}
          />
          <Tab
            label="Componentes"
            value={10}
            onClick={() => {
              setValue(10);
            }}
            sx={{
              borderRight: "5px solid #b3afaf",
              color: "black",
              fontFamily: "MontserratBold",
            }}
          />
          <Tab
            label="Actividades"
            value={20}
            onClick={() => {
              setValue(20);
            }}
            sx={{
              borderRight: "5px solid #b3afaf",
              color: "black",
              fontFamily: "MontserratBold",
            }}
          />
          <Tab
            label="Resumen"
            value={30}
            onClick={() => {
              setValue(30);
            }}
            sx={{
              borderRight: "5px solid #b3afaf",
              color: "black",
              fontFamily: "MontserratBold",
            }}
          />
          <Tab
            label={<ArrowCircleRightIcon></ArrowCircleRightIcon>}
            sx={{
              borderRight: "5px solid #b3afaf",
              color: "#af8c55",
              backgroundColor: "#ccc",
            }}
            onClick={() => {
              cambiarTab("adelante");
            }}
          />
        </Tabs>

        <Grid
          item
          sx={{
            width: "75vw",
            height: "77vh",
          }}
        >
          {value === 10 && <TabComponenteRf />}

          {value === 20 && <TabActividadRf />}
        </Grid>
      </Grid>
    </Grid>
  );
}
