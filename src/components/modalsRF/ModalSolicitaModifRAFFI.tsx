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
  Grid,
  Autocomplete,
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
              }}
              isOptionEqualToValue={(option, value) =>
                option.IdUsuario === value.IdUsuario
              }
            />

            {/* <Select
              size="small"
              sx={{ fontFamily: "MontserratRegular" }}
              fullWidth
              value={userSelected}
              onChange={(v) => setUserSelected(v.target.value)}
              disableUnderline
              renderValue={(selected) => {
                const selectedItem = userXInst.find(
                  (item) => item.IdUsuario === selected
                );
                if (selectedItem) {
                  const text =
                    selectedItem.Rol +
                    ": " +
                    selectedItem.Nombre +
                    " " +
                    selectedItem.ApellidoPaterno +
                    " " +
                    selectedItem.ApellidoMaterno +
                    " - " +
                    selectedItem.NombreUsuario;
                  if (text.length > 40) {
                    // Ajusta el número según el espacio disponible
                    return text.slice(0, 40) + "..."; // Truncar el texto con puntos suspensivos
                  }
                  return text;
                }
                return "SELECCIONA";
              }}
            >
              <MenuItem value={"0"} disabled>
                SELECCIONA
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
            </Select> */}
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
              //width: "20vw",
              mt: "4vh",
            }}
          >
            <Button
              className="cancelar"
              sx={{ marginRight: "1rem" }}
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
