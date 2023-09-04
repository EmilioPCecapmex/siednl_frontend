/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import { Box, Grid, InputLabel, MenuItem, Select } from "@mui/material";
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
export const AddDialogCatalogo = ({
  catalogo,
  select,
  tabla,
  actualizado,
}: {
  catalogo: string;
  select: string;
  tabla: string;
  actualizado: Function;
}) => {
  const [open, setOpen] = React.useState(false);
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    actualizado();
  };

  const [descripcion, setDescripcion] = React.useState("");
  const [programa, setPrograma] = React.useState("");
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();
  let date = today.getDate();
  let monthS = "";
  let dateS = "";

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    today = new Date();
    year = today.getFullYear();
    month = today.getMonth();
    month = month + 1;
    date = today.getDate();

    if (month < 10) {
      monthS = "0" + month;
    } else {
      monthS = month.toString();
    }

    if (date < 10) {
      dateS = "0" + date;
    }

    setFechaCaptura(year + "-" + monthS + "-" + dateS);
  }, [actualizado]);

  const [fechaCaptura, setFechaCaptura] = React.useState(
    year + "-" + monthS + "-" + dateS
  );
  const [institution, setInstitution] = React.useState("0");
  const [unidad, setUnidad] = React.useState("0");

  const [catalogoInstituciones, setCatalogoInstituciones] = React.useState([
    { Id: "", NombreInstitucion: "" },
  ]);

  const [catalogoProgramas, setCatalogoProgramas] = React.useState([
    { Id: "", NombrePrograma: "" },
  ]);

  const [catalogoUnidades, setCatalogoUnidades] = React.useState([
    { Id: "", Unidad: "" },
  ]);

  React.useEffect(() => {
    getInstituciones();
    getProgramas();
    getUnidadesAdministrativas();
  }, []);

  const getInstituciones = () => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/instituciones", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
        params: {
          IdUsuario: localStorage.getItem("IdUsuario"),

          IdInstitucion: localStorage.getItem("IdInstitucion"),
          Rol: localStorage.getItem("Rol"),
        },
      })
      .then((r) => {
        setCatalogoInstituciones(r.data.data);
      });
  };

  const getUnidadesAdministrativas = () => {
    axios
      .get(
        process.env.REACT_APP_APPLICATION_BACK + "/api/unidadesAdministrativas",
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
            Rol: localStorage.getItem("Rol") || "",
          },
        }
      )
      .then((r) => {
        setCatalogoUnidades(r.data.data);
      });
  };

  const getProgramas = () => {
    axios
      .get(
        process.env.REACT_APP_APPLICATION_BACK + "/api/programaPresupuestario",
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
      });
  };

  const CreatePorCatalogo = () => {
    axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/create-catalogos",
        {
          Descripcion: descripcion,
          Tabla: tabla,
          IdUser: localStorage.getItem("IdUsuario"),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        handleClose();

        Toast.fire({
          icon: "success",
          title: "Elemento registrado con éxito.",
        });

        actualizado();
      })
      .catch((err) =>
        Toast.fire({
          icon: "error",
          title: err.response.data.result.error,
        })
      );
  };

  const CreatePorCatalogoFechas = () => {
    axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/create-fechaDeCaptura",
        {
          Descripcion: descripcion,
          FechaDeCaptura: fechaCaptura,
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
        handleClose();
        Toast.fire({
          icon: "success",
          title: "Elemento registrado con éxito.",
        });

        actualizado();
      })
      .catch((err) =>
        Toast.fire({
          icon: "error",
          title: err.response.data.result.error,
        })
      );
  };

  const CreatePorCatalogoInstitucionUnidadAdmin = () => {
    axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK +
          "/api/create-institucionUnidad",
        {
          CreadoPor: localStorage.getItem("IdUsuario"),
          IdInstitucion: institution,
          IdUnidad: unidad,
          Rol: localStorage.getItem("Rol"),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        handleClose();
        Toast.fire({
          icon: "success",
          title: "Elemento registrado con éxito.",
        });

        actualizado();
      })
      .catch((err) =>
        Toast.fire({
          icon: "error",
          title: err.response.data.result.error,
        })
      );
  };

  const CreatePorCatalogoProgramaInstitucion = () => {
    axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK +
          "/api/create-programaInstitucion",
        {
          CreadoPor: localStorage.getItem("IdUsuario"),
          IdPrograma: programa,
          IdInstitucion: institution,
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        handleClose();
        Toast.fire({
          icon: "success",
          title: "Elemento registrado con éxito.",
        });

        actualizado();
      })
      .catch((err) =>
        Toast.fire({
          icon: "error",
          title: err.response.data.result.error,
        })
      );
  };

  const CreatePorCatalogoProgramap = () => {
    axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK +
          "/api/create-programaPresupuestario",
        {
          NombrePrograma: descripcion,
          IdInstitucion: institution,
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
        Toast.fire({
          icon: "success",
          title: "Elemento registrado con éxito.",
        });
        actualizado();
      })
      .catch((err) =>
        Toast.fire({
          icon: "error",
          title: err.response.data.result.error,
        })
      );
  };

  const validarNumero = (dato: string, state: any) => {
    console.log("Entre");
    console.log("dato: ", dato);
    console.log("state: ", state);

    if (/^[0-9]+$/.test(dato)) {
      console.log("dato en el if : ", dato);

      return dato;
    } else if (dato.length === 0) {
      return "";
    }
    return state;
  };

  if (tabla === "FechasDeCaptura") {
    return (

      <Box sx={{ display: "flex" }}>
      <IconButton onClick={handleClickOpen}>
        <AddIcon
          sx={{
            width: 50,
            height: 50,
          }}
        />
      </IconButton>

      
      <CapturarFechas
      actualizado={actualizado}
      open={open}
      close={handleClose}
      //ClickOpen={handleClickOpen}
      />
      </Box>
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
      //           fontSize: "1vw",
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
      //           sx={{ fontFamily: "MontserratMedium", fontSize: ".7vw" }}
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
      //           sx={{ fontFamily: "MontserratMedium", fontSize: ".7vw" }}
      //         >
      //           De Acuerdo
      //         </Typography>
      //       </Button>
      //     </DialogActions>
      //   </Dialog>
      // </Grid>


    );
  } else if (tabla === "ProgramasInstituciones") {
    return (
      <Box sx={{ display: "flex" }}>
        <IconButton onClick={handleClickOpen}>
          <AddIcon
            sx={{
              width: 50,
              height: 50,
            }}
          />
        </IconButton>
        <Dialog fullWidth open={open} onClose={handleClose}>
          <Box
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
                fontSize: "1vw",
                textAlign: "center",
              }}
            >
              Vincular Programa - Institucion
            </Typography>
          </Box>
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
                {catalogoInstituciones.map((item) => {
                  return (
                    <MenuItem
                      value={item.Id}
                      key={item.Id}
                      sx={{ fontFamily: "MontserratRegular" }}
                    >
                      {item.NombreInstitucion}
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
              sx={queries.buttonCancelarSolicitudInscripcion}
              color="error"
              onClick={handleClose}
            >
              <Typography
                sx={{ fontFamily: "MontserratMedium", fontSize: ".7vw" }}
              >
                Cancelar
              </Typography>
            </Button>

            <Button
              sx={queries.buttonContinuarSolicitudInscripcion}
              onClick={CreatePorCatalogoProgramaInstitucion}
              autoFocus
            >
              <Typography
                sx={{ fontFamily: "MontserratMedium", fontSize: ".7vw" }}
              >
                De Acuerdo
              </Typography>
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  } else if (tabla === "InstitucionUnidad") {
    return (
      <Box sx={{ display: "flex" }}>
        <IconButton onClick={handleClickOpen}>
          <AddIcon
            sx={{
              width: 50,
              height: 50,
            }}
          />
        </IconButton>
        
         <Dialog fullWidth open={open} onClose={handleClose}>
          <Box
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
                fontSize: "1vw",
                textAlign: "center",
              }}
            >
              Vincular Institucion - Unidad Administrativa
            </Typography>
          </Box>
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
                {catalogoInstituciones.map((item) => {
                  return (
                    <MenuItem
                      value={item.Id}
                      key={item.Id}
                      sx={{ fontFamily: "MontserratRegular" }}
                    >
                      {item.NombreInstitucion}
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
              sx={queries.buttonCancelarSolicitudInscripcion}
              onClick={handleClose}
            >
              <Typography
                sx={{ fontFamily: "MontserratMedium", fontSize: ".7vw" }}
              >
                Cancelar
              </Typography>
            </Button>

            <Button
              sx={queries.buttonContinuarSolicitudInscripcion}
              onClick={CreatePorCatalogoInstitucionUnidadAdmin}
              autoFocus
            >
              <Typography
                sx={{ fontFamily: "MontserratMedium", fontSize: ".7vw" }}
              >
                De Acuerdo
              </Typography>
            </Button>
          </DialogActions>
        </Dialog>:
        
      </Box>
    );
  } else if (tabla === "PEDs") {
    return (
      <Box>
        <IconButton onClick={handleClickOpen}>
          <AddIcon
            sx={{
              width: 50,
              height: 50,
            }}
          />
        </IconButton>
        <Dialog fullWidth maxWidth={"xl"} open={open} onClose={handleClose}>
          <AppBar sx={{ position: "relative", backgroundColor: "#bdbdbd" }}>
            <Toolbar>
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <PED handleClose={handleClose} />
        </Dialog>
      </Box>
    );
  } else if (tabla === "ProgramasPresupuestarios") {
    return (
      <Box sx={{ display: "flex" }}>
        <Tooltip title="Editar">
          <IconButton onClick={handleClickOpen}>
            <AddIcon
              sx={{
                width: 50,
                height: 50,
              }}
            />
          </IconButton>
        </Tooltip>
        <Dialog fullWidth open={open} onClose={handleClose}>
          <Box
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
                fontSize: "1vw",
                textAlign: "center",
              }}
            >
              Añadir Programa Presupuestario
            </Typography>
          </Box>
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
              sx={descripcion.length < 20 ? { width: "60%" } : { width: "80%" }}
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
                {catalogoInstituciones.map((item) => {
                  return (
                    <MenuItem
                      value={item.Id}
                      key={item.Id}
                      sx={{ fontFamily: "MontserratLight" }}
                    >
                      {item.NombreInstitucion}
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
              sx={queries.buttonCancelarSolicitudInscripcion}
              color="error"
              onClick={handleClose}
            >
              <Typography
                sx={{ fontFamily: "MontserratMedium", fontSize: ".7vw" }}
              >
                Cancelar
              </Typography>
            </Button>

            <Button
              sx={queries.buttonContinuarSolicitudInscripcion}
              onClick={CreatePorCatalogoProgramap}
              autoFocus
            >
              <Typography
                sx={{ fontFamily: "MontserratMedium", fontSize: ".7vw" }}
              >
                De Acuerdo
              </Typography>
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  } else {
    return (
      <Box>
        <IconButton onClick={handleClickOpen}>
          <AddIcon
            sx={{
              width: 50,
              height: 50,
            }}
          />
        </IconButton>
        <Dialog open={open} onClose={handleClose} fullWidth>
          <Box
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
                fontSize: "1vw",
                textAlign: "center",
              }}
            >
              Añadir Elemento
            </Typography>
          </Box>

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

                console.log(v.target.value);
                console.log(valor);
                console.log(select);
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
          </DialogContent>

          <DialogActions
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              sx={queries.buttonCancelarSolicitudInscripcion}
              onClick={handleClose}
            >
              <Typography
                sx={{ fontFamily: "MontserratMedium", fontSize: ".7vw" }}
              >
                Cancelar
              </Typography>
            </Button>

            <Button
              sx={queries.buttonContinuarSolicitudInscripcion}
              onClick={CreatePorCatalogo}
              autoFocus
            >
              <Typography
                sx={{ fontFamily: "MontserratMedium", fontSize: ".7vw" }}
              >
                De Acuerdo
              </Typography>
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }
};

export default AddDialogCatalogo;
