import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Grid, useMediaQuery } from "@mui/material";

import TabAccion1 from "./TabAccion1";
import TabAccion2 from "./TabAccion2";
import TabIdentificacion from "./TabIdentificacion";
import { TabResumen } from "./TabResumen";
import TabAvance from "./TabAvance";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { IAI } from "../../screens/actividadesInstitucionales/InterfacesActividadesInstitucionales";

const newAI = {
  identificacion: {
    programaSectorial: "",
    objetivoProgramaSectorial: "",
    objetivogeneral: "",
    objetivosespecificos: [],
  },
  acciones: [
    {
      accion: "",
      descripcion: "",
      nombreIndicador: "",
      formula: "",
      unidadMedida: "",
      numerador: "",
      medio_fuente: "",
      denomidador: "",
      medio_fuente2: "",
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
}: {
  MIR: string;

  FT: string;
  AI: string;
  opentabs: Function;
  IdMir: string;
  IdFT: string;
  IdAI: string;
  returnMain: Function;
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

  const [noAcciones, setNoAcciones] = useState([1]);
  const [apartado, setApartado] = useState(
    noAcciones.map((v, index) => {
      return [1, 2];
    })
  );

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
            accion: `A${index + 1}`,
            descripcion: ai.acciones[index]?.descripcion || "",
            nombreIndicador: ai.acciones[index]?.nombreIndicador || "",
            formula: ai.acciones[index]?.formula || "",
            unidadMedida: ai.acciones[index]?.unidadMedida || "",
            numerador: ai.acciones[index]?.numerador || "",
            medio_fuente: ai.acciones[index]?.numerador || "",
            denomidador: ai.acciones[index]?.medio_fuente || "",
            medio_fuente2: ai.acciones[index]?.medio_fuente2 || "",
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
            accion: `A${index + 1}`,
            descripcion: ai.acciones[index]?.descripcion || "",
            nombreIndicador: ai.acciones[index]?.nombreIndicador || "",
            formula: ai.acciones[index]?.formula || "",
            unidadMedida: ai.acciones[index]?.unidadMedida || "",
            numerador: ai.acciones[index]?.numerador || "",
            medio_fuente: ai.acciones[index]?.numerador || "",
            denomidador: ai.acciones[index]?.medio_fuente || "",
            medio_fuente2: ai.acciones[index]?.medio_fuente2 || "",
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
              label="Accion 1"
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
              label="Avance fisico financiero"
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
            {value === 10 && <TabIdentificacion AI={AI} />}
            {value === 20 && (
              <TabAccion1
                AI={ai}
                noAcciones={noAcciones}
                addAccion={addAccion}
                addremoveAccion={addremoveAccion}
                setAi={setAi}
              />
            )}

            {value === 30 && <TabAvance />}
            {value === 40 && <TabResumen showResume={returnMain} />}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
