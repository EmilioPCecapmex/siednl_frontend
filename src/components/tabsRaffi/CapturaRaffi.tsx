import {
  Tabs,
  Tab,
  Grid,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { TabComponenteRf } from "./TabComponentesRf";
import { TabActividadRf } from "./TabsActividadesRf";
import { IComponenteMA, ICValorMA } from "./Interfaces";
import { IComponenteActividad } from "../tabsMir/AddMir";
import { IMIR, IMIREdit } from "../tabsMir/IMIR";
export default function CapturaRaffi({
  MIR,
  MA,
  showResume,
  IdMir,
  IdMA,
}: {
  MIR: string;
  MA: string;
  showResume: Function;
  IdMir: string;
  IdMA: string;
}) {
  const [value, setValue] = React.useState(20);

  const [showMir, setShowMir] = React.useState(false);

  const [showSt, setShowSt] = React.useState("");

  const [noComponentes, setNoComponentes] = React.useState([1, 2]);


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
  // const [value, setValue] = useState(10);

  const showMirFnc = (state: boolean) => {
    setShowMir(state);
  };

  const showFnc = (st: string) => {
    setShowSt(st);
  };

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


        console.log("a"+MIR);

  // const jsonMir = JSON.parse(MIR);

  useEffect(() => {
    let act: number[] = [];
    let comp: string[] = [];
    let ambos: any = [];
    let i = 1;
    let j = 1;

    jsonMir.componentes.map((x: any) => {
      comp.push("C" + j);
      jsonMir.actividades.map((a: any) => {
        if (a.actividad.substring(0, 4) === "A" + i + "C" + j) {
          act.push(i);
          i++;
        }
      });
      ambos.push({ actividades: act, componente: "C" + j });
      act = [];
      i = 1;
      j++;
    });

    setCompAct(ambos);

    jsonMir.componentes.map((value: any, index: number) => {
      if (index > 1 && index < 6)
        setNoComponentes((loadComponentes) => [...loadComponentes, index + 1]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  




  const cambiarTab = (option: string) => {
    if (option === "adelante") {
      if (value < 30) setValue(value + 10);
    } else {
      if (value > 10) setValue(value - 10);
    }
  };
  const [compAct, setCompAct] = useState<Array<IComponenteActividad>>([]);
  const componenteActividad = [
    {
      componentes: noComponentes.map((x) => [1, 2]),
    },
  ];
  return (
    
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
      }}
    >
      <Grid
        item
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
            label="Componentes"
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
            label="Actividades"
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
            label="Resumen"
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

        <Grid
          item
          sx={{
            width: "75vw",
            height: "77vh",
          }}
        >
          {value === 10 && <TabComponenteRf setTxtShowFnc={showFnc}
            showMirFnc={showMirFnc}
            show={value === 10 ? true : false}
            valoresComponenteMAFnc={valoresComponenteMAFnc}
            noComponentes={noComponentes}
            MA={MA}
            MIR={MIR}/>}

          {value === 20 && <TabActividadRf />}
        </Grid>
      </Grid>
    </Grid>
  );
}
