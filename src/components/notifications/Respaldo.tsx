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
                      
                       navigate("../mir" + "?Id=" + index.IdDocumento)
                       localStorage.setItem("IdNotificacion", index.IdDocumento)
                      }
                      else if (index.Titulo === "MA") {
                        localStorage.setItem("IdNotificacion", index.IdDocumento)
                        navigate("../metaAnual" + "?Id=" + index.IdDocumento);
                      }
                      else if (index.Titulo === "FT") {
                        localStorage.setItem("IdNotificacion", index.IdDocumento)
                        navigate(
                          "../fichaTecnica" + "?Id=" + index.IdDocumento
                        );
                      }
                      else if (index.Titulo === "RF") {
                        localStorage.setItem("IdNotificacion", index.IdDocumento)
                        navigate(
                          "../Raffi" + "?Id=" + index.IdDocumento
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
          display: "flex",
          maxHeight: "90vh",
          //   overflow: "auto",
          alignItems: "flex-end",

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
        <Grid
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
          <Grid
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            container
            item
            sx={{
              // height: "90%",
              overflow: "auto",
              //justifyContent: "center",
              // display: "flex",
            }}
          >
            {list()}
          </Grid>

          <Divider />
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
