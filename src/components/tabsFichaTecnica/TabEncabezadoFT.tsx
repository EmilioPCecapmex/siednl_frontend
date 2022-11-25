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

export function TabEncabezadoFT() {



  const [programaSER, setProgramaSER] = useState([
  ]);
  const [objetivoSER, setObjetivoSER] = useState([
  ]);
  const [catalogoObjetivoODS, setCatalogoObjetivoODS] = useState([
  ]);
  const [catalogoMetaODS, setCatalogoMetaODS] = useState([
  ]);
{/*Esto es un json de prueba*/}
  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },]
{/*Esto es un json de prueba*/}
  {
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
          options={top100Films}
          renderOption={(props: any, option: any) => {
            return (
              <li {...props}>
                <p
                  style={{ fontFamily: "MontserratRegular", fontSize: ".7vw" }}
                >
                  {option}
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
            ></TextField>
          )}onChange={() =>
            {}
          }
          
        />
      </FormControl>
       
{/*------------------------TF3--------------------- */}
<FormControl sx={{ gridRow: "2", width: "20vw", mt: "6vh" }}>
        <Autocomplete
          disabled={false}
          disablePortal
          size="small"
          options={top100Films}
          renderOption={(props:any, option:any) => {
            return (
              <li {...props}>
                <p
                  style={{ fontFamily: "MontserratRegular", fontSize: ".7vw" }}
                >
                  {option}
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
            ></TextField>
          )}onChange={() =>
            {}
          }
          
        />
      </FormControl>


{/*------------------------TF4--------------------- */}
      </Box>
    )
  }
}