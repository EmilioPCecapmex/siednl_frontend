import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box, Tooltip } from "@mui/material";
import TabFinPropositoMR, { IFin, IProposito } from "./TabFinProposito";
import TabResumenMA from "./TabResumen";
import { IComponente, IComponenteMA } from "../tabsMir/IComponente";
import { ICValor } from "../tabsMir/ICValor";
import TabEncabezadoMA, { IEncabezado } from "./TabEncabezado";
import { TabComponenteMA } from "./TabComponente";
import { TabActividadesMA } from "./TabActividades";

export default function FullModalMetaAnual({
  MIR,
  showResume,
  IdMir,
  anioFiscalEdit,
}: {
  MIR: string;
  showResume: Function;
  IdMir: string;
  anioFiscalEdit: string;
}) {
  const [value, setValue] = React.useState(10);
  const [expandMir, setExpandMir] = React.useState(false);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  const [compAct, setCompAct] = useState<Array<IComponenteActividad>>([]);
  const [actividadesMir, setActividadesMir] = useState<Array<IActividadesMir>>(
    []
  );

  // business logic-------------------------------------------------------------------------------
  const [componentes, setComponentes] = React.useState([1, 2]);

  const asignarComponente = (state: []) => {
    setComponentes(state);
  };

  const [componenteValor, setComponenteValor] = useState<Array<IComponente>>(
    componentes.map((x, index) => {
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

  const [componenteValorMA, setComponenteValorMA] = useState<
    Array<IComponenteMA>
  >(
    componentes.map((x, index) => {
      return {
        componentes: "C" + (index + 1),
        metaAnual: "",
        lineaBase: "",
        metasPorFrecuencia: [],
        valorNumerador: "",
        valorDenominador: "",
        orden: "",
        unidadResponsable: "",
        descIndicador: "",
        descNumerador: "",
        descDenominador: "",
      };
    })
  );

  const asignarComponenteValor = (state: Array<IComponente>) => {
    setComponenteValor(state);
  };

  const asignarComponenteValorMA = (state: Array<IComponenteMA>) => {
    setComponenteValorMA(state);
  };

  const [actividades, setActividades] = React.useState([1, 2]);
  const [componenteActividad, setComponenteActividad] = useState([
    {
      componentes: componentes.map((x) => actividades),
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

  const asignarCValor = (state: Array<ICValor>) => {
    setCValor(state);
  };

  useEffect(() => {
    let array = componentes.map((x, index) => {
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
  }, []);

  const [encabezado, setEncabezado] = useState<Array<IEncabezado>>([]);
  const [fin, setFin] = useState<Array<IFin>>([]);
  const [proposito, setProposito] = useState<Array<IProposito>>([]);
  const [cargaFin, setCargaFin] = useState<Array<IFin>>([]);
  const [cargaProposito, setCargaProposito] = useState<Array<IProposito>>([]);

  const resumenEncabezado = (arr: Array<IEncabezado>) => {
    setEncabezado(arr);
  };
  const resumenFin = (arr: Array<IFin>) => {
    setFin(arr);
  };
  const resumenProposito = (arr: Array<IProposito>) => {
    setProposito(arr);
  };
  const loadFin = (arr: Array<IFin>) => {
    setCargaFin(arr);
  };
  const loadProposito = (arr: Array<IProposito>) => {
    setCargaProposito(arr);
  };

  //----------------------------------------------------------------------------------------------
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
          width: "80vw",
          height: "86vh",
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
            <Tab
              label="Encabezado"
              value={10}
              sx={{
                borderRight: "5px solid #b3afaf",
                color: "black",
                fontFamily: "MontserratBold",
                backgroundColor: "#ccc",
              }}
            />
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
          {/* <TabResumenMir
            showResume="Fin"
            show={value === 10 ? true : false}
            componentes={componentes}
            componenteValor={componenteValor}
            cValor={cValor}
            openFin={false}
            fin={fin}
            proposito={proposito}
          ></TabResumenMir> */}
          <TabEncabezadoMA
            anioFiscalEdit={anioFiscalEdit}
            actividadesMir={setActividadesMir}
            compAct={setCompAct}
            show={value === 10 ? true : false}
            resumenEncabezado={resumenEncabezado}
            cargaFin={loadFin}
            cargaProposito={loadProposito}
            asignarComponente={asignarComponente}
            asignarComponenteValor={asignarComponenteValor}
            MIR={MIR}
          ></TabEncabezadoMA>
          <TabFinPropositoMR
            show={value === 20 ? true : false}
            resumenFin={resumenFin}
            resumenProposito={resumenProposito}
            cargaFin={cargaFin}
            cargaProposito={cargaProposito}
          ></TabFinPropositoMR>
          <TabComponenteMA
            show={value === 30 ? true : false}
            componentesMir={componentes}
            componenteValorMir={componenteValor}
          ></TabComponenteMA>
          <TabActividadesMA
            actividadesMir={actividadesMir}
            compAct={compAct}
            show={value === 40 ? true : false}
            componentes={componentes}
            asignarCValor={asignarCValor}
          ></TabActividadesMA>
          <TabResumenMA
            showResume={showResume}
            show={value === 50 ? true : false}
            componentes={componentes}
            componenteValor={componenteValor}
            cValor={cValor}
            encabezado={encabezado}
            fin={fin}
            proposito={proposito}
            IdMir={IdMir}
          ></TabResumenMA>
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
