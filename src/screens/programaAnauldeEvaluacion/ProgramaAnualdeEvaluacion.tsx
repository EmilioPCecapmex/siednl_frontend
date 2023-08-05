import {
  Button,
  Grid,
  Typography,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  InputBase,
  Paper,
} from "@mui/material";
import {
  LateralMenu,
  IInstituciones,
} from "../../components/lateralMenu/LateralMenu";
import { Header } from "../../components/header/Header";
import React, { useEffect, useState } from "react";
            
export const ProgramaAnualEvaluacion = () => {
  const [actionNumber, setActionNumber] = useState(0);

  return (
    <Grid container direction="row" height={"100vh"} width={"100vw"}>
      <Grid item height={"100vh"}>
        <LateralMenu selection={"Programa Anual de Evaluacion"} actionNumber={actionNumber} />
      </Grid>
      <Grid
        justifyContent={"center"}
        display={"flex"}
        container
        item
        xl={10.2}
        lg={9.9}
        md={9.4}
        sm={7.5}
        xs={6}
        sx={{ backgroundColor: "#F2F2F2" }}
      >
        <Grid sx={{ height: "8vh", marginLeft: "4vw" }}>
          <Header
            details={{
              name1: "Inicio",
              path1: "../home",
              name2: "Programa Anual ",
              path2: "../programaAnualEvaluacion",
              name3: "",
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
