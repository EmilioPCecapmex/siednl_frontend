import {
  Button,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LateralMenu } from "../../components/lateralMenu/LateralMenu";
import React, { useEffect, useState } from "react";
import { Header } from "../../components/header/Header";
import CapturaRaffi from "../../components/tabsRaffi/CapturaRaffi";

export const Raffi = () => {
 
  const [actionNumber, setActionNumber] = useState(0);

  const [opentabs, setOpenTabs] = useState(false);

  return (
    <Grid container display="flex">
    <Grid item height={"100vh"}>
        <LateralMenu selection={"Raffi"} actionNumber={actionNumber} />
    </Grid>
      
        
      <Grid item sx={{ backgroundColor: "#F2F2F2", flexGrow: 1 }}>

        <Grid sx={{ width: "80%", height: "8vh", marginLeft: "4vw" }}>
          <Header
            details={{
              name1: "Inicio",
              path1: "../home",
              name2: "Raffi",
              path2: "../raffi",
              name3: "",
            }}
          />

        </Grid>

        <Grid item sx ={{display: "flex",  justifyContent: "center"}}>
            {!opentabs && (
              <Grid>
                <Button
                  onClick={() => {
                    setOpenTabs(true);
                  }}
                >
                  Ir a tabs
                </Button>
              </Grid>
            )}
            {opentabs && <CapturaRaffi />}
          </Grid>

      </Grid>
    </Grid>
  );
};
