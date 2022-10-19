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

export default function ModalEnviarMIR({
  open,
  handleClose,
  MIR,
}: {
  open: boolean;
  handleClose: Function;
  MIR: string;
}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [usuarios, setUsuarios] = useState<Array<IUsuarios>>();

  const [userTypeCatalogue, setUserTypeCatalogue] = useState([
    { Id: "", Rol: "" },
  ]);

  const createMIR = (estado: string) => {
    axios
      .post(
        "http://10.200.4.105:8000/api/create-mir",
        {
          MIR: MIR,
          Estado: estado,
          CreadoPor: localStorage.getItem("IdUsuario"),
          AnioFiscal: JSON.parse(MIR)?.Encabezado.ejercicioFiscal,
          Institucion: JSON.parse(MIR)?.Encabezado.institucion,
          Programa: JSON.parse(MIR)?.Encabezado.programa,
          Eje: JSON.parse(MIR)?.Encabezado.eje,
          Tematica: JSON.parse(MIR)?.Encabezado.tematica,
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
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: err.response.data.result.error,
        });
      });
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const [errorForm, setErrorsForm] = useState({
    visible: false,
    text: "",
    type: "",
  });

  const AlertForm = () => {
    return (
      <Box sx={{ mt: "1vh", mb: "2vh" }}>
        <Alert severity={errorForm.type as AlertColor}>{errorForm.text}</Alert>
      </Box>
    );
  };

  const cleanForm = () => {
    setUsername("");
    setEmail("");
  };

  const getUserType = () => {
    axios
      .get("http://10.200.4.105:8000/api/roles", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setUserTypeCatalogue(r.data.data);
      });
  };

  const getUsuarios = () => {
    axios
      .get("http://10.200.4.105:8000/api/usuarios", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setUsuarios(response.data.data);
      });
  };

  const checkForm = () => {
    setErrorsForm({
      visible: false,
      text: "",
      type: "",
    });

    if (username === "") {
      setErrorsForm({
        visible: true,
        text: "Ingresa un nombre de usuario.",
        type: "error",
      });
    } else if (email === "") {
      setErrorsForm({
        visible: true,
        text: "Ingresa un correo electrónico.",
        type: "error",
      });
    } else {
      setErrorsForm({
        visible: true,
        text: "Selecciona",
        type: "error",
      });
    }
  };

  useEffect(() => {
    getUsuarios();
    getUserType();
  }, []);

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={() => handleClose()}>
      <DialogTitle sx={{ fontFamily: "MontserratBold" }}>
        Confirmar Envío
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
        {errorForm.visible ? <AlertForm /> : null}

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <Typography sx={{ fontFamily: "MontserratMedium" }}>Al confirmar, la MIR se enviará a los usuarios correspondientes para revisión.</Typography>
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
              mt: "4vh",
            }}
          >
            <Button
              sx={{ display: "flex", width: "10vw" }}
              variant="contained"
              color="error"
              onClick={() => handleClose()}
            >
              Cancelar
            </Button>
            <Button
              sx={{ display: "flex", width: "10vw" }}
              variant="contained"
              color="primary"
              onClick={() => {createMIR('En Revisión'); handleClose()}}
            >
              Confirmar
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
