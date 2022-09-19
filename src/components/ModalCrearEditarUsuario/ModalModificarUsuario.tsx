import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import IRegistroUsuario from "../ModalCrearEditarUsuario/InterfazUsuario";
import { width } from '@mui/system';
import { red } from '@mui/material/colors';
import axios  from "axios";




export default function ModalEditarUsuario() {
  

  const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOb21icmVVc3VhcmlvIjoicHJwYXJkbyIsIklkVXN1YXJpbyI6ImE0Zjc5ZTU3LTMyYjctMTFlZC1hZWQwLTA0MDMwMDAwMDAwMCIsImlhdCI6MTY2MzI2MzMwMCwiZXhwIjoxNjYzMjY2MDAwfQ.zsy2hWV_gK7tVPwzEjz0LoUFdXERuqrI13xly_SQiWQ'
  
  /*const modifyUsers = () => {
    axios.post('http://10.200.4.105:5000/api/users',{ headers: {
       'Authorization': jwt,
       'Content-Type': 'application/json'
     }}).then((response) => {
       setUsers(response.data.data)
       setUsersFiltered(response.data.data)
     }).catch((err) => {
       console.log(err)
     })
   }
*/
  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /*function capturarDatos{
    var IdUsuarioCentral=document.getElementById("IdInstitucion").value;
    var IdInstitucion 
    var Telefono 
    var Celular 
    var Cargo 
    var TipoUsuario
  }*/
  const [ Usuario ,setUsuario]=React.useState<IRegistroUsuario>({
    Id:                "",
    EstaActivo:        0,
    Nombre:           "",
    ApellidoPaterno:   "",
    ApellidoMaterno:   "",
    NombreUsuario:    "",
    CorreoElectronico: "",
    CreadoPor:        "",
    ModificadoPor: "",
  });

  const [TipoDeUsuario, setTipoDeUsuario] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setTipoDeUsuario(event.target.value);
  };




  return (
    <Box sx={{width:"100vw"}}>
      <Button variant="outlined" onClick={handleClickOpen}>
        Editar Usuario
      </Button>
      

      
      <Dialog fullWidth maxWidth='lg' open={open} onClose={handleClose} >
        <DialogTitle>Editar Usuario </DialogTitle>
        <Box sx={{display:"flex",justifyContent:"center" }}>
            <Box sx={{backgroundColor:"#BBBABA",width:"60vw", height:"0.2vh", display:"flex",justifyContent:"center"}}></Box>

        </Box>
        
        <DialogContent
            sx={{
                display:"flex",
                flexDirection:"column"

            }}>
           <Box sx={{display:"flex",justifyContent:"space-between",marginBlockEnd:"1vh",paddingBlockEnd:"1vh"}}> 
                
                
                <Box sx={{paddingBlockEnd:"1vh", borderRadius: 4, backgroundColor: red,border: 1, display: "flex",justifyContent: "space-evenly",alignItems: "center",marginTop:"2vh"}}> 
                    <Input id='InTelefono' disableUnderline 
                    sx={{width:"28vw", 
                      display:"flex",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingLeft:"3vw",
                      paddingRight:"3vw", 
                      paddingTop:"1vh"
                      }} 
                    placeholder="Nombre" />
                </Box>

                <Box sx={{paddingBlockEnd:"1vh", borderRadius: 4, backgroundColor: red,border: 1, display: "flex",justifyContent: "space-evenly",alignItems: "center",marginTop:"2vh"}}> 
                    <Input id='InCelular' disableUnderline 
                    sx={{width:"28vw", 
                      display:"flex",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingLeft:"3vw",
                      paddingRight:"3vw", 
                      paddingTop:"1vh"
                      }} 
                    placeholder="Apellido Paterno" />
                </Box>
              
                                  
            </Box>


            <Box sx={{display:"flex",justifyContent:"space-between", alignItems:"center",marginBlockEnd:"1vh",paddingBlockEnd:"1vh"}}> 
                
                <Box sx={{paddingBlockEnd:"1vh", borderRadius: 4, backgroundColor: red,border: 1, display: "flex",justifyContent: "space-evenly",alignItems: "center",marginTop:"2vh"}}> 
                    <Input id='InApellidoMAterno' disableUnderline 
                    sx={{width:"28vw", 
                      display:"flex",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingLeft:"3vw",
                      paddingRight:"3vw", 
                      paddingTop:"1vh"
                      }} 
                    placeholder="Apellido Materno"/>
                </Box>


                <Box sx={{paddingBlockEnd:"1vh", borderRadius: 4,border: 1, display: "flex",justifyContent: "space-evenly",alignItems: "center",marginTop:"2vh"}}>
                <FormControl variant="standard"  sx={{width:"28vw"}}>
                    <InputLabel 
                    id='InInstitucion'
                    sx={{display:"flex",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingLeft:"2vw",
                      paddingRight:"3vw", 
                      paddingTop:"1vh"
                    }} 
                   >Institucion
                   </InputLabel>
                    <Select
                    labelId="demo-simple-select-standard-label"
                    id="InInstitucion"
                    value={TipoDeUsuario}
                    onChange={handleChange}
                    label="Institucion"
                    disableUnderline
                    sx={{display:"flex",justifyContent: "center",alignItems: "center",paddingLeft:"3vw",paddingRight:"3vw"}}
                    >
                    <MenuItem value="">
                    </MenuItem>
                      <MenuItem value={10}>Policia civil</MenuItem>
                      <MenuItem value={20}>Capullos</MenuItem>
                      <MenuItem value={30}>Fuerza Civil</MenuItem>
                    </Select>
                </FormControl>
                </Box>
               
            </Box>



            <Box sx={{display:"flex",justifyContent:"space-between",marginBlockEnd:"1vh",paddingBlockEnd:"1vh"}}> 
                
                
                <Box sx={{paddingBlockEnd:"1vh", borderRadius: 4, backgroundColor: red,border: 1, display: "flex",justifyContent: "space-evenly",alignItems: "center",marginTop:"2vh"}}> 
                    <Input id='InCargo' disableUnderline 
                    sx={{width:"28vw", 
                      display:"flex",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingLeft:"3vw",
                      paddingRight:"3vw", 
                      paddingTop:"1vh"
                      }} 
                    placeholder="Cargo" />
                </Box>

                <Box sx={{paddingBlockEnd:"1vh", borderRadius: 4,border: 1, display: "flex",justifyContent: "space-evenly",alignItems: "center",marginTop:"2vh"}}>
                <FormControl variant="standard"  sx={{width:"28vw"}}>
                    <InputLabel 
                    id='InRol'
                    sx={{display:"flex",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingLeft:"2vw",
                      paddingRight:"3vw", 
                      paddingTop:"1vh"
                    }} 
                   >Tipo de Usuario
                   </InputLabel>
                    <Select
                    labelId="demo-simple-select-standard-label"
                    id="InRol"
                    value={TipoDeUsuario}
                    onChange={handleChange}
                    label="Institucion"
                    disableUnderline
                    sx={{display:"flex",justifyContent: "center",alignItems: "center",paddingLeft:"3vw",paddingRight:"3vw"}}
                    >
                    <MenuItem value="">
                    </MenuItem>
                      <MenuItem value={15}>Administrador</MenuItem>
                      <MenuItem value={25}>Capturador</MenuItem>
                      <MenuItem value={35}>Verificado</MenuItem>
                    </Select>
                </FormControl>
                </Box>


            </Box>


            

            <Box sx={{display:"flex",justifyContent:"space-between",marginBlockEnd:"1vh",paddingBlockEnd:"1vh"}}> 
                
                
                <Box sx={{paddingBlockEnd:"1vh", borderRadius: 4, backgroundColor: red,border: 1, display: "flex",justifyContent: "space-evenly",alignItems: "center",marginTop:"2vh"}}> 
                    <Input id='InTelefono' disableUnderline 
                    sx={{width:"28vw", 
                      display:"flex",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingLeft:"3vw",
                      paddingRight:"3vw", 
                      paddingTop:"1vh"
                      }} 
                    placeholder="Telefono" />
                </Box>

                <Box sx={{paddingBlockEnd:"1vh", borderRadius: 4, backgroundColor: red,border: 1, display: "flex",justifyContent: "space-evenly",alignItems: "center",marginTop:"2vh"}}> 
                    <Input id='InCelular' disableUnderline 
                    sx={{width:"28vw", 
                      display:"flex",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingLeft:"3vw",
                      paddingRight:"3vw", 
                      paddingTop:"1vh"
                      }} 
                    placeholder="Celular" />
                </Box>


            </Box>


            <Box sx={{display:"flex",justifyContent:"space-between",marginBlockEnd:"1vh",paddingBlockEnd:"1vh"}}> 
                
                
                <Box sx={{paddingBlockEnd:"1vh", borderRadius: 4, backgroundColor: red,border: 1, display: "flex",justifyContent: "space-evenly",alignItems: "center",marginTop:"2vh"}}> 
                    <Input id='InCorreoelectronico' disableUnderline 
                    sx={{width:"28vw", 
                      display:"flex",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingLeft:"3vw",
                      paddingRight:"3vw", 
                      paddingTop:"1vh"
                      }} 
                    placeholder="Correo electronico" />
                </Box>
                
                <Box sx={{display:"flex", alignItems:"flex-end" , justifyContent:"space-evenly",width:"28vw"}}>
                  <Button sx={{display:"flex", width:"10vw"}} variant="contained"  color="error">Cancelar</Button>
                  <Button sx={{display:"flex", width:"10vw"}}variant="contained"  color="success">Aplicar Cambios</Button>
                </Box>
            </Box>

            
        </DialogContent>
      </Dialog>
    </Box>
  );
}