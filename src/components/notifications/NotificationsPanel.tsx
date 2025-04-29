import DeleteIcon from "@mui/icons-material/Delete";
import NotificationsIcon from "@mui/icons-material/NotificationsNone";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Badge,
  Button,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ToggleButton,
  Tooltip,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  obtenerNotificaciones,
  verNotificacion,
} from "../genericComponents/axiosGenericos";
import ComentDialog from "../genericComponents/genericModals/ModalComentarios";
import { INotificacion } from "./NotificacionesInterfaz";

export default function NotificationsPanel({
  fnc = () => { },
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
                fontSize: [20,20,20,30,30]
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
          display: "flex",
          maxHeight: "90vh",
          alignItems: "flex-end",
        }}
      >
        <Grid
          item
          display={"flex"}
          justifyContent={"space-evenly"}
          sx={{
            display: "flex",
            justifyContent: "center",
            borderBottom: 1,
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
                    sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <Grid
                      item
                      xl={11}
                      lg={11}
                      md={11}
                      sm={11}
                      xs={11}
                    >
                      <Grid item
                        xl={12}
                        lg={12}
                        md={12}
                        sm={12}
                        xs={12} sx={{ display: "flex", justifyContent: "space-between", mt: "1vh",flexWrap: "wrap" }}>
                        <Typography
                          sx={{
                            fontFamily: "MontserratSemiBold",
                            color: "#af8c55", fontSize: ['15px', '12px', '12px', '12px', '15px'],
                          }}
                        >
                          {"DOCUMENTO: " + index.Titulo}
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: "MontserratLight",
                            fontSize: ['12px', '12px', '12px', '10px', '13px'],
                          }}
                        >
                          {"FECHA: " + formatFecha(index.FechaCreacion)}
                        </Typography>
                      </Grid>

                      <Grid>
                        <Typography
                          sx={{
                            fontFamily: "MontserratLight",
                            fontSize: ['14px', '12px', '12px', '12px', '14px'],
                            //ml: "1vw",
                          }}
                        >
                          {"MENSAJE: " + index.Mensaje}
                        </Typography>
                      </Grid>

                      {/* <Grid>
                          
                        </Grid> */}

                    </Grid>

                    <Grid
                      item
                      container

                      xl={11}
                      lg={11}
                      md={11}
                      sm={11}
                      xs={11}
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end", // Para centrar verticalmente
                        alignItems: "center", // Para centrar horizontalmente,
                        borderBottom: 1,
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
                          height: "1vh", display: "flex", justifyContent: "center", alignItems: "center"
                        }}
                        value="check"
                        onClick={() =>
                          verNotificacion(index.Id, setNotificaciones,  setSinNotificaciones)
                        }
                      >
                        <DeleteIcon />
                      </ToggleButton>

                      {notificacionesOpcion(index.Titulo, index.CreadoPor,  index.IdDocumento)}
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
