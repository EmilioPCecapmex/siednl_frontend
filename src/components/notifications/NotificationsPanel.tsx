import CheckIcon from "@mui/icons-material/Check";
import NotificationsIcon from "@mui/icons-material/NotificationsNone";
import React, { useEffect, useState } from "react";

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
import ComentDialogMir from "../modalsMIR/ModalComentariosMir";
import ComentDialogMA from "../modalsMA/ModalComentariosMA";
import ComentDialogFT from "../modalsFT/ModalComentariosFT";
import ComentDialogRF from "../modalsRF/ModalComentariosRF";

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

  const notificacionesOpcion = (
    titulo: string,
    CreadoPor: string,
    IdDocumento: string
  ) => {
    console.log("Titulo: ", titulo);
    
    if (titulo === "MIR") {
      return (
        <ComentDialogMir
          estado={CreadoPor}
          id={IdDocumento}
          actualizado={() => {}}
          MIR={""}
          IdEntidad={localStorage.getItem("IdEntidad") || ""}
        />
      );
    }

    if (titulo === "MA") {
      console.log("Entre aqui MA");
      
      return (
        <ComentDialogMA
          estado={CreadoPor}
          id={IdDocumento}
          actualizado={() => {}}
          MIR={""}
          IdEntidad={localStorage.getItem("IdEntidad") || ""}
        />
      );
    }

    if (titulo === "FT") {
      return (
        <ComentDialogFT
          estado={CreadoPor}
          id={IdDocumento}
          actualizado={() => {}}
          MIR={""}
          IdEntidad={localStorage.getItem("IdEntidad") || ""}
        />
      );
    }

    if (titulo === "RF") {
      return (
        <ComentDialogRF
          estado={CreadoPor}
          id={IdDocumento}
          MIR={""}
          IdEntidad={localStorage.getItem("IdEntidad") || ""}
        />
      );
    }
  };

  const list = () => (
    <Box
      sx={{
        width: { xs: "100vw", sm: "30vw", md: "20vw", lg: "20vw", xl: "20vw" },
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
            height: "auto",
          }}
        >
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

                      color: "#af8c55",
                    }}
                  >
                    {index.Titulo}
                  </Typography>

                  <Button
                    variant="text"
                    onClick={() => {
                      // verNotificacion(index.Id, setNotificaciones, setSinNotificaciones );

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
                        navigate("../metaAnual" + "?Id=" + index.IdDocumento);
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
                        navigate("../Raffi" + "?Id=" + index.IdDocumento);
                      }
                      fnc();
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "MontserratSemiBold",

                        color: "blue",
                      }}
                    >
                      {" "}
                      {"Ver"}
                    </Typography>
                  </Button>

                  {/* <Typography
                    sx={{
                      fontFamily: "MontserratSemiBold",
                      fontSize: ".5vw",
                      color: "#909090",
                    }}
                  >
                    {moment(index?.FechaCreacion, moment.ISO_8601)
                      .format("DD/MM/YYYY HH:mm:SS")
                      .toString()}
                  </Typography> */}
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
                    onClick={() =>
                      verNotificacion(
                        index.Id,
                        setNotificaciones,
                        setSinNotificaciones
                      )
                    }
                  >
                    <CheckIcon />
                  </ToggleButton>
                </Box>

                <Box
                  sx={{
                    width: "100vw",
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
    </Box>
  );

  return (
    <React.Fragment key={"right"}>
      <IconButton color="inherit" onClick={() => handleOpenNotifPanel()}>
        <Badge badgeContent={sinNotificaciones ? notificaciones?.length : 0}>
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
        </Badge>
      </IconButton>

      <Drawer
        anchor={"right"}
        open={openNotifPanel}
        onClose={() => handleCloseNotifPanel()}
        sx={{
          // display: "flex",
          maxHeight: "90vh",

          //   overflow: "auto",
          //alignItems: "flex-end",

          // ...(isXsScreen
          //   ? {
          //       "& .MuiDrawer-paper": {
          //         width: "100vw",
          //         height: "100vh",
          //       },
          //     }
          //   : {}),
        }}
      >
        <Grid container sx={{ width: "40vh", alignItems: "center" }}>
          <Grid
            item
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
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

          <Divider />

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
                height: "auto",
                overflow: "auto",
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
                      container
                      xl={6}
                      lg={6}
                      md={6}
                      sm={6}
                      xs={6}
                      //sx={{ backgroundColor: "blue" }}
                    >
                      <Grid
                        item
                        container
                        direction={"row"}
                        xl={3}
                        lg={3}
                        md={3}
                        sm={3}
                        xs={3}
                        //sx={{ backgroundColor: "blue" }}
                      >
                        <Grid>
                          <Typography
                            sx={{
                              fontFamily: "MontserratSemiBold",

                              color: "#af8c55",
                            }}
                          >
                            {index.Titulo}
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
                            {index.Mensaje}
                          </Typography>
                        </Grid>
                      </Grid>

                      <Grid
                        item
                        xl={9}
                        lg={9}
                        md={9}
                        sm={9}
                        xs={9}
                        //sx={{ backgroundColor: "blue" }}
                      ></Grid>
                    </Grid>

                    <Grid
                      item
                      container
                      xl={6}
                      lg={6}
                      md={6}
                      sm={6}
                      xs={6}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
                        <Button
                          variant="text"
                          onClick={() => {
                            // verNotificacion(index.Id, setNotificaciones, setSinNotificaciones );

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
                          <Typography
                            sx={{
                              fontFamily: "MontserratSemiBold",

                              color: "blue",
                            }}
                          >
                            {" "}
                            {"Ver"}
                          </Typography>
                        </Button>
                      </Grid>

                      <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
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
                      </Grid>

                      <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>

                        {notificacionesOpcion(
                          index.Titulo,
                          index.CreadoPor,
                          index.IdDocumento
                        )}
                      </Grid>
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

          <Grid
            item
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            sx={{
              display: "flex",
              //  flexDirection: "column",
              justifyContent: "center",

              // borderColor: "#ggg",
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
        </Grid>

        {/* <Grid
          item
          display={"flex"}
          justifyContent={"space-evenly"}
          //alignItems={"center"}
          // sx={{
          //   width: "15vw",
          //   display: "flex",
          //   alignItems: "center",
          //   justifyContent: "space-evenly",
          //   mt: "2vh",
          //   borderBottom: 1,
          //   borderColor: "#fff",
          // }}
        >
          <Typography sx={{ fontFamily: "MontserratMedium" }}>
            TUS NOTIFICACIONES
          </Typography>
        </Grid>
        <Divider />
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
            onClick={() => handleCloseNotifPanel()}
            color="error"
          >
            CERRAR
          </Button>
        </Grid> */}
      </Drawer>
    </React.Fragment>
  );
}
