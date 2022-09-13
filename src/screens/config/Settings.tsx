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
import PersonAddIcon from '@mui/icons-material/PersonAdd';
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
      {/* <SettingsCard/> */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "87%",
          height: "92%",
          mt: "8vh",
          flexWrap: 'wrap'
        }}
      >
        <Box
          sx={{
            mt: "3vh",
            width: "70vw",
            height: "10vh",
            backgroundColor: "#fff",
            borderRadius: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: 'space-between'
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: 'space-between',
              border: 1,
              borderRadius: 2,
              ml: "1vw",
              color: '#ccc',
              
            }}
          >
            <Input sx={{pl:1 }} disableUnderline />
            <SearchIcon sx={{ color: "action.active", mr: 1 }} />
          </Box>

          <Button variant="contained" sx={{mr: 3, backgroundColor: '#c4a55a', ":hover": {
            backgroundColor: '#ccc'
          }}}>
          <PersonAddIcon sx={{mr: 1}}/>
            <Typography sx={{fontFamily: 'MontserratMedium', fontSize: '.8vw'}}>
            Añadir
            </Typography>
          </Button>
        </Box>

        {/* ----- */}
        <Box
          sx={{
            width: "70vw",
            height: "65vh",
            backgroundColor: "#fff",
            borderRadius: 5,
            display: "flex",
            alignItems: "center",
          }}
        >

          </Box>

      </Box>
 
    </Box>
  );
};
