import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
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
  // Autocomplete,
  TableContainer,
  Typography,
  Alert,
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
  Autocomplete,
  SelectChangeEvent,
  ButtonGroup,
} from "@mui/material";
import axios from "axios";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { IComponente } from "./IComponente";

export default function FullModalMir() {
  //arrays
  const [fin, setFin] = React.useState([
    {
      index: 0,
      label: "Resumen Narrativo",
      descripcion: "",
    },
    {
      index: 1,

      label: "Indicador",
      descripcion: "",
    },
    {
      index: 2,

      label: "Formula",
      descripcion: "",
    },
    {
      index: 3,

      label: "Frecuencia",
      descripcion: "",
    },
    {
      index: 4,

      label: "Medios de verificacion y fuentes de informacion",
      descripcion: "",
    },
    {
      index: 5,

      label: "Supuestos",
      descripcion: "",
    },
  ]);

  const [componenteSeleccionado, setComponenteSeleccionado] = React.useState(0);

  const changeValue = (index: number, v: string) => {
    if (fin[index].descripcion != "") {
      return fin[index].descripcion;
    } else return null;
  };
  const [value, setValue] = React.useState(10);

  const [nombreArchivo, setNombreArchivo] = useState(
    "Arrastre o de click aquí para seleccionar archivo"
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

  function enCambioFile(event: any) {
    setUploadFile(event.target.files[0]);
    setNombreArchivo(event.target.value.split("\\")[2]);
    { nombreArchivo == null || uploadFile == null ? setDisabledButton(true) : setDisabledButton(false)}
    
  }

  const AlertDisplay = () => {
    setDisabledButton(true);
      return (
        <Alert
          sx={{ borderRadius: 5, width: "80%", alignItems: "center", mt: 2 }}
          severity="error"
          onClose={() => {setShowAlert(false); setNombreArchivo("Arrastre o de click aquí para seleccionar archivo");}}
        >
          {errorMsg}
        </Alert>
      );
    
  };

  const [disabledProgramas, setDisabledProgramas] = useState(true);
  const [disabledTematicas, setDisabledTematicas] = useState(true);
  const [disabledObjetivos, setDisabledObjetivos] = useState(true);
  const [disabledEstrategias, setDisabledEstrategias] = useState(true);
  const [disabledLineasDeAccion, setDisabledLineasDeAccion] = useState(true);
  const [disabledButton, setDisabledButton] = useState(true);

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

  const [uploadFile, setUploadFile] = React.useState("");
  const [res, setRes] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [showAlert, setShowAlert] = useState(false);

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
  const getIdInstitucion = (Description: string) => {
    axios
      .get("http://localHost:8000/api/mir-id", {
        params: {
          Col: "Instituciones",
          Descripcion: Description,
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        // console.log(r.data.data[0].NombreInstitucion);
        setInstitution(r.data.data[0].NombreInstitucion);
        // getProgramas(r.data.data[0].Id);
        // setDisabledProgramas(false);
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  const getIdPrograma = (Description: string) => {
    console.log(Description);

    axios
      .get("http://localHost:8000/api/mir-id", {
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
      .get("http://localHost:8000/api/mir-id", {
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
      .get("http://localHost:8000/api/mir-id", {
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
      .get("http://localHost:8000/api/mir-id", {
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
      .get("http://localHost:8000/api/mir-id", {
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
      .get("http://localHost:8000/api/mir-id", {
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
      .get("http://localHost:8000/api/mir-id", {
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

  const submitForm = (event: any) => {
    event.preventDefault();
    setDisabledButton(true);

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
        // getIdPrograma(response.data.encabezado[0].nombre_del_programa);
        setPrograma(response.data.encabezado[0].nombre_del_programa);
        getIdEje(response.data.encabezado[0].eje);
        getIdTematica(response.data.encabezado[0].tema);
        getIdObjetivo(response.data.encabezado[0].objetivo);
        getIdEstrategia(response.data.encabezado[0].estrategia);
        // getIdLineaDeAccion(response.data.encabezado[0].linea_de_accion);
        getIdBeneficiario(response.data.encabezado[0].beneficiario);
        // setRes(response.data);
        // setRes("");
      })
      .catch((error) => {
        setErrorMsg(error.response.data);
        setShowAlert(true);
        setRes("");
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
  const [expandedActividades, setExpandedActividades] = React.useState<
    string | false
  >(false);

  const handleChangeAcordion =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const handleChangeAcordionActividades =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedActividades(isExpanded ? panel : false);
    };

  // business logic-------------------------------------------------------------------------------
  const [componentes, setComponentes] = React.useState([1, 2]);
  const [actividades, setActividades] = React.useState([1, 2]);

  const [componenteActividad, setComponenteActividad] = React.useState([
    {
      componentes: componentes.map((x) => actividades),
    },
  ]);

  const [componenteValor, setComponenteValor] = React.useState<
    Array<IComponente>
  >([]);

  const agregarFnc = () => {
    let v = componentes.length + 1;
    if (v > 6) {
    } else {
      setComponentes([...componentes, v]);

      let array = [...componentes, v].map((x) => {
        return {
          resumen: "",
          indicador: "",
          frecuencia: "",
          formula: "",
          medios: "",
          supuestos: "",
        };
      });
      setComponenteValor(array);
    }
  };

  const eliminarFnc = () => {
    let v = componentes.length - 1;
    if (v < 2) {
    } else {
      setComponentes(componentes.splice(0, v));
    }
  };

  const agregarAFnc = (index: number) => {
    let v = actividades.length + 1;
    if (v > 6) {
    } else {
      setActividades([...actividades, v]);

      let xArray = [...componenteActividad];

      xArray[0]["componentes"][parseInt(componenteSelect)] = [
        ...actividades,
        v,
      ];

      setComponenteActividad(xArray);
    }
  };

  const eliminarAFnc = () => {
    let act = componenteActividad[0]["componentes"][parseInt(componenteSelect)];
    let v = act.length - 1;
    if (v < 2) {
    } else {
      let xArray = [...componenteActividad];

      xArray[0]["componentes"][parseInt(componenteSelect)] = act.splice(0, v);

      setComponenteActividad(xArray);
    }
  };

  useEffect(() => {
    let array = componentes.map((x) => {
      return {
        resumen: "",
        indicador: "",
        frecuencia: "",
        formula: "",
        medios: "",
        supuestos: "",
      };
    });
    setComponenteValor(array);
  }, []);

  const cargarArray = () => {
    let arrayComponente = [
      {
        componentes: componenteValor,
      },
    ];
  };

  const AcordeonComponentes = ({ x }: { x: number }) => {
    return (
      <Accordion
        sx={{
          width: "95%",
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          boxShadow: 4,
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography
            sx={{
              width: "33%",
              flexShrink: 0,
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            Componente {x}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{}}>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              height: "40vh",
              flexDirection: "column",
              backgroundColor: "",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "50%",
                justifyContent: "space-evenly",
                backgroundColor: "",
                display: "flex",
                alignItems: "center",
              }}
            >
              <TextField
                sx={{ with: "30%", maxWidth: "30%" }}
                fullWidth
                multiline
                rows={5}
                label={"Resumen Narrativo"}
                onChange={(c) => {
                  componenteValor[x - 1].resumen = c.target.value;
                  cargarArray();
                }}
              />
              <TextField
                sx={{ with: "30%", maxWidth: "30%" }}
                fullWidth
                multiline
                rows={5}
                label={"Indicador"}
                onChange={(c) => {
                  componenteValor[x - 1].indicador = c.target.value;
                  cargarArray();
                }}
              />
              <TextField
                sx={{ with: "30%", maxWidth: "30%" }}
                fullWidth
                multiline
                rows={5}
                label={"Fórmula"}
                onChange={(c) => {
                  componenteValor[x - 1].formula = c.target.value;
                  cargarArray();
                }}
              />
            </Box>
            <Box
              sx={{
                width: "100%",
                height: "50%",
                justifyContent: "space-evenly",
                backgroundColor: "",
                display: "flex",
                alignItems: "center",
              }}
            >
              <TextField
                sx={{ with: "30%", maxWidth: "30%" }}
                fullWidth
                multiline
                rows={5}
                label={"Frecuencia"}
                onChange={(c) => {
                  componenteValor[x - 1].frecuencia = c.target.value;
                  cargarArray();
                }}
              />
              <TextField
                sx={{ with: "30%", maxWidth: "30%" }}
                fullWidth
                multiline
                rows={5}
                label={"Medios de Verificación"}
                onChange={(c) => {
                  componenteValor[x - 1].medios = c.target.value;
                  cargarArray();
                }}
              />
              <TextField
                sx={{ with: "30%", maxWidth: "30%" }}
                fullWidth
                multiline
                rows={5}
                label={"Supuestos"}
                onChange={(c) => {
                  componenteValor[x - 1].supuestos = c.target.value;
                  cargarArray();
                }}
              />
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    );
  };

  const AcordeonActividades = ({ x, comp }: { x: number; comp: string }) => {
    return (
      <Accordion
        sx={{
          width: "95%",
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          boxShadow: 4,
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography
            sx={{
              width: "33%",
              flexShrink: 0,
              height: "5vh",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            Actividad {x} - Componente {comp}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              height: "40vh",
              flexDirection: "column",
              backgroundColor: "",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "50%",
                justifyContent: "space-evenly",
                display: "flex",
                alignItems: "center",
              }}
            >
              <TextField
                sx={{ with: "30%", maxWidth: "30%" }}
                fullWidth
                multiline
                rows={5}
                label={"Resumen Narrativo"}
                onChange={(c) => {
                  componenteValor[x - 1].resumen = c.target.value;
                  cargarArray();
                }}
              />
              <TextField
                sx={{ with: "30%", maxWidth: "30%" }}
                fullWidth
                multiline
                rows={5}
                label={"Indicador"}
                onChange={(c) => {
                  componenteValor[x - 1].indicador = c.target.value;
                  cargarArray();
                }}
              />
              <TextField
                sx={{ with: "30%", maxWidth: "30%" }}
                fullWidth
                multiline
                rows={5}
                label={"Fórmula"}
                onChange={(c) => {
                  componenteValor[x - 1].formula = c.target.value;
                  cargarArray();
                }}
              />
            </Box>
            <Box
              sx={{
                width: "100%",
                height: "50%",
                justifyContent: "space-evenly",
                backgroundColor: "",
                display: "flex",
                alignItems: "center",
              }}
            >
              <TextField
                sx={{ with: "30%", maxWidth: "30%" }}
                fullWidth
                multiline
                rows={5}
                label={"Frecuencia"}
                onChange={(c) => {
                  componenteValor[x - 1].frecuencia = c.target.value;
                  cargarArray();
                }}
              />
              <TextField
                sx={{ with: "30%", maxWidth: "30%" }}
                fullWidth
                multiline
                rows={5}
                label={"Medios de Verificación"}
                onChange={(c) => {
                  componenteValor[x - 1].medios = c.target.value;
                  cargarArray();
                }}
              />
              <TextField
                sx={{ with: "30%", maxWidth: "30%" }}
                fullWidth
                multiline
                rows={5}
                label={"Supuestos"}
                onChange={(c) => {
                  componenteValor[x - 1].supuestos = c.target.value;
                  cargarArray();
                }}
              />
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    );
  };

  const [componenteSelect, setComponenteSelect] = React.useState("0");
  //----------------------------------------------------------------------------------------------
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
                width: "30vw",
                height: "10vh",
                border: 1,
                borderRadius: 3,
                boxShadow: 10,
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
                  backgroundColor: "red",
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
                    backgroundColor: "#dbdbdb",
                  }}
                >
                  Cargar
                </Button>
              )}
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
            }}
          ></Box>
        ) : null}
        {/* Componentes */}
        {value === 30 ? (
          <Box
            sx={{
              display: "flex",
              width: "75vw",
              height: "77vh",
              justifyContent: "center",
              alignItems: "center",
              justifyItems: "center",
              backgroundColor: "#fff",
            }}
          >
            <Box
              sx={{
                display: "flex",
                backgroundColor: "",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  backgroundColor: "",
                  width: "100%",
                  height: "10%",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  mr: "15vw",
                }}
              >
                {/* Botones Componentes */}
                <IconButton onClick={() => agregarFnc()}>
                  <AddCircleIcon fontSize="large" />
                </IconButton>

                <IconButton onClick={() => eliminarFnc()}>
                  <DoDisturbOnIcon fontSize="large" />
                </IconButton>
              </Box>

              <Box
                sx={{
                  width: "95%",
                  height: "90%",
                  backgroundColor: "",
                  pb: 2,
                  pt: 2,
                  borderRight: "solid 1px",
                  overflow: "auto",
                  borderRadius: ".4vw",
                  borderColor: "#BCBCBC",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  "&::-webkit-scrollbar": {
                    width: ".3vw",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "rgba(0,0,0,.5)",
                    outline: "1px solid slategrey",
                    borderRadius: 10,
                  },
                }}
              >
                {/* Render Componentes */}
                {componentes.map((x) => {
                  return <AcordeonComponentes key={x} x={x} />;
                })}
              </Box>
            </Box>
          </Box>
        ) : null}
        {value === 40 ? (
          <Box
            sx={{
              display: "flex",
              width: "75vw",
              height: "77vh",
              justifyContent: "center",
              alignItems: "center",
              justifyItems: "center",
              backgroundColor: "#fff",
            }}
          >
            <Box
              sx={{
                display: "flex",
                backgroundColor: "",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  backgroundColor: "",
                  width: "100%",
                  height: "10%",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {/* Render seleccionar componente */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    "& > *": {
                      m: 1,
                    },
                  }}
                >
                  <ButtonGroup variant="text" sx={{}}>
                    {componentes.map((x) => {
                      return (
                        <Button
                          key={x}
                          onClick={() => {
                            setActividades([1, 2]);
                            setComponenteSelect((x - 1).toString());
                            let xArray = [...componenteActividad];

                            xArray[0]["componentes"][x - 1] = xArray[0][
                              "componentes"
                            ][x - 1] || [1, 2];

                            setComponenteActividad(xArray);
                          }}
                        >
                          Componente No. {x}
                        </Button>
                      );
                    })}
                  </ButtonGroup>
                </Box>

                <Box sx={{ display: "flex", mr: "9vw" }}>
                  <IconButton
                    onClick={() => {
                      agregarAFnc(parseInt(componenteSelect));
                    }}
                  >
                    <AddCircleIcon fontSize="large" />
                  </IconButton>

                  <IconButton onClick={() => eliminarAFnc()}>
                    <DoDisturbOnIcon fontSize="large" />
                  </IconButton>
                </Box>
              </Box>
              <Box
                sx={{
                  width: "95%",
                  height: "90%",
                  backgroundColor: "",
                  pb: 2,
                  pt: 2,
                  borderRight: "solid 1px",
                  overflow: "auto",
                  borderRadius: ".4vw",
                  borderColor: "#BCBCBC",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  "&::-webkit-scrollbar": {
                    width: ".3vw",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "rgba(0,0,0,.5)",
                    outline: "1px solid slategrey",
                    borderRadius: 10,
                  },
                }}
              >
                {/* Renderizado de Actividades */}

                {componenteActividad[0]["componentes"][
                  parseInt(componenteSelect)
                ].map((x) => {
                  return (
                    <AcordeonActividades
                      comp={(parseInt(componenteSelect) + 1).toString()}
                      key={x.toString()}
                      x={x}
                    />
                  );
                })}
              </Box>
            </Box>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}
