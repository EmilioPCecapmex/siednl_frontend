import { useEffect, useState } from "react";
import { IEncabezado } from "../tabsMir/TabEncabezado";
import { IComponente } from "../tabsMir/IComponente";
import { IActividadesMir, ICValor } from "../tabsMir/ICValor";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
} from "@mui/material";
import { IFin, IProposito } from "./TabFinPropositoMA";
import { IMIR } from "../tabsMir/IMIR";

export function TabResumenMIR({
  show,
  showMirFnc,
  showSt,
  encabezado,
  fin,
  proposito,
  componentes,
  componenteValor,
  cValor,
}: {
  show: boolean;
  showMirFnc: Function;
  showSt: string;
  encabezado: Array<IEncabezado>;
  fin: Array<IFin>;
  proposito: Array<IProposito>;
  componentes: number[];
  componenteValor: Array<IComponente>;
  cValor: Array<ICValor>;
}) {
  const [MIR, setMIR] = useState<IMIR>();

  const [open, setOpen] = useState(false);

  let asignarMIR = (
    encabezadoM: Array<IEncabezado>,
    finM: Array<IFin>,
    propositoM: Array<IProposito>,
    componentesM: Array<IComponente>,
    actividadesM: Array<IActividadesMir>
  ) => {
    setMIR({
      encabezado: encabezadoM[0],
      fin: finM[0],
      proposito: propositoM[0],
      componentes: componentesM,
      actividades: actividadesM,
    });
  };

  useEffect(() => {
    let arr: any[] = [];
    cValor[0].componentes.map((a) => {
      a.actividades.map((b) => {
        Object.assign(b);
        arr.push(b);
      });
    });

    asignarMIR(encabezado, fin, proposito, componenteValor, arr);
  }, [encabezado, componenteValor, proposito, fin, cValor, show]);

  useEffect(() => {
    setOpen(show);
  }, [show]);

  return (
    <Dialog
      fullWidth
      maxWidth="xl"
      open={open}
      sx={{ height: "100%" }}
      onClose={() => showMirFnc(false)}
    >
      <DialogTitle
        sx={{
          fontFamily: "MontserratBold",
          borderBottom: 1,
          mb: 2,
        }}
      >
        Resumen MIR
      </DialogTitle>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          heigth: "100%",
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
            <Typography sx={{ fontFamily: "MontserratBold", borderBottom: 1 }}>
              Datos Generales
            </Typography>

            <Box sx={{ display: "flex" }}>
              <Box
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
                <Typography
                  sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                >
                  Ejercicio Fiscal:
                </Typography>
                <Typography
                  sx={{ fontFamily: "MontserratLight", width: "80%" }}
                >
                  {encabezado[0]?.ejercicioFiscal === "Selecciona"
                    ? ""
                    : encabezado[0]?.ejercicioFiscal}
                </Typography>
              </Box>

              <Box
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
                <Typography
                  sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                >
                  Institución:
                </Typography>
                <Typography
                  sx={{ fontFamily: "MontserratLight", width: "80%" }}
                >
                  {encabezado[0]?.institucion === "Selecciona"
                    ? ""
                    : encabezado[0]?.institucion}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Box
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
                <Typography
                  sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                >
                  Programa:
                </Typography>
                <Typography
                  sx={{ fontFamily: "MontserratLight", width: "80%" }}
                >
                  {encabezado[0]?.nombre_del_programa === "Selecciona"
                    ? ""
                    : encabezado[0]?.nombre_del_programa}
                </Typography>
              </Box>

              <Box
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
                <Typography
                  sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                >
                  Eje:
                </Typography>
                <Typography
                  sx={{ fontFamily: "MontserratLight", width: "80%" }}
                >
                  {encabezado[0]?.eje === "Selecciona"
                    ? ""
                    : encabezado[0]?.eje}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex" }}>
              <Box
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
                <Typography
                  sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                >
                  Temática:
                </Typography>
                <Typography
                  sx={{ fontFamily: "MontserratLight", width: "80%" }}
                >
                  {encabezado[0]?.tema === "Selecciona"
                    ? ""
                    : encabezado[0]?.tema}
                </Typography>
              </Box>

              <Box
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
                <Typography
                  sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                >
                  Objetivo:
                </Typography>
                <Typography
                  sx={{ fontFamily: "MontserratLight", width: "80%" }}
                >
                  {encabezado[0]?.objetivo === "Selecciona"
                    ? ""
                    : encabezado[0]?.objetivo}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex" }}>
              <Box
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
                <Typography
                  sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                >
                  Estrategia:
                </Typography>
                <Typography
                  sx={{ fontFamily: "MontserratLight", width: "80%" }}
                >
                  {encabezado[0]?.estrategia === "Selecciona"
                    ? ""
                    : encabezado[0]?.estrategia}
                </Typography>
              </Box>

              <Box
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
                <Typography
                  sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                >
                  Beneficiario:
                </Typography>
                <Typography
                  sx={{ fontFamily: "MontserratLight", width: "80%" }}
                >
                  
                  {encabezado[0]?.beneficiario === "Selecciona"
                    ? ""
                    : encabezado[0]?.beneficiario}
                </Typography>
              </Box>
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
                Lineas de Acción:
              </Typography>
              <Box>
                {encabezado[0]?.lineas_de_accion.map(
                  (value: { Id: string; LineaDeAccion: string }, x: any) => {
                    return (
                      <Typography
                        key={x}
                        sx={{
                          fontFamily: "MontserratLight",
                          width: "100%",
                          borderBottom: "1px solid lightGrey",
                          "&:last-Child": { borderBottom: 0 },
                        }}
                      >
                        {value?.LineaDeAccion === "Selecciona"
                          ? ""
                          : value?.LineaDeAccion}
                      </Typography>
                    );
                  }
                )}
              </Box>
            </Box>

            {showSt === "Fin" ? (
              <Box>
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
                  <Typography
                    sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                  >
                    Resumen Narrativo:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
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
                  <Typography
                    sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                  >
                    Indicador:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
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
                  <Typography
                    sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                  >
                    Fórmula:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
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
                  <Typography
                    sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                  >
                    Frecuencia:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
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
                  <Typography
                    sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                  >
                    Medios de Verificación:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
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
                  <Typography
                    sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                  >
                    Supuestos:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
                    {fin[0]?.supuestos}
                  </Typography>
                </Box>
              </Box>
            ) : showSt === "Proposito" ? (
              <Box>
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
                  <Typography
                    sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                  >
                    Resumen Narrativo:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
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
                  <Typography
                    sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                  >
                    Indicador:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
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
                  <Typography
                    sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                  >
                    Fórmula:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
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
                  <Typography
                    sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                  >
                    Frecuencia:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
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
                  <Typography
                    sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                  >
                    Medios de Verificación:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
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
                  <Typography
                    sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                  >
                    Supuestos:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
                    {proposito[0]?.supuestos}
                  </Typography>
                </Box>
              </Box>
            ) : showSt === "Componentes" ? (
              <Box>
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
              </Box>
            ) : showSt === "Actividades" ? (
              <Box>
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
                            sx={{
                              fontFamily: "MontserratMedium",
                              width: "20%",
                            }}
                          >
                            Resumen Narrativo:
                          </Typography>
                          <Typography
                            sx={{ fontFamily: "MontserratLight", width: "80%" }}
                          >
                            {
                              cValor[0].componentes[indexComponentes]
                                .actividades[indexActividades].resumen
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
                            sx={{
                              fontFamily: "MontserratMedium",
                              width: "20%",
                            }}
                          >
                            Indicador:
                          </Typography>
                          <Typography
                            sx={{ fontFamily: "MontserratLight", width: "80%" }}
                          >
                            {
                              cValor[0].componentes[indexComponentes]
                                .actividades[indexActividades].indicador
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
                            sx={{
                              fontFamily: "MontserratMedium",
                              width: "20%",
                            }}
                          >
                            Fórmula:
                          </Typography>
                          <Typography
                            sx={{ fontFamily: "MontserratLight", width: "80%" }}
                          >
                            {
                              cValor[0].componentes[indexComponentes]
                                .actividades[indexActividades].formula
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
                            sx={{
                              fontFamily: "MontserratMedium",
                              width: "20%",
                            }}
                          >
                            Frecuencia:
                          </Typography>
                          <Typography
                            sx={{ fontFamily: "MontserratLight", width: "80%" }}
                          >
                            {
                              cValor[0].componentes[indexComponentes]
                                .actividades[indexActividades].frecuencia
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
                            sx={{
                              fontFamily: "MontserratMedium",
                              width: "20%",
                            }}
                          >
                            Medios de Verificación:
                          </Typography>
                          <Typography
                            sx={{ fontFamily: "MontserratLight", width: "80%" }}
                          >
                            {
                              cValor[0].componentes[indexComponentes]
                                .actividades[indexActividades].medios
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
                            sx={{
                              fontFamily: "MontserratMedium",
                              width: "20%",
                            }}
                          >
                            Supuestos:
                          </Typography>
                          <Typography
                            sx={{ fontFamily: "MontserratLight", width: "80%" }}
                          >
                            {
                              cValor[0].componentes[indexComponentes]
                                .actividades[indexActividades].supuestos
                            }
                          </Typography>
                        </Box>
                      </Box>
                    );
                  });
                })}
              </Box>
            ) : null}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default TabResumenMIR;
