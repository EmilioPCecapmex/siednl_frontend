import React, { useEffect, useState } from "react";
import {
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  TextField,
  Button,
} from "@mui/material";
import { Header } from "../../components/header/Header";
import { LateralMenu } from "../../components/lateralMenu/LateralMenu";
import escudo from "../../assets/logos/escudo.png";
import axios from "axios";
import { IUsuarios } from "./interfaces";
import Swal from "sweetalert2";

export const Notification = () => {
  const [usuarios, setUsuarios] = useState<Array<IUsuarios>>();
  const [titulo, setTitulo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState("");

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

  const [errorForm, setErrorForm] = useState({
    visible: false,
    text: "",
    type: "",
  });

  const limpiaForm = () => {
    setTitulo("");
    setMensaje("");
    setUsuarioSeleccionado("");
    setErrorForm({
        visible: false,
        text: "",
        type: "",
    })
  };

  const revisaForm = () => {
    if (usuarioSeleccionado === "") {
      setErrorForm({
        visible: true,
        text: "Selecciona un usuario",
        type: "user",
      });
    } else if (titulo === "") {
      setErrorForm({
        visible: true,
        text: "Ingresa Titulo",
        type: "titulo",
      });
    } else if (mensaje === "") {
      setErrorForm({
        visible: true,
        text: "Ingresa Mensaje",
        type: "mensaje",
      });
    } else {
      enviarNotificacion();
    }
  };

  const enviarNotificacion = () => {
    axios
      .post(
        "http://localhost:8000/api/create-notif",
        {
          IdUsuarioDestino: usuarioSeleccionado,
          Titulo: titulo,
          Mensaje: mensaje,
          IdUsuarioCreador: localStorage.getItem("IdUsuario"),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        if (r.status === 200) {
          limpiaForm();
          Toast.fire({
            icon: "success",
            title: "Notificación enviada",
          });
        }
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

  useEffect(() => {
    getUsuarios();
  }, []);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 10fr",
        backgroundColor: "#F2F2F2",
      }}
    >
      <LateralMenu selection={7} />
      <Header
        details={{
          name1: "Notificaciones",
          path1: "../notifications",
          name2: "",
          path2: "#",
          name3: "",
        }}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "90%",
            height: "15vh",
            backgroundColor: "#fff",
            display: "flex",
            borderRadius: 10,
            boxShadow: 5,
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <FormControl>
            <InputLabel id="UsuarioLabel">Usuario</InputLabel>
            <Select
              labelId="UsuarioLabel"
              error={errorForm.type === "user" ? errorForm.visible : false}
              label="Usuario"
              sx={{ width: "20vw" }}
              onChange={(v) => setUsuarioSeleccionado(v.target.value as string)}
              value={usuarioSeleccionado || ""}
            >
              {usuarios?.map((item) => {
                return (
                  <MenuItem key={item.Id} value={item.Id}>
                    {item.Nombre +
                      " " +
                      item.ApellidoPaterno +
                      " " +
                      item.ApellidoMaterno}
                    {" | " + item.NombreUsuario}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText sx={{color: '#ff0000'}}>
              {errorForm.type === "user" ? errorForm.text : null}
            </FormHelperText>
          </FormControl>
        </Box>
        <Box
          sx={{
            mt: "5vh",
            width: "90%",
            height: "60%",
            backgroundColor: "#fff",
            display: "flex",
            borderRadius: 10,
            boxShadow: 5,
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <TextField
            label="Titulo"
            sx={{ width: "50vw", mt: "10vh" }}
            onChange={(v) => setTitulo(v.target.value)}
            value={titulo}
            error={errorForm.type === "titulo" ? errorForm.visible : false}
            helperText={errorForm.type === "titulo" ? errorForm.text : null}
          />

          <TextField
            multiline
            rows={7}
            label="Mensaje"
            value={mensaje}
            onChange={(v) => setMensaje(v.target.value)}
            sx={{ width: "50vw", mt: "10vh" }}
            error={errorForm.type === "mensaje" ? errorForm.visible : false}
            helperText={errorForm.type === "mensaje" ? errorForm.text : null}
          />

          <Button
            variant="contained"
            color="inherit"
            sx={{ mt: "7vh", ml: "60vw" }}
            onClick={() => revisaForm()}
          >
            Enviar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
