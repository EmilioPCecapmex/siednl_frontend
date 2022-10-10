import React, {useState, useEffect} from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import { Box, Autocomplete, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

export const AppsDialog = ({
  deleteText,
  id,
  actualizado
}: {
  deleteText: string;
  id: string;
  actualizado: Function;
}) => {
  const [open, setOpen] = React.useState(false);

  const [instituciones, setInstituciones] = useState<Array<IInstituciones>>([])

  const [instSel, setInstSel] = useState([
    {
      Id: "",
      NombreInstitucion: "",
    },
  ])

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
      )
  };

  const getInstituciones = () => {
    axios
      .get("http://10.200.4.105:8000/api/instituciones", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if(r.status === 200){
            setInstituciones(r.data.data)
        }
      });
  };

useEffect(() => {
  getInstituciones()
  }, [])
  

  return (
    <Box>
      <Tooltip title="Eliminar">
        <IconButton onClick={handleClickOpen}>
          <AppRegistrationIcon
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
      <Dialog open={open} onClose={handleClose} fullWidth >
        <Box sx={{width: '100%', height: '4vh', display: 'flex', alignItems: 'center',  justifyContent: 'center', borderBottom: 1, boxShadow: 1, borderColor: '#cbcbcb'}}>
        <Typography sx={{fontFamily: 'MontserratBold', fontSize: '1vw'}}>
        Vincular Usuario - Institución
        </Typography>
        </Box>
      

        <DialogContent >
        <Autocomplete
        multiple
          disablePortal
          sx={{ m: "1vh 1vh 0 1vh" }}
          options={instituciones}
          getOptionLabel={(option) => option.NombreInstitucion}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.Id} >
                <p style={{fontFamily: 'MontserratSemiBold', fontSize: '.8vw'}}>
                {option.NombreInstitucion + " "}
                </p>
                <p style={{fontFamily: 'MontserratLight', fontSize: '.6vw'}}>
                {
                    option.Secretaria
                }                 </p>
                
              </li>
            )
          }}
          renderInput={(params) => <TextField {...params} label="Institucion" />}
          onChange={(event, value) => setInstSel(value)}
          isOptionEqualToValue={(option, value) => option.Id === value.Id}
        />
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

export default AppsDialog;

export interface IInstituciones {
    Id:                 string;
    NombreInstitucion:  string;
    FechaCreacion:      string;
    CreadoPor:          string;
    UltimaModificacion: string;
    ModificadoPor:      string;
    Deleted:            number;
    Secretaria:         string;
}
