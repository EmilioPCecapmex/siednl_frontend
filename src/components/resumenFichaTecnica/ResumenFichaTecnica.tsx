import { Box, Divider, Typography } from "@mui/material";
import logo from "../../assets/logos/logo_tesoreriah1.png";
import { FinFechaTecnica } from "./FinFichaTecnica";
import { PropositoFichaTecnica } from "./PropositoFichaTecnica";
import { CompFichaTecnica } from "./CompFichaTecnica";
import { ActFichaTecnica } from "./ActFichaTecnica";
import { useEffect, useState } from "react";
import { IIMir } from "../../screens/mir/MIR";
import axios from "axios";

export const ResumenFichaTecnica = (
  {
    MIR,
    MA,
    FT,
  }: {
    MIR: string;
    MA: string;
    FT: string;
  }
) => {
  let show = 1;

  const [mirs, setMirs] = useState(Array<IIMir>);

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
  const sxBoxLargeSize = {
    width: "62vw",
    height: "8vh",
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

  const subTitleColumnsNormalPag1Value = [
    "NOMBRE DEL PROGRAMA:",
    "CLASIFICACIÓN PROGRAMÁTICA:",
    "INSTITUCIÓN:",
    "BENEFICIARIO:",
    "EJE PED:",
    "TEMA PED:",
    "OBJETIVO PED:",
    "ESTRATEGÍA PED:",
    "LÍNEAS DE ACCIÓN PED:",
    "PROGRAMA SECTORIAL, ESPECIAL O REGIONAL:",
    "OBJETIVO PROGRAMA SECTORIAL, ESPECIAL O REGIONAL:",
    "OBJETIVO ODS:",
    "META ODS:",
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

  //ARRAYS VACIOS QUE SE USAN
  const headerTypography = [];
  const conacAndProgramDesign = [];
  const generalTitlesDesign1 = [];
  const generalTitlesDesign2 = [];
  const Page1Content = [];

  const jsonMir = JSON.parse(MIR);
  const jsonMA = JSON.parse(MA);
  const jsonFT = JSON.parse(FT);

  const page1Values = [
    jsonMir.encabezado.beneficiario,
    jsonMir.encabezado.tema,
    jsonMir.encabezado.objetivo,
    jsonMir.encabezado.estrategia,
    "Lineas de acción.",
    jsonFT.encabezado.programaSER,
    jsonFT.encabezado.objetivoSER,
  ]
  let value_increment = 0;

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


  //RECORRE EL ARREGLO DE LOS SUBTITULOS Y DEBERÁ RECORRER EL DE SUS RESULTADOS Y LO ACOMODA TODO EN UN ARREGLO.
  for (let i = 0; i < subTitleColumnsNormalPag1Value.length; i++) {
    Page1Content.push(
      //SÍ ES NOMBRE DEL PROGRAMA
      i === 0 ? (
        <>
          {generalTitlesDesign1[0]}
          <Box sx={sxBoxSmallSize}>
            {/*ROW*/}
            <Box sx={sxSubtitleSmallSize}>
              <Typography
                sx={{
                  fontSize: "1vw",
                  fontFamily: "MontserratSemiBold",
                  ml: 1,
                }}
              >
                {subTitleColumnsNormalPag1Value[i]}
              </Typography>
            </Box>
            {/*ROW*/}
            <Box sx={sxResultFieldSmallSize}>
              <Typography
                sx={{ fontSize: "1vw", fontFamily: "MontserratRegular", ml: 3 }}
              >
               {jsonMir.encabezado.nombre_del_programa}
              </Typography>
            </Box>
          </Box>
        </>
      ) : //SÍ ES CLASIFICACIÓN PROGRAMÁTICA
      i === 1 ? (
        //SE AGREGA DISEÑO DE CLASIFICACION PROGRAMATICA EXCLUSIVO DE SI MISMO
        <Box
          sx={{
            width: "62vw",
            height: "10vh",
            display: "flex",
            flexDirection: "row",
            ml: "3.4vw",
            mt: "1vw",
            mb: "1vw",
          }}
        >
          {/*ROW*/}
          <Box
            sx={{
              width: "22vw",
              height: "10vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/*COLUMN*/}
            <Box
              sx={{
                width: "22vw",
                height: "7vh",
                backgroundColor: "#D9D9D9",
                display: "flex",
                alignItems: "center",
                border: 1,
                borderColor: "#D9D9D9",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1vw",
                  fontFamily: "MontserratSemiBold",
                  ml: 1,
                }}
              >
                {subTitleColumnsNormalPag1Value[i]}
              </Typography>
            </Box>
            {/*COLUMN*/}
            <Box
              sx={{
                width: "22vw",
                height: "3vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: 1,
              }}
            >
              <Typography
                sx={{ fontSize: "1vw", fontFamily: "MontserratRegular" }}
              >
                L19E11339
              </Typography>
            </Box>
          </Box>
          {/*ROW*/}
          <Box
            sx={{
              width: "40vw",
              height: "10vh",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {conacAndProgramDesign}
          </Box>
        </Box>
      ) : i === 2 ? (
        <Box sx={sxBoxSmallSize}>
          {/*ROW*/}
          <Box sx={sxSubtitleSmallSize}>
            <Typography
              sx={{ fontSize: "1vw", fontFamily: "MontserratSemiBold", ml: 1 }}
            >
              {subTitleColumnsNormalPag1Value[i]}
            </Typography>
          </Box>
          {/*ROW*/}
          <Box sx={sxResultFieldSmallSize}>
            <Typography
              sx={{ fontSize: "1vw", fontFamily: "MontserratRegular", ml: 3 }}
            >
              {jsonMir.encabezado.institucion}
            </Typography>
          </Box>
        </Box>
      ) : i === 4 ? (
        <>
          {generalTitlesDesign1[1]}
          <Box sx={sxBoxMediumSize}>
            {/*ROW*/}
            <Box sx={sxSubtitleMediumSize}>
              <Typography
                sx={{
                  fontSize: "1vw",
                  fontFamily: "MontserratSemiBold",
                  ml: 1,
                }}
              >
                {subTitleColumnsNormalPag1Value[i]}
              </Typography>
            </Box>
            {/*ROW*/}
            <Box
              sx={{
                width: "38vw",
                height: "5vh",
                display: "flex",
                alignItems: "center",
                border: 1,
                ml: "2vw",
              }}
            >
              <Typography
                sx={{ fontSize: "1vw", fontFamily: "MontserratRegular", ml: 3 }}
              >
                {jsonMir.encabezado.eje}
              </Typography>
            </Box>
          </Box>
        </>
      ) : i === 11 ? (
        <>
          {generalTitlesDesign1[2]}
          <Box sx={sxBoxMediumSize}>
            {/*ROW*/}
            <Box sx={sxSubtitleMediumSize}>
              <Typography
                sx={{
                  fontSize: "1vw",
                  fontFamily: "MontserratSemiBold",
                  ml: 1,
                }}
              >
                {subTitleColumnsNormalPag1Value[i]}
              </Typography>
            </Box>
            {/*ROW*/}
            <Box sx={sxResultFieldMediumSize}>
              <Typography
                sx={{ fontSize: "1vw", fontFamily: "MontserratRegular", ml: 3 }}
              >
                {jsonFT.encabezado.objetivoODS}
              </Typography>
            </Box>
          </Box>
        </>
      ) : i === subTitleColumnsNormalPag1Value.length - 1 ? (
        <>
          <Box sx={sxBoxMediumSize}>
            {/*ROW*/}
            <Box sx={sxSubtitleMediumSize}>
              <Typography
                sx={{
                  fontSize: "1vw",
                  fontFamily: "MontserratSemiBold",
                  ml: 1,
                }}
              >
                {subTitleColumnsNormalPag1Value[i]}
              </Typography>
            </Box>
            {/*ROW*/}
            <Box sx={sxResultFieldMediumSize}>
              <Typography
                sx={{ fontSize: "1vw", fontFamily: "MontserratRegular", ml: 3 }}
              >
                {jsonFT.encabezado.metaODS}
              </Typography>
            </Box>
          </Box>
        </>
      ) : (
        <Box sx={sxBoxMediumSize}>
          {/*ROW*/}
          <Box sx={sxSubtitleMediumSize}>
            <Typography
              sx={{ fontSize: "1vw", fontFamily: "MontserratSemiBold", ml: 1 }}
            >
              {subTitleColumnsNormalPag1Value[i]}
            </Typography>
          </Box>
          {/*ROW*/}
          <Box sx={sxResultFieldMediumSize}>
            <Typography
              sx={{ fontSize: "1vw", fontFamily: "MontserratRegular", ml: 3 }}
            >
              {page1Values[value_increment]}
            </Typography>
            <Typography hidden={true}>{value_increment++}</Typography>
            
          </Box>
        </Box>
      )
    );
  }

  return (
    <Box
      visibility={show ? "visible" : "hidden"}
      position="absolute"
      sx={{
        display: "flex",
        width: "75vw",
        height: "85vh",
        boxShadow: 10,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "#fff",
      }}
    >
      <Box
        sx={{
          width: "90%",
          border: 0.1,
          borderColor: "#909090",
          height: "80%",
          overflow: "auto",
          borderRadius: 1,
          "&::-webkit-scrollbar": {
            width: ".3vw",
            mt: 1,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,5)",
            outline: "1px solid slategrey",
            borderRadius: 1,
          },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "20vh",
            display: "flex",
            justifyContent: "start",
            
          }}
        >
           <Box sx={{width:"20%", height:"100%", ml:"4vw", mt:"5vh", mr:"1vw"}}>
         <img src={logo} alt="Logo" style={{ width:"6vw", height:"12vh"}} />
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
        {Page1Content}
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
          <Typography sx={{}}>Página 1</Typography>
        </Box>
        <Divider sx={{ backgroundColor: "rgba(0,0,0,5)" }} />
        <Divider sx={{ backgroundColor: "rgba(0,0,0,5)" }} />
        {/*INICIA LA NUEVA PÁGINA QUE SE HARÁ COMPONENTE*/}
        <FinFechaTecnica MIR={MIR} MA={MA} FT={FT}/>
        <PropositoFichaTecnica/>
        <CompFichaTecnica/>
        <ActFichaTecnica/>
      </Box>
    </Box>
  );
};
