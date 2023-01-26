import axios from "axios";

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
