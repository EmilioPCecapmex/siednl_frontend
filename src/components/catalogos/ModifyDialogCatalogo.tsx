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
  const [fechaCaptura, setFechaCaptura] = React.useState("");
  const [institucion, setInstitucion] = React.useState("");

  const ModifyPorCatalogo = () => {
   
    axios
      .put("http://10.200.4.105:8000/api/catalogos",  {
            Id:id,
            NuevaDescripcion:nuevaDescripcion,
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

  const ModifyPorCatalogoProgramasP = () => {
   
    axios
      .put("http://10.200.4.105:8000/api/programaPresupuestario",  {
        IdProgramaPresupuestario:id,
        NuevoProgramaPresupuestario:nuevaDescripcion,
        IdInstitucion:tabla,
        ModificadoPor: localStorage.getItem("IdUsuario"),
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

  const ModifyPorCatalogoFechas = () => {
   
    axios
      .put("http://10.200.4.105:8000/api/fechaDeCaptura",  {
        IdFechaDeCaptura:id,
        NuevoDescripcion:nuevaDescripcion,
        NuevoFechaDeCaptura:fechaCaptura,
        ModificadoPor: localStorage.getItem("IdUsuario"),
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
  switch(tabla){
    case "FechasDeCaptura":
      return(
        <Box sx={{display:"flex"}}>
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
            <DialogTitle>{`Editar  ' ${descripcion} '`}</DialogTitle>
    
            <DialogContent sx={{display:"flex"}}>
              <Box sx={{display:"flex",justifyContent:"space-between" }}>
                <TextField  label={"Descripcion"} variant="outlined" onChange={(v)=>setnuevaDescripcion(v.target.value)} sx={{mt:"2vh"}} />
                <TextField  label={"Fecha de captura"} variant="outlined" onChange={(x)=>setFechaCaptura(x.target.value)} sx={{mt:"2vh"}} />
              </Box>
            </DialogContent>
    
            <DialogActions onClick={handleClose}>
              <Button>Cancelar</Button>
    
              <Button onClick={ModifyPorCatalogoFechas} autoFocus>
                De Acuerdo
              </Button>
            </DialogActions>
          </Dialog>
        </Box>);

        
    case "ProgramasPresupuestarios":
      return(
        <Box sx={{display:"flex"}}>
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
            <DialogTitle>{`Editar  ' ${descripcion} '`}</DialogTitle>
    
            <DialogContent sx={{display:"flex"}}>
              <Box sx={{display:"flex",justifyContent:"space-between" }}>
                <TextField  label={"Descripcion"} variant="outlined" onChange={(v)=>setnuevaDescripcion(v.target.value)} sx={{mt:"2vh"}} />
                <TextField  label={"Institucion"} variant="outlined" onChange={(x)=>setInstitucion(x.target.value)} sx={{mt:"2vh"}} />
              </Box>
            </DialogContent>
    
            <DialogActions onClick={handleClose}>
              <Button>Cancelar</Button>
    
              <Button onClick={ModifyPorCatalogoProgramasP} autoFocus>
                De Acuerdo
              </Button>
            </DialogActions>
          </Dialog>
        </Box>);

  default:
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
  }
};

export default ModifyDialogCatalogos;
