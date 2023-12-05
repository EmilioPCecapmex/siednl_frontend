import {
  Box,
  IconButton,
  Tooltip
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import * as React from "react";

import CloseIcon from '@mui/icons-material/Close';
import LaunchIcon from '@mui/icons-material/Launch';
import { InsertarComponentePDF } from "../tabsPAE/InsertarPDF";

export const VisualizarPAE = ({
  ruta,
  nombre,
  tipo,
  anio,
  perteneceA
}: {
  ruta: string;
  nombre: string;
  tipo: string;
  anio: string;
  perteneceA: string;
}) => {
 

  // const [coments, setComents] = React.useState([
  //   {
  //     Comentario: "",
  //     NombreUsuario: "",
  //     FechaCreacion: "DD/MM/YYYY HH:mm:SS",
  //     Deleted: 0,
  //     error: "",
  //     MIR_MA: "",
  //   },
  // ]);

  const [open, setOpen] = React.useState(false);
  const [newComent, setNewComent] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewComent(false);
    // setComent("");
  };

  // const [userXInst, setUserXInst] = React.useState<Array<IIUserXInst>>([]);

  // const getUsuariosXInstitucion = () => {
  //   axios
  //     .post(process.env.REACT_APP_APPLICATION_BACK + "/api/tipo-usuario", 
  //       {
  //         TipoUsuario: localStorage.getItem("Rol"),
  //         IdEntidad: localStorage.getItem("IdEntidad"),
  //         IdApp: localStorage.getItem("dApp"),
  //      },
  //      {
  //       headers: {
  //         Authorization: localStorage.getItem("jwtToken") || "",
  //       },

  //     })
  //     .then((r) => {
  //       if (r.status === 200) {
  //         // setUserXInst(r.data.data);
  //       }
  //     });
  // };

  // React.useEffect(() => {
  //   if (open) {
  //     getUsuariosXInstitucion();
  //   }
  // }, [open]);

  // const [coment, setComent] = React.useState("");

  // const enviarNotificacion = (v: string) => {
  //   axios.post(
  //     process.env.REACT_APP_APPLICATION_BACK + "/api/create-notif",
  //     {
  //       IdUsuarioDestino: v,
  //       Titulo: "Nuevo comentario MIR",
  //       Mensaje: coment,
  //       // Se va a modificar
  //       CreadoPor: localStorage.getItem("IdUsuario"),
  //     },
  //     {
  //       headers: {
  //         Authorization: localStorage.getItem("jwtToken") || "",
  //       },
  //     }
  //   );
  // };

  return (
    <Box>
      <Tooltip title="VISUALIZAR">
        <span>
          <IconButton onClick={handleClickOpen}>
            <LaunchIcon
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
<InsertarComponentePDF ruta={ruta} nombre={nombre} tipo={tipo} anio={anio} perteneceA={perteneceA} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default VisualizarPAE;
