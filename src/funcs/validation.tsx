import axios from "axios";

export let sessionUntil = '';

const params = new URLSearchParams(window.location.search);

export const getUserDetails = (idCentral: string) => {
  return axios
      .get(
        "http://10.200.4.105:8000/api/usuario",
        {
          params: {
            IdUsuario:  idCentral
          },
          headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("jwtToken") || "",
        }
      }
      )
      .then((r) => {
        if (r.status === 200) {
          localStorage.setItem("IdUsuario", r.data.data.Id)    
          localStorage.setItem("NombreUsuario",  r.data.data.Nombre.split(' ')[0] + ' ' + r.data.data.ApellidoPaterno)
          localStorage.setItem("NombreInstitucion", r.data.data.NombreInstitucion)
          localStorage.setItem("Rol", r.data.data.Rol)

        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          localStorage.clear();
        }
      });
}


export const sessionValid = () => {
  const jt = params.get("jwt") || "";

    return axios
      .post(
        "http://10.200.4.105:5000/api/verify",
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
          sessionUntil = r.data.expDateTime;
          localStorage.setItem("jwtToken", jt)
          localStorage.setItem("validation", "true");
          localStorage.setItem("IdCentral", r.data.data.IdUsuario)
          getUserDetails(r.data.data.IdUsuario)
          return true
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          localStorage.clear();
          return false
        }
      });
  };


export const continueSession = () => {
  return axios
      .post(
        "http://10.200.4.105:5000/api/verify",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem('jwtToken') || "",
          },
        }
      )
      .then((r) => {
        if (r.status === 200) {
          sessionUntil = r.data.expDateTime;
          localStorage.setItem("validation", "true");
          localStorage.setItem("IdCentral", r.data.data.IdUsuario);
          getUserDetails(r.data.data.IdUsuario);
          return true
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          localStorage.clear();
          return false
        }
      });
  };


