import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { sendMail } from "../../funcs/sendMailCustomMessage";
import { queries } from "../../queries";

export let errores: string[] = [];

export default function ModalEnviarMA({
  open,
  handleClose,
  MA,
  MIR,
  IdMA,
  IdMIR,
  showResume,
}: {
  open: boolean;
  handleClose: Function;
  MA: string;
  MIR: string;
  IdMA: string;
  IdMIR: string;
  showResume: Function;
}) {
  const [comment, setComment] = useState("");
  const [userXInst, setUserXInst] = useState<Array<IIUserXInst>>([]);
  const [newComent, setNewComent] = React.useState(false);

  const enviarMensaje = "Se ha creado una nueva";

  const comentMA = (id: string) => {
    axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/coment-mir",
        {
          IdMir: id,
          Coment: comment,
          CreadoPor: localStorage.getItem("IdUsuario"),
          MIR_MA: "MA",
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        setNewComent(false);
        setComment("");
        handleClose();
      })
      .catch((err) => {});
  };

  let err = 0;

  const checkMA = (v: string) => {
    errores = [];
    if (JSON.parse(MA)?.fin === null) {
      err = 1;
      errores.push("Sección <strong>Fin</strong> incompleta.");
    }
    if (
      JSON.parse(MA)?.fin.metaAnual === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.fin.metaAnual)
    ) {
      err = 1;
      errores.push("<strong>Fin</strong>: Meta anual sin información.");
    }
    if (
      JSON.parse(MA)?.fin.lineaBase === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.fin.lineaBase)
    ) {
      err = 1;
      errores.push("<strong>Fin</strong>: Línea base sin información.");
    }
    if (
      JSON.parse(MA)?.fin.valorNumerador === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.fin.valorNumerador)
    ) {
      err = 1;
      errores.push(
        "<strong>Fin</strong>: Valor del numerador sin información."
      );
    }
    if (
      !JSON.parse(MIR)
        .fin.indicador.toLowerCase()
        .includes("indice" || "índice") &&
      (JSON.parse(MA)?.fin.valorDenominador === undefined ||
        /^[\s]*$/.test(JSON.parse(MA)?.fin.valorDenominador))
    ) {
      err = 1;
      errores.push(
        "<strong>Fin</strong>: Valor del denominador sin información."
      );
    }
    if (
      JSON.parse(MA)?.fin.sentidoDelIndicador === undefined ||
      JSON.parse(MA)?.fin.sentidoDelIndicador === ""
    ) {
      err = 1;
      errores.push(
        "<strong>Fin</strong>: Sentido del indicador no seleccionado."
      );
    }
    if (
      JSON.parse(MA)?.fin.unidadResponsable === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.fin.unidadResponsable)
    ) {
      err = 1;
      errores.push(
        "<strong>Fin</strong>: Unidad responsable de reportar el indicador sin información."
      );
    }
    if (
      JSON.parse(MA)?.fin.descIndicador === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.fin.descIndicador)
    ) {
      err = 1;
      errores.push(
        "<strong>Fin</strong>: Descripción del indicador sin información."
      );
    }
    if (
      JSON.parse(MA)?.fin.descNumerador === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.fin.descNumerador)
    ) {
      err = 1;
      errores.push(
        "<strong>Fin</strong>: Descripción del numerador sin información."
      );
    }
    if (
      JSON.parse(MA)?.fin.descDenominador === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.fin.descDenominador)
    ) {
      err = 1;
      errores.push(
        "<strong>Fin</strong>: Descripción del denominador sin información."
      );
    }
    if (JSON.parse(MA)?.proposito === null) {
      err = 1;
      errores.push("Sección <strong>Propósito</strong> incompleta.");
    }
    if (
      JSON.parse(MA)?.proposito.metaAnual === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.proposito.metaAnual)
    ) {
      err = 1;
      errores.push("<strong>Proposito</strong>: Meta Anual sin información.");
    }
    if (
      JSON.parse(MA)?.proposito.lineaBase === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.proposito.lineaBase)
    ) {
      err = 1;
      errores.push("<strong>Proposito</strong>: Línea base sin información.");
    }
    if (
      JSON.parse(MA)?.proposito.valorNumerador === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.proposito.valorNumerador)
    ) {
      err = 1;
      errores.push(
        "<strong>Proposito</strong>: Valor del numerador sin información."
      );
    }
    if (
      !JSON.parse(MIR)
        .proposito.indicador.toLowerCase()
        .includes("indice" || "índice") &&
      (JSON.parse(MA)?.proposito.valorDenominador === undefined ||
        /^[\s]*$/.test(JSON.parse(MA)?.proposito.valorDenominador))
    ) {
      err = 1;
      errores.push(
        "<strong>Proposito</strong>: Valor del denominador sin información."
      );
    }
    if (
      JSON.parse(MA)?.proposito.sentidoDelIndicador === undefined ||
      JSON.parse(MA)?.proposito.sentidoDelIndicador === ""
    ) {
      err = 1;
      errores.push(
        "<strong>Proposito</strong>: Sentido del indicador no seleccionado."
      );
    }
    if (
      JSON.parse(MA)?.proposito.unidadResponsable === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.proposito.unidadResponsable)
    ) {
      err = 1;
      errores.push(
        "<strong>Proposito</strong>: Unidad responsable de reportar el indicador sin seleccionar."
      );
    }
    if (
      JSON.parse(MA)?.proposito.descIndicador === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.proposito.descIndicador)
    ) {
      err = 1;
      errores.push(
        "<strong>Proposito</strong>: Descripción del indicador sin información."
      );
    }
    if (
      JSON.parse(MA)?.proposito.descNumerador === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.proposito.descNumerador)
    ) {
      err = 1;
      errores.push(
        "<strong>Proposito</strong>: Descripción del numerador sin información."
      );
    }
    if (
      JSON.parse(MA)?.proposito.descDenominador === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.proposito.descDenominador)
    ) {
      err = 1;
      errores.push(
        "<strong>Proposito</strong>: Descripción del denominador sin información."
      );
    }

    checkComponentes(v);
  };

  const checkComponentes = (v: string) => {
    JSON.parse(MA)?.componentes.map((componente: any, index: number) => {
      if (
        componente.metaAnual === undefined ||
        /^[\s]*$/.test(componente.metaAnual) ||
        componente.metaAnual === null
      ) {
        err = 1;
        errores.push(
          `<strong> Componente ${
            index + 1
          } </strong>: Meta anual sin información.`
        );
      }
      if (
        componente.metasPorFrecuencia[0].trimestre4 !== componente.metaAnual &&
        componente.metasPorFrecuencia[0].semestre2 !== componente.metaAnual
      ) {
        err = 1;
        errores.push(
          `<strong> Componente ${
            index + 1
          } </strong>: El valor de la meta anual debe coincidir con el valor del trimestre 4 o semestre 2 correspondiente.`
        );
      }
      if (
        componente.lineaBase === undefined ||
        /^[\s]*$/.test(componente.lineaBase)
      ) {
        err = 1;
        errores.push(
          `<strong> Componente ${
            index + 1
          } </strong>: Línea base sin información.`
        );
      }
      if (
        (componente.metasPorFrecuencia[0].semestre1 === undefined ||
          /^[\s]*$/.test(componente.metasPorFrecuencia[0].semestre1) ||
          componente.metasPorFrecuencia[0].semestre2 === undefined ||
          /^[\s]*$/.test(componente.metasPorFrecuencia[0].semestre2)) &&
        (componente.metasPorFrecuencia[0].trimestre1 === undefined ||
          /^[\s]*$/.test(componente.metasPorFrecuencia[0].trimestre1) ||
          componente.metasPorFrecuencia[0].trimestre2 === undefined ||
          /^[\s]*$/.test(componente.metasPorFrecuencia[0].trimestre2) ||
          componente.metasPorFrecuencia[0].trimestre3 === undefined ||
          /^[\s]*$/.test(componente.metasPorFrecuencia[0].trimestre3) ||
          componente.metasPorFrecuencia[0].trimestre4 === undefined ||
          /^[\s]*$/.test(componente.metasPorFrecuencia[0].trimestre4))
      ) {
        err = 1;
        errores.push(
          `<strong> Componente ${
            index + 1
          } </strong>: Metas por frecuencia sin información.`
        );
      }
      if (
        componente.valorNumerador === undefined ||
        /^[\s]*$/.test(componente.valorNumerador)
      ) {
        err = 1;
        errores.push(
          `<strong> Componente ${
            index + 1
          } </strong>: Valor del numerador sin información.`
        );
      }
      if (
        JSON.parse(MIR)
          .componentes[index].indicador.toLowerCase()
          .includes("índice" || "indice") &&
        (componente.valorDenominador === undefined ||
          /^[\s]*$/.test(componente.valorDenominador))
      ) {
        err = 1;
        errores.push(
          `<strong> Componente ${
            index + 1
          } </strong>: Valor del denominador sin información.`
        );
      }
      if (
        componente.sentidoDelIndicador === undefined ||
        componente.sentidoDelIndicador === ""
      ) {
        err = 1;
        errores.push(
          `<strong> Componente ${
            index + 1
          } </strong>: Sentido del indicador sin seleccionar.`
        );
      }
      if (
        componente.unidadResponsable === undefined ||
        /^[\s]*$/.test(componente.unidadResponsable)
      ) {
        err = 1;
        errores.push(
          `<strong> Componente ${
            index + 1
          } </strong>: Unidad responsable de reportar el indicador sin seleccionar.`
        );
      }
      if (
        componente.descIndicador === undefined ||
        /^[\s]*$/.test(componente.descIndicador)
      ) {
        err = 1;
        errores.push(
          `<strong> Componente ${
            index + 1
          } </strong>: Descripción del indicador sin información.`
        );
      }
      if (
        componente.descNumerador === undefined ||
        /^[\s]*$/.test(componente.descNumerador)
      ) {
        err = 1;
        errores.push(
          `<strong> Componente ${
            index + 1
          } </strong>: Descripción del numerador sin información.`
        );
      }
      if (
        componente.descDenominador === undefined ||
        /^[\s]*$/.test(componente.descDenominador)
      ) {
        err = 1;
        errores.push(
          `<strong> Componente ${
            index + 1
          } </strong>: Descripción del denominador sin información.`
        );
      }
      return true;
    });
    checkActividades(v);
  };

  const checkActividades = (v: string) => {
    // eslint-disable-next-line array-callback-return
    JSON.parse(MA)?.actividades.map((actividad: any, index: number) => {
      if (
        actividad.metaAnual === undefined ||
        /^[\s]*$/.test(actividad.metaAnual)
      ) {
        errores.push(
          `<strong> Actividad ${actividad.actividad} </strong>: Meta anual sin información.`
        );
        err = 1;
      }
      if (actividad.metaAnual !== actividad.metasPorFrecuencia[0].trimestre4) {
        errores.push(
          `<strong> Actividad ${actividad.actividad} </strong>: El valor de la meta anual debe coincidir con el valor del trimestre 4.`
        );
        err = 1;
      }
      if (
        actividad.lineaBase === undefined ||
        /^[\s]*$/.test(actividad.lineaBase)
      ) {
        errores.push(
          `<strong> Actividad ${actividad.actividad} </strong>: Línea base sin información.`
        );
        err = 1;
      }
      if (
        (actividad.metasPorFrecuencia[0].semestre1 === undefined ||
          /^[\s]*$/.test(actividad.metasPorFrecuencia[0].semestre1) ||
          actividad.metasPorFrecuencia[0].semestre2 === undefined ||
          /^[\s]*$/.test(actividad.metasPorFrecuencia[0].semestre2)) &&
        (actividad.metasPorFrecuencia[0].trimestre1 === undefined ||
          /^[\s]*$/.test(actividad.metasPorFrecuencia[0].trimestre1) ||
          actividad.metasPorFrecuencia[0].trimestre2 === undefined ||
          /^[\s]*$/.test(actividad.metasPorFrecuencia[0].trimestre2) ||
          actividad.metasPorFrecuencia[0].trimestre3 === undefined ||
          /^[\s]*$/.test(actividad.metasPorFrecuencia[0].trimestre3) ||
          actividad.metasPorFrecuencia[0].trimestre4 === undefined ||
          /^[\s]*$/.test(actividad.metasPorFrecuencia[0].trimestre4))
      ) {
        errores.push(
          `<strong> Actividad ${actividad.actividad} </strong>: Metas por frecuencia sin información.`
        );
        err = 1;
      }
      if (
        actividad.valorNumerador === undefined ||
        /^[\s]*$/.test(actividad.valorNumerador)
      ) {
        errores.push(
          `<strong> Actividad ${actividad.actividad} </strong>: Valor del numerador sin información.`
        );
        err = 1;
      }
      if (
        JSON.parse(MIR)
          .actividades[index].indicador.toUpperCase()
          .includes("ÍNDICE" || "INDICE") &&
        (actividad.valorDenominador === undefined ||
          /^[\s]*$/.test(actividad.valorDenominador))
      ) {
        errores.push(
          `<strong> Actividad ${actividad.actividad} </strong>: Valor del denominador sin información.`
        );
        err = 1;
      }
      if (
        actividad.sentidoDelIndicador === undefined ||
        actividad.sentidoDelIndicador === ""
      ) {
        errores.push(
          `<strong> Actividad ${actividad.actividad} </strong>: Sentido del indicador sin seleccionar.`
        );
        err = 1;
      }
      if (
        actividad.unidadResponsable === undefined ||
        /^[\s]*$/.test(actividad.unidadResponsable)
      ) {
        errores.push(
          `<strong> Actividad ${actividad.actividad} </strong>: Unidad responsable de reportar el indicador sin seleccionar.`
        );
        err = 1;
      }
      if (
        actividad.descIndicador === undefined ||
        /^[\s]*$/.test(actividad.descIndicador)
      ) {
        errores.push(
          `<strong> Actividad ${actividad.actividad} </strong>: Descripción del indicador sin información.`
        );
        err = 1;
      }
      if (
        actividad.descNumerador === undefined ||
        /^[\s]*$/.test(actividad.descNumerador)
      ) {
        errores.push(
          `<strong> Actividad ${actividad.actividad} </strong>: Descripción del numerador sin información.`
        );
        err = 1;
      }
      if (
        actividad.descDenominador === undefined ||
        /^[\s]*$/.test(actividad.descDenominador)
      ) {
        errores.push(
          `<strong> Actividad ${actividad.actividad} </strong>: Descripción del denominador sin información.`
        );
        err = 1;
      }
    });
    if (err === 0) {
      creaMA(v);
    } else {
      Toast.fire({
        icon: "error",
        html: `
        <div style="height:50%;">
        <h3>Se han encontrado los siguientes errores:</h3>
        <div style="text-align: left; margin-left: 10px; color: red; height: 300px; overflow: auto;">
      <small>
      <strong>
      *</strong>${errores.join("<br><strong>*</strong>")}
      </small>
      </div>
      </div>`,
      });
    }
  };

  const creaMA = (estado: string) => {
    axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/create-MetaAnual",
        {
          MetaAnual: MA,
          CreadoPor: localStorage.getItem("IdUsuario"),
          IdMir: IdMIR,
          Estado: estado,
          Id: IdMA,
          Rol: localStorage.getItem("Rol"),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        userXInst.map((user) => {
          enviarNotificacion(
            user.IdUsuario,
            r.data.data.Id,
            "MA",
            "Meta Anual"
          );
          sendMail(user.CorreoElectronico, enviarMensaje, "MA");
        });
        if (estado === "Autorizada") {
          CrearFichaTecnica();
        }
        Toast.fire({
          icon: "success",
          title: r.data.data.message,
        });
        if (comment !== "") {
          comentMA(IdMIR);
        }
        showResume();
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: err.response.data.result.error,
        });
      });
  };

  const CrearFichaTecnica = () => {
    console.log("Entre a crearFichaTecnica donde esta enviar notificacions");

    axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/create-FichaTecnica",
        {
          FichaTecnica: "",
          CreadoPor: localStorage.getItem("IdUsuario"),
          IdMir: IdMIR,
          IdMa: IdMA,
          Id: "",
          Estado: "En Captura",
          Rol: localStorage.getItem("Rol"),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        console.log("IdFt: ", r.data.data.Id);
        console.log("IdFt: ", r.data.data);
        console.log("IdFt: ", r.data.IdFT);
        userXInst.map((user) => {
          console.log("user.IdUsuario: ", user.IdUsuario);

          enviarNotificacion(
            user.IdUsuario,
            r.data.data.Id,
            "FT",
            "Ficha Tecnica"
          );
          sendMail(user.CorreoElectronico, "Se ha creado una nueva", "FT");
        });

        showResume();
      })
      .catch((err) => {
        err = 1;
        errores.push(err);
      });
  };

  useEffect(() => {
    if (open) {
      let inst = JSON.parse(MIR)?.encabezado.institucion;

      // if (localStorage.getItem("Rol") === "Verificador") {
      //   inst = "admin";
      // }

      axios
        .get(
          // eslint-disable-next-line no-useless-concat
          process.env.REACT_APP_APPLICATION_BACK + "/api/tipo-usuario",
          {
            params: {
              TipoUsuario: localStorage.getItem("Rol"),
              IdEntidad: localStorage.getItem("IdEntidad"),
              IdApp: localStorage.getItem("dApp"),
            },
            headers: {
              Authorization: localStorage.getItem("jwtToken") || "",
            },
          }
        )
        .then((r) => {
          if (r.status === 200) {
            setUserXInst(r.data.data);
          }
        });
    }
  }, [MIR, open]);

  const enviarNotificacion = (
    IdUsuarioDestino: string,
    IdDoc = "",
    tipoDoc = "",
    Nombre = ""
  ) => {
    console.log("IdUsuarioDestino: ", IdUsuarioDestino);
    console.log("IdDoc: ", IdDoc);
    console.log("tipoDoc: ", tipoDoc);
    console.log("Nombre: ", Nombre);

    axios.post(
      process.env.REACT_APP_APPLICATION_BACK + "/api/create-notif",
      {
        IdUsuarioDestino: IdUsuarioDestino,
        Titulo: tipoDoc,
        Mensaje: enviarMensaje + " " + Nombre,
        IdDocumento: IdDoc,
        CreadoPor: localStorage.getItem("IdUsuario"),
      },
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      }
    );
  };

  const Toast = Swal.mixin({
    toast: false,
    position: "center",
    showConfirmButton: true,
    heightAuto: false,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={() => handleClose()}>
      <DialogTitle
        sx={{
          fontFamily: "MontserratBold",
          borderBottom: 1,
          height: "6vh",
          mb: 2,
        }}
      >
        {localStorage.getItem("Rol") === "Administrador"
          ? "Confirmar Autorización"
          : "Confirmar Envío"}
      </DialogTitle>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "30vw",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            mb: 2,
          }}
        >
          <Typography
            sx={{ fontFamily: "MontserratMedium", textAlign: "center" }}
          >
            {localStorage.getItem("Rol") === "Administrador"
              ? "Al confirmar, la Meta Anual se autorizará y el apartado de la Ficha Técnica será habilitado"
              : localStorage.getItem("Rol") === "Verificador"
              ? "Al confirmar, la Meta Anual se enviará a los usuarios correspondientes para autorización"
              : "Al confirmar, la Meta Anual se enviará a los usuarios correspondientes para revisión"}
          </Typography>
        </Box>

        <Box sx={{ width: "30vw" }}>
          <TextField
            multiline
            rows={3}
            label={"Agregar Comentario"}
            sx={{ width: "30vw" }}
            onChange={(v) => setComment(v.target.value)}
          ></TextField>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBlockEnd: "1vh",
            paddingBlockEnd: "1vh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              width: "20vw",
              mt: "4vh",
            }}
          >
            <Button
              sx={queries.buttonCancelarSolicitudInscripcion}
              onClick={() => handleClose()}
            >
              <Typography sx={{ fontFamily: "MontserratRegular" }}>
                Cancelar
              </Typography>
            </Button>

            {/* <Button
              sx={{ display: "flex", width: "11vw" }}
              variant="contained"
              color="info"
              onClick={() => {
                newComent ? setComment("") : setNewComent(!newComent);
                newComent ? setNewComent(!newComent) : setNewComent(!newComent);
              }}
            >
              {newComent ? "Cancelar comentario" : "Nuevo comentario"}
            </Button> */}

            <Button
              sx={queries.buttonContinuarSolicitudInscripcion}
              onClick={() => {
                checkMA(
                  localStorage.getItem("Rol") === "Capturador"
                    ? "En Revisión"
                    : localStorage.getItem("Rol") === "Verificador"
                    ? "En Autorización"
                    : "Autorizada"
                );
                handleClose();
                setNewComent(false);
              }}
            >
              <Typography sx={{ fontFamily: "MontserratRegular" }}>
                Confirmar
              </Typography>
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export interface IIUserXInst {
  IdUsuario: string;
  IdUsuarioTiCentral: string;
  Rol: string;
  NombrelineaBase: string;
  Nombre: string;
  ApellidoPaterno: string;
  CorreoElectronico: string;
}
