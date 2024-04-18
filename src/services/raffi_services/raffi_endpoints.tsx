import axios from "axios";
import { alertaError } from "../../components/genericComponents/Alertas";

export const listaRaffi = (setState: Function, estadorf: string) => {
  axios
    .get(process.env.REACT_APP_APPLICATION_BACK + "/api/list-raffis", {
      params: {
        IdUsuario: localStorage.getItem("IdUsuario"),
        IdEntidad: localStorage.getItem("IdEntidad"),
        Rol: localStorage.getItem("Rol"),
        Estado: estadorf || "TODOS",
      },
      headers: {
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    })
    .then((r) => {
      if (r.status === 200) {
        console.log("raffi: ", r.data.data);

        if (r.data.data.length === 0) {
          alertaError("El DOCUMENTO NO ESTA DISPONIBLE O NO HAY DOCUMENTOS PARA LLENAR");
        } else {
          setState(r.data.data);
        }
        //setStateFiltered(r.data.data)
      }
    })
    .catch((err) => {});
};
