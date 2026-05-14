import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Grid, useMediaQuery } from "@mui/material";

import TabAccion1 from "./TabAccion1";
import TabPrograma from "./TabPrograma";
import TabEncabezado from "./TabEncabezado";
import { TabResumen } from "./TabResumen";
import TabAvance from "./TabAvance";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { IAI,IEncabezado,IAcciones } from "./Interfaces";
import {
  IActividad,
  IComponente,
  IMIR,
  IMIREdit,
  IMovimientos,
} from "../tabsMir/interfaces mir/IMIR";

const newAI = {
  encabezado: {
    ejercicioFiscal: { Id: "", Label: "" },
    entidad: { Id: "", Label: "" },
    programa: { Id: "", Label: "", Conac: "", Consecutivo: "" },
    eje: { Id: "", Label: "" },
    tema: { Id: "", Label: "" },
    objetivo: { Id: "", Label: "" },
    estrategia: { Id: "", Label: "" },
    lineas_de_accion: [],
    beneficiario: [],
    conac: "",
    consecutivo: "",
    anticorrupcion: "",
  },
  acciones: [
    {
      acciones: "",
      descripcion: "",
      indicador: "",
      formulaCalculo: "",
      mv: "",
      frecuencia: "",
      unidadMedida: "",
      sentidoDelIndicador: "",
      descIndicador: "",
      metasPorFrecuencia: [
        {
          lineaBase: "",
          trimestre1: "",
          trimestre2: "",
          trimestre3: "",
          trimestre4: "",
          anual: "",
        }
      ],
      programas: 
      [{
        programas: "",
        descripcion: "",
        indicador: "",
        formulaCalculo: "",
        mv: "",
        frecuencia: "",
        unidadMedida: "",
        sentidoDelIndicador: "",
        descIndicador: "",
        metasPorFrecuencia: [
          {
            lineaBase: "",
            trimestre1: "",
            trimestre2: "",
            trimestre3: "",
            trimestre4: "",
            anual: "",
          }
        ],
      }],
    },
  ],
};

export default function TabsActividadesInstitucionales({
  returnMain,
  MIR,
  FT,
  AI,
  opentabs,
  IdMir,
  IdFT,
  IdAI,
  IdEntidad,
  setIdEntidad,
}: {
  MIR: string;

  FT: string;
  AI: string;
  opentabs: Function;
  IdMir: string;
  IdFT: string;
  IdAI: string;
  returnMain: Function;
  IdEntidad: string;
  setIdEntidad: Function;
}) {
  const [value, setValue] = React.useState(10);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  //const jsonMir = JSON.parse(MIR);

  const cambiarTab = (option: string) => {
    if (option === "adelante") {
      if (value < 40) setValue(value + 10);
    } else {
      if (value > 10) setValue(value - 10);
    }
  };

  const [ai, setAi] = useState<IAI>(newAI);
  const [aiPadre, setAIPadre] = useState<IAI>(newAI);
  const [editMIR, setEditMIR] = useState(false);
  // const [MIRPADRE, setMIRPADRE] = useState<IMIR>(JSON.parse(MIR));
  const [mirEdirPadre, setMIREDITPADRE] = useState<IMIREdit>(
    
      // newMIREDIT(JSON.stringify(MIR))
    );
  const [noAcciones, setNoAcciones] = useState([1]);
  const [noProgramas, setNoProgramas] = useState([1]);
  const [apartado, setApartado] = useState(
    noAcciones.map((v, index) => {
      return [1, 2];
    })
  );



 const setAIIdentificacion = (IdentificacionValues: IEncabezado) => {
    setAIPadre({
      ...aiPadre,
      encabezado: IdentificacionValues,
    });
  };
  const setAIAcciones = (componentesValues: IAcciones[]) => {
    setAIPadre({
      ...aiPadre,
      acciones: componentesValues,
    });
  };
  

  const setAIProgramas = (
      accionesProgramasValues: IAcciones[]
    ) => {
      setAIPadre({
        ...aiPadre,
        acciones: accionesProgramasValues,
      });
    };




  useEffect(() => {
    if (AI !== "" && AI !== null) {
      setAi(JSON.parse(AI));
    }
  }, []);

  useEffect(() => {
    let arr: Array<number> = [];
    ai?.acciones?.map((x, index) => {
      return arr.push(index + 1);
    });
    setNoAcciones(arr);
  }, [AI, ai]);

  const addAccion = () => {
    let arrAccion = ai.acciones;
    let arr: Array<number> = noAcciones;
    arr.push(noAcciones.length + 1);
    setNoAcciones(arr);

    setAi((ai: IAI) => ({
      ...ai,
      ...{
        acciones: arr.map((x, index) => {
          return {
            acciones: `A${index + 1}`,
            descripcion: ai.acciones[index]?.descripcion || "",
            indicador: ai.acciones[index]?.indicador || "",
            formulaCalculo: ai.acciones[index]?.formulaCalculo || "",
            mv: ai.acciones[index]?.mv || "",
            frecuencia: ai.acciones[index]?.frecuencia || "",
            unidadMedida: ai.acciones[index]?.unidadMedida || "",
            sentidoDelIndicador: ai.acciones[index]?.sentidoDelIndicador || "",
            descIndicador: ai.acciones[index]?.descIndicador || "",
            metasPorFrecuencia: ai.acciones[index]?.metasPorFrecuencia || "",
            programas: ai.acciones[index]?.programas || "",
          };
        }),
      },
    }));
  };

  const addremoveAccion = () => {
    let arrAccion = ai.acciones;
    let arr: Array<number> = noAcciones;
    if (noAcciones.length > 1) {
      arr.pop();
    }
    setNoAcciones(arr);
    setAi((ai: IAI) => ({
      ...ai,
      ...{
        acciones: arr.map((x, index) => {
          return {
            acciones: `A${index + 1}`,
            descripcion: ai.acciones[index]?.descripcion || "",
            indicador: ai.acciones[index]?.indicador || "",
            formulaCalculo: ai.acciones[index]?.formulaCalculo || "",
            mv: ai.acciones[index]?.mv || "",
            frecuencia: ai.acciones[index]?.frecuencia || "",
            unidadMedida: ai.acciones[index]?.unidadMedida || "",
            sentidoDelIndicador: ai.acciones[index]?.sentidoDelIndicador || "",
            descIndicador: ai.acciones[index]?.descIndicador || "",
            metasPorFrecuencia: ai.acciones[index]?.metasPorFrecuencia || "",
            programas: ai.acciones[index]?.programas || "",
          };
        }),
      },
    }));
  };


  const addPrograma = (accionesProgramas: IAcciones[]) => {
    // let arrAccion = ai.programas;
    let arr: Array<number> = noProgramas;
    arr.push(noProgramas.length + 1);
    setNoProgramas(arr);
    setAi((ai: IAI) => ({
      ...ai,
      componentes:accionesProgramas
     
      
    }));
  };

  const addremovePrograma = (accionSelect: number,
    programaSelect: number) => {
    let arrAccion = ai.acciones;
    let arr: Array<number> = noProgramas;
    if (noProgramas.length > 1) {
      arr.pop();
    }
    setNoProgramas(arr);
    setAi((ai: IAI) => ({
      ...ai,
      ...{
        programas: arr.map((x, index) => {
          return {
            acciones: `A${index + 1}`,
            descripcion: ai.acciones[index]?.descripcion || "",
            indicador: ai.acciones[index]?.indicador || "",
            formulaCalculo: ai.acciones[index]?.formulaCalculo || "",
            mv: ai.acciones[index]?.mv || "",
            frecuencia: ai.acciones[index]?.frecuencia || "",
            unidadMedida: ai.acciones[index]?.unidadMedida || "",
            sentidoDelIndicador: ai.acciones[index]?.sentidoDelIndicador || "",
            descIndicador: ai.acciones[index]?.descIndicador || "",
            metasPorFrecuencia: ai.acciones[index]?.metasPorFrecuencia || "",
            programas: ai.acciones[index]?.programas || "",
          };
        }),
      },
    }));
  };

  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 500px)"),

    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 600px)"),
  };

  // let ai: IAI =
  //   AI !== ""
  //     ? JSON.parse(AI).length > 1
  //       ? JSON.parse(AI)[0]
  //       : JSON.parse(AI)
  //     : {};

  //----------------------------------------------------------------------------------------------
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

          // height: "93vh",
          // borderRadius: 5,
          // display: "flex",
          // flexDirection: "column",
          // alignItems: "center",
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
          <Tabs
            value={value}
            textColor="inherit"
            //onChange={handleChange}
            variant={query.isScrollable ? "scrollable" : "standard"}
            // centered={query.isScrollable ? false : true}
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              backgroundColor: "#e0e0e0",
              borderRadius: "10px 10px 0 0",
              GridShadow: 20,
              width: ["300px", "628px", "900px", "1120px", "1250px", "1450px"],
              //height: ["30px", "20px", "30px", "40px", "50px"],
            }}
          >
            <Tab
              label={<ArrowCircleLeftIcon></ArrowCircleLeftIcon>}
              onClick={() => {
                cambiarTab("atras");
              }}
              sx={{
                borderRight: "5px solid #b3afaf",
                color: "#af8c55",
                fontFamily: "MontserratSemiBold",
                backgroundColor: "#ccc",
                width: ["0px", "65px", "130px", "187px", "210px"],
                display: ["none", "block", "block", "block"], // Oculta el Tab en pantallas más pequeñas
              }}
            />
            <Tab
              label="Identificacion"
              value={10}
              onClick={() => {
                setValue(10);
              }}
              sx={{
                borderRight: "5px solid #b3afaf",
                color: "black",
                fontFamily: "MontserratBold",
                width: ["15px", "65px", "160px", "187px", "210px"],
                fontSize: [8, 10, 13, 14, 15, 18], // Tamaños de fuente para diferentes breakpoints
              }}
            />
            <Tab
              label="Acciones"
              value={20}
              onClick={() => {
                setValue(20);
              }}
              sx={{
                borderRight: "5px solid #b3afaf",
                color: "black",
                fontFamily: "MontserratBold",
                width: ["15px", "65px", "160px", "187px", "210px"],
                fontSize: [8, 10, 13, 14, 15, 18], // Tamaños de fuente para diferentes breakpoints
              }}
            />

            <Tab
              label="Programas"
              value={30}
              onClick={() => {
                setValue(30);
              }}
              sx={{
                borderRight: "5px solid #b3afaf",
                color: "black",
                fontFamily: "MontserratBold",
                width: ["15px", "65px", "160px", "187px", "210px"],
                fontSize: [8, 10, 13, 14, 15, 18], // Tamaños de fuente para diferentes breakpoints
              }}
            />
            <Tab
              label="Resumen"
              value={40}
              onClick={() => {
                setValue(40);
              }}
              sx={{
                borderRight: "5px solid #b3afaf",
                color: "black",
                fontFamily: "MontserratBold",
                width: ["15px", "65px", "160px", "187px", "210px"],
                fontSize: [8, 10, 13, 14, 15, 18], // Tamaños de fuente para diferentes breakpoints
              }}
            />
            <Tab
              label={<ArrowCircleRightIcon></ArrowCircleRightIcon>}
              sx={{
                //borderRight: "5px solid #b3afaf",
                color: "#af8c55",
                backgroundColor: "#ccc",
                width: ["0px", "65px", "130px", "187px", "210px"],
                display: ["none", "block", "block", "block"], // Oculta el Tab en pantallas más pequeñas
              }}
              onClick={() => {
                cambiarTab("adelante");
              }}
            />
          </Tabs>

          <Grid
            sx={{
              //width: "93vw",
              width: ["300px", "650px", "900px", "1000px", "1100px", "1300px"],
              height: "82vh",
              //justifyContent: "center",
              borderRadius: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* tabs */}
            {value === 10 && <TabEncabezado edit={editMIR}
              show={value === 10 ? true : false}
              AI={ai}
              setAI={setAi}
              // mirEdit={mirEdirPadre}
              IdEntidad={IdEntidad}
              setIdEntidad={setIdEntidad}
              setAIIdentificacion={setAIIdentificacion} />}
            {value === 20 && (
              <TabAccion1
                AI={ai}
                noAcciones={noAcciones}
                addAccion={addAccion}
                addremoveAccion={addremoveAccion}
                setAi={setAi}
                setAIAcciones={setAIAcciones}
              />
            )}

            {value === 30 && 
            <TabPrograma
                AI={ai}
                noProgramas={noProgramas}
                addPrograma={addPrograma}
                addremovePrograma={addremovePrograma}
                setAi={setAi}
                setAIProgramas={setAIProgramas}
              />}
            {value === 40 &&
            <TabResumen 
              AI={ai}
              showResume={returnMain}
             />}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
