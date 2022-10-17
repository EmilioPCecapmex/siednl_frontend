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
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState("");
  const [correoSeleccionado, setCorreoSeleccionado] = useState("");

  const [userTypeCatalogue, setUserTypeCatalogue] = useState([
    { Id: "", Rol: "" },
  ]);

  const createMIR = (estado: string) => {
    axios
      .post(
        "http://10.200.4.105:8000/api/create-mir",
        {
          MIR: JSON.stringify(MIR),
          Estado: estado,
          CreadoPor: localStorage.getItem("IdUsuario"),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        console.log(r);
        Toast.fire({
          icon: "success",
          title: "MIR generada con éxito",
        });

        console.log(r);
      })
      .catch((err) => {
        // console.log(err.response.data.result.error)
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
        Seleccione usuario o correo electrónico a enviar
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
          <FormControl>
            <InputLabel id="UsuarioLabel" sx={{ fontFamily: "MontserratBold" }}>
              Usuario
            </InputLabel>
            <Select
              labelId="UsuarioLabel"
              error={errorForm.type === "user" ? errorForm.visible : false}
              label="Usuario"
              sx={{ width: "20vw" }}
              onChange={(v) => setUsuarioSeleccionado(v.target.value as string)}
              value={usuarioSeleccionado || ""}
            >
              <MenuItem value="00-00">
                <Typography sx={{ fontFamily: "MontserratMedium" }}>
                  Todos
                </Typography>
              </MenuItem>

              {usuarios?.map((item) => {
                return (
                  <MenuItem key={item.Id} value={item.Id}>
                    <Typography sx={{ fontFamily: "MontserratMedium" }}>
                      {item.Nombre +
                        " " +
                        item.ApellidoPaterno +
                        " " +
                        item.ApellidoMaterno}
                      {" | " + item.NombreUsuario}
                    </Typography>
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText sx={{ color: "#ff0000" }}>
              {errorForm.type === "user" ? errorForm.text : null}
            </FormHelperText>
          </FormControl>
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
              onClick={() => checkForm()}
            >
              Confirmar
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
