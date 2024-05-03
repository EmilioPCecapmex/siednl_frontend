import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

import {
  alertaErrorConfirm,
  alertaErroresDocumento,
  alertaExito,
  alertaExitoConfirm
} from "../genericComponents/Alertas";
import { enviarNotificacionRol } from "../genericComponents/axiosGenericos";
import { IActividadesMA, IComponenteMA } from "../tabsMetaAnual/Interfaces";

export let errores: string[] = [];

export default function ModalEnviarMA({
  open,
  handleClose,
  MA,
  MIR,
  IdMA,
  IdMIR,
  showResume,
  IdEntidad,
}: {
  open: boolean;
  handleClose: Function;
  MA: string;
  MIR: string;
  IdMA: string;
  IdMIR: string;
  showResume: Function;
  IdEntidad: string;
}) {
  const [comment, setComment] = useState("");
  const [userXInst, setUserXInst] = useState<Array<IIUserXInst>>([]);
  const [newComent, setNewComent] = React.useState(false);

  const comentMA = (id: string) => {
    axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/create-coment-mir",
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
        setNewComent(false);
        setComment("");
        handleClose();
      })
      .catch((err) => {});
  };

  let err = 0;
  const checkMA = (v: string) => {
    errores = [];
    if (
      JSON.parse(MA)?.fin.metaAnual === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.fin.metaAnual) ||
      JSON.parse(MA)?.fin.lineaBase === null ||
      JSON.parse(MA)?.fin.lineaBase === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.fin.lineaBase) ||
      JSON.parse(MA)?.fin.lineaBase === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.fin.unidadResponsable) ||
      JSON.parse(MA)?.fin.valorNumerador === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.fin.valorNumerador) ||
      JSON.parse(MA)?.fin.unidadResponsable === undefined ||

      /^[\s]*$/.test(JSON.parse(MA)?.fin.sentidoDelIndicador) ||
      /^[\s]*$/.test(JSON.parse(MA)?.fin.unidadResponsable) ||
      JSON.parse(MA)?.fin.descIndicador === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.fin.descIndicador) ||
      JSON.parse(MA)?.fin.descNumerador === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.fin.descNumerador) ||
      JSON.parse(MA)?.fin.descDenominador === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.fin.descDenominador)
    ) {
      err = 1;
      errores.push(`SECCIÓN<strong>FIN </strong> INCOMPLET0.`);
    }
    if (
      JSON.parse(MA)?.fin.metaAnual === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.fin.metaAnual)
    ) {
      err = 1;
      errores.push("<strong>META ANUAL </strong> SIN INFORMACIÓN.");
    }
    if (
      JSON.parse(MA)?.fin.lineaBase === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.fin.lineaBase)
    ) {
      err = 1;
      errores.push("<strong>LÍNEA BASE</strong> SIN INFORMACIÓN.");
    }
    if (
      JSON.parse(MA)?.fin.valorNumerador === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.fin.valorNumerador)
    ) {
      err = 1;
      errores.push("<strong>VALOR DEL NUMERADOR</strong> SIN INFORMACIÓN.");
    }
    if (
      !JSON.parse(MIR)
        .fin.indicador.toLowerCase()
        .includes("indice" || "índice") &&
      (JSON.parse(MA)?.fin.valorDenominador === undefined ||
        /^[\s]*$/.test(JSON.parse(MA)?.fin.valorDenominador))
    ) {
      err = 1;
      errores.push("<strong>VALOR DEL DENOMINADOR</strong> SIN INFORMACIÓN.");
    }
    if (
      JSON.parse(MA)?.fin.sentidoDelIndicador === undefined ||
      JSON.parse(MA)?.fin.sentidoDelIndicador === ""
    ) {
      err = 1;
      errores.push("<strong>SENTIDO DEL INDICADOR</strong> NO SELECCIONADO");
    }
    if (
      JSON.parse(MA)?.fin.unidadResponsable === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.fin.unidadResponsable)
    ) {
      err = 1;
      errores.push("<strong>UNIDAD RESPONSABLE</strong>  SIN INFORMACIÓN.");
    }
    if (
      JSON.parse(MA)?.fin.descIndicador === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.fin.descIndicador)
    ) {
      err = 1;
      errores.push(
        "<strong>DESCRIPCIIÓN DEL INDICADOR</strong> SIN INFORMACIÓN."
      );
    }
    if (
      JSON.parse(MA)?.fin.descNumerador === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.fin.descNumerador)
    ) {
      err = 1;
      errores.push(
        "<strong>DESCRIPCIÓN DEL NUMERADOR</strong> SIN INFORMACIÓN."
      );
    }
    if (
      JSON.parse(MA)?.fin.descDenominador === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.fin.descDenominador)
    ) {
      err = 1;
      errores.push(
        "<strong>DESCRIPCIIÓN DEL DENOMINADOR</strong> SIN INFORMACIÓN."
      );
    }
    
    if (
      JSON.parse(MA)?.proposito.metaAnual === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.proposito.metaAnual) ||
      JSON.parse(MA)?.proposito.lineaBase === null ||
      JSON.parse(MA)?.proposito.lineaBase === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.proposito.lineaBase) ||
      JSON.parse(MA)?.proposito.lineaBase === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.proposito.unidadResponsable) ||
      JSON.parse(MA)?.proposito.valorNumerador === undefined ||

      /^[\s]*$/.test(JSON.parse(MA)?.proposito.sentidoDelIndicador) ||

      /^[\s]*$/.test(JSON.parse(MA)?.proposito.valorNumerador) ||
      JSON.parse(MA)?.proposito.unidadResponsable === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.proposito.unidadResponsable) ||
      JSON.parse(MA)?.proposito.descIndicador === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.proposito.descIndicador) ||
      JSON.parse(MA)?.proposito.descNumerador === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.proposito.descNumerador) ||
      JSON.parse(MA)?.proposito.descDenominador === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.proposito.descDenominador)
    ) {
      err = 1;
      errores.push("SECCIÓN<strong>PROPOSITO</strong> INCOMPLETO.");
    }
    if (
      JSON.parse(MA)?.proposito.metaAnual === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.proposito.metaAnual)
    ) {
      err = 1;
      errores.push("<strong>META ANUAL</strong> SIN INFORMACIÓN.");
    }
    if (
      JSON.parse(MA)?.proposito.lineaBase === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.proposito.lineaBase)
    ) {
      err = 1;
      errores.push("<strong>LÍNEA BASE</strong> SIN INFORMACIÓN.");
    }
    if (
      JSON.parse(MA)?.proposito.valorNumerador === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.proposito.valorNumerador)
    ) {
      err = 1;
      errores.push("<strong>VALOR DEL NUMERADOR</strong> SIN INFORMACIÓN.");
    }
    if (
      !JSON.parse(MIR)
        .proposito.indicador.toLowerCase()
        .includes("indice" || "índice") &&
      (JSON.parse(MA)?.proposito.valorDenominador === undefined ||
        /^[\s]*$/.test(JSON.parse(MA)?.proposito.valorDenominador))
    ) {
      err = 1;
      errores.push("<strong>VALOR DEL DENOMINADOR</strong> SIN INFORMACIÓN.");
    }
    if (
      JSON.parse(MA)?.proposito.sentidoDelIndicador === undefined ||
      JSON.parse(MA)?.proposito.sentidoDelIndicador === ""
    ) {
      err = 1;
      errores.push("<strong>SENTIDO DEL INDICADOR</strong> NO SELECCIONADO");
    }
    if (
      JSON.parse(MA)?.proposito.unidadResponsable === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.proposito.unidadResponsable)
    ) {
      err = 1;
      errores.push("<strong>UNIDAD RESPONSABLE</strong> de SIN SELECCIONAR.");
    }
    if (
      JSON.parse(MA)?.proposito.descIndicador === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.proposito.descIndicador)
    ) {
      err = 1;
      errores.push(
        "<strong>DESCRIPCIIÓN DEL INDICADOR</strong> SIN INFORMACIÓN."
      );
    }
    if (
      JSON.parse(MA)?.proposito.descNumerador === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.proposito.descNumerador)
    ) {
      err = 1;
      errores.push(
        "<strong>DESCRIPCIÓN DEL NUMERADOR</strong> SIN INFORMACIÓN."
      );
    }
    if (
      JSON.parse(MA)?.proposito.descDenominador === undefined ||
      /^[\s]*$/.test(JSON.parse(MA)?.proposito.descDenominador)
    ) {
      err = 1;
      errores.push(
        "<strong>DESCRIPCIIÓN DEL DENOMINADOR</strong> SIN INFORMACIÓN."
      );
    }

    checkComponentes(v);
  };

  const checkComponentes = (v: string) => {
    JSON.parse(MA)?.componentes.map(
      (componente: IComponenteMA, index: number) => {
        if (
          componente.metaAnual === undefined ||
          /^[\s]*$/.test(componente.metaAnual) ||
          componente.lineaBase === null ||
          componente.lineaBase === undefined ||
          /^[\s]*$/.test(componente.lineaBase) ||
          componente.lineaBase === undefined ||

          componente.valorNumerador === undefined ||
          /^[\s]*$/.test(componente.valorNumerador) ||

          componente.unidadResponsable === undefined ||
          /^[\s]*$/.test(componente.unidadResponsable) ||

          componente.descIndicador === undefined ||
          /^[\s]*$/.test(componente.descIndicador) ||
          componente.descNumerador === undefined ||
          /^[\s]*$/.test(componente.descNumerador) ||
          componente.descDenominador === undefined ||
          /^[\s]*$/.test(componente.descDenominador) ||
          
              /^[\s]*$/.test(componente.sentidoDelIndicador) 
        ) {
          err = 1;
          errores.push(
            `<hr><strong> ${componente.componentes} </strong>.`
          );
        }
        if (
          componente.metaAnual === undefined ||
          /^[\s]*$/.test(componente.metaAnual) ||
          componente.metaAnual === null
        ) {
          err = 1;
          errores.push(`<strong>META ANUAL</strong>  SIN INFORMACIÓN.`);
        }
        if (
          componente.metasPorFrecuencia[0].trimestre4 !==
            componente.metaAnual &&
          componente.metasPorFrecuencia[0].semestre2 !== componente.metaAnual
        ) {
          err = 1;
          errores.push(
            `<strong>EL VALOR</strong>  DE LA META ANUAL DEBE COINCIDIR CON EL VALOR DEL TRIMESTRE 4 O SEMESTRE 2 CORRESPONDIENTE.`
          );
        }
        if (
          componente.lineaBase === undefined ||
          /^[\s]*$/.test(componente.lineaBase)
        ) {
          err = 1;
          errores.push(`<strong>LÍNEA BASE</strong> SIN INFORMACIÓN.`);
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
            `<strong>METAS POR FRECUENCIA</strong> SIN INFORMACIÓN.`
          );
        }
        if (
          componente.valorNumerador === undefined ||
          /^[\s]*$/.test(componente.valorNumerador)
        ) {
          err = 1;
          errores.push(`<strong>VALOR DEL NUMERADOR</strong> SIN INFORMACIÓN.`);
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
            `<strong>VALOR DEL DENOMINADOR</strong> SIN INFORMACIÓN.`
          );
        }
        if (
          componente.sentidoDelIndicador === undefined ||
          componente.sentidoDelIndicador === ""
        ) {
          err = 1;
          errores.push(
            `<strong>SENTIDO DEL INDICADOR</strong> SIN SELECCIONAR.`
          );
        }
        if (
          componente.unidadResponsable === undefined ||
          /^[\s]*$/.test(componente.unidadResponsable)
        ) {
          err = 1;
          errores.push(`<strong>UNIDAD RESPONSABLE</strong> SIN SELECCIONAR.`);
        }
        if (
          componente.descIndicador === undefined ||
          /^[\s]*$/.test(componente.descIndicador)
        ) {
          err = 1;
          errores.push(
            `<strong>DESCRIPCIIÓN DEL INDICADOR</strong> SIN INFORMACIÓN.`
          );
        }
        if (
          componente.descNumerador === undefined ||
          /^[\s]*$/.test(componente.descNumerador)
        ) {
          err = 1;
          errores.push(
            `<strong>DESCRIPCIÓN DEL NUMERADOR </strong> SIN INFORMACIÓN.`
          );
        }
        if (
          componente.descDenominador === undefined ||
          /^[\s]*$/.test(componente.descDenominador)
        ) {
          err = 1;
          errores.push(
            `<strong>DESCRIPCIIÓN DEL DENOMINADOR</strong> SIN INFORMACIÓN.`
          );
        }
        return true;
      }
    );
    checkActividades(v);
  };

  const checkActividades = (v: string) => {
    // eslint-disable-next-line array-callback-return
    JSON.parse(MA)?.componentes.map(
      (componente: IComponenteMA, indexC: number) => {
        componente.actividades.map(
          (actividad: IActividadesMA, indexA: number) => {
            if (
              actividad.metaAnual === undefined ||
              /^[\s]*$/.test(actividad.metaAnual) ||
              actividad.lineaBase === null ||
              actividad.lineaBase === undefined ||
              /^[\s]*$/.test(actividad.lineaBase) ||
              actividad.lineaBase === undefined ||
              /^[\s]*$/.test(actividad.unidadResponsable) ||
              actividad.valorNumerador === undefined ||
              /^[\s]*$/.test(actividad.valorNumerador) ||
              actividad.unidadResponsable === undefined ||
              /^[\s]*$/.test(actividad.unidadResponsable) ||
              actividad.descIndicador === undefined ||
              /^[\s]*$/.test(actividad.descIndicador) ||
              actividad.descNumerador === undefined ||
              /^[\s]*$/.test(actividad.descNumerador) ||
              actividad.descDenominador === undefined ||
              /^[\s]*$/.test(actividad.descDenominador) ||
              /^[\s]*$/.test(actividad.sentidoDelIndicador) 
            ) {
              err = 1;
              errores.push(
                `<hr><strong> ${actividad.actividad} </strong> INCOMPLETO.`
              );
            }
            if (
              actividad.metaAnual === undefined ||
              /^[\s]*$/.test(actividad.metaAnual)
            ) {
              errores.push(`<strong>META ANUAL</strong> SIN INFORMACIÓN.`);
              err = 1;
            }
            if (
              actividad.metaAnual !== actividad.metasPorFrecuencia[0].trimestre4
            ) {
              errores.push(
                `<strong>EL VALOR DE LA META ANUAL </strong> DEBE COINCIDIR CON EL VALOR DEL TRIMESTRE 4`
              );
              err = 1;
            }
            if (
              actividad.lineaBase === undefined ||
              /^[\s]*$/.test(actividad.lineaBase)
            ) {
              errores.push(`<strong>LÍNEA BASE</strong> SIN INFORMACIÓN.`);
              err = 1;
            }
            if (
              actividad.metasPorFrecuencia[0].trimestre1 === undefined ||
              /^[\s]*$/.test(actividad.metasPorFrecuencia[0].trimestre1) ||
              actividad.metasPorFrecuencia[0].trimestre2 === undefined ||
              /^[\s]*$/.test(actividad.metasPorFrecuencia[0].trimestre2) ||
              actividad.metasPorFrecuencia[0].trimestre3 === undefined ||
              /^[\s]*$/.test(actividad.metasPorFrecuencia[0].trimestre3) ||
              actividad.metasPorFrecuencia[0].trimestre4 === undefined ||
              /^[\s]*$/.test(actividad.metasPorFrecuencia[0].trimestre4)
            ) {
              errores.push(
                `<strong>METAS POR FRECUENCIA</strong> SIN INFORMACIÓN.`
              );
              err = 1;
            }
            if (
              actividad.valorNumerador === undefined ||
              /^[\s]*$/.test(actividad.valorNumerador)
            ) {
              errores.push(
                `<strong>VALOR DEL NUMERADOR</strong> SIN INFORMACIÓN.`
              );
              err = 1;
            }
            if (
              JSON.parse(MIR)
                .componentes[indexC].actividades[indexA].indicador.toUpperCase()
                .includes("ÍNDICE" || "INDICE") &&
              (actividad.valorDenominador === undefined ||
                /^[\s]*$/.test(actividad.valorDenominador))
            ) {
              errores.push(
                `<strong>VALOR DEL DENOMINADOR</strong> SIN INFORMACIÓN.`
              );
              err = 1;
            }
            if (
              actividad.sentidoDelIndicador === undefined ||
              actividad.sentidoDelIndicador === ""
            ) {
              errores.push(
                `<strong>SENTIDO DEL INDICADOR</strong> SIN SELECCIONAR.`
              );
              err = 1;
            }
            if (
              actividad.unidadResponsable === undefined ||
              /^[\s]*$/.test(actividad.unidadResponsable)
            ) {
              errores.push(
                `<strong>UNIDAD RESPONSABLE</strong> SIN SELECCIONAR.`
              );
              err = 1;
            }
            if (
              actividad.descIndicador === undefined ||
              /^[\s]*$/.test(actividad.descIndicador)
            ) {
              errores.push(
                `<strong>DESCRIPCIIÓN DEL INDICADOR</strong> SIN INFORMACIÓN.`
              );
              err = 1;
            }
            if (
              actividad.descNumerador === undefined ||
              /^[\s]*$/.test(actividad.descNumerador)
            ) {
              err = 1;
              errores.push(
                `<strong>DESCRIPCIÓN DEL NUMERADOR </strong> SIN INFORMACIÓN.`
              );
            }
            if (
              actividad.descDenominador === undefined ||
              /^[\s]*$/.test(actividad.descDenominador)
            ) {
              errores.push(
                `<strong>DESCRIPCIIÓN DEL DENOMINADOR</strong> SIN INFORMACIÓN.`
              );
              err = 1;
            }
          }
        );
      }
    );

    if (err === 0) {
      creaMA(v);
    } else {
      alertaErroresDocumento(errores);
    }
  };

  const creaMA = (estado: string) => {
  

    axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/create-ma-generic",
        {
          MetaAnual: MA,
          CreadoPor: localStorage.getItem("IdUsuario"),
          IdMir: IdMIR,
          Estado: estado,
          Id: IdMA,
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

        enviarNotificacionRol(
          "MA",
          "MA ENVIADA",
          IdMA,
          rol,
          JSON.parse(MIR)?.encabezado.entidad.Id || IdEntidad
        );

        const idRF = r?.data?.data?.IdRF;
        const idFT = r?.data?.data?.IdFt;

        if (idFT != null && typeof idFT === "string" && idFT.trim() !== "") {
          // Verifica si IdFt no es null, undefined ni una cadena vacía antes de enviar la notificación

          enviarNotificacionRol(
            "FT",
            "FT ENVIADA",
            idFT,
            rol,
            JSON.parse(MIR)?.encabezado.entidad.Id || IdEntidad
          );
        }

        if (idRF != null && typeof idRF === "string" && idRF.trim() !== "") {
          // Verifica si IdRF no es null, undefined ni una cadena vacía antes de enviar la notificación
          // Verifica si IdRF no es nulo ni vacío antes de enviar la notificación
          enviarNotificacionRol(
            "RF",
            "RF ENVIADA",
            idRF,
            rol,
            JSON.parse(MIR)?.encabezado.entidad.Id || IdEntidad
          );
        }

        if (estado === "Autorizada") {
          

          //CrearFichaTecnica();
        }
        alertaExitoConfirm(r.data.data.message.toUpperCase());

        if (comment !== "") {
          comentMA(IdMIR);
        }
        showResume();
      })
      .catch((err) => {
        

        alertaErrorConfirm(
          err.response.data.result.error.toUpperCase() || "SIN INFORMACION"
        );
      });
  };

  const CrearFichaTecnica = () => {
    axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/create-ft-generic",
        {
          FichaTecnica: "",
          CreadoPor: localStorage.getItem("IdUsuario"),
          IdMir: IdMIR,
          IdMa: IdMA,
          Id: "",
          Estado: "En Captura",
          Rol: localStorage.getItem("Rol"),
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
        

        enviarNotificacionRol(
          "FT",
          "FT ENVIADA",
          r.data.data.Id,
          rol,
          JSON.parse(MIR)?.encabezado.entidad.Id || IdEntidad
        );

        alertaExito(
          () => {},
          localStorage.getItem("Rol") === "Administrador"
            ? "FT y RF ENVIADA A CAPTURADOR"
            : "FT ENVIADA A REVISIÓN"
        );
        showResume();
      })
      .catch((err) => {
        err = 1;
        errores.push(err);
      });
  };

  useEffect(() => {

    if (open) {
      axios
        .post(
          // eslint-disable-next-line no-useless-concat
          process.env.REACT_APP_APPLICATION_BACK + "/api/tipo-usuario",
          {
            TipoUsuario: localStorage.getItem("Rol"),
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

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={() => handleClose()}>
      <DialogTitle
        sx={{
          fontFamily: "MontserratBold",
          borderBottom: 1,
          fontSize: [18, 20, 15, 20, 15],
          height: ["12vh", "10vh", "8vh", "8vh", "8vh"],
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
            {localStorage.getItem("Rol") === "Administrador"
              ? "AL CONFIRMAR, LA META ANUAL SE AUTORIZARÁ Y EL APARTADO DE LA FICHA TÉCNICA Y RAFFI SERÁ HABILITADO"
              : localStorage.getItem("Rol") === "Verificador"
              ? "AL CONFIRMAR, LA META ANUAL SE ENVIARÁ A LOS USUARIOS CORRESPONDIENTES PARA AUTORIZACIÓN"
              : "AL CONFIRMAR, LA META ANUAL SE ENVIARÁ A LOS USUARIOS CORRESPONDIENTES PARA REVISIÓN"}
          </Typography>
        </Grid>

        <Grid sx={{ width: ["55vw", "60vw", "60vw", "40vw", "30vw"] }}>
          <TextField
            multiline
            rows={3}
            label={"AGREGAR COMENTARIO"}
            sx={{ width: ["55vw", "60vw", "60vw", "40vw", "30vw"], }}
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
              //width: "20vw",
              mt: "4vh",
            }}
          >
            <Button
              className="cancelar"
              //sx={queries.buttonCancelarSolicitudInscripcion}
              sx={{ marginRight: "1rem" }}
              onClick={() => handleClose()}
            >
              <Typography sx={{ fontFamily: "MontserratRegular" }}>
                CANCELAR
              </Typography>
            </Button>

            {/* <Button
              sx={{ display: "flex", width: "11vw" }}
              variant="contained"
              color="info"
              onClick={() => {
                newComent ? setComment("") : setNewComent(!newComent);
                newComent ? setNewComent(!newComent) : setNewComent(!newComent);
              }}
            >
              {newComent ? "Cancelar comentario" : "Nuevo comentario"}
            </Button> */}

            <Button
              className="aceptar"
              //sx={queries.buttonContinuarSolicitudInscripcion}
              onClick={() => {
                
                checkMA(
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
                CONFIRMAR
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
  NombrelineaBase: string;
  Nombre: string;
  ApellidoPaterno: string;
  CorreoElectronico: string;
}
