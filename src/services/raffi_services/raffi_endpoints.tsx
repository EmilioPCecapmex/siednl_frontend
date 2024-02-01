import axios from "axios";

export const listaRaffi = (setState: Function, estadorf: string) => {
  axios
    .get(process.env.REACT_APP_APPLICATION_BACK + "/api/list-raffis", {
      params: {
        IdUsuario: localStorage.getItem("IdUsuario"),
        IdEntidad: localStorage.getItem("IdEntidad"),
        Rol: localStorage.getItem("Rol"),
        Estado: estadorf || "", 
      },
      headers: {
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    })
    .then((r) => {
      if (r.status === 200) {
        console.log(r.data.data);
        
        setState(r.data.data);
        //setStateFiltered(r.data.data)
      }
    })
    .catch((err) => {
    });
};
