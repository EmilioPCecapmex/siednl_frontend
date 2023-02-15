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
import { IdataUser } from "../datatable/interface";
import { IDatosAdicionales } from "./InterfazUsuario";

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
  // const [telephone, setTelephone] = useState("");
  // const [cellphone, setCellphone] = useState("");

  const [dataUser, setDataUser] = useState<IdataUser>(
    {
      Id: "",
      Nombre: "",
      ApellidoPaterno: "",
      ApellidoMaterno: "",
      CorreoElectronico: "",
      NombreUsuario: "",
      Telefono: "",
      Ext: "",
      Curp: "",
      Rfc: "",
      Celular: "",
    }
  );

  const [datosAdicionales, setDatosAdicionales] = useState<IDatosAdicionales>(
    {
      institution: "0",
      rol: "",
      userType: "0"
    }
  );
  // const [idUsuarioCentral, setIdUsuarioCentral] = useState("");

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
    setDatosAdicionales({ ...datosAdicionales, institution: "0" });
    setDatosAdicionales({ ...datosAdicionales, rol: "0" });
    setDatosAdicionales({ ...datosAdicionales, userType: "0" });
    // setTelephone("");
    // setCellphone("");
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
      .post("http://10.200.4.164:5000/api/user-exist",
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
          getUserDetails(r.data.data.Id);
          // setIdUsuarioCentral(r.data.data.Id);
          setFullView(true);
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


  const getUserDetails = (idCentral: string,) => {
    axios
      .post(
        "http://10.200.4.164:5000/api/user-detail",
        {
          IdUsuario: idCentral,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {

        if (r.status === 200) {
          let auxLlenado = dataUser;
          auxLlenado.Id = r.data.data.Id;
          auxLlenado.Nombre = r.data.data.Nombre;
          auxLlenado.ApellidoPaterno = r.data.data.ApellidoPaterno;
          auxLlenado.ApellidoMaterno = r.data.data.ApellidoMaterno;
          auxLlenado.CorreoElectronico = r.data.data.CorreoElectronico;
          auxLlenado.NombreUsuario = r.data.data.NombreUsuario;
          auxLlenado.Telefono = r.data.data.Telefono;
          auxLlenado.Ext = r.data.data.Ext;
          auxLlenado.Celular = r.data.data.Celular;
          auxLlenado.Curp = r.data.data.Curp;
          auxLlenado.Rfc = r.data.data.Rfc;
          setDataUser(auxLlenado);
          setNotEditable(true);
          setNames(auxLlenado.Nombre);
          setFirstName(auxLlenado.ApellidoPaterno);
          setSecondName(auxLlenado.ApellidoMaterno);



        }
      });
  };
  const signUp = () => {
    axios
      .post(
        "http://10.200.4.164:5000/api/create-solicitud",
        {
          Nombre: dataUser.Nombre,
          APaterno: dataUser.ApellidoPaterno,
          AMaterno: dataUser.ApellidoMaterno,
          NombreUsuario: dataUser.NombreUsuario,
          Email: dataUser.CorreoElectronico,
          Curp: dataUser.Curp,
          RFC: dataUser.Rfc,
          Celular: dataUser.Celular,
          Telefono: dataUser.Telefono,
          Extencion: dataUser.Ext,
          DatosAdicionales: JSON.stringify(datosAdicionales),
          TipoSolicitud: "VINCULACION",
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
          cleanForm();
          closeModal();
          Toast.fire({
            icon: "success",
            title: "Registro exitoso.",
          });
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
    } else {
      signUp();
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
            onClick={() => { verifyUser(); setNotEditable(true); }}
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
                InputProps={{ readOnly: true }}
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
                InputProps={{ readOnly: true }}
                onChange={(x) => setFirstName(x.target.value)}
                sx={{
                  width: "30%",
                }}
              />
              <TextField
                label="Apellido Materno"
                variant="outlined"
                value={secondName}
                InputProps={{ readOnly: true }}
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
                  value={datosAdicionales.institution}
                  label="Institución"
                  onChange={(x) => setDatosAdicionales({ ...datosAdicionales, institution: x.target.value })}
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
                value={datosAdicionales.rol}
                onChange={(x) => setDatosAdicionales({ ...datosAdicionales, rol: x.target.value })}
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
                  value={datosAdicionales.userType}
                  label="Tipo de Usuario"
                  onChange={(x) => setDatosAdicionales({ ...datosAdicionales, userType: x.target.value })}
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

            {/* <Box
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
            </Box> */}
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
