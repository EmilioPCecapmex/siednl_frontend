import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box, IconButton } from "@mui/material";
import TabEncabezado, { IEncabezado } from "./TabEncabezado";
import { TabComponente } from "./TabComponente";
import TabFinProposito, { IFin, IProposito } from "./TabFinProposito";
import { TabActividades } from "./TabActividades";
import { IComponente } from "./IComponente";
import { ICValor } from "./ICValor";
import { TabResumen2 } from "./TabResumen2";
import { TutorialBox } from "../tutorialBox/tutorialBox";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import IconButton from "@mui/material/IconButton";
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

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  const [compAct, setCompAct] = useState<Array<IComponenteActividad>>([]);
  const [actividadesMir, setActividadesMir] = useState<Array<IActividadesMir>>(
    []
  );

  // business logic-------------------------------------------------------------------------------
  const [noComponentes, setNoComponentes] = React.useState([1, 2]);

  const noComponentesFnc = (state: []) => {
    setNoComponentes(state);
  };

  const [componenteValor, setComponenteValor] = useState<Array<IComponente>>(
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

  const valoresComponenteFnc = (state: Array<IComponente>) => {
    setComponenteValor(state);
  };

  const cambiarTab = (option: string) => {
    if (option === "adelante") {
      if (value < 50) setValue(value + 10);
    } else {
      if (value > 10) setValue(value - 10);
    }
  };

  const [actividades, setActividades] = React.useState([1, 2]);
  const [componenteActividad, setComponenteActividad] = useState([
    {
      componentes: noComponentes.map((x) => actividades),
    },
  ]);

  const [cValor, setCValor] = useState(
    componenteActividad.map((item) => {
      return {
        componentes: item.componentes.map((x, index) => {
          return {
            actividades: x.map((c, index2) => {
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

  const asignarActividadesM = (state: number[]) => {
    setActividades(state);
  };

  const asignarComponenteActividadM = (
    state: { componentes: number[][] }[]
  ) => {
    setComponenteActividad(state);
  };

  const asignarCValor = (state: Array<ICValor>) => {
    setCValor(state);
  };

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
    setComponenteValor(array);
  }, []);

  const [encabezado, setEncabezado] = useState<Array<IEncabezado>>([]);
  const [fin, setFin] = useState<Array<IFin>>([]);
  const [proposito, setProposito] = useState<Array<IProposito>>([]);
  const [cargaFin, setCargaFin] = useState<Array<IFin>>([]);
  const [cargaProposito, setCargaProposito] = useState<Array<IProposito>>([]);

  const resumenEncabezado = (arr: Array<IEncabezado>) => {
    setEncabezado(arr);
  };
  const resumenFin = (arr: Array<IFin>) => {
    setFin(arr);
  };
  const resumenProposito = (arr: Array<IProposito>) => {
    setProposito(arr);
  };
  const loadFin = (arr: Array<IFin>) => {
    setCargaFin(arr);
  };
  const loadProposito = (arr: Array<IProposito>) => {
    setCargaProposito(arr);
  };

  //----------------------------------------------------------------------------------------------
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        width: "100%",
        height: "100%",
        mt: "8vh",
      }}
    >
      {value === 10 ? <TutorialBox initialState={22} endState={27} /> : null}
      {value === 20 ? <TutorialBox initialState={27} endState={28} /> : null}
      {value === 30 ? <TutorialBox initialState={28} endState={29} /> : null}
      {value === 50 ? <TutorialBox initialState={29} endState={32} /> : null}

      <Box
        sx={{
          width: "80vw",
          height: "86vh",
          borderRadius: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="inherit"
            sx={{
              backgroundColor: "#fff",
              borderRadius: "10px 10px 0 0",
              boxShadow: 20,
            }}
          >
            <Tab
              label="Encabezado"
              value={10}
              sx={{
                borderRight: "5px solid #b3afaf",
                color: "black",
                fontFamily: "MontserratBold",
                backgroundColor: "#ccc",
              }}
            />
            <Tab
              label="Fin / Propósito"
              value={20}
              sx={{
                borderRight: "5px solid #b3afaf",
                color: "black",
                fontFamily: "MontserratBold",
                backgroundColor: "#ccc",
              }}
            />
            <Tab
              label="Componentes"
              value={30}
              sx={{
                borderRight: "5px solid #b3afaf",
                color: "black",
                fontFamily: "MontserratBold",
                backgroundColor: "#ccc",
              }}
            />
            <Tab
              label="Actividades"
              value={40}
              sx={{
                borderRight: "5px solid #b3afaf",
                color: "black",
                fontFamily: "MontserratBold",
                backgroundColor: "#ccc",
              }}
            />
            <Tab
              label="Resumen"
              value={50}
              sx={{
                color: "black",
                fontFamily: "MontserratBold",
                backgroundColor: "#ccc",
              }}
            />
          </Tabs>
        </Box>

        <Box
          sx={{
            width: "75vw",
            height: "77vh",
          }}
        >
          <TabEncabezado
            anioFiscalEdit={anioFiscalEdit}
            mirEdit={MIR ? JSON.parse(MIR)[1] : null}
            actividadesMir={setActividadesMir}
            compAct={setCompAct}
            show={value === 10 ? true : false}
            resumenEncabezado={resumenEncabezado}
            cargaFin={loadFin}
            cargaProposito={loadProposito}
            asignarComponente={noComponentesFnc}
            asignarComponenteValor={valoresComponenteFnc}
            MIR={MIR}
          ></TabEncabezado>

          <TabFinProposito
            show={value === 20 ? true : false}
            resumenFin={resumenFin}
            resumenProposito={resumenProposito}
            cargaFin={cargaFin}
            cargaProposito={cargaProposito}
            mirEdit={MIR ? JSON.parse(MIR)[1] : null}
          ></TabFinProposito>

          <TabResumen2
            showResume={showResume}
            mirEdit={MIR ? JSON.parse(MIR)[1] : null}
            show={value === 50 ? true : false}
            componentes={noComponentes}
            componenteValor={componenteValor}
            cValor={cValor}
            encabezado={encabezado}
            fin={fin}
            proposito={proposito}
            IdMir={IdMir}
          ></TabResumen2>

          <TabComponente
            show={value === 30 ? true : false}
            noComponentesFnc={noComponentesFnc}
            valoresComponenteFnc={valoresComponenteFnc}
            noComponentes={noComponentes}
            valoresComponente={componenteValor}
            mirEdit={MIR ? JSON.parse(MIR)[1] : null}
          ></TabComponente>

          <TabActividades
            actividadesMir={actividadesMir}
            componentesTextos={componenteValor}
            compAct={compAct}
            show={value === 40 ? true : false}
            componentes={noComponentes}
            asignarCValor={asignarCValor}
            mirEdit={MIR ? JSON.parse(MIR)[1] : null}
          ></TabActividades>
        </Box>
        <Box
          sx={{
            width: "30%",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={() => {
              cambiarTab("atras");
            }}
          >
            <ArrowCircleLeftIcon
              fontSize="large"
              sx={{
                color: "#c4a57b",
              }}
            />
          </IconButton>

          <IconButton
            onClick={() => {
              cambiarTab("adelante");
            }}
          >
            <ArrowCircleRightIcon
            fontSize="large"
              sx={{
                color: "#c4a57b",
              }}
            />
          </IconButton>

         
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
