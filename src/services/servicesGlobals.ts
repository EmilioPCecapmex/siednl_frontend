import axios from "axios";
import { alertaError } from "../components/genericComponents/Alertas";

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
        console.log("r.data.data2: ",r.data.data);
        setsate(r.data.data);
        if (r.data.data.length === 0) {
          alertaError(
            "El DOCUMENTO NO ESTA DISPONIBLE O NO HAY DOCUMENTOS PARA LLENAR"
            
          );
          setsate(r.data.data);
        } else {
          setsate(r.data.data);
        }
        //setInstitucionesb("Todos")
      });
  };