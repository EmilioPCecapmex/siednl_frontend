import {
  Grid,
  TextField,
  ListItemButton,
  Typography,
  Divider,
  List,
  Box,
  Paper,
  styled,
  Tooltip,
  Button,
  Checkbox,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
//import ModalEnviarFT from "../modalsFT/ModalEnviarFT";
import ModalsSolicitModifFT from "../modalsFT/ModalsSolicitModifFT";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { queries } from "../../queries";
import {
  IActividadesRF,
  IAvanceFinancieroRF,
  IComponenteRF,
  IFinRF,
  IPropositoRF,
  IRF,
  IRFEdit,
} from "./interfacesRaffi";
import { IMIR } from "../tabsMir/interfaces mir/IMIR";
import ModalEnviarRF from "../modalsRF/ModalEnviarRF";
import ModalSolicitaModifRF from "../modalsRF/ModalSolicitaModifRAFFI";

export const TabResumenRF = ({
  IdMir,
  IdRF,
  IdMA,
  showResume,
  MIR,
  MA,
  Raffi,
  raffiboolean,
  setRaffiboolean,
}: {
  IdMir: string;
  IdRF: string;
  IdMA: string;
  MIR: string;
  MA: string;
  Raffi: IRF;
  raffiboolean: IRFEdit;
  setRaffiboolean: Function;
  showResume: Function;
}) => {
  const [openModalEnviar, setOpenModalEnviar] = useState(false);

  const handleCloseEnviar = () => {
    setOpenModalEnviar(false);
  };

  let jsonMIR: IMIR =
    MIR === ""
      ? ""
      : JSON.parse(MIR).length > 1
      ? JSON.parse(MIR)[0]
      : JSON.parse(MIR);

  const [openModalSolicitarModif, setOpenModalSolicitarModif] = useState(false);

  const handleCloseModif = () => {
    setOpenModalSolicitarModif(false);
  };

  const isCapturador = localStorage.getItem("Rol") === "Capturador";
  const buttonStyles = {
    ...queries.buttonContinuarSolicitudInscripcion,
    ...(isCapturador && {
      "&.Mui-disabled": {
        backgroundColor: "rgba(175, 140, 85, 0.6)",
        color: "white",
        "&:hover": {
          backgroundColor: "rgba(175, 140, 85, 0.6)",
        },
      },
    }),
  };

  const [RF, setRF] = useState<IRF>(Raffi);

  useEffect(() => {
    console.log("Raffi: ", Raffi);
  }, [Raffi]);

  let asignarRF = (componentesM: Array<IComponenteRF>) => {
    // setRF({
    //   componentes: componentesM,
    //   //actividades: actividadesM,
    // });
  };

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

  const creaRF = (estado: string) => {
    axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/create-Raffi",
        {
          Raffi: JSON.stringify(RF),
          CreadoPor: localStorage.getItem("IdUsuario"),
          //IdMir: IdMir,
          IdMa: IdMA,
          Estado: estado,
          Id: IdRF,
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
        console.log(err.response.data);
        
        Toast.fire({
          icon: "error",
          title: err.response.data.error,
        });
      });
  };

  let jsonMA =
    MA === ""
      ? ""
      : JSON.parse(MA).length > 1
      ? JSON.parse(MA)[0]
      : JSON.parse(MA);

  function mapeaindice(c = 0, a = 0) {
    let x = 0;
    //Componente 1
    c == 0 && a == 0
      ? (x = 0)
      : c == 0 && a == 1
      ? (x = 1)
      : c == 1 && a == 0
      ? (x = 2)
      : (x = 3);

    return x;
  }

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Grid
      sx={{
        //display: "flex",
        width: "93vw",
        height: "82vh",
        boxShadow: 10,
        borderRadius: 5,
        // alignItems: "center",
        // justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "#fff",
        ...(!isSmallScreen && {
          height: "85%",
          overflow: "auto",
          // Otros estilos específicos para pantallas pequeñas
        }),
      }}
    >
      {/* prueba
        {JSON.stringify(AFinanciero)} */}
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
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          <Typography
            sx={{ fontFamily: "MontserratBold", borderBottom: 1, mt: 5 }}
          >
            AVANCE FINANCIERO
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
              checked={raffiboolean?.avanceFinanciero?.valorProgramaPresupuestario}
              onChange={(v) => {
                let aux = raffiboolean?.avanceFinanciero;
                aux = { ...aux, valorProgramaPresupuestario: v.target.checked };
                setRaffiboolean({ ...raffiboolean, avanceFinanciero: aux });
              }}
              />
            </Grid>
          )}
          <Grid item xl={3} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              VALOR DEL PROGRAMA PRESUPUESTARIO
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {RF.avanceFinanciero.valorProgramaPresupuestario}
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
              checked={raffiboolean?.avanceFinanciero?.nombrePrograma}
                onChange={(v) => {
                  let aux = raffiboolean?.avanceFinanciero;
                  aux = { ...aux, nombrePrograma: v.target.checked };
                  setRaffiboolean({ ...raffiboolean, avanceFinanciero: aux });
                }}
              />
            </Grid>
          )}
          <Grid item xl={3} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              NOMBRE DEL PROGRAMA
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {jsonMIR.encabezado.programa.Label}
            </Typography>
          </Grid>
        </Grid>

        {/* ######################################################
            ############ DEVENGADO/MODIFICADO ########
            #########################################################*/}

        <Grid
          item
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          <Typography
            sx={{ fontFamily: "MontserratBold", borderBottom: 1, mt: 5 }}
          >
            AVANCE FINANCIERO - DEVENGADO/MODIFICADO
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
              // value={!editEncabezado.programaSER}
              // onChange={(v) => {
              //   setEditEncabezado({
              //     ...editEncabezado,
              //     programaSER: !v.target.checked,
              //   });
              // }}
              // value={!ftEditPadre.encabezado?.programaSER}
              // onChange={(v) => {
              //   let aux = ftEditPadre.encabezado;
              //   aux = { ...aux, programaSER: v.target.checked };
              //   setFTEditPadre({ ...ftEditPadre, encabezado: aux });
              // }}
              />
            </Grid>
          )}
          <Grid item xl={3} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              MONTO DEVENGADO/MODIFICADO T1
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {RF.avanceFinanciero.monto.devengadoModificado.t1.resultado}
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
                // value={!editEncabezado.programaSER}
                // onChange={(v) => {
                //   setEditEncabezado({
                //     ...editEncabezado,
                //     programaSER: !v.target.checked,
                //   });
                // }}
                // value={!ftEditPadre.encabezado?.programaSER}
                // onChange={(v) => {
                //   let aux = ftEditPadre.encabezado;
                //   aux = { ...aux, programaSER: v.target.checked };
                //   setFTEditPadre({ ...ftEditPadre, encabezado: aux });
                // }}
              />
            </Grid>
          )}
          <Grid item xl={3} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              MONTO DEVENGADO/MODIFICADO T2
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {RF.avanceFinanciero.monto.devengadoModificado.t2.resultado}
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
              // value={!editEncabezado.programaSER}
              // onChange={(v) => {
              //   setEditEncabezado({
              //     ...editEncabezado,
              //     programaSER: !v.target.checked,
              //   });
              // }}
              // value={!ftEditPadre.encabezado?.programaSER}
              // onChange={(v) => {
              //   let aux = ftEditPadre.encabezado;
              //   aux = { ...aux, programaSER: v.target.checked };
              //   setFTEditPadre({ ...ftEditPadre, encabezado: aux });
              // }}
              />
            </Grid>
          )}
          <Grid item xl={3} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              MONTO DEVENGADO/MODIFICADO T3
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {RF.avanceFinanciero.monto.devengadoModificado.t3.resultado}
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
              // value={!editEncabezado.programaSER}
              // onChange={(v) => {
              //   setEditEncabezado({
              //     ...editEncabezado,
              //     programaSER: !v.target.checked,
              //   });
              // }}
              // value={!ftEditPadre.encabezado?.programaSER}
              // onChange={(v) => {
              //   let aux = ftEditPadre.encabezado;
              //   aux = { ...aux, programaSER: v.target.checked };
              //   setFTEditPadre({ ...ftEditPadre, encabezado: aux });
              // }}
              />
            </Grid>
          )}
          <Grid item xl={3} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              MONTO DEVENGADO/MODIFICADO T4
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {RF.avanceFinanciero.monto.devengadoModificado.t4.resultado}
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
              // value={!editEncabezado.programaSER}
              // onChange={(v) => {
              //   setEditEncabezado({
              //     ...editEncabezado,
              //     programaSER: !v.target.checked,
              //   });
              // }}
              // value={!ftEditPadre.encabezado?.programaSER}
              // onChange={(v) => {
              //   let aux = ftEditPadre.encabezado;
              //   aux = { ...aux, programaSER: v.target.checked };
              //   setFTEditPadre({ ...ftEditPadre, encabezado: aux });
              // }}
              />
            </Grid>
          )}
          <Grid item xl={3} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              MONTO DEVENGADO/MODIFICADO CUENTA PUBLICA
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {RF.avanceFinanciero.monto.devengadoModificado.cuentaPublica}
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
              disabled={true}
              // value={!editEncabezado.programaSER}
              // onChange={(v) => {
              //   setEditEncabezado({
              //     ...editEncabezado,
              //     programaSER: !v.target.checked,
              //   });
              // }}
              // value={!ftEditPadre.encabezado?.programaSER}
              // onChange={(v) => {
              //   let aux = ftEditPadre.encabezado;
              //   aux = { ...aux, programaSER: v.target.checked };
              //   setFTEditPadre({ ...ftEditPadre, encabezado: aux });
              // }}
              />
            </Grid>
          )}
          <Grid item xl={3} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              PORCENTAJE DEVENGADO/MODIFICADO T1
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {RF.avanceFinanciero.porcentaje.porcentajeDevengadoModificado.pt1}
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
              disabled={true}
              // value={!editEncabezado.programaSER}
              // onChange={(v) => {
              //   setEditEncabezado({
              //     ...editEncabezado,
              //     programaSER: !v.target.checked,
              //   });
              // }}
              // value={!ftEditPadre.encabezado?.programaSER}
              // onChange={(v) => {
              //   let aux = ftEditPadre.encabezado;
              //   aux = { ...aux, programaSER: v.target.checked };
              //   setFTEditPadre({ ...ftEditPadre, encabezado: aux });
              // }}
              />
            </Grid>
          )}
          <Grid item xl={3} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              PORCENTAJE DEVENGADO/MODIFICADO T2
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {RF.avanceFinanciero.porcentaje.porcentajeDevengadoModificado.pt2}
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
              disabled={true}
              // value={!editEncabezado.programaSER}
              // onChange={(v) => {
              //   setEditEncabezado({
              //     ...editEncabezado,
              //     programaSER: !v.target.checked,
              //   });
              // }}
              // value={!ftEditPadre.encabezado?.programaSER}
              // onChange={(v) => {
              //   let aux = ftEditPadre.encabezado;
              //   aux = { ...aux, programaSER: v.target.checked };
              //   setFTEditPadre({ ...ftEditPadre, encabezado: aux });
              // }}
              />
            </Grid>
          )}
          <Grid item xl={3} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              PORCENTAJE DEVENGADO/MODIFICADO T3
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {RF.avanceFinanciero.porcentaje.porcentajeDevengadoModificado.pt3}
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
              disabled={true}
              // value={!editEncabezado.programaSER}
              // onChange={(v) => {
              //   setEditEncabezado({
              //     ...editEncabezado,
              //     programaSER: !v.target.checked,
              //   });
              // }}
              // value={!ftEditPadre.encabezado?.programaSER}
              // onChange={(v) => {
              //   let aux = ftEditPadre.encabezado;
              //   aux = { ...aux, programaSER: v.target.checked };
              //   setFTEditPadre({ ...ftEditPadre, encabezado: aux });
              // }}
              />
            </Grid>
          )}
          <Grid item xl={3} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              PORCENTAJE DEVENGADO/MODIFICADO T4
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {RF.avanceFinanciero.porcentaje.porcentajeDevengadoModificado.pt4}
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
              disabled={true}
              // value={!editEncabezado.programaSER}
              // onChange={(v) => {
              //   setEditEncabezado({
              //     ...editEncabezado,
              //     programaSER: !v.target.checked,
              //   });
              // }}
              // value={!ftEditPadre.encabezado?.programaSER}
              // onChange={(v) => {
              //   let aux = ftEditPadre.encabezado;
              //   aux = { ...aux, programaSER: v.target.checked };
              //   setFTEditPadre({ ...ftEditPadre, encabezado: aux });
              // }}
              />
            </Grid>
          )}
          <Grid item xl={3} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              PORCENTAJE DEVENGADO/MODIFICADO CUENTA PUBLICA
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {
                RF.avanceFinanciero.porcentaje.porcentajeDevengadoModificado
                  .porcentajeCuentaPublica
              }
            </Typography>
          </Grid>
        </Grid>

        {/* ######################################################
            ############ MODIFICADO/AUTORIZADO ########
            #########################################################*/}

        <Grid
          item
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          <Typography
            sx={{ fontFamily: "MontserratBold", borderBottom: 1, mt: 5 }}
          >
            AVANCE FINANCIERO - MODIFICADO/AUTORIZADO
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
              // value={!editEncabezado.programaSER}
              // onChange={(v) => {
              //   setEditEncabezado({
              //     ...editEncabezado,
              //     programaSER: !v.target.checked,
              //   });
              // }}
              // value={!ftEditPadre.encabezado?.programaSER}
              // onChange={(v) => {
              //   let aux = ftEditPadre.encabezado;
              //   aux = { ...aux, programaSER: v.target.checked };
              //   setFTEditPadre({ ...ftEditPadre, encabezado: aux });
              // }}
              />
            </Grid>
          )}
          <Grid item xl={3} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              MONTO MODIFICADO/AUTORIZADO T1
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {RF.avanceFinanciero.monto.modificadoAutorizado.t1.resultado}
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
              // value={!editEncabezado.programaSER}
              // onChange={(v) => {
              //   setEditEncabezado({
              //     ...editEncabezado,
              //     programaSER: !v.target.checked,
              //   });
              // }}
              // value={!ftEditPadre.encabezado?.programaSER}
              // onChange={(v) => {
              //   let aux = ftEditPadre.encabezado;
              //   aux = { ...aux, programaSER: v.target.checked };
              //   setFTEditPadre({ ...ftEditPadre, encabezado: aux });
              // }}
              />
            </Grid>
          )}
          <Grid item xl={3} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              MONTO MODIFICADO/AUTORIZADO T2
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {RF.avanceFinanciero.monto.modificadoAutorizado.t2.resultado}
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
              // value={!editEncabezado.programaSER}
              // onChange={(v) => {
              //   setEditEncabezado({
              //     ...editEncabezado,
              //     programaSER: !v.target.checked,
              //   });
              // }}
              // value={!ftEditPadre.encabezado?.programaSER}
              // onChange={(v) => {
              //   let aux = ftEditPadre.encabezado;
              //   aux = { ...aux, programaSER: v.target.checked };
              //   setFTEditPadre({ ...ftEditPadre, encabezado: aux });
              // }}
              />
            </Grid>
          )}
          <Grid item xl={3} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              MONTO MODIFICADO/AUTORIZADO T3
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {RF.avanceFinanciero.monto.modificadoAutorizado.t3.resultado}
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
              // value={!editEncabezado.programaSER}
              // onChange={(v) => {
              //   setEditEncabezado({
              //     ...editEncabezado,
              //     programaSER: !v.target.checked,
              //   });
              // }}
              // value={!ftEditPadre.encabezado?.programaSER}
              // onChange={(v) => {
              //   let aux = ftEditPadre.encabezado;
              //   aux = { ...aux, programaSER: v.target.checked };
              //   setFTEditPadre({ ...ftEditPadre, encabezado: aux });
              // }}
              />
            </Grid>
          )}
          <Grid item xl={3} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              MONTO MODIFICADO/AUTORIZADO T4
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {RF.avanceFinanciero.monto.modificadoAutorizado.t4.resultado}
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
              // value={!editEncabezado.programaSER}
              // onChange={(v) => {
              //   setEditEncabezado({
              //     ...editEncabezado,
              //     programaSER: !v.target.checked,
              //   });
              // }}
              // value={!ftEditPadre.encabezado?.programaSER}
              // onChange={(v) => {
              //   let aux = ftEditPadre.encabezado;
              //   aux = { ...aux, programaSER: v.target.checked };
              //   setFTEditPadre({ ...ftEditPadre, encabezado: aux });
              // }}
              />
            </Grid>
          )}
          <Grid item xl={3} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              MONTO MODIFICADO/AUTORIZADO CUENTA PUBLICA
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {RF.avanceFinanciero.monto.modificadoAutorizado.cuentaPublica}
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
              disabled={true}
              // value={!editEncabezado.programaSER}
              // onChange={(v) => {
              //   setEditEncabezado({
              //     ...editEncabezado,
              //     programaSER: !v.target.checked,
              //   });
              // }}
              // value={!ftEditPadre.encabezado?.programaSER}
              // onChange={(v) => {
              //   let aux = ftEditPadre.encabezado;
              //   aux = { ...aux, programaSER: v.target.checked };
              //   setFTEditPadre({ ...ftEditPadre, encabezado: aux });
              // }}
              />
            </Grid>
          )}
          <Grid item xl={3} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              PORCENTAJE MODIFICADO/AUTORIZADO T1
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {
                RF.avanceFinanciero.porcentaje.porcentajeModificadoAutorizado
                  .pt1
              }
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
              disabled={true}
              // value={!editEncabezado.programaSER}
              // onChange={(v) => {
              //   setEditEncabezado({
              //     ...editEncabezado,
              //     programaSER: !v.target.checked,
              //   });
              // }}
              // value={!ftEditPadre.encabezado?.programaSER}
              // onChange={(v) => {
              //   let aux = ftEditPadre.encabezado;
              //   aux = { ...aux, programaSER: v.target.checked };
              //   setFTEditPadre({ ...ftEditPadre, encabezado: aux });
              // }}
              />
            </Grid>
          )}
          <Grid item xl={3} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              PORCENTAJE MODIFICADO/AUTORIZADO T2
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {
                RF.avanceFinanciero.porcentaje.porcentajeModificadoAutorizado
                  .pt2
              }
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
              disabled={true}
              // value={!editEncabezado.programaSER}
              // onChange={(v) => {
              //   setEditEncabezado({
              //     ...editEncabezado,
              //     programaSER: !v.target.checked,
              //   });
              // }}
              // value={!ftEditPadre.encabezado?.programaSER}
              // onChange={(v) => {
              //   let aux = ftEditPadre.encabezado;
              //   aux = { ...aux, programaSER: v.target.checked };
              //   setFTEditPadre({ ...ftEditPadre, encabezado: aux });
              // }}
              />
            </Grid>
          )}
          <Grid item xl={3} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              PORCENTAJE MODIFICADO/AUTORIZADO T3
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {
                RF.avanceFinanciero.porcentaje.porcentajeModificadoAutorizado
                  .pt3
              }
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
              disabled={true}
              // value={!editEncabezado.programaSER}
              // onChange={(v) => {
              //   setEditEncabezado({
              //     ...editEncabezado,
              //     programaSER: !v.target.checked,
              //   });
              // }}
              // value={!ftEditPadre.encabezado?.programaSER}
              // onChange={(v) => {
              //   let aux = ftEditPadre.encabezado;
              //   aux = { ...aux, programaSER: v.target.checked };
              //   setFTEditPadre({ ...ftEditPadre, encabezado: aux });
              // }}
              />
            </Grid>
          )}
          <Grid item xl={3} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              PORCENTAJE MODIFICADO/AUTORIZADO T4
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {
                RF.avanceFinanciero.porcentaje.porcentajeModificadoAutorizado
                  .pt4
              }
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
              disabled={true}
              // value={!editEncabezado.programaSER}
              // onChange={(v) => {
              //   setEditEncabezado({
              //     ...editEncabezado,
              //     programaSER: !v.target.checked,
              //   });
              // }}
              // value={!ftEditPadre.encabezado?.programaSER}
              // onChange={(v) => {
              //   let aux = ftEditPadre.encabezado;
              //   aux = { ...aux, programaSER: v.target.checked };
              //   setFTEditPadre({ ...ftEditPadre, encabezado: aux });
              // }}
              />
            </Grid>
          )}
          <Grid item xl={3} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              PORCENTAJE MODIFICADO/AUTORIZADO CUENTA PUBLICA
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {
                RF.avanceFinanciero.porcentaje.porcentajeModificadoAutorizado
                  .porcentajeCuentaPublica
              }
            </Typography>
          </Grid>
        </Grid>

        {/* ######################################################
            ############ EJERCIDO/MODIFICADO ########
            #########################################################*/}

       
        <Grid
          item
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          <Typography
            sx={{ fontFamily: "MontserratBold", borderBottom: 1, mt: 5 }}
          >
            AVANCE FINANCIERO - EJERCIDO/MODIFICADO 
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
              // value={!editEncabezado.programaSER}
              // onChange={(v) => {
              //   setEditEncabezado({
              //     ...editEncabezado,
              //     programaSER: !v.target.checked,
              //   });
              // }}
              // value={!ftEditPadre.encabezado?.programaSER}
              // onChange={(v) => {
              //   let aux = ftEditPadre.encabezado;
              //   aux = { ...aux, programaSER: v.target.checked };
              //   setFTEditPadre({ ...ftEditPadre, encabezado: aux });
              // }}
              />
            </Grid>
          )}
          <Grid item xl={3} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              MONTO EJERCIDO/MODIFICADO T1
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {RF.avanceFinanciero.monto.ejercidoModificado.t1.resultado}
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
              // value={!editEncabezado.programaSER}
              // onChange={(v) => {
              //   setEditEncabezado({
              //     ...editEncabezado,
              //     programaSER: !v.target.checked,
              //   });
              // }}
              // value={!ftEditPadre.encabezado?.programaSER}
              // onChange={(v) => {
              //   let aux = ftEditPadre.encabezado;
              //   aux = { ...aux, programaSER: v.target.checked };
              //   setFTEditPadre({ ...ftEditPadre, encabezado: aux });
              // }}
              />
            </Grid>
          )}
          <Grid item xl={3} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              MONTO EJERCIDO/MODIFICADO T2
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {RF.avanceFinanciero.monto.ejercidoModificado.t2.resultado}
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
              // value={!editEncabezado.programaSER}
              // onChange={(v) => {
              //   setEditEncabezado({
              //     ...editEncabezado,
              //     programaSER: !v.target.checked,
              //   });
              // }}
              // value={!ftEditPadre.encabezado?.programaSER}
              // onChange={(v) => {
              //   let aux = ftEditPadre.encabezado;
              //   aux = { ...aux, programaSER: v.target.checked };
              //   setFTEditPadre({ ...ftEditPadre, encabezado: aux });
              // }}
              />
            </Grid>
          )}
          <Grid item xl={3} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              MONTO EJERCIDO/MODIFICADO T3
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {RF.avanceFinanciero.monto.ejercidoModificado.t3.resultado}
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
              // value={!editEncabezado.programaSER}
              // onChange={(v) => {
              //   setEditEncabezado({
              //     ...editEncabezado,
              //     programaSER: !v.target.checked,
              //   });
              // }}
              // value={!ftEditPadre.encabezado?.programaSER}
              // onChange={(v) => {
              //   let aux = ftEditPadre.encabezado;
              //   aux = { ...aux, programaSER: v.target.checked };
              //   setFTEditPadre({ ...ftEditPadre, encabezado: aux });
              // }}
              />
            </Grid>
          )}
          <Grid item xl={3} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              MONTO EJERCIDO/MODIFICADO T4
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {RF.avanceFinanciero.monto.ejercidoModificado.t4.resultado}
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
              // value={!editEncabezado.programaSER}
              // onChange={(v) => {
              //   setEditEncabezado({
              //     ...editEncabezado,
              //     programaSER: !v.target.checked,
              //   });
              // }}
              // value={!ftEditPadre.encabezado?.programaSER}
              // onChange={(v) => {
              //   let aux = ftEditPadre.encabezado;
              //   aux = { ...aux, programaSER: v.target.checked };
              //   setFTEditPadre({ ...ftEditPadre, encabezado: aux });
              // }}
              />
            </Grid>
          )}
          <Grid item xl={3} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              MONTO EJERCIDO/MODIFICADO CUENTA PUBLICA
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {RF.avanceFinanciero.monto.ejercidoModificado.cuentaPublica}
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
              disabled={true}
              // value={!editEncabezado.programaSER}
              // onChange={(v) => {
              //   setEditEncabezado({
              //     ...editEncabezado,
              //     programaSER: !v.target.checked,
              //   });
              // }}
              // value={!ftEditPadre.encabezado?.programaSER}
              // onChange={(v) => {
              //   let aux = ftEditPadre.encabezado;
              //   aux = { ...aux, programaSER: v.target.checked };
              //   setFTEditPadre({ ...ftEditPadre, encabezado: aux });
              // }}
              />
            </Grid>
          )}
          <Grid item xl={3} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              PORCENTAJE EJERCIDO/MODIFICADO T1
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {
                RF.avanceFinanciero.porcentaje.porcentajeEjercidoModificado
                  .pt1
              }
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
              disabled={true}
              // value={!editEncabezado.programaSER}
              // onChange={(v) => {
              //   setEditEncabezado({
              //     ...editEncabezado,
              //     programaSER: !v.target.checked,
              //   });
              // }}
              // value={!ftEditPadre.encabezado?.programaSER}
              // onChange={(v) => {
              //   let aux = ftEditPadre.encabezado;
              //   aux = { ...aux, programaSER: v.target.checked };
              //   setFTEditPadre({ ...ftEditPadre, encabezado: aux });
              // }}
              />
            </Grid>
          )}
          <Grid item xl={3} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              PORCENTAJE EJERCIDO/MODIFICADO T2
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {
                RF.avanceFinanciero.porcentaje.porcentajeEjercidoModificado
                  .pt2
              }
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
              disabled={true}
              // value={!editEncabezado.programaSER}
              // onChange={(v) => {
              //   setEditEncabezado({
              //     ...editEncabezado,
              //     programaSER: !v.target.checked,
              //   });
              // }}
              // value={!ftEditPadre.encabezado?.programaSER}
              // onChange={(v) => {
              //   let aux = ftEditPadre.encabezado;
              //   aux = { ...aux, programaSER: v.target.checked };
              //   setFTEditPadre({ ...ftEditPadre, encabezado: aux });
              // }}
              />
            </Grid>
          )}
          <Grid item xl={3} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              PORCENTAJE EJERCIDO/MODIFICADO T3
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {
                RF.avanceFinanciero.porcentaje.porcentajeEjercidoModificado
                  .pt3
              }
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
              disabled={true}
              // value={!editEncabezado.programaSER}
              // onChange={(v) => {
              //   setEditEncabezado({
              //     ...editEncabezado,
              //     programaSER: !v.target.checked,
              //   });
              // }}
              // value={!ftEditPadre.encabezado?.programaSER}
              // onChange={(v) => {
              //   let aux = ftEditPadre.encabezado;
              //   aux = { ...aux, programaSER: v.target.checked };
              //   setFTEditPadre({ ...ftEditPadre, encabezado: aux });
              // }}
              />
            </Grid>
          )}
          <Grid item xl={3} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              PORCENTAJE EJERCIDO/MODIFICADO T4
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {
                RF.avanceFinanciero.porcentaje.porcentajeEjercidoModificado
                  .pt4
              }
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
              disabled={true}
              // value={!editEncabezado.programaSER}
              // onChange={(v) => {
              //   setEditEncabezado({
              //     ...editEncabezado,
              //     programaSER: !v.target.checked,
              //   });
              // }}
              // value={!ftEditPadre.encabezado?.programaSER}
              // onChange={(v) => {
              //   let aux = ftEditPadre.encabezado;
              //   aux = { ...aux, programaSER: v.target.checked };
              //   setFTEditPadre({ ...ftEditPadre, encabezado: aux });
              // }}
              />
            </Grid>
          )}
          <Grid item xl={3} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              PORCENTAJE EJERCIDO/MODIFICADO CUENTA PUBLICA
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {
                RF.avanceFinanciero.porcentaje.porcentajeEjercidoModificado
                  .porcentajeCuentaPublica
              }
            </Typography>
          </Grid>
        </Grid>

        {/* ###################################################
            ############ FINALIZA DISPLAY DE AFINANCIERO ########
            ###################################################*/}

        {/* #######################################
            ############ INICIA DISPLAY DE FIN ########
            ###########################################*/}
        <Grid
          item
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          <Typography
            sx={{ fontFamily: "MontserratBold", borderBottom: 1, mt: 5 }}
          >
            FIN
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
              checked={raffiboolean?.fin?.añoAvanceFisico}
                onChange={(v) => {
                  let aux = raffiboolean?.fin;
                  aux = { ...aux, añoAvanceFisico: v.target.checked };
                  setRaffiboolean({ ...raffiboolean, fin: aux });
                }}
              />
            </Grid>
          )}
          <Grid item xl={3} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              AÑO DEL AVANCE FISICO
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {RF.fin.añoAvanceFisico}
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
              checked={raffiboolean?.fin?.valorAvanceFisico}
                onChange={(v) => {
                  let aux = raffiboolean?.fin;
                  aux = { ...aux, valorAvanceFisico: v.target.checked };
                  setRaffiboolean({ ...raffiboolean, fin: aux });
                }}
              />
            </Grid>
          )}
          <Grid item xl={3} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              VALOR DEL AVANCE FISICO
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {RF.fin.valorAvanceFisico}
            </Typography>
          </Grid>
        </Grid>

        {/* #######################################
            ############ FINALIZA DISPLAY DE FIN ########
            ###########################################*/}

        {/* #######################################
            ############ INICIA DISPLAY DE PROPOSITO ########
            ###########################################*/}
        <Grid
          item
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          <Typography
            sx={{ fontFamily: "MontserratBold", borderBottom: 1, mt: 5 }}
          >
            Proposito
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
              checked={raffiboolean?.proposito?.añoAvanceFisico}
              onChange={(v) => {
                let aux = raffiboolean?.proposito;
                aux = { ...aux, añoAvanceFisico: v.target.checked };
                setRaffiboolean({ ...raffiboolean, proposito: aux });
              }}
              />
            </Grid>
          )}
          <Grid item xl={3} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              AÑO DEL AVANCE FISICO
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {RF.proposito.añoAvanceFisico}
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
              checked={raffiboolean?.proposito?.valorAvanceFisico}
              onChange={(v) => {
                let aux = raffiboolean?.proposito;
                aux = { ...aux, valorAvanceFisico: v.target.checked };
                setRaffiboolean({ ...raffiboolean, proposito: aux });
              }}
              />
            </Grid>
          )}
          <Grid item xl={3} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              VALOR DEL AVANCE FISICO
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {RF.proposito.valorAvanceFisico}
            </Typography>
          </Grid>
        </Grid>

        {/* #######################################
            ############ FINALIZA DISPLAY DE PROPOSITO ########
            ###########################################*/}

        {/* ###################################################
            ############ INICIA DISPLAY DE COMPONENTES ########
            ###################################################*/}
        <Grid
          item
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          <Typography
            sx={{ fontFamily: "MontserratBold", borderBottom: 1, mt: 5 }}
          >
            Componente
          </Typography>
        </Grid>
        {RF.componentes.map((componente: IComponenteRF, indexComponentes) => {
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
              key={indexComponentes}
            >
              <Grid item>
                <Typography
                  sx={{
                    fontFamily: "MontserratMedium",
                    borderBottom: 1,
                    mt: 1,
                    textAlign: "center",
                  }}
                >
                  COMPONENTE {indexComponentes + 1}
                </Typography>
              </Grid>
              {jsonMIR?.componentes[indexComponentes]?.frecuencia ===
              "SEMESTRAL" ? (
                <Grid
                  item
                  container
                  xl={12}
                  lg={12}
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
                  {localStorage.getItem("Rol") === "Capturador" ? null : (
                    <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                      <Checkbox
                      checked={raffiboolean?.componentes[indexComponentes].metasPorFrecuencia[0].semestre1}
                      onChange={(v) => {
                        let auxC = raffiboolean?.componentes;
                        auxC[indexComponentes].metasPorFrecuencia[indexComponentes].semestre1 = v.target.checked;
                        setRaffiboolean({ ...raffiboolean, componentes: auxC });
                      }}
                      />
                    </Grid>
                  )}

                  <Grid item xl={1} lg={1} md={12} sm={12} xs={12}>
                    <Typography sx={{ fontFamily: "MontserratMedium" }}>
                      SEMESTRE1:
                    </Typography>
                  </Grid>

                  <Grid item xl={1} lg={1} md={12} sm={12} xs={12}>
                    <Typography sx={{ fontFamily: "MontserratLight", ml: 1 }}>
                      {componente?.metasPorFrecuencia[0]?.semestre1}
                    </Typography>
                  </Grid>

                  {localStorage.getItem("Rol") === "Capturador" ? null : (
                    <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                      <Checkbox
                      checked={raffiboolean?.componentes[indexComponentes].metasPorFrecuencia[0].semestre2}
                      onChange={(v) => {
                        let auxC = raffiboolean?.componentes;
                        auxC[indexComponentes].metasPorFrecuencia[0].semestre2 = v.target.checked;
                        setRaffiboolean({ ...raffiboolean, componentes: auxC });
                      }}
                      />
                    </Grid>
                  )}

                  <Grid item xl={1} lg={1} md={12} sm={12} xs={12}>
                    <Typography sx={{ fontFamily: "MontserratMedium" }}>
                      SEMESTRE2:
                    </Typography>
                  </Grid>

                  <Grid item xl={1} lg={1} md={12} sm={12} xs={12}>
                    <Typography sx={{ fontFamily: "MontserratLight", ml: 1 }}>
                      {componente?.metasPorFrecuencia[0]?.semestre2}
                    </Typography>
                  </Grid>
                </Grid>
              ) : (
                <Grid
                  item
                  container
                  xl={12}
                  lg={12}
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
                  {localStorage.getItem("Rol") === "Capturador" ? null : (
                    <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                      <Checkbox
                      checked={raffiboolean?.componentes[indexComponentes].metasPorFrecuencia[0].trimestre1}
                      onChange={(v) => {
                        let auxC = raffiboolean?.componentes;
                        auxC[indexComponentes].metasPorFrecuencia[0].trimestre1 = v.target.checked;
                        setRaffiboolean({ ...raffiboolean, componentes: auxC });
                      }}
                      />
                    </Grid>
                  )}

                  <Grid item xl={1} lg={1} md={12} sm={12} xs={12}>
                    <Typography sx={{ fontFamily: "MontserratMedium" }}>
                      TRIMESTRE1:
                    </Typography>
                  </Grid>

                  <Grid item xl={1} lg={1} md={12} sm={12} xs={12}>
                    <Typography sx={{ fontFamily: "MontserratLight", ml: 1 }}>
                      {componente?.metasPorFrecuencia[0]?.trimestre1}
                    </Typography>
                  </Grid>

                  {localStorage.getItem("Rol") === "Capturador" ? null : (
                    <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                      <Checkbox
                      checked={raffiboolean?.componentes[indexComponentes].metasPorFrecuencia[0].trimestre2}
                      onChange={(v) => {
                        let auxC = raffiboolean?.componentes;
                        auxC[indexComponentes].metasPorFrecuencia[0].trimestre2 = v.target.checked;
                        setRaffiboolean({ ...raffiboolean, componentes: auxC });
                      }}
                      />
                    </Grid>
                  )}

                  <Grid item xl={1} lg={1} md={12} sm={12} xs={12}>
                    <Typography sx={{ fontFamily: "MontserratMedium" }}>
                      TRIMESTRE2:
                    </Typography>
                  </Grid>

                  <Grid item xl={1} lg={1} md={12} sm={12} xs={12}>
                    <Typography sx={{ fontFamily: "MontserratLight", ml: 1 }}>
                      {componente?.metasPorFrecuencia[0]?.trimestre2}
                    </Typography>
                  </Grid>

                  {localStorage.getItem("Rol") === "Capturador" ? null : (
                    <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                      <Checkbox
                      checked={raffiboolean?.componentes[indexComponentes].metasPorFrecuencia[0].trimestre3}
                      onChange={(v) => {
                        let auxC = raffiboolean?.componentes;
                        auxC[indexComponentes].metasPorFrecuencia[0].trimestre3 = v.target.checked;
                        setRaffiboolean({ ...raffiboolean, componentes: auxC });
                      }}
                      />
                    </Grid>
                  )}

                  <Grid item xl={1} lg={1} md={12} sm={12} xs={12}>
                    <Typography sx={{ fontFamily: "MontserratMedium" }}>
                      TRIMESTRE3:
                    </Typography>
                  </Grid>

                  <Grid item xl={1} lg={1} md={12} sm={12} xs={12}>
                    <Typography sx={{ fontFamily: "MontserratLight", ml: 1 }}>
                      {componente?.metasPorFrecuencia[0]?.trimestre3}
                    </Typography>
                  </Grid>

                  {localStorage.getItem("Rol") === "Capturador" ? null : (
                    <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                      <Checkbox
                      checked={raffiboolean?.componentes[indexComponentes].metasPorFrecuencia[0].trimestre4}
                      onChange={(v) => {
                        let auxC = raffiboolean?.componentes;
                        auxC[indexComponentes].metasPorFrecuencia[0].trimestre4 = v.target.checked;
                        setRaffiboolean({ ...raffiboolean, componentes: auxC });
                      }}
                      />
                    </Grid>
                  )}

                  <Grid item xl={1} lg={1} md={12} sm={12} xs={12}>
                    <Typography sx={{ fontFamily: "MontserratMedium" }}>
                      TRIMESTRE4:
                    </Typography>
                  </Grid>

                  <Grid item xl={1} lg={1} md={12} sm={12} xs={12}>
                    <Typography sx={{ fontFamily: "MontserratLight", ml: 1 }}>
                      {componente?.metasPorFrecuencia[0]?.trimestre4}
                    </Typography>
                  </Grid>
                </Grid>
              )}
            </Grid>
          );
        })}

        {/* ###################################################
            ############ INICIA DISPLAY DE ACTIVIDADES ########
            ###################################################*/}
        <Grid
          item
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          <Typography
            sx={{ fontFamily: "MontserratBold", borderBottom: 1, mt: 5 }}
          >
            ACTIVIDADES
          </Typography>
        </Grid>

        {RF.componentes.map((componente: IComponenteRF, indexComponentes) => {
          let i = 0;
          return componente.actividades.map(
            (actividad: IActividadesRF, indexActividades) => {
              i++;
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
                  key={indexActividades}
                >
                  <Grid item>
                    <Typography
                      sx={{
                        fontFamily: "MontserratMedium",
                        borderBottom: 1,
                        mt: 1,
                        textAlign: "center",
                      }}
                    >
                      COMPONENTE {indexComponentes + 1} - ACTIVIDAD{" "}
                      {indexActividades + 1}
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    container
                    xl={12}
                    lg={12}
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
                    {localStorage.getItem("Rol") === "Capturador" ? null : (
                      <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                        <Checkbox
                        checked={raffiboolean?.componentes[indexComponentes].actividades[indexActividades].metasPorFrecuencia[0].trimestre1}
                        onChange={(v) => {
                          let auxC = raffiboolean?.componentes;
                          auxC[indexComponentes].actividades[indexActividades].metasPorFrecuencia[0].trimestre1 = v.target.checked;
                          setRaffiboolean({ ...raffiboolean, componentes: auxC });
                        }}
                        />
                      </Grid>
                    )}

                    <Grid item xl={1} lg={1} md={12} sm={12} xs={12}>
                      <Typography sx={{ fontFamily: "MontserratMedium" }}>
                        TRIMESTRE1:
                      </Typography>
                    </Grid>

                    <Grid item xl={1} lg={1} md={12} sm={12} xs={12}>
                      <Typography sx={{ fontFamily: "MontserratLight", ml: 1 }}>
                        {actividad?.metasPorFrecuencia[0]?.trimestre1}
                      </Typography>
                    </Grid>

                    {localStorage.getItem("Rol") === "Capturador" ? null : (
                      <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                        <Checkbox
                        checked={raffiboolean?.componentes[indexComponentes].actividades[indexActividades].metasPorFrecuencia[0].trimestre2}
                        onChange={(v) => {
                          let auxC = raffiboolean?.componentes;
                          auxC[indexComponentes].actividades[indexActividades].metasPorFrecuencia[0].trimestre2 = v.target.checked;
                          setRaffiboolean({ ...raffiboolean, componentes: auxC });
                        }}
                        />
                      </Grid>
                    )}

                    <Grid item xl={1} lg={1} md={12} sm={12} xs={12}>
                      <Typography sx={{ fontFamily: "MontserratMedium" }}>
                        TRIMESTRE2:
                      </Typography>
                    </Grid>

                    <Grid item xl={1} lg={1} md={12} sm={12} xs={12}>
                      <Typography sx={{ fontFamily: "MontserratLight", ml: 1 }}>
                        {actividad?.metasPorFrecuencia[0]?.trimestre2}
                      </Typography>
                    </Grid>

                    {localStorage.getItem("Rol") === "Capturador" ? null : (
                      <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                        <Checkbox
                        checked={raffiboolean?.componentes[indexComponentes].actividades[indexActividades].metasPorFrecuencia[0].trimestre3}
                        onChange={(v) => {
                          let auxC = raffiboolean?.componentes;
                          auxC[indexComponentes].actividades[indexActividades].metasPorFrecuencia[0].trimestre3 = v.target.checked;
                          setRaffiboolean({ ...raffiboolean, componentes: auxC });
                        }}
                        />
                      </Grid>
                    )}

                    <Grid item xl={1} lg={1} md={12} sm={12} xs={12}>
                      <Typography sx={{ fontFamily: "MontserratMedium" }}>
                        TRIMESTRE3:
                      </Typography>
                    </Grid>

                    <Grid item xl={1} lg={1} md={12} sm={12} xs={12}>
                      <Typography sx={{ fontFamily: "MontserratLight", ml: 1 }}>
                        {actividad?.metasPorFrecuencia[0]?.trimestre3}
                      </Typography>
                    </Grid>

                    {localStorage.getItem("Rol") === "Capturador" ? null : (
                      <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                        <Checkbox
                        checked={raffiboolean?.componentes[indexComponentes].actividades[indexActividades].metasPorFrecuencia[0].trimestre4}
                        onChange={(v) => {
                          let auxC = raffiboolean?.componentes;
                          auxC[indexComponentes].actividades[indexActividades].metasPorFrecuencia[0].trimestre4 = v.target.checked;
                          setRaffiboolean({ ...raffiboolean, componentes: auxC });
                        }}
                        />
                      </Grid>
                    )}

                    <Grid item xl={1} lg={1} md={12} sm={12} xs={12}>
                      <Typography sx={{ fontFamily: "MontserratMedium" }}>
                        TRIMESTRE4:
                      </Typography>
                    </Grid>

                    <Grid item xl={1} lg={1} md={12} sm={12} xs={12}>
                      <Typography sx={{ fontFamily: "MontserratLight", ml: 1 }}>
                        {actividad?.metasPorFrecuencia[0]?.trimestre4}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              );
            }
          );
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
            sx={queries.buttonCancelarSolicitudInscripcion}
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
            disabled={isCapturador ? true : false}
            sx={buttonStyles}
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
            sx={queries.buttonContinuarSolicitudInscripcion}
            onClick={() =>
              creaRF(
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
            sx={queries.buttonContinuarSolicitudInscripcion}
            onClick={() => setOpenModalEnviar(true)}
          >
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              {localStorage.getItem("Rol") === "Administrador"
                ? "Autorizar"
                : "Enviar"}
            </Typography>
          </Button>
        </Grid>

        <ModalSolicitaModifRF
          open={openModalSolicitarModif}
          handleClose={handleCloseModif}
          RF={JSON.stringify(RF)}
          MA={JSON.stringify(MA)}
          MIR={MIR}
          showResume={showResume}
          IdMA={IdMA}
          IdRF={IdRF}
          RFEdit={JSON.stringify(raffiboolean)}
        ></ModalSolicitaModifRF>

        <ModalEnviarRF
          open={openModalEnviar}
          handleClose={handleCloseEnviar}
          RF={JSON.stringify(RF)}
          MA={JSON.stringify(MA)}
          MIR={MIR}
          IdMA={IdMA}
          IdRF={IdRF}
          showResume={showResume}
        ></ModalEnviarRF>
      </Grid>
    </Grid>
  );
};
