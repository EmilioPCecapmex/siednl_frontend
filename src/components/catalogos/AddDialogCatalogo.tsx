/* eslint-disable react-hooks/exhaustive-deps */
import {  useState } from "react";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";

import axios from "axios";

import { DialogTitle, Grid, InputLabel, MenuItem, Select, Autocomplete } from "@mui/material";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import { Typography, FormControl } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { queries } from "../../queries";
import { PED } from "./PED";
import { CreatePorCatalogo, CreatePorCatalogoProgramap, createFechaDeCaptua } from "./AxiosCatalogo";
import { alertaError, alertaExito } from "../genericComponents/Alertas";

const modulo = [
  "Mir",
  "Meta Anual",
  "Ficha Tecnica",
  "Raffi",
  "Actividades Institucionales",
];

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


  const cerrardialog = () => {
    handleClose();
  };

  const opendialog = () => {
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
  

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  const monthS = month < 10 ? "0" + month : month.toString();
  const dateS = date < 10 ? "0" + date : date.toString();

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
  // Funcionalidad de Fechas de captura
  const [modulos, setModulos] = useState("Mir");

 

  const handleCloseFc = () => {
    handleClose(false); 
  };

  const [fechaCaptura1, setFechaCaptura1] = useState<string>(
    `${year}-${monthS}-${dateS}`
  );

  const [fechaCaptura2, setFechaCaptura2] = useState<string>(
    `${year}-${monthS}-${dateS}`
  );

  const [fechaError, setFechaError] = useState(false);
  const handleFechaCaptura1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    const selectedDate = event.target.value;
   
    if (selectedDate <= fechaCaptura2) {
      setFechaCaptura1(selectedDate);
    
    
    }else{
      alertaError("Error fecha descuadrada")
    }
  };

  const handleFechaCaptura2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    const selectedDate = event.target.value;
    
    if (selectedDate >= fechaCaptura1) {
      setFechaCaptura2(selectedDate);
    }else{
      alertaError("Error fecha descuadrada")
    }
  };

  const handleClick = (modulo: string, fecha1: string, fecha2: string, state: Function) => {
    createFechaDeCaptua(modulo, fecha1, fecha2, state )
    getFechasDeCaptura()
    
  };


  const getFechasDeCaptura = () => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/list-fechaDeCaptura", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
       
        
        if (r.status === 200) {
          
          
          let update = r.data.data;
          update = update.map(
            (item: {
              Id: string;
              FechaDeCaptura: string;
              Descripcion: string;
              Tabla: string;
            }) => {
              return {
                Id: item.Id,
                Desc:
                  item.FechaDeCaptura + " / " + item.Descripcion.toUpperCase(),
                Tabla: "FechasDeCaptura",
              };
            }
          );
          
        }
      });
  };

  if (tabla.toUpperCase() === "FECHAS DE CAPTURA") {
   

    return (
      <Grid container lg={12}>
    

      <Dialog fullWidth open={open} onClose={cerrardialog} keepMounted>
        <DialogTitle>
          <Typography sx={queries.medium_text}>
             AÑADIR RANDO DE FECHA DE CAPTURA
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            sx={
              {
                //width: "100%",
                //justifyContent: "space-evenly",
                //display: "flex",
                // height: "16vh",
                //alignItems: "center",
              }
            }
            lg={12}
            direction={"column"}
          >
            
            <Grid item lg={4}>
            <InputLabel sx={{ fontFamily: "MontserratMedium" }}>
                MODULO
              </InputLabel>
              <FormControl variant="outlined" fullWidth size="small">
                <Select
                  value={modulos}
                  onChange={(v) => {
                    setModulos(v.target.value);
                  }}
                >
                  {modulo.map((mod) => (
                    <MenuItem key={mod} value={mod}>
                      {mod}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            

            <Grid item lg={4}>
               <InputLabel sx={{ fontFamily: "MontserratMedium" }}>
               INICIO
              </InputLabel> 
              <FormControl variant="outlined" fullWidth size="small">
                
                <TextField
                  variant="outlined"
                  
                  onChange={
                    handleFechaCaptura1Change
                  }
                  multiline={descripcion.length < 20 ? false : true}
                  value={fechaCaptura1}
                  
                  //style={{ marginTop: "2vh" }}
                  type="date"
                  InputProps={{
                    style: {
                      fontFamily: "MontserratLight",
                      borderColor: fechaError ? "red" : undefined,
                    },
                  }}
                  InputLabelProps={{
                    shrink: true,
                    style: {
                      fontFamily: "MontserratRegular",
                    },
                  }}
                  rows={3}
                />
              </FormControl>
            </Grid>

            <Grid item lg={4}>
               <InputLabel sx={{ fontFamily: "MontserratMedium" }}>
                FIN
              </InputLabel> 

              <FormControl variant="outlined" fullWidth size="small">
                <TextField
                  variant="outlined"
                  onChange={handleFechaCaptura2Change}
                  multiline={descripcion.length < 20 ? false : true}
                  value={fechaCaptura2}
                
                  //style={{ marginTop: "2vh" }}
                  type="date"
                  InputProps={{
                    style: {
                      fontFamily: "MontserratLight",
                      borderColor: fechaError ? "red" : undefined,
                    },
                  }}
                  InputLabelProps={{
                    shrink: true,
                    style: {
                      fontFamily: "MontserratRegular",
                    },
                  }}
                  rows={3}
                />
              </FormControl>
            </Grid>
          </Grid>
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
            onClick={handleCloseFc}
          >
            <Typography
              sx={{ fontFamily: "MontserratMedium", fontSize: ".7vw" }}
            >
              CANCELAR
            </Typography>
          </Button>

          <Button
            sx={queries.buttonContinuarSolicitudInscripcion}
            onClick={() => handleClick(modulos, fechaCaptura1, fechaCaptura2, handleClose )}
            //autoFocus
          >
            <Typography
              sx={{ fontFamily: "MontserratMedium", fontSize: ".7vw" }}
            >
              DE ACUERDO
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
    );
  } else if (tabla.toUpperCase()  === "PROGRAMAS - INSTITUCIONES") {
    

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
VINCULAR PROGRAMA - INSTITUCION
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
                PROGRAMAS INSTITUCIONALES
              </InputLabel>
              <Select
                value={programa}
                label="INSTITUCIÓN institucionales"
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
                  SELECCIONA
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
                INSTITUCIÓN
              </InputLabel>
              <Select
                value={institution}
                label="INSTITUCIÓN"
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
                  SELECCIONA
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
                CANCELAR
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
                DE ACUERDI
              </Typography>
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    );
  } else if (tabla === "InstitucionUnidad") {
   
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
              
              VINCULAR INSTITUCION - UNIDAD ADMINISTRATIVA
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
              UNIDADES ADMINISTRATIVAS
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
                  SELECCIONA
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
                INSTITUCIÓN
              </InputLabel>
              <Select
                value={institution}
                label="INSTITUCIÓN"
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
                  SELECCIONA
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
                CANCELAR
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
                DE ACUERDO
              </Typography>
            </Button>
          </DialogActions>
        </Dialog>
        :
      </Grid>
    );
  } else if (tabla === "PED") {
    
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
  } else if (tabla.toUpperCase()  === "PROGRAMAS PRESUPUESTARIOS") {
    
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
              
              AÑADIR PROGRAMA PRESUPUESTARIO
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
                INSTITUCIÓN
              </InputLabel>
              <Select
                labelId="labelInst"
                value={institution}
                label="INSTITUCIÓN"
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
                  SELECCIONA INSTITUCIÓN
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
                CANCELAR
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
                DE ACUERDO
              </Typography>
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    );
  } else {
   
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
              AÑADIR ELEMENTO
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

            {tabla.toUpperCase() === "BENEFICIARIOS" ? (
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

            {tabla.toUpperCase() === "BENEFICIARIOS" ? (
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

            {tabla.toUpperCase() === "BENEFICIARIOS" ? (
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
                CANCELAR
              </Typography>
            </Button>

            <Button className="aceptar" onClick={opendialog} autoFocus>
              <Typography
                sx={{
                  fontFamily: "MontserratMedium",
                  fontSize: [10, 15, 15, 15, 15],
                }}
              >
                DE ACUERDO
              </Typography>
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    );
  }
};

export default AddDialogCatalogo;
