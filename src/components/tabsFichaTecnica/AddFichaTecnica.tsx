import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabResumenFT from "./TabResumenFT";
import { Grid, IconButton, useMediaQuery } from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { TabActividadesFT } from "./tabActividades";
import { IComponenteActividad } from "../tabsMir/interfaces mir/IMIR";
import GenericTabs from "../genericComponents/genericTabs";
import {
  actividadesObligatorias,
  componentesObligatorios,
} from "../../services/statesGlobals";
import {
  ICValorFT,
  IFinFT,
  IPropositoFT,
  IComponentesFT,
  IEncabezadoFT,
  IFT,
} from "./Interfaces";
import { TabEncabezado } from "./TabEncabezado";
import { TabComponenteFT } from "./TabComponentes";
import { TabFinPropositoFT } from "./tabFinProposito";
import { TutorialBox } from "../tutorialBox/tutorialBox";

const tabs = [
  "Encabezado",
  "Fin / Propósito",
  "Componentes",
  "Actividades",
  "Resumen",
];

function getNumComponents(MIR: string) {
  let aux = JSON.parse(MIR).componentes?.length;
  let arrayComponents = [];
  for (let i = 0; i < aux; i++) {
    arrayComponents.push(i + 1);
  }

  return arrayComponents;
}

function newFichaTecnica(MIR: string) {
  return {
    encabezado: newEncabezadoFT(),
    fin: newFinPropositoFT(),
    proposito: newFinPropositoFT(),
    componentes: getNumComponents(MIR).map((item) => newComponente(item)),
  };
}

export function newEncabezadoFT() {
  return {
    programaSER: "",
    objetivoSER: "",
    objetivoODS: "",
    metaODS: "",
  };
}

export function newFinPropositoFT() {
  return {
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
}

export function newActividad(indexComponente: number, indexActividad: number) {
  return {
    //componentes: "C" + (index + 1),
    actividades: `A${indexActividad}C${indexComponente}`,
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
}

export function newComponente(index: number) {
  let componente: IComponentesFT;
  componente = {
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
    actividades: actividadesObligatorias.map((item) =>
      newActividad(index, item)
    ),
  };
  return componente;
}

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
  const [value, setValue] = React.useState(0);

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
  // }, []);

  ////////////////// Componentes //////////////////////////
  // const [noComponentes, setNoComponentes] = React.useState([1, 2]);

  // const [valoresComponenteFT, setValoresComponenteFT] = useState<
  //   Array<IComponentesFT>
  // >(
  //   noComponentes.map((x, index) => {
  //     return {
  //       componentes: "C" + (index + 1),
  //       tipoDeIndicador: "",
  //       claridad: "",
  //       relevancia: "",
  //       economia: "",
  //       monitoreable: "",
  //       adecuado: "",
  //       aporte_marginal: "",
  //       dimension: "",
  //       unidadDeMedida: "",
  //       actividades: [],
  //     };
  //   })
  // );

  // const valoresComponenteFTFnc = (state: Array<IComponentesFT>) => {
  //   setValoresComponenteFT(state);
  // };
  ////////////////////Actividades/////////////////////////////////
  const [compAct, setCompAct] = useState<Array<IComponenteActividad>>([]);
  // const [componenteActividad, setComponenteActividad] = useState([
  //   {
  //     componentes: noComponentes.map((x) => [1, 2]),
  //   },
  // ]);

  // const [cValorFT, setCValorFT] = useState(
  //   componenteActividad.map((item) => {
  //     return {
  //       componentes: item.componentes.map((x, index) => {
  //         return {
  //           actividades: x.map((c, index2) => {
  //             return {
  //               actividad: "",
  //               tipoDeIndicador: "",
  //               claridad: "",
  //               relevancia: "",
  //               economia: "",
  //               monitoreable: "",
  //               adecuado: "",
  //               aporte_marginal: "",
  //               dimension: "",
  //               unidadDeMedida: "",
  //             };
  //           }),
  //         };
  //       }),
  //     };
  //   })
  // );
  const [ftPadre, setFTPadre] = useState<IFT>(newFichaTecnica(MIR));
  //////////// Actividades/////////////////////7
  // const asignarCValorFT = (state: Array<ICValorFT>) => {
  //   setCValorFT(state);
  // };

  useEffect(() => {
    if (FT !== "") {
      let auxFT = JSON.parse(FT);
      setFTPadre(auxFT);
      // if (isValidIMA(auxMA)) {
      //   setMAPadre(auxMA);
      // } else {
      //   alertaError("La información puede estar dañada");
      // }
    }
  }, []);

  useEffect(() => {
    console.log("ftPadre", ftPadre);
  }, [ftPadre]);

  // useEffect(() => {
  //   let arrayFT = noComponentes.map((x, index) => {
  //     return {
  //       componentes: "C" + (index + 1),
  //       tipoDeIndicador: "",
  //       claridad: "",
  //       relevancia: "",
  //       economia: "",
  //       monitoreable: "",
  //       adecuado: "",
  //       aporte_marginal: "",
  //       dimension: "",
  //       unidadDeMedida: "",
  //       actiidad: [],
  //     };
  //   });
  //   setValoresComponenteFT(arrayFT);
  // }, []);

  // const [ValueEncabezado, setValueEncabezado] = useState<IEncabezadoFT>(

  // );

  

  const setFTEncabezadoPadre = (EncabezadoValues: IEncabezadoFT) => {
    setFTPadre({
      ...ftPadre,
      encabezado: EncabezadoValues,
    });
  };

  const setFTFinPadre = (FinValues: IFinFT) => {
    setFTPadre({
      ...ftPadre,
      fin: FinValues,
    });
  };

  const setFTPropositoPadre = (PropositoValues: IPropositoFT) => {
    setFTPadre({
      ...ftPadre,
      proposito: PropositoValues,
    });
  };

  const setFTcomponentesActividadPadre = (componentesActividadValues: IComponentesFT[]) => {
    setFTPadre({
      ...ftPadre,
      componentes: componentesActividadValues,
    });
  };
  

  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 500px)"),

    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 600px)"),
  };

  const setFTcomponentesPadre = (componentesValues: IComponentesFT[]) => {
    setFTPadre({
      ...ftPadre,
      componentes: componentesValues,
    });
  };

  useEffect(() => {
    console.log("ftPadre", ftPadre);
  }, [ftPadre]);
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
        <GenericTabs tabSelect={setValue} tabsData={tabs} />

        <Grid
          sx={{
            width: "93vw",
            height: "82vh",
          }}
        >
          {value === 0 ? (
            <TabEncabezado
              show={value === 0 ? true : false}
              setFTEncabezadoPadre={setFTEncabezadoPadre}
              setEncabezadoFT={setFTPadre}
              EncabezadoValues={ftPadre.encabezado}
              FT={FT}
              MIR={MIR}
            ></TabEncabezado>
          ) : null}

          {value === 1 ? (
            <TabFinPropositoFT
              show={value === 1 ? true : false}
              setFTPropositoPadre={setFTPropositoPadre}
              setFTFinPadre={setFTFinPadre}
              setFinPropositoFT={setFTPadre}
              FinValues={ftPadre.fin}
              PropositoValues={ftPadre.proposito}
              FT={FT}
            ></TabFinPropositoFT>
          ) : null}
          {value === 2 ? (
            <TabComponenteFT
              show={value === 2 ? true : false}
              setFTcomponentesPadre={setFTcomponentesPadre}
              setComponenteFT={setFTPadre}
              ComponentesFT={ftPadre.componentes}
              showFnc={setTxtShowFnc}
              showMirFnc={showMirFnc}
              FT={FT}
            ></TabComponenteFT>
          ) : null}
          {value === 3 ? (
            <TabActividadesFT
              show={value === 3 ? true : false}
              setTxtShowFnc={setTxtShowFnc}
              showMirFnc={showMirFnc}
              compAct={compAct}
              setFTcomponentesActividadPadre={setFTcomponentesActividadPadre}
              setComponenteActividadFT={setFTPadre}
              componentesActividad={ftPadre.componentes}
              //asignarCValor={[asignarCValorFT]}
              FT={FT}
            ></TabActividadesFT>
          ) : null}
          {value === 4 ? (
            <TabResumenFT
              show={value === 4 ? true : false}
              encabezado={ftPadre.encabezado}
              fin={ftPadre.fin}
              proposito={ftPadre.proposito}
              //componentes={ftPadre.componentes}
              setFTPadre={setFTPadre}
              ftPadre={ftPadre}
              componentes={ftPadre.componentes}
              cValor={[]}
              IdMir={IdMir}
              IdFT={IdFT}
              IdMA={IdMA}
              showResume={showResume}
              MIR={MIR}
            ></TabResumenFT>
          ) : null}
        </Grid>
      </Grid>
    </Grid>
  );
}
