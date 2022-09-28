import React, { useEffect, useState } from "react";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import Swal from "sweetalert2";
import EditIcon from "@mui/icons-material/Edit";
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [nuevaDescripcion, setnuevaDescripcion] = React.useState("");
  const [fechaCaptura, setFechaCaptura] = React.useState("");
  const [institucion, setInstitucion] = React.useState("");

  const ModifyPorCatalogo = () => {
    if (tabla === "PEDs") {
      axios
        .put(
          "http://10.200.4.105:8000/api/catalogos",
          {
            Id: id,
            NuevaDescripcion: nuevaDescripcion,
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
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "!Elemento modificado con éxito!",
            showConfirmButton: false,
            timer: 1500,
          });
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
    } else if (tabla === "ProgramasPresupuestarios") {
      axios
        .put(
          "http://10.200.4.105:8000/api/programaPresupuestario",
          {
            IdProgramaPresupuestario: id,
            NuevoProgramaPresupuestario: nuevaDescripcion,
            IdInstitucion: institution,
            ModificadoPor: localStorage.getItem("IdUsuario"),
          },
          {
            headers: {
              Authorization: localStorage.getItem("jwtToken") || "",
            },
          }
        )
        .then((r) => {
          actualizado();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "!Elemento modificado con éxito!",
            showConfirmButton: false,
            timer: 1500,
          });
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
    } else {
      axios
        .put(
          "http://10.200.4.105:8000/api/catalogos",
          {
            Id: id,
            NuevaDescripcion: nuevaDescripcion,
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
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "!Elemento modificado con éxito!",
            showConfirmButton: false,
            timer: 1500,
          });
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
    }
  };

  const [institution, setInstitution] = useState("0");

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

  useEffect(() => {
    getInstituciones();
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
            <Button>Cancelar</Button>

            <Button onClick={ModifyPorCatalogo} autoFocus>
              De Acuerdo
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  } else if (tabla === "FechasDeCaptura") {
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
            <Button>Cancelar</Button>

            <Button onClick={ModifyPorCatalogo} autoFocus>
              De Acuerdo
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  } else if (tabla === "PEDs") {
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
            <Button>Cancelar</Button>

            <Button onClick={ModifyPorCatalogo} autoFocus>
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
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{`Modificar  ' ${descripcion} '`}</DialogTitle>

          <DialogContent>
            <TextField
              id="outlined-basic"
              placeholder={"Introduzca elemento modificado"}
              variant="outlined"
              onChange={(v) => setnuevaDescripcion(v.target.value)}
            />
          </DialogContent>

          <DialogActions onClick={handleClose}>
            <Button>Cancelar</Button>

            <Button onClick={ModifyPorCatalogo} autoFocus>
              De Acuerdo
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }
};

export default ModifyDialogCatalogos;
