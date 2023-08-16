import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { alertaError, alertaExito } from "../alertas/Alertas";

export const createFechaDeCaptua = (
  Descripcion: string,
  Fecha1: any,
  Fecha2: any
) => {
  axios

    .post(
      process.env.REACT_APP_APPLICATION_BACK + "/api/create-fechaDeCaptura",
      {
        Descripcion: Descripcion,
        FechaDeCapturaFinal: Fecha2,
        FechaDeCapturaInicia: Fecha1,
        
        Modulo: Descripcion,
        IdUsuarioCreador: localStorage.getItem("IdUsuario"),
      },
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      }
    )
    .then((r) => {
      console.log("modulo: ", Descripcion);
      console.log("fecha1: ", Fecha1);
      console.log("fecha2: ", Fecha2);
      alertaExito(() => {}, "Fecha de Captura Creada");
    })
    .catch((err) => {
      alertaError("Fecha de Captura denegada");
    });
};
