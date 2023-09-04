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
    <Grid container justifyContent={"space-between"}>
      <Grid
       item
       xl={12}
       height={"7vh"}
        //</Grid>sx={{ mr: showResume ? 5 : 0 }}
      >
        <LateralMenu
          selection={"PAE"}
          actionNumber={actionNumber}
        />
      </Grid>

      <Grid justifyContent={"center"}
        display={"flex"}
        container
        height={"93vh"}
        alignItems={"center"}
        item
        xl={12}
        lg={12}
        md={12}
        sm={7.5}
        xs={6}
        sx={{ backgroundColor: "white", }}
      >
        {/* <Grid sx={{ height: "8vh", marginLeft: "4vw" }}>
          <Header
            details={{
              name1: "Inicio",
              path1: "../home",
              name2: "Programa Anual de Evaluación",
              path2: "../ProgramaAnualEvaluacion",
              name3: "",
            }}
          />

        

      </Grid> */}
      <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "center",
              height: "92vh",
            }}
            gridArea={"main"}
          >
            <CapturaPAE />
          </Grid>
    </Grid>
    </Grid>
  );
};
