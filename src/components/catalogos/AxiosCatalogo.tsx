import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { alertaError, alertaExito } from "../genericComponents/Alertas";

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
        CreadoPor: localStorage.getItem("IdUsuario"),
        Rol: localStorage.getItem("Rol"),
      },
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      }
    )
    .then((r) => {
      alertaExito(() => {}, "Fecha de Captura Creada");
    })
    .catch((err) => {
      alertaError("Fecha de Captura denegada");
    });
};

export const listaGenericaCatalogos = (tabla: string) => {
  axios
    .post(
      process.env.REACT_APP_APPLICATION_BACK + "/api/list-table",
      {
        tabla: tabla,
      },
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      }
    )
    .then((r) => {
      //alertaExito(() => {}, "Fecha de Captura Creada");
    })
    .catch((err) => {
      alertaError("Lista No encontrada");
    });
};
