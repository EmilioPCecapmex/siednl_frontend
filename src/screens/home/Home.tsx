import React from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { Header } from "../../components/header/Header";
import { LateralMenu } from "../../components/lateralMenu/LateralMenu";
import escudo from "../../assets/logos/escudo.png";

export const Home = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 10fr",
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
          width: "100%",
          height: "100%",
        }}
      >
        <Box>
          <img src={escudo} alt="Escudo" style={{ width: "20vw" }} />
        </Box>
      </Box>
    </Box>
  );
};
