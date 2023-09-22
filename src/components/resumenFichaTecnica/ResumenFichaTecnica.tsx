import { Box, Divider, Typography } from "@mui/material";
import logo from "../../assets/logos/logo_tesoreriah1.png";
import { FinFechaTecnica } from "./FinFichaTecnica";
import { PropositoFichaTecnica } from "./PropositoFichaTecnica";
import { CompFichaTecnica } from "./CompFichaTecnica";
import { ActFichaTecnica } from "./ActFichaTecnica";
import { useEffect, useState } from "react";
import { IComponente } from "../tabsMir/IComponente";
import { queries } from "../../queries";
export const ResumenFichaTecnica = ({
  MIR,
  MA,
  FT,
  Conac,
  Consecutivo,
}: {
  MIR: string;
  MA: string;
  FT: string;
  Conac: string;
  Consecutivo: string;
}) => {
  let show = 1;

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

  const sxTitleColumn = {
    width: "22vw",
    backgroundColor: "#D9D9D9",
    display: "flex",
    alignItems: "center",
    border: 1,
    borderColor: "#D9D9D9",
  };

  const sxTitleStyle = {
    fontSize: "1vw",
    fontFamily: "MontserratSemiBold",
    ml: 1,
  };

  const sxSpaceBetweenTitleResult = {
    width: "62vw",
    display: "flex",
    flexDirection: "row",
    ml: "3.4vw",
    mt: "1vw",
    mb: "1vw",
  };

  const sxResultSize = {
    width: "38vw",
    justifyContent: "center",
    alignItems: "center",
  };

  const sxResultContentDesign = {
    border: 1,
    width: "38vw",
    display: "flex",
    fontSize: ".8rem",
    fontFamily: "MontserratRegular",
    minHeight: "5vh",
    ml: "2vw",
    backgroundColor: "white",
    textAlign: "justify",
  };

  const conac = Conac;
  const consecutivo = Consecutivo;

  //ARRAYS DEFAULT VALUES
  const headerTextsValue = [
    "GOBIERNO DEL ESTADO DE NUEVO LEÓN",
    "SECRETARÍA DE FINANZAS Y TESORERÍA GENERAL DEL ESTADO",
    "PRESUPUESTO POR RESULTADOS",
    "FICHA TECNICA DE INDICADORES 2022",
    "PROGRAMAS PRESUPUESTARIOS",
  ];
  const clasificacionProgramaticaValue = ["CONAC", "PROGRAMA"];
  const clasificacionProgramaticaValues = [conac, consecutivo];

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

  //ARRAYS VACIOS QUE SE USAN
  const headerTypography = [];
  const conacAndProgramDesign = [];
  const generalTitlesDesign1 = [];
  const generalTitlesDesign2 = [];
  const Page1Content = [];

  const jsonMir = JSON.parse(MIR);
  const jsonFT = JSON.parse(FT);

  const page1Values = [
    jsonMir.encabezado.beneficiario.Label.toUpperCase(),
    jsonMir.encabezado.tema.Label.toUpperCase(),
    jsonMir.encabezado.objetivo.Label.toUpperCase(),
    jsonMir.encabezado.estrategia.Label.toUpperCase(),
    jsonMir.encabezado.lineas_de_accion.map(
      (value: { Id: string; Label: string }, x: any) => {
        return value?.Label.toUpperCase();
      }
    ),
    jsonFT.encabezado.programaSER.toUpperCase(),
    jsonFT.encabezado.objetivoSER.toUpperCase(),
  ];
  let value_increment = 0;
  //RECORRE EL ARREGLO PARA DARLE DISEÑO headerTextsValue
  for (let i = 0; i < headerTextsValue.length; i++) {
    headerTypography.push(
      <Box key={i}>
        <Typography
          sx={{ fontFamily: "MontserratSemiBold", textAlign: "center" }}
        >
          {headerTextsValue[i]}
        </Typography>
      </Box>
    );
  }

  //RECORRE EL ARREGLO PARA DARLE DISEÑO
  for (let i = 0; i < clasificacionProgramaticaValue.length; i++) {
    conacAndProgramDesign.push(
      <Box key={i} sx={{ width: "15vw", height: "10vh", ml: 1 }}>
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
          <Typography
            sx={{ fontSize: ".8rem", fontFamily: "MontserratRegular" }}
          >
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
          <Typography
            sx={{ fontSize: ".8rem", fontFamily: "MontserratRegular" }}
          >
            {clasificacionProgramaticaValues[i]}
          </Typography>
        </Box>
      </Box>
    );
  }

  //RECORRE EL ARREGLO DE LOS TITULOS Y LES DA DISEÑO PAG1
  for (let i = 0; i < titleColumnsNormalPag1Value.length; i++) {
    generalTitlesDesign1.push(
      <Box key={i} sx={sxTitleDesignPage1}>
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
      <Box key={i} sx={sxTitleDesignPage1}>
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
          <Box key={i} sx={sxSpaceBetweenTitleResult}>
            {/*ROW*/}
            <Box sx={sxTitleColumn}>
              <Typography sx={sxTitleStyle}>
                {subTitleColumnsNormalPag1Value[i]}
              </Typography>
            </Box>
            {/*ROW*/}
            <Box sx={sxResultSize}>
              <Typography sx={sxResultContentDesign}>
                {jsonMir.encabezado.programa.Label.toUpperCase()}
              </Typography>
            </Box>
          </Box>
        </>
      ) : //SÍ ES CLASIFICACIÓN PROGRAMÁTICA
      i === 1 ? (
        //SE AGREGA DISEÑO DE CLASIFICACION PROGRAMATICA EXCLUSIVO DE SI MISMO
        <Box
          key={Math.random()}
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
              key={Math.random()}
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
                sx={{ fontSize: ".8rem", fontFamily: "MontserratRegular" }}
              >
                {clasificacionProgramaticaValues[0] +
                  clasificacionProgramaticaValues[1]}
              </Typography>
            </Box>
          </Box>
          {/*ROW*/}
          <Box
            key={Math.random()}
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
        <Box key={Math.random()} sx={sxSpaceBetweenTitleResult}>
          {/*ROW*/}
          <Box sx={sxTitleColumn}>
            <Typography sx={sxTitleStyle}>
              {subTitleColumnsNormalPag1Value[i]}
            </Typography>
          </Box>
          {/*ROW*/}
          <Box sx={sxResultSize}>
            <Typography sx={sxResultContentDesign}>
              {jsonMir.encabezado.entidad.Label.toUpperCase()}
            </Typography>
          </Box>
        </Box>
      ) : i === 4 ? (
        <>
          {generalTitlesDesign1[1]}
          <Box key={Math.random()} sx={sxSpaceBetweenTitleResult}>
            {/*ROW*/}
            <Box sx={sxTitleColumn}>
              <Typography sx={sxTitleStyle}>
                {subTitleColumnsNormalPag1Value[i]}
              </Typography>
            </Box>
            {/*ROW*/}
            <Box sx={sxResultSize}>
              <Typography sx={sxResultContentDesign}>
                {jsonMir.encabezado.eje.Label.toUpperCase()}
              </Typography>
            </Box>
          </Box>
        </>
      ) : i === 11 ? (
        <>
          {generalTitlesDesign1[2]}
          <Box key={Math.random()} sx={sxSpaceBetweenTitleResult}>
            {/*ROW*/}
            <Box sx={sxTitleColumn}>
              <Typography key={Math.random()} sx={sxTitleStyle}>
                {subTitleColumnsNormalPag1Value[i]}
              </Typography>
            </Box>
            {/*ROW*/}
            <Box sx={sxResultSize}>
              <Typography sx={sxResultContentDesign}>
                {jsonFT.encabezado.objetivoODS.toUpperCase()}
              </Typography>
            </Box>
          </Box>
        </>
      ) : i === subTitleColumnsNormalPag1Value.length - 1 ? (
        <Box key={Math.random()} sx={sxSpaceBetweenTitleResult}>
          {/*ROW*/}
          <Box sx={sxTitleColumn}>
            <Typography key={Math.random()} sx={sxTitleStyle}>
              {subTitleColumnsNormalPag1Value[i]}
            </Typography>
          </Box>
          {/*ROW*/}
          <Box sx={sxResultSize}>
            <Typography sx={sxResultContentDesign}>
              {jsonFT.encabezado.metaODS.toUpperCase()}
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box
          key={Math.random()}
          sx={{
            width: "62vw",
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
              backgroundColor: "#D9D9D9",
              display: "flex",
              alignItems: "center",
              border: 1,
              borderColor: "#D9D9D9",
            }}
          >
            <Typography
              key={Math.random()}
              sx={{ fontSize: "1vw", fontFamily: "MontserratSemiBold", ml: 1 }}
            >
              {subTitleColumnsNormalPag1Value[i]}
            </Typography>
          </Box>
          {/*ROW*/}
          <Box
            key={Math.random()}
            sx={{
              width: "38vw",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              key={Math.random()}
              sx={{
                border: 1,
                width: "38vw",
                display: "flex",
                fontSize: ".8rem",
                fontFamily: "MontserratRegular",
                minHeight: "5vh",
                ml: "2vw",
                backgroundColor: "white",
                textAlign: "justify",
              }}
            >
              {page1Values[value_increment]}
            </Typography>
            <Typography hidden={true}>{value_increment++}</Typography>
          </Box>
        </Box>
      )
    );
  }
  let paginacion = 3;
  let paginaciones = [1];

  const [pagina, setPagina] = useState(0);

  //PARA SACAR EL ÚLTIMO NÚMERO DE PÁGINA DE LOS COMPONENTES
  useEffect(() => {
    // eslint-disable-next-line array-callback-return
    jsonMir.componentes.map((a: IComponente, index: number) => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      paginacion = paginacion + 1;
      paginaciones.push(paginacion);
    });
    let ultimaPaginaciones = paginaciones[paginaciones.length - 1];
    setPagina(ultimaPaginaciones);
  }, [paginaciones]);

  return (
    <Box
      visibility={show ? "visible" : "hidden"}
      position="absolute"
      sx={{
        display: "flex",
        width: "60vw",
        height: "90%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "#fff",
      }}
    >
      <Box
        sx={{
          width: "95%",
          border: 0.1,
          borderColor: "#909090",
          height: "100%",
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
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "20%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{ width: "6vw", height: "12vh" }}
            />
          </Box>

          <Box
            sx={{
              width: "60%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "20vh",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{ fontFamily: "MontserratSemiBold", textAlign: "center" }}
              >
                GOBIERNO DEL ESTADO DE NUEVO LEÓN
              </Typography>
              <Typography
                sx={{ fontFamily: "MontserratSemiBold", textAlign: "center" }}
              >
                SECRETARÍA DE FINANZAS Y TESORERÍA GENERAL DEL ESTADO
              </Typography>
              <Typography
                sx={{ fontFamily: "MontserratSemiBold", textAlign: "center" }}
              >
                PRESUPUESTO BASADO EN RESULTADOS
              </Typography>
              <Typography
                sx={{ fontFamily: "MontserratSemiBold", textAlign: "center" }}
              >
                FICHA TECNICA DE INDICADORES 2022
              </Typography>
              <Typography
                sx={{ fontFamily: "MontserratSemiBold", textAlign: "center" }}
              >
                PROGRAMAS PRESUPUESTARIOS
              </Typography>
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
        <Divider sx={{ height: "1vh", backgroundColor: "rgba(0,0,0,5)" }} />

        {/*INICIA LA NUEVA PÁGINA QUE SE HARÁ COMPONENTE*/}
        <FinFechaTecnica MIR={MIR} MA={MA} FT={FT} />
        <PropositoFichaTecnica MIR={MIR} MA={MA} FT={FT} />
        <CompFichaTecnica MIR={MIR} MA={MA} FT={FT} />
        <ActFichaTecnica MIR={MIR} MA={MA} FT={FT} NoPaginas={pagina} />
      </Box>
    </Box>
  );
};
