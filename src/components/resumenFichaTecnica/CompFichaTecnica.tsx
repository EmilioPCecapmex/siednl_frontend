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
    textAlign: "center",
  };

  const sxResultSmallBoxes = {
    fontSize: ".8rem",
    fontFamily: "MontserratRegular",
    textAlign: "center",
  };

  const jsonMir = JSON.parse(MIR);
  const jsonMA = JSON.parse(MA);
  const jsonFT = JSON.parse(FT);

  const TasaVar1 = (index: number) => {
    const ArrayVar1 = jsonMir.componentes[index].formula
      .replaceAll("(", "")
      .split("-");
    return ArrayVar1[0];
  };

  const PromedioVar1 = (index: number) => {
    const ArrayVar1 = jsonMir.componentes[index].formula
      .replaceAll("(", "")
      .split("/");
    return ArrayVar1[0];
  };

  const PorcentajeVar1 = (index: number) => {
    const ArrayVar1 = jsonMir.componentes[index].formula
      .replaceAll("(", "")
      .split("/");
    return ArrayVar1[0];
  };

  const TasaVar2 = (index: number) => {
    const ArrayVar1 = jsonMir.componentes[index].formula
      .replaceAll("(", "")
      .split("-");
    return ArrayVar1[1].replaceAll(")", "").replaceAll(" * 100", "");
  };

  const PromedioVar2 = (index: number) => {
    const ArrayVar1 = jsonMir.componentes[index].formula
      .replaceAll("(", "")
      .split("/");
    return ArrayVar1[1].replaceAll(")", "");
  };

  const PorcentajeVar2 = (index: number) => {
    const ArrayVar1 = jsonMir.componentes[index].formula
      .replaceAll("(", "")
      .split("/");
    return ArrayVar1[1].replaceAll(")", "").replaceAll(" * 100", "");
  };

  const CalculosPorComponente = (index: number, color: string) => {
    let metaAnualNumero = parseFloat(jsonMA.componentes[index].metaAnual);

    let x = metaAnualNumero * 0.15;
    let y = metaAnualNumero - x;
    let z = metaAnualNumero + x;

    //let xString = x.toFixed(2);
    let xString = x.toFixed(2);
    let yString = y.toFixed(2);
    let zString = z.toFixed(2);

    //VERDE
    let x1 = metaAnualNumero * 0.05;
    let y1 = metaAnualNumero - x1;
    let z1 = metaAnualNumero + x1;

    let x1String = x1.toFixed(2);
    let y1String = y1.toFixed(2);
    let z1String = z1.toFixed(2);

    if (color === "VERDE") {
      return <Typography sx={sxTitleSmallBoxes}>{`${y1String} <= V.I. <= ${z1String}`}</Typography>;
    }

    if (color === "ROJO") {
      return (
        <>
          <Typography sx={sxTitleSmallBoxes}>{`V.I. < ${yString}`} </Typography>
          <Typography sx={sxTitleSmallBoxes}>{"Ó"} </Typography>
          <Typography sx={sxTitleSmallBoxes}>{`${zString} < V.I.`} </Typography>
        </>
      );
    }

    if (color === "AMARILLO") {
      return (
        <>
          <Typography sx={sxTitleSmallBoxes} >{`${z1String} <= V.I. < ${zString}`} </Typography>
          <Typography sx={sxTitleSmallBoxes} >{"Ó"} </Typography>
          <Typography sx={sxTitleSmallBoxes} >{`${yString} < V.I. <= ${y1String}`} </Typography>
        </>
      );
    }
  };

  let paginacion = 3;

  //Forma de sacar tipo de formula
  return (
    <>
      {jsonMir.componentes.map((a: IComponente, index: number) => {
        paginacion = paginacion + 1;
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
                    height: "20vh",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "MontserratSemiBold",
                      textAlign: "center",
                    }}
                  >
                    GOBIERNO DEL ESTADO DE NUEVO LEÓN
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "MontserratSemiBold",
                      textAlign: "center",
                    }}
                  >
                    SECRETARÍA DE FINANZAS Y TESORERÍA GENERAL DEL ESTADO
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "MontserratSemiBold",
                      textAlign: "center",
                    }}
                  >
                    PRESUPUESTO POR RESULTADOS
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "MontserratSemiBold",
                      textAlign: "center",
                    }}
                  >
                    FICHA TECNICA DE INDICADORES 2022
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "MontserratSemiBold",
                      textAlign: "center",
                    }}
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
              <Typography
                sx={{ fontSize: "1vw", fontFamily: "MontserratBold" }}
              >
                COMPONENTE {jsonMir.componentes[index].componentes}
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
                  {jsonMir.componentes[index].resumen}
                </Typography>
              </Box>
            </Box>
            <Box sx={sxTitleDesignPage1}>
              <Typography
                sx={{
                  ml: 1,
                  fontFamily: "MontserratBold",
                  textAlign: "center",
                }}
              >
                DATOS DEL INDICADOR:
              </Typography>
            </Box>
            <Box sx={sxSpaceBetweenTitleResult}>
              <Box sx={sxTitleColumn}>
                <Typography sx={sxTitleStyle}>NOMBRE DEL INDICADOR</Typography>
              </Box>
              <Box sx={sxResultSize}>
                <Typography sx={sxResultContentDesign}>
                  {jsonMir.componentes[index].indicador}
                </Typography>
              </Box>
            </Box>
            <Box sx={sxSpaceBetweenTitleResult}>
              <Box sx={sxTitleColumn}>
                <Typography sx={sxTitleStyle}>DESCRIPCIÓN</Typography>
              </Box>
              <Box sx={sxResultSize}>
                <Typography sx={sxResultContentDesign}>
                  {jsonMA.componentes[index].descIndicador}
                </Typography>
              </Box>
            </Box>
            <Box sx={sxSpaceBetweenTitleResult}>
              <Box sx={sxTitleColumn}>
                <Typography sx={sxTitleStyle}>
                  UNIDAD RESPONSABLE DE REPORTAR EL INDICADOR
                </Typography>
              </Box>
              <Box sx={sxResultSize}>
                <Typography sx={sxResultContentDesign}>
                  {jsonMA.componentes[index].unidadResponsable}
                </Typography>
              </Box>
            </Box>
            <Box sx={sxSpaceBetweenTitleResult}>
              <Box sx={sxTitleColumn}>
                <Typography sx={sxTitleStyle}>MÉTODO DE CÁLCULO:</Typography>
              </Box>
              <Box sx={sxResultSize}>
                <Typography sx={sxResultContentDesign}>
                  {jsonMir.componentes[index].formula}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                width: "62vw",
                height: "100%",
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
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    width: "11vw",
                    border: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#D9D9D9",
                  }}
                >
                  <Typography sx={sxTitleSmallBoxes}>
                    TIPO DE INDICADOR
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "11vw",
                    height: "100%",
                    border: 1,
                    borderTop: 0,
                    borderRight: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={sxResultSmallBoxes}>
                    {jsonFT.componentes[index].tipoDeIndicador}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  width: "7vw",
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
                  <Typography sx={sxTitleSmallBoxes}>DIMENSIÓN</Typography>
                </Box>
                <Box
                  sx={{
                    width: "7vw",
                    height: "100%",
                    border: 1,
                    borderTop: 0,
                    borderRight: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={sxResultSmallBoxes}>
                    {jsonFT.componentes[index].dimension}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  width: "11vw",
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
                    TIPO DE FÓRMULA
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "11vw",
                    height: "100%",
                    border: 1,
                    borderTop: 0,
                    borderRight: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {jsonMir.componentes[index].indicador
                    
                    .includes("PORCENTAJE") ||
                  jsonMir.componentes[index].indicador ===
                    "PORCENTAJE" ? (
                    <Typography sx={sxResultSmallBoxes}>PORCENTAJE</Typography>
                  ) : jsonMir.componentes[index].indicador
                      
                      .includes("TASA") ||
                    jsonMir.componentes[index].indicador ===
                      "TASA" ? (
                    <Typography sx={sxResultSmallBoxes}>TASA</Typography>
                  ) : jsonMir.componentes[index].indicador
                      
                      .includes("PROMEDIO") ||
                    jsonMir.componentes[index].indicador ===
                      "PROMEDIO" ? (
                    <Typography sx={sxResultSmallBoxes}>PROMEDIO</Typography>
                  ) : jsonMir.componentes[index].indicador
                      
                      .includes("INDICE") ||
                    jsonMir.componentes[index].indicador ===
                      "INDICE" ||
                    jsonMir.componentes[index].indicador
                      
                      .includes("ÍNDICE") ||
                    jsonMir.componentes[index].indicador ===
                      "ÍNDICE" ? (
                    <Typography sx={sxResultSmallBoxes}>ÍNDICE</Typography>
                  ) : (
                    <Typography sx={sxResultSmallBoxes}>NINGUNA</Typography>
                  )}
                </Box>
              </Box>
              <Box
                sx={{
                  width: "12vw",
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
                    UNIDAD DE MEDIDA
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "12vw",
                    height: "100%",
                    border: 1,
                    borderRight: 0,
                    borderTop: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={sxResultSmallBoxes}>
                    {jsonFT.componentes[index].unidadDeMedida}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  width: "8vw",
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
                  <Typography sx={sxTitleSmallBoxes}>FRECUENCIA</Typography>
                </Box>
                <Box
                  sx={{
                    width: "8vw",
                    height: "100%",
                    border: 1,
                    borderRight: 0,
                    borderTop: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={sxResultSmallBoxes}>
                    {jsonMir.componentes[index].frecuencia}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  width: "13vw",
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
                    SENTIDO DEL INDICADOR
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "13vw",
                    height: "100%",
                    border: 1,
                    borderTop: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={sxResultSmallBoxes}>
                    {jsonMA.componentes[index].sentidoDelIndicador}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={sxTitleDesignPage1}>
              <Typography
                sx={{
                  ml: 1,
                  fontFamily: "MontserratBold",
                  textAlign: "center",
                }}
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
                  <Typography sx={sxTitleSmallBoxes}>CLARIDAD</Typography>
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
                  <Typography sx={sxResultSmallBoxes}>
                    {jsonFT.componentes[index].claridad}
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
                  <Typography sx={sxTitleSmallBoxes}>RELEVANCIA</Typography>
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
                  <Typography sx={sxResultSmallBoxes}>
                    {jsonFT.componentes[index].relevancia}
                  </Typography>
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
                  <Typography sx={sxTitleSmallBoxes}>ECONOMÍA</Typography>
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
                  <Typography sx={sxResultSmallBoxes}>
                    {jsonFT.componentes[index].economia}
                  </Typography>
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
                  <Typography sx={sxTitleSmallBoxes}>MONITOREABLE</Typography>
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
                  <Typography sx={sxResultSmallBoxes}>
                    {jsonFT.componentes[index].monitoreable}
                  </Typography>
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
                  <Typography sx={sxTitleSmallBoxes}>ADECUADO</Typography>
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
                  <Typography sx={sxResultSmallBoxes}>
                    {jsonFT.componentes[index].adecuado}
                  </Typography>
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
                  <Typography sx={sxResultSmallBoxes}>
                    {jsonFT.componentes[index].aporte_marginal}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={sxTitleDesignPage1}>
              <Typography
                sx={{
                  ml: 1,
                  fontFamily: "MontserratBold",
                  textAlign: "center",
                }}
              >
                DATOS DE LAS VARIABLES
              </Typography>
            </Box>
            <Box
              sx={{
                width: "62vw",
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
                  height: "40vh",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "20%",
                    border: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#D9D9D9",
                  }}
                >
                  <Typography sx={sxTitleSmallBoxes}>NOMBRE</Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    height: "40%",
                    border: 1,
                    borderTop: 0,
                    borderRight: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {/*vvaria1*/}
                  <Typography
                    sx={{
                      width: "90%",
                      display: "flex",
                      fontSize: ".7rem",
                      textAlign: "justify",
                      fontFamily: "MontserratRegular",
                      backgroundColor: "white",
                    }}
                  >
                    {jsonMir.componentes[index].indicador
                      
                      .includes("TASA") ||
                    jsonMir.componentes[index].indicador ===
                      "TASA"
                      ? TasaVar1(index)
                      : jsonMir.componentes[index].indicador
                          
                          .includes("PROMEDIO") ||
                        jsonMir.componentes[index].indicador ===
                          "PROMEDIO"
                      ? PromedioVar1(index)
                      : jsonMir.componentes[index].indicador
                          
                          .includes("PORCENTAJE") ||
                        jsonMir.componentes[index].indicador ===
                          "PORCENTAJE"
                      ? PorcentajeVar1(index)
                      : jsonMir.componentes[index].indicador
                          
                          .includes("INDICE") ||
                        jsonMir.componentes[index].indicador ===
                          "INDICE" ||
                        jsonMir.componentes[index].indicador
                          
                          .includes("ÍNDICE") ||
                        jsonMir.componentes[index].indicador ===
                          "ÍNDICE"
                      ? jsonMir.componentes[index].formula
                      : ""}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    height: "40%",
                    border: 1,
                    borderTop: 0,
                    borderRight: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {/*vvaria2*/}
                  <Typography
                    sx={{
                      width: "90%",
                      display: "flex",
                      fontSize: ".7rem",
                      textAlign: "justify",
                      fontFamily: "MontserratRegular",
                      backgroundColor: "white",
                    }}
                  >
                    {jsonMir.componentes[index].indicador
                      
                      .includes("TASA") ||
                    jsonMir.componentes[index].indicador ===
                      "TASA"
                      ? TasaVar2(index)
                      : jsonMir.componentes[index].indicador
                          
                          .includes("PROMEDIO") ||
                        jsonMir.componentes[index].indicador ===
                          "PROMEDIO"
                      ? PromedioVar2(index)
                      : jsonMir.componentes[index].indicador
                          
                          .includes("PORCENTAJE") ||
                        jsonMir.componentes[index].indicador ===
                          "PORCENTAJE"
                      ? PorcentajeVar2(index)
                      : jsonMir.componentes[index].indicador
                          
                          .includes("INDICE") ||
                        jsonMir.componentes[index].indicador ===
                          "INDICE" ||
                        jsonMir.componentes[index].indicador
                          
                          .includes("ÍNDICE") ||
                        jsonMir.componentes[index].indicador ===
                          "ÍNDICE"
                      ? jsonMir.componentes[index].formula
                      : ""}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  width: "11vw",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "20%",
                    border: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#D9D9D9",
                  }}
                >
                  <Typography sx={sxTitleSmallBoxes}>DESCRIPCIÓN</Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    height: "40%",
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
                      width: "90%",
                      fontSize: ".7rem",
                      fontFamily: "MontserratRegular",
                      minHeight: "5vh",
                      backgroundColor: "white",
                      textAlign: "justify",
                    }}
                  >
                    {jsonMA.componentes[index].descNumerador}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    height: "40%",
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
                      width: "90%",
                      fontSize: ".7rem",
                      fontFamily: "MontserratRegular",
                      textAlign: "justify",
                      backgroundColor: "white",
                    }}
                  >
                    {jsonMA.componentes[index].descDenominador}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  width: "18vw",
                  height: "40vh",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "20%",
                    border: 1,
                    borderBottom: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#D9D9D9",
                  }}
                >
                  <Typography sx={sxTitleSmallBoxes}>
                    MEDIO DE VERIFICACIÓN / FUENTE DE INFORMACIÓN
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    height: "40%",
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
                      width: "90%",
                      fontSize: ".7rem",
                      fontFamily: "MontserratRegular",
                      minHeight: "5vh",
                      backgroundColor: "white",
                      textAlign: "justify",
                    }}
                  >
                    {jsonMir.componentes[index].medios}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    height: "40%",
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
                      width: "90%",
                      fontSize: ".7rem",
                      fontFamily: "MontserratRegular",
                      minHeight: "5vh",
                      backgroundColor: "white",
                      textAlign: "justify",
                    }}
                  >
                    {jsonMir.componentes[index].medios}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  width: "11vw",
                  height: "40vh",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
              height: "20%",
                    border: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#D9D9D9",
                  }}
                >
                  <Typography sx={sxTitleSmallBoxes}>
                    UNIDAD DE MEDIDA
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    height: "40%",
                    border: 1,
                    borderTop: 0,
                    borderRight: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{
                     width: "90%",
                     display: "flex",
                     fontSize: ".7rem",
                     fontFamily: "MontserratRegular",
                     minHeight: "5vh",
                     backgroundColor: "white",
                     textAlign: "justify",
                  }}>{jsonFT.encabezado.unidadDeMedida}</Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    height: "40%",
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
                    width: "90%",
                   display: "flex",
                   fontSize: ".7rem",
                   fontFamily: "MontserratRegular",
                   minHeight: "5vh",
                   backgroundColor: "white",
                   textAlign: "justify",
                 }}
                 >
                  {jsonFT.encabezado.unidadDeMedida}</Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  width: "11vw",
                  height: "40vh",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    width: "11vw",
                    height: "20%",
                    border: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#D9D9D9",
                  }}
                >
                  <Typography sx={sxTitleSmallBoxes}>VALOR 2022</Typography>
                </Box>
                <Box
                  sx={{
                    width: "11vw",
                    height: "40%",
                    border: 1,
                    borderTop: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontSize: ".7rem", fontFamily: "MontserratRegular" }}
                >
                    {jsonMA.componentes[index].valorNumerador}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "11vw",
                    height: "40%",
                    border: 1,
                    borderTop: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontSize: ".7rem", fontFamily: "MontserratRegular" }}
                >
                    {jsonMA.componentes[index].valorDenominador}
                  </Typography>
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
              <Typography
                sx={{ fontSize: "1vw", fontFamily: "MontserratBold" }}
              >
                SUPUESTO
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
                  {jsonMir.componentes[index].supuestos}
                </Typography>
              </Box>
            </Box>
            <Box sx={sxTitleDesignPage1}>
              <Typography
                sx={{
                  ml: 1,
                  fontFamily: "MontserratBold",
                  textAlign: "center",
                }}
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
                  <Typography sx={sxTitleSmallBoxes}>LÍNEA BASE</Typography>
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
                  <Typography sx={sxResultSmallBoxes}>{jsonMA.componentes[index].lineaBase}</Typography>
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
                  <Typography sx={sxTitleSmallBoxes}>META 2022</Typography>
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
                  <Typography sx={sxResultSmallBoxes}>{jsonMA.componentes[index].metaAnual}</Typography>
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
                  <Typography sx={sxTitleSmallBoxes}>META 2023</Typography>
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
                  <Typography sx={sxTitleSmallBoxes}>META 2024</Typography>
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
                  <Typography sx={sxTitleSmallBoxes}>META 2025</Typography>
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
                  <Typography sx={sxTitleSmallBoxes}>META 2026</Typography>
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
                  <Typography sx={sxTitleSmallBoxes}>META 2027</Typography>
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
                  <Typography sx={sxTitleSmallBoxes}>META SEXENAL</Typography>
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
            <Box sx={sxTitleDesignPage1}>
              <Typography
                sx={{
                  ml: 1,
                  fontFamily: "MontserratBold",
                  textAlign: "center",
                }}
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
                  {CalculosPorComponente(index, "ROJO")}
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
                  {CalculosPorComponente(index, "AMARILLO")}
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
                    backgroundColor: "#4fb830",
                  }}
                >
                  {CalculosPorComponente(index, "VERDE")}
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
              <Typography sx={sxTitleSmallBoxes}>Página {paginacion}</Typography>
            </Box>
            <Divider sx={{ height: "1vh", backgroundColor: "rgba(0,0,0,5)" }} />
            </>
        );
      })}
    </>
  );
};
