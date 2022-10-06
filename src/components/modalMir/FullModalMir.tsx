import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input,
  TextField,
  Box,
  Autocomplete,
  TableContainer,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Tooltip,
  IconButton,
  Button,
  TablePagination,
} from "@mui/material";
import axios from "axios";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

export default function FullModalMir() {
  const [numeroComponentes, setNumeroComponentes] = React.useState([
    {
      componente: "Componente No. 1",
      nombre: "C1",
      visible: true,
      nocomponente: 0,
    },
    {
      componente: "Componente No. 2",
      nombre: "C2",
      visible: true,
      nocomponente: 1,
    },
    {
      componente: "Componente No. 3",
      nombre: "C3",
      visible: false,
      nocomponente: 2,
    },
    {
      componente: "Componente No. 4",
      nombre: "C4",
      visible: false,
      nocomponente: 3,
    },
    {
      componente: "Componente No. 5",
      nombre: "C5",
      visible: false,
      nocomponente: 4,
    },
    {
      componente: "Componente No. 6",
      nombre: "C6",
      visible: false,
      nocomponente: 5,
    },
  ]);
  //Componentes
  var [componentesActivos, setComponentesActivos] = React.useState(2);

  const incrementaComponente = () => {
    if (componentesActivos < 6) {
      setComponentesActivos(componentesActivos++);
      numeroComponentes[componentesActivos].visible = true;
      console.log("+1: " + componentesActivos);
    }
  };

  const eliminaComponente = () => {
    if (componentesActivos >= 2) {
      numeroComponentes[componentesActivos].visible = false;
      setComponentesActivos(componentesActivos--);
    }
  };
  //________________________________
  const [value, setValue] = React.useState(10);

  const [nombreArchivo, setNombreArchivo] = useState(
    " Arrastre o de click aquí para seleccionar archivo"
  );

  function enCambioAnio(Id: string, Anio: string) {
    setAnioFiscal(Anio);
    if (Anio === null || Anio === "" || Anio === undefined) {
      setAnioFiscal("Ejercicio Fiscal");
    }
  }
  function enCambioInstitucion(Id: string, Inst: string) {
    setInstitution(Inst);
    setPrograma("Programa Presupuestario");
    if (Inst === null || Inst === "" || Inst === undefined) {
      setInstitution("");
      setDisabledProgramas(true);
      setPrograma("");
    } else {
      getProgramas(Id);
      setDisabledProgramas(false);
    }
  }
  function enCambioPrograma(Id: string, Prog: string) {
    setPrograma(Prog);
    if (Prog === null || Prog === "" || Prog === undefined) {
      setPrograma("");
    }
  }
  function enCambioEje(Id: string, Eje: string) {
    setEje(Eje);
    setTematica("Temática");
    setDisabledObjetivos(true);
    setObjetivo("Objetivo");
    setDisabledEstrategias(true);
    setEstrategia("Estrategia");
    setDisabledLineasDeAccion(true);
    setLineaDeAccion([{ Id: "", LineaDeAccion: "Lineas de Acción" }]);
    if (Eje === null || Eje === "" || Eje === undefined) {
      setEje("Eje");
      setDisabledTematicas(true);
      setTematica("Temática");
      setDisabledObjetivos(true);
      setObjetivo("Objetivo");
      setDisabledEstrategias(true);
      setEstrategia("Estrategia");
      setDisabledLineasDeAccion(true);
      setLineaDeAccion([{ Id: "", LineaDeAccion: "Lineas de Acción" }]);
    } else {
      getTematicas(Id);
      setDisabledTematicas(false);
    }
  }
  function enCambioTematica(Id: string, Tematica: string) {
    setTematica(Tematica);
    setObjetivo("Objetivo");
    setDisabledEstrategias(true);
    setEstrategia("Estrategia");
    setDisabledLineasDeAccion(true);
    setLineaDeAccion([{ Id: "", LineaDeAccion: "Lineas de Acción" }]);
    if (Tematica === null || Tematica === "" || Tematica === undefined) {
      setTematica("Temática");
      setDisabledObjetivos(true);
      setObjetivo("Objetivo");
      setDisabledEstrategias(true);
      setEstrategia("Estrategia");
      setDisabledLineasDeAccion(true);
      setLineaDeAccion([{ Id: "", LineaDeAccion: "Lineas de Acción" }]);
    } else {
      getObjetivos(Id);
      setDisabledObjetivos(false);
    }
  }
  function enCambioObjetivo(Id: string, Objetivo: string) {
    setObjetivo(Objetivo);
    setEstrategia("Estrategia");
    setDisabledLineasDeAccion(true);
    setLineaDeAccion([{ Id: "", LineaDeAccion: "Lineas de Acción" }]);
    if (Objetivo === null || Objetivo === "" || Objetivo === undefined) {
      setObjetivo("Objetivo");
      setDisabledEstrategias(true);
      setEstrategia("Estrategia");
      setDisabledLineasDeAccion(true);
      setLineaDeAccion([{ Id: "", LineaDeAccion: "Lineas de Acción" }]);
    } else {
      getEstrategias(Id);
      setDisabledEstrategias(false);
    }
  }
  function enCambioEstrategia(Id: string, Estrategia: string) {
    setEstrategia(Estrategia);
    setLineaDeAccion([{ Id: "", LineaDeAccion: "Lineas de Acción" }]);
    if (Estrategia === null || Estrategia === "" || Estrategia === undefined) {
      setEstrategia("Estrategia");
      setDisabledLineasDeAccion(true);
      setLineaDeAccion([{ Id: "", LineaDeAccion: "Lineas de Acción" }]);
    } else {
      getLineasDeAccion(Id);
      setDisabledLineasDeAccion(false);
    }
  }
  function enCambioLineasDeAccion(Id: string, LDA: string) {
    setLineaDeAccion([{ Id: Id, LineaDeAccion: LDA }]);
    if (LDA === null || LDA === "" || LDA === undefined) {
      setLineaDeAccion([{ Id: Id, LineaDeAccion: "Lineas de Acción" }]);
    }
  }
  function enCambioBeneficiario(Id: string, Ben: string) {
    setBeneficiario(Ben);
    if (Ben === null || Ben === "" || Ben === undefined) {
      setBeneficiario("");
    }
  }

  const [disabledProgramas, setDisabledProgramas] = useState(true);
  const [disabledTematicas, setDisabledTematicas] = useState(true);
  const [disabledObjetivos, setDisabledObjetivos] = useState(true);
  const [disabledEstrategias, setDisabledEstrategias] = useState(true);
  const [disabledLineasDeAccion, setDisabledLineasDeAccion] = useState(true);

  const [anioFiscal, setAnioFiscal] = useState("Ejercicio Fiscal");
  const [institution, setInstitution] = useState("Institución");
  const [programa, setPrograma] = useState("Programa Presupuestario");
  const [eje, setEje] = useState("Eje");
  const [tematica, setTematica] = useState("Temática");
  const [objetivo, setObjetivo] = useState("Objetivo");
  const [estrategia, setEstrategia] = useState("Estrategia");
  const [lineaDeAccion, setLineaDeAccion] = useState([
    { Id: "", LineaDeAccion: "Lineas de Accion" },
  ]);
  const [beneficiario, setBeneficiario] = useState("Beneficiario");

  const [catalogoAniosFiscales, setCatalogoAniosFiscales] = useState([
    { Id: "", AnioFiscal: "" },
  ]);
  const [catalogoInstituciones, setCatalogoInstituciones] = useState([
    { Id: "", NombreInstitucion: "" },
  ]);
  const [catalogoProgramas, setCatalogoProgramas] = useState([
    { Id: "", NombrePrograma: "" },
  ]);
  const [catalogoEjes, setCatalogoEjes] = useState([{ Id: "", Eje: "" }]);
  const [catalogoTematicas, setCatalogoTematicas] = useState([
    { IdTematica: "", Tematica: "" },
  ]);
  const [catalogoObjetivos, setCatalogoObjetivos] = useState([
    { IdObjetivo: "", Objetivo: "" },
  ]);
  const [catalogoEstrategias, setCatalogoEstrategias] = useState([
    { IdEstrategia: "", Estrategia: "" },
  ]);
  const [catalogoLineasDeAccion, setCatalogoLineasDeAccion] = useState([
    { IdLineasdeAccion: "", LineaDeAccion: "" },
  ]);
  const [catalogoBeneficiarios, setCatalogoBeneficiarios] = useState([
    { Id: "", Beneficiario: "" },
  ]);

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
        setPrograma("Institucion sin programas asignados");
        setDisabledProgramas(true);
      });
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
        setTematica("Eje sin temáticas asignadas");
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
        setObjetivo("Tematica sin objetivos asignados");
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
        setEstrategia("Objetivo sin estrategias asignadas");
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
        setLineaDeAccion([
          {
            Id: "",
            LineaDeAccion: "Estrategia sin Lineas de acción asignadas",
          },
        ]);
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

  useEffect(() => {
    getAniosFiscales();
    getInstituciones();
    getEjes();
    getBeneficiarios();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChangeAcordion =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        width: "87%",
        height: "92%",
        mt: "8vh",
      }}
    >
      <Box
        sx={{
          width: "80vw",
          height: "86vh",
          borderRadius: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs"
            textColor="inherit"
            sx={{
              backgroundColor: "#fff",
              borderRadius: "10px 10px 0 0",
              boxShadow: 20,
            }}
          >
            <Tab
              label="Encabezado"
              value={10}
              sx={{
                borderRight: "5px solid #b3afaf",
                color: "black",
                fontFamily: "MontserratBold",
                backgroundColor: "#ccc",
              }}
            />
            <Tab
              label="Fin / Propósito"
              value={20}
              sx={{
                borderRight: "5px solid #b3afaf",
                color: "black",
                fontFamily: "MontserratBold",
                backgroundColor: "#ccc",
              }}
            />
            <Tab
              label="Componentes"
              value={30}
              sx={{
                borderRight: "5px solid #b3afaf",
                color: "black",
                fontFamily: "MontserratBold",
                backgroundColor: "#ccc",
              }}
            />
            <Tab
              label="Actividades"
              value={40}
              sx={{
                borderRight: "5px solid #b3afaf",
                color: "black",
                fontFamily: "MontserratBold",
                backgroundColor: "#ccc",
              }}
            />
            <Tab
              label="Resumen"
              value={50}
              sx={{
                color: "black",
                fontFamily: "MontserratBold",
                backgroundColor: "#ccc",
              }}
            />
          </Tabs>
        </Box>

        {value === 10 ? (
          <Box
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
                sx={{ boxShadow: 5 }}
                options={catalogoAniosFiscales}
                getOptionLabel={(option) => option.AnioFiscal}
                renderInput={(params) => (
                  <TextField {...params} label={anioFiscal}></TextField>
                )}
                onChange={(event, value) =>
                  enCambioAnio(value?.Id as string, value?.AnioFiscal as string)
                }
                isOptionEqualToValue={(option, value) => option.Id === value.Id}
              />
            </FormControl>
            <Box
              sx={{
                gridColumn: "2/4",
                width: "20vw",
                height: "10vh",
                border: 1,
                borderRadius: 3,
                boxShadow: 10,
                borderColor: "#af8c55",
                borderStyle: "dashed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: "6vh",
                cursor: "pointer",
              }}
            >
              <Typography
                sx={{
                  position: "absolute",
                  fontFamily: "MontserratLight",
                  fontSize: ".7vw",
                  cursor: "pointer",
                }}
              >
                {nombreArchivo}
              </Typography>
              <TextField
                type="file"
                onChange={(v) =>
                  setNombreArchivo(v.target.value.split("\\")[2])
                }
                sx={{
                  color: "#fff",
                  opacity: 0,
                  width: "100%",
                  "& .MuiInputBase-root": {
                    height: "10vh",
                  },
                  cursor: "pointer",
                }}
              ></TextField>
            </Box>

            <FormControl sx={{ width: "20vw", mt: "6vh" }}>
              <Autocomplete
                disablePortal
                sx={{ boxShadow: 4 }}
                options={catalogoInstituciones}
                getOptionLabel={(option) => option.NombreInstitucion}
                renderInput={(params) => (
                  <TextField {...params} label={institution}></TextField>
                )}
                onChange={(event, value) =>
                  enCambioInstitucion(
                    value?.Id as string,
                    value?.NombreInstitucion as string
                  )
                }
                isOptionEqualToValue={(option, value) => option.Id === value.Id}
              />
            </FormControl>

            <FormControl sx={{ width: "20vw", mt: "6vh" }}>
              <Autocomplete
                disabled={disabledProgramas}
                sx={{ boxShadow: disabledProgramas ? 0 : 4 }}
                options={catalogoProgramas}
                getOptionLabel={(option) => option.NombrePrograma}
                renderInput={(params) => (
                  <TextField {...params} label={programa}></TextField>
                )}
                onChange={(event, value) =>
                  enCambioPrograma(
                    value?.Id as string,
                    value?.NombrePrograma as string
                  )
                }
                isOptionEqualToValue={(option, value) => option.Id === value.Id}
              />
            </FormControl>

            <FormControl required sx={{ width: "20vw", mt: "6vh" }}>
              <Autocomplete
                disablePortal
                sx={{ boxShadow: 4 }}
                options={catalogoEjes}
                getOptionLabel={(option) => option.Eje}
                renderInput={(params) => (
                  <TextField {...params} label={eje}></TextField>
                )}
                onChange={(event, value) => {
                  enCambioEje(value?.Id as string, value?.Eje as string);
                }}
                isOptionEqualToValue={(option, value) => option.Id === value.Id}
              />
            </FormControl>

            <FormControl required sx={{ width: "20vw", mt: "4vh" }}>
              <Autocomplete
                disabled={disabledTematicas}
                sx={{ boxShadow: disabledTematicas ? 0 : 4 }}
                options={catalogoTematicas}
                getOptionLabel={(option) => option.Tematica}
                renderInput={(params) => (
                  <TextField {...params} label={tematica}></TextField>
                )}
                onChange={(event, value) => {
                  enCambioTematica(
                    value?.IdTematica as string,
                    value?.Tematica as string
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
                sx={{ boxShadow: disabledObjetivos ? 0 : 4 }}
                options={catalogoObjetivos}
                getOptionLabel={(option) => option.Objetivo}
                renderInput={(params) => (
                  <TextField {...params} label={objetivo}></TextField>
                )}
                onChange={(event, value) =>
                  enCambioObjetivo(
                    value?.IdObjetivo as string,
                    value?.Objetivo as string
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
                sx={{ boxShadow: disabledEstrategias ? 0 : 4 }}
                options={catalogoEstrategias}
                getOptionLabel={(option) => option.Estrategia}
                renderInput={(params) => (
                  <TextField {...params} label={estrategia}></TextField>
                )}
                onChange={(event, value) =>
                  enCambioEstrategia(
                    value?.IdEstrategia as string,
                    value?.Estrategia as string
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
                sx={{ boxShadow: disabledLineasDeAccion ? 0 : 4 }}
                disabled={disabledLineasDeAccion}
                disableCloseOnSelect
                limitTags={4}
                options={catalogoLineasDeAccion}
                getOptionLabel={(option) => option.LineaDeAccion}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={lineaDeAccion[0].LineaDeAccion}
                  />
                )}
                onChange={(event, value) =>
                  enCambioLineasDeAccion(
                    value[0]?.IdLineasdeAccion as string,
                    value[0]?.LineaDeAccion as string
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
                sx={{ boxShadow: 5 }}
                options={catalogoBeneficiarios}
                getOptionLabel={(option) => option.Beneficiario}
                renderInput={(params) => (
                  <TextField {...params} label={beneficiario}></TextField>
                )}
                onChange={(event, value) =>
                  enCambioBeneficiario(
                    value?.Id as string,
                    value?.Beneficiario as string
                  )
                }
                isOptionEqualToValue={(option, value) => option.Id === value.Id}
              />
            </FormControl>
          </Box>
        ) : null}

        {value === 20 ? (
          <Box
            sx={{
              width: "75vw",
              height: "77vh",
              justifyContent: "center",
              alignItems: "center",
              justifyItems: "center",
              backgroundColor: "#fff",
              borderRadius: 5,
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "repeat(1fr 3fr 3fr)",
            }}
          >
            <Typography
              sx={{
                gridColumn: "1/4",
                alignContent: "flex-start",
                fontFamily: "MontserratBold",
                fontSize: "1.5rem",
              }}
            >
              FIN
            </Typography>

            <TextField
              multiline
              rows={4}
              required
              id="outlined-basic"
              label="Resumen Narrativo"
              variant="outlined"
              sx={{ width: "20vw" }}
            />
            <TextField
              multiline
              rows={4}
              required
              id="outlined-basic"
              label="Indicador"
              variant="outlined"
              sx={{ width: "20vw" }}
            />
            <TextField
              multiline
              rows={4}
              required
              id="outlined-basic"
              label="Fórmula"
              variant="outlined"
              sx={{ width: "20vw" }}
            />
            <TextField
              multiline
              rows={4}
              required
              id="outlined-basic"
              label="Frecuencia"
              variant="outlined"
              sx={{ width: "20vw" }}
            />
            <TextField
              multiline
              rows={4}
              required
              id="outlined-basic"
              label="Medios de verificación y fuente de información"
              variant="outlined"
              sx={{ width: "20vw" }}
            />
            <TextField
              multiline
              rows={4}
              required
              id="outlined-basic"
              label="Supuestos"
              variant="outlined"
              sx={{ width: "20vw" }}
            />
            <Typography
              sx={{
                gridColumn: "1/4",
                fontFamily: "MontserratBold",
                fontSize: "1.5rem",
              }}
            >
              PROPÓSITO
            </Typography>
            <TextField
              multiline
              rows={4}
              required
              id="outlined-basic"
              label="Resumen Narrativo"
              variant="outlined"
              sx={{ width: "20vw" }}
            />
            <TextField
              multiline
              rows={4}
              required
              id="outlined-basic"
              label="Indicador"
              variant="outlined"
              sx={{ width: "20vw" }}
            />
            <TextField
              multiline
              rows={4}
              required
              id="outlined-basic"
              label="Fórmula"
              variant="outlined"
              sx={{ width: "20vw" }}
            />
            <TextField
              multiline
              rows={4}
              required
              id="outlined-basic"
              label="Frecuencia"
              variant="outlined"
              sx={{ width: "20vw" }}
            />
            <TextField
              multiline
              rows={4}
              required
              id="outlined-basic"
              label="Medios de verificación y fuente de información"
              variant="outlined"
              sx={{ width: "20vw" }}
            />
            <TextField
              multiline
              rows={4}
              required
              id="outlined-basic"
              label="Supuestos"
              variant="outlined"
              sx={{ width: "20vw" }}
            />
          </Box>
        ) : null}
        {/* Componentes */}
        {value === 30 ? (
          <Box
            sx={{
              width: "75vw",
              height: "77vh",
              justifyContent: "center",
              alignItems: "center",
              justifyItems: "center",
              backgroundColor: "#fff",
            }}
          >
            <Button variant="contained" onClick={() => incrementaComponente()}>
              Agregar Componente
            </Button>

            {numeroComponentes.map((item) => {
              if (item.visible) {
                return <TextField value={item.componente}></TextField>;
              }
            })}

            <Button variant="contained" onClick={() => eliminaComponente()}>
              Eliminar Componente
            </Button>
            <Box>
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChangeAcordion("panel1")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography
                    sx={{
                      width: "33%",
                      flexShrink: 0,
                      justifyContent: "center",
                    }}
                  >
                    Componente
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gridTemplateRows: "3fr 1fr 3fr ",
                    }}
                  >
                    <TextField
                      multiline
                      rows={4}
                      required
                      id="outlined-basic"
                      label="Resumen Narrativo"
                      variant="outlined"
                      sx={{ gridRow: "1", width: "20vw" }}
                    />
                    <TextField
                      multiline
                      rows={4}
                      required
                      id="outlined-basic"
                      label="Indicador"
                      variant="outlined"
                      sx={{ gridRow: "1", width: "20vw" }}
                    />
                    <TextField
                      multiline
                      rows={4}
                      required
                      id="outlined-basic"
                      label="Fórmula"
                      variant="outlined"
                      sx={{ gridRow: "1", width: "20vw" }}
                    />
                    <TextField
                      multiline
                      rows={4}
                      required
                      id="outlined-basic"
                      label="Frecuencia"
                      variant="outlined"
                      sx={{ gridRow: "3", width: "20vw" }}
                    />
                    <TextField
                      multiline
                      rows={4}
                      required
                      id="outlined-basic"
                      label="Medios de verificación y fuente de información"
                      variant="outlined"
                      sx={{ gridRow: "3", width: "20vw" }}
                    />
                    <TextField
                      multiline
                      rows={4}
                      required
                      id="outlined-basic"
                      label="Supuestos"
                      variant="outlined"
                      sx={{ gridRow: "3", width: "20vw" }}
                    />
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Box>
        ) : null}
        {value === 50 ? (
          <Box
            sx={{ backgroundColor: "blue", with: "100vw", height: "80vh" }}
          ></Box>
        ) : null}
      </Box>
    </Box>
  );
}
