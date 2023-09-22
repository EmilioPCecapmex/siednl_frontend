import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import logo from "../../assets/logos/logo.svg";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Box from "@mui/material/Grid";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import CampaignIcon from "@mui/icons-material/Campaign";
import GroupIcon from "@mui/icons-material/Group";
import { queries } from "../../queries";
import { Header } from "../../components/header/Header";
import NotificationsPanel from "../notifications/NotificationsPanel";
import {
  Dialog,
  TextField,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  useTheme,
  useMediaQuery,
  Divider,
  AppBar,
  Toolbar,
  Grid,
  Tooltip,
  IconButton,
  Drawer,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logout } from "../../funcs/validation";
import LockResetIcon from "@mui/icons-material/LockReset";
import axios from "axios";
import Swal from "sweetalert2";
import { lstLg, lstMd, lstSm, lstXl, lstXs } from "./stylesLateralMenu";
import { setResumeDefaultMIR } from "../../screens/mir/MIR";
import { setResumeDefaultFT } from "../../screens/fichatecnica/FichaTecnica";
import { setResumeDefaultMA } from "../../screens/metaAnual/MetaAnual";
import TaskIcon from "@mui/icons-material/Task";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Radio from "@mui/material/Radio";
// import FormControl from "@mui/material/FormControl/FormControl";
// import FormLabel from "@mui/material/FormLabel";
import MenuIcon from "@mui/icons-material/Menu";
import { TimerCounter } from "../timer/TimerCounter";
//import { getAllusers } from "../../screens/config/GetUsuarios";
export const LateralMenu = ({
  selection,
  actionNumber,
  settingsCard,
}: {
  selection: string;
  actionNumber: number;
  settingsCard?: Function;
}) => {
  const theme = useTheme();
  let st = lstXl;

  const isXl = useMediaQuery(theme.breakpoints.up("xl"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));
  const isXs = useMediaQuery(theme.breakpoints.up("xs"));

  if (isXl) st = lstXl;
  else if (isLg) st = lstLg;
  else if (isMd) st = lstMd;
  else if (isSm) st = lstSm;
  else if (isXs) st = lstXs;

  const navigate = useNavigate();
  const [openProgramas, setOpenProgramas] = useState(true);
  const [openDocs, setOpenDocs] = useState(false);

  const [usuariosTi, setUsuariosTi] = useState("");

  //getAllusers(setUsuariosTi);

  useEffect(() => {
    console.log(usuariosTi);
  }, []);

  const handleClickProgramas = () => {
    setOpenProgramas(!openProgramas);
    setOpenDocs(false);
  };

  const handleClickDocs = () => {
    setOpenDocs(!openDocs);
    setOpenProgramas(false);
  };

  const exitAlert = (urlNavigate: string) => {
    if (selection === "MIR" || selection === "Meta Anual" || selection === "Ficha Técnica" || selection === "Actividades Institucionales" || selection === "Programas Presupuestarios") {
      if (actionNumber === 1) {
        Swal.fire({
          title: "Pregunta",
          text: `¿Estas seguro de que quieres salir perderás tú progreso actual?`,
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#000E4E",
          cancelButtonColor: "#A40000",
          confirmButtonText: "Si",
          cancelButtonText: "No",
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(urlNavigate);
          } else {
          }
        });
      } else {
        navigate(urlNavigate);
      }
    } else {
    navigate(urlNavigate);
     }
  };

  function stringToColor(string: string) {
    let hash = 0;
    let i;
    for (i = 0; i < string?.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 11) - hash);
    }

    let color = "#";
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

  function stringAvatar(name: string) {
    return `${name?.split(" ")[0][0]}${name?.split(" ")[1][0]}`;
  }

  const [institucionSeleccionada, setInstitucionSeleccionada] = useState(
    localStorage.getItem("IdEntidad") as string
  );

  const handleChange = (event: SelectChangeEvent) => {
    setInstitucionSeleccionada(event.target.value as string);
  };

  const goSettings = () => {
    if (settingsCard) {
      settingsCard();
    }
    exitAlert("../settings");
  };

  const [openPasswordChange, setOpenPasswordChange] = useState(false);

  const handleClosePasswordChange = () => {
    setOpenPasswordChange(false);
  };

  const ChangePasswordModal = () => {
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState({ label: "", show: false });

    const cambiarContrasena = () => {
      if (newPassword === "") {
        setError({ label: "Ingresa una contraseña.", show: true });
        return null;
      }
      if (newPassword.length < 8) {
        setError({
          label: "Su contraseña debe contar con al menos 8 caracteres.",
          show: true,
        });
        return null;
      }

      const regex3 = /^[a-zA-Z]+$/;
      const regex5 = /^[a-zA-Z-0-9]+$/;

      if (newPassword.match(regex3)) {
        setError({
          label: "Su contraseña debe contar con al menos un numero",
          show: true,
        });
        return null;
      }

      if (newPassword.match(regex5)) {
        setError({
          label: "Su contraseña debe contar con un caracter especial",
          show: true,
        });
        return null;
      }

      axios
        .put(
          process.env.REACT_APP_APPLICATION_LOGIN + "/api/change-password",
          {
            ContrasenaNueva: newPassword,
            IdUsuario: localStorage.getItem("IdCentral"),
          },
          {
            headers: {
              Authorization: localStorage.getItem("jwtToken") || "",
            },
          }
        )
        .then((r) => {
          if (r.status === 200) {
            handleClosePasswordChange();
            setNewPassword("");
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Contraseña actualizada",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((r) => {
          if (r.response.status === 409) {
            handleClosePasswordChange();

            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Error",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    };

    return (
      <Dialog
        onClose={handleClosePasswordChange}
        open={openPasswordChange}
        maxWidth={"sm"}
      >
        <Grid
          // display= "flex"
          // alignItems= "center"
          // justifyContent= "center"
          // borderBottom= "1"
          // height= "5vh"
          // boxShadow= "1"
          // borderColor= "#ccc"

          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: 1,
            height: "5vh",
            boxShadow: 1,
            borderColor: "#ccc",
          }}
        >
          <Typography sx={{ fontFamily: "MontserratMedium", fontSize: ".8vw" }}>
            MODIFICAR CONTRASEÑA
          </Typography>
        </Grid>
        <Grid
          sx={{
            height: "20vh",
            width: "20vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            flexDirection: "column",
          }}
        >
          <Grid
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <TextField
              label="Contraseña"
              error={error.show}
              helperText={error.label}
              size="small"
              type="password"
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratLight",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratLight",
                },
              }}
              onChange={(v) => setNewPassword(v.target.value)}
            />
          </Grid>

          <Grid
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              width: "100%",
            }}
          >
            <Button
              sx={queries.buttonCancelarSolicitudInscripcion}
              onClick={() => handleClosePasswordChange()}
              variant="outlined"
            >
              <Typography
                sx={{ fontFamily: "MontserratMedium", fontSize: ".7vw" }}
              >
                Cancelar
              </Typography>
            </Button>

            <Button
              sx={queries.buttonContinuarSolicitudInscripcion}
              onClick={() => cambiarContrasena()}
            >
              <Typography
                sx={{ fontFamily: "MontserratMedium", fontSize: ".7vw" }}
              >
                Cambiar
              </Typography>{" "}
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    );
  };

  //const [instituciones, setInstituciones] = useState<Array<IInstituciones>>();
  const [renderInfo, setRenderInfo] = useState(false);

  // const getInstituciones = () => {
  //   axios
  //     .get(process.env.REACT_APP_APPLICATION_BACK + "/api/usuarioInsitucion", {
  //       params: {
  //         IdUsuario: localStorage.getItem("IdUsuario"),
  //         Rol: localStorage.getItem("Rol"),
  //       },
  //       headers: {
  //         Authorization: localStorage.getItem("jwtToken") || "",
  //       },
  //     })
  //     .then((r) => {
  //       if (r.status === 200) {
  //         setInstituciones(r.data.data);
  //         console.log("usuarioInsitucion: ", r.data.data);

  //         setRenderInfo(true);
  //       }
  //     });
  // };

  useEffect(() => {
    //getInstituciones();
  }, []);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <AppBar position="static">
      <Toolbar variant="dense" sx={{ height: "7vh" }}>
        <Grid
          container
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Grid>
            <Tooltip title="Menu Lateral">
              <IconButton
                size="large"
                color="inherit"
                onClick={() => setIsDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid sx={{ height: "8vh", marginLeft: "4vw" }}>
            <Header
              details={{
                name1: "INICIO",
                path1: "../home",
                name2: selection,
                // === "MIR"
                //   ? "MIR"
                //   : selection === "Meta Anual"
                //   ? "Meta Anual"
                //   : selection === "Ficha Técnica"
                //   ? "Ficha Tecnica"
                //   : selection === "Raffi"
                //   ? "Raffi"
                //   : selection === "Actividades Institucionales"
                //   ? "Actividades Institucionales"
                //   : selection === "Programa Anual de Evaluación"
                //   ? "PAE"
                //   : selection === "Notificaciones"
                //   ? "Notificaciones"
                //   : selection === "Configuración"
                //   ? "Configuración"
                //   : "",
                path2: "",
                name3: "",
              }}
            />
          </Grid>
          <Grid
            // mt={1.5}
            display={"flex"}
            justifyContent={"flex-end"}
            width={85}
          >
            <NotificationsPanel />

            {/* <TimerCounter /> */}
          </Grid>
        </Grid>

        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        >
          <Grid sx={st.parentBox}>
            <ChangePasswordModal />
            <Grid sx={st.imgBox}>
              <img src={logo} alt="Logo" style={st.imgSize} />
            </Grid>

            <Grid sx={{ width: "100%" }}>
              <Typography
                sx={{ textAlign: "center", fontFamily: "MontserratSemiBold" }}
              >
                Sistema del Presupuesto Basado en Resultados
              </Typography>
            </Grid>

            <Grid sx={st.avatarBox}>
              <Avatar
                style={{
                  backgroundColor: stringToColor(
                    localStorage.getItem("NombreUsuario") as string
                  ),
                }}
                sx={st.avatarStyle}
              >
                {stringAvatar(localStorage.getItem("NombreUsuario") as string)}
              </Avatar>
            </Grid>

            <Grid sx={st.userInfoBox}>
              {localStorage.getItem("NombreUsuario")}
              <Typography sx={st.rolStyle}>
                {localStorage.getItem("Rol") === "Administrador"
                  ? "Autorizador"
                  : localStorage.getItem("Rol")}
              </Typography>
            </Grid>
            <Typography sx={st.institucionStyle}>
              INSTITUCIONES ASIGNADAS
            </Typography>

            <Grid sx={st.selectInstitucionBox}>
              {/* {renderInfo ? (
                // <Select
                //   value={
                //     institucionSeleccionada ||
                //     (localStorage.getItem("IdEntidad") as string)
                //   }
                //   label="Institución"
                //   onChange={handleChange}
                //   variant="standard"
                //   disableUnderline
                //   sx={st.selectInstitucionStyle}
                // >
                //   {instituciones?.map((item) => {
                //     return (
                //       <MenuItem value={item.Id} key={item.Id || Math.random()}>
                //         {item.NombreInstitucion}
                //       </MenuItem>
                //     );
                //   })}
                // </Select>
              ) : null} */}
              <Tooltip title={localStorage.getItem("Entidad")}>
                <Typography
                  fontFamily={"'Montserrat', sans-serif"}
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    textAlign: "center",
                    fontSize: [8, 8, 9, 9, 9], // Tamaños de fuente para diferentes breakpoints
                    // color: "#AF8C55",
                  }}
                >
               
                  {localStorage.getItem("Entidad")}
                </Typography>
              </Tooltip>
            </Grid>

            <Grid sx={st.dividerBox} />
            <Grid sx={st.menuListBox}>
              <List>
                <ListItemButton onClick={() => exitAlert("../home")}>
                  <Grid sx={st.iconMenuList}>
                    <HomeOutlinedIcon />
                  </Grid>
                  <Typography sx={st.firstItemsStyle}>Inicio</Typography>
                  <Grid
                    visibility={selection === "Inicio" ? "visible" : "hidden"}
                    sx={st.selectedBox}
                  />
                </ListItemButton>

                <ListItemButton onClick={handleClickProgramas}>
                  <Grid sx={st.iconMenuList}>
                    <FolderOutlinedIcon />
                  </Grid>

                  <Typography sx={st.firstItemsStyle}>
                    Programas Presupuestarios
                  </Typography>
                  {openProgramas ? <ExpandLess /> : <ExpandMore />}
                  <Grid
                    visibility={
                      selection === "Programas Presupuestarios"
                        ? "visible"
                        : "hidden"
                    }
                    sx={st.selectedBox}
                  />
                </ListItemButton>

                <Collapse in={openProgramas} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton
                      onClick={() => {
                        setResumeDefaultMIR();
                        exitAlert("../mir");
                      }}
                      sx={st.subMenuItemStyle}
                    >
                      <Grid sx={st.iconMenuList}>
                        <KeyboardDoubleArrowRightIcon />
                      </Grid>

                      <Typography sx={st.subMenuItemsText}>MIR</Typography>
                      <Grid
                        visibility={selection === "MIR" ? "visible" : "hidden"}
                        sx={st.selectedBox}
                      />
                    </ListItemButton>

                    <ListItemButton
                      onClick={() => {
                        setResumeDefaultMA();
                        exitAlert("../metaAnual");
                      }}
                      sx={st.subMenuItemStyle}
                    >
                      <Grid sx={st.iconMenuList}>
                        <KeyboardDoubleArrowRightIcon />
                      </Grid>
                      <Typography sx={st.subMenuItemsText}>
                        Meta Anual
                      </Typography>
                      <Grid
                        visibility={
                          selection === "Meta Anual" ? "visible" : "hidden"
                        }
                        sx={st.selectedBox}
                      />
                    </ListItemButton>

                    <ListItemButton
                      onClick={() => {
                        setResumeDefaultFT();
                        exitAlert("../fichaTecnica");
                      }}
                      sx={st.subMenuItemStyle}
                    >
                      <Grid sx={st.iconMenuList}>
                        <KeyboardDoubleArrowRightIcon />
                      </Grid>
                      <Typography sx={st.subMenuItemsText}>
                        Ficha Técnica
                      </Typography>
                      <Grid
                        visibility={
                          selection === "Ficha Técnica" ? "visible" : "hidden"
                        }
                        sx={st.selectedBox}
                      />
                    </ListItemButton>

                    {/* <ListItemButton
                      onClick={() => {
                        //setResumeDefaultFT();
                        //exitAlert("../fichaTecnica");
                        navigate("../raffi");
                      }}
                      sx={st.subMenuItemStyle}
                    >
                      <Grid sx={st.iconMenuList}>
                        <KeyboardDoubleArrowRightIcon />
                      </Grid>
                      <Typography sx={st.subMenuItemsText}>Raffi</Typography>
                      <Grid
                        visibility={
                          selection === "Raffi" ? "visible" : "hidden"
                        }
                        sx={st.selectedBox}
                      />
                    </ListItemButton> */}
                  </List>
                </Collapse>

                <List component="div" disablePadding>
                  {/* <ListItemButton
                    onClick={() => {
                      //setResumeDefaultAI();
                      exitAlert("../Institutionalactivities");
                    }}
                  >
                    <Grid sx={st.iconMenuList}>
                      <KeyboardDoubleArrowRightIcon />
                    </Grid>
                    <Typography sx={st.subMenuItemsText}>
                      Actividades Institucionales
                    </Typography>
                    <Grid
                      visibility={
                        selection === "Actividades Institucionales"
                          ? "visible"
                          : "hidden"
                      }
                      sx={st.selectedBox}
                    />
                  </ListItemButton> */}

                  {/* <ListItemButton
                    onClick={() => {
                      //setResumeDefaultAI();
                      navigate("../programaAnualEvaluacion");
                    }}
                  >
                    <Grid sx={st.iconMenuList}>
                      <KeyboardDoubleArrowRightIcon />
                    </Grid>
                    <Typography sx={st.subMenuItemsText}>
                      Programa Anual de Evaluacion
                    </Typography>
                    <Grid
                      visibility={
                        selection === "Programa Anual de Evaluacion"
                          ? "visible"
                          : "hidden"
                      }
                      sx={st.selectedBox}
                    />
                  </ListItemButton> */}
                </List>

                {localStorage.getItem("Rol") !== "Administrador" ? null : (
                  <ListItemButton onClick={() => exitAlert("../notifications")}>
                    <Grid sx={st.iconMenuList}>
                      <CampaignIcon />
                    </Grid>
                    <Typography sx={st.firstItemsStyle}>
                      Notificaciones
                    </Typography>
                    <Grid
                      visibility={
                        selection === "Notificaciones" ? "visible" : "hidden"
                      }
                      sx={st.selectedBox}
                    />
                  </ListItemButton>
                )}
              </List>
            </Grid>

            <Divider></Divider>
            <Grid sx={st.bottomMenuBox}>
              <List>
                {localStorage.getItem("Rol") !== "Administrador" ? null : (
                  <ListItemButton onClick={() => goSettings()}>
                    <Grid sx={st.iconMenuList}>
                      <SettingsOutlinedIcon />
                    </Grid>
                    <Typography sx={st.bottomItemsStyle}>
                      Configuración
                    </Typography>

                    <Grid
                      visibility={
                        selection === "CONFIGURACIÓN" ? "visible" : "hidden"
                      }
                      sx={st.selectedBox}
                    />
                  </ListItemButton>
                )}

                {localStorage.getItem("Rol") !== "Verificador" ? null : (
                  <ListItemButton onClick={() => exitAlert("../users")}>
                    <Grid sx={st.iconMenuList}>
                      <GroupIcon />
                    </Grid>
                    <Typography sx={st.bottomItemsStyle}>Usuarios</Typography>

                    <Grid
                      visibility={
                        selection === "Usuarios" ? "visible" : "hidden"
                      }
                      sx={st.selectedBox}
                    />
                  </ListItemButton>
                )}

                <ListItemButton onClick={() => setOpenPasswordChange(true)}>
                  <Grid sx={st.iconMenuList}>
                    <LockResetIcon />
                  </Grid>
                  <Typography sx={st.bottomItemsStyle}>
                    Cambiar Contraseña
                  </Typography>
                </ListItemButton>
                <ListItemButton onClick={() => logout()}>
                  <Grid sx={st.iconMenuList}>
                    <LogoutOutlinedIcon />
                  </Grid>
                  <Typography sx={st.bottomItemsStyle}>
                    Cerrar Sesión
                  </Typography>
                </ListItemButton>
              </List>
            </Grid>
          </Grid>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export interface IInstituciones {
  Id: string;
  NombreInstitucion: string;
  FechaCreacion: string;
  CreadoPor: string;
  UltimaModificacion: string;
  ModificadoPor: string;
  Deleted: number;
}
