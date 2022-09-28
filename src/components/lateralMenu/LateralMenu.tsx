import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import logo from "../../assets/logos/logo.svg";


import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Collapse from "@mui/material/Collapse";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import LocationCityOutlinedIcon from "@mui/icons-material/LocationCityOutlined";
import Box from "@mui/material/Box";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import {
  Dialog,
  TextField,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logout, sessionUntil } from "../../funcs/validation";
import LockResetIcon from "@mui/icons-material/LockReset";
import { TimerCounter } from "../timer/TimerCounter";
import axios from "axios";
import Swal from "sweetalert2";

export const LateralMenu = ({
  selection,
  settingsCard,
}: {
  selection: number;
  settingsCard?: Function;
}) => {


  const navigate = useNavigate();

  const [openProgramas, setOpenProgramas] = useState(true);

  const handleClickProgramas = () => {
    setOpenProgramas(!openProgramas);
  };

  function stringToColor(string: string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
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
    return `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`;
  }

  const [age, setAge] = useState("10");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const goSettings = () => {
    if (settingsCard) {
      settingsCard();
    }
    navigate("../settings");
  };


  const [openPasswordChange, setOpenPasswordChange] = useState(false);

  const handleClosePasswordChange = () => {
    setOpenPasswordChange(false);
  };

  const ChangePasswordModal = () => {
    const [newPassword, setNewPassword] = useState("");

    const cambiarContrasena = () => {
      axios
        .put(
          "http://10.200.4.105:5000/api/change-password",
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
            handleClosePasswordChange()
           setNewPassword("")
           Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Contraseña actualizada',
            showConfirmButton: false,
            timer: 1500
          })
          }
        })
        .catch((r) => {
          if (r.response.status === 409) {
            handleClosePasswordChange()

            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Error',
              showConfirmButton: false,
              timer: 1500
            })
          
          }
        });
    };
    return (
      <Dialog onClose={handleClosePasswordChange} open={openPasswordChange} maxWidth={'sm'}>
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', mt: '2vh'}}>
          <Typography sx={{fontFamily: 'MontserratBold', fontSize: '1vw'}}>Cambiar Contraseña</Typography>
        </Box>
        <Box sx={{height: '20vh', width: '20vw', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'column'}}>
          <TextField label='Nueva Contraseña' onChange={(v) => setNewPassword(v.target.value)}/>
          <Box sx={{display: 'flex', justifyContent: 'space-evenly', width: '100%'}}>

          <Button variant="contained" color="error" onClick={() => handleClosePasswordChange()}> Cancelar</Button>

          <Button variant="contained" onClick={() => cambiarContrasena()}>Cambiar</Button>
          </Box>

        </Box>
      </Dialog>
    );
  };

  return (
    <Box
      sx={{
        width: "13vw",
        height: "100vh ",
        backgroundColor: "#fff",
        flexDirection: "column",
        boxShadow: 5,
      }}
    >
      <ChangePasswordModal />
      <Box
        sx={{
          paddingTop: "3vh",
          width: "100%",
          height: "6vh",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{
            width: "100%",
            height: "70%",
          }}
        />
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "14vh",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            bgcolor: stringToColor(
              localStorage.getItem("NombreUsuario") as string
            ),
            width: "5vw",
            height: "10vh",
            fontSize: "1.5vw",
            fontFamily: "MontserratMedium",
            boxShadow: 4,
          }}
        >
          {stringAvatar(localStorage.getItem("NombreUsuario") as string)}
        </Avatar>
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "2vh",
          textAlign: "center",
          font: "MontserratBold",
          fontSize: ".8vw",
          fontFamily: "MontserratBold",
        }}
      >
        {localStorage.getItem("NombreUsuario")}
        <Typography
          sx={{
            fontFamily: "MontserratMedium",
            fontSize: ".7vw",
            fontStyle: "oblique",
          }}
        >
          {localStorage.getItem("Rol")}
        </Typography>
      </Box>

      <Typography
        sx={{ fontFamily: "MontserratMedium", fontSize: ".6vw", ml: 1, mt: 3 }}
      >
        Institución
      </Typography>

      <Box
        sx={{
          width: "100%",
          height: "4vh",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Select
          value={age}
          label="Age"
          onChange={handleChange}
          variant="standard"
          disableUnderline
          sx={{
            width: "100%",
            textAlign: "center",
            fontFamily: "MontserratMedium",
            fontSize: ".7vw",
          }}
        >
          <MenuItem value={10}>Secretaria de Economia</MenuItem>
          <MenuItem value={20}>Fuerza Civil</MenuItem>
          <MenuItem value={30}>Secretaria de Finanzas</MenuItem>
        </Select>
      </Box>

      <Box
        sx={{
          backgroundColor: "#ccc",
          width: "100%",
          height: "0.1vh",
        }}
      ></Box>
      <Divider light />
      <Box
        sx={{
          width: "100%",
          height: "50vh",
          fontSize: "h1",
        }}
      >
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          sx={{
            fontFamily: "MontserratMedium",
          }}
        >
          <ListItemButton onClick={() => navigate("../home")}>
            <ListItemIcon>
              <HomeOutlinedIcon />
            </ListItemIcon>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              Inicio
            </Typography>
            <Box
              visibility={selection === 0 ? "visible" : "hidden"}
              sx={{
                width: ".5vw",
                backgroundColor: "#c4a57b",
                height: "3vh",
                position: "absolute",
                right: -4,
              }}
            />
          </ListItemButton>

          <ListItemButton onClick={handleClickProgramas}>
            <ListItemIcon>
              <FolderOutlinedIcon />
            </ListItemIcon>

            <Typography sx={{ fontFamily: "MontserratLight" }}>
              Programas Presupuestarios
            </Typography>
            {openProgramas ? <ExpandLess /> : <ExpandMore />}
            <Box
              visibility={selection === 1 ? "visible" : "hidden"}
              sx={{
                width: ".5vw",
                backgroundColor: "#c4a57b",
                height: "3vh",
                position: "absolute",
                right: -4,
              }}
            />
          </ListItemButton>
          <Collapse in={openProgramas} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton onClick={() => navigate("../MIR")} sx={{ pl: 2 }}>
                <ListItemIcon>
                  <KeyboardDoubleArrowRightIcon />
                </ListItemIcon>
                <Typography
                  sx={{ fontFamily: "MontserratLight", fontSize: ".7vw" }}
                >
                  MIR
                </Typography>
                <Box
                  visibility={selection === 2 ? "visible" : "hidden"}
                  sx={{
                    width: ".5vw",
                    backgroundColor: "#c4a57b",
                    height: "3vh",
                    position: "absolute",
                    right: -4,
                  }}
                />
              </ListItemButton>

              <ListItemButton sx={{ pl: 2 }}>
                <ListItemIcon>
                  <KeyboardDoubleArrowRightIcon />
                </ListItemIcon>
                <Typography
                  sx={{ fontFamily: "MontserratLight", fontSize: ".7vw" }}
                >
                  Meta Anual
                </Typography>
                <Box
                  visibility={selection === 3 ? "visible" : "hidden"}
                  sx={{
                    width: ".5vw",
                    backgroundColor: "#c4a57b",
                    height: "3vh",
                    position: "absolute",
                    right: -4,
                  }}
                />
              </ListItemButton>

              <ListItemButton sx={{ pl: 2 }}>
                <ListItemIcon>
                  <KeyboardDoubleArrowRightIcon />
                </ListItemIcon>
                <Typography
                  sx={{ fontFamily: "MontserratLight", fontSize: ".7vw" }}
                >
                  Ficha Técnica
                </Typography>
                <Box
                  visibility={selection === 4 ? "visible" : "hidden"}
                  sx={{
                    width: ".5vw",
                    backgroundColor: "#c4a57b",
                    height: "3vh",
                    position: "absolute",
                    right: -4,
                  }}
                />
              </ListItemButton>
            </List>
          </Collapse>
          <ListItemButton>
            <ListItemIcon>
              <LocationCityOutlinedIcon />
            </ListItemIcon>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              Actividades Institucionales
            </Typography>
            <Box
              visibility={selection === 5 ? "visible" : "hidden"}
              sx={{
                width: ".5vw",
                backgroundColor: "#c4a57b",
                height: "3vh",
                position: "absolute",
                right: -4,
              }}
            />
          </ListItemButton>
        </List>
      </Box>

      <Box
        sx={{
          backgroundColor: "#ccc",
          width: "100%",
          height: "0.1vh",
        }}
      ></Box>
      <Box
        sx={{
          width: "100%",
          height: "auto",
          bgcolor: "background.paper",
          mt: "1vh",
        }}
      >
        <List component="nav" aria-labelledby="nested-list-subheader">
          <ListItemButton onClick={() => goSettings()}>
            <ListItemIcon>
              <SettingsOutlinedIcon />
            </ListItemIcon>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              Configuración
            </Typography>

            <Box
              visibility={selection === 6 ? "visible" : "hidden"}
              sx={{
                width: ".5vw",
                backgroundColor: "#c4a57b",
                height: "3vh",
                position: "absolute",
                right: -4,
              }}
            />
          </ListItemButton>
          <ListItemButton onClick={() => setOpenPasswordChange(true)}>
            <ListItemIcon>
              <LockResetIcon />
            </ListItemIcon>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              Cambiar Contraseña
            </Typography>
          </ListItemButton>
          <ListItemButton onClick={() => logout()}>
            <ListItemIcon>
              <LogoutOutlinedIcon />
            </ListItemIcon>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              Cerrar Sesión
            </Typography>
          </ListItemButton>
        </List>
       <TimerCounter/>
      </Box>
    </Box>
  );
};
