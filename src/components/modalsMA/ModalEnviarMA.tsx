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

export default function ModalEnviarMA({
  open,
  handleClose,
  MA,
  IdMA,
  IdMIR,
}: {
  open: boolean;
  handleClose: Function;
  MA: string;
  IdMA: string;
  IdMIR: string;
}) {
  const [comment, setComment] = useState("");

  const [userXInst, setUserXInst] = useState<Array<IIUserXInst>>([]);
  const [userSelected, setUserSelected] = useState("0");
  const [instSelected, setInstSelected] = useState("");

  const [newComent, setNewComent] = React.useState(false);

  const comentMA = (id: string) => {
    axios
      .post(
        "http://10.200.4.105:8000/api/coment-MA",
        {
          IdMA: id,
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

  const checkMA = (v: string) => {
    if (JSON.parse(MA)?.fin=== null) {
      return Toast.fire({
        icon: "error",
        title: "Apartado 'Fin' sin completar",
      });
    } else if (
      JSON.parse(MA)?.fin.metaAnual === undefined ||
      JSON.parse(MA)?.fin.metaAnual === ""
    ) {
      return Toast.fire({
        icon: "error",
        title: "Meta anual del apartado 'Fin' aún faltante",
      });
    } else if (
      JSON.parse(MA)?.fin.lineaBase  === undefined ||
      JSON.parse(MA)?.fin.lineaBase === ""
    ) {
      return Toast.fire({
        icon: "error",
        title: "Línea base del apartado 'Fin' aún faltante",
      });
    } else if (
      JSON.parse(MA)?.fin.valorNumerador === undefined ||
      JSON.parse(MA)?.fin.valorNumerador === ""
    ) {
      return Toast.fire({
        icon: "error",
        title: "Valor numerador del apartado 'Fin' aún faltante",
      });
    } else if (
      JSON.parse(MA)?.fin.valorDenominador === undefined ||
      JSON.parse(MA)?.fin.valorDenominador === "" 
    ) {
      return Toast.fire({
        icon: "error",
        title: "Valor Denominador del apartado 'Fin' aún faltante",
      });
    } else if (
      JSON.parse(MA)?.fin.sentidoDelIndicador === undefined ||
      JSON.parse(MA)?.fin.sentidoDelIndicador === ""
    ) {
      return Toast.fire({
        icon: "error",
        title: "Sentido del lineaBase del apartado 'Fin' aún faltante",
      });
    } else if (
      JSON.parse(MA)?.fin.unidadResponsable === undefined ||
      JSON.parse(MA)?.fin.unidadResponsable === ""
    ) {
      return Toast.fire({
        icon: "error",
        title: "Unidad responsable del apartado 'Fin' aún faltante",
      });
    } else if (
      JSON.parse(MA)?.fin.descIndicador === undefined ||
      JSON.parse(MA)?.fin.descIndicador === ""
    ) {
      return Toast.fire({
        icon: "error",
        title: "Descripción del lineaBase del apartado 'Fin' aún faltante",
      });
    } else if (
      JSON.parse(MA)?.fin.descNumerador === undefined ||
      JSON.parse(MA)?.fin.descNumerador === ""
    ) {
      return Toast.fire({
        icon: "error",
        title: "Descripción del numerador del apartado 'Fin' aún faltante",
      });
    } else if (
      JSON.parse(MA)?.fin.descDenominador === undefined ||
      JSON.parse(MA)?.fin.descDenominador === ""
    ) {
      return Toast.fire({
        icon: "error",
        title: "Descripción del numerador del apartado 'Fin' aún faltante",
      });
    } else if (JSON.parse(MA)?.proposito=== null) {
      return Toast.fire({
        icon: "error",
        title: "Apartado 'Propósito' sin completar",
      });
    } else if (
      JSON.parse(MA)?.proposito.metaAnual === undefined ||
      JSON.parse(MA)?.proposito.metaAnual === ""
    ) {
      return Toast.fire({
        icon: "error",
        title: "Meta anual del apartado 'Propósito' aún faltante",
      });
    } else if (
      JSON.parse(MA)?.proposito.lineaBase  === undefined ||
      JSON.parse(MA)?.proposito.lineaBase === ""
    ) {
      return Toast.fire({
        icon: "error",
        title: "Línea base del apartado 'Propósito' aún faltante",
      });
    } else if (
      JSON.parse(MA)?.proposito.valorNumerador === undefined ||
      JSON.parse(MA)?.proposito.valorNumerador === ""
    ) {
      return Toast.fire({
        icon: "error",
        title: "Valor numerador del apartado 'Propósito' aún faltante",
      });
    } else if (
      JSON.parse(MA)?.proposito.valorDenominador === undefined ||
      JSON.parse(MA)?.proposito.valorDenominador === "" 
    ) {
      return Toast.fire({
        icon: "error",
        title: "Valor Denominador del apartado 'Propósito' aún faltante",
      });
    } else if (
      JSON.parse(MA)?.proposito.sentidoDelIndicador === undefined ||
      JSON.parse(MA)?.proposito.sentidoDelIndicador === ""
    ) {
      return Toast.fire({
        icon: "error",
        title: "Sentido del lineaBase del apartado 'Propósito' aún faltante",
      });
    } else if (
      JSON.parse(MA)?.proposito.unidadResponsable === undefined ||
      JSON.parse(MA)?.proposito.unidadResponsable === ""
    ) {
      return Toast.fire({
        icon: "error",
        title: "Unidad responsable del apartado 'Propósito' aún faltante",
      });
    } else if (
      JSON.parse(MA)?.proposito.descIndicador === undefined ||
      JSON.parse(MA)?.proposito.descIndicador === ""
    ) {
      return Toast.fire({
        icon: "error",
        title: "Descripción del lineaBase del apartado 'Propósito' aún faltante",
      });
    } else if (
      JSON.parse(MA)?.proposito.descNumerador === undefined ||
      JSON.parse(MA)?.proposito.descNumerador === ""
    ) {
      return Toast.fire({
        icon: "error",
        title: "Descripción del numerador del apartado 'Propósito' aún faltante",
      });
    } else if (
      JSON.parse(MA)?.proposito.descDenominador === undefined ||
      JSON.parse(MA)?.proposito.descDenominador === ""
    ) {
      return Toast.fire({
        icon: "error",
        title: "Descripción del numerador del apartado 'Propósito' aún faltante",
      });
    } else {
      checkComponentes(v);
    }
  };

  const checkComponentes = (v: string) => {
    let err = 0;
    JSON.parse(MA)?.componentes.every((componente: any, index: number) => {
      if (
        componente.metaAnual === undefined ||
        componente.metaAnual === "" ||
        componente.metaAnual === null
      ) {
        return (
          Toast.fire({
            icon: "error",
            title: `Meta anual del componente ${index + 1} aún faltante`,
          }),
          (err = 1),
          false
        );
      } else if (
        componente.lineaBase === undefined ||
        componente.lineaBase === ""
      ) {
        return (
          Toast.fire({
            icon: "error",
            title: `Línea base del componente ${index + 1} aún faltante`,
          }),
          (err = 1),
          false
        );
      } else if (
        componente.metasPorFrecuencia[0].semestre1 === undefined ||
        componente.metasPorFrecuencia[0].semestre1 === ""
      ) {
        return (
          Toast.fire({
            icon: "error",
            title: `Semestre 1 de las metas por frecuencia del componente ${index + 1} aún faltante`,
          }),
          (err = 1),
          false
        );
      } else if (
        componente.valorNumerador === undefined ||
        componente.valorNumerador === "" 
      ) {
        return (
          Toast.fire({
            icon: "error",
            title: `Valor Numerador del componente ${index + 1} aún faltante`,
          }),
          (err = 1),
          false
        );
      } else if (componente.valorDenominador === undefined || componente.valorDenominador === "") {
        return (
          Toast.fire({
            icon: "error",
            title: `Valor del denominador del componente ${
              index + 1
            } aún faltante`,
          }),
          (err = 1),
          false
        );
      } else if (
        componente.sentidoDelIndicador === undefined ||
        componente.sentidoDelIndicador === ""
      ) {
        return (
          Toast.fire({
            icon: "error",
            title: `Sentido del indicador del componente ${index + 1} aún faltante`,
          }),
          (err = 1),
          false
        );
      } else if (
        componente.unidadResponsable === undefined ||
        componente.unidadResponsable === ""
      ) {
        return (
          Toast.fire({
            icon: "error",
            title: `Unidad Responsable de reportar el indicador del componente ${index + 1} aún faltante`,
          }),
          (err = 1),
          false
        );
      } else if (
        componente.descIndicador === undefined ||
        componente.descIndicador === ""
      ) {
        return (
          Toast.fire({
            icon: "error",
            title: `Descripción del indicador del componente ${index + 1} aún faltante`,
          }),
          (err = 1),
          false
        );
      } else if (
        componente.descNumerador === undefined ||
        componente.descNumerador === ""
      ) {
        return (
          Toast.fire({
            icon: "error",
            title: `Descripción del numerador del componente ${index + 1} aún faltante`,
          }),
          (err = 1),
          false
        );
      } else if (
        componente.descDenominador === undefined ||
        componente.descDenominador === ""
      ) {
        return (
          Toast.fire({
            icon: "error",
            title: `Descripción del denominador del componente ${index + 1} aún faltante`,
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
    JSON.parse(MA)?.actividades.every((actividad: any, index: number) => {
      if (
        actividad.metaAnual === undefined ||
        actividad.metaAnual === "" ||
        actividad.metaAnual === null
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
        actividad.lineaBase === undefined ||
        actividad.lineaBase === ""
      ) {
        return (
          Toast.fire({
            icon: "error",
            title: `Indicador de la ${actividad.actividad} aún faltante`,
          }),
          (err = 1),
          false
        );
      } else if (actividad.metasPorFrecuencia[0].semestre1 === undefined || actividad.metasPorFrecuencia[0].semestre1 === "") {
        return (
          Toast.fire({
            icon: "error",
            title: `Formula de la ${actividad.actividad} aún faltante`,
          }),
          (err = 1),
          false
        );
      } else if (
        actividad.valorNumerador === undefined ||
        actividad.valorNumerador === "" ||
        actividad.valorNumerador.toLowerCase() !== "trimestral"
      ) {
        return (
          Toast.fire({
            icon: "error",
            title: `Frecuencia de la ${actividad.actividad} aún faltante`,
          }),
          (err = 1),
          false
        );
      } else if (actividad.valorDenominador === undefined || actividad.valorDenominador === "") {
        return (
          Toast.fire({
            icon: "error",
            title: `Medios de Verificación de la ${actividad.actividad} aún faltante`,
          }),
          (err = 1),
          false
        );
      } else if (
        actividad.sentidoDelIndicador === undefined ||
        actividad.sentidoDelIndicador === ""
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
      creaMA(v);
    }
  };

  const creaMA = (estado: string) => {
    if (estado === "Autorizada" && userSelected !== "0") {
      estado = "En Revisión";
    } else if (estado === "En Autorización" && userSelected !== "0") {
      estado = "En Captura";
    }
    axios
      .post(
        "http://10.200.4.105:8000/api/create-MA",
        {
          MetaAnual: MA,
          Estado: estado,
          IdMir: IdMIR,
          CreadoPor:
            userSelected !== "0"
              ? userSelected
              : localStorage.getItem("IdUsuario"),
          IdMA: IdMA,
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
          comentMA(r.data.data.ID);
        }
        // showResume();
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: err.response.data.result.error,
        });
      });
  };

  const getUsuariosXlineaBase = () => {
    let inst = JSON.parse(MA)?.fin.lineaBase;

    if (localStorage.getItem("Rol") === "Verificador") {
      inst = "admin";
    }

    axios
      .get("http://10.200.4.105:8000/api/usuarioXlineaBase", {
        params: {
          IdUsuario: localStorage.getItem("IdUsuario"),
          lineaBase: inst,
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
      getUsuariosXlineaBase();
      setInstSelected(JSON.parse(MA)?.fin.lineaBase);
    }
  }, [open]);

  const enviarNotificacion = (v: string) => {
    axios.post(
      "http://10.200.4.105:8000/api/create-notif",
      {
        IdUsuarioDestino: v,
        Titulo: "MA",
        Mensaje: "Se ha creado una nueva MA",
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
    <Dialog fullWidth maxWidth="lg" open={open} onClose={() => handleClose()}>
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
            Al confirmar, la Meta Anual se enviará a los usuarios correspondientes para
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
                checkMA(
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
  NombrelineaBase: string;
  Nombre: string;
  ApellidoPaterno: string;
}
