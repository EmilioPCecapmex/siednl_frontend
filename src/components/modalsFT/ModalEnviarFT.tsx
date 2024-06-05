import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Typography,
} from "@mui/material";
//import { sendMail } from "../../funcs/sendMailCustomMessage";
import { queries } from "../../queries";
import { IActividadesFT, IComponentesFT } from "../tabsFichaTecnica/Interfaces";
import {
  alertaEliminar,
  alertaErrorConfirm,
  alertaErroresDocumento,
  alertaExito,
  alertaExitoConfirm,
} from "../genericComponents/Alertas";
import {
  create_coment_mir,
  enviarNotificacionRol,
} from "../genericComponents/axiosGenericos";

export let errores: string[] = [];

export default function ModalEnviarFT({
  open,
  handleClose,
  MIR,
  FT,
  IdFT,
  IdMIR,
  IdMA,
  showResume,
  IdEntidad,
}: {
  open: boolean;
  handleClose: Function;
  MIR: string;
  FT: string;
  IdFT: string;
  IdMIR: string;
  IdMA: string;
  showResume: Function;
  IdEntidad: string;
}) {
  const [comment, setComment] = useState("");
  const [userXInst, setUserXInst] = useState<Array<IIUserXInst>>([]);
  const [newComent, setNewComent] = React.useState(false);
  const enviarMensaje = "Se ha creado una nueva";

  const comentFT = () => {
    create_coment_mir(IdMIR, comment, "FT")
      .then((r) => {
        setNewComent(false);
        setComment("");
      })
      .catch((err) => {});
  };

  let err = 0;

  

  const crearFichaTecnica = (estado: string) => {
    axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/create-ft-generic",
        {
          FichaTecnica: FT,
          CreadoPor: localStorage.getItem("IdUsuario"),
          IdMir: IdMIR,
          IdMa: IdMA,
          Id: IdFT,
          Estado: estado,
          Rol: localStorage.getItem("Rol"),
          IdEntidad:
            JSON.parse(MIR)?.encabezado.entidad.Id ||
            IdEntidad ||
            localStorage.getItem("IdEntidad"),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      ) //
      .then((r) => {
        let rol: string[] = [];

        if (localStorage.getItem("Rol") === "Verificador") {
          rol = ["Administrador"];
        }

        if (localStorage.getItem("Rol") === "Capturador") {
          rol = ["Verificador"];
        }

        if (localStorage.getItem("Rol") === "Administrador") {
          rol = ["Capturador", "Verificador"];
        }

        enviarNotificacionRol(
          "FT",
          "FT ENVIADA",
          IdFT,
          rol,
          JSON.parse(MIR)?.encabezado.entidad.Id || IdEntidad
        );

        alertaExitoConfirm(r.data.data.message.toUpperCase());

        if (comment !== "") {
          comentFT();
        }
        showResume();
      })
      .catch((err) => {
        alertaErrorConfirm(err.response.data.result.error.toUpperCase());
      });
  };

  useEffect(() => {
    if (open) {
      ////////////////////////Esto esta fallando
      axios
        .post(
          process.env.REACT_APP_APPLICATION_BACK + "/api/tipo-usuario",
          {
            TipoUsuario: localStorage.getItem("Rol"),
            IdEntidad: IdEntidad ||  JSON.parse(MIR)?.encabezado.entidad.Id || localStorage.getItem("IdEntidad"),
            IdApp: localStorage.getItem("dApp"),
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
    <Dialog fullWidth 
    maxWidth="md" 
    open={open} 
    onClose={() => handleClose()}>
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
              ? "AL CONFIRMAR, LA FICHA TÉCNICA SE AUTORIZARÁ."
              : localStorage.getItem("Rol") === "Verificador"
              ? "AL CONFIRMAR, LA FICHA TÉCNICA SE ENVIARÁ A LOS USUARIOS CORRESPONDIENTES PARA AUTORIZACIÓN."
              : "AL CONFIRMAR, LA FICHA TÉCNICA SE ENVIARÁ A LOS USUARIOS CORRESPONDIENTES PARA REVISIÓN."}
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
              // width: "30vw",
              mt: "4vh",
            }}
          >
            <Button
              className="cancelar"
              sx={{ marginRight: "1rem" }}
              //sx={queries.buttonCancelarSolicitudInscripcion}
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
                checkFT(
                  localStorage.getItem("Rol") === "Capturador"
                    ? "En Revisión"
                    : localStorage.getItem("Rol") === "Verificador"
                    ? "En Autorización"
                    : "Autorizada"
                );
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
