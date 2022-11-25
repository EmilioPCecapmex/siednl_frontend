import { Box, Typography, Button, Checkbox } from "@mui/material";
import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Tooltip } from "@mui/material";
import { TabEncabezado } from "./TabEncabezado";
import { TabFinProposito } from "./TabFinProposito";
import { TabResumen } from "./TabResumen";
import { TabComponentes } from "./TabComponentes";
import { TabActividades } from "./TabActividades";

export default function FullModalFichaTecnica({
  MIR,
  showResume,
  IdMir,
  anioFiscalEdit,
  MA,
}: {
  MIR: string;
  showResume: Function;
  IdMir: string;
  anioFiscalEdit: string;
  MA: string;
}) {
  const [value, setValue] = React.useState(10);
  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box
      sx={{
        width: "50vw",
        height: "86vh",
        borderRadius: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
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
            anioFiscalEdit={anioFiscalEdit}
            fichaTecnicaEdit={MIR ? JSON.parse(MIR)[1] : null}
            actividadesFichaTecnica={()=>{}}
            componenteActividad={()=>{}}
            resumenEncabezado={()=>{}}
            cargaFin={()=>{}}
            cargaProposito={()=>{}}
            asignarComponente={()=>{}}
            asignarComponenteValor={()=>{}}
            fichaTecnica={""}
          ></TabEncabezado>

          <TabFinProposito
            show={value === 20 ? true : false}
            resumenFin={()=>{}}
            resumenProposito={()=>{}}
            cargaFin={[]}
            cargaProposito={[]}
            mirEdit={MIR ? JSON.parse(MIR)[1] : null}
          ></TabFinProposito>

          <TabComponentes
            show={value === 30 ? true : false}
            noComponentesFnc={()=>{}}
            valoresComponenteFnc={()=>{}}
            noComponentes={[]}
            valoresComponente={[]}
            mirEdit={MIR ? JSON.parse(MIR)[1] : null}
          ></TabComponentes>

          <TabActividades
            show={value === 40 ? true : false}
            actividadesFichaTecnica={[]}
            componentesTextos={[]}
            componenteActividad={[]}
            componentes={[]}
            asignarCValor={()=>{}}
            fichaTecnicaEdit={MIR ? JSON.parse(MIR)[1] : null}
          ></TabActividades>

          <TabResumen
            show={value === 50 ? true : false}
            showResume={()=>{}}
            fichaTecnicaEdit={MIR ? JSON.parse(MIR)[1] : null}
            componentes={[]}
            componenteValor={[]}
            cValor={[]}
            encabezado={[]}
            fin={[]}
            proposito={[]}
            IdFichaTecnica={""}
          ></TabResumen>
        </Box>
      </Box>
    </Box>
  );
}
