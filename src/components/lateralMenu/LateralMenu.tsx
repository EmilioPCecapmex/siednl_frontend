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
import { MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";



export const LateralMenu = ({selection} : {selection: number}) => {
  const navigate = useNavigate();


const UsuarioEnSesion = "José Perez"

  const [openProgramas, setOpenProgramas] = useState(true);

  const handleClickProgramas = () => {
    setOpenProgramas(!openProgramas);
  };



  function stringToColor(string: string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 10) - hash);
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
            bgcolor: stringToColor(UsuarioEnSesion),
            width: "5vw",
            height: "10vh",
            fontSize: "1.5vw",
            fontFamily: "MontserratMedium",
            boxShadow: 4,
          }}
        >
          {stringAvatar(UsuarioEnSesion)}
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
        {UsuarioEnSesion}
        <Typography
          sx={{
            fontFamily: "MontserratMedium",
            fontSize: ".7vw",
            fontStyle: "oblique",
          }}
        >
          Verificador
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
          height: "55vh",
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
          <ListItemButton onClick={() => navigate('../Home')}>
            <ListItemIcon>
              <HomeOutlinedIcon />
            </ListItemIcon>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              Inicio
            </Typography>
            <Box
              visibility={selection == 0 ? 'visible' : 'hidden' }
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
              visibility={selection == 1 ? 'visible' : 'hidden' }
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
              <ListItemButton sx={{ pl: 2 }}>
                <ListItemIcon>
                  <KeyboardDoubleArrowRightIcon />
                </ListItemIcon>
                <Typography
                  sx={{ fontFamily: "MontserratLight", fontSize: ".7vw" }}
                >
                  MIR
                </Typography>
                <Box
              visibility={selection == 2 ? 'visible' : 'hidden' }
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
              visibility={selection == 3 ? 'visible' : 'hidden' }
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
              visibility={selection == 4 ? 'visible' : 'hidden' }
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
              visibility={selection == 5 ? 'visible' : 'hidden' }
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
          paddingTop: "1vh",
        }}
      >
        <List component="nav" aria-labelledby="nested-list-subheader">
          <ListItemButton onClick={() => navigate('../settings')}>
            <ListItemIcon>
              <SettingsOutlinedIcon />
            </ListItemIcon>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              Configuración
            </Typography>

            <Box
              visibility={selection == 6 ? 'visible' : 'hidden' }
              sx={{
                width: ".5vw",
                backgroundColor: "#c4a57b",
                height: "3vh",
                position: "absolute",
                right: -4,
              }}
            />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <LogoutOutlinedIcon />
            </ListItemIcon>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              Cerrar Sesión
            </Typography>
          </ListItemButton>
        </List>
      </Box>
    </Box>
  );
};

interface IInstituciones {
  Institucion: string;
}

const Instituciones = [
  { Institucion: "DIF" },
  { Institucion: "BIBLIOTECA CENTRAL DEL ESTADO" },
];
