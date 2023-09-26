import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { LateralMenu } from "../../components/lateralMenu/LateralMenu";
import { Button, Typography, Input } from "@mui/material";
import { Header } from "../../components/header/Header";
import SearchIcon from "@mui/icons-material/Search";
import DataTable from "../../components/datatable/DataTable";
import ModalCrearUsuario from "../../components/modalUsuarios/ModalCrearUsuario";
import AddLinkIcon from "@mui/icons-material/AddLink";
import ModalVincularUsuario from "../../components/modalUsuarios/ModalVincularUsuario";
import { Route, Routes, useNavigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import DialogSolicitudes from "../../components/solicitudes/DialogSolicitudes";
import IFrame from "./AgregarUsuarios";

export const getToken = () => {
  let token = localStorage.getItem("jwtToken");
  return token;
};

export const Usuarios = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("Rol") === "Capturador") {
      navigate("../home");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [openModalUsuarios, setOpenModalUsuarios] = useState(false);
  const [openModalVincularUsuario, setOpenModalVincularUsuario] =
    useState(false);

  const [actualizarDatos, setActualizarDatos] = useState(0);
  const [banderaNuevo, setBandera] = useState(0);

  const handleCloseModalUsuarios = () => {
    setOpenModalUsuarios(false);
    setActualizarDatos(actualizarDatos + 1);
  };

  const handleCloseModalVincularUsuario = () => {
    setOpenModalVincularUsuario(false);
  };

  const [usersFiltered, setUsersFiltered] = useState("");

  const dataFilter = (text: string) => {
    setUsersFiltered(text);
  };

  //variables y funciones Solicitudes Pendeintes
  const [openDialogSolicitudesP, setOpenDialogSolicitudesP] = useState(false);
  const handleClickOpenDialogSolicitudesP = () => {
    setOpenDialogSolicitudesP(true);
  };

  const handleCloseSolicitudesP = () => {
    setOpenDialogSolicitudesP(false);
  };

  return (
    // <Grid
    //   sx={{
    //   width: "100vw",
    //   height: "100vh",
    //   display: "grid",
    //   backgroundColor: "#F2F2F2",
    //   gridTemplateAreas: `
    //                     'aside header'
    //                     'aside main'
    //                    `,
    //   alignItems: "start",
    // }}
    // >
    //   <Grid gridArea={'aside'} >
    //     <LateralMenu selection={"Usuarios"} actionNumber={0} />
    //   </Grid>
    <Grid container>
      <Grid
        item
        xl={12}
        height={"7vh"}
        // sx={{ mr: showResume ? 8 : 0 }}
      >
        <LateralMenu selection={"Usuarios"} actionNumber={0} />
      </Grid>
      {/* //GridShadow: 10, */}

      {/* <Grid
        justifyContent={"center"}
        display={"flex"}
        container
        height={"93vh"}
        alignItems={"center"}
        item
        xl={12}
        lg={12}
        md={12}
        sm={7.5}
        xs={6}
        sx={{ backgroundColor: "white" }}
      ></Grid> */}
      
      <Grid gridArea={'header'} >
        <Header
        details={{
          name1: "Inicio",
          path1: "../home",
          name2: "Configuración",
          path2: "../settings",
          name3: "Usuarios",
        }}
      />
      </Grid>
      
      {/* <Grid
        sx={{
          display: "flex",
          flexDirection:'column',
          justifyContent: "space-evenly",
          width: "77vw",
          height: "92vh",
          alignItems:'center'
        }}
        gridArea={'main'}
      > */}
      {/* <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "center",
              height: "92vh",
            }}
            gridArea={"main"}
          >
        <ModalCrearUsuario
          title="Crear Solicitud Nuevo Usuario"
          open={openModalUsuarios}
          handleClose={handleCloseModalUsuarios}
        />

        <ModalVincularUsuario
          title="Vincular Usuario"
          open={openModalVincularUsuario}
          handleClose={handleCloseModalVincularUsuario}
        />
        <DialogSolicitudes
          open={openDialogSolicitudesP}
          handleClose={handleCloseSolicitudesP}
        />

        <Grid
          sx={{
            width: "70vw",
            height: "10vh",
            backgroundColor: "#fff",
            borderRadius: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Grid
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: 1,
              borderRadius: 2,
              ml: "1vw",
              color: "#ccc",
            }}
          >
            <Input
              sx={{ pl: 1 }}
              disableUnderline
              onChange={(v) => dataFilter(v.target.value)}
            />
            <SearchIcon sx={{ color: "action.active", mr: 1 }} />
          </Grid>

          <Grid>
            <Button
              variant="contained"
              disabled={
                localStorage.getItem("Rol") !== "Administrador" ? true : false
              }
              sx={{
                mr: 3,
                backgroundColor: "#15212F",
                ":hover": {
                  backgroundColor: "#ccc",
                },
              }}
              onClick={() => handleClickOpenDialogSolicitudesP()}
            >
              <ScheduleSendIcon sx={{ mr: 1 }} />
              <Typography
                sx={{ fontFamily: "MontserratMedium", fontSize: ".8vw" }}
              >
                HISTORIAL DE SOLICITUDES
              </Typography>
            </Button>

            <Button
              variant="contained"
              disabled={
                localStorage.getItem("Rol") !== "Administrador" ? true : false
              }
              sx={{
                mr: 3,
                backgroundColor: "#15212F",
                ":hover": {
                  backgroundColor: "#ccc",
                },
              }}
              onClick={() => setOpenModalVincularUsuario(true)}
            >usuario
              <AddLinkIcon sx={{ mr: 1 }} />
              <Typography
                sx={{ fontFamily: "MontserratMedium", fontSize: ".8vw" }}
              >
                VINCULAR USUARIO
              </Typography>
            </Button>
            <Button
              variant="contained"
              disabled={
                localStorage.getItem("Rol") === "Capturador" ? true : false
              }
              sx={{
                mr: 3,
                backgroundColor: "#c4a55a",
                ":hover": {
                  backgroundColor: "#ccc",
                },
              }}
              onClick={() => setOpenModalUsuarios(true)}
            >
              <SendIcon sx={{ mr: 1 }} />
              <Typography
                sx={{ fontFamily: "MontserratMedium", fontSize: ".8vw" }}
              >
                CREAR SOLICITUD DE ALTA
              </Typography>
            </Button>
          </Grid>
        </Grid> */}

        {/* ----- */}
        <Grid container rowSpacing={3}>
        <Grid item width={"100%"} display={"flex"}>
        <Grid width={"43%"} ml={2}>
            <Button
              sx={{
                backgroundColor: "#15212f",
                color: "white",
                "&&:hover": {
                  backgroundColor: "rgba(47, 47, 47, 0.4)",
                  color: "#000",
                },
                //fontSize: "90%",
                borderRadius: "0.8vh",
                textTransform: "capitalize",
                fontSize: "50%",
                "@media (min-width: 480px)": {
                  fontSize: "70%",
                },

                "@media (min-width: 768px)": {
                  fontSize: "80%",
                },
              }}
              onClick={() => navigate("../settings")}
            >
              Volver
            </Button>
          </Grid>
<Grid>
  <Button onClick={() => setBandera(banderaNuevo==0?1:0)}>
        <Typography
            sx={{
              fontSize: "2.3ch",
              fontFamily: "MontserratBold",
              color: "#AF8C55",
              "@media (max-width: 600px)": {
                // XS (extra small) screen
                fontSize: "1rem",
              },
              "@media (min-width: 601px) and (max-width: 900px)": {
                // SM (small) screen
                fontSize: "1.5ch",
              },
            }}
          >
            {banderaNuevo==0?
            "Agregar Usuario"
            :"Modificar Usuario"
          }
          </Typography>
          </Button>
</Grid>
</Grid>
        <Grid item
          sx={{
            width: "100vw",
            height: "82vh",
            backgroundColor: "#fff",
            borderRadius: 50,
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* <DataTable
            textFind={usersFiltered}
            actualizar={actualizarDatos}
          ></DataTable> */}
          {/* <Routes>
          <Route
            path="IFrame"
            element={ */}
            {banderaNuevo==0?
              <IFrame
                source={
                  "?jwt=" +
                  getToken() +
                  "&IdApp=" +
                  localStorage.getItem("IdApp") +
                  "&idUsuarioModificado=" +
                  localStorage.getItem("IdUsuario") //Usar variable que le mande 
                }
                baseURL={String(process.env.REACT_APP_APPLICATION_FRONT_LOGIN)}
              />
              :
              <IFrame
                source={
                  "?jwt=" +
                  getToken() +
                  "&IdApp=" +
                  localStorage.getItem("IdApp")
                }
                baseURL={String(process.env.REACT_APP_APPLICATION_FRONT_LOGIN)}
              />
            }
            {/* }
          >
          </Route>
          </Routes> */}
        </Grid>
      </Grid>
    // </Grid>
  );
};
