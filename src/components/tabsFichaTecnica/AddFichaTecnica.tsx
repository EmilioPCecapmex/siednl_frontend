import React, { useEffect, useState } from "react";
import TabResumenFT from "./TabResumenFT";
import { Grid, useMediaQuery } from "@mui/material";
import { TabActividadesFT } from "./tabActividades";
import {
  IActividad,
  IComponente,
  IComponenteActividad,
  IMIR,
} from "../tabsMir/interfaces mir/IMIR";
import GenericTabs from "../genericComponents/genericTabs";

import {
  IFinFT,
  IPropositoFT,
  IComponentesFT,
  IEncabezadoFT,
  IFT,
  IFTEdit,
  IComponenteEditFT,
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

function newFichaTecnica(MIR: string) {
  let componentes: IComponente[] = JSON.parse(MIR).componentes;

  return {
    encabezado: newEncabezadoFT(),
    fin: newFinPropositoFT(),
    proposito: newFinPropositoFT(),
    componentes: componentes?.map((item) => newComponenteFT(item)),
  };
}

function newFichaTecnicaboolean(MIR: string) {
  let componentes: IComponente[] = JSON.parse(MIR).componentes;

  return {
    encabezado: newEncabezadoFTboolean(),
    fin: newFinPropositoFTboolean(),
    proposito: newFinPropositoFTboolean(),
    componentes: componentes?.map((item) => newComponentebooleanFT(item)),
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

export function newEncabezadoFTboolean() {
  return {
    programaSER: false,
    objetivoSER: false,
    objetivoODS: false,
    metaODS: false,
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

export function newFinPropositoFTboolean() {
  return {
    tipoDeIndicador: false,
    claridad: false,
    relevancia: false,
    economia: false,
    monitoreable: false,
    adecuado: false,
    aporte_marginal: false,
    dimension: false,
    unidadDeMedida: false,
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
    actividades: ComponenteMIR.actividades.map((item) => newActividadFT(item)),
  };
  return componente;
}

function newActividadbooleanFT(ActividadMIR: IActividad) {
  return {
    actividad: ActividadMIR.actividad,
    tipoDeIndicador: false,
    claridad: false,
    relevancia: false,
    economia: false,
    monitoreable: false,
    adecuado: false,
    aporte_marginal: false,
    dimension: false,
    unidadDeMedida: false,
  };
}

function newComponentebooleanFT(ComponenteMir: IComponente) {
  let componente: IComponenteEditFT;
  componente = {
    componentes: ComponenteMir.componente,
    tipoDeIndicador: false,
    claridad: false,
    relevancia: false,
    economia: false,
    monitoreable: false,
    adecuado: false,
    aporte_marginal: false,
    dimension: false,
    unidadDeMedida: false,
    actividades: ComponenteMir.actividades.map((item) =>
      newActividadbooleanFT(item)
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
  estado,
  IdEntidad,
}: {
  MIR: string;
  MA: string;
  FT: string;
  showResume: Function;
  IdMir: string;
  IdMA: string;
  IdFT: string;
  estado: string;
  IdEntidad: string;
}) {
  const [ftPadre, setFTPadre] = useState<IFT>(newFichaTecnica(MIR));

  const [ftEditPadre, setFTEditPadre] = useState<IFTEdit>(
    newFichaTecnicaboolean(MIR)
  );

  const [value, setValue] = React.useState(0);

  const [showMir, setShowMir] = React.useState(false);

  const [showSt, setShowSt] = React.useState("");

  const showMirFnc = (state: boolean) => {
    setShowMir(state);
  };

  const setTxtShowFnc = (st: string) => {
    setShowSt(st);
  };

  const [compAct, setCompAct] = useState<Array<IComponenteActividad>>([]);

  const [editFT, setEditFT] = useState(false);

  useEffect(() => {
    if (FT !== "") {
      let auxArrayFT = JSON.parse(FT);
      if (auxArrayFT[1]) {
        let auxDBMA: IFT = auxArrayFT[0];
        let auxMIR: IMIR = JSON.parse(MIR);
        let auxMA: IFT = newFichaTecnica(MIR);

        setEditFT(true);

        let auxComponentes = auxMA.componentes.map((itemComponente, indexC) => {
          if (auxDBMA.componentes[indexC]) {
            let auxActividades: IActividadesFT[] =
              itemComponente.actividades.map((itemActividad, indexA) => {
                return (
                  auxDBMA.componentes[indexC].actividades[indexA] ||
                  newActividadFT(auxMIR.componentes[indexC].actividades[indexA])
                );
              });

            return (
              {
                ...auxDBMA.componentes[indexC],
                actividades: auxActividades,
              } || { ...itemComponente, actividades: auxActividades }
            );
          } else {
            return newComponenteFT(auxMIR.componentes[indexC]);
          }
        });
        setFTEditPadre({ ...auxArrayFT[1] });

        setFTPadre({ ...auxDBMA, componentes: auxComponentes });
      } else {
        let auxDBMA: IFT = JSON.parse(FT);
        let auxMIR: IMIR = JSON.parse(MIR);
        let auxMA: IFT = newFichaTecnica(MIR);

        let auxComponentes = auxMA.componentes.map((itemComponente, indexC) => {
          if (auxDBMA.componentes[indexC]) {
            let auxActividades: IActividadesFT[] =
              itemComponente.actividades.map((itemActividad, indexA) => {
                return (
                  auxDBMA.componentes[indexC].actividades[indexA] ||
                  newActividadFT(auxMIR.componentes[indexC].actividades[indexA])
                );
              });

            return (
              {
                ...auxDBMA.componentes[indexC],
                actividades: auxActividades,
              } || { ...itemComponente, actividades: auxActividades }
            );
          } else {
            return newComponenteFT(auxMIR.componentes[indexC]);
          }
        });

        setFTPadre({ ...auxDBMA, componentes: auxComponentes });
      }
    }
  }, []);

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

  const setFTcomponentesActividadPadre = (
    componentesActividadValues: IComponentesFT[]
  ) => {
    setFTPadre({
      ...ftPadre,
      componentes: componentesActividadValues,
    });
  };

  const setFTcomponentesPadre = (componentesValues: IComponentesFT[]) => {
    setFTPadre({
      ...ftPadre,
      componentes: componentesValues,
    });
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
              edit={editFT}
              setFTEncabezadoPadre={setFTEncabezadoPadre}
              EncabezadoValues={ftPadre.encabezado}
              MIR={MIR}
              ftEditPadre={ftEditPadre}
            ></TabEncabezado>
          ) : null}

          {value === 1 ? (
            <TabFinPropositoFT
              edit={editFT}
              show={value === 1 ? true : false}
              setFTPropositoPadre={setFTPropositoPadre}
              setFTFinPadre={setFTFinPadre}
              FinValues={ftPadre.fin}
              PropositoValues={ftPadre.proposito}
              ftEditPadre={ftEditPadre}
              MIR={MIR}
            ></TabFinPropositoFT>
          ) : null}
          {value === 2 ? (
            <TabComponenteFT
              edit={editFT}
              show={value === 2 ? true : false}
              setFTcomponentesPadre={setFTcomponentesPadre}
              ComponentesFT={ftPadre.componentes}
              ftEditPadre={ftEditPadre}
              MIR={MIR}
            ></TabComponenteFT>
          ) : null}
          {value === 3 ? (
            <TabActividadesFT
              edit={editFT}
              show={value === 3 ? true : false}
              setFTcomponentesActividadPadre={setFTcomponentesActividadPadre}
              componentesActividad={ftPadre.componentes}
              ftEditPadre={ftEditPadre}
              MIR={MIR}
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
              ftEditPadre={ftEditPadre}
              estadoft={estado}
              setFTEditPadre={setFTEditPadre}
              IdEntidad={IdEntidad}
            ></TabResumenFT>
          ) : null}
        </Grid>
      </Grid>
    </Grid>
  );
}
