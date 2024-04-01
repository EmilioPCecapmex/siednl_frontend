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

import { queries } from "../../queries";
import {
  IActividad,
  IComponente,
  IMovimientos,
} from "../tabsMir/interfaces mir/IMIR";
import { getMAyFT } from "../../services/mir_services/MIR_services";
import { IMA } from "../tabsMetaAnual/IMA";
import { IComponentesFT, IFT } from "../tabsFichaTecnica/Interfaces";
import { IComponenteMA } from "../tabsMetaAnual/Interfaces";
import {
  alertaEliminar,
  alertaErroresDocumento,
  alertaExito,
  alertaExitoConfirm,
} from "../genericComponents/Alertas";
import { IComponenteRF, IRF } from "../tabsRaffi/interfacesRaffi";
import {
  create_coment_mir,
  enviarNotificacionRol,
} from "../genericComponents/axiosGenericos";

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
  IdEntidad,
}: {
  open: boolean;
  handleClose: Function;
  MIR: string;
  IdMir: string;
  showResume: Function;
  estadoMIR: string;
  RestructuraMAyFT: Function;
  mDocumentos: IMovimientos[];
  IdEntidad: string;
}) {
  const [ma, setMA] = useState<IMA>();
  const [ft, setFT] = useState<IFT>();
  const [rf, setRF] = useState<IRF>();

  const [Idma, setIdMA] = useState("");
  const [Idft, setIdFT] = useState("");
  const [Idrf, setIdRF] = useState("");

  useEffect(() => {
    if (estadoMIR === "Autorizada") {
      getMAyFT(IdMir, setMA, setFT, setRF, setIdMA, setIdFT, setIdRF);
    }
    console.log("Idma: ", Idma);
  }, [Idma]);

  ///////////////////////////////////////////////////////////////////////////////////////////
  const removeComponenteFT = (componenteSelected: number) => {
    if (ft) {
      let arrComponentes: IComponentesFT[] = ft.componentes.filter(
        (componente) =>
          !componente.componentes.includes(`C${componenteSelected}`)
      );

      arrComponentes = arrComponentes.map((componente, index) => {
        if (
          parseInt(componente.componentes.split("C")[1]) >= componenteSelected
        ) {
          let aux = {
            ...componente,
            componentes: `C${index + 1}`,
            actividades: componente.actividades.map((item) => {
              return {
                ...item,
                actividades: item.actividades.replace(/C\d+/, `C${index + 1}`),
              };
            }),
          };

          return aux;
        } else return componente;
      });

      setFT({ ...ft, componentes: arrComponentes });
      return { ...ft, componentes: arrComponentes };
    }
    return ft;
  };

  ///////////////////////////////////////////////////////////////////////////////////////////
  const removeComponenteMA = (componenteSelected: number) => {
    if (ma) {
      let arrComponentes: IComponenteMA[] = ma.componentes.filter(
        (componente) =>
          !componente.componentes.includes(`C${componenteSelected}`)
      );

      arrComponentes = arrComponentes.map((componente, index) => {
        if (
          parseInt(componente.componentes.split("C")[1]) >= componenteSelected
        ) {
          let aux = {
            ...componente,
            componentes: `C${index + 1}`,
            actividades: componente.actividades.map((item) => {
              return {
                ...item,
                actividad: item.actividad.replace(/C\d+/, `C${index + 1}`),
              };
            }),
          };

          return aux;
        } else return componente;
      });

      setMA({ ...ma, componentes: arrComponentes });
      return { ...ma, componentes: arrComponentes };
    }
    return ma;
  };

  const removeComponenteRF = (componenteSelected: number) => {
    if (rf) {
      let arrComponentes: IComponenteRF[] = rf.componentes.filter(
        (componente) =>
          !componente.componentes.includes(`C${componenteSelected}`)
      );

      arrComponentes = arrComponentes.map((componente, index) => {
        if (
          parseInt(componente.componentes.split("C")[1]) >= componenteSelected
        ) {
          let aux = {
            ...componente,
            componentes: `C${index + 1}`,
            actividades: componente.actividades.map((item) => {
              return {
                ...item,
                actividad: item.actividad.replace(/C\d+/, `C${index + 1}`),
              };
            }),
          };

          return aux;
        } else return componente;
      });

      setRF({ ...rf, componentes: arrComponentes });
      return { ...rf, componentes: arrComponentes };
    }
    return rf;
  };
  ///////////////////////////////////////////////////////////////////////////////////////////

  const [coment, setComment] = useState("");

  const [userXInst, setUserXInst] = useState<Array<IIUserXInst>>([]);
  const [userSelected] = useState("0"); //, setUserSelected
  let err = 0;

  const [newComent, setNewComent] = React.useState(false);
  const enviarMensaje = "Se ha creado una nueva";

  const comentMir = (id: string) => {
    create_coment_mir(id, coment, "MIR")
      .then((r) => {
        setNewComent(false);
        setComment("");
      })
      .catch((err) => {});
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
      if (estadoMIR === "Autorizada" && IdMir && IdMir !== "") {
        mirFuncionAutorizada();
      } else {
        createMIR(v);
      }
    } else {
      alertaErroresDocumento(errores);
    }
  };

  const CrearMetaAnual = (mensaje: string, IdMir: string, IdMa: String) => {
    const idMirFinal = IdMir || mensaje;
    console.log(IdEntidad);
    
    axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/create-ma-generic",
        {
          MetaAnual: "",
          CreadoPor: localStorage.getItem("IdUsuario"),
          IdMir: idMirFinal,
          Estado: "En Captura",
          Id: "",
          Rol: localStorage.getItem("Rol"),
          IdEntidad: JSON.parse(MIR)?.encabezado.entidad.Id || IdEntidad ||
          localStorage.getItem("IdEntidad"),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        let rol: string[] = [];
        if (localStorage.getItem("Rol") === "Verificador") {
          rol = ["Administrador"];
        }

        if (localStorage.getItem("Rol") === "Capturador") {
          rol = ["Verificador"];
        }

        if (localStorage.getItem("Rol") === "Administrador") {
          rol = ["Capturador", "Verificador"];
        }
        console.log("MA-r.data.data.Id: ", r.data.data);

        enviarNotificacionRol(
          "MA",
          "MA ENVIADA",
          r?.data?.data?.Id || IdMa,
          rol, (JSON.parse(MIR)?.encabezado.entidad.Id || IdEntidad)
        );
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
        process.env.REACT_APP_APPLICATION_BACK + "/api/create-mir-generic",

        {
          MIR: MIR,
          Estado: estado,
          CreadoPor:
            userSelected !== "0"
              ? userSelected
              : //se va a modificar
                localStorage.getItem("IdUsuario"),
          AnioFiscal: JSON.parse(MIR)?.encabezado.ejercicioFiscal.Label,
          IdEntidad: JSON.parse(MIR)?.encabezado.entidad.Id || IdEntidad ||
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
        // userXInst.map((user) => {

        //  soliModyNoty(user.IdUsuario, r.data.data.ID, "MIR");
        // });
        let rol: string[] = [];
        if (localStorage.getItem("Rol") === "Verificador") {
          rol = ["Administrador"];
        }

        if (localStorage.getItem("Rol") === "Capturador") {
          rol = ["Verificador"];
        }

        if (localStorage.getItem("Rol") === "Administrador") {
          rol = ["Capturador", "Verificador"];
        }
        console.log("r.dada.data: ", r.data.data);

        enviarNotificacionRol("MIR", "MIR ENVIADA", r.data.data.Id, rol, (JSON.parse(MIR)?.encabezado.entidad.Id || IdEntidad));
        console.log("estado: ", estado);

        if (estado === "Autorizada") {
      
          CrearMetaAnual(r.data.data.Id, IdMir, r.data.data.IdMa);
        }

        alertaExitoConfirm(
          (localStorage.getItem("Rol") === "Administrador"
            ? "¡MIR AUTORIZADA CON ÉXITO!, META ANUAL DISPONIBLE PARA CAPTURA"
            : "¡MIR ENVIADA CON ÉXITO!"
          ).toUpperCase()
        );

        if (coment !== "") {
          comentMir(r.data.data.Id);
        }
        showResume();
      })
      .catch((err) => {
        errores.push(err.response.data.result.error);
        err = 1;
        alertaErroresDocumento(errores);
      });
  };

  useEffect(() => {
    if (open) {
      axios

        .post(
          process.env.REACT_APP_APPLICATION_BACK + "/api/tipo-usuario",

          {
            TipoUsuario: localStorage.getItem("Rol"),
            IdEntidad: IdEntidad,
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

  const mirFuncionAutorizada = () => {
    let auxMA: string;
    let auxFT: string;
    let auxRF: string;

    if (ft !== null || ft !== undefined) {
      auxFT = JSON.stringify(ft);
    } else {
      auxFT = "";
    }

    if (ma !== null || ma !== undefined || ma === "null") {
      auxMA = JSON.stringify(ma);
    } else {
      auxMA = "";
    }

    if (rf !== null || rf !== undefined || rf === "null") {
      auxRF = JSON.stringify(rf);
    } else {
      auxRF = "";
    }

    mDocumentos.map((item) => {
      if (item.movimiento === "remove") {
        auxMA = JSON.stringify(
          removeComponenteMA(Number(item.indice.split("C")[1]))
        );
        auxFT = JSON.stringify(
          removeComponenteFT(Number(item.indice.split("C")[1]))
        );
        auxRF = JSON.stringify(
          removeComponenteRF(Number(item.indice.split("C")[1]))
        );
      }
    });

    axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/update-info",
        {
          IdMir: IdMir,
          IdMa: Idma,
          IdFT: Idft,
          MIR: MIR,
          Estado: estadoMIR,
          MA: auxMA,
          FT: auxFT,
          Rol: localStorage.getItem("Rol"),
          CreadoPor: localStorage.getItem("IdUsuario"),
          IdRF: Idrf,
          RF: auxRF,
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then(() => {
        alertaExito(showResume);
      });
  };

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
          ? "CONFIRMAR AUTORIZACIÓN"
          : "CONFIRMAR ENVÍO"}
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
              label={"AGREGAR COMENTARIO"}
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
              className="cancelar"
              //sx={queries.buttonCancelarSolicitudInscripcion}
              onClick={() => handleClose(false)}
            >
              <Typography sx={{ fontFamily: "MontserratRegular" }}>
                Cancelar
              </Typography>
            </Button>

            <Button
              className="aceptar"
              //sx={queries.buttonContinuarSolicitudInscripcion}
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

                RestructuraMAyFT();
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
