/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";

import { Grid, InputLabel, MenuItem, Select } from "@mui/material";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import { Typography, FormControl } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { queries } from "../../queries";
import { PED } from "./PED";
import { CapturarFechas } from "./AddFechaCapturaDialog";
import { IDatosTabla } from "./Catalogos";
import { margin } from "@mui/system";
import { CreatePorCatalogo, CreatePorCatalogoProgramap } from "./AxiosCatalogo";
import { alertaExito } from "../genericComponents/Alertas";
export const AddDialogCatalogo = ({
  open,
  catalogo,
  select,
  tabla,

  handleClose,
}: {
  open: boolean;
  catalogo: string;
  select: string;
  tabla: string;

  handleClose: Function;
}) => {
  //const [open, setOpen] = React.useState(false);
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  const cerrardialog = () => {
    handleClose();
  };

  const opendialog = () => {
    //handleClose();
    //actualizado();
    CreatePorCatalogo(descripcion, tabla, handleClose, Idb, Tipob, Tipo);
  };

  
  const [Idb, setIdb] = React.useState("");
  const [Tipob, setTipoB] = React.useState("");
  const [Tipo, setTipo] = React.useState("");
  const [descripcion, setDescripcion] = React.useState("");
  const [descripcionConac, setDescripcionConac] = React.useState("");
  const [descripcionConsecutivo, setDescripcionConsecutivo] =
    React.useState("");

  const [programa, setPrograma] = React.useState("");
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();
  let date = today.getDate();
  let monthS = "";
  let dateS = "";

  // React.useEffect(() => {
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   today = new Date();
  //   year = today.getFullYear();
  //   month = today.getMonth();
  //   month = month + 1;
  //   date = today.getDate();

  //   if (month < 10) {
  //     monthS = "0" + month;
  //   } else {
  //     monthS = month.toString();
  //   }

  //   if (date < 10) {
  //     dateS = "0" + date;
  //   }

  //   setFechaCaptura(year + "-" + monthS + "-" + dateS);
  // }, [actualizado]);

  const [fechaCaptura, setFechaCaptura] = React.useState(
    year + "-" + monthS + "-" + dateS
  );
  const [institution, setInstitution] = React.useState("0");
  const [unidad, setUnidad] = React.useState("0");

  const [catalogoInstituciones, setCatalogoInstituciones] = React.useState([
    { Id: "", Nombre: "" },
  ]);

  const [catalogoEntidades, setCatalogoEntidades] = React.useState([
    { Id: "", Label: "" },
  ]);

  const [catalogoProgramas, setCatalogoProgramas] = React.useState([
    { Id: "", NombrePrograma: "" },
  ]);

  const [catalogoUnidades, setCatalogoUnidades] = React.useState([
    { Id: "", Unidad: "" },
  ]);

  React.useEffect(() => {
    getListasLogin(
      { Tabla: "Entidades", ValorCondicion: "" },
      setCatalogoInstituciones
    );
    getProgramas();
    //getUnidadesAdministrativas();
  }, []);

  const getInstituciones = () => {
    axios
      .get(process.env.REACT_APP_APPLICATION_LOGIN + "/api/lista-entidades", {
        params: {
          IdUsuario: localStorage.getItem("IdUsuario"),
          Rol: localStorage.getItem("Rol"),
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setCatalogoInstituciones(r.data.data);
      });
  };

  // const getUnidadesAdministrativas = () => {
  //   axios
  //     .get(
  //       process.env.REACT_APP_APPLICATION_BACK + "/api/unidadesAdministrativas",
  //       {
  //         headers: {
  //           Authorization: localStorage.getItem("jwtToken") || "",
  //           Rol: localStorage.getItem("Rol") || "",
  //         },
  //       }
  //     )
  //     .then((r) => {
  //       setCatalogoUnidades(r.data.data);
  //     });
  // };

  const getListasLogin = (datos: any, setState: Function) => {
    axios
      .get(process.env.REACT_APP_APPLICATION_LOGIN + "/api/listas", {
        params: datos,
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setCatalogoEntidades(r.data.data);
      });
  };

  const getProgramas = () => {
    axios
      .get(
        process.env.REACT_APP_APPLICATION_BACK +
          "/api/list-programaPresupuestario",
        {
          params: {
            Rol: localStorage.getItem("Rol"),
          },
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        setCatalogoProgramas(r.data.data);
      })
      .catch((err) => console.log(""));
  };

  const CreatePorCatalogoFechas = () => {
    axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/create-fechaDeCaptura",
        {
          Descripcion: descripcion,
          FechaCapturaInicio: fechaCaptura,
          FechaCapturaFinal: fechaCaptura,
          Modulo: "",
          CreadoPor: localStorage.getItem("IdUsuario"),
          Rol: localStorage.getItem("Rol"),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        // handleClose();
        Toast.fire({
          icon: "success",
          title: "Elemento registrado con éxito.",
        });

        //actualizado();
      })
      .catch((err) =>
        Toast.fire({
          icon: "error",
          title: err.response.data.result.error,
        })
      );
  };

  // const CreatePorCatalogoInstitucionUnidadAdmin = () => {
  //   axios
  //     .post(
  //       process.env.REACT_APP_APPLICATION_BACK +
  //         "/api/create-institucionUnidad",
  //       {
  //         CreadoPor: localStorage.getItem("IdUsuario"),
  //         IdEntidad: institution,
  //         IdUnidad: unidad,
  //         Rol: localStorage.getItem("Rol"),
  //       },
  //       {
  //         headers: {
  //           Authorization: localStorage.getItem("jwtToken") || "",
  //         },
  //       }
  //     )
  //     .then((r) => {
  //       handleClose();
  //       Toast.fire({
  //         icon: "success",
  //         title: "Elemento registrado con éxito.",
  //       });

  //       actualizado();
  //     })
  //     .catch((err) =>
  //       Toast.fire({
  //         icon: "error",
  //         title: err.response.data.result.error,
  //       })
  //     );
  // };
  // Aqui
  const CreatePorCatalogoProgramaInstitucion = () => {
    axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK +
          "/api/create-programaInstitucion",
        {
          CreadoPor: localStorage.getItem("IdUsuario"),
          IdPrograma: programa,
          IdEntidad: institution,
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        //  handleClose();
        alertaExito(() => handleClose(), "Catalogo creado");

        // actualizado();
      })
      .catch((err) =>
        Toast.fire({
          icon: "error",
          title: err.response.data.result.error,
        })
      );
  };

  const validarNumero = (dato: string, state: any) => {
    if (/^[0-9]+$/.test(dato)) {
      return dato;
    } else if (dato.length === 0) {
      return "";
    }
    return state;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    // Utiliza una expresión regular para validar que solo haya una letra
    if (/^[a-zA-Z]$/.test(inputValue) || inputValue === "") {
      setDescripcionConac(inputValue);
    }
  };

  if (tabla === "FECHAS DE CAPTURA") {
    console.log("FECHAS DE CAPTURA: ", tabla);

    return (
      <Grid sx={{ display: "flex" }}>
        {/* <IconButton onClick={handleClickOpen}>
        <AddIcon
          sx={{
            width: 50,
            height: 50,
          }}
        />
      </IconButton> */}

        {/* <CapturarFechas
          actualizado={actualizado}
          open={open}
          close={handleClose}
          //ClickOpen={handleClickOpen}
        /> */}
      </Grid>
      // <Grid sx={{ display: "flex" }}>
      //   <IconButton onClick={handleClickOpen}>
      //     <AddIcon
      //       sx={{
      //         width: 50,
      //         height: 50,
      //       }}
      //     />
      //   </IconButton>
      //   <Dialog fullWidth open={open} onClose={handleClose}>
      //     <Grid
      //       sx={{
      //         width: "100%",
      //         height: "5vh",
      //         alignItems: "center",
      //         display: "flex",
      //         justifyContent: "center",
      //         flexDirection: "column",
      //         borderBottom: 0.5,
      //         borderColor: "#ccc",
      //         boxShadow: 1,
      //       }}
      //     >
      //       <Typography
      //         sx={{
      //           fontFamily: "MontserratSemiBold",
      //           width: "90%",
      //           fontSize: [10, 15, 15, 15, 15],
      //           textAlign: "center",
      //         }}
      //       >
      //         Añadir Fecha de Captura
      //       </Typography>
      //     </Grid>
      //     <DialogContent
      //       sx={{
      //         display: "flex",
      //         flexDirection: "column",
      //         alignItems: "center",
      //         justifyContent: "center",
      //       }}
      //     >
      //       <TextField
      //         multiline={descripcion.length < 20 ? false : true}
      //         sx={descripcion.length < 20 ? { width: "60%" } : { width: "80%" }}
      //         InputLabelProps={{
      //           style: {
      //             fontFamily: "MontserratRegular",
      //           },
      //         }}
      //         InputProps={{
      //           style: {
      //             fontFamily: "MontserratLight",
      //           },
      //         }}
      //         rows={3}
      //         label={"Descripción"}
      //         variant="outlined"
      //         onChange={(v) => setDescripcion(v.target.value)}
      //       />

      //       <TextField
      //         variant="outlined"
      //         onChange={(x) => {
      //           setFechaCaptura(x.target.value);
      //           console.log(x);
      //         }}
      //         multiline={descripcion.length < 20 ? false : true}
      //         defaultValue={fechaCaptura}
      //         sx={descripcion.length < 20 ? { width: "60%" } : { width: "80%" }}
      //         style={{ marginTop: "2vh" }}
      //         type="date"
      //         InputProps={{
      //           style: {
      //             fontFamily: "MontserratLight",
      //           },
      //         }}
      //         InputLabelProps={{
      //           style: {
      //             fontFamily: "MontserratRegular",
      //           },
      //         }}
      //         rows={3}
      //       />
      //     </DialogContent>

      //     <DialogActions
      //       sx={{
      //         display: "flex",
      //         alignItems: "center",
      //         justifyContent: "center",
      //       }}
      //     >
      //       <Button
      //         sx={queries.buttonCancelarSolicitudInscripcion}
      //         onClick={handleClose}
      //       >
      //         <Typography
      //           sx={{ fontFamily: "MontserratMedium",fontSize: [10, 15, 15, 15, 15], }}
      //         >
      //           Cancelar
      //         </Typography>
      //       </Button>

      //       <Button
      //         sx={queries.buttonContinuarSolicitudInscripcion}
      //         onClick={CreatePorCatalogoFechas}
      //         autoFocus
      //       >
      //         <Typography
      //           sx={{ fontFamily: "MontserratMedium",fontSize: [10, 15, 15, 15, 15], }}
      //         >
      //           De Acuerdo
      //         </Typography>
      //       </Button>
      //     </DialogActions>
      //   </Dialog>
      // </Grid>
    );
  } else if (tabla === "PROGRAMAS - INSTITUCIONES") {
    console.log("Programas - Instituciones: ", tabla);

    return (
      <Grid sx={{ display: "flex" }}>
        {/* <IconButton onClick={handleClickOpen}>
          <AddIcon
            sx={{
              width: 50,
              height: 50,
            }}
          />
        </IconButton> */}

        <Dialog fullWidth open={open} onClose={cerrardialog}>
          <Grid
            sx={{
              width: "100%",
              height: "5vh",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              borderBottom: 0.5,
              borderColor: "#ccc",
              boxShadow: 1,
            }}
          >
            <Typography
              sx={{
                fontFamily: "MontserratSemiBold",
                width: "90%",
                fontSize: [10, 15, 15, 15, 15],
                textAlign: "center",
              }}
            >
              Vincular Programa - Institucion
            </Typography>
          </Grid>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FormControl
              sx={{
                width: "60%",
                mt: "2vh",
              }}
            >
              <InputLabel sx={{ fontFamily: "MontserratMedium" }}>
                Programas institucionales
              </InputLabel>
              <Select
                value={programa}
                label="Institución institucionales"
                onChange={(x) => {
                  setPrograma(x.target.value);
                }}
                sx={{
                  fontFamily: "MontserratRegular",
                }}
              >
                <MenuItem
                  value={"0"}
                  key={0}
                  disabled
                  sx={{
                    fontFamily: "MontserratRegular",
                  }}
                >
                  Selecciona
                </MenuItem>
                {catalogoProgramas.map((item) => {
                  return (
                    <MenuItem
                      value={item.Id}
                      key={item.Id}
                      sx={{ fontFamily: "MontserratRegular" }}
                    >
                      {item.NombrePrograma}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <FormControl
              sx={{
                width: "60%",
                mt: "2vh",
              }}
            >
              <InputLabel sx={{ fontFamily: "MontserratMedium" }}>
                Institución
              </InputLabel>
              <Select
                value={institution}
                label="Institución"
                onChange={(x) => setInstitution(x.target.value)}
                sx={{
                  fontFamily: "MontserratRegular",
                }}
              >
                <MenuItem
                  value={"0"}
                  key={0}
                  disabled
                  sx={{
                    fontFamily: "MontserratRegular",
                  }}
                >
                  Selecciona
                </MenuItem>
                {catalogoEntidades.map((item) => {
                  return (
                    <MenuItem
                      value={item.Id}
                      key={item.Id}
                      sx={{ fontFamily: "MontserratRegular" }}
                    >
                      {item.Label}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </DialogContent>

          <DialogActions
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              // sx={queries.buttonCancelarSolicitudInscripcion}
              color="error"
              className="cancelar"
              onClick={cerrardialog}
            >
              <Typography
                sx={{
                  fontFamily: "MontserratMedium",
                  fontSize: [10, 15, 15, 15, 15],
                }}
              >
                Cancelar
              </Typography>
            </Button>

            <Button
              className="aceptar"
              onClick={CreatePorCatalogoProgramaInstitucion}
              autoFocus
            >
              <Typography
                sx={{
                  fontFamily: "MontserratMedium",
                  fontSize: [10, 15, 15, 15, 15],
                }}
              >
                De Acuerdo
              </Typography>
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    );
  } else if (tabla === "InstitucionUnidad") {
    console.log("InstitucionUnidad: ", tabla);
    return (
      <Grid sx={{ display: "flex" }}>
        {/* <IconButton onClick={handleClickOpen}>
          <AddIcon
            sx={{
              width: 50,
              height: 50,
            }}
          />
        </IconButton> */}
        <Dialog fullWidth open={open} onClose={cerrardialog}>
          <Grid
            sx={{
              width: "100%",
              height: "5vh",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              borderBottom: 0.5,
              borderColor: "#ccc",
              boxShadow: 1,
            }}
          >
            <Typography
              sx={{
                fontFamily: "MontserratSemiBold",
                width: "90%",
                fontSize: [10, 15, 15, 15, 15],
                textAlign: "center",
              }}
            >
              Vincular Institucion - Unidad Administrativa
            </Typography>
          </Grid>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FormControl
              sx={{
                width: "60%",
                mt: "2vh",
              }}
            >
              <InputLabel sx={{ fontFamily: "MontserratMedium" }}>
                Unidades Administrativas
              </InputLabel>
              <Select
                value={unidad}
                label="Unidades Administrativas"
                onChange={(x) => {
                  setUnidad(x.target.value);
                }}
                sx={{
                  fontFamily: "MontserratRegular",
                }}
              >
                <MenuItem
                  value={"0"}
                  key={0}
                  disabled
                  sx={{
                    fontFamily: "MontserratRegular",
                  }}
                >
                  Selecciona
                </MenuItem>
                {catalogoUnidades.map((item) => {
                  return (
                    <MenuItem
                      value={item.Id}
                      key={item.Id}
                      sx={{ fontFamily: "MontserratRegular" }}
                    >
                      {item.Unidad}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <FormControl
              sx={{
                width: "60%",
                mt: "2vh",
              }}
            >
              <InputLabel sx={{ fontFamily: "MontserratMedium" }}>
                Institución
              </InputLabel>
              <Select
                value={institution}
                label="Institución"
                onChange={(x) => setInstitution(x.target.value)}
                sx={{
                  fontFamily: "MontserratRegular",
                }}
              >
                <MenuItem
                  value={"0"}
                  key={0}
                  disabled
                  sx={{
                    fontFamily: "MontserratRegular",
                  }}
                >
                  Selecciona
                </MenuItem>
                {catalogoEntidades.map((item) => {
                  return (
                    <MenuItem
                      value={item.Id}
                      key={item.Id}
                      sx={{ fontFamily: "MontserratRegular" }}
                    >
                      {item.Label}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </DialogContent>

          <DialogActions
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button className="cancelar" onClick={cerrardialog}>
              <Typography
                sx={{
                  fontFamily: "MontserratMedium",
                  fontSize: [10, 15, 15, 15, 15],
                }}
              >
                Cancelar
              </Typography>
            </Button>

            <Button
              className="aceptar"
              //onClick={CreatePorCatalogoInstitucionUnidadAdmin}
              autoFocus
            >
              <Typography
                sx={{
                  fontFamily: "MontserratMedium",
                  fontSize: [10, 15, 15, 15, 15],
                }}
              >
                De Acuerdo
              </Typography>
            </Button>
          </DialogActions>
        </Dialog>
        :
      </Grid>
    );
  } else if (tabla === "PED") {
    console.log("PED: ", tabla);
    return (
      <Grid>
        {/* <IconButton onClick={handleClickOpen}>
          <AddIcon
            sx={{
              width: 50,
              height: 50,
            }}
          />
        </IconButton> */}
        <Dialog fullWidth maxWidth={"xl"} open={open} onClose={cerrardialog}>
          <AppBar sx={{ position: "relative", backgroundColor: "#bdbdbd" }}>
            <Toolbar>
              <IconButton
                edge="end"
                color="inherit"
                onClick={cerrardialog}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <PED handleClose={handleClose} />
        </Dialog>
      </Grid>
    );
  } else if (tabla === "PROGRAMAS PRESUPUESTARIOS") {
    console.log("Programas Presupuestarios: ", tabla);
    return (
      <Grid sx={{ display: "flex" }}>
        {/* <Tooltip title="Editar">
          <IconButton onClick={handleClickOpen}>
            <AddIcon
              sx={{
                width: 50,
                height: 50,
              }}
            />
          </IconButton>
        </Tooltip> */}
        <Dialog fullWidth open={open} onClose={cerrardialog}>
          <Grid
            sx={{
              width: "100%",
              height: "5vh",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              borderBottom: 0.5,
              borderColor: "#ccc",
              boxShadow: 1,
            }}
          >
            <Typography
              sx={{
                fontFamily: "MontserratSemiBold",
                width: "90%",
                fontSize: [10, 15, 15, 15, 15],
                textAlign: "center",
              }}
            >
              Añadir Programa Presupuestario
            </Typography>
          </Grid>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField
              label={"Nombre del programa"}
              variant="outlined"
              multiline={descripcion.length < 20 ? false : true}
              sx={
                descripcion.length < 20
                  ? { width: "60%", mb: "2vh" }
                  : { width: "80%", mb: "2vh" }
              }
              onChange={(v) => setDescripcion(v.target.value)}
              style={{ marginTop: 1 }}
              rows={3}
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratRegular",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratLight",
                },
              }}
            />

            <TextField
              label={"Conac"}
              variant="outlined"
              // multiline={descripcionConac.length < 2 ? false : true}
              sx={{ width: "60%", mb: "2vh" }}
              value={descripcionConac}
              onChange={handleChange}
              style={{ marginTop: 1 }}
              rows={1}
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratRegular",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratLight",
                },
              }}
            />

            <TextField
              label={"Consecutivo"}
              variant="outlined"
              // multiline={descripcionConac.length < 2 ? false : true}
              sx={{ width: "60%" }}
              value={descripcionConsecutivo}
              onChange={(x) => {
                if (
                  /^^[0-9]{1,3}$/.test(x.target.value) ||
                  x.target.value === ""
                ) {
                  setDescripcionConsecutivo(x.target.value);
                }
              }}
              style={{ marginTop: 1 }}
              rows={1}
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratRegular",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratLight",
                },
              }}
            />

            <FormControl
              sx={descripcion.length < 20 ? { width: "60%" } : { width: "80%" }}
              style={{ marginTop: "2vh" }}
            >
              <InputLabel
                id="labelInst"
                sx={{ fontFamily: "MontserratRegular" }}
              >
                Institución
              </InputLabel>
              <Select
                labelId="labelInst"
                value={institution}
                label="Institución"
                onChange={(x) => setInstitution(x.target.value)}
                style={{
                  marginTop: 1,
                  fontFamily: "MontserratLight",
                }}
                rows={3}
                multiline={descripcion.length < 20 ? false : true}
              >
                <MenuItem
                  value={"0"}
                  key={0}
                  disabled
                  sx={{ fontFamily: "MontserratLight" }}
                >
                  Selecciona Institución
                </MenuItem>
                {catalogoEntidades.map((item) => {
                  return (
                    <MenuItem
                      value={item.Id}
                      key={item.Id}
                      sx={{ fontFamily: "MontserratLight" }}
                    >
                      {item.Label}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </DialogContent>

          <DialogActions
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button className="cancelar" onClick={cerrardialog}>
              <Typography
                sx={{
                  fontFamily: "MontserratMedium",
                  fontSize: [10, 15, 15, 15, 15],
                }}
              >
                Cancelar
              </Typography>
            </Button>

            <Button
              className="aceptar"
              onClick={() =>
                CreatePorCatalogoProgramap(
                  descripcion,
                  institution,
                  descripcionConac,
                  descripcionConsecutivo,
                  handleClose
                )
              }
              autoFocus
            >
              <Typography
                sx={{
                  fontFamily: "MontserratMedium",
                  fontSize: [10, 15, 15, 15, 15],
                }}
              >
                De Acuerdo
              </Typography>
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    );
  } else {
    console.log("else: ", tabla);
    return (
      <Grid>
        {/* <IconButton onClick={handleClickOpen}>
          <AddIcon
            sx={{
              width: 50,
              height: 50,
            }}
          />
        </IconButton> */}
        <Dialog open={open} onClose={cerrardialog} fullWidth>
          <Grid
            sx={{
              width: "100%",
              height: "5vh",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              borderBottom: 0.5,
              borderColor: "#ccc",

              boxShadow: 1,
            }}
          >
            <Typography
              sx={{
                fontFamily: "MontserratSemiBold",
                width: "90%",
                fontSize: [10, 15, 15, 15, 15],
                textAlign: "center",
              }}
            >
              Añadir Elemento
            </Typography>
          </Grid>

          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField
              label={"Descripción"}
              variant="outlined"
              multiline={descripcion.length < 200 ? false : true}
              sx={
                descripcion.length < 200 ? { width: "60%" } : { width: "80%" }
              }
              value={descripcion}
              onChange={(v) => {
                let valor = v.target.value;

                if (select === "Años Fiscales") {
                  let numeroValido = validarNumero(valor, descripcion);
                  setDescripcion(numeroValido);
                } else {
                  setDescripcion(valor);
                }
              }}
              style={{ marginTop: 1 }}
              rows={3}
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratRegular",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratLight",
                },
              }}
            />

            {tabla === "BENEFICIARIOS" ? (
              <TextField
                label={"IdBeneficiario"}
                variant="outlined"
                multiline={descripcion.length < 200 ? false : true}
                sx={
                  descripcion.length < 200
                    ? { width: "60%", marginTop: "8px" }
                    : { width: "80%", marginTop: "9px" }
                }
                value={Idb}
                onChange={(v) => {
                  let valor = v.target.value;
                  let numeroValido = validarNumero(valor, Idb);
                  setIdb(numeroValido);
                }}
                style={{ marginBottom: 1 }}
                rows={3}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
                InputProps={{
                  style: {
                    fontFamily: "MontserratLight",
                  },
                }}
              />
            ) : null}

            {tabla === "BENEFICIARIOS" ? (
              <TextField
                label={"Tipo Beneficiario"}
                variant="outlined"
                multiline={descripcion.length < 200 ? false : true}
                sx={
                  descripcion.length < 200
                    ? { width: "60%", marginTop: "8px" }
                    : { width: "80%", marginTop: "9px" }
                }
                value={Tipob}
                onChange={(v) => {
                  let valor = v.target.value;
                  //let numeroValido = validarNumero(valor, Idb);
                  setTipoB(valor);
                }}
                style={{ marginBottom: 1 }}
                rows={3}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
                InputProps={{
                  style: {
                    fontFamily: "MontserratLight",
                  },
                }}
              />
            ) : null}

            {tabla === "BENEFICIARIOS" ? (
              <TextField
                label={"Tipo"}
                variant="outlined"
                multiline={descripcion.length < 200 ? false : true}
                sx={
                  descripcion.length < 200
                    ? { width: "60%", marginTop: "8px" }
                    : { width: "80%", marginTop: "9px" }
                }
                value={Tipo}
                onChange={(v) => {
                  let valor = v.target.value;
                  //let numeroValido = validarNumero(valor, Idb);
                  setTipo(valor);
                }}
                style={{ marginBottom: 1 }}
                rows={3}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
                InputProps={{
                  style: {
                    fontFamily: "MontserratLight",
                  },
                }}
              />
            ) : null}
          </DialogContent>

          <DialogActions
            sx={{
              display: "flex",

              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button className="cancelar" onClick={cerrardialog}>
              <Typography
                sx={{
                  fontFamily: "MontserratMedium",
                  fontSize: [10, 15, 15, 15, 15],
                }}
              >
                Cancelar
              </Typography>
            </Button>

            <Button className="aceptar" onClick={opendialog} autoFocus>
              <Typography
                sx={{
                  fontFamily: "MontserratMedium",
                  fontSize: [10, 15, 15, 15, 15],
                }}
              >
                De Acuerdo
              </Typography>
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    );
  }
};

export default AddDialogCatalogo;
