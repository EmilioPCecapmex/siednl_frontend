import axios from "axios";

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
  return axios

    .post(
      process.env.REACT_APP_APPLICATION_LOGIN + "/api/userapp-detail",
      {
        IdUsuario: IdCentral,
        IdApp: IdApp,
      },
      {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("jwtToken") || "",
        },
      }
    )
    .then(({ data, status }) => {
      console.log("se hizo un match");

      if (status === 200) {
        localStorage.setItem("Menus", JSON.stringify(data.menus[0]));
        localStorage.setItem("IdUsuario", data.data.Id);
        localStorage.setItem(
          "NombreUsuario",
          data.data.Nombre.split(" ")[0] + " " + data.data.ApellidoPaterno
        );
        //localStorage.setItem("FirstSignIn", data.data.PrimerInicioDeSesion);

        if (localStorage.getItem("IdEntidad") === null ) {
          localStorage.setItem("IdEntidad", data.data.IdEntidad);
        } 
        // else {
        //   localStorage.setItem(
        //     "IdEntidad",
        //     localStorage.getItem("IdEntidad") as string
        //   );
        // }

        if (localStorage.getItem("Entidad") === null ) {
          localStorage.setItem("Entidad", data.entidades[0][0].Nombre);
        } 
        // else {
        //   localStorage.setItem(
        //     "Entidad",
        //     localStorage.getItem("Entidad") as string
        //   );
        // }

        localStorage.setItem("Rol", data.roles[0][0].Nombre);
        localStorage.setItem("IdRol", data.roles[0][0].Id);
        return true;
      }
    })
    .catch((error) => {
      if (error.response.status === 401) {
        localStorage.clear();
      }
    });
};

export const continueSession = () => {
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
