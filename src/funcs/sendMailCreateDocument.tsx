import axios from "axios";

export const sendMailCreateDocument = (v: string, documentType: string) => {
  axios.post(
    "http://10.200.4.199:8000/api/send-email",
    {
      subject: documentType,
      message: `Se ha creado una nueva ${documentType}`,
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
