import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <Grid justifyContent={"space-between"}>
      <Grid item xl={12} height={"7vh"}>
        <LateralMenu
          selection={"Configuración"}
          actionNumber={0}
          settingsCard={resetView}
        />
      </Grid>

      {/* <Grid gridArea={"header"} sx={{ height: "8vh" }}>
        <Header
          details={{
            name1: "Inicio",
            path1: "../home",
            name2: "Configuración",
            path2: "../settings",
            name3: "",
          }}
        />
      </Grid> */}

      <Grid
        justifyContent={"center"}
        display={"flex"}
        container
        height={"93vh"}
        alignItems={"center"}
        item
        xl={12}
        lg={12}
        md={12}
        sm={7.5}
        xs={6}
        sx={{ backgroundColor: "white" }}
      >
        {showCards ? (
          <>
            <SettingsCard showConfig={showConfig} />
            {/* <TutorialBox initialState={17} endState={19} /> */}
          </>
        ) : null}

        {!showCards ? (
          <>
            <Catalogos defSelected={optionSelected} />
            {/* <TutorialBox initialState={19} endState={23} /> */}
          </>
        ) : null}
      </Grid>
    </Grid>
  );
};
