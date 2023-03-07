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
import Box from "@mui/material/Box";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import CampaignIcon from "@mui/icons-material/Campaign";
import GroupIcon from "@mui/icons-material/Group";
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

export const LateralMenu = ({
  selection,
  actionNumber,
  settingsCard,
}: {
  selection: number;
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

  const handleClickProgramas = () => {
    setOpenProgramas(!openProgramas);
    setOpenDocs(false);
  };

  const handleClickDocs = () => {
    setOpenDocs(!openDocs);
    setOpenProgramas(false);
  };

  const exitAlert = (urlNavigate: string) => {
    if (selection === 2 || selection === 3 || selection === 4) {
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
    localStorage.getItem("IdInstitucion") as string
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
        <Box
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
        </Box>
        <Box
          sx={{
            height: "20vh",
            width: "20vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            flexDirection: "column",
          }}
        >
          <Box
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
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              width: "100%",
            }}
          >
            <Button
              color="error"
              onClick={() => handleClosePasswordChange()}
              variant="outlined"
            >
              <Typography
                sx={{ fontFamily: "MontserratMedium", fontSize: ".7vw" }}
              >
                Cancelar
              </Typography>
            </Button>

            <Button variant="outlined" onClick={() => cambiarContrasena()}>
              <Typography
                sx={{ fontFamily: "MontserratMedium", fontSize: ".7vw" }}
              >
                Cambiar
              </Typography>{" "}
            </Button>
          </Box>
        </Box>
      </Dialog>
    );
  };

  const [instituciones, setInstituciones] = useState<Array<IInstituciones>>();
  const [renderInfo, setRenderInfo] = useState(false);

  const getInstituciones = () => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/usuarioInsitucion", {
        params: {
          IdUsuario: localStorage.getItem("IdUsuario"),
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          setInstituciones(r.data.data);
          setRenderInfo(true);
        }
      });
  };

  useEffect(() => {
    getInstituciones();
  }, []);

  return (
    <Box sx={st.parentBox}>
      <ChangePasswordModal />
      <Box sx={st.imgBox}>
        <img src={logo} alt="Logo" style={st.imgSize} />
      </Box>

      <Box sx={{ width: "100%" }}>
        <Typography
          sx={{ textAlign: "center", fontFamily: "MontserratSemiBold" }}
        >
          Sistema del Presupuesto Basado en Resultados
        </Typography>
      </Box>

      <Box sx={st.avatarBox}>
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
      </Box>

      <Box sx={st.userInfoBox}>
        {localStorage.getItem("NombreUsuario")}
        <Typography sx={st.rolStyle}>
          {localStorage.getItem("Rol") === "Administrador"
            ? "Autorizador"
            : localStorage.getItem("Rol")}
        </Typography>
      </Box>
      <Typography sx={st.institucionStyle}>INSTITUCIONES ASIGNADAS</Typography>

      <Box sx={st.selectInstitucionBox}>
        {renderInfo ? (
          <Select
            value={
              institucionSeleccionada ||
              (localStorage.getItem("IdInstitucion") as string)
            }
            label="Institución"
            onChange={handleChange}
            variant="standard"
            disableUnderline
            sx={st.selectInstitucionStyle}
          >
            {instituciones?.map((item) => {
              return (
                <MenuItem value={item.Id} key={item.Id || Math.random()}>
                  {item.NombreInstitucion}
                </MenuItem>
              );
            })}
          </Select>
        ) : null}
      </Box>

      <Box sx={st.dividerBox} />
      <Box sx={st.menuListBox}>
        <List>
          <ListItemButton onClick={() => exitAlert("../home")}>
            <Box sx={st.iconMenuList}>
              <HomeOutlinedIcon />
            </Box>
            <Typography sx={st.firstItemsStyle}>Inicio</Typography>
            <Box
              visibility={selection === 0 ? "visible" : "hidden"}
              sx={st.selectedBox}
            />
          </ListItemButton>

          <ListItemButton onClick={handleClickProgramas}>
            <Box sx={st.iconMenuList}>
              <FolderOutlinedIcon />
            </Box>

            <Typography sx={st.firstItemsStyle}>
              Programas Presupuestarios
            </Typography>
            {openProgramas ? <ExpandLess /> : <ExpandMore />}
            <Box
              visibility={selection === 1 ? "visible" : "hidden"}
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
                <Box sx={st.iconMenuList}>
                  <KeyboardDoubleArrowRightIcon />
                </Box>
                <Typography sx={st.subMenuItemsText}>MIR</Typography>
                <Box
                  visibility={selection === 2 ? "visible" : "hidden"}
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
                <Box sx={st.iconMenuList}>
                  <KeyboardDoubleArrowRightIcon />
                </Box>
                <Typography sx={st.subMenuItemsText}>Meta Anual</Typography>
                <Box
                  visibility={selection === 3 ? "visible" : "hidden"}
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
                <Box sx={st.iconMenuList}>
                  <KeyboardDoubleArrowRightIcon />
                </Box>
                <Typography sx={st.subMenuItemsText}>Ficha Técnica</Typography>
                <Box
                  visibility={selection === 4 ? "visible" : "hidden"}
                  sx={st.selectedBox}
                />
              </ListItemButton>
            </List>
          </Collapse>
          {/* <ListItemButton
            onClick={() => {
              setResumeDefaultAI();
              exitAlert("../Institutionalactivities")
            }}
          >
            <Box sx={st.iconMenuList}>
              <LocationCityOutlinedIcon />
            </Box>
            <Typography sx={st.firstItemsStyle}>
              Actividades Institucionales
            </Typography>
            <Box
              visibility={selection === 5 ? "visible" : "hidden"}
              sx={st.selectedBox}
            />
          </ListItemButton> */}

          {localStorage.getItem("Rol") !== "Administrador" ? null : (
            <ListItemButton onClick={() => exitAlert("../notifications")}>
              <Box sx={st.iconMenuList}>
                <CampaignIcon />
              </Box>
              <Typography sx={st.firstItemsStyle}>Notificaciones</Typography>
              <Box
                visibility={selection === 7 ? "visible" : "hidden"}
                sx={st.selectedBox}
              />
            </ListItemButton>
          )}
        </List>
      </Box>

      <Divider></Divider>
      <Box sx={st.bottomMenuBox}>
        <List>
          {localStorage.getItem("Rol") !== "Administrador" ? null : (
            <ListItemButton onClick={() => goSettings()}>
              <Box sx={st.iconMenuList}>
                <SettingsOutlinedIcon />
              </Box>
              <Typography sx={st.bottomItemsStyle}>Configuración</Typography>

              <Box
                visibility={selection === 6 ? "visible" : "hidden"}
                sx={st.selectedBox}
              />
            </ListItemButton>
          )}

          {localStorage.getItem("Rol") !== "Verificador" ? null : (
            <ListItemButton onClick={() => exitAlert("../users")}>
              <Box sx={st.iconMenuList}>
                <GroupIcon />
              </Box>
              <Typography sx={st.bottomItemsStyle}>Usuarios</Typography>

              <Box
                visibility={selection === 6 ? "visible" : "hidden"}
                sx={st.selectedBox}
              />
            </ListItemButton>
          )}

          <ListItemButton onClick={() => setOpenPasswordChange(true)}>
            <Box sx={st.iconMenuList}>
              <LockResetIcon />
            </Box>
            <Typography sx={st.bottomItemsStyle}>Cambiar Contraseña</Typography>
          </ListItemButton>
          <ListItemButton onClick={() => logout()}>
            <Box sx={st.iconMenuList}>
              <LogoutOutlinedIcon />
            </Box>
            <Typography sx={st.bottomItemsStyle}>Cerrar Sesión</Typography>
          </ListItemButton>
        </List>
      </Box>
    </Box>
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
