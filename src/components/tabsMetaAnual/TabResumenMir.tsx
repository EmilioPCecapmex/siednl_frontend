
import { Box, Typography, Button, Checkbox } from "@mui/material";
import { IEncabezado } from "../tabsMir/TabEncabezado";
import { IFin, IProposito } from "./TabFinProposito";
import { IComponente } from "../tabsMir/IComponente";
import { ICValor } from "../tabsMir/ICValor";

export function TabResumenMir({
  show,
  encabezado,
  fin,
  proposito,
  componentes,
  componenteValor,
  cValor,
  showResume
}: {
  show: boolean;
  encabezado: Array<IEncabezado>;
  fin: Array<IFin>;
  proposito: Array<IProposito>;
  componentes: number[];
  componenteValor: Array<IComponente>;
  cValor: Array<ICValor>;
  showResume: string;
}) {

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
            backgroundColor: "rgba(0,0,0,.5)",
            outline: "1px solid slategrey",
            borderRadius: 1,
          },
        }}
      >
        <Box sx={{ p: 5, display: "flex", flexDirection: "column" }}>
          

          <Typography
            sx={{ fontFamily: "MontserratBold", borderBottom: 1, mt: 5 }}
          >
            Fin
          </Typography>
          <Box
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
              Resumen Narrativo:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {fin[0]?.resumen}
            </Typography>
          </Box>
          <Box
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
              Indicador:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {fin[0]?.indicador}
            </Typography>
          </Box>
          <Box
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
              Fórmula:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {fin[0]?.formula}
            </Typography>
          </Box>
          <Box
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
              Frecuencia:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {fin[0]?.frecuencia}
            </Typography>
          </Box>
          <Box
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
              Medios de Verificación:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {fin[0]?.medios}
            </Typography>
          </Box>
          <Box
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
              Supuestos:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {fin[0]?.supuestos}
            </Typography>
          </Box>
          <Typography
            sx={{ fontFamily: "MontserratBold", borderBottom: 1, mt: 5 }}
          >
            Propósito
          </Typography>
          <Box
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
              Resumen Narrativo:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {proposito[0]?.resumen}
            </Typography>
          </Box>
          <Box
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
              Indicador:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {proposito[0]?.indicador}
            </Typography>
          </Box>
          <Box
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
              Fórmula:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {proposito[0]?.formula}
            </Typography>
          </Box>
          <Box
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
              Frecuencia:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {proposito[0]?.frecuencia}
            </Typography>
          </Box>
          <Box
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
              Medios de Verificación:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {proposito[0]?.medios_verificacion}
            </Typography>
          </Box>
          <Box
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
              Supuestos:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {proposito[0]?.supuestos}
            </Typography>

            
          </Box>
          <Typography
            sx={{ fontFamily: "MontserratBold", borderBottom: 1, mt: 5 }}
          >
            Componentes
          </Typography>

          {componentes.map((index) => {
            return (
              <Box key={index}>
                <Typography
                  sx={{
                    fontFamily: "MontserratMedium",
                    borderBottom: 1,
                    mt: 5,
                    textAlign: "center",
                  }}
                >
                  Componente {index}
                </Typography>
                <Box
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
                  <Typography
                    sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                  >
                    Resumen Narrativo:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
                    {componenteValor[index - 1]?.resumen}
                  </Typography>
                </Box>
                <Box
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
                  <Typography
                    sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                  >
                    Indicador:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
                    {componenteValor[index - 1]?.indicador}
                  </Typography>
                </Box>
                <Box
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
                  <Typography
                    sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                  >
                    Fórmula:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
                    {componenteValor[index - 1]?.formula}
                  </Typography>
                </Box>
                <Box
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
                  <Typography
                    sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                  >
                    Frecuencia:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
                    {componenteValor[index - 1]?.frecuencia}
                  </Typography>
                </Box>
                <Box
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
                  <Typography
                    sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                  >
                    Medios de Verificación:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
                    {componenteValor[index - 1]?.medios}
                  </Typography>
                </Box>
                <Box
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
                  <Typography
                    sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                  >
                    Supuestos:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
                    {componenteValor[index - 1]?.supuestos}
                  </Typography>
                </Box>
              </Box>
            );
          })}

          <Typography
            sx={{ fontFamily: "MontserratBold", borderBottom: 1, mt: 5 }}
          >
            Actividades
          </Typography>

          {cValor[0]?.componentes.map((item, indexComponentes) => {
            let i = 0;
            return item.actividades.map((value, indexActividades) => {
              i++;
              return (
                <Box key={indexActividades}>
                  <Typography
                    sx={{
                      fontFamily: "MontserratMedium",
                      borderBottom: 1,
                      mt: 5,
                      textAlign: "center",
                    }}
                  >
                    Componente {indexComponentes + 1} - Actividad{" "}
                    {indexActividades + 1}
                  </Typography>
                  <Box
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
                    <Typography
                      sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                    >
                      Resumen Narrativo:
                    </Typography>
                    <Typography
                      sx={{ fontFamily: "MontserratLight", width: "80%" }}
                    >
                      {
                        cValor[0].componentes[indexComponentes].actividades[
                          indexActividades
                        ].resumen
                      }
                    </Typography>
                  </Box>
                  <Box
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
                    <Typography
                      sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                    >
                      Indicador:
                    </Typography>
                    <Typography
                      sx={{ fontFamily: "MontserratLight", width: "80%" }}
                    >
                      {
                        cValor[0].componentes[indexComponentes].actividades[
                          indexActividades
                        ].indicador
                      }
                    </Typography>
                  </Box>
                  <Box
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
                    <Typography
                      sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                    >
                      Fórmula:
                    </Typography>
                    <Typography
                      sx={{ fontFamily: "MontserratLight", width: "80%" }}
                    >
                      {
                        cValor[0].componentes[indexComponentes].actividades[
                          indexActividades
                        ].formula
                      }
                    </Typography>
                  </Box>
                  <Box
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
                    <Typography
                      sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                    >
                      Frecuencia:
                    </Typography>
                    <Typography
                      sx={{ fontFamily: "MontserratLight", width: "80%" }}
                    >
                      {
                        cValor[0].componentes[indexComponentes].actividades[
                          indexActividades
                        ].frecuencia
                      }
                    </Typography>
                  </Box>
                  <Box
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
                    <Typography
                      sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                    >
                      Medios de Verificación:
                    </Typography>
                    <Typography
                      sx={{ fontFamily: "MontserratLight", width: "80%" }}
                    >
                      {
                        cValor[0].componentes[indexComponentes].actividades[
                          indexActividades
                        ].medios
                      }
                    </Typography>
                  </Box>
                  <Box
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
                    <Typography
                      sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                    >
                      Supuestos:
                    </Typography>
                    <Typography
                      sx={{ fontFamily: "MontserratLight", width: "80%" }}
                    >
                      {
                        cValor[0].componentes[indexComponentes].actividades[
                          indexActividades
                        ].supuestos
                      }
                    </Typography>
                  </Box>
                </Box>
              );
            });
          })}
        </Box>
      </Box>
    </Box>
  );
}

export default TabResumenMir;

export interface IEncabezadoEdit {
  ejercicioFiscal: boolean;
  institucion: boolean;
  nombre_del_programa: boolean;
  eje: boolean;
  tema: boolean;
  objetivo: boolean;
  estrategia: boolean;
  lineas_de_accion: boolean;
  beneficiario: boolean;
}

export interface IFinEdit {
  resumen: boolean;
  indicador: boolean;
  formula: boolean;
  frecuencia: boolean;
  medios: boolean;
  supuestos: boolean;
}
export interface IPropositoEdit {
  resumen: boolean;
  indicador: boolean;
  formula: boolean;
  frecuencia: boolean;
  medios_verificacion: boolean;
  supuestos: boolean;
}

export interface IComponenteMirEdit {
  componentes: string;
  resumen: boolean;
  indicador: boolean;
  formula: boolean;
  frecuencia: boolean;
  medios: boolean;
  supuestos: boolean;
}

export interface IActividadesMirEdit {
  actividad: string;
  formula: boolean;
  frecuencia: boolean;
  indicador: boolean;
  medios: boolean;
  resumen: boolean;
  supuestos: boolean;
}
