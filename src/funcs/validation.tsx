import axios from "axios";
import { useEffect, useState } from "react";
import { IDatosAdicionales } from "../components/modalUsuarios/InterfazUsuario";
import { useActionData } from "react-router-dom";

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

export const getUserDetails = (IdCentral: string) => {
  console.log(IdCentral);
  console.log("IdApp: ",IdApp)
  console.log("params: ",params)
  
  return axios
  
  
  .post(process.env.REACT_APP_APPLICATION_LOGIN + "/api/userapp-detail", 
       {
        IdUsuario: IdCentral,
        IdApp: IdApp,
      },{
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("jwtToken") || "",
      },
    })
    .then(({data,status}) => {
      if (status === 200) {
        localStorage.setItem("IdUsuario", data.data.Id);
        localStorage.setItem(
          "NombreUsuario",
          data.data.Nombre.split(" ")[0] + " " + data.data.ApellidoPaterno
        );
        //localStorage.setItem("FirstSignIn", data.data.PrimerInicioDeSesion);

        if (
          localStorage.getItem("IdEntidad") === null ||
          localStorage.getItem("IdEntidad") === null
        ) {
          localStorage.setItem("IdEntidad", data.data.IdEntidad);
        } else {
          localStorage.setItem(
            "IdEntidad",
            localStorage.getItem("IdEntidad") as string
          );
        }

        if (
          localStorage.getItem("Entidad") === null ||
          localStorage.getItem("Entidad") === null
        ) {
          localStorage.setItem("Entidad", data.data.Entidad);
        } else {
          localStorage.setItem(
            "Entidad",
            localStorage.getItem("Entidad") as string
          );
        }

        localStorage.setItem("Rol", data.roles[0][0].Nombre);

        return true;
      }
    })
    .catch((error) => {
      if (error.response.status === 401) {
        localStorage.clear();
      }
      
    });
};



// const siednlSignUp = (
//   idUsrCentral: string,
//   datosAdicionales: IDatosAdicionales,
//   idCreadoPor: string
// ) => {
//   axios
//     .post(
//       process.env.REACT_APP_APPLICATION_BACK + "/api/user-add",
//       {
//         IdUsuarioCentral: idUsrCentral,
//         IdEntidad: datosAdicionales.institution,
//         Cargo: datosAdicionales.rol,
//         IdRol: datosAdicionales.userType,
//         CreadoPor: idCreadoPor,
//       },
//       { headers: { Authorization: localStorage.getItem("jwtToken") || "" } }
//     )
//     .then((r) => {
//       if (r.status === 200) {
//         window.location.reload();
//       }
//     });
// };

export const continueSession = () => {
  console.log(localStorage.getItem("jwtToken"))
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
