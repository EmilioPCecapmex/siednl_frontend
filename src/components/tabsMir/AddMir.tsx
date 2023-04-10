import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box } from "@mui/material";
import TabEncabezado from "./TabEncabezado";
import { TutorialBox } from "../tutorialBox/tutorialBox";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { IMIR } from "./IMIR";
import TabResumen from "./TabResumen";
import TabFinProposito from "./TabFinProposito";
import { TabComponente } from "./TabComponente";
import { TabActividades } from "./TabActividades";

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

  const [noComponentes, setNoComponentes] = useState([1, 2]);
  const [noActividades, setNoActividades] = useState(
    noComponentes.map((v, index) => {
      return [1, 2];
    })
  );

  let mir: IMIR =
    MIR !== ""
      ? JSON.parse(MIR)
      : {
          encabezado: {
            ejercicioFiscal: "",
            institucion: "",
            nombre_del_programa: "",
            eje: "",
            tema: "",
            objetivo: "",
            estrategia: "",
            lineas_de_accion: [],
            beneficiario: "",
            conac: "",
            consecutivo: "",
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
          componentes: noComponentes.map((x, index) => {
            return {
              componentes: "C" + (index + 1),
              resumen: "",
              indicador: "",
              frecuencia: "",
              formula: "",
              medios: "",
              supuestos: "",
            };
          }),
          actividades: [
            {
              actividad: "A1C1",
              resumen: "",
              indicador: "",
              frecuencia: "TRIMESTRAL",
              formula: "",
              medios: "",
              supuestos: "",
            },
            {
              actividad: "A2C1",
              resumen: "",
              indicador: "",
              frecuencia: "TRIMESTRAL",
              formula: "",
              medios: "",
              supuestos: "",
            },
            {
              actividad: "A1C2",
              resumen: "",
              indicador: "",
              frecuencia: "TRIMESTRAL",
              formula: "",
              medios: "",
              supuestos: "",
            },
            {
              actividad: "A2C2",
              resumen: "",
              indicador: "",
              frecuencia: "TRIMESTRAL",
              formula: "",
              medios: "",
              supuestos: "",
            },
          ],
          componenteActividad: noComponentes.map((x, index) => {
            return {
              actividades: noActividades[index],
              componente: `C${index + 1}`,
            };
          }),
        };

  const cambiarTab = (option: string) => {
    if (option === "adelante") {
      if (value < 50) setValue(value + 10);
    } else {
      if (value > 10) setValue(value - 10);
    }
  };

  const [MIRPADRE, setMIRPADRE] = useState<IMIR>(mir);

  useEffect(() => {
    let arr: Array<number> = [];
    MIRPADRE.componentes?.map((x, index) => {
      return arr.push(index + 1);
    });

    setNoComponentes(arr);

    let arr2: Array<Array<number>> = [];
    MIRPADRE.componenteActividad.map((v, index) => {
      return arr2.push(v.actividades);
    });

    setNoActividades(arr2);
  }, [MIR, MIRPADRE]);

  // useEffect(() => {
  //   let arr3: Array<IActividadesMir> = [];
  //   noComponentes.map((v, index) => {
  //     return arr3.push(
  //       {
  //         actividad: `A1C${index + 1}`,
  //         resumen: MIRPADRE.actividades[index]?.resumen || "",
  //         indicador: MIRPADRE.actividades[index]?.resumen || "",
  //         frecuencia: "TRIMESTRAL",
  //         formula: MIRPADRE.actividades[index]?.resumen || "",
  //         medios: MIRPADRE.actividades[index]?.resumen || "",
  //         supuestos: MIRPADRE.actividades[index]?.resumen || "",
  //       },
  //       {
  //         actividad: `A2C${index + 1}`,
  //         resumen: MIRPADRE.actividades[index]?.resumen || "",
  //         indicador: MIRPADRE.actividades[index]?.resumen || "",
  //         frecuencia: "TRIMESTRAL",
  //         formula: MIRPADRE.actividades[index]?.resumen || "",
  //         medios: MIRPADRE.actividades[index]?.resumen || "",
  //         supuestos: MIRPADRE.actividades[index]?.resumen || "",
  //       }
  //     );
  //   });

  //   setMIRPADRE((MIRPADRE: IMIR) => ({
  //     ...MIRPADRE,
  //     ...{
  //       actividades: arr3,
  //     },
  //   }));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [MIRPADRE.componentes]);

  // useEffect(() => {
  //   // console.log('actividades');

  //   // console.log(MIR.actividades);
  //   // console.log('componenteActividad');

  //   // console.log(MIR.componenteActividad);


  //   let indexActividades = 0;
  //   let n: Array<Array<IActividadesMir>> = [];

  //   MIR.componenteActividad.map((v, index) => {
  //     // console.log('componente: '+ (index+1));
  //     let aux: Array<IActividadesMir> = [];
  //     v.actividades.map((x) => {
  //       aux.push(MIR.actividades[indexActividades])
  //       indexActividades++;
  //     })
  //     n[index] = aux;
  //     console.log('imprimiendo n');

  //     console.log(n);

  //   })



  //   setActividades(MIR.actividades);
  // }, [MIR]);

  const addComponente = () => {
    let arrCompAct=MIRPADRE.componenteActividad;
    let arr: Array<number> = noComponentes;
    arr.push(noComponentes.length + 1);
    setNoComponentes(arr);

    let x=arr.length-1;
    let auxAct=MIRPADRE.actividades;

    auxAct.push({actividad: `A1C${x}`,
    resumen:  "",
    indicador:"",
    frecuencia: "TRIMESTRAL",
    formula: "",
    medios: "",
    supuestos:"",})
    auxAct.push({actividad: `A2C${x}`,
    resumen:  "",
    indicador:"",
    frecuencia: "TRIMESTRAL",
    formula: "",
    medios: "",
    supuestos:"",})
    

    setMIRPADRE((MIRPADRE: IMIR) => ({
      ...MIRPADRE,
      ...{
        componentes: arr.map((x, index) => {
          
          return {
            componentes: `C${index + 1}`,
            resumen: MIRPADRE.componentes[index]?.resumen || "",
            indicador: MIRPADRE.componentes[index]?.indicador || "",
            frecuencia: MIRPADRE.componentes[index]?.frecuencia || "",
            formula: MIRPADRE.componentes[index]?.formula || "",
            medios: MIRPADRE.componentes[index]?.medios || "",
            supuestos: MIRPADRE.componentes[index]?.supuestos || "",
          };
        }),
      },
      ...{
        componenteActividad: arr.map((x, index2) => {
          if(index2<arr.length-1){
            return arrCompAct[index2];
          }
          else{
            return {
            actividades: [1, 2],
            componente: `C${index2 + 1}`,
          };
          }
          
        }),
      },...{actividades:auxAct}
    }));

  
    console.log('act', MIRPADRE.actividades);
    console.log('com', MIRPADRE.componenteActividad);
  };

  const removeComponente = () => {
    let arr: Array<number> = noComponentes;
    if (noComponentes.length > 2) {
      arr.pop();
    }
    setNoComponentes(arr);
    setMIRPADRE((MIRPADRE: IMIR) => ({
      ...MIRPADRE,
      ...{
        componentes: arr.map((x, index) => {
          return {
            componentes: MIRPADRE.componentes[index].componentes,
            resumen: MIRPADRE.componentes[index].resumen,
            indicador: MIRPADRE.componentes[index].indicador,
            frecuencia: MIRPADRE.componentes[index].frecuencia,
            formula: MIRPADRE.componentes[index].formula,
            medios: MIRPADRE.componentes[index].medios,
            supuestos: MIRPADRE.componentes[index].supuestos,
          };
        }),
      },
      ...{
        componenteActividad: noComponentes.map((x, index) => {
          return {
            actividades: [1, 2],
            componente: `C${index + 1}`,
          };
        }),
      },
    }));
  };

  const addActividad = (componenteSelect: number) => {
    let arr: Array<number[]> = noActividades;
    arr[componenteSelect].push(noActividades[componenteSelect].length + 1);
    setNoActividades(arr);

    setMIRPADRE((MIRPADRE: IMIR) => ({
      ...MIRPADRE,
      ...{
        actividades: arr[componenteSelect].map((x, index) => {
          return {
            actividad: `A${index + 1}C${componenteSelect + 1}`,
            resumen: MIRPADRE.actividades[index]?.resumen || "",
            indicador: MIRPADRE.actividades[index]?.indicador || "",
            frecuencia: "TRIMESTRAL",
            formula: MIRPADRE.actividades[index]?.formula || "",
            medios: MIRPADRE.actividades[index]?.medios || "",
            supuestos: MIRPADRE.actividades[index]?.supuestos || "",
          };
        }),
      },
    }));
  };

  const removeActividad = (componenteSelect: number) => {
    let arr: Array<number[]> = noActividades;

    if (noActividades[componenteSelect].length > 2) {
      arr[componenteSelect].pop();
    }
    setNoActividades(arr);
    setMIRPADRE((MIRPADRE: IMIR) => ({
      ...MIRPADRE,
      ...{
        actividades: arr[componenteSelect].map((x, index) => {
          return {
            actividad: `A${index + 1}C${componenteSelect + 1}`,
            resumen: MIRPADRE.actividades[index]?.resumen || "",
            indicador: MIRPADRE.actividades[index]?.indicador || "",
            frecuencia: "TRIMESTRAL",
            formula: MIRPADRE.actividades[index]?.formula || "",
            medios: MIRPADRE.actividades[index]?.medios || "",
            supuestos: MIRPADRE.actividades[index]?.supuestos || "",
          };
        }),
      },
    }));
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
      }}
    >
      {value === 10 ? <TutorialBox initialState={22} endState={27} /> : null}
      {value === 20 ? <TutorialBox initialState={27} endState={28} /> : null}
      {value === 30 ? <TutorialBox initialState={28} endState={30} /> : null}
      {value === 40 ? <TutorialBox initialState={33} endState={35} /> : null}
      {value === 50 ? <TutorialBox initialState={30} endState={33} /> : null}

      <Box
        sx={{
          width: "auto",
          height: "90vh",
          borderRadius: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        
        }}
      >
        <Tabs
          value={value}
          textColor="inherit"
          sx={{
            backgroundColor: "#e0e0e0",
            borderRadius: "10px 10px 0 0",
            boxShadow: 20,
          }}
        >
          <Tab
            label={<ArrowCircleLeftIcon></ArrowCircleLeftIcon>}
            sx={{
              borderRight: "5px solid #b3afaf",
              color: "#af8c55",
              fontFamily: "MontserratSemiBold",
              backgroundColor: "#ccc",
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
            }}
          />

          <Tab
            label={<ArrowCircleRightIcon></ArrowCircleRightIcon>}
            sx={{
              borderRight: "5px solid #b3afaf",
              color: "#af8c55",
              backgroundColor: "#ccc",
            }}
            onClick={() => {
              cambiarTab("adelante");
            }}
          />
        </Tabs>

        <Box
          sx={{
            width: "75vw",
            height: "77vh",
          }}
        >
          <TabEncabezado
            show={value === 10 ? true : false}
            MIR={MIRPADRE}
            setMIR={setMIRPADRE}
          ></TabEncabezado>

          {value === 20 && (
            <TabFinProposito MIR={MIRPADRE} setMIR={setMIRPADRE} />
          )}

          {value === 50 && (
            <TabResumen showResume={showResume} MIRPADRE={MIRPADRE} idMir={IdMir} />
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
        { value === 40 &&<TabActividades
            noActividades={noActividades}
            addActividad={addActividad}
            removeActividad={removeActividad}
            MIR={MIRPADRE}
            setMIR={setMIRPADRE}
            noComponentes={noComponentes}
          ></TabActividades>}
          {/* )} */}
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
