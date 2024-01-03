import { Grid, Button, Checkbox, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ModalEnviarMIR from "../modalsMIR/ModalEnviarMIR";
import ModalSolicitaModif from "../modalsMIR/ModalSolicitaModif";
import {
  IActividad,
  ILista,
  IMIR,
  IMIREdit,
  IMovimientos,
} from "./interfaces mir/IMIR";
import { queries } from "../../queries";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { alertaError, alertaExito } from "../genericComponents/Alertas";

export function TabResumen({
  MIRPADRE,
  showResume,
  idMir,
  estadoMIR,
  mDocumentos,
  mirEdit,
  setMIREDITPADRE,
}: {
  MIRPADRE: IMIR;
  showResume: Function;
  idMir: string;
  estadoMIR: string;
  mDocumentos: IMovimientos[];
  mirEdit: IMIREdit;
  setMIREDITPADRE: Function;
}) {
  const [MIR, setMIR] = useState<IMIR>(MIRPADRE);
  const theme = useTheme();

  const [valoresComponenteActividad, setValoresComponenteActividad] = useState<
    Array<Array<IActividad>>
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
    let n: Array<Array<IActividad>> = [];
    let indexActividades = 0;
    MIRPADRE.componentes.map((v, index) => {
      let aux: Array<IActividad> = [];
      indexActividades = 0;
      v.actividades.map((x) => {
        aux.push(MIRPADRE.componentes[index].actividades[indexActividades]);
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
        
        showResume();
        alertaExito(()=>{},r.data.data.message)
      })
      .catch((err) => {
        if (err.response.status === 409) {
          // Toast.fire({
          //   icon: "error",
          //   title: err.response.data.result.error,
          // });
          alertaError(err.response.data.result.error)
        }
      });
  };

  useEffect(() => {
    setMIR(MIRPADRE);
  }, [MIRPADRE, idMir]);

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
    medios: true,
    supuestos: true,
  });

  const [editComponentes, setEditComponentes] = useState<
    Array<IComponenteMirEdit>
  >([]);
  // {
  //   componentes: "C1",
  //   formula: true,
  //   frecuencia: true,
  //   indicador: true,
  //   medios: true,
  //   resumen: true,
  //   supuestos: true,
  //   actividades: [
  //     {
  //       actividad: "A1",
  //       formula: true,
  //       frecuencia: true,
  //       indicador: true,
  //       medios: true,
  //       resumen: true,
  //       supuestos: true,
  //     },
  //     {
  //       actividad: "A2",
  //       formula: true,
  //       frecuencia: true,
  //       indicador: true,
  //       medios: true,
  //       resumen: true,
  //       supuestos: true,
  //     },
  //   ],
  // },
  // {
  //   componentes: "C2",
  //   formula: true,
  //   frecuencia: true,
  //   indicador: true,
  //   medios: true,
  //   resumen: true,
  //   supuestos: true,
  //   actividades: [
  //     {
  //       actividad: "A1",
  //       formula: true,
  //       frecuencia: true,
  //       indicador: true,
  //       medios: true,
  //       resumen: true,
  //       supuestos: true,
  //     },
  //     {
  //       actividad: "A2",
  //       formula: true,
  //       frecuencia: true,
  //       indicador: true,
  //       medios: true,
  //       resumen: true,
  //       supuestos: true,
  //     },
  //   ],
  // },

  //   const [editComponentes, setEditComponentes] = useState<
  //   Array<IComponenteMirEdit>
  // >([]);

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

      //setEditComponentes(arrayComponentes)
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

  const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));

  const RestructuraMAyFT = () => {};

  //const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid
      // visibility={show ? "visible" : "hidden"}

      position="absolute"
      sx={{
        // display: "flex",
        width: "93vw",
        height: "82vh",
        boxShadow: 10,
        borderRadius: 5,
        // alignItems: "center",
        // justifyItems: "center",
        flexDirection: "column",
        backgroundColor: "#fff",
        ...(!isSmallScreen && {
          height: "85%",
          overflow: "auto",
          // Otros estilos específicos para pantallas pequeñas
        }),
      }}
    >
      <Grid
        item
        container
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        display={"flex"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
        sx={{
          ...(isSmallScreen && {
            height: "85%",
            overflow: "auto",
            // Otros estilos específicos para pantallas pequeñas
          }),
        }}
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
                value={mirEdit.encabezado.ejercicioFiscal}
                onChange={(v) => {
                  let aux = mirEdit.encabezado;
                  aux = { ...aux, ejercicioFiscal: v.target.checked };
                  setMIREDITPADRE({ ...mirEdit, encabezado: aux });
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

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
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
                value={mirEdit.encabezado?.institucion}
                onChange={(v) => {
                  let aux = mirEdit.encabezado;
                  aux = { ...aux, institucion: v.target.checked };
                  setMIREDITPADRE({ ...mirEdit, encabezado: aux });
                }}
                // onChange={(v) => {
                //   setEditEncabezado({
                //     ...editEncabezado,
                //     institucion: !v.target.checked,
                //   });
                // }}
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
                // value={editEncabezado.nombre_del_programa}
                value={mirEdit.encabezado?.nombre_del_programa}
                onChange={(v) => {
                  let aux = mirEdit.encabezado;
                  aux = { ...aux, nombre_del_programa: v.target.checked };
                  setMIREDITPADRE({ ...mirEdit, encabezado: aux });
                }}
                // onChange={(v) => {
                //   setEditEncabezado({
                //     ...editEncabezado,
                //     nombre_del_programa: !v.target.checked,
                //   });
                // }}
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
                // value={editEncabezado.eje}
                value={mirEdit.encabezado?.eje}
                onChange={(v) => {
                  let aux = mirEdit.encabezado;
                  aux = { ...aux, eje: v.target.checked };
                  setMIREDITPADRE({ ...mirEdit, encabezado: aux });
                }}
                // onChange={(v) => {
                //   setEditEncabezado({
                //     ...editEncabezado,
                //     eje: !v.target.checked,
                //   });
                // }}
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
                // value={editEncabezado.tema}
                value={mirEdit.encabezado?.tema}
                onChange={(v) => {
                  let aux = mirEdit.encabezado;
                  aux = { ...aux, tema: v.target.checked };
                  setMIREDITPADRE({ ...mirEdit, encabezado: aux });
                }}
                // onChange={(v) => {
                //   setEditEncabezado({
                //     ...editEncabezado,
                //     tema: !v.target.checked,
                //   });
                // }}
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
                // value={editEncabezado.objetivo}
                value={mirEdit.encabezado?.objetivo}
                onChange={(v) => {
                  let aux = mirEdit.encabezado;
                  aux = { ...aux, objetivo: v.target.checked };
                  setMIREDITPADRE({ ...mirEdit, encabezado: aux });
                }}
                // onChange={(v) => {
                //   setEditEncabezado({
                //     ...editEncabezado,
                //     objetivo: !v.target.checked,
                //   });
                // }}
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
                // value={editEncabezado.estrategia}
                value={mirEdit.encabezado?.estrategia}
                onChange={(v) => {
                  let aux = mirEdit.encabezado;
                  aux = { ...aux, estrategia: v.target.checked };
                  setMIREDITPADRE({ ...mirEdit, encabezado: aux });
                }}
                // onChange={(v) => {
                //   setEditEncabezado({
                //     ...editEncabezado,
                //     estrategia: !v.target.checked,
                //   });
                // }}
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
                // value={editEncabezado.beneficiario}
                value={mirEdit.encabezado?.beneficiario}
                onChange={(v) => {
                  let aux = mirEdit.encabezado;
                  aux = { ...aux, beneficiario: v.target.checked };
                  setMIREDITPADRE({ ...mirEdit, encabezado: aux });
                }}
                // onChange={(v) => {
                //   setEditEncabezado({
                //     ...editEncabezado,
                //     beneficiario: !v.target.checked,
                //   });
                // }}
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
                // value={editEncabezado.lineas_de_accion}
                value={mirEdit.encabezado?.lineas_de_accion}
                onChange={(v) => {
                  let aux = mirEdit.encabezado;
                  aux = { ...aux, lineas_de_accion: v.target.checked };
                  setMIREDITPADRE({ ...mirEdit, encabezado: aux });
                }}
                // onChange={(v) => {
                //   setEditEncabezado({
                //     ...editEncabezado,
                //     lineas_de_accion: !v.target.checked,
                //   });
                // }}
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
                // value={editFin.resumen}
                value={mirEdit.fin?.resumen}
                // onChange={(v) => {
                //   setEditFin({ ...editFin, resumen: !v.target.checked });
                // }}
                onChange={(v) => {
                  let aux = mirEdit.fin;
                  aux = { ...aux, resumen: v.target.checked };
                  setMIREDITPADRE({ ...mirEdit, fin: aux });
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
                // value={editFin.indicador}
                value={mirEdit.fin?.indicador}
                onChange={(v) => {
                  let aux = mirEdit.fin;
                  aux = { ...aux, indicador: v.target.checked };
                  setMIREDITPADRE({ ...mirEdit, fin: aux });
                }}
                // onChange={(v) => {
                //   setEditFin({ ...editFin, indicador: !v.target.checked });
                // }}
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
                // value={editFin.formula}
                value={mirEdit.fin?.formula}
                onChange={(v) => {
                  let aux = mirEdit.fin;
                  aux = { ...aux, formula: v.target.checked };
                  setMIREDITPADRE({ ...mirEdit, fin: aux });
                }}
                // onChange={(v) => {
                //   setEditFin({ ...editFin, formula: !v.target.checked });
                // }}
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
                // value={editFin.frecuencia}
                value={mirEdit.fin?.frecuencia}
                onChange={(v) => {
                  let aux = mirEdit.fin;
                  aux = { ...aux, frecuencia: v.target.checked };
                  setMIREDITPADRE({ ...mirEdit, fin: aux });
                }}
                // onChange={(v) => {
                //   setEditFin({ ...editFin, frecuencia: !v.target.checked });
                // }}
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
                // value={editFin.medios}
                value={mirEdit.fin?.medios}
                onChange={(v) => {
                  let aux = mirEdit.fin;
                  aux = { ...aux, medios: v.target.checked };
                  setMIREDITPADRE({ ...mirEdit, fin: aux });
                }}
                // onChange={(v) => {
                //   setEditFin({ ...editFin, medios: !v.target.checked });
                // }}
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
                // value={editFin.supuestos}
                value={mirEdit.fin?.supuestos}
                onChange={(v) => {
                  let aux = mirEdit.fin;
                  aux = { ...aux, supuestos: v.target.checked };
                  setMIREDITPADRE({ ...mirEdit, fin: aux });
                }}
                // onChange={(v) => {
                //   setEditFin({ ...editFin, supuestos: !v.target.checked });
                // }}
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
                // value={editProposito.resumen}
                value={mirEdit.proposito?.resumen}
                onChange={(v) => {
                  let aux = mirEdit.proposito;
                  aux = { ...aux, resumen: v.target.checked };
                  setMIREDITPADRE({ ...mirEdit, proposito: aux });
                }}
                // onChange={(v) => {
                //   setEditProposito({
                //     ...editProposito,
                //     resumen: !v.target.checked,
                //   });
                // }}
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
                // value={editProposito.indicador}
                value={mirEdit.proposito?.indicador}
                onChange={(v) => {
                  let aux = mirEdit.proposito;
                  aux = { ...aux, indicador: v.target.checked };
                  setMIREDITPADRE({ ...mirEdit, proposito: aux });
                }}
                // onChange={(v) => {
                //   setEditProposito({
                //     ...editProposito,
                //     indicador: !v.target.checked,
                //   });
                // }}
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
            <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
              <Checkbox
                // value={editProposito.formula}
                value={mirEdit.proposito?.formula}
                onChange={(v) => {
                  let aux = mirEdit.proposito;
                  aux = { ...aux, formula: v.target.checked };
                  setMIREDITPADRE({ ...mirEdit, proposito: aux });
                }}
                // onChange={(v) => {
                //   setEditProposito({
                //     ...editProposito,
                //     formula: !v.target.checked,
                //   });
                // }}
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
            <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
              <Checkbox
                // value={editProposito.frecuencia}
                value={mirEdit.proposito?.frecuencia}
                onChange={(v) => {
                  let aux = mirEdit.proposito;
                  aux = { ...aux, frecuencia: v.target.checked };
                  setMIREDITPADRE({ ...mirEdit, proposito: aux });
                }}
                // onChange={(v) => {
                //   setEditProposito({
                //     ...editProposito,
                //     frecuencia: !v.target.checked,
                //   });
                // }}
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
            <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
              <Checkbox
                // value={editProposito.medios}
                value={mirEdit.proposito?.medios}
                onChange={(v) => {
                  let aux = mirEdit.proposito;
                  aux = { ...aux, medios: v.target.checked };
                  setMIREDITPADRE({ ...mirEdit, proposito: aux });
                }}
                // onChange={(v) => {
                //   setEditProposito({
                //     ...editProposito,
                //     medios: !v.target.checked,
                //   });
                // }}
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
            <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
              <Checkbox
                // value={editProposito.supuestos}
                value={mirEdit.proposito?.supuestos}
                onChange={(v) => {
                  let aux = mirEdit.proposito;
                  aux = { ...aux, supuestos: v.target.checked };
                  setMIREDITPADRE({ ...mirEdit, proposito: aux });
                }}
                // onChange={(v) => {
                //   setEditProposito({
                //     ...editProposito,
                //     supuestos: !v.target.checked,
                //   });
                // }}
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
              <Grid item xl={11} lg={11} md={12} sm={12} xs={12}>
                <Typography
                  sx={{
                    fontFamily: "MontserratMedium",
                    borderBottom: 1,

                    // textAlign: "center",
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
                  whiteSpace: "pre-wrap",
                  alignItems: "center",
                  borderBottom: 1,
                  borderColor: "#cfcfcf",
                }}
              >
                {localStorage.getItem("Rol") !== "Administrador" ? null : (
                  <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                    <Checkbox
                      // value={editComponentes[index]?.resumen}
                      // onChange={(v) => {
                      //   let past = [...editComponentes];
                      //   past[index].resumen = !v.target.checked;
                      //   setEditComponentes(past);
                      // }}

                      // value={mirEdit.componentes[index]?.resumen}
                      value={mirEdit.componentes[index]?.resumen}
                      // onChange={(v) => {
                      //   let aux = mirEdit.componentes[index]
                      //   aux = {...aux, resumen: v.target.checked }
                      //   setMIREDITPADRE({...mirEdit, componentes: aux  })
                      // }}
                      // onChange={(v) => {
                      //   let aux = mirEdit.componentes[index]
                      //   aux = {...aux, resumen: v.target.checked }
                      //   setMIREDITPADRE({...mirEdit, componentes: aux  })
                      // }}
                      onChange={(v) => {
                        let auxC = mirEdit.componentes;
                        auxC[index].resumen = v.target.checked;
                        setMIREDITPADRE({ ...mirEdit, componentes: auxC });
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
                  <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                    <Checkbox
                      // value={editComponentes[index]?.indicador}
                      value={mirEdit.componentes[index]?.indicador}
                      onChange={(v) => {
                        let auxC = mirEdit.componentes;
                        auxC[index].indicador = v.target.checked;
                        setMIREDITPADRE({ ...mirEdit, componentes: auxC });
                      }}
                      // onChange={(v) => {
                      //   let past = [...editComponentes];
                      //   past[index].indicador = !v.target.checked;
                      //   setEditComponentes(past);
                      // }}
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
                  <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                    <Checkbox
                      // value={editComponentes[index]?.formula}
                      value={mirEdit.componentes[index]?.formula}
                      onChange={(v) => {
                        let auxC = mirEdit.componentes;
                        auxC[index].formula = v.target.checked;
                        setMIREDITPADRE({ ...mirEdit, componentes: auxC });
                      }}
                      // onChange={(v) => {
                      //   let past = [...editComponentes];
                      //   past[index].formula = !v.target.checked;
                      //   setEditComponentes(past);
                      // }}
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
                  <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                    <Checkbox
                      // value={editComponentes[index]?.frecuencia}
                      value={mirEdit.componentes[index]?.frecuencia}
                      onChange={(v) => {
                        let auxC = mirEdit.componentes;
                        auxC[index].frecuencia = v.target.checked;
                        setMIREDITPADRE({ ...mirEdit, componentes: auxC });
                      }}
                      // onChange={(v) => {
                      //   let past = [...editComponentes];
                      //   past[index].frecuencia = !v.target.checked;
                      //   setEditComponentes(past);
                      // }}
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
                  <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                    <Checkbox
                      // value={editComponentes[index]?.medios}
                      value={mirEdit.componentes[index]?.medios}
                      onChange={(v) => {
                        let auxC = mirEdit.componentes;
                        auxC[index].medios = v.target.checked;
                        setMIREDITPADRE({ ...mirEdit, componentes: auxC });
                      }}
                      // onChange={(v) => {
                      //   let past = [...editComponentes];
                      //   past[index].medios = !v.target.checked;
                      //   setEditComponentes(past);
                      // }}
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
                  <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                    <Checkbox
                      // value={editComponentes[index]?.supuestos}
                      value={mirEdit.componentes[index]?.supuestos}
                      onChange={(v) => {
                        let auxC = mirEdit.componentes;
                        auxC[index].supuestos = v.target.checked;
                        setMIREDITPADRE({ ...mirEdit, componentes: auxC });
                      }}
                      // onChange={(v) => {
                      //   let past = [...editComponentes];
                      //   past[index].supuestos = !v.target.checked;
                      //   setEditComponentes(past);
                      // }}
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
                <Grid item xl={11} lg={11} md={12} sm={12} xs={12}>
                  <Typography
                    sx={{
                      fontFamily: "MontserratMedium",
                      borderBottom: 1,
                      mt: 1,
                      // textAlign: "center",
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
                    <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                      <Checkbox
                        checked={
                          mirEdit.componentes[index]?.actividades[index2]
                            ?.resumen
                        }
                        onChange={(v) => {
                          let auxC = mirEdit.componentes;

                          auxC[index].actividades[index2].resumen =
                            v.target.checked;
                          setMIREDITPADRE({ ...mirEdit, componentes: auxC });
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
                    <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                      <Checkbox
                        // value={!editComponentes[index - 1]?.indicador}
                        checked={
                          mirEdit.componentes[index]?.actividades[index2]
                            ?.indicador
                        }
                        onChange={(v) => {
                          let auxC = mirEdit.componentes;
                          auxC[index].actividades[index2].indicador =
                            v.target.checked;
                          setMIREDITPADRE({ ...mirEdit, componentes: auxC });
                        }}
                        // onChange={(v) => {
                        //   let past = [...editComponentes];
                        //   past[index - 1].indicador = !v.target.checked;
                        //   setEditComponentes(past);
                        // }}
                      />
                    </Grid>
                  )}
                  <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
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
                    <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                      <Checkbox
                        // value={!editComponentes[index - 1]?.formula}
                        checked={
                          mirEdit.componentes[index]?.actividades[index2]
                            ?.formula
                        }
                        onChange={(v) => {
                          let auxC = mirEdit.componentes;
                          auxC[index].actividades[index2].formula =
                            v.target.checked;
                          setMIREDITPADRE({ ...mirEdit, componentes: auxC });
                        }}
                        // onChange={(v) => {
                        //   let past = [...editComponentes];
                        //   past[index - 1].formula = !v.target.checked;
                        //   setEditComponentes(past);
                        // }}
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
                    <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                      <Checkbox
                        // value={!editComponentes[index - 1]?.frecuencia}
                        checked={
                          mirEdit.componentes[index]?.actividades[index2]
                            ?.frecuencia
                        }
                        onChange={(v) => {
                          let auxC = mirEdit.componentes;
                          auxC[index].actividades[index2].frecuencia =
                            v.target.checked;
                          setMIREDITPADRE({ ...mirEdit, componentes: auxC });
                        }}
                        // onChange={(v) => {
                        //   let past = [...editComponentes];
                        //   past[index - 1].frecuencia = !v.target.checked;
                        //   setEditComponentes(past);
                        // }}
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
                    <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                      <Checkbox
                        // value={!editComponentes[index - 1]?.medios}
                        checked={
                          mirEdit.componentes[index]?.actividades[index2]
                            ?.medios
                        }
                        onChange={(v) => {
                          let auxC = mirEdit.componentes;
                          auxC[index].actividades[index2].medios =
                            v.target.checked;
                          setMIREDITPADRE({ ...mirEdit, componentes: auxC });
                        }}
                        // onChange={(v) => {
                        //   let past = [...editComponentes];
                        //   past[index - 1].medios = !v.target.checked;
                        //   setEditComponentes(past);
                        // }}
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
                    <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                      <Checkbox
                        // value={!editComponentes[index - 1]?.supuestos}
                        checked={
                          mirEdit.componentes[index]?.actividades[index2]
                            ?.supuestos
                        }
                        onChange={(v) => {
                          let auxC = mirEdit.componentes;
                          auxC[index].actividades[index2].supuestos =
                            v.target.checked;
                          setMIREDITPADRE({ ...mirEdit, componentes: auxC });
                        }}
                        // onChange={(v) => {
                        //   let past = [...editComponentes];
                        //   past[index - 1].supuestos = !v.target.checked;
                        //   setEditComponentes(past);
                        // }}
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
            display: "flex",
            // Otros estilos específicos para pantallas pequeñas
          }),
          //flexDirection: "row",

          //mt: 1,
          alignItems: "center",
          justifyContent: "center",

          borderBottom: 1,
          borderColor: "#cfcfcf",

          ...(isSmallScreen && {
            height: "15%",
          }),
        }}
      >
        <Grid
          sx={{ justifyContent: "center", display: "flex" }}
          item
          xl={3}
          lg={3}
          md={3}
          sm={12}
          xs={12}
        >
          <Button
            //sx={queries.buttonCancelarSolicitudInscripcion}
            className="cancelar"
            onClick={() => showResume()}
          >
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              Cancelar
            </Typography>
          </Button>
        </Grid>

        <Grid
          sx={{ justifyContent: "center", display: "flex" }}
          item
          xl={3}
          lg={3}
          md={3}
          sm={12}
          xs={12}
        >
          <Button
            disabled={
              disablebutton &&
              disablebutton2 &&
              disablebutton3 &&
              disablebuttoncomponentes &&
              disablebuttonactividades &&
              localStorage.getItem("Rol") === "Capturador"
            }
            className="aceptar"
            //sx={buttonStyles}
            onClick={() => setOpenModalSolicitarModif(true)}
          >
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              Solicitar Modificación
            </Typography>
          </Button>
        </Grid>

        <Grid
          sx={{ justifyContent: "center", display: "flex" }}
          item
          xl={3}
          lg={3}
          md={3}
          sm={12}
          xs={12}
        >
          <Button
            className="aceptar"
            //sx={queries.buttonContinuarSolicitudInscripcion}
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

              checkMir(estado);
            }}
            //al menos un opcion
          >
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              Guardar borrador
            </Typography>
          </Button>
        </Grid>

        <Grid
          sx={{ justifyContent: "center", display: "flex" }}
          item
          xl={3}
          lg={3}
          md={3}
          sm={12}
          xs={12}
        >
          <Button
            //sx={queries.buttonContinuarSolicitudInscripcion}
            className="aceptar"
            onClick={() => {
              setOpenModalEnviar(true);
            }}
          >
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              {localStorage.getItem("Rol") === "Administrador"
                ? estadoMIR === "Autorizada"
                  ? "Modificar mir autorizada"
                  : "Autorizar"
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
            JSON.stringify(mirEdit)
          }
        />

        <ModalEnviarMIR
          showResume={showResume}
          open={openModalEnviar}
          handleClose={setOpenModalEnviar}
          MIR={JSON.stringify(MIR)}
          IdMir={idMir}
          estadoMIR={estadoMIR}
          RestructuraMAyFT={RestructuraMAyFT}
          mDocumentos={mDocumentos}
        />
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
  medios: boolean;
  supuestos: boolean;
}

export interface IComponenteMirEdit {
  componente: string;
  resumen: boolean;
  indicador: boolean;
  formula: boolean;
  frecuencia: boolean;
  medios: boolean;
  supuestos: boolean;
  actividades: IActividadesMirEdit[];
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
