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
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/header/Header";
import React, { useEffect, useState } from "react";
import CapturaPAE from "../../components/tabsPAE/CapturaPAE";
            
export const ProgramaAnualEvaluacion = () => {
  const navigate = useNavigate();
  const [actionNumber, setActionNumber] = useState(0);


  return (
    <Grid container direction="row" height={"100vh"} width={"100vw"}>
      <Grid
        item
        height={"100vh"}
        //</Grid>sx={{ mr: showResume ? 5 : 0 }}
      >
        <LateralMenu
          selection={"Actividades Institucionales"}
          actionNumber={actionNumber}
        />
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
              name2: "Programa Anual de Evaluación",
              path2: "../ProgramaAnualEvaluacion",
              name3: "",
            }}
          />

        <Grid item sx ={{display: "flex",  justifyContent: "center"}}>
   
            <CapturaPAE />
          </Grid>

      </Grid>
    </Grid>
    </Grid>
  );
};
