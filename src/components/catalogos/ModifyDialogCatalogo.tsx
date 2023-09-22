/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import Swal from "sweetalert2";
import EditIcon from "@mui/icons-material/Edit";

import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";
import { queries } from "../../queries";

export const ModifyDialogCatalogos = ({
  id,
  tabla,
  descripcion,
  actualizado,
}: {
  tabla: string;
  id: string;
  descripcion: string;
  actualizado: Function;
}) => {
  const [open, setOpen] = React.useState(false);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();
  let date = today.getDate();
  let monthS = "";
  let dateS = "";

  React.useEffect(() => {
    today = new Date();
    year = today.getFullYear();
    month = today.getMonth();
    month = month + 1;
    date = today.getDate();

    if (month < 10) {
      monthS = "0" + month;
    } else {
      monthS = month.toString();
    }

    if (date < 10) {
      dateS = "0" + date;
    }

    setFechaCaptura(year + "-" + monthS + "-" + dateS);
  }, [actualizado]);

  const [nuevaDescripcion, setnuevaDescripcion] = React.useState("");
  const [fechaCaptura, setFechaCaptura] = React.useState(
    year + "-" + monthS + "-" + dateS
  );

  const ModifyPorCatalogo = () => {
    if (tabla === "ProgramasPresupuestarios") {
      axios
        .put(
          process.env.REACT_APP_APPLICATION_BACK +
            "/api/modify-programaPresupuestario",
          {
            IdProgramaPresupuestario: id,
            NuevoProgramaPresupuestario: nuevaDescripcion,
            //IdEntidad: institution,
            ModificadoPor: localStorage.getItem("IdUsuario"),
            Rol: localStorage.getItem("Rol"),
          },
          {
            headers: {
              Authorization: localStorage.getItem("jwtToken") || "",
            },
          }
        )
        .then((r) => {
          actualizado();
          handleClose();
          Toast.fire({
            icon: "success",
            title: "!Elemento modificado con éxito!",
          });
        })
        .catch((err) =>
          Toast.fire({
            icon: "error",
            title: "Permisos denegados",
          })
        );
    } else {
      axios
        .put(
          process.env.REACT_APP_APPLICATION_BACK + "/api/modify-catalogo",
          {
            Id: id,
            NuevaDescripcion: nuevaDescripcion,
            Tabla: tabla,
            CreadoPor: localStorage.getItem("IdUsuario"),
            Rol: localStorage.getItem("Rol"),
          },
          {
            headers: {
              Authorization: localStorage.getItem("jwtToken") || "",
            },
          }
        )
        .then((r) => {
          actualizado();

          handleClose();
          Toast.fire({
            icon: "success",
            title: "!Elemento modificado con éxito!",
          });
        })
        .catch((err) =>
          Toast.fire({
            icon: "error",
            title: "Permisos denegados",
          })
        );
    }
  };

  const ModifyPorCatalogoFechas = () => {
    axios
      .put(
        process.env.REACT_APP_APPLICATION_BACK + "/api/modify-fechaDeCaptura",
        {
          IdFechaDeCaptura: id,
          NuevoDescripcion: nuevaDescripcion,
          //Se agregaron 3 campos nuevos pero esto se hizo en otro accios esto se va a modificar
          NuevoFechaCapturaInicio: fechaCaptura,
          NuevoFechaCapturaFinal:fechaCaptura,
          NuevoModulo: "",
          ModificadoPor: localStorage.getItem("IdUsuario"),
          Rol: localStorage.getItem("Rol"),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        actualizado();
        handleClose();
      })
      .catch((err) =>
        Toast.fire({
          icon: "error",
          title: "Permisos denegados",
        })
      );
  };

  const ModifyPorCatalogoProgramasP = () => {
    axios
      .put(
        process.env.REACT_APP_APPLICATION_BACK + "/api/modify-programaPresupuestario",
        {
          IdProgramaPresupuestario: id,
          NuevoProgramaPresupuestario: nuevaDescripcion,
          //IdEntidad: institution,
          ModificadoPor: localStorage.getItem("IdUsuario"),
          Rol: localStorage.getItem("Rol"),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        actualizado();
        handleClose();
      })
      .catch((err) =>
        Toast.fire({
          icon: "error",
          title: "Permisos denegados",
        })
      );
  };
  const [institution, setInstitution] = useState("0");

  // const getInstituciones = () => {
  //   axios
  //     .get(process.env.REACT_APP_APPLICATION_BACK + "/api/instituciones", {
  //       headers: {
  //         Authorization: localStorage.getItem("jwtToken") || "",
  //       },
  //       params: {
  //         IdUsuario: localStorage.getItem("IdUsuario"),
  //         IdEntidad: localStorage.getItem("IdEntidad"),
  //         Rol: localStorage.getItem("Rol") 
  //       },
  //     })
  //     .then((r) => {
  //       setCatalogoInstituciones(r.data.data);
  //     });
  // };

  useEffect(() => {
   // getInstituciones();
  }, []);

  const [catalogoInstituciones, setCatalogoInstituciones] = useState([
    { Id: "", NombreInstitucion: "" },
  ]);

  if (tabla === "ProgramasPresupuestarios") {
    return (
      <Box>
        <Tooltip title="Editar">
          <IconButton onClick={handleClickOpen}>
            <EditIcon
              sx={[
                {
                  "&:hover": {
                    color: "blue",
                  },
                },
              ]}
            />
          </IconButton>
        </Tooltip>
        <Dialog open={open} onClose={handleClose} fullWidth>
          <Box
            sx={{
              width: "100%",
              height: "5vh",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              borderBottom: 0.5,
              borderColor: "#ccc",
              boxShadow: 1,
            }}
          >
            <Typography
              sx={{
                fontFamily: "MontserratSemiBold",
                width: "90%",
                fontSize: "1vw",
                textAlign: "center",
              }}
            >
              Editar Elemento
            </Typography>
          </Box>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField
              multiline={descripcion.length < 200 ? false : true}
              sx={descripcion.length < 200 ? { width: "60%" } : { width: "80%" }}
              InputProps={{
                style: {
                  fontFamily: "MontserratLight",
                },
              }}
              rows={3}
              id="outlined-basic"
              value={nuevaDescripcion || descripcion}
              variant="outlined"
              onChange={(v) => setnuevaDescripcion(v.target.value)}
            />

            <InputLabel>Institución</InputLabel>
            <Select
              sx={descripcion.length < 200 ? { width: "60%" } : { width: "80%" }}
              value={institution}
              label="Institución"
              onChange={(x) => setInstitution(x.target.value)}
            >
              <MenuItem value={"0"} key={0} disabled>
                Selecciona
              </MenuItem>
              {catalogoInstituciones.map((item) => {
                return (
                  <MenuItem value={item.NombreInstitucion} key={item.Id}>
                    {item.NombreInstitucion}
                  </MenuItem>
                );
              })}
            </Select>
          </DialogContent>

          <DialogActions
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button sx={queries.buttonCancelarSolicitudInscripcion} onClick={handleClose}>
              <Typography
                sx={{ fontFamily: "MontserratMedium", fontSize: ".7vw" }}
              >
                Cancelar
              </Typography>
            </Button>

            <Button sx={queries.buttonContinuarSolicitudInscripcion} onClick={ModifyPorCatalogoProgramasP} autoFocus>
              <Typography
                sx={{ fontFamily: "MontserratMedium", fontSize: ".7vw" }}
              >
                De Acuerdo
              </Typography>
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  } else if (tabla === "FechasDeCaptura") {
    return (
      <Box sx={{ display: "flex" }}>
        
        <Dialog open={open} onClose={handleClose} fullWidth>
          <Box
            sx={{
              width: "100%",
              height: "5vh",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              borderBottom: 0.5,
              borderColor: "#ccc",
              boxShadow: 1,
            }}
          >
            <Typography
              sx={{
                fontFamily: "MontserratSemiBold",
                width: "90%",
                fontSize: "1vw",
                textAlign: "center",
              }}
            >
              Editar Elemento
            </Typography>
          </Box>

          <DialogContent
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <TextField
              label={"Descripcion"}
              variant="outlined"
              onChange={(v) => setnuevaDescripcion(v.target.value)}
              sx={{ mt: "2vh" }}
            />
            <TextField
              variant="outlined"
              onChange={(x) => setFechaCaptura(x.target.value)}
              multiline={descripcion.length < 200 ? false : true}
              defaultValue={fechaCaptura}
              sx={descripcion.length < 200 ? { width: "60%" } : { width: "80%" }}
              style={{ marginTop: "2vh" }}
              type="date"
              InputProps={{
                style: {
                  fontFamily: "MontserratLight",
                },
              }}
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratRegular",
                },
              }}
              rows={3}
            />
          </DialogContent>

          <DialogActions
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button sx={queries.buttonCancelarSolicitudInscripcion} onClick={handleClose}>
              <Typography
                sx={{ fontFamily: "MontserratMedium", fontSize: ".7vw" }}
              >
                Cancelar
              </Typography>
            </Button>

            <Button sx={queries.buttonContinuarSolicitudInscripcion} onClick={ModifyPorCatalogoFechas} autoFocus>
              <Typography
                sx={{ fontFamily: "MontserratMedium", fontSize: ".7vw" }}
              >
                De Acuerdo
              </Typography>
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  } else if (tabla === "PEDs") {
    return (
      <Box>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{`Modificar  '${descripcion}'`}</DialogTitle>

          <DialogContent>
            <TextField
              id="outlined-basic"
              placeholder={"Introduzca elemento"}
              variant="outlined"
              onChange={(v) => setnuevaDescripcion(v.target.value)}
            />
          </DialogContent>

          <DialogActions onClick={handleClose}>
            <Button sx={queries.buttonCancelarSolicitudInscripcion} >Cancelar</Button>

            <Button sx={queries.buttonContinuarSolicitudInscripcion} onClick={ModifyPorCatalogo} autoFocus>
              De Acuerdo
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  } else {
    return (
      <Box>
        <Tooltip title="Editar">
          <IconButton onClick={handleClickOpen}>
            <EditIcon
              sx={[
                {
                  "&:hover": {
                    color: "blue",
                  },
                },
              ]}
            />
          </IconButton>
        </Tooltip>
        <Dialog open={open} onClose={handleClose} fullWidth>
        
          <Box
            sx={{
              width: "100%",
              height: "5vh",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              borderBottom: 0.5,
              borderColor: "#ccc",
              //background: "Blue",
              boxShadow: 1,
            }}
          >
            <Typography
              sx={{
                fontFamily: "MontserratSemiBold",
                width: "90%",
                fontSize: "1vw",
                textAlign: "center",
              }}
            >
              Editar Elemento
            </Typography>
          </Box>

          <DialogContent
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField
              multiline={descripcion.length < 200 ? false : true}
              sx={descripcion.length < 200 ? { width: "60%" } : { width: "80%" }}
              InputProps={{
                style: {
                  fontFamily: "MontserratLight",
                },
              }}
              rows={5}
              id="outlined-basic"
              value={nuevaDescripcion || descripcion}
              variant="outlined"
              onChange={(v) => {
                // if (!v.target.value || !nuevaDescripcion || !descripcion) {
                //   // Valores vacíos o nulos, muestra un mensaje de error o realiza la acción necesaria
                //   console.error('Por favor, ingresa una descripción válida.');
                //   return;
                // }
              
                setnuevaDescripcion(v.target.value);
              }}
            />
          </DialogContent>

          <DialogActions
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button sx={queries.buttonCancelarSolicitudInscripcion} onClick={handleClose}>
              <Typography
                sx={{ fontFamily: "MontserratMedium", fontSize: ".7vw" }}
              >
                Cancelar
              </Typography>
            </Button>

            <Button sx={queries.buttonContinuarSolicitudInscripcion} onClick={ModifyPorCatalogo} autoFocus>
              <Typography
                sx={{ fontFamily: "MontserratMedium", fontSize: ".7vw" }}
              >
                De Acuerdo
              </Typography>
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }
};

export default ModifyDialogCatalogos;
