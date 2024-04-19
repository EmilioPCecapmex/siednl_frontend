/* eslint-disable array-callback-return */
import { useEffect, useState } from "react";
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
} from "@mui/material";
import { IComponenteActividad } from "../tabsMir/interfaces mir/IMIR";


export function TabResumenMIR({
  show,
  showMirFnc,
  showSt,
  MIR,
  noComponentes,
}: {
  show: boolean;
  showMirFnc: Function;
  showSt: string;
  MIR: string;
  noComponentes: number[];
}) {
  const [open, setOpen] = useState(false);

  let encabezado = JSON.parse(MIR).encabezado;
  let fin = JSON.parse(MIR).fin;
  let proposito = JSON.parse(MIR).proposito;
  let Componentes = JSON.parse(MIR).componentes;
  let actividades = JSON.parse(MIR).actividades;

  const [compAct, setCompAct] = useState<Array<IComponenteActividad>>([]);

  const [componenteActividad] = useState([ //, setComponenteActividad
    {
      componentes: noComponentes.map((x) => [1, 2]),
    },
  ]);

  const [cValor, setCValor] = useState(
    componenteActividad.map((item) => {
      return {
        componentes: item.componentes.map((x, index) => {
          return {
            actividades: x.map((c, index2) => {
              return {
                actividad: "A" + (index2 + 1) + "C" + (index + 1),
                resumen: "",
                indicador: "",
                formula: "",
                frecuencia: "",
                medios: "",
                supuestos: "",
              };
            }),
          };
        }),
      };
    })
  );

  

  useEffect(() => {
    if (compAct.length > 0) {
      let y = componenteActividad.map((item) => {
        return {
          componentes: compAct.map((x, index) => {
            return {
              actividades: x.actividades.map((c, index2) => {
                return {
                  actividad: "A" + (index2 + 1) + "C" + (index + 1),
                  resumen: "",
                  indicador: "",
                  formula: "",
                  frecuencia: "",
                  medios: "",
                  supuestos: "",
                };
              }),
            };
          }),
        };
      });
  
      actividades.map((x: any) => {
        let act = x.actividad?.split("A")[1]?.split("C")[0];
        let comp = x.actividad?.split("C")[1].substring(0, 1);
  
        y[0].componentes[parseInt(comp) - 1].actividades[
          parseInt(act) - 1
        ].actividad = x.actividad;
        y[0].componentes[parseInt(comp) - 1].actividades[
          parseInt(act) - 1
        ].resumen = x?.resumen;
        y[0].componentes[parseInt(comp) - 1].actividades[
          parseInt(act) - 1
        ].indicador = x?.indicador;
        y[0].componentes[parseInt(comp) - 1].actividades[
          parseInt(act) - 1
        ].formula = x?.formula;
        y[0].componentes[parseInt(comp) - 1].actividades[
          parseInt(act) - 1
        ].frecuencia = x?.frecuencia;
        y[0].componentes[parseInt(comp) - 1].actividades[
          parseInt(act) - 1
        ].medios = x?.medios;
        y[0].componentes[parseInt(comp) - 1].actividades[
          parseInt(act) - 1
        ].supuestos = x?.supuestos;
      });
  
      setCValor(y);
    }
  }, []);


  useEffect(() => {
    setOpen(show);
  }, [show]);

  return (
    <Dialog
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
        RESUMEN MA
      </DialogTitle>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          heigth: "100%",
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
              DATOS GENERALES
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
                <Typography
                  sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                >
                  EJERCICIO FISCAL:
                </Typography>
                <Typography
                  sx={{ fontFamily: "MontserratLight", width: "80%" }}
                >
                  {encabezado?.ejercicioFiscal.Label === "Selecciona"
                    ? ""
                    : encabezado?.ejercicioFiscal.Labl}
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
                <Typography
                  sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                >
                  INSTITUCIÓN:
                </Typography>
                <Typography
                  sx={{ fontFamily: "MontserratLight", width: "80%" }}
                >
                  {encabezado?.entidad.Label === "Selecciona"
                    ? ""
                    : encabezado?.entidad.Label}
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
                <Typography
                  sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                >
                  PROGRAMA:
                </Typography>
                <Typography
                  sx={{ fontFamily: "MontserratLight", width: "80%" }}
                >
                  {encabezado?.programa.Label === "Selecciona"
                    ? ""
                    : encabezado?.programa.Label}
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
                <Typography
                  sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                >
                  EJE:
                </Typography>
                <Typography
                  sx={{ fontFamily: "MontserratLight", width: "80%" }}
                >
                  {encabezado?.eje.Label === "Selecciona" ? "" : encabezado?.eje.Label}
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
                <Typography
                  sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                >
                  TEMÁTICA:
                </Typography>
                <Typography
                  sx={{ fontFamily: "MontserratLight", width: "80%" }}
                >
                  {encabezado?.tema.Label === "Selecciona" ? "" : encabezado?.tema.Label}
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
                <Typography
                  sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                >
                  OBJETIVO:
                </Typography>
                <Typography
                  sx={{ fontFamily: "MontserratLight", width: "80%" }}
                >
                  {encabezado?.objetivo.Label === "Selecciona"
                    ? ""
                    : encabezado?.objetivo.Label}
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
                <Typography
                  sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                >
                  ESTRATEGIA:
                </Typography>
                <Typography
                  sx={{ fontFamily: "MontserratLight", width: "80%" }}
                >
                  {encabezado?.estrategia.Label === "Selecciona"
                    ? ""
                    : encabezado?.estrategia.Label}
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
                <Typography
                  sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                >
                  BENEFICIARIO:
                </Typography>
                <Typography
                  sx={{ fontFamily: "MontserratLight", width: "80%" }}
                >
                  {encabezado?.beneficiario.Label === "Selecciona"
                    ? ""
                    : encabezado?.beneficiario.Label}
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
                LINEAS DE ACCIÓN:
              </Typography>
              <Grid>
                {encabezado?.lineas_de_accion.map(
                  (value: { Id: string; Label: string }, x: any) => {
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
                        {value?.Label === "Selecciona"
                          ? ""
                          : value?.Label}
                      </Typography>
                    );
                  }
                )}
              </Grid>
            </Grid>

            {showSt === "Fin" ? (
              <Grid>
                <Typography
                  sx={{ fontFamily: "MontserratBold", borderBottom: 1, mt: 5 }}
                >
                  FIN
                </Typography>
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
                  <Typography
                    sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                  >
                    RESUMEN NARRATIVO:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
                    {fin?.resumen}
                  </Typography>
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
                  <Typography
                    sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                  >
                    INDICADOR:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
                    {fin?.indicador}
                  </Typography>
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
                  <Typography
                    sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                  >
                    FÓRMULA:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
                    {fin?.formula}
                  </Typography>
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
                  <Typography
                    sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                  >
                    FRECUENCIA:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
                    {fin?.frecuencia}
                  </Typography>
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
                  <Typography
                    sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                  >
                    MEDIOS DE VERIFICACIÓN Y FUENTE INFORMACION:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
                    {fin?.medios}
                  </Typography>
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
                  <Typography
                    sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                  >
                    SUPUESTOS:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
                    {fin?.supuestos}
                  </Typography>
                </Grid>
              </Grid>
            ) : showSt === "Proposito" ? (
              <Grid>
                <Typography
                  sx={{ fontFamily: "MontserratBold", borderBottom: 1, mt: 5 }}
                >
                  PROPÓSITO:
                </Typography>
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
                  <Typography
                    sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                  >
                    RESUMEN NARRATIVO:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
                    {proposito?.resumen}
                  </Typography>
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
                  <Typography
                    sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                  >
                    INDICADOR:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
                    {proposito?.indicador}
                  </Typography>
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
                  <Typography
                    sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                  >
                    FÓRMULA:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
                    {proposito?.formula}
                  </Typography>
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
                  <Typography
                    sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                  >
                    FRECUENCIA:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
                    {proposito?.frecuencia}
                  </Typography>
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
                  <Typography
                    sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                  >
                    MEDIOS DE VERIFICACIÓN Y FUENTE INFORMACION:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
                    {proposito?.medios_verificacion}
                  </Typography>
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
                  <Typography
                    sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                  >
                    SUPUESTOS:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
                    {proposito?.supuestos}
                  </Typography>
                </Grid>
              </Grid>
            ) : showSt === "Componentes" ? (
              <Grid>
                <Typography
                  sx={{ fontFamily: "MontserratBold", borderBottom: 1, mt: 5 }}
                >
                  COMPONENTES
                </Typography>

                {noComponentes.map((index) => {
                  return (
                    <Grid key={index}>
                      <Typography
                        sx={{
                          fontFamily: "MontserratMedium",
                          borderBottom: 1,
                          mt: 5,
                          textAlign: "center",
                        }}
                      >
                        COMPONENTE {index}
                      </Typography>
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
                        <Typography
                          sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                        >
                          RESUMEN NARRATIVO:
                        </Typography>
                        <Typography
                          sx={{ fontFamily: "MontserratLight", width: "80%" }}
                        >
                          {Componentes[index - 1]?.resumen}
                        </Typography>
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
                        <Typography
                          sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                        >
                          INDICADOR:
                        </Typography>
                        <Typography
                          sx={{ fontFamily: "MontserratLight", width: "80%" }}
                        >
                          {Componentes[index - 1]?.indicador}
                        </Typography>
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
                        <Typography
                          sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                        >
                          FÓRMULA:
                        </Typography>
                        <Typography
                          sx={{ fontFamily: "MontserratLight", width: "80%" }}
                        >
                          {Componentes[index - 1]?.formula}
                        </Typography>
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
                        <Typography
                          sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                        >
                          FRECUENCIA:
                        </Typography>
                        <Typography
                          sx={{ fontFamily: "MontserratLight", width: "80%" }}
                        >
                          {Componentes[index - 1]?.frecuencia}
                        </Typography>
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
                        <Typography
                          sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                        >
                          MEDIOS DE VERIFICACIÓN Y FUENTE INFORMACION:
                        </Typography>
                        <Typography
                          sx={{ fontFamily: "MontserratLight", width: "80%" }}
                        >
                          {Componentes[index - 1]?.medios}
                        </Typography>
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
                        <Typography
                          sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                        >
                          SUPUESTOS:
                        </Typography>
                        <Typography
                          sx={{ fontFamily: "MontserratLight", width: "80%" }}
                        >
                          {Componentes[index - 1]?.supuestos}
                        </Typography>
                      </Grid>
                    </Grid>
                  );
                })}
              </Grid>
            ) : showSt === "Actividades" ? (
              <Grid>
                <Typography
                  sx={{ fontFamily: "MontserratBold", borderBottom: 1, mt: 5 }}
                >
                  ACTIVIDADES
                </Typography>

                {cValor[0]?.componentes.map((item, indexComponentes) => {
                  return item.actividades.map((value, indexActividades) => {
                    return (
                      <Grid key={indexActividades}>
                        <Typography
                          sx={{
                            fontFamily: "MontserratMedium",
                            borderBottom: 1,
                            mt: 5,
                            textAlign: "center",
                          }}
                        >
                          COMPONENTE {indexComponentes + 1} - Actividad{" "}
                          {indexActividades + 1}
                        </Typography>
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
                          <Typography
                            sx={{
                              fontFamily: "MontserratMedium",
                              width: "20%",
                            }}
                          >
                            RESUMEN NARRATIVO:
                          </Typography>
                          <Typography
                            sx={{ fontFamily: "MontserratLight", width: "80%" }}
                          >
                            {cValor[0].componentes[
                              indexComponentes
                            ].actividades[
                              indexActividades
                            ].resumen?.toUpperCase()}
                          </Typography>
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
                          <Typography
                            sx={{
                              fontFamily: "MontserratMedium",
                              width: "20%",
                            }}
                          >
                            INDICADOR:
                          </Typography>
                          <Typography
                            sx={{ fontFamily: "MontserratLight", width: "80%" }}
                          >
                            {actividades[indexActividades].indicador}
                          </Typography>
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
                          <Typography
                            sx={{
                              fontFamily: "MontserratMedium",
                              width: "20%",
                            }}
                          >
                            FÓRMULA:
                          </Typography>
                          <Typography
                            sx={{ fontFamily: "MontserratLight", width: "80%" }}
                          >
                            {actividades[indexActividades].formula}
                          </Typography>
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
                          <Typography
                            sx={{
                              fontFamily: "MontserratMedium",
                              width: "20%",
                            }}
                          >
                            FRECUENCIA:
                          </Typography>
                          <Typography
                            sx={{ fontFamily: "MontserratLight", width: "80%" }}
                          >
                            {actividades[indexActividades]?.frecuencia}
                          </Typography>
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
                          <Typography
                            sx={{
                              fontFamily: "MontserratMedium",
                              width: "20%",
                            }}
                          >
                            MEDIOS DE VERIFICACIÓN Y FUENTE INFORMACION:
                          </Typography>
                          <Typography
                            sx={{ fontFamily: "MontserratLight", width: "80%" }}
                          >
                            {actividades[indexActividades].medios}
                          </Typography>
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
                          <Typography
                            sx={{
                              fontFamily: "MontserratMedium",
                              width: "20%",
                            }}
                          >
                            SUPUESTOS:
                          </Typography>
                          <Typography
                            sx={{ fontFamily: "MontserratLight", width: "80%" }}
                          >
                            {actividades[indexActividades].supuestos}
                          </Typography>
                        </Grid>
                      </Grid>
                    );
                  });
                })}
              </Grid>
            ) : null}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default TabResumenMIR;
