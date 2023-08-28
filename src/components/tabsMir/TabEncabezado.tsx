/* eslint-disable array-callback-return */

import React, { useEffect, useState } from "react";
import {
  FormControl,
  TextField,
  Box,
  Typography,
  Alert,
  Button,
  Autocomplete,
  CircularProgress,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { IMIR, IMIREdit } from "./IMIR";
import Stack from "@mui/material/Stack";

export interface IEncabezado {
  ejercicioFiscal: string;
  institucion: string;
  nombre_del_programa: string;
  eje: string;
  tema: string;
  objetivo: string;
  estrategia: string;
  lineas_de_accion: Array<{ Id: string; LineaDeAccion: string }>;
  beneficiario: string;
  conac: string;
  consecutivo: string;
  anticorrupcion: string;
}

export function TabEncabezado({
  show,
  MIR,
  setMIR,
  mirEdit,
}: {
  show: boolean;
  MIR: IMIR;
  setMIR: Function;
  mirEdit: IMIREdit;
}) {
  const [nombreArchivo, setNombreArchivo] = useState(
    "ARRASTRE O DE CLICK AQUÍ PARA SELECCIONAR ARCHIVO"
  );

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
    setConac("");
    setConsecutivo("");
    if (Id !== "") {
      getProgramas(Id);
    }
    setDisabledProgramas(false);
  }
  function enCambioPrograma(Id: string, Prog: string) {
    setConac("");
    setConsecutivo("");
    if (Prog !== "") {
      getIdPrograma(Prog);
    }
  }
  function enCambioEje(Id: string, Eje: string) {
    setEje(Eje);
    setTematica("");
    setDisabledObjetivos(true);
    setObjetivo("");
    setDisabledEstrategias(true);
    setEstrategia("");
    setDisabledLineasDeAccion(true);
    setLineaDeAccion([]);
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
    setLineaDeAccion([]);
    getEstrategias(Id);
    setDisabledEstrategias(false);
  }
  function enCambioEstrategia(Id: string, Estrategia: string) {
    setEstrategia(Estrategia);
    setLineaDeAccion([]);
    getLineasDeAccion(Id);
    setDisabledLineasDeAccion(false);
  }
  // function enCambioLineasDeAccion(Id: string, LDA: Array<ILineasDeAccion>) {
  //   setLineaDeAccion([]);
  //   setLineaDeAccion(LDA);
  // }

  function enCambioBeneficiario(Id: string, Ben: string) {
    setBeneficiario(Ben);
  }

  function enCambioFile(event: any) {
    setUploadFile(event.target.files[0]);
    setLineaDeAccion([]);

    if (event.target.value !== "") {
      setNombreArchivo(event.target.value.split("\\")[2]);
    }
    nombreArchivo == null || uploadFile == null
      ? setDisabledButton(true)
      : setDisabledButton(false);
  }

  var y = new Date().getFullYear();

  //Desactivar si el anterior no tiene value
  const [disabledProgramas, setDisabledProgramas] = useState(true);
  const [disabledTematicas, setDisabledTematicas] = useState(true);
  const [disabledObjetivos, setDisabledObjetivos] = useState(true);
  const [disabledEstrategias, setDisabledEstrategias] = useState(true);
  const [disabledLineasDeAccion, setDisabledLineasDeAccion] = useState(true);
  const [disabledButton, setDisabledButton] = useState(true);

  //Values
  const [anioFiscal, setAnioFiscal] = useState(
    MIR.encabezado?.ejercicioFiscal || y.toString()
  );
  const [institution, setInstitution] = useState(
    MIR.encabezado?.institucion || ""
  );
  const [programa, setPrograma] = useState(
    MIR.encabezado?.nombre_del_programa || ""
  );
  const [eje, setEje] = useState(MIR.encabezado?.eje || "");
  const [tematica, setTematica] = useState(MIR.encabezado?.tema || "");
  const [objetivo, setObjetivo] = useState(MIR.encabezado?.objetivo || "");
  const [estrategia, setEstrategia] = useState(
    MIR.encabezado?.estrategia || ""
  );
  const [lineaDeAccion, setLineaDeAccion] = useState<Array<ILineasDeAccion>>(
    MIR.encabezado?.lineas_de_accion || []
  );
  const [beneficiario, setBeneficiario] = useState(
    MIR.encabezado?.beneficiario || ""
  );
  const [conac, setConac] = useState(MIR.encabezado?.conac || "");
  const [consecutivo, setConsecutivo] = useState(
    MIR.encabezado?.consecutivo || ""
  );
  const [anticorrupcion, setAnticorrupcion] = React.useState(
    MIR.encabezado?.anticorrupcion || "NO"
  );

  //Catalogos
  const [catalogoAniosFiscales, setCatalogoAniosFiscales] = useState([
    { Id: "0", AnioFiscal: "" },
  ]);
  const [catalogoInstituciones, setCatalogoInstituciones] = useState([
    { Id: "0", NombreInstitucion: "" },
  ]);
  const [catalogoProgramas, setCatalogoProgramas] = useState([
    { Id: "0", NombrePrograma: "", Conac: "", Consecutivo: "" },
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
    { Id: "0", LineaDeAccion: "" },
  ]);
  const [catalogoBeneficiarios, setCatalogoBeneficiarios] = useState([
    { Id: "0", Beneficiario: "" },
  ]);

  const replica = catalogoLineasDeAccion;

  const [uploadFile, setUploadFile] = React.useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const onClearLineasDeAccion = () => {
    setLineaDeAccion([]);
  };

  //Obtener catálogos por id dependiendo de la seleccion anterior
  const getAniosFiscales = () => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/aniosFiscales", {
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
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/usuarioInsitucion", {
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
        .get(
          process.env.REACT_APP_APPLICATION_BACK + "/api/programaInstitucion",
          {
            params: {
              IdInstitucion: id,
            },
            headers: {
              Authorization: localStorage.getItem("jwtToken") || "",
            },
          }
        )
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
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/ped-columns", {
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
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/ped-columns", {
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
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/ped-columns", {
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
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/ped-columns", {
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
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/ped-columns", {
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
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/beneficiarios", {
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
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/mir-id", {
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
      .catch((err) => {});
  };
  const getIdPrograma = (Description: string) => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/mir-id", {
        params: {
          Col: "Programas",
          Descripcion: Description,
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setPrograma(r.data.data[0].NombrePrograma);
        setConac(r.data.data[0].Conac);
        setConsecutivo(r.data.data[0].Consecutivo);
      });
  };
  const getIdEje = (Description: string) => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/mir-id", {
        params: {
          Col: "Ejes",
          Descripcion: Description,
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setEje(r.data.data[0]?.Eje);
        getTematicas(r.data.data[0]?.Id);
        setDisabledTematicas(false);
      });
  };
  const getIdTematica = (Description: string) => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/mir-id", {
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
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/mir-id", {
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
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/mir-id", {
        params: {
          Col: "Estrategias",
          Descripcion: Description,
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setEstrategia(r.data.data[0]?.Estrategia);
        getLineasDeAccion(r.data.data[0]?.Id);
      });
  };
  const getIdLineaDeAccion = (Description: string) => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/mir-id", {
        params: {
          Col: "Lineas de Acción",
          Descripcion: Description,
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.data.data.length !== 0) {
          lineaDeAccion.push(r.data.data[0]);
          setDisabledLineasDeAccion(false);
        }
      })
      .catch((err) => {});
  };

  const getIdBeneficiario = (Description: string) => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/mir-id", {
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
    setLoadingFile(true);

    const dataArray = new FormData();
    dataArray.append("file", uploadFile);

    axios
      .post(process.env.REACT_APP_APPLICATION_MID + "/upload", dataArray, {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then(({ data }) => {
        setMIR((MIR: IMIR) => ({
          ...MIR,
          ...{ fin: data.fin[0] },
          ...{ proposito: data.propositos[0] },
          ...{ componentes: data.componentes },
          ...{ actividades: data.actividades },
          ...{ componenteActividad: data.componenteActividad },
        }));
        setAnticorrupcion(data.encabezado[0].anticorrupcion);
        getIdInstitucion(data.encabezado[0].institucion);
        getIdPrograma(data.encabezado[0].nombre_del_programa);
        getIdEje(data.encabezado[0].eje);
        getIdTematica(data.encabezado[0].tema);
        getIdObjetivo(data.encabezado[0].objetivo);
        getIdEstrategia(data.encabezado[0].estrategia);
        setTimeout(() => {
          data.encabezado[0]?.lineas_de_accion
            ?.split(".\n")
            .map((value: string) => {
              if (value !== "") {
                getIdLineaDeAccion(value);
              }
            });
          setLoadingFile(false);
          getIdBeneficiario(data.encabezado[0].beneficiario);
        }, 1500);
      })
      .catch((error) => {
        setErrorMsg(error.response.data || "Formato de archivo incorrecto");
        setShowAlert(true);
        setDisabledButton(true);
        setLoadingFile(false);
      });
  };

  useEffect(() => {
    console.log(MIR);

    getAniosFiscales();
    getInstituciones();
    getEjes();
    getBeneficiarios();
  }, []);

  useEffect(() => {
    setMIR((MIR: IMIR) => ({
      ...MIR,
      ...{
        encabezado: {
          ejercicioFiscal: anioFiscal.toUpperCase(),
          institucion: institution.toUpperCase(),
          nombre_del_programa: programa.toUpperCase(),
          eje: eje.toUpperCase(),
          tema: tematica.toUpperCase(),
          objetivo: objetivo.toUpperCase(),
          estrategia: estrategia.toUpperCase(),
          lineas_de_accion: lineaDeAccion,
          beneficiario: beneficiario.toUpperCase(),
          conac: conac,
          consecutivo: consecutivo,
          anticorrupcion: anticorrupcion,
        },
      },
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    conac,
    consecutivo,
    anticorrupcion,
  ]);

  const [loadingFile, setLoadingFile] = useState(false);

  return (
    <Box
      visibility={show ? "visible" : "hidden"}
      position="absolute"
      sx={{
        width: "75vw",
        height: "75vh",
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
      <Box
        sx={{
          width: "5vw",
          height: "3vh",
          position: "absolute",
          top: "1vh",
          right: "1vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* <Button href="/files/MIR_2023.xlsx" target="_blank" download>
          <Typography sx={{ fontFamily: "MontserratMedium", color: "#616161" }}>
            Plantilla
          </Typography>
        </Button> */}
      </Box>

      <FormControl sx={{ gridRow: "1", width: "20vw" }}>
        <Autocomplete
          disabled={mirEdit?.encabezado.ejercicioFiscal}
          clearText="Borrar"
          noOptionsText="Sin opciones"
          closeText="Cerrar"
          openText="Abrir"
          // disabled={mirEdit?.encabezado.ejercicioFiscal}
          disablePortal
          size="small"
          options={catalogoAniosFiscales}
          getOptionLabel={(option) => option.AnioFiscal || ""}
          value={{
            Id: catalogoAniosFiscales[0].Id,
            AnioFiscal: anioFiscal,
          }}
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
              label={"Ejercicio Fiscal".toUpperCase()}
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
            enCambioAnio(
              value?.Id as string,
              (value?.AnioFiscal as string) || ""
            )
          }
          isOptionEqualToValue={(option, value) => option.Id === value.Id}
        />
      </FormControl>
{/* 
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
          <Alert
            sx={{ borderRadius: 5, width: "80%", alignItems: "center", mt: 2 }}
            severity="error"
            onClose={() => {
              setShowAlert(false);
              setNombreArchivo(
                "Arrastre o de click aquí para seleccionar archivo"
              );
            }}
          >
            {errorMsg}
          </Alert>
        ) : (
          <Typography
            sx={{
              position: "absolute",
              fontFamily: "MontserratLight",
              fontSize: ".7vw",
              textAlign: "center",
              width: "28vw",
              mb: 1,
            }}
          >
            {nombreArchivo}
          </Typography>
        )}

        <input
          type="file"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
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
              height: "3vh",
              width: "10vw",
              mb: 0.5,
            }}
          >
            Cargar
          </Button>
        )}
        
        <Box
          sx={{ position: "absolute" }}
          visibility={loadingFile ? "visible" : "hidden"}
        >
          <CircularProgress />
        </Box>
      </Box> */}

      <FormControl sx={{ width: "20vw" }}>
        <Autocomplete
          disabled={mirEdit?.encabezado.institucion}
          clearText="Borrar"
          noOptionsText="Sin opciones"
          closeText="Cerrar"
          openText="Abrir"
          // disabled={mirEdit?.encabezado.institucion}
          disablePortal
          options={catalogoInstituciones}
          getOptionLabel={(option) => option.NombreInstitucion || ""}
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
                  {option.NombreInstitucion.toUpperCase()}
                </p>
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={"Institución".toUpperCase()}
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
                  textTransform: "uppercase",
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

      <FormControl sx={{ width: "20vw" }}>
        <Autocomplete
          clearText="Borrar"
          noOptionsText="Sin opciones"
          closeText="Cerrar"
          openText="Abrir"
          disabled={
            mirEdit?.encabezado.nombre_del_programa || disabledProgramas
          }
          options={catalogoProgramas}
          size="small"
          getOptionLabel={(option) => option.NombrePrograma || ""}
          value={{
            Id: catalogoProgramas[0].Id,
            NombrePrograma: programa,
            Conac: conac,
            Consecutivo: consecutivo,
          }}
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
              label={"Programa".toUpperCase()}
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
            enCambioPrograma(
              value?.Id as string,
              (value?.NombrePrograma as string) || ""
            );
          }}
          isOptionEqualToValue={(option, value) => option.Id === value.Id}
        />
      </FormControl>

      
        <FormControlLabel
          label="ANTICORRUPCIÓN"
          control={
            <Checkbox
              checked={anticorrupcion === "SI"}
              onChange={() => {
                anticorrupcion === "NO"
                  ? setAnticorrupcion("SI")
                  : setAnticorrupcion("NO");
              }}
            />
          }
        />
        <TextField
          disabled
          size="small"
          label={"CONAC:"}
          value={conac}
          sx={{ width: "25%" }}
        />
        <TextField
          disabled
          size="small"
          label={"CLASIFICACIÓN PROGRAMÁTICA:"}
          value={consecutivo}
          sx={{ width: "70%" }}
        />
      

      <FormControl required sx={{ width: "20vw" }}>
        <Autocomplete
          clearText="Borrar"
          noOptionsText="Sin opciones"
          closeText="Cerrar"
          openText="Abrir"
          disablePortal
          disabled={mirEdit?.encabezado.eje}
          size="small"
          options={catalogoEjes}
          getOptionLabel={(option) => option.Eje || ""}
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
              label={"Eje".toUpperCase()}
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

      <FormControl required sx={{ width: "20vw" }}>
        <Autocomplete
          clearText="Borrar"
          noOptionsText="Sin opciones"
          closeText="Cerrar"
          openText="Abrir"
          disabled={
            (mirEdit?.encabezado.tema && tematica !== "") || disabledTematicas
          }
          options={catalogoTematicas}
          size="small"
          getOptionLabel={(option) => option.Tematica || ""}
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
                  {option.Tematica.toUpperCase()}
                </p>
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={"Temática".toUpperCase()}
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
                  textTransform: "uppercase",
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

      <FormControl required sx={{ width: "20vw" }}>
        <Autocomplete
          clearText="Borrar"
          noOptionsText="Sin opciones"
          closeText="Cerrar"
          openText="Abrir"
          disabled={
            (mirEdit?.encabezado.objetivo && objetivo !== "") ||
            disabledObjetivos
          }
          options={catalogoObjetivos}
          getOptionLabel={(option) => option.Objetivo || ""}
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
                  {option.Objetivo.toUpperCase()}
                </p>
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={"Objetivo".toUpperCase()}
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
                  textTransform: "uppercase",
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

      <FormControl required sx={{ width: "20vw" }}>
        <Autocomplete
          clearText="Borrar"
          noOptionsText="Sin opciones"
          closeText="Cerrar"
          openText="Abrir"
          disabled={
            (mirEdit?.encabezado.estrategia && estrategia !== "") ||
            disabledEstrategias
          }
          options={catalogoEstrategias}
          size="small"
          getOptionLabel={(option) => option.Estrategia || ""}
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
              label={"Estrategia".toUpperCase()}
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
            enCambioEstrategia(
              value?.IdEstrategia as string,
              (value?.Estrategia as string) || ""
            );
          }}
          isOptionEqualToValue={(option, value) =>
            option.IdEstrategia === value.IdEstrategia
          }
        />
      </FormControl>

      <FormControl required>
        {/*---------------------------------Aqui esta el error de borrar lineas da aciion199----------------------------------*/}
        <Stack spacing={3} sx={{ width: 400 }}>
          <Autocomplete
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            disabled={
              (mirEdit?.encabezado.lineas_de_accion &&
                lineaDeAccion[0]?.LineaDeAccion === "") ||
              disabledLineasDeAccion
            }
            multiple
            limitTags={4}
            options={replica}
            size="small"
            getOptionLabel={(option) =>
              option.LineaDeAccion.toUpperCase() || ""
            }
            //const replica = catalogoLineasDeAccion
            value={lineaDeAccion}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.Id}>
                  <p
                    style={{
                      fontFamily: "MontserratRegular",
                      fontSize: ".7vw",
                    }}
                  >
                    {option.LineaDeAccion.toUpperCase()}
                  </p>
                </li>
              );
            }}
            onInputChange={() => onClearLineasDeAccion()}
            //onClearLineasDeAccion
            //--------------------------- esto si va --------------------------------------------
            renderInput={(params) => (
              <TextField
                {...params}
                label={"Lineas de Acción".toUpperCase()}
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
                    textTransform: "uppercase",
                  },
                }}
              />
            )}
            onChange={(event, value) => {
              value.map((value2, index) => {
                if (value2.Id !== "" && value2.LineaDeAccion !== "") {
                  setLineaDeAccion(value);
                }
              });
            }}
            isOptionEqualToValue={(
              option: {
                Id: string;
                LineaDeAccion: string;
              },
              value: {
                Id: string;
                LineaDeAccion: string;
              }
            ) => value.Id === option.Id}
          />
        </Stack>
      </FormControl>

      <FormControl required sx={{ width: "20vw" }}>
        <Autocomplete
          disabled={mirEdit?.encabezado.beneficiario}
          clearText="Borrar"
          noOptionsText="Sin opciones"
          closeText="Cerrar"
          openText="Abrir"
          // disabled={mirEdit?.encabezado.beneficiario}
          disablePortal
          size="small"
          options={catalogoBeneficiarios}
          getOptionLabel={(option) => option.Beneficiario || ""}
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
              label={"Beneficiario".toUpperCase()}
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

export interface ILineasDeAccion {
  Id: string;
  LineaDeAccion: string;
}
