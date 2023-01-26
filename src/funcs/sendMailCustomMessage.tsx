import axios from "axios";
import { useState } from "react";
import { json } from "stream/consumers";

export const sendMailCustomMessage = (
  v: string,
  mensaje: string,
  documentType: string
) => {
  axios.post(
    "http://10.200.4.199:8000/api/send-email",
    {
      subject: `  Avances con la ${documentType}`,
      message: `${mensaje} ${documentType}`,
      IdDestinatario: v,
      IdRemitente: localStorage.getItem("IdUsuario"),
    },
    {
      headers: {
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    }
  );
};


export const sendMail = (v: string, mensaje: string, documentType: string) => {

  const objeto= ({
    mensaje: mensaje,
    documentType: documentType,
  });
  let dataArray = new FormData();
  dataArray.append("referencia","007")
  dataArray.append("subject",`Avances con la ${documentType}`)
  dataArray.append("data",JSON.stringify(objeto))
  dataArray.append("to[0]",v)
  dataArray.append("to[1]",v)
  //dataArray.append("to",localStorage.getItem("IdUsuario") || "" )

  console.log("soy el objeto",objeto);
  console.log("soy v", v);
  
  axios
    .post(
      "http://10.200.4.105:8001/api/serviciocorreo",dataArray,
    
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      }

    )
    .catch((err) => {
      console.log(err);
    });
    
    
};
