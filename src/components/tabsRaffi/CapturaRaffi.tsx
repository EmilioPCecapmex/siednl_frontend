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
import TabResumenMIR from "../modalsRF/ModalResumenMir";

export default function CapturaRaffi({
  MIR,
  MA,
  RF,
  showResume,
  IdMir,
  IdMA,
}: {
  MIR: string;
  MA: string;
  RF: string;
  showResume: Function;
  IdMir: string;
  IdMA: string;
}) {
  const [value, setValue] = useState(10);
  const [compAct, setCompAct] = useState<Array<IComponenteActividad>>([]);
  const cambiarTab = (option: string) => {
    if (option === "adelante") {
      if (value < 30) setValue(value + 10);
    } else {
      if (value > 10) setValue(value - 10);
    }
  };


  const [showMir, setShowMir] = React.useState(false);
  const [showSt, setShowSt] = React.useState("");
  const showMirFnc = (state: boolean) => {
    setShowMir(state);
  };
  const showFnc = (st: string) => {
    setShowSt(st);
  };


  const jsonMir = JSON.parse(MIR);

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

  const componenteActividad = [
    {
      componentes: noComponentes.map((x) => [1, 2]),
    },
  ];

  const [cValorMA, setCValorMA] = useState(
    componenteActividad.map((item) => {
      return {
        componentes: item.componentes.map((x, index) => {
          return {
            actividades: x.map((c, index2) => {
              return {
                actividad: "",
                metaAnual: "",
                lineaBase: "",
                metasPorFrecuencia: [
                  {
                    trimestre1: "",
                    trimestre2: "",
                    trimestre3: "",
                    trimestre4: "",
                  },
                ],
                valorNumerador: "",
                valorDenominador: "",
                sentidoDelIndicador: "",
                unidadResponsable: "",
                descIndicador: "",
                descNumerador: "",
                descDenominador: "",
              };
            }),
          };
        }),
      };
    })
  );

  const asignarCValorMA = (state: Array<ICValorMA>) => {
    setCValorMA(state);
  };

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
          container
          item
          sx={{
            display: "flex",
            width: "75vw",
            height: "75vh",
            boxShadow: 10,
            borderRadius: 5,
            flexDirection: "column",
            backgroundColor: "#fff",
          }}
        >
          {value === 10 && <TabComponenteRf 
            
            valoresComponenteMAFnc={valoresComponenteMAFnc}
            noComponentes={noComponentes}
            MA={MA}
            MIR={MIR}
            RF={RF}
            setTxtShowFnc={showFnc}
            showMirFnc={showMirFnc} />}

          {value === 20 && <TabActividadRf 

          valoresComponenteMAFnc={valoresComponenteMAFnc}
          componentes={noComponentes}
          asignarCValor={asignarCValorMA}
          MA={MA}
          MIR={MIR} 
          compAct={compAct}
          setTxtShowFnc={showFnc}
            showMirFnc={showMirFnc} />}
          
          
        </Grid>
      </Grid>
      <TabResumenMIR
            show={showMir}
            showMirFnc={showMirFnc}
            showSt={showSt}
            MIR={MIR}
            noComponentes={noComponentes}
          ></TabResumenMIR>
    </Grid>
    
  );
}
