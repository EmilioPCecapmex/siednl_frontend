import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Box,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  AlertColor,
  Typography,
} from "@mui/material";

export let errores: string[] = [];

export default function ModalEnviarMIR({
  open,
  handleClose,
  MIR,
  IdMir,
  showResume,
}: {
  open: boolean;
  handleClose: Function;
  MIR: string;
  IdMir: string;
  showResume: Function;
}) {
  const [comment, setComment] = useState("");

  const [userXInst, setUserXInst] = useState<Array<IIUserXInst>>([]);
  const [userSelected, setUserSelected] = useState("0");
  // const [instSelected, setInstSelected] = useState("");
  let err = 0;

  const [newComent, setNewComent] = React.useState(false);

  const comentMir = (id: string) => {
    axios
      .post(
        "http://10.200.4.199:8000/api/coment-mir",
        {
          IdMir: id,
          Coment: comment,
          CreadoPor: localStorage.getItem("IdUsuario"),
          MIR_MA: "MIR",
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
      })
      .catch((err) => {});
  };

  const checkMir = (v: string) => {
    errores = [];
    if (JSON.parse(MIR)?.encabezado.ejercicioFiscal === "") {
      err = 1;
      errores.push("<strong>Encabezado<(strong>: año fiscal no seleccionado.");
    }
    if (JSON.parse(MIR)?.encabezado.institucion === "") {
      err = 1;
      errores.push("<strong>Encabezado:</strong> institución no seleccionada.");
    }
    if (JSON.parse(MIR)?.encabezado.nombre_del_programa === "") {
      err = 1;
      errores.push(
        "<strong>Encabezado:</strong> programa presupuestario no seleccionado."
      );
    }
    if (JSON.parse(MIR)?.encabezado.eje === "") {
      err = 1;
      errores.push("<strong>Encabezado:</strong> eje no seleccionado.");
    }
    if (JSON.parse(MIR)?.encabezado.tema === "") {
      err = 1;
      errores.push("<strong>Encabezado:</strong> temática no seleccionada.");
    }
    if (JSON.parse(MIR)?.encabezado.objetivo === "") {
      err = 1;
      errores.push("<strong>Encabezado:</strong> objetivo no seleccionado.");
    }
    if (JSON.parse(MIR)?.encabezado.estrategia === "") {
      err = 1;
      errores.push("<strong>Encabezado:</strong> estrategia no seleccionada.");
    }
    if (JSON.parse(MIR)?.encabezado.lineas_de_accion === "") {
      err = 1;
      errores.push(
        "<strong>Encabezado:</strong> selecciona al menos 1 línea de acción."
      );
    }
    if (JSON.parse(MIR)?.encabezado.beneficiario === "") {
      err = 1;
      errores.push(
        "<strong>Encabezado:</strong> beneficiario no seleccionado."
      );
    }
    if (JSON.parse(MIR)?.fin === null) {
      err = 1;
      errores.push("Sección <strong> FIN </strong> Faltante.");
    }
    if (
      JSON.parse(MIR)?.fin.resumen === undefined ||
      /^[\s]*$/.test(JSON.parse(MIR)?.fin.resumen)
    ) {
      err = 1;
      errores.push("<strong>FIN: Resumen Narrativo</strong> sin información.");
    }
    if (
      JSON.parse(MIR)?.fin.indicador === undefined ||
      /^[\s]*$/.test(JSON.parse(MIR)?.fin.indicador)
    ) {
      err = 1;
      errores.push("<strong>FIN: Indicador</strong> sin información.");
    }
    if (
      JSON.parse(MIR)?.fin.formula === undefined ||
      /^[\s]*$/.test(JSON.parse(MIR)?.fin.formula)
    ) {
      err = 1;
      errores.push("<strong>FIN: Fórmula</strong> sin información.");
    }
    if (
      JSON.parse(MIR)?.fin.frecuencia === undefined ||
      JSON.parse(MIR)?.fin.frecuencia === ""
    ) {
      err = 1;
      errores.push(
        "<strong>FIN: Frecuencia</strong>, solo puede ser Anual o Bienal."
      );
    }
    if (
      JSON.parse(MIR)?.fin.medios === undefined ||
      /^[\s]*$/.test(JSON.parse(MIR)?.fin.medios)
    ) {
      err = 1;
      errores.push(
        "<strong>FIN: Medios de Verificación</strong> sin información."
      );
    }
    if (
      JSON.parse(MIR)?.fin.supuestos === undefined ||
      /^[\s]*$/.test(JSON.parse(MIR)?.fin.supuestos)
    ) {
      err = 1;
      errores.push("<strong>FIN: Supuestos</strong> sin información.");
    }
    if (
      JSON.parse(MIR)?.proposito.resumen === undefined ||
      /^[\s]*$/.test(JSON.parse(MIR)?.proposito.resumen)
    ) {
      err = 1;
      errores.push(
        "<strong>PROPOSITO: Resumen Narrativo</strong> sin información."
      );
    }
    if (
      JSON.parse(MIR)?.proposito.indicador === undefined ||
      /^[\s]*$/.test(JSON.parse(MIR)?.proposito.indicador)
    ) {
      err = 1;
      errores.push("<strong>PROPOSITO: Indicador</strong> sin información.");
    }
    if (
      JSON.parse(MIR)?.proposito.formula === undefined ||
      /^[\s]*$/.test(JSON.parse(MIR)?.proposito.formula)
    ) {
      err = 1;
      errores.push("<strong>PROPOSITO: Fórmula</strong> sin información.");
    }
    if (
      JSON.parse(MIR)?.proposito.frecuencia === undefined ||
      JSON.parse(MIR)?.proposito.frecuencia === ""
    ) {
      err = 1;
      errores.push(
        "<strong>PROPOSITO: Frecuencia</strong>, solo puede ser Anual o Bienal."
      );
    }
    if (
      JSON.parse(MIR)?.proposito.medios_verificacion === undefined ||
      /^[\s]*$/.test(JSON.parse(MIR)?.proposito.medios_verificacion)
    ) {
      err = 1;
      errores.push(
        "<strong>PROPOSITO: Medios de Verificación</strong> sin información."
      );
    }
    if (
      JSON.parse(MIR)?.proposito.supuestos === undefined ||
      /^[\s]*$/.test(JSON.parse(MIR)?.proposito.supuestos)
    ) {
      err = 1;
      errores.push("<strong>PROPOSITO: Supuestos</strong> sin información.");
    }
    checkComponentes(v);
  };

  const checkComponentes = (v: string) => {
    JSON.parse(MIR)?.componentes.map((componente: any, index: number) => {
      if (
        componente.resumen === undefined ||
        /^[\s]*$/.test(componente.resumen) ||
        componente.resumen === null
      ) {
        err = 1;
        errores.push(
          `<strong> Componente ${
            index + 1
          } </strong>: Resumen Narrativo sin información.`
        );
      }
      if (
        componente.indicador === undefined ||
        /^[\s]*$/.test(componente.indicador)
      ) {
        err = 1;
        errores.push(
          `<strong> Componente ${
            index + 1
          } </strong>: Indicador sin información.`
        );
      }
      if (
        componente.formula === undefined ||
        /^[\s]*$/.test(componente.formula)
      ) {
        err = 1;
        errores.push(
          `<strong> Componente ${index + 1} </strong>: Fórmula sin información.`
        );
      }
      if (componente.frecuencia === undefined || componente.frecuencia === "") {
        err = 1;
        errores.push(
          `<strong> Componente ${
            index + 1
          } </strong>: Frecuencia sin información.`
        );
      }
      if (
        componente.medios === undefined ||
        /^[\s]*$/.test(componente.medios)
      ) {
        err = 1;
        errores.push(
          `<strong> Componente ${
            index + 1
          } </strong>: Medios de Verificación sin información.`
        );
      }
      if (
        componente.supuestos === undefined ||
        /^[\s]*$/.test(componente.supuestos)
      ) {
        err = 1;
        errores.push(
          `<strong> Componente ${
            index + 1
          } </strong>: Supuestos sin información.`
        );
      } else {
        return true;
      }
    });
    checkActividades(v);
  };

  const checkActividades = (v: string) => {
    JSON.parse(MIR)?.actividades.map((actividad: any, index: number) => {
      if (
        actividad.resumen === undefined ||
        /^[\s]*$/.test(actividad.resumen) ||
        actividad.resumen === null
      ) {
        errores.push(
          `<strong> Actividad ${actividad.actividad} </strong>: Resumen Narrativo sin información.`
        );
        err = 1;
      }
      if (
        actividad.indicador === undefined ||
        /^[\s]*$/.test(actividad.indicador)
      ) {
        err = 1;
        errores.push(
          `<strong> Actividad ${actividad.actividad} </strong>: Indicador sin información.`
        );
      }
      if (
        actividad.formula === undefined ||
        /^[\s]*$/.test(actividad.formula)
      ) {
        errores.push(
          `<strong> Actividad ${actividad.actividad} </strong>: Fórmula sin información.`
        );
        err = 1;
      }
      if (actividad.frecuencia === undefined || actividad.frecuencia === "") {
        errores.push(
          `<strong> Actividad ${actividad.actividad} </strong>: Frecuencia sin información.`
        );
        err = 1;
      }
      if (actividad.medios === undefined || /^[\s]*$/.test(actividad.medios)) {
        errores.push(
          `<strong> Actividad ${actividad.actividad} </strong>: Medios de Verificación sin información.`
        );
        err = 1;
      }
      if (
        actividad.supuestos === undefined ||
        /^[\s]*$/.test(actividad.supuestos)
      ) {
        errores.push(
          `<strong> Actividad ${actividad.actividad} </strong>: Supuestos sin información.`
        );
        err = 1;
      }
    });
    if (err === 0) {
      createMIR(v);
    } else {
      Toast.fire({
        icon: "error",
        html: `
        <div style="height:50%;">
        <h1>Se han encontrado los siguientes errores:</h1>
        <div style="text-align: left; margin-left: 10px; color: red; height: 100px; overflow: auto;">
      <small>
      <strong>
      *</strong>${errores.join("<br><strong>*</strong>")}
      </small>
      </div>
      </div>`,
      });
    }
  };

  const CrearMetaAnual = () => {
    axios
      .post(
        "http://10.200.4.199:8000/api/create-MetaAnual",
        {
          MetaAnual: "",
          CreadoPor: localStorage.getItem("IdUsuario"),
          IdMir: IdMir,
          Estado: "En Captura",
          Id: "",
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        userXInst.map((user) => {
          enviarNotificacion(user.IdUsuario);
        });
        showResume();
      })
      .catch((err) => {
        err = 1;
        errores.push(err.response.data.result.error);
      });
  };

  const createMIR = (estado: string) => {
    if (estado === "Autorizada" && userSelected !== "0") {
      estado = "En Revisión";
    }
    if (estado === "En Autorización" && userSelected !== "0") {
      estado = "En Captura";
    }
    axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/create-mir",
        {
          MIR: MIR,
          Estado: estado,
          CreadoPor:
            userSelected !== "0"
              ? userSelected
              : localStorage.getItem("IdUsuario"),
          AnioFiscal: JSON.parse(MIR)?.encabezado.ejercicioFiscal,
          Institucion: JSON.parse(MIR)?.encabezado.institucion,
          Programa: JSON.parse(MIR)?.encabezado.nombre_del_programa,
          Eje: JSON.parse(MIR)?.encabezado.eje,
          Tematica: JSON.parse(MIR)?.encabezado.tema,
          IdMir: IdMir,
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        userXInst.map((user) => {
          enviarNotificacion(user.IdUsuario);
        });

        if (estado === "Autorizada") {
          CrearMetaAnual();
        }

        err = 1;
        errores.push(
          localStorage.getItem("Rol") === "Administrador"
            ? "¡MIR autorizada con éxito!"
            : "¡MIR enviada con éxito!"
        );
        if (comment != "") {
          comentMir(r.data.data.ID);
        }
        showResume();
      })
      .catch((err) => {
        err = 1;
        errores.push(err.response.data.result.error);
      });
  };

  const getUsuariosXInstitucion = () => {
    let inst = JSON.parse(MIR)?.encabezado.institucion;

    if (localStorage.getItem("Rol") === "Verificador") {
      inst = "admin";
    }

    axios
      .get(
        process.env.REACT_APP_APPLICATION_BACK + "/api/usuarioXInstitucion",
        {
          params: {
            IdUsuario: localStorage.getItem("IdUsuario"),
            Institucion: inst,
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
  };

  useEffect(() => {
    if (open) {
      getUsuariosXInstitucion();
      // setInstSelected(JSON.parse(MIR)?.encabezado.institucion);
    }
  }, [open]);

  const enviarNotificacion = (v: string) => {
    axios.post(
      process.env.REACT_APP_APPLICATION_BACK + "/api/create-notif",
      {
        IdUsuarioDestino: v,
        Titulo: "MIR",
        Mensaje: "Se ha creado una nueva MIR",
        IdUsuarioCreador: localStorage.getItem("IdUsuario"),
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
          height: "2vh",
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
              ? "Al confirmar, la MIR se autorizará y el apartado de Meta Anual para esta MIR será habilitado"
              : "Al confirmar, la MIR se enviará a los usuarios correspondientes para revisión"}
          </Typography>
        </Box>

        {newComent ? (
          <Box sx={{ width: "30vw" }}>
            <TextField
              multiline
              rows={3}
              label={"Agregar Comentario"}
              sx={{ width: "30vw" }}
              onChange={(v) => setComment(v.target.value)}
            ></TextField>
          </Box>
        ) : null}

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
              sx={{ display: "flex", width: "9vw" }}
              variant="contained"
              color="error"
              onClick={() => handleClose()}
            >
              <Typography sx={{ fontFamily: "MontserratRegular" }}>
                Cancelar
              </Typography>
            </Button>

            <Button
              sx={{ display: "flex", width: "11vw" }}
              variant="contained"
              color="info"
              onClick={() => {
                newComent ? setComment("") : setNewComent(!newComent);
                newComent ? setNewComent(!newComent) : setNewComent(!newComent);
              }}
            >
              {newComent ? "Cancelar comentario" : "Nuevo comentario"}
            </Button>

            <Button
              sx={{ display: "flex", width: "9vw" }}
              variant="contained"
              color="primary"
              onClick={() => {
                checkMir(
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
  NombreInstitucion: string;
  Nombre: string;
  ApellidoPaterno: string;
}
