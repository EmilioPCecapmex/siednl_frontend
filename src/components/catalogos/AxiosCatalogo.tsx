import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { alertaError, alertaExito } from "../alertas/Alertas";

export const createFechaDeCaptua = (
  Descripcion: string,
  Fecha1: string,
  Fecha2: string
) => {
  axios

    .post(
      process.env.REACT_APP_APPLICATION_BACK + "/api/create-fechaDeCaptura",
      {
        Descripcion: Descripcion,
        FechaCapturaInicio: Fecha1,
        FechaCapturaFinal: Fecha2,
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
