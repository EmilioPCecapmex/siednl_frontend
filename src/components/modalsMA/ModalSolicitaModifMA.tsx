import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Grid,
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
  MA,
  MIR,
  IdMA,
  IdMIR,
  showResume,
  MAEdit,
}: {
  open: boolean;
  handleClose: Function;
  showResume: Function;
  MA: string;
  MIR: string;
  IdMA: string;
  IdMIR: string;
  MAEdit: string;
}) {
  const [userXInst, setUserXInst] = useState<Array<IIUserXInst>>([]);
  const [userSelected, setUserSelected] = useState("0");

  const [comment, setComment] = useState("");
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
        setComment("");
        handleClose();
      })
      .catch((err) => {});
  };
  ////////////////////////////////////////////

  const checkUsuario = (estado: string) => {
    if (userSelected === "0" || userSelected === "") {
      return Toast.fire({
        icon: "error",
        title: "Introduce usuario al que se le solicita modificación",
      });
    } else {
      checkMA(estado);
    }
  };
  ////////////////////////////
  let err = 0;
  ////////////////////////////////////////////7
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
      errores.push("<strong>Fin</strong>: Meta anual sin información");
    }
    if (
      JSON.parse(MA)?.fin.lineaBase === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.fin.lineaBase)
    ) {
      err = 1;
      errores.push("<strong>Fin</strong>: Línea base sin información");
    }
    if (
      JSON.parse(MA)?.fin.valorNumerador === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.fin.valorNumerador)
    ) {
      err = 1;
      errores.push("<strong>Fin</strong>: Valor del numerador sin información");
    }

    if (
      !JSON.parse(MIR)
        .fin.indicador.toLowerCase()
        .includes(
          "indice" || "índice" || "INDICE" || "ÍNDICE" || "Índice" || "Indice"
        ) &&
      (JSON.parse(MA)?.fin.valorDenominador === undefined ||
        /^[\s]*$/.test(JSON.parse(MA)?.fin.valorDenominador))
    ) {
      err = 1;
      errores.push(
        "<strong>Fin</strong>: Valor del denominador sin información"
      );
    }
    if (
      JSON.parse(MA)?.fin.sentidoDelIndicador === undefined ||
      JSON.parse(MA)?.fin.sentidoDelIndicador === ""
    ) {
      err = 1;
      errores.push(
        "<strong>Fin</strong>: Sentido del indicador no seleccionado"
      );
    }
    if (
      JSON.parse(MA)?.fin.unidadResponsable === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.fin.unidadResponsable)
    ) {
      err = 1;
      errores.push(
        "<strong>Fin</strong>: Unidad responsable de reportar el indicador sin información"
      );
    }
    if (
      JSON.parse(MA)?.fin.descIndicador === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.fin.descIndicador)
    ) {
      err = 1;
      errores.push(
        "<strong>Fin</strong>: Descripción del indicador sin información"
      );
    }
    if (
      JSON.parse(MA)?.fin.descNumerador === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.fin.descNumerador)
    ) {
      err = 1;
      errores.push(
        "<strong>Fin</strong>: Descripción del numerador sin información"
      );
    }
    if (
      JSON.parse(MA)?.fin.descDenominador === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.fin.descDenominador)
    ) {
      err = 1;
      errores.push(
        "<strong>Fin</strong>: Descripción del denominador sin información"
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
      errores.push("<strong>Proposito</strong>: Meta Anual sin información");
    }
    if (
      JSON.parse(MA)?.proposito.lineaBase === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.proposito.lineaBase)
    ) {
      err = 1;
      errores.push("<strong>Proposito</strong>: Línea base sin información");
    }
    if (
      JSON.parse(MA)?.proposito.valorNumerador === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.proposito.valorNumerador)
    ) {
      err = 1;
      errores.push(
        "<strong>Proposito</strong>: Valor del numerador sin información"
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
        "<strong>Proposito</strong>: Valor del denominador sin información"
      );
    }
    if (
      JSON.parse(MA)?.proposito.sentidoDelIndicador === undefined ||
      JSON.parse(MA)?.proposito.sentidoDelIndicador === ""
    ) {
      err = 1;
      errores.push(
        "<strong>Proposito</strong>: Sentido del indicador no seleccionado"
      );
    }
    if (
      JSON.parse(MA)?.proposito.unidadResponsable === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.proposito.unidadResponsable)
    ) {
      err = 1;
      errores.push(
        "<strong>Proposito</strong>: Unidad responsable de reportar el indicador sin seleccionar"
      );
    }
    if (
      JSON.parse(MA)?.proposito.descIndicador === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.proposito.descIndicador)
    ) {
      err = 1;
      errores.push(
        "<strong>Proposito</strong>: Descripción del indicador sin información"
      );
    }
    if (
      JSON.parse(MA)?.proposito.descNumerador === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.proposito.descNumerador)
    ) {
      err = 1;
      errores.push(
        "<strong>Proposito</strong>: Descripción del numerador sin información"
      );
    }
    if (
      JSON.parse(MA)?.proposito.descDenominador === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.proposito.descDenominador)
    ) {
      err = 1;
      errores.push(
        "<strong>Proposito</strong>: Descripción del denominador sin información"
      );
    }

    checkComponentes(v);
  };
  /////////////////////////////////////////////////////////////////////
  const checkComponentes = (v: string) => {

    JSON.parse(MA)?.componentes.every((componente: any, index: number) => {
      if (
        componente.metaAnual === undefined ||
      //  /^[\s]*$/.test(componente.metaAnual) ||
        componente.metaAnual === null || componente.metaAnual === ""
      ) {
        console.log("componente.metaAnual :", componente.metaAnual);
        
        err = 1;
        errores.push(
          `<strong> Componente ${
            index + 1
          } </strong>: Meta anual sin información.`
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
  ///////////////////////////////////////////////////////////////////
  const checkActividades = (v: string) => {
    // eslint-disable-next-line array-callback-return
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
        !JSON.parse(MIR)
          .actividades[index].indicador.toLowerCase()
          .includes("indice" || "índice") &&
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
    //////////////////////////////////////////777
    if (err === 0) {
      createMA(v);
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
  ///////////////////////////////////////////////////////////////////////
  const createMA = (estado: string) => {
    console.log("IdEntidad:localStorage.getItem(IdEntidad): ",localStorage.getItem("IdEntidad"));
    
    let rolusuario = userXInst.find((user) =>user.IdUsuario===userSelected)

    if (estado === "Autorizada" && userSelected !== "0" && rolusuario?.Rol === "Verificador") {
      estado = "En Revisión";
      console.log("Entre al primer if MA");
    } else if (estado === "En Autorización" && userSelected !== "0" && rolusuario?.Rol === "Capturador") {
      estado = "En Captura";
      console.log("Entre al segundo if MA");
    } else if (estado === "En Autorización" && userSelected !== "0") {
      console.log("Entre al tercero if MA");
      estado = "En Captura";
    } else if (estado === "Autorizada" && userSelected !== "0" && rolusuario?.Rol === "Capturador") {
      console.log("Entre al cuarto if MA");
      estado = "En Captura";
    } 
    axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/create-MetaAnual",
        {
          MetaAnual:
            MAEdit === undefined || MAEdit === ""
              ? MA
              : "[" + MA + "," + MAEdit + "]",
          // MetaAnual: MA,
          CreadoPor:
            userSelected !== "0"
              ? userSelected
              : localStorage.getItem("IdUsuario"),
          IdMir: IdMIR,
          Estado: estado,
          Id: IdMA,
          Rol: localStorage.getItem("Rol"),
          IdEntidad:localStorage.getItem("IdEntidad"),
        },

        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        console.log("IdMIR: ", IdMIR);
        console.log("r: ", r);

        if (comment !== "") {
          comentMA(IdMIR);
        }
        Toast.fire({
          icon: "success",
          title:
            localStorage.getItem("Rol") === "Verificador"
              ? "Meta anual enviada a capturador para corrección"
              : "Meta anual enviada ",
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

    if (localStorage.getItem("Rol") === "Capturador")
      tipousuario = "Verificador";
      console.log(tipousuario);
    if (localStorage.getItem("Rol") === "Verificador")
      tipousuario = "Verificador";
    if (localStorage.getItem("Rol") === "Administrador")
      tipousuario = "VERIFICADOR_CAPTURADOR";

    

    if (open) {
      axios
        .post(
          process.env.REACT_APP_APPLICATION_BACK +
            "/api/tipo-usuario",
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
          .then((r) => {
          console.log("a");
          if (r.status === 200) {
           
            console.log("UserXInst: ", r.data.data);
            setUserXInst(r.data.data);
          }
        });
    }
  }, [MA, open]);
  ///////////////////////////////////////////////////////////////////////////////////
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
  ///////////////////////////////////////////////////////////////////////////////////
  const enviarNotificacion = () => {
    axios.post(
      process.env.REACT_APP_APPLICATION_BACK + "/api/create-notif",
      {
        IdUsuarioDestino: userSelected,
        Titulo: "Meta Anual",
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
  //////////////////////////////////////////////////////////////////////////////
  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={() => handleClose()}>
      <DialogTitle sx={{ fontFamily: "MontserratBold" }}>
        Solicitud de modificación
      </DialogTitle>

      <Grid sx={{ display: "flex", justifyContent: "center" }}>
        <Grid
          sx={{
            backgroundColor: "#BBBABA",
            width: "60vw",
            height: "0.1vh",
            display: "flex",
            justifyContent: "center",
          }}
        />
      </Grid>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid
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
              onChange={(v) => (
                setUserSelected(v.target.value),
                console.log("userSelected", userSelected),
                console.log("v.target.value", v.target.value)
              )}
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
        </Grid>

        <Grid sx={{ width: "100%", mb: 2 }}>
          <TextField
            multiline
            rows={2}
            label={"Agregar Comentario"}
            sx={{ width: "100%" }}
            onChange={(v) => setComment(v.target.value)}
          ></TextField>
        </Grid>

        <Grid
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBlockEnd: "1vh",
            paddingBlockEnd: "1vh",
          }}
        >
          <Grid
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-evenly",
              width: "100vw",
            }}
          >
            <Button
              sx={{ ...queries.buttonCancelarSolicitudInscripcion, display: "flex", width: "15vw" }}
              variant="contained"
              
              onClick={() => handleClose()}
            >
              <Typography >
                Cancelar
              </Typography>
            </Button>

            <Button
              sx={{...queries.buttonContinuarSolicitudInscripcion, display: "flex", width: "15vw"}}
              //variant="contained"
              
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
              <Typography 
              //sx={{...queries.buttonContinuarSolicitudInscripcion, display: "flex", width: "10vw"}}
              >
                {comment === "" ? "Enviar sin comentarios" : "Confirmar"}
              </Typography>
            </Button>

          </Grid>
        </Grid>
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
