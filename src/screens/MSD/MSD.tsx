import {
  
  Grid,
  
} from "@mui/material";
import {
  LateralMenu,

} from "../../components/lateralMenu/LateralMenu";
//import { useNavigate } from "react-router-dom";
//import { Header } from "../../components/header/Header";
import React, { useState } from "react";
import CapturaMSD from "../../components/tabsMSD/CapturaMSD";
            
export const MSD = () => {
  //const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [actionNumber, setActionNumber] = useState(0);


  return (
    <Grid container justifyContent={"space-between"}>
      <Grid
       item
       xl={12}
       height={"7vh"}
        //</Grid>sx={{ mr: showResume ? 5 : 0 }}
      >
        <LateralMenu
          selection={"MSD"}
          actionNumber={actionNumber}
          restore={() =>{}}
          
        />
      </Grid>

      <Grid justifyContent={"center"}
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
        sx={{ backgroundColor: "white", }}
      >
      
      <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "center",
              height: "92vh",
            }}
            gridArea={"main"}
          >
            <CapturaMSD />
          </Grid>
    </Grid>
    </Grid>
  );
};
