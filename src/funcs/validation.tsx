import axios from "axios";


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
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          localStorage.clear();
        }
      });
}


export const sessionValid = (jwt: string) => {
    return axios
      .post(
        "http://10.200.4.105:5000/api/verify",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            authorization: jwt,
          },
        }
      )
      .then((r) => {
        if (r.status === 200) {
          localStorage.setItem("jwtToken", jwt)
          localStorage.setItem("validation", "true");
          localStorage.setItem("IdCentral", r.data.data.IdUsuario)
          getUserDetails(r.data.data.IdUsuario)
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          localStorage.clear();
        }
      });
  };


