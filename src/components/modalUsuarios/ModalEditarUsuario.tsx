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
} from "@mui/material";
import { DataUsuariosTiCentral } from "../datatable/interface";

export default function ModalEditarUsuario({
  title,
  open,
  handleClose,
  IdUsuario
}: {
  title: string;
  open: boolean;
  handleClose: Function;
  IdUsuario: string;
}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [names, setNames] = useState("");
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [institution, setInstitution] = useState("0");
  const [rol, setRol] = useState("");
  const [userType, setUserType] = useState("0");
  const [telephone, setTelephone] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [idUsuarioCentral, setIdUsuarioCentral] = useState("");
  const [usuario, setUsuario] = useState([
    {
      Id: "",
      IdUsuarioTiCentral: "",
      Nombre: "",
      ApellidoPaterno: "",
      ApellidoMaterno: "",
      CorreoElectronico: "",
      NombreUsuario: "",
      Cargo: "",
      Telefono: "",
      Celular: "",
      IdRol: "",
      Rol: "",
      IdInstitucion: "",
      NombreInstitucion: "",
      CreadoPor: "",
      ModificadoPor: "",
    },
  ]);

  const [catalogoInstituciones, setCatalogoInstituciones] = useState([{Id: "",
  NombreInstitucion: ""
  },]);

  const [userTypeCatalogue, setUserTypeCatalogue] = useState([{Id: "",
  Rol: ""
  },]);


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

  const getInstituciones = () => {
    axios.get("http://10.200.4.105:8000/api/instituciones", {
      headers: {
        Authorization: localStorage.getItem("jwtToken") || "",
      }
    }).then(
      (r) => {
        setCatalogoInstituciones(r.data.data)
      }

    )
  }

  const getUsuario = () => {
    axios.get("http://10.200.4.105:8000/api/usuario", {
        params:{
            "IdUsuario": IdUsuario
        },
      headers: {
        Authorization: localStorage.getItem("jwtToken") || "",
      }
    }).then(
      (r) => {
        console.log(r.data.data);
        // setUsuario(r.data.data);
        // console.log(usuario);
        
      }

    )
  }

  const getUserType = () => {
    axios.get("http://10.200.4.105:8000/api/roles", {
      headers: {
        Authorization: localStorage.getItem("jwtToken") || "",
      }
    }).then(
      (r) => {
        setUserTypeCatalogue(r.data.data)
      }

    )
  }

  const userTypes = [
    {
      id: 1,
      desc: "Administrador",
    },
    {
      id: 2,
      desc: "Capturador",
    },
    {
      id: 3,
      desc: "Verificador",
    },
  ];

  useEffect(() => {
 getInstituciones();
 getUserType();
 getUsuario();
  }, [])
  

  return (
    <Dialog fullWidth maxWidth="lg" open={open} onClose={() => handleClose()}>
      <DialogTitle sx={{fontFamily: 'MontserratBold'}}>{title.toUpperCase()}</DialogTitle>

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

      {usuario.map((row) => (
      <DialogContent
      key={row.Id}
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
            justifyContent: "space-between",
          }}
        >
          <TextField
            label="Usuario"
            variant="outlined"
            value={row.NombreUsuario}
            sx={{
              width: "40%",
              ml: "2vw",
            }}
            onChange={(v) => setUsername(v.target.value)}
          />

          <TextField
            label="Correo Electrónico"
            variant="outlined"
            type="email"
            onChange={(v) => setEmail(v.target.value)}
            value={email}
            sx={{
              width: "40%",
              mr: "2vw",
            }}
          />
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            mt: "3vh",
          }}
        >
          <TextField
            label="Nombre(s)"
            variant="outlined"
            value={names}
            onChange={(x) => setNames(x.target.value)}
            sx={{
              width: "30%",
              ml: "2vw",
            }}
          />

          <TextField
            label="Apellido Paterno"
            variant="outlined"
            value={firstName}
            onChange={(x) => setFirstName(x.target.value)}
            sx={{
              width: "30%",
            }}
          />
          <TextField
            label="Apellido Materno"
            variant="outlined"
            value={secondName}
            onChange={(x) => setSecondName(x.target.value)}
            sx={{
              width: "30%",
              mr: "2vw",
            }}
          />
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            mt: "3vh",
          }}
        >
          <FormControl
            sx={{
              width: "30%",
              ml: "2vw",
            }}
          >
            <InputLabel id="demo-simple-select-label">Institución</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={institution}
              label="Institución"
              onChange={(x) => setInstitution(x.target.value)}
            >
              <MenuItem value={"0"} key={0} disabled>
                Selecciona
              </MenuItem>
              {catalogoInstituciones.map((item) => {
                return (
                  <MenuItem value={item.Id} key={item.Id}>
                    {item.NombreInstitucion}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <TextField
            label="Cargo"
            variant="outlined"
            value={rol}
            onChange={(x) => setRol(x.target.value)}
            sx={{
              width: "30%",
            }}
          />
          <FormControl
            sx={{
              width: "30%",
              mr: "2vw",
            }}
          >
            <InputLabel id="demo-simple-select-label">
              Tipo de Usuario
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={userType}
              label="Tipo de Usuario"
              onChange={(x) => setUserType(x.target.value)}
            >
              <MenuItem value={"0"} key={0} disabled>
                Selecciona
              </MenuItem>

              {userTypeCatalogue.map((item) => {
                return (
                  <MenuItem value={item.Id} key={item.Id}>
                    {item.Rol}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            mt: "3vh",
          }}
        >
          <TextField
            label="Teléfono"
            variant="outlined"
            sx={{
              width: "30%",
              ml: "10vw",
            }}
            type="tel"
            value={telephone}
            onChange={(x) => setTelephone(x.target.value)}
          />

          <TextField
            label="Celular"
            variant="outlined"
            type="tel"
            sx={{
              width: "30%",
              mr: "10vw",
            }}
            value={cellphone}
            onChange={(x) => setCellphone(x.target.value)}
          />
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
            >
              Actualizar
            </Button>
          </Box>
        </Box>
      </DialogContent>
      ))}
    </Dialog>
  );
}
