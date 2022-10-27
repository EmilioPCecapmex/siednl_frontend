import { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import axios from "axios";
import { IEncabezado, ILineasDeAccion } from "./TabEncabezado";
import { IFin, IProposito } from "./TabFinProposito";
import Swal from "sweetalert2";
import ModalEnviarMIR from "../modalEnviarMIR/ModalEnviarMIR";
import ModalSolicitaModif from "../modalEnviarMIR/ModalSolicitaModif";
import { IComponente } from "../tabsMir/IComponente";
import { ICValor } from "../tabsMir/ICValor";
import { IMIR } from "../tabsMir/IMIR";
import { IActividadesMir } from "./FullModalMetaAnual";

export function TabResumen({
  show,
  encabezado,
  fin,
  proposito,
  componentes,
  componenteValor,
  cValor,
  showResume,
  IdMir,
}: {
  show: boolean;
  encabezado: Array<IEncabezado>;
  fin: Array<IFin>;
  proposito: Array<IProposito>;
  componentes: number[];
  componenteValor: Array<IComponente>;
  cValor: Array<ICValor>;
  showResume: Function;
  IdMir: string;
}) {
  const [MIR, setMIR] = useState<IMIR>();

  const [openModalEnviar, setOpenModalEnviar] = useState(false);
  const handleCloseEnviar = () => {
    setOpenModalEnviar(false);
  };

  const [openModalSolicitarModif, setOpenModalSolicitarModif] = useState(false);

  const handleCloseModif = () => {
    setOpenModalSolicitarModif(false);
  };

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

  const checkMir = (v: string) => {
    if (MIR?.encabezado.ejercicioFiscal === "") {
      return Toast.fire({
        icon: "error",
        title: "Selecciona año fiscal.",
      });
    } else if (MIR?.encabezado.institucion === "") {
      return Toast.fire({
        icon: "error",
        title: "Selecciona institución.",
      });
    } else if (MIR?.encabezado.nombre_del_programa === "") {
      return Toast.fire({
        icon: "error",
        title: "Selecciona programa.",
      });
    } else {
      createMIR(v);
    }
  };

  const createMIR = (estado: string) => {
    axios
      .post(
        "http://10.200.4.105:8000/api/create-mir",
        {
          MIR: JSON.stringify(MIR),
          Estado: estado,
          CreadoPor: localStorage.getItem("IdUsuario"),
          AnioFiscal: MIR?.encabezado.ejercicioFiscal,
          Institucion: MIR?.encabezado.institucion,
          Programa: MIR?.encabezado.nombre_del_programa,
          Eje: MIR?.encabezado.eje,
          Tematica: MIR?.encabezado.tema,
          IdMir: IdMir,
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        Toast.fire({
          icon: "success",
          title: r.data.data.message,
        });
        showResume();
      })
      .catch((err) => {
        if (err.response.status === 409) {
          Toast.fire({
            icon: "error",
            title: err.response.data.result.error,
          });
        }
      });
  };

  useEffect(() => {
    // console.log(encabezado[0]?.lineas_de_accion);
    
    let arr: any[] = [];
    cValor[0].componentes.map((a) => {
      a.actividades.map((b) => {
        Object.assign(b);
        arr.push(b);
      });
    });

    asignarMIR(encabezado, fin, proposito, componenteValor, arr);
  }, [encabezado, componenteValor, proposito, fin, cValor, show]);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

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
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Ejercicio Fiscal:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
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
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Institución:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
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
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Programa:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
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
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Eje:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                {encabezado[0]?.eje === "Selecciona" ? "" : encabezado[0]?.eje}
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
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Temática:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
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
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Objetivo:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
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
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Estrategia:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
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
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Beneficiario:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
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
                (value: {Id: string, LineaDeAccion: string}, x: any) => {
                  return (
                    <Typography
                      key={x}
                      sx={{
                        fontFamily: "MontserratLight",
                        width: "100%",
                        borderBottom: "1px solid lightGrey",
                        "&:last-Child": { borderBottom: 0},
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
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
          mt: 2,
        }}
      >
        <Button color="error" variant="outlined" onClick={() => showResume()}>
          <Typography sx={{ fontFamily: "MontserratMedium" }}>
            Cancelar
          </Typography>
        </Button>
        <Button
          disabled={localStorage.getItem("Rol") === "Capturador" ? true : false}
          color="warning"
          variant="outlined"
          onClick={() => setOpenModalSolicitarModif(true)}
        >
          <Typography sx={{ fontFamily: "MontserratMedium" }}>
            Solicitar Modificación
          </Typography>
        </Button>

        <Button
          color="success"
          variant="outlined"
          onClick={() =>
            checkMir(
              localStorage.getItem("Rol") === "Capturador"
                ? "En Captura"
                : localStorage.getItem("Rol") === "Verificador"
                ? "En Revisión"
                : "En Autorización"
            )
          }
        >
          <Typography sx={{ fontFamily: "MontserratMedium" }}>
            Borrador
          </Typography>
        </Button>
        <Button
          color="primary"
          variant="outlined"
          onClick={() => setOpenModalEnviar(true)}
        >
          <Typography sx={{ fontFamily: "MontserratMedium" }}>
            Enviar
          </Typography>
        </Button>

        <ModalSolicitaModif
          open={openModalSolicitarModif}
          showResume={showResume}
          handleClose={handleCloseModif}
          MIR={JSON.stringify(MIR)}
          IdMir={IdMir}
        ></ModalSolicitaModif>

        <ModalEnviarMIR
          showResume={showResume}
          open={openModalEnviar}
          handleClose={handleCloseEnviar}
          MIR={JSON.stringify(MIR)}
          IdMir={IdMir}
        ></ModalEnviarMIR>
      </Box>
    </Box>
  );
}

export default TabResumen;
