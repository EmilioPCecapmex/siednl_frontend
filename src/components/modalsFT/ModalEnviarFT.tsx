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

  const checkFTEncabezado = (v: string) => {
    errores = [];
    if (JSON.parse(FT)?.encabezado === null) {
      err = 1;
      errores.push("Sección <strong>Encabezado</strong> incompleta.");
    }
    if (
      JSON.parse(FT)?.encabezado.tipoDeIndicador === undefined 
    ) {
      err = 1;
      errores.push(
        "<strong>Encabezado</strong>: Tipo de indicador no seleccionado."
      );
    }
    if (
      JSON.parse(FT)?.encabezado.dimension === undefined 
    ) {
      err = 1;
      errores.push("<strong>Encabezado</strong>: Dimensión no seleccionado.");
    }
    if (
      JSON.parse(FT)?.encabezado.unidadDeMedida === undefined ||
      JSON.parse(FT)?.encabezado.unidadDeMedida === "" ||
      /^[\s]*$/.test(JSON.parse(FT)?.encabezado.unidadDeMedida)
    ) {
      err = 1;
      errores.push(
        "<strong>Encabezado</strong>: Unidad de medida sin información."
      );
    }
    if (
      JSON.parse(FT)?.encabezado.claridad === undefined 
    ) {
      err = 1;
      errores.push("<strong>Encabezado</strong>: Claridad no seleccionado.");
    }
    if (
      JSON.parse(FT)?.encabezado.relevancia === undefined 
    ) {
      err = 1;
      errores.push("<strong>Encabezado</strong>: Relevancia no seleccionado.");
    }
    if (
      JSON.parse(FT)?.encabezado.economia === undefined 
    ) {
      err = 1;
      errores.push("<strong>Encabezado</strong>: Economia no seleccionado.");
    }
    if (
      JSON.parse(FT)?.encabezado.monitoreable === undefined 
    ) {
      err = 1;
      errores.push(
        "<strong>Encabezado</strong>: Monitoreable no seleccionado."
      );
    }
    if (
      JSON.parse(FT)?.encabezado.adecuado === undefined 
    ) {
      err = 1;
      errores.push("<strong>Encabezado</strong>: Adecuado no seleccionado.");
    }
    if (
      JSON.parse(FT)?.encabezado.aporte_marginal === undefined 
    ) {
      err = 1;
      errores.push(
        "<strong>Encabezado</strong>: Aporte Marginal no seleccionado."
      );
    }
    checkFT(v);
  };

  const checkFT = (v: string) => {
    errores = [];
    if (JSON.parse(FT)?.fin === null) {
      err = 1;
      errores.push("Sección <strong>Fin</strong> incompleta.");
    }
    if (
      JSON.parse(FT)?.fin.tipoDeIndicador === undefined 
    ) {
      err = 1;
      errores.push("<strong>Fin</strong>: Tipo de indicador no seleccionado.");
    }
    if (
      JSON.parse(FT)?.fin.dimension === undefined 
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
      JSON.parse(FT)?.fin.claridad === undefined 
    ) {
      err = 1;
      errores.push("<strong>Fin</strong>: Claridad no seleccionado.");
    }
    if (
      JSON.parse(FT)?.fin.relevancia === undefined 
    ) {
      err = 1;
      errores.push("<strong>Fin</strong>: Relevancia no seleccionado.");
    }
    if (
      JSON.parse(FT)?.fin.economia === undefined 
    ) {
      err = 1;
      errores.push("<strong>Fin</strong>: Economia no seleccionado.");
    }
    if (
      JSON.parse(FT)?.fin.monitoreable === undefined
    ) {
      err = 1;
      errores.push("<strong>Fin</strong>: Monitoreable no seleccionado.");
    }
    if (
      JSON.parse(FT)?.fin.adecuado === undefined 
    ) {
      err = 1;
      errores.push("<strong>Fin</strong>: Adecuado no seleccionado.");
    }
    if (
      JSON.parse(FT)?.fin.aporte_marginal === undefined 
    ) {
      err = 1;
      errores.push("<strong>Fin</strong>: Aporte Marginal no seleccionado.");
    }
    if (JSON.parse(FT)?.proposito === null) {
      err = 1;
      errores.push("Sección <strong>Propósito</strong> incompleta.");
    }
    if (
      JSON.parse(FT)?.proposito.tipoDeIndicador === undefined 
    ) {
      err = 1;
      errores.push(
        "<strong>Propósito</strong>: Tipo de indicador no seleccionado."
      );
    }
    if (
      JSON.parse(FT)?.proposito.dimension === undefined 
    ) {
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
    if (
      JSON.parse(FT)?.proposito.claridad === undefined 
    ) {
      err = 1;
      errores.push("<strong>Propósito</strong>: Claridad no seleccionado.");
    }
    if (
      JSON.parse(FT)?.proposito.relevancia === undefined 
    ) {
      err = 1;
      errores.push("<strong>Fin</strong>: Relevancia no seleccionado.");
    }
    if (
      JSON.parse(FT)?.proposito.economia === undefined
    ) {
      err = 1;
      errores.push("<strong>Propósito</strong>: Economia no seleccionado.");
    }
    if (
      JSON.parse(FT)?.proposito.monitoreable === undefined 
    ) {
      err = 1;
      errores.push("<strong>Propósito</strong>: Monitoreable no seleccionado.");
    }
    if (
      JSON.parse(FT)?.proposito.adecuado === undefined 
    ) {
      err = 1;
      errores.push("<strong>Propósito</strong>: Adecuado no seleccionado.");
    }
    if (
      JSON.parse(FT)?.proposito.aporte_marginal === undefined 
    ) {
      err = 1;
      errores.push(
        "<strong>Propósito</strong>: Aporte marginal no seleccionado."
      );
    }

    checkComponentes(v);
  };

  const checkComponentes = (v: string) => {
    JSON.parse(FT)?.componentes.every((componente: any, index: number) => {
      if (
        componente.tipoDeIndicador === undefined 
      ) {
        err = 1;
        errores.push(
          `<strong> Componente ${
            index + 1
          } </strong>: Tipo de indicador no seleccionado.`
        );
      }
      if (
        componente.dimension === undefined 
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
        componente.unidadDeMedida === ""
      ) {
        err = 1;
        errores.push(
          `<strong> Componente ${
            index + 1
          } </strong>: Unidad de medida sin información.`
        );
      }
      if (
        componente.claridad === undefined 
      ) {
        err = 1;
        errores.push(
          `<strong> Componente ${
            index + 1
          } </strong>: Claridad no seleccionado.`
        );
      }
      if (
        componente.relevancia === undefined 
      ) {
        err = 1;
        errores.push(
          `<strong> Componente ${
            index + 1
          } </strong>: Relevancia no seleccionado.`
        );
      }
      if (
        componente.economia === undefined 
      ) {
        err = 1;
        errores.push(
          `<strong> Componente ${
            index + 1
          } </strong>: Economia no seleccionado.`
        );
      }
      if (
        componente.monitoreable === undefined 
      ) {
        err = 1;
        errores.push(
          `<strong> Componente ${
            index + 1
          } </strong>: Monitoreable no seleccionado.`
        );
      }
      if (
        componente.adecuado === undefined 
      ) {
        err = 1;
        errores.push(
          `<strong> Componente ${
            index + 1
          } </strong>: Adecuado no seleccionado.`
        );
      }
      if (
        componente.aporte_marginal === undefined 
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
    JSON.parse(FT)?.actividades.map((actividad: any, index: number) => {
      if (
        actividad.tipoDeIndicador === undefined 
      ) {
        errores.push(
          `<strong> Actividad ${actividad.actividad} </strong>: Tipo de indicador no seleccionado.`
        );
        err = 1;
      }
      if (
        actividad.dimension === undefined 
      ) {
        errores.push(
          `<strong> Actividad ${actividad.actividad} </strong>: Dimension no seleccionado.`
        );
        err = 1;
      }
      if (
        actividad.unidadDeMedida === undefined ||
        /^[\s]*$/.test(actividad.unidadDeMedida) ||
        actividad.unidadDeMedida === ""
      ) {
        errores.push(
          `<strong> Actividad ${actividad.actividad} </strong>: Unidad de mdedida sin información.`
        );
        err = 1;
      }
      if (
        actividad.claridad === undefined 
      ) {
        errores.push(
          `<strong> Actividad ${actividad.actividad} </strong>: Claridad no seleccionado.`
        );
        err = 1;
      }
      if (
        actividad.relevancia === undefined 
      ) {
        errores.push(
          `<strong> Actividad ${actividad.actividad} </strong>: Relevancia no seleccionado.`
        );
        err = 1;
      }
      if (
        actividad.economia === undefined 
      ) {
        errores.push(
          `<strong> Actividad ${actividad.actividad} </strong>: Economia no seleccionado.`
        );
        err = 1;
      }
      if (
        actividad.monitoreable === undefined 
      ) {
        errores.push(
          `<strong> Actividad ${actividad.actividad} </strong>: Monitoreable no seleccionado.`
        );
        err = 1;
      }
      if (
        actividad.adecuado === undefined 
      ) {
        errores.push(
          `<strong> Actividad ${actividad.actividad} </strong>: Adecuado no seleccionado.`
        );
        err = 1;
      }
      if (
        actividad.aporte_marginal === undefined 
      ) {
        errores.push(
          `<strong> Actividad ${actividad.actividad} </strong>: Aporte marginal no seleccionado.`
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
              ? "Al confirmar, la Ficha Técnica se autorizará"
              : localStorage.getItem("Rol") === "Verificador"
              ? "Al confirmar, la Ficha Técnica se enviará a los usuarios correspondientes para autorización"
              : "Al confirmar, la Ficha Técnica se enviará a los usuarios correspondientes para revisión"}
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