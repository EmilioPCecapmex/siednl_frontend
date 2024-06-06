import axios from "axios";
import { IActividadesMA, IComponenteMA } from "../../tabsMetaAnual/Interfaces";
import {
  alertaErrorConfirm,
  alertaErroresDocumento,
  alertaExitoConfirm,
} from "../Alertas";
import { enviarNotificacionRol } from "../axiosGenericos";
import {
  IActividadesFT,
  IComponentesFT,
} from "../../tabsFichaTecnica/Interfaces";
import {
  IActividadesRF,
  IComponenteRF,
  IRF,
} from "../../tabsRaffi/interfacesRaffi";

export let errores: string[] = [];

let err = 0;

export const comententario = (
  id: string,
  Documento: string,
  comment: string,
  setComment: Function,
  setNewComent: Function,
  handleClose: Function
) => {
  axios
    .post(
      process.env.REACT_APP_APPLICATION_BACK + "/api/create-coment-mir",
      {
        IdMir: id,
        Coment: comment,
        CreadoPor: localStorage.getItem("IdUsuario"),
        MIR_MA: Documento,
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
///////////////////////////////////// MA ///////////////////////////////////////

export const checkMA = (
  v: string,
  MA: string,
  MIR: string,
  IdMIR: string,
  IdMA: string,
  IdEntidad: string,
  comment: string,
  setComment: Function,
  showResume: Function,
  setNewComent: Function,
  handleClose: Function,
  Documento: string
) => {
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
    errores.push("<strong>DESCRIPCIÓN DEL NUMERADOR</strong> SIN INFORMACIÓN.");
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
    errores.push("<strong>DESCRIPCIÓN DEL NUMERADOR</strong> SIN INFORMACIÓN.");
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

  checkComponentesMA(
    v,
    MA,
    MIR,
    IdMIR,
    IdMA,
    IdEntidad,
    comment,
    setComment,
    showResume,
    setNewComent,
    handleClose,
    Documento
  );
};

export const checkComponentesMA = (
  v: string,
  MA: string,
  MIR: string,
  IdMIR: string,
  IdMA: string,
  IdEntidad: string,
  comment: string,
  setComment: Function,
  showResume: Function,
  setNewComent: Function,
  handleClose: Function,
  Documento: string
) => {
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
        errores.push(`<hr><strong> ${componente.componentes} </strong>.`);
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
        componente.metasPorFrecuencia[0].trimestre4 !== componente.metaAnual &&
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
        errores.push(`<strong>METAS POR FRECUENCIA</strong> SIN INFORMACIÓN.`);
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
        errores.push(`<strong>VALOR DEL DENOMINADOR</strong> SIN INFORMACIÓN.`);
      }
      if (
        componente.sentidoDelIndicador === undefined ||
        componente.sentidoDelIndicador === ""
      ) {
        err = 1;
        errores.push(`<strong>SENTIDO DEL INDICADOR</strong> SIN SELECCIONAR.`);
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
  checkActividadesMA(
    v,
    MA,
    MIR,
    IdMIR,
    IdMA,
    IdEntidad,
    comment,
    setComment,
    showResume,
    setNewComent,
    handleClose,
    Documento
  );
};

export const checkActividadesMA = (
  v: string,
  MA: string,
  MIR: string,
  IdMIR: string,
  IdMA: string,
  IdEntidad: string,
  comment: string,
  setComment: Function,
  showResume: Function,
  setNewComent: Function,
  handleClose: Function,
  Documento: string
) => {
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
    creaMA(
      v,
      MA,
      MIR,
      IdMIR,
      IdMA,
      IdEntidad,
      comment,
      setComment,
      showResume,
      setNewComent,
      handleClose,
      Documento
    );
  } else {
    alertaErroresDocumento(errores);
  }
};

export const creaMA = (
  estado: string,
  MA: string,
  MIR: string,
  IdMIR: string,
  IdMA: string,
  IdEntidad: string,
  comment: string,
  setComment: Function,
  showResume: Function,
  setNewComent: Function,
  handleClose: Function,
  Documento: string
) => {
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
        comententario(
          IdMA,
          Documento,
          comment,
          setComment,
          setNewComent,
          handleClose
        );
      }
      showResume();
    })
    .catch((err) => {
      alertaErrorConfirm(
        err.response.data.result.error.toUpperCase() || "SIN INFORMACION"
      );
    });
};

////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////// FT ///////////////////////////////////////

export const checkFT = (
  v: string,
  FT: string,
  MA: string,
  MIR: string,
  IdFT: string,
  IdMIR: string,
  IdMA: string,
  IdEntidad: string,
  comment: string,
  setComment: Function,
  showResume: Function,
  setNewComent: Function,
  handleClose: Function,
  Documento: string
) => {
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
  checkComponentesFT(
    v,
    FT,
    MA,
    MIR,
    IdFT,
    IdMIR,
    IdMA,
    IdEntidad,
    comment,
    setComment,
    showResume,
    setNewComent,
    handleClose,
    Documento
  );
};

export const checkComponentesFT = (
  v: string,
  FT: string,
  MA: string,
  MIR: string,
  IdFT: string,
  IdMIR: string,
  IdMA: string,
  IdEntidad: string,
  comment: string,
  setComment: Function,
  showResume: Function,
  setNewComent: Function,
  handleClose: Function,
  Documento: string
) => {
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
  checkActividadesFT(
    v,
    FT,
    MA,
    MIR,
    IdFT,
    IdMIR,
    IdMA,
    IdEntidad,
    comment,
    setComment,
    showResume,
    setNewComent,
    handleClose,
    Documento
  );
};

export const checkActividadesFT = (
  v: string,
  FT: string,
  MA: string,
  MIR: string,
  IdFT: string,
  IdMIR: string,
  IdMA: string,
  IdEntidad: string,
  comment: string,
  setComment: Function,
  showResume: Function,
  setNewComent: Function,
  handleClose: Function,
  Documento: string
) => {
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
    crearFichaTecnica(
      v,
      FT,
      MIR,
      IdFT,
      IdMIR,
      IdMA,
      IdEntidad,
      comment,
      setComment,
      showResume,
      setNewComent,
      handleClose,
      Documento
    );
  } else {
    alertaErroresDocumento(errores);
  }
};

export const crearFichaTecnica = (
  estado: string,
  FT: string,
  MIR: string,
  IdFT: string,
  IdMIR: string,
  IdMA: string,
  IdEntidad: string,
  comment: string,
  setComment: Function,
  showResume: Function,
  setNewComent: Function,
  handleClose: Function,
  Documento: string
) => {
  axios
    .post(
      process.env.REACT_APP_APPLICATION_BACK + "/api/create-ft-generic",
      {
        FichaTecnica: FT,
        CreadoPor: localStorage.getItem("IdUsuario"),
        IdMir: IdMIR,
        IdMa: IdMA,
        Id: IdFT,
        Estado: estado,
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
    ) //
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
        IdFT,
        rol,
        JSON.parse(MIR)?.encabezado.entidad.Id || IdEntidad
      );

      alertaExitoConfirm(r.data.data.message.toUpperCase());

      if (comment !== "") {
        comententario(
          IdFT,
          Documento,
          comment,
          setComment,
          setNewComent,
          handleClose
        );
      }
      showResume();
    })
    .catch((err) => {
      alertaErrorConfirm(err.response.data.result.error.toUpperCase());
    });
};

////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////// RF ///////////////////////////////////////

export const checKRF = (
  v: string,
  jsonRF: IRF,
  MA: string,
  MIR: string,
  IdRF: string,
  IdMIR: string,
  IdMA: string,
  IdEntidad: string,
  comment: string,
  setComment: Function,
  showResume: Function,
  setNewComent: Function,
  handleClose: Function,
  Documento: string
) => {
  errores = [];

  if (jsonRF?.fin === null) {
    err = 1;
    errores.push("Sección <strong>Fin</strong> incompleta.");
  }

  if (
    jsonRF?.fin.añoAvanceFisico === null ||
    /^[\s]*$/.test(jsonRF?.fin.añoAvanceFisico)
  ) {
    err = 1;
    errores.push("<strong>Fin</strong> Año del Avance Fisico: incompleta.");
  }

  if (
    jsonRF?.fin.valorAvanceFisico === null ||
    /^[\s]*$/.test(jsonRF?.fin.valorAvanceFisico)
  ) {
    err = 1;
    errores.push("<strong>Fin</strong> Valor del Avance Fisico: incompleta.");
  }

  if (jsonRF?.proposito === null) {
    err = 1;
    errores.push("<strong>Fin</strong> incompleta.");
  }

  if (
    jsonRF?.proposito.añoAvanceFisico === null ||
    /^[\s]*$/.test(jsonRF?.proposito.añoAvanceFisico)
  ) {
    err = 1;
    errores.push(
      "<strong>Proposito</strong> Año del Avance Fisico: incompleta."
    );
  }

  if (
    jsonRF?.proposito.valorAvanceFisico === null ||
    /^[\s]*$/.test(jsonRF?.proposito.valorAvanceFisico)
  ) {
    err = 1;
    errores.push(
      "<strong>Proposito</strong> Valor del Avance Fisico: incompleta."
    );
  }

  checkComponentesRF(
    v,
    jsonRF,
    MA,
    MIR,
    IdRF,
    IdMIR,
    IdMA,
    IdEntidad,
    comment,
    setComment,
    showResume,
    setNewComent,
    handleClose,
    Documento
  );
};

export const checkComponentesRF = (
  v: string,
  jsonRF: IRF,
  MA: string,
  MIR: string,
  IdRF: string,
  IdMIR: string,
  IdMA: string,
  IdEntidad: string,
  comment: string,
  setComment: Function,
  showResume: Function,
  setNewComent: Function,
  handleClose: Function,
  Documento: string
) => {
  jsonRF.componentes.map((componente: IComponenteRF, index: number) => {
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
  });

  checkActividadesRF(
    v,
    jsonRF,
    MA,
    MIR,
    IdRF,
    IdMIR,
    IdMA,
    IdEntidad,
    comment,
    setComment,
    showResume,
    setNewComent,
    handleClose,
    Documento
  );
};

export const checkActividadesRF = (
  v: string,
  jsonRF: IRF,
  MA: string,
  MIR: string,
  IdRF: string,
  IdMIR: string,
  IdMA: string,
  IdEntidad: string,
  comment: string,
  setComment: Function,
  showResume: Function,
  setNewComent: Function,
  handleClose: Function,
  Documento: string
) => {
  jsonRF.componentes.map((componente: IComponenteRF, index: number) => {
    componente.actividades.map((actividad: IActividadesRF, index: number) => {
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
        err = 1;
        errores.push(
          `<strong> Actividad ${
            index + 1
          } </strong>: Metas por frecuencia sin información.`
        );
      }
    });
  });
  if (err === 0) {
    creaRF(
      v,
      jsonRF,
      MIR,
      IdRF,
      IdMA,
      IdEntidad,
      comment,
      setComment,
      showResume,
      setNewComent,
      handleClose,
      Documento
    );
  } else {
    alertaErroresDocumento(errores);
  }
};

export const creaRF = (
  estado: string,
  RF: IRF,
  MIR: string,
  IdRF: string,
  IdMA: string,
  IdEntidad: string,
  comment: string,
  setComment: Function,
  showResume: Function,
  setNewComent: Function,
  handleClose: Function,
  Documento: string
) => {
  axios
    .post(
      process.env.REACT_APP_APPLICATION_BACK + "/api/create-rf-generic",
      {
        Raffi: RF,
        CreadoPor: localStorage.getItem("IdUsuario"),
        IdMa: IdMA,
        Id: IdRF,
        Estado: estado,
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
        "RF",
        "RF ENVIADA",
        r.data.data.Id,
        rol,
        JSON.parse(MIR)?.encabezado.entidad.Id || IdEntidad
      );
      if (estado === "Autorizada") {
        // CrearFichaTecnica();
      }
      alertaExitoConfirm(r.data.data.message.toUpperCase());
      if (comment !== "") {
        comententario(
          IdRF,
          Documento,
          comment,
          setComment,
          setNewComent,
          handleClose
        );
      }
      showResume();
    })
    .catch((err) => {
      alertaErrorConfirm(err.response.data.result.error.toUpperCase());
    });
};

////////////////////////////////////////////////////////////////////////////////