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
import TextField from '@mui/material/TextField';

export const DeleteDialog = ({
  deleteText,
  id,
  actualizado,
  idUsaurioCentral,
}: {
  deleteText: string;
  id: string;
  actualizado: Function;
  idUsaurioCentral:string;
}) => {
  const [open, setOpen] = React.useState(false);
  const [comentario, setComentario] = React.useState("");

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

  // const deleteUsuario = () => {
  //   axios
  //     .delete( "http://10.200.4.200/api/deleteUser", {
  //       data: {
  //         IdUsuarioTiCentral: id,
  //         ModificadoPor: localStorage.getItem("IdUsuario"),
  //       },
  //       headers: {
  //         Authorization: localStorage.getItem("jwtToken") || "",
  //       },
  //     })
  //     .then((r) => {
  //       actualizado();
  //       Toast.fire({
  //         icon: "success",
  //         title: "Usuario eliminado con éxito.",
  //       });
  //     })
  //     .catch((err) =>
  //       Toast.fire({
  //         icon: "error",
  //         title: "Permisos denegados.",
  //       })
  //     );
  // };

  const [idSolicitud, setIdSolicitud] = React.useState("");

  const deleteUsuario = () => {
    axios
      .post(
        "http://10.200.4.200:5000/api/create-solicitud",
        {
          IdUsuario: idUsaurioCentral,
          DatosAdicionales: "",
          TipoSolicitud: "Baja",
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
        if ( r.data.data[0][0].Respuesta== 201) {
          
          if(comentario.length>10){
             setIdSolicitud(r.data.data[0][0].IdSolicitud)
          }
         
          Toast.fire({
              icon: "success",
              title: "Solicitud Creada!",
            });
        }
      })
      .catch((r) => {
        if (r.data.data[0][0].Respuesta == 409) {
         
        }
      });
  }

  const createComentarios = () => {
    axios
      .post(
        "http://10.200.4.200:5000/api/create-comentario",
        {
          CreadoPor: localStorage.getItem("IdCentral"),
          IdSolicitud: idSolicitud,
          Comentario: comentario
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        if (r.status === 201) {
          
          
          Toast.fire({
              icon: "success",
              title: "Solicitud Creada!",
            });
            
          handleClose();
        }
      })
      .catch((r) => {
        if (r.response.status === 409) {

        }
      });
  }

  React.useEffect(() => {
    if(idSolicitud!=""){
      createComentarios();
  }
  }, [idSolicitud]);


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
            Al confirmar, se creara una solicitud de baja de este {deleteText}.
          </DialogContentText>

        <TextField  
        sx={{width:"100%"}}
        label="Agregar comentario"
        variant="filled"
        multiline
        rows={3}
        onChange={(c)=>{setComentario(c.target.value) }}
        inputProps={{
          maxLength: 2000,
        }}
        />
        </DialogContent>

        <DialogActions onClick={handleClose}>
          <Button>Cancelar</Button>

          <Button onClick={deleteUsuario} autoFocus  disabled={comentario.length>=10?false:true}>
            
            De Acuerdo
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DeleteDialog;
