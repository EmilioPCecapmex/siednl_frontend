/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { TabFinPropositoMA } from "./TabFinPropositoMA";
import { Grid, useMediaQuery } from "@mui/material";
import { TabComponenteMA } from "./TabComponente";
import { TabActividadesMA } from "./TabActividades";
import { IFinMA, IPropositoMA } from "./IFin";
import { IActividadesMA, IComponenteMA, ICValorMA } from "./Interfaces";
import TabResumenMA from "./TabResumenMA";
import {
  IActividad,
  IComponente,
  IComponenteActividad,
  IMIR,
} from "../tabsMir/interfaces mir/IMIR";
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
  //getNumActividades(MIR)

  return arrayComponents;
}

function getNumActividades(MIR: string, indexComponente: number) {
  let aux = JSON.parse(MIR).componentes;

  let arrayActividades: number[] = [];

  aux.map((componente: IComponente, indexC: number) => {
    if (indexComponente === indexC) {
      componente.actividades.map((actividad: IActividad, index: number) => {
        arrayActividades.push(index + 1);
      });
    }
  });

  // for (let i = 0; i < aux; i++) {
  //   arrayComponents.push(i + 1);

  // }
  //getNumActividades(MIR)

  return arrayActividades;
}

export function newFinPropositoMA() {
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
  let componentes: IComponente[] = JSON.parse(MIR).componentes
  console.log("MIR.COMPONENS:",JSON.parse(MIR).componentes);
  
  return {
    fin: newFinPropositoMA(),
    proposito: newFinPropositoMA(),
    componentes: componentes?.map((item) => newComponenteMA(item)),
  };
}

export function newActividad(ActividadMIR: IActividad) {
  return {
    actividad: ActividadMIR.actividad,
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

export function newComponenteMA(ComponenteMIR: IComponente) {
  let componente: IComponenteMA;
  componente = {
    componentes: ComponenteMIR.componente,
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
    actividades:ComponenteMIR.actividades.map((item) =>
      newActividad(item)
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

  // useEffect(() => {
  //   console.log("MIR", MIR);
  //   console.log("MA", MA);
  //   // console.log("showResume",showResume);
  //   console.log("IdMir", IdMir);
  //   console.log("IdMA", IdMA);
  //   //getNumComponents();
  //   //console.log("numero de componentes de la mir", getNumComponents());
  //   //setMAPadre({ ...maPadre, componentes: arrComponentes });
  //   //setMAPadre({...maPadre,componentes: });
  // }, []);

  const [value, setValue] = React.useState(0);

  const [showMir, setShowMir] = React.useState(false);

  const [showSt, setShowSt] = React.useState("");

  const showMirFnc = (state: boolean) => {
    setShowMir(state);
  };

  const showFnc = (st: string) => {
    setShowSt(st);
  };

  // const jsonMir = JSON.parse(MIR);

  const setMAFinPadre = (FinValues: IFinMA) => {
    console.log("FinValues: ", FinValues);

    setMAPadre({
      ...maPadre,
      fin: FinValues,
    });
  };
  const setMAPropositoPadre = (propositoValues: IPropositoMA) => {
    console.log("FinValues: ", propositoValues);
    setMAPadre({
      ...maPadre,
      proposito: propositoValues,
    });
  };
  const setMAcomponentesPadre = (componentesValues: IComponenteMA[]) => {
    setMAPadre({
      ...maPadre,
      componentes: componentesValues,
    });
  };

  const setMAActividadesPadre = (
    componentesActividadesValues: IComponenteMA[]
  ) => {
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

  // const [ComponentesMA, setComponentesMA] = useState<IComponenteMA[]>(componentesObligatorios.map((item) => newComponenteMAMA(item)));

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
  //     return newComponenteMAMA(x)
  //   });
  //   setComponentesMA(arrayMA);
  //   eslint-disable-next-line react-hooks/exhaustive-deps
  //
  //   console.log("noComponentes: ",noComponentes);

  // }, []);

  // const [ValueFin, setValueFin] = useState<Array<IFinMA>>([]);
  // const [ValueProposito, setValueProposito] = useState<Array<IPropositoMA>>([]);

  // const resumenFinMa = (arr: Array<IFinMA>) => {
  //   setValueFin(arr);
  // };
  // const resumenPropositoMa = (arr: Array<IPropositoMA>) => {
  //   setValueProposito(arr);
  // };

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
                finPadre={maPadre.fin}
                propositoPadre={maPadre.proposito}
                //show={value === 0 ? true : false}
                setMAFinPadre={setMAFinPadre}
                setMAPropositoPadre={setMAPropositoPadre}
                showMirFnc={showMirFnc}
              />
            ) : null}
            {value === 1 ? (
              <TabComponenteMA
                setTxtShowFnc={showFnc}
                showMirFnc={showMirFnc}
                //show={value === 1 ? true : false}
                setMAcomponentesPadre={setMAcomponentesPadre}
                setComponenteMA={setMAPadre}
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
                setMAActividadesPadre={setMAActividadesPadre}
                ComponentesActividadMA={maPadre.componentes}
                asignarCValor={() => {}}
                MA={MA}
                MIR={MIR}
              ></TabActividadesMA>
            ) : null}

            {value === 3 ? (
              <TabResumenMA
                maPadre={maPadre}
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
