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
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';

export const ModifyDialogCatalogos = ({
    
  deleteText,
  id,
  tabla,
  descripcion,
  actualizado
}: {
  deleteText: string;
  tabla:string;
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

  const ModifyPorCatalogo = () => {
   
    axios
      .put("http://10.200.4.105:8000/api/catalogos",  {
            Id:id,
            NuevaDescripcion:descripcion,
            Tabla:tabla,
            IdUser: localStorage.getItem("IdUsuario"),
        },
        {headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        }},
      )
      .then((r) => {
        
        actualizado();
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
  };

  

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
        <TextField id="outlined-basic" placeholder={descripcion} variant="outlined" onChange={(v)=>setnuevaDescripcion(v.target.value)} />
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
};

export default ModifyDialogCatalogos;
