import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box } from "@mui/material";
import TabEncabezado, { IEncabezado } from "./TabEncabezado";
import { TabComponente } from "./TabComponente";
import TabFinProposito, { IFin, IProposito } from "./TabFinProposito";
import { TabActividades } from "./TabActividades";
import { IComponente } from "./IComponente";
import TabResumen2 from "./TabResumen2";
import { ICValor } from "./ICValor";

export default function FullModalMir({show, MIR }: {show: boolean; MIR: string }) {
  const [value, setValue] = React.useState(10);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  // business logic-------------------------------------------------------------------------------
  const [componentes, setComponentes] = React.useState([1, 2]);

  const asignarComponente = (state: []) => {
    setComponentes(state);
  };

  const [componenteValor, setComponenteValor] = useState<Array<IComponente>>(
    componentes.map((x) => {
      return {
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

  const [cValor, setCValor] = useState<Array<ICValor>>([]);

  const asignarCValor = (state: Array<ICValor>) => {
    setCValor(state);
  };

  useEffect(() => {
    let array = componentes.map((x) => {
      return {
        resumen: "",
        indicador: "",
        frecuencia: "",
        formula: "",
        medios: "",
        supuestos: "",
      };
    });
    setComponenteValor(array);
    console.log(MIR);
    
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
    visibility={show ? "visible" : "hidden"}
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
            show={value === 10 ? true : false}
            resumenEncabezado={resumenEncabezado}
            cargaFin={loadFin}
            cargaProposito={loadProposito}
            MIR={MIR}
          ></TabEncabezado>
          <TabFinProposito
            show={value === 20 ? true : false}
            resumenFin={resumenFin}
            resumenProposito={resumenProposito}
            cargaFin={cargaFin}
            cargaProposito={cargaProposito}
          ></TabFinProposito>
          <TabComponente
            show={value === 30 ? true : false}
            asignarComponente={asignarComponente}
            asignarComponenteValor={asignarComponenteValor}
          ></TabComponente>
          <TabResumen2
            show={value === 50 ? true : false}
            componentes={componentes}
            componenteValor={componenteValor}
            cValor={cValor}
            asignarCValor={asignarCValor}
            encabezado={encabezado}
            fin={fin}
            proposito={proposito}
          ></TabResumen2>
          <TabComponente
            show={value === 30 ? true : false}
            asignarComponente={asignarComponente}
            asignarComponenteValor={asignarComponenteValor}
          ></TabComponente>
          <TabActividades
            show={value === 40 ? true : false}
            componentes={componentes}
            asignarCValor={asignarCValor}
          ></TabActividades>
        </Box>
      </Box>
    </Box>
  );
}
