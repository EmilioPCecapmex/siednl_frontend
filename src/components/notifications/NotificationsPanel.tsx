import React, { useEffect, useState } from "react";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import NotificationsIcon from "@mui/icons-material/NotificationsNone";
import CheckIcon from "@mui/icons-material/Check";

import {
  Button,
  Drawer,
  List,
  Divider,
  ListItem,
  Badge,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  ToggleButton,
} from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import { INotificacion } from "./NotificacionesInterfaz";

export default function NotificationsPanel() {
  const [notificaciones, setNotificaciones] = useState<Array<INotificacion>>();

  const obtenerNotificaciones = () => {
    axios
      .post(
        "http://10.200.4.105:8000/api/obtener-notif",
        {
          IdUsuarioDestino: localStorage.getItem("IdUsuario"),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        if (r.status === 200) {
          setNotificaciones(r.data.data);
        }
      });
  };

  const eliminaNotificacion = (v: string) => {
    axios
      .delete(
        "http://10.200.4.105:8000/api/borra-notif",
        { data: {
          IdNotificacion: v,

        },
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        if (r.status === 200) {
         obtenerNotificaciones()
        }
      });
  };

  const [openNotifPanel, setOpenNotifPanel] = useState(false);

  useEffect(() => {
    obtenerNotificaciones();
  }, [] );

  const handleOpenNotifPanel = () => {
    obtenerNotificaciones();
    setOpenNotifPanel(true);
  };

  const handleCloseNotifPanel = () => {
    setOpenNotifPanel(false);
  };

  const list = () => (
    <Box
      sx={{
        width: "15vw",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        overflow: "hidden",
        overflowY: "scroll",
        
        "&::-webkit-scrollbar": {
          width: ".3vw",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0,0,0,.5)",
          outline: "1px solid slategrey",
          borderRadius: 10,
        },
        
      }}
    >
      <Box
        sx={{
          width: "15vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          mt: "2vh",
          borderBottom: 1,
          borderColor: '#616161',
          
        }}
      >
        <Typography sx={{ fontFamily: "MontserratMedium" }}>
          Tus Notificaciones
        </Typography>
      </Box>

     

      <List sx={{ width: "15vw", height: "auto",  }}>
        {notificaciones?.map((index) => (
          <ListItem key={index.Id} disablePadding>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
                width: "100%",
                mt: "1vh",
              }}
            >
              <Box sx={{display: 'flex', justifyContent: 'space-around', width: '100%', alignItems: 'center'}}>
              <Typography
                sx={{
                  fontFamily: "MontserratSemiBold",
                  fontSize: ".5vw",
                  color: "#af8c55",
                }}
              >
                {index.Titulo}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "MontserratSemiBold",
                  fontSize: ".4vw",
                  color: "#909090",
                }}
              >
                {index.FechaCreacion.toString().replace('T',' ').replace('.000Z','')}
              </Typography>
              </Box>
              
              
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: 'center',
                  width: "95%",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "MontserratLight",
                    fontSize: ".7vw",
                    ml: "1vw",
                    mt: "1vh",
                  }}
                >
                  {index.Mensaje}
                </Typography>
                
                <ToggleButton
                  sx={{
                    width: "1vw",
                    height: "1vh",
                  }}
                  value="check"
                  onClick={() => eliminaNotificacion(index.Id)}
                >
                  <CheckIcon />
                </ToggleButton>
              </Box>

          

              <Box
                sx={{
                  width: "15vw",
                  height: ".1vh",
                  backgroundColor: "#ccc",
                  mt: "1vh",
                  boxShadow: 0.1,
                }}
              />
            </Box>
          </ListItem>
        ))}
      </List>
      <Divider />

      <Button onClick={() => handleCloseNotifPanel()} color="error">
        Cerrar
      </Button>
    </Box>
  );

  return (
    <React.Fragment key={"right"}>
      <IconButton onClick={() => handleOpenNotifPanel()}>
        <Badge badgeContent={notificaciones?.length} color="info">
          <NotificationsIcon color="action" />
        </Badge>
      </IconButton>

      <Drawer
        anchor={"right"}
        open={openNotifPanel}
        onClose={() => handleCloseNotifPanel()}
      >
        {list()}
      </Drawer>
    </React.Fragment>
  );
}