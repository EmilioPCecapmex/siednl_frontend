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
  showResume
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
        "http://10.200.4.199:8000/api/coment-mir",
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
        Toast.fire({
          icon: "success",
          title: "Comentario añadido",
        });
      })
      .catch((err) => {});
  };

  const checkComponentes = (v: string) => {
    JSON.parse(MIR)?.componentes.every((componente: any, index: number, array:number) => {
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
          false
        );
      } else {
          return console.log(index), true;
      }
    });
    return (
      checkActividades(v),
      console.log('componentes check')
    )
  };

  const checkActividades = (v: string) => {
    JSON.parse(MIR)?.actividades.every((actividad: any, index: number, array:number) => {
      console.log(JSON.parse(MIR));
      console.log(actividad);
      console.log(array);
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
          false
        );
      } else if (
        actividad.formula === undefined ||
        actividad.formula === ""
      ) {
        return (
          Toast.fire({
            icon: "error",
            title: `Formula de la ${actividad.actividad} aún faltante`,
          }),
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
          false
        );
      } else if (actividad.medios === undefined || actividad.medios === "") {
        return (
          Toast.fire({
            icon: "error",
            title: `Medios de Verificación de la ${actividad.actividad} aún faltante`,
          }),
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
          false
        );
      } else {
          return console.log(index), true;
      }
    });
    return (
      console.log('actividades check'),
      createMIR(v)
    )
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
      console.log(JSON.parse(MIR));
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
      console.log(JSON.parse(MIR));

      checkComponentes(v);
    }
  };

  const createMIR = (estado: string) => {
    console.log(JSON.parse(MIR));

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
          enviarNotificacion(user.IdUsuario)
        })

        Toast.fire({
          icon: "success",
          title: r.data.data.message,
        });

        showResume()

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

    if(localStorage.getItem("Rol") === "Verificador"){
      inst = 'admin';
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
          console.log(r.data.data)
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
    axios
      .post(
        "http://10.200.4.105:8000/api/create-notif",
        {
          IdUsuarioDestino: v,
          Titulo: 'MIR',
          Mensaje: 'Se ha creado una nueva MIR',
          IdUsuarioCreador: localStorage.getItem("IdUsuario"),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
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
    <Dialog fullWidth maxWidth="sm" open={open} onClose={() => handleClose()}>
      <DialogTitle sx={{ fontFamily: "MontserratBold" }}>
        Confirmar Envío
      </DialogTitle>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            backgroundColor: "#BBBABA",
            width: "60vw",
            height: "0.1vh",
            display: "flex",
            justifyContent: "center",
          }}
        />
      </Box>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {errorForm.visible ? <AlertForm /> : null}

        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <Typography sx={{ fontFamily: "MontserratMedium" }}>
            Al confirmar, la MIR se enviará a los usuarios correspondientes para
            revisión.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {newComent ? (
              <TextField
                multiline
                rows={2}
                sx={{ width: "30vw", mt: 2 }}
                placeholder="Agregar Comentario"
                onChange={(v) => setComment(v.target.value)}
              ></TextField>
            ) : null}
          </Box>
          <Typography>
            Delegar MIR a usuario verificador de: {instSelected}
          </Typography>
          <FormControl
            sx={{
              display: "flex",
              width: "70%",
              alignItems: "center",
              justifyContent: "center",
              border: 1,
              borderRadius: 1,
              borderColor: "#616161",
            }}
          >
            <Select
              size="small"
              variant="standard"
              sx={{ fontFamily: "MontserratRegular" }}
              fullWidth
              value={userSelected}
              onChange={(v) => setUserSelected(v.target.value)}
              disableUnderline
            >
              <MenuItem value={"0"} disabled>
                Selecciona
              </MenuItem>

              {userXInst.map((item) => {
                return (
                  <MenuItem value={item.IdUsuario} key={item.IdUsuario}>
                    {item.Nombre}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>{" "}
          <Typography sx={{ fontFamily: "MontserratMedium", textAlign: 'center' }}>
            Al confirmar, la MIR se enviará a los usuarios correspondientes para
            revisión.
          </Typography>
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
              justifyContent: "space-evenly",
              width: "100vw",
              mt: "4vh",
            }}
          >
            <Button
              sx={{ display: "flex", width: "10vw" }}
              variant="contained"
              color="error"
              onClick={() => handleClose()}
            >
              <Typography sx={{fontFamily: 'MontserratRegular'}}>Cancelar</Typography>
            </Button>

            <Button
              sx={{ display: "flex", width: "5vw" }}
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
              sx={{ display: "flex", width: "10vw" }}
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
              }}
            >
              <Typography sx={{fontFamily: 'MontserratRegular'}}>Confirmar</Typography>
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
