import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box } from "@mui/material";
import TabEncabezado, { IEncabezado } from "./TabEncabezado";
import TabFinProposito, { IFin, IProposito } from "./TabFinProposito";
import { IComponente } from "./IComponente";
import { TutorialBox } from "../tutorialBox/tutorialBox";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { TabResumen } from "./TabResumen";
import { TabComponente } from "./TabComponente";
import { TabActividades } from "./TabActividades";

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

  // const handleChange = (event: any, newValue: number) => {
  //   setValue(newValue);
  // };

  const cambiarTab = (option: string) => {
    if (option === "adelante") {
      if (value < 50) setValue(value + 10);
    } else {
      if (value > 10) setValue(value - 10);
    }
  };

  //ENCABEZADO
  const [encabezado, setEncabezado] = useState<Array<IEncabezado>>([]);
  const [cargaFin, setCargaFin] = useState<Array<IFin>>([]);
  const [cargaProposito, setCargaProposito] = useState<Array<IProposito>>([]);

  //FIN / PROPOSITO
  const [fin, setFin] = useState<Array<IFin>>([]);
  const [proposito, setProposito] = useState<Array<IProposito>>([]);

  
  

  // COMPONENTES
  const [noComponentes, setNoComponentes] = React.useState([1, 2]);
  const [valoresComponente, setValoresComponente] = useState<
    Array<IComponente>
  >(
    noComponentes.map((x, index) => {
      return {
        componentes: "C" + (index + 1),
        resumen: "",
        indicador: "",
        frecuencia: "",
        formula: "",
        medios: "",
        supuestos: "",
      };
    })
  );
  

  useEffect(() => {
    let array = noComponentes.map((x, index) => {
      return {
        componentes: "C" + (index + 1),
        resumen: "",
        indicador: "",
        frecuencia: "",
        formula: "",
        medios: "",
        supuestos: "",
      };
    });
    setValoresComponente(array);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ACTIVIDADES
  const [noActividades, setNoActividades] = React.useState([1, 2]);

  const [valoresActividades, setValoresActividades] = useState<
    Array<IActividadesMir>
  >([]);

  const [componenteActividad, setComponenteActividad] = useState([
    {
      componentes: noComponentes.map((x) => noActividades),
    },
  ]);

  const [compAct, setCompAct] = useState<Array<IComponenteActividad>>([]);

  const [cValor, setCValor] = useState(
    componenteActividad.map((item) => {
      return {
        componentes: compAct.map((x, index) => {
          return {
            actividades: x.actividades.map((c, index2) => {
              return {
                actividad: "",
                resumen: "",
                indicador: "",
                formula: "",
                frecuencia: "",
                medios: "",
                supuestos: "",
              };
            }),
          };
        }),
      };
    })
  );

  //----------------------------------------------------------------------------------------------
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
            sx={{
              borderRight: "5px solid #b3afaf",
              color: "black",
              fontFamily: "MontserratBold",
            }}
          />
          <Tab
            label="Fin / Propósito"
            value={20}
            sx={{
              borderRight: "5px solid #b3afaf",
              color: "black",
              fontFamily: "MontserratBold",
            }}
          />
          <Tab
            label="Componentes"
            value={30}
            sx={{
              borderRight: "5px solid #b3afaf",
              color: "black",
              fontFamily: "MontserratBold",
            }}
          />
          <Tab
            label="Actividades"
            value={40}
            sx={{
              borderRight: "5px solid #b3afaf",
              color: "black",
              fontFamily: "MontserratBold",
            }}
          />
          <Tab
            label="Resumen"
            value={50}
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
            anioFiscalEdit={anioFiscalEdit}
            mirEdit={MIR ? JSON.parse(MIR)[1] : null}
            actividadesMir={setValoresActividades}
            compAct={setCompAct}
            show={value === 10 ? true : false}
            resumenEncabezado={setEncabezado}
            cargaFin={setCargaFin}
            cargaProposito={setCargaProposito}
            asignarComponente={setNoComponentes}
            asignarActividad={setNoActividades}
            asignarComponenteValor={setValoresComponente}
            setComponenteActividad={setComponenteActividad}
            MIR={MIR}
          ></TabEncabezado>

          <TabFinProposito
            show={value === 20 ? true : false}
            resumenFin={setFin}
            resumenProposito={setProposito}
            cargaFin={cargaFin}
            cargaProposito={cargaProposito}
            mirEdit={MIR ? JSON.parse(MIR)[1] : null}
          ></TabFinProposito>

          <TabResumen
            showResume={showResume}
            mirEdit={MIR ? JSON.parse(MIR)[1] : null}
            show={value === 50 ? true : false}
            componentes={noComponentes}
            componenteValor={valoresComponente}
            cValor={cValor}
            encabezado={encabezado}
            fin={fin}
            proposito={proposito}
            IdMir={IdMir}
          ></TabResumen>

          <TabComponente
            show={value === 30 ? true : false}
            noComponentesFnc={setNoComponentes}
            valoresComponenteFnc={setValoresComponente}
            noComponentes={noComponentes}
            valoresComponente={valoresComponente}
            mirEdit={MIR ? JSON.parse(MIR)[1] : null}
          ></TabComponente>

          <TabActividades
            actividadesMir={valoresActividades}
            componentesTextos={valoresComponente}
            compAct={compAct}
            show={value === 40 ? true : false}
            componentes={noComponentes}
            asignarCValor={setCValor}
            mirEdit={MIR ? JSON.parse(MIR)[1] : null}
            setActividadesM={() => {}}
            setCompAct={setCompAct}
          ></TabActividades>
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
