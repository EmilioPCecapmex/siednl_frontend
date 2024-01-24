import CloseIcon from "@mui/icons-material/Close";
import { DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { queries } from "../../queries";
import { alertaError, alertaExito } from "../genericComponents/Alertas";
import { CreatePorCatalogo, CreatePorCatalogoProgramap, createFechaDeCaptua } from "./AxiosCatalogo";
import { PED } from "./PED";

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

  const cerrardialog = () => {
    handleClose();
  };

  const opendialog = () => {
    CreatePorCatalogo(descripcion, tabla, handleClose, Idb, Tipob, Tipo);
  };

  
  const [Idb, setIdb] = useState("");
  const [Tipob, setTipoB] = useState("");
  const [Tipo, setTipo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [descripcionConac, setDescripcionConac] = useState("");
  const [descripcionConsecutivo, setDescripcionConsecutivo] =useState("");

  const [programa, setPrograma] = useState("");
  
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  const monthS = month < 10 ? "0" + month : month.toString();
  const dateS = date < 10 ? "0" + date : date.toString();

  const [fechaCaptura, setFechaCaptura] = useState(
    year + "-" + monthS + "-" + dateS
  );
  const [institution, setInstitution] = useState("0");
  const [unidad, setUnidad] = useState("0");

  const [catalogoInstituciones, setCatalogoInstituciones] = useState([
    { Id: "", Nombre: "" },
  ]);

  const [catalogoEntidades, setCatalogoEntidades] = useState([
    { Id: "", Label: "" },
  ]);

  const [catalogoProgramas, setCatalogoProgramas] = useState([
    { Id: "", NombrePrograma: "" },
  ]);

  const [catalogoUnidades, setCatalogoUnidades] = useState([
    { Id: "", Unidad: "" },
  ]);

  useEffect(() => {
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
        alertaExito(()=>{},"Elemento registrado con éxito.")
      })
      .catch((err) =>alertaError(err.response.data.result.error));
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
        alertaExito(() => handleClose(), "Catalogo creado");
      })
      .catch((err) => alertaError(err.response.data.result.error));
  };

  const validarNumero = (dato: string, state: any) => {
    if (/^[0-9]+$/.test(dato)) {
      return dato;
    } else if (dato.length === 0) {
      return "";
    }
    return state;
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    // Utiliza una expresión regular para validar que solo haya una letra
    if (/^[a-zA-Z]$/.test(inputValue) || inputValue === "") {
      setDescripcionConac(inputValue);
    }
  };
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

  const handleFechaCaptura1Change = (event: ChangeEvent<HTMLInputElement>) => {
    
    const selectedDate = event.target.value;
   
    if (selectedDate <= fechaCaptura2) {
      setFechaCaptura1(selectedDate);
    
    
    }else{
      alertaError("Error fecha descuadrada")
    }
  };

  const handleFechaCaptura2Change = (event: ChangeEvent<HTMLInputElement>) => {
    
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
            Añadir Rango de Fecha de Captura
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            lg={12}
            direction={"column"}
          >
            
            <Grid item lg={4}>
            <InputLabel sx={{ fontFamily: "MontserratMedium" }}>
                Modulo
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
               Inicio
              </InputLabel> 
              <FormControl variant="outlined" fullWidth size="small">
                
                <TextField
                  variant="outlined"
                  
                  onChange={
                    handleFechaCaptura1Change
                  }
                  multiline={descripcion.length < 20 ? false : true}
                  value={fechaCaptura1}
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
                Fin
              </InputLabel> 

              <FormControl variant="outlined" fullWidth size="small">
                <TextField
                  variant="outlined"
                  onChange={handleFechaCaptura2Change}
                  multiline={descripcion.length < 20 ? false : true}
                  value={fechaCaptura2}
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
              Cancelar
            </Typography>
          </Button>

          <Button
            sx={queries.buttonContinuarSolicitudInscripcion}
            onClick={() => handleClick(modulos, fechaCaptura1, fechaCaptura2, handleClose )}
          >
            <Typography
              sx={{ fontFamily: "MontserratMedium", fontSize: ".7vw" }}
            >
              De Acuerdo
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
    );
  } else if (tabla.toUpperCase() === "PROGRAMAS - INSTITUCIONES") {
    

    return (
      <Grid sx={{ display: "flex" }}>
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
  } else if (tabla.toUpperCase() === "InstitucionUnidad") {
   
    return (
      <Grid sx={{ display: "flex" }}>
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
  } else if (tabla.toUpperCase() === "PED") {
    
    return (
      <Grid>
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
  } else if (tabla.toUpperCase() === "PROGRAMAS PRESUPUESTARIOS") {
    
    return (
      <Grid sx={{ display: "flex" }}>
       
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
            {/* ################################################################## */}
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
   
    return (
      <Grid>
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

            {tabla.toUpperCase()  === "BENEFICIARIOS" ? (
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

            {tabla.toUpperCase()  === "BENEFICIARIOS" ? (
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
