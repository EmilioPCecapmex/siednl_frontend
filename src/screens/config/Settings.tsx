import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { LateralMenu } from "../../components/lateralMenu/LateralMenu";
import { Header } from "../../components/header/Header";
import { SettingsCard } from "../../components/settings/SettingsCard";
import { Catalogos } from "../../components/catalogos/Catalogos";
import { useNavigate } from "react-router-dom";
import { TutorialBox } from "../../components/tutorialBox/tutorialBox";

export const Settings = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("Rol") !== "Administrador") {
      navigate("../home");
    }
  }, []);

  const [showCards, setShowCards] = useState(true);
  const [optionSelected, setOptionSelected] = useState("");

  const showConfig = (selected: string) => {
    setOptionSelected(selected);
    setShowCards(false);
  };

  const resetView = () => {
    setShowCards(true);
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 13fr",
        backgroundColor: "#F2F2F2",
      }}
    >

      <LateralMenu selection={6} settingsCard={resetView} />
      <Header
        details={{
          name1: "Inicio",
          path1: "../home",
          name2: "Configuración",
          path2: "../settings",
          name3: "",
        }}
      />

      <Box>
        {showCards ? (

          <>
          
        <SettingsCard showConfig={showConfig} />
        <TutorialBox initialState={17} endState={19} />

          </>


        ) : null}

        {!showCards ? (
        <>
        <Catalogos defSelected={optionSelected} />
        <TutorialBox initialState={19} endState={23} />

        </>
        ) : null}
      </Box>
    </Box>
  );
};
