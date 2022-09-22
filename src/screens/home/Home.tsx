import React, { useState } from "react";
import { Box } from "@mui/material";
import { Header } from "../../components/header/Header";
import { LateralMenu } from "../../components/lateralMenu/LateralMenu";
import escudo from "../../assets/logos/escudo.png";
import { sessionUntil } from "../../funcs/validation";

export const Home = () => {

 


  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        backgroundColor: "#F2F2F2",
      }}
    >
      <LateralMenu selection={0} />
      <Header
        details={{
          name1: "Inicio",
          path1: "/",
          name2: "",
          path2: "#",
          name3: "",
        }}
      />
    
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "87%",
          height: "92%",
          mt: "8vh",
          flexDirection: 'column'
        }}
      >
   
        <img src={escudo} alt="Escudo" style={{ width: "20vw" }} />
      </Box>
    </Box>
  );
};
