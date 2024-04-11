import axios from "axios";


export const getInstituciones = (setstate: Function) => {
    axios
    .get(process.env.REACT_APP_APPLICATION_LOGIN + "/api/lista-entidades", {
      params: {
        IdUsuario: localStorage.getItem("IdUsuario"),
        Rol: localStorage.getItem("Rol"),
      },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          let aux = r.data.data;
          console.log("Institucion: ", aux);

          aux.unshift({
            ClaveSiregob: null,
            ControlInterno: "",
            Direccion: "",
            EntidadPerteneceA: "",
            FechaCreacion: "",
            Id: "0",
            IdEntidadPerteneceA: "",
            IdTipoEntidad: "",
            IdTitular: null,
            Nombre: "TODOS",
            NombreTipoEntidad: "",
            Telefono: "",
            Titular: "",
            UltimaActualizacion: "",
          });
          setstate(aux);
        }
      });
  };
