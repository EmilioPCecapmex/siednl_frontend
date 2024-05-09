import axios from "axios";
import { alertaError, alertaExito } from "../components/genericComponents/Alertas";

export const buscador = (estado: any, Ins: any, setsate: Function, list: string, setsate2: Function, url: string) => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/" + list, {
        params: {
          IdUsuario: localStorage.getItem("IdUsuario"),
          IdEntidad: Ins || "TODOS"|| "",
          Rol: localStorage.getItem("Rol"),
          Estado: estado || "TODOS"|| "",
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        //setAnioFiscalEdit(r.data.data[0]?.AnioFiscal);
        console.log("url: ",url);
        
        if(localStorage.getItem("IdNotificacion") || localStorage.getItem("IdNotificacion") !== ""){
          const id = localStorage.getItem("IdNotificacion")
          setsate(r.data.data.filter((x: any) => x.Id.toLowerCase().includes(id || ""))); 
          //localStorage.setItem("IdNotificacion", "")
        }else{
          setsate(r.data.data);
          setsate2("")
        }
 
        // if (r.data.data.length === 0) {
        //   alertaError(
        //     "El DOCUMENTO NO ESTA DISPONIBLE O NO HAY DOCUMENTOS PARA LLENAR"
            
        //   );
        //   setsate(r.data.data);
        //   setsate2("")
        // } else {
        //   setsate(r.data.data);
        //   setsate2("")
        // }
      });
  };

export const validaFechaCaptura = (setValidaFecha:Function,setTitle:Function, modulo:string ) => {
    axios
      .get(
        process.env.REACT_APP_APPLICATION_BACK + "/api/valida-fechaDeCaptura",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("jwtToken") || "",
          },
          params: {
            Rol: localStorage.getItem("Rol"),
            Modulo: modulo,
          },
        }
      )
      .then((r) => {
        if (r.data.data.valida === "true") {
          setValidaFecha(true);
          setTitle("EDITAR");
        } else {
          setValidaFecha(false);
          setTitle("FECHA CAPTURA FINALIZADA");
        }
      })
      .catch((err) => {});
  };

 export const downloadMIR = (
    anio: string,
    inst: string,
    prog: string,
    mir: string
  ) => {
    axios

      .post(
        process.env.REACT_APP_APPLICATION_FILL + "/api/fill_mir",
        JSON.parse(mir),
        {
          responseType: "blob",
        }
      )
      .then((r) => {
        alertaExito(() => {}, "La descarga comenzara en un momento.");

        const href = URL.createObjectURL(r.data);

        // create "a" HTML element with href to file & click
        const link = document.createElement("a");
        link.href = href;
        link.setAttribute(
          "download",
          "MIR_" + anio + "_" + inst + "_" + prog + ".xlsx"
        ); //or any other extension
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      })
      .catch((err) => {
        alertaError("Error al intentar descargar el documento.");
      });
  };

