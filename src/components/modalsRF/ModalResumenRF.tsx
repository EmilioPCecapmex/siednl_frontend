/* eslint-disable array-callback-return */
import { useEffect, useState } from "react";
import {
  Box,
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
        Resumen RF
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
                  {encabezado?.ejercicioFiscal.Label === "Selecciona"
                    ? ""
                    : encabezado?.ejercicioFiscal.Label}
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
                  {encabezado?.entidad.Label === "Selecciona"
                    ? ""
                    : encabezado?.entidad.Label}
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
                  {encabezado?.programa.Label === "Selecciona"
                    ? ""
                    : encabezado?.programa.Label}
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
                  {encabezado?.eje.Label === "Selecciona" ? "" : encabezado?.eje.Label}
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
                  {encabezado?.tema.Label === "Selecciona" ? "" : encabezado?.tema.Label}
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
                  {encabezado?.objetivo.Label === "Selecciona"
                    ? ""
                    : encabezado?.objetivo.Label}
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
                  {encabezado?.estrategia.Label === "Selecciona"
                    ? ""
                    : encabezado?.estrategia.Label}
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
                  {encabezado?.beneficiario.Label === "Selecciona"
                    ? ""
                    : encabezado?.beneficiario.Label}
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
                    {fin?.resumen}
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
                    {fin?.indicador}
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
                    {fin?.formula}
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
                    {fin?.frecuencia}
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
                    {fin?.medios}
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
                    {fin?.supuestos}
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
                    {proposito?.resumen}
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
                    {proposito?.indicador}
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
                    {proposito?.formula}
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
                    {proposito?.frecuencia}
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
                    {proposito?.medios_verificacion}
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
                    {proposito?.supuestos}
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

                {noComponentes.map((index) => {
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
                          {Componentes[index - 1]?.resumen}
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
                          {Componentes[index - 1]?.indicador}
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
                          {Componentes[index - 1]?.formula}
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
                          {Componentes[index - 1]?.frecuencia}
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
                          {Componentes[index - 1]?.medios}
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
                          {Componentes[index - 1]?.supuestos}
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

                {/* {cValor[0]?.componentes.map((item, indexComponentes) => {
                  return item.actividades.map((value, indexActividades) => {
                    // return (
                    //   <Box key={indexActividades}>
                    //     <Typography
                    //       sx={{
                    //         fontFamily: "MontserratMedium",
                    //         borderBottom: 1,
                    //         mt: 5,
                    //         textAlign: "center",
                    //       }}
                    //     >
                    //       Componente {indexComponentes + 1} - Actividad{" "}
                    //       {indexActividades + 1}
                    //     </Typography>
                    //     <Box
                    //       sx={{
                    //         display: "flex",
                    //         flexDirection: "row",
                    //         width: "100%",
                    //         mt: 1,
                    //         alignItems: "center",
                    //         borderBottom: 1,
                    //         borderColor: "#cfcfcf",
                    //       }}
                    //     >
                    //       <Typography
                    //         sx={{
                    //           fontFamily: "MontserratMedium",
                    //           width: "20%",
                    //         }}
                    //       >
                    //         Resumen Narrativo:
                    //       </Typography>
                    //       <Typography
                    //         sx={{ fontFamily: "MontserratLight", width: "80%" }}
                    //       >
                    //         {cValor[0].componentes[
                    //           indexComponentes
                    //         ].actividades[
                    //           indexActividades
                    //         ].resumen?.toUpperCase()}
                    //       </Typography>
                    //     </Box>
                    //     <Box
                    //       sx={{
                    //         display: "flex",
                    //         flexDirection: "row",
                    //         width: "100%",
                    //         mt: 1,
                    //         alignItems: "center",
                    //         borderBottom: 1,
                    //         borderColor: "#cfcfcf",
                    //       }}
                    //     >
                    //       <Typography
                    //         sx={{
                    //           fontFamily: "MontserratMedium",
                    //           width: "20%",
                    //         }}
                    //       >
                    //         Indicador:
                    //       </Typography>
                    //       <Typography
                    //         sx={{ fontFamily: "MontserratLight", width: "80%" }}
                    //       >
                    //         {actividades[indexActividades].indicador}
                    //       </Typography>
                    //     </Box>
                    //     <Box
                    //       sx={{
                    //         display: "flex",
                    //         flexDirection: "row",
                    //         width: "100%",
                    //         mt: 1,
                    //         alignItems: "center",
                    //         borderBottom: 1,
                    //         borderColor: "#cfcfcf",
                    //       }}
                    //     >
                    //       <Typography
                    //         sx={{
                    //           fontFamily: "MontserratMedium",
                    //           width: "20%",
                    //         }}
                    //       >
                    //         Fórmula:
                    //       </Typography>
                    //       <Typography
                    //         sx={{ fontFamily: "MontserratLight", width: "80%" }}
                    //       >
                    //         {actividades[indexActividades].formula}
                    //       </Typography>
                    //     </Box>
                    //     <Box
                    //       sx={{
                    //         display: "flex",
                    //         flexDirection: "row",
                    //         width: "100%",
                    //         mt: 1,
                    //         alignItems: "center",
                    //         borderBottom: 1,
                    //         borderColor: "#cfcfcf",
                    //       }}
                    //     >
                    //       <Typography
                    //         sx={{
                    //           fontFamily: "MontserratMedium",
                    //           width: "20%",
                    //         }}
                    //       >
                    //         Frecuencia:
                    //       </Typography>
                    //       <Typography
                    //         sx={{ fontFamily: "MontserratLight", width: "80%" }}
                    //       >
                    //         {actividades[indexActividades]?.frecuencia}
                    //       </Typography>
                    //     </Box>
                    //     <Box
                    //       sx={{
                    //         display: "flex",
                    //         flexDirection: "row",
                    //         width: "100%",
                    //         mt: 1,
                    //         alignItems: "center",
                    //         borderBottom: 1,
                    //         borderColor: "#cfcfcf",
                    //       }}
                    //     >
                    //       <Typography
                    //         sx={{
                    //           fontFamily: "MontserratMedium",
                    //           width: "20%",
                    //         }}
                    //       >
                    //         Medios de Verificación:
                    //       </Typography>
                    //       <Typography
                    //         sx={{ fontFamily: "MontserratLight", width: "80%" }}
                    //       >
                    //         {actividades[indexActividades].medios}
                    //       </Typography>
                    //     </Box>
                    //     <Box
                    //       sx={{
                    //         display: "flex",
                    //         flexDirection: "row",
                    //         width: "100%",
                    //         mt: 1,
                    //         alignItems: "center",
                    //         borderBottom: 1,
                    //         borderColor: "#cfcfcf",
                    //       }}
                    //     >
                    //       <Typography
                    //         sx={{
                    //           fontFamily: "MontserratMedium",
                    //           width: "20%",
                    //         }}
                    //       >
                    //         Supuestos:
                    //       </Typography>
                    //       <Typography
                    //         sx={{ fontFamily: "MontserratLight", width: "80%" }}
                    //       >
                    //         {actividades[indexActividades].supuestos}
                    //       </Typography>
                    //     </Box>
                    //   </Box>
                    // );
                  });
                })} */}
              </Box>
            ) : null}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default TabResumenMIR;
