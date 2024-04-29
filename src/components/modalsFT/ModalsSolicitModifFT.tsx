import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  FormControl,
  Button,
  Typography,
  Autocomplete,
  Grid,
} from "@mui/material";
import { IIUserXInst } from "../modalsMIR/ModalEnviarMIR";
import { IActividadesFT, IComponentesFT } from "../tabsFichaTecnica/Interfaces";
import {
  alertaEliminar,
  alertaError,
  alertaErrorConfirm,
  alertaErroresDocumento,
  alertaExito,
  alertaExitoConfirm,
} from "../genericComponents/Alertas";
import {
  create_coment_mir,
  soliModyNoty,
} from "../genericComponents/axiosGenericos";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
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
  FTEdit,
  IdEntidad,
}: {
  open: boolean;
  handleClose: Function;
  showResume: Function;
  FT: string;
  MIR: string;
  IdFT: string;
  IdMa: string;
  IdMIR: string;
  FTEdit: string;
  IdEntidad: string;
}) {
  const [userXInst, setUserXInst] = useState<Array<IIUserXInst>>([]);
  const [userSelected, setUserSelected] = useState("0");

  const newUser = {
    IdUsuario: "",
    IdUsuarioTiCentral: "",
    Rol: "",
    NombreInstitucion: "",
    Nombre: "",
    ApellidoPaterno: "",
    ApellidoMaterno: "",
    NombreUsuario: "",
  };

  const [user, setUser] = useState<IIUserXInst>(newUser);

  useEffect(() => {
    let findUser = userXInst.find(
      (item) => item.NombreUsuario === userSelected
    );
    setUser(findUser || newUser);
  }, [userXInst]);

  const [coment, setComment] = useState("");

  const comentFT = () => {
    create_coment_mir(IdMIR, coment, "FT")
      .then((r) => {
        setComment("");
        handleClose();
      })
      .catch((err) => {});
  };

  const checkUsuario = (estado: string) => {
    if (userSelected === "0" || userSelected === "") {
      return alertaError(
        "Introduce usuario al que se le solicita modificación"
      );
    } else {
      checkFT(estado);
    }
  };

  let err = 0;

  const checkFT = (v: string) => {
    errores = [];

    if (
      JSON.parse(FT)?.encabezado.programaSER === undefined ||
      /^[\s]*$/.test(JSON.parse(FT)?.encabezado.programaSER) ||
      JSON.parse(FT)?.encabezado.objetivoSER === undefined ||
      /^[\s]*$/.test(JSON.parse(FT)?.encabezado.objetivoSER) ||
      JSON.parse(FT)?.encabezado.objetivoODS === undefined ||
      /^[\s]*$/.test(JSON.parse(FT)?.encabezado.objetivoODS) ||
      JSON.parse(FT)?.encabezado.metaODS === undefined ||
      /^[\s]*$/.test(JSON.parse(FT)?.encabezado.metaODS)
    ) {
      err = 1;
      errores.push("SECCIÓN <strong>ENCABEZADO</strong> INCOMPLETA.");
      //Se me ocurre hacer una variable que aumente por if que enttre y que con solo ser mayor a 1 ya muestre el header
    }
    if (
      JSON.parse(FT)?.encabezado.programaSER === undefined ||
      JSON.parse(FT)?.encabezado.programaSER === "" ||
      JSON.parse(FT)?.encabezado.programaSER === null ||
      /^[\s]*$/.test(JSON.parse(FT)?.encabezado.programaSER)
    ) {
      err = 1;
      errores.push(
        "<strong> PROGRAMA SECTORIAL, ESPECIAL O REGIONAL</strong> SIN INFORMACIÓN."
      );
    }
    if (
      JSON.parse(FT)?.encabezado.objetivoSER === undefined ||
      JSON.parse(FT)?.encabezado.objetivoSER === "" ||
      /^[\s]*$/.test(JSON.parse(FT)?.encabezado.objetivoSER)
    ) {
      err = 1;
      errores.push(
        "<strong>OBJETIVO SECTORIAL, ESPECIAL O REGIONAL</strong> SIN INFORMACIÓN."
      );
    }
    if (
      JSON.parse(FT)?.encabezado.objetivoODS === undefined ||
      JSON.parse(FT)?.encabezado.objetivoODS === "" ||
      /^[\s]*$/.test(JSON.parse(FT)?.encabezado.objetivoODS)
    ) {
      err = 1;
      errores.push("<strong>OBJETIVO ODS</strong>  NO SELECCIONADO.");
    }
    if (
      JSON.parse(FT)?.encabezado.metaODS === undefined ||
      JSON.parse(FT)?.encabezado.metaODS === "" ||
      /^[\s]*$/.test(JSON.parse(FT)?.encabezado.metaODS)
    ) {
      err = 1;
      errores.push("<strong>META ODS</strong> NO SELECCIONADO.");
    }
    if (
      JSON.parse(FT)?.fin.tipoDeIndicador === undefined ||
      // /^[\s]*$/.test(JSON.parse(FT)?.fin.tipoDeIndicador) ||
      JSON.parse(FT)?.fin.tipoDeIndicador === "" ||
      JSON.parse(FT)?.fin.dimension === undefined ||
      ///^[\s]*$/.test(JSON.parse(FT)?.fin.dimension) ||
      JSON.parse(FT)?.fin.unidadDeMedida === undefined ||
      ///^[\s]*$/.test(JSON.parse(FT)?.fin.unidadDeMedida) ||
      JSON.parse(FT)?.fin.claridad === undefined ||
      ///^[\s]*$/.test(JSON.parse(FT)?.claridad.frecuencia) ||
      JSON.parse(FT)?.fin.relevancia === undefined ||
      ///^[\s]*$/.test(JSON.parse(FT)?.fin.relevancia) ||
      JSON.parse(FT)?.fin.economia === undefined ||
      ///^[\s]*$/.test(JSON.parse(FT)?.fin.economia) ||
      JSON.parse(FT)?.fin.monitoreable === undefined ||
      ///^[\s]*$/.test(JSON.parse(FT)?.fin.monitoreable) ||
      JSON.parse(FT)?.fin.adecuado === undefined ||
      ///^[\s]*$/.test(JSON.parse(FT)?.fin.adecuado) ||
      JSON.parse(FT)?.fin.aporte_marginal === undefined
      ///^[\s]*$/.test(JSON.parse(FT)?.fin.aporte_marginal)
    ) {
      err = 1;
      errores.push("SECCIÓN <strong> FIN</strong> INCOMPLETA.");
    }
    if (
      JSON.parse(FT)?.fin.tipoDeIndicador === undefined ||
      /^[\s]*$/.test(JSON.parse(FT)?.fin.tipoDeIndicador) ||
      JSON.parse(FT)?.fin.tipoDeIndicador === ""
    ) {
      err = 1;
      errores.push("<strong>FIN</strong>: TIPO DE INDICADOR NO SELECCIONADO.");
    }
    if (
      JSON.parse(FT)?.fin.dimension === undefined ||
      /^[\s]*$/.test(JSON.parse(FT)?.fin.dimension) ||
      JSON.parse(FT)?.fin.dimension === ""
    ) {
      err = 1;
      errores.push("<strong>FIN</strong>: DIMENSIÓN NO SELECCIONADO.");
    }
    if (
      JSON.parse(FT)?.fin.unidadDeMedida === undefined ||
      JSON.parse(FT)?.fin.unidadDeMedida === "" ||
      /^[\s]*$/.test(JSON.parse(FT)?.fin.unidadDeMedida)
    ) {
      err = 1;
      errores.push("<strong>FIN</strong>: UNIDAD DE MEDIDA SIN INFORMACIÓN.");
    }
    if (
      JSON.parse(FT)?.fin.claridad === undefined ||
      /^[\s]*$/.test(JSON.parse(FT)?.fin.claridad) ||
      JSON.parse(FT)?.fin.claridad === ""
    ) {
      err = 1;
      errores.push("<strong>FIN</strong>: CLARIDAD NO SELECCIONADO.");
    }
    if (
      JSON.parse(FT)?.fin.relevancia === undefined ||
      /^[\s]*$/.test(JSON.parse(FT)?.fin.relevancia) ||
      JSON.parse(FT)?.fin.relevancia === ""
    ) {
      err = 1;
      errores.push("<strong>FIN</strong>: RELEVANCIA NO SELECCIONADO.");
    }
    if (
      JSON.parse(FT)?.fin.economia === undefined ||
      /^[\s]*$/.test(JSON.parse(FT)?.fin.economia) ||
      JSON.parse(FT)?.fin.economia === ""
    ) {
      err = 1;
      errores.push("<strong>FIN</strong>: ECONOMIA NO SELECCIONADO.");
    }
    if (
      JSON.parse(FT)?.fin.monitoreable === undefined ||
      /^[\s]*$/.test(JSON.parse(FT)?.fin.monitoreable) ||
      JSON.parse(FT)?.fin.monitoreable === ""
    ) {
      err = 1;
      errores.push("<strong>FIN</strong>: MONITOREABLE NO SELECCIONADO.");
    }
    if (
      JSON.parse(FT)?.fin.adecuado === undefined ||
      /^[\s]*$/.test(JSON.parse(FT)?.fin.adecuado) ||
      JSON.parse(FT)?.fin.adecuado === ""
    ) {
      err = 1;
      errores.push("<strong>FIN</strong>: ADECUADO NO SELECCIONADO.");
    }
    if (
      JSON.parse(FT)?.fin.aporte_marginal === undefined ||
      /^[\s]*$/.test(JSON.parse(FT)?.fin.aporte_marginal) ||
      JSON.parse(FT)?.fin.aporte_marginal === ""
    ) {
      err = 1;
      errores.push("<strong>FIN</strong>: Aporte Marginal NO SELECCIONADO.");
    }
    //////////////////////////////////////////////////////////////
    if (
      JSON.parse(FT)?.proposito.tipoDeIndicador === undefined ||
      ///^[\s]*$/.test(JSON.parse(FT)?.proposito.tipoDeIndicador) ||
      JSON.parse(FT)?.proposito.dimension === undefined ||
      ///^[\s]*$/.test(JSON.parse(FT)?.proposito.dimension) ||
      JSON.parse(FT)?.proposito.unidadDeMedida === undefined ||
      ///^[\s]*$/.test(JSON.parse(FT)?.proposito.unidadDeMedida) ||
      JSON.parse(FT)?.proposito.claridad === undefined ||
      ///^[\s]*$/.test(JSON.parse(FT)?.claridad.frecuencia) ||
      JSON.parse(FT)?.proposito.relevancia === undefined ||
      ///^[\s]*$/.test(JSON.parse(FT)?.proposito.relevancia) ||
      JSON.parse(FT)?.proposito.economia === undefined ||
      ///^[\s]*$/.test(JSON.parse(FT)?.proposito.economia) ||
      JSON.parse(FT)?.proposito.monitoreable === undefined ||
      ///^[\s]*$/.test(JSON.parse(FT)?.proposito.monitoreable) ||
      JSON.parse(FT)?.proposito.adecuado === undefined ||
      ///^[\s]*$/.test(JSON.parse(FT)?.proposito.adecuado) ||
      JSON.parse(FT)?.proposito.aporte_marginal === undefined
      ///^[\s]*$/.test(JSON.parse(FT)?.proposito.aporte_marginal)
    ) {
      err = 1;
      errores.push("SECCIÓN <strong>PROPOSITO</strong> INCOMPLETA.");
    }
    if (
      JSON.parse(FT)?.proposito.tipoDeIndicador === undefined ||
      /^[\s]*$/.test(JSON.parse(FT)?.proposito.tipoDeIndicador) ||
      JSON.parse(FT)?.proposito.tipoDeIndicador === ""
    ) {
      err = 1;
      errores.push(
        "<strong>PROPOSITO</strong>: TIPO DE INDICADOR NO SELECCIONADO."
      );
    }
    if (
      JSON.parse(FT)?.proposito.dimension === undefined ||
      /^[\s]*$/.test(JSON.parse(FT)?.proposito.dimension) ||
      JSON.parse(FT)?.proposito.dimension === ""
    ) {
      err = 1;
      errores.push("<strong>PROPOSITO</strong>: DIMENSIÓN NO SELECCIONADO.");
    }
    if (
      JSON.parse(FT)?.proposito.unidadDeMedida === undefined ||
      JSON.parse(FT)?.proposito.unidadDeMedida === "" ||
      /^[\s]*$/.test(JSON.parse(FT)?.proposito.unidadDeMedida)
    ) {
      err = 1;
      errores.push(
        "<strong>PROPOSITO</strong>: UNIDAD DE MEDIDA SIN INFORMACIÓN."
      );
    }
    if (
      JSON.parse(FT)?.proposito.claridad === undefined ||
      /^[\s]*$/.test(JSON.parse(FT)?.proposito.claridad) ||
      JSON.parse(FT)?.proposito.claridad === ""
    ) {
      err = 1;
      errores.push("<strong>PROPOSITO</strong>: CLARIDAD NO SELECCIONADO.");
    }
    if (
      JSON.parse(FT)?.proposito.relevancia === undefined ||
      /^[\s]*$/.test(JSON.parse(FT)?.proposito.relevancia) ||
      JSON.parse(FT)?.proposito.relevancia === ""
    ) {
      err = 1;
      errores.push("<strong>PROPOSITO</strong>: RELEVANCIA NO SELECCIONADO.");
    }
    if (
      JSON.parse(FT)?.proposito.economia === undefined ||
      /^[\s]*$/.test(JSON.parse(FT)?.proposito.economia) ||
      JSON.parse(FT)?.proposito.economia === ""
    ) {
      err = 1;
      errores.push("<strong>PROPOSITO</strong>: ECONOMIA NO SELECCIONADO.");
    }
    if (
      JSON.parse(FT)?.proposito.monitoreable === undefined ||
      /^[\s]*$/.test(JSON.parse(FT)?.proposito.monitoreable) ||
      JSON.parse(FT)?.proposito.monitoreable === ""
    ) {
      err = 1;
      errores.push("<strong>PROPOSITO</strong>: MONITOREABLE NO SELECCIONADO.");
    }
    if (
      JSON.parse(FT)?.proposito.adecuado === undefined ||
      /^[\s]*$/.test(JSON.parse(FT)?.proposito.adecuado) ||
      JSON.parse(FT)?.proposito.adecuado === ""
    ) {
      err = 1;
      errores.push("<strong>PROPOSITO</strong>: ADECUADO NO SELECCIONADO.");
    }
    if (
      JSON.parse(FT)?.proposito.aporte_marginal === undefined ||
      /^[\s]*$/.test(JSON.parse(FT)?.proposito.aporte_marginal) ||
      JSON.parse(FT)?.proposito.aporte_marginal === ""
    ) {
      err = 1;
      errores.push(
        "<strong>PROPOSITO</strong>: Aporte Marginal NO SELECCIONADO."
      );
    }

    /////////////////////////////////////////////////////////////////////7
    checkComponentes(v);
  };

  const checkComponentes = (v: string) => {
    JSON.parse(FT)?.componentes.map((componente: any, index: number) => {
      if (
        componente.tipoDeIndicador === undefined ||
        /^[\s]*$/.test(componente.tipoDeIndicador) ||
        // componente.tipoDeIndicador === "" ||
        // componente.tipoDeIndicador === null ||
        componente.dimension === undefined ||
        /^[\s]*$/.test(componente.dimension) ||
        // componente.dimension === "" ||
        // componente.dimension === null ||
        componente.unidadDeMedida === undefined ||
        /^[\s]*$/.test(componente.unidadDeMedida) ||
        // componente.unidadDeMedida === "" ||
        // componente.unidadDeMedida === null ||
        componente.claridad === undefined ||
        /^[\s]*$/.test(componente.claridad) ||
        // componente.frecuencia === "" ||
        // componente.frecuencia === null ||
        componente.relevancia === undefined ||
        /^[\s]*$/.test(componente.relevancia) ||
        // componente.relevancia === "" ||
        // componente.relevancia === null ||
        componente.economia === undefined ||
        /^[\s]*$/.test(componente.economia) ||
        // componente.economia === "" ||
        // componente.economia === null ||
        componente.monitoreable === undefined ||
        /^[\s]*$/.test(componente.monitoreable) ||
        // componente.monitoreable === "" ||
        // componente.monitoreable === null ||
        componente.adecuado === undefined ||
        /^[\s]*$/.test(componente.adecuado) ||
        // componente.adecuado === "" ||
        // componente.adecuado === null ||

        componente.aporte_marginal === undefined ||
        /^[\s]*$/.test(
          componente.aporte_marginal
          //componente.aporte_marginal === null ||
          //componente.aporte_marginal === undefined
        )
      ) {
        err = 1;
        errores.push(
          `SECCIÓN <strong>COMPONENTE ${index + 1} </strong> INCOMPLETA.`
        );
      }
      if (
        componente.tipoDeIndicador === "" ||
        componente.tipoDeIndicador === undefined ||
        /^[\s]*$/.test(componente.tipoDeIndicador)
      ) {
        err = 1;
        errores.push(
          `<strong>
              TIPO DE INDICADOR
             </strong> NO SELECCIONADO.`
        );
      }
      if (
        componente.dimension === undefined ||
        /^[\s]*$/.test(componente.dimension) ||
        componente.dimension === ""
      ) {
        err = 1;
        errores.push(
          `<strong>
            DIMENSIÓN
             </strong>  NO SELECCIONADO.`
        );
      }
      if (
        componente.unidadDeMedida === undefined ||
        /^[\s]*$/.test(componente.unidadDeMedida) ||
        componente.unidadDeMedida === ""
      ) {
        err = 1;
        errores.push(
          `<strong>
            UNIDAD DE MEDIDA
             </strong> SIN INFORMACIÓN.`
        );
      }
      if (
        componente.claridad === undefined ||
        /^[\s]*$/.test(componente.claridad) ||
        componente.claridad === ""
      ) {
        err = 1;
        errores.push(
          `<strong>
            CLARIDAD
             </strong> NO SELECCIONADO.`
        );
      }
      if (
        componente.relevancia === undefined ||
        /^[\s]*$/.test(componente.relevancia) ||
        componente.relevancia === ""
      ) {
        err = 1;
        errores.push(
          `<strong>
            RELEVANCIA
             </strong> NO SELECCIONADO.`
        );
      }
      if (
        componente.economia === undefined ||
        /^[\s]*$/.test(componente.economia) ||
        componente.economia === ""
      ) {
        err = 1;
        errores.push(
          `<strong>
            ECONOMIA
             </strong> NO SELECCIONADO.`
        );
      }
      if (
        componente.monitoreable === undefined ||
        /^[\s]*$/.test(componente.monitoreable) ||
        componente.monitoreable === ""
      ) {
        err = 1;
        errores.push(
          `<strong>
            MONITOREABLE
             </strong> NO SELECCIONADO.`
        );
      }
      if (
        componente.adecuado === undefined ||
        /^[\s]*$/.test(componente.adecuado) ||
        componente.adecuado === ""
      ) {
        err = 1;
        errores.push(
          `<strong>
            ADECUADO
             </strong> NO SELECCIONADO.`
        );
      }
      if (
        componente.aporte_marginal === undefined ||
        /^[\s]*$/.test(componente.aporte_marginal) ||
        componente.aporte_marginal === ""
      ) {
        err = 1;
        errores.push(
          `<strong>
            APORTE MARGINAL
             </strong>:  NO SELECCIONADO.`
        );
      }
      return true;
    });
    checkActividades(v);
  };

  const checkActividades = (v: string) => {
    // eslint-disable-next-line array-callback-return
    JSON.parse(FT)?.componentes.map(
      (componente: IComponentesFT, indexC: number) => {
        componente.actividades.map(
          (actividad: IActividadesFT, indexA: number) => {
            if (
              actividad.tipoDeIndicador === undefined ||
              /^[\s]*$/.test(actividad.tipoDeIndicador) ||
              // actividad.tipoDeIndicador === "" ||
              // actividad.tipoDeIndicador === null ||
              actividad.dimension === undefined ||
              /^[\s]*$/.test(actividad.dimension) ||
              // actividad.dimension === "" ||
              // actividad.dimension === null ||
              actividad.unidadDeMedida === undefined ||
              /^[\s]*$/.test(actividad.unidadDeMedida) ||
              // actividad.unidadDeMedida === "" ||
              // actividad.unidadDeMedida === null ||
              actividad.claridad === undefined ||
              /^[\s]*$/.test(actividad.claridad) ||
              // actividad.claridad === "" ||
              // actividad.claridad === null ||
              actividad.relevancia === undefined ||
              /^[\s]*$/.test(actividad.relevancia) ||
              // actividad.relevancia === "" ||
              // actividad.relevancia === null ||
              actividad.economia === undefined ||
              /^[\s]*$/.test(actividad.economia) ||
              // actividad.economia === "" ||
              // actividad.economia === null ||
              actividad.monitoreable === undefined ||
              /^[\s]*$/.test(actividad.monitoreable) ||
              // actividad.monitoreable === "" ||
              // actividad.monitoreable === null ||
              actividad.adecuado === undefined ||
              /^[\s]*$/.test(actividad.adecuado) ||
              // actividad.adecuado === "" ||
              // actividad.adecuado === null ||

              actividad.aporte_marginal === undefined ||
              /^[\s]*$/.test(
                actividad.aporte_marginal
                //actividad.aporte_marginal === null ||
                //actividad.aporte_marginal === undefined
              )
            ) {
              err = 1;
              errores.push(
                `SECCIÓN <strong>ACTIVIDAD ${actividad.actividades} </strong> INCOMPLETA.`
              );
            }
            if (
              actividad.tipoDeIndicador === undefined ||
              /^[\s]*$/.test(actividad.tipoDeIndicador)
            ) {
              err = 1;
              errores.push(
                `<strong>
                    TIPO DE INDICADOR
                   </strong> NO SELECCIONADO.`
              );
            }
            if (
              actividad.dimension === undefined ||
              /^[\s]*$/.test(actividad.dimension)
            ) {
              err = 1;
              errores.push(
                `<strong>
                  DIMENSIÓN
                   </strong>  NO SELECCIONADO.`
              );
            }
            if (
              actividad.unidadDeMedida === undefined ||
              /^[\s]*$/.test(actividad.unidadDeMedida)
            ) {
              err = 1;
              errores.push(
                `<strong>
                  UNIDAD DE MEDIDA
                   </strong> SIN INFORMACIÓN.`
              );
            }
            if (
              actividad.claridad === undefined ||
              /^[\s]*$/.test(actividad.claridad)
            ) {
              err = 1;
              errores.push(
                `<strong>
                  CLARIDAD
                   </strong> NO SELECCIONADO.`
              );
            }
            if (
              actividad.relevancia === undefined ||
              /^[\s]*$/.test(actividad.relevancia)
            ) {
              err = 1;
              errores.push(
                `<strong>
                  RELEVANCIA
                   </strong> NO SELECCIONADO.`
              );
            }
            if (
              actividad.economia === undefined ||
              /^[\s]*$/.test(actividad.economia)
            ) {
              err = 1;
              errores.push(
                `<strong>
                  ECONOMIA
                   </strong> NO SELECCIONADO.`
              );
            }
            if (
              actividad.monitoreable === undefined ||
              /^[\s]*$/.test(actividad.monitoreable)
            ) {
              err = 1;
              errores.push(
                `<strong>
                  MONITOREABLE
                   </strong> NO SELECCIONADO.`
              );
            }
            if (
              actividad.adecuado === undefined ||
              /^[\s]*$/.test(actividad.adecuado)
            ) {
              err = 1;
              errores.push(
                `<strong>
                  ADECUADO
                   </strong> NO SELECCIONADO.`
              );
            }
            if (
              actividad.aporte_marginal === undefined ||
              /^[\s]*$/.test(actividad.aporte_marginal)
            ) {
              err = 1;
              errores.push(
                `<strong>
                  APORTE MARGINAL
                   </strong>:  NO SELECCIONADO.`
              );
            }
            return true;
          }
        );
      }
    );

    if (err === 0) {
      createFT(v);
    } else {
      alertaErroresDocumento(errores);
    }
  };

  const createFT = (estado: string) => {
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
        process.env.REACT_APP_APPLICATION_BACK + "/api/create-ft-generic",
        {
          FichaTecnica:
            FTEdit === undefined || FTEdit === ""
              ? FT
              : "[" + FT + "," + FTEdit + "]",
          CreadoPor:
            userSelected !== "0"
              ? userSelected
              : localStorage.getItem("IdUsuario"),
          IdMir: IdMIR,
          Estado: estado,
          IdMa: IdMa,
          Id: IdFT,
          Rol: localStorage.getItem("Rol"),
          IdEntidad:
            JSON.parse(MIR)?.encabezado.entidad.Id ||
            IdEntidad ||
            localStorage.getItem("IdEntidad"),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        if (coment !== "") {
          comentFT();
        }

        alertaExitoConfirm(
          // localStorage.getItem("Rol") === "VERIFICADOR"
          //   ? "FICHA TECNICA ENVIADA A CAPTURADOR PARA CORRECCIÓN"
          //   : "FICHA TECNICA ENVIADA"
          "FICHA TECNICA ENVIADA A CORRECION"
        );

        soliModyNoty(
          userSelected,
          "SE LE HA SOLICITADO UNA MODIFICACIÓN.",
          "FT",
          IdFT
        );
        handleClose();
        showResume();
      })
      .catch((err) => {
        alertaErrorConfirm(err.response.data.result.error.toUpperCase());
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
            IdEntidad: IdEntidad ||  JSON.parse(MIR)?.encabezado.entidad.Id || localStorage.getItem("IdEntidad"),
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

  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={() => handleClose()}>
      <DialogTitle
        sx={{
          fontFamily: "MontserratBold",
          borderBottom: 1,
          fontSize: [18, 20, 15, 20, 15],
          height: ["12vh", "10vh", "8vh", "8vh", "8vh"],
        }}
      >
        SOLICITUD DE MODIFICACIÓN
      </DialogTitle>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            mb: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: [15, 15, 15, 15, 15],
              fontFamily: "MontserratMedium",
              textAlign: "center",
            }}
          >
            SELECCIONA USUARIO PARA SOLICITAR MODIFICACIÓN
          </Typography>

          <FormControl
            // sx={{
            //   display: "flex",
            //   alignItems: "center",
            //   justifyContent: "center",
            //   border: 1,
            //   borderRadius: 1,
            //   borderColor: "#616161",
            //   mb: 2,
            //   mt: "2vh",
            // }}
            variant="standard"
          >
            <Autocomplete
              clearText="Borrar"
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"
              options={userXInst}
              getOptionLabel={(option) => option.NombreUsuario}
              value={user}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.IdUsuario}>
                    <p
                      style={{
                        fontFamily: "MontserratRegular",
                      }}
                    >
                      {option.Rol +
                        ": " +
                        option.Nombre +
                        " " +
                        option.ApellidoPaterno +
                        " " +
                        option.ApellidoMaterno +
                        " - " +
                        option.NombreUsuario}
                    </p>
                  </li>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={"USUARIO"}
                  variant="standard"
                  InputLabelProps={{
                    style: {
                      fontFamily: "MontserratSemiBold",
                    },
                  }}
                  sx={{
                    "& .MuiAutocomplete-input": {
                      fontFamily: "MontserratRegular",
                    },
                  }}
                ></TextField>
              )}
              onChange={(event, value) => {
                setUser(value || newUser);
                //setUserSelected(value?.Nombre || newUser.Nombre)

                setUserSelected(value?.IdUsuario || newUser.IdUsuario || value?.IdUsuarioTiCentral || newUser.IdUsuarioTiCentral)
              }}
              isOptionEqualToValue={(option, value) =>
                option.IdUsuario === value.IdUsuario
              }
            />
          </FormControl>
        </Grid>

        <Grid sx={{ width: ["55vw", "60vw", "60vw", "40vw", "30vw"] }}>
          <TextField
            multiline
            rows={2}
            label={"AGREGAR COMENTARIO"}
            sx={{ width: ["55vw", "60vw", "60vw", "40vw", "30vw"] }}
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
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: isSmScreen ? "column" : "row", // Cambia el flexDirection según el tamaño de la pantalla
              mt: "4vh",
            }}
          >
            <Button
              className="cancelar"
              sx={{ marginBottom: isSmScreen ? "1rem" : 0 }} // Añade margen inferior solo cuando la pantalla es sm o más pequeña
              onClick={() => handleClose()}
            >
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                CANCELAR
              </Typography>
            </Button>

            <Button
              className="aceptar"
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
                {coment === "" ? "ENVIAR SIN COMENTARIOS" : "CONFIRMAR"}
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
