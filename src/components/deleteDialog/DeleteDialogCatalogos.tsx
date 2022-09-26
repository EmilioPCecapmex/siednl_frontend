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
import Alert from "@mui/material/Alert";
import { Box } from "@mui/material";
import Swal from "sweetalert2";
import { Console } from "console";

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
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deletePorCatalogo = () => {
    if( tabla == 'PEDs'){

    } else if (tabla == 'ProgramasPresupuestarios'){

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
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Eliminado con éxito',
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch((err) => 
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Permisos denegados',
        showConfirmButton: false,
        timer: 1500
      })
      )
    }
    
  };

  return (
    <Box>
      <Tooltip title="Eliminar">
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
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{`¿Desea eliminar ' ${deleteText} '?`}</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Al confirmar, se eliminara todo registro de ' {deleteText} '.
          </DialogContentText>
        </DialogContent>

        <DialogActions onClick={handleClose}>
          <Button>Cancelar</Button>

          <Button onClick={deletePorCatalogo} autoFocus>
            De Acuerdo
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DeleteDialogCatalogos;
