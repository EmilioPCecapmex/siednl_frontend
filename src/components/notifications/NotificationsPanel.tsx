import React, { useEffect, useState } from "react";
import NotificationsIcon from "@mui/icons-material/NotificationsNone";
import CheckIcon from "@mui/icons-material/Check";

import {
  Button,
  Drawer,
  List,
  Divider,
  ListItem,
  Badge,
  Typography,
  IconButton,
  ToggleButton,
} from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import { INotificacion } from "./NotificacionesInterfaz";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { queries } from "../../queries";

export default function NotificationsPanel() {
  const navigate = useNavigate();

  const [notificaciones, setNotificaciones] = useState<Array<INotificacion>>();
  const [sinNotificaciones, setSinNotificaciones] = useState(true);

  const obtenerNotificaciones = () => {
    axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/obtener-notif",
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
          if (r.data.data.length >= 1) {
            console.log("notificacion, r.data: ",r.data);
            
            setNotificaciones(r.data.data);
          } else {
            setSinNotificaciones(false);
          }
        }
      })
      .catch((e) => {
        return null;
      });
  };

  const eliminaNotificacion = (v: string) => {
    axios
      .delete(process.env.REACT_APP_APPLICATION_BACK + "/api/borra-notif", {
        data: {
          IdNotificacion: v,
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          obtenerNotificaciones();
          setNotificaciones([]);
        }
      })
      .catch((err) => {
        if (err.response.status === 409) {
          setSinNotificaciones(true);
          setNotificaciones([]);
        }
      });
  };

  const [openNotifPanel, setOpenNotifPanel] = useState(false);

  useEffect(() => {
    obtenerNotificaciones();
  }, []);

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
          borderColor: "#fff",
        }}
      >
        <Typography sx={{ fontFamily: "MontserratMedium" }}>
          Tus Notificaciones
        </Typography>
      </Box>

      {sinNotificaciones ? (
        <List sx={{ width: "15vw", height: "auto" }}>
          {notificaciones?.map((index) => (
            <ListItem key={index.Id || Math.random()} disablePadding>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                  width: "100%",
                  mt: "1vh",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "MontserratSemiBold",
                      fontSize: ".7vw",
                      color: "#af8c55",
                    }}
                  >
                    {index.Titulo}
                  </Typography>
                  
                  <Button
                    variant="text"
                    onClick={() => {
                      console.log("index.IdDocumento: ",index.IdDocumento);
                      console.log("index: ",index);
                      eliminaNotificacion(index.Id);
                      if(index.Titulo==="MIR"){
                        console.log("index.IdDocumento: ",index.IdDocumento);
                        navigate("../MIR"+"?Id="+index.IdDocumento);
                      }
                      if(index.Titulo==="MA"){
                        console.log("index.IdDocumento: ",index.IdDocumento);
                        navigate("../metaAnual"+"?Id="+index.IdDocumento);
                      }
                      if(index.Titulo==="FT"){
                        console.log("index.IdDocumento: ",index.IdDocumento);
                        navigate("../fichaTecnica"+"?Id="+index.IdDocumento);
                      }
                      
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "MontserratSemiBold",
                        fontSize: ".5vw",
                        color: "blue",
                      }}
                    >
                      {" "}
                      {index.Titulo.includes("MIR") ? "Ver" : ""}
                    </Typography>
                  </Button>

                  <Typography
                    sx={{
                      fontFamily: "MontserratSemiBold",
                      fontSize: ".5vw",
                      color: "#909090",
                    }}
                  >
                    {moment(index?.FechaCreacion, moment.ISO_8601)
                      .format("DD/MM/YYYY HH:mm:SS")
                      .toString()}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
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
      ) : (
        <Typography
          sx={{
            fontFamily: "MontserratLight",
            fontSize: ".9vw",
            ml: "1vw",
            mt: "1vh",
          }}
        >
          Sin Notificaciones
        </Typography>
      )}

      <Divider />

      <Button
        sx={{
          ...queries.buttonCancelarSolicitudInscripcion,
        
      
        }}
        onClick={() => handleCloseNotifPanel()}
        color="error"
      >
        Cerrar
      </Button>
    </Box>
  );

  return (
    <React.Fragment key={"right"}>
      <IconButton  color="inherit" onClick={() => handleOpenNotifPanel()}>
        <Badge
          badgeContent={sinNotificaciones ? notificaciones?.length : 0}
       
          
        >
          <NotificationsIcon />
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
