import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);

    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});



export function alertaExito(fnc: Function, titulo = "Movimiento exitoso") {
  fnc(false);
  return Toast.fire({
    icon: "success",
    title: titulo,
    iconColor: "#af8c55",
    color: "#af8c55",
  });
}
export function alertaError(titulo = "Movimiento fallido") {
  Toast.fire({
    icon: "error",
    title: titulo,
    iconColor: "#af8c55",
    color: "#af8c55",
  });
}

export function alertaInfo(titulo: string) {
  return Toast.fire({
    icon: "info",
    title: titulo,
    iconColor: "#af8c55",
    color: "#af8c55",
  });
}

// export function alertaEliminar(fnc:Function){
//   fnc();
// }



export const alertaEliminar = (  confirmedfunction: Function, cancelfunction: Function, title= "¿Desea eliminar elemento?") => {
 return Swal.fire({
    title: title,
    //Estas a punto de eliminar un registro
    // text: ` ${cellValues.row.Nombre}`,
    icon: "question",
    showCancelButton: true,
   
    cancelButtonColor: "#af8c55",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Eliminar",
    confirmButtonColor: "#15212f",
  }).then((result) => {
    if (result.isConfirmed) {
      confirmedfunction();
    }else{
      cancelfunction();
    }

  });
};

