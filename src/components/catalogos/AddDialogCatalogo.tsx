import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import { Box, InputLabel, MenuItem, Select } from "@mui/material";
import Swal from "sweetalert2";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import { Typography, FormControl } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

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
    timer: 5000,
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
  const [fechaCaptura, setFechaCaptura] = React.useState("");
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
        handleClose()

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
        <Dialog fullWidth maxWidth={"md"} open={open} onClose={handleClose}>
        <DialogTitle sx={{ fontFamily: "MontserratSemiBold" }}>
            Añadir {tabla}
          </DialogTitle>
          <DialogContent
            sx={{ display: "flex", justifyContent: "space-around", mt: "1vh" }}
          >
            <Box sx={{ pt: "1vh" }}>
              <TextField
                sx={{ width: "20vw" }}
                label={"Descripción"}
                variant="outlined"
                onChange={(v) => setDescripcion(v.target.value)}
              />
            </Box>
            <Box sx={{ pt: "1vh" }}>
              <TextField
                label={"Fecha de captura"}
                variant="outlined"
                onChange={(x) => setFechaCaptura(x.target.value)}
                sx={{ width: "20vw" }}
              />
            </Box>
          </DialogContent>

          <DialogActions onClick={handleClose}>
            <Button>Cancelar</Button>

            <Button onClick={CreatePorCatalogoFechas} autoFocus>
              De Acuerdo
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
        <AppBar sx={{ position: 'relative', backgroundColor: '#bdbdbd' }}>
          <Toolbar >
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
        <Dialog fullWidth maxWidth={"md"} open={open} onClose={handleClose}>
        <DialogTitle sx={{ fontFamily: "MontserratSemiBold" }}>
            Añadir Elemento
          </DialogTitle>
          <DialogContent
            sx={{ display: "flex", justifyContent: "space-around", mt: "1vh" }}
          >
            <Box sx={{ pt: "1vh" }}>
              <TextField
                sx={{ width: "20vw" }}
                label={"Nombre del programa"}
                variant="outlined"
                onChange={(v) => setDescripcion(v.target.value)}
              />
            </Box>

            <Box sx={{ pt: "1vh" }}>
              <FormControl sx={{ width: "20vw" }}>
                <InputLabel id="demo-simple-select-label">
                  Institución
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={institution}
                  label="Institución"
                  onChange={(x) => setInstitution(x.target.value)}
                >
                  <MenuItem value={"0"} key={0} disabled>
                    Selecciona Institución
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
          </DialogContent>

          <DialogActions >
            <Button onClick={handleClose} color="error">Cancelar</Button>

            <Button onClick={CreatePorCatalogoProgramap} autoFocus>
              De Acuerdo
            </Button>
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
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle sx={{ fontFamily: "MontserratSemiBold" }}>
            Añadir Elemento
          </DialogTitle>

          <DialogContent>
            <TextField
              label={"Descripcion"}
              variant="outlined"
              onChange={(v) => setDescripcion(v.target.value)}
              sx={{ marginTop: 1 }}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} color="error">
              Cancelar
            </Button>

            <Button onClick={CreatePorCatalogo} autoFocus>
              De Acuerdo
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }
};

export default AddDialogCatalogo;
