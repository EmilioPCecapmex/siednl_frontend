import { Box } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { continueSession, logout, sessionUntil } from "../../funcs/validation";

export const TimerCounter = () => {
  const session = new Date(sessionUntil);
  const [actualDate, setActualDate] = useState(new Date());
  const [rest, setRest] = useState(0);
  const [messageSend, setMessageSend] = useState(true);


  setTimeout(() => {
    if (rest >= 0 || Number.isNaN(rest)) {
      setActualDate(new Date());
        setRest(session.getTime() - actualDate.getTime());
    }
  }, 1000);


  useEffect(() => {
    if(Math.floor(rest/60/1000) <= 2 && rest !== 0 && messageSend) {
      setMessageSend(false)
      alertaSession()
    }
  },[Math.floor(rest/60/1000) < 2])





  const renewSession = () => {
    
    axios
      .post(
        "http://10.200.4.105:5000/api/refresh-token",
        {
          refreshToken: localStorage.getItem("refreshToken"),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((r) => {
        if (r.data.token) {
          localStorage.setItem("jwtToken", r.data.token);
          continueSession().then(r => {
            setTimeout(() => {setMessageSend(true);}, 5000)
          })
        }
      })
      .catch((err) => {
        logout();
      });
  };

  const alertaSession = () => {
    return Swal.fire({
      title: "Limite de tiempo",
      text: `${localStorage.getItem(
        "NombreUsuario"
      )}, el tiempo de tu sesión esta a punto de expirar. ¿Deseas renovar el tiempo de sesión?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#000E4E",
      cancelButtonColor: "#A40000",
      confirmButtonText: "Renovar",
      cancelButtonText: "Salir",
    }).then((result) => {
      if (result.isConfirmed) {
        renewSession();
      } else {
        logout();
      }
    });
  };

  return (
    <Box
      sx={{
        fontFamily: "MontserratMedium",
        fontSize: ".8vw",
        width: "2vw",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#B70000",
      }}
    >
      {rest > 0
        ? Math.floor(rest / 1000 / 60).toString() +
          ":" +
          Math.floor((rest / 1000) % 60).toString()
        : "0:0"}
    </Box>
  );
};
