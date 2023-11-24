import { Tabs, Tab, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { TabComponenteRf } from "./TabComponentesRf";
import { TabActividadRf } from "./TabsActividadesRf";
import {
  IComponenteMA,
  ICValorMA,
  IComponenteRF,
  ICValorRF,
} from "./Interfaces";
import { IComponenteActividad } from "../tabsMir/interfaces mir/IMIR";
import TabResumenMIR from "../modalsRF/ModalResumenRF";
import { TabFinPropositoRF } from "./TabFinPropositoRf";
import { TabAvanceFinanciero } from "./TabAvanceFinanciero";
import { TabResumenRF } from "./TabResumenRF";
import {
  IAvanceFinancieroRF,
  IPropositoRF,
  IFinRF,
  IRF,
} from "../../screens/raffi/interfacesRaffi";
import { VTrimestral, VPTrimestral } from "./TabAvanceFinanciero";
import GenericTabs from "../genericComponents/genericTabs";

const tabs = [
  "Avance Financiero",
  "Fin / Propósito",
  "Componentes",
  "Actividades",
  "Resumen",
];

const newRaffi = {
  avanceFinanciero: {
    nombrePrograma: "",
    valorProgramaPresupuestario: "",
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
  },
  fin: {
    añoAvanceFisico: "",
    valorAvanceFisico: "",
  },
  proposito: {
    añoAvanceFisico: "",
    valorAvanceFisico: "",
  },

  componentes: [],
};
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
  // const cambiarTab = (option: string) => {
  //   if (option === "adelante") {
  //     if (value < 50) setValue(value + 10);
  //   } else {
  //     if (value > 10) setValue(value - 10);
  //   }
  // };

  const [showMir, setShowMir] = React.useState(false);
  const [showSt, setShowSt] = React.useState("");
  const showMirFnc = (state: boolean) => {
    setShowMir(state);
  };
  const showFnc = (st: string) => {
    setShowSt(st);
  };

  const jsonMir = JSON.parse(MIR);

  const [raffi, setRaffi] = useState<IRF>(newRaffi);

  useEffect(() => {
    if (RF !== "" && RF !== null) {
      setRaffi(JSON.parse(RF));
    }
  }, []);

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

  //   let arrayRF = noComponentes.map((x, index) => {
  //     return {
  //       componentes: "C" + (index + 1),
  //       metasPorFrecuencia: [],
  //       numeradorPorFrecuencia: [],
  //       denominadorPorFrecuencia: [],
  //     };
  //   });
  //   setValoresComponenteRF(arrayRF);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const [noComponentes, setNoComponentes] = React.useState([1, 2]);

  // const [valoresComponenteMA, setValoresComponenteMA] = useState<
  //   Array<IComponenteMA>
  // >(
  //   noComponentes.map((x, index) => {
  //     return {
  //       componentes: "C" + (index + 1),
  //       metaAnual: "",
  //       lineaBase: "",
  //       metasPorFrecuencia: [],
  //       valorNumerador: "",
  //       valorDenominador: "",
  //       sentidoDelIndicador: "",
  //       unidadResponsable: "",
  //       descIndicador: "",
  //       descNumerador: "",
  //       descDenominador: "",
  //     };
  //   })
  // );
  const valoresComponenteMAFnc = (state: Array<IComponenteMA>) => {
    // setValoresComponenteMA(state);
  };

  // const [valoresComponenteRF, setValoresComponenteRF] = useState<
  //   Array<IComponenteRF>
  // >(
  //   noComponentes.map((x, index) => {
  //     return {
  //       componentes: "C" + (index + 1),
  //       semestre1: "",
  //       semestre2: "",
  //       trimestre1: "",
  //       trimestre2: "",
  //       trimestre3: "",
  //       trimestre4: "",
  //     };
  //   })
  // );
  const [valoresComponenteRF, setValoresComponenteRF] = useState<
    Array<IComponenteRF>
  >(
    noComponentes.map((x, index) => {
      return {
        componentes: "C" + (index + 1),
        metasPorFrecuencia: [],
        numeradorPorFrecuencia: [],
        denominadorPorFrecuencia: [],
      };
    })
  );

  const [cValorRF, setValoresCValorRF] = useState<Array<ICValorRF>>(
    noComponentes.map((item) => {
      return {
        componentes: compAct.map((x, index) => {
          return {
            actividades: x.actividades.map((c: any, index2: number) => {
              return {
                actividad: "A" + (index2 + 1) + "C" + (index + 1),
                metasPorFrecuencia: [
                  {
                    trimestre1: "",
                    trimestre2: "",
                    trimestre3: "",
                    trimestre4: "",
                  },
                ],
                numeradorPorFrecuencia: [
                  {
                    trimestre1: "",
                    trimestre2: "",
                    trimestre3: "",
                    trimestre4: "",
                  },
                ],
                denominadorPorFrecuencia: [
                  {
                    trimestre1: "",
                    trimestre2: "",
                    trimestre3: "",
                    trimestre4: "",
                  },
                ],
              };
            }),
          };
        }),
      };
    })
  );

  const valoresComponenteRFFnc = (state: Array<IComponenteRF>) => {
    setValoresComponenteRF(state);
  };

  const asignarCValorRF = (state: Array<ICValorRF>) => {
    setValoresCValorRF(state);
  };

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

  // const [cValorRF, setCValorRF] = useState(
  //   componenteActividad.map((item) => {
  //     return {
  //       componentes: item.componentes.map((x, index) => {
  //         return {
  //           actividades: x.map((c, index2) => {
  //             return {
  //               actividad: "A" + (index2 + 1) + "C" + (index + 1),
  //               metasPorFrecuencia: [
  //                 {
  //                   trimestre1: "",
  //                   trimestre2: "",
  //                   trimestre3: "",
  //                   trimestre4: "",
  //                 },
  //               ],
  //               numeradorPorFrecuencia: [
  //                 {
  //                   trimestre1: "",
  //                   trimestre2: "",
  //                   trimestre3: "",
  //                   trimestre4: "",
  //                 },
  //               ],
  //               denominadorPorFrecuencia: [
  //                 {
  //                   trimestre1: "",
  //                   trimestre2: "",
  //                   trimestre3: "",
  //                   trimestre4: "",
  //                 },
  //               ],
  //             };
  //           }),
  //         };
  //       }),
  //     };
  //   })
  // );

  const [ValueFin, setValueFin] = useState<Array<IFinRF>>([]);

  const [ValueProposito, setValueProposito] = useState<Array<IPropositoRF>>([]);

  const resumenAvanceFinancieroRf = (st: Array<IAvanceFinancieroRF>) => {
    setAvanceFinanciero(st);
  };

  const resumenFinRF = (st: Array<IFinRF>) => {
    setValueFin(st);
  };

  const resumenPropositoRF = (st: Array<IPropositoRF>) => {
    setValueProposito(st);
  };
  // const asignarCValorMA = (state: Array<ICValorMA>) => {
  //   setCValorMA(state);
  // };

  //Avance Financiero
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
                avanceFinancieroRF={raffi.avanceFinanciero}
                setAvanceFinancieroRF={(valor: IAvanceFinancieroRF) => {
                  setRaffi({ ...raffi, avanceFinanciero: valor });
                }}
              />
            )}

            {value === 1 && (
              <TabFinPropositoRF
                resumenFinRF={resumenFinRF}
                resumenPropositoRF={resumenPropositoRF}
                MIR={MIR}
                finRF={raffi.fin}
                propositoRF={raffi.proposito}
                setFinRF={(valor: IFinRF) => {
                  setRaffi({ ...raffi, fin: valor });
                }}
                setPropositoRF={(valor: IPropositoRF) => {
                  setRaffi({ ...raffi, proposito: valor });
                }}
                setTxtShowFnc={showFnc}
                showMirFnc={showMirFnc}
                RF={RF}
              />
            )}

            {value === 2 && (
              <TabComponenteRf
                componentesRF={raffi.componentes}
                setComponentes={(valor: IComponenteRF[]) => {
                  setRaffi({ ...raffi, componentes: valor });
                }}
                valoresComponenteRFFnc={valoresComponenteRFFnc}
                noComponentes={noComponentes}
                MA={MA}
                MIR={MIR}
                RF={RF}
                setTxtShowFnc={showFnc}
                showMirFnc={showMirFnc}
              />
            )}
            {value === 3 && (
              <TabActividadRf
                valoresComponenteRFFnc={valoresComponenteRFFnc}
                componentes={noComponentes}
                asignarCValor={asignarCValorRF}
                MA={MA}
                MIR={MIR}
                RF={RF}
                compAct={compAct}
                setTxtShowFnc={showFnc}
                showMirFnc={showMirFnc}
              />
            )}
            {value === 4 && (
              <TabResumenRF
                // encabezado={ValueEncabezado}
                fin={ValueFin}
                proposito={ValueProposito}
                componentes={noComponentes}
                componenteValor={valoresComponenteRF}
                cValor={cValorRF}
                AFinanciero={ValueAvanceFinanciero}
                IdMir={IdMir}
                IdRF={IdRf}
                IdMA={IdMA}
                showResume={opentabs}
                MIR={MIR}
                MA={MA}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
