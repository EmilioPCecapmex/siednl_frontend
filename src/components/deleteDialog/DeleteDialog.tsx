import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import { Box } from "@mui/material";
import Swal from "sweetalert2";

export const DeleteDialog = ({
  deleteText,
  id,
  actualizado,
}: {
  deleteText: string;
  id: string;
  actualizado: Function;
}) => {
  const [open, setOpen] = React.useState(false);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
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

  const deleteUsuario = () => {
    axios
      .delete("http://10.200.4.105:8000/api/deleteUser", {
        data: {
          IdUsuarioTiCentral: id,
          ModificadoPor: localStorage.getItem("IdUsuario"),
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        actualizado();
        Toast.fire({
          icon: "success",
          title: "Usuario eliminado con éxito.",
        });
      })
      .catch((err) =>
        Toast.fire({
          icon: "error",
          title: "Permisos denegados.",
        })
      );
  };

  return (
    <Box>
      <Tooltip title="Eliminar">
        <span>

        <IconButton
          onClick={handleClickOpen}
          disabled={localStorage.getItem("Rol") === "Capturador" ? true : false}
        >
          <DeleteIcon
            sx={[
              {
                "&:hover": {
                  color: "red",
                },
              },
            ]}
          />

        </IconButton>
        </span>

      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{`¿Desea eliminar este ${deleteText}?`}</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Al confirmar, se eliminara todo registro de este {deleteText}.
          </DialogContentText>
        </DialogContent>

        <DialogActions onClick={handleClose}>
          <Button>Cancelar</Button>

          <Button onClick={deleteUsuario} autoFocus>
            De Acuerdo
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DeleteDialog;
