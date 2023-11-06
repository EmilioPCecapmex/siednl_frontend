/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { TabFinPropositoMA } from "./TabFinPropositoMA";
import { Grid, useMediaQuery } from "@mui/material";
import { TabComponenteMA } from "./TabComponente";
import { TabActividadesMA } from "./TabActividades";
import { IFinMA, IPropositoMA } from "./IFin";
import { IComponenteMA, ICValorMA } from "./Interfaces";
import TabResumenMA from "./TabResumenMA";
import { IComponenteActividad } from "../tabsMir/interfaces mir/IMIR";
import TabResumenMIR from "../modalsMA/ModalResumenMA";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

 export function newActividad(indexComponente: number, indexActividad: number) {
  return {
    actividad: `A${indexActividad}C${indexComponente}`,
    metaAnual: "",
    lineaBase: "",
    metasPorFrecuencia: [
      {
        semestre1: "",
        semestre2: "",
        trimestre1: "",
        trimestre2: "",
        trimestre3: "",
        trimestre4: "",
      },
    ],
    valorNumerador: "",
    valorDenominador: "",
    sentidoDelIndicador: "",
    unidadResponsable: "",
    descIndicador: "",
    descNumerador: "",
    descDenominador: "",
  };
}

export function newComponente(index: number) {
  let componente: IComponenteMA;
  componente = {
    componentes: "C" + (index + 1),
    metaAnual: "",
    lineaBase: "",
    metasPorFrecuencia: [
      {
        semestre1: "",
        semestre2: "",
        trimestre1: "",
        trimestre2: "",
        trimestre3: "",
        trimestre4: "",
      },
    ],
    valorNumerador: "",
    valorDenominador: "",
    sentidoDelIndicador: "",
    unidadResponsable: "",
    descIndicador: "",
    descNumerador: "",
    descDenominador: "",
    actividades: [1, 2].map((item) => newActividad(index, item)),
  };
  return componente;
}

export default function AddMetaAnual({
  MIR,
  MA,
  showResume,
  IdMir,
  IdMA,
}: {
  MIR: string;
  MA: string;
  showResume: Function;
  IdMir: string;
  IdMA: string;
}) {
  const [value, setValue] = React.useState(20);

  const [showMir, setShowMir] = React.useState(false);

  const [showSt, setShowSt] = React.useState("");

  const showMirFnc = (state: boolean) => {
    setShowMir(state);
  };

  const showFnc = (st: string) => {
    setShowSt(st);
  };

  const cambiarTab = (option: string) => {
    if (option === "adelante") {
      if (value < 50) setValue(value + 10);
    } else {
      if (value > 20) setValue(value - 10);
    }
  };

  const jsonMir = JSON.parse(MIR);

  // useEffect(() => {
  //   let act: number[] = [];
  //   let comp: string[] = [];
  //   let ambos: any = [];
  //   let i = 1;
  //   let j = 1;

  //   jsonMir.componentes.map((x: any) => {
  //     comp.push("C" + j);
  //     jsonMir.actividades.map((a: any) => {
  //       if (a.actividad.substring(0, 4) === "A" + i + "C" + j) {
  //         act.push(i);
  //         i++;
  //       }
  //     });
  //     ambos.push({ actividades: act, componente: "C" + j });
  //     act = [];
  //     i = 1;
  //     j++;
  //   });

  //   setCompAct(ambos);

  //   jsonMir.componentes.map((value: any, index: number) => {
  //     if (index > 1 && index < 6)
  //       setNoComponentes((loadComponentes) => [...loadComponentes, index + 1]);
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // COMPONENTES ------------------ No me sirve para FichaTecnica
  const [noComponentes, setNoComponentes] = React.useState([1, 2]);

  const [valoresComponenteMA, setValoresComponenteMA] = useState<
    Array<IComponenteMA>
  >(
    noComponentes.map((x, index) => {
      return newComponente(x);
    })
  );

  const valoresComponenteMAFnc = (state: Array<IComponenteMA>) => {
    setValoresComponenteMA(state);
  };

  // ACTIVIDADES
  // const [compAct, setCompAct] = useState<Array<IComponenteActividad>>([]);
  // const componenteActividad = [
  //   {
  //     componentes: noComponentes.map((x) => [1, 2]),
  //   },
  // ];

  // const [cValorMA, setCValorMA] = useState(
  //   componenteActividad.map((item) => {
  //     return {
  //       componentes: item.componentes.map((x, index) => {
  //         return {
  //           actividades: x.map((c, index2) => {
  //             return {
  //               actividad: "",
  //               metaAnual: "",
  //               lineaBase: "",
  //               metasPorFrecuencia: [
  //                 {
  //                   trimestre1: "",
  //                   trimestre2: "",
  //                   trimestre3: "",
  //                   trimestre4: "",
  //                 },
  //               ],
  //               valorNumerador: "",
  //               valorDenominador: "",
  //               sentidoDelIndicador: "",
  //               unidadResponsable: "",
  //               descIndicador: "",
  //               descNumerador: "",
  //               descDenominador: "",
  //             };
  //           }),
  //         };
  //       }),
  //     };
  //   })
  // );

  // const asignarCValorMA = (state: Array<ICValorMA>) => {
  //   setCValorMA(state);
  // };

  useEffect(() => {
    let arrayMA = noComponentes.map((x, index) => {
      return newComponente(x)
    });
    setValoresComponenteMA(arrayMA);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    console.log("valoresComponenteMA: ",valoresComponenteMA);
    console.log("noComponentes: ",noComponentes);
    
    
  }, []);

  const [ValueFin, setValueFin] = useState<Array<IFinMA>>([]);
  const [ValueProposito, setValueProposito] = useState<Array<IPropositoMA>>([]);

  const resumenFinMa = (arr: Array<IFinMA>) => {
    setValueFin(arr);
  };
  const resumenPropositoMa = (arr: Array<IPropositoMA>) => {
    setValueProposito(arr);
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
      {/* {value === 10 ? <TutorialBox initialState={35} endState={39} /> : null}
      {value === 20 ? <TutorialBox initialState={39} endState={40} /> : null}
      {value === 30 ? <TutorialBox initialState={40} endState={41} /> : null}
      {value === 40 ? <TutorialBox initialState={41} endState={42} /> : null}
      {value === 50 ? <TutorialBox initialState={42} endState={45} /> : null} */}
      <Grid
        container
        item
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        sx={{
          width: "auto",
          height: "100%",

          // height: "93vh",
          // borderRadius: 5,
          // display: "flex",
          // flexDirection: "column",
          // alignItems: "center",
        }}
      >
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
                width: ["0px", "105px", "150px", "190px", "210px"],
                display: ["none", "block", "block", "block"], // Oculta el Tab en pantallas más pequeñas
              }}
              onClick={() => {
                cambiarTab("atras");
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
                width: ["15px", "105px", "150px", "190px", "210px"],
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
                width: ["15px", "105px", "150px", "190px", "210px"],
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
                width: ["15px", "105px", "150px", "190px", "210px"],
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
                width: ["15px", "105px", "150px", "190px", "210px"],
                fontSize: [8, 10, 13, 14, 15, 18], // Tamaños de fuente para diferentes breakpoints
              }}
            />
            <Tab
              label={<ArrowCircleRightIcon></ArrowCircleRightIcon>}
              sx={{
                //borderRight: "5px solid #b3afaf",
                color: "#af8c55",
                backgroundColor: "#ccc",
                width: ["0px", "105px", "150px", "190px", "210px"],
                display: ["none", "block", "block", "block"], // Oculta el Tab en pantallas más pequeñas
              }}
              onClick={() => {
                cambiarTab("adelante");
              }}
            />
          </Tabs>

          <Grid
            sx={{
              //width: "93vw",
              width: ["300px", "650px", "900px", "1000px", "1100px", "1300px"],
              height: "82vh",
              //justifyContent: "center",
              borderRadius: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TabFinPropositoMA
              MA={MA}
              MIR={MIR}
              setTxtShowFnc={showFnc}
              show={value === 20 ? true : false}
              resumenFinMa={resumenFinMa}
              resumenPropositoMa={resumenPropositoMa}
              showMirFnc={showMirFnc}
            ></TabFinPropositoMA>

            <TabComponenteMA
              setTxtShowFnc={showFnc}
              showMirFnc={showMirFnc}
              show={value === 30 ? true : false}
              valoresComponenteMAFnc={valoresComponenteMAFnc}
              valoresComponenteMA ={valoresComponenteMA}
              noComponentes={noComponentes}
              MA={MA}
              MIR={MIR}
            ></TabComponenteMA>

            {/* <TabActividadesMA
              setTxtShowFnc={showFnc}
              showMirFnc={showMirFnc}
              compAct={compAct}
              show={value === 40 ? true : false}
              componentes={noComponentes}
              asignarCValor={asignarCValorMA}
              MA={MA}
              MIR={MIR}
            ></TabActividadesMA>

            <TabResumenMA
              show={value === 50 ? true : false}
              componentes={noComponentes}
              componenteValor={valoresComponenteMA}
              cValor={cValorMA}
              fin={ValueFin}
              proposito={ValueProposito}
              IdMir={IdMir}
              IdMA={IdMA}
              showResume={showResume}
              MIR={MIR}
            ></TabResumenMA> */}

            <TabResumenMIR
              show={showMir}
              showMirFnc={showMirFnc}
              showSt={showSt}
              MIR={MIR}
              noComponentes={noComponentes}
            ></TabResumenMIR>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
