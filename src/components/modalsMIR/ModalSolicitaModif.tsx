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

import { IActividad, IComponente } from "../tabsMir/interfaces mir/IMIR";

import {
  alertaError,
  alertaErroresDocumento,
  alertaExito,
} from "../genericComponents/Alertas";
import {
  create_coment_mir,
  soliModyNoty,
} from "../genericComponents/axiosGenericos";

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

  const [coment, setComment] = useState("");

  const comentMir = (id: string) => {
    create_coment_mir(id, coment, "MIR")
      .then((r) => {
        setComment("");
      })
      .catch((err) => {});
  };

  const checkUsuario = (estado: string) => {
    if (userSelected === "0" || userSelected === "") {
      alertaError("Introduce usuario al que se le solicita modificación");
    } else {
      checkMir(estado);
    }
  };

  const checkMir = (v: string) => {
    errores = [];
    if (
      JSON.parse(MIR)?.encabezado.ejercicioFiscal === undefined ||
      /^[\s]*$/.test(JSON.parse(MIR)?.encabezado.ejercicioFiscal) ||
      JSON.parse(MIR)?.encabezado.entidad === undefined ||
      /^[\s]*$/.test(JSON.parse(MIR)?.encabezado.entidad) ||
      JSON.parse(MIR)?.encabezado.programa === undefined ||
      /^[\s]*$/.test(JSON.parse(MIR)?.encabezado.programa) ||
      JSON.parse(MIR)?.encabezado.eje === undefined ||
      /^[\s]*$/.test(JSON.parse(MIR)?.encabezado.eje) ||
      JSON.parse(MIR)?.encabezado.tema === undefined ||
      /^[\s]*$/.test(JSON.parse(MIR)?.encabezado.tema) ||
      JSON.parse(MIR)?.encabezado.objetivo === undefined ||
      /^[\s]*$/.test(JSON.parse(MIR)?.encabezado.objetivo) ||
      JSON.parse(MIR)?.encabezado.estrategia === undefined ||
      /^[\s]*$/.test(JSON.parse(MIR)?.encabezado.estrategia) ||
      JSON.parse(MIR)?.encabezado.lineas_de_accion === undefined ||
      /^[\s]*$/.test(JSON.parse(MIR)?.encabezado.lineas_de_accion ||
      JSON.parse(MIR)?.encabezado.beneficiario === undefined ||
      /^[\s]*$/.test(JSON.parse(MIR)?.encabezado.beneficiario)
      )
    ) {
      err = 1;
      errores.push("SECCIÓN <strong>ENCABEZADO </strong> INCOMPLETA.");
    }
    if (
      JSON.parse(MIR)?.encabezado.ejercicioFiscal.Label === "" ||
      JSON.parse(MIR)?.encabezado.ejercicioFiscal.Label === undefined ||
      /^[\s]*$/.test(JSON.parse(MIR)?.encabezado.ejercicioFiscal.Label)
    ) {
      console.log("ejercicioFiscal");

      err = 1;
      errores.push("<strong> EJERCICIO FISCAL</strong> NO SELECCIONADO.");
    }
    if (
      JSON.parse(MIR)?.encabezado.entidad.Label === "" ||
      JSON.parse(MIR)?.encabezado.entidad.Label === undefined ||
      /^[\s]*$/.test(JSON.parse(MIR)?.encabezado.entidad.Label)
    ) {
      err = 1;
      errores.push("<strong> INSTITUCIÓN</strong> NO SELECCIONADA.");
    }
    if (
      JSON.parse(MIR)?.encabezado.programa.Label === "" ||
      JSON.parse(MIR)?.encabezado.programa.Label === undefined ||
      /^[\s]*$/.test(JSON.parse(MIR)?.encabezado.programa.Label)
    ) {
      err = 1;
      errores.push(
        "<strong> PROGRAMA PRESUPUESTARIO</strong> NO SELECCIONADO."
      );
    }
    if (
      JSON.parse(MIR)?.encabezado.eje.Label === "" ||
      JSON.parse(MIR)?.encabezado.eje.Label === undefined ||
      /^[\s]*$/.test(JSON.parse(MIR)?.encabezado.eje.Label)
    ) {
      err = 1;
      errores.push("<strong> EJE</strong> NO SELECCIONADO.");
    }
    if (
      JSON.parse(MIR)?.encabezado.tema.Label === "" ||
      JSON.parse(MIR)?.encabezado.tema.Label === undefined ||
      /^[\s]*$/.test(JSON.parse(MIR)?.encabezado.tema.Label)
    ) {
      err = 1;
      errores.push("<strong> TÉMATICA</strong> NO SELECCIONADA.");
    }
    if (
      JSON.parse(MIR)?.encabezado.objetivo.Label === "" ||
      JSON.parse(MIR)?.encabezado.objetivo.Label === undefined ||
      /^[\s]*$/.test(JSON.parse(MIR)?.encabezado.objetivo.Label)
    ) {
      err = 1;
      errores.push("<strong> OBJETIVO</strong> NO SELECCIONADO.");
    }
    if (
      JSON.parse(MIR)?.encabezado.estrategia.Label === "" ||
      JSON.parse(MIR)?.encabezado.estrategia.Label === undefined ||
      /^[\s]*$/.test(JSON.parse(MIR)?.encabezado.estrategia.Label)
    ) {
      err = 1;
      errores.push("<strong> ESTRATEGIA</strong> NO SELECCIONADA.");
    }
    if (
      JSON.parse(MIR)?.encabezado.lineas_de_accion === "" ||
      JSON.parse(MIR)?.encabezado.lineas_de_accion === undefined ||
      /^[\s]*$/.test(JSON.parse(MIR)?.encabezado.lineas_de_accion)
    ) {
      err = 1;
      errores.push(
        "<strong> LÍNEA DE ACCIÓN</strong> SELECCIONA AL MENOS 1 OPCIÓN."
      );
    }
    if (
      JSON.parse(MIR)?.encabezado.beneficiario === "" ||
      JSON.parse(MIR)?.encabezado.beneficiario === undefined ||
      /^[\s]*$/.test(JSON.parse(MIR)?.encabezado.beneficiario)
    ) {
      console.log("JSON.parse(MIR)?.encabezado: ", JSON.parse(MIR)?.encabezado);

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
              `<hr><strong> ${actividad.actividad} </strong> INCOMPLETA.`
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
      alertaErroresDocumento(errores);
    }
  };

  const createMIR = (estado: string) => {
    // cualquier metodo de array saca el objeto u elemento
    let rolusuario = userXInst.find((user) => user.IdUsuario === userSelected);

    if (
      estado === "Autorizada" &&
      userSelected !== "0" &&
      rolusuario?.Rol === "Verificador"
    ) {
      estado = "En Revisión";
    } else if (
      estado === "En Autorización" &&
      userSelected !== "0" &&
      rolusuario?.Rol === "Capturador"
    ) {
      estado = "En Captura";
    } else if (estado === "En Autorización" && userSelected !== "0") {
      estado = "En Captura";
    } else if (
      estado === "Autorizada" &&
      userSelected !== "0" &&
      rolusuario?.Rol === "Capturador"
    ) {
      estado = "En Captura";
    }

    axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/create-mir-generic",
        {
          MIR: MIREdit === undefined ? MIR : "[" + MIR + "," + MIREdit + "]",
          Estado: estado,
          CreadoPor:
            userSelected !== "0"
              ? userSelected
              : //va a cambiar
                localStorage.getItem("IdUsuario"),
          AnioFiscal: JSON.parse(MIR)?.encabezado.ejercicioFiscal.Label,
          IdEntidad:
            JSON.parse(MIR)?.encabezado.entidad.Id ||
            localStorage.getItem("IdEntidad"),
          Programa: JSON.parse(MIR)?.encabezado.programa.Label,
          Eje: JSON.parse(MIR)?.encabezado.eje.Label,
          Tematica: JSON.parse(MIR)?.encabezado.tema.Label,
          IdMir: IdMir,
          Rol: localStorage.getItem("Rol"),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        if (coment !== "") {
          comentMir(IdMir);
        }

        alertaExito(
          () => {},
          localStorage.getItem("Rol") === "Verificador"
            ? "MIR enviada a capturador"
            : "MIR enviada a revisión"
        );
        console.log(IdMir, "IdMirS");

        soliModyNoty(
          userSelected,
          "Se le ha solicitado una modificación.",
          "MIR",
          IdMir
        );
        handleClose();
        showResume();
      })
      .catch((err) => {
        alertaError(err.response.data.result.error);
      });
  };

  useEffect(() => {
    let tipousuario = "";

    if (localStorage.getItem("Rol") === "Capturador")
      tipousuario = "Verificador";

    if (localStorage.getItem("Rol") === "Verificador")
      tipousuario = "Verificador";
    if (localStorage.getItem("Rol") === "Administrador")
      tipousuario = "VERIFICADOR_CAPTURADOR";

    if (open) {
      axios
        .post(
          process.env.REACT_APP_APPLICATION_BACK + "/api/tipo-usuario",
          {
            TipoUsuario: tipousuario,
            IdEntidad: localStorage.getItem("IdEntidad"),
            IdApp: localStorage.getItem("IdApp"),
          },
          {
            headers: {
              Authorization: localStorage.getItem("jwtToken") || "",
            },
          }
        )
        .then(({ status, data }) => {
          if (status === 200) {
            setUserXInst(data.data);
          }
        });
    }
  }, [MIR, open]);

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
                    {item.Rol +
                      ": " +
                      item.Nombre +
                      " " +
                      item.ApellidoPaterno +
                      " " +
                      item.ApellidoMaterno}
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
              className="cancelar"
              sx={{
                //...queries.buttonCancelarSolicitudInscripcion,
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
              className="aceptar"
              sx={{
                //...queries.buttonContinuarSolicitudInscripcion,
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
                {coment === "" ? "Enviar sin comentarios" : "Confirmar"}
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
