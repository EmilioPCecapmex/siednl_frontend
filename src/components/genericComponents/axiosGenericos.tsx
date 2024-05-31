import axios from "axios";


 export const soliModyNoty = (v: string, coment: string, titulo: string, Id: string) => {
 
  
    axios.post(
      process.env.REACT_APP_APPLICATION_BACK + "/api/soli-notif",
      {
        IdUsuarioDestino: v,
        Titulo: titulo,
        Mensaje: coment,
        CreadoPor: localStorage.getItem("IdUsuario"),
        IdDocumento: Id
      },
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      }
    );
  };

  export const enviarNotificacionRol = (titulo: string, coment: string, Id: string, Rol: string[], IdEntidad: string) => {
   
    axios.post(
      process.env.REACT_APP_APPLICATION_BACK + "/api/create-notif",
      {
        Titulo: titulo,
        Mensaje: coment,
        IdDocumento: Id,
        Rol: Rol,
        IdEntidad: IdEntidad || localStorage.getItem("IdEntidad"),
        IdApp: localStorage.getItem("IdApp"),
        CreadoPor: localStorage.getItem("IdUsuario"),
        
      },
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      }
    );
  };


   export const create_coment_mir = (id: string, coment: string, documento: string) => {
    return axios.post(
      process.env.REACT_APP_APPLICATION_BACK + "/api/create-coment-mir",
      {
        IdMir: id,
        Coment: coment,
        CreadoPor: localStorage.getItem("IdUsuario"),
        MIR_MA: documento,
      },
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      }
    );
  };

  
export const obtenerComentarios = async (id: string,  state: Function) => {
  console.log("entre");
  
    try {
      const response = await axios.get(
        process.env.REACT_APP_APPLICATION_BACK + "/api/get-coment-mir",
        {
          params: {
            IdMir: id,
          },
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      );
  
      state(response.data.data);
      console.log("response.data.data: ",response.data.data);
      
    } catch (error) {
      console.log("entre aqui");
      
      console.error("Error al obtener comentarios:", error);
      // Puedes manejar el error según tus necesidades
    }
  };

  export const getObtenerUsuariosRol = (Rol: string,) => {
    axios.post(
      process.env.REACT_APP_APPLICATION_BACK + "/api/list-Usuarios-notif",
      {
        Rol: Rol,
        IdEntidad: localStorage.getItem("IdEntidad"),
        IdApp: localStorage.getItem("IdApp"),
      },
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      }
    )
    .then((r) => {
     
    
    })
    .catch((err) => {
     
    });
  };

  export const getMovimientosTrazabilidad = (Id: string, state: Function) => {
    axios.get(
      process.env.REACT_APP_APPLICATION_BACK + "/api/list-trazabilidad",
      {
        params: {
          Id: Id,
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      }
    )
    .then((r) => {
      
      
      state(r.data.data)
    
    })
    .catch((err) => {
     
    });
  };

  export const verNotificacion = (IdNoti: string, state1: Function, state2: Function
    ) => {
    axios.post(
      process.env.REACT_APP_APPLICATION_BACK + "/api/ver-notif",
      {
        IdNoti: IdNoti,
        IdUsuario: localStorage.getItem("IdUsuario"),
        
      },
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      }
    )
    .then((r) => {
      if (r.status === 200) {
        if(r.data.data !== "" || r.data.data !== undefined ){}
        obtenerNotificaciones(state1, state2);
        state1([]);
      }
    })
    .catch((err) => {
      if (err.response.status === 409) {
        state2(true);
        state1([]);
      }
    });
  };

 export const obtenerNotificaciones = (state1: Function, state2: Function) => {
    axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/list-notif",
        {
          IdUsuarioDestino: localStorage.getItem("IdUsuario"),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        if (r.status === 200) {
          if (r.data.data.length >= 1) {
            state1(r.data.data);
          } else {
            state2(false);
          }
        }
      })
      .catch((e) => {
        return null;
      });
  };