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
  
  MenuItem,
  Button,
  Typography,
  Autocomplete,
} from "@mui/material";
import { IActividadesMA, IComponenteMA } from "../tabsMetaAnual/Interfaces";
import {
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
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
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
  IdEntidad,
}: {
  open: boolean;
  handleClose: Function;
  showResume: Function;
  MA: string;
  MIR: string;
  IdMA: string;
  IdMIR: string;
  MAEdit: string;
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
  const comentMA = (id: string) => {
    create_coment_mir(id, coment, "MA")
      .then((r) => {
        setComment("");
        handleClose();
      })
      .catch((err) => {});
  };

  const checkUsuario = (estado: string) => {
    if (userSelected === "0" || userSelected === "") {
      return alertaError(
        "INTRODUCE USUARIO AL QUE SE LE SOLICITA MODIFICACIÓN"
      );
    } else {
      checkMA(estado);
    }
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
          /^[\s]*$/.test(componente.actividades[index].unidadResponsable) ||
          componente.valorNumerador === undefined ||
          /^[\s]*$/.test(componente.actividades[index].valorNumerador) ||
          componente.unidadResponsable === undefined ||
          /^[\s]*$/.test(componente.unidadResponsable) ||
          componente.descIndicador === undefined ||
          /^[\s]*$/.test(componente.descIndicador) ||
          componente.descNumerador === undefined ||
          /^[\s]*$/.test(componente.descNumerador) ||
          componente.descDenominador === undefined ||
          /^[\s]*$/.test(componente.descDenominador)
        ) {
          err = 1;
          errores.push(
            `<hr><strong> ${componente.componentes} </strong> INCOMPLETO.`
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
              /^[\s]*$/.test(actividad.descDenominador)
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
      createMA(v);
    } else {
      alertaErroresDocumento(errores);
    }
  };

  const createMA = (estado: string) => {
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
        process.env.REACT_APP_APPLICATION_BACK + "/api/create-ma-generic",
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
          comentMA(IdMIR);
        }

        alertaExitoConfirm(
          // (localStorage.getItem("Rol") === "Verificador"
          //   ? "META ANUAL ENVIADA A CAPTURADOR PARA CORRECCIÓN"
          //   : "META ANUAL ENVIADA"
          // ).toUpperCase()
          "META ANUAL ENVIADA A CORRECION" 
        );

        soliModyNoty(
          userSelected,
          "SE LE HA SOLICITADO UNA MODIFICACIÓN.",
          "MA",
          IdMA
        );
        handleClose();
        showResume();
      })
      .catch((err) => {
        alertaErrorConfirm(err.response.data.result.error);
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
  }, [MA, open]);

  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
  ApellidoMaterno: string;
  NombreUsuario: string;
}
