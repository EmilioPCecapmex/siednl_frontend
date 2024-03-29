import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Typography,
} from "@mui/material";

import { queries } from "../../queries";
import { IActividadesRF, IComponenteRF, IRF } from "../tabsRaffi/interfacesRaffi";
import { alertaErrorConfirm, alertaErroresDocumento, alertaExitoConfirm } from "../genericComponents/Alertas";
import { create_coment_mir, enviarNotificacionRol } from "../genericComponents/axiosGenericos";

export let errores: string[] = [];

export default function ModalEnviarRF({
  open,
  handleClose,
  RF,
  MA,
  MIR,
  IdMA,
  IdRF,
  showResume,
}: {
  open: boolean;
  handleClose: Function;
  RF: string;
  MA: string;
  MIR: string;
  IdMA: string;
  IdRF: string;
  showResume: Function;
}) {

  const [coment, setComment] = useState("");
  const [userXInst, setUserXInst] = useState<Array<IIUserXInst>>([]);
  const [newComent, setNewComent] = React.useState(false);

   const enviarMensaje = "Se ha creado una nueva";

  const comentMA = (id: string) => {
  
      create_coment_mir(id, coment, "RF")
      .then((r) => {
        setNewComent(false);
        setComment("");
        handleClose();
      })
      .catch((err) => {});
  };

  let jsonRF: IRF =
  RF === ""
      ? ""
      : JSON.parse(RF).length > 1
      ? JSON.parse(RF)[0]
      : JSON.parse(RF);

  

  let err = 0;

  const checkMA = (v: string) => {
    errores = [];

    if (jsonRF?.fin === null ) {
      err = 1;
      errores.push("Sección <strong>Fin</strong> incompleta.");
    }

    if (jsonRF?.fin.añoAvanceFisico === null ||
      /^[\s]*$/.test(jsonRF?.fin.añoAvanceFisico)) {
      err = 1;
      errores.push("<strong>Fin</strong> Año del Avance Fisico: incompleta.");
    }

    if (jsonRF?.fin.valorAvanceFisico === null ||
      /^[\s]*$/.test(jsonRF?.fin.valorAvanceFisico)) {
      err = 1;
      errores.push("<strong>Fin</strong> Valor del Avance Fisico: incompleta.");
    }

    if (jsonRF?.proposito === null) {
      err = 1;
      errores.push("<strong>Fin</strong> incompleta.");
    }

    if (jsonRF?.proposito.añoAvanceFisico === null ||
      /^[\s]*$/.test(jsonRF?.proposito.añoAvanceFisico)) {
      err = 1;
      errores.push("<strong>Proposito</strong> Año del Avance Fisico: incompleta.");
    }

    if (jsonRF?.proposito.valorAvanceFisico === null ||
      /^[\s]*$/.test(jsonRF?.proposito.valorAvanceFisico)) {
      err = 1;
      errores.push("<strong>Proposito</strong> Valor del Avance Fisico: incompleta.");
    }
    
   
    checkComponentes(v);
  };

  const checkComponentes = (v: string) => {
    
    jsonRF.componentes.map((componente: IComponenteRF, index: number)=>{
      if (
        (componente.metasPorFrecuencia[0].semestre1 === undefined ||
          /^[\s]*$/.test(componente.metasPorFrecuencia[0].semestre1) ||
          componente.metasPorFrecuencia[0].semestre2 === undefined ||
          /^[\s]*$/.test(componente.metasPorFrecuencia[0].semestre2)) &&
        (componente.metasPorFrecuencia[0].trimestre1 === undefined ||
          /^[\s]*$/.test(componente.metasPorFrecuencia[0].trimestre1) ||
          componente.metasPorFrecuencia[0].trimestre2 === undefined ||
          /^[\s]*$/.test(componente.metasPorFrecuencia[0].trimestre2) ||
          componente.metasPorFrecuencia[0].trimestre3 === undefined ||
          /^[\s]*$/.test(componente.metasPorFrecuencia[0].trimestre3) ||
          componente.metasPorFrecuencia[0].trimestre4 === undefined ||
          /^[\s]*$/.test(componente.metasPorFrecuencia[0].trimestre4))
      ) {
        err = 1;
        errores.push(
          `<strong> Componente ${
            index + 1
          } </strong>: Metas por frecuencia sin información.`
        );
      }
    })

    checkActividades(v);
  };

  const checkActividades = (v: string) => {
  
  jsonRF.componentes.map((componente: IComponenteRF, index: number) => {
    componente.actividades.map((actividad: IActividadesRF, index: number)=>{

      if(
        
        (actividad.metasPorFrecuencia[0].trimestre1 === undefined ||
          /^[\s]*$/.test(actividad.metasPorFrecuencia[0].trimestre1) ||
          actividad.metasPorFrecuencia[0].trimestre2 === undefined ||
          /^[\s]*$/.test(actividad.metasPorFrecuencia[0].trimestre2) ||
          actividad.metasPorFrecuencia[0].trimestre3 === undefined ||
          /^[\s]*$/.test(actividad.metasPorFrecuencia[0].trimestre3) ||
          actividad.metasPorFrecuencia[0].trimestre4 === undefined ||
          /^[\s]*$/.test(actividad.metasPorFrecuencia[0].trimestre4))
      ){
        err = 1;
        errores.push(
          `<strong> Actividad ${
            index + 1
          } </strong>: Metas por frecuencia sin información.`
        );
      }
      
    })
    })
    if (err === 0) {
      creaRF(v);
    } else {
      alertaErroresDocumento(errores)
    }
  };

  const creaRF = (estado: string) => {
    axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/create-rf-generic",
        {
          Raffi: RF,
          CreadoPor: localStorage.getItem("IdUsuario"),
          IdMa: IdMA,
          Id: IdRF,
          Estado: estado,
          Rol: localStorage.getItem("Rol")
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        
        let rol: string[] = [];
        if(localStorage.getItem("Rol") === "Verificador"){
          rol = ["Administrador"]
        }

        if(localStorage.getItem("Rol") === "Capturador"){
          rol = ["Verificador"]
        }

        if(localStorage.getItem("Rol") === "Administrador"){
          rol = ["Capturador","Verificador"]
        }
        console.log("r.data.data.Id: ",r.data.data.Id);
        console.log("IdRF: ",IdRF);

        enviarNotificacionRol("RF", "RF enviada", r.data.data.Id, rol)
        if (estado === "Autorizada") {
          // CrearFichaTecnica();  
        }
        alertaExitoConfirm((r.data.data.message).toUpperCase())
        if (coment !== "") {
          comentMA(IdRF);
        }
        showResume();
      })
      .catch((err) => {
        alertaErrorConfirm((err.response.data.result.error).toUpperCase())
      });
  };


  useEffect(() => {
    if (open) {
     

    axios
      .get(
        // eslint-disable-next-line no-useless-concat
        process.env.REACT_APP_APPLICATION_BACK+ "/api/tipo-usuario",
        {
          params: {
            TipoUsuario: localStorage.getItem("Rol"),
            IdEntidad: localStorage.getItem("IdEntidad"),
            IdApp: localStorage.getItem("dApp"),
          },
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        if (r.status === 200) {
          setUserXInst(r.data.data);
        }
      });
    }
  }, [MIR, open]);

  



  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={() => handleClose()}>
      <DialogTitle
        sx={{
          fontFamily: "MontserratBold",
          borderBottom: 1,
          height: "6vh",
          mb: 2,
        }}
      >
        {localStorage.getItem("Rol") === "Administrador"
          ? "Confirmar Autorización"
          : "Confirmar Envío"}
      </DialogTitle>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "30vw",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            mb: 2,
          }}
        >
          <Typography
            sx={{ fontFamily: "MontserratMedium", textAlign: "center" }}
          >
            {localStorage.getItem("Rol") === "Administrador"
              ? "Al confirmar, la Raffi se autorizará"
              : localStorage.getItem("Rol") === "Verificador"
              ? "Al confirmar, la Raffi se enviará a los usuarios correspondientes para autorización"
              : "Al confirmar, la Raffi se enviará a los usuarios correspondientes para revisión"}
          </Typography>
        </Box>

       
          <Box sx={{ width: "30vw" }}>
            <TextField
              multiline
              rows={3}
              label={"Agregar Comentario"}
              sx={{ width: "30vw" }}
              onChange={(v) => setComment(v.target.value)}
            ></TextField>
          </Box>
        
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
              justifyContent: "space-between",
              width: "20vw",
              mt: "4vh",
            }}
          >
            <Button
              className="cancelar"
              
              onClick={() => handleClose()}
            >
              <Typography sx={{ fontFamily: "MontserratRegular" }}>
                Cancelar
              </Typography>
            </Button>

            {/* <Button
              sx={{ display: "flex", width: "11vw" }}
              variant="contained"
              color="info"
              onClick={() => {
                newComent ? setComment("") : setNewComent(!newComent);
                newComent ? setNewComent(!newComent) : setNewComent(!newComent);
              }}
            >
              {newComent ? "Cancelar comentario" : "Nuevo comentario"}
            </Button> */}

            <Button
               className="aceptar"
              
              onClick={() => {
                checkMA(
                  localStorage.getItem("Rol") === "Capturador"
                    ? "En Revisión"
                    : localStorage.getItem("Rol") === "Verificador"
                    ? "En Autorización"
                    : "Autorizada"
                );
                handleClose();
                setNewComent(false);
              }}
            >
              <Typography sx={{ fontFamily: "MontserratRegular" }}>
                Confirmar
              </Typography>
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export interface IIUserXInst {
  IdUsuario: string;
  IdUsuarioTiCentral: string;
  Rol: string;
  NombrelineaBase: string;
  Nombre: string;
  ApellidoPaterno: string;
  CorreoElectronico: string;
}
