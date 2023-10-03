import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import axios from "axios";
import { Typography } from "@mui/material";
import Swal from "sweetalert2";
import {
  TextField,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  IconButton,
  Button,
} from "@mui/material";

import MessageIcon from "@mui/icons-material/Message";
import moment from "moment";
import { IIUserXInst } from "../modalsMIR/ModalEnviarMIR";
import { queries } from "../../queries";
import { InsertarComponentePDF } from "../tabsPAE/InsertarPDF";
import CloseIcon from '@mui/icons-material/Close';

export const VisualizarPAE = ({
  estado,
  id,
  
}: {
  estado: string;
  id: string;
  
}) => {
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

  const [coments, setComents] = React.useState([
    {
      Comentario: "",
      NombreUsuario: "",
      FechaCreacion: "DD/MM/YYYY HH:mm:SS",
      Deleted: 0,
      error: "",
      MIR_MA: "",
    },
  ]);

  const [open, setOpen] = React.useState(false);
  const [newComent, setNewComent] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewComent(false);
    setComent("");
  };

  const [userXInst, setUserXInst] = React.useState<Array<IIUserXInst>>([]);

  const getUsuariosXInstitucion = () => {
    axios
      .post(process.env.REACT_APP_APPLICATION_BACK + "/api/tipo-usuario", 
        {
          TipoUsuario: localStorage.getItem("Rol"),
          IdEntidad: localStorage.getItem("IdEntidad"),
          IdApp: localStorage.getItem("dApp"),
       },
       {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },

      })
      .then((r) => {
        if (r.status === 200) {
          setUserXInst(r.data.data);
        }
      });
  };

  React.useEffect(() => {
    if (open) {
      getUsuariosXInstitucion();
    }
  }, [open]);

  const [coment, setComent] = React.useState("");

  const enviarNotificacion = (v: string) => {
    axios.post(
      process.env.REACT_APP_APPLICATION_BACK + "/api/create-notif",
      {
        IdUsuarioDestino: v,
        Titulo: "Nuevo comentario MIR",
        Mensaje: coment,
        // Se va a modificar
        CreadoPor: localStorage.getItem("IdUsuario"),
      },
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      }
    );
  };

  const comentMir = () => {
    axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/coment-mir",
        {
          IdMir: id,
          Coment: coment,
          // se va a modificar
          CreadoPor: localStorage.getItem("IdUsuario"),
          MIR_MA: "MIR",
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        if (estado !== "En Captura") {
          // eslint-disable-next-line array-callback-return
          userXInst.map((user) => {
            enviarNotificacion(user.IdUsuario);
          });
        }
        //AlertBox need return a variable equal to 1 here.
        setNewComent(false);
        setComent("");
        handleClose();
        
        Toast.fire({
          icon: "success",
          title: "Comentario añadidoa",
        });
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: "Se produjo un error",
        });
      });
  };

  React.useEffect(() => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/coment-mir", {
        params: {
          IdMir: id,
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setComents(r.data.data);
      });
  }, [id]);

  const isComentEmpty = () => {
    return !/^\s*$/.test(coment);
  };

  return (
    <Box>
      <Tooltip title="COMENTARIOS">
        <span>
          <IconButton onClick={handleClickOpen}>
            <MessageIcon
              sx={[
                {
                  "&:hover": {
                    color: "indigo",
                  },
                  fontSize: "24px", // Tamaño predeterminado del icono
                  "@media (max-width: 600px)": {
                    fontSize: 25, // Pantalla extra pequeña (xs y sm)
                  },
                  "@media (min-width: 601px) and (max-width: 960px)": {
                    fontSize: 25, // Pantalla pequeña (md)
                  },
                  "@media (min-width: 961px) and (max-width: 1280px)": {
                    fontSize: 30, // Pantalla mediana (lg)
                  },
                  "@media (min-width: 1281px)": {
                    fontSize: 30, // Pantalla grande (xl)
                  },
                  "@media (min-width: 2200px)": {
                    fontSize: 30, // Pantalla grande (xl)
                  }
                },
               
                  
              
              ]}
            />
          </IconButton>
        </span>
      </Tooltip>

      <Dialog fullScreen open={open} onClose={handleClose}>
      <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
<InsertarComponentePDF Nombre={"C1A1"} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default VisualizarPAE;
