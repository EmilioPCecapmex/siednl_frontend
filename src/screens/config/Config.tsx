import React, { useEffect, useState } from "react";
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
import { Header } from "../../components/header/Header";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DataTable from "../../components/datatable/DataTable";
import ModalCrearUsuario from "../../components/modalUsuarios/ModalCrearUsuario";
import Catalogos from "../../components/catalogos/Catalogos";

export const Config = () => {

  const [openModalUsuarios, setOpenModalUsuarios] = useState(false);

  const handleCloseModalUsuarios = () => {
    setOpenModalUsuarios(false);
  }




  const [usersFiltered,setUsersFiltered] = useState("")

  const dataFilter = (text: string) => {
    setUsersFiltered(text)
  };

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
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{
            width: "70vw",
            height: "80vh",
            backgroundColor: "#fff",
            borderRadius: 5,
            display: "flex",
            alignItems: "center",
          }}
        >
        
          <Catalogos/>

        </Box>
      </Box>
    </Box>
  );
};
