import React, { useEffect, useState } from "react";
import TabResumenFT from "./TabResumenFT";
import { Grid, IconButton, useMediaQuery } from "@mui/material";
import { TabActividadesFT } from "./tabActividades";
import { IActividad, IComponente, IComponenteActividad, IMIR } from "../tabsMir/interfaces mir/IMIR";
import GenericTabs from "../genericComponents/genericTabs";

import {
  IFinFT,
  IPropositoFT,
  IComponentesFT,
  IEncabezadoFT,
  IFT,
  IActividadesFT,
} from "./Interfaces";
import { TabEncabezado } from "./TabEncabezado";
import { TabComponenteFT } from "./TabComponentes";
import { TabFinPropositoFT } from "./tabFinProposito";

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
  let componentes: IComponente[] = JSON.parse(MIR).componentes
  console.log("MIR.COMPONENS:", JSON.parse(MIR).componentes);
  return {
    encabezado: newEncabezadoFT(),
    fin: newFinPropositoFT(),
    proposito: newFinPropositoFT(),
    componentes: componentes?.map((item) => newComponenteFT(item)),
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

export function newActividadFT(ActividadMIR: IActividad) {
  return {
    //componentes: "C" + (index + 1),
    actividades: ActividadMIR.actividad,
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

export function newComponenteFT(ComponenteMIR: IComponente) {
  let componente: IComponentesFT;
  componente = {
    componentes: ComponenteMIR.componente,
    tipoDeIndicador: "",
    claridad: "",
    relevancia: "",
    economia: "",
    monitoreable: "",
    adecuado: "",
    aporte_marginal: "",
    dimension: "",
    unidadDeMedida: "",
    actividades: ComponenteMIR.actividades.map((item) =>
      newActividadFT(item)
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
  const [compAct, setCompAct] = useState<Array<IComponenteActividad>>([]);

  const [ftPadre, setFTPadre] = useState<IFT>(newFichaTecnica(MIR));


  useEffect(() => {
    // if (FT !== "") {
    //   let auxFT: IFT = JSON.parse(FT);
    //   let auxMIR: IMIR = JSON.parse(MIR);

    //   let lengthFT = auxFT.componentes.length
    //   let lengthMIR = auxMIR.componentes.length

    //   if (lengthFT !== lengthMIR) {
    //     for (let i = lengthFT; i < lengthMIR; i++) {
    //       auxFT.componentes.push(newComponenteFT(auxMIR.componentes[i]))
    //     }
    //   }
    //   setFTPadre(auxFT);
    // }
    if (FT !== "") {

      let auxArrayFT = JSON.parse(FT);
      if (auxArrayFT[1]) {
        let auxDBMA: IFT =auxArrayFT[0];
        let auxMIR: IMIR = JSON.parse(MIR);
        let auxMA: IFT = newFichaTecnica(MIR);

        // let lengthMA = auxMA.componentes.length
        // let lengthMIR = auxMIR.componentes.length

        let auxComponentes = auxMA.componentes.map((itemComponente, indexC) => {
          if (auxDBMA.componentes[indexC]) {
            let auxActividades: IActividadesFT[] = itemComponente.actividades.map((itemActividad, indexA) => {
              return auxDBMA.componentes[indexC].actividades[indexA] || newActividadFT(auxMIR.componentes[indexC].actividades[indexA])
            })
            console.log("componente opcional:",{...auxDBMA.componentes[indexC],actividades: auxActividades});
            
            return {...auxDBMA.componentes[indexC],actividades: auxActividades}||{ ...itemComponente, actividades: auxActividades }
          } else {
            return newComponenteFT(auxMIR.componentes[indexC])
          }

        })
        
        setFTPadre({ ...auxDBMA, componentes: auxComponentes });
      } else {
        let auxDBMA: IFT = JSON.parse(FT);
        let auxMIR: IMIR = JSON.parse(MIR);
        let auxMA: IFT = newFichaTecnica(MIR);

        // let lengthMA = auxMA.componentes.length
        // let lengthMIR = auxMIR.componentes.length

        let auxComponentes = auxMA.componentes.map((itemComponente, indexC) => {
          if (auxDBMA.componentes[indexC]) {
            let auxActividades: IActividadesFT[] = itemComponente.actividades.map((itemActividad, indexA) => {
              // console.log("iteracion: ", auxDBMA.componentes[indexC].actividades[indexA] || newActividadMA(auxMIR.componentes[indexC].actividades[indexA]));

              return auxDBMA.componentes[indexC].actividades[indexA] || newActividadFT(auxMIR.componentes[indexC].actividades[indexA])
            })
            console.log("componente opcional:",{...auxDBMA.componentes[indexC],actividades: auxActividades});
            
            return {...auxDBMA.componentes[indexC],actividades: auxActividades}||{ ...itemComponente, actividades: auxActividades }
          } else {
            return newComponenteFT(auxMIR.componentes[indexC])
          }

        })
        // console.log("MA: ", { ...auxDBMA, componentes: auxComponentes });
        setFTPadre({ ...auxDBMA, componentes: auxComponentes });
      }

    }
  }, []);

  useEffect(() => {
    console.log("ftPadre", ftPadre);
  }, [ftPadre]);



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
              setFTEncabezadoPadre={setFTEncabezadoPadre}
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
