import axios from "axios";

export const sendMailCustomMessage = (
  v: string,
  mensaje: string,
  documentType: string
) => {
  axios.post(
    process.env.REACT_APP_APPLICATION_CORREO + "/api/send-email",
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
  const objeto = {
    mensaje: mensaje,
    documentType: documentType,
  };
  let dataArray = new FormData();
  dataArray.append("referencia", "007");
  dataArray.append("subject", `Avances con la ${documentType}`);
  dataArray.append("data", JSON.stringify(objeto));
  dataArray.append("to[0]", v);
  dataArray.append("to[1]", v);
  //dataArray.append("to",localStorage.getItem("IdUsuario") || "" )

  axios
    .post(
      process.env.REACT_APP_APPLICATION_CORREO + "/api/serviciocorreo",
      dataArray,

      {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      }
    )
    .catch((err) => {});
};
