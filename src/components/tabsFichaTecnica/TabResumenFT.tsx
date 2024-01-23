import { Grid, Typography, Button, Checkbox } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ModalsSolicitModifFT from "../modalsFT/ModalsSolicitModifFT";
import {
  IActividadesEditFT,
  IActividadesFT,
  IComponenteEditFT,
  IComponentesFT,
  ICValorFT,
  IEncabezadoEditFT,
  IEncabezadoFT,
  IFinEditFT,
  IFinFT,
  IFT,
  IFTEdit,
  IPropositoEditFT,
  IPropositoFT,
} from "./Interfaces";
import { queries } from "../../queries";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ModalEnviarFT from "../modalsFT/ModalEnviarFT";
import { alertaError, alertaExito } from "../genericComponents/Alertas";

export function TabResumenFT({
  show,
  encabezado,
  fin,
  proposito,
  //componentes,
  componentes,
  cValor,
  IdMir,
  IdFT,
  IdMA,
  showResume,
  MIR,
  setFTPadre,
  ftPadre,
  ftEditPadre,
  setFTEditPadre,
  estadoft,
}: {
  show: boolean;
  encabezado: IEncabezadoFT;
  fin: IFinFT;
  proposito: IPropositoFT;
  //componentes: number[];
  componentes: Array<IComponentesFT>;
  cValor: Array<ICValorFT>;
  IdMir: string;
  IdFT: string;
  IdMA: string;
  MIR: string;
  showResume: Function;
  setFTPadre: Function;
  ftPadre: IFT;
  ftEditPadre: IFTEdit;
  setFTEditPadre: Function;
  estadoft: string;
}) {
  const [FT, setFT] = useState<IFT>(ftPadre);

  const [openModalSolicitarModif, setOpenModalSolicitarModif] = useState(false);

  const handleCloseModif = () => {
    setOpenModalSolicitarModif(false);
  };

  const [openModalEnviar, setOpenModalEnviar] = useState(false);

  const handleCloseEnviar = () => {
    setOpenModalEnviar(false);
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

  const creaFT = (estado: string) => {
    axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/create-FichaTecnica",
        {
          FichaTecnica: JSON.stringify(FT),
          CreadoPor: localStorage.getItem("IdUsuario"),
          IdMir: IdMir,
          IdMa: IdMA,
          Id: IdFT,
          Estado: estado,
          Rol: localStorage.getItem("Rol"),
          IdEntidad: localStorage.getItem("IdEntidad"),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        alertaExito(()=> {}, r.data.data.message )
        
        showResume();
      })
      .catch((err) => {
        alertaError(err.response.data.result.error)
      
      });
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

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Grid
      visibility={show ? "visible" : "hidden"}
      position="absolute"
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
            ENCABEZADO
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
                value={!ftEditPadre.encabezado?.programaSER}
                onChange={(v) => {
                  let aux = ftEditPadre.encabezado;
                  aux = { ...aux, programaSER: v.target.checked };
                  setFTEditPadre({ ...ftEditPadre, encabezado: aux });
                }}
              />
            </Grid>
          )}
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              PROGRAMA SECTORIAL SECTORIAL, ESPECIAL O REGIONAL:
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {ftPadre.encabezado.programaSER}
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
                // value={!editEncabezado.objetivoSER}
                // onChange={(v) => {
                //   setEditEncabezado({
                //     ...editEncabezado,
                //     objetivoSER: !v.target.checked,
                //   });
                // }}
                value={!ftEditPadre.encabezado?.objetivoSER}
                onChange={(v) => {
                  let aux = ftEditPadre.encabezado;
                  aux = { ...aux, objetivoSER: v.target.checked };
                  setFTEditPadre({ ...ftEditPadre, encabezado: aux });
                }}
              />
            </Grid>
          )}
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              OBJETIVO PROGRAMA SECTORIAL, ESPECIAL O REGIONAL:
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {ftPadre.encabezado.objetivoSER}
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
                // value={!editEncabezado.objetivoODS}
                // onChange={(v) => {
                //   setEditEncabezado({
                //     ...editEncabezado,
                //     objetivoODS: !v.target.checked,
                //   });
                // }}
                value={!ftEditPadre.encabezado?.objetivoODS}
                onChange={(v) => {
                  let aux = ftEditPadre.encabezado;
                  aux = { ...aux, objetivoODS: v.target.checked };
                  setFTEditPadre({ ...ftEditPadre, encabezado: aux });
                }}
              />
            </Grid>
          )}
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              OBJETIVO ODS:
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {ftPadre.encabezado.objetivoODS}
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
                // value={!editEncabezado.metaODS}
                // onChange={(v) => {
                //   setEditEncabezado({
                //     ...editEncabezado,
                //     metaODS: !v.target.checked,
                //   });
                // }}
                value={!ftEditPadre.encabezado?.metaODS}
                onChange={(v) => {
                  let aux = ftEditPadre.encabezado;
                  aux = { ...aux, metaODS: v.target.checked };
                  setFTEditPadre({ ...ftEditPadre, encabezado: aux });
                }}
              />
            </Grid>
          )}

          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              META ODS:
            </Typography>
          </Grid>
          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {ftPadre.encabezado.metaODS}
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
                // value={!editFin.tipoDeIndicador}
                // onChange={(v) => {
                //   setEditFin({
                //     ...editFin,
                //     tipoDeIndicador: !v.target.checked,
                //   });
                // }}
                value={!ftEditPadre.fin?.tipoDeIndicador}
                onChange={(v) => {
                  let aux = ftEditPadre.fin;
                  aux = { ...aux, tipoDeIndicador: v.target.checked };
                  setFTEditPadre({ ...ftEditPadre, fin: aux });
                }}
              />
            </Grid>
          )}
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              TIPO DE INDICADOR:
            </Typography>
          </Grid>
          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {ftPadre.fin?.tipoDeIndicador}
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
                // value={!editFin.dimension}
                // onChange={(v) => {
                //   setEditFin({
                //     ...editFin,
                //     dimension: !v.target.checked,
                //   });
                // }}
                value={!ftEditPadre.fin?.dimension}
                onChange={(v) => {
                  let aux = ftEditPadre.fin;
                  aux = { ...aux, dimension: v.target.checked };
                  setFTEditPadre({ ...ftEditPadre, fin: aux });
                }}
              />
            </Grid>
          )}
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              DIMENSIÓN:
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {ftPadre.fin?.dimension}
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
                // value={!editFin.unidadDeMedida}
                // onChange={(v) => {
                //   setEditFin({
                //     ...editFin,
                //     unidadDeMedida: !v.target.checked,
                //   });
                // }}
                value={!ftEditPadre.fin?.unidadDeMedida}
                onChange={(v) => {
                  let aux = ftEditPadre.fin;
                  aux = { ...aux, unidadDeMedida: v.target.checked };
                  setFTEditPadre({ ...ftEditPadre, fin: aux });
                }}
              />
            </Grid>
          )}
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              UNIDAD DE MEDIDA:
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {ftPadre.fin?.unidadDeMedida}
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
                // value={!editFin.claridad}
                // onChange={(v) => {
                //   setEditFin({
                //     ...editFin,
                //     claridad: !v.target.checked,
                //   });
                // }}
                value={!ftEditPadre.fin?.claridad}
                onChange={(v) => {
                  let aux = ftEditPadre.fin;
                  aux = { ...aux, claridad: v.target.checked };
                  setFTEditPadre({ ...ftEditPadre, fin: aux });
                }}
              />
            </Grid>
          )}
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              CLARIDAD:
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {ftPadre.fin?.claridad}
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
                // value={!editFin.relevancia}
                // onChange={(v) => {
                //   setEditFin({
                //     ...editFin,
                //     relevancia: !v.target.checked,
                //   });
                // }}
                value={!ftEditPadre.fin?.relevancia}
                onChange={(v) => {
                  let aux = ftEditPadre.fin;
                  aux = { ...aux, relevancia: v.target.checked };
                  setFTEditPadre({ ...ftEditPadre, fin: aux });
                }}
              />
            </Grid>
          )}
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              RELEVANCIA:
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {ftPadre.fin?.relevancia}
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
                // value={!editFin.economia}
                // onChange={(v) => {
                //   setEditFin({
                //     ...editFin,
                //     economia: !v.target.checked,
                //   });
                // }}
                value={!ftEditPadre.fin?.economia}
                onChange={(v) => {
                  let aux = ftEditPadre.fin;
                  aux = { ...aux, economia: v.target.checked };
                  setFTEditPadre({ ...ftEditPadre, fin: aux });
                }}
              />
            </Grid>
          )}
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              ECONOMÍA:
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {ftPadre.fin?.economia}
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
                // value={!editFin.monitoreable}
                // onChange={(v) => {
                //   setEditFin({
                //     ...editFin,
                //     monitoreable: !v.target.checked,
                //   });
                // }}
                value={!ftEditPadre.fin?.monitoreable}
                onChange={(v) => {
                  let aux = ftEditPadre.fin;
                  aux = { ...aux, monitoreable: v.target.checked };
                  setFTEditPadre({ ...ftEditPadre, fin: aux });
                }}
              />
            </Grid>
          )}
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              MONITOREABLE:
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {ftPadre.fin?.monitoreable}
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
                // value={!editFin.adecuado}
                // onChange={(v) => {
                //   setEditFin({
                //     ...editFin,
                //     adecuado: !v.target.checked,
                //   });
                // }}
                value={!ftEditPadre.fin?.adecuado}
                onChange={(v) => {
                  let aux = ftEditPadre.fin;
                  aux = { ...aux, adecuado: v.target.checked };
                  setFTEditPadre({ ...ftEditPadre, fin: aux });
                }}
              />
            </Grid>
          )}
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              ADECUADO:
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {ftPadre.fin?.adecuado}
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
                // value={!editFin.aporte_marginal}
                // onChange={(v) => {
                //   setEditFin({
                //     ...editFin,
                //     aporte_marginal: !v.target.checked,
                //   });
                // }}
                value={!ftEditPadre.fin?.aporte_marginal}
                onChange={(v) => {
                  let aux = ftEditPadre.fin;
                  aux = { ...aux, aporte_marginal: v.target.checked };
                  setFTEditPadre({ ...ftEditPadre, fin: aux });
                }}
              />
            </Grid>
          )}
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              APORTE MARGINAL:
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {ftPadre.fin?.aporte_marginal}
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
            sx={{ fontFamily: "MontserratBold", borderBottom: 1, mt: 5 }}
          >
            PROPÓSITO
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
                // value={!editProposito.tipoDeIndicador}
                // onChange={(v) => {
                //   setEditProposito({
                //     ...editProposito,
                //     tipoDeIndicador: !v.target.checked,
                //   });
                // }}
                value={!ftEditPadre.proposito?.tipoDeIndicador}
                onChange={(v) => {
                  let aux = ftEditPadre.proposito;
                  aux = { ...aux, tipoDeIndicador: v.target.checked };
                  setFTEditPadre({ ...ftEditPadre, proposito: aux });
                }}
              />
            </Grid>
          )}
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              TIPO DE INDICADOR:
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {ftPadre.proposito?.tipoDeIndicador}
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
                // value={!editProposito.dimension}
                // onChange={(v) => {
                //   setEditProposito({
                //     ...editProposito,
                //     dimension: !v.target.checked,
                //   });
                // }}
                value={!ftEditPadre.proposito?.dimension}
                onChange={(v) => {
                  let aux = ftEditPadre.proposito;
                  aux = { ...aux, dimension: v.target.checked };
                  setFTEditPadre({ ...ftEditPadre, proposito: aux });
                }}
              />
            </Grid>
          )}
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              DIMENSIÓN:
            </Typography>
          </Grid>
          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {ftPadre.proposito?.dimension}
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
                // value={!editProposito.unidadDeMedida}
                // onChange={(v) => {
                //   setEditProposito({
                //     ...editProposito,
                //     unidadDeMedida: !v.target.checked,
                //   });
                // }}
                value={!ftEditPadre.proposito?.unidadDeMedida}
                onChange={(v) => {
                  let aux = ftEditPadre.proposito;
                  aux = { ...aux, unidadDeMedida: v.target.checked };
                  setFTEditPadre({ ...ftEditPadre, proposito: aux });
                }}
              />
            </Grid>
          )}

          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              UNIDAD DE MEDIDA:
            </Typography>
          </Grid>
          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {ftPadre.proposito?.unidadDeMedida}
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
                // value={!editProposito.claridad}
                // onChange={(v) => {
                //   setEditProposito({
                //     ...editProposito,
                //     claridad: !v.target.checked,
                //   });
                // }}
                value={!ftEditPadre.proposito?.claridad}
                onChange={(v) => {
                  let aux = ftEditPadre.proposito;
                  aux = { ...aux, claridad: v.target.checked };
                  setFTEditPadre({ ...ftEditPadre, proposito: aux });
                }}
              />
            </Grid>
          )}
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              CLARIDAD:
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {ftPadre.proposito?.claridad}
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
                // value={!editProposito.relevancia}
                // onChange={(v) => {
                //   setEditProposito({
                //     ...editProposito,
                //     relevancia: !v.target.checked,
                //   });
                // }}
                value={!ftEditPadre.proposito?.relevancia}
                onChange={(v) => {
                  let aux = ftEditPadre.proposito;
                  aux = { ...aux, relevancia: v.target.checked };
                  setFTEditPadre({ ...ftEditPadre, proposito: aux });
                }}
              />
            </Grid>
          )}
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              RELEVANCIA:
            </Typography>
          </Grid>
          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {ftPadre.proposito?.relevancia}
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
                // value={!editProposito.economia}
                // onChange={(v) => {
                //   setEditProposito({
                //     ...editProposito,
                //     economia: !v.target.checked,
                //   });
                // }}
                value={!ftEditPadre.proposito?.economia}
                onChange={(v) => {
                  let aux = ftEditPadre.proposito;
                  aux = { ...aux, economia: v.target.checked };
                  setFTEditPadre({ ...ftEditPadre, proposito: aux });
                }}
              />
            </Grid>
          )}
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              ECONOMÍA:
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {ftPadre.proposito?.economia}
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
                // value={!editProposito.monitoreable}
                // onChange={(v) => {
                //   setEditProposito({
                //     ...editProposito,
                //     monitoreable: !v.target.checked,
                //   });
                // }}
                value={!ftEditPadre.proposito?.monitoreable}
                onChange={(v) => {
                  let aux = ftEditPadre.proposito;
                  aux = { ...aux, monitoreable: v.target.checked };
                  setFTEditPadre({ ...ftEditPadre, proposito: aux });
                }}
              />
            </Grid>
          )}
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              MONITOREABLE:
            </Typography>
          </Grid>
          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {ftPadre.proposito?.monitoreable}
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
                // value={!editProposito.adecuado}
                // onChange={(v) => {
                //   setEditProposito({
                //     ...editProposito,
                //     adecuado: !v.target.checked,
                //   });
                // }}
                value={!ftEditPadre.proposito?.adecuado}
                onChange={(v) => {
                  let aux = ftEditPadre.proposito;
                  aux = { ...aux, adecuado: v.target.checked };
                  setFTEditPadre({ ...ftEditPadre, proposito: aux });
                }}
              />
            </Grid>
          )}
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              ADECUADO:
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {ftPadre.proposito?.adecuado}
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
                // value={!editProposito.aporte_marginal}
                // onChange={(v) => {
                //   setEditProposito({
                //     ...editProposito,
                //     aporte_marginal: !v.target.checked,
                //   });
                // }}
                value={!ftEditPadre.proposito?.aporte_marginal}
                onChange={(v) => {
                  let aux = ftEditPadre.proposito;
                  aux = { ...aux, aporte_marginal: v.target.checked };
                  setFTEditPadre({ ...ftEditPadre, proposito: aux });
                }}
              />
            </Grid>
          )}
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              APORTE MARGINAL:
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {ftPadre.proposito?.aporte_marginal}
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
            sx={{ fontFamily: "MontserratBold", borderBottom: 1, mt: 5 }}
          >
            COMPONENTES
          </Typography>
        </Grid>

        {ftPadre.componentes.map((componente, index) => {
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
                    mt: 5,
                    textAlign: "center",
                  }}
                >
                  COMPONENTE {index + 1}
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
                      // value={!ftEditPadre.componentes[index]?.tipoDeIndicador}
                      // onChange={(v) => {
                      //   let aux = ftEditPadre.componentes[index]
                      //   aux = {...aux, tipoDeIndicador: v.target.checked }
                      //   setFTEditPadre({...ftEditPadre, componentes: aux  })
                      // }}
                      value={ftEditPadre.componentes[index]?.tipoDeIndicador}
                      onChange={(v) => {
                        let auxC = ftEditPadre.componentes;
                        auxC[index].tipoDeIndicador = v.target.checked;
                        setFTEditPadre({ ...ftEditPadre, componentes: auxC });
                      }}
                    />
                  </Grid>
                )}
                <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                  <Typography sx={{ fontFamily: "MontserratMedium" }}>
                    TIPO DE INDICADOR:
                  </Typography>
                </Grid>
                <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
                  <Typography sx={{ fontFamily: "MontserratLight" }}>
                    {componente?.tipoDeIndicador}
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
                      value={ftEditPadre.componentes[index]?.dimension}
                      onChange={(v) => {
                        let auxC = ftEditPadre.componentes;
                        auxC[index].dimension = v.target.checked;
                        setFTEditPadre({ ...ftEditPadre, componentes: auxC });
                      }}
                    />
                  </Grid>
                )}
                <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                  <Typography sx={{ fontFamily: "MontserratMedium" }}>
                    DIMENSIÓN:
                  </Typography>
                </Grid>

                <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
                  <Typography sx={{ fontFamily: "MontserratLight" }}>
                    {componente?.dimension}
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
                      value={ftEditPadre.componentes[index]?.unidadDeMedida}
                      onChange={(v) => {
                        let auxC = ftEditPadre.componentes;
                        auxC[index].unidadDeMedida = v.target.checked;
                        setFTEditPadre({ ...ftEditPadre, componentes: auxC });
                      }}
                    />
                  </Grid>
                )}
                <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                  <Typography sx={{ fontFamily: "MontserratMedium" }}>
                    UNIDAD DE MEDIDA:
                  </Typography>
                </Grid>
                <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
                  <Typography sx={{ fontFamily: "MontserratLight" }}>
                    {componente?.unidadDeMedida}
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
                      value={ftEditPadre.componentes[index]?.claridad}
                      onChange={(v) => {
                        let auxC = ftEditPadre.componentes;
                        auxC[index].claridad = v.target.checked;
                        setFTEditPadre({ ...ftEditPadre, componentes: auxC });
                      }}
                    />
                  </Grid>
                )}
                <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                  <Typography sx={{ fontFamily: "MontserratMedium" }}>
                    CLARIDAD:
                  </Typography>
                </Grid>
                <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
                  <Typography sx={{ fontFamily: "MontserratLight" }}>
                    {componente?.claridad}
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
                      value={ftEditPadre.componentes[index]?.relevancia}
                      onChange={(v) => {
                        let auxC = ftEditPadre.componentes;
                        auxC[index].relevancia = v.target.checked;
                        setFTEditPadre({ ...ftEditPadre, componentes: auxC });
                      }}
                    />
                  </Grid>
                )}

                <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                  <Typography sx={{ fontFamily: "MontserratMedium" }}>
                    RELEVANCIA:
                  </Typography>
                </Grid>
                <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
                  <Typography sx={{ fontFamily: "MontserratLight" }}>
                    {componente?.relevancia}
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
                      value={ftEditPadre.componentes[index]?.economia}
                      onChange={(v) => {
                        let auxC = ftEditPadre.componentes;
                        auxC[index].economia = v.target.checked;
                        setFTEditPadre({ ...ftEditPadre, componentes: auxC });
                      }}
                    />
                  </Grid>
                )}
                <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                  <Typography sx={{ fontFamily: "MontserratMedium" }}>
                    ECONOMÍA:
                  </Typography>
                </Grid>
                <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
                  <Typography sx={{ fontFamily: "MontserratLight" }}>
                    {componente?.economia}
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
                      value={ftEditPadre.componentes[index]?.monitoreable}
                      onChange={(v) => {
                        let auxC = ftEditPadre.componentes;
                        auxC[index].monitoreable = v.target.checked;
                        setFTEditPadre({ ...ftEditPadre, componentes: auxC });
                      }}
                    />
                  </Grid>
                )}
                <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                  <Typography sx={{ fontFamily: "MontserratMedium" }}>
                    MONITOREABLE:
                  </Typography>
                </Grid>
                <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
                  <Typography sx={{ fontFamily: "MontserratLight" }}>
                    {componente?.monitoreable}
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
                      value={ftEditPadre.componentes[index]?.adecuado}
                      onChange={(v) => {
                        let auxC = ftEditPadre.componentes;
                        auxC[index].adecuado = v.target.checked;
                        setFTEditPadre({ ...ftEditPadre, componentes: auxC });
                      }}
                    />
                  </Grid>
                )}
                <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                  <Typography sx={{ fontFamily: "MontserratMedium" }}>
                    ADECUADO:
                  </Typography>
                </Grid>
                <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
                  <Typography sx={{ fontFamily: "MontserratLight" }}>
                    {componente?.adecuado}
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
                      value={ftEditPadre.componentes[index]?.aporte_marginal}
                      onChange={(v) => {
                        let auxC = ftEditPadre.componentes;
                        auxC[index].aporte_marginal = v.target.checked;
                        setFTEditPadre({ ...ftEditPadre, componentes: auxC });
                      }}
                    />
                  </Grid>
                )}
                <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                  <Typography sx={{ fontFamily: "MontserratMedium" }}>
                    APORTE MARGINAL:
                  </Typography>
                </Grid>
                <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
                  <Typography sx={{ fontFamily: "MontserratLight" }}>
                    {componente?.aporte_marginal}
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
            sx={{ fontFamily: "MontserratBold", borderBottom: 1, mt: 5 }}
          >
            ACTIVIDADES
          </Typography>
        </Grid>

        {ftPadre.componentes.map(
          (componente: IComponentesFT, indexComponentes) => {
            let i = 0;
            return componente.actividades.map(
              (actividad: IActividadesFT, indexActividades) => {
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
                          mt: 5,
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
                      {localStorage.getItem("Rol") !==
                      "Administrador" ? null : (
                        <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                          <Checkbox
                            // value={!ftEditPadre.componentes[indexComponentes]?.actividades[indexActividades]?.tipoDeIndicador}
                            // onChange={(v) => {
                            //   let aux = ftEditPadre.componentes[indexComponentes]?.actividades[indexActividades]
                            //   aux = {...aux, tipoDeIndicador: v.target.checked }
                            //   setFTEditPadre({...ftEditPadre, componentes: aux  })
                            // }}
                            value={
                              !ftEditPadre.componentes[indexComponentes]
                                ?.actividades[indexActividades]?.tipoDeIndicador
                            }
                            onChange={(v) => {
                              let auxC = ftEditPadre.componentes;
                              auxC[indexComponentes].actividades[
                                indexActividades
                              ].tipoDeIndicador = v.target.checked;
                              setFTEditPadre({
                                ...ftEditPadre,
                                componentes: auxC,
                              });
                            }}
                          />
                        </Grid>
                      )}
                      <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                        <Typography sx={{ fontFamily: "MontserratMedium" }}>
                          TIPO DE INDICADOR:
                        </Typography>
                      </Grid>
                      <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
                        <Typography sx={{ fontFamily: "MontserratLight" }}>
                          {actividad.tipoDeIndicador}
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
                      {localStorage.getItem("Rol") !==
                      "Administrador" ? null : (
                        <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                          <Checkbox
                            // value={
                            //   !editActividades[indexComponentes]?.dimension
                            // }
                            // onChange={(v) => {
                            //   let past = [...editActividades];
                            //   past[indexComponentes].dimension =
                            //     !v.target.checked;
                            //   setEditActividades(past);
                            // }}
                            value={
                              !ftEditPadre.componentes[indexComponentes]
                                ?.actividades[indexActividades]?.dimension
                            }
                            onChange={(v) => {
                              let auxC = ftEditPadre.componentes;
                              auxC[indexComponentes].actividades[
                                indexActividades
                              ].dimension = v.target.checked;
                              setFTEditPadre({
                                ...ftEditPadre,
                                componentes: auxC,
                              });
                            }}
                          />
                        </Grid>
                      )}
                      <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                        <Typography sx={{ fontFamily: "MontserratMedium" }}>
                          DIMENSIÓN:
                        </Typography>
                      </Grid>
                      <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
                        <Typography sx={{ fontFamily: "MontserratLight" }}>
                          {actividad.dimension}
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
                      {localStorage.getItem("Rol") !==
                      "Administrador" ? null : (
                        <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                          <Checkbox
                            // value={
                            //   !editActividades[indexComponentes]?.unidadDeMedida
                            // }
                            // onChange={(v) => {
                            //   let past = [...editActividades];
                            //   past[indexComponentes].unidadDeMedida =
                            //     !v.target.checked;
                            //   setEditActividades(past);
                            // }}
                            value={
                              !ftEditPadre.componentes[indexComponentes]
                                ?.actividades[indexActividades]?.unidadDeMedida
                            }
                            onChange={(v) => {
                              let auxC = ftEditPadre.componentes;
                              auxC[indexComponentes].actividades[
                                indexActividades
                              ].unidadDeMedida = v.target.checked;
                              setFTEditPadre({
                                ...ftEditPadre,
                                componentes: auxC,
                              });
                            }}
                          />
                        </Grid>
                      )}
                      <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                        <Typography sx={{ fontFamily: "MontserratMedium" }}>
                          UNIDAD DE MEDIDA:
                        </Typography>
                      </Grid>
                      <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
                        <Typography sx={{ fontFamily: "MontserratLight" }}>
                          {actividad.unidadDeMedida}
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
                      {localStorage.getItem("Rol") !==
                      "Administrador" ? null : (
                        <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                          <Checkbox
                            // value={!editActividades[indexComponentes]?.claridad}
                            // onChange={(v) => {
                            //   let past = [...editActividades];
                            //   past[indexComponentes].claridad =
                            //     !v.target.checked;
                            //   setEditActividades(past);
                            // }}
                            value={
                              !ftEditPadre.componentes[indexComponentes]
                                ?.actividades[indexActividades]?.claridad
                            }
                            onChange={(v) => {
                              let auxC = ftEditPadre.componentes;
                              auxC[indexComponentes].actividades[
                                indexActividades
                              ].claridad = v.target.checked;
                              setFTEditPadre({
                                ...ftEditPadre,
                                componentes: auxC,
                              });
                            }}
                          />
                        </Grid>
                      )}
                      <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                        <Typography sx={{ fontFamily: "MontserratMedium" }}>
                          CLARIDAD:
                        </Typography>
                      </Grid>
                      <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
                        <Typography sx={{ fontFamily: "MontserratLight" }}>
                          {actividad.claridad}
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
                      {localStorage.getItem("Rol") !==
                      "Administrador" ? null : (
                        <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                          <Checkbox
                            // value={
                            //   !editActividades[indexComponentes]?.relevancia
                            // }
                            // onChange={(v) => {
                            //   let past = [...editActividades];
                            //   past[indexComponentes].relevancia =
                            //     !v.target.checked;
                            //   setEditActividades(past);
                            // }}
                            value={
                              !ftEditPadre.componentes[indexComponentes]
                                ?.actividades[indexActividades]?.relevancia
                            }
                            onChange={(v) => {
                              let auxC = ftEditPadre.componentes;
                              auxC[indexComponentes].actividades[
                                indexActividades
                              ].relevancia = v.target.checked;
                              setFTEditPadre({
                                ...ftEditPadre,
                                componentes: auxC,
                              });
                            }}
                          />
                        </Grid>
                      )}
                      <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                        <Typography sx={{ fontFamily: "MontserratMedium" }}>
                          RELEVANCIA:
                        </Typography>
                      </Grid>
                      <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
                        <Typography sx={{ fontFamily: "MontserratLight" }}>
                          {actividad.relevancia}
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
                      {localStorage.getItem("Rol") !==
                      "Administrador" ? null : (
                        <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                          <Checkbox
                            // value={!editActividades[indexComponentes]?.economia}
                            // onChange={(v) => {
                            //   let past = [...editActividades];
                            //   past[indexComponentes].economia =
                            //     !v.target.checked;
                            //   setEditActividades(past);
                            // }}
                            value={
                              !ftEditPadre.componentes[indexComponentes]
                                ?.actividades[indexActividades]?.economia
                            }
                            onChange={(v) => {
                              let auxC = ftEditPadre.componentes;
                              auxC[indexComponentes].actividades[
                                indexActividades
                              ].economia = v.target.checked;
                              setFTEditPadre({
                                ...ftEditPadre,
                                componentes: auxC,
                              });
                            }}
                          />
                        </Grid>
                      )}
                      <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                        <Typography sx={{ fontFamily: "MontserratMedium" }}>
                          ECONOMÍA:
                        </Typography>
                      </Grid>
                      <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
                        <Typography sx={{ fontFamily: "MontserratLight" }}>
                          {actividad.economia}
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
                      {localStorage.getItem("Rol") !==
                      "Administrador" ? null : (
                        <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                          <Checkbox
                            // value={
                            //   !editActividades[indexComponentes]?.monitoreable
                            // }
                            // onChange={(v) => {
                            //   let past = [...editActividades];
                            //   past[indexComponentes].monitoreable =
                            //     !v.target.checked;
                            //   setEditActividades(past);
                            // }}
                            value={
                              !ftEditPadre.componentes[indexComponentes]
                                ?.actividades[indexActividades]?.monitoreable
                            }
                            onChange={(v) => {
                              let auxC = ftEditPadre.componentes;
                              auxC[indexComponentes].actividades[
                                indexActividades
                              ].monitoreable = v.target.checked;
                              setFTEditPadre({
                                ...ftEditPadre,
                                componentes: auxC,
                              });
                            }}
                          />
                        </Grid>
                      )}
                      <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                        <Typography sx={{ fontFamily: "MontserratMedium" }}>
                          MONITOREABLE:
                        </Typography>
                      </Grid>

                      <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
                        <Typography sx={{ fontFamily: "MontserratLight" }}>
                          {actividad.monitoreable}
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
                      {localStorage.getItem("Rol") !==
                      "Administrador" ? null : (
                        <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                          <Checkbox
                            // value={!editActividades[indexComponentes]?.adecuado}
                            // onChange={(v) => {
                            //   let past = [...editActividades];
                            //   past[indexComponentes].adecuado =
                            //     !v.target.checked;
                            //   setEditActividades(past);
                            // }}
                            value={
                              !ftEditPadre.componentes[indexComponentes]
                                ?.actividades[indexActividades]?.adecuado
                            }
                            onChange={(v) => {
                              let auxC = ftEditPadre.componentes;
                              auxC[indexComponentes].actividades[
                                indexActividades
                              ].adecuado = v.target.checked;
                              setFTEditPadre({
                                ...ftEditPadre,
                                componentes: auxC,
                              });
                            }}
                          />
                        </Grid>
                      )}
                      <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                        <Typography sx={{ fontFamily: "MontserratMedium" }}>
                          ADECUADO:
                        </Typography>
                      </Grid>
                      <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
                        <Typography sx={{ fontFamily: "MontserratLight" }}>
                          {actividad.adecuado}
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
                      {localStorage.getItem("Rol") !==
                      "Administrador" ? null : (
                        <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                          <Checkbox
                            // value={
                            //   !editActividades[indexComponentes]
                            //     ?.aporte_marginal
                            // }
                            // onChange={(v) => {
                            //   let past = [...editActividades];
                            //   past[indexComponentes].aporte_marginal =
                            //     !v.target.checked;
                            //   setEditActividades(past);
                            // }}
                            value={
                              !ftEditPadre.componentes[indexComponentes]
                                ?.actividades[indexActividades]?.aporte_marginal
                            }
                            onChange={(v) => {
                              let auxC = ftEditPadre.componentes;
                              auxC[indexComponentes].actividades[
                                indexActividades
                              ].aporte_marginal = v.target.checked;
                              setFTEditPadre({
                                ...ftEditPadre,
                                componentes: auxC,
                              });
                            }}
                          />
                        </Grid>
                      )}
                      <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                        <Typography sx={{ fontFamily: "MontserratMedium" }}>
                          APORTE MARGINAL:
                        </Typography>
                      </Grid>
                      <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
                        <Typography sx={{ fontFamily: "MontserratLight" }}>
                          {actividad.aporte_marginal}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              }
            );
          }
        )}
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
          className="cancelar"
            //sx={queries.buttonCancelarSolicitudInscripcion}
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
              localStorage.getItem("Rol") === "Capturador" ? true : false
            }
            //sx={buttonStyles}
            className="aceptar"
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

              creaFT(estado);
            }}
          >
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              Guardar Borrador
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
            onClick={() =>{ console.log(estadoft)
            setOpenModalEnviar(true)}}
          >
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              {localStorage.getItem("Rol") === "Administrador"
                ? estadoft === "Autorizada"
                  ? "Modificar FT Autorizada"
                  : "Autorizar"
                : "Enviar"}
            </Typography>
          </Button>
        </Grid>

        {/*CAMBIAR POR EL MODAL DE MODIFICAR DE FICHA TÉCNICA*/}
        <ModalsSolicitModifFT
          open={openModalSolicitarModif}
          handleClose={handleCloseModif}
          // Ft={JSON.stringify(FT)}
          MIR={MIR}
          showResume={showResume}
          IdFT={IdFT}
          IdMa={IdMA}
          IdMIR={IdMir}
          FTEdit={JSON.stringify(ftEditPadre)}
          FT={JSON.stringify(FT)}
        />

        <ModalEnviarFT
          open={openModalEnviar}
          handleClose={handleCloseEnviar}
          MIR={MIR}
          IdFT={IdFT}
          IdMIR={IdMir}
          showResume={showResume}
          FT={JSON.stringify(FT)}
          IdMA={IdMA}
        />
      </Grid>

    </Grid>
  );
}

export default TabResumenFT;
