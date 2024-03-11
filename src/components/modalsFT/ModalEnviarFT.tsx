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
//import { sendMail } from "../../funcs/sendMailCustomMessage";
import { queries } from "../../queries";
import { IActividadesFT, IComponentesFT } from "../tabsFichaTecnica/Interfaces";
import {
  alertaEliminar,
  alertaErrorConfirm,
  alertaErroresDocumento,
  alertaExito,
  alertaExitoConfirm,
} from "../genericComponents/Alertas";
import { create_coment_mir, enviarNotificacionRol } from "../genericComponents/axiosGenericos";

export let errores: string[] = [];

export default function ModalEnviarFT({
  open,
  handleClose,
  MIR,
  FT,
  IdFT,
  IdMIR,
  IdMA,
  showResume,
}: {
  open: boolean;
  handleClose: Function;
  MIR: string;
  FT: string;
  IdFT: string;
  IdMIR: string;
  IdMA: string;
  showResume: Function;
}) {
  const [comment, setComment] = useState("");
  const [userXInst, setUserXInst] = useState<Array<IIUserXInst>>([]);
  const [newComent, setNewComent] = React.useState(false);
  const enviarMensaje = "Se ha creado una nueva";

  const comentFT = () => {
    create_coment_mir(IdMIR, comment, "FT")
      .then((r) => {
        setNewComent(false);
        setComment("");
      })
      .catch((err) => {});
  };

  let err = 0;

  const checkFT = (v: string) => {
    errores = [];

    if (
      JSON.parse(FT)?.encabezado === null ||
      JSON.parse(FT)?.encabezado === undefined
    ) {
      err = 1;
      errores.push("Sección <strong>Encabezado</strong> incompleta.");
      //Se me ocurre hacer una variable que aumente por if que enttre y que con solo ser mayor a 1 ya muestre el header
    }
    if (
      JSON.parse(FT)?.encabezado.programaSER === undefined ||
      JSON.parse(FT)?.encabezado.programaSER === "" ||
      JSON.parse(FT)?.encabezado.programaSER === null ||
      /^[\s]*$/.test(JSON.parse(FT)?.encabezado.programaSER)
    ) {
      err = 1;
      errores.push(
        "<strong>Encabezado</strong>: Programa sectorial, especial o regional sin información."
      );
    }
    if (
      JSON.parse(FT)?.encabezado.objetivoSER === undefined ||
      JSON.parse(FT)?.encabezado.objetivoSER === "" ||
      /^[\s]*$/.test(JSON.parse(FT)?.encabezado.objetivoSER)
    ) {
      err = 1;
      errores.push(
        "<strong>Encabezado</strong>: Objetivo sectorial, especial o regional sin información."
      );
    }
    if (
      JSON.parse(FT)?.encabezado.objetivoODS === undefined ||
      JSON.parse(FT)?.encabezado.objetivoODS === ""
    ) {
      err = 1;
      errores.push(
        "<strong>Encabezado</strong>: Objetivo ODS no seleccionado."
      );
    }
    if (
      JSON.parse(FT)?.encabezado.metaODS === undefined ||
      JSON.parse(FT)?.encabezado.metaODS === ""
    ) {
      err = 1;
      errores.push("<strong>Encabezado</strong>: Meta ODS no seleccionado.");
    }
    if (JSON.parse(FT)?.fin === null) {
      err = 1;
      errores.push("Sección <strong>Fin</strong> incompleta.");
    }
    if (JSON.parse(FT)?.fin.tipoDeIndicador === "") {
      err = 1;
      errores.push("<strong>Fin</strong>: Tipo de indicador no seleccionado.");
    }
    if (JSON.parse(FT)?.fin.dimension === "") {
      err = 1;
      errores.push("<strong>Fin</strong>: Dimensión no seleccionado.");
    }
    if (
      JSON.parse(FT)?.fin.unidadDeMedida === undefined ||
      JSON.parse(FT)?.fin.unidadDeMedida === "" ||
      /^[\s]*$/.test(JSON.parse(FT)?.proposito.unidadDeMedida)
    ) {
      err = 1;
      errores.push("<strong>Fin</strong>: Unidad de medida sin información.");
    }
    if (JSON.parse(FT)?.fin.claridad === "") {
      err = 1;
      errores.push("<strong>Fin</strong>: Claridad no seleccionado.");
    }
    if (JSON.parse(FT)?.fin.relevancia === "") {
      err = 1;
      errores.push("<strong>Fin</strong>: Relevancia no seleccionado.");
    }
    if (JSON.parse(FT)?.fin.economia === "") {
      err = 1;
      errores.push("<strong>Fin</strong>: Economia no seleccionado.");
    }
    if (JSON.parse(FT)?.fin.monitoreable === "") {
      err = 1;
      errores.push("<strong>Fin</strong>: Monitoreable no seleccionado.");
    }
    if (JSON.parse(FT)?.fin.adecuado === "") {
      err = 1;
      errores.push("<strong>Fin</strong>: Adecuado no seleccionado.");
    }
    if (JSON.parse(FT)?.fin.aporte_marginal === "") {
      err = 1;
      errores.push("<strong>Fin</strong>: Aporte Marginal no seleccionado.");
    }
    if (JSON.parse(FT)?.proposito === null) {
      err = 1;
      errores.push("Sección <strong>Propósito</strong> incompleta.");
    }
    if (JSON.parse(FT)?.proposito.tipoDeIndicador === "") {
      err = 1;
      errores.push(
        "<strong>Propósito</strong>: Tipo de indicador no seleccionado."
      );
    }
    if (JSON.parse(FT)?.proposito.dimension === "") {
      err = 1;
      errores.push("<strong>Propósito</strong>: Dimensión no seleccionado.");
    }
    if (
      JSON.parse(FT)?.proposito.unidadDeMedida === undefined ||
      JSON.parse(FT)?.proposito.unidadDeMedida === "" ||
      /^[\s]*$/.test(JSON.parse(FT)?.proposito.unidadDeMedida)
    ) {
      err = 1;
      errores.push(
        "<strong>Propósito</strong>: Unidad de medida sin información."
      );
    }
    if (JSON.parse(FT)?.proposito.claridad === "") {
      err = 1;
      errores.push("<strong>Propósito</strong>: Claridad no seleccionado.");
    }
    if (JSON.parse(FT)?.proposito.relevancia === "") {
      err = 1;
      errores.push("<strong>Propósito</strong>: Relevancia no seleccionado.");
    }
    if (JSON.parse(FT)?.proposito.economia === "") {
      err = 1;
      errores.push("<strong>Propósito</strong>: Economia no seleccionado.");
    }
    if (JSON.parse(FT)?.proposito.monitoreable === "") {
      err = 1;
      errores.push("<strong>Propósito</strong>: Monitoreable no seleccionado.");
    }
    if (JSON.parse(FT)?.proposito.adecuado === "") {
      err = 1;
      errores.push("<strong>Propósito</strong>: Adecuado no seleccionado.");
    }
    if (JSON.parse(FT)?.proposito.aporte_marginal === "") {
      err = 1;
      errores.push(
        "<strong>Propósito</strong>: Aporte marginal no seleccionado."
      );
    }
    checkComponentes(v);
  };

  const checkComponentes = (v: string) => {
    JSON.parse(FT)?.componentes.map((componente: any, index: number) => {
      if (componente.tipoDeIndicador === "") {
        err = 1;
        errores.push(
          `<strong> Componente ${
            index + 1
          } </strong>: Tipo de indicador no seleccionado.`
        );
      }
      if (componente.dimension === "") {
        err = 1;
        errores.push(
          `<strong> Componente ${
            index + 1
          } </strong>: Dimensión no seleccionado.`
        );
      }
      if (
        componente.unidadDeMedida === undefined ||
        /^[\s]*$/.test(componente.unidadDeMedida) ||
        componente.unidadDeMedida === ""
      ) {
        err = 1;
        errores.push(
          `<strong> Componente ${
            index + 1
          } </strong>: Unidad de medida sin información.`
        );
      }
      if (componente.claridad === "") {
        err = 1;
        errores.push(
          `<strong> Componente ${
            index + 1
          } </strong>: Claridad no seleccionado.`
        );
      }
      if (componente.relevancia === "") {
        err = 1;
        errores.push(
          `<strong> Componente ${
            index + 1
          } </strong>: Relevancia no seleccionado.`
        );
      }
      if (componente.economia === "") {
        err = 1;
        errores.push(
          `<strong> Componente ${
            index + 1
          } </strong>: Economia no seleccionado.`
        );
      }
      if (componente.monitoreable === "") {
        err = 1;
        errores.push(
          `<strong> Componente ${
            index + 1
          } </strong>: Monitoreable no seleccionado.`
        );
      }
      if (componente.adecuado === "") {
        err = 1;
        errores.push(
          `<strong> Componente ${
            index + 1
          } </strong>: Adecuado no seleccionado.`
        );
      }
      if (componente.aporte_marginal === "") {
        err = 1;
        errores.push(
          `<strong> Componente ${
            index + 1
          } </strong>: Aporte marginal no seleccionado.`
        );
      }
      return true;
    });
    checkActividades(v);
  };

  const checkActividades = (v: string) => {
    // eslint-disable-next-line array-callback-return
    JSON.parse(FT)?.componentes.map(
      (componente: IComponentesFT, indexC: number) => {
        componente.actividades.map(
          (actividad: IActividadesFT, indexA: number) => {
            if (actividad.tipoDeIndicador === "") {
              errores.push(
                `<strong>Actividad ${actividad.tipoDeIndicador} </strong>: Tipo de indicador no seleccionado.`
              );
              err = 1;
            }
            if (actividad.dimension === "") {
              errores.push(
                `<strong>Actividad ${actividad.actividades} </strong>: Dimension no seleccionado.`
              );
              err = 1;
            }
            if (
              actividad.unidadDeMedida === undefined ||
              /^[\s]*$/.test(actividad.unidadDeMedida) ||
              actividad.unidadDeMedida === ""
            ) {
              errores.push(
                `<strong>Actividad ${actividad.actividades} </strong>: Unidad de medida sin información.`
              );
              err = 1;
            }
            if (actividad.claridad === "") {
              errores.push(
                `<strong>Actividad ${actividad.actividades} </strong>: Claridad no seleccionado.`
              );
              err = 1;
            }
            if (actividad.relevancia === "") {
              errores.push(
                `<strong>Actividad ${actividad.actividades} </strong>: Relevancia no seleccionado.`
              );
              err = 1;
            }
            if (actividad.economia === "") {
              errores.push(
                `<strong>Actividad ${actividad.actividades} </strong>: Economia no seleccionado.`
              );
              err = 1;
            }
            if (actividad.monitoreable === "") {
              errores.push(
                `<strong>Actividad ${actividad.actividades} </strong>: Monitoreable no seleccionado.`
              );
              err = 1;
            }
            if (actividad.adecuado === "") {
              errores.push(
                `<strong>Actividad ${actividad.actividades} </strong>: Adecuado no seleccionado.`
              );
              err = 1;
            }
            if (actividad.aporte_marginal === "") {
              errores.push(
                `<strong>Actividad ${actividad.actividades} </strong>: Aporte marginal no seleccionado.`
              );
              err = 1;
            }
          }
        );
      }
    );
    if (err === 0) {
      crearFichaTecnica(v);
    } else {
      alertaErroresDocumento(errores);
    }
  };

  const crearFichaTecnica = (estado: string) => {
    axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/create-ft-generic",
        {
          FichaTecnica: FT,
          CreadoPor: localStorage.getItem("IdUsuario"),
          IdMir: IdMIR,
          IdMa: IdMA,
          Id: IdFT,
          Estado: estado,
          Rol: localStorage.getItem("Rol"),
          IdEntidad: localStorage.getItem("IdEntidad"),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        let rol: string[] = [];
        if(localStorage.getItem("Rol") === "Verificador"){
          rol = ["Administrador"]
        }

        if(localStorage.getItem("Rol") === "Capturador"){
          rol = ["Verificador"]
        }

        if(localStorage.getItem("Rol") === "Administrador"){
          rol = ["Capturador","Verificador"]
        }

        enviarNotificacionRol("FT", "FT enviada", IdFT, rol)

        alertaExitoConfirm(r.data.data.message.toUpperCase());

        if (comment !== "") {
          comentFT();
        }
        showResume();
      })
      .catch((err) => {
        alertaErrorConfirm(err.response.data.result.error.toUpperCase());
      });
  };

  useEffect(() => {
    if (open) {
      ////////////////////////Esto esta fallando
      axios
        .post(
          process.env.REACT_APP_APPLICATION_BACK + "/api/tipo-usuario",
          {
            TipoUsuario: localStorage.getItem("Rol"),
            IdEntidad: localStorage.getItem("IdEntidad"),
            IdApp: localStorage.getItem("dApp"),
          },
          {
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

  // const soliModyNoty = (
  //   IdUsuarioDestino: string,
  //   IdDoc = "",
  //   tipoDoc = "",
  //   Nombre = ""
  // ) => {
  //   axios.post(
  //     process.env.REACT_APP_APPLICATION_BACK + "/api/create-notif",
  //     {
  //       IdUsuarioDestino: IdUsuarioDestino,
  //       Titulo: tipoDoc,
  //       Mensaje: enviarMensaje + " " + Nombre,
  //       IdDocumento: IdDoc,
  //       CreadoPor: localStorage.getItem("IdUsuario"),
  //     },
  //     {
  //       headers: {
  //         Authorization: localStorage.getItem("jwtToken") || "",
  //       },
  //     }
  //   );
  // };

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
              ? "Al confirmar, la Ficha Técnica se autorizará."
              : localStorage.getItem("Rol") === "Verificador"
              ? "Al confirmar, la Ficha Técnica se enviará a los usuarios correspondientes para autorización."
              : "Al confirmar, la Ficha Técnica se enviará a los usuarios correspondientes para revisión."}
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
              width: "30vw",
              mt: "4vh",
            }}
          >
            <Button
              className="cancelar"
              //sx={queries.buttonCancelarSolicitudInscripcion}
              onClick={() => handleClose()}
            >
              <Typography sx={{ fontFamily: "MontserratRegular" }}>
                Cancelar
              </Typography>
            </Button>

            <Button
              className="aceptar"
              //sx={queries.buttonContinuarSolicitudInscripcion}
              variant="contained"
              onClick={() => {
                checkFT(
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
