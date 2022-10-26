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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  AlertColor,
  Typography,
  FormHelperText,
} from "@mui/material";
import { IUsuarios } from "../../screens/notification/interfaces";

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
  const [instSelected, setInstSelected] = useState("");

  const [newComent, setNewComent] = React.useState(false);

  const comentMir = (id: string) => {
    axios
      .post(
        "http://10.200.4.105:8000/api/coment-mir",
        {
          IdMir: id,
          Coment: comment,
          CreadoPor: localStorage.getItem("IdUsuario"),
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
    if (JSON.parse(MIR)?.encabezado.ejercicioFiscal === "") {
      return Toast.fire({
        icon: "error",
        title: "Selecciona año fiscal.",
      });
    } else if (JSON.parse(MIR)?.encabezado.institucion === "") {
      return Toast.fire({
        icon: "error",
        title: "Selecciona institución.",
      });
    } else if (JSON.parse(MIR)?.encabezado.nombre_del_programa === "") {
      return Toast.fire({
        icon: "error",
        title: "Selecciona programa.",
      });
    } else if (JSON.parse(MIR)?.encabezado.eje === "") {
      return Toast.fire({
        icon: "error",
        title: "Selecciona eje.",
      });
    } else if (JSON.parse(MIR)?.encabezado.tema === "") {
      return Toast.fire({
        icon: "error",
        title: "Selecciona temática.",
      });
    } else if (JSON.parse(MIR)?.encabezado.objetivo === "") {
      return Toast.fire({
        icon: "error",
        title: "Selecciona objetivo.",
      });
    } else if (JSON.parse(MIR)?.encabezado.estrategia === "") {
      return Toast.fire({
        icon: "error",
        title: "Selecciona estrategia.",
      });
    } else if (JSON.parse(MIR)?.encabezado.lineas_de_accion === "") {
      return Toast.fire({
        icon: "error",
        title: "Selecciona al menos 1 línea de acción.",
      });
    } else if (JSON.parse(MIR)?.encabezado.beneficiario === "") {
      return Toast.fire({
        icon: "error",
        title: "Selecciona beneficiario",
      });
    } else if (JSON.parse(MIR)?.fin === null) {
      return Toast.fire({
        icon: "error",
        title: "Apartado 'Fin' sin completar",
      });
    } else if (
      JSON.parse(MIR)?.fin.resumen === undefined ||
      JSON.parse(MIR)?.fin.resumen === ""
    ) {
      return Toast.fire({
        icon: "error",
        title: "Resumen narrativo del apartado 'Fin' aún faltante",
      });
    } else if (
      JSON.parse(MIR)?.fin.indicador === undefined ||
      JSON.parse(MIR)?.fin.indicador === ""
    ) {
      return Toast.fire({
        icon: "error",
        title: "Indicador del apartado 'Fin' aún faltante",
      });
    } else if (
      JSON.parse(MIR)?.fin.formula === undefined ||
      JSON.parse(MIR)?.fin.formula === ""
    ) {
      return Toast.fire({
        icon: "error",
        title: "Fórmula del apartado 'Fin' aún faltante",
      });
    } else if (
      JSON.parse(MIR)?.fin.frecuencia === undefined ||
      JSON.parse(MIR)?.fin.frecuencia === "" ||
      (JSON.parse(MIR)?.fin.frecuencia.toLowerCase() !== "anual" &&
        JSON.parse(MIR)?.fin.frecuencia.toLowerCase() !== "bienal")
    ) {
      return Toast.fire({
        icon: "error",
        title: "Frecuencia del apartado 'Fin' debe ser 'Anual' ó 'Bienal'",
      });
    } else if (
      JSON.parse(MIR)?.fin.medios === undefined ||
      JSON.parse(MIR)?.fin.medios === ""
    ) {
      return Toast.fire({
        icon: "error",
        title: "Medios de verificación del apartado 'Fin' aún faltante",
      });
    } else if (
      JSON.parse(MIR)?.fin.supuestos === undefined ||
      JSON.parse(MIR)?.fin.supuestos === ""
    ) {
      return Toast.fire({
        icon: "error",
        title: "Supuestos del apartado 'Fin' aún faltante",
      });
    } else if (
      JSON.parse(MIR)?.proposito.resumen === undefined ||
      JSON.parse(MIR)?.proposito.resumen === ""
    ) {
      return Toast.fire({
        icon: "error",
        title: "Resumen narrativo del apartado 'Propósito' aún faltante",
      });
    } else if (
      JSON.parse(MIR)?.proposito.indicador === undefined ||
      JSON.parse(MIR)?.proposito.indicador === ""
    ) {
      return Toast.fire({
        icon: "error",
        title: "Indicador del apartado 'Propósito' aún faltante",
      });
    } else if (
      JSON.parse(MIR)?.proposito.formula === undefined ||
      JSON.parse(MIR)?.proposito.formula === ""
    ) {
      return Toast.fire({
        icon: "error",
        title: "Fórmula del apartado 'Propósito' aún faltante",
      });
    } else if (
      JSON.parse(MIR)?.proposito.frecuencia === undefined ||
      JSON.parse(MIR)?.proposito.frecuencia === "" ||
      JSON.parse(MIR)?.proposito.frecuencia.toLowerCase() !== "anual"
    ) {
      return Toast.fire({
        icon: "error",
        title: "Frecuencia del apartado 'Propósito' debe ser 'Anual'",
      });
    } else if (
      JSON.parse(MIR)?.proposito.medios_verificacion === undefined ||
      JSON.parse(MIR)?.proposito.medios_verificacion === ""
    ) {
      return Toast.fire({
        icon: "error",
        title: "Medios de verificación del apartado 'Propósito' aún faltante",
      });
    } else if (
      JSON.parse(MIR)?.proposito.supuestos === undefined ||
      JSON.parse(MIR)?.proposito.supuestos === ""
    ) {
      return Toast.fire({
        icon: "error",
        title: "Supuestos del apartado 'Propósito' aún faltante",
      });
    } else {
      checkComponentes(v);
    }
  };

  const checkComponentes = (v: string) => {
    let err = 0;
    JSON.parse(MIR)?.componentes.every((componente: any, index: number) => {
      if (
        componente.resumen === undefined ||
        componente.resumen === "" ||
        componente.resumen === null
      ) {
        return (
          Toast.fire({
            icon: "error",
            title: `Resumen narrativo del componente ${index + 1} aún faltante`,
          }),
          (err = 1),
          false
        );
      } else if (
        componente.indicador === undefined ||
        componente.indicador === ""
      ) {
        return (
          Toast.fire({
            icon: "error",
            title: `Indicador del componente ${index + 1} aún faltante`,
          }),
          (err = 1),
          false
        );
      } else if (
        componente.formula === undefined ||
        componente.formula === ""
      ) {
        return (
          Toast.fire({
            icon: "error",
            title: `Formula del componente ${index + 1} aún faltante`,
          }),
          (err = 1),
          false
        );
      } else if (
        componente.frecuencia === undefined ||
        componente.frecuencia === ""
      ) {
        return (
          Toast.fire({
            icon: "error",
            title: `Frecuencia del componente ${index + 1} aún faltante`,
          }),
          (err = 1),
          false
        );
      } else if (componente.medios === undefined || componente.medios === "") {
        return (
          Toast.fire({
            icon: "error",
            title: `Medios de Verificación del componente ${
              index + 1
            } aún faltante`,
          }),
          (err = 1),
          false
        );
      } else if (
        componente.supuestos === undefined ||
        componente.supuestos === ""
      ) {
        return (
          Toast.fire({
            icon: "error",
            title: `Supuestos del componente ${index + 1} aún faltante`,
          }),
          (err = 1),
          false
        );
      } else {
        return true;
      }
    });
    if (err !== 1) {
      checkActividades(v);
    }
  };

  const checkActividades = (v: string) => {
    let err = 0;
    JSON.parse(MIR)?.actividades.every((actividad: any, index: number) => {
      if (
        actividad.resumen === undefined ||
        actividad.resumen === "" ||
        actividad.resumen === null
      ) {
        return (
          Toast.fire({
            icon: "error",
            title: `Resumen narrativo de la ${actividad.actividad} aún faltante`,
          }),
          (err = 1),
          false
        );
      } else if (
        actividad.indicador === undefined ||
        actividad.indicador === ""
      ) {
        return (
          Toast.fire({
            icon: "error",
            title: `Indicador de la ${actividad.actividad} aún faltante`,
          }),
          (err = 1),
          false
        );
      } else if (actividad.formula === undefined || actividad.formula === "") {
        return (
          Toast.fire({
            icon: "error",
            title: `Formula de la ${actividad.actividad} aún faltante`,
          }),
          (err = 1),
          false
        );
      } else if (
        actividad.frecuencia === undefined ||
        actividad.frecuencia === ""
      ) {
        return (
          Toast.fire({
            icon: "error",
            title: `Frecuencia de la ${actividad.actividad} aún faltante`,
          }),
          (err = 1),
          false
        );
      } else if (actividad.medios === undefined || actividad.medios === "") {
        return (
          Toast.fire({
            icon: "error",
            title: `Medios de Verificación de la ${actividad.actividad} aún faltante`,
          }),
          (err = 1),
          false
        );
      } else if (
        actividad.supuestos === undefined ||
        actividad.supuestos === ""
      ) {
        return (
          Toast.fire({
            icon: "error",
            title: `Supuestos de la ${actividad.actividad} aún faltante`,
          }),
          (err = 1),
          false
        );
      } else {
        return true;
      }
    });
    if (err !== 1) {
      createMIR(v);
    }
  };

  const createMIR = (estado: string) => {
    if (estado === "Autorizada" && userSelected !== "0") {
      estado = "En Revisión";
    } else if (estado === "En Autorización" && userSelected !== "0") {
      estado = "En Captura";
    }

    
    axios
      .post(
        "http://10.200.4.105:8000/api/create-mir",
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

        Toast.fire({
          icon: "success",
          title: r.data.data.message,
        });
        if (comment != "") {
          comentMir(r.data.data.ID);
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

  const getUsuariosXInstitucion = () => {
    let inst = JSON.parse(MIR)?.encabezado.institucion;

    if (localStorage.getItem("Rol") === "Verificador") {
      inst = "admin";
    }

    axios
      .get("http://10.200.4.105:8000/api/usuarioXInstitucion", {
        params: {
          IdUsuario: localStorage.getItem("IdUsuario"),
          Institucion: inst,
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          setUserXInst(r.data.data);
        }
      });
  };

  useEffect(() => {
    if (open) {
      getUsuariosXInstitucion();
      setInstSelected(JSON.parse(MIR)?.encabezado.institucion);
    }
  }, [open]);

  const enviarNotificacion = (v: string) => {
    axios.post(
      "http://10.200.4.105:8000/api/create-notif",
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
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const [errorForm, setErrorsForm] = useState({
    visible: false,
    text: "",
    type: "",
  });

  const AlertForm = () => {
    return (
      <Box sx={{ mt: "1vh", mb: "2vh" }}>
        <Alert severity={errorForm.type as AlertColor}>{errorForm.text}</Alert>
      </Box>
    );
  };

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
        Confirmar Envío
      </DialogTitle>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {errorForm.visible ? <AlertForm /> : null}

        <Box
          sx={{
            width: "40vw",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            mb: 2,
          }}
        >
          <Typography
            sx={{ fontFamily: "MontserratMedium", textAlign: "center" }}
          >
            Al confirmar, la MIR se enviará a los usuarios correspondientes para
            revisión.
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
                  localStorage.getItem("Rol") == "Capturador"
                    ? "En Revisión"
                    : localStorage.getItem("Rol") == "Verificador"
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
