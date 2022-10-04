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
      console.log(componentesActivos);
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
    console.log(componentesActivos);
  };
  //________________________________
  const [value, setValue] = React.useState(10);

  const [nombreArchivo, setNombreArchivo] = useState(
    "Arrastre o seleccione para cargar archivo"
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
            <FormControl sx={{ gridRow: "1", width: "20vw", mt: "6vh" }}>
              <Autocomplete
                disablePortal
                sx={{}}
                options={catalogoAniosFiscales}
                getOptionLabel={(option) => option.AnioFiscal}
                renderInput={(params) => <TextField {...params} label={anioFiscal} placeholder="Ejercicio Fiscal" ></TextField>}
                onChange={(event, value) => setAnioFiscal(value?.AnioFiscal as string)}
                isOptionEqualToValue={(option, value) => option.Id === value.Id}
              />
            </FormControl>

            <InputLabel
              id="file-upload"
              sx={[
                {
                  gridColumn: "2/4",
                  border: "5px dotted #ccc",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  mt: "5vh",
                  cursor: "pointer",
                  height: "10vh",
                  width: "15vw",
                },
                {
                  "&:hover": {
                    color: "Blue",
                    border: "5px dotted blue",
                  },
                },
              ]}
            >
              {nombreArchivo}
              <Input
                onChange={(e) =>
                  setNombreArchivo(e.target.value.split("\\")[2])
                }
                id="file-upload"
                type="file"
                sx={{}}
              />
            </InputLabel>

            <FormControl sx={{ width: "20vw", mt: "6vh" }}>
            <Autocomplete
                disablePortal
                sx={{}}
                options={catalogoInstituciones}
                getOptionLabel={(option) => option.NombreInstitucion}
                renderInput={(params) => <TextField {...params} label={institution} placeholder="Institución" ></TextField>}
                onChange={(event, value) => setInstitution(value?.NombreInstitucion as string)}
                isOptionEqualToValue={(option, value) => option.Id === value.Id}
              />
            </FormControl>

            <FormControl sx={{ width: "20vw", mt: "6vh" }}>
            <Autocomplete
                disablePortal
                sx={{}}
                options={catalogoProgramas}
                getOptionLabel={(option) => option.NombrePrograma}
                renderInput={(params) => <TextField {...params} label={programa} placeholder="Nombre del Programa" ></TextField>}
                onChange={(event, value) => setPrograma(value?.NombrePrograma as string)}
                isOptionEqualToValue={(option, value) => option.Id === value.Id}
              />
            </FormControl>

            <FormControl required sx={{ width: "20vw", mt: "6vh" }}>
            <Autocomplete
                disablePortal
                sx={{}}
                options={catalogoEjes}
                getOptionLabel={(option) => option.Eje}
                renderInput={(params) => <TextField {...params} label={eje} placeholder="Eje" ></TextField>}
                onChange={(event, value) => setEje(value?.Eje as string)}
                isOptionEqualToValue={(option, value) => option.Id === value.Id}
              />
            </FormControl>

            <FormControl required sx={{ width: "20vw", mt: "4vh" }}>
              <Autocomplete
                disablePortal
                sx={{}}
                options={catalogoTematicas}
                getOptionLabel={(option) => option.Tematica}
                renderInput={(params) => <TextField {...params} label={tematica} placeholder="Temática" ></TextField>}
                onChange={(event, value) =>
                  setTematica(value?.Tematica as string)
                }
                isOptionEqualToValue={(option, value) => option.Id === value.Id}
              />
            </FormControl>

            <FormControl required sx={{ width: "20vw", mt: "4vh" }}>
            <Autocomplete
                disablePortal
                sx={{}}
                options={catalogoObjetivos}
                getOptionLabel={(option) => option.Objetivo}
                renderInput={(params) => <TextField {...params} label={objetivo} placeholder="Objetivo" ></TextField>}
                onChange={(event, value) => setObjetivo(value?.Objetivo as string)}
                isOptionEqualToValue={(option, value) => option.Id === value.Id}
              />
            </FormControl>

            <FormControl required sx={{ width: "20vw", mt: "4vh" }}>
            <Autocomplete
                disablePortal
                sx={{}}
                options={catalogoEstrategias}
                getOptionLabel={(option) => option.Estrategia}
                renderInput={(params) => <TextField {...params} label={estrategia} placeholder="Estrategia" ></TextField>}
                onChange={(event, value) => setEstrategia(value?.Estrategia as string)}
                isOptionEqualToValue={(option, value) => option.Id === value.Id}
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
                disablePortal
                disableCloseOnSelect
                // inputValue={lineaDeAccion}
                limitTags={4}
                options={catalogoLineasDeAccion}
                getOptionLabel={(option) => option.LineaDeAccion}
                renderInput={(params) => (
                  <TextField {...params} label="Lineas de Acción" />
                )}
                onChange={(event, value) => setLineaDeAccion(value)}
                isOptionEqualToValue={(option, value) => option.Id === value.Id}
              />
            </FormControl>

            <FormControl required sx={{ width: "20vw" }}>
            <Autocomplete
                disablePortal
                sx={{}}
                options={catalogoBeneficiarios}
                getOptionLabel={(option) => option.Beneficiario}
                renderInput={(params) => <TextField {...params} label={beneficiario} placeholder="Beneficiario" ></TextField>}
                onChange={(event, value) => setBeneficiario(value?.Beneficiario as string)}
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
