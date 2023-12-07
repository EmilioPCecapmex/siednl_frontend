import axios from "axios";
import {
  alertaError,
  alertaExito,
  alertaInfo,
} from "../../genericComponents/Alertas";

export const getListaPae = (anio: string, setState: Function) => {
  axios
    .get(process.env.REACT_APP_APPLICATION_BACK + "/api/list-pae", {
      params: { Anio: anio },
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    })
    .then((r) => {
      setState(r.data.data);
      if (r.data.data.length === 0) {
        alertaInfo("No se encontraron registros");
      }
    })
    .catch((err) => {
      alertaError(
        "Lo sentimos, pero no pudimos completar tu solicitud en este momento. Por favor, inténtalo de nuevo más tarde."
      );
    });
};

export const creaPAE = (
  Nombre: string,
  Ruta: string,
  Anio: string,
  PerteneceA: string
) => {
  console.log("ruta", Ruta);

  axios
    .post(
      process.env.REACT_APP_APPLICATION_BACK + "/api/create-pae",
      {
        Nombre: Nombre,
        Tipo: "pdf",
        Ruta: Ruta,
        Anio: Anio,
        PerteneceA: PerteneceA,
        CreadoPor: localStorage.getItem("IdUsuario"),
      },
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      }
    )
    .then((r) => {
      alertaExito(() => {}, r.data.data.message);
    })
    .catch((err) => {
      alertaError(err.response.data);
    });
};

export const modifyPAE = (
  CampoModificar: string,
  Campo: string,
  Id: string
) => {
  axios
    .get(process.env.REACT_APP_APPLICATION_BACK + "/api/modify-pae", {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
      params: {
        CampoModificar: CampoModificar,
        Campo: Campo,
        IdPAE: Id,
      },
    })
    .then(() => {
      alertaExito(() => {}, "Fecha actualizada correctamente");
    })
    .catch(() => {
      alertaError("Hubo un error al actualizar la fecha");
    });
};

export const deletePAE = (id:string) => {
  axios
    .delete(process.env.REACT_APP_APPLICATION_BACK + "/api/delete-pae", {
      data: {
        Id: id,
        ModificadoPor: localStorage.getItem("IdUsuario"),
      },
      headers: {
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    })
    .then((r) => {
      alertaExito(() => {}, "Documento eliminado correctamente");
    })
    .catch((err) => {
      alertaError("Error al eliminar documento.");
});
};

export const guardarDoc = (
  archivo: { archivo: File; nombreArchivo: string },
  perteneceA: string
) => {
  const url = new File([archivo.archivo], archivo.nombreArchivo);
  let ruta = "/PAE/" + perteneceA + "/";
  ruta = ((process.env.REACT_APP_DOC_ROUTE || "") + ruta).trim();

  let dataArray = new FormData();
  dataArray.append("ROUTE", `${ruta}`);
  dataArray.append("CN", "true");
  dataArray.append("ADDROUTE", "true");
  dataArray.append("FILE", url);
  dataArray.append("TOKEN", localStorage.getItem("jwtToken") || "");

  axios
    .post(
      process.env.REACT_APP_APPLICATION_FILES + "/api/ApiDoc/SaveFile",
      dataArray,
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      }
    )
    .then(({ data }) => {
      if (data.SUCCESS) {
        let auxPerteneceA = perteneceA.split("/");
        creaPAE(
          data.RESPONSE.NOMBREARCHIVO,
          ruta,
          auxPerteneceA[0],
          auxPerteneceA[1]
        );

        alertaExito(() => {}, "Documento cargado.");
      }else{
        alertaError("Error al cargar documento.");
      }
    })
    .catch((e) => {
      alertaError("Error al cargar documento.");
    });
};
