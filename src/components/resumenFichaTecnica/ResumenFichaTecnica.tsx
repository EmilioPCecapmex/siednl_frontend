import { Box, Divider, Typography } from "@mui/material";
import logo from "../../assets/logos/Coat_of_arms_of_Nuevo_Leon.svg";

export const ResumenFichaTecnica = () => {
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

  const subTitleColumnsRowSemaParamsPag2Value = ["ROJO", "AMARILLO", "VERDE"];

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
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </Typography>
            </Box>
          </Box>
        </>
      ) : i === subTitleColumnsNormalPag1Value.length - 1 ? (
        <>
          {console.log(subTitleColumnsNormalPag1Value.length)}
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </Typography>
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
            justifyContent: "center",
          }}
        >
          {/* <Box sx={{}}>
         <img src={logo} alt="Logo" style={{ width:"3vw", height:"4vh"}} />
         </Box> */}

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
              <Box sx={{
                width:"67vw", 
                height:"3vh",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                mb:"1vh",
                mt:"1vh"
                              }}>
                  <Typography sx={{}}>Página 1</Typography>
              </Box>
        <Divider sx={{ backgroundColor: "rgba(0,0,0,5)" }} />
        <Divider sx={{ backgroundColor: "rgba(0,0,0,5)" }} />
        <Box
          sx={{
            width: "100%",
            height: "20vh",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* <Box sx={{}}>
         <img src={logo} alt="Logo" style={{ width:"3vw", height:"4vh"}} />
         </Box> */}

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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              consectetur quae sunt odio? Magnam, porro dolores alias distinctio
              illum possimus, rem doloribus sint, voluptates reiciendis
              voluptatibus. Cumque error vitae quibusdam.
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
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
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
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
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
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
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
              sx={{ fontSize: "1vw", fontFamily: "MontserratRegular", ml: 3 }}
            >
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
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
                backgroundColor:"#D9D9D9"
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
                borderTop: 0,
                border: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>SI</Typography>
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
                backgroundColor:"#D9D9D9"
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
                borderTop: 0,
                border: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>SI</Typography>
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
                backgroundColor:"#D9D9D9"
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
                borderTop: 0,
                border: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>SI</Typography>
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
                backgroundColor:"#D9D9D9"
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
                borderTop: 0,
                border: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>SI</Typography>
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
                backgroundColor:"#D9D9D9"
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
                borderTop: 0,
                border: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>SI</Typography>
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
                backgroundColor:"#D9D9D9"
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
                borderTop: 0,
                border: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>SI</Typography>
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
                backgroundColor:"#D9D9D9"
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
                borderTop: 0,
                border: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>SI</Typography>
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
                backgroundColor:"#D9D9D9"
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
                borderTop: 0,
                border: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>SI</Typography>
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
                backgroundColor:"#D9D9D9"
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
                borderTop: 0,
                border: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>SI</Typography>
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
                backgroundColor:"#D9D9D9"
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
                borderTop: 0,
                border: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>SI</Typography>
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
                backgroundColor:"#D9D9D9"
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
                borderTop: 0,
                border: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>SI</Typography>
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
                backgroundColor:"#D9D9D9"
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
                borderTop: 0,
                border: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>SI</Typography>
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
                backgroundColor:"#D9D9D9"
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
                borderTop: 0,
                border: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>SI</Typography>
            </Box>
            <Box
              sx={{
                width: "11vw",
                height: "8vh",
                borderTop: 0,
                border: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>SI</Typography>
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
                backgroundColor:"#D9D9D9"
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
                borderTop: 0,
                border: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>SI</Typography>
            </Box>
            <Box
              sx={{
                width: "11vw",
                height: "8vh",
                borderTop: 0,
                border: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>SI</Typography>
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
                backgroundColor:"#D9D9D9"
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
                borderTop: 0,
                border: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>SI</Typography>
            </Box>
            <Box
              sx={{
                width: "18vw",
                height: "8vh",
                borderTop: 0,
                border: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>SI</Typography>
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
                backgroundColor:"#D9D9D9"
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
                borderTop: 0,
                border: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>SI</Typography>
            </Box>
            <Box
              sx={{
                width: "11vw",
                height: "8vh",
                borderTop: 0,
                border: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>SI</Typography>
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
                backgroundColor:"#D9D9D9"
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
                borderTop: 0,
                border: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>SI</Typography>
            </Box>
            <Box
              sx={{
                width: "11vw",
                height: "8vh",
                borderTop: 0,
                border: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>SI</Typography>
            </Box>
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
                backgroundColor:"#D9D9D9"
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
                borderTop: 0,
                border: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>SI</Typography>
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
                backgroundColor:"#D9D9D9"
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
                borderTop: 0,
                border: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>SI</Typography>
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
                backgroundColor:"#D9D9D9"
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
                borderTop: 0,
                border: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>SI</Typography>
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
                backgroundColor:"#D9D9D9"
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
                borderTop: 0,
                border: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>SI</Typography>
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
                backgroundColor:"#D9D9D9"
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
                borderTop: 0,
                border: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>SI</Typography>
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
                backgroundColor:"#D9D9D9"
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
                borderTop: 0,
                border: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>SI</Typography>
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
                backgroundColor:"#D9D9D9"
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
                borderTop: 0,
                border: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>SI</Typography>
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
                backgroundColor:"#D9D9D9"
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
                borderTop: 0,
                border: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>SI</Typography>
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
                backgroundColor:"#D9D9D9"
              }}
            >
              <Typography sx={{ fontSize: "1vw" }}>
                ROJO
              </Typography>
            </Box>
            <Box
              sx={{
                width: "20vw",
                height: "10vh",
                borderTop: 0,
                border: 1,
                display: "flex",
                flexDirection:"column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor:"red"
              }}
            >
              <Typography>{"V.I.<"} </Typography>
              <Typography>{"V.I.<"} </Typography>
              <Typography>{"V.I.<"} </Typography>
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
                backgroundColor:"#D9D9D9"
              }}
            >
              <Typography sx={{ fontSize: "1vw" }}>
                AMARILLO
              </Typography>
            </Box>
            <Box
              sx={{
                width: "21vw",
                height: "10vh",
                borderTop: 0,
                border: 1,
                display: "flex",
                flexDirection:"column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor:"yellow"
              }}
            >
              <Typography>{"V.I.<"} </Typography>
              <Typography>{"V.I.<"} </Typography>
              <Typography>{"V.I.<"} </Typography>
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
                backgroundColor:"#D9D9D9"
              }}
            >
              <Typography sx={{ fontSize: "1vw" }}>
                VERDE
              </Typography>
            </Box>
            <Box
              sx={{
                width: "21vw",
                height: "10vh",
                borderTop: 0,
                border: 1,
                display: "flex",
                flexDirection:"column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor:"green"
              }}
            >
              <Typography>{"V.I.<"} </Typography>
              <Typography>{"V.I.<"} </Typography>
              <Typography>{"V.I.<"} </Typography>
            </Box>
          </Box>
          
          
          
        </Box>
      </Box>
    </Box>
  );
};
