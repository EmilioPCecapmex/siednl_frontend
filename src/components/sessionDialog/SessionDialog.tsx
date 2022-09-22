import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Box } from "@mui/material";
import { logout, sessionUntil } from "../../funcs/validation";


export const SessionDialog = () => {

    const session = new Date(sessionUntil);
    const [actualDate, setActualDate] = useState(new Date())
    const rest = session.getTime()  - actualDate.getTime() 
    const sessionRemains = Math.round((rest / 1000 / 60 )).toString() + ":" + Math.round((rest / 1000 % 60));

  
    useEffect(() => {
        
        setTimeout(() => {
            if(parseFloat(sessionRemains) > 0){
                setActualDate(new Date())

            }else if(parseFloat(sessionRemains) <= 0 ){
                alertaSession()
            }
          }, 1000);
    }, [actualDate])
    


  const alertaSession = () => {
    return Swal.fire({
      title: "Limite de tiempo",
      text: `${localStorage.getItem("NombreUsuario")}, tu tiempo de sesión ha terminado.` ,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Renovar sesión",
      cancelButtonText: "Salir"
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
      }else{
        logout();
      }
    });
  };

  return <> </>;
};
