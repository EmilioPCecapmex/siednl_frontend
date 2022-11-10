import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Box,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  AlertColor,
  Typography,
  FormHelperText,
} from "@mui/material";
import { IUsuarios } from "../../screens/notification/interfaces";
import { setResumeDefaultMIR } from "../../screens/mir/MIR";

export default function ModalSolicitaModif({
  open,
  handleClose,
  MIR,
  MIREdit,
  showResume,
  IdMir,
}: {
  open: boolean;
  handleClose: Function;
  MIR: string;
  MIREdit: string;
  showResume: Function;
  IdMir: string;
}) {
  const [userXInst, setUserXInst] = useState<Array<IIUserXInst>>([]);
  const [userSelected, setUserSelected] = useState("0");
  const [instSelected, setInstSelected] = useState("");

  const [comment, setComment] = useState("");

  const comentMir = (id: string) => {
    axios
      .post(
        "http://10.200.4.105:8000/api/coment-mir",
        {
          IdMir: id,
          Coment: comment,
          CreadoPor: localStorage.getItem("IdUsuario"),
          MIR_MA:'MIR'
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        setComment("");
      })
      .catch((err) => {});
  };

  const checkUsuario = (estado: string) => {
    if (userSelected === "0" || userSelected === "") {
      return Toast.fire({
        icon: "error",
        title: "Introduce usuario al que se le solicita modificación",
      });
    } else {
      createMIR(estado);
    }
  };

  const createMIR = (estado: string) => {
    if (estado === "Autorizada" && userSelected !== "0") {
      estado = "En Revisión";
    } else if (estado === "En Autorización" && userSelected !== "0") {
      estado = "En Captura";
    }
    axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/create-mir",
        {
          
          MIR: MIREdit == undefined ? MIR : "[" + MIR + "," + MIREdit + "]",
          Estado: estado,
          CreadoPor:
            userSelected !== "0"
              ? userSelected
              : localStorage.getItem("IdUsuario"),
          AnioFiscal: JSON.parse(MIR)?.encabezado.ejercicioFiscal,
          Institucion: JSON.parse(MIR)?.encabezado.institucion,
          Programa: JSON.parse(MIR)?.encabezado.nombre_del_programa,
          Eje: JSON.parse(MIR)?.encabezado.eje,
          Tematica: JSON.parse(MIR)?.encabezado.tema,
          IdMir: IdMir,
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        if (comment != "") {
          comentMir(r.data.data.ID);
        }
        Toast.fire({
          icon: "success",
          title: localStorage.getItem("Rol") === 'Verificador' ? 'MIR enviada a capturador': 'MIR enviada a revisión',
        });

        enviarNotificacion();
        handleClose();
        showResume();
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: err.response.data.result.error,
        });
      });
  };

  const getUsuariosXInstitucion = () => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/usuarioXInstitucion", {
        params: {
          IdUsuario: localStorage.getItem("IdUsuario"),
          Institucion: JSON.parse(MIR)?.encabezado.institucion,
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          setUserXInst(r.data.data);
        }
      });
  };

  useEffect(() => {
    if (open) {
      getUsuariosXInstitucion();
      setInstSelected(JSON.parse(MIR)?.encabezado.institucion);
    }
  }, [open]);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const enviarNotificacion = () => {
    axios.post(
      process.env.REACT_APP_APPLICATION_BACK + "/api/create-notif",
      {
        IdUsuarioDestino: userSelected,
        Titulo: "MIR",
        Mensaje: "Se le ha solicitado una modificación.",
        IdUsuarioCreador: localStorage.getItem("IdUsuario"),
      },
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      }
    );
  };

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={() => handleClose()}>
      <DialogTitle sx={{ fontFamily: "MontserratBold" }}>
        Solicitud de modificación
      </DialogTitle>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            backgroundColor: "#BBBABA",
            width: "60vw",
            height: "0.1vh",
            display: "flex",
            justifyContent: "center",
          }}
        />
      </Box>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Typography sx={{ fontFamily: "MontserratMedium" }}>
            Selecciona usuario para solicitar modificación
          </Typography>
          <FormControl
            sx={{
              display: "flex",
              width: "70%",
              alignItems: "center",
              justifyContent: "center",
              border: 1,
              borderRadius: 1,
              borderColor: "#616161",
              mb: 2,
            }}
            variant="standard"
          >
            <Select
              size="small"
              sx={{ fontFamily: "MontserratRegular" }}
              fullWidth
              value={userSelected}
              onChange={(v) => setUserSelected(v.target.value)}
              disableUnderline
            >
              <MenuItem value={"0"} disabled>
                Selecciona
              </MenuItem>

              {userXInst.map((item) => {
                return (
                  <MenuItem value={item.IdUsuario} key={item.IdUsuario}>
                    {item.Nombre}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>{" "}
        </Box>

        <Box sx={{ width: "100%", mb: 2 }}>
          <TextField
            multiline
            rows={2}
            label={"Agregar Comentario"}
            sx={{ width: "100%" }}
            onChange={(v) => setComment(v.target.value)}
          ></TextField>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBlockEnd: "1vh",
            paddingBlockEnd: "1vh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-evenly",
              width: "100vw",
            }}
          >
            <Button
              sx={{ display: "flex", width: "10vw" }}
              variant="contained"
              color="error"
              onClick={() => handleClose()}
            >
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                Cancelar
              </Typography>
            </Button>

            <Button
              sx={{ display: "flex", width: "10vw" }}
              variant="contained"
              color="primary"
              onClick={() => {
                checkUsuario(
                  localStorage.getItem("Rol") == "Capturador"
                    ? "En Revisión"
                    : localStorage.getItem("Rol") == "Verificador"
                    ? "En Autorización"
                    : "Autorizada"
                );
                handleClose();
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                {comment === "" ? "Enviar sin comentarios" : "Confirmar"}
              </Typography>
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export interface IIUserXInst {
  IdUsuario: string;
  IdUsuarioTiCentral: string;
  Rol: string;
  NombreInstitucion: string;
  Nombre: string;
  ApellidoPaterno: string;
}
