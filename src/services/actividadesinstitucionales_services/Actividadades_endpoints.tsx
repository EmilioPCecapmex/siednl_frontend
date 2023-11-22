import axios from "axios";
import { alertaError } from "../../components/genericComponents/Alertas";
// este no sirve y se va a borrar
export const listaActividadInstitucional = (setState: Function) => {
  axios
    .get(
      process.env.REACT_APP_APPLICATION_BACK +
        "/api/lista-actividadesinstitucionales",
      {
        params: {
          IdUsuario: localStorage.getItem("IdUsuario"),
          IdEntidad: localStorage.getItem("IdEntidad"),
          Rol: "Capturador",
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      }
    )
    .then((r) => {
      if (r.status === 200) {
        setState(r.data.data);
        //setStateFiltered(r.data.data)
      }
    })
    .catch((err) => {});
};

export const getListaAI = (setState: Function) => {
  axios
    .get(
      process.env.REACT_APP_APPLICATION_BACK +
        "/api/list-actividadesinstitucionales",
      {
        params: {
          IdUsuario: localStorage.getItem("IdUsuario"),
          IdEntidad: localStorage.getItem("IdEntidad"),
          Rol: localStorage.getItem("Rol"),
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      }
    )
    .then((r) => {
      if (r.status === 200) {
        setState(r.data.data);
        //setStateFiltered(r.data.data)
      }
    })
    .catch(() => {
      setState([]);
      alertaError("Error al obtener los datos");
    });
};
