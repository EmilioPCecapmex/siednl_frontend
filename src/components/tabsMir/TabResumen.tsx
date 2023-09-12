/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import { Box, Button, Checkbox, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ModalEnviarMIR from "../modalsMIR/ModalEnviarMIR";
import ModalSolicitaModif from "../modalsMIR/ModalSolicitaModif";
import { IActividadesMir } from "./ICValor";
import { IMIR } from "./IMIR";

import { queries } from "../../queries";
export function TabResumen({
  MIRPADRE,
  showResume,
  idMir,
}: {
  MIRPADRE: IMIR;
  showResume: Function;
  idMir: string;
}) {
  const [MIR, setMIR] = useState<IMIR>(MIRPADRE);

  const [valoresComponenteActividad, setValoresComponenteActividad] = useState<
    Array<Array<IActividadesMir>>
  >([
    [
      {
        actividad: "A1C1",
        resumen: "",
        indicador: "",
        frecuencia: "TRIMESTRAL",
        formula: "",
        medios: "",
        supuestos: "",
      },
      {
        actividad: "A2C1",
        resumen: "",
        indicador: "",
        frecuencia: "TRIMESTRAL",
        formula: "",
        medios: "",
        supuestos: "",
      },
    ],
    [
      {
        actividad: "A1C2",
        resumen: "",
        indicador: "",
        frecuencia: "TRIMESTRAL",
        formula: "",
        medios: "",
        supuestos: "",
      },
      {
        actividad: "A2C2",
        resumen: "",
        indicador: "",
        frecuencia: "TRIMESTRAL",
        formula: "",
        medios: "",
        supuestos: "",
      },
    ],
  ]);

  useEffect(() => {
    let n: Array<Array<IActividadesMir>> = [];
    let indexActividades = 0;
    MIRPADRE.componenteActividad.map((v, index) => {
      let aux: Array<IActividadesMir> = [];
      v.actividades.map((x) => {
        aux.push(MIRPADRE.actividades[indexActividades]);
        indexActividades++;
      });
      n[index] = aux;
      setValoresComponenteActividad(n);
    });
  }, []);

  const [openModalEnviar, setOpenModalEnviar] = useState(false);

  const [openModalSolicitarModif, setOpenModalSolicitarModif] = useState(false);

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
        process.env.REACT_APP_APPLICATION_BACK + "/api/create-mir",
        {
          MIR: JSON.stringify(MIR),
          Estado: estado,
          //se va a cambiar 
          CreadoPor: localStorage.getItem("IdUsuario"),
          AnioFiscal: MIR?.encabezado.ejercicioFiscal,
          Institucion: MIR?.encabezado.institucion,
          Programa: MIR?.encabezado.nombre_del_programa,
          Eje: MIR?.encabezado.eje,
          Tematica: MIR?.encabezado.tema,
          IdMir: idMir,
          //Se va a cambiar
          Rol: localStorage.getItem("Rol"),
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
    setMIR(MIRPADRE);
  }, [MIRPADRE]);

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

  const [editEncabezado, setEditEncabezado] = useState<IEncabezadoEdit>({
    ejercicioFiscal: true,
    institucion: true,
    nombre_del_programa: true,
    eje: true,
    tema: true,
    objetivo: true,
    estrategia: true,
    lineas_de_accion: true,
    beneficiario: true,
    conac: true,
    consecutivo: true,
  });

  const [editFin, setEditFin] = useState<IFinEdit>({
    resumen: true,
    indicador: true,
    formula: true,
    frecuencia: true,
    medios: true,
    supuestos: true,
  });

  const [editProposito, setEditProposito] = useState<IPropositoEdit>({
    resumen: true,
    indicador: true,
    formula: true,
    frecuencia: true,
    medios_verificacion: true,
    supuestos: true,
  });

  const [editComponentes, setEditComponentes] = useState<
    Array<IComponenteMirEdit>
  >([]);

  const [editActividades, setEditActividades] = useState<
    Array<IActividadesMirEdit>
  >([]);

  const [disablebutton, setDisablebutton] = useState(false);

  const [disablebutton2, setDisablebutton2] = useState(false);

  const [disablebutton3, setDisablebutton3] = useState(false);

  const [disablebuttoncomponentes, setDisablebuttoncomponentes] =
    useState(false);

  const [disablebuttonactividades, setDisablebuttonactividades] =
    useState(false);

  useEffect(() => {
    let arrayEncabezado = Object.entries(editEncabezado);
    let arrayFin = Object.entries(editFin);
    let arrayProposito = Object.entries(editProposito);

    let arrayComponentes = editComponentes.map((item) => {
      let a = [
        item.formula,
        item.frecuencia,
        item.indicador,
        item.medios,
        item.resumen,
        item.supuestos,
      ];

      let x = a.every((value) => value === true);
      return x;
    });

    let arrayActividad = editActividades.map((item) => {
      let a = [
        //item.actividad,
        item.formula,
        item.frecuencia,
        item.indicador,
        item.medios,
        item.resumen,
        item.supuestos,
      ];

      let x = a.every((value) => value === true);
      return x;
    });

    let respEncabezado = arrayEncabezado.every((item) => item[1] === true);
    let respFin = arrayFin.every((item) => item[1] === true);
    let respProposito = arrayProposito.every((item) => item[1] === true);
    let respuestaComponentes = arrayComponentes.every((item) => item === true);
    let respuestaActividades = arrayActividad.every((item) => item === true);

    setDisablebutton(respEncabezado);

    setDisablebutton2(respFin);

    setDisablebutton3(respProposito);

    setDisablebuttoncomponentes(respuestaComponentes);

    setDisablebuttonactividades(respuestaActividades);
  }, [
    editEncabezado,
    editFin,
    editProposito,
    editComponentes,
    editActividades,
  ]);

  const isCapturador = localStorage.getItem("Rol") === "Capturador";
  const isAutorizador = localStorage.getItem("Rol") === "Administrador";

  const buttonStyles = {
    ...queries.buttonContinuarSolicitudInscripcion,

    ...(isCapturador && {
      "&.Mui-disabled": {
        //backgroundColor: "rgba(175, 140, 85, 0.6)",
        color: "white",
        "&:hover": {
          backgroundColor: "rgba(175, 140, 85, 0.6)",
        },
      },
    }),
    ...(isAutorizador && {
      "&.Mui-disabled": {
        //backgroundColor: "rgba(175, 140, 85, 0.6)",
        color: "white",
        "&:hover": {
          backgroundColor: "rgba(175, 140, 85, 0.6)",
        },
      },
    })
  };

  return (
    <Box
      // visibility={show ? "visible" : "hidden"}
      position="absolute"
      sx={{
        display: "flex",
        width: "93vw",
        height: "82vh",
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
            sx={{
              fontFamily: "MontserratBold",
              borderBottom: 1,
              textTransform: "uppercase",
            }}
          >
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
              {localStorage.getItem("Rol") !== "Administrador" ? null : (
                <Checkbox
                  value={editEncabezado.ejercicioFiscal}
                  onChange={(v) => {
                    setEditEncabezado({
                      ...editEncabezado,
                      ejercicioFiscal: v.target.checked,
                    });
                  }}
                />
              )}

              <Typography
                sx={{
                  fontFamily: "MontserratMedium",
                  width: "20%",
                  textTransform: "uppercase",
                }}
              >
                Ejercicio Fiscal:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                {MIRPADRE.encabezado?.ejercicioFiscal}
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
              {/* Validar que se seleecione alguno en estos puntos estan*/}

              {localStorage.getItem("Rol") !== "Administrador" ? null : (
                <Checkbox
                  value={editEncabezado.institucion}
                  onChange={(v) => {
                    setEditEncabezado({
                      ...editEncabezado,
                      institucion: v.target.checked,
                    });
                  }}
                />
              )}

              <Typography
                sx={{
                  fontFamily: "MontserratMedium",
                  width: "20%",
                  textTransform: "uppercase",
                }}
              >
                Institución:
              </Typography>
              <Typography
                sx={{
                  fontFamily: "MontserratLight",
                  width: "80%",
                  textTransform: "uppercase",
                }}
              >
                {MIRPADRE.encabezado?.institucion}
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
              {localStorage.getItem("Rol") !== "Administrador" ? null : (
                <Checkbox
                  value={editEncabezado.nombre_del_programa}
                  onChange={(v) => {
                    setEditEncabezado({
                      ...editEncabezado,
                      nombre_del_programa: v.target.checked,
                    });
                  }}
                />
              )}

              <Typography
                sx={{
                  fontFamily: "MontserratMedium",
                  width: "20%",
                  textTransform: "uppercase",
                }}
              >
                Programa:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                {MIRPADRE.encabezado?.nombre_del_programa}
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
              {localStorage.getItem("Rol") !== "Administrador" ? null : (
                <Checkbox
                  value={editEncabezado.eje}
                  onChange={(v) => {
                    setEditEncabezado({
                      ...editEncabezado,
                      eje: v.target.checked,
                    });
                  }}
                />
              )}

              <Typography
                sx={{
                  fontFamily: "MontserratMedium",
                  width: "20%",
                  textTransform: "uppercase",
                }}
              >
                Eje:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                {MIRPADRE.encabezado?.eje}
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
              {localStorage.getItem("Rol") !== "Administrador" ? null : (
                <Checkbox
                  value={editEncabezado.tema}
                  onChange={(v) => {
                    setEditEncabezado({
                      ...editEncabezado,
                      tema: v.target.checked,
                    });
                  }}
                />
              )}

              <Typography
                sx={{
                  fontFamily: "MontserratMedium",
                  width: "20%",
                  textTransform: "uppercase",
                }}
              >
                Temática:
              </Typography>
              <Typography
                sx={{
                  fontFamily: "MontserratLight",
                  width: "80%",
                  textTransform: "uppercase",
                }}
              >
                {MIRPADRE.encabezado?.tema}
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
              {localStorage.getItem("Rol") !== "Administrador" ? null : (
                <Checkbox
                  value={editEncabezado.objetivo}
                  onChange={(v) => {
                    setEditEncabezado({
                      ...editEncabezado,
                      objetivo: v.target.checked,
                    });
                  }}
                />
              )}
              <Typography
                sx={{
                  fontFamily: "MontserratMedium",
                  width: "20%",
                  textTransform: "uppercase",
                }}
              >
                Objetivo:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                {MIRPADRE.encabezado?.objetivo}
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
              {localStorage.getItem("Rol") !== "Administrador" ? null : (
                <Checkbox
                  value={editEncabezado.estrategia}
                  onChange={(v) => {
                    setEditEncabezado({
                      ...editEncabezado,
                      estrategia: v.target.checked,
                    });
                  }}
                />
              )}
              <Typography
                sx={{
                  fontFamily: "MontserratMedium",
                  width: "20%",
                  textTransform: "uppercase",
                }}
              >
                Estrategia:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                {MIRPADRE.encabezado?.estrategia}
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
              {localStorage.getItem("Rol") !== "Administrador" ? null : (
                <Checkbox
                  value={editEncabezado.beneficiario}
                  onChange={(v) => {
                    setEditEncabezado({
                      ...editEncabezado,
                      beneficiario: v.target.checked,
                    });
                  }}
                />
              )}

              <Typography
                sx={{
                  fontFamily: "MontserratMedium",
                  width: "20%",
                  textTransform: "uppercase",
                }}
              >
                Beneficiario:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                {MIRPADRE.encabezado?.beneficiario}
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
              <Checkbox
                value={editEncabezado.lineas_de_accion}
                onChange={(v) => {
                  setEditEncabezado({
                    ...editEncabezado,
                    lineas_de_accion: v.target.checked,
                  });
                }}
              />
            )}
            <Typography
              sx={{
                fontFamily: "MontserratMedium",
                width: "20%",
                textTransform: "uppercase",
              }}
            >
              Lineas de Acción:
            </Typography>
            <Box>
              {MIRPADRE.encabezado?.lineas_de_accion.map(
                (value: { Id: string; LineaDeAccion: string }, x: any) => {
                  return (
                    <Typography
                      key={x}
                      sx={{
                        fontFamily: "MontserratLight",
                        width: "100%",
                        borderBottom: "1px solid lightGrey",
                        "&:last-Child": { borderBottom: 0 },
                        textTransform: "uppercase",
                      }}
                    >
                      {value?.LineaDeAccion}
                    </Typography>
                  );
                }
              )}
            </Box>
          </Box>

          <Typography
            sx={{
              fontFamily: "MontserratBold",
              borderBottom: 1,
              mt: 5,
              textTransform: "uppercase",
            }}
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
              <Checkbox
                value={editFin.resumen}
                onChange={(v) => {
                  setEditFin({ ...editFin, resumen: v.target.checked });
                }}
              />
            )}
            <Typography
              sx={{
                fontFamily: "MontserratMedium",
                width: "20%",
                textTransform: "uppercase",
              }}
            >
              Resumen Narrativo:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {MIRPADRE.fin?.resumen}
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
              <Checkbox
                value={editFin.indicador}
                onChange={(v) => {
                  setEditFin({ ...editFin, indicador: v.target.checked });
                }}
              />
            )}
            <Typography
              sx={{
                fontFamily: "MontserratMedium",
                width: "20%",
                textTransform: "uppercase",
              }}
            >
              Indicador:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {MIRPADRE.fin?.indicador}
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
              <Checkbox
                value={editFin.formula}
                onChange={(v) => {
                  setEditFin({ ...editFin, formula: v.target.checked });
                }}
              />
            )}
            <Typography
              sx={{
                fontFamily: "MontserratMedium",
                width: "20%",
                textTransform: "uppercase",
              }}
            >
              Fórmula:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {MIRPADRE.fin?.formula}
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
              <Checkbox
                value={editFin.frecuencia}
                onChange={(v) => {
                  setEditFin({ ...editFin, frecuencia: v.target.checked });
                }}
              />
            )}
            <Typography
              sx={{
                fontFamily: "MontserratMedium",
                width: "20%",
                textTransform: "uppercase",
              }}
            >
              Frecuencia:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {MIRPADRE.fin?.frecuencia}
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
              <Checkbox
                value={editFin.medios}
                onChange={(v) => {
                  setEditFin({ ...editFin, medios: v.target.checked });
                }}
              />
            )}
            <Typography
              sx={{
                fontFamily: "MontserratMedium",
                width: "20%",
                textTransform: "uppercase",
              }}
            >
              Medios de Verificación:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {MIRPADRE.fin?.medios}
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
              <Checkbox
                value={editFin.supuestos}
                onChange={(v) => {
                  setEditFin({ ...editFin, supuestos: v.target.checked });
                }}
              />
            )}
            <Typography
              sx={{
                fontFamily: "MontserratMedium",
                width: "20%",
                textTransform: "uppercase",
              }}
            >
              Supuestos:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {MIRPADRE.fin?.supuestos}
            </Typography>
          </Box>

          <Typography
            sx={{
              fontFamily: "MontserratBold",
              borderBottom: 1,
              mt: 5,
              textTransform: "uppercase",
            }}
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
              <Checkbox
                value={editProposito.resumen}
                onChange={(v) => {
                  setEditProposito({
                    ...editProposito,
                    resumen: v.target.checked,
                  });
                }}
              />
            )}

            <Typography
              sx={{
                fontFamily: "MontserratMedium",
                width: "20%",
                textTransform: "uppercase",
              }}
            >
              Resumen Narrativo:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {MIRPADRE.proposito?.resumen}
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
              <Checkbox
                value={editProposito.indicador}
                onChange={(v) => {
                  setEditProposito({
                    ...editProposito,
                    indicador: v.target.checked,
                  });
                }}
              />
            )}
            <Typography
              sx={{
                fontFamily: "MontserratMedium",
                width: "20%",
                textTransform: "uppercase",
              }}
            >
              Indicador:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {MIRPADRE.proposito?.indicador}
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
              <Checkbox
                value={editProposito.formula}
                onChange={(v) => {
                  setEditProposito({
                    ...editProposito,
                    formula: v.target.checked,
                  });
                }}
              />
            )}
            <Typography
              sx={{
                fontFamily: "MontserratMedium",
                width: "20%",
                textTransform: "uppercase",
              }}
            >
              Fórmula:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {MIRPADRE.proposito?.formula}
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
              <Checkbox
                value={editProposito.frecuencia}
                onChange={(v) => {
                  setEditProposito({
                    ...editProposito,
                    frecuencia: v.target.checked,
                  });
                }}
              />
            )}
            <Typography
              sx={{
                fontFamily: "MontserratMedium",
                width: "20%",
                textTransform: "uppercase",
              }}
            >
              Frecuencia:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {MIRPADRE.proposito?.frecuencia}
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
              <Checkbox
                value={editProposito.medios_verificacion}
                onChange={(v) => {
                  setEditProposito({
                    ...editProposito,
                    medios_verificacion: v.target.checked,
                  });
                }}
              />
            )}
            <Typography
              sx={{
                fontFamily: "MontserratMedium",
                width: "20%",
                textTransform: "uppercase",
              }}
            >
              Medios de Verificación:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {MIRPADRE.proposito?.medios_verificacion}
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
              <Checkbox
                value={editProposito.supuestos}
                onChange={(v) => {
                  setEditProposito({
                    ...editProposito,
                    supuestos: v.target.checked,
                  });
                }}
              />
            )}
            <Typography
              sx={{
                fontFamily: "MontserratMedium",
                width: "20%",
                textTransform: "uppercase",
              }}
            >
              Supuestos:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {MIRPADRE.proposito?.supuestos}
            </Typography>
          </Box>

          <Typography
            sx={{
              fontFamily: "MontserratBold",
              borderBottom: 1,
              mt: 5,
              textTransform: "uppercase",
            }}
          >
            Componentes
          </Typography>
          {MIRPADRE.componentes.map((v, index) => {
            return (
              <Box key={index}>
                <Typography
                  sx={{
                    fontFamily: "MontserratMedium",
                    borderBottom: 1,
                    mt: 5,
                    textAlign: "center",
                    textTransform: "uppercase",
                  }}
                >
                  Componente {index + 1}
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
                  {localStorage.getItem("Rol") !== "Administrador" ? null : (
                    <Checkbox
                      value={editComponentes[index - 1]?.resumen}
                      onChange={(v) => {
                        let past = [...editComponentes];
                        past[index - 1].resumen = v.target.checked;
                        setEditComponentes(past);
                      }}
                    />
                  )}
                  <Typography
                    sx={{
                      fontFamily: "MontserratMedium",
                      width: "20%",
                      textTransform: "uppercase",
                    }}
                  >
                    Resumen Narrativo:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
                    {v?.resumen}
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
                  {localStorage.getItem("Rol") !== "Administrador" ? null : (
                    <Checkbox
                      value={editComponentes[index - 1]?.indicador}
                      onChange={(v) => {
                        let past = [...editComponentes];
                        past[index - 1].indicador = v.target.checked;
                        setEditComponentes(past);
                      }}
                    />
                  )}

                  <Typography
                    sx={{
                      fontFamily: "MontserratMedium",
                      width: "20%",
                      textTransform: "uppercase",
                    }}
                  >
                    Indicador:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
                    {v?.indicador}
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
                  {localStorage.getItem("Rol") !== "Administrador" ? null : (
                    <Checkbox
                      value={editComponentes[index - 1]?.formula}
                      onChange={(v) => {
                        let past = [...editComponentes];
                        past[index - 1].formula = v.target.checked;
                        setEditComponentes(past);
                      }}
                    />
                  )}

                  <Typography
                    sx={{
                      fontFamily: "MontserratMedium",
                      width: "20%",
                      textTransform: "uppercase",
                    }}
                  >
                    Fórmula:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
                    {v?.formula}
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
                  {localStorage.getItem("Rol") !== "Administrador" ? null : (
                    <Checkbox
                      value={editComponentes[index - 1]?.frecuencia}
                      onChange={(v) => {
                        let past = [...editComponentes];
                        past[index - 1].frecuencia = v.target.checked;
                        setEditComponentes(past);
                      }}
                    />
                  )}

                  <Typography
                    sx={{
                      fontFamily: "MontserratMedium",
                      width: "20%",
                      textTransform: "uppercase",
                    }}
                  >
                    Frecuencia:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
                    {v?.frecuencia}
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
                  {localStorage.getItem("Rol") !== "Administrador" ? null : (
                    <Checkbox
                      value={editComponentes[index - 1]?.medios}
                      onChange={(v) => {
                        let past = [...editComponentes];
                        past[index - 1].medios = v.target.checked;
                        setEditComponentes(past);
                      }}
                    />
                  )}

                  <Typography
                    sx={{
                      fontFamily: "MontserratMedium",
                      width: "20%",
                      textTransform: "uppercase",
                    }}
                  >
                    Medios de Verificación:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
                    {v?.medios}
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
                  {localStorage.getItem("Rol") !== "Administrador" ? null : (
                    <Checkbox
                      value={editComponentes[index - 1]?.supuestos}
                      onChange={(v) => {
                        let past = [...editComponentes];
                        past[index - 1].supuestos = v.target.checked;
                        setEditComponentes(past);
                      }}
                    />
                  )}

                  <Typography
                    sx={{
                      fontFamily: "MontserratMedium",
                      width: "20%",
                      textTransform: "uppercase",
                    }}
                  >
                    Supuestos:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
                    {v?.supuestos}
                  </Typography>
                </Box>
              </Box>
            );
          })}

          <Typography
            sx={{
              fontFamily: "MontserratBold",
              borderBottom: 1,
              mt: 5,
              textTransform: "uppercase",
            }}
          >
            Actividades
          </Typography>
          {valoresComponenteActividad.map((comps, index) => {
            return comps.map((acts, index2) => {
              return (
                <Box key={Math.random()}>
                  <Typography
                    sx={{
                      fontFamily: "MontserratMedium",
                      borderBottom: 1,
                      mt: 5,
                      textAlign: "center",
                      textTransform: "uppercase",
                    }}
                  >
                    Actividad {index2 + 1} Componente {index + 1}
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
                    {localStorage.getItem("Rol") !== "Administrador" ? null : (
                      <Checkbox
                        value={!editComponentes[index - 1]?.resumen}
                        onChange={(v) => {
                          let past = [...editComponentes];
                          past[index - 1].resumen = v.target.checked;
                          setEditComponentes(past);
                        }}
                      />
                    )}
                    <Typography
                      sx={{
                        fontFamily: "MontserratMedium",
                        width: "20%",
                        textTransform: "uppercase",
                      }}
                    >
                      Resumen Narrativo:
                    </Typography>
                    <Typography
                      sx={{ fontFamily: "MontserratLight", width: "80%" }}
                    >
                      {valoresComponenteActividad[index][index2]?.resumen}
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
                    {localStorage.getItem("Rol") !== "Administrador" ? null : (
                      <Checkbox
                        value={!editComponentes[index - 1]?.indicador}
                        onChange={(v) => {
                          let past = [...editComponentes];
                          past[index - 1].indicador = v.target.checked;
                          setEditComponentes(past);
                        }}
                      />
                    )}

                    <Typography
                      sx={{
                        fontFamily: "MontserratMedium",
                        width: "20%",
                        textTransform: "uppercase",
                      }}
                    >
                      Indicador:
                    </Typography>
                    <Typography
                      sx={{ fontFamily: "MontserratLight", width: "80%" }}
                    >
                      {valoresComponenteActividad[index][index2]?.indicador}
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
                    {localStorage.getItem("Rol") !== "Administrador" ? null : (
                      <Checkbox
                        value={!editComponentes[index - 1]?.formula}
                        onChange={(v) => {
                          let past = [...editComponentes];
                          past[index - 1].formula = v.target.checked;
                          setEditComponentes(past);
                        }}
                      />
                    )}

                    <Typography
                      sx={{
                        fontFamily: "MontserratMedium",
                        width: "20%",
                        textTransform: "uppercase",
                      }}
                    >
                      Fórmula:
                    </Typography>
                    <Typography
                      sx={{ fontFamily: "MontserratLight", width: "80%" }}
                    >
                      {valoresComponenteActividad[index][index2]?.formula}
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
                    {localStorage.getItem("Rol") !== "Administrador" ? null : (
                      <Checkbox
                        value={!editComponentes[index - 1]?.frecuencia}
                        onChange={(v) => {
                          let past = [...editComponentes];
                          past[index - 1].frecuencia = v.target.checked;
                          setEditComponentes(past);
                        }}
                      />
                    )}

                    <Typography
                      sx={{
                        fontFamily: "MontserratMedium",
                        width: "20%",
                        textTransform: "uppercase",
                      }}
                    >
                      Frecuencia:
                    </Typography>
                    <Typography
                      sx={{ fontFamily: "MontserratLight", width: "80%" }}
                    >
                      {valoresComponenteActividad[index][index2]?.frecuencia}
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
                    {localStorage.getItem("Rol") !== "Administrador" ? null : (
                      <Checkbox
                        value={!editComponentes[index - 1]?.medios}
                        onChange={(v) => {
                          let past = [...editComponentes];
                          past[index - 1].medios = v.target.checked;
                          setEditComponentes(past);
                        }}
                      />
                    )}

                    <Typography
                      sx={{
                        fontFamily: "MontserratMedium",
                        width: "20%",
                        textTransform: "uppercase",
                      }}
                    >
                      Medios de Verificación:
                    </Typography>
                    <Typography
                      sx={{ fontFamily: "MontserratLight", width: "80%" }}
                    >
                      {valoresComponenteActividad[index][index2]?.medios}
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
                    {localStorage.getItem("Rol") !== "Administrador" ? null : (
                      <Checkbox
                        value={!editComponentes[index - 1]?.supuestos}
                        onChange={(v) => {
                          let past = [...editComponentes];
                          past[index - 1].supuestos = v.target.checked;
                          setEditComponentes(past);
                        }}
                      />
                    )}

                    <Typography
                      sx={{
                        fontFamily: "MontserratMedium",
                        width: "20%",
                        textTransform: "uppercase",
                      }}
                    >
                      Supuestos:
                    </Typography>
                    <Typography
                      sx={{ fontFamily: "MontserratLight", width: "80%" }}
                    >
                      {valoresComponenteActividad[index][index2]?.supuestos}
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
        <Button
          sx={queries.buttonCancelarSolicitudInscripcion}
          onClick={() => showResume()}
        >
          <Typography sx={{ fontFamily: "MontserratMedium" }}>
            Cancelar
          </Typography>
        </Button>

        <Button
          disabled={
            disablebutton &&
            disablebutton2 &&
            disablebutton3 &&
            disablebuttoncomponentes &&
            disablebuttonactividades &&
            localStorage.getItem("Rol") !== "Verificador"
          }
          sx={buttonStyles}
          onClick={() => setOpenModalSolicitarModif(true)}
        >
          <Typography sx={{ fontFamily: "MontserratMedium" }}>
            Solicitar Modificación
          </Typography>
        </Button>

        <Button
          sx={queries.buttonContinuarSolicitudInscripcion}
          onClick={() =>
            checkMir(
              localStorage.getItem("Rol") === "Capturador"
                ? "En Captura"
                : localStorage.getItem("Rol") === "Verificador"
                ? "En Revisión"
                : "En Autorización"
            )
          }
          //al menos un opcion
        >
          <Typography sx={{ fontFamily: "MontserratMedium" }}>
            Guardar borrador
          </Typography>
        </Button>

        <Button
          sx={queries.buttonContinuarSolicitudInscripcion}
          onClick={() => setOpenModalEnviar(true)}
        >
          <Typography sx={{ fontFamily: "MontserratMedium" }}>
            {localStorage.getItem("Rol") === "Administrador"
              ? "Autorizar"
              : "Enviar"}
          </Typography>
        </Button>

        <ModalSolicitaModif
          open={openModalSolicitarModif}
          IdMir={idMir}
          showResume={showResume}
          handleClose={setOpenModalSolicitarModif}
          MIR={JSON.stringify(MIR)}
          MIREdit={
            // localStorage.getItem("Rol") !== "Administrador"
            //   ? JSON.stringify(mirEdit)
            //   :
            JSON.stringify({
              encabezado: editEncabezado,
              fin: editFin,
              proposito: editProposito,
              componentes: editComponentes,
              actividades: editActividades,
            })
          }
        ></ModalSolicitaModif>

        <ModalEnviarMIR
          showResume={showResume}
          open={openModalEnviar}
          handleClose={setOpenModalEnviar}
          MIR={JSON.stringify(MIR)}
          IdMir={idMir}
        ></ModalEnviarMIR>
      </Box>
    </Box>
  );
}

export default TabResumen;

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
  conac: boolean;
  consecutivo: boolean;
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
