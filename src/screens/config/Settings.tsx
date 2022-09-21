import React from "react";
import Box from "@mui/material/Box";
import { LateralMenu } from "../../components/lateralMenu/LateralMenu";
import { Header } from "../../components/header/Header";
import { SettingsCard } from "../../components/settings/SettingsCard";
export const Settings = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        backgroundColor: "#F2F2F2",
      }}
    >
      <LateralMenu selection={6} />
      <Header
        details={{
          name1: "Inicio",
          path1: "./home",
          name2: "Configuración",
          path2: "./settings",
          name3: "",
        }}
      />
      <SettingsCard/>
     
    </Box>
    
  );
};
