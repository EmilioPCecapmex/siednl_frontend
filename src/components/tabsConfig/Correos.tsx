import { useState,useEffect } from "react";
import { Grid, Tooltip, IconButton, FormControl,
  TextField,
  Autocomplete,
  Typography,
  InputLabel } from "@mui/material";
import {useNavigate} from "react-router-dom";
import IFrame from "./AgregarUsuarios";
import { GridCloseIcon } from "@mui/x-data-grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { queries } from "../../queries";
import axios from "axios";

export const getToken = () => {
  let token = localStorage.getItem("jwtToken");
  return token;
};

export default function Correos({
  idCorreo,
  idApp,
  banderaCrea,
  showResumen,
}: {
  idCorreo: string;
  idApp: string;
  banderaCrea: string;
  showResumen: Function;
}) {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("Rol") === "Capturador") {
      navigate("../home");
    }
    getCorreo(idCorreo,setDetallesCorreo);
  }, []);
  
  useEffect(() => {
    getCorreo(idCorreo,setDetallesCorreo);
  }, [idCorreo]);

  const [detallesCorreo, setDetallesCorreo] = useState(
    {
      Id: "",
      Nombre: "",
      Motivo: "",
      Fecha: "",
      Mensaje: "",
    },
  );

  const getCorreo = (idCorreo: string, setState: Function) => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/detail-correo", {
        params: {
          IdCorreo: idCorreo,
        },
        
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setState(r.data.data);
        console.log(r.data.data.Nombre);
      });
  };

 
   const theme = useTheme();
const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Grid container>
      <Grid container rowSpacing={3} >
        <Grid container item width={"100%"} display={"flex"} justifyContent={"flex-end"}
        sx={{height: "8vh"}}>
            <Tooltip title={"Salir"}>
            <IconButton
              onClick={() => showResumen()}
            >
              <GridCloseIcon sx={{
                fontSize: [30, 30, 30, 40, 40]
              }} />
            </IconButton>
          </Tooltip>
         
        </Grid>
        <Grid container
          sx={{
            width: "93vw",
            height: "85vh",
            backgroundColor: "#fff",
            boxShadow: 10,
            borderRadius: 5,
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
          }}
        >


  
      
      <Grid
        sx={{
          width: "100%",
          display: "flex",
          height: "7vh",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            mr: "1vw",
            fontFamily: "MontserratSemiBold",
            fontSize: [10, 15, 18, 22, 22, 25],
          }}
        >
          DETALLES CORREO ELECTRÓNICO
        </Typography>
      </Grid>

      
      <Grid
        
      >
        <Grid
          item
          container
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          
          <Grid
              item
              container
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                marginLeft: "2vw", // Adjust this value as needed
              }}
            >
          <InputLabel sx={{ ...queries.medium_text, width: '100%' }}>
          Destinatario
          </InputLabel>
          
          <TextField
            disabled={true}
            value={detallesCorreo.Nombre}
            rows={1}
            multiline
            sx={{ width: "90%", boxShadow: 2 }}
            variant={"filled"}
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
          ></TextField>
        </Grid>
        <Grid item xs={12} sx={{ marginBottom: 6 }} />
        <Grid
              item
              container
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                marginLeft: "2vw", // Adjust this value as needed
              }}
            >
          <InputLabel sx={{ ...queries.medium_text, width: '100%' }}>
          Asunto
          </InputLabel>
          <TextField
            disabled={true}
            value={detallesCorreo.Motivo}
              
            rows={1}
            multiline
            sx={{ width: "90%", boxShadow: 2 }}
            variant={"filled"}
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
          ></TextField>
        </Grid>
        <Grid item xs={12} sx={{ marginBottom: 6 }} />
        <Grid
              item
              container
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                marginLeft: "2vw", // Adjust this value as needed
              }}
            >
          <InputLabel sx={{ ...queries.medium_text, width: '100%' }}>
          Fecha de envío
          </InputLabel>
          <TextField
            disabled={true}
            value={detallesCorreo.Fecha ? new Date(detallesCorreo.Fecha).toISOString().split("T")[0] : ""}
   
            rows={1}
            multiline
            sx={{ width: "90%", boxShadow: 2 }}
            variant={"filled"}
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
          ></TextField>
        </Grid>
        <Grid item xs={12} sx={{ marginBottom: 6 }} />
        <Grid
              item
              container
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                marginLeft: "2vw", // Adjust this value as needed
              }}
            >
          <InputLabel sx={{ ...queries.medium_text, width: '100%' }}>
          Mensaje
          </InputLabel>
          <TextField
            disabled={true}
            value={detallesCorreo.Mensaje}
              
            rows={6}
            multiline
            sx={{ width: "90%", boxShadow: 2 }}
            variant={"filled"}
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
          ></TextField>
        </Grid>
        </Grid>
      </Grid>

    </Grid>


          


          
        </Grid>
      </Grid>
    
  );
};
