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

export default function ModalVincularUsuario({
  title,
  open,
  handleClose,
}: {
  title: string;
  open: boolean;
  handleClose: Function;
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

  const [catalogoInstituciones, setCatalogoInstituciones] = useState([
    { Id: "", NombreInstitucion: "" },
  ]);

  const [userTypeCatalogue, setUserTypeCatalogue] = useState([
    { Id: "", Rol: "" },
  ]);

  const [errorForm, setErrorsForm] = useState({
    visible: false,
    text: "",
    type: "",
  });

  const [fullView, setFullView] = useState(false);

  const [notEditable, setNotEditable] = useState(false);

  const AlertForm = () => {
    return (
      <Box sx={{ mt: "1vh", mb: "2vh" }}>
        <Alert severity={errorForm.type as AlertColor}>{errorForm.text}</Alert>
      </Box>
    );
  };

  const closeModal = () => {
    handleClose();
    cleanForm();
    setErrorsForm({
      visible: false,
      text: "",
      type: "",
    });
    setFullView(false);
    setNotEditable(false);
  };

  const cleanForm = () => {
    setUsername("");
    setEmail("");
    setNames("");
    setFirstName("");
    setSecondName("");
    setInstitution("0");
    setRol("");
    setUserType("0");
    setTelephone("");
    setCellphone("");
  };

  const getInstituciones = () => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/instituciones", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
        params: {
          IdUsuario: localStorage.getItem("IdUsuario"),
          IdInstitucion: localStorage.getItem("IdInstitucion")
        }
      })
      .then((r) => {
        setCatalogoInstituciones(r.data.data);
      });
  };

  const getUserType = () => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/roles", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setUserTypeCatalogue(r.data.data);
      });
  };

  const verifyUser = () => {
    axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/user-exist",
        {
          NombreUsuario: username,
          CorreoElectronico: email.toLowerCase(),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        if (
          r.data.data.message === "Usuario valido, sin vinculo a la plataforma."
        ) {
          setErrorsForm({
            visible: true,
            text: r.data.data.message,
            type: "success",
          });
          setIdUsuarioCentral(r.data.data.Id);
          setFullView(true);
          setNotEditable(true);
        } else {
          setErrorsForm({
            visible: true,
            text: r.data.data.message,
            type: "warning",
          });
          setFullView(false);
          setNotEditable(false);
        }
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

  const siednlSignUp = (idUsrCentral: string) => {
    axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/user-add",
        {
          IdUsuarioCentral: idUsrCentral,
          IdInstitucion: institution,
          Cargo: rol,
          Telefono: telephone,
          Celular: cellphone,
          CreadoPor: localStorage.getItem("IdUsuario"),
          IdRol: userType,
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        if (r.status === 200) {
          closeModal();
          Toast.fire({
            icon: "success",
            title: "Registro exitoso.",
          });
        }
      });
  };

  const checkForm = () => {
    setErrorsForm({
      visible: false,
      text: "",
      type: "",
    });
    if (names === "") {
      setErrorsForm({
        visible: true,
        text: "Ingresa nombre del usuario.",
        type: "error",
      });
    } else if (firstName === "") {
      setErrorsForm({
        visible: true,
        text: "Ingresa apellido paterno del usuario.",
        type: "error",
      });
    } else if (secondName === "") {
      setErrorsForm({
        visible: true,
        text: "Ingresa apellido materno del usuario.",
        type: "error",
      });
    } else if (institution === "0") {
      setErrorsForm({
        visible: true,
        text: "Selecciona la institucion a la que pertenece el usuario.",
        type: "error",
      });
    } else if (rol === "") {
      setErrorsForm({
        visible: true,
        text: "Ingresa el cargo del usuario en la institución.",
        type: "error",
      });
    } else if (userType === "0") {
      setErrorsForm({
        visible: true,
        text: "Selecciona el tipo de usuario a crear.",
        type: "error",
      });
    } else if (telephone === "") {
      setErrorsForm({
        visible: true,
        text: "Ingresa un teléfono de contacto.",
        type: "error",
      });
    } else if (cellphone === "") {
      setErrorsForm({
        visible: true,
        text: "Ingresa un número celular de contacto.",
        type: "error",
      });
    } else {
      siednlSignUp(idUsuarioCentral);
    }
  };

  useEffect(() => {
    getInstituciones();
    getUserType();
  }, []);

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={() => closeModal()}>
      <DialogTitle sx={{ fontFamily: "MontserratBold" }}>
        {title.toUpperCase()}
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
            justifyContent: "space-between",
          }}
        >
          <TextField
            label="Usuario"
            disabled={notEditable}
            variant="outlined"
            value={username}
            sx={{
              width: "30%",
              ml: "2vw",
            }}
            onChange={(v) => setUsername(v.target.value)}
          />

          <TextField
            label="Correo Electrónico"
            disabled={notEditable}
            variant="outlined"
            type="email"
            onChange={(v) => setEmail(v.target.value)}
            value={email}
            sx={{
              width: "40%",
              mr: "2vw",
            }}
          />
          <Button
            variant="outlined"
            color="success"
            onClick={() => verifyUser()}
            disabled={notEditable}
          >
            Verificar
          </Button>
        </Box>

        {fullView ? (
          <Box>
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
                <InputLabel>
                  Institución
                </InputLabel>
                <Select
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
                <InputLabel>
                  Tipo de Usuario
                </InputLabel>
                <Select
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
          </Box>
        ) : null}

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
              onClick={() => closeModal()}
            >
              Cancelar
            </Button>
            <Button
              disabled={!notEditable}
              sx={{ display: "flex", width: "10vw" }}
              variant="contained"
              color="primary"
              onClick={() => checkForm()}
            >
              Registrar
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
