import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import AddCircleIcon from '@mui/icons-material/AddCircle';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
  console.log(componenteSeleccionado);

  const changeValue = (index: number, v: string) => {
    if (fin[index].descripcion != "") {
      return fin[index].descripcion
    }
    else
      return null
  }
  const [value, setValue] = React.useState(10);

  const [nombreArchivo, setNombreArchivo] = useState(
    " Arrastre o de click aquí para seleccionar archivo"
  );

  const [anioFiscal, setAnioFiscal] = useState("Ejercicio Fiscal");
  const [institution, setInstitution] = useState("Institución");
  const [programa, setPrograma] = useState("Programa");
  const [eje, setEje] = useState("Eje");
  const [tematica, setTematica] = useState("Temática");
  const [objetivo, setObjetivo] = useState("Objetivo");
  const [estrategia, setEstrategia] = useState("Estrategia");
  const [lineaDeAccion, setLineaDeAccion] = useState([
    { Id: "", LineaDeAccion: "Lineas de Acción" },
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
    { Id: "", Tematica: "" },
  ]);
  const [catalogoObjetivos, setCatalogoObjetivos] = useState([
    { Id: "", Objetivo: "" },
  ]);
  const [catalogoEstrategias, setCatalogoEstrategias] = useState([
    { Id: "", Estrategia: "" },
  ]);
  const [catalogoLineasDeAccion, setCatalogoLineasDeAccion] = useState([
    { Id: "", LineaDeAccion: "" },
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
      .get("http://10.200.4.105:8000/api/instituciones", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setCatalogoInstituciones(r.data.data);
      });
  };
  const getProgramas = () => {
    axios
      .get("http://10.200.4.105:8000/api/programaPresupuestario", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setCatalogoProgramas(r.data.data);
      });
  };
  const getEjes = () => {
    axios
      .get("http://10.200.4.105:8000/api/ejes", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setCatalogoEjes(r.data.data);
      });
  };
  const getTematicas = () => {
    axios
      .get("http://10.200.4.105:8000/api/tematica", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setCatalogoTematicas(r.data.data);
      });
  };
  const getObjetivos = () => {
    axios
      .get("http://10.200.4.105:8000/api/objetivos", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setCatalogoObjetivos(r.data.data);
      });
  };
  const getEstrategias = () => {
    axios
      .get("http://10.200.4.105:8000/api/estrategias", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setCatalogoEstrategias(r.data.data);
      });
  };
  const getLineasDeAccion = () => {
    axios
      .get("http://10.200.4.105:8000/api/lineasDeAccion", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setCatalogoLineasDeAccion(r.data.data);
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
    getProgramas();
    getEjes();
    getTematicas();
    getObjetivos();
    getEstrategias();
    getLineasDeAccion();
    getBeneficiarios();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [expandedActividades, setExpandedActividades] = React.useState<string | false>(false);

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

      console.log(xArray);
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
      console.log(xArray);
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
    console.log(arrayComponente);
  };

  const AcordeonComponentes = ({ x }: { x: number }) => {
    return (
      <Accordion sx={{ width: "95%", display: "flex", flexDirection: "column", flexWrap: "wrap", boxShadow: 4 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ width: "33%", flexShrink: 0 , alignItems:"center", justifyContent:"center", display:"flex"}}>
            Componente {x}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{}}>

          <Box sx={{ display: "flex", width: "100%", height: "40vh", flexDirection: "column", backgroundColor: "", }}>

            <Box sx={{ width: "100%", height: "50%", justifyContent: "space-evenly", backgroundColor: "", display: "flex", alignItems: "center" }}>
              <TextField
                sx={{ with: "30%", maxWidth: '30%' }}
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
                sx={{ with: "30%", maxWidth: '30%' }}
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
                sx={{ with: "30%", maxWidth: '30%' }}
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
            <Box sx={{ width: "100%", height: "50%", justifyContent: "space-evenly", backgroundColor: "", display: "flex", alignItems: "center" }}>

              <TextField
                sx={{ with: "30%", maxWidth: '30%' }}
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
                sx={{ with: "30%", maxWidth: '30%' }}
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
                sx={{ with: "30%", maxWidth: '30%' }}
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
      <Accordion sx={{ width: "95%", display: "flex", flexDirection: "column", flexWrap: "wrap",  boxShadow: 4}}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ width: "33%", flexShrink: 0 ,height:"5vh", alignItems:"center", justifyContent:"center", display:"flex"}}>
            Actividad {x} - Componente {comp}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Box sx={{ display: "flex", width: "100%", height: "40vh", flexDirection: "column", backgroundColor: "", }}>
          <Box sx={{ width: "100%", height: "50%", justifyContent: "space-evenly",  display: "flex", alignItems: "center" }}>
            <TextField
              sx={{ with: "30%", maxWidth: '30%' }}
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
              sx={{ with: "30%", maxWidth: '30%' }}
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
              sx={{ with: "30%", maxWidth: '30%' }}
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
          <Box sx={{ width: "100%", height: "50%", justifyContent: "space-evenly", backgroundColor: "", display: "flex", alignItems: "center" }}>
            <TextField
              sx={{ with: "30%", maxWidth: '30%' }}
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
              sx={{ with: "30%", maxWidth: '30%' }}
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
              sx={{ with: "30%", maxWidth: '30%' }}
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
            sx={{ backgroundColor: "#fff", borderRadius: "10px 10px 0 0" }}
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
              borderRadius: 5,
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",

              gridTemplateRows: "1fr 1fr 1fr 2fr",
            }}
          >
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
          >



          </Box>
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
            <Box sx={{ display: "flex", backgroundColor: "", width: "100%", height: "100%", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>

              <Box sx={{ display: "flex", backgroundColor: "", width: "100%", height: "10%", alignItems: "center", justifyContent: "flex-end", mr: "15vw" }}>
                {/* Botones Componentes */}
                <IconButton onClick={() => agregarFnc()}>
                  <AddCircleIcon fontSize="large" />

                </IconButton >


                <IconButton onClick={() => eliminarFnc()}>
                  <DoDisturbOnIcon fontSize="large" />
                </IconButton >
              </Box>

              <Box sx={{
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
              }}>
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
            <Box sx={{ display: "flex", backgroundColor: "", width: "100%", height: "100%", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>

              <Box sx={{ display: "flex", backgroundColor: "", width: "100%", height: "10%", alignItems: "center", justifyContent: "space-between" }}>
                {/* Render seleccionar componente */}
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: "center",
                  '& > *': {
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

                            xArray[0]["componentes"][x - 1] = xArray[0]["componentes"][
                              x - 1
                            ] || [1, 2];

                            setComponenteActividad(xArray);
                          }}
                        >
                          Componente No. {x}
                        </Button>
                      );
                    })}
                  </ButtonGroup>

                </Box >

                <Box sx={{ display: "flex", mr: "9vw"}}>
                  <IconButton onClick={() => { agregarAFnc(parseInt(componenteSelect)); }}>
                    <AddCircleIcon fontSize="large" />
                  </IconButton >

                  <IconButton onClick={() => eliminarAFnc()}>
                    <DoDisturbOnIcon fontSize="large" />
                  </IconButton >
                </Box>
              </Box>
              <Box sx={{
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
              }}>
                {/* Renderizado de Actividades */}


                {componenteActividad[0]["componentes"][parseInt(componenteSelect)].map(
                  (x) => {
                    return (
                      <AcordeonActividades
                        comp={(parseInt(componenteSelect) + 1).toString()}
                        key={x.toString()}
                        x={x}
                      />
                    );
                  }
                )}


              </Box>

            </Box>
          </Box>
        ) : null}
      </Box>
    </Box>
  );



}
