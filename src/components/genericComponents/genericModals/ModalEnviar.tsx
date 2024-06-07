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
import { checKRF, checkFT, checkMA } from "./CheckDocumento";
import { IRF } from "../../tabsRaffi/interfacesRaffi";

export let errores: string[] = [];

export default function ModalEnviar({
  open,
  handleClose,
  RF,
  FT,
  MA,
  MIR,
  IdRF,
  IdFT,
  IdMA,
  IdMIR,
  showResume,
  IdEntidad,
  Documento,
}: {
  open: boolean;
  handleClose: Function;
  RF: string;
  FT: string;
  MA: string;
  MIR: string;
  IdRF: string;
  IdFT: string;
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

  let jsonRF: IRF =
    RF === ""
      ? ""
      : JSON.parse(RF).length > 1
      ? JSON.parse(RF)[0]
      : JSON.parse(RF);

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
            {/* {jsonRF.avanceFinanciero.valorProgramaPresupuestario} */}
            {localStorage.getItem("Rol") === "Administrador"
              ? "AL CONFIRMAR,  EL DOCUMENTO SE AUTORIZARÁ Y EL SIGUIENTE APARTADO SERÁ HABILITADO"
              : localStorage.getItem("Rol") === "Verificador"
              ? "AL CONFIRMAR, EL DOCUMENTO SE ENVIARÁ A LOS USUARIOS CORRESPONDIENTES PARA AUTORIZACIÓN"
              : "AL CONFIRMAR, EL DOCUMENTO SE ENVIARÁ A LOS USUARIOS CORRESPONDIENTES PARA REVISIÓN"}
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
                if (Documento === "MA") {
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
                    Documento
                  );
                }

                if (Documento === "FT") {
                  checkFT(
                    localStorage.getItem("Rol") === "Capturador"
                      ? "En Revisión"
                      : localStorage.getItem("Rol") === "Verificador"
                      ? "En Autorización"
                      : "Autorizada",
                    FT,
                    MA,
                    MIR,
                    IdFT,
                    IdMIR,
                    IdMA,
                    IdEntidad,
                    comment,
                    setComment,
                    showResume,
                    setNewComent,
                    handleClose,
                    Documento
                  );
                }

                if (Documento === "RF") {
                  checKRF(
                    localStorage.getItem("Rol") === "Capturador"
                      ? "En Revisión"
                      : localStorage.getItem("Rol") === "Verificador"
                      ? "En Autorización"
                      : "Autorizada",
                    jsonRF,
                    MA,
                    MIR,
                    IdRF,
                    IdMIR,
                    IdMA,
                    IdEntidad,
                    comment,
                    setComment,
                    showResume,
                    setNewComent,
                    handleClose,
                    Documento
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
