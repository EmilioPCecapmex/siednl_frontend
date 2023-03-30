import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box } from "@mui/material";
import TabEncabezado, { IEncabezado } from "./TabEncabezado";
import { TutorialBox } from "../tutorialBox/tutorialBox";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { IMIR } from "./IMIR";
import TabResumen from "./TabResumen";

export default function FullModalMir({
  MIR,
  showResume,
  IdMir,
  anioFiscalEdit,
}: {
  MIR: string;
  showResume: Function;
  IdMir: string;
  anioFiscalEdit: string;
}) {
  const [value, setValue] = React.useState(10);

  let mir: IMIR = MIR !== "" ? JSON.parse(MIR) : {};

  const cambiarTab = (option: string) => {
    if (option === "adelante") {
      if (value < 50) setValue(value + 10);
    } else {
      if (value > 10) setValue(value - 10);
    }
  };

  const [MIRPADRE, setMIRPADRE] = useState<IMIR>(mir);

  //ENCABEZADO
  const [encabezado, setEncabezado] = useState<IEncabezado>(mir.encabezado);

  useEffect(() => {
    setMIRPADRE((MIRPADRE) => ({ ...MIRPADRE, ...{ encabezado: encabezado } }));
  }, [encabezado]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
      }}
    >
      {value === 10 ? <TutorialBox initialState={22} endState={27} /> : null}
      {value === 20 ? <TutorialBox initialState={27} endState={28} /> : null}
      {value === 30 ? <TutorialBox initialState={28} endState={30} /> : null}
      {value === 40 ? <TutorialBox initialState={33} endState={35} /> : null}
      {value === 50 ? <TutorialBox initialState={30} endState={33} /> : null}

      <Box
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
            label="Encabezado"
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
            label="Fin / Propósito"
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

        <Box
          sx={{
            width: "75vw",
            height: "77vh",
          }}
        >
          <TabEncabezado
            show={value === 10 ? true : false}
            MIR={MIRPADRE}
            setMIR={setMIRPADRE}
            setEncabezado={setEncabezado}
          ></TabEncabezado>

          {/* <TabFinProposito
            show={value === 20 ? true : false}
            resumenFin={setFin}
            resumenProposito={setProposito}
            cargaFin={cargaFin}
            cargaProposito={cargaProposito}
            mirEdit={MIR ? JSON.parse(MIR)[1] : null}
          ></TabFinProposito> */}

          <TabResumen
            showResume={showResume}
            // mirEdit={MIR ? JSON.parse(MIR)[1] : null}
            show={value === 50 ? true : false}
            MIRPADRE={MIRPADRE}
            // componentes={noComponentes}
            // componenteValor={valoresComponente}
            // cValor={cValor}
            // encabezado={encabezado}
            // fin={fin}
            // proposito={proposito}
            // IdMir={IdMir}
          ></TabResumen>

          {/* <TabComponente
            show={value === 30 ? true : false}
            noComponentesFnc={setNoComponentes}
            valoresComponenteFnc={setValoresComponente}
            noComponentes={noComponentes}
            valoresComponente={valoresComponente}
            mirEdit={MIR ? JSON.parse(MIR)[1] : null}
          ></TabComponente> */}

          {/* <TabActividades
            actividadesMir={valoresActividades}
            componentesTextos={valoresComponente}
            compAct={compAct}
            show={value === 40 ? true : false}
            componentes={noComponentes}
            asignarCValor={setCValor}
            mirEdit={MIR ? JSON.parse(MIR)[1] : null}
            setActividadesM={() => {}}
            setCompAct={setCompAct}
          ></TabActividades> */}
        </Box>
      </Box>
    </Box>
  );
}

export interface IComponenteActividad {
  actividades: number[];
  componente: string;
}

export interface IActividadesMir {
  actividad: string;
  formula: string;
  frecuencia: string;
  indicador: string;
  medios: string;
  resumen: string;
  supuestos: string;
}
