import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Box } from "@mui/material";
import Swal from "sweetalert2";

export const DeleteDialogCatalogos = ({
    
  deleteText,
  id,
  tabla,
  actualizado
}: {
  deleteText: string;
  tabla:string;
  id: string;
  actualizado: Function;
  
}) => {

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
  
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deletePorCatalogo = () => {
    if( tabla === 'PEDs'){
      axios
      .delete("http://10.200.4.105:8000/api/deletePED", {
        data: {
            Id:id,
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
          title: "Eliminado con éxito.",
        });
      })
      .catch((err) => 

      Toast.fire({
        icon: "error",
        title: "Permisos denegados.",
      })
      )
    } else if (tabla === 'ProgramasPresupuestarios'){
      axios
      .delete("http://10.200.4.105:8000/api/programaPresupuestario", {
        data: {
          IdProgramaPresupuestario:id,
          IdUser: localStorage.getItem("IdUsuario"),
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        actualizado();
        Toast.fire({
          icon: "success",
          title: "Eliminado con éxito.",
        });
      })
      .catch((err) => 
      Toast.fire({
        icon: "error",
        title: "Permisos denegados.",
      })
      )
    } else {
      axios
      .delete("http://10.200.4.105:8000/api/catalogos", {
        data: {

            Id:id,
            Tabla:tabla,
            IdUser: localStorage.getItem("IdUsuario"),
            
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        actualizado();
        Toast.fire({
          icon: "success",
          title: "Eliminado con éxito.",
        });

      })
      .catch((err) => 
      Toast.fire({
        icon: "error",
        title: "Permisos denegados.",
      })
      )
    }
    
  };

  return (
    <Box>
        <IconButton onClick={handleClickOpen}>
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{`¿Desea eliminar '${deleteText}'?`}</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Al confirmar, se eliminara '{deleteText}' del registro.
          </DialogContentText>
        </DialogContent>

        <DialogActions >


          <Button onClick={handleClose}>Cancelar</Button>

          <Button onClick={deletePorCatalogo} color='error' autoFocus>
            De Acuerdo
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DeleteDialogCatalogos;
