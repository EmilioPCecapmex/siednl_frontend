import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box } from "@mui/material";
import TabEncabezado, { IEncabezado } from "./TabEncabezado";
import { TabComponente } from "./TabComponente";
import TabFinProposito, { IFin, IProposito } from "./TabFinProposito";
import { TabActividades } from "./TabActividades";
import { IComponente } from "./IComponente";
import { ICValor } from "./ICValor";
import { TabResumen2 } from "./TabResumen2";

export default function FullModalMir({ MIR, showResume, IdMir, anioFiscalEdit }: { MIR: string, showResume: Function, IdMir: string, anioFiscalEdit: string; }) {


  const [value, setValue] = React.useState(10);

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

  const asignarComponenteValor = (state: Array<IComponente>) => {
    setComponenteValor(state);
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

  const asignarActividadesM = (state: number[]) => {
    setActividades(state);
  };

  const asignarComponenteActividadM = (
    state: { componentes: number[][] }[]
  ) => {
    setComponenteActividad(state);
  };

  const asignarCValor = (state: Array<ICValor>) => {
    setCValor(state);
  };

  // const asignarCValorEncabezado = (state: Array<ICValor>, index:number, actividades: Array<IActividades>) => {
  //   let v=cValor;
  //   v[0].componentes[index]=actividades;
  //   setCValor(v);

  // };

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
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="inherit"
            sx={{
              backgroundColor: "#fff",
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
          <TabEncabezado
          anioFiscalEdit={anioFiscalEdit}
            actividadesMir={setActividadesMir}
            compAct={setCompAct}
            show={value === 10 ? true : false}
            resumenEncabezado={resumenEncabezado}
            cargaFin={loadFin}
            cargaProposito={loadProposito}
            asignarComponente={asignarComponente}
            asignarComponenteValor={asignarComponenteValor}
            cValor={cValor}
            MIR={MIR}
          ></TabEncabezado>
          <TabFinProposito
            show={value === 20 ? true : false}
            resumenFin={resumenFin}
            resumenProposito={resumenProposito}
            cargaFin={cargaFin}
            cargaProposito={cargaProposito}
          ></TabFinProposito>
          <TabResumen2
          showResume={showResume}
            show={value === 50 ? true : false}
            componentes={componentes}
            componenteValor={componenteValor}
            cValor={cValor}
            encabezado={encabezado}
            fin={fin}
            proposito={proposito}
            IdMir={IdMir}
          ></TabResumen2>
          <TabComponente
            show={value === 30 ? true : false}
            asignarComponente={asignarComponente}
            asignarComponenteValor={asignarComponenteValor}
            componentesMir={componentes}
            componenteValorMir={componenteValor}
          ></TabComponente>
          <TabActividades
            actividadesMir={actividadesMir}
            compAct={compAct}
            show={value === 40 ? true : false}
            componentes={componentes}
            asignarCValor={asignarCValor}
          ></TabActividades>
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
