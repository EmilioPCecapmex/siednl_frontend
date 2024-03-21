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
import { IActividadesFT, IComponentesFT } from "../tabsFichaTecnica/Interfaces";
import { alertaEliminar, alertaError, alertaErrorConfirm, alertaErroresDocumento, alertaExito, alertaExitoConfirm } from "../genericComponents/Alertas";
import { create_coment_mir, soliModyNoty } from "../genericComponents/axiosGenericos";

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

  const [comentario, setComentario] = useState("");

  const comentFT = () => {

    

    create_coment_mir(IdMIR, comentario, "FT")
      .then((r) => {
        setComentario("");
        handleClose();
      })
      .catch((err) => {});
  };

  const checkUsuario = (estado: string) => {
    if (userSelected === "0" || userSelected === "") {
       return alertaError("Introduce usuario al que se le solicita modificación")
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
    JSON.parse(FT)?.componentes.map(
      (componente: any, index: number) => {
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
          /^[\s]*$/.test(componente.aporte_marginal 
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
      }
    );
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
                /^[\s]*$/.test(actividad.aporte_marginal 
                //actividad.aporte_marginal === null ||
                //actividad.aporte_marginal === undefined 
                
                  )
              ) {
                console.log(actividad.actividades );
                
                err = 1;
                errores.push(
                  `SECCIÓN <strong>ACTIVIDAD ${actividad.actividades } </strong> INCOMPLETA.`
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
                console.log(actividad.actividades );
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
      alertaErroresDocumento(errores)
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
    console.log("IdEntidad: ",IdEntidad);
    
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
          IdEntidad: IdEntidad
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
       

        alertaExitoConfirm((localStorage.getItem("Rol") === "Verificador"
        ? "Ficha Tecnica enviada a capturador para corrección"
        : "Ficha Tecnica enviada").toUpperCase())
       
        console.log("IdFT: ",IdFT);
        
        soliModyNoty(userSelected, "Se le ha solicitado una modificación.", "FT", IdFT );
        handleClose();
        showResume();
      })
      .catch((err) => {
       
        alertaErrorConfirm((err.response.data.result.error).toUpperCase())
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
            console.log("r.data.data: ",r.data.data[1].Rol);
            
            setUserXInst(r.data.data);
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
                    {item.Rol + ": " + item.Nombre + " " + item.ApellidoPaterno + " " + item.ApellidoMaterno}
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
              className="cancelar"
              sx={{
                //...queries.buttonCancelarSolicitudInscripcion,
                display: "flex",
                width: "15vw",
              }}
              onClick={() => handleClose()}
            >
              <Typography>Cancelar</Typography>
            </Button>

            <Button
              className="aceptar"
              sx={{
                // ...queries.buttonContinuarSolicitudInscripcion,
                display: "flex",
                width: "15vw",
              }}
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
              <Typography>
                {comentario === "" ? "Enviar sin comentarios" : "Confirmar"}
              </Typography>
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
