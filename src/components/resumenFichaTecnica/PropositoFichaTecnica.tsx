import logo from "../../assets/logos/logo_tesoreriah1.png";
import { Box, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export const PropositoFichaTecnica = ({
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
 
  //Sizeable Design
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

  //SMALL BOXES
  const sxTitleSmallBoxes = {
    fontSize: ".9vw",
    fontFamily: "MontserratSemiBold",
  };

  const sxResultSmallBoxes = {
    fontSize: ".8rem",
    fontFamily: "MontserratRegular",
  };

  //ARRAYS DEFAULT VALUES
  const headerTextsValue = [
    "GOBIERNO DEL ESTADO DE NUEVO LEÓN",
    "SECRETARÍA DE propositoANZAS Y TESORERÍA GENERAL DEL ESTADO",
    "PRESUPUESTO POR RESULTADOS",
    "FICHA TECNICA DE INDICADORES 2022",
    "PROGRAMAS PRESUPUESTARIOS",
  ];
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
  const [tipoFormula, setTipoFormula] = useState(
    jsonMir.proposito.indicador.includes("PORCENTAJE") ||
      jsonMir.proposito.indicador === "PORCENTAJE"
      ? "PORCENTAJE"
      : jsonMir.proposito.indicador.includes("TASA") ||
        jsonMir.proposito.indicador === "TASA"
      ? "TASA"
      : jsonMir.proposito.indicador.includes("INDICE" || "ÍNDICE") ||
        jsonMir.proposito.indicador === "INDICE" ||
        jsonMir.proposito.indicador === "ÍNDICE"
      ? "ÍNDICE"
      : jsonMir.proposito.indicador.includes("PROMEDIO") ||
        jsonMir.proposito.indicador === "PROMEDIO"
      ? "PROMEDIO"
      : ""
  );

  //EMPTY ARRAYS
  const headerTypography = [];
  const generalTitlesDesign1 = [];
  const generalTitlesDesign2 = [];

  //RECORRE EL ARREGLO PARA DARLE DISEÑO headerTextsValue
  for (let i = 0; i < headerTextsValue.length; i++) {
    headerTypography.push(
      <Box key={i}>
      <Typography sx={{ fontFamily: "MontserratBold", textAlign: "center" }}>
        {headerTextsValue[i]}
      </Typography>
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

  const [variable1, setVariable1] = useState("");
  const [variable2, setVariable2] = useState("");

  //ROJO
  let metaAnualNumero = parseFloat(jsonMA.proposito.metaAnual);
  let x = metaAnualNumero * 0.15;
  let y = metaAnualNumero - x;
  let z = metaAnualNumero + x;

  let xString = x.toFixed(2).toString();
  let yString = y.toFixed(2).toString();
  let zString = z.toFixed(2).toString();

  //VERDE
  let x1 = metaAnualNumero * 0.05;
  let y1 = metaAnualNumero - x1;
  let z1 = metaAnualNumero + x1;

  let x1String = x1.toFixed(2).toString();
  let y1String = y1.toFixed(2).toString();
  let z1String = z1.toFixed(2).toString();

  //Forma de sacar tipo de formula
  useEffect(() => {
    if (tipoFormula === "TASA" || tipoFormula.includes("TASA")) {
      let variable1Arreglo = jsonMir.proposito.formula.replaceAll("(", "").split("-");
      setVariable1(variable1Arreglo[0]);
      let variable2Arreglo = jsonMir.proposito.formula.split("/");
      setVariable2(
        variable2Arreglo[1].replaceAll(")", "").replaceAll(" * 100", "")
      );
    }
    if (tipoFormula === "PROMEDIO" || tipoFormula.includes("PROMEDIO")) {
      let variable1Arreglo = jsonMir.proposito.formula.replaceAll("(", "").split("/");
      setVariable1(variable1Arreglo[0]);
      setVariable2(variable1Arreglo[1].replaceAll(")", ""));
    }

    if (tipoFormula === "PORCENTAJE" || tipoFormula.includes("PORCENTAJE")) {
      let variable1Arreglo = jsonMir.proposito.formula.replaceAll("(", "").split("/");
      setVariable1(variable1Arreglo[0]);

      let variable2Arreglo = jsonMir.proposito.formula.split("/");
      setVariable2(
        variable2Arreglo[1].replaceAll(")", "").replaceAll(" * 100", "")
      );
    }
    if (
      tipoFormula === "ÍNDICE" ||
      tipoFormula === "INDICE" ||
      tipoFormula.includes("ÍNDICE") ||
      tipoFormula.includes("INDICE")
    ) {
      setVariable1(jsonMir.proposito.formula);
      setVariable2("");
    }
  }, []);

    return (
        <>
         <Box
         key={Math.random()}
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
            PROPÓSITO
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
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
             sx={{
              border: 1,
              width: "62vw",
              height: "10vh",
              display: "flex",
              fontSize: ".8rem",
              fontFamily: "MontserratRegular",
              minHeight: "5vh",
              backgroundColor: "white",
              textAlign: "justify",
             }}
            >
              {jsonMir.proposito.resumen}
            </Typography>
          </Box>
        </Box>
        {generalTitlesDesign2[0]}
        <Box sx={sxSpaceBetweenTitleResult}>
          <Box sx={sxTitleColumn}>
            <Typography
              sx={sxTitleStyle}
            >
              {subTitleColumnsIndicatorDataPag2Value[0]}
            </Typography>
          </Box>
          <Box sx={sxResultSize}>
            <Typography
              sx={sxResultContentDesign}
            >
              {jsonMir.proposito.indicador.toUpperCase()}
            </Typography>
          </Box>
        </Box>
        <Box sx={sxSpaceBetweenTitleResult}>
          <Box sx={sxTitleColumn}>
            <Typography
              sx={sxTitleStyle}
            >
              {subTitleColumnsIndicatorDataPag2Value[1]}
            </Typography>
          </Box>
          <Box sx={sxResultSize}>
            <Typography
              sx={sxResultContentDesign}
            >
               {jsonMA.proposito.descIndicador.toUpperCase()}
            </Typography>
          </Box>
        </Box>
        <Box sx={sxSpaceBetweenTitleResult}>
          <Box sx={sxTitleColumn}>
            <Typography
              sx={sxTitleStyle}
            >
              {subTitleColumnsIndicatorDataPag2Value[2]}
            </Typography>
          </Box>
          <Box sx={sxResultSize}>
            <Typography
              sx={sxResultContentDesign}
            >
              {jsonMA.proposito.unidadResponsable.toUpperCase()}
            </Typography>
          </Box>
        </Box>
        <Box sx={sxSpaceBetweenTitleResult}>
          <Box sx={sxTitleColumn}>
            <Typography
              sx={sxTitleStyle}
            >
              {subTitleColumnsIndicatorDataPag2Value[3]}
            </Typography>
          </Box>
          <Box sx={sxResultSize}>
            <Typography
              sx={sxResultContentDesign}
            >
              {jsonMir.proposito.formula.toUpperCase()}
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
              <Typography sx={sxTitleSmallBoxes}>
                {subTitleColumnsRowIndicatorDataPag2Value[0]}
              </Typography>
            </Box>
            <Box
              sx={{
                width: "11vw",
                height: "3vh",
                border: 1,
                borderTop: 0,
                borderRight:0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography sx={sxResultSmallBoxes}>{jsonFT.proposito.tipoDeIndicador}</Typography>
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
              <Typography sx={sxTitleSmallBoxes}>
                {subTitleColumnsRowIndicatorDataPag2Value[1]}
              </Typography>
            </Box>
            <Box
              sx={{
                width: "7vw",
                height: "3vh",
                border: 1,
                borderTop: 0,
                borderRight:0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography sx={sxResultSmallBoxes}>{jsonFT.proposito.dimension}</Typography>
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
              <Typography sx={sxTitleSmallBoxes}>
                {subTitleColumnsRowIndicatorDataPag2Value[2]}
              </Typography>
            </Box>
            <Box
              sx={{
                width: "11vw",
                height: "3vh",
                border: 1,
                borderTop: 0,
                borderRight:0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography sx={sxResultSmallBoxes}>{tipoFormula}</Typography>
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
              <Typography sx={sxTitleSmallBoxes}>
                {subTitleColumnsRowIndicatorDataPag2Value[3]}
              </Typography>
            </Box>
            <Box
              sx={{
                width: "12vw",
                height: "3vh",
                border: 1,
                borderRight:0,
                borderTop: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography sx={sxResultSmallBoxes}>{jsonFT.proposito.unidadDeMedida.toUpperCase()}</Typography>
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
              <Typography sx={sxTitleSmallBoxes}>
                {subTitleColumnsRowIndicatorDataPag2Value[4]}
              </Typography>
            </Box>
            <Box
              sx={{
                width: "8vw",
                height: "3vh",
                border: 1,
                borderRight:0,
                borderTop: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography sx={sxResultSmallBoxes}>{jsonMir.proposito.frecuencia}</Typography>
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
              <Typography sx={sxTitleSmallBoxes}>
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
              <Typography sx={sxResultSmallBoxes}>{jsonMA.proposito.sentidoDelIndicador}</Typography>
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
              <Typography sx={sxTitleSmallBoxes}>
                {subTitleColumnsRowIndicatorCaracteristicsPag2Value[0]}
              </Typography>
            </Box>
            <Box
              sx={{
                width: "11vw",
                height: "3vh",
               
                border: 1,
                borderRight:0,
                borderTop: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography sx={sxResultSmallBoxes}>{jsonFT.proposito.claridad}</Typography>
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
              <Typography sx={sxTitleSmallBoxes}>
                {subTitleColumnsRowIndicatorCaracteristicsPag2Value[1]}
              </Typography>
            </Box>
            <Box
              sx={{
                width: "7vw",
                height: "3vh",
                border: 1,
                borderRight:0,
                borderTop: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography sx={sxResultSmallBoxes}>{jsonFT.proposito.relevancia}</Typography>
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
              <Typography sx={sxTitleSmallBoxes}>
                {subTitleColumnsRowIndicatorCaracteristicsPag2Value[2]}
              </Typography>
            </Box>
            <Box
              sx={{
                width: "11vw",
                height: "3vh",
                border: 1,
                borderRight:0,
                borderTop: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography sx={sxResultSmallBoxes}>{jsonFT.proposito.economia}</Typography>
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
              <Typography sx={sxTitleSmallBoxes}>
                {subTitleColumnsRowIndicatorCaracteristicsPag2Value[3]}
              </Typography>
            </Box>
            <Box
              sx={{
                width: "12vw",
                height: "3vh",
                border: 1,
                borderRight:0,
                borderTop: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography sx={sxResultSmallBoxes}>{jsonFT.proposito.monitoreable}</Typography>
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
              <Typography sx={sxTitleSmallBoxes}>
                {subTitleColumnsRowIndicatorCaracteristicsPag2Value[4]}
              </Typography>
            </Box>
            <Box
              sx={{
                width: "8vw",
                height: "3vh",
                border: 1,
                borderRight:0,
                borderTop: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography sx={sxResultSmallBoxes}>{jsonFT.proposito.adecuado}</Typography>
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
              <Typography sx={sxTitleSmallBoxes}>
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
              <Typography sx={sxResultSmallBoxes}>{jsonFT.proposito.aporte_marginal}</Typography>
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
              <Typography sx={sxTitleSmallBoxes}>
                {subTitleColumnsRowVariableDataPag2Value[0]}
              </Typography>
            </Box>
            <Box
              sx={{
                width: "11vw",
                height: "7.7vh",
                border: 1,
                borderTop: 0,
                borderRight: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography sx={{
                width: "11vw",
                height: "7.7vh",
                display: "flex",
                fontSize: ".7rem",
                fontFamily: "MontserratRegular",
                minHeight: "5vh",
                backgroundColor: "white",
              }}>{variable1}</Typography>
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
              <Typography
                sx={{
                  width: "11vw",
                  height: "8vh",
                  display: "flex",
                  fontSize: ".7rem",
                  fontFamily: "MontserratRegular",
                  minHeight: "5vh",
                  backgroundColor: "white",
                }}
              >{variable2}</Typography>
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
              <Typography sx={sxTitleSmallBoxes}>
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
            <Typography
              sx={{
                width: "11vw",
                height: "7.7vh",
                display: "flex",
                fontSize: ".7rem",
                fontFamily: "MontserratRegular",
                minHeight: "5vh",
                backgroundColor: "white",
                textAlign: "justify",
              }}
            >{jsonMA.proposito.descNumerador}</Typography>
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
            <Typography
              sx={{
                width: "11vw",
                height: "7.7vh",
                display: "flex",
                fontSize: ".7rem",
                fontFamily: "MontserratRegular",
                minHeight: "5vh",
                backgroundColor: "white",
                textAlign: "justify",
              }}
            >{jsonMA.proposito.descDenominador}</Typography>
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
              <Typography sx={sxTitleSmallBoxes}>
                {subTitleColumnsRowVariableDataPag2Value[2]}
              </Typography>
            </Box>
            <Box
              sx={{
                width: "18vw",
                height: "7.8vh",
                border: 1,
                borderTop: 1,
                borderRight: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  width: "18vw",
                  height: "7.8vh",
                  display: "flex",
                  fontSize: ".7rem",
                  fontFamily: "MontserratRegular",
                  minHeight: "5vh",
                  backgroundColor: "white",
                  textAlign: "justify",
                }}
              >
                {jsonMir.proposito.medios_verificacion}
                </Typography>
            </Box>
            <Box
             sx={{
              width: "18vw",
              height: "7.7vh",
              border: 1,
              borderTop: 0,
              borderRight: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                width: "18vw",
                height: "7.7vh",
                display: "flex",
                fontSize: ".7rem",
                fontFamily: "MontserratRegular",
                minHeight: "5vh",
                backgroundColor: "white",
                textAlign: "justify",
              }}
            >
              {jsonMir.proposito.medios_verificacion}</Typography>
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
              <Typography sx={sxTitleSmallBoxes}>
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
              <Typography
                sx={{
                  width: "11vw",
                  height: "7.7vh",
                  display: "flex",
                  fontSize: ".7rem",
                  fontFamily: "MontserratRegular",
                  minHeight: "5vh",
                  backgroundColor: "white",
                  textAlign: "justify",
                  //al final ponerle a estos 2 .toUpperCase() como no existe se rompe el programa
                }}
              >
                {jsonFT.encabezado.unidadDeMedida}</Typography>
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
              <Typography
                sx={{
                  width: "11vw",
                  height: "7.7vh",
                  display: "flex",
                  fontSize: ".7rem",
                  fontFamily: "MontserratRegular",
                  minHeight: "5vh",
                  backgroundColor: "white",
                  textAlign: "justify",
                }}
              >{jsonFT.encabezado.unidadDeMedida}</Typography>
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
              <Typography sx={sxTitleSmallBoxes}>
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
            <Typography
              sx={{ fontSize: ".7rem", fontFamily: "MontserratRegular" }}
            >
              {jsonMA.proposito.valorNumerador}</Typography>
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
              <Typography
                sx={{ fontSize: ".7rem", fontFamily: "MontserratRegular" }}
              >
                {jsonMA.proposito.valorDenominador}</Typography>
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
              width: "62vw",
              height:"6vh",
              display: "flex",
              fontSize: ".8rem",
              fontFamily: "MontserratRegular",
              minHeight: "5vh",
              backgroundColor: "white",
              textAlign: "justify",
            }}
          >
            {jsonMir.proposito.supuestos}
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
              <Typography sx={sxTitleSmallBoxes}>
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
              <Typography sx={sxResultSmallBoxes}>{jsonMA.proposito.lineaBase}</Typography>
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
              <Typography sx={sxTitleSmallBoxes}>
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
              <Typography sx={sxResultSmallBoxes}>{jsonMA.proposito.metaAnual}</Typography>
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
              <Typography sx={sxTitleSmallBoxes}>
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
              <Typography sx={sxResultSmallBoxes}>{"-" /*meta 2023*/}</Typography>
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
              <Typography sx={sxTitleSmallBoxes}>
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
              <Typography sx={sxResultSmallBoxes}>{"-" /*meta 2024*/}</Typography>
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
              <Typography sx={sxTitleSmallBoxes}>
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
              <Typography sx={sxResultSmallBoxes}>{"-" /*meta 2025*/}</Typography>
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
              <Typography sx={sxTitleSmallBoxes}>
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
              <Typography sx={sxResultSmallBoxes}>{"-" /*meta 2026*/}</Typography>
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
              <Typography sx={sxTitleSmallBoxes}>
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
              <Typography sx={sxResultSmallBoxes}>{"-" /*meta 2027*/}</Typography>
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
              <Typography sx={sxTitleSmallBoxes}>
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
              <Typography sx={sxResultSmallBoxes}>{"" /*meta sexenal*/}</Typography>
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
              <Typography sx={sxTitleSmallBoxes}>ROJO</Typography>
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
              <Typography sx={sxTitleSmallBoxes}>{`V.I. < ${yString}`} </Typography>
            <Typography sx={sxTitleSmallBoxes}>{"Ó"} </Typography>
            <Typography sx={sxTitleSmallBoxes}>{`${zString} < V.I.`} </Typography>
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
              <Typography sx={sxTitleSmallBoxes}>AMARILLO</Typography>
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
              <Typography sx={sxTitleSmallBoxes}>{`${z1String} <= V.I. < ${zString}`} </Typography>
            <Typography sx={sxTitleSmallBoxes}>{"Ó"} </Typography>
            <Typography sx={sxTitleSmallBoxes}>{`${yString} < V.I. <= ${y1String}`} </Typography>
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
              <Typography sx={sxTitleSmallBoxes}>VERDE</Typography>
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
             <Typography sx={sxTitleSmallBoxes}>{`${y1String} <= V.I. <= ${z1String}`} </Typography>
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
          <Typography sx={sxTitleSmallBoxes}>Página 3</Typography>
        </Box>
        <Divider sx={{ height: "1vh", backgroundColor: "rgba(0,0,0,5)" }} />
        </>
    );
}