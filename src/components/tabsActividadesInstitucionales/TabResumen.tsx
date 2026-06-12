import { Box,Grid, Typography, Button } from "@mui/material";
import { IAI, IAcciones } from "./Interfaces";
export function TabResumen({ AI,showResume }: { AI:IAI;showResume: Function }) {
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
          <Typography sx={{ fontFamily: "PoppinsBold", borderBottom: 1 }}>
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
              <Typography sx={{ fontFamily: "PoppinsMedium", width: "20%" }}>
                Ejercicio Fiscal:
              </Typography>
              <Typography sx={{ fontFamily: "PoppinsLight", width: "80%" }}>
                {AI.encabezado?.ejercicioFiscal?.Label}
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
              <Typography sx={{ fontFamily: "PoppinsMedium", width: "20%" }}>
                Ente Público:
              </Typography>
              <Typography sx={{ fontFamily: "PoppinsLight", width: "80%" }}>
              {AI.encabezado?.entidad?.Label}
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
              <Typography sx={{ fontFamily: "PoppinsMedium", width: "20%" }}>
                Programa:
              </Typography>
              <Typography sx={{ fontFamily: "PoppinsLight", width: "80%" }}>
              {AI.encabezado?.programa?.Label}
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
              <Typography sx={{ fontFamily: "PoppinsMedium", width: "20%" }}>
                Unidad Responsable:
              </Typography>
              <Typography sx={{ fontFamily: "PoppinsLight", width: "80%" }}>
              {AI.encabezado?.programa?.Label}
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
              <Typography sx={{ fontFamily: "PoppinsMedium", width: "20%" }}>
                CONAC:
              </Typography>
              <Typography sx={{ fontFamily: "PoppinsLight", width: "80%" }}>
              {AI.encabezado?.conac}
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
              <Typography sx={{ fontFamily: "PoppinsMedium", width: "20%" }}>
                Clasificación Programática
              </Typography>
              <Typography sx={{ fontFamily: "PoppinsLight", width: "80%" }}>
              {AI.encabezado?.consecutivo}
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
              <Typography sx={{ fontFamily: "PoppinsMedium", width: "20%" }}>
                Sujeto a ROP o LOP
              </Typography>
              <Typography sx={{ fontFamily: "PoppinsLight", width: "80%" }}>
                
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
              <Typography sx={{ fontFamily: "PoppinsMedium", width: "20%" }}>
                Anticorrupción:
              </Typography>
              <Typography sx={{ fontFamily: "PoppinsLight", width: "80%" }}>
              {AI.encabezado?.anticorrupcion}
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
            <Typography sx={{ fontFamily: "PoppinsMedium", width: "20%" }}>
              Indicador de Género
            </Typography>
            <Typography sx={{ fontFamily: "PoppinsLight", width: "80%" }}>
              
            </Typography>
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
              <Typography sx={{ fontFamily: "PoppinsMedium", width: "20%" }}>
                Beneficiario
              </Typography>
              <Typography sx={{ fontFamily: "PoppinsLight", width: "80%" }}>
              
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
              <Typography sx={{ fontFamily: "PoppinsMedium", width: "20%" }}>
                Objetivo:
              </Typography>
              <Typography sx={{ fontFamily: "PoppinsLight", width: "80%" }}>
              {AI.encabezado?.objetivo?.Label}
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
              <Typography sx={{ fontFamily: "PoppinsMedium", width: "20%" }}>
                Objetivo Desarrollo Sostenible
              </Typography>
              <Typography sx={{ fontFamily: "PoppinsLight", width: "80%" }}>
                
              </Typography>
            </Grid>

            
          </Grid>

          
          <Typography
            sx={{ fontFamily: "PoppinsBold", borderBottom: 1, mt: "3vh" }}
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
              <Typography sx={{ fontFamily: "PoppinsMedium", width: "20%" }}>
                Descripción de la acción
              </Typography>
              <Typography sx={{ fontFamily: "PoppinsLight", width: "80%" }}>
              {AI.acciones[0]?.descripcion}
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
              <Typography sx={{ fontFamily: "PoppinsMedium", width: "20%" }}>
                Nombre del Indicador
              </Typography>
              <Typography sx={{ fontFamily: "PoppinsLight", width: "80%" }}>
              {AI.acciones[0]?.indicador}
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
              <Typography sx={{ fontFamily: "PoppinsMedium", width: "20%" }}>
                Fórmula de Cálculo
              </Typography>
              <Typography sx={{ fontFamily: "PoppinsLight", width: "80%" }}>
              {AI.acciones[0]?.formulaCalculo}
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
              <Typography sx={{ fontFamily: "PoppinsMedium", width: "20%" }}>
                MV / FI
              </Typography>
              <Typography sx={{ fontFamily: "PoppinsLight", width: "80%" }}>
              {AI.acciones[0]?.mv}
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
              <Typography sx={{ fontFamily: "PoppinsMedium", width: "20%" }}>
                Frecuencia:
              </Typography>
              <Typography sx={{ fontFamily: "PoppinsLight", width: "80%" }}>
              {AI.acciones[0]?.frecuencia}
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
              <Typography sx={{ fontFamily: "PoppinsMedium", width: "20%" }}>
                Unidad de medida
              </Typography>
              <Typography sx={{ fontFamily: "PoppinsLight", width: "80%" }}>
              {AI.acciones[0]?.unidadMedida}
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
              <Typography sx={{ fontFamily: "PoppinsMedium", width: "20%" }}>
                Sentido:
              </Typography>
              <Typography sx={{ fontFamily: "PoppinsLight", width: "80%" }}>
              {AI.acciones[0]?.sentidoDelIndicador}
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
              <Typography sx={{ fontFamily: "PoppinsMedium", width: "20%" }}>
                Descripción de indicador:
              </Typography>
              <Typography sx={{ fontFamily: "PoppinsLight", width: "80%" }}>
              {AI.acciones[0]?.descIndicador}
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
              <Typography sx={{ fontFamily: "PoppinsMedium", width: "20%" }}>
                Línea Base 2021
              </Typography>
              <Typography sx={{ fontFamily: "PoppinsLight", width: "80%" }}>
              {AI.acciones[0]?.metasPorFrecuencia[0]?.lineaBase}
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
              <Typography sx={{ fontFamily: "PoppinsMedium", width: "20%" }}>
                Dato I
              </Typography>
              <Typography sx={{ fontFamily: "PoppinsLight", width: "80%" }}>
              {AI.acciones[0]?.metasPorFrecuencia[0]?.trimestre1}
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
              <Typography sx={{ fontFamily: "PoppinsMedium", width: "20%" }}>
                Dato II
              </Typography>
              <Typography sx={{ fontFamily: "PoppinsLight", width: "80%" }}>
              {AI.acciones[0]?.metasPorFrecuencia[0]?.trimestre2}
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
              <Typography sx={{ fontFamily: "PoppinsMedium", width: "20%" }}>
                Dato III
              </Typography>
              <Typography sx={{ fontFamily: "PoppinsLight", width: "80%" }}>
              {AI.acciones[0]?.metasPorFrecuencia[0]?.trimestre3}
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
              <Typography sx={{ fontFamily: "PoppinsMedium", width: "20%" }}>
                Dato IV
              </Typography>
              <Typography sx={{ fontFamily: "PoppinsLight", width: "80%" }}>
              {AI.acciones[0]?.metasPorFrecuencia[0]?.trimestre4}
              </Typography>
            </Grid>
          </Grid><Grid sx={{ display: "flex" }}>
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
              <Typography sx={{ fontFamily: "PoppinsMedium", width: "20%" }}>
                Anual
              </Typography>
              <Typography sx={{ fontFamily: "PoppinsLight", width: "80%" }}>
              {AI.acciones[0]?.metasPorFrecuencia[0]?.anual}
              </Typography>
            </Grid>
          </Grid>

          <Typography
            sx={{ fontFamily: "PoppinsBold", borderBottom: 1, mt: "3vh" }}
          >
            Programa 1
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
              <Typography sx={{ fontFamily: "PoppinsMedium", width: "20%" }}>
                Descripción del programa
              </Typography>
              <Typography sx={{ fontFamily: "PoppinsLight", width: "80%" }}>
              {AI.acciones[0]?.programas[0]?.descripcion}
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
              <Typography sx={{ fontFamily: "PoppinsMedium", width: "20%" }}>
                Nombre del Indicador
              </Typography>
              <Typography sx={{ fontFamily: "PoppinsLight", width: "80%" }}>
              {AI.acciones[0]?.programas[0]?.indicador}
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
              <Typography sx={{ fontFamily: "PoppinsMedium", width: "20%" }}>
                Fórmula de Cálculo
              </Typography>
              <Typography sx={{ fontFamily: "PoppinsLight", width: "80%" }}>
              {AI.acciones[0]?.programas[0]?.formulaCalculo}
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
              <Typography sx={{ fontFamily: "PoppinsMedium", width: "20%" }}>
                MV / FI
              </Typography>
              <Typography sx={{ fontFamily: "PoppinsLight", width: "80%" }}>
              {AI.acciones[0]?.programas[0]?.mv}
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
              <Typography sx={{ fontFamily: "PoppinsMedium", width: "20%" }}>
                Frecuencia:
              </Typography>
              <Typography sx={{ fontFamily: "PoppinsLight", width: "80%" }}>
              {AI.acciones[0]?.programas[0]?.frecuencia}
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
              <Typography sx={{ fontFamily: "PoppinsMedium", width: "20%" }}>
                Unidad de medida
              </Typography>
              <Typography sx={{ fontFamily: "PoppinsLight", width: "80%" }}>
              {AI.acciones[0]?.programas[0]?.unidadMedida}
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
              <Typography sx={{ fontFamily: "PoppinsMedium", width: "20%" }}>
                Sentido:
              </Typography>
              <Typography sx={{ fontFamily: "PoppinsLight", width: "80%" }}>
              {AI.acciones[0]?.programas[0]?.sentidoDelIndicador}
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
              <Typography sx={{ fontFamily: "PoppinsMedium", width: "20%" }}>
                Descripción de indicador:
              </Typography>
              <Typography sx={{ fontFamily: "PoppinsLight", width: "80%" }}>
              {AI.acciones[0]?.programas[0]?.descIndicador}
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
              <Typography sx={{ fontFamily: "PoppinsMedium", width: "20%" }}>
                Línea Base 2021
              </Typography>
              <Typography sx={{ fontFamily: "PoppinsLight", width: "80%" }}>
              {AI.acciones[0]?.programas[0]?.metasPorFrecuencia[0]?.lineaBase}
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
              <Typography sx={{ fontFamily: "PoppinsMedium", width: "20%" }}>
                Dato I
              </Typography>
              <Typography sx={{ fontFamily: "PoppinsLight", width: "80%" }}>
              {AI.acciones[0]?.programas[0]?.metasPorFrecuencia[0]?.trimestre1}
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
              <Typography sx={{ fontFamily: "PoppinsMedium", width: "20%" }}>
                Dato II
              </Typography>
              <Typography sx={{ fontFamily: "PoppinsLight", width: "80%" }}>
              {AI.acciones[0]?.programas[0]?.metasPorFrecuencia[0]?.trimestre2}
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
              <Typography sx={{ fontFamily: "PoppinsMedium", width: "20%" }}>
                Dato III
              </Typography>
              <Typography sx={{ fontFamily: "PoppinsLight", width: "80%" }}>
              {AI.acciones[0]?.programas[0]?.metasPorFrecuencia[0]?.trimestre3}
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
              <Typography sx={{ fontFamily: "PoppinsMedium", width: "20%" }}>
                Dato IV
              </Typography>
              <Typography sx={{ fontFamily: "PoppinsLight", width: "80%" }}>
              {AI.acciones[0]?.programas[0]?.metasPorFrecuencia[0]?.trimestre4}
              </Typography>
            </Grid>
          </Grid><Grid sx={{ display: "flex" }}>
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
              <Typography sx={{ fontFamily: "PoppinsMedium", width: "20%" }}>
                Anual
              </Typography>
              <Typography sx={{ fontFamily: "PoppinsLight", width: "80%" }}>
              {AI.acciones[0]?.programas[0]?.metasPorFrecuencia[0]?.anual}
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
