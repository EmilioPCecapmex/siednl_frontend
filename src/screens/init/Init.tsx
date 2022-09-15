import React, {useEffect} from "react";
import { Box } from "@mui/material";
import escudo from "../../assets/logos/escudo.png";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export const Init = () => {
    const navigate = useNavigate();


    const params = new URLSearchParams(useLocation().search);

    useEffect(() => {
        localStorage.setItem("jwt", params.get('jwt') || "")
        if(params.get('jwt') != ''){
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
      }}
    >
      <img src={escudo} alt="Escudo" style={{ width: "20vw" }} />
    </Box>
  );
};
