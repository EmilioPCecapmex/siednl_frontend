import { useEffect, useState } from "react";
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
import { IDatosAdicionales } from "./InterfazUsuario";
import { queries } from "../../queries";
export interface IInstituciones {
  Id: string;
  NombreInstitucion: string;
}

export default function ModalCrearUsuario({
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
  const [curp, setCURP] = useState("");
  const [rfc, setRFC] = useState("");

  const [datosAdicionales, setDatosAdicionales] = useState<IDatosAdicionales>({
    institution: "0",
    rol: "",
    userType: "0",
  });

  const [telephone, setTelephone] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [ext, setExt] = useState("");
  const [comentario, setComentario] = useState("");

  const [catalogoInstituciones, setCatalogoInstituciones] = useState<
    Array<IInstituciones>
  >([]);

  const [userTypeCatalogue, setUserTypeCatalogue] = useState([
    { Id: "", Rol: "" },
  ]);

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
    setNames("");
    setFirstName("");
    setSecondName("");
    setTelephone("");
    setCellphone("");
    setCURP("");
    setRFC("");
    setComentario("");
    setExt("");

    let limpiarDatosAdicionales = datosAdicionales;
    limpiarDatosAdicionales.institution = "0";
    limpiarDatosAdicionales.rol = "";
    limpiarDatosAdicionales.userType = "0";

    setDatosAdicionales(limpiarDatosAdicionales);
  };

  // const getInstituciones = () => {
  //   axios
  //     .get(process.env.REACT_APP_APPLICATION_BACK + "/api/instituciones", {
  //       headers: {
  //         Authorization: localStorage.getItem("jwtToken") || "",
  //       },
  //       params: {
  //         IdUsuario: localStorage.getItem("IdUsuario"),
  //         IdEntidad: localStorage.getItem("IdEntidad"),
  //         Rol: localStorage.getItem("Rol"),
  //       },
  //     })
  //     .then((r) => {
  //       setCatalogoInstituciones(r.data.data);
  //     });
  // };

  // const getUserType = () => {
  //   axios
  //     .get(process.env.REACT_APP_APPLICATION_BACK + "/api/roles", {
  //       headers: {
  //         Authorization: localStorage.getItem("jwtToken") || "",
  //       },
  //     })
  //     .then((r) => {
  //       setUserTypeCatalogue(r.data.data);
  //     });
  // };

  const createComentarios = (idSolicitud: string) => {
    axios
      .post(
        process.env.REACT_APP_APPLICATION_LOGIN + "/api/create-comentario",
        {
          CreadoPor: localStorage.getItem("IdCentral"),
          IdSolicitud: idSolicitud,
          Comentario: comentario,
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        if (r.status === 201) {
          Toast.fire({
            icon: "success",
            title: "¡Registro exitoso!",
          });
          cleanForm();
          handleClose();
        }
      })
      .catch((r) => {
        if (r.response.status === 409) {
          setErrorsForm({
            visible: true,
            text: r.response.data.msg,
            type: "error",
          });
        }
      });
  };

  const signUp = () => {
    axios
      .post(
        process.env.REACT_APP_APPLICATION_LOGIN + "/api/create-solicitud",
        {
          Nombre: names,
          APaterno: firstName,
          AMaterno: secondName,
          NombreUsuario: username,
          Email: email,
          Puesto:datosAdicionales.rol,
          Curp: curp,
          RFC: rfc,
          Celular: cellphone,
          Telefono: telephone,
          Extencion: ext,
          DatosAdicionales: JSON.stringify(datosAdicionales),
          TipoSolicitud: "ALTA",
          CreadoPor: localStorage.getItem("IdCentral"),
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
          if (comentario !== "")
            createComentarios(r.data.data[0][0].IdSolicitud);

          Toast.fire({
            icon: "success",
            title: "¡Registro exitoso!",
          });
          
          cleanForm();
          handleClose();
        }
      })
      .catch((r) => {
        if (r.response.status === 409) {
          setErrorsForm({
            visible: true,
            text: r.response.data.msg,
            type: "error",
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
    } else if (names === "") {
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
    } else if (datosAdicionales.institution === "0") {
      setErrorsForm({
        visible: true,
        text: "Selecciona la institucion a la que pertenece el usuario.",
        type: "error",
      });
    } else if (datosAdicionales.rol === "") {
      setErrorsForm({
        visible: true,
        text: "Ingresa el cargo del usuario en la institución.",
        type: "error",
      });
    } else if (datosAdicionales.userType === "0") {
      setErrorsForm({
        visible: true,
        text: "Selecciona el tipo de usuario a crear.",
        type: "error",
      });
    } else if (curp === "") {
      setErrorsForm({
        visible: true,
        text: "Ingresa el CURP.",
        type: "error",
      });
    } else if (rfc === "") {
      setErrorsForm({
        visible: true,
        text: "Ingresa el RFC .",
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
    } else if (ext === "") {
      setErrorsForm({
        visible: true,
        text: "Ingresa la extencion.",
        type: "error",
      });
    } else {
      signUp();
    }
  };

  useEffect(() => {
    //getInstituciones();
   // getUserType();
  }, []);

  return (
    <Dialog fullWidth maxWidth="lg" open={open} onClose={() => handleClose()}>
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
            mt: "3vh",
          }}
        >
          <TextField
            label="Usuario"
            variant="outlined"
            value={username}
            inputProps={{ maxLength: 30 }}
            sx={{
              width: "30%",
              ml: "2vw",
            }}
            onChange={(v) => setUsername(v.target.value)}
          />

          <TextField
            label="Correo Electrónico"
            variant="outlined"
            type="email"
            inputProps={{ maxLength: 50 }}
            onChange={(v) => setEmail(v.target.value)}
            value={email}
            sx={{
              width: "60%",
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
            inputProps={{ maxLength: 20 }}
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
            inputProps={{ maxLength: 20 }}
            onChange={(x) => setFirstName(x.target.value)}
            sx={{
              width: "30%",
            }}
          />
          <TextField
            label="Apellido Materno"
            variant="outlined"
            inputProps={{ maxLength: 20 }}
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
            <InputLabel>Tipo de Usuario</InputLabel>
            <Select
              value={datosAdicionales.userType}
              label="Tipo de Usuario"
              onChange={(x) => {
                // let auxiliar=datosAdicionales;
                // auxiliar.userType=;
                setDatosAdicionales({
                  ...datosAdicionales,
                  userType: x.target.value,
                });
              }}
            >
              <MenuItem value={"0"} key={0} disabled>
                Selecciona
              </MenuItem>

              {userTypeCatalogue.map((item) => {
                if (
                  localStorage.getItem("Rol") !== "Administrador" &&
                  item.Rol === "Administrador"
                ) {
                  return null;
                } else {
                  return (
                    <MenuItem
                      value={item.Id}
                      key={item.Id}
                      sx={{ fontFamily: "MontserratRegular" }}
                    >
                      {item.Rol}
                    </MenuItem>
                  );
                }
              })}
            </Select>
          </FormControl>

          <TextField
            label="Cargo"
            variant="outlined"
            inputProps={{ maxLength: 25 }}
            value={datosAdicionales.rol}
            onChange={(x) => {
              setDatosAdicionales({ ...datosAdicionales, rol: x.target.value });
            }}
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
            <InputLabel>Institución</InputLabel>
            <Select
              disabled={
                datosAdicionales.userType === "Administrador" ? true : false
              }
              value={datosAdicionales.institution}
              label="Institución"
              onChange={(x) => {
                setDatosAdicionales({
                  ...datosAdicionales,
                  institution: x.target.value,
                });
              }}
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
            label="CURP"
            variant="outlined"
            inputProps={{ maxLength: 18 }}
            value={curp}
            onChange={(x) => setCURP(x.target.value)}
            sx={{
              width: "45%",
              ml: "2vw",
            }}
          />

          <TextField
            label="RFC"
            variant="outlined"
            inputProps={{ maxLength: 13 }}
            value={rfc}
            onChange={(x) => setRFC(x.target.value)}
            sx={{
              width: "45%",mr: "2vw",
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
            label="Teléfono"
            variant="outlined"
            inputProps={{ maxLength: 10 }}
            sx={{
              width: "40%",
              ml: "2vw",
            }}
            type="tel"
            value={telephone}
            onChange={(x) => setTelephone(x.target.value)}
          />

          <TextField
            label="Celular"
            variant="outlined"
            inputProps={{ maxLength: 10 }}
            type="tel"
            sx={{
              width: "40%",
            }}
            value={cellphone}
            onChange={(x) => setCellphone(x.target.value)}
          />

          <TextField
            label="Extensión "
            variant="outlined"
            inputProps={{ maxLength: 4 }}
            sx={{
              width: "10%",
              mr: "2vw",
            }}
            type="tel"
            value={ext}
            onChange={(x) => setExt(x.target.value)}
          />
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            mt: "3vh",
          }}
        >
          <TextField
            label="Comentarios "
            variant="outlined"
            multiline
            inputProps={{ maxLength: 2000 }}
            rows={3}
            sx={{
              width: "95%",
              mr: "2vw",
              ml: "2vw",
            }}
            type="tel"
            value={comentario}
            onChange={(x) => setComentario(x.target.value)}
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
              sx={queries.buttonCancelarSolicitudInscripcion}
              
              onClick={() => {
                handleClose();
              }}
            >
              Cancelar
            </Button>
            <Button
              sx={queries.buttonContinuarSolicitudInscripcion}
              
              onClick={() => {
                checkForm();
              }}
            >
              Registrar
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
