import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box, Tooltip } from "@mui/material";
import TabFinPropositoMR, { IFin, IProposito } from "./TabFinProposito";
import TabResumenMA from "./TabResumen";
import { IComponente } from "../tabsMir/IComponente";
import { ICValor } from "../tabsMir/ICValor";
import TabEncabezadoMA, { IEncabezado } from "./TabEncabezado";
import { TabComponenteMA } from "./TabComponente";
import { TabActividadesMA } from "./TabActividades";
import { IFinMA, IPropositoMA } from "./IFin";
import TabResumenMir from "./TabResumenMir";
import { IComponenteMA } from "./Interfaces";

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

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  // COMPONENTES
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

  // ACTIVIDADES
  const [compAct, setCompAct] = useState<Array<IComponenteActividad>>([]);
  const [actividadesMir, setActividadesMir] = useState<Array<IActividadesMir>>([]);
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

  const asignarCValor = (state: Array<ICValor>) => {
    setCValor(state);
  };

  const [openOptionDialog, setOpenOptionDialog]=useState("");

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
        metasPorFrecuencia: [],
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
    console.log(valoresComponenteMA);
    
  }, []);

  const [encabezado, setEncabezado] = useState<Array<IEncabezado>>([]);
  const [fin, setFin] = useState<Array<IFin>>([]);
  const [proposito, setProposito] = useState<Array<IProposito>>([]);

  const [cargaFin, setCargaFin] = useState<Array<IFin>>([]);
  const [cargaProposito, setCargaProposito] = useState<Array<IProposito>>([]);

  const [ValueFin, setValueFin] = useState<Array<IFinMA>>([]);
  const [ValueProposito, setValueProposito] = useState<Array<IPropositoMA>>([]);

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

  const resumenFinMa = (arr: Array<IFinMA>) => {
    setValueFin(arr);
  };
  const resumenPropositoMa = (arr: Array<IPropositoMA>) => {
    setValueProposito(arr);
  };

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
          <TabEncabezadoMA
          
            anioFiscalEdit={anioFiscalEdit}
            actividadesMir={setActividadesMir}
            compAct={setCompAct}
            show={value === 10 ? true : false}
            resumenEncabezado={resumenEncabezado}
            cargaFin={loadFin}
            cargaProposito={loadProposito}
            asignarComponente={noComponenteFnc}
            asignarComponenteValor={valoresComponenteFnc}
            MIR={MIR}
          ></TabEncabezadoMA>

          <TabFinPropositoMR
            show={value === 20 ? true : false}
            resumenFin={resumenFin}
            resumenProposito={resumenProposito}
            cargaFin={cargaFin}
            cargaProposito={cargaProposito}
            resumenFinMa={resumenFinMa}
            resumenPropositoMa={resumenPropositoMa}
          ></TabFinPropositoMR>

          <TabComponenteMA
            show={value === 30 ? true : false}
            valoresComponenteMAFnc={valoresComponenteMAFnc}
            noComponentes={noComponentes}
            valoresComponente={valoresComponenteMA}
            valoresComponenteMir={componenteValor}
          ></TabComponenteMA>

          <TabActividadesMA
            actividadesMir={actividadesMir}
            compAct={compAct}
            show={value === 40 ? true : false}
            componentes={noComponentes}
            asignarCValor={asignarCValor}
          ></TabActividadesMA>

          <TabResumenMA
            componentes={noComponentes}
            show={value === 40 ? true : false}
            componenteValor={componenteValor}
            cValor={cValor}
            encabezado={encabezado}
            fin={fin}
            proposito={proposito}
            IdMir={IdMir}
            openOptionDialog={openOptionDialog}
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
