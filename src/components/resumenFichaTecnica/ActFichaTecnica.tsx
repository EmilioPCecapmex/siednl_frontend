import logo from "../../assets/logos/logo_tesoreriah1.png";
import { Box, Divider, Typography } from "@mui/material";
import { IActividades } from "../tabsMir/ICompActividad";

export const ActFichaTecnica = ({
  MIR,
  MA,
  FT,
  NoPaginas,
}: {
  MIR: string;
  MA: string;
  FT: string;
  NoPaginas: number;
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

  const TasaVar1 = (index: number) => {
    const ArrayVar1 = jsonMir.actividades[index].formula
      .replaceAll("(", "")
      .split("-");
    return ArrayVar1[0];
  };

  const PromedioVar1 = (index: number) => {
    const ArrayVar1 = jsonMir.actividades[index].formula
      .replaceAll("(", "")
      .split("/");
    return ArrayVar1[0];
  };

  const PorcentajeVar1 = (index: number) => {
    const ArrayVar1 = jsonMir.actividades[index].formula
      .replaceAll("(", "")
      .split("/");
    return ArrayVar1[0];
  };

  const TasaVar2 = (index: number) => {
    const ArrayVar1 = jsonMir.actividades[index].formula
      .replaceAll("(", "")
      .split("-");
    return ArrayVar1[1].replaceAll(")", "").replaceAll(" * 100", "");
  };

  const PromedioVar2 = (index: number) => {
    const ArrayVar1 = jsonMir.actividades[index].formula
      .replaceAll("(", "")
      .split("/");
    return ArrayVar1[1].replaceAll(")", "");
  };

  const PorcentajeVar2 = (index: number) => {
    const ArrayVar1 = jsonMir.actividades[index].formula
      .replaceAll("(", "")
      .split("/");
    return ArrayVar1[1].replaceAll(")", "").replaceAll(" * 100", "");
  };

  const CalculosPorComponente = (index: number, color: string) => {
    let metaAnualNumero = parseFloat(jsonMA.actividades[index].metaAnual);

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
      return <Typography>{`${y1String} <= V.I. <= ${z1String}`}</Typography>;
    }

    if (color === "ROJO") {
      return (
        <>
          <Typography>{`V.I. < ${yString}`} </Typography>
          <Typography>{"Ó"} </Typography>
          <Typography>{`${zString} < V.I.`} </Typography>
        </>
      );
    }

    if (color === "AMARILLO") {
      return (
        <>
          <Typography>{`${z1String} <= V.I. < ${zString}`} </Typography>
          <Typography>{"Ó"} </Typography>
          <Typography>{`${yString} < V.I. <= ${y1String}`} </Typography>
        </>
      );
    }
  };
  
  let paginas = NoPaginas;
  
  return (
    <>
      {jsonMir.actividades.map((a: IActividades, index: number) => {
        paginas=paginas+1;
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
              <Typography
                sx={{ fontSize: "1vw", fontFamily: "MontserratBold" }}
              >
                ACTIVIDAD {jsonMir.actividades[index].actividad}
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
                  {jsonMir.actividades[index].resumen}
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
                  sx={{
                    fontSize: "0.6vw",
                    fontFamily: "MontserratRegular",
                    ml: 3,
                  }}
                >
                  {jsonMir.actividades[index].indicador}
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
                  sx={{
                    fontSize: "1vw",
                    fontFamily: "MontserratRegular",
                    ml: 3,
                  }}
                >
                  {jsonMA.actividades[index].descIndicador}
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
                  sx={{
                    fontSize: "1vw",
                    fontFamily: "MontserratRegular",
                    ml: 3,
                  }}
                >
                  {jsonMA.actividades[index].unidadResponsable}
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
                  sx={{
                    fontSize: "0.6vw",
                    fontFamily: "MontserratRegular",
                    ml: 3,
                  }}
                >
                  {jsonMir.actividades[index].formula}
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
                  <Typography fontSize={".6vw"}>
                    {jsonFT.actividades[index].tipoDeIndicador}
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
                  <Typography sx={{ fontSize: "1vw" }}>DIMENSIÓN</Typography>
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
                  <Typography>{jsonFT.actividades[index].dimension}</Typography>
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
                  {jsonMir.actividades[index].indicador
                    .toUpperCase()
                    .includes("PORCENTAJE") ||
                  jsonMir.actividades[index].indicador.toUpperCase() ===
                    "PORCENTAJE" ? (
                    <Typography>PORCENTAJE</Typography>
                  ) : jsonMir.actividades[index].indicador
                      .toUpperCase()
                      .includes("TASA") ||
                    jsonMir.actividades[index].indicador.toUpperCase() ===
                      "TASA" ? (
                    <Typography>TASA</Typography>
                  ) : jsonMir.actividades[index].indicador
                      .toUpperCase()
                      .includes("PROMEDIO") ||
                    jsonMir.actividades[index].indicador.toUpperCase() ===
                      "PROMEDIO" ? (
                    <Typography>PROMEDIO</Typography>
                  ) : jsonMir.actividades[index].indicador
                      .toUpperCase()
                      .includes("INDICE") ||
                    jsonMir.actividades[index].indicador.toUpperCase() ===
                      "INDICE" ||
                    jsonMir.actividades[index].indicador
                      .toUpperCase()
                      .includes("ÍNDICE") ||
                    jsonMir.actividades[index].indicador.toUpperCase() ===
                      "ÍNDICE" ? (
                    <Typography>ÍNDICE</Typography>
                  ) : (
                    <Typography>SI</Typography>
                  )}
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
                  <Typography>
                    {jsonFT.actividades[index].unidadDeMedida}
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
                  <Typography sx={{ fontSize: "1vw" }}>FRECUENCIA</Typography>
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
                  <Typography>
                    {jsonMir.actividades[index].frecuencia}
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
                  <Typography>
                    {jsonMA.actividades[index].sentidoDelIndicador}
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
                  <Typography sx={{ fontSize: "1vw" }}>CLARIDAD</Typography>
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
                  <Typography>{jsonFT.actividades[index].claridad}</Typography>
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
                  <Typography sx={{ fontSize: "1vw" }}>RELEVANCIA</Typography>
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
                  <Typography>
                    {jsonFT.actividades[index].relevancia}
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
                  <Typography sx={{ fontSize: "1vw" }}>ECONOMÍA</Typography>
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
                  <Typography>{jsonFT.actividades[index].economia}</Typography>
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
                  <Typography sx={{ fontSize: "1vw" }}>MONITOREABLE</Typography>
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
                  <Typography>
                    {jsonFT.actividades[index].monitoreable}
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
                  <Typography sx={{ fontSize: "1vw" }}>ADECUADO</Typography>
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
                  <Typography>{jsonFT.actividades[index].adecuado}</Typography>
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
                  <Typography>
                    {jsonFT.actividades[index].aporte_marginal}
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
                  <Typography sx={{ fontSize: "1vw" }}>NOMBRE</Typography>
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
                  {/*vvaria1*/}
                  <Typography fontSize={".6vw"}>
                    {jsonMir.actividades[index].indicador
                      .toUpperCase()
                      .includes("TASA") ||
                    jsonMir.actividades[index].indicador.toUpperCase() ===
                      "TASA"
                      ? TasaVar1(index)
                      : jsonMir.actividades[index].indicador
                          .toUpperCase()
                          .includes("PROMEDIO") ||
                        jsonMir.actividades[index].indicador.toUpperCase() ===
                          "PROMEDIO"
                      ? PromedioVar1(index)
                      : jsonMir.actividades[index].indicador
                          .toUpperCase()
                          .includes("PORCENTAJE") ||
                        jsonMir.actividades[index].indicador.toUpperCase() ===
                          "PORCENTAJE"
                      ? PorcentajeVar1(index)
                      : jsonMir.actividades[index].indicador
                          .toUpperCase()
                          .includes("INDICE") ||
                        jsonMir.actividades[index].indicador.toUpperCase() ===
                          "INDICE" ||
                        jsonMir.actividades[index].indicador
                          .toUpperCase()
                          .includes("ÍNDICE") ||
                        jsonMir.actividades[index].indicador.toUpperCase() ===
                          "ÍNDICE"
                      ? jsonMir.actividades[index].formula
                      : ""}
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
                  {/*vvaria2*/}
                  <Typography fontSize={".6vw"}>
                    {jsonMir.actividades[index].indicador
                      .toUpperCase()
                      .includes("TASA") ||
                    jsonMir.actividades[index].indicador.toUpperCase() ===
                      "TASA"
                      ? TasaVar2(index)
                      : jsonMir.actividades[index].indicador
                          .toUpperCase()
                          .includes("PROMEDIO") ||
                        jsonMir.actividades[index].indicador.toUpperCase() ===
                          "PROMEDIO"
                      ? PromedioVar2(index)
                      : jsonMir.actividades[index].indicador
                          .toUpperCase()
                          .includes("PORCENTAJE") ||
                        jsonMir.actividades[index].indicador.toUpperCase() ===
                          "PORCENTAJE"
                      ? PorcentajeVar2(index)
                      : jsonMir.actividades[index].indicador
                          .toUpperCase()
                          .includes("INDICE") ||
                        jsonMir.actividades[index].indicador.toUpperCase() ===
                          "INDICE" ||
                        jsonMir.actividades[index].indicador
                          .toUpperCase()
                          .includes("ÍNDICE") ||
                        jsonMir.actividades[index].indicador.toUpperCase() ===
                          "ÍNDICE"
                      ? jsonMir.actividades[index].formula
                      : ""}
                  </Typography>
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
                  <Typography sx={{ fontSize: "1vw" }}>DESCRIPCIÓN</Typography>
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
                  <Typography>
                    {jsonMA.actividades[index].descNumerador}
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
                  <Typography>
                    {jsonMA.actividades[index].descDenominador}
                  </Typography>
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
                  <Typography fontSize={".6vw"}>
                    {jsonMir.actividades[index].medios}
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
                  <Typography fontSize={".6vw"}>
                    {jsonMir.actividades[index].medios}
                  </Typography>
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
                  <Typography>{jsonFT.encabezado.unidadDeMedida}</Typography>
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
                  <Typography>{jsonFT.encabezado.unidadDeMedida}</Typography>
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
                  <Typography sx={{ fontSize: "1vw" }}>VALOR 2022</Typography>
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
                  <Typography>
                    {jsonMA.actividades[index].valorNumerador}
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
                  <Typography>
                    {jsonMA.actividades[index].valorDenominador}
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
                  {jsonMir.actividades[index].supuestos}
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
                  <Typography sx={{ fontSize: "1vw" }}>LÍNEA BASE</Typography>
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
                  <Typography>{jsonMA.actividades[index].lineaBase}</Typography>
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
                  <Typography sx={{ fontSize: "1vw" }}>META 2022</Typography>
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
                  <Typography>{jsonMA.actividades[index].metaAnual}</Typography>
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
                  <Typography sx={{ fontSize: "1vw" }}>META 2023</Typography>
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
                  <Typography sx={{ fontSize: "1vw" }}>META 2024</Typography>
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
                  <Typography sx={{ fontSize: "1vw" }}>META 2025</Typography>
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
                  <Typography sx={{ fontSize: "1vw" }}>META 2026</Typography>
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
                  <Typography sx={{ fontSize: "1vw" }}>META 2027</Typography>
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
                  <Typography sx={{ fontSize: "1vw" }}>META SEXENAL</Typography>
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
                  <Typography>
                    {CalculosPorComponente(index, "VERDE")}
                  </Typography>
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
              <Typography sx={{}}>Página {paginas}</Typography>
            </Box>
            <Divider sx={{ backgroundColor: "rgba(0,0,0,5)" }} />
            <Divider sx={{ backgroundColor: "rgba(0,0,0,5)" }} />
          </Box>
        );
      })}
    </>
  );
};
