import React, { useEffect, useState } from "react";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import Swal from "sweetalert2";
import EditIcon from "@mui/icons-material/Edit";

import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
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

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
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
  const [nuevaDescripcion, setnuevaDescripcion] = React.useState("");
  const [fechaCaptura, setFechaCaptura] = React.useState("");

  const ModifyPorCatalogo = () => {
     if (tabla === "ProgramasPresupuestarios") {
      axios
        .put(
          process.env.REACT_APP_APPLICATION_BACK + "/api/programaPresupuestario",
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
          handleClose();
          Toast.fire({
            icon: "success",
            title: "!Elemento modificado con éxito!",
          });

        })
        .catch((err) =>

        Toast.fire({
          icon: "error",
          title: "Permisos denegados",
        })
        );
    } else {
      axios
        .put(
          process.env.REACT_APP_APPLICATION_BACK + "/api/catalogos",
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
          
          handleClose();
          Toast.fire({
            icon: "success",
            title: "!Elemento modificado con éxito!",
          });

        })
        .catch((err) =>
        Toast.fire({
          icon: "error",
          title: "Permisos denegados",
        })
        );
    }
  };

  const ModifyPorCatalogoFechas = () => {

    axios
      .put(process.env.REACT_APP_APPLICATION_BACK + "/api/fechaDeCaptura",  {
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
        handleClose();

      })
      .catch((err) => 
      Toast.fire({
        icon: "error",
        title: "Permisos denegados",
      })
      
      )
  };

  const ModifyPorCatalogoProgramasP = () => {

    axios
      .put(process.env.REACT_APP_APPLICATION_BACK + "/api/programaPresupuestario",  {
        IdProgramaPresupuestario:id,
        NuevoProgramaPresupuestario:nuevaDescripcion,
        IdInstitucion:institution,
        ModificadoPor: localStorage.getItem("IdUsuario"),
        },
        {headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        }},
      )
      .then((r) => {

        actualizado();
        handleClose();

      })
      .catch((err) => 
      Toast.fire({
        icon: "error",
        title: "Permisos denegados",
      })
      )
  };
  const [institution, setInstitution] = useState("0");

  const getInstituciones = () => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/instituciones", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
        params: {
          IdUsuario: localStorage.getItem("IdUsuario"),
          IdInstitucion: localStorage.getItem("IdInstitucion")
        }
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
        <Dialog open={open} onClose={handleClose} fullWidth>
        <Box sx={{width: '100%', height: '5vh', alignItems: 'center', display: 'flex', justifyContent: 'center', flexDirection: 'column', borderBottom: .5, borderColor: '#ccc', boxShadow: 1}}>
          <Typography sx={{fontFamily: 'MontserratSemiBold', width: '90%', fontSize: '1vw', textAlign: 'center'}}>Editar Elemento</Typography>
          </Box>
          <DialogContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <TextField
            multiline={descripcion.length < 20 ? false : true}
            sx={descripcion.length < 20 ? {width: '60%'} : {width: '80%'}}
            InputProps={{
              style: {
                fontFamily: "MontserratLight",
              },
            }}
            rows={3}
              id="outlined-basic"
              value={nuevaDescripcion || descripcion}
              variant="outlined"
              onChange={(v) => setnuevaDescripcion(v.target.value)}
            />


            <InputLabel >Institución</InputLabel>
            <Select
              sx={descripcion.length < 20 ? {width: '60%'} : {width: '80%'}}
              value={institution}
              label="Institución"
              onChange={(x) => setInstitution(x.target.value)}
            >
              <MenuItem value={"0"} key={0} disabled>
                Selecciona
              </MenuItem>
              {catalogoInstituciones.map((item) => {
                return (
                  <MenuItem value={item.NombreInstitucion} key={item.Id}>
                    {item.NombreInstitucion}
                  </MenuItem>
                );
              })}
            </Select>
          </DialogContent>

          <DialogActions sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
            <Button color='error' onClick={handleClose}>
              <Typography sx={{fontFamily: 'MontserratMedium', fontSize: '.7vw'}}>
              Cancelar
              </Typography></Button>

            <Button onClick={ModifyPorCatalogoProgramasP} autoFocus>
            <Typography sx={{fontFamily: 'MontserratMedium', fontSize: '.7vw'}}>
            De Acuerdo
              </Typography>
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  } else if (tabla === "FechasDeCaptura") {
    return(
      <Box sx={{display:"flex"}}>
        <Tooltip title="Editar">
          <IconButton onClick={handleClickOpen} >
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
        <Dialog open={open} onClose={handleClose} fullWidth>
        <Box sx={{width: '100%', height: '5vh', alignItems: 'center', display: 'flex', justifyContent: 'center', flexDirection: 'column', borderBottom: .5, borderColor: '#ccc', boxShadow: 1}}>
          <Typography sx={{fontFamily: 'MontserratSemiBold', width: '90%', fontSize: '1vw', textAlign: 'center'}}>Editar Elemento</Typography>
          </Box>
  
          <DialogContent sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
              <TextField  label={"Descripcion"} variant="outlined" onChange={(v)=>setnuevaDescripcion(v.target.value)} sx={{mt:"2vh"}} />
              <TextField  label={"Fecha de captura"} variant="outlined" onChange={(x)=>setFechaCaptura(x.target.value)} sx={{mt:"2vh"}} />
          </DialogContent>
  
          <DialogActions sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
          <Button color='error' onClick={handleClose}>
              <Typography sx={{fontFamily: 'MontserratMedium', fontSize: '.7vw'}}>
              Cancelar
              </Typography></Button>

            <Button onClick={ModifyPorCatalogoFechas} autoFocus>
             <Typography sx={{fontFamily: 'MontserratMedium', fontSize: '.7vw'}}>
            De Acuerdo
              </Typography>
            </Button>
          </DialogActions>
        </Dialog>
      </Box>);
  } else if (tabla === "PEDs") {
    return (
      <Box>
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
            <Button color='error'>Cancelar</Button>

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
        <Dialog open={open} onClose={handleClose} fullWidth>
          <Box sx={{width: '100%', height: '5vh', alignItems: 'center', display: 'flex', justifyContent: 'center', flexDirection: 'column', borderBottom: .5, borderColor: '#ccc', boxShadow: 1}}>
          <Typography sx={{fontFamily: 'MontserratSemiBold', width: '90%', fontSize: '1vw', textAlign: 'center'}}>Editar Elemento</Typography>
          </Box>

          <DialogContent sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <TextField
            multiline={descripcion.length < 20 ? false : true}
            sx={descripcion.length < 20 ? {width: '60%'} : {width: '80%'}}
            InputProps={{
              style: {
                fontFamily: "MontserratLight",
              },
            }}
            rows={5}
              id="outlined-basic"
              value={nuevaDescripcion || descripcion}
              variant="outlined"
              onChange={(v) => setnuevaDescripcion(v.target.value)}
            />
          </DialogContent>

          <DialogActions sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
            <Button color='error' onClick={handleClose}>
              <Typography sx={{fontFamily: 'MontserratMedium', fontSize: '.7vw'}}>
              Cancelar
              </Typography></Button>

            <Button onClick={ModifyPorCatalogo} autoFocus>
            <Typography sx={{fontFamily: 'MontserratMedium', fontSize: '.7vw'}}>
            De Acuerdo
              </Typography>
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }
};

export default ModifyDialogCatalogos;
