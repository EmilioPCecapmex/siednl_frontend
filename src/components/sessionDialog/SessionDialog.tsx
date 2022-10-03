import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Box } from "@mui/material";
import { continueSession, logout, sessionUntil, sessionValid } from "../../funcs/validation";
import axios from "axios";

export const SessionDialog = () => {
  const session = new Date(sessionUntil);
  const [actualDate, setActualDate] = useState(new Date());
  const [rest, setRest] = useState(0);
  const [messageSend, setMessageSend] = useState(false);

    setTimeout(() => {
      setActualDate(new Date());
      setRest((session.getTime() - actualDate.getTime()) / 1000);

      if (rest < 0 && !messageSend) {
        alertaSession();
        setMessageSend(true)
      } else {
        setRest((session.getTime() - actualDate.getTime()) / 1000);
      }
    }, 1000);

    const renewSession = () => {
      axios.post("http://10.200.4.105:5000/api/refresh-token",
      {
          refreshToken: localStorage.getItem("refreshToken"),
      }).then((r) => {

        if(r.data.token)
        localStorage.setItem("jwtToken",r.data.token)
        continueSession()
  
      }).catch((err) => {
        logout();
      })
    }

  const alertaSession = () => {
    return Swal.fire({
      title: "Limite de tiempo",
      text: `${localStorage.getItem(
        "NombreUsuario"
      )}, tu tiempo de sesión ha terminado.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Renovar sesión",
      cancelButtonText: "Salir",
    }).then((result) => {
      if (result.isConfirmed) {
        renewSession();
      }else{
        logout();
      }
    });
  };

  return <> </>;
};
