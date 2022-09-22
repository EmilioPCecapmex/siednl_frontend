import React, { useLayoutEffect } from "react";
import { Box } from "@mui/material";
import escudo from "../../assets/logos/escudo.png";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { continueSession, sessionValid } from "../../funcs/validation";

export const Init = () => {
  const navigate = useNavigate();


  useLayoutEffect(() => {
    continueSession().then((r) => {
      if ((r as boolean) === true) {
        navigate("../home");
      } else if (r as boolean === false) {
        window.location.assign("http://login.com");
      }
    });
  }, [])


  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <img src={escudo} alt="Escudo" style={{ width: "20vw" }} />
    </Box>
  );
};
