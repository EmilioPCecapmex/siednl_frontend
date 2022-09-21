import React, {useEffect} from "react";
import { Box, Button } from "@mui/material";
import escudo from "../../assets/logos/escudo.png";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { sessionValid } from "../../funcs/validation";


export const Init = () => {
    const navigate = useNavigate();


    const params = new URLSearchParams(useLocation().search);

    useEffect(() => {
      const jt = params.get('jwt');
        if(params.get('jwt') != null){
          sessionValid(jt || "")
            navigate('../home')
        }
    }, [params])
    
    
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        flexDirection: 'column'
      }}
    >
      <img src={escudo} alt="Escudo" style={{ width: "20vw" }} />
      <Button variant="contained" sx={{mt: '2vh', backgroundColor: '#ccc'}}>
        Iniciar Sesión
      </Button>
    </Box>
  );
};
