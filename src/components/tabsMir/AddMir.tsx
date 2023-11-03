/* eslint-disase array-callback-return */
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { Grid, useMediaQuery } from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { IActividad, IComponente, IMIR, IMIREdit } from "./interfaces mir/IMIR";
import { TabActividades } from "./TabActividades";
import { TabComponente } from "./TabComponente";
import TabEncabezado from "./TabEncabezado";
import TabFinProposito from "./TabFinProposito";
import TabResumen from "./TabResumen";

import { alertaError } from "../alertas/Alertas";

function newActividad(indexComponente: number, indexActividad: number) {
  return {
    actividad: `A${indexActividad}C${indexComponente}`,
    resumen: "",
    indicador: "",
    frecuencia: "TRIMESTRAL",
    formula: "",
    medios: "",
    supuestos: "",
  }
}

function newComponente(index: number) {
  let componente: IComponente
  componente = {
    componente: "C" + (index),
    resumen: "",
    indicador: "",
    frecuencia: "",
    formula: "",
    medios: "",
    supuestos: "",
    actividades: [1, 2].map((item) => newActividad(index, item)),
  }
  return (componente)
}

export default function FullModalMir({
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

  const noComponentes = [1, 2];
  const [noActividades, setNoActividades] = useState(
    noComponentes.map((v, index) => {
      return [1, 2];
    })
  );

  let mir: IMIR =
    MIR !== ""
      ? JSON.parse(MIR).length > 1
        ? JSON.parse(MIR)[0]
        : JSON.parse(MIR)
      : {
        encabezado: {
          ejercicioFiscal: "",
          entidad: "",
          nombre_del_programa: "",
          eje: "",
          tema: "",
          objetivo: "",
          estrategia: "",
          lineas_de_accion: [],
          beneficiario: "",
          conac: "",
          consecutivo: "",
          anticorrupcion: "NO",
        },
        fin: {
          resumen: "",
          indicador: "",
          formula: "",
          frecuencia: "",
          medios: "",
          supuestos: "",
        },
        proposito: {
          resumen: "",
          indicador: "",
          formula: "",
          frecuencia: "ANUAL",
          medios: "",
          supuestos: "",
        },
        componentes: noComponentes.map((item) => {
          return newComponente(item);
        }),
        // actividades: [
        //   {
        //     actividad: "A1C1",
        //     resumen: "",
        //     indicador: "",
        //     frecuencia: "TRIMESTRAL",
        //     formula: "",
        //     medios: "",
        //     supuestos: "",
        //   },
        //   {
        //     actividad: "A2C1",
        //     resumen: "",
        //     indicador: "",
        //     frecuencia: "TRIMESTRAL",
        //     formula: "",
        //     medios: "",
        //     supuestos: "",
        //   },
        //   {
        //     actividad: "A1C2",
        //     resumen: "",
        //     indicador: "",
        //     frecuencia: "TRIMESTRAL",
        //     formula: "",
        //     medios: "",
        //     supuestos: "",
        //   },
        //   {
        //     actividad: "A2C2",
        //     resumen: "",
        //     indicador: "",
        //     frecuencia: "TRIMESTRAL",
        //     formula: "",
        //     medios: "",
        //     supuestos: "",
        //   },
        // ],
        // componenteActividad: noComponentes.map((x, index) => {
        //   return {
        //     actividades: noActividades[index],
        //     componente: `C${index + 1}`,
        //   };
        // }),
      };

  let mirEdit: IMIREdit =
    MIR !== "" && JSON.parse(MIR).length > 1
      ? JSON.parse(MIR)[1]
      : {
        encabezado: {
          ejercicioFiscal: false,
          institucion: false,
          nombre_del_programa: false,
          eje: false,
          tema: false,
          objetivo: false,
          estrategia: false,
          lineas_de_accion: false,
          beneficiario: false,
          conac: false,
          consecutivo: false,
        },
        fin: {
          resumen: false,
          indicador: false,
          formula: false,
          frecuencia: false,
          medios: false,
          supuestos: false,
        },
        proposito: {
          resumen: false,
          indicador: false,
          formula: false,
          frecuencia: false,
          medios_verificacion: false,
          supuestos: false,
        },
        componentes: noComponentes.map((x, index) => {
          return {
            componentes: "C" + (index + 1),
            resumen: false,
            indicador: false,
            frecuencia: false,
            formula: false,
            medios: false,
            supuestos: false,
          };
        }),
        actividades: [
          {
            actividad: "A1C1",
            resumen: false,
            indicador: false,
            frecuencia: false,
            formula: false,
            medios: false,
            supuestos: false,
          },
          {
            actividad: "A2C1",
            resumen: false,
            indicador: false,
            frecuencia: false,
            formula: false,
            medios: false,
            supuestos: false,
          },
          {
            actividad: "A1C2",
            resumen: false,
            indicador: false,
            frecuencia: false,
            formula: false,
            medios: false,
            supuestos: false,
          },
          {
            actividad: "A2C2",
            resumen: false,
            indicador: false,
            frecuencia: false,
            formula: false,
            medios: false,
            supuestos: false,
          },
        ],
      };

  const cambiarTab = (option: string) => {
    if (option === "adelante") {
      if (value < 50) setValue(value + 10);
    } else {
      if (value > 10) setValue(value - 10);
    }
  };

  const [MIRPADRE, setMIRPADRE] = useState<IMIR>(mir);

  // ESTE USE EFFECT ES PARA CUANDO ENTRAMOS DE UNA NUEVA MIR
  // useEffect(() => {
  //   let arr: Array<number> = [];
  //   MIRPADRE?.componentes?.map((x, index) => {
  //     return arr.push(index + 1);
  //   });

    // setNoComponentes(arr);

  //   let arr2: Array<Array<number>> = [];
  //   MIRPADRE.componenteActividad.map((v, index) => {
  //     return arr2.push(v.actividades);
  //   });

  //   setNoActividades(arr2);
  // }, [MIR, MIRPADRE]);

  const addComponente = () => {
    console.log("componentes", MIRPADRE.componentes);


    let arrComponentes: IComponente[] = MIRPADRE.componentes
    arrComponentes.push(newComponente(MIRPADRE.componentes.length + 1));
    setMIRPADRE({ ...MIRPADRE, componentes: arrComponentes });
    
    console.log("componentes actualizados", arrComponentes);
  }



  const removeComponente = (componenteSelected: number) => {

    let arrComponentes: IComponente[] = MIRPADRE.componentes.filter((componente) => !componente.componente.includes(`C${componenteSelected}`))

    arrComponentes = arrComponentes.map((componente, index) => {
      if (parseInt(componente.componente.split("C")[1]) >= componenteSelected) {
        let aux = { ...componente, componente: `C${index + 1}`, actividades: componente.actividades.map((item) => { return { ...item, actividad: item.actividad.replace(/C\d+/, `C${index + 1}`) } }) }
        return aux
      } else
        return componente
    })

    setMIRPADRE({ ...MIRPADRE, componentes: arrComponentes });
    console.log("componentes", MIRPADRE.componentes);
    console.log("componentes actualizados", arrComponentes)
  };

  const addActividad = (componenteSelect: number) => {

    let arrComponentes: IComponente[] = MIRPADRE.componentes

    arrComponentes = arrComponentes.map((item, index) => {
      if (index + 1 === componenteSelect) {
        let aux = item.actividades;

        console.log("componenteSelect", componenteSelect);
        console.log("item.actividades.length", item.actividades.length);
        aux.push(newActividad(componenteSelect, item.actividades.length + 1))
        return { ...item, actividades: aux };
      } else {
        return item;
      }
    })
    console.log("actividades",arrComponentes);
    
    setMIRPADRE({ ...MIRPADRE, componentes: arrComponentes })

  };

  const removeActividad = (componenteSelect: number, actividadSelect: number) => {
    console.log("componenteSelect", componenteSelect);
    console.log("actividadSelect", actividadSelect);

    let arrComponentes: IComponente[] = MIRPADRE.componentes
    if (arrComponentes[componenteSelect - 1].actividades.length > 2) {
      arrComponentes = arrComponentes.map((componente, index) => {

        let arrActividades = componente.actividades.filter((item) => (item.actividad !== `A${actividadSelect}C${componenteSelect}`))
        arrActividades = arrActividades.map((item, current) => { return { ...item, actividad: `A${current + 1}C${index + 1}` } })
        return { ...componente, actividades: arrActividades }
      })
      setMIRPADRE({ ...MIRPADRE, componentes: arrComponentes });
      console.log("Objeto", arrComponentes );

    } else {
      alertaError("El minimo de componentes son dos.")
    }
  };


  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 500px)"),

    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 600px)"),
  };



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
              sx={{
                borderRight: "5px solid #b3afaf",
                color: "#af8c55",
                fontFamily: "MontserratSemiBold",
                backgroundColor: "#ccc",
                width: ["0px", "65px", "130px", "160px", "175px"],
                display: ["none", "block", "block", "block"], // Oculta el Tab en pantallas más pequeñas
              }}
              onClick={() => {
                cambiarTab("atras");
              }}
            />
            <Tab
              label="Encabezado"
              value={10}
              onClick={() => {
                setValue(10);
              }}
              sx={{
                borderRight: "5px solid #b3afaf",
                color: "black",
                fontFamily: "MontserratBold",
                width: ["15px", "65px", "130px", "160px", "180px"],
                fontSize: [8, 10, 13, 14, 15, 18], // Tamaños de fuente para diferentes breakpoints
              }}
            />
            <Tab
              label="Fin / Propósito"
              value={20}
              onClick={() => {
                setValue(20);
              }}
              sx={{
                borderRight: "5px solid #b3afaf",
                color: "black",
                fontFamily: "MontserratBold",
                width: ["15px", "65px", "130px", "160px", "180px"],
                fontSize: [8, 10, 13, 14, 15, 18], // Tamaños de fuente para diferentes breakpoints
              }}
            />
            <Tab
              label="Componentes"
              value={30}
              onClick={() => {
                setValue(30);
              }}
              sx={{
                borderRight: "5px solid #b3afaf",
                color: "black",
                fontFamily: "MontserratBold",
                width: ["15px", "65px", "130px", "160px", "180px"],
                fontSize: [8, 10, 13, 14, 15, 18], // Tamaños de fuente para diferentes breakpoints
              }}
            />
            <Tab
              label="Actividades"
              value={40}
              onClick={() => {
                setValue(40);
              }}
              sx={{
                borderRight: "5px solid #b3afaf",
                color: "black",
                fontFamily: "MontserratBold",
                width: ["15px", "65px", "130px", "160px", "180px"],
                fontSize: [8, 10, 13, 14, 15, 18], // Tamaños de fuente para diferentes breakpoints
              }}
            />
            <Tab
              label="Resumen"
              value={50}
              onClick={() => {
                setValue(50);
              }}
              sx={{
                borderRight: "5px solid #b3afaf",
                color: "black",
                fontFamily: "MontserratBold",
                width: ["15px", "65px", "130px", "160px", "180px"],
                fontSize: [8, 10, 13, 14, 15, 18], // Tamaños de fuente para diferentes breakpoints
              }}
            />

            <Tab
              label={<ArrowCircleRightIcon></ArrowCircleRightIcon>}
              sx={{
                //borderRight: "5px solid #b3afaf",
                color: "#af8c55",
                backgroundColor: "#ccc",
                width: ["0px", "65px", "130px", "160px", "175px"],
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
            <TabEncabezado
              show={value === 10 ? true : false}
              MIR={MIRPADRE}
              setMIR={setMIRPADRE}
              mirEdit={mirEdit}
            ></TabEncabezado>

            {value === 20 && (
              <TabFinProposito MIR={MIRPADRE} setMIR={setMIRPADRE} />
            )}

            {value === 50 && (
              <TabResumen
                showResume={showResume}
                MIRPADRE={MIRPADRE}
                idMir={IdMir}
              />
            )}

            {value === 30 && (
              <TabComponente
                noComponentes={noComponentes}
                addComponente={addComponente}
                removeComponente={removeComponente}
                MIR={MIRPADRE}
                setMIR={setMIRPADRE}
              ></TabComponente>
            )}

            {/* {value === 40 && ( */}
            {value === 40 && (
              <TabActividades
                // noActividades={noActividades}
                addActividad={addActividad}
                removeActividad={removeActividad}
                MIR={MIRPADRE}
                setMIR={setMIRPADRE}
              // noComponentes={noComponentes}
              ></TabActividades>
            )}
          </Grid>

          {/* )} */}

        </Grid>

      </Grid>
    </Grid>
  );
}


