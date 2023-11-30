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
  IAvanceFinancieroRF,
  IComponenteRF,
  IFinRF,
  IPropositoRF,
  IRF,
  IRFEdit,
} from "./interfacesRaffi";

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
          IdMir: IdMir,
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
        Toast.fire({
          icon: "error",
          title: err.response.data,
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

        {/* ######################################################
            ############ INICIA DISPLAY DE AVANCE FINANCIERO ########
            #########################################################*/}

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
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
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
            Actividad 
          </Typography>
        </Grid>
      </Grid>

      <Grid
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          width: "100%",
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
          disabled={isCapturador ? true : false}
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

        {/* <ModalSolicitaModif
          open={openModalSolicitarModif}
          handleClose={handleCloseModif}
          MA={JSON.stringify(MA)}
          MIR={MIR}
          showResume={showResume}
          IdMA={IdMA}
          IdMIR={IdMir}
          MAEdit={
            localStorage.getItem("Rol") === "Capturador"
              ? ""
              : JSON.stringify({
                fin: editFin,
                proposito: editProposito,
                componentes: editComponentes,
                actividades: editActividades,
              })
          }
        ></ModalSolicitaModif>

        <ModalEnviarMA
          open={openModalEnviar}
          handleClose={handleCloseEnviar}
          MA={JSON.stringify(MA)}
          MIR={MIR}
          IdMA={IdMA}
          IdMIR={IdMir}
          showResume={showResume}
        ></ModalEnviarMA> */}
      </Grid>
    </Grid>
  );
};
