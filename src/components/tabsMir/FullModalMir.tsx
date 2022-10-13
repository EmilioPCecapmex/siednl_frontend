import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box } from "@mui/material";
import TabEncabezado from "./TabEncabezado";
import { TabComponente } from "./TabComponente";
import TabFinProposito from "./TabFinProposito";
import TabResumen from "./TabResumen";
import { TabActividades } from "./TabActividades";
import { IComponente } from "./IComponente";
import {ICValor} from "./ICValor"

export default function FullModalMir() {
  const [value, setValue] = React.useState(10);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  // business logic-------------------------------------------------------------------------------
  const [componentes, setComponentes] = React.useState([1, 2]);
  const [actualizoComponentes, setActualizoComponentes] = React.useState(2);

  const asignarComponente=( state:[])=>{
    setComponentes(state);
    setActualizoComponentes(state.length)
  }


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

  const[cValor,setCValor]=useState<Array<ICValor>>([])

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
  }, []);


  useEffect(() => {

    console.log(cValor)
  }, [cValor,componentes])
  
  

  
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
          <TabEncabezado show={value === 10 ? true : false}></TabEncabezado>
          <TabFinProposito show={value === 20 ? true : false}></TabFinProposito>
          <TabResumen show={value === 50 ? true : false} componentes={componentes} componenteValor={componenteValor} cValor={cValor} asignarCValor={asignarCValor}></TabResumen>
           <TabComponente show={value === 30 ? true : false } asignarComponente={asignarComponente} asignarComponenteValor={asignarComponenteValor} ></TabComponente>
          <TabActividades show={value === 40 ? true : false} componentes={componentes} actualizoComponentes={actualizoComponentes} asignarCValor={asignarCValor}></TabActividades>
        </Box>
      </Box>
    </Box>
  );
}
