import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabResumenFT, { IEncabezadoEditFT } from "./TabResumenFT";
import { TabFinPropositoFT } from "./tabFinProposito";
import { TabComponenteFT2 } from "./TabComponentes2";
import { Box, IconButton } from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { TabActividadesFT } from "./tabActividades";
import { IComponenteActividad } from "../tabsMir/AddMir";
import { ICValorFT, IFinFT, IPropositoFT, IComponentesFT, IEncabezadoFT } from "./Interfaces";
import { TabEncabezado } from "./TabEncabezado";

export default function AddFichaTecnica({
  MIR,
  MA,
  FT,
  showResume,
  IdMir,
  IdMA,
  IdFT,
}: {
  MIR: string;
  MA: string;
  FT: string;
  showResume: Function;
  IdMir: string;
  IdMA: string;
  IdFT: string;
}) {


  const [encabezado, setEncabezado] = useState<Array<IEncabezadoFT>>();
  
  const [value, setValue] = React.useState(10);

  const [showMir, setShowMir] = React.useState(false);

  const [showSt, setShowSt] = React.useState("");

  const showMirFnc = (state: boolean) => {
    setShowMir(state);
  };

  const setTxtShowFnc = (st: string) => {
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

  const [noComponentes, setNoComponentes] = React.useState([1, 2]);

  const [valoresComponenteMA, setValoresComponenteFT] = useState<
    Array<IComponentesFT>
  >(
    noComponentes.map((x, index) => {
      return {
        componentes: "C" + (index + 1),
        tipoDeIndicador: "",
        claridad: "",
        relevancia: "",
        economia: "",
        monitoreable: "",
        adecuado: "",
        aporte_marginal: "",
        dimension: "",
        unidadDeMedida: "",
      };
    })
  );

  const [compAct, setCompAct] = useState<Array<IComponenteActividad>>([]);

  const [componenteActividad, setComponenteActividad] = useState([
    {
      componentes: noComponentes.map((x) => [1, 2]),
    },
  ]);

  const [cValorFT, setCValorFT] = useState(
    componenteActividad.map((item) => {
      return {
        componentes: item.componentes.map((x, index) => {
          return {
            actividades: x.map((c, index2) => {
              return {
                actividad: "",
                tipoDeIndicador: "",
                claridad: "",
                relevancia: "",
                economia: "",
                monitoreable: "",
                adecuado: "",
                aporte_marginal: "",
                dimension: "",
                unidadDeMedida: "",
              };
            }),
          };
        }),
      };
    })
  );

  const asignarCValorFT = (state: Array<ICValorFT>) => {
    setCValorFT(state);
  };

  useEffect(() => {
    let arrayFT = noComponentes.map((x, index) => {
      return {
        componentes: "C" + (index + 1),
        tipoDeIndicador: "",
        claridad: "",
        relevancia: "",
        economia: "",
        monitoreable: "",
        adecuado: "",
        aporte_marginal: "",
        dimension: "",
        unidadDeMedida: "",
      };
    });
    setValoresComponenteFT(arrayFT);
  }, [noComponentes]);

  const [ValueEncabezado, setValueEncabezado] = useState<Array<IEncabezadoFT>>([]);

  const [ValueFin, setValueFin] = useState<Array<IFinFT>>([]);

  const [ValueProposito, setValueProposito] = useState<Array<IPropositoFT>>([]);

  const resumenEncabezadoFT = (st: Array<IEncabezadoFT>) => {
    setValueEncabezado(st);
  };

  const resumenFinFT = (st: Array<IFinFT>) => {
    setValueFin(st);
  };

  const resumenPropositoFT = (st: Array<IPropositoFT>) => {
    setValueProposito(st);
  };

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
            <TabEncabezado
              show={value === 10 ? true : false}
              resumenEncabezadoFT={resumenEncabezadoFT}
              FT={FT}
            ></TabEncabezado>

          <TabFinPropositoFT
            show={value === 20 ? true : false}
            resumenFinFT={resumenFinFT}
            resumenPropositoFT={resumenPropositoFT}
            FT={FT}
            MIR={MIR}
          ></TabFinPropositoFT>

          {/* <TabComponenteFT
            show={value === 30 ? true : false}
            noComponentesFnc={() => {}}
            valoresComponenteFnc={() => {}}
            noComponentes={noComponentes}
            // valoresComponente={() => {}}

          ></TabComponenteFT> */}

          <TabComponenteFT2
            show={value === 30 ? true : false}
            //noComponentesFnc ={() => {}}
            valoresComponenteMAFnc={() => {}}
            noComponentes={noComponentes}
            // valoresComponente={() => {}}
            showFnc={setTxtShowFnc}
            showMirFnc={showMirFnc}
            valoresComponenteMA={[]}
            FT={FT}
          ></TabComponenteFT2>

          <TabActividadesFT
            show={value === 40 ? true : false}
            setTxtShowFnc={setTxtShowFnc}
            showMirFnc={showMirFnc}
            compAct={compAct}
            componentes={noComponentes}
            asignarCValor={asignarCValorFT}
            FT={FT}
          ></TabActividadesFT>

          <TabResumenFT
            show={value === 50 ? true : false}
            encabezado={ValueEncabezado}
            fin={ValueFin}
            proposito={ValueProposito}
            componentes={noComponentes}
            componenteValor={[]}
            cValor={cValorFT}
            IdMir={IdMir}
            IdMA={IdMA}
            IdFT={IdFT}
            showResume={showResume}
            Ft={FT}
            MIR={MIR}
          ></TabResumenFT>
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
            disabled={value === 10 ? true : false}
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
