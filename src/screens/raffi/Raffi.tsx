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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LateralMenu } from "../../components/lateralMenu/LateralMenu";
import React, { useEffect, useState } from "react";
import { Header } from "../../components/header/Header";
import CapturaRaffi from "../../components/tabsRaffi/CapturaRaffi";
import { SelectChangeEvent } from "@mui/material/Select";
import { queries } from "../../queries";

const estados = [
  "Todos",
  "En Captura",
  "Esperando Revisión",
  "Esperando autorización",
  "Autorizada",
];
interface Head {
  label: string;
}

const heads: readonly Head[] = [
  {
    label: "EJERCICIO FISCAL",
  },
  {
    label: "INSTITUCIÓN",
  },
  {
    label: "NOMBRE DEL PROGRAMA",
  },
  {
    label: "ESTADO",
  },
  {
    label: "FECHA DE CREACIÓN",
  },
  {
    label: "CREADO POR",
  },
  {
    label: "OPCIONES",
  },
];

export const Raffi = () => {
  const [actionNumber, setActionNumber] = useState(0);

  const [opentabs, setOpenTabs] = useState(false);

  const [estadosR, SetEstadosR] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof estadosR>) => {
    const {
      target: { value },
    } = event;
    SetEstadosR(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <Grid container direction="row" height={"100vh"} width={"100vw"}>
      <Grid item height={"100vh"}>
        <LateralMenu selection={"Raffi"} actionNumber={actionNumber} />
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
              name2: "Raffi",
              path2: "../raffi",
              name3: "",
            }}
          />
        </Grid>
        <Grid
          container
          item
          lg={8}
          height="15vh"
          direction="row"
          sx={{
            backgroundColor: "#FFFF",
            borderRadius: 5,
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Grid
            lg={12}
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
          >
            <Grid item lg={5}>
              <TextField
                size="small"
                variant="outlined"
                fullWidth
                label="Busqueda"
                
              />
            </Grid>

            <Grid item lg={5}>
              <FormControl fullWidth>
                <InputLabel>Filtro por estado de la Raffi</InputLabel>
                <Select
                  size="small"
                  fullWidth
                  variant="outlined"
                  label="Filtro por estado de la Raffi"
                  value={estadosR}
                  onChange={handleChange}
                >
                  {estados.map((estado) => (
                    <MenuItem key={estado} value={estado}>
                      {estado}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>



          
          <Grid
            lg={12}
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
          >
            


            <Grid item lg={5}>
              <FormControl fullWidth>
                <InputLabel>Filtro por estado de la Raffi</InputLabel>
                <Select
                  size="small"
                  fullWidth
                  variant="outlined"
                  label="Filtro por estado de la Raffi"
                  value={estadosR}
                  onChange={handleChange}
                >
                  {estados.map((estado) => (
                    <MenuItem key={estado} value={estado}>
                      {estado}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item lg={5}>
              <Button fullWidth sx={queries.buttonContinuarSolicitudInscripcion}>
                Buscar
              </Button>
            </Grid>
          </Grid>

        </Grid>
        <Grid
          container
          item
          lg={10}
          height="65vh"
          direction="row"
          sx={{ backgroundColor: "#FFFF", borderRadius: 5 }}
        >
          <TableContainer  sx={{
              maxHeight: "100%",
              borderRadius: 5,
              overflow: "auto",
              "&::-webkit-scrollbar": {
                width: ".5vw",
                mt: 1,
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#AF8C55",
                outline: "1px solid slategrey",
                borderRadius: 1,
              },
            }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                <TableRow>
                  {heads.map((head, index) => (
                    <TableCell align="center" key={index}>
                      <TableSortLabel>{head.label}</TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
                </TableHead>
                <TableBody>

                </TableBody>
              </Table>
          </TableContainer>

        </Grid>
      </Grid>
    </Grid>
  );
};
