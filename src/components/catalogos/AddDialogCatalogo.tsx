import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import { Box, InputLabel, MenuItem, Select } from "@mui/material";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import { Typography, FormControl } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import { PED } from "./PED";

export const AddDialogCatalogo = ({
  catalogo,
  tabla,
  actualizado,
}: {
  catalogo: string;
  tabla: string;
  actualizado: Function;
}) => {
  const [open, setOpen] = React.useState(false);
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1500,
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
    actualizado();
  };

  const [descripcion, setDescripcion] = React.useState("");
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

  const [fechaCaptura, setFechaCaptura] = React.useState(
    year + "-" + monthS + "-" + dateS
  );
  const [institution, setInstitution] = React.useState("0");
  const [catalogoInstituciones, setCatalogoInstituciones] = React.useState([
    { Id: "", NombreInstitucion: "" },
  ]);

  React.useEffect(() => {
    getInstituciones();
  }, []);

  const getInstituciones = () => {
    axios
      .get("http://10.200.4.105:8000/api/instituciones", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setCatalogoInstituciones(r.data.data);
      });
  };

  const CreatePorCatalogo = () => {
    axios
      .post(
        "http://10.200.4.105:8000/api/create-catalogos",
        {
          Descripcion: descripcion,
          Tabla: tabla,
          IdUser: localStorage.getItem("IdUsuario"),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        handleClose();

        Toast.fire({
          icon: "success",
          title: "Elemento registrado con éxito.",
        });

        actualizado();
      })
      .catch((err) =>
        Toast.fire({
          icon: "error",
          title: err.response.data.result.error,
        })
      );
  };

  const CreatePorCatalogoFechas = () => {
    axios
      .post(
        "http://10.200.4.105:8000/api/create-fechaDeCaptura",
        {
          Descripcion: descripcion,
          FechaDeCaptura: fechaCaptura,
          CreadoPor: localStorage.getItem("IdUsuario"),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        handleClose();
        Toast.fire({
          icon: "success",
          title: "Elemento registrado con éxito.",
        });

        actualizado();
      })
      .catch((err) =>
        Toast.fire({
          icon: "error",
          title: err.response.data.result.error,
        })
      );
  };

  const CreatePorCatalogoProgramap = () => {
    axios
      .post(
        "http://10.200.4.105:8000/api/create-programaPresupuestario",
        {
          NombrePrograma: descripcion,
          IdInstitucion: institution,
          CreadoPor: localStorage.getItem("IdUsuario"),
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
          title: "Elemento registrado con éxito.",
        });
        actualizado();
      })
      .catch((err) =>
        Toast.fire({
          icon: "error",
          title: err.response.data.result.error,
        })
      );
  };

  if (tabla === "FechasDeCaptura") {
    return (
      <Box sx={{ display: "flex" }}>
        <IconButton onClick={handleClickOpen}>
          <AddIcon />
        </IconButton>
        <Dialog fullWidth open={open} onClose={handleClose}>
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
              Añadir Fecha de Captura
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
              multiline={descripcion.length < 20 ? false : true}
              sx={descripcion.length < 20 ? { width: "60%" } : { width: "80%" }}
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratRegular",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratLight",
                },
              }}
              rows={3}
              label={"Descripción"}
              variant="outlined"
              onChange={(v) => setDescripcion(v.target.value)}
            />
            <TextField
              label={"Fecha de captura"}
              variant="outlined"
              onChange={(x) => setFechaCaptura(x.target.value)}
              multiline={descripcion.length < 20 ? false : true}
              defaultValue={fechaCaptura}
              sx={descripcion.length < 20 ? { width: "60%" } : { width: "80%" }}
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
            <Button color="error" onClick={handleClose}>
              <Typography
                sx={{ fontFamily: "MontserratMedium", fontSize: ".7vw" }}
              >
                Cancelar
              </Typography>
            </Button>

            <Button onClick={CreatePorCatalogoFechas} autoFocus>
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
        <IconButton onClick={handleClickOpen}>
          <AddIcon
            sx={{
              width: 50,
              height: 50,
            }}
          />
        </IconButton>
        <Dialog fullWidth maxWidth={"xl"} open={open} onClose={handleClose}>
          <AppBar sx={{ position: "relative", backgroundColor: "#bdbdbd" }}>
            <Toolbar>
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <PED handleClose={handleClose} />
        </Dialog>
      </Box>
    );
  } else if (tabla === "ProgramasPresupuestarios") {
    return (
      <Box sx={{ display: "flex" }}>
        <Tooltip title="Editar">
          <IconButton onClick={handleClickOpen}>
            <AddIcon />
          </IconButton>
        </Tooltip>
        <Dialog fullWidth open={open} onClose={handleClose}>
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
              Añadir Programa Presupuestario
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
              label={"Nombre del programa"}
              variant="outlined"
              multiline={descripcion.length < 20 ? false : true}
              sx={descripcion.length < 20 ? { width: "60%" } : { width: "80%" }}
              onChange={(v) => setDescripcion(v.target.value)}
              style={{ marginTop: 1 }}
              rows={3}
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratRegular",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratLight",
                },
              }}
            />

            <FormControl
              sx={descripcion.length < 20 ? { width: "60%" } : { width: "80%" }}
              style={{ marginTop: "2vh" }}
            >
              <InputLabel
                id="labelInst"
                sx={{ fontFamily: "MontserratRegular" }}
              >
                Institución
              </InputLabel>
              <Select
                labelId="labelInst"
                value={institution}
                label="Institución"
                onChange={(x) => setInstitution(x.target.value)}
                style={{ marginTop: 1,                     fontFamily: "MontserratLight",
              }}
                rows={3}
                multiline={descripcion.length < 20 ? false : true}
              >
                <MenuItem
                  value={"0"}
                  key={0}
                  disabled
                  sx={{ fontFamily: "MontserratLight" }}
                >
                  Selecciona Institución
                </MenuItem>
                {catalogoInstituciones.map((item) => {
                  return (
                    <MenuItem
                      value={item.Id}
                      key={item.Id}
                      sx={{ fontFamily: "MontserratLight" }}
                    >
                      {item.NombreInstitucion}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </DialogContent>

          <DialogActions
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button color="error" onClick={handleClose}>
              <Typography
                sx={{ fontFamily: "MontserratMedium", fontSize: ".7vw" }}
              >
                Cancelar
              </Typography>
            </Button>


            <Button onClick={CreatePorCatalogoProgramap} autoFocus>
            <Typography
                sx={{ fontFamily: "MontserratMedium", fontSize: ".7vw" }}
              >
                De Acuerdo
              </Typography>            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  } else {
    return (
      <Box>
        <IconButton onClick={handleClickOpen}>
          <AddIcon
            sx={{
              width: 50,
              height: 50,
            }}
          />
        </IconButton>
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
              Añadir Elemento
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
              label={"Descripción"}
              variant="outlined"
              multiline={descripcion.length < 20 ? false : true}
              sx={descripcion.length < 20 ? { width: "60%" } : { width: "80%" }}
              onChange={(v) => setDescripcion(v.target.value)}
              style={{ marginTop: 1 }}
              rows={3}
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratRegular",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratLight",
                },
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
            <Button color="error" onClick={handleClose}>
              <Typography
                sx={{ fontFamily: "MontserratMedium", fontSize: ".7vw" }}
              >
                Cancelar
              </Typography>
            </Button>

            <Button onClick={CreatePorCatalogo} autoFocus>
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

export default AddDialogCatalogo;
