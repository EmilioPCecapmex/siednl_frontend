/* eslint-disable array-callback-return */
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";
import { queries } from "../../queries";
export let errores: string[] = [];

export default function ModalSolicitaModif({
  open,
  handleClose,
  MIR,
  MIREdit,
  showResume,
  IdMir,
}: {
  open: boolean;
  handleClose: Function;
  MIR: string;
  MIREdit: string;
  showResume: Function;
  IdMir: string;
}) {
  const [userXInst, setUserXInst] = useState<Array<IIUserXInst>>([]);
  const [userSelected, setUserSelected] = useState("0");
  let err = 0;

  const [comment, setComment] = useState("");

  const comentMir = (id: string) => {
    axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/coment-mir",
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
        setComment("");
      })
      .catch((err) => {});
  };

  const checkUsuario = (estado: string) => {
    if (userSelected === "0" || userSelected === "") {
      return Toast.fire({
        icon: "error",
        title: "Introduce usuario al que se le solicita modificación",
      });
    } else {
      checkMir(estado);
    }
  };
  const checkMir = (v: string) => {
    errores = [];
    if (JSON.parse(MIR)?.encabezado.ejercicioFiscal === "") {
      err = 1;
      errores.push("<strong>Encabezado:</strong> año fiscal no seleccionado.");
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
      JSON.parse(MIR)?.fin.resumen === ""
    ) {
      err = 1;
      errores.push("<strong>FIN: Resumen Narrativo</strong> sin información.");
    }
    if (
      JSON.parse(MIR)?.fin.indicador === undefined ||
      JSON.parse(MIR)?.fin.indicador === ""
    ) {
      err = 1;
      errores.push("<strong>FIN: Indicador</strong> sin información.");
    }
    if (
      JSON.parse(MIR)?.fin.formula === undefined ||
      JSON.parse(MIR)?.fin.formula === ""
    ) {
      err = 1;
      errores.push("<strong>FIN: Fórmula</strong> sin información.");
    }
    if (
      JSON.parse(MIR)?.fin.frecuencia === undefined ||
      JSON.parse(MIR)?.fin.frecuencia === "" ||
      (JSON.parse(MIR)?.fin.frecuencia.toLowerCase() !== "anual" &&
        JSON.parse(MIR)?.fin.frecuencia.toLowerCase() !== "bienal")
    ) {
      err = 1;
      errores.push(
        "<strong>FIN: Frecuencia</strong>, solo puede ser Anual o Bienal."
      );
    }
    if (
      JSON.parse(MIR)?.fin.medios === undefined ||
      JSON.parse(MIR)?.fin.medios === ""
    ) {
      err = 1;
      errores.push(
        "<strong>FIN: Medios de Verificación</strong> sin información."
      );
    }
    if (
      JSON.parse(MIR)?.fin.supuestos === undefined ||
      JSON.parse(MIR)?.fin.supuestos === ""
    ) {
      err = 1;
      errores.push("<strong>FIN: Supuestos</strong> sin información.");
    }
    if (
      JSON.parse(MIR)?.proposito.resumen === undefined ||
      JSON.parse(MIR)?.proposito.resumen === ""
    ) {
      err = 1;
      errores.push(
        "<strong>PROPOSITO: Resumen Narrativo</strong> sin información."
      );
    }
    if (
      JSON.parse(MIR)?.proposito.indicador === undefined ||
      JSON.parse(MIR)?.proposito.indicador === ""
    ) {
      err = 1;
      errores.push("<strong>PROPOSITO: Indicador</strong> sin información.");
    }
    if (
      JSON.parse(MIR)?.proposito.formula === undefined ||
      JSON.parse(MIR)?.proposito.formula === ""
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
      JSON.parse(MIR)?.proposito.medios_verificacion === ""
    ) {
      err = 1;
      errores.push(
        "<strong>PROPOSITO: Medios de Verificación</strong> sin información."
      );
    }
    if (
      JSON.parse(MIR)?.proposito.supuestos === undefined ||
      JSON.parse(MIR)?.proposito.supuestos === ""
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
        componente.resumen === "" ||
        componente.resumen === null
      ) {
        err = 1;
        errores.push(
          `<strong> Componente ${
            index + 1
          } </strong>: Resumen Narrativo sin información.`
        );
      }
      if (componente.indicador === undefined || componente.indicador === "") {
        err = 1;
        errores.push(
          `<strong> Componente ${
            index + 1
          } </strong>: Indicador sin información.`
        );
      }
      if (componente.formula === undefined || componente.formula === "") {
        err = 1;
        errores.push(
          `<strong> Componente ${index + 1} </strong>: Fórmula sin información.`
        );
      }
      if (
        componente.frecuencia === undefined ||
        componente.frecuencia === "" ||
        (componente.frecuencia.toLowerCase() !== "semestral" &&
          componente.frecuencia.toLowerCase() !== "trimestral")
      ) {
        err = 1;
        errores.push(
          `<strong> Componente ${
            index + 1
          } </strong>: Frecuencia sin información.`
        );
      }
      if (componente.medios === undefined || componente.medios === "") {
        err = 1;
        errores.push(
          `<strong> Componente ${
            index + 1
          } </strong>: Medios de Verificación sin información.`
        );
      }
      if (componente.supuestos === undefined || componente.supuestos === "") {
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
        actividad.resumen === "" ||
        actividad.resumen === null
      ) {
        errores.push(
          `<strong> Actividad ${actividad.actividad} </strong>: Resumen Narrativo sin información.`
        );
        err = 1;
      }
      if (actividad.indicador === undefined || actividad.indicador === "") {
        err = 1;
        errores.push(
          `<strong> Actividad ${actividad.actividad} </strong>: Indicador sin información.`
        );
      }
      if (actividad.formula === undefined || actividad.formula === "") {
        errores.push(
          `<strong> Actividad ${actividad.actividad} </strong>: Fórmula sin información.`
        );
        err = 1;
      }
      if (
        actividad.frecuencia === undefined ||
        actividad.frecuencia === "" ||
        actividad.frecuencia.toLowerCase() !== "trimestral"
      ) {
        errores.push(
          `<strong> Actividad ${actividad.actividad} </strong>: Frecuencia sin información.`
        );
        err = 1;
      }
      if (actividad.medios === undefined || actividad.medios === "") {
        errores.push(
          `<strong> Actividad ${actividad.actividad} </strong>: Medios de Verificación sin información.`
        );
        err = 1;
      }
      if (actividad.supuestos === undefined || actividad.supuestos === "") {
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

  const createMIR = (estado: string) => {
    if (estado === "Autorizada" && userSelected !== "0") {
      estado = "En Revisión";
    } else if (estado === "En Autorización" && userSelected !== "0") {
      estado = "En Captura";
    }
    axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/create-mir",
        {
          MIR: MIREdit === undefined ? MIR : "[" + MIR + "," + MIREdit + "]",
          Estado: estado,
          CreadoPor:
            userSelected !== "0"
              ? userSelected
              : //va a cambiar
                localStorage.getItem("IdUsuario"),
          AnioFiscal: JSON.parse(MIR)?.encabezado.ejercicioFiscal.Label,
          IdEntidad: JSON.parse(MIR)?.encabezado.entidad.Id || localStorage.getItem("IdEntidad"),
          Programa: JSON.parse(MIR)?.encabezado.programa.Label,
          Eje: JSON.parse(MIR)?.encabezado.eje.Label,
          Tematica: JSON.parse(MIR)?.encabezado.tema.Label,
          IdMir: IdMir,
          // se va a modificar
          Rol: localStorage.getItem("Rol"),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        if (comment !== "") {
          comentMir(IdMir);
        }
        Toast.fire({
          icon: "success",
          title:
            localStorage.getItem("Rol") === "Verificador"
              ? "MIR enviada a capturador"
              : "MIR enviada a revisión",
        });

        enviarNotificacion();
        handleClose();
        showResume();
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: err.response.data.result.error,
        });
      });
  };

  useEffect(() => {
    let tipousuario = "";
    console.log("Entre");

    if (localStorage.getItem("Rol") === "Capturador")
      tipousuario = "Verificador";
    console.log(tipousuario);
    if (localStorage.getItem("Rol") === "Verificador")
      tipousuario = "Verificador";
    if (localStorage.getItem("Rol") === "Administrador")
      tipousuario = "VERIFICADOR_CAPTURADOR";

    if (open) {
      console.log(tipousuario);
      
      axios
        .post(process.env.REACT_APP_APPLICATION_BACK + "/api/tipo-usuario", 
           {
            TipoUsuario: tipousuario,
            IdEntidad: localStorage.getItem("IdEntidad"),
            IdApp: localStorage.getItem("IdApp"),
          },
          {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        })
        .then(({status,data}) => {
          if (status === 200) {
            console.log("UserXInst: ",data.data);
            console.log("UserXInst: ", data);
            setUserXInst(data.data);
          }
        });
    }
  }, [MIR, open]);

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

  const enviarNotificacion = () => {
    axios.post(
      process.env.REACT_APP_APPLICATION_BACK + "/api/create-notif",
      {
        IdUsuarioDestino: userSelected,
        Titulo: "MIR",
        Mensaje: "Se le ha solicitado una modificación.",
        CreadoPor: localStorage.getItem("IdUsuario"),
      },
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      }
    );
  };

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={() => handleClose()}>
      <DialogTitle sx={{ fontFamily: "MontserratBold" }}>
        Solicitud de modificación
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
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Typography
            sx={{ fontFamily: "MontserratMedium", textAlign: "center" }}
          >
            {MIR === undefined
              ? "Selecciona una institución en el encabezado para asignar un usuario"
              : JSON.parse(MIR)?.encabezado?.institucion !== ""
              ? `Selecciona un usuario de ${
                  JSON.parse(MIR)?.encabezado?.institucion
                } para solicitar la modificación`
              : "Selecciona una institución en el encabezado para asignar un usuario"}
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
              mb: 2,
            }}
            variant="standard"
          >
            <Select
              size="small"
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
                    {item.Nombre} {item.ApellidoPaterno} {item.ApellidoMaterno}{" "}
                    - {item.NombreUsuario}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>{" "}
        </Box>

        <Box sx={{ width: "100%", mb: 2 }}>
          <TextField
            multiline
            rows={2}
            label={"Agregar Comentario"}
            sx={{ width: "100%" }}
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
              justifyContent: "space-evenly",
              width: "100vw",
            }}
          >
            <Button
              sx={{
                ...queries.buttonCancelarSolicitudInscripcion,
                display: "flex",
                width: "15vw",
              }}
              variant="contained"
              onClick={() => handleClose()}
            >
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                Cancelar
              </Typography>
            </Button>

            <Button
              sx={{
                ...queries.buttonContinuarSolicitudInscripcion,
                display: "flex",
                width: "15vw",
              }}
              variant="contained"
              onClick={() => {
                checkUsuario(
                  localStorage.getItem("Rol") === "Capturador"
                    ? "En Revisión"
                    : localStorage.getItem("Rol") === "Verificador"
                    ? "En Autorización"
                    : "Autorizada"
                );
                handleClose();
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                {comment === "" ? "Enviar sin comentarios" : "Confirmar"}
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
  ApellidoMaterno: string;
  NombreUsuario: string;
}
