import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabResumenFT from "./TabResumenFT";
import { Grid, IconButton, useMediaQuery } from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { TabActividadesFT } from "./tabActividades";
import { IComponenteActividad } from "../tabsMir/interfaces mir/IMIR";

import {
  ICValorFT,
  IFinFT,
  IPropositoFT,
  IComponentesFT,
  IEncabezadoFT,
} from "./Interfaces";
import { TabEncabezado } from "./TabEncabezado";
import { TabComponenteFT } from "./TabComponentes";
import { TabFinPropositoFT } from "./tabFinProposito";
import { TutorialBox } from "../tutorialBox/tutorialBox";

export default function AddFichaTecnica({
  MIR,
  MA,
  FT,
  showResume,
  IdMir,
  IdMA,
  IdFT,
}: {
  MIR: string;
  MA: string;
  FT: string;
  showResume: Function;
  IdMir: string;
  IdMA: string;
  IdFT: string;
}) {
  const [value, setValue] = React.useState(10);

  const [showMir, setShowMir] = React.useState(false);

  const [showSt, setShowSt] = React.useState("");

  const showMirFnc = (state: boolean) => {
    setShowMir(state);
  };

  const setTxtShowFnc = (st: string) => {
    setShowSt(st);
  };

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
    console.log("hola");
  };

  const cambiarTab = (option: string) => {
    if (option === "adelante") {
      if (value < 50) setValue(value + 10);
    } else {
      if (value > 10) setValue(value - 10);
    }
  };

  const jsonMir = JSON.parse(MIR);

  useEffect(() => {
    let act: number[] = [];
    let comp: string[] = [];
    let ambos: any = [];
    let i = 1;
    let j = 1;

    jsonMir.componentes.map((x: any) => {
      comp.push("C" + j);
      jsonMir.actividades.map((a: any) => {
        if (a.actividad.substring(0, 4) === "A" + i + "C" + j) {
          act.push(i);
          i++;
        }
      });
      ambos.push({ actividades: act, componente: "C" + j });
      act = [];
      i = 1;
      j++;
    });

    setCompAct(ambos);

    jsonMir.componentes.map((value: any, index: number) => {
      if (index > 1 && index < 6)
        setNoComponentes((loadComponentes) => [...loadComponentes, index + 1]);
    });
  }, []);

  ////////////////// Componentes //////////////////////////
  const [noComponentes, setNoComponentes] = React.useState([1, 2]);

  const [valoresComponenteFT, setValoresComponenteFT] = useState<
    Array<IComponentesFT>
  >(
    noComponentes.map((x, index) => {
      return {
        componentes: "C" + (index + 1),
        tipoDeIndicador: "",
        claridad: "",
        relevancia: "",
        economia: "",
        monitoreable: "",
        adecuado: "",
        aporte_marginal: "",
        dimension: "",
        unidadDeMedida: "",
      };
    })
  );

  const valoresComponenteFTFnc = (state: Array<IComponentesFT>) => {
    setValoresComponenteFT(state);
  };
  ////////////////////Actividades/////////////////////////////////
  const [compAct, setCompAct] = useState<Array<IComponenteActividad>>([]);
  const [componenteActividad, setComponenteActividad] = useState([
    {
      componentes: noComponentes.map((x) => [1, 2]),
    },
  ]);

  const [cValorFT, setCValorFT] = useState(
    componenteActividad.map((item) => {
      return {
        componentes: item.componentes.map((x, index) => {
          return {
            actividades: x.map((c, index2) => {
              return {
                actividad: "",
                tipoDeIndicador: "",
                claridad: "",
                relevancia: "",
                economia: "",
                monitoreable: "",
                adecuado: "",
                aporte_marginal: "",
                dimension: "",
                unidadDeMedida: "",
              };
            }),
          };
        }),
      };
    })
  );
  //////////// Actividades/////////////////////7
  const asignarCValorFT = (state: Array<ICValorFT>) => {
    setCValorFT(state);
  };

  useEffect(() => {
    let arrayFT = noComponentes.map((x, index) => {
      return {
        componentes: "C" + (index + 1),
        tipoDeIndicador: "",
        claridad: "",
        relevancia: "",
        economia: "",
        monitoreable: "",
        adecuado: "",
        aporte_marginal: "",
        dimension: "",
        unidadDeMedida: "",
      };
    });
    setValoresComponenteFT(arrayFT);
  }, []);

  const [ValueEncabezado, setValueEncabezado] = useState<Array<IEncabezadoFT>>(
    []
  );

  const [ValueFin, setValueFin] = useState<Array<IFinFT>>([]);

  const [ValueProposito, setValueProposito] = useState<Array<IPropositoFT>>([]);

  const resumenEncabezadoFT = (st: Array<IEncabezadoFT>) => {
    setValueEncabezado(st);
  };

  const resumenFinFT = (st: Array<IFinFT>) => {
    setValueFin(st);
  };

  const resumenPropositoFT = (st: Array<IPropositoFT>) => {
    setValueProposito(st);
  };

  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 500px)"),

    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 600px)"),
  };

  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        height: "100%",
      }}
    >
      {/* {value === 10 ? <TutorialBox initialState={49} endState={50} /> : null}
      {value === 20 ? <TutorialBox initialState={50} endState={51} /> : null}
      {value === 30 ? <TutorialBox initialState={51} endState={52} /> : null}
      {value === 40 ? <TutorialBox initialState={52} endState={53} /> : null}
      {value === 50 ? <TutorialBox initialState={53} endState={56} /> : null} */}
      <Grid
        sx={{
          //width: "93vw",
          width: ["300xp", "750px", "750px", "1100px", "1200px"],
          height: "82vh",

          borderRadius: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          variant={query.isScrollable ? "scrollable" : "standard"}
            // centered={query.isScrollable ? false : true}
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              backgroundColor: "#e0e0e0",
              borderRadius: "10px 10px 0 0",
              GridShadow: 20,
              width: ["300px", "628px", "900px", "1120px", "1250px", "1450px"],
              //height: ["30px", "20px", "30px", "40px", "50px"],
            }}
        >
          <Tab
            label={<ArrowCircleLeftIcon></ArrowCircleLeftIcon>}
            sx={{
              borderRight: "5px solid #b3afaf",
              color: "#af8c55",
              fontFamily: "MontserratSemiBold",
              backgroundColor: "#ccc",
              width: ["0px", "65px", "130px", "160px", "175px"],
              display: ["none", "block", "block", "block"], // Oculta el Tab en pantallas más pequeñas
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
              width: ["15px", "65px", "130px", "160px", "180px"],
              fontSize: [8, 10, 13, 14, 15, 18], // Tamaños de fuente para diferentes breakpoints
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
              width: ["15px", "65px", "130px", "160px", "180px"],
              fontSize: [8, 10, 13, 14, 15, 18], // Tamaños de fuente para diferentes breakpoints
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
              width: ["15px", "65px", "130px", "160px", "180px"],
              fontSize: [8, 10, 13, 14, 15, 18], // Tamaños de fuente para diferentes breakpoints
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
              width: ["15px", "65px", "130px", "160px", "180px"],
              fontSize: [8, 10, 13, 14, 15, 18], // Tamaños de fuente para diferentes breakpoints
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
              width: ["15px", "65px", "130px", "160px", "180px"],
              fontSize: [8, 10, 13, 14, 15, 18], // Tamaños de fuente para diferentes breakpoints
            }}
          />
          <Tab
            label={<ArrowCircleRightIcon></ArrowCircleRightIcon>}
            sx={{
              //borderRight: "5px solid #b3afaf",
              color: "#af8c55",
              backgroundColor: "#ccc",
              width: ["0px", "65px", "130px", "160px", "175px"],
              display: ["none", "block", "block", "block"], // Oculta el Tab en pantallas más pequeñas
            }}
            onClick={() => {
              cambiarTab("adelante");
            }}
          />
        </Tabs>

        <Grid
          sx={{
            width: "93vw",
            height: "82vh",
          }}
        >
          <TabEncabezado
            show={value === 10 ? true : false}
            resumenEncabezadoFT={resumenEncabezadoFT}
            FT={FT}
            MIR={MIR}
          ></TabEncabezado>

          <TabFinPropositoFT
            show={value === 20 ? true : false}
            resumenFinFT={resumenFinFT}
            resumenPropositoFT={resumenPropositoFT}
            FT={FT}
          ></TabFinPropositoFT>

          <TabComponenteFT
            show={value === 30 ? true : false}
            valoresComponenteFTFnc={valoresComponenteFTFnc}
            noComponentes={noComponentes}
            showFnc={setTxtShowFnc}
            showMirFnc={showMirFnc}
            FT={FT}
          ></TabComponenteFT>

          <TabActividadesFT
            show={value === 40 ? true : false}
            setTxtShowFnc={setTxtShowFnc}
            showMirFnc={showMirFnc}
            compAct={compAct}
            componentes={noComponentes}
            asignarCValor={asignarCValorFT}
            FT={FT}
          ></TabActividadesFT>

          <TabResumenFT
            show={value === 50 ? true : false}
            encabezado={ValueEncabezado}
            fin={ValueFin}
            proposito={ValueProposito}
            componentes={noComponentes}
            componenteValor={valoresComponenteFT}
            cValor={cValorFT}
            IdMir={IdMir}
            IdFT={IdFT}
            IdMA={IdMA}
            showResume={showResume}
            MIR={MIR}
          ></TabResumenFT>
        </Grid>
      </Grid>
    </Grid>
  );
}
