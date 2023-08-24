import { Box,Grid, Typography, Button } from "@mui/material";

export function TabResumen({ showResume }: { showResume: Function }) {
  return (
    <Grid
      sx={{
        width: "93vw",
        height: "82vh",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyItems: "center",
        backgroundColor: "#fff",
        boxShadow: 20,
        borderRadius: 5,
      }}
    >
      <Grid
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
            backgroundColor: "rgba(0,0,0,.5)",
            outline: "1px solid slategrey",
            borderRadius: 1,
          },
        }}
      >
        <Grid sx={{ p: 5, display: "flex", flexDirection: "column" }}>
          <Typography sx={{ fontFamily: "MontserratBold", borderBottom: 1 }}>
            Identificación
          </Typography>

          <Grid sx={{ display: "flex" }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "50%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Ejercicio Fiscal:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem Ipsum
              </Typography>
            </Grid>

            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "50%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Clasificación Programatica:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem Ipsum
              </Typography>
            </Grid>
          </Grid>
          <Grid sx={{ display: "flex" }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "50%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Institución:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem Ipsum
              </Typography>
            </Grid>

            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "50%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Temática:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem Ipsum
              </Typography>
            </Grid>
          </Grid>

          <Grid sx={{ display: "flex" }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "50%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Objetivo:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem Ipsum
              </Typography>
            </Grid>

            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "50%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                CONAC:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem Ipsum
              </Typography>
            </Grid>
          </Grid>

          <Grid sx={{ display: "flex" }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "50%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Tipo de Beneficiario:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem Ipsum
              </Typography>
            </Grid>

            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "50%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Programa:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem ipsum
              </Typography>
            </Grid>
          </Grid>

          <Grid
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              mt: 1,
              alignItems: "center",
              borderBottom: 1,
              borderColor: "#cfcfcf",
            }}
          >
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              Beneficiario:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              Lorem Ipsum
            </Typography>
          </Grid>

          <Typography
            sx={{ fontFamily: "MontserratBold", borderBottom: 1, mt: "3vh" }}
          >
            Alineación
          </Typography>

          <Grid sx={{ display: "flex" }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "50%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Tema PED:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem Ipsum
              </Typography>
            </Grid>

            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "50%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Objetivo:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem Ipsum
              </Typography>
            </Grid>
          </Grid>
          <Grid sx={{ display: "flex" }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "50%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Estrategía:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem Ipsum
              </Typography>
            </Grid>

            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "50%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Programa Sectorial:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem Ipsum
              </Typography>
            </Grid>
          </Grid>

          <Grid sx={{ display: "flex" }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Objetivo Programa Sectorial:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem Ipsum
              </Typography>
            </Grid>
          </Grid>

          <Typography
            sx={{ fontFamily: "MontserratBold", borderBottom: 1, mt: "3vh" }}
          >
            Objetivos
          </Typography>

          <Grid sx={{ display: "flex" }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Objetivo General:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem Ipsum
              </Typography>
            </Grid>
          </Grid>

          <Grid sx={{ display: "flex" }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Objetivo Especifico 1:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
                fugit nemo modi magnam?
              </Typography>
            </Grid>
          </Grid>

          <Grid sx={{ display: "flex" }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Objetivo Especifico 2:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
                illo modi perspiciatis do Accusamus, excepturi?
              </Typography>
            </Grid>
          </Grid>
          <Typography
            sx={{ fontFamily: "MontserratBold", borderBottom: 1, mt: "3vh" }}
          >
            Acción 1
          </Typography>

          <Grid sx={{ display: "flex" }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Descripción:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem Ipsum
              </Typography>
            </Grid>
          </Grid>
          <Grid sx={{ display: "flex" }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Nombre del Indicador:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem Ipsum
              </Typography>
            </Grid>
          </Grid>

          <Grid sx={{ display: "flex" }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "33%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Linea Base 2021:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
                fugit nemo modi magnam?
              </Typography>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "33%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Meta 2022:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
                fugit nemo modi magnam?
              </Typography>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "33%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Meta 2023:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
                fugit nemo modi magnam?
              </Typography>
            </Grid>
          </Grid>

          <Grid sx={{ display: "flex" }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "33%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Meta 2024:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
                fugit nemo modi magnam?
              </Typography>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "33%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Meta 2025:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
                fugit nemo modi magnam?
              </Typography>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "33%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Meta 2026:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
                fugit nemo modi magnam?
              </Typography>
            </Grid>
          </Grid>

          <Grid sx={{ display: "flex" }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Meta 2027:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
                fugit nemo modi magnam?
              </Typography>
            </Grid>
          </Grid>
          <Typography
            sx={{ fontFamily: "MontserratBold", borderBottom: 1, mt: "3vh" }}
          >
            Acción 1 - Datos del Indicador
          </Typography>

          <Grid sx={{ display: "flex" }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Formula de Cálculo:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem Ipsum
              </Typography>
            </Grid>
          </Grid>

          <Grid sx={{ display: "flex" }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "33%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Unidad de Medida:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem ipsum dolor.
              </Typography>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "33%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Tipo de Fórmula:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem imodi magnam?
              </Typography>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "33%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Tipo de Indicador:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem ipsum?
              </Typography>
            </Grid>
          </Grid>

          <Grid sx={{ display: "flex" }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "50%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Dimensión del Indicador:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem lorefut nemo modi magnam
              </Typography>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "50%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Sentido del Indicador:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem ipsnam?
              </Typography>
            </Grid>
          </Grid>

          <Grid sx={{ display: "flex" }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Numerador:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
                fugit nemo modi magnam?
              </Typography>
            </Grid>
          </Grid>
          <Grid sx={{ display: "flex" }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Unidad de Medida:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
                fugit nemo modi magnam?
              </Typography>
            </Grid>
          </Grid>
          <Grid sx={{ display: "flex" }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Medio de Verificación / Fuente de Información:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
                fugit nemo modi magnam?
              </Typography>
            </Grid>
          </Grid>

          <Grid sx={{ display: "flex" }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Denominador:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
                fugit nemo modi magnam?
              </Typography>
            </Grid>
          </Grid>
          <Grid sx={{ display: "flex" }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Unidad de Medida:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
                fugit nemo modi magnam?
              </Typography>
            </Grid>
          </Grid>
          <Grid sx={{ display: "flex" }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Medio de Verificación / Fuente de Información:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
                fugit nemo modi magnam?
              </Typography>
            </Grid>
          </Grid>
          <Typography
            sx={{ fontFamily: "MontserratBold", borderBottom: 1, mt: "3vh" }}
          >
            Acción 2
          </Typography>

          <Grid sx={{ display: "flex" }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Descripción:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem Ipsum
              </Typography>
            </Grid>
          </Grid>
          <Grid sx={{ display: "flex" }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Nombre del Indicador:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem Ipsum
              </Typography>
            </Grid>
          </Grid>

          <Grid sx={{ display: "flex" }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "33%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Linea Base 2021:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
                fugit nemo modi magnam?
              </Typography>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "33%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Meta 2022:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
                fugit nemo modi magnam?
              </Typography>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "33%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Meta 2023:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
                fugit nemo modi magnam?
              </Typography>
            </Grid>
          </Grid>

          <Grid sx={{ display: "flex" }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "33%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Meta 2024:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
                fugit nemo modi magnam?
              </Typography>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "33%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Meta 2025:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
                fugit nemo modi magnam?
              </Typography>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "33%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Meta 2026:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
                fugit nemo modi magnam?
              </Typography>
            </Grid>
          </Grid>

          <Grid sx={{ display: "flex" }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Meta 2027:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
                fugit nemo modi magnam?
              </Typography>
            </Grid>
          </Grid>
          <Typography
            sx={{ fontFamily: "MontserratBold", borderBottom: 1, mt: "3vh" }}
          >
            Acción 2 - Datos del Indicador
          </Typography>

          <Grid sx={{ display: "flex" }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Formula de Cálculo:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem Ipsum
              </Typography>
            </Grid>
          </Grid>

          <Grid sx={{ display: "flex" }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "33%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Unidad de Medida:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem ipsum dolor.
              </Typography>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "33%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Tipo de Fórmula:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem imodi magnam?
              </Typography>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "33%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Tipo de Indicador:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem ipsum?
              </Typography>
            </Grid>
          </Grid>

          <Grid sx={{ display: "flex" }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "50%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Dimensión del Indicador:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem lorefut nemo modi magnam
              </Typography>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "50%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Sentido del Indicador:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem ipsnam?
              </Typography>
            </Grid>
          </Grid>

          <Grid sx={{ display: "flex" }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Numerador:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
                fugit nemo modi magnam?
              </Typography>
            </Grid>
          </Grid>
          <Grid sx={{ display: "flex" }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Unidad de Medida:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
                fugit nemo modi magnam?
              </Typography>
            </Grid>
          </Grid>
          <Grid sx={{ display: "flex" }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Medio de Verificación / Fuente de Información:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
                fugit nemo modi magnam?
              </Typography>
            </Grid>
          </Grid>

          <Grid sx={{ display: "flex" }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Denominador:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
                fugit nemo modi magnam?
              </Typography>
            </Grid>
          </Grid>
          <Grid sx={{ display: "flex" }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Unidad de Medida:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
                fugit nemo modi magnam?
              </Typography>
            </Grid>
          </Grid>
          <Grid sx={{ display: "flex" }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Medio de Verificación / Fuente de Información:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
                fugit nemo modi magnam?
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
          mt: 2,
        }}
      >
        <Button color="error" variant="outlined" onClick={() => showResume()}>
          Cancelar
        </Button>
        <Button color="warning" variant="outlined">
          Guardar borrador
        </Button>
        <Button color="success" variant="outlined">
          Enviar
        </Button>
      </Grid>
    </Grid>
  );
}

export default TabResumen;
