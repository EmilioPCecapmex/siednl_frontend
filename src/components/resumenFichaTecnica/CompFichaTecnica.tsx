import logo from "../../assets/logos/logo_tesoreriah1.png";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { IComponente } from "../tabsMir/IComponente";

export const CompFichaTecnica = ({
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
  const sxBoxMediumSize = {
    width: "62vw",
    height: "5vh",
    display: "flex",
    flexDirection: "row",
    ml: "3.4vw",
    mt: "1vw",
    mb: "1vw",
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
  const sxResultFieldMediumSize = {
    width: "38vw",
    height: "5vh",
    display: "flex",
    alignItems: "center",
    border: 1,
    ml: "2vw",
  };

  const jsonMir = JSON.parse(MIR);
  const jsonMA = JSON.parse(MA);
  const jsonFT = JSON.parse(FT);

  // jsonMir.componentes[0].length

  const [tipoFormula, setTipoFormula] = useState(
    jsonMir.componentes[0].indicador.includes("PORCENTAJE") ||
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
      let variable1Arreglo = jsonMir.proposito.formula
        .replaceAll("(", "")
        .split("-");
      setVariable1(variable1Arreglo[0]);
      let variable2Arreglo = jsonMir.proposito.formula.split("/");
      setVariable2(
        variable2Arreglo[1].replaceAll(")", "").replaceAll(" * 100", "")
      );
    }
    if (tipoFormula === "PROMEDIO" || tipoFormula.includes("PROMEDIO")) {
      let variable1Arreglo = jsonMir.proposito.formula
        .replaceAll("(", "")
        .split("/");
      setVariable1(variable1Arreglo[0]);
      setVariable2(variable1Arreglo[1].replaceAll(")", ""));
    }

    if (tipoFormula === "PORCENTAJE" || tipoFormula.includes("PORCENTAJE")) {
      let variable1Arreglo = jsonMir.proposito.formula
        .replaceAll("(", "")
        .split("/");
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
      {jsonMir.componentes.map((a: IComponente, index: number) => {
       return (
        <Box key={index}>
        <Box
            sx={{
            width: "100%",
            height: "20vh",
            display: "flex",
            justifyContent: "start",
          }}
        > 
          <Box
            sx={{
              width: "20%",
              height: "100%",
              ml: "4vw",
              mt: "5vh",
              mr: "1vw",
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
              <Typography
                sx={{ fontFamily: "MontserratBold", textAlign: "center" }}
              >
                 GOBIERNO DEL ESTADO DE NUEVO LEÓN
              </Typography>
              <Typography
                sx={{ fontFamily: "MontserratBold", textAlign: "center" }}
              >
                SECRETARÍA DE FINANZAS Y TESORERÍA GENERAL DEL ESTADO
              </Typography>
              <Typography
                sx={{ fontFamily: "MontserratBold", textAlign: "center" }}
              >
                PRESUPUESTO POR RESULTADOS
              </Typography>
              <Typography
                sx={{ fontFamily: "MontserratBold", textAlign: "center" }}
              >
                FICHA TECNICA DE INDICADORES 2022
              </Typography>
              <Typography
                sx={{ fontFamily: "MontserratBold", textAlign: "center" }}
              >
                PROGRAMAS PRESUPUESTARIOS
              </Typography>
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
            {jsonMir.componentes[index].componentes}
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Eligendi consectetur quae sunt odio? Magnam, porro dolores alias
              distinctio illum possimus, rem doloribus sint, voluptates
              reiciendis voluptatibus. Cumque error vitae quibusdam.
            </Typography>
          </Box>
        </Box>
        <Box sx={sxTitleDesignPage1}>
          <Typography
            sx={{ ml: 1, fontFamily: "MontserratBold", textAlign: "center" }}
          >
            DATOS DEL INDICADOR:
          </Typography>
        </Box>
        <Box sx={sxBoxMediumSize}>
          <Box sx={sxSubtitleMediumSize}>
            <Typography
              sx={{
                fontSize: "1vw",
                fontFamily: "MontserratSemiBold",
                ml: 1,
              }}
            >
              NOMBRE DEL INDICADOR
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
              sx={{
                fontSize: "1vw",
                fontFamily: "MontserratSemiBold",
                ml: 1,
              }}
            >
              DESCRIPCIÓN
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
              sx={{
                fontSize: "1vw",
                fontFamily: "MontserratSemiBold",
                ml: 1,
              }}
            >
              UNIDAD RESPONSABLE DE REPORTAR EL INDICADOR
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
              sx={{
                fontSize: "1vw",
                fontFamily: "MontserratSemiBold",
                ml: 1,
              }}
            >
              MÉTODO DE CÁLCULO:
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
                backgroundColor: "#D9D9D9",
              }}
            >
              <Typography sx={{ fontSize: "1vw" }}>
                TIPO DE INDICADOR
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
                backgroundColor: "#D9D9D9",
              }}
            >
              <Typography sx={{ fontSize: "1vw" }}>
                DIMENSIÓN
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
                backgroundColor: "#D9D9D9",
              }}
            >
              <Typography sx={{ fontSize: "1vw" }}>
                TIPO DE FÓRMULA
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
                backgroundColor: "#D9D9D9",
              }}
            >
              <Typography sx={{ fontSize: "1vw" }}>
                UNIDAD DE MEDIDA
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
                backgroundColor: "#D9D9D9",
              }}
            >
              <Typography sx={{ fontSize: "1vw" }}>
                FRECUENCIA
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
                backgroundColor: "#D9D9D9",
              }}
            >
              <Typography sx={{ fontSize: "1vw" }}>
                SENTIDO DEL INDICADOR
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
              <Typography>SI</Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={sxTitleDesignPage1}>
          <Typography
            sx={{ ml: 1, fontFamily: "MontserratBold", textAlign: "center" }}
          >
                CARACTERÍSTICAS DEL INDICADOR
          </Typography>
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
                CLARIDAD
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
                backgroundColor: "#D9D9D9",
              }}
            >
              <Typography sx={{ fontSize: "1vw" }}>
                RELEVANCIA
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
                backgroundColor: "#D9D9D9",
              }}
            >
              <Typography sx={{ fontSize: "1vw" }}>
                ECONOMÍA
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
                backgroundColor: "#D9D9D9",
              }}
            >
              <Typography sx={{ fontSize: "1vw" }}>
                MONITOREABLE
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
                backgroundColor: "#D9D9D9",
              }}
            >
              <Typography sx={{ fontSize: "1vw" }}>
                ADECUADO
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
                backgroundColor: "#D9D9D9",
              }}
            >
              <Typography sx={{ fontSize: "1vw" }}>
                APORTE MARGINAL
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
              <Typography>SI</Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={sxTitleDesignPage1}>
          <Typography
            sx={{ ml: 1, fontFamily: "MontserratBold", textAlign: "center" }}
          >
DATOS DE LAS VARIABLES
          </Typography>
        </Box>
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
                NOMBRE
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
              <Typography>SI</Typography>
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
                backgroundColor: "#D9D9D9",
              }}
            >
              <Typography sx={{ fontSize: "1vw" }}>
                DESCRIPCIÓN
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
              <Typography>SI</Typography>
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
                backgroundColor: "#D9D9D9",
              }}
            >
              <Typography sx={{ fontSize: "1vw" }}>
              MEDIO DE VERIFICACIÓN / FUENTE DE INFORMACIÓN
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
              <Typography>SI</Typography>
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
                backgroundColor: "#D9D9D9",
              }}
            >
              <Typography sx={{ fontSize: "1vw" }}>
              UNIDAD DE MEDIDA
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
              <Typography>SI</Typography>
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
                backgroundColor: "#D9D9D9",
              }}
            >
              <Typography sx={{ fontSize: "1vw" }}>
                VALOR 2022
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
              <Typography>SI</Typography>
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
              <Typography>SI</Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={sxTitleDesignPage1}>
          <Typography
            sx={{ ml: 1, fontFamily: "MontserratBold", textAlign: "center" }}
          >
            METAS
          </Typography>
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
                LÍNEA BASE
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
                backgroundColor: "#D9D9D9",
              }}
            >
              <Typography sx={{ fontSize: "1vw" }}>
                META 2022
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
                backgroundColor: "#D9D9D9",
              }}
            >
              <Typography sx={{ fontSize: "1vw" }}>
                META 2023
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
                backgroundColor: "#D9D9D9",
              }}
            >
              <Typography sx={{ fontSize: "1vw" }}>
                META 2024
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
                backgroundColor: "#D9D9D9",
              }}
            >
              <Typography sx={{ fontSize: "1vw" }}>
                META 2025
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
                backgroundColor: "#D9D9D9",
              }}
            >
              <Typography sx={{ fontSize: "1vw" }}>
                META 2026
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
                backgroundColor: "#D9D9D9",
              }}
            >
              <Typography sx={{ fontSize: "1vw" }}>
                META 2027
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
                backgroundColor: "#D9D9D9",
              }}
            >
              <Typography sx={{ fontSize: "1vw" }}>
                META SEXENAL
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
              <Typography>SI</Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={sxTitleDesignPage1}>
          <Typography
            sx={{ ml: 1, fontFamily: "MontserratBold", textAlign: "center" }}
          >
            PARÁMETROS DE SEMAFORIZACIÓN
          </Typography>
        </Box>
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
          {/*PÁGINA*/}
          <Typography sx={{}}>Página 4</Typography>
        </Box>
        <Divider sx={{ backgroundColor: "rgba(0,0,0,5)" }} />
        <Divider sx={{ backgroundColor: "rgba(0,0,0,5)" }} />
        </Box>
       )
      })}
    </>
  );
};
