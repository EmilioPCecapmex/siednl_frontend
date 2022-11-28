import React, { useEffect, useRef, useState } from "react";
import {
  FormControl,
  TextField,
  Box,
  Typography,
  Alert,
  Button,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";

export interface IEncabezadoFT {
  Id: string;
  MetaODS: string;
  FechaCreacion: Date;
  CreadoPor: string;
  UltimaModificacion: string;
  ModificadoPor: string;
  Deleted: number;
}

export interface IIEncabezadoFT {
  Id: string;
  ObjetivoDS: string;
  FechaCreacion: Date;
  CreadoPor: string;
  UltimaModificacion: string;
  ModificadoPor: string;
  Deleted: number;
}

export function TabEncabezado({
  show,
  resumenEncabezado,
 
}: {
  show: boolean;
  resumenEncabezado: Function;
  
}) {

  const [encabezado, setEncabezado] = useState<Array<IEncabezadoFT>>([]);
const [encabezado2, setEncabezado2] = useState<Array<IIEncabezadoFT>>([]);


const [metaODS, setMetaODS] = useState([
  { Id: "0", MetaODS: "" },
]);

const [objetivoDS, setObjetivoODS] = useState([
  { Id: "0", ObjetivoDS: "" },
]);

const getMetas = () => {
  axios
    .get(process.env.REACT_APP_APPLICATION_BACK + "/api/metasODS", {

      headers: {
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    })
    .then((r) => {
      setMetaODS(r.data.data);
    });
};

const getObjetivos = () => {
  axios
    .get(process.env.REACT_APP_APPLICATION_BACK + "/api/objetivosDS", {

      headers: {
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    })
    .then((r) => {
      setObjetivoODS(r.data.data);
    });
};

useEffect(() => {
  getMetas()
}, [])

useEffect(() => {
  getObjetivos()
}, [])


  return (
    <Box
    visibility={{/*{show ? "visible" : "hidden"}*/}}
    position="absolute"
    sx={{
      width: "75vw",
      height: "75vh",
      justifyContent: "center",
      alignItems: "center",
      justifyItems: "center",
      backgroundColor: "#fff",
      boxShadow: 20,
      borderRadius: 5,
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gridTemplateRows: "4fr 1fr 1fr 1fr",
    }}>



      <TextField
      rows={8}
      multiline
      sx={{ width: "90%", boxShadow: 2 }}
      variant={"filled"}
      label="PROGRAMA SECTORIAL, ESPECIAL O REGIONAL"
      InputLabelProps={{
        style: {
          fontFamily: "MontserratMedium",
        },
      }}
      InputProps={{
        style: {
          fontFamily: "MontserratRegular",
        },
      }}

      >
      Hola1
    </TextField>


{/*------------------------TF1--------------------- */}

  <TextField 
  rows={8}
  multiline
  sx={{ width: "90%", boxShadow: 2 }}
  variant={"filled"}
  label="OBJETIVO SECTORIAL, ESPECIAL O REGIONAL"
  InputLabelProps={{
    style: {
      fontFamily: "MontserratMedium",
    },
  }}
  InputProps={{
    style: {
      fontFamily: "MontserratRegular",
    },
  }}>
      Hola2
    </TextField>


{/*------------------------TF2--------------------- */}

<FormControl sx={{ gridRow: "2", width: "20vw", mt: "6vh" }}>
    <Autocomplete
      disabled={false}
      disablePortal
      size="small"
      options={objetivoDS}
      getOptionLabel={(option) => option.ObjetivoDS}
      renderOption={(props:any, option:any) => {
        return (
          <li {...props}>
            <p
              style={{ fontFamily: "MontserratRegular", fontSize: ".7vw" }}
            >
              {option.ObjetivoDS}
            </p>
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={"OBJETIVO ODS"}
          variant="standard"
          InputLabelProps={{
            style: {
              fontFamily: "MontserratSemiBold",
              fontSize: ".8vw",
            },
          }}
          sx={{
            "& .MuiAutocomplete-input": {
              fontFamily: "MontserratRegular",
            },
          }}
        >

        </TextField>
      )}
      isOptionEqualToValue={(option, value) => option.Id === value.Id}
    />
  </FormControl>

{/*------------------------TF3--------------------- */}
<FormControl sx={{ gridRow: "2", width: "20vw", mt: "6vh" }}>
    <Autocomplete
      disabled={false}
      disablePortal
      size="small"
      options={metaODS}
      getOptionLabel={(option) => option.MetaODS}
      renderOption={(props:any, option:any) => {
        return (
          <li {...props}>
            <p
              style={{ fontFamily: "MontserratRegular", fontSize: ".7vw" }}
            >
              {option.MetaODS}
            </p>
          </li>
        );
      }}


      renderInput={(params) => (
        <TextField
          {...params}
          label={"META ODS"}
          variant="standard"
          InputLabelProps={{
            style: {
              fontFamily: "MontserratSemiBold",
              fontSize: ".8vw",
            },
          }}
          sx={{
            "& .MuiAutocomplete-input": {
              fontFamily: "MontserratRegular",
            },
          }}
        >

        </TextField>
      )}
      isOptionEqualToValue={(option, value) => option.Id === value.Id}
    />
  </FormControl>


{/*------------------------TF4--------------------- */}
  </Box>
);
}