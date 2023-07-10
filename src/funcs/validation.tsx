import axios from "axios";
import { IDatosAdicionales } from "../components/modalUsuarios/InterfazUsuario";

const params = new URLSearchParams(window.location.search);
const IdApp = params.get("IdApp");

export const sessionValid = () => {
  const jt = params.get("jwt") || "";
  const rft = params.get("rf") || "";

  return axios
    .post(
      process.env.REACT_APP_APPLICATION_LOGIN + "/api/verify",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          authorization: jt,
        },
      }
    )
    .then((r) => {
      if (r.status === 200) {
        localStorage.setItem("sUntil", r.data.expDateTime);
        localStorage.setItem("jwtToken", jt);
        localStorage.setItem("refreshToken", rft);
        localStorage.setItem("validation", "true");
        localStorage.setItem("IdCentral", r.data.data.IdUsuario);

        return getUserDetails(r.data.data.IdUsuario);
      }
    })
    .catch((error) => {
      if (error.response.status === 401) {
        localStorage.clear();
        return false;
      }
    });
};

export const getUserDetails = (idCentral: string) => {
  return axios
    .get(process.env.REACT_APP_APPLICATION_BACK + "/api/usuario", {
      params: {
        IdUsuario: idCentral,
      },
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("jwtToken") || "",
      },
    })
    .then((r) => {
      if (r.status === 200) {
        localStorage.setItem("IdUsuario", r.data.data.Id);
        localStorage.setItem(
          "NombreUsuario",
          r.data.data.Nombre.split(" ")[0] + " " + r.data.data.ApellidoPaterno
        );
        localStorage.setItem("FirstSignIn", r.data.data.PrimerInicioDeSesion);

        if (
          localStorage.getItem("IdInstitucion") === null ||
          localStorage.getItem("IdInstitucion") === null
        ) {
          localStorage.setItem("IdInstitucion", r.data.data.IdInstitucion);
        } else {
          localStorage.setItem(
            "IdInstitucion",
            localStorage.getItem("IdInstitucion") as string
          );
        }

        localStorage.setItem("Rol", r.data.data.Rol);

        return true;
      }
    })
    .catch((error) => {
      if (error.response.status === 401) {
        localStorage.clear();
      }
      getDataSolicitud(idCentral);
    });
};

const getDataSolicitud = (idSolicitud: string) => {
  axios
    .get(
      process.env.REACT_APP_APPLICATION_LOGIN +
        "/api/datosAdicionalesSolicitud",
      {
        params: {
          IdUsuario: idSolicitud,
          IdApp: IdApp,
        },
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("jwtToken") || "",
        },
      }
    )
    .then((r) => {
      if (r.status === 200) {
        let objetoDatosAdicionales = JSON.parse(
          r.data.data[0].DatosAdicionales
        );
        let CreadoPor = r.data.data[0].CreadoPor;
        siednlSignUp(idSolicitud, objetoDatosAdicionales, CreadoPor);
      }
    })
    .catch((error) => {
      localStorage.clear();
      return false;
    });
};

const siednlSignUp = (
  idUsrCentral: string,
  datosAdicionales: IDatosAdicionales,
  idCreadoPor: string
) => {
  axios
    .post(
      process.env.REACT_APP_APPLICATION_BACK + "/api/user-add",
      {
        IdUsuarioCentral: idUsrCentral,
        IdInstitucion: datosAdicionales.institution,
        Cargo: datosAdicionales.rol,
        IdRol: datosAdicionales.userType,
        CreadoPor: idCreadoPor,
      },
      { headers: { Authorization: localStorage.getItem("jwtToken") || "" } }
    )
    .then((r) => {
      if (r.status === 200) {
        window.location.reload();
      }
    });
};

export const continueSession = () => {
  // console.log(axios)
  return axios
    .post(
      process.env.REACT_APP_APPLICATION_LOGIN + "/api/verify",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("jwtToken") || "",
        },
      }
    )
    .then((r) => {
      if (r.status === 200) {
        
        localStorage.setItem("sUntil", r.data.expDateTime);
        localStorage.setItem("validation", "true");
        if (r.data.data.IdUsuario) {
          localStorage.setItem("IdCentral", r.data.data.IdUsuario);
          getUserDetails(r.data.data.IdUsuario);
        } else {
          getUserDetails(localStorage.getItem("IdCentral") as string);
        }
        console.log("ab");
        return true;
      }
    })
    .catch((error) => {
      if (error.response.status === 401) {
        // localStorage.clear();
        return false;
      }
    });
};

export const logout = () => {
  localStorage.clear();
  window.location.assign(`${process.env.REACT_APP_APPLICATION_FRONT_LOGIN}`);
};
