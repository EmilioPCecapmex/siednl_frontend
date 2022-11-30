import React, {  useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { LateralMenu } from "../../components/lateralMenu/LateralMenu";
import {
  Button,
  Typography,
  Input,
} from "@mui/material";
import { Header } from "../../components/header/Header";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DataTable from "../../components/datatable/DataTable";
import ModalCrearUsuario from "../../components/modalUsuarios/ModalCrearUsuario";
import AddLinkIcon from '@mui/icons-material/AddLink';
import ModalVincularUsuario from "../../components/modalUsuarios/ModalVincularUsuario";
import { useNavigate } from "react-router-dom";

export const Usuarios = () => {
  const navigate = useNavigate();


  useEffect(() => {
    if(localStorage.getItem("Rol") === "Capturador"){
     navigate("../home")
    }
     }, [])

  const [openModalUsuarios, setOpenModalUsuarios] = useState(false);
  const [openModalVincularUsuario, setOpenModalVincularUsuario] = useState(false);

  const [actualizarDatos, setActualizarDatos] = useState(0)


  const handleCloseModalUsuarios = () => {
    setOpenModalUsuarios(false);
    setActualizarDatos(actualizarDatos + 1);
  };

  const handleCloseModalVincularUsuario = () => {
    setOpenModalVincularUsuario(false);
  };

  const [usersFiltered, setUsersFiltered] = useState("");

  const dataFilter = (text: string) => {
    setUsersFiltered(text);
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "grid",
        gridTemplateColumns: '1fr 13fr',
        backgroundColor: "#F2F2F2",
      }}
    >
      <LateralMenu selection={6} />
      <Header
        details={{
          name1: "Inicio",
          path1: "../home",
          name2: "Configuración",
          path2: "../settings",
          name3: "Usuarios",
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          height: "92%",
          mt: "8vh",
          flexWrap: "wrap",
        }}
      >
        <ModalCrearUsuario
        title="Crear Usuario"
          open={openModalUsuarios}
          handleClose={handleCloseModalUsuarios}
        />

<ModalVincularUsuario
        title="Vincular Usuario"
          open={openModalVincularUsuario}
          handleClose={handleCloseModalVincularUsuario}
        />

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

          <Box>
          <Button
            variant="contained"
            disabled={localStorage.getItem("Rol") !== "Administrador" ? true: false}
            sx={{
              mr: 3,
              backgroundColor: "#15212F",
              ":hover": {
                backgroundColor: "#ccc",
              },
            }}
            onClick={() => setOpenModalVincularUsuario(true)}
          >
            <AddLinkIcon sx={{ mr: 1 }} />
            <Typography
              sx={{ fontFamily: "MontserratMedium", fontSize: ".8vw" }}
            >
              Vincular
            </Typography>
          </Button>  
          <Button
            variant="contained"
            disabled={localStorage.getItem("Rol") === "Capturador" ? true: false}
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
          <DataTable textFind={usersFiltered} actualizar={actualizarDatos}></DataTable>
        </Box>
      </Box>
    </Box>
  );
};
