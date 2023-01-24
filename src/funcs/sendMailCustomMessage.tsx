import axios from "axios";
import { json } from "stream/consumers";

export const sendMailCustomMessage = (v: string,mensaje: string, documentType: string, ) => {
  axios.post(
    "http://10.200.4.199:8000/api/send-email",
    {
      subject: `  Avances con la ${documentType}`,
      message: `${mensaje} ${documentType}`,
      //"d4b35a67-5eb9-11ed-a880-040300000000" gonzzo
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

export const sendMail = (v: string,mensaje: string, documentType: string, ) => {
  axios.post(
    "http://10.200.4.105:8001/api/serviciocorreo",
    {
      referencia: "009",
      subject: `  Avances con la ${documentType}`,

      data: JSON.parse(mensaje + documentType)
      
      `${mensaje} ${documentType}`,//json
      //"d4b35a67-5eb9-11ed-a880-040300000000" gonzzo
      IdDestinatario: v,// Aqui va un array
      IdRemitente: localStorage.getItem("IdUsuario"),//Aqui tambien es un array
    },
    {
      headers: {
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    }
  );
};
