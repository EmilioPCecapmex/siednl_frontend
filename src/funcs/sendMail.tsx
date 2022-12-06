import axios from "axios"

export const enviarMail = (mensaje: string, destinatario: string) => {
    axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/send-mail",
        {
          subject: "Alerta SIEDNL",
          message: mensaje,
          IdDestinatario: destinatario,
          IdRemitente: localStorage.getItem("IdUsuario")
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      ).then((r) => {
        if(r.status === 201){
            return true
        }
      }).catch((r) => {
        return false
      })
}