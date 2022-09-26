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
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import AddIcon from "@mui/icons-material/Add";

export const AddDialogCatalogo = ({
  catalogo, 
  tabla,
  actualizado
}: {
  catalogo:string;
  tabla:string;
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

  const ModifyPorCatalogo = () => {
   
    axios
      .post("http://10.200.4.105:8000/api/create-catalogos",  {
            Descripcion:descripcion,
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
        <IconButton onClick={handleClickOpen} >
          <AddIcon
             sx={{
              width: 50,
              height: 50,
              backgroundColor: "#c4a57b",
              position: "absolute",
              ":hover": {
                backgroundColor: "#ffdcac",
              },
            }}
          />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{`Agregar  ' ${tabla} '`}</DialogTitle>

        <DialogContent>
        <TextField id="outlined-basic" placeholder={"descripcion"} variant="outlined" onChange={(v)=>setDescripcion(v.target.value)} sx={{mt:"2vh"}} />
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

export default AddDialogCatalogo;
