import { Grid, Typography, Button, Checkbox } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ModalEnviarFT from "../modalsFT/ModalEnviarFT";
import ModalsSolicitModifFT from "../modalsFT/ModalsSolicitModifFT";
import {
  IActividadesFT,
  IComponentesFT,
  ICValorFT,
  IEncabezadoFT,
  IFinFT,
  IFT,
  IPropositoFT,
} from "./Interfaces";
import { queries } from "../../queries";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
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
}) {
  const [FT, setFT] = useState<IFT>();

  let asignarFT = (
    encabezado: Array<IEncabezadoFT>,
    finM: Array<IFinFT>,
    propositoM: Array<IPropositoFT>,
    componentesM: Array<IComponentesFT>,
    
  ) => {
    setFT({
      encabezado: encabezado[0],
      fin: finM[0],
      proposito: propositoM[0],
      componentes: componentesM,
     
    });
  };
useEffect(() => {
  console.log("ftPadre: ",ftPadre);
  
}, [ftPadre])

  // useEffect(() => {
  //   let arr: any[] = [];
  //   cValor[0].componentes.map((a) => {
  //     a.actividades.map((b) => {
  //       Object.assign(b);
  //       arr.push(b);
  //     });
  //   });
  //   let cEdit = componenteValor.map((item) => {
  //     return {
  //       componentes: item.componentes,
  //       tipoDeIndicador: true,
  //       claridad: true,
  //       relevancia: true,
  //       economia: true,
  //       monitoreable: true,
  //       adecuado: true,
  //       aporte_marginal: true,
  //       dimension: true,
  //       unidadDeMedida: true,
  //     };
  //   });
  //   setEditComponentes(cEdit);

  //   let aEdit = arr.map((item) => {
  //     return {
  //       actividad: item.actividad,
  //       tipoDeIndicador: true,
  //       claridad: true,
  //       relevancia: true,
  //       economia: true,
  //       monitoreable: true,
  //       adecuado: true,
  //       aporte_marginal: true,
  //       dimension: true,
  //       unidadDeMedida: true,
  //     };
  //   });

  //   setEditActividades(aEdit);

  //   asignarFT(encabezado, fin, proposito, componenteValor );
  // }, [encabezado, componenteValor, proposito, fin, cValor]);

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
        Toast.fire({
          icon: "success",
          title: r.data.data.message,
        });
        showResume();
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: err.response.data.result.error,
        });
      });
  };
  const [editEncabezado, setEditEncabezado] = useState<IEncabezadoEditFT>({
    programaSER: true,
    objetivoSER: true,
    objetivoODS: true,
    metaODS: true,
    unidadDeMedida: true,
  });

  const [editFin, setEditFin] = useState<IFinEditFT>({
    tipoDeIndicador: true,
    claridad: true,
    relevancia: true,
    economia: true,
    monitoreable: true,
    adecuado: true,
    aporte_marginal: true,
    dimension: true,
    unidadDeMedida: true,
  });

  const [editProposito, setEditProposito] = useState<IPropositoEditFT>({
    tipoDeIndicador: true,
    claridad: true,
    relevancia: true,
    economia: true,
    monitoreable: true,
    adecuado: true,
    aporte_marginal: true,
    dimension: true,
    unidadDeMedida: true,
  });

  const [editComponentes, setEditComponentes] = useState<
    Array<IComponenteEditFT>
  >([]);

  const [editActividades, setEditActividades] = useState<
    Array<IActividadesEditFT>
  >([]);

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
      {/* <Grid
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
                value={!editEncabezado.programaSER}
                onChange={(v) => {
                  setEditEncabezado({
                    ...editEncabezado,
                    programaSER: !v.target.checked,
                  });
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
              {encabezado[0]?.programaSER}
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
                value={!editEncabezado.objetivoSER}
                onChange={(v) => {
                  setEditEncabezado({
                    ...editEncabezado,
                    objetivoSER: !v.target.checked,
                  });
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
              {encabezado[0]?.objetivoSER}
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
                value={!editEncabezado.objetivoODS}
                onChange={(v) => {
                  setEditEncabezado({
                    ...editEncabezado,
                    objetivoODS: !v.target.checked,
                  });
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
              {encabezado[0]?.objetivoODS}
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
                value={!editEncabezado.metaODS}
                onChange={(v) => {
                  setEditEncabezado({
                    ...editEncabezado,
                    metaODS: !v.target.checked,
                  });
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
              {encabezado[0]?.metaODS}
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
                value={!editFin.tipoDeIndicador}
                onChange={(v) => {
                  setEditFin({
                    ...editFin,
                    tipoDeIndicador: !v.target.checked,
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
              {fin[0]?.tipoDeIndicador}
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
                value={!editFin.dimension}
                onChange={(v) => {
                  setEditFin({
                    ...editFin,
                    dimension: !v.target.checked,
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
              {fin[0]?.dimension}
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
                value={!editFin.unidadDeMedida}
                onChange={(v) => {
                  setEditFin({
                    ...editFin,
                    unidadDeMedida: !v.target.checked,
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
              {fin[0]?.unidadDeMedida}
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
                value={!editFin.claridad}
                onChange={(v) => {
                  setEditFin({
                    ...editFin,
                    claridad: !v.target.checked,
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
              {fin[0]?.claridad}
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
                value={!editFin.relevancia}
                onChange={(v) => {
                  setEditFin({
                    ...editFin,
                    relevancia: !v.target.checked,
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
              {fin[0]?.relevancia}
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
                value={!editFin.economia}
                onChange={(v) => {
                  setEditFin({
                    ...editFin,
                    economia: !v.target.checked,
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
              {fin[0]?.economia}
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
                value={!editFin.monitoreable}
                onChange={(v) => {
                  setEditFin({
                    ...editFin,
                    monitoreable: !v.target.checked,
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
              {fin[0]?.monitoreable}
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
                value={!editFin.adecuado}
                onChange={(v) => {
                  setEditFin({
                    ...editFin,
                    adecuado: !v.target.checked,
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
              {fin[0]?.adecuado}
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
                value={!editFin.aporte_marginal}
                onChange={(v) => {
                  setEditFin({
                    ...editFin,
                    aporte_marginal: !v.target.checked,
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
              {fin[0]?.aporte_marginal}
            </Typography>
          </Grid>
        </Grid>
        {/*FIN DE FIN QUE IRÓNICO NO?

       
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
            //display: "flex",
            //flexDirection: "row",

            //mt: 1,
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          {localStorage.getItem("Rol") !== "Administrador" ? null : (
            <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
              <Checkbox
                value={!editProposito.tipoDeIndicador}
                onChange={(v) => {
                  setEditProposito({
                    ...editProposito,
                    tipoDeIndicador: !v.target.checked,
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
              {proposito[0]?.tipoDeIndicador}
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
                value={!editProposito.dimension}
                onChange={(v) => {
                  setEditProposito({
                    ...editProposito,
                    dimension: !v.target.checked,
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
              {proposito[0]?.dimension}
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
                value={!editProposito.unidadDeMedida}
                onChange={(v) => {
                  setEditProposito({
                    ...editProposito,
                    unidadDeMedida: !v.target.checked,
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
              {proposito[0]?.unidadDeMedida}
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
                value={!editProposito.claridad}
                onChange={(v) => {
                  setEditProposito({
                    ...editProposito,
                    claridad: !v.target.checked,
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
              {proposito[0]?.claridad}
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
                value={!editProposito.relevancia}
                onChange={(v) => {
                  setEditProposito({
                    ...editProposito,
                    relevancia: !v.target.checked,
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
              {proposito[0]?.relevancia}
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
                value={!editProposito.economia}
                onChange={(v) => {
                  setEditProposito({
                    ...editProposito,
                    economia: !v.target.checked,
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
              {proposito[0]?.economia}
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
                value={!editProposito.monitoreable}
                onChange={(v) => {
                  setEditProposito({
                    ...editProposito,
                    monitoreable: !v.target.checked,
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
              {proposito[0]?.monitoreable}
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
                value={!editProposito.adecuado}
                onChange={(v) => {
                  setEditProposito({
                    ...editProposito,
                    adecuado: !v.target.checked,
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
              {proposito[0]?.adecuado}
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
                value={!editProposito.aporte_marginal}
                onChange={(v) => {
                  setEditProposito({
                    ...editProposito,
                    aporte_marginal: !v.target.checked,
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
              {proposito[0]?.aporte_marginal}
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

        {componentes.map((index) => {
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
                  COMPONENTE {index}
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
                      value={!editComponentes[index - 1]?.tipoDeIndicador}
                      onChange={(v) => {
                        let past = [...editComponentes];
                        past[index - 1].tipoDeIndicador = !v.target.checked;
                        setEditComponentes(past);
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
                    {componenteValor[index - 1]?.tipoDeIndicador}
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
                      value={!editComponentes[index - 1]?.dimension}
                      onChange={(v) => {
                        let past = [...editComponentes];
                        past[index - 1].dimension = !v.target.checked;
                        setEditComponentes(past);
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
                    {componenteValor[index - 1]?.dimension}
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
                      value={!editComponentes[index - 1]?.unidadDeMedida}
                      onChange={(v) => {
                        let past = [...editComponentes];
                        past[index - 1].unidadDeMedida = !v.target.checked;
                        setEditComponentes(past);
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
                    {componenteValor[index - 1]?.unidadDeMedida}
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
                      value={!editComponentes[index - 1]?.claridad}
                      onChange={(v) => {
                        let past = [...editComponentes];
                        past[index - 1].claridad = !v.target.checked;
                        setEditComponentes(past);
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
                    {componenteValor[index - 1]?.claridad}
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
                      value={!editComponentes[index - 1]?.relevancia}
                      onChange={(v) => {
                        let past = [...editComponentes];
                        past[index - 1].relevancia = !v.target.checked;
                        setEditComponentes(past);
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
                    {componenteValor[index - 1]?.relevancia}
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
                      value={!editComponentes[index - 1]?.economia}
                      onChange={(v) => {
                        let past = [...editComponentes];
                        past[index - 1].economia = !v.target.checked;
                        setEditComponentes(past);
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
                    {componenteValor[index - 1]?.economia}
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
                      value={!editComponentes[index - 1]?.monitoreable}
                      onChange={(v) => {
                        let past = [...editComponentes];
                        past[index - 1].monitoreable = !v.target.checked;
                        setEditComponentes(past);
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
                    {componenteValor[index - 1]?.monitoreable}
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
                      value={!editComponentes[index - 1]?.adecuado}
                      onChange={(v) => {
                        let past = [...editComponentes];
                        past[index - 1].adecuado = !v.target.checked;
                        setEditComponentes(past);
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
                    {componenteValor[index - 1]?.adecuado}
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
                      value={!editComponentes[index - 1]?.aporte_marginal}
                      onChange={(v) => {
                        let past = [...editComponentes];
                        past[index - 1].aporte_marginal = !v.target.checked;
                        setEditComponentes(past);
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
                    {componenteValor[index - 1]?.aporte_marginal}
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

        {cValor[0].componentes.map((item, indexComponentes) => {
          let i = 0;
          return item.actividades.map((value, indexActividades) => {
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
                  {localStorage.getItem("Rol") !== "Administrador" ? null : (
                    <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                      <Checkbox
                        value={
                          !editActividades[indexComponentes]?.tipoDeIndicador
                        }
                        onChange={(v) => {
                          let past = [...editActividades];
                          past[indexComponentes].tipoDeIndicador =
                            !v.target.checked;
                          setEditActividades(past);
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
                      {
                        cValor[0].componentes[indexComponentes].actividades[
                          indexActividades
                        ].tipoDeIndicador
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
                        value={!editActividades[indexComponentes]?.dimension}
                        onChange={(v) => {
                          let past = [...editActividades];
                          past[indexComponentes].dimension = !v.target.checked;
                          setEditActividades(past);
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
                      {
                        cValor[0].componentes[indexComponentes].actividades[
                          indexActividades
                        ].dimension
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
                        value={
                          !editActividades[indexComponentes]?.unidadDeMedida
                        }
                        onChange={(v) => {
                          let past = [...editActividades];
                          past[indexComponentes].unidadDeMedida =
                            !v.target.checked;
                          setEditActividades(past);
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
                      {
                        cValor[0].componentes[indexComponentes].actividades[
                          indexActividades
                        ].unidadDeMedida
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
                        value={!editActividades[indexComponentes]?.claridad}
                        onChange={(v) => {
                          let past = [...editActividades];
                          past[indexComponentes].claridad = !v.target.checked;
                          setEditActividades(past);
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
                      {
                        cValor[0].componentes[indexComponentes].actividades[
                          indexActividades
                        ].claridad
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
                        value={!editActividades[indexComponentes]?.relevancia}
                        onChange={(v) => {
                          let past = [...editActividades];
                          past[indexComponentes].relevancia = !v.target.checked;
                          setEditActividades(past);
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
                      {
                        cValor[0].componentes[indexComponentes].actividades[
                          indexActividades
                        ].relevancia
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
                        value={!editActividades[indexComponentes]?.economia}
                        onChange={(v) => {
                          let past = [...editActividades];
                          past[indexComponentes].economia = !v.target.checked;
                          setEditActividades(past);
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
                      {
                        cValor[0].componentes[indexComponentes].actividades[
                          indexActividades
                        ].economia
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
                        value={!editActividades[indexComponentes]?.monitoreable}
                        onChange={(v) => {
                          let past = [...editActividades];
                          past[indexComponentes].monitoreable =
                            !v.target.checked;
                          setEditActividades(past);
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
                      {
                        cValor[0].componentes[indexComponentes].actividades[
                          indexActividades
                        ].monitoreable
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
                        value={!editActividades[indexComponentes]?.adecuado}
                        onChange={(v) => {
                          let past = [...editActividades];
                          past[indexComponentes].adecuado = !v.target.checked;
                          setEditActividades(past);
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
                      {
                        cValor[0].componentes[indexComponentes].actividades[
                          indexActividades
                        ].adecuado
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
                        value={
                          !editActividades[indexComponentes]?.aporte_marginal
                        }
                        onChange={(v) => {
                          let past = [...editActividades];
                          past[indexComponentes].aporte_marginal =
                            !v.target.checked;
                          setEditActividades(past);
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
                      {
                        cValor[0].componentes[indexComponentes].actividades[
                          indexActividades
                        ].aporte_marginal
                      }
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            );
          });
        })}
      </Grid> */}

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
            disabled={
              localStorage.getItem("Rol") === "Capturador" ? true : false
            }
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
          FTEdit={
            localStorage.getItem("Rol") !== "Administrador"
              ? ""
              : JSON.stringify({
                  fin: editFin,
                  proposito: editProposito,
                  componentes: editComponentes,
                  actividades: editActividades,
                })
          }
          FT={JSON.stringify(FT)}
        ></ModalsSolicitModifFT>

        <ModalEnviarFT
          open={openModalEnviar}
          handleClose={handleCloseEnviar}
          MIR={MIR}
          IdFT={IdFT}
          IdMIR={IdMir}
          showResume={showResume}
          FT={JSON.stringify(FT)}
          IdMA={IdMA}
        ></ModalEnviarFT>
      </Grid>
    </Grid>
  );
}

export default TabResumenFT;

export interface IEncabezadoEditFT {
  programaSER: boolean;
  objetivoSER: boolean;
  objetivoODS: boolean;
  metaODS: boolean;
  unidadDeMedida: boolean;
}

export interface IFinEditFT {
  tipoDeIndicador: boolean;
  claridad: boolean;
  relevancia: boolean;
  economia: boolean;
  monitoreable: boolean;
  adecuado: boolean;
  aporte_marginal: boolean;
  dimension: boolean;
  unidadDeMedida: boolean;
}

export interface IPropositoEditFT {
  tipoDeIndicador: boolean;
  claridad: boolean;
  relevancia: boolean;
  economia: boolean;
  monitoreable: boolean;
  adecuado: boolean;
  aporte_marginal: boolean;
  dimension: boolean;
  unidadDeMedida: boolean;
}

export interface IActividadesEditFT {
  actividad: string;
  tipoDeIndicador: boolean;
  claridad: boolean;
  relevancia: boolean;
  economia: boolean;
  monitoreable: boolean;
  adecuado: boolean;
  aporte_marginal: boolean;
  dimension: boolean;
  unidadDeMedida: boolean;
}

export interface IComponenteEditFT {
  componentes: string;
  tipoDeIndicador: boolean;
  claridad: boolean;
  relevancia: boolean;
  economia: boolean;
  monitoreable: boolean;
  adecuado: boolean;
  aporte_marginal: boolean;
  dimension: boolean;
  unidadDeMedida: boolean;
}
