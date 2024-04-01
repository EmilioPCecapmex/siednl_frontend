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
import { validaCadena } from "../../services/validations";
import { queries } from "../../queries";
import {
  IActividadesRF,
  IComponenteRF,
  IRF,
} from "../tabsRaffi/interfacesRaffi";
import { alertaError, alertaErrorConfirm, alertaErroresDocumento, alertaExitoConfirm } from "../genericComponents/Alertas";
import { create_coment_mir, soliModyNoty } from "../genericComponents/axiosGenericos";
export let errores: string[] = [];

export default function ModalSolicitaModifRF({
  open,
  handleClose,
  RF,
  MA,
  MIR,
  IdMA,
  IdRF,
  showResume,
  RFEdit,
  IdEntidad,
}: {
  open: boolean;
  handleClose: Function;
  RF: string;
  MA: string;
  MIR: string;
  IdMA: string;
  IdRF: string;
  showResume: Function;
  RFEdit: string;
  IdEntidad: string;
}) {
  const [userXInst, setUserXInst] = useState<Array<IIUserXInst>>([]);
  const [userSelected, setUserSelected] = useState("0");

  let jsonRF: IRF =
    RF === ""
      ? ""
      : JSON.parse(RF).length > 1
      ? JSON.parse(RF)[0]
      : JSON.parse(RF);

  const [coment, setComment] = useState("");

  const comentMA = (id: string) => {
   
      create_coment_mir(id, coment, "RF")
      .then((r) => {
        setComment("");
        handleClose();
      })
      .catch((err) => {});
  };
 

  const checkUsuario = (estado: string) => {
    if (userSelected === "0" || userSelected === "") {
      return alertaError( "INTRODUCE USUARIO AL QUE SE LE SOLICITA MODIFICACIÓN")
    } else {
      checkMA(estado);
    }
  };

  let err = 0;

  const checkMA = (v: string) => {
    errores = [];
    if (jsonRF?.fin === null) {
      err = 1;
      errores.push("Sección <strong>Fin</strong> incompleta.");
    }
    // if (validaCadena(jsonRF?.fin.añoAvanceFisico)) {
    //   err = 1;
    //   errores.push("<strong>Fin</strong> Año del Avance Fisico: incompleta.");
    // }

    if (validaCadena(jsonRF?.fin.valorAvanceFisico)) {
      err = 1;
      errores.push("<strong>Fin</strong> Valor del Avance Fisico: incompleta.");
    }

    if (jsonRF?.proposito === null) {
      err = 1;
      errores.push("Sección <strong>Proposito</strong> incompleta.");
    }
    // if (validaCadena(jsonRF?.proposito.añoAvanceFisico)) {
    //   err = 1;
    //   errores.push(
    //     "<strong>Proposito</strong> Año del Avance Fisico: incompleta."
    //   );
    // }

    if (validaCadena(jsonRF?.proposito.valorAvanceFisico)) {
      err = 1;
      errores.push(
        "<strong>Proposito</strong> Valor del Avance Fisico: incompleta."
      );
    }

    checkComponentes(v);
  };

  const checkComponentes = (v: string) => {
    // eslint-disable-next-line array-callback-return
    jsonRF.componentes.map((componente: IComponenteRF, index: number)  => {
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

    checkActividades(v);
  };

  const checkActividades = (v: string) => {
    // eslint-disable-next-line array-callback-return
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
    //////////////////////////////////////////777
    if (err === 0) {
      creaRF(v);
    } else {
      alertaErroresDocumento(errores)
    }
  };
  
  const creaRF = (estado: string) => {
  

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
        process.env.REACT_APP_APPLICATION_BACK + "/api/create-rf-generic",
        {
          Raffi:
            RFEdit === undefined || RFEdit === ""
              ? RF
              : "[" + RF + "," + RFEdit + "]",
          // MetaAnual: MA,
          CreadoPor:
            userSelected !== "0"
              ? userSelected
              : localStorage.getItem("IdUsuario"),
          IdMa: IdMA,
          Id: IdRF,
          Estado: estado,
          Rol: localStorage.getItem("Rol"),
          IdEntidad:
            JSON.parse(MIR)?.encabezado.entidad.Id || IdEntidad ||
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
          comentMA(IdRF);
        }
        alertaExitoConfirm((localStorage.getItem("Rol") === "Verificador"
        ? "RAFFI ENVÍADA A CAPTURADOR PARA CORRECCIPON corrección"
        : "RAFFI ENVÍADA").toUpperCase())

      
        soliModyNoty(userSelected, "SE LE HA SOLICITADO UNA MODIFICACIÓN.", "RF", IdRF );
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
            setUserXInst(r.data.data);
          }
        });
    }
  }, [MIR, open]);
  




  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={() => handleClose()}>
      <DialogTitle sx={{ fontFamily: "MontserratBold" }}>
        SOLICITUD DE MODIFICACIÓN
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
            SELECCIONA USUARIO PARA SPLICITAR MODIFICACIÓN
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
                SELECCIONA
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
            label={"AGREGAR COMENTARIO"}
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
              sx={{
                ...queries.buttonCancelarSolicitudInscripcion,
                display: "flex",
                width: "15vw",
              }}
              variant="contained"
              onClick={() => handleClose()}
            >
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                CANCELAR
              </Typography>
            </Button>

            <Button
              sx={{
                ...queries.buttonContinuarSolicitudInscripcion,
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
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                {coment === "" ? "ENVIAR SIN COMENTARIOS" : "Confirmar"}
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
}
