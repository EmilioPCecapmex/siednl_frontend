import CheckIcon from "@mui/icons-material/Check";
import NotificationsIcon from "@mui/icons-material/NotificationsNone";
import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Badge,
  Button,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ToggleButton,
  Tooltip,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import {
  obtenerNotificaciones,
  verNotificacion,
} from "../genericComponents/axiosGenericos";
import { INotificacion } from "./NotificacionesInterfaz";
import DeleteIcon from "@mui/icons-material/Delete";
import MessageIcon from "@mui/icons-material/Message";
import ComentDialog from "../genericComponents/genericModals/ModalComentarios";

export default function NotificationsPanel({
  fnc = () => {},
}: {
  fnc: Function;
}) {
  const navigate = useNavigate();

  const [notificaciones, setNotificaciones] = useState<Array<INotificacion>>();
  const [sinNotificaciones, setSinNotificaciones] = useState(true);

  const [openNotifPanel, setOpenNotifPanel] = useState(false);

  useEffect(() => {
    obtenerNotificaciones(setNotificaciones, setSinNotificaciones);
  }, []);

  const handleOpenNotifPanel = () => {
    obtenerNotificaciones(setNotificaciones, setSinNotificaciones);
    setOpenNotifPanel(true);
  };

  const handleCloseNotifPanel = () => {
    setOpenNotifPanel(false);
  };

  const [actualizacion, setActualizacion] = useState(0);
  
  const actualizaContador = () => {
    setActualizacion(actualizacion + 1);
  };

  const notificacionesOpcion = (titulo: string, CreadoPor: string, IdDocumento: string) => {
    const mapeoTitulo: { [key in string]: string } = {
      MIR: "mir1",
      MA: "MetaAnual",
      FT: "FichaTecnica",
      RF: "Raffi"
    };
  
    const dialogTitulo = mapeoTitulo[titulo];
   
    
    if (dialogTitulo) {
      return (
        <ComentDialog
          estado={CreadoPor}
          id={IdDocumento}
          MIR={""}
          actualizado={actualizaContador}
          IdEntidad={localStorage.getItem("IdEntidad") || ""}
          titulo={titulo}
          titulo2={dialogTitulo}
        />
      );
    }
  
    return null; // Si `titulo` no coincide con ninguna clave del mapeo, no se renderiza nada
  };

  const formatFecha = (fechaISO: any) => {
    const date = new Date(fechaISO);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <React.Fragment key={"right"}>
      <IconButton color="inherit" onClick={() => handleOpenNotifPanel()}>
        <Badge badgeContent={sinNotificaciones ? notificaciones?.length : 0}>
        <Tooltip title="NOTIFICACIONES">
          <NotificationsIcon
            sx={{
              fontSize: "24px", // Tamaño predeterminado del icono

              "@media (max-width: 600px)": {
                fontSize: 20, // Pantalla extra pequeña (xs y sm)
              },

              "@media (min-width: 601px) and (max-width: 960px)": {
                fontSize: 20, // Pantalla pequeña (md)
              },

              "@media (min-width: 961px) and (max-width: 1280px)": {
                fontSize: 20, // Pantalla mediana (lg)
              },

              "@media (min-width: 1281px)": {
                fontSize: 30, // Pantalla grande (xl)
              },

              "@media (min-width: 2200px)": {
                ffontSize: 30, // Pantalla grande (xl)
              },
            }}
          />
          </Tooltip>
        </Badge>
      </IconButton>

      <Drawer
        anchor={"right"}
        open={openNotifPanel}
        onClose={() => handleCloseNotifPanel()}
        sx={{
          // display: "flex",
          display: "flex",
          maxHeight: "90vh",
          //   overflow: "auto",
          alignItems: "flex-end",
        }}
      >
        <Grid
          item
          display={"flex"}
          justifyContent={"space-evenly"}
          sx={{
            display: "flex",
            //  flexDirection: "column",
            justifyContent: "center",
            borderBottom: 1,
            // borderColor: "#ggg",
          }}
        >
          <Typography>NOTIFICACIONES</Typography>
        </Grid>

        <Grid
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          container
          item
          sx={{
            display: "flex",
            justifyContent: "center",
            overflow: "auto",
          }}
        >
          {sinNotificaciones ? (
            <List
              sx={{
                width: {
                  xs: "100vw",
                  sm: "30vw",
                  md: "20vw",
                  lg: "20vw",
                  xl: "20vw",
                },
              }}
            >
              {notificaciones?.map((index) => (
                <ListItem key={index.Id || Math.random()} disablePadding>
                  <Grid
                    item
                    container
                    xl={12}
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    sx={{ borderBottom: 1 }}
                  >
                    <Grid
                      item
                      xl={9}
                      lg={9}
                      md={9}
                      sm={9}
                      xs={9}
                      //sx={{ backgroundColor: "blue" }}
                    >
                      <Grid
                        item
                        container
                        xl={8}
                        lg={8}
                        md={8}
                        sm={8}
                        xs={8}
                        //sx={{ backgroundColor: "blue" }}
                      >
                        <Grid>
                          <Typography
                            sx={{
                              fontFamily: "MontserratSemiBold",

                              color: "#af8c55",
                            }}
                          >
                            {"DOCUMENTO: " + index.Titulo}
                          </Typography>
                        </Grid>

                        <Grid>
                          <Typography
                            sx={{
                              fontFamily: "MontserratLight",

                              //ml: "1vw",
                              mt: "1vh",
                            }}
                          >
                            {"MENSAJE: " + index.Mensaje}
                          </Typography>
                        </Grid>

                        <Grid>
                          <Typography
                            sx={{
                              fontFamily: "MontserratLight",

                              //ml: "1vw",
                              mt: "1vh",
                            }}
                          >
                            {"FECHA: " + formatFecha(index.FechaCreacion)}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid
                      item
                      container
                      direction={"column"} // Cambiado a "column" para apilar los íconos verticalmente
                      xl={2}
                      lg={2}
                      md={2}
                      sm={2}
                      xs={2}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center", // Para centrar horizontalmente
                      }}
                    >
                      <IconButton
                        onClick={() => {
                          if (index.Titulo === "MIR") {
                            navigate("../mir" + "?Id=" + index.IdDocumento);
                            localStorage.setItem(
                              "IdNotificacion",
                              index.IdDocumento
                            );
                          } else if (index.Titulo === "MA") {
                            localStorage.setItem(
                              "IdNotificacion",
                              index.IdDocumento
                            );
                            navigate(
                              "../metaAnual" + "?Id=" + index.IdDocumento
                            );
                          } else if (index.Titulo === "FT") {
                            localStorage.setItem(
                              "IdNotificacion",
                              index.IdDocumento
                            );
                            navigate(
                              "../fichaTecnica" + "?Id=" + index.IdDocumento
                            );
                          } else if (index.Titulo === "RF") {
                            localStorage.setItem(
                              "IdNotificacion",
                              index.IdDocumento
                            );
                            navigate("../Raffi" + "?Id=" + index.IdDocumento);
                          }
                          fnc();
                        }}
                      >
                        
                        <VisibilityIcon />
                      </IconButton>

                      <ToggleButton
                        sx={{
                          width: "1vw",
                          height: "1vh",
                        }}
                        value="check"
                        onClick={() =>
                          verNotificacion(
                            index.Id,
                            setNotificaciones,
                            setSinNotificaciones
                          )
                        }
                      >
                        <DeleteIcon />
                      </ToggleButton>

                      {notificacionesOpcion(
                        index.Titulo,
                        index.CreadoPor,
                        index.IdDocumento
                      )}
                    </Grid>
                  </Grid>
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
        </Grid>

        <Grid
          sx={{
            justifyContent: "center",
            alignItems: "flex-end",
            display: "flex",
            //height: "10%",
          }}
        >
          <Button
            className="cancelar"
            sx={{ width: "90%" }}
            onClick={() => handleCloseNotifPanel()}
            color="error"
          >
            CERRAR
          </Button>
        </Grid>
      </Drawer>
    </React.Fragment>
  );
}
