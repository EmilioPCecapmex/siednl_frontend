import { Grid } from "@mui/material";
import { LateralMenu } from "../../components/lateralMenu/LateralMenu";
//import { useNavigate } from "react-router-dom";
//import { Header } from "../../components/header/Header";
import React, { useState } from "react";
import CapturaPAE from "../../components/tabsPAE/CapturaPAE";

export const ProgramaAnualEvaluacion = () => {
  //const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [actionNumber, setActionNumber] = useState(0);
  

  return (
    <Grid container justifyContent={"space-between"}>
      <Grid
        item
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        sx={{ height: "7vh", whitespace: "nowrap" }}
        //</Grid>sx={{ mr: showResume ? 5 : 0 }}
      >
        <LateralMenu selection={"PAE"} actionNumber={actionNumber} />
      </Grid>

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
        sm={12}
        xs={12}
       // sx={{ backgroundColor: "white" }}
      >
       
        <Grid
          item
          xl={10}
          lg={10}
          md={10}
          sm={10}
          xs={10}
          sx={{
            backgroundColor: "#FFFF",
            borderRadius: 5,
            boxShadow: 5,
            height: "92vh",
            direction: "row",
          }}
         // gridArea={"main"}
        >
          <CapturaPAE />
        </Grid>
      </Grid>
    </Grid>
  );
};
