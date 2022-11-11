import { Box, Typography, Button } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import {useState, useEffect} from 'react'; 
import Slide from "@mui/material/Slide";
import flecha from '../../assets/img/flecha.png';
import axios from "axios";

export const WelcomeBox = () => {
  const firstSign = localStorage.getItem("FirstSignIn");
    const [welcomeBoxValue, setWelcomeBoxValue] = useState(firstSign);

  const actualizaInicio =() =>{
    axios
    .post(
      process.env.REACT_APP_APPLICATION_BACK + "/api/actualizaPrimerInicio",
      {
        
        IdUsuario: localStorage.getItem("IdUsuario"),
      },
      {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("jwtToken") as string,
        },
      }
    )
    .then((r) => {
      if (r.status === 200) {
        localStorage.setItem("FirstSignIn","0")
        setWelcomeBoxValue("0");
      }
    })
    .catch((error) => {
      
    });
  }
        return (
    <>
        {welcomeBoxValue=="1"?<>
        <Box
        sx={{
          backgroundColor: "#61616199",
          opacity: 10,
          width: "100vw",
          height: "100vh",
          position: "absolute",
          zIndex: 1,
          top: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "whitesmoke",
            width: "35vw",
            height: "25vh",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            flexDirection:"column",
            position: "absolute",
            zIndex: 10,
            top: "23vh",
            right: "14.8vw",
            boxShadow:10,
          }}
        >
          <Box sx={{
            width:"32vw",
            height:"15vh",
            // backgroundColor:"green",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            flexDirection:"column"
          }}>
            <Typography sx={{fontFamily:"MontserratSemiBold", fontSize:"2vw"}}> ¡Hola {localStorage.getItem("NombreUsuario")}!</Typography>
          </Box>
          <Box sx={{
            width:"32vw",
            height:"5vh",
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
          }}>
            <Typography textAlign={"center"} sx={{fontFamily:"MontserratRegular", fontSize:"0.9vw"}}>
              Recuerda que puedes acceder a la sección de ayuda dando click al
              botón de ayuda que esta donde te señala la flecha
            </Typography>
          </Box>
          
                
          <Button sx={{
            backgroundColor: "#c2a37b",
            width: "10vw",
            height: "4vh",
            color: "black",
            fontFamily: "MontserratMedium",
            fontSize: "0.6vw",
            margin:"1vw"
          }}
          onClick={() => actualizaInicio()}
          >CONTINUAR</Button>
          
          
        </Box>
      </Box>

      <Box sx={
       { position:"absolute", right:"1vw", top:"7vh",
        height:"30vh", zIndex:10}
      }>
        <img src={flecha} height="100%" alt="indicador" />
      </Box>
      </>
        :""}
      
    </>
  );
};
