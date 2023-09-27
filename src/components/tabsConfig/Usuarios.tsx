import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { LateralMenu } from "../lateralMenu/LateralMenu";
import { Button, Typography, Input } from "@mui/material";
import { Header } from "../header/Header";
import SearchIcon from "@mui/icons-material/Search";
import DataTable from "../datatable/DataTable";
import ModalCrearUsuario from "../modalUsuarios/ModalCrearUsuario";
import AddLinkIcon from "@mui/icons-material/AddLink";
import ModalVincularUsuario from "../modalUsuarios/ModalVincularUsuario";
import { Route, Routes, useNavigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import DialogSolicitudes from "../solicitudes/DialogSolicitudes";
import IFrame from "./AgregarUsuarios";

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
        <Grid container item width={"100%"} display={"flex"} justifyContent={"flex-end"}>
          <Grid item>
            <Button
              sx={{
                // backgroundColor: "#15212f",
                backgroundColor: "#912c34",
                color: "white",
                "&&:hover": {
                  backgroundColor: "rgba(47, 47, 47, 0.4)",
                  color: "#000",
                },
                //fontSize: "90%",
                borderRadius: "0.8vh",
                textTransform: "capitalize",
                fontSize: "50%",
                "@media (min-width: 480px)": {
                  fontSize: "70%",
                },

                "@media (min-width: 768px)": {
                  fontSize: "80%",
                },
              }}
              onClick={() => showResumen()}
            >
              x
            </Button>
          </Grid>
        </Grid>
        <Grid item
          sx={{
            width: "100vw",
            height: "82vh",
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
