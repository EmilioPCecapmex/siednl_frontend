import axios from "axios";

export const buscador = (estado: any, Ins: any, setsate: Function, list: string) => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/" + list, {
        params: {
          IdUsuario: localStorage.getItem("IdUsuario"),
          IdEntidad: Ins || "",
          //IdEntidad: localStorage.getItem("IdEntidad"),
          Rol: localStorage.getItem("Rol"),
          Estado: estado || "",
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        //setAnioFiscalEdit(r.data.data[0]?.AnioFiscal);

        setsate(r.data.data);
        //setInstitucionesb("Todos")
      });
  };