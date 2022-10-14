import React, { useEffect, useState } from "react";
import {
  FormControl,
  TextField,
  Box,
  Typography,
  Alert,
  Button,
  Autocomplete,
  InputAdornment,
} from "@mui/material";
import axios from "axios";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Swal from "sweetalert2";

export interface IEncabezado {
  ejercicioFiscal: string;
  institucion: string;
  programa: string;
  eje: string;
  tematica: string;
  objetivo: string;
  estrategia: string;
  lineasDeAccion: string;
  beneficiario: string;
}

export function TabEncabezado({
  show,
  resumenEncabezado,
}: {
  show: boolean;
  resumenEncabezado: Function;
}) {
  const [nombreArchivo, setNombreArchivo] = useState(
    "Arrastre o de click aquí para seleccionar archivo"
  );

  const [encabezado, setEncabezado] = useState([
    {
      ejercicioFiscal: "",
      institucion: "",
      programa: "",
      eje: "",
      tematica: "",
      objetivo: "",
      estrategia: "",
      lineasDeAccion: "",
      beneficiario: "",
    },
  ]);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  //Cuando se haga un cambio, setear el valor y borrar los siguentes campos
  function enCambioAnio(Id: string, Anio: string) {
    setAnioFiscal(Anio);
  }
  function enCambioInstitucion(Id: string, Inst: string) {
    setInstitution(Inst);
    setPrograma("");
    getProgramas(Id);
    setDisabledProgramas(false);
  }
  function enCambioPrograma(Id: string, Prog: string) {
    setPrograma(Prog);
  }
  function enCambioEje(Id: string, Eje: string) {
    setEje(Eje);
    setTematica("");
    setDisabledObjetivos(true);
    setObjetivo("");
    setDisabledEstrategias(true);
    setEstrategia("");
    setDisabledLineasDeAccion(true);
    setLineaDeAccion([{ Id: "", LineaDeAccion: "" }]);
    getTematicas(Id);
    setDisabledTematicas(false);
  }
  function enCambioTematica(Id: string, Tematica: string) {
    setTematica(Tematica);
    setObjetivo("");
    setDisabledEstrategias(true);
    setEstrategia("");
    setDisabledLineasDeAccion(true);
    getObjetivos(Id);
    setDisabledObjetivos(false);
  }
  function enCambioObjetivo(Id: string, Objetivo: string) {
    setObjetivo(Objetivo);
    setEstrategia("");
    setDisabledLineasDeAccion(true);
    setLineaDeAccion([{ Id: "", LineaDeAccion: "" }]);
    getEstrategias(Id);
    setDisabledEstrategias(false);
  }
  function enCambioEstrategia(Id: string, Estrategia: string) {
    setEstrategia(Estrategia);
    setLineaDeAccion([{ Id: "", LineaDeAccion: "" }]);
    getLineasDeAccion(Id);
    setDisabledLineasDeAccion(false);
  }
  function enCambioLineasDeAccion(Id: string, LDA: string) {
    setLineaDeAccion([{ Id: Id, LineaDeAccion: LDA }]);
  }
  function enCambioBeneficiario(Id: string, Ben: string) {
    setBeneficiario(Ben);
  }
  function enCambioFile(event: any) {
    setUploadFile(event.target.files[0]);
    setNombreArchivo(event.target.value.split("\\")[2]);
    {
      nombreArchivo == null || uploadFile == null
        ? setDisabledButton(true)
        : setDisabledButton(false);
    }
  }

  //Desactivar si el anterior no tiene value
  const [disabledProgramas, setDisabledProgramas] = useState(true);
  const [disabledTematicas, setDisabledTematicas] = useState(true);
  const [disabledObjetivos, setDisabledObjetivos] = useState(true);
  const [disabledEstrategias, setDisabledEstrategias] = useState(true);
  const [disabledLineasDeAccion, setDisabledLineasDeAccion] = useState(true);
  const [disabledButton, setDisabledButton] = useState(true);

  //Values
  const [anioFiscal, setAnioFiscal] = useState("2022");
  const [institution, setInstitution] = useState("Selecciona");
  const [programa, setPrograma] = useState("Selecciona");
  const [eje, setEje] = useState("Selecciona");
  const [tematica, setTematica] = useState("Selecciona");
  const [objetivo, setObjetivo] = useState("Selecciona");
  const [estrategia, setEstrategia] = useState("Selecciona");
  const [lineaDeAccion, setLineaDeAccion] = useState([
    { Id: "", LineaDeAccion: "Selecciona" },
  ]);
  const [beneficiario, setBeneficiario] = useState("Selecciona");

  //Catalogos
  const [catalogoAniosFiscales, setCatalogoAniosFiscales] = useState([
    { Id: "0", AnioFiscal: "" },
  ]);
  const [catalogoInstituciones, setCatalogoInstituciones] = useState([
    { Id: "0", NombreInstitucion: "" },
  ]);
  const [catalogoProgramas, setCatalogoProgramas] = useState([
    { Id: "0", NombrePrograma: "" },
  ]);
  const [catalogoEjes, setCatalogoEjes] = useState([{ Id: "0", Eje: "" }]);
  const [catalogoTematicas, setCatalogoTematicas] = useState([
    { IdTematica: "0", Tematica: "" },
  ]);
  const [catalogoObjetivos, setCatalogoObjetivos] = useState([
    { IdObjetivo: "0", Objetivo: "" },
  ]);
  const [catalogoEstrategias, setCatalogoEstrategias] = useState([
    { IdEstrategia: "0", Estrategia: "" },
  ]);
  const [catalogoLineasDeAccion, setCatalogoLineasDeAccion] = useState([
    { IdLineasdeAccion: "0", LineaDeAccion: "" },
  ]);
  const [catalogoBeneficiarios, setCatalogoBeneficiarios] = useState([
    { Id: "0", Beneficiario: "" },
  ]);

  //Alerta de archivo incorrecto
  const AlertDisplay = () => {
    setDisabledButton(true);
    return (
      <Alert
        sx={{ borderRadius: 5, width: "80%", alignItems: "center", mt: 2 }}
        severity="error"
        onClose={() => {
          setShowAlert(false);
          setNombreArchivo("Arrastre o de click aquí para seleccionar archivo");
        }}
      >
        {errorMsg}
      </Alert>
    );
  };
  const [uploadFile, setUploadFile] = React.useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  //Obtener catálogos por id dependiendo de la seleccion anterior
  const getAniosFiscales = () => {
    axios
      .get("http://10.200.4.105:8000/api/aniosFiscales", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setCatalogoAniosFiscales(r.data.data);
      });
  };
  const getInstituciones = () => {
    axios
      .get("http://10.200.4.105:8000/api/usuarioInsitucion", {
        params: {
          IdUsuario: localStorage.getItem("IdUsuario"),
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setCatalogoInstituciones(r.data.data);
      });
  };
  const getProgramas = (id: string) => {
    if (id !== undefined) {
      axios
        .get("http://10.200.4.105:8000/api/programaInstitucion", {
          params: {
            IdInstitucion: id,
          },
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        })
        .then((r) => {
          setCatalogoProgramas(r.data.data);
        })
        .catch((err) => {
          Toast.fire({
            icon: "error",
            title: "No existen programas asociados a esta institución.",
          });
          setDisabledProgramas(true);
        });
    }
  };
  const getEjes = () => {
    axios
      .get("http://10.200.4.105:8000/api/ped-columns", {
        params: {
          Col: "Ejes",
          Id: " ",
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setCatalogoEjes(r.data.data);
      });
  };
  const getTematicas = (id: string) => {
    axios
      .get("http://10.200.4.105:8000/api/ped-columns", {
        params: {
          Col: "Temáticas",
          Id: id,
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setCatalogoTematicas(r.data.data);
      })
      .catch((err) => {
        setDisabledTematicas(true);
      });
  };
  const getObjetivos = (id: string) => {
    axios
      .get("http://10.200.4.105:8000/api/ped-columns", {
        params: {
          Col: "Objetivos",
          Id: id,
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setCatalogoObjetivos(r.data.data);
      })
      .catch((err) => {
        setDisabledObjetivos(true);
      });
  };
  const getEstrategias = (id: string) => {
    axios
      .get("http://10.200.4.105:8000/api/ped-columns", {
        params: {
          Col: "Estrategias",
          Id: id,
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setCatalogoEstrategias(r.data.data);
      })
      .catch((err) => {
        setDisabledEstrategias(true);
      });
  };
  const getLineasDeAccion = (id: string) => {
    axios
      .get("http://10.200.4.105:8000/api/ped-columns", {
        params: {
          Col: "Lineas de Acción",
          Id: id,
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setCatalogoLineasDeAccion(r.data.data);
      })
      .catch((err) => {
        setDisabledLineasDeAccion(true);
      });
  };
  const getBeneficiarios = () => {
    axios
      .get("http://10.200.4.105:8000/api/beneficiarios", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setCatalogoBeneficiarios(r.data.data);
      });
  };

  //Obtener Id de la descripción extraida de la MIR
  const getIdInstitucion = (Description: string) => {
    axios
      .get("http://10.200.4.105:8000/api/mir-id", {
        params: {
          Col: "Instituciones",
          Descripcion: Description,
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setInstitution(r.data.data[0].NombreInstitucion);
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  const getIdPrograma = (Description: string) => {
    axios
      .get("http://10.200.4.105:8000/api/mir-id", {
        params: {
          Col: "Programas",
          Descripcion: Description,
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setPrograma(r.data.data[0].Programa);
      });
  };
  const getIdEje = (Description: string) => {
    axios
      .get("http://10.200.4.105:8000/api/mir-id", {
        params: {
          Col: "Ejes",
          Descripcion: Description,
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setEje(r.data.data[0].Eje);
        getTematicas(r.data.data[0].Id);
        setDisabledTematicas(false);
      });
  };
  const getIdTematica = (Description: string) => {
    axios
      .get("http://10.200.4.105:8000/api/mir-id", {
        params: {
          Col: "Temáticas",
          Descripcion: Description,
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setTematica(r.data.data[0].Tematica);
        getObjetivos(r.data.data[0].Id);
        setDisabledObjetivos(false);
      });
  };
  const getIdObjetivo = (Description: string) => {
    axios
      .get("http://10.200.4.105:8000/api/mir-id", {
        params: {
          Col: "Objetivos",
          Descripcion: Description,
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setObjetivo(r.data.data[0].Objetivo);
        getEstrategias(r.data.data[0].Id);
        setDisabledEstrategias(false);
      });
  };
  const getIdEstrategia = (Description: string) => {
    axios
      .get("http://10.200.4.105:8000/api/mir-id", {
        params: {
          Col: "Estrategias",
          Descripcion: Description,
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setEstrategia(r.data.data[0].Estrategia);
        getLineasDeAccion(r.data.data[0].Id);
        setDisabledLineasDeAccion(false);
      });
  };
  const getIdLineaDeAccion = (Description: string) => {
    axios
      .get("http://10.200.4.105:8000/api/mir-id", {
        params: {
          Col: "Lineas de Acción",
          Descripcion: Description,
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setLineaDeAccion([
          {
            Id: "",
            LineaDeAccion: r.data.data[0].LineaDeAccion,
          },
        ]);
      });
  };
  const getIdBeneficiario = (Description: string) => {
    axios
      .get("http://10.200.4.105:8000/api/mir-id", {
        params: {
          Col: "Beneficiarios",
          Descripcion: Description,
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setBeneficiario(r.data.data[0].Beneficiario);
      });
  };

  //Cuando se da click en cargar archivo
  const submitForm = (event: any) => {
    setDisabledButton(true);
    event.preventDefault();

    const dataArray = new FormData();
    dataArray.append("file", uploadFile);

    axios
      .post("http://10.200.4.105:7000/upload", dataArray, {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((response) => {
        // console.log(response.data);
        getIdInstitucion(response.data.encabezado[0].institucion);
        getIdPrograma(response.data.encabezado[0].nombre_del_programa);
        // setPrograma(response.data.encabezado[0].nombre_del_programa);
        getIdEje(response.data.encabezado[0].eje);
        getIdTematica(response.data.encabezado[0].tema);
        getIdObjetivo(response.data.encabezado[0].objetivo);
        getIdEstrategia(response.data.encabezado[0].estrategia);
        // getIdLineaDeAccion(response.data.encabezado[0].linea_de_accion);
        getIdBeneficiario(response.data.encabezado[0].beneficiario);
      })
      .catch((error) => {
        setErrorMsg(error.response.data);
        setShowAlert(true);
      });
  };

  useEffect(() => {
    getAniosFiscales();
    getInstituciones();
    getEjes();
    getBeneficiarios();
  }, []);

  useEffect(() => {
    setEncabezado([
      {
        ejercicioFiscal: anioFiscal,
        institucion: institution,
        programa: programa,
        eje: eje,
        tematica: tematica,
        objetivo: objetivo,
        estrategia: estrategia,
        lineasDeAccion: lineaDeAccion[0].LineaDeAccion,
        beneficiario: beneficiario,
      },
    ]);
  }, [
    anioFiscal,
    institution,
    programa,
    eje,
    tematica,
    objetivo,
    estrategia,
    lineaDeAccion,
    beneficiario,
  ]);

  useEffect(() => {
    resumenEncabezado(encabezado);
    // console.log(encabezado);
  }, [encabezado]);
  
  return (
    <Box
      visibility={show ? "visible" : "hidden"}
      position="absolute"
      sx={{
        width: "75vw",
        height: "77vh",
        justifyContent: "center",
        alignItems: "center",
        justifyItems: "center",
        backgroundColor: "#fff",
        boxShadow: 20,
        borderRadius: 5,
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "1fr 1fr 1fr 2fr",
      }}
    >
      <FormControl sx={{ gridRow: "1", width: "20vw", mt: "6vh" }}>
        <Autocomplete
          disablePortal
          size="small"
          options={catalogoAniosFiscales}
          getOptionLabel={(option) => option.AnioFiscal}
          value={{ Id: catalogoAniosFiscales[0].Id, AnioFiscal: anioFiscal }}
          getOptionDisabled={(option) => {
            if (option.Id === "0") {
              return true;
            }
            return false;
          }}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.Id}>
                <p
                  style={{ fontFamily: "MontserratRegular", fontSize: ".7vw" }}
                >
                  {option.AnioFiscal}
                </p>
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={"Ejercicio Fiscal"}
              variant="standard"
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratSemiBold",
                  fontSize: ".8vw",
                  color:
                    anioFiscal === "" || anioFiscal === "Selecciona"
                      ? "#f27474"
                      : "",
                },
              }}
              sx={{
                "& .MuiAutocomplete-input": {
                  fontFamily: "MontserratRegular",
                },
              }}
            ></TextField>
          )}
          onChange={(event, value) =>
            enCambioAnio(
              value?.Id as string,
              (value?.AnioFiscal as string) || ""
            )
          }
          isOptionEqualToValue={(option, value) => option.Id === value.Id}
        />
      </FormControl>

      <Box
        sx={{
          gridColumn: "2/4",
          width: "30vw",
          height: "10vh",
          border: 1,
          borderRadius: 3,
          borderColor: "#af8c55",
          borderStyle: "dashed",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mt: "6vh",
          cursor: "pointer",
        }}
      >
        {showAlert ? (
          <AlertDisplay />
        ) : (
          <Typography
            sx={{
              position: "absolute",
              fontFamily: "MontserratLight",
              fontSize: ".7vw",
            }}
          >
            {nombreArchivo}
          </Typography>
        )}

        <input
          type="file"
          onChange={(v) => enCambioFile(v)}
          style={{
            color: "#000",
            opacity: 0,
            width: "100%",
            height: "10vh",
            cursor: "pointer",
          }}
        />
        {disabledButton ? null : (
          <Button
            disabled={disabledButton}
            onClick={submitForm}
            sx={{
              backgroundColor: "#b0e2ff8f",
              color: "black",
              height: "5vh",
              width: "10vw",
              mb: 0.5,
            }}
          >
            Cargar
          </Button>
        )}
      </Box>

      <FormControl sx={{ width: "20vw", mt: "6vh" }}>
        <Autocomplete
          disablePortal
          options={catalogoInstituciones}
          getOptionLabel={(option) => option.NombreInstitucion}
          value={{
            Id: catalogoInstituciones[0].Id,
            NombreInstitucion: institution,
          }}
          size="small"
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.Id}>
                <p
                  style={{ fontFamily: "MontserratRegular", fontSize: ".7vw" }}
                >
                  {option.NombreInstitucion}
                </p>
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={"Institución"}
              variant="standard"
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratSemiBold",
                  fontSize: ".8vw",
                },
              }}
              sx={{
                "& .MuiAutocomplete-input": {
                  fontFamily: "MontserratRegular",
                },
              }}
            ></TextField>
          )}
          onChange={(event, value) =>
            enCambioInstitucion(
              value?.Id as string,
              (value?.NombreInstitucion as string) || ""
            )
          }
          isOptionEqualToValue={(option, value) => option.Id === value.Id}
        />
      </FormControl>

      <FormControl sx={{ width: "20vw", mt: "6vh" }}>
        <Autocomplete
          disabled={disabledProgramas}
          options={catalogoProgramas}
          size="small"
          getOptionLabel={(option) => option.NombrePrograma}
          value={{ Id: catalogoProgramas[0].Id, NombrePrograma: programa }}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.Id}>
                <p
                  style={{ fontFamily: "MontserratRegular", fontSize: ".7vw" }}
                >
                  {option.NombrePrograma}
                </p>
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={"Programa"}
              variant="standard"
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratSemiBold",
                  fontSize: ".8vw",
                },
              }}
              sx={{
                "& .MuiAutocomplete-input": {
                  fontFamily: "MontserratRegular",
                },
              }}
            ></TextField>
          )}
          onChange={(event, value) =>
            enCambioPrograma(
              value?.Id as string,
              (value?.NombrePrograma as string) || ""
            )
          }
          isOptionEqualToValue={(option, value) => option.Id === value.Id}
        />
      </FormControl>

      <FormControl required sx={{ width: "20vw", mt: "6vh" }}>
        <Autocomplete
          disablePortal
          size="small"
          options={catalogoEjes}
          getOptionLabel={(option) => option.Eje}
          value={{ Id: catalogoEjes[0].Id, Eje: eje }}
          getOptionDisabled={(option) => {
            if (option.Id === "0") {
              return true;
            }
            return false;
          }}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.Id}>
                <p
                  style={{ fontFamily: "MontserratRegular", fontSize: ".7vw" }}
                >
                  {option.Eje}
                </p>
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={"Eje"}
              variant="standard"
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratSemiBold",
                  fontSize: ".8vw",
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
            enCambioEje(value?.Id as string, (value?.Eje as string) || "");
          }}
          isOptionEqualToValue={(option, value) => option.Id === value.Id}
        />
      </FormControl>

      <FormControl required sx={{ width: "20vw", mt: "4vh" }}>
        <Autocomplete
          disabled={disabledTematicas}
          options={catalogoTematicas}
          size="small"
          getOptionLabel={(option) => option.Tematica}
          value={{
            IdTematica: catalogoTematicas[0].IdTematica,
            Tematica: tematica,
          }}
          getOptionDisabled={(option) => {
            if (option.IdTematica === "0") {
              return true;
            }
            return false;
          }}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.IdTematica}>
                <p
                  style={{ fontFamily: "MontserratRegular", fontSize: ".7vw" }}
                >
                  {option.Tematica}
                </p>
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={"Temática"}
              variant="standard"
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratSemiBold",
                  fontSize: ".8vw",
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
            enCambioTematica(
              value?.IdTematica as string,
              (value?.Tematica as string) || ""
            );
          }}
          isOptionEqualToValue={(option, value) =>
            option.IdTematica === value.IdTematica
          }
        />
      </FormControl>

      <FormControl required sx={{ width: "20vw", mt: "4vh" }}>
        <Autocomplete
          disabled={disabledObjetivos}
          options={catalogoObjetivos}
          getOptionLabel={(option) => option.Objetivo}
          value={{
            IdObjetivo: catalogoObjetivos[0].IdObjetivo,
            Objetivo: objetivo,
          }}
          size="small"
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.IdObjetivo}>
                <p
                  style={{ fontFamily: "MontserratRegular", fontSize: ".7vw" }}
                >
                  {option.Objetivo}
                </p>
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={"Objetivo"}
              variant="standard"
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratSemiBold",
                  fontSize: ".8vw",
                },
              }}
              sx={{
                "& .MuiAutocomplete-input": {
                  fontFamily: "MontserratRegular",
                },
              }}
            ></TextField>
          )}
          onChange={(event, value) =>
            enCambioObjetivo(
              value?.IdObjetivo as string,
              (value?.Objetivo as string) || ""
            )
          }
          isOptionEqualToValue={(option, value) =>
            option.IdObjetivo === value.IdObjetivo
          }
        />
      </FormControl>

      <FormControl required sx={{ width: "20vw", mt: "4vh" }}>
        <Autocomplete
          disabled={disabledEstrategias}
          options={catalogoEstrategias}
          size="small"
          getOptionLabel={(option) => option.Estrategia}
          value={{
            IdEstrategia: catalogoEstrategias[0].IdEstrategia,
            Estrategia: estrategia,
          }}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.IdEstrategia}>
                <p
                  style={{ fontFamily: "MontserratRegular", fontSize: ".7vw" }}
                >
                  {option.Estrategia}
                </p>
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={"Estrategia"}
              variant="standard"
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratSemiBold",
                  fontSize: ".8vw",
                },
              }}
              sx={{
                "& .MuiAutocomplete-input": {
                  fontFamily: "MontserratRegular",
                },
              }}
            ></TextField>
          )}
          onChange={(event, value) =>
            enCambioEstrategia(
              value?.IdEstrategia as string,
              (value?.Estrategia as string) || ""
            )
          }
          isOptionEqualToValue={(option, value) =>
            option.IdEstrategia === value.IdEstrategia
          }
        />
      </FormControl>

      <FormControl
        required
        sx={{
          gridColumnStart: "1",
          gridColumnEnd: "3",
          width: "35vw",
        }}
      >
        <Autocomplete
          multiple
          disabled={disabledLineasDeAccion}
          disableCloseOnSelect
          size="small"
          limitTags={4}
          options={catalogoLineasDeAccion}
          getOptionLabel={(option) => option.LineaDeAccion}
          // value={[
          //   { IdLineasdeAccion: "", LineaDeAccion: "Selecciona" }
          // ]}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.IdLineasdeAccion}>
                <p
                  style={{ fontFamily: "MontserratRegular", fontSize: ".7vw" }}
                >
                  {option.LineaDeAccion}
                </p>
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={"Lineas de Acción"}
              variant="standard"
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratSemiBold",
                  fontSize: ".8vw",
                  color:
                    lineaDeAccion[0].LineaDeAccion === "" ||
                    lineaDeAccion[0].LineaDeAccion === "Selecciona"
                      ? "#f27474"
                      : "",
                },
              }}
              sx={{
                "& .MuiAutocomplete-input": {
                  fontFamily: "MontserratRegular",
                },
              }}
            />
          )}
          onChange={(event, value) =>
            enCambioLineasDeAccion(
              value[0]?.IdLineasdeAccion as string,
              (value[0]?.LineaDeAccion as string) || ""
            )
          }
          isOptionEqualToValue={(option, value) =>
            option.IdLineasdeAccion === value.IdLineasdeAccion
          }
        />
      </FormControl>

      <FormControl required sx={{ width: "20vw" }}>
        <Autocomplete
          disablePortal
          size="small"
          options={catalogoBeneficiarios}
          getOptionLabel={(option) => option.Beneficiario}
          value={{
            Id: catalogoBeneficiarios[0].Id,
            Beneficiario: beneficiario,
          }}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.Id}>
                <p
                  style={{ fontFamily: "MontserratRegular", fontSize: ".7vw" }}
                >
                  {option.Beneficiario}
                </p>
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={"Beneficiario"}
              variant="standard"
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratSemiBold",
                  fontSize: ".8vw",
                },
              }}
              sx={{
                "& .MuiAutocomplete-input": {
                  fontFamily: "MontserratRegular",
                },
              }}
            ></TextField>
          )}
          onChange={(event, value) =>
            enCambioBeneficiario(
              value?.Id as string,
              (value?.Beneficiario as string) || ""
            )
          }
          isOptionEqualToValue={(option, value) => option.Id === value.Id}
        />
      </FormControl>
    </Box>
  );
}

export default TabEncabezado;