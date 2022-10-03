import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
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

export default function FullModalMir() {
  const [value, setValue] = React.useState(10);

  const [nombreArchivo, setNombreArchivo] = useState(
    "Arrastre o seleccione para cargar archivo"
  );

  const [institution, setInstitution] = useState("0");
  const [programa, setPrograma] = useState("0");
  const [eje, setEje] = useState("0");
  const [tematica, setTematica] = useState("0");
  const [objetivo, setObjetivo] = useState("0");
  const [estrategia, setEstrategia] = useState("0");
  const [lineaDeAccion, setLineaDeAccion] = useState([
    {
      Id: "",
      LineaDeAccion: "",
    },
  ]);
  const [beneficiario, setBeneficiario] = useState("0");

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
              alignItems: "top",
              justifyItems: "center",
              backgroundColor: "#fff",
              borderRadius: 5,
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",

              gridTemplateRows: "repeat(4, 1fr)",
            }}
          >
            <FormControl
              sx={{ gridRow: "1", width: "20vw", height: "5vh", mt: "8vh" }}
            >
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
              sx={[
                {
                  border: "5px dotted #ccc",
                  display: "flex",
                  flexDirection:'column',
                  justifyContent:'center',
                  mt: "5vh",
                  cursor: "pointer",
                  height:'10vh',
                  width:'15vw',
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
                onChange={() => setNombreArchivo(" ")}
                id="file-upload"
                type="file"

                sx={{ border: "5px dotted #ccc"}}
              />
            </InputLabel>

            <FormControl
              sx={{ gridRow: "2", width: "20vw", height: "15vh", mt: "4vh" }}
            >
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

            <FormControl
              sx={{ gridRow: "2", width: "20vw", height: "15vh", mt: "4vh" }}
            >
              <InputLabel id="demo-simple-select-label">
                Nombre del Programa
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={programa}
                label="Nombre del Programa"
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

            <FormControl
              sx={{ gridRow: "2", width: "20vw", height: "15vh", mt: "4vh" }}
            >
              <Autocomplete
                disablePortal
                sx={{}}
                options={catalogoEjes}
                getOptionLabel={(option) => option.Eje}
                renderInput={(params) => <TextField {...params} label="Eje" />}
                onChange={(event, value) => setEje(value?.Id as string)}
                isOptionEqualToValue={(option, value) => option.Id === value.Id}
              />
            </FormControl>

            <FormControl sx={{ gridRow: "3", width: "20vw", height: "15vh" }}>
              <Autocomplete
                disablePortal
                sx={{}}
                options={catalogoTematicas}
                getOptionLabel={(option) => option.Tematica}
                renderInput={(params) => (
                  <TextField {...params} label="Temática" />
                )}
                onChange={(event, value) => setTematica(value?.Id as string)}
                isOptionEqualToValue={(option, value) => option.Id === value.Id}
              />
            </FormControl>

            <FormControl sx={{ gridRow: "3", width: "20vw", height: "15vh" }}>
              <Autocomplete
                disablePortal
                sx={{}}
                options={catalogoObjetivos}
                getOptionLabel={(option) => option.Objetivo}
                renderInput={(params) => (
                  <TextField {...params} label="Objetivo" />
                )}
                onChange={(event, value) => setObjetivo(value?.Id as string)}
                isOptionEqualToValue={(option, value) => option.Id === value.Id}
              />
            </FormControl>

            <FormControl sx={{ gridRow: "3", width: "20vw", height: "15vh" }}>
              <Autocomplete
                disablePortal
                sx={{}}
                options={catalogoEstrategias}
                getOptionLabel={(option) => option.Estrategia}
                renderInput={(params) => (
                  <TextField {...params} label="Estrategia" />
                )}
                onChange={(event, value) => setEstrategia(value?.Id as string)}
                isOptionEqualToValue={(option, value) => option.Id === value.Id}
              />
            </FormControl>

            <FormControl
            
              sx={{
                gridColumnStart:'1',
                gridColumnEnd:'3',
                gridRow: "4",
                width: "35vw",
              }}
            >
              <Autocomplete
                multiple
                disablePortal
                sx={{}}
                
                options={catalogoLineasDeAccion}
                getOptionLabel={(option) => option.LineaDeAccion}
                renderInput={(params) => (
                  <TextField {...params} label="Lineas de Acción" />
                )}
                onChange={(event, value) => setLineaDeAccion(value)}
                isOptionEqualToValue={(option, value) => option.Id === value.Id}
              />
            </FormControl>

            <FormControl sx={{gridColumn:'3', gridRow: "4", width: "20vw", height: "15vh" }}>
              <Autocomplete
                disablePortal
                sx={{}}
                options={catalogoBeneficiarios}
                getOptionLabel={(option) => option.Beneficiario}
                renderInput={(params) => (
                  <TextField {...params} label="Beneficiario" />
                )}
                onChange={(event, value) =>
                  setBeneficiario(value?.Id as string)
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
              gridTemplateRows: "1fr 3fr 3fr 1fr 3fr 3fr",
            }}
          >
            <Typography
              sx={{
                gridRow: "1",
                width: "20vw",
                fontFamily: "MontserratBold",
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
            <Typography
              sx={{ gridRow: "4", width: "20vw", fontFamily: "MontserratBold" }}
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
              sx={{ gridRow: "5", width: "20vw" }}
            />
            <TextField
              multiline
              rows={4}
              required
              id="outlined-basic"
              label="Indicador"
              variant="outlined"
              sx={{ gridRow: "5", width: "20vw" }}
            />
            <TextField
              multiline
              rows={4}
              required
              id="outlined-basic"
              label="Fórmula"
              variant="outlined"
              sx={{ gridRow: "5", width: "20vw" }}
            />
            <TextField
              multiline
              rows={4}
              required
              id="outlined-basic"
              label="Frecuencia"
              variant="outlined"
              sx={{ gridRow: "6", width: "20vw" }}
            />
            <TextField
              multiline
              rows={4}
              required
              id="outlined-basic"
              label="Medios de verificación y fuente de información"
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

        {value === 30 ? (
          <Box
            sx={{ backgroundColor: "brown", with: "100vw", height: "80vh" }}
          ></Box>
        ) : null}
        {value === 40 ? (
          <Box
            sx={{ backgroundColor: "red", with: "100vw", height: "80vh" }}
          ></Box>
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
