/* eslint-disable array-callback-return */
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
import { sendMail } from "../../funcs/sendMailCustomMessage";
import { queries } from "../../queries";
import { IActividad, IComponente, IMovimientos } from "../tabsMir/interfaces mir/IMIR";
import { getMAyFT } from "../../services/mir_services/MIR_services";
import { IMA } from "../tabsMetaAnual/IMA";
import { IFT } from "../tabsFichaTecnica/Interfaces";
import { IComponenteMA } from "../tabsMetaAnual/Interfaces";
import { newComponenteMA, newFinPropositoMA } from "../tabsMetaAnual/AddMetaAnual";
import { alertaEliminar } from "../genericComponents/Alertas";

export let errores: string[] = [];

export default function ModalEnviarMIR({
  open,
  handleClose,
  MIR,
  IdMir,
  showResume,
  estadoMIR,
  RestructuraMAyFT,
  mDocumentos,
}: {
  open: boolean;
  handleClose: Function;
  MIR: string;
  IdMir: string;
  showResume: Function;
  estadoMIR: string;
  RestructuraMAyFT: Function;
  mDocumentos: IMovimientos[]
}) {

  const [ma, setMA] = useState<IMA>();
  const [ft, setFT] = useState<IFT>();

  useEffect(() => {
    if (estadoMIR === 'Autorizada') {
      getMAyFT(IdMir, setMA, setFT);
    };
  }, [])

  ///////////////////////////////////////////////////////////////////////////////////////////
  // const addComponenteMA = (ComponenteMIR:IComponente) => {
  //   //se recibe el C5
  //   // console.log("componentes", MIRPADRE.componentes);

  //   let arrComponentes: IComponenteMA[] = ma?.componentes||[];
  //   arrComponentes.push(newComponenteMA(ComponenteMIR));

  //   if(ma?.fin||ma?.proposito){
  //     setMA({...ma,componentes:arrComponentes});
  //   }
  // };

  ///////////////////////////////////////////////////////////////////////////////////////////
  const removeComponenteMA = (componenteSelected: number) => {

    if (ma) {
      let arrComponentes: IComponenteMA[] = ma.componentes.filter(
        (componente) => !componente.componentes.includes(`C${componenteSelected}`)
      );

      arrComponentes = arrComponentes.map((componente, index) => {
        if (parseInt(componente.componentes.split("C")[1]) >= componenteSelected) {
          let aux = {
            ...componente,
            componente: `C${index + 1}`,
            actividades: componente.actividades.map((item) => {
              return {
                ...item,
                actividad: item.actividad.replace(/C\d+/, `C${index + 1}`),
              };
            }),
          };

          return aux;
        } else

          return componente;
      });
      setMA({ ...ma, componentes: arrComponentes });
    console.log("componentes", ma.componentes);
    console.log("componentes actualizados", arrComponentes);
    }

    // movimientos("remove", ("C" + componenteSelected
  };
  ///////////////////////////////////////////////////////////////////////////////////////////


  const [comment, setComment] = useState("");

  const [userXInst, setUserXInst] = useState<Array<IIUserXInst>>([]);
  const [userSelected] = useState("0"); //, setUserSelected
  let err = 0;

  const [newComent, setNewComent] = React.useState(false);
  const enviarMensaje = "Se ha creado una nueva";

  const comentMir = (id: string) => {
    axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/coment-mir",
        {
          IdMir: id,
          Coment: comment,
          // se va a modificar
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
      .catch((err) => { });
  };

  const checkMir = (v: string) => {
    errores = [];
    if (
      JSON.parse(MIR)?.encabezado.ejercicioFiscal === "" ||
      JSON.parse(MIR)?.encabezado.entidad === "" ||
      JSON.parse(MIR)?.encabezado.programa === "" ||
      JSON.parse(MIR)?.encabezado.eje === "" ||
      JSON.parse(MIR)?.encabezado.tema === "" ||
      JSON.parse(MIR)?.encabezado.objetivo === "" ||
      JSON.parse(MIR)?.encabezado.estrategia === "" ||
      JSON.parse(MIR)?.encabezado.lineas_de_accion === "" ||
      JSON.parse(MIR)?.encabezado.beneficiario === ""
    ) {
      err = 1;
      errores.push("SECCIÓN <strong>ENCABEZADO </strong> INCOMPLETA.");
    }
    if (JSON.parse(MIR)?.encabezado.ejercicioFiscal === "") {
      err = 1;
      errores.push("<strong> EJERCICIO FISCAL</strong> NO SELECCIONADO.");
    }
    if (JSON.parse(MIR)?.encabezado.entidad === "") {
      err = 1;
      errores.push("<strong> INSTITUCIÓN</strong> NO SELECCIONADA.");
    }
    if (JSON.parse(MIR)?.encabezado.programa === "") {
      err = 1;
      errores.push(
        "<strong> PROGRAMA PRESUPUESTARIO</strong> NO SELECCIONADO."
      );
    }
    if (JSON.parse(MIR)?.encabezado.eje === "") {
      err = 1;
      errores.push("<strong> EJE</strong> NO SELECCIONADO.");
    }
    if (JSON.parse(MIR)?.encabezado.tema === "") {
      err = 1;
      errores.push("<strong> TÉMATICA</strong> NO SELECCIONADA.");
    }
    if (JSON.parse(MIR)?.encabezado.objetivo === "") {
      err = 1;
      errores.push("<strong> OBJETIVO</strong> NO SELECCIONADO.");
    }
    if (JSON.parse(MIR)?.encabezado.estrategia === "") {
      err = 1;
      errores.push("<strong> ESTRATEGIA</strong> NO SELECCIONADA.");
    }
    if (JSON.parse(MIR)?.encabezado.lineas_de_accion === "") {
      err = 1;
      errores.push(
        "<strong> LÍNEA DE ACCIÓN</strong> SELECCIONA AL MENOS 1 OPCIÓN."
      );
    }
    if (JSON.parse(MIR)?.encabezado.beneficiario === "") {
      err = 1;
      errores.push("<strong> BENEFICIARIO</strong> NO SELECCIONADO.");
    }
    if (
      JSON.parse(MIR)?.fin.resumen === undefined ||
      /^[\s]*$/.test(JSON.parse(MIR)?.fin.resumen) ||
      JSON.parse(MIR)?.fin.indicador === undefined ||
      /^[\s]*$/.test(JSON.parse(MIR)?.fin.indicador) ||
      JSON.parse(MIR)?.fin.formula === undefined ||
      /^[\s]*$/.test(JSON.parse(MIR)?.fin.formula) ||
      JSON.parse(MIR)?.fin.frecuencia === undefined ||
      /^[\s]*$/.test(JSON.parse(MIR)?.fin.frecuencia) ||
      JSON.parse(MIR)?.fin.medios === undefined ||
      /^[\s]*$/.test(JSON.parse(MIR)?.fin.medios) ||
      JSON.parse(MIR)?.fin.supuestos === undefined ||
      /^[\s]*$/.test(JSON.parse(MIR)?.fin.supuestos)
    ) {
      err = 1;
      errores.push("<hr> SECCIÓN <strong>FIN </strong> INCOMPLETA.");
    }
    if (
      JSON.parse(MIR)?.fin.resumen === undefined ||
      /^[\s]*$/.test(JSON.parse(MIR)?.fin.resumen)
    ) {
      err = 1;
      errores.push("<strong> RESUMEN NARRATIVO</strong> SIN INFORMACIÓN.");
    }
    if (
      JSON.parse(MIR)?.fin.indicador === undefined ||
      /^[\s]*$/.test(JSON.parse(MIR)?.fin.indicador)
    ) {
      err = 1;
      errores.push("<strong> INDICADOR</strong> SIN INFORMACIÓN.");
    }
    if (
      JSON.parse(MIR)?.fin.formula === undefined ||
      /^[\s]*$/.test(JSON.parse(MIR)?.fin.formula)
    ) {
      err = 1;
      errores.push("<strong> FÓRMULA</strong> SIN INFORMACIÓN.");
    }
    if (
      JSON.parse(MIR)?.fin.frecuencia === undefined ||
      JSON.parse(MIR)?.fin.frecuencia === ""
    ) {
      err = 1;
      errores.push(
        "<strong> FRECUENCIA</strong>, SOLO PUEDE SER ANUAL O BIENAL."
      );
    }
    if (
      JSON.parse(MIR)?.fin.medios === undefined ||
      /^[\s]*$/.test(JSON.parse(MIR)?.fin.medios)
    ) {
      err = 1;
      errores.push("<strong> MEDIOS DE VERIFICACIÓN</strong> SIN INFORMACIÓN.");
    }
    if (
      JSON.parse(MIR)?.fin.supuestos === undefined ||
      /^[\s]*$/.test(JSON.parse(MIR)?.fin.supuestos)
    ) {
      err = 1;
      errores.push("<strong> SUPUESTOS</strong> SIN INFORMACIÓN.");
    }

    if (
      JSON.parse(MIR)?.proposito.resumen === undefined ||
      /^[\s]*$/.test(JSON.parse(MIR)?.proposito.resumen) ||
      JSON.parse(MIR)?.proposito.indicador === undefined ||
      /^[\s]*$/.test(JSON.parse(MIR)?.proposito.indicador) ||
      JSON.parse(MIR)?.proposito.formula === undefined ||
      /^[\s]*$/.test(JSON.parse(MIR)?.proposito.formula) ||
      JSON.parse(MIR)?.proposito.frecuencia === undefined ||
      /^[\s]*$/.test(JSON.parse(MIR)?.proposito.frecuencia) ||
      JSON.parse(MIR)?.proposito.medios_verificacion === undefined ||
      /^[\s]*$/.test(JSON.parse(MIR)?.proposito.medios_verificacion) ||
      JSON.parse(MIR)?.proposito.supuestos === undefined ||
      /^[\s]*$/.test(JSON.parse(MIR)?.proposito.supuestos)
    ) {
      err = 1;
      errores.push("<hr>SECCIÓN <strong>PROPÓSITO </strong> INCOMPLETA.");
    }

    if (
      JSON.parse(MIR)?.proposito.resumen === undefined ||
      /^[\s]*$/.test(JSON.parse(MIR)?.proposito.resumen)
    ) {
      err = 1;
      errores.push("<strong> RESUMEN NARRATIVO</strong> SIN INFORMACIÓN.");
    }
    if (
      JSON.parse(MIR)?.proposito.indicador === undefined ||
      /^[\s]*$/.test(JSON.parse(MIR)?.proposito.indicador)
    ) {
      err = 1;
      errores.push("<strong> INDICADOR</strong> SIN INFORMACIÓN.");
    }
    if (
      JSON.parse(MIR)?.proposito.formula === undefined ||
      /^[\s]*$/.test(JSON.parse(MIR)?.proposito.formula)
    ) {
      err = 1;
      errores.push("<strong> FÓRMULA</strong> SIN INFORMACIÓN.");
    }
    if (
      JSON.parse(MIR)?.proposito.frecuencia === undefined ||
      JSON.parse(MIR)?.proposito.frecuencia === ""
    ) {
      err = 1;
      errores.push(
        "<strong> FRECUENCIA</strong>, SOLO PUEDE SER ANUAL O BIENAL."
      );
    }
    if (
      JSON.parse(MIR)?.proposito.medios_verificacion === undefined ||
      /^[\s]*$/.test(JSON.parse(MIR)?.proposito.medios_verificacion)
    ) {
      err = 1;
      errores.push("<strong> MEDIOS DE VERIFICACIÓN</strong> SIN INFORMACIÓN.");
    }
    if (
      JSON.parse(MIR)?.proposito.supuestos === undefined ||
      /^[\s]*$/.test(JSON.parse(MIR)?.proposito.supuestos)
    ) {
      err = 1;
      errores.push("<strong> SUPUESTOS</strong> SIN INFORMACIÓN.");
    }
    checkComponentes(v);
  };

  const checkComponentes = (v: string) => {
    JSON.parse(MIR)?.componentes.map((componente: any, index: number) => {



      if (
        componente.resumen === undefined ||
        /^[\s]*$/.test(componente.resumen) ||
        componente.resumen === null ||
        componente.indicador === undefined ||
        /^[\s]*$/.test(componente.indicador) ||
        componente.formula === undefined ||
        /^[\s]*$/.test(componente.formula) ||
        componente.frecuencia === undefined ||
        /^[\s]*$/.test(componente.frecuencia) ||
        componente.medios === undefined ||
        /^[\s]*$/.test(componente.medios) ||
        componente.supuestos === undefined ||
        /^[\s]*$/.test(componente.supuestos)
      ) {
        err = 1;
        errores.push(
          `<hr> <strong>COMPONENTE ${index + 1} </strong> INCOMPLETO.`
        );
      }
      if (
        componente.resumen === undefined ||
        /^[\s]*$/.test(componente.resumen) ||
        componente.resumen === null
      ) {
        err = 1;
        errores.push(`<strong> RESUMEN NARRATIVO</strong> SIN INFORMACIÓN.`);
      }
      if (
        componente.indicador === undefined ||
        /^[\s]*$/.test(componente.indicador)
      ) {
        err = 1;
        errores.push(`<strong> INDICADOR </strong> SIN INFORMACIÓN.`);
      }
      if (
        componente.formula === undefined ||
        /^[\s]*$/.test(componente.formula)
      ) {
        err = 1;
        errores.push(
          `<strong> COMPONENTE ${index + 1}: FÓRMULA</strong> SIN INFORMACIÓN.`
        );
      }
      if (componente.frecuencia === undefined || componente.frecuencia === "") {
        err = 1;
        errores.push(`<strong> FRECUENCIA</strong> SIN INFORMACIÓN.`);
      }
      if (
        componente.medios === undefined ||
        /^[\s]*$/.test(componente.medios)
      ) {
        err = 1;
        errores.push(
          `<strong> MEDIOS DE VERIFICACIÓN</strong> SIN INFORMACIÓN.`
        );
      }
      if (
        componente.supuestos === undefined ||
        /^[\s]*$/.test(componente.supuestos)
      ) {
        err = 1;
        errores.push(`<strong> SUPUESTOS</strong> SIN INFORMACIÓN.`);
      } else {
        return true;
      }
    });
    checkActividades(v);
  };

  const checkActividades = (v: string) => {
    JSON.parse(MIR)?.componentes.map(
      (componente: IComponente, indexC: number) => {
        componente.actividades.map((actividad: IActividad, indexA: number) => {

          if (
            actividad.resumen === undefined ||
            /^[\s]*$/.test(actividad.resumen) ||
            actividad.resumen === null ||
            actividad.indicador === undefined ||
            /^[\s]*$/.test(actividad.indicador) ||
            actividad.formula === undefined ||
            /^[\s]*$/.test(componente.actividades[indexA].formula) ||
            actividad.frecuencia === undefined ||
            /^[\s]*$/.test(componente.actividades[indexA].frecuencia) ||
            actividad.medios === undefined ||
            /^[\s]*$/.test(actividad.medios) ||
            actividad.supuestos === undefined ||
            /^[\s]*$/.test(actividad.supuestos)
          ) {
            err = 1;
            errores.push(
              `<hr><strong>ACTIVIDAD ${(actividad.actividad, indexA + 1)
              } </strong> INCOMPLETA.`
            );
          }
          if (
            actividad.resumen === undefined ||
            /^[\s]*$/.test(actividad.resumen) ||
            componente.actividades[indexA].resumen === null
          ) {
            errores.push(
              `<strong> RESUMEN NARRATIVO</strong> SIN INFORMACIÓN.`
            );
            err = 1;
          }


          if (
            componente.actividades[indexA].indicador === undefined ||
            /^[\s]*$/.test(componente.actividades[indexA].indicador)
          ) {
            err = 1;
            errores.push(`<strong> INDICADOR </strong> SIN INFORMACIÓN.`);
          }
          if (
            componente.actividades[indexA].formula === undefined ||
            /^[\s]*$/.test(componente.actividades[indexA].formula)
          ) {
            errores.push(`<strong> FÓRMULA</strong> SIN INFORMACIÓN.`);
            err = 1;
          }
          if (
            componente.actividades[indexA].frecuencia === undefined ||
            componente.actividades[indexA].frecuencia === ""
          ) {
            errores.push(`<strong> FRECUENCIA</strong> SIN INFORMACIÓN.`);
            err = 1;
          }
          if (
            componente.actividades[indexA].medios === undefined ||
            /^[\s]*$/.test(componente.actividades[indexA].medios)
          ) {
            errores.push(
              `<strong> MEDIOS DE VERIFICACIÓN</strong> SIN INFORMACIÓN.`
            );
            err = 1;
          }
          if (
            componente.actividades[indexA].supuestos === undefined ||
            /^[\s]*$/.test(componente.actividades[indexA].supuestos)
          ) {
            errores.push(`<strong> SUPUESTOS</strong> SIN INFORMACIÓN.`);
            err = 1;
          }
        });


      }
    );
    if (err === 0) {
      createMIR(v);
    } else {
      Toast.fire({
        icon: "error",
        html: `
        <div style="height:50%;">
        <h3>SE HAN ENCONTRADO LOS SIGUIENTES ERRORES:</h3>
        <div style="text-align: left; margin-left: 10px; color: red; height: 300px; overflow: auto;">
      <small>
      <strong>
      </strong>${errores.join("<br><strong></strong>")}
      </small>
      </div>
      </div>`,
      });
    }
  };
  useEffect(() => {
    console.log("estadoMIR: ", estadoMIR);
  }, []);

  const CrearMetaAnual = (mensaje: string, IdMir: string) => {


    axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/create-MetaAnual",
        {
          MetaAnual: "",
          // se va a modificar
          CreadoPor: localStorage.getItem("IdUsuario"),
          IdMir: IdMir,
          Estado: "En Captura",
          Id: "",
          // va a cambiar
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


        userXInst.map((user) => {


          enviarNotificacion(user.IdUsuario, r.data.data.Id, "MA");
          sendMail(user.CorreoElectronico, enviarMensaje, "MA");
        });
        showResume();
      })
      .catch((err) => {
        err = 1;
        errores.push(err);
      });
  };

  const createMIR = (estado: string) => {


    axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/create-mir",

        {
          MIR: MIR,
          Estado: estado,
          CreadoPor:
            userSelected !== "0"
              ? userSelected
              : //se va a modificar
              localStorage.getItem("IdUsuario"),
          AnioFiscal: JSON.parse(MIR)?.encabezado.ejercicioFiscal.Label,
          IdEntidad: localStorage.getItem("IdEntidad"),
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
        userXInst.map((user) => {
          //enviarMail("Se ha creado una nueva MIR","d4b35a67-5eb9-11ed-a880-040300000000")

          sendMail(user.CorreoElectronico, enviarMensaje, "MIR");
          enviarNotificacion(user.IdUsuario, r.data.data.ID, "MIR");
        });

        if (estado === "Autorizada") {
          CrearMetaAnual(r.data.data.ID, IdMir);
        }

        Toast.fire({
          icon: "success",
          title:
            localStorage.getItem("Rol") === "Administrador"
              ? "¡MIR autorizada con éxito!, Meta Anual disponible para captura"
              : "¡MIR enviada con éxito!",
        });

        if (comment !== "") {
          comentMir(r.data.data.ID);
        }
        showResume();
      })
      .catch((err) => {
        errores.push(err.response.data.result.error);
        err = 1;
        Toast.fire({
          icon: "error",
          html: `
          <div style="height:50%;">
          <h3>SE HAN ENCONTRADO LOS SIGUIENTES ERRORES:</h3>
          <div style="text-align: left; margin-left: 10px; color: red; height: 300px; overflow: auto;">
        <small>
        <strong>
        </strong>${errores.join("<br><strong></strong>")}
        </small>
        </div>
        </div>`,
        });
      });
  };

  useEffect(() => {
    if (open) {
      let inst = JSON.parse(MIR)?.encabezado.entidad;

      axios

        /////listado
        .post(
          process.env.REACT_APP_APPLICATION_BACK + "/api/tipo-usuario",

          {
            TipoUsuario: localStorage.getItem("Rol"),
            IdEntidad: localStorage.getItem("IdEntidad"),
            IdApp: localStorage.getItem("IdApp"),
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

  const enviarNotificacion = (
    IdUsuarioDestino: string,
    IdDoc = "",
    Nombre = ""
  ) => {

    axios.post(
      process.env.REACT_APP_APPLICATION_BACK + "/api/create-notif",

      {
        IdUsuarioDestino: IdUsuarioDestino,
        Titulo: Nombre,
        Mensaje: enviarMensaje + " " + Nombre,
        IdDocumento: IdDoc,
        CreadoPor: localStorage.getItem("IdUsuario"),
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

  const mirFuncionAutorizada = () =>{
    mDocumentos.map((item)=>{
      removeComponenteMA(Number(item.indice.split('C')[1]));
    })
  }

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={open}
      onClose={() => handleClose(false)}
    >
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
              ? estadoMIR === "Autorizada"
                ? "Al confirmar, la MIR se autorizará y el apartado de la Meta Anual será habilitado. Al confirmar los cambios se modificará la MIR y afectará la información de la Meta Anual y Ficha Técnica."
                : "Al confirmar, la MIR se autorizará y el apartado de la Meta Anual será habilitado."
              : localStorage.getItem("Rol") === "Verificador"
                ? "Al confirmar, la MIR se enviará a los usuarios correspondientes para autorización."
                : "Al confirmar, la MIR se enviará a los usuarios correspondientes para revisión."}
          </Typography>
        </Box>

        {estadoMIR !== "Autorizada" && (
          <Box sx={{ width: "30vw" }}>
            <TextField
              multiline
              rows={3}
              label={"Agregar Comentario"}
              sx={{ width: "30vw" }}
              onChange={(v) => setComment(v.target.value)}
            />
          </Box>
        )}

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
              alignItems: "flex-ce",
              justifyContent: "space-between",
              width: "20vw",
              mt: "4vh",
            }}
          >
            <Button
              sx={queries.buttonCancelarSolicitudInscripcion}
              onClick={() => handleClose(false)}
            >
              <Typography sx={{ fontFamily: "MontserratRegular" }}>
                Cancelar
              </Typography>
            </Button>

            <Button
              sx={queries.buttonContinuarSolicitudInscripcion}
              onClick={() => {
                checkMir(
                  localStorage.getItem("Rol") === "Capturador"
                    ? "En Revisión"
                    : localStorage.getItem("Rol") === "Verificador"
                      ? "En Autorización"
                      : "Autorizada"
                );
                
                handleClose(false);
                setNewComent(false);
                RestructuraMAyFT()
                if(estadoMIR === "Autorizada"){
                  mirFuncionAutorizada()
                }
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
  Rol: string;
  Entidad: string;
  Nombre: string;
  ApellidoPaterno: string;
  ApellidoMaterno: string;
  NomvreUsuario: string;
  CorreoElectronico: string;
}
