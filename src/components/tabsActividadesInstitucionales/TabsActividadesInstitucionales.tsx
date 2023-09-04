import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Grid } from "@mui/material";

import TabAccion1 from "./TabAccion1";
import TabAccion2 from "./TabAccion2";
import TabIdentificacion from "./TabIdentificacion";
import { TabResumen } from "./TabResumen";
import TabAvance from "./TabAvance";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

const newAI ={}
export default function TabsActividadesInstitucionales({
  returnMain,
  MIR,
  FT,
  AI,
  opentabs,
  IdMir,
  IdFT,
  IdAI,  
}: {
  MIR: string;
  FT: string;
  AI: string;
  opentabs: Function;
  IdMir: string;
  IdFT: string;
  IdAI: string;
  returnMain: Function;

  
}) {
  const [value, setValue] = React.useState(10);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };
  const jsonMir = JSON.parse(MIR);

  const cambiarTab = (option: string) => {
    if (option === "adelante") {
      if (value < 50) setValue(value + 10);
    } else {
      if (value > 10) setValue(value - 10);
    }
  };

  //----------------------------------------------------------------------------------------------
  return (
    <Grid
      // sx={{
      //   display: "flex",
      //   justifyContent: "space-evenly",
      //   width: "100%",
      //   height: "92%",
      //   mt: "8vh",
      // }}
      container
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
      }}
    >
      <Grid
        sx={{
          width: "80vw",
          height: "86vh",
          borderRadius: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        //lg={12}
      >
        <Grid>
          <Tabs
            value={value}
            //onChange={handleChange}
            textColor="inherit"
            sx={{
              backgroundColor: "#e0e0e0",
              borderRadius: "10px 10px 0 0",
              boxShadow: 20,
            }}
          >
            <Tab
              label={<ArrowCircleLeftIcon></ArrowCircleLeftIcon>}
              onClick={() => {
                cambiarTab("atras");
              }}
              sx={{
                borderRight: "5px solid #b3afaf",
                color: "#af8c55",
                fontFamily: "MontserratSemiBold",
                backgroundColor: "#e0e0e0",
              }}
            />
            <Tab
              label="Identificacion"
              value={10}
              onClick={() => {
                setValue(10);
              }}
              sx={{
                borderRight: "5px solid #b3afaf",
                color: "black",
                fontFamily: "MontserratBold",
              }}
            />
            <Tab
              label="Accion 1"
              value={20}
              onClick={() => {
                setValue(20);
              }}
              sx={{
                borderRight: "5px solid #b3afaf",
                color: "black",
                fontFamily: "MontserratBold",
              }}
            />
            <Tab
              label="Accion 2"
              value={30}
              onClick={() => {
                setValue(30);
              }}
              sx={{
                borderRight: "5px solid #b3afaf",
                color: "black",
                fontFamily: "MontserratBold",
              }}
            />
            <Tab
              label="Avance fisico finaciero"
              value={40}
              onClick={() => {
                setValue(40);
              }}
              sx={{
                borderRight: "5px solid #b3afaf",
                color: "black",
                fontFamily: "MontserratBold",
              }}
            />
            <Tab
              label="Resumen"
              value={50}
              onClick={() => {
                setValue(50);
              }}
              sx={{
                borderRight: "5px solid #b3afaf",
                color: "black",
                fontFamily: "MontserratBold",
              }}
            />
            <Tab
              label={<ArrowCircleRightIcon></ArrowCircleRightIcon>}
              sx={{
                borderRight: "5px solid #b3afaf",
                color: "#af8c55",
                backgroundColor: "#e0e0e0",
              }}
              onClick={() => {
                cambiarTab("adelante");
              }}
            />
          </Tabs>
        </Grid>

        <Grid
          container
          item
          sx={{
            display: "flex",
            width: "93vw",
            height: "82vh",
            boxShadow: 10,
            borderRadius: 5,
            flexDirection: "column",
            backgroundColor: "#fff",
          }}
        >
          {/* tabs */}
          {value === 10 && (<TabIdentificacion  />)}
          {value === 20 && (<TabAccion1 />)}
          {value === 30 && (<TabAccion2 />)}
          {value === 40 && <TabAvance />}
          {value === 50 && <TabResumen showResume={returnMain}/>}

          
        </Grid>
      </Grid>
    </Grid>
  );
}
