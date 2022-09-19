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

export const Usuarios = () => {

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
              <ModalCrearUsuario open={openModalUsuarios} handleClose={handleCloseModalUsuarios}/>

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
            onClick={() => setOpenModalUsuarios(true)}
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
          {/* <DataTable2 textFind={usersFiltered}></DataTable2> */}

        </Box>
      </Box>
    </Box>
  );
};
