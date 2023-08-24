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
import {TabPAE} from "./TabPAE";


export default function CapturaPAE() {
  const [value, setValue] = useState(10);

  const cambiarTab = (option: string) => {
    if (option === "adelante") {
      if (value < 30) setValue(value + 10);
    } else {
      if (value > 10) setValue(value - 10);
    }
  };

  const [noComponentes, setNoComponentes] = React.useState([1,2]);

  useEffect(() => {
  // if (index > 1 && index < 6)
  //   setNoComponentes((loadComponentes) => [...loadComponentes, index + 1]
  }, []);

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
          height: "auto",
          borderRadius: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        
        <Grid
          item
          sx={{
            width: "75vw",
            height: "77vh",
          }}
        >
          
          <TabPAE 
          anios={noComponentes}
          idPAE={"111"}
          Anio={"2023"}
          Numero={"2"}
          Nombre={"A"}
          Ruta={"A"}
          />

          
        </Grid>
      </Grid>
    </Grid>
  );
}