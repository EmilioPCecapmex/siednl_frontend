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
import { IIUserXInst } from "../modalsMIR/ModalEnviarMIR";

export let errores: string[] = [];

export default function ModalSolicitaModif({
  open,
  handleClose,
  FT,
  MIR,
  IdFT,
  IdMa,
  IdMIR,
  showResume,
  MAEdit,
}: {
  open: boolean;
  handleClose: Function;
  showResume: Function;
  FT: string;
  MIR: string;
  IdFT: string;
  IdMa: string;
  IdMIR: string;
  MAEdit: string;
}) {
  const [userXInst, setUserXInst] = useState<Array<IIUserXInst>>([]);
  const [userSelected, setUserSelected] = useState("0");
  const [instSelected, setInstSelected] = useState("");

  const [comentario, setComentario] = useState("");

  const comentFT = () => {
    axios.post(
      "http://10.200.4.105:8000/api/coment-mir",
      {
        IdMir: IdMIR,
        Coment: comentario,
        CreadoPor: localStorage.getItem("IdUsuario"),
        MIR_MA: "FT",
      },
      {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      }
    );
  };

  const checkUsuario = (estado: string) => {
    if (userSelected === "0" || userSelected === "") {
      return Toast.fire({
        icon: "error",
        title: "Introduce usuario al que se le solicita modificación",
      });
    } else {
      checkFT(estado);
    }
  };

  let err = 0;

  const checkFT = (v: string) => {
    errores = [];

    if (
      JSON.parse(FT)?.encabezado.programaSER === null ||
      JSON.parse(FT)?.encabezado.programaSER === undefined ||
      /^[\s]*$/.test(JSON.parse(FT)?.encabezado.programaSER)
    ) {
      err = 1;
      errores.push(
        "Sección <strong>Encabezado</strong> Programa sectorial, especial o regional incompleta."
      );
    }

    if (
      JSON.parse(FT)?.encabezado.objetivoSER === null ||
      JSON.parse(FT)?.encabezado.objetivoSER === undefined ||
      /^[\s]*$/.test(JSON.parse(FT)?.encabezado.objetivoSER)
    ) {
      err = 1;
      errores.push(
        "Sección <strong>Encabezado</strong> Objetivo, especial o regional incompleta."
      );
    }

    if (
      JSON.parse(FT)?.encabezado.metaODS === null ||
      JSON.parse(FT)?.encabezado.metaODS === undefined ||
      /^[\s]*$/.test(JSON.parse(FT)?.encabezado.metaODS)
    ) {
      err = 1;
      errores.push(
        "Sección <strong>Encabezado</strong> Objetivo, especial o regional incompleta."
      );
    }

    if (JSON.parse(FT)?.encabezado.programaSER === null) {
      err = 1;
      errores.push(
        "Sección <strong>Encabezado</strong> Programa sectorial, especial o regional incompleta."
      );
    }
    if (JSON.parse(FT)?.fin === null) {
      err = 1;
      errores.push("Sección <strong>Fin</strong> incompleta.");
    }
    if (
      JSON.parse(FT)?.fin.tipoDeIndicador === undefined ||
      JSON.parse(FT)?.fin.tipoDeIndicador === ""
    ) {
      err = 1;
      errores.push("<strong>Fin</strong>: Tipo de indicador sin información");
    }
    if (
      JSON.parse(FT)?.fin.dimension === undefined ||
      JSON.parse(FT)?.fin.dimension === ""
    ) {
      err = 1;
      errores.push("<strong>Fin</strong>: Diemension información");
    }
    if (
      JSON.parse(FT)?.fin.unidadDeMedida === undefined ||
      /^[\s]*$/.test(JSON.parse(FT)?.fin.unidadDeMedida)
    ) {
      err = 1;
      errores.push("<strong>Fin</strong>: Unidad de medida sin información");
    }
    if (
      JSON.parse(FT)?.fin.claridad === undefined ||
      JSON.parse(FT)?.fin.claridad === ""
    ) {
      err = 1;
      errores.push("<strong>Fin</strong>: Claridad sin información");
    }
    if (
      JSON.parse(FT)?.fin.relevancia === undefined ||
      JSON.parse(FT)?.fin.relevancia === ""
    ) {
      err = 1;
      errores.push("<strong>Fin</strong>: Relevancia sin información");
    }
    if (
      JSON.parse(FT)?.fin.economia === undefined ||
      JSON.parse(FT)?.fin.economia === ""
    ) {
      err = 1;
      errores.push("<strong>Fin</strong>: Economía sin información");
    }
    if (
      JSON.parse(FT)?.fin.monitoreable === undefined ||
      JSON.parse(FT)?.fin.monitoreable === ""
    ) {
      err = 1;
      errores.push("<strong>Fin</strong>: Monitoreable sin información");
    }
    if (
      JSON.parse(FT)?.fin.adecuado === undefined ||
      JSON.parse(FT)?.fin.adecuado === ""
    ) {
      err = 1;
      errores.push("<strong>Fin</strong>: Adecuado sin información");
    }
    if (
      JSON.parse(FT)?.fin.aporte_marginal === undefined ||
      JSON.parse(FT)?.fin.aporte_marginal === ""
    ) {
      err = 1;
      errores.push("<strong>Fin</strong>: Aporte marginal sin información");
    }
    /////////////////////////////////////////////////////////////////////////////
    if (JSON.parse(FT)?.proposito === null) {
      err = 1;
      errores.push("Sección <strong>proposito</strong> incompleta.");
    }
    if (
      JSON.parse(FT)?.proposito.tipoDeIndicador === undefined ||
      JSON.parse(FT)?.proposito.tipoDeIndicador === ""
    ) {
      err = 1;
      errores.push(
        "<strong>proposito</strong>: Tipo de indicador sin información"
      );
    }
    if (
      JSON.parse(FT)?.proposito.dimension === undefined ||
      JSON.parse(FT)?.proposito.dimension === ""
    ) {
      err = 1;
      errores.push("<strong>proposito</strong>: Diemension información");
    }
    if (
      JSON.parse(FT)?.proposito.unidadDeMedida === undefined ||
      /^[\s]*$/.test(JSON.parse(FT)?.proposito.unidadDeMedida)
    ) {
      err = 1;
      errores.push(
        "<strong>proposito</strong>: Unidad de medida sin información"
      );
    }
    if (
      JSON.parse(FT)?.proposito.claridad === undefined ||
      JSON.parse(FT)?.proposito.claridad === ""
    ) {
      err = 1;
      errores.push("<strong>proposito</strong>: Claridad sin información");
    }
    if (
      JSON.parse(FT)?.proposito.relevancia === undefined ||
      JSON.parse(FT)?.proposito.relevancia === ""
    ) {
      err = 1;
      errores.push("<strong>proposito</strong>: Relevancia sin información");
    }
    if (
      JSON.parse(FT)?.proposito.economia === undefined ||
      JSON.parse(FT)?.proposito.economia === ""
    ) {
      err = 1;
      errores.push("<strong>proposito</strong>: Economía sin información");
    }
    if (
      JSON.parse(FT)?.proposito.monitoreable === undefined ||
      JSON.parse(FT)?.proposito.monitoreable === ""
    ) {
      err = 1;
      errores.push("<strong>proposito</strong>: Monitoreable sin información");
    }
    if (
      JSON.parse(FT)?.proposito.adecuado === undefined ||
      JSON.parse(FT)?.proposito.adecuado === ""
    ) {
      err = 1;
      errores.push("<strong>proposito</strong>: Adecuado sin información");
    }
    if (
      JSON.parse(FT)?.proposito.aporte_marginal === undefined ||
      JSON.parse(FT)?.proposito.aporte_marginal === ""
    ) {
      err = 1;
      errores.push(
        "<strong>proposito</strong>: Aporte marginal sin información"
      );
    }
    checkcomponentes(v);
  };

  const checkcomponentes = (v: string) => {
    JSON.parse(FT)?.componentes.map((componente: any, index: number) => {
      if (
        componente.tipoDeIndicador === undefined ||
        componente.tipoDeIndicador === null ||
        componente.tipoDeIndicador === ""
      ) {
        err = 1;
        errores.push(
          `<strong>componente ${
            index + 1
          }  </strong>: Tipo de indicador sin información`
        );
      }
      if (componente.dimension === undefined || componente.dimension === "") {
        err = 1;
        errores.push(
          `<strong>componente ${index + 1} </strong>: Diemension información`
        );
      }
      if (
        componente.unidadDeMedida === undefined ||
        /^[\s]*$/.test(componente.unidadDeMedida) ||
        componente.unidadDeMedida === null
      ) {
        err = 1;
        errores.push(
          `<strong>componente ${
            index + 1
          } </strong>: Unidad de medida sin información`
        );
      }
      if (componente.claridad === undefined || componente.claridad === "") {
        err = 1;
        errores.push(
          `<strong>componentes ${index + 1} </strong>: Claridad sin información`
        );
      }
      if (componente.relevancia === undefined || componente.relevancia === "") {
        err = 1;
        errores.push(
          `<strong>componentes ${
            index + 1
          } </strong>: Relevancia sin información`
        );
      }
      if (componente.economia === undefined || componente.economia === "") {
        err = 1;
        errores.push(
          `<strong>componentes ${index + 1} </strong>: Economía sin información`
        );
      }
      if (
        componente.monitoreable === undefined ||
        componente.monitoreable === ""
      ) {
        err = 1;
        errores.push(
          `<strong>componentes ${
            index + 1
          } </strong>: Monitoreable sin información`
        );
      }
      if (componente.adecuado === undefined || componente.adecuado === "") {
        err = 1;
        errores.push(
          `<strong>componente ${index + 1} </strong>: Adecuado sin información`
        );
      }
      if (
        componente.aporte_marginal === undefined ||
        componente.aporte_marginal === ""
      ) {
        err = 1;
        errores.push(
          `<strong>componente ${
            index + 1
          } </strong>: Aporte marginal sin información`
        );
      }
      return true;
    });
    checkActividades(v);
  };

  const checkActividades = (v: string) => {
    JSON.parse(FT)?.actividades.map((actividad: any, index: number) => {
      if (
        actividad.tipoDeIndicador === undefined ||
        actividad.tipoDeIndicador === null ||
        actividad.tipoDeIndicador === ""
      ) {
        err = 1;
        errores.push(
          `<strong>actividad ${actividad.actividad}  </strong>: Tipo de indicador sin información`
        );
      }
      if (actividad.dimension === undefined || actividad.dimension === "") {
        err = 1;
        errores.push(
          `<strong>actividad ${actividad.actividad}  </strong>: Tipo de Dimensíon sin información`
        );
      }
      if (
        actividad.unidadDeMedida === undefined ||
        actividad.unidadDeMedida === ""
      ) {
        err = 1;
        errores.push(
          `<strong>actividad ${actividad.actividad}  </strong>: Tipo de Unidad de medida sin información`
        );
      }
      if (actividad.claridad === undefined || actividad.claridad === "") {
        err = 1;
        errores.push(
          `<strong>actividad ${actividad.actividad}  </strong>: Claridad sin información`
        );
      }
      if (actividad.relevancia === undefined || actividad.relevancia === "") {
        err = 1;
        errores.push(
          `<strong>actividad ${actividad.actividad}  </strong>: Relevancia sin información`
        );
      }
      if (actividad.economia === undefined || actividad.economia === "") {
        err = 1;
        errores.push(
          `<strong>actividad ${actividad.actividad}  </strong>: Economía sin información`
        );
      }
      if (
        actividad.monitoreable === undefined ||
        actividad.monitoreable === ""
      ) {
        err = 1;
        errores.push(
          `<strong>actividad ${actividad.actividad}  </strong>: Monitoreable sin información`
        );
      }
      if (actividad.adecuado === undefined || actividad.adecuado === "") {
        err = 1;
        errores.push(
          `<strong>actividad ${actividad.actividad}  </strong>: Adecuado sin información`
        );
      }
      if (
        actividad.aporte_marginal === undefined ||
        actividad.aporte_marginal === ""
      ) {
        err = 1;
        errores.push(
          `<strong>actividad ${actividad.actividad}  </strong>: Adecuado sin información`
        );
      }
    });

    if (err === 0) {
      createFT(v);
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

  const createFT = (estado: string) => {
    if (estado === "Autorizada" && userSelected !== "0") {
      estado = "En Revisión";
    } else if (estado === "En Autorización" && userSelected !== "0") {
      estado = "En Captura";
    }
    axios
      .post(
        "http://10.200.4.199:8000/api/create-FichaTecnica",
        {
          FichaTecnica: FT,
          CreadoPor:
            userSelected !== "0"
              ? userSelected
              : localStorage.getItem("IdUsuario"),
          IdMir: IdMIR,
          Estado: estado,
          IdMa: IdMa,
          Id: IdFT,
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        if (comentario !== "") {
          comentFT();
        }
        Toast.fire({
          icon: "success",
          title:
            localStorage.getItem("Rol") === "Verificador"
              ? "Ficha Tecnica enviada a capturador para corrección"
              : "Ficha Tecnica enviada a revisión",
        });

        //enviarNotificacion();
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

  const getUsuariosXInstitucion = () => {
    axios
      .get(
        process.env.REACT_APP_APPLICATION_BACK + "/api/usuarioXInstitucion",
        {
          params: {
            IdUsuario: localStorage.getItem("IdUsuario"),
            Institucion: JSON.parse(MIR)?.encabezado?.institucion,
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
      setInstSelected(JSON.parse(MIR)?.encabezado?.institucion);
    }
  }, [open]);

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
          <Typography sx={{ fontFamily: "MontserratMedium" }}>
            Selecciona usuario para solicitar modificación
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
                    {item.Nombre}
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
            onChange={(v) => setComentario(v.target.value)}
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
              sx={{ display: "flex", width: "10vw" }}
              variant="contained"
              color="error"
              onClick={() => handleClose()}
            >
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                Cancelar
              </Typography>
            </Button>

            <Button
              sx={{ display: "flex", width: "10vw" }}
              variant="contained"
              color="primary"
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
                {comentario === "" ? "Enviar sin comentarios" : "Confirmar"}
              </Typography>
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}