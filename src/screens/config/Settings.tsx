import React from "react";
import Box from "@mui/material/Box";
import { LateralMenu } from "../../components/lateralMenu/LateralMenu";
import {
  Badge,
  IconButton,
  Grid,
  Button,
  Typography,
  Input,
  TextField,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { Header } from "../../components/header/Header";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { SettingsCard } from "../../components/settings/SettingsCard";
export const Settings = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        backgroundColor: "#F2F2F2",
      }}
    >
      <LateralMenu selection={6} />
      <Header
        details={{
          name1: "Inicio",
          path1: "./",
          name2: "Configuración",
          path2: "./",
          name3: "Usuarios",
        }}
      />
      <SettingsCard/>
     
    </Box>
    
  );
};
