import axios from "axios";

export const listaActividadInstitucional = (setState: Function) => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/lista-actividadesinstitucionales", {
        params: {
          IdUsuario: localStorage.getItem("IdUsuario"),
          IdInstitucion: localStorage.getItem("IdInstitucion"),
          Rol: "Capturador",
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          setState(r.data.data);
          //setStateFiltered(r.data.data)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };