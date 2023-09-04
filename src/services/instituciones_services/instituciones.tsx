import axios from "axios";


export const getInstituciones = (setstate: Function) => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/usuarioInsitucion", {
        params: {
          IdUsuario: localStorage.getItem("IdUsuario"),
          Rol: localStorage.getItem("Rol")
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
            setstate(r.data.data);
        }
      });
  };