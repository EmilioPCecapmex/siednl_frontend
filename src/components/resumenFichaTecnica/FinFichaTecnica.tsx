import logo from "../../assets/logos/logo_tesoreriah1.png";
import { Box, Divider, Typography } from "@mui/material";
import { json } from "stream/consumers";
import { useEffect, useState } from "react";

export const FinFechaTecnica = ({
  MIR,
  MA,
  FT,
}: {
  MIR: string;
  MA: string;
  FT: string;
}) => {
  
  //DESIGNS
  const sxTitleDesignPage1 = {
    ml: "3vw",
    width: "62vw",
    height: "5vh",
    display: "flex",
    justifyContent: "start",
    borderBottom: 2,
    mt: "1vw",
  };
  const sxBoxSmallSize = {
    width: "62vw",
    height: "2vh",
    display: "flex",
    flexDirection: "row",
    ml: "3.4vw",
    mt: "1vw",
    mb: "1vw",
  };
  const sxBoxMediumSize = {
    width: "62vw",
    height: "5vh",
    display: "flex",
    flexDirection: "row",
    ml: "3.4vw",
    mt: "1vw",
    mb: "1vw",
  };
  const sxSubtitleSmallSize = {
    width: "22vw",
    height: "2vh",
    backgroundColor: "#D9D9D9",
    display: "flex",
    alignItems: "center",
    border: 1,
    borderColor: "#D9D9D9",
  };
  const sxSubtitleMediumSize = {
    width: "22vw",
    height: "5vh",
    backgroundColor: "#D9D9D9",
    display: "flex",
    alignItems: "center",
    border: 1,
    borderColor: "#D9D9D9",
  };
  const sxResultFieldSmallSize = {
    width: "38vw",
    height: "2vh",
    display: "flex",
    alignItems: "center",
    border: 1,
    ml: "2vw",
  };
  const sxResultFieldMediumSize = {
    width: "38vw",
    height: "5vh",
    display: "flex",
    alignItems: "center",
    border: 1,
    ml: "2vw",
  };

  //ARRAYS DEFAULT VALUES
  const headerTextsValue = [
    "GOBIERNO DEL ESTADO DE NUEVO LEÓN",
    "SECRETARÍA DE FINANZAS Y TESORERÍA GENERAL DEL ESTADO",
    "PRESUPUESTO POR RESULTADOS",
    "FICHA TECNICA DE INDICADORES 2022",
    "PROGRAMAS PRESUPUESTARIOS",
  ];
  const clasificacionProgramaticaValue = ["CONAC", "PROGRAMA"];
  const titleColumnsNormalPag1Value = [
    "IDENTIFICACIÓN DEL PROGRAMA PRESUPUESTARIO",
    "ALINEACIÓN A LA PLANEACIÓN DEL DESARROLLO",
    "ALINEACIÓN ODS",
  ];

  const titleColumnsNormalPag2Value = [
    "DATOS DEL INDICADOR:",
    "CARACTERÍSTICAS DEL INDICADOR",
    "DATOS DE LAS VARIABLES",
    "METAS",
    "PARÁMETROS DE SEMAFORIZACIÓN",
  ];

  const subTitleColumnsIndicatorDataPag2Value = [
    "NOMBRE DEL INDICADOR:",
    "DESCRIPCIÓN:",
    "UNIDAD RESPONSABLE DE REPORTAR EL INDICADOR:",
    "MÉTODO DE CÁLCULO:",
  ];

  const subTitleColumnsRowIndicatorDataPag2Value = [
    "TIPO DE INDICADOR",
    "DIMENSIÓN",
    "TIPO DE FÓRMULA",
    "UNIDAD DE MEDIDA",
    "FRECUENCIA",
    "SENTIDO DEL INDICADOR",
  ];

  const subTitleColumnsRowIndicatorCaracteristicsPag2Value = [
    "CLARIDAD",
    "RELEVANCIA",
    "ECONOMÍA",
    "MONITOREABLE",
    "ADECUADO",
    "APORTE MARGINAL",
  ];

  const subTitleColumnsRowVariableDataPag2Value = [
    "NOMBRE",
    "DESCRIPCIÓN",
    "MEDIO DE VERIFICACIÓN / FUENTE DE INFORMACIÓN",
    "UNIDAD DE MEDIDA",
    "VALOR 2022",
  ];

  //SUPUESTO ESTA SOLO

  const subTitleColumnsRowGoalsPag2Value = [
    "LÍNEA BASE",
    "META 2022",
    "META 2023",
    "META 2024",
    "META 2025",
    "META 2026",
    "META 2027",
    "META SEXENAL",
  ];

  const jsonMir = JSON.parse(MIR);
  const jsonMA = JSON.parse(MA);
  const jsonFT = JSON.parse(FT);

  



  

  //EMPTY ARRAYS
  const headerTypography = [];
  const conacAndProgramDesign = [];
  const generalTitlesDesign1 = [];
  const generalTitlesDesign2 = [];
  const Page1Content = [];

  //RECORRE EL ARREGLO PARA DARLE DISEÑO headerTextsValue
  for (let i = 0; i < headerTextsValue.length; i++) {
    headerTypography.push(
      <Typography sx={{ fontFamily: "MontserratBold", textAlign: "center" }}>
        {headerTextsValue[i]}
      </Typography>
    );
  }

  //RECORRE EL ARREGLO PARA DARLE DISEÑO
  for (let i = 0; i < clasificacionProgramaticaValue.length; i++) {
    conacAndProgramDesign.push(
      <Box sx={{ width: "15vw", height: "10vh", ml: 1 }}>
        <Box
          sx={{
            width: "15vw",
            height: "7vh",
            backgroundColor: "#D9D9D9",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: 1,
            borderColor: "#D9D9D9",
          }}
        >
          <Typography sx={{ fontSize: "1vw" }}>
            {clasificacionProgramaticaValue[i]}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "15vw",
            height: "3vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: 1,
          }}
        >
          <Typography sx={{ fontSize: "1vw" }}>L</Typography>
        </Box>
      </Box>
    );
  }

  //RECORRE EL ARREGLO DE LOS TITULOS Y LES DA DISEÑO PAG1
  for (let i = 0; i < titleColumnsNormalPag1Value.length; i++) {
    generalTitlesDesign1.push(
      <Box sx={sxTitleDesignPage1}>
        <Typography
          sx={{ ml: 1, fontFamily: "MontserratBold", textAlign: "center" }}
        >
          {titleColumnsNormalPag1Value[i]}
        </Typography>
      </Box>
    );
  }

  //RECORRE EL ARREGLO DE LOS TITULOS Y LES DA DISEÑO PAG2
  for (let i = 0; i < titleColumnsNormalPag2Value.length; i++) {
    generalTitlesDesign2.push(
      <Box sx={sxTitleDesignPage1}>
        <Typography
          sx={{ ml: 1, fontFamily: "MontserratBold", textAlign: "center" }}
        >
          {titleColumnsNormalPag2Value[i]}
        </Typography>
      </Box>
    );
  }

  
  
  

  //Forma de sacar TASA
  let variable1Arreglo = jsonMir.fin.formula.replaceAll("(", "").split("-");
  let variable2Arreglo = jsonMir.fin.formula.split("/");
  let variable2 = variable2Arreglo[1]
    .replaceAll(")", "")
    .replaceAll(" * 100", "");
  let variable1 = variable1Arreglo[0];

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "20vh",
          display: "flex",
          justifyContent: "start",
        }}
      >
        <Box
          sx={{ width: "20%", height: "100%", ml: "4vw", mt: "5vh", mr: "1vw" }}
        >
          <img src={logo} alt="Logo" style={{ width: "6vw", height: "12vh" }} />
        </Box>
        <Box
          sx={{
            width: "30vw",
            height: "20vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "end",
          }}
        >
          <Box
            sx={{
              width: "29vw",
              height: "15vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {headerTypography}
          </Box>
        </Box>
      </Box>
      {/*COLUMN*/}
      <Box
        sx={{
          width: "62vw",
          height: "2vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#D9D9D9",
          ml: "3.4vw",
          mt: "1vw",
          mb: ".3vw",
        }}
      >
        <Typography sx={{ fontSize: "1vw", fontFamily: "MontserratBold" }}>
          FIN
        </Typography>
      </Box>

      <Box
        sx={{
          width: "62vw",
          height: "10vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          ml: "3.4vw",
          mb: "1vw",
        }}
      >
        <Box
          sx={{
            width: "62vw",
            height: "10vh",
            border: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              ml: "2vw",
              mr: "2vw",
              fontSize: "1vw",
              fontFamily: "MontserratRegular",
            }}
          >
            {jsonMir.fin.resumen}
          </Typography>
        </Box>
      </Box>
      {generalTitlesDesign2[0]}
      <Box sx={sxBoxSmallSize}>
        <Box sx={sxSubtitleSmallSize}>
          <Typography
            sx={{ fontSize: "1vw", fontFamily: "MontserratSemiBold", ml: 1 }}
          >
            {subTitleColumnsIndicatorDataPag2Value[0]}
          </Typography>
        </Box>
        <Box sx={sxResultFieldSmallSize}>
          <Typography
            sx={{ fontSize: "1vw", fontFamily: "MontserratRegular", ml: 3 }}
          >
            {jsonMir.fin.indicador}
          </Typography>
        </Box>
      </Box>
      <Box sx={sxBoxMediumSize}>
        <Box sx={sxSubtitleMediumSize}>
          <Typography
            sx={{ fontSize: "1vw", fontFamily: "MontserratSemiBold", ml: 1 }}
          >
            {subTitleColumnsIndicatorDataPag2Value[1]}
          </Typography>
        </Box>
        <Box sx={sxResultFieldMediumSize}>
          <Typography
            sx={{ fontSize: "1vw", fontFamily: "MontserratRegular", ml: 3 }}
          >
            {jsonMA.fin.descIndicador}
          </Typography>
        </Box>
      </Box>
      <Box sx={sxBoxMediumSize}>
        <Box sx={sxSubtitleMediumSize}>
          <Typography
            sx={{ fontSize: "1vw", fontFamily: "MontserratSemiBold", ml: 1 }}
          >
            {subTitleColumnsIndicatorDataPag2Value[2]}
          </Typography>
        </Box>
        <Box sx={sxResultFieldMediumSize}>
          <Typography
            sx={{ fontSize: "1vw", fontFamily: "MontserratRegular", ml: 3 }}
          >
            {jsonMA.fin.unidadResponsable}
          </Typography>
        </Box>
      </Box>
      <Box sx={sxBoxMediumSize}>
        <Box sx={sxSubtitleMediumSize}>
          <Typography
            sx={{ fontSize: "1vw", fontFamily: "MontserratSemiBold", ml: 1 }}
          >
            {subTitleColumnsIndicatorDataPag2Value[3]}
          </Typography>
        </Box>
        <Box sx={sxResultFieldMediumSize}>
          <Typography
            sx={{ fontSize: "0.6vw", fontFamily: "MontserratRegular", ml: 3 }}
          >
            {jsonMir.fin.formula}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          width: "62vw",
          height: "6vh",
          display: "flex",
          flexDirection: "row",
          ml: "3.4vw",
          mt: "1vw",
          mb: "1vw",
        }}
      >
        <Box
          sx={{
            width: "11vw",
            height: "6vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "11vw",
              height: "3vh",
              border: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#D9D9D9",
            }}
          >
            <Typography sx={{ fontSize: "1vw" }}>
              {subTitleColumnsRowIndicatorDataPag2Value[0]}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "11vw",
              height: "3vh",
              border: 1,
              borderTop: 0,
              borderRight: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography fontSize={"0.7vw"}>
              {jsonFT.fin.tipoDeIndicador}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            width: "7vw",
            height: "6vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "7vw",
              height: "3vh",
              border: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#D9D9D9",
            }}
          >
            <Typography sx={{ fontSize: "1vw" }}>
              {subTitleColumnsRowIndicatorDataPag2Value[1]}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "7vw",
              height: "3vh",
              border: 1,
              borderTop: 0,
              borderRight: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography>{jsonFT.fin.dimension}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: "11vw",
            height: "6vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "11vw",
              height: "3vh",
              border: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#D9D9D9",
            }}
          >
            <Typography sx={{ fontSize: "1vw" }}>
              {subTitleColumnsRowIndicatorDataPag2Value[2]}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "11vw",
              height: "3vh",
              border: 1,
              borderTop: 0,
              borderRight: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography>{/*TASA XDXDX*/}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: "12vw",
            height: "6vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "12vw",
              height: "3vh",
              border: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#D9D9D9",
            }}
          >
            <Typography sx={{ fontSize: "1vw" }}>
              {subTitleColumnsRowIndicatorDataPag2Value[3]}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "12vw",
              height: "3vh",
              border: 1,
              borderRight: 0,
              borderTop: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography>{jsonFT.fin.unidadDeMedida}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: "8vw",
            height: "6vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "8vw",
              height: "3vh",
              border: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#D9D9D9",
            }}
          >
            <Typography sx={{ fontSize: "1vw" }}>
              {subTitleColumnsRowIndicatorDataPag2Value[4]}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "8vw",
              height: "3vh",
              border: 1,
              borderRight: 0,
              borderTop: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography>{jsonMir.fin.frecuencia}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: "13vw",
            height: "6vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "13vw",
              height: "3vh",
              border: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#D9D9D9",
            }}
          >
            <Typography sx={{ fontSize: "1vw" }}>
              {subTitleColumnsRowIndicatorDataPag2Value[5]}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "13vw",
              height: "3vh",
              border: 1,
              borderTop: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography>{jsonMA.fin.sentidoDelIndicador}</Typography>
          </Box>
        </Box>
      </Box>
      {generalTitlesDesign2[1]}
      <Box
        sx={{
          width: "62vw",
          height: "6vh",
          display: "flex",
          flexDirection: "row",
          ml: "3.4vw",
          mt: "1vw",
          mb: "1vw",
        }}
      >
        <Box
          sx={{
            width: "11vw",
            height: "6vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "11vw",
              height: "3vh",
              border: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#D9D9D9",
            }}
          >
            <Typography sx={{ fontSize: "1vw" }}>
              {subTitleColumnsRowIndicatorCaracteristicsPag2Value[0]}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "11vw",
              height: "3vh",

              border: 1,
              borderRight: 0,
              borderTop: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography>{jsonFT.fin.claridad}</Typography>
          </Box>
        </Box>

        <Box
          sx={{
            width: "7vw",
            height: "6vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "7vw",
              height: "3vh",
              border: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#D9D9D9",
            }}
          >
            <Typography sx={{ fontSize: "1vw" }}>
              {subTitleColumnsRowIndicatorCaracteristicsPag2Value[1]}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "7vw",
              height: "3vh",
              border: 1,
              borderRight: 0,
              borderTop: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography>{jsonFT.fin.relevancia}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: "11vw",
            height: "6vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "11vw",
              height: "3vh",
              border: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#D9D9D9",
            }}
          >
            <Typography sx={{ fontSize: "1vw" }}>
              {subTitleColumnsRowIndicatorCaracteristicsPag2Value[2]}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "11vw",
              height: "3vh",
              border: 1,
              borderRight: 0,
              borderTop: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography>{jsonFT.fin.economia}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: "12vw",
            height: "6vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "12vw",
              height: "3vh",
              border: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#D9D9D9",
            }}
          >
            <Typography sx={{ fontSize: "1vw" }}>
              {subTitleColumnsRowIndicatorCaracteristicsPag2Value[3]}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "12vw",
              height: "3vh",
              border: 1,
              borderRight: 0,
              borderTop: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography>{jsonFT.fin.monitoreable}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: "8vw",
            height: "6vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "8vw",
              height: "3vh",
              border: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#D9D9D9",
            }}
          >
            <Typography sx={{ fontSize: "1vw" }}>
              {subTitleColumnsRowIndicatorCaracteristicsPag2Value[4]}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "8vw",
              height: "3vh",
              border: 1,
              borderRight: 0,
              borderTop: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography>{jsonFT.fin.adecuado}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: "13vw",
            height: "6vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "13vw",
              height: "3vh",
              border: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#D9D9D9",
            }}
          >
            <Typography sx={{ fontSize: "1vw" }}>
              {subTitleColumnsRowIndicatorCaracteristicsPag2Value[5]}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "13vw",
              height: "3vh",
              border: 1,
              borderTop: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography>{jsonFT.fin.aporte_marginal}</Typography>
          </Box>
        </Box>
      </Box>
      {generalTitlesDesign2[2]}
      <Box
        sx={{
          width: "62vw",
          height: "22vh",
          display: "flex",
          flexDirection: "row",
          ml: "3.4vw",
          mt: "1vw",
          mb: "1vw",
        }}
      >
        <Box
          sx={{
            width: "11vw",
            height: "22vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "11vw",
              height: "6vh",
              border: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#D9D9D9",
            }}
          >
            <Typography sx={{ fontSize: "1vw" }}>
              {subTitleColumnsRowVariableDataPag2Value[0]}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "11vw",
              height: "8vh",
              border: 1,
              borderTop: 0,
              borderRight: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography fontSize={"0.6vw"}>{variable1}</Typography>
          </Box>
          <Box
            sx={{
              width: "11vw",
              height: "8vh",
              border: 1,
              borderTop: 0,
              borderRight: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography fontSize={"0.6vw"}>{variable2}</Typography>
          </Box>
        </Box>

        <Box
          sx={{
            width: "11vw",
            height: "22vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "11vw",
              height: "6vh",
              border: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#D9D9D9",
            }}
          >
            <Typography sx={{ fontSize: "1vw" }}>
              {subTitleColumnsRowVariableDataPag2Value[1]}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "11vw",
              height: "8vh",
              border: 1,
              borderTop: 0,
              borderRight: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography>{jsonMA.fin.descNumerador}</Typography>
          </Box>
          <Box
            sx={{
              width: "11vw",
              height: "8vh",
              border: 1,
              borderTop: 0,
              borderRight: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography>{jsonMA.fin.descDenominador}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: "18vw",
            height: "22vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "18vw",
              height: "6vh",
              border: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#D9D9D9",
            }}
          >
            <Typography sx={{ fontSize: "1vw" }}>
              {subTitleColumnsRowVariableDataPag2Value[2]}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "18vw",
              height: "8vh",
              border: 1,
              borderTop: 0,
              borderRight: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography fontSize={"0.6vw"}>{jsonMir.fin.medios}</Typography>
          </Box>
          <Box
            sx={{
              width: "18vw",
              height: "8vh",
              border: 1,
              borderTop: 0,
              borderRight: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography fontSize={"0.6vw"}>{jsonMir.fin.medios}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: "11vw",
            height: "22vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "11vw",
              height: "6vh",
              border: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#D9D9D9",
            }}
          >
            <Typography sx={{ fontSize: "1vw" }}>
              {subTitleColumnsRowVariableDataPag2Value[3]}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "11vw",
              height: "8vh",
              border: 1,
              borderTop: 0,
              borderRight: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography>ABSOLUTA</Typography>
          </Box>
          <Box
            sx={{
              width: "11vw",
              height: "8vh",
              border: 1,
              borderTop: 0,
              borderRight: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography>ABSOLUTA</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: "11vw",
            height: "22vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "11vw",
              height: "6vh",
              border: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#D9D9D9",
            }}
          >
            <Typography sx={{ fontSize: "1vw" }}>
              {subTitleColumnsRowVariableDataPag2Value[4]}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "11vw",
              height: "8vh",
              border: 1,
              borderTop: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography>{jsonMA.fin.valorNumerador}</Typography>
          </Box>
          <Box
            sx={{
              width: "11vw",
              height: "8vh",
              border: 1,
              borderTop: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography>{jsonMA.fin.valorDenominador}</Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          width: "62vw",
          height: "2vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#D9D9D9",
          ml: "3.4vw",
          mt: "1vw",
          mb: ".3vw",
        }}
      >
        <Typography sx={{ fontSize: "1vw", fontFamily: "MontserratBold" }}>
          SUPUESTO
        </Typography>
      </Box>
      <Box
        sx={{
          width: "62vw",
          height: "6vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          ml: "3.4vw",
          mb: "0.5vw",
        }}
      >
        <Box
          sx={{
            width: "62vw",
            height: "6vh",
            border: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              ml: "2vw",
              mr: "2vw",
              fontSize: "1vw",
              fontFamily: "MontserratRegular",
            }}
          >
            {jsonMir.fin.supuestos}
          </Typography>
        </Box>
      </Box>
      {generalTitlesDesign2[3]}
      <Box
        sx={{
          width: "62vw",
          height: "6vh",
          display: "flex",
          flexDirection: "row",
          ml: "3.4vw",
          mt: "1vw",
          mb: "1vw",
        }}
      >
        <Box
          sx={{
            width: "8vw",
            height: "6vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "8vw",
              height: "3vh",
              border: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#D9D9D9",
            }}
          >
            <Typography sx={{ fontSize: "1vw" }}>
              {subTitleColumnsRowGoalsPag2Value[0]}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "8vw",
              height: "3vh",
              border: 1,
              borderTop: 0,
              borderRight: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography>{jsonMA.fin.lineaBase}</Typography>
          </Box>
        </Box>

        <Box
          sx={{
            width: "7vw",
            height: "6vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "7vw",
              height: "3vh",
              border: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#D9D9D9",
            }}
          >
            <Typography sx={{ fontSize: "1vw" }}>
              {subTitleColumnsRowGoalsPag2Value[1]}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "7vw",
              height: "3vh",
              border: 1,
              borderTop: 0,
              borderRight: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography>{jsonMA.fin.metaAnual}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: "7vw",
            height: "6vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "7vw",
              height: "3vh",
              border: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#D9D9D9",
            }}
          >
            <Typography sx={{ fontSize: "1vw" }}>
              {subTitleColumnsRowGoalsPag2Value[2]}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "7vw",
              height: "3vh",
              border: 1,
              borderTop: 0,
              borderRight: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography>{"-" /*meta 2023*/}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: "7vw",
            height: "6vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "7vw",
              height: "3vh",
              border: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#D9D9D9",
            }}
          >
            <Typography sx={{ fontSize: "1vw" }}>
              {subTitleColumnsRowGoalsPag2Value[3]}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "7vw",
              height: "3vh",
              border: 1,
              borderTop: 0,
              borderRight: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography>{"-" /*meta 2024*/}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: "7vw",
            height: "6vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "7vw",
              height: "3vh",
              border: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#D9D9D9",
            }}
          >
            <Typography sx={{ fontSize: "1vw" }}>
              {subTitleColumnsRowGoalsPag2Value[4]}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "7vw",
              height: "3vh",
              border: 1,
              borderTop: 0,
              borderRight: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography>{"-" /*meta 2025*/}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: "7vw",
            height: "6vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "7vw",
              height: "3vh",
              border: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#D9D9D9",
            }}
          >
            <Typography sx={{ fontSize: "1vw" }}>
              {subTitleColumnsRowGoalsPag2Value[5]}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "7vw",
              height: "3vh",
              border: 1,
              borderTop: 0,
              borderRight: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography>{"-" /*meta 2026*/}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: "7vw",
            height: "6vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "7vw",
              height: "3vh",
              border: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#D9D9D9",
            }}
          >
            <Typography sx={{ fontSize: "1vw" }}>
              {subTitleColumnsRowGoalsPag2Value[6]}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "7vw",
              height: "3vh",
              border: 1,
              borderTop: 0,
              borderRight: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography>{"-" /*meta 2027*/}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: "12vw",
            height: "6vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "12vw",
              height: "3vh",
              border: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#D9D9D9",
            }}
          >
            <Typography sx={{ fontSize: "1vw" }}>
              {subTitleColumnsRowGoalsPag2Value[7]}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "12vw",
              height: "3vh",
              border: 1,
              borderTop: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography>{"" /*meta sexenal*/}</Typography>
          </Box>
        </Box>
      </Box>
      {generalTitlesDesign2[4]}
      <Box
        sx={{
          width: "62vw",
          height: "16vh",
          display: "flex",
          flexDirection: "row",
          ml: "3.4vw",
          mt: "1vw",
          mb: "1vw",
        }}
      >
        <Box
          sx={{
            width: "20vw",
            height: "16vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "20vw",
              height: "6vh",
              border: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#D9D9D9",
            }}
          >
            <Typography sx={{ fontSize: "1vw" }}>ROJO</Typography>
          </Box>
          <Box
            sx={{
              width: "20vw",
              height: "10vh",
              border: 1,
              borderTop: 0,
              borderRight: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "red",
            }}
          >
            <Typography>{"V.I.<"} </Typography>
            <Typography>{"Ó"} </Typography>
            <Typography>{"< V.I."} </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            width: "21vw",
            height: "16vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "21vw",
              height: "6vh",
              border: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#D9D9D9",
            }}
          >
            <Typography sx={{ fontSize: "1vw" }}>AMARILLO</Typography>
          </Box>
          <Box
            sx={{
              width: "21vw",
              height: "10vh",
              border: 1,
              borderTop: 0,
              borderRight: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "yellow",
            }}
          >
            <Typography>{"<= V.I. <"} </Typography>
            <Typography>{"Ó"} </Typography>
            <Typography>{"< V.I. <="} </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: "21vw",
            height: "16vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "21vw",
              height: "6vh",
              border: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#D9D9D9",
            }}
          >
            <Typography sx={{ fontSize: "1vw" }}>VERDE</Typography>
          </Box>
          <Box
            sx={{
              width: "21vw",
              height: "10vh",
              border: 1,
              borderTop: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "green",
            }}
          >
            <Typography>{"<= V.I. <="} </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: "67vw",
          height: "3vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: "3vh",
          mt: "5vh",
        }}
      >
        <Typography sx={{}}>Página 2</Typography>
      </Box>
      <Divider sx={{ backgroundColor: "rgba(0,0,0,5)" }} />
      <Divider sx={{ backgroundColor: "rgba(0,0,0,5)" }} />
    </>
  );
};
