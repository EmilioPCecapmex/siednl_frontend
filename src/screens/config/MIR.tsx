import React, { useState } from "react";
import Box from "@mui/material/Box";
import { LateralMenu } from "../../components/lateralMenu/LateralMenu";
import { Header } from "../../components/header/Header";
import { SettingsCard } from "../../components/settings/SettingsCard";
import {Catalogos} from "../../components/catalogos/Catalogos";


export const MIR = () => {


  const [showCards, setShowCards] = useState(true);


  const resetView = () => {
    setShowCards(true);
  }

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        backgroundColor: "#F2F2F2",
      }}
    >
      <LateralMenu selection={2} settingsCard={resetView} />
      <Header
        
        details={{
          name1: "Inicio",
          path1: "../home",
          name2: "MIR",
          path2: "../MIR",
          name3: "",
        }}
      />
    </Box>
    
  );
};
