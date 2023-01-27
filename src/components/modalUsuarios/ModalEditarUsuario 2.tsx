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
import { IInstituciones } from "../lateralMenu/LateralMenu";

export default function ModalEditarUsuario({
  title,
  open,
  handleClose,
  IdUsuario,
  actualizado,
}: {
  title: string;
  open: boolean;
  handleClose: Function;
  IdUsuario: string;
  actualizado: Function;
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

  const getInstituciones = () => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/instituciones", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
        params: {
          IdUsuario: localStorage.getItem("IdUsuario"),
          IdInstitucion: localStorage.getItem("IdInstitucion"),
        },
      })
      .then((r) => {
        setCatalogoInstituciones(r.data.data);
      });
  };

  const getUsuario = () => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/usuario", {
        params: {
          IdUsuario: IdUsuario,
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        const user = r.data.data;
        setUsername(user.NombreUsuario);
        setEmail(user.CorreoElectronico);
        setNames(user.Nombre);
        setFirstName(user.ApellidoPaterno);
        setSecondName(user.ApellidoMaterno);
        setInstitution(user.IdInstitucion);
        setRol(user.Cargo);
        setUserType(user.IdRol);
        setTelephone(user.Telefono);
        setCellphone(user.Celular);
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

  const userModify = (idUsrCentral: string) => {
    axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/user-modify",
        {
          IdUsuarioTiCentral: idUsrCentral,
          Nombre: names,
          ApellidoPaterno: firstName,
          ApellidoMaterno: secondName,
          IdInstitucion: institution,
          IdRol: userType,
          Cargo: rol,
          Telefono: telephone,
          Celular: cellphone,
          ModificadoPor: localStorage.getItem("IdUsuario"),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        if (r.status === 200) {
          Toast.fire({
            icon: "success",
            title: "¡Usuario modificado con éxito!",
          });

          actualizado();
        }
      })
      .catch((err) =>
        Toast.fire({
          icon: "error",
          title: "Permisos denegados",
        })
      );
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
      userModify(IdUsuario);
    }
  };

  useEffect(() => {
    getInstituciones();
    getUserType();
    getUsuario();
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
          }}
        >
          <TextField
            label="Usuario"
            variant="outlined"
            value={username}
            InputLabelProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
            InputProps={{
              style: {
                fontFamily: "MontserratRegular",
              },
            }}
            sx={{
              width: "40%",
              ml: "2vw",
            }}
            disabled
            onChange={(v) => setUsername(v.target.value)}
          />

          <TextField
            label="Correo Electrónico"
            variant="outlined"
            type="email"
            disabled
            onChange={(v) => setEmail(v.target.value)}
            value={email}
            sx={{
              width: "40%",
              mr: "2vw",
            }}
            InputLabelProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
            InputProps={{
              style: {
                fontFamily: "MontserratRegular",
              },
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
            InputLabelProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
            InputProps={{
              style: {
                fontFamily: "MontserratRegular",
              },
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
            InputLabelProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
            InputProps={{
              style: {
                fontFamily: "MontserratRegular",
              },
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
            InputLabelProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
            InputProps={{
              style: {
                fontFamily: "MontserratRegular",
              },
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
            <InputLabel sx={{ fontFamily: "MontserratMedium" }}>
              Tipo de Usuario
            </InputLabel>
            <Select
              value={userType}
              label="Tipo de Usuario"
              onChange={(x) => setUserType(x.target.value)}
              sx={{
                fontFamily: "MontserratRegular",
              }}
            >
              <MenuItem
                value={"0"}
                key={0}
                disabled
                sx={{ fontFamily: "MontserratRegular" }}
              >
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
            value={rol}
            onChange={(x) => setRol(x.target.value)}
            sx={{
              width: "30%",
            }}
            InputLabelProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
            InputProps={{
              style: {
                fontFamily: "MontserratRegular",
              },
            }}
          />
          <FormControl
            sx={{
              width: "30%",
              mr: "2vw",
            }}
          >
            <InputLabel sx={{ fontFamily: "MontserratMedium" }}>
              Institución Principal
            </InputLabel>
            <Select
              value={institution}
              label="Institución Principal"
              onChange={(x) => setInstitution(x.target.value)}
              sx={{
                fontFamily: "MontserratRegular",
              }}
            >
              <MenuItem
                value={"0"}
                key={0}
                disabled
                sx={{
                  fontFamily: "MontserratRegular",
                }}
              >
                Selecciona
              </MenuItem>
              {catalogoInstituciones.map((item) => {
                return (
                  <MenuItem
                    value={item.Id}
                    key={item.Id}
                    sx={{ fontFamily: "MontserratRegular" }}
                  >
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
            label="Teléfono"
            variant="outlined"
            sx={{
              width: "30%",
              ml: "10vw",
            }}
            type="tel"
            value={telephone}
            onChange={(x) => setTelephone(x.target.value)}
            InputLabelProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
            InputProps={{
              style: {
                fontFamily: "MontserratRegular",
              },
            }}
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
            InputLabelProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
            InputProps={{
              style: {
                fontFamily: "MontserratRegular",
              },
            }}
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
            onClick={() => handleClose()}
          >
            <Button
              sx={{ display: "flex", width: "10vw" }}
              variant="contained"
              color="error"
            >
              Cancelar
            </Button>

            <Button
              sx={{ display: "flex", width: "10vw" }}
              variant="contained"
              color="primary"
              onClick={() => checkForm()}
            >
              Actualizar
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
