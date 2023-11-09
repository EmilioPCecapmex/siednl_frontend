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
import { IComponenteActividad, IMIR } from "../tabsMir/interfaces mir/IMIR";
import TabResumenMIR from "../modalsMA/ModalResumenMA";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import {
  actividadesObligatorias,
  componentesObligatorios,
} from "../../services/statesGlobals";
import { IMA } from "./IMA";
import { alertaError } from "../genericComponents/Alertas";
import { isValidIMA } from "../../funcs/ValidatorMA";
import GenericTabs from "../genericComponents/genericTabs";

const tabs = ["Fin / Propósito", "Componentes", "Actividades", "Resumen"];

function getNumComponents(MIR: string) {
  let aux = JSON.parse(MIR).componentes?.length;
  let arrayComponents = [];
  for (let i = 0; i < aux; i++) {
    arrayComponents.push(i + 1);
  }

  return arrayComponents;
}
function newFinPropositoMA() {
  return {
    metaAnual: "",
    lineaBase: "",
    valorNumerador: "",
    valorDenominador: "",
    sentidoDelIndicador: "",
    unidadResponsable: "",
    descIndicador: "",
    descNumerador: "",
    descDenominador: "",
  };
}

function newMetaAnual(MIR: string) {
  return {
    fin: newFinPropositoMA(),
    proposito: newFinPropositoMA(),
    componentes: getNumComponents(MIR).map((item) => newComponente(item)),
  };
}

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
    componentes: "C" + index,
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
    actividades: actividadesObligatorias.map((item) =>
      newActividad(index, item)
    ),
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
  const [maPadre, setMAPadre] = useState<IMA>(newMetaAnual(MIR));

  useEffect(() => {
    console.log("MIR", MIR);
    console.log("MA", MA);
    // console.log("showResume",showResume);
    console.log("IdMir", IdMir);
    console.log("IdMA", IdMA);
    //getNumComponents();
    //console.log("numero de componentes de la mir", getNumComponents());
    //setMIRPADRE({ ...MIRPADRE, componentes: arrComponentes });
    //setMAPadre({...maPadre,componentes: });
  }, []);

  const [value, setValue] = React.useState(0);

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


  const setMAcomponentesPadre = (componentesValues: IComponenteMA[]) =>{
    setMAPadre({
        ...maPadre,
          componentes: componentesValues,
        
      });
  };

  const setMAActividadesPadre = (componentesActividadesValues: IComponenteMA[]) =>{
    setMAPadre({
        ...maPadre,
          componentes: componentesActividadesValues,
        
      });
  };
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
  // const [noComponentes, setNoComponentes] = React.useState([1, 2]);

  // const [ComponentesMA, setComponentesMA] = useState<IComponenteMA[]>(componentesObligatorios.map((item) => newComponente(item)));

  useEffect(() => {
    if (MA !== "") {
      let auxMA = JSON.parse(MA);
      setMAPadre(auxMA);
      // if (isValidIMA(auxMA)) {
      //   setMAPadre(auxMA);
      // } else {
      //   alertaError("La información puede estar dañada");
      // }
    }
  }, []);

  useEffect(() => {
    console.log("maPadre", maPadre);
  }, [maPadre]);

  // const valoresComponenteMAFnc = (state: Array<IComponenteMA>) => {
  //   setComponentesMA(state);
  // };

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

  // useEffect(() => {
  //   let arrayMA = noComponentes.map((x, index) => {
  //     return newComponente(x)
  //   });
  //   setComponentesMA(arrayMA);
  //   eslint-disable-next-line react-hooks/exhaustive-deps
  //
  //   console.log("noComponentes: ",noComponentes);

  // }, []);

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
          <GenericTabs tabSelect={setValue} tabsData={tabs} />

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
            {value === 0 ? (
              <TabFinPropositoMA
                MA={MA}
                MIR={MIR}
                setTxtShowFnc={showFnc}
                //show={value === 0 ? true : false}
                resumenFinMa={resumenFinMa}
                resumenPropositoMa={resumenPropositoMa}
                showMirFnc={showMirFnc}
              />
            ) : null}
            {value === 1 ? (
              <TabComponenteMA
                setTxtShowFnc={showFnc}
                showMirFnc={showMirFnc}
                //show={value === 1 ? true : false}
                setMAcomponentesPadre= {setMAcomponentesPadre}
                setComponenteMA={setMAPadre }
                ComponentesMA={maPadre.componentes}
                MA={MA}
                MIR={MIR}
              />
            ) : null}

            {value === 2 ? (
              <TabActividadesMA
                setTxtShowFnc={showFnc}
                showMirFnc={showMirFnc}
                compAct={[]}
                // show={value === 2 ? true : false}
                setMAActividadesPadre = {setMAActividadesPadre}
                ComponentesActividadMA ={maPadre.componentes}
                asignarCValor={() => {}}
                MA={MA}
                MIR={MIR}
              ></TabActividadesMA>
            ) : null}

            {value === 3 ? (
              <TabResumenMA
                show={value === 3 ? true : false}
                componentes={[]}
                componenteValor={maPadre.componentes}
                cValor={[]}
                fin={ValueFin}
                proposito={ValueProposito}
                IdMir={IdMir}
                IdMA={IdMA}
                showResume={showResume}
                MIR={MIR}
              ></TabResumenMA>
            ) : null}
            {/* <TabResumenMIR
              show={showMir}
              showMirFnc={showMirFnc}
              showSt={showSt}
              MIR={MIR}
              noComponentes={[1, 2]}
            ></TabResumenMIR> */}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
