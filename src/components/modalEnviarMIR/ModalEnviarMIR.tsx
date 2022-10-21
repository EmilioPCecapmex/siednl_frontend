import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Box,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  AlertColor,
  Typography,
  FormHelperText,
} from "@mui/material";
import { IUsuarios } from "../../screens/notification/interfaces";

export default function ModalEnviarMIR({
  open,
  handleClose,
  MIR,
  IdMir
}: {
  open: boolean;
  handleClose: Function;
  MIR: string;
  IdMir: string;
}) {

  const [comment, setComment] = useState('');

  const [userXInst, setUserXInst] = useState<Array<IIUserXInst>>([])
  const [userSelected, setUserSelected] = useState("0")
  const [instSelected, setInstSelected] = useState("")
  // console.log(IdMir);
  

  const comentMir = (id:string) => {
    axios
      .post(
        "http://10.200.4.199:8000/api/coment-mir",
        {
          IdMir: id,
          Coment: comment,
          CreadoPor: localStorage.getItem("IdUsuario")
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        // console.log(r);
      })
      .catch((err) => {
        // console.log(err)
      });
  };

  // const enviarNotificacion = () => {
  //   axios
  //     .post(
  //       "http://10.200.4.202:8000/api/create-notif-inst",
  //       {
  //         Titulo: titulo,
  //         Mensaje: mensaje,
  //         IdUsuarioCreador: localStorage.getItem("IdUsuario"),
  //       },
  //       {
  //         headers: {
  //           Authorization: localStorage.getItem("jwtToken") || "",
  //         },
  //       }
  //     )
  //     .then((r) => {
  //       if (r.status === 200) {

  //         if(checkedEmail) {
  //           enviarNotificacionMail();
  //         }else{
  //           limpiaForm();
  //           getNotifEnviadas();
  //           Toast.fire({
  //             icon: "success",
  //             title: "Notificación enviada",
  //           });
  //         }
  //         }


     
  //     });
  // };

  const createMIR = (estado: string) => {
    
    if(estado === "Autorizada" && userSelected !== "0"){
      estado = "En Revisión"

    }else if(estado === "En Autorización" && userSelected !== "0"){
      estado = "En Captura"
    }

    console.log(estado)


    axios
      .post(
        "http://10.200.4.202:8000/api/create-mir",
        {
          MIR: MIR,
          Estado: estado,
          CreadoPor: userSelected !== "0"  ?  userSelected : localStorage.getItem("IdUsuario"),
          AnioFiscal: JSON.parse(MIR)?.encabezado.ejercicioFiscal,
          Institucion: JSON.parse(MIR)?.encabezado.institucion,
          Programa: JSON.parse(MIR)?.encabezado.nombre_del_programa,
          Eje: JSON.parse(MIR)?.encabezado.eje,
          Tematica: JSON.parse(MIR)?.encabezado.tema,
          IdMir: IdMir,
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        
        Toast.fire({
          icon: "success",
          title: r.data.data.message,
        });
        if(comment!=="") comentMir(r.data.data.ID);
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: err.response.data.result.error,
        });
      });
  };

  const getUsuariosXInstitucion = () => {

    axios
      .get("http://10.200.4.202:8000/api/usuarioXInstitucion", {
        params: {
          IdUsuario: localStorage.getItem("IdUsuario"),
          Institucion: JSON.parse(MIR)?.encabezado.institucion,
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          setUserXInst(r.data.data)
        }
      });
  };

  useEffect(() => {
    if(open){
      getUsuariosXInstitucion()
      setInstSelected(JSON.parse(MIR)?.encabezado.institucion)
    }
  },[open])


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

  const [errorForm, setErrorsForm] = useState({
    visible: false,
    text: "",
    type: "",
  });

  const AlertForm = () => {
    return (
      <Box sx={{ mt: "1vh", mb: "2vh" }}>
        <Alert severity={errorForm.type as AlertColor}>{errorForm.text}</Alert>
      </Box>
    );
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={() => handleClose()}>
      <DialogTitle sx={{ fontFamily: "MontserratBold" }}>
        Confirmar Envío
      </DialogTitle>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            backgroundColor: "#BBBABA",
            width: "60vw",
            height: "0.1vh",
            display: "flex",
            justifyContent: "center",
          }}
        />
      </Box>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {errorForm.visible ? <AlertForm /> : null}

        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection:'column',
            justifyContent: "space-evenly",
          }}
        >
          <Typography sx={{ fontFamily: "MontserratMedium" }}>Al confirmar, la MIR se enviará a los usuarios correspondientes para revisión.</Typography>
          <TextField placeholder="Agregar comentario" onChange={(v)=>setComment(v.target.value)}></TextField>
          <Typography>Delegar MIR a usuario verificador de: {instSelected}</Typography>
          <FormControl sx={{display: 'flex', width: '70%', alignItems: 'center', justifyContent: 'center', border: 1, borderRadius: 1, borderColor: '#616161'}}>
  <Select size="small" variant="standard"
  sx={{fontFamily: 'MontserratRegular'}}
  fullWidth
  value={userSelected}
  onChange={(v) => setUserSelected(v.target.value)}
  disableUnderline>
    <MenuItem value={"0"} disabled>
    Selecciona
    </MenuItem>
 
    {userXInst.map((item) => {
      return (
        <MenuItem value={item.IdUsuario} key={item.IdUsuario}>
        {item.Nombre}
        </MenuItem>
      )
    })}

  </Select>
</FormControl>        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBlockEnd: "1vh",
            paddingBlockEnd: "1vh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-evenly",
              width: "100vw",
              mt: "4vh",
            }}
          >
            <Button
              sx={{ display: "flex", width: "10vw" }}
              variant="contained"
              color="error"
              onClick={() => handleClose()}
            >
              Cancelar
            </Button>
            <Button
              sx={{ display: "flex", width: "10vw" }}
              variant="contained"
              color="primary"
              onClick={() => {createMIR(localStorage.getItem("Rol") == "Capturador"
              ? "En Revisión"
              : localStorage.getItem("Rol") == "Verificador"
              ? "En Autorización"
              : "Autorizada"); handleClose()}}
            >
              Confirmar
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}


export interface IIUserXInst {
  IdUsuario:          string;
  IdUsuarioTiCentral: string;
  Rol:                string;
  NombreInstitucion:  string;
  Nombre:             string;
  ApellidoPaterno:    string;
}
