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
import MailIcon from "@mui/icons-material/Mail";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { Header } from "../../components/header/Header";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { SettingsCard } from "../../components/settings/SettingsCard";
import DataTable from "../../components/Datatable/DataTable";
import axios from "axios";
import { DataUsuariosTiCentral } from "../../components/Datatable/interface";

export const Usuarios = () => {

  const [users, setUsers] = useState<Array<DataUsuariosTiCentral>>([{
    Id:                "",
    EstaActivo:        0,
    Nombre:            "",
    ApellidoPaterno:   "",
    ApellidoMaterno:   "",
    NombreUsuario:     "",
    CorreoElectronico: "",
    CreadoPor:         "",
    ModificadoPor: "",
  }])

  const [usersFiltered,setUsersFiltered] = useState("")

  const jwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOb21icmVVc3VhcmlvIjoiRW1wZXJleiIsIklkVXN1YXJpbyI6IjNkNDcyYTdhLTMwODctMTFlZC1hZWQwLTA0MDMwMDAwMDAwMCIsImlhdCI6MTY2MzI2NDE2MSwiZXhwIjoxNjYzMjY2ODYxfQ.xReNwRMGQWvZGMjS3dDKyCcc9fnIMWuTwbuWnCAQXSk"

  const getUsers = () => {
    axios
      .get("http://10.200.4.105:5000/api/users", {
        headers: {
          Authorization: jwt,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setUsers(response.data.data);
        setUsersFiltered(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const dataFilter = (text: string) => {
    setUsersFiltered(text)
  };

  useEffect(() => {
    getUsers();
  }, []);

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
            mt: "3vh",
            width: "70vw",
            height: "10vh",
            backgroundColor: "#fff",
            borderRadius: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
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
          </Box>

          <Button
            variant="contained"
            sx={{
              mr: 3,
              backgroundColor: "#c4a55a",
              ":hover": {
                backgroundColor: "#ccc",
              },
            }}
          >
            <PersonAddIcon sx={{ mr: 1 }} />
            <Typography
              sx={{ fontFamily: "MontserratMedium", fontSize: ".8vw" }}
            >
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
          <DataTable textFind={usersFiltered}></DataTable>
        </Box>
      </Box>
    </Box>
  );
};
