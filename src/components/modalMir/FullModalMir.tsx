import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

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
import { hover } from "@testing-library/user-event/dist/hover";

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
  const [componentesActivos, setComponentesActivos] = React.useState(2);
    
  const incrementaComponente = () => {
    if (componentesActivos < 6){
      setComponentesActivos((componentesActivos + 1));
      numeroComponentes[componentesActivos].visible = true;
      console.log(componentesActivos)
    } else {
      console.log("excedido")
    }
    
    
  };

  const eliminaComponente = () => {
    if (componentesActivos >= 2){
      numeroComponentes[componentesActivos].visible = false;
      setComponentesActivos((componentesActivos - 1));
    }
    console.log(componentesActivos)
  };
  //________________________________
  const [value, setValue] = React.useState(10);

  const [nombreArchivo, setNombreArchivo] = useState('Arrastre o seleccione para cargar archivo');

  const [institution, setInstitution] = useState("0");
  const [programa, setPrograma] = useState("0");
  const [eje, setEje] = useState("0");

  const [catalogoInstituciones, setCatalogoInstituciones] = useState([
    { Id: "", NombreInstitucion: "" },
  ]);
  const [catalogoProgramas, setCatalogoProgramas] = useState([
    { Id: "", NombrePrograma: "" },
  ]);
  const [catalogoEjes, setCatalogoEjes] = useState([{ Id: "", Eje: "" }]);


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

  useEffect(() => {
    getInstituciones();
    getProgramas();
    getEjes();
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
          backgroundColor: "#dedbdb",
          borderRadius: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "black" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              label="Encabezado"
              value={10}
            // sx={{ backgroundColor: "yellow", borderRadius: 50 }}
            />
            <Tab label="Fin / Propósito" value={20} />
            <Tab label="Componentes" value={30} />
            <Tab label="Actividades" value={40} />
            <Tab label="Resumen" value={50} />
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
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",

              gridTemplateRows: "repeat(4, 1fr)",
            }}
          >
            <FormControl sx={{ gridRow: "1", width: "20vw", height: "5vh" }}>
              <InputLabel id="demo-simple-select-label">
                Ejercicio Fiscal
              </InputLabel>
              <Select
                required
                label="Ejercicio Fiscal"
                value="0"
                sx={{ width: "15vw" }}
              >
                <MenuItem value={"0"} key={0} disabled>
                  Seleccione Ejercicio Fiscal
                </MenuItem>
              </Select>
            </FormControl>

            <InputLabel
              id="file-upload"
              sx={[{
                border: "5px dotted #ccc",
                display: "inline-block",
                padding: "3vh 2vw",
                cursor: 'pointer',
              }, {
                "&:hover": {
                  color: "Blue",
                  border: "5px dotted blue",
                },
              },]}
            >
              {nombreArchivo}
              <Input
                id="file-upload"
                type="file"
                sx={{
                  position: "absolute",
                  width: "1px",
                  height: "1px",
                  padding: "0",
                  margin: "-1px",
                  border: "0"
                }}
              />
            </InputLabel>

            <FormControl sx={{ gridRow: "2", width: "20vw" }}>
              <InputLabel id="demo-simple-select-label">Institución</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={institution}
                label="Institución"
                onChange={(x) => setInstitution(x.target.value)}
                sx={{}}
              >
                <MenuItem value={"0"} key={0} disabled>
                  Institución
                </MenuItem>
                {catalogoInstituciones.map((item) => {
                  return (
                    <MenuItem value={item.Id} key={item.Id}>
                      {item.NombreInstitucion}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <FormControl sx={{ gridRow: "2", width: "20vw", height: "5vh" }}>
              <InputLabel id="demo-simple-select-label">Programa</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={programa}
                label="Programa"
                onChange={(x) => setPrograma(x.target.value)}
                sx={{}}
              >
                <MenuItem value={"0"} key={0} disabled>
                  Programa Presupuestario
                </MenuItem>
                {catalogoProgramas.map((item) => {
                  return (
                    <MenuItem value={item.Id} key={item.Id}>
                      {item.NombrePrograma}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <FormControl sx={{ gridRow: "2", width: "20vw", height: "5vh" }}>
              <InputLabel id="demo-simple-select-label">Eje</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={eje}
                label="Eje"
                onChange={(x) => setEje(x.target.value)}
                sx={{}}
              >
                <MenuItem value={"0"} key={0} disabled>
                  Eje
                </MenuItem>
                {catalogoEjes.map((item) => {
                  return (
                    <MenuItem value={item.Id} key={item.Id}>
                      {item.Eje}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <TextField
              multiline
              rows={4}
              required
              id="outlined-basic"
              label="1"
              variant="outlined"
              sx={{ gridRow: "3", width: "20vw" }}
            />
            <TextField
              multiline
              rows={4}
              required
              id="outlined-basic"
              label="1"
              variant="outlined"
              sx={{ gridRow: "3", width: "20vw" }}
            />
            <TextField
              multiline
              rows={4}
              required
              id="outlined-basic"
              label="1"
              variant="outlined"
              sx={{ gridRow: "3", width: "20vw" }}
            />
            <TextField
              multiline
              rows={4}
              required
              id="outlined-basic"
              label="1"
              variant="outlined"
              sx={{ gridRow: "4", width: "20vw" }}
            />
            <TextField
              multiline
              rows={4}
              required
              id="outlined-basic"
              label="1"
              variant="outlined"
              sx={{ gridRow: "4", width: "20vw" }}
            />
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
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "1fr 3fr 3fr 1fr 3fr 3fr",
            }}
          >
            <Typography sx={{ gridRow: "1", width: "20vw" }}>FIN</Typography>
            <TextField
              multiline
              rows={4}
              required
              id="outlined-basic"
              label="Resumen Narrativo"
              variant="outlined"
              sx={{ gridRow: "2", width: "20vw" }}
            />
            <TextField
              multiline
              rows={4}
              required
              id="outlined-basic"
              label="Indicador"
              variant="outlined"
              sx={{ gridRow: "2", width: "20vw" }}
            />
            <TextField
              multiline
              rows={4}
              required
              id="outlined-basic"
              label="Fórmula"
              variant="outlined"
              sx={{ gridRow: "2", width: "20vw" }}
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
            <Typography sx={{ gridRow: "4", width: "20vw" }}>
              PROPÓSITO
            </Typography>
            <TextField
              multiline
              rows={4}
              required
              id="outlined-basic"
              label="Supuestos"
              variant="outlined"
              sx={{ gridRow: "5", width: "20vw" }}
            />
            <TextField
              multiline
              rows={4}
              required
              id="outlined-basic"
              label="Supuestos"
              variant="outlined"
              sx={{ gridRow: "5", width: "20vw" }}
            />
            <TextField
              multiline
              rows={4}
              required
              id="outlined-basic"
              label="Supuestos"
              variant="outlined"
              sx={{ gridRow: "5", width: "20vw" }}
            />
            <TextField
              multiline
              rows={4}
              required
              id="outlined-basic"
              label="Supuestos"
              variant="outlined"
              sx={{ gridRow: "6", width: "20vw" }}
            />
            <TextField
              multiline
              rows={4}
              required
              id="outlined-basic"
              label="Supuestos"
              variant="outlined"
              sx={{ gridRow: "6", width: "20vw" }}
            />
            <TextField
              multiline
              rows={4}
              required
              id="outlined-basic"
              label="Supuestos"
              variant="outlined"
              sx={{ gridRow: "6", width: "20vw" }}
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
              <Accordion expanded={expanded === 'panel1'} onChange={handleChangeAcordion('panel1')}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >

                  <Typography sx={{ width: '33%', flexShrink: 0, justifyContent: "center" }}>
                    Componente
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gridTemplateRows: "3fr 1fr 3fr ",
                  }}>


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
