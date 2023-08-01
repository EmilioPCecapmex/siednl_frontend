import { Tabs, Tab, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { TabComponenteRf } from "./TabComponentesRf";
import { TabActividadRf } from "./TabsActividadesRf";
import { IComponenteMA, ICValorMA, IComponenteRF } from "./Interfaces";
import { IComponenteActividad } from "../tabsMir/AddMir";
import TabResumenMIR from "../modalsRF/ModalResumenMir";
import { TabFinPropositoRF } from "./TabFinPropositoRf";
import { TabAvanceFinanciero } from "./TabAvanceFinanciero";
import { TabResumenRF } from "./TabResumenRF";
import { IAvanceFinancieroRF } from "../../screens/raffi/interfacesRaffi";
export default function CapturaRaffi({
  MIR,
  MA,
  RF,
  showResume,
  IdMir,
  IdMA,
}: {
  MIR: string;
  MA: string;
  RF: string;
  showResume: Function;
  IdMir: string;
  IdMA: string;
}{
  MIR,
  MA,
  RF,
  opentabs,
  IdMir,
  IdMA,
  IdRf,
}:{
  MIR: string;
  MA: string;
  RF: string;
  opentabs: Function;
  IdMir: string;
  IdMA: string;
  IdRf: string;
}) {
  const [value, setValue] = useState(10);
  const [compAct, setCompAct] = useState<Array<IComponenteActividad>>([]);
  const cambiarTab = (option: string) => {
    if (option === "adelante") {
      if (value < 50) setValue(value + 10);
    } else {
      if (value > 10) setValue(value - 10);
    }
  };

  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
      }}
    >
      <Grid
        item
        sx={{
          width: "auto",
          height: "90vh",
          borderRadius: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Tabs
          value={value}
          textColor="inherit"
          sx={{
            backgroundColor: "#e0e0e0",
            borderRadius: "10px 10px 0 0",
            boxShadow: 20,
          }}
        >
          <Tab
            label={<ArrowCircleLeftIcon></ArrowCircleLeftIcon>}
            sx={{
              borderRight: "5px solid #b3afaf",
              color: "#af8c55",
              fontFamily: "MontserratSemiBold",
              backgroundColor: "#ccc",
            }}
            onClick={() => {
              cambiarTab("atras");
            }}
          />
          <Tab
            label="Avance Financiero"
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
            label="Fin/Proposito"
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
            label="Componentes"
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
            label="Actividades"
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
              backgroundColor: "#ccc",
            }}
            onClick={() => {
              cambiarTab("adelante");
            }}
          />
        </Tabs>

        <Grid
          container
          item
            
          sx={{
            display: "flex",
            width: "75vw",
            height: "75vh",
            boxShadow: 10,
            borderRadius: 5,
            flexDirection: "column",
            backgroundColor: "#fff",
          }}
        >
          {value === 10 && <TabComponenteRf 
            
            valoresComponenteMAFnc={valoresComponenteRFFnc}
            noComponentes={noComponentes}
            MA={MA}
            MIR={MIR}
            RF={RF}
            setTxtShowFnc={showFnc}
            showMirFnc={showMirFnc} />}

          {value === 20 && <TabActividadRf 

          valoresComponenteMAFnc={valoresComponenteMAFnc}
          componentes={noComponentes}
          asignarCValor={asignarCValorMA}
          MA={MA}
          MIR={MIR} 
          RF={RF}
          compAct={compAct}
          setTxtShowFnc={showFnc}
            showMirFnc={showMirFnc} />}
          
          
        </Grid>
      </Grid>
      <TabResumenMIR
            show={showMir}
            showMirFnc={showMirFnc}
            showSt={showSt}
            MIR={MIR}
            noComponentes={noComponentes}
          ></TabResumenMIR>
    </Grid>
    
  );
}
