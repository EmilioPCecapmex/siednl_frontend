import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabFinPropositoMR, {
  IFin,
  IProposito,
  TabFinPropositoMA,
} from "./TabFinPropositoMA";
import { Box, Tooltip, IconButton } from "@mui/material";
import { IComponente } from "../tabsMir/IComponente";
import { ICValor } from "../tabsMir/ICValor";
import { IEncabezado, TabEncabezadoMIR } from "./TabEncabezadoMIR";
import { TabComponenteMA } from "./TabComponente";
import { TabActividadesMA } from "./TabActividades";
import { IFinMA, IPropositoMA } from "./IFin";
import { IComponenteMA, ICValorMA } from "./Interfaces";
import TabResumenMA from "./TabResumenMA";
import TabResumenMIR from "./TabResumenMir";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import Hidden from "@mui/material/Hidden";
import { visuallyHidden } from "@mui/utils";

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

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  const cambiarTab = (option: string) => {
    if (option === "adelante") {
      if (value < 50) setValue(value + 10);
    } else {
      if (value > 20) setValue(value - 10);
    }
  };

  // COMPONENTES ------------------ No me sirve para FichaTecnica
  const [noComponentes, setNoComponentes] = React.useState([1, 2]);

  const noComponenteFnc = (state: []) => {
    setNoComponentes(state);
  };

  const [componenteValor, setComponenteValor] = useState<Array<IComponente>>(
    noComponentes.map((x, index) => {
      return {
        componentes: "C" + (index + 1),
        resumen: "",
        indicador: "",
        frecuencia: "",
        formula: "",
        medios: "",
        supuestos: "",
      };
    })
  );

  const [valoresComponenteMA, setValoresComponenteMA] = useState<
    Array<IComponenteMA>
  >(
    noComponentes.map((x, index) => {
      return {
        componentes: "C" + (index + 1),
        metaAnual: "",
        lineaBase: "",
        metasPorFrecuencia: [],
        valorNumerador: "",
        valorDenominador: "",
        sentidoDelIndicador: "",
        unidadResponsable: "",
        descIndicador: "",
        descNumerador: "",
        descDenominador: "",
      };
    })
  );
  const valoresComponenteMAFnc = (state: Array<IComponenteMA>) => {
    setValoresComponenteMA(state);
  };
  const valoresComponenteFnc = (state: Array<IComponente>) => {
    setComponenteValor(state);
  };

  // ACTIVIDADES ------------------ No me sirve para FichaTecnica
  const [compAct, setCompAct] = useState<Array<IComponenteActividad>>([]);

  const [actividadesMir, setActividadesMir] = useState<Array<ICValor>>([]);
  const [actividades, setActividades] = React.useState([1, 2]);
  const [componenteActividad, setComponenteActividad] = useState([
    {
      componentes: noComponentes.map((x) => actividades),
    },
  ]);

  const [cValor, setCValor] = useState(
    componenteActividad.map((item) => {
      return {
        componentes: item.componentes.map((x, index) => {
          return {
            actividades: x.map((c, index2) => {
              return {
                actividad: "",
                resumen: "",
                indicador: "",
                formula: "",
                frecuencia: "",
                medios: "",
                supuestos: "",
              };
            }),
          };
        }),
      };
    })
  );

  const [cValorMA, setCValorMA] = useState(
    componenteActividad.map((item) => {
      return {
        componentes: item.componentes.map((x, index) => {
          return {
            actividades: x.map((c, index2) => {
              return {
                actividad: "",
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
            }),
          };
        }),
      };
    })
  );

  const asignarCValorMA = (state: Array<ICValorMA>) => {
    setCValorMA(state);
  };

  const asignarCValor = (state: Array<ICValor>) => {
    setCValor(state);
  };

  useEffect(() => {
    let array = noComponentes.map((x, index) => {
      return {
        componentes: "C" + (index + 1),
        resumen: "",
        indicador: "",
        frecuencia: "",
        formula: "",
        medios: "",
        supuestos: "",
      };
    });
    setComponenteValor(array);

    let arrayMA = noComponentes.map((x, index) => {
      return {
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
      };
    });
    setValoresComponenteMA(arrayMA);
  }, []);

  const [encabezado, setEncabezado] = useState<Array<IEncabezado>>([]);

  const [cargaFin, setCargaFin] = useState<Array<IFin>>([]);
  const [cargaProposito, setCargaProposito] = useState<Array<IProposito>>([]);

  const [ValueFin, setValueFin] = useState<Array<IFinMA>>([]);
  const [ValueProposito, setValueProposito] = useState<Array<IPropositoMA>>([]);

  // ------------------ No me sirve para FichaTecnica ---------------------------
  const resumenEncabezado = (arr: Array<IEncabezado>) => {
    setEncabezado(arr);
  };

  const loadFin = (arr: Array<IFin>) => {
    setCargaFin(arr);
  };
  const loadProposito = (arr: Array<IProposito>) => {
    setCargaProposito(arr);
  };

  const resumenFinMa = (arr: Array<IFinMA>) => {
    setValueFin(arr);
  };
  const resumenPropositoMa = (arr: Array<IPropositoMA>) => {
    setValueProposito(arr);
  };
  // ------------------ No me sirve para FichaTecnica ---------------------------

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        width: "100%",
        height: "92%",
        mt: "8vh",
        
      }}
    >
      <Box
        sx={{
          width: "75vw",
          height: "90vh",
          borderRadius: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="inherit"
            sx={{
              borderRadius: "10px 10px 0 0",
              boxShadow: 20,
            }}
          >
            {/* <Tab
              label="Resumen Mir"
              value={10}
              sx={{
                borderRight: "5px solid #b3afaf",
                color: "black",
                fontFamily: "MontserratBold",
                backgroundColor: "#ccc",
              }}
            /> */}
            <Tab
              label="Fin / Propósito"
              value={20}
              sx={{
                borderRight: "5px solid #b3afaf",
                color: "black",
                fontFamily: "MontserratBold",
                backgroundColor: "#ccc",
              }}
            />
            <Tab
              label="Componentes"
              value={30}
              sx={{
                borderRight: "5px solid #b3afaf",
                color: "black",
                fontFamily: "MontserratBold",
                backgroundColor: "#ccc",
              }}
            />
            <Tab
              label="Actividades"
              value={40}
              sx={{
                borderRight: "5px solid #b3afaf",
                color: "black",
                fontFamily: "MontserratBold",
                backgroundColor: "#ccc",
              }}
            />
            <Tab
              label="Resumen"
              value={50}
              sx={{
                borderRight: "5px solid #b3afaf",
                color: "black",
                fontFamily: "MontserratBold",
                backgroundColor: "#ccc",
              }}
            />
          </Tabs>
        </Box>

        <Box
          sx={{
            width: "75vw",
            height: "77vh",
          }}
        >
          <TabEncabezadoMIR
            resumenEncabezado={resumenEncabezado}
            actividadesMir={setActividadesMir}
            compAct={setCompAct}
            show={value === 60 ? true : false}
            cargaFin={loadFin}
            cargaProposito={loadProposito}
            asignarComponente={noComponenteFnc}
            asignarComponenteValor={valoresComponenteFnc}
            MIR={MIR}
          ></TabEncabezadoMIR>

          <TabFinPropositoMA
            MA={MA}
            showFnc={showFnc}
            show={value === 20 ? true : false}
            resumenFinMa={resumenFinMa}
            resumenPropositoMa={resumenPropositoMa}
            showMirFnc={showMirFnc}
          ></TabFinPropositoMA>

          <TabComponenteMA
            showFnc={showFnc}
            showMirFnc={showMirFnc}
            show={value === 30 ? true : false}
            valoresComponenteMAFnc={valoresComponenteMAFnc}
            noComponentes={noComponentes}
            valoresComponenteMir={componenteValor}
            MA={MA}
          ></TabComponenteMA>

          <TabActividadesMA
            showFnc={showFnc}
            showMirFnc={showMirFnc}
            actividadesMir={actividadesMir}
            compAct={compAct}
            show={value === 40 ? true : false}
            componentes={noComponentes}
            asignarCValor={asignarCValorMA}
            asignarCValorMIR={asignarCValor}
            MA={MA}
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
          ></TabResumenMA>

          <TabResumenMIR
            show={showMir}
            showMirFnc={showMirFnc}
            showSt={showSt}
            componentes={noComponentes}
            componenteValor={componenteValor}
            cValor={cValor}
            encabezado={encabezado}
            fin={cargaFin}
            proposito={cargaProposito}
          ></TabResumenMIR>
        </Box>

        <Box
        sx={{
          width: "30%",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
        >
            <IconButton
            onClick={() => {
              cambiarTab("atras");
            }}
          >
            <ArrowCircleLeftIcon
              fontSize="large"
              sx={{
                color: "#c4a57b",
              }}
            />
          </IconButton>

          <IconButton
            onClick={() => {
              cambiarTab("adelante");
            }}
          >
            <ArrowCircleRightIcon
            fontSize="large"
              sx={{
                color: "#c4a57b",
              }}
            />
          </IconButton>
          
        </Box>
      </Box>
    </Box>
  );
}

export interface IComponenteActividad {
  actividades: number[];
  componente: string;
}

export interface IActividadesMir {
  actividad: string;
  formula: string;
  frecuencia: string;
  indicador: string;
  medios: string;
  resumen: string;
  supuestos: string;
}
