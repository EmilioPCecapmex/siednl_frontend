import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { TabComponenteRf } from "./TabComponentesRf";
import { TabActividadRf } from "./TabsActividadesRf";

import GenericTabs from "../genericComponents/genericTabs";
import {
  IActividad,
  IComponente,
  IComponenteActividad,
  IMIR,
} from "../tabsMir/interfaces mir/IMIR";
import {
  TabAvanceFinanciero,
  VPTrimestral,
  VPTrimestralboolean,
  VTrimestral,
  VTrimestralboolean,
} from "./TabAvanceFinanciero";
import { TabFinPropositoRF } from "./TabFinPropositoRf";
import { TabResumenRF } from "./TabResumenRF";
import {
  IActividadesRF,
  IAvanceFinancieroRF,
  IComponenteRF,
  IFinRF,
  IRF,
  IRFEdit,
} from "./interfacesRaffi";

const tabs = [
  "Avance Financiero",
  "Fin / Propósito",
  "Componentes",
  "Actividades",
  "Resumen",
];

export function avanceFinancieroRF() {
  return {
    nombrePrograma: "",
    valorProgramaPresupuestario: "0",
    monto: {
      devengadoModificado: VTrimestral,
      modificadoAutorizado: VTrimestral,
      ejercidoModificado: VTrimestral,
    },
    porcentaje: {
      porcentajeDevengadoModificado: VPTrimestral,
      procentajeModificadoAutorizado: VPTrimestral,
      porcentajeEjercidoModificado: VPTrimestral,
    },
  };
}

export function newFinPropositoRF() {
  return {
    añoAvanceFisico: "",
    valorAvanceFisico: "",
  };
}

export function newComponenteRF(ComponenteMIR: IComponente) {
  return {
    componentes: ComponenteMIR.componente,
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
    numeradorPorFrecuencia: [
      {
        semestre1: "",
        semestre2: "",
        trimestre1: "",
        trimestre2: "",
        trimestre3: "",
        trimestre4: "",
      },
    ],
    denominadorPorFrecuencia: [
      {
        semestre1: "",
        semestre2: "",
        trimestre1: "",
        trimestre2: "",
        trimestre3: "",
        trimestre4: "",
      },
    ],
    actividades: ComponenteMIR.actividades.map((item) =>
      newActividadesRF(item)
    ),
  };
}

export function newActividadesRF(ActividadMIR: IActividad) {
  return {
    actividad: ActividadMIR.actividad,
    metasPorFrecuencia: [
      {
        trimestre1: "",
        trimestre2: "",
        trimestre3: "",
        trimestre4: "",
      },
    ],
  };
}

function newRaffi(MIR: string) {
  let componentes: IComponente[] = JSON.parse(MIR).componentes;

  return {
    avanceFinanciero: avanceFinancieroRF(),
    fin: newFinPropositoRF(),
    proposito: newFinPropositoRF(),
    componentes: componentes?.map((item) => newComponenteRF(item)),
  };
}

export function avanceFinancieroRFboolean() {
  return {
    nombrePrograma: false,
    valorProgramaPresupuestario: false,
    monto: {
      devengadoModificado: VTrimestralboolean,
      modificadoAutorizado: VTrimestralboolean,
      ejercidoModificado: VTrimestralboolean,
    },
    porcentaje: {
      porcentajeDevengadoModificado: VPTrimestralboolean,
      procentajeModificadoAutorizado: VPTrimestralboolean,
      porcentajeEjercidoModificado: VPTrimestralboolean,
    },
  };
}

export function newFinPropositoRFboolean() {
  return {
    añoAvanceFisico: false,
    valorAvanceFisico: false,
  };
}

export function newComponenteRFboolean(ComponenteMIR: IComponente) {
  return {
    componentes: ComponenteMIR.componente,
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
    numeradorPorFrecuencia: [
      {
        semestre1: false,
        semestre2: false,
        trimestre1: false,
        trimestre2: false,
        trimestre3: false,
        trimestre4: false,
      },
    ],
    denominadorPorFrecuencia: [
      {
        semestre1: false,
        semestre2: false,
        trimestre1: false,
        trimestre2: false,
        trimestre3: false,
        trimestre4: false,
      },
    ],
    actividades: ComponenteMIR.actividades.map((item) =>
      newActividadesRFboolean(item)
    ),
  };
}

export function newActividadesRFboolean(ActividadMIR: IActividad) {
  return {
    actividad: ActividadMIR.actividad,
    metasPorFrecuencia: [
      {
        trimestre1: false,
        trimestre2: false,
        trimestre3: false,
        trimestre4: false,
      },
    ],
  };
}

function newRaffiboolean(MIR: string) {
  let componentes: IComponente[] = JSON.parse(MIR).componentes;

  return {
    avanceFinanciero: avanceFinancieroRFboolean(),
    fin: newFinPropositoRFboolean(),
    proposito: newFinPropositoRFboolean(),
    componentes: componentes?.map((item) => newComponenteRFboolean(item)),
  };
}

export default function CapturaRaffi({
  MIR,
  MA,
  RF,
  opentabs,
  IdMir,
  IdMA,
  IdRf,
  showResume,
}: {
  MIR: string;
  MA: string;
  RF: string;
  opentabs: Function;
  IdMir: string;
  IdMA: string;
  IdRf: string;
  showResume: Function;
}) {
  const [value, setValue] = useState(0);
  const [compAct, setCompAct] = useState<Array<IComponenteActividad>>([]);

  const [showMir, setShowMir] = React.useState(false);
  const [showSt, setShowSt] = React.useState("");
  const showMirFnc = (state: boolean) => {
    setShowMir(state);
  };
  const showFnc = (st: string) => {
    setShowSt(st);
  };

  const jsonMir = JSON.parse(MIR);

  const [raffi, setRaffi] = useState<IRF>(newRaffi(MIR));

  const [raffiboolean, setRaffiboolean] = useState<IRFEdit>(
    newRaffiboolean(MIR)
  );

  const [editRF, setEditRF] = useState(false);

  const setRFFinPadre = (finValues: IFinRF) => {
    setRaffi({
      ...raffi,
      fin: finValues,
    });
  };

  const setRFPropositoPadre = (propositoVlues: IFinRF) => {
    setRaffi({
      ...raffi,
      proposito: propositoVlues,
    });
  };

  const setRFcomponentesPadre = (componentesValues: IComponenteRF[]) => {
    setRaffi({
      ...raffi,
      componentes: componentesValues,
    });
  };

  const setRFactividadesPadre = (
    componentesValuesActividades: IComponenteRF[]
  ) => {
    setRaffi({
      ...raffi,
      componentes: componentesValuesActividades,
    });
  };

  const setAvanceFinancieroPadre = (
    avanceFinanciero: IAvanceFinancieroRF
  ) => {
    setRaffi({
      ...raffi,
      avanceFinanciero: avanceFinanciero,
    });
  };

  useEffect(() => {
    // console.log("ENTRE");
    console.log("RF: ", RF);
    // console.log("MIR: ", MIR);

    if (RF !== "") {
      let auxArrayRF = JSON.parse(RF);
      if (auxArrayRF[1]) {
        let auxDBRF: IRF = auxArrayRF[0];
        let auxMIR: IMIR = JSON.parse(MIR);
        let auxRF: IRF = newRaffi(MIR);

        setEditRF(true);
        // let lengthMA = auxMA.componentes.length
        // let lengthMIR = auxMIR.componentes.length

        let auxComponentes = auxRF.componentes.map((itemComponente, indexC) => {
          if (auxDBRF.componentes[indexC]) {
            let auxActividades: IActividadesRF[] =
              itemComponente.actividades.map((itemActividad, indexA) => {
                return (
                  auxDBRF.componentes[indexC].actividades[indexA] ||
                  newActividadesRF(
                    auxMIR.componentes[indexC].actividades[indexA]
                  )
                );
              });

            return (
              {
                ...auxDBRF.componentes[indexC],
                actividades: auxActividades,
              } || { ...itemComponente, actividades: auxActividades }
            );
          } else {
            return newComponenteRF(auxMIR.componentes[indexC]);
          }
        });

        setRaffiboolean({ ...auxArrayRF[1] });

        setRaffi({ ...auxDBRF, componentes: auxComponentes });
      } else {
        let auxDBRF: IRF = JSON.parse(RF);
        let auxMIR: IMIR = JSON.parse(MIR);
        let auxRF: IRF = newRaffi(MIR);

        // let lengthMA = auxMA.componentes.length
        // let lengthMIR = auxMIR.componentes.length

        let auxComponentes = auxRF.componentes.map((itemComponente, indexC) => {
          if (auxDBRF.componentes[indexC]) {
            let auxActividades: IActividadesRF[] =
              itemComponente.actividades.map((itemActividad, indexA) => {
                return (
                  auxDBRF.componentes[indexC].actividades[indexA] ||
                  newActividadesRF(
                    auxMIR.componentes[indexC].actividades[indexA]
                  )
                );
              });

            return (
              {
                ...auxDBRF.componentes[indexC],
                actividades: auxActividades,
              } || { ...itemComponente, actividades: auxActividades }
            );
          } else {
            return newComponenteRF(auxMIR.componentes[indexC]);
          }
        });

        setRaffi({ ...auxDBRF, componentes: auxComponentes });
      }
    }
  }, []);

  const resumenAvanceFinancieroRf = (st: Array<IAvanceFinancieroRF>) => {
    setAvanceFinanciero(st);
  };

  const [showStAF, setShowStAF] = React.useState("");
  const setTxtShowRAFFIAF = (st: string) => {
    setShowStAF(st);
  };

  const [ValueAvanceFinanciero, setAvanceFinanciero] = useState<
    Array<IAvanceFinancieroRF>
  >([]);

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
          <GenericTabs tabsData={tabs} tabSelect={setValue} />

          <Grid
            sx={{
              width: ["300px", "650px", "900px", "1000px", "1100px", "1300px"],
              height: "82vh",
              borderRadius: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {value === 0 && (
              <TabAvanceFinanciero
                resumenAvanceFinancieroRf={resumenAvanceFinancieroRf}
                MIR={MIR}
                MA={MA}
                //avanceFinancieroRF={raffi.avanceFinanciero}
                setAvanceFinancieroRF={setAvanceFinancieroPadre}
                raffiboolean={raffiboolean}
              />
            )}

            {value === 1 && (
              <TabFinPropositoRF
                setRFFinPadre={setRFFinPadre}
                setRFPropositoPadre={setRFPropositoPadre}
                MIR={MIR}
                finRF={raffi.fin}
                propositoRF={raffi.proposito}
                setTxtShowFnc={showFnc}
                showMirFnc={showMirFnc}
                RF={RF}
                raffiboolean={raffiboolean}
              />
            )}

            {value === 2 && (
              <TabComponenteRf
                setRFcomponentesPadre={setRFcomponentesPadre}
                ComponentesRF={raffi.componentes}
                MA={MA}
                MIR={MIR}
                RF={RF}
                setTxtShowFnc={showFnc}
                showMirFnc={showMirFnc}
                raffiboolean={raffiboolean}
              />
            )}
            {value === 3 && (
              <TabActividadRf
                setRFactividadesPadre={setRFactividadesPadre}
                valoresComponenteRFFnc={() => {}}
                ComponentesRF={raffi.componentes}
                asignarCValor={() => {}}
                MA={MA}
                MIR={MIR}
                RF={RF}
                compAct={compAct}
                setTxtShowFnc={showFnc}
                showMirFnc={showMirFnc}
                raffiboolean={raffiboolean}
              />
            )}
            {value === 4 && (
              <TabResumenRF
                // encabezado={ValueEncabezado}
                // fin={ValueFin}
                // proposito={ValueProposito}
                // componentes={noComponentes}
                // AFinanciero={ValueAvanceFinanciero}

                IdMir={IdMir}
                IdRF={IdRf}
                IdMA={IdMA}
                showResume={opentabs}
                MIR={MIR}
                MA={MA}
                Raffi={raffi}
                raffiboolean={raffiboolean}
                setRaffiboolean={setRaffiboolean}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
