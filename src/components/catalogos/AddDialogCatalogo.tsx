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
import { Box } from "@mui/material";
import Swal from "sweetalert2";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import { Typography } from '@mui/material';
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [descripcion, setDescripcion] = React.useState("");
  const [fechaCaptura, setFechaCaptura] = React.useState("");

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
        actualizado();
      })
      .catch((err) =>
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Permisos denegados",
          showConfirmButton: false,
          timer: 1500,
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
        actualizado();
      })
      .catch((err) =>
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Permisos denegados",
          showConfirmButton: false,
          timer: 1500,
        })
      );
  };

  if (tabla === "FechasDeCaptura") {
    return (
      <Box sx={{ display: "flex" }}>
        <IconButton onClick={handleClickOpen}>
          <AddIcon
            sx={{
              width: 50,
              height: 50,
            }}
          />
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{`Agregar  ' ${catalogo} '`}</DialogTitle>

          <DialogContent sx={{ display: "flex" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                label={"Descripcion"}
                variant="outlined"
                onChange={(v) => setDescripcion(v.target.value)}
                sx={{ mt: "2vh" }}
              />
              <TextField
                label={"Fecha de captura"}
                variant="outlined"
                onChange={(x) => setFechaCaptura(x.target.value)}
                sx={{ mt: "2vh" }}
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
  } else {
    if (tabla != "PEDs") {
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
            <DialogTitle>{`Agregar  ' ${tabla} '`}</DialogTitle>

            <DialogContent>
              <TextField
                id="outlined-basic"
                placeholder={"Descripcion"}
                variant="outlined"
                onChange={(v) => setDescripcion(v.target.value)}
                sx={{ mt: "2" }}
              />
            </DialogContent>

            <DialogActions onClick={handleClose}>
              <Button>Cancelar</Button>

              <Button onClick={CreatePorCatalogo} autoFocus>
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
          <Dialog fullWidth maxWidth={"xl"} open={open} onClose={handleClose}>
            <PED />
            <DialogActions onClick={handleClose}>

            <Button sx={{backgroundColor:'#ffa4a4', color:'black'}} onClick={handleClose}> Cancelar </Button>

            </DialogActions>
          </Dialog>
        </Box>
      );
    }
  }
};

export default AddDialogCatalogo;
