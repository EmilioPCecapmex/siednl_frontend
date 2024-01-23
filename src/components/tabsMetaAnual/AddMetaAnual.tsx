import { Grid, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import GenericTabs from "../genericComponents/genericTabs";
import {
  IActividad,
  IComponente,
  IMIR
} from "../tabsMir/interfaces mir/IMIR";
import { IFinMA, IPropositoMA } from "./IFin";
import { IMA, IMAEdit } from "./IMA";
import { IActividadesMA, IComponenteMA } from "./Interfaces";
import { TabActividadesMA } from "./TabActividades";
import { TabComponenteMA } from "./TabComponente";
import { TabFinPropositoMA } from "./TabFinPropositoMA";
import TabResumenMA, { IComponenteEditMA } from "./TabResumenMA";

const tabs = ["Fin / Propósito", "Componentes", "Actividades", "Resumen"];

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
  let componentes: IComponente[] = JSON.parse(MIR).componentes;

  return {
    fin: newFinPropositoMA(),
    proposito: newFinPropositoMA(),
    componentes: componentes?.map((item) => newComponenteMA(item)),
  };
}

export function newActividadMA(ActividadMIR: IActividad) {
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
    actividades: ComponenteMIR.actividades.map((item) => newActividadMA(item)),
  };
  return componente;
}

function newMetaAnualboolean(MIR: string) {
  let componentes: IComponente[] = JSON.parse(MIR).componentes;

  return {
    fin: newFinPropositoMAboolean(),
    proposito: newFinPropositoMAboolean(),
    componentes: componentes?.map((item) => newComponenteMAboolean(item)),
  };
}

export function newFinPropositoMAboolean() {
  return {
    metaAnual: false,
    lineaBase: false,
    valorNumerador: false,
    valorDenominador: false,
    sentidoDelIndicador: false,
    unidadResponsable: false,
    descIndicador: false,
    descNumerador: false,
    descDenominador: false,
  };
}

export function newComponenteMAboolean(ComponenteMIR: IComponente) {
  let componente: IComponenteEditMA;
  componente = {
    componentes: ComponenteMIR.componente,
    metaAnual: false,
    lineaBase: false,
    metasPorFrecuencia: [
      {
        semestre1: false,
        semestre2: false,
        trimestre1: false,
        trimestre2: false,
        trimestre3: false,
        trimestre4: false,
      },
    ],
    valorNumerador: false,
    valorDenominador: false,
    sentidoDelIndicador: false,
    unidadResponsable: false,
    descIndicador: false,
    descNumerador: false,
    descDenominador: false,
    actividades: ComponenteMIR.actividades.map((item) =>
      newActividadMAboolean(item)
    ),
  };
  return componente;
}

export function newActividadMAboolean(ActividadMIR: IActividad) {
  return {
    actividad: ActividadMIR.actividad,
    metaAnual: false,
    lineaBase: false,
    metasPorFrecuencia: [
      {
        semestre1: false,
        semestre2: false,
        trimestre1: false,
        trimestre2: false,
        trimestre3: false,
        trimestre4: false,
      },
    ],
    valorNumerador: false,
    valorDenominador: false,
    sentidoDelIndicador: false,
    unidadResponsable: false,
    descIndicador: false,
    descNumerador: false,
    descDenominador: false,
  };
}

export default function AddMetaAnual({
  MIR,
  MA,
  showResume,
  IdMir,
  IdMA,
  estado,
}: {
  MIR: string;
  MA: string;
  showResume: Function;
  IdMir: string;
  IdMA: string;
  estado: string;
}) {
  const [maPadre, setMAPadre] = useState<IMA>(newMetaAnual(MIR));
  const [maPadreEdit, setMAPadreEdit] = useState<IMAEdit>(
    newMetaAnualboolean(MIR)
  );

 

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
    setMAPadre({
      ...maPadre,
      fin: FinValues,
    });
  };
  const setMAPropositoPadre = (propositoValues: IPropositoMA) => {
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

 

  const [editMA, setEditMA] = useState(false);

  useEffect(() => {
    console.log("ENTRE");
    console.log("MA: ",MA);

    console.log("JSON.parse(MA): ",JSON.parse(MA));
    
    if (MA !== "") {
      let auxArrayMA = JSON.parse(MA);
      if (auxArrayMA[1]) {
        let auxDBMA: IMA = auxArrayMA[0];
        let auxMIR: IMIR = JSON.parse(MIR);
        let auxMA: IMA = newMetaAnual(MIR);
        setEditMA(true);
        // let lengthMA = auxMA.componentes.length
        // let lengthMIR = auxMIR.componentes.length

        let auxComponentes = auxMA.componentes.map((itemComponente, indexC) => {
          if (auxDBMA.componentes[indexC]) {
            let auxActividades: IActividadesMA[] =
              itemComponente.actividades.map((itemActividad, indexA) => {
                return (
                  auxDBMA.componentes[indexC].actividades[indexA] ||
                  newActividadMA(auxMIR.componentes[indexC].actividades[indexA])
                );
              });

            return (
              {
                ...auxDBMA.componentes[indexC],
                actividades: auxActividades,
              } || { ...itemComponente, actividades: auxActividades }
            );
          } else {
            return newComponenteMA(auxMIR.componentes[indexC]);
          }
        });

        setMAPadre({ ...auxDBMA, componentes: auxComponentes });
      } else {
        let auxDBMA: IMA = JSON.parse(MA);
        let auxMIR: IMIR = JSON.parse(MIR);
        let auxMA: IMA = newMetaAnual(MIR);

        // let lengthMA = auxMA.componentes.length
        // let lengthMIR = auxMIR.componentes.length

        let auxComponentes = auxMA.componentes.map((itemComponente, indexC) => {
          if (auxDBMA.componentes[indexC]) {
            let auxActividades: IActividadesMA[] =
              itemComponente.actividades.map((itemActividad, indexA) => {
                return (
                  auxDBMA.componentes[indexC].actividades[indexA] ||
                  newActividadMA(auxMIR.componentes[indexC].actividades[indexA])
                );
              });

            return (
              {
                ...auxDBMA.componentes[indexC],
                actividades: auxActividades,
              } || { ...itemComponente, actividades: auxActividades }
            );
          } else {
            return newComponenteMA(auxMIR.componentes[indexC]);
          }
        });

        setMAPadre({ ...auxDBMA, componentes: auxComponentes });
      }
    }
  }, []);

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
                edit={editMA}
                MA={MA}
                MIR={MIR}
                setTxtShowFnc={showFnc}
                finPadre={maPadre.fin}
                propositoPadre={maPadre.proposito}
                //show={value === 0 ? true : false}
                setMAFinPadre={setMAFinPadre}
                setMAPropositoPadre={setMAPropositoPadre}
                showMirFnc={showMirFnc}
                maPadreEdit={maPadreEdit}
              />
            ) : null}
            {value === 1 ? (
              <TabComponenteMA
                edit={editMA}
                setTxtShowFnc={showFnc}
                showMirFnc={showMirFnc}
                //show={value === 1 ? true : false}
                setMAcomponentesPadre={setMAcomponentesPadre}
                setComponenteMA={setMAPadre}
                ComponentesMA={maPadre.componentes}
                MA={MA}
                MIR={MIR}
                maPadreEdit={maPadreEdit}
              />
            ) : null}

            {value === 2 ? (
              <TabActividadesMA
                edit={editMA}
                setTxtShowFnc={showFnc}
                showMirFnc={showMirFnc}
                compAct={[]}
                // show={value === 2 ? true : false}
                setMAActividadesPadre={setMAActividadesPadre}
                ComponentesActividadMA={maPadre.componentes}
                asignarCValor={() => {}}
                MA={MA}
                MIR={MIR}
                maPadreEdit={maPadreEdit}
              ></TabActividadesMA>
            ) : null}

            {value === 3 ? (
              <TabResumenMA
                maPadre={maPadre}
                IdMir={IdMir}
                IdMA={IdMA}
                showResume={showResume}
                MIR={MIR}
                maPadreEdit={maPadreEdit}
                estadoma ={estado}
                setMAPadreEdit={setMAPadreEdit}
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
