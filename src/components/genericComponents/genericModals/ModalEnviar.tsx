import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { IActividadesMA, IComponenteMA } from "../../tabsMetaAnual/Interfaces";
import {
  alertaErrorConfirm,
  alertaErroresDocumento,
  alertaExito,
  alertaExitoConfirm,
} from "../Alertas";
import { enviarNotificacionRol } from "../axiosGenericos";
import { checkMA } from "./CheckDocumento";

export let errores: string[] = [];

export default function ModalEnviar({
  open,
  handleClose,
  MA,
  MIR,
  IdMA,
  IdMIR,
  showResume,
  IdEntidad,
  Documento,
}: {
  open: boolean;
  handleClose: Function;
  MA: string;
  MIR: string;
  IdMA: string;
  IdMIR: string;
  showResume: Function;
  IdEntidad: string;
  Documento: string;
}) {
  const [comment, setComment] = useState("");
  const [userXInst, setUserXInst] = useState<Array<IIUserXInst>>([]);
  const [newComent, setNewComent] = React.useState(false);

  let err = 0;

  useEffect(() => {
    if (open) {
      axios
        .post(
          // eslint-disable-next-line no-useless-concat
          process.env.REACT_APP_APPLICATION_BACK + "/api/tipo-usuario",
          {
            TipoUsuario: localStorage.getItem("Rol"),
            IdEntidad:
              IdEntidad ||
              JSON.parse(MIR)?.encabezado.entidad.Id ||
              localStorage.getItem("IdEntidad"),
            IdApp: localStorage.getItem("IdApp"),
          },
          {
            headers: {
              Authorization: localStorage.getItem("jwtToken") || "",
            },
          }
        )
        .then((r) => {
          if (r.status === 200) {
            setUserXInst(r.data.data);
          }
        });
    }
  }, [MIR, open]);

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={() => handleClose()}>
      <DialogTitle
        sx={{
          fontFamily: "MontserratBold",
          borderBottom: 1,
          fontSize: [18, 20, 15, 20, 15],
          height: ["12vh", "10vh", "8vh", "8vh", "8vh"],
          mb: 2,
        }}
      >
        {localStorage.getItem("Rol") === "Administrador"
          ? "CONFIRMAR AUTORIZACIÓN"
          : "CONFIRMAR ENVÍO"}
      </DialogTitle>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            mb: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: [15, 15, 15, 15, 15],
              fontFamily: "MontserratMedium",
              textAlign: "center",
            }}
          >
            {localStorage.getItem("Rol") === "Administrador"
              ? "AL CONFIRMAR, LA META ANUAL SE AUTORIZARÁ Y EL APARTADO DE LA FICHA TÉCNICA Y RAFFI SERÁ HABILITADO"
              : localStorage.getItem("Rol") === "Verificador"
              ? "AL CONFIRMAR, LA META ANUAL SE ENVIARÁ A LOS USUARIOS CORRESPONDIENTES PARA AUTORIZACIÓN"
              : "AL CONFIRMAR, LA META ANUAL SE ENVIARÁ A LOS USUARIOS CORRESPONDIENTES PARA REVISIÓN"}
          </Typography>
        </Grid>

        <Grid sx={{ width: ["55vw", "60vw", "60vw", "40vw", "30vw"] }}>
          <TextField
            multiline
            rows={3}
            label={"AGREGAR COMENTARIO"}
            sx={{ width: ["55vw", "60vw", "60vw", "40vw", "30vw"] }}
            onChange={(v) => setComment(v.target.value)}
          ></TextField>
        </Grid>

        <Grid
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBlockEnd: "1vh",
            paddingBlockEnd: "1vh",
          }}
        >
          <Grid
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              //width: "20vw",
              mt: "4vh",
            }}
          >
            <Button
              className="cancelar"
              //sx={queries.buttonCancelarSolicitudInscripcion}
              sx={{ marginRight: "1rem" }}
              onClick={() => handleClose()}
            >
              <Typography sx={{ fontFamily: "MontserratRegular" }}>
                CANCELAR
              </Typography>
            </Button>

            <Button
              className="aceptar"
              //sx={queries.buttonContinuarSolicitudInscripcion}
              onClick={() => {
                if(Documento === "MA"){
                  checkMA(
                  localStorage.getItem("Rol") === "Capturador"
                    ? "En Revisión"
                    : localStorage.getItem("Rol") === "Verificador"
                    ? "En Autorización"
                    : "Autorizada",
                  MA,
                  MIR,
                  IdMIR,
                  IdMA,
                  IdEntidad,
                  comment,
                  setComment,
                  showResume,
                  setNewComent,
                  handleClose,
                  Documento,
                );
                }
                
                handleClose();
                setNewComent(false);
              }}
            >
              <Typography sx={{ fontFamily: "MontserratRegular" }}>
                CONFIRMAR
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export interface IIUserXInst {
  IdUsuario: string;
  IdUsuarioTiCentral: string;
  Rol: string;
  NombrelineaBase: string;
  Nombre: string;
  ApellidoPaterno: string;
  CorreoElectronico: string;
}
