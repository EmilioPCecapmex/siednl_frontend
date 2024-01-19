import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { alertaError, alertaExito } from "../genericComponents/Alertas";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 5000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const createFechaDeCaptua = (
  Descripcion: string,
  Fecha1: string,
  Fecha2: string,
  state: Function
) => {
  axios

    .post(
      process.env.REACT_APP_APPLICATION_BACK + "/api/create-fechaDeCaptura",
      {
        Descripcion: Descripcion,
        FechaCapturaInicio: Fecha1,
        FechaCapturaFinal: Fecha2,
        Modulo: Descripcion,
        CreadoPor: localStorage.getItem("IdUsuario"),
        Rol: localStorage.getItem("Rol"),
      },
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      }
    )
    .then((r) => {
      alertaExito(() =>(state()), "Fecha de Captura Creada");
    })
    .catch((err) => {
      alertaError("Fecha de Captura denegada");
    });
};

export const listaGenericaCatalogos = (tabla: string, setstate1: Function) => {
 

  axios
    .post(
      process.env.REACT_APP_APPLICATION_BACK + "/api/list-table",
      {
        tabla: tabla.toLocaleLowerCase(),
      },
      {
        // headers: {
        //   Authorization: localStorage.getItem("jwtToken") || "",
        // },
      }
    )
    .then((r) => {
      //alertaExito(() => {}, "Fecha de Captura Creada");
  
      setstate1(r.data.data);
    })
    .catch((err) => {
      setstate1(null);
      alertaError("Lista No encontrada");
    });
};



export const deletePorCatalogoTodos = (Id: string, tabla: string, UpdateInfo: Function) => {
  if (tabla === "ped") {
    axios
      .delete(process.env.REACT_APP_APPLICATION_BACK + "/api/delete-ped", {
        data: {
          IdPED: Id,
          ModificadoPor: localStorage.getItem("IdUsuario"),
          Rol: localStorage.getItem("Rol"),
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        //actualizado();
        alertaExito(UpdateInfo, "Registro Eliminado")
        
      })
      .catch((err) =>
        Toast.fire({
          icon: "error",
          title: "Permisos denegados.",
        })
      );
  } else if (tabla === "programas presupuestarios") {
    axios
      .delete(
        process.env.REACT_APP_APPLICATION_BACK +
          "/api/delete-programaPresupuestario",
        {
          data: {
            IdProgramaPresupuestario: Id,
            ModificadoPor: localStorage.getItem("IdUsuario"),
            Rol: localStorage.getItem("Rol"),
          },
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        //actualizado();
        alertaExito(UpdateInfo, "Registro Eliminado")
      })
      .catch((err) =>
        Toast.fire({
          icon: "error",
          title: "Permisos denegados.",
        })
      );
  } else {
    axios
      .delete(process.env.REACT_APP_APPLICATION_BACK + "/api/delete-catalogo", {
        data: {
          Id: Id,
          Tabla: tabla,
          ModificadoPor: localStorage.getItem("IdUsuario"),
          Rol: localStorage.getItem("Rol"),
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        //

        //actualizado();
        alertaExito(UpdateInfo, "Registro Eliminado")
      })
      .catch((err) =>
        Toast.fire({
          icon: "error",
          title: "Permisos denegados.",
        })
      );
  }
  //handleCloseDel();
};

export const  CreatePorCatalogoProgramap = (descripcion: string, institution: string, descripcionConac: string, descripcionConsecutivo: string, state: Function   ) => {
    axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK +
          "/api/create-programaPresupuestario",
        {
          NombrePrograma: descripcion,
          IdEntidad: institution,
          CreadoPor: localStorage.getItem("IdUsuario"),
          Rol: localStorage.getItem("Rol"),
          Conac: descripcionConac,
          Consecutivo: descripcionConsecutivo,
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        alertaExito(() =>(state()),"Programa Presupuestario")
        //alertaError("Lista No encontrada")
        //actualizado();
      })
      .catch((err) =>
      alertaError("Lista No encontrada")
      );
  };
// Por ahora no se utliza
export const CreatePorCatalogo = (descripcion: string, tabla: string, state: Function, Id: string, Tipob: String, Tipo: String) => {

  
  
  axios
    .post(
      process.env.REACT_APP_APPLICATION_BACK + "/api/create-catalogo",
      {
        Descripcion: descripcion,
        Tabla: tabla.toLocaleLowerCase(),
        CreadoPor: localStorage.getItem("IdUsuario"),
        Rol: localStorage.getItem("Rol"),
        Idb: Number(Id) || 0,
        Tipob: Tipob || "",
        Tipo: Tipo || "",
      },
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      }
    )
    .then((r) => {
      

      alertaExito(() =>(state()),"Catalogo creado")

     
    })
    .catch((err) =>
      alertaError("Dato no agregado")
    );
};

export const ModifyPorCatalogo = (Id: string, tabla: string, nuevaDescripcion: string, state: Function) => {
    if (tabla === "PROGRAMAS PRESUPUESTARIOS") {
      axios
        .put(
          process.env.REACT_APP_APPLICATION_BACK +
            "/api/modify-programaPresupuestario",
          {
            IdProgramaPresupuestario: Id,
            NuevoProgramaPresupuestario: nuevaDescripcion,
            //IdEntidad: institution,
            ModificadoPor: localStorage.getItem("IdUsuario"),
            Rol: localStorage.getItem("Rol"),
          },
          {
            headers: {
              Authorization: localStorage.getItem("jwtToken") || "",
            },
          }
        )
        .then((r) => {
          //actualizado();
          alertaExito(() =>(state()),"Catalogo creado")
          
        })
        .catch((err) =>
          Toast.fire({
            icon: "error",
            title: "Permisos denegados",
          })
        );
    } else {
      axios
        .put(
          process.env.REACT_APP_APPLICATION_BACK + "/api/modify-catalogo",
          {
            Id: Id,
            NuevaDescripcion: nuevaDescripcion,
            Tabla: tabla,
            ModificadoPor: localStorage.getItem("IdUsuario"),
            Rol: localStorage.getItem("Rol"),
          },
          {
            headers: {
              Authorization: localStorage.getItem("jwtToken") || "",
            },
          }
        )
        .then((r) => {
        

          alertaExito(() =>(state()),"Catalogo Modificado")
          
        })
        .catch((err) =>
          Toast.fire({
            icon: "error",
            title: "Permisos denegados",
          })
        );
    }
  }; 
