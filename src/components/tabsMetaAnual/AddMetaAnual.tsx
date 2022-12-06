import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {TabFinPropositoMA } from "./TabFinPropositoMA";
import { Box, IconButton } from "@mui/material";
import { TabComponenteMA } from "./TabComponente";
import { TabActividadesMA } from "./TabActividades";
import { IFinMA, IPropositoMA } from "./IFin";
import { IComponenteMA, ICValorMA } from "./Interfaces";
import TabResumenMA from "./TabResumenMA";

import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { IComponenteActividad } from "../tabsMir/AddMir";
import TabResumenMIR from "../modalsMA/ModalResumenMir";
export default function AddMetaAnual({
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

  const showMirFnc = (state: boolean) => {
    setShowMir(state);
  };

  const showFnc = (st: string) => {
    setShowSt(st);
  };

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  const cambiarTab = (option: string) => {
    if (option === "adelante") {
      if (value < 50) setValue(value + 10);
    } else {
      if (value > 20) setValue(value - 10);
    }
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
  }, []);

  // COMPONENTES ------------------ No me sirve para FichaTecnica
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

  // ACTIVIDADES ------------------ No me sirve para FichaTecnica
  const [compAct, setCompAct] = useState<Array<IComponenteActividad>>([]);
  const [componenteActividad, setComponenteActividad] = useState([
    {
      componentes: noComponentes.map((x) => [1, 2]),
    },
  ]);

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

  useEffect(() => {
    let arrayMA = noComponentes.map((x, index) => {
      return {
        componentes: "C" + (index + 1),
        metaAnual: "",
        lineaBase: "",
        metasPorFrecuencia: [
          {
            semestre1: "",
            semestre2: "",
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
    });
    setValoresComponenteMA(arrayMA);
  }, []);

  const [ValueFin, setValueFin] = useState<Array<IFinMA>>([]);
  const [ValueProposito, setValueProposito] = useState<Array<IPropositoMA>>([]);

  // ------------------ No me sirve para FichaTecnica ---------------------------

  const resumenFinMa = (arr: Array<IFinMA>) => {
    setValueFin(arr);
  };
  const resumenPropositoMa = (arr: Array<IPropositoMA>) => {
    setValueProposito(arr);
  };
  // ------------------ No me sirve para FichaTecnica ---------------------------

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
          width: "75vw",
          height: "90vh",
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
                borderRight: "5px solid #b3afaf",
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
          <TabFinPropositoMA
            MA={MA}
            MIR={MIR}
            setTxtShowFnc={showFnc}
            show={value === 20 ? true : false}
            resumenFinMa={resumenFinMa}
            resumenPropositoMa={resumenPropositoMa}
            showMirFnc={showMirFnc}
          ></TabFinPropositoMA>

          <TabComponenteMA
            setTxtShowFnc={showFnc}
            showMirFnc={showMirFnc}
            show={value === 30 ? true : false}
            valoresComponenteMAFnc={valoresComponenteMAFnc}
            noComponentes={noComponentes}
            MA={MA}
            MIR={MIR}
          ></TabComponenteMA>

          <TabActividadesMA
            setTxtShowFnc={showFnc}
            showMirFnc={showMirFnc}
            compAct={compAct}
            show={value === 40 ? true : false}
            componentes={noComponentes}
            asignarCValor={asignarCValorMA}
            MA={MA}
            MIR={MIR}
          ></TabActividadesMA>

          <TabResumenMA
            show={value === 50 ? true : false}
            componentes={noComponentes}
            componenteValor={valoresComponenteMA}
            cValor={cValorMA}
            fin={ValueFin}
            proposito={ValueProposito}
            IdMir={IdMir}
            IdMA={IdMA}
            showResume={showResume}
            MIR={MIR}
          ></TabResumenMA>

          <TabResumenMIR
            show={showMir}
            showMirFnc={showMirFnc}
            showSt={showSt}
            MIR={MIR}
            noComponentes={noComponentes}
          ></TabResumenMIR>
        </Box>

        <Box
          sx={{
            width: "30%",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={() => {
              cambiarTab("atras");
            }}
          >
            <ArrowCircleLeftIcon
              sx={{
                color: "#c4a57b",
                width: "3vw",
                height: "3vw",
              }}
            />
          </IconButton>

          <IconButton
            onClick={() => {
              cambiarTab("adelante");
            }}
          >
            <ArrowCircleRightIcon
              sx={{
                color: "#c4a57b",
                width: "3vw",
                height: "3vw",
              }}
            />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
