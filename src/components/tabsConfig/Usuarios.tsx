import {useEffect} from "react";
import { Grid, Tooltip, IconButton } from "@mui/material";
import {useNavigate} from "react-router-dom";
import IFrame from "./AgregarUsuarios";
import { GridCloseIcon } from "@mui/x-data-grid";

export const getToken = () => {
  let token = localStorage.getItem("jwtToken");
  return token;
};

export default function Usuarios({
  idUsuario,
  idApp,
  banderaCrea,
  showResumen,
}: {
  idUsuario: string;
  idApp: string;
  banderaCrea: string;
  showResumen: Function;
}) {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("Rol") === "Capturador") {
      navigate("../home");
    }
  }, []);

 


  return (
    <Grid container>
      <Grid container rowSpacing={3}>
        <Grid container item width={"100%"} display={"flex"} justifyContent={"flex-end"}
        sx={{height: "8vh"}}>
            <Tooltip title={"Salir"}>
            <IconButton
              onClick={() => showResumen()}
            >
              <GridCloseIcon sx={{
                fontSize: [30, 30, 30, 40, 40]
              }} />
            </IconButton>
          </Tooltip>
         
        </Grid>
        <Grid item
          sx={{
            width: "100vw",
            height: "85vh",
            backgroundColor: "#fff",
            borderRadius: 50,
            display: "flex",
            alignItems: "center",
          }}
        >

          {banderaCrea == "1" ?
            <IFrame
              source={
                "?jwt=" +
                getToken() +
                "&IdApp=" +
                idApp
              }
              baseURL={String(process.env.REACT_APP_APPLICATION_FRONT_LOGIN)}
            />
            :
            <IFrame
              source={
                "?jwt=" +
                getToken() +
                "&IdApp=" +
                idApp +
                "&idUsuarioModificado=" +
                idUsuario
              }
              baseURL={String(process.env.REACT_APP_APPLICATION_FRONT_LOGIN)}
            />
          }
        </Grid>
      </Grid>
    </Grid>
  );
};
