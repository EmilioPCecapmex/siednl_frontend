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

export let errores: string[] = [];

export default function ModalEnviarFT({
  open,
  handleClose,
  MA,
  MIR,
  FT,
  IdFT,
  IdMIR,
  IdMA,
  showResume,
}: {
  open: boolean;
  handleClose: Function;
  MA: string;
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

  const comentFT = (id: string) => {
    axios
      .post(
        "http://10.200.4.105:8000/api/coment-MA",
        {
          IdMA: id,
          Coment: comment,
          CreadoPor: localStorage.getItem("IdUsuario"),
          MIR_MA: "FT",
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

  let err = 0;

  const checkFT = (v: string) => {
    errores = [];
    if (JSON.parse(FT)?.fin === null) {
      err = 1;
      errores.push("Sección <strong>Fin</strong> incompleta.");
    }
    if (
      JSON.parse(FT)?.fin.tipoDeIndicador === undefined ||
      /^[\s]*$/.test(JSON.parse(FT)?.fin.tipoDeIndicador)
    ) {
      err = 1;
      errores.push("<strong>Fin</strong>: Tipo de indicador no seleccionado.");
    }
    if (
      JSON.parse(FT)?.fin.dimension === undefined ||
      /^[\s]*$/.test(JSON.parse(FT)?.fin.dimension)
    ) {
      err = 1;
      errores.push("<strong>Fin</strong>: Dimensión no seleccionado.");
    }
    if (
      JSON.parse(FT)?.fin.unidadDeMedida === undefined ||
      JSON.parse(FT)?.fin.unidadDeMedida === ""
    ) {
      err = 1;
      errores.push("<strong>Fin</strong>: Unidad de medida sin información.");
    }
    if (
        JSON.parse(FT)?.fin.claridad === undefined ||
        /^[\s]*$/.test(JSON.parse(FT)?.fin.claridad)
      ) {
        err = 1;
        errores.push("<strong>Fin</strong>: Claridad no seleccionado.");
      }
      if (
        JSON.parse(FT)?.fin.relevancia === undefined ||
        /^[\s]*$/.test(JSON.parse(FT)?.fin.relevancia)
      ) {
        err = 1;
        errores.push("<strong>Fin</strong>: Relevancia no seleccionado.");
      }
      if (
        JSON.parse(FT)?.fin.economia === undefined ||
        /^[\s]*$/.test(JSON.parse(FT)?.fin.economia)
      ) {
        err = 1;
        errores.push("<strong>Fin</strong>: Economia no seleccionado.");
      }
      if (
        JSON.parse(FT)?.fin.monitoreable === undefined ||
        /^[\s]*$/.test(JSON.parse(FT)?.fin.monitoreable)
      ) {
        err = 1;
        errores.push("<strong>Fin</strong>: Monitoreable no seleccionado.");
      }
      if (
        JSON.parse(FT)?.fin.adecuado === undefined ||
        /^[\s]*$/.test(JSON.parse(FT)?.fin.adecuado)
      ) {
        err = 1;
        errores.push("<strong>Fin</strong>: Adecuado no seleccionado.");
      }
      if (
        JSON.parse(FT)?.fin.aporte_marginal === undefined ||
        /^[\s]*$/.test(JSON.parse(FT)?.fin.aporte_marginal)
      ) {
        err = 1;
        errores.push("<strong>Fin</strong>: Aporte Marginal no seleccionado.");
      }
      if (JSON.parse(FT)?.proposito === null) {
        err = 1;
        errores.push("Sección <strong>Propósito</strong> incompleta.");
      }
      if (
        JSON.parse(FT)?.proposito.tipoDeIndicador === undefined ||
        /^[\s]*$/.test(JSON.parse(FT)?.proposito.tipoDeIndicador)
      ) {
        err = 1;
        errores.push("<strong>Propósito</strong>: Tipo de indicador no seleccionado.");
      }
      if (
        JSON.parse(FT)?.proposito.dimension === undefined ||
        /^[\s]*$/.test(JSON.parse(FT)?.proposito.dimension)
      ) {
        err = 1;
        errores.push("<strong>Propósito</strong>: Dimensión no seleccionado.");
      }
      if (
        JSON.parse(FT)?.proposito.unidadDeMedida === undefined ||
        JSON.parse(FT)?.proposito.unidadDeMedida === ""
      ) {
        err = 1;
        errores.push("<strong>Propósito</strong>: Unidad de medida sin información.");
      }
      if (
          JSON.parse(FT)?.proposito.claridad === undefined ||
          /^[\s]*$/.test(JSON.parse(FT)?.proposito.claridad)
        ) {
          err = 1;
          errores.push("<strong>Propósito</strong>: Claridad no seleccionado.");
        }
        if (
          JSON.parse(FT)?.proposito.relevancia === undefined ||
          /^[\s]*$/.test(JSON.parse(FT)?.proposito.relevancia)
        ) {
          err = 1;
          errores.push("<strong>Fin</strong>: Relevancia no seleccionado.");
        }
        if (
          JSON.parse(FT)?.proposito.economia === undefined ||
          /^[\s]*$/.test(JSON.parse(FT)?.proposito.economia)
        ) {
          err = 1;
          errores.push("<strong>Propósito</strong>: Economia no seleccionado.");
        }
        if (
          JSON.parse(FT)?.proposito.monitoreable === undefined ||
          /^[\s]*$/.test(JSON.parse(FT)?.proposito.monitoreable)
        ) {
          err = 1;
          errores.push("<strong>Propósito</strong>: Monitoreable no seleccionado.");
        }
        if (
          JSON.parse(FT)?.proposito.adecuado === undefined ||
          /^[\s]*$/.test(JSON.parse(FT)?.proposito.adecuado)
        ) {
          err = 1;
          errores.push("<strong>Propósito</strong>: Adecuado no seleccionado.");
        }
        if (
          JSON.parse(FT)?.proposito.aporte_marginal === undefined ||
          /^[\s]*$/.test(JSON.parse(FT)?.proposito.aporte_marginal)
        ) {
          err = 1;
          errores.push("<strong>Propósito</strong>: Aporte marginal no seleccionado.");
        }

    checkComponentes(v);
  };

  const checkComponentes = (v: string) => {
    JSON.parse(FT)?.componentes.every((componente: any, index: number) => {
      if (
        componente.tipoDeIndicador === undefined ||
        /^[\s]*$/.test(componente.tipoDeIndicador) 
      ) {
        err = 1;
        errores.push(
          `<strong> Componente ${
            index + 1
          } </strong>: Tipo de indicador no seleccionado.`
        );
      }
      if (
        componente.dimension === undefined ||
        /^[\s]*$/.test(componente.dimension) 
      ) {
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
        componente.unidadDeMedida === null
      ) {
        err = 1;
        errores.push(
          `<strong> Componente ${
            index + 1
          } </strong>: Unidad de medida sin información.`
        );
      }
      if (
        componente.claridad === undefined ||
        /^[\s]*$/.test(componente.claridad) 
      ) {
        err = 1;
        errores.push(
          `<strong> Componente ${
            index + 1
          } </strong>: Claridad no seleccionado.`
        );
      }
      if (
        componente.relevancia === undefined ||
        /^[\s]*$/.test(componente.relevancia) 
      ) {
        err = 1;
        errores.push(
          `<strong> Componente ${
            index + 1
          } </strong>: Relevancia no seleccionado.`
        );
      }
      if (
        componente.economia === undefined ||
        /^[\s]*$/.test(componente.economia) 
      ) {
        err = 1;
        errores.push(
          `<strong> Componente ${
            index + 1
          } </strong>: Economia no seleccionado.`
        );
      }
      if (
        componente.monitoreable === undefined ||
        /^[\s]*$/.test(componente.monitoreable) 
      ) {
        err = 1;
        errores.push(
          `<strong> Componente ${
            index + 1
          } </strong>: Monitoreable no seleccionado.`
        );
      }
      if (
        componente.adecuado === undefined ||
        /^[\s]*$/.test(componente.adecuado) 
      ) {
        err = 1;
        errores.push(
          `<strong> Componente ${
            index + 1
          } </strong>: Adecuado no seleccionado.`
        );
      }
      if (
        componente.aporte_marginal === undefined ||
        /^[\s]*$/.test(componente.aporte_marginal) 
      ) {
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
    JSON.parse(MA)?.actividades.every((actividad: any, index: number) => {
      if (
        actividad.metaAnual === undefined ||
        /^[\s]*$/.test(actividad.metaAnual)
      ) {
        errores.push(
          `<strong> Actividad ${actividad.actividad} </strong>: Meta anual sin información.`
        );
        err = 1;
      }
      if (
        actividad.metaAnual !== actividad.metasPorFrecuencia[0].trimestre4
      ) {
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
        actividad.valorDenominador === undefined ||
        /^[\s]*$/.test(actividad.valorDenominador)
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
      crearFichaTecnica(v);
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

  const crearFichaTecnica = (estado: string) => {
    axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/create-MetaAnual",
        {
          FichaTecnica: FT,
          CreadoPor: localStorage.getItem("IdUsuario"),
          IdMir: IdMIR,
          IdMa: IdMA,
          Estado: estado,
          Id: IdFT,
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

        if (comment !== "") {
            comentFT(r.data.data.ID);
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
      .get(
        process.env.REACT_APP_APPLICATION_BACK + "/api/usuarioXInstitucion",
        {
          params: {
            IdUsuario: localStorage.getItem("IdUsuario"),
            institucion: inst,
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
    }
  }, [open]);

  const enviarNotificacion = (v: string) => {
    axios.post(
      process.env.REACT_APP_APPLICATION_BACK + "/api/create-notif",
      {
        IdUsuarioDestino: v,
        Titulo: "FT",
        Mensaje: "Se ha creado una nueva Ficha Técnica",
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
              ? "Al confirmar, la Meta Anual se autorizará y el apartado de la Ficha Técnica será habilitado"
              : localStorage.getItem("Rol") === "Verificador"
              ? "Al confirmar, la Meta Anual se enviará a los usuarios correspondientes para autorización"
              : "Al confirmar, la Meta Anual se enviará a los usuarios correspondientes para revisión"}
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
}
