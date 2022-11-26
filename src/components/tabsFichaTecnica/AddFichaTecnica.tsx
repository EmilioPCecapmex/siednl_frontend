import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { TabEncabezado } from "./TabEncabezado";
import { IComponenteMA } from "../tabsMetaAnual/Interfaces";
import { IFinMA, IPropositoMA } from "../tabsMetaAnual/IFin";
import { TabActividades } from "./tabActividades";
import TabResumenFT from "./TabResumenFT";
import { TabComponentes } from "./tabComponentes";
import { TabFinProposito } from "./tabFinProposito";
import { TabEncabezadoFT } from "./TabEncabezadoFT";

import { Box, IconButton } from "@mui/material";

import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

export default function AddFichaTecnica({
  MIR,
  showResume,
  IdMir,
  IdMA,
  anioFiscalEdit,
  MA,
}: {
  MIR: string;
  showResume: Function;
  IdMir: string;
  IdMA: string;
  anioFiscalEdit: string;
  MA: string;
}) {
  const [value, setValue] = React.useState(10);
  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };
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

  const [actividades, setActividades] = React.useState([1, 2]);
  const [componenteActividad, setComponenteActividad] = useState([
    {
      componentes: noComponentes.map((x) => actividades),
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
            }),
          };
        }),
      };
    })
  );
  const [ValueFin, setValueFin] = useState<Array<IFinMA>>([]);
  const [ValueProposito, setValueProposito] = useState<Array<IPropositoMA>>([]);

  const cambiarTab = (option: string) => {
    if (option === "adelante") {
      if (value < 50) setValue(value + 10);
    } else {
      if (value > 10) setValue(value - 10);
    }
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
          <TabEncabezadoFT show={value === 10 ? true : false}></TabEncabezadoFT>

          <TabFinProposito
            show={value === 20 ? true : false}
            resumenFin={() => {}}
            resumenProposito={() => {}}
            cargaFin={[]}
            cargaProposito={[]}
            mirEdit={MIR ? JSON.parse(MIR)[1] : null}
          ></TabFinProposito>

          <TabComponentes
            show={value === 30 ? true : false}
            noComponentesFnc={() => {}}
            valoresComponenteFnc={() => {}}
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
            asignarCValor={() => {}}
            fichaTecnicaEdit={MIR ? JSON.parse(MIR)[1] : null}
          ></TabActividades>

          <TabResumenFT
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
