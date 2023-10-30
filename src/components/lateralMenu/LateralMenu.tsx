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
  MenuItem,
  Menu,
  ListItem,
  ListItemText,
  ListItemIcon,
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
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import InfoIcon from '@mui/icons-material/Info';

import MenuIcon from "@mui/icons-material/Menu";
import { getAyuda } from "../../screens/Ayuda/ServicesAyuda";
import { VisualizadorAyudas } from "../../screens/Ayuda/VisualizadorAyudas";
//import { getAllusers } from "../../screens/config/GetUsuarios";
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HelpIcon from "@mui/icons-material/Help";

interface MenuObject {
  Id: string;
  FechaDeCreacion: string;
  UltimaModificacion: string;
  CreadoPor: string;
  ModificadoPor: string;
  Deleted: number;
  Menu: string;
  Descripcion: string;
  MenuPadre: string;
  Icon: string | null;
  Path: string;
  Nivel: number;
  Orden: number;
  ControlInterno: string | null;
  IdApp: string;
  item: MenuObject[]; // Esto es para el arreglo de objetos anidados, si los hay
}

interface MenuProps {
  data: MenuObject;
}

export const IconsMenu = (icon: string) => {
  switch (icon) {

    case "HomeOutlinedIcon":
      return <HomeOutlinedIcon />;
    case "FolderOutlinedIcon":
      return <FolderOutlinedIcon />;
    case "CampaignIcon":
      return <CampaignIcon />;
    case "KeyboardDoubleArrowRightIcon":
      return <KeyboardDoubleArrowRightIcon />;

    case "OndemandVideoIcon":
      return <OndemandVideoIcon />;

    case "SettingsOutlinedIcon":
      return <SettingsOutlinedIcon />;
    case "MenuBookIcon":
      return <MenuBookIcon />;
    case "HelpIcon":
      return <HelpIcon />;
    case "GroupIcon":
      return <GroupIcon />;
    case "LockResetIcon":
      return <LockResetIcon />;
    case "LogoutOutlinedIcon":
      return <LogoutOutlinedIcon />;
    default:
      return <KeyboardDoubleArrowRightIcon />;
  }
};


export const LateralMenu = ({
  selection,
  actionNumber,
  settingsCard,
}: {
  selection: string;
  actionNumber: number;
  settingsCard?: Function;
}) => {

  const menus: MenuObject[] =
    localStorage.getItem("Menus") !== undefined &&
      localStorage.getItem("Menus") !== null
      ? JSON.parse(localStorage.getItem("Menus")!)
      : [];

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [openDocs, setOpenDocs] = useState(false);

  const handleClickProgramas = () => {
    setOpenProgramas(!openProgramas);
    setOpenDocs(false);
  };

  const exitAlert = (urlNavigate: string) => {
    if (
      selection === "MIR" ||
      selection === "Meta Anual" ||
      selection === "Ficha Técnica" ||
      selection === "Actividades Institucionales" ||
      selection === "Programas Presupuestarios"
    ) {
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

  //
  //       }
  //     });
  // };

  useEffect(() => {
    //getInstituciones();
  }, []);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  /////////////ayuda

  interface MenuObject {
    Id: string;
    FechaDeCreacion: string;
    UltimaModificacion: string;
    CreadoPor: string;
    ModificadoPor: string;
    Deleted: number;
    Menu: string;
    Descripcion: string;
    MenuPadre: string;
    Icon: string | null;
    Path: string;
    Nivel: number;
    Orden: number;
    ControlInterno: string | null;
    IdApp: string;
    item: MenuObject[]; // Esto es para el arreglo de objetos anidados, si los hay
  }

  let idMenu = localStorage.getItem("IdMenuACtual")||""


  const [arrayAyudas, setArrayAyudas] = useState<any[]>([])

  const [openVAyudas, setOpenVAyudas] = useState(false);
  const [option, setOption] = useState("Videos");

  function handleCloseVAyudas() {
    setOpenVAyudas(false)
  }
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //////////ayuda

  const RecursiveMenu: React.FC<MenuProps> = ({ data }) => {
    const [open, setOpen] = useState(false);

    const handleToggle = () => {
      setOpen(!open);
    };


    if (data.item.length !== 0) {
      return (
        <>
          <ListItemButton onClick={handleToggle} sx={{ width: "98%" }}>
            <ListItemIcon>
              {IconsMenu(data.Icon || "")}
            </ListItemIcon>
            <ListItemText primary={data.Menu} sx={{ width: "100%" }} />
            {data.item && data.item.length > 0 && (
              <ListItemIcon sx={{ display: "flex", justifyContent: "flex-end" }}>
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemIcon>
            )}
          </ListItemButton>
          {data.item && data.item.length > 0 && (
            <Collapse in={open} timeout="auto" unmountOnExit>

              <List component="div" disablePadding sx={{ ml: "2vw" }}>
                {data.item.map((subItem) =>
                  <RecursiveMenu key={subItem.Id} data={subItem} />)}

              </List>
            </Collapse>
          )}
        </>
      );
    } else {
      return (
        <Grid>
          <ListItemButton onClick={() => {
            localStorage.setItem("IdMenuActual", data.Id);
            if (data.Path.includes("setting")) {
              goSettings();
            } else { exitAlert(data.Path) }
          }} sx={{ width: "98%" }}>
            <ListItemIcon>
              {IconsMenu(data.Icon || "")}
            </ListItemIcon>
            <ListItemText primary={data.Menu} sx={{ width: "98%" }} />
            <Grid
            visibility={
              localStorage.getItem("IdMenuActual")===data.Id ? "visible" : "hidden"
            }
            sx={{...st.selectedBox,width: "2%"}}
          />
          </ListItemButton>
          
        </Grid>)
    }

  }



  return (
    <Grid
      container
      sx={{ alignItems: "center", justifyContent: "space-between", height: "100%", }}
    >
      <AppBar position="static">
        <Toolbar variant="dense" sx={{ height: "7vh", width: "100%" }}>
          <Grid sx={{}}>
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
          {/* <Grid sx={{ height: "8vh", marginLeft: "4vw" }}> */}
          <Grid sx={{}}>
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
          ><IconButton
            color="inherit"
            onClick={handleMenu}
          >
              <InfoOutlinedIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {<MenuItem onClick={() => { getAyuda(setArrayAyudas, "1", "Videos"); setOpenVAyudas(true); setOption("Videos") }}>{IconsMenu("OndemandVideoIcon")} Ver Tutoriales </MenuItem>}
              {<MenuItem onClick={() => { getAyuda(setArrayAyudas, "1", "Guías"); setOpenVAyudas(true); setOption("Guías") }}>{IconsMenu("MenuBookIcon")} Ver Guías </MenuItem>}
              {<MenuItem onClick={() => { getAyuda(setArrayAyudas, "1", "Preguntas"); setOpenVAyudas(true); setOption("Preguntas") }}>{IconsMenu("HelpIcon")} Preguntas </MenuItem>}

            </Menu>

          </Grid>

          {openVAyudas ? <VisualizadorAyudas handleClose={() => { handleCloseVAyudas() }} arrayAyudas={arrayAyudas} value={option}  /> : null}


          <Grid
            // mt={1.5}
            display={"flex"}
            justifyContent={"flex-end"}
            width={85}
          >
            <NotificationsPanel />

            {/* <TimerCounter /> */}
          </Grid>


          <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
          >
            <Grid
              container
              sx={{ width: "25vw", height: "100vh" }}>
              <Grid
                item
                container
                sx={{ width: "100%", height: "40vh", alignContent: "flex-start", display: "flex" }}>


                <Grid sx={{ height: "7vh", width: "100%", justifyContent: "center", display: "flex", alignItems: "center", mt: "1vh" }}>
                  <img src={logo} alt="Logo" height={"100%"} />
                </Grid>


                <Grid sx={{ height: "7vh", width: "100%", justifyContent: "center", display: "flex", alignItems: "center", mt: "1vh" }}>
                  <Typography
                    sx={{ textAlign: "center", fontFamily: "MontserratSemiBold" }}
                  >
                    Sistema del Presupuesto Basado en Resultados
                  </Typography>
                </Grid>


                <Grid sx={{ width: "100%", height: "11vh", justifyContent: "center", display: "flex", alignItems: "center", }}>
                  <Avatar
                    style={{
                      backgroundColor: stringToColor(
                        localStorage.getItem("NombreUsuario") as string
                      ),
                    }}
                    sx={st.avatarStyle}
                  >
                    {stringAvatar(
                      localStorage.getItem("NombreUsuario") as string
                    )}
                  </Avatar>
                </Grid>

                <Grid sx={{ ...st.userInfoBox, width: "100%", height: "7vh", alignItems: "center", display: "flex", flexDirection: "column" }}>
                  {localStorage.getItem("NombreUsuario")}
                  <Typography sx={st.rolStyle}>
                    {localStorage.getItem("Rol") === "Administrador"
                      ? "Autorizador"
                      : localStorage.getItem("Rol")}
                  </Typography>
                </Grid>

                <Grid sx={{ ...st.userInfoBox, width: "100%", height: "7vh", alignItems: "center", display: "flex", flexDirection: "column" }}>
                  <Typography sx={{ fontFamily: "MontserratMedium", display: "flex" }}>
                    INSTITUCION ASIGNADA
                  </Typography>
                  <Tooltip title={localStorage.getItem("Entidad")}>
                    <Typography
                      fontFamily={"'Montserrat', sans-serif"}
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        textAlign: "center",
                        fontSize: [9, 9, 10, 10, 10], // Tamaños de fuente para diferentes breakpoints
                        // color: "#AF8C55",
                      }}
                    >
                      {localStorage.getItem("Entidad")}
                    </Typography>
                  </Tooltip>
                </Grid>


                <Grid sx={st.selectInstitucionBox}>

                </Grid>

              </Grid>
              <Divider />
              <Grid
                item
                container
                sx={{ width: "100%", height: "60vh", overflow: "auto" }}>

                <List sx={{ width: "100%" }}>
                  <Divider />
                  {menus.map((menuItem) => <RecursiveMenu key={menuItem.Id} data={menuItem} />)}


                  <ListItemButton onClick={() => setOpenPasswordChange(true)} sx={{ width: "100%" }}>
                    <ListItemIcon>
                      {IconsMenu("LockResetIcon")}
                    </ListItemIcon>
                    <ListItemText primary={"Cambiar Contraseña"} sx={{ width: "100%" }} />
                  </ListItemButton>


                  <ListItemButton onClick={() => logout()} sx={{ width: "100%" }}>
                    <ListItemIcon>
                      {IconsMenu("LogoutOutlinedIcon")}
                    </ListItemIcon>
                    <ListItemText primary={"Cerrar Sesión"} sx={{ width: "100%" }} />
                  </ListItemButton>
                </List>

              </Grid>

            </Grid>
          </Drawer>
        </Toolbar>
      </AppBar>
      <ChangePasswordModal />
    </Grid>
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
