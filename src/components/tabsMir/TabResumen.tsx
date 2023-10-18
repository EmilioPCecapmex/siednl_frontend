/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import { Grid, Button, Checkbox, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ModalEnviarMIR from "../modalsMIR/ModalEnviarMIR";
import ModalSolicitaModif from "../modalsMIR/ModalSolicitaModif";
import { IActividadesMir } from "./ICValor";
import { IMIR } from "./IMIR";
import { ILista } from "./IListas";
import { queries } from "../../queries";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
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
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.up('lg'));

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

  const objetoVacio: ILista = { Id: "", Label: "" };

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

  const checkMir = (estado: string) => {
    if (MIR?.encabezado.ejercicioFiscal === objetoVacio) {
      return Toast.fire({
        icon: "error",
        title: "Selecciona año fiscal.",
      });
    } else if (MIR?.encabezado.entidad === objetoVacio) {
      return Toast.fire({
        icon: "error",
        title: "Selecciona institución.",
      });
    } else if (MIR?.encabezado.programa === objetoVacio) {
      return Toast.fire({
        icon: "error",
        title: "Selecciona programa.",
      });
    } else {
      createMIR(estado);
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
          AnioFiscal: MIR?.encabezado.ejercicioFiscal.Label,
          IdEntidad:
            MIR?.encabezado.entidad.Id || localStorage.getItem("IdEntidad"),
          Programa: MIR?.encabezado.programa.Label,
          Eje: MIR?.encabezado.eje.Label,
          Tematica: MIR?.encabezado.tema.Label,
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
    console.log("idMir",idMir);
    
  }, [MIRPADRE,idMir]);

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    }),
  };

  return (
    <Grid
      // visibility={show ? "visible" : "hidden"}
      position="absolute"
      sx={{
        //display: "flex",
        width: "93vw",
        height: "82vh",
        boxShadow: 10,
        borderRadius: 5,
        // alignItems: "center",
        //justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "#fff",
        overflow: "auto",
      }}
    >
      <Grid
        item
        container
        xl={11}
        lg={11}
        md={12}
        sm={12}
        xs={12}
        display={"flex"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
        // sx={{
        //   width: "90%",
        //   border: 0.1,
        //   borderColor: "#909090",
        //   height: "80%",
        //   overflow: "auto",
        //   borderRadius: 1,
        //   "&::-webkit-scrollbar": {
        //     width: ".3vw",
        //     mt: 1,
        //   },
        //   "&::-webkit-scrollbar-thumb": {
        //     backgroundColor: "rgba(0,0,0,.5)",
        //     outline: "1px solid slategrey",
        //     borderRadius: 1,
        //   },
        // }}
      >
        <Grid
          item
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            //display: "flex",
            //flexDirection: "row",

            //mt: 1,
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          <Typography
            sx={{
              fontFamily: "MontserratBold",
              borderBottom: 1,
              mt: 1,
              textTransform: "uppercase",
            }}
          >
            Datos Generales
          </Typography>
        </Grid>

        <Grid
          item
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",

            //mt: 1,
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          {localStorage.getItem("Rol") !== "Administrador" ? null : (
            <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
              <Checkbox
                value={editEncabezado.ejercicioFiscal}
                onChange={(v) => {
                  setEditEncabezado({
                    ...editEncabezado,
                    ejercicioFiscal: v.target.checked,
                  });
                }}
              />
            </Grid>
          )}

          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography
              sx={{
                fontFamily: "MontserratMedium",

                textTransform: "uppercase",
              }}
            >
              Ejercicio Fiscal:
            </Typography>
          </Grid>

          <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {MIRPADRE.encabezado?.ejercicioFiscal?.Label}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",

            //mt: 1,
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          {localStorage.getItem("Rol") !== "Administrador" ? null : (
            <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
              <Checkbox
                value={editEncabezado.institucion}
                onChange={(v) => {
                  setEditEncabezado({
                    ...editEncabezado,
                    institucion: v.target.checked,
                  });
                }}
              />
            </Grid>
          )}

          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography
              sx={{
                fontFamily: "MontserratMedium",
                textTransform: "uppercase",
              }}
            >
              Entidad:
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography
              sx={{
                fontFamily: "MontserratLight",

                textTransform: "uppercase",
              }}
            >
              {MIRPADRE.encabezado?.entidad?.Label}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",

            //mt: 1,
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          {localStorage.getItem("Rol") !== "Administrador" ? null : (
            <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
              <Checkbox
                value={editEncabezado.nombre_del_programa}
                onChange={(v) => {
                  setEditEncabezado({
                    ...editEncabezado,
                    nombre_del_programa: v.target.checked,
                  });
                }}
              />
            </Grid>
          )}
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography
              sx={{
                fontFamily: "MontserratMedium",

                textTransform: "uppercase",
              }}
            >
              Programa:
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {MIRPADRE.encabezado?.programa?.Label}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          container
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",

            //mt: 1,
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          {localStorage.getItem("Rol") !== "Administrador" ? null : (
            <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
              <Checkbox
                value={editEncabezado.eje}
                onChange={(v) => {
                  setEditEncabezado({
                    ...editEncabezado,
                    eje: v.target.checked,
                  });
                }}
              />
            </Grid>
          )}
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography
              sx={{
                fontFamily: "MontserratMedium",

                textTransform: "uppercase",
              }}
            >
              Eje:
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {MIRPADRE.encabezado?.eje?.Label}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          container
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",

            //mt: 1,
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          {localStorage.getItem("Rol") !== "Administrador" ? null : (
            <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
              <Checkbox
                value={editEncabezado.tema}
                onChange={(v) => {
                  setEditEncabezado({
                    ...editEncabezado,
                    tema: v.target.checked,
                  });
                }}
              />
            </Grid>
          )}
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography
              sx={{
                fontFamily: "MontserratMedium",

                textTransform: "uppercase",
              }}
            >
              Temática:
            </Typography>
          </Grid>
          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography
              sx={{
                fontFamily: "MontserratLight",

                textTransform: "uppercase",
              }}
            >
              {MIRPADRE.encabezado?.tema?.Label}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          container
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",

            //mt: 1,
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          {localStorage.getItem("Rol") !== "Administrador" ? null : (
            <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
              <Checkbox
                value={editEncabezado.objetivo}
                onChange={(v) => {
                  setEditEncabezado({
                    ...editEncabezado,
                    objetivo: v.target.checked,
                  });
                }}
              />
            </Grid>
          )}
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography
              sx={{
                fontFamily: "MontserratMedium",

                textTransform: "uppercase",
              }}
            >
              Objetivo:
            </Typography>
          </Grid>
          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {MIRPADRE.encabezado?.objetivo?.Label}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          container
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",

            //mt: 1,
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          {localStorage.getItem("Rol") !== "Administrador" ? null : (
            <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
              <Checkbox
                value={editEncabezado.estrategia}
                onChange={(v) => {
                  setEditEncabezado({
                    ...editEncabezado,
                    estrategia: v.target.checked,
                  });
                }}
              />
            </Grid>
          )}
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography
              sx={{
                fontFamily: "MontserratMedium",

                textTransform: "uppercase",
              }}
            >
              Estrategia:
            </Typography>
          </Grid>
          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {MIRPADRE.encabezado?.estrategia?.Label}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          container
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",

            //mt: 1,
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          {localStorage.getItem("Rol") !== "Administrador" ? null : (
            <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
              <Checkbox
                value={editEncabezado.beneficiario}
                onChange={(v) => {
                  setEditEncabezado({
                    ...editEncabezado,
                    beneficiario: v.target.checked,
                  });
                }}
              />
            </Grid>
          )}
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography
              sx={{
                fontFamily: "MontserratMedium",

                textTransform: "uppercase",
              }}
            >
              Beneficiario:
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {MIRPADRE.encabezado?.beneficiario?.Label}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          container
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",

            //mt: 1,
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          {localStorage.getItem("Rol") !== "Administrador" ? null : (
            <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
              <Checkbox
                value={editEncabezado.lineas_de_accion}
                onChange={(v) => {
                  setEditEncabezado({
                    ...editEncabezado,
                    lineas_de_accion: v.target.checked,
                  });
                }}
              />
            </Grid>
          )}
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography
              sx={{
                fontFamily: "MontserratMedium",

                textTransform: "uppercase",
              }}
            >
              Lineas de Acción:
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            {MIRPADRE.encabezado?.lineas_de_accion.map(
              (value: { Id: string; Label: string }, x: any) => {
                return (
                  <Typography
                    key={x}
                    sx={{
                      fontFamily: "MontserratLight",

                      borderBottom: "1px solid lightGrey",
                      "&:last-Child": { borderBottom: 0 },
                      textTransform: "uppercase",
                    }}
                  >
                    {value?.Label}
                  </Typography>
                );
              }
            )}
          </Grid>
        </Grid>

        <Grid
          item
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            //display: "flex",
            //flexDirection: "row",

            //mt: 1,
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          <Typography
            sx={{
              fontFamily: "MontserratBold",
              borderBottom: 1,
              mt: 1,
              textTransform: "uppercase",
            }}
          >
            Fin
          </Typography>
        </Grid>

        <Grid
          item
          container
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",

            //mt: 1,
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          {localStorage.getItem("Rol") !== "Administrador" ? null : (
            <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
              <Checkbox
                value={editFin.resumen}
                onChange={(v) => {
                  setEditFin({ ...editFin, resumen: v.target.checked });
                }}
              />
            </Grid>
          )}
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography
              sx={{
                fontFamily: "MontserratMedium",

                textTransform: "uppercase",
              }}
            >
              Resumen Narrativo:
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {MIRPADRE.fin?.resumen}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          container
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",

            //mt: 1,
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          {localStorage.getItem("Rol") !== "Administrador" ? null : (
            <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
              <Checkbox
                value={editFin.indicador}
                onChange={(v) => {
                  setEditFin({ ...editFin, indicador: v.target.checked });
                }}
              />
            </Grid>
          )}
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography
              sx={{
                fontFamily: "MontserratMedium",

                textTransform: "uppercase",
              }}
            >
              Indicador:
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {MIRPADRE.fin?.indicador}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          container
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",

            //mt: 1,
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          {localStorage.getItem("Rol") !== "Administrador" ? null : (
            <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
              <Checkbox
                value={editFin.formula}
                onChange={(v) => {
                  setEditFin({ ...editFin, formula: v.target.checked });
                }}
              />
            </Grid>
          )}
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography
              sx={{
                fontFamily: "MontserratMedium",
                width: "20%",
                textTransform: "uppercase",
              }}
            >
              Fórmula:
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {MIRPADRE.fin?.formula}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          container
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",

            //mt: 1,
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          {localStorage.getItem("Rol") !== "Administrador" ? null : (
            <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
              <Checkbox
                value={editFin.frecuencia}
                onChange={(v) => {
                  setEditFin({ ...editFin, frecuencia: v.target.checked });
                }}
              />
            </Grid>
          )}
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography
              sx={{
                fontFamily: "MontserratMedium",

                textTransform: "uppercase",
              }}
            >
              Frecuencia:
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {MIRPADRE.fin?.frecuencia}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",

            //mt: 1,
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          {localStorage.getItem("Rol") !== "Administrador" ? null : (
            <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
              <Checkbox
                value={editFin.medios}
                onChange={(v) => {
                  setEditFin({ ...editFin, medios: v.target.checked });
                }}
              />
            </Grid>
          )}
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography
              sx={{
                fontFamily: "MontserratMedium",

                textTransform: "uppercase",
              }}
            >
              Medios de Verificación:
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {MIRPADRE.fin?.medios}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          container
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",

            //mt: 1,
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          {localStorage.getItem("Rol") !== "Administrador" ? null : (
            <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
              <Checkbox
                value={editFin.supuestos}
                onChange={(v) => {
                  setEditFin({ ...editFin, supuestos: v.target.checked });
                }}
              />
            </Grid>
          )}

          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography
              sx={{
                fontFamily: "MontserratMedium",

                textTransform: "uppercase",
              }}
            >
              Supuestos:
            </Typography>
          </Grid>
          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {MIRPADRE.fin?.supuestos}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            //display: "flex",
            //flexDirection: "row",

            //mt: 1,
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          <Typography
            sx={{
              fontFamily: "MontserratBold",
              borderBottom: 1,
              mt: 1,
              textTransform: "uppercase",
            }}
          >
            Propósito
          </Typography>
        </Grid>

        <Grid
          item
          container
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",

            //mt: 1,
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          {localStorage.getItem("Rol") !== "Administrador" ? null : (
            <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
              <Checkbox
                value={editProposito.resumen}
                onChange={(v) => {
                  setEditProposito({
                    ...editProposito,
                    resumen: v.target.checked,
                  });
                }}
              />
            </Grid>
          )}

          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography
              sx={{
                fontFamily: "MontserratMedium",

                textTransform: "uppercase",
              }}
            >
              Resumen Narrativo:
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {MIRPADRE.proposito?.resumen}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          container
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",

            //mt: 1,
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          {localStorage.getItem("Rol") !== "Administrador" ? null : (
            <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
              <Checkbox
                value={editProposito.indicador}
                onChange={(v) => {
                  setEditProposito({
                    ...editProposito,
                    indicador: v.target.checked,
                  });
                }}
              />
            </Grid>
          )}
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography
              sx={{
                fontFamily: "MontserratMedium",

                textTransform: "uppercase",
              }}
            >
              Indicador:
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {MIRPADRE.proposito?.indicador}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          container
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",

            //mt: 1,
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          {localStorage.getItem("Rol") !== "Administrador" ? null : (
            <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
              <Checkbox
                value={editProposito.formula}
                onChange={(v) => {
                  setEditProposito({
                    ...editProposito,
                    formula: v.target.checked,
                  });
                }}
              />
            </Grid>
          )}
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography
              sx={{
                fontFamily: "MontserratMedium",
                width: "20%",
                textTransform: "uppercase",
              }}
            >
              Fórmula:
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {MIRPADRE.proposito?.formula}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          container
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",

            //mt: 1,
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          {localStorage.getItem("Rol") !== "Administrador" ? null : (
            <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
              <Checkbox
                value={editProposito.frecuencia}
                onChange={(v) => {
                  setEditProposito({
                    ...editProposito,
                    frecuencia: v.target.checked,
                  });
                }}
              />
            </Grid>
          )}

          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography
              sx={{
                fontFamily: "MontserratMedium",

                textTransform: "uppercase",
              }}
            >
              Frecuencia:
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {MIRPADRE.proposito?.frecuencia}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          container
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",

            //mt: 1,
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          {localStorage.getItem("Rol") !== "Administrador" ? null : (
            <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
              <Checkbox
                value={editProposito.medios_verificacion}
                onChange={(v) => {
                  setEditProposito({
                    ...editProposito,
                    medios_verificacion: v.target.checked,
                  });
                }}
              />
            </Grid>
          )}
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography
              sx={{
                fontFamily: "MontserratMedium",
                width: "20%",
                textTransform: "uppercase",
              }}
            >
              Medios de Verificación:
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {MIRPADRE.proposito?.medios_verificacion}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          container
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",

            //mt: 1,
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          {localStorage.getItem("Rol") !== "Administrador" ? null : (
            <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
              <Checkbox
                value={editProposito.supuestos}
                onChange={(v) => {
                  setEditProposito({
                    ...editProposito,
                    supuestos: v.target.checked,
                  });
                }}
              />
            </Grid>
          )}

          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography
              sx={{
                fontFamily: "MontserratMedium",

                textTransform: "uppercase",
              }}
            >
              Supuestos:
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {MIRPADRE.proposito?.supuestos}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            //display: "flex",
            //flexDirection: "row",

            //mt: 1,
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          <Typography
            sx={{
              fontFamily: "MontserratBold",
              borderBottom: 1,
              mt: 1,
              textTransform: "uppercase",
            }}
          >
            Componentes
          </Typography>
        </Grid>

        {MIRPADRE.componentes.map((v, index) => {
          return (
            <Grid
              item
              container
              xl={11}
              lg={11}
              md={12}
              sm={12}
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "row",

                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
              key={index}
            >
              <Grid item>
                <Typography
                  sx={{
                    fontFamily: "MontserratMedium",
                    borderBottom: 1,

                    textAlign: "center",
                    textTransform: "uppercase",
                  }}
                >
                  Componente {index + 1}
                </Typography>
              </Grid>

              <Grid
                item
                container
                xl={11}
                lg={11}
                md={12}
                sm={12}
                xs={12}
                sx={{
                  display: "flex",
                  flexDirection: "row",

                  //mt: 1,
                  alignItems: "center",
                  borderBottom: 1,
                  borderColor: "#cfcfcf",
                }}
              >
                {localStorage.getItem("Rol") !== "Administrador" ? null : (
                  <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                    <Checkbox
                      value={editComponentes[index - 1]?.resumen}
                      onChange={(v) => {
                        let past = [...editComponentes];
                        past[index - 1].resumen = v.target.checked;
                        setEditComponentes(past);
                      }}
                    />
                  </Grid>
                )}
                <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                  <Typography
                    sx={{
                      fontFamily: "MontserratMedium",
                      width: "20%",
                      textTransform: "uppercase",
                    }}
                  >
                    Resumen Narrativo:
                  </Typography>
                </Grid>
                <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
                    {v?.resumen}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                item
                container
                xl={11}
                lg={11}
                md={12}
                sm={12}
                xs={12}
                sx={{
                  display: "flex",
                  flexDirection: "row",

                  //mt: 1,
                  alignItems: "center",
                  borderBottom: 1,
                  borderColor: "#cfcfcf",
                }}
              >
                {localStorage.getItem("Rol") !== "Administrador" ? null : (
                  <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                    <Checkbox
                      value={editComponentes[index - 1]?.indicador}
                      onChange={(v) => {
                        let past = [...editComponentes];
                        past[index - 1].indicador = v.target.checked;
                        setEditComponentes(past);
                      }}
                    />
                  </Grid>
                )}
                <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                  <Typography
                    sx={{
                      fontFamily: "MontserratMedium",
                      width: "20%",
                      textTransform: "uppercase",
                    }}
                  >
                    Indicador:
                  </Typography>
                </Grid>

                <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
                    {v?.indicador}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                item
                container
                xl={11}
                lg={11}
                md={12}
                sm={12}
                xs={12}
                sx={{
                  display: "flex",
                  flexDirection: "row",

                  //mt: 1,
                  alignItems: "center",
                  borderBottom: 1,
                  borderColor: "#cfcfcf",
                }}
              >
                {localStorage.getItem("Rol") !== "Administrador" ? null : (
                  <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                    <Checkbox
                      value={editComponentes[index - 1]?.formula}
                      onChange={(v) => {
                        let past = [...editComponentes];
                        past[index - 1].formula = v.target.checked;
                        setEditComponentes(past);
                      }}
                    />
                  </Grid>
                )}

                <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                  <Typography
                    sx={{
                      fontFamily: "MontserratMedium",

                      textTransform: "uppercase",
                    }}
                  >
                    Fórmula:
                  </Typography>
                </Grid>

                <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
                  <Typography sx={{ fontFamily: "MontserratLight" }}>
                    {v?.formula}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                item
                container
                xl={11}
                lg={11}
                md={12}
                sm={12}
                xs={12}
                sx={{
                  display: "flex",
                  flexDirection: "row",

                  //mt: 1,
                  alignItems: "center",
                  borderBottom: 1,
                  borderColor: "#cfcfcf",
                }}
              >
                {localStorage.getItem("Rol") !== "Administrador" ? null : (
                  <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                    <Checkbox
                      value={editComponentes[index - 1]?.frecuencia}
                      onChange={(v) => {
                        let past = [...editComponentes];
                        past[index - 1].frecuencia = v.target.checked;
                        setEditComponentes(past);
                      }}
                    />
                  </Grid>
                )}
                <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                  <Typography
                    sx={{
                      fontFamily: "MontserratMedium",

                      textTransform: "uppercase",
                    }}
                  >
                    Frecuencia:
                  </Typography>
                </Grid>
                <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
                  <Typography sx={{ fontFamily: "MontserratLight" }}>
                    {v?.frecuencia}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                item
                container
                xl={11}
                lg={11}
                md={12}
                sm={12}
                xs={12}
                sx={{
                  display: "flex",
                  flexDirection: "row",

                  //mt: 1,
                  alignItems: "center",
                  borderBottom: 1,
                  borderColor: "#cfcfcf",
                }}
              >
                {localStorage.getItem("Rol") !== "Administrador" ? null : (
                  <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                    <Checkbox
                      value={editComponentes[index - 1]?.medios}
                      onChange={(v) => {
                        let past = [...editComponentes];
                        past[index - 1].medios = v.target.checked;
                        setEditComponentes(past);
                      }}
                    />
                  </Grid>
                )}

                <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                  <Typography
                    sx={{
                      fontFamily: "MontserratMedium",

                      textTransform: "uppercase",
                    }}
                  >
                    Medios de Verificación:
                  </Typography>
                </Grid>

                <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                  <Typography sx={{ fontFamily: "MontserratLight" }}>
                    {v?.medios}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                item
                container
                xl={11}
                lg={11}
                md={12}
                sm={12}
                xs={12}
                sx={{
                  display: "flex",
                  flexDirection: "row",

                  //mt: 1,
                  alignItems: "center",
                  borderBottom: 1,
                  borderColor: "#cfcfcf",
                }}
              >
                {localStorage.getItem("Rol") !== "Administrador" ? null : (
                  <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                    <Checkbox
                      value={editComponentes[index - 1]?.supuestos}
                      onChange={(v) => {
                        let past = [...editComponentes];
                        past[index - 1].supuestos = v.target.checked;
                        setEditComponentes(past);
                      }}
                    />
                  </Grid>
                )}
                <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                  <Typography
                    sx={{
                      fontFamily: "MontserratMedium",
                      width: "20%",
                      textTransform: "uppercase",
                    }}
                  >
                    Supuestos:
                  </Typography>
                </Grid>
                <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
                    {v?.supuestos}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          );
        })}

        <Grid
          item
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            //display: "flex",
            //flexDirection: "row",

            //mt: 1,
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          <Typography
            sx={{
              fontFamily: "MontserratBold",
              borderBottom: 1,
              mt: 1,
              textTransform: "uppercase",
            }}
          >
            Actividades
          </Typography>
        </Grid>

        {valoresComponenteActividad.map((comps, index) => {
          return comps.map((acts, index2) => {
            return (
              <Grid
                item
                container
                xl={11}
                lg={11}
                md={12}
                sm={12}
                xs={12}
                sx={{
                  display: "flex",
                  flexDirection: "row",

                  //mb: 1,
                  alignItems: "center",
                  borderBottom: 1,
                  borderColor: "#cfcfcf",
                }}
                key={Math.random()}
              >
                <Grid item>
                  <Typography
                    sx={{
                      fontFamily: "MontserratMedium",
                      borderBottom: 1,
                      mt: 1,
                      textAlign: "center",
                      textTransform: "uppercase",
                    }}
                  >
                    Actividad {index2 + 1} Componente {index + 1}
                  </Typography>
                </Grid>

                <Grid
                  item
                  container
                  xl={11}
                  lg={11}
                  md={12}
                  sm={12}
                  xs={12}
                  sx={{
                    display: "flex",
                    flexDirection: "row",

                    //mt: 1,
                    alignItems: "center",
                    borderBottom: 1,
                    borderColor: "#cfcfcf",
                  }}
                >
                  {localStorage.getItem("Rol") !== "Administrador" ? null : (
                    <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                      <Checkbox
                        value={!editComponentes[index - 1]?.resumen}
                        onChange={(v) => {
                          let past = [...editComponentes];
                          past[index - 1].resumen = v.target.checked;
                          setEditComponentes(past);
                        }}
                      />
                    </Grid>
                  )}
                  <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                    <Typography
                      sx={{
                        fontFamily: "MontserratMedium",

                        textTransform: "uppercase",
                      }}
                    >
                      Resumen Narrativo:
                    </Typography>
                  </Grid>
                  <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
                    <Typography sx={{ fontFamily: "MontserratLight" }}>
                      {valoresComponenteActividad[index][index2]?.resumen}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  xl={11}
                  lg={11}
                  md={12}
                  sm={12}
                  xs={12}
                  sx={{
                    display: "flex",
                    flexDirection: "row",

                    //mt: 1,
                    alignItems: "center",
                    borderBottom: 1,
                    borderColor: "#cfcfcf",
                  }}
                >
                  {localStorage.getItem("Rol") !== "Administrador" ? null : (
                    <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                      <Checkbox
                        value={!editComponentes[index - 1]?.indicador}
                        onChange={(v) => {
                          let past = [...editComponentes];
                          past[index - 1].indicador = v.target.checked;
                          setEditComponentes(past);
                        }}
                      />
                    </Grid>
                  )}
                  <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                    <Typography
                      sx={{
                        fontFamily: "MontserratMedium",

                        textTransform: "uppercase",
                      }}
                    >
                      Indicador:
                    </Typography>
                  </Grid>

                  <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
                    <Typography sx={{ fontFamily: "MontserratLight" }}>
                      {valoresComponenteActividad[index][index2]?.indicador}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  xl={11}
                  lg={11}
                  md={12}
                  sm={12}
                  xs={12}
                  sx={{
                    display: "flex",
                    flexDirection: "row",

                    //mt: 1,
                    alignItems: "center",
                    borderBottom: 1,
                    borderColor: "#cfcfcf",
                  }}
                >
                  {localStorage.getItem("Rol") !== "Administrador" ? null : (
                    <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                      <Checkbox
                        value={!editComponentes[index - 1]?.formula}
                        onChange={(v) => {
                          let past = [...editComponentes];
                          past[index - 1].formula = v.target.checked;
                          setEditComponentes(past);
                        }}
                      />
                    </Grid>
                  )}
                  <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                    <Typography
                      sx={{
                        fontFamily: "MontserratMedium",

                        textTransform: "uppercase",
                      }}
                    >
                      Fórmula:
                    </Typography>
                  </Grid>

                  <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
                    <Typography sx={{ fontFamily: "MontserratLight" }}>
                      {valoresComponenteActividad[index][index2]?.formula}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  xl={11}
                  lg={11}
                  md={12}
                  sm={12}
                  xs={12}
                  sx={{
                    display: "flex",
                    flexDirection: "row",

                    //mt: 1,
                    alignItems: "center",
                    borderBottom: 1,
                    borderColor: "#cfcfcf",
                  }}
                >
                  {localStorage.getItem("Rol") !== "Administrador" ? null : (
                    <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                      <Checkbox
                        value={!editComponentes[index - 1]?.frecuencia}
                        onChange={(v) => {
                          let past = [...editComponentes];
                          past[index - 1].frecuencia = v.target.checked;
                          setEditComponentes(past);
                        }}
                      />
                    </Grid>
                  )}
                  <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                    <Typography
                      sx={{
                        fontFamily: "MontserratMedium",

                        textTransform: "uppercase",
                      }}
                    >
                      Frecuencia:
                    </Typography>
                  </Grid>

                  <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
                    <Typography sx={{ fontFamily: "MontserratLight" }}>
                      {valoresComponenteActividad[index][index2]?.frecuencia}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  xl={11}
                  lg={11}
                  md={12}
                  sm={12}
                  xs={12}
                  sx={{
                    display: "flex",
                    flexDirection: "row",

                    //mt: 1,
                    alignItems: "center",
                    borderBottom: 1,
                    borderColor: "#cfcfcf",
                  }}
                >
                  {localStorage.getItem("Rol") !== "Administrador" ? null : (
                    <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                      <Checkbox
                        value={!editComponentes[index - 1]?.medios}
                        onChange={(v) => {
                          let past = [...editComponentes];
                          past[index - 1].medios = v.target.checked;
                          setEditComponentes(past);
                        }}
                      />
                    </Grid>
                  )}

                  <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                    <Typography
                      sx={{
                        fontFamily: "MontserratMedium",

                        textTransform: "uppercase",
                      }}
                    >
                      Medios de Verificación:
                    </Typography>
                  </Grid>

                  <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
                    <Typography sx={{ fontFamily: "MontserratLight" }}>
                      {valoresComponenteActividad[index][index2]?.medios}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  xl={11}
                  lg={11}
                  md={12}
                  sm={12}
                  xs={12}
                  sx={{
                    display: "flex",
                    flexDirection: "row",

                    //mt: 1,
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

                  <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                    <Typography
                      sx={{
                        fontFamily: "MontserratMedium",

                        textTransform: "uppercase",
                      }}
                    >
                      Supuestos:
                    </Typography>
                  </Grid>

                  <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
                    <Typography sx={{ fontFamily: "MontserratLight" }}>
                      {valoresComponenteActividad[index][index2]?.supuestos}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            );
          });
        })}
      </Grid>

      <Grid
         item
         xl={12}
         lg={12}
         md={12}
         sm={12}
         xs={12}
         sx={{
          ...(isSmallScreen && {
            display: 'flex',
            // Otros estilos específicos para pantallas pequeñas
          }),
           //flexDirection: "row",

           //mt: 1,
           alignItems: "center",
           justifyContent: "center",

           borderBottom: 1,
           borderColor: "#cfcfcf",
         }}
      >
        <Grid sx={{justifyContent: "center",display: "flex",}}  item xl={3} lg={3} md={3} sm={12} xs={12}>
          <Button
            sx={queries.buttonCancelarSolicitudInscripcion}
            onClick={() => showResume()}
          >
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              Cancelar
            </Typography>
          </Button>
        </Grid>

        <Grid sx={{justifyContent: "center",display: "flex",}}  item xl={3} lg={3} md={3} sm={12} xs={12}>
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
        </Grid>

        <Grid sx={{justifyContent: "center",display: "flex",}}  item xl={3} lg={3} md={3} sm={12} xs={12}>
          <Button
            sx={queries.buttonContinuarSolicitudInscripcion}
            onClick={() => {
              let estado = "";
              if (localStorage.getItem("Rol") === "Capturador") {
                estado = "En Captura";
              }
              if (localStorage.getItem("Rol") === "Verificador") {
                estado = "Borrador Verificador";
              }
              if (localStorage.getItem("Rol") === "Administrador") {
                estado = "Borrador Autorizador";
              }
              console.log("Boton Guardar Borrador y estado: ", estado);

              checkMir(estado);
            }}
            //al menos un opcion
          >
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              Guardar borrador
            </Typography>
          </Button>
        </Grid>

        <Grid sx={{justifyContent: "center",display: "flex",}}  item xl={3} lg={3} md={3} sm={12} xs={12}>
          <Button
            sx={queries.buttonContinuarSolicitudInscripcion}
            onClick={() => {
              setOpenModalEnviar(true);
            }}
          >
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              {localStorage.getItem("Rol") === "Administrador"
                ? "Autorizar"
                : "Enviar"}
            </Typography>
          </Button>
        </Grid>

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
      </Grid>
    </Grid>
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
