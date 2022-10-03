import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Alert,
  Select,
  MenuItem,
  Button,
  AlertColor,
  Typography,
  DialogActions,
  Autocomplete,
  TextField,
} from "@mui/material";

export const PED = ({handleClose} : {handleClose : Function}) => {
  const [eje, setEje] = useState("0");
  const [tematica, setTematica] = useState("0");
  const [objetivo, setObjetivo] = useState("0");
  const [estrategia, setEstrategia] = useState("0");
  const [ejesPND, setEjesPND] = useState([
    {
      Id: "",
      EjePND: "",
    },
  ]);

  const [lineasDeAccion, setLineasDeAccion] = useState([
    {
      Id: "",
      LineaDeAccion: "",
    },
  ]);

  const [objetivosDs, setObjetivosDs] = useState([
    {
      Id: "",
      ObjetivoDS: "",
    },
  ]);

  const [metasODs, setMetasODs] = useState([
    {
      Id: "",
      MetaODS: "",
    },
  ]);

  const [objetivosPEENL, setObjetivosPEENL] = useState([
    {
      Id: "",
      ObjetivoPEENL: "",
    },
  ]);


  const getEje = () => {
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
  const getTematica = () => {
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
  const getObjetivo = () => {
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
  const getEstrategia = () => {
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
  const getLineaDeAccion = () => {
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
  const getObjetivoDS = () => {
    axios
      .get("http://10.200.4.105:8000/api/objetivosDS", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setCatalogoObjetivosDS(r.data.data);
      });
  };
  const getMetaODS = () => {
    axios
      .get("http://10.200.4.105:8000/api/metasODS", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setCatalogoMetasODS(r.data.data);
      });
  };
  const getEjePND = () => {
    axios
      .get("http://10.200.4.105:8000/api/ejesPND", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setCatalogoEjesPND(r.data.data);
      });
  };
  const getObjetivoPEENL = () => {
    axios
      .get("http://10.200.4.105:8000/api/objetivosPEENL", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setCatalogoObjetivosPEENL(r.data.data);
      });
  };

  const postPED = () => {
    axios
      .post(
        "http://10.200.4.202:8000/api/ped-add",
        {
          IdEje: eje,
          IdTematicas: tematica,
          IdObjetivos: objetivo,
          IdEstrategias: estrategia,
          IdLineasDeAccion: lineasDeAccion,
          IdObjetivosDS: objetivosDs,
          IdMetasODS: metasODs,
          IdEjePND: ejesPND,
          IdObjetivosPEENL: objetivosPEENL,
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        
        if(r.status === 200){
          setErrorsForm({
            visible: true,
            text: "!PED creado con éxito!",
            type: "success",
          });
          handleClose()
        }
        
      })
      .catch((err) => {
        setErrorsForm({
          visible: true,
          text: err.response.data.error,
          type: "error",
        });
      });
  };

  useEffect(() => {
    getEje();
    getTematica();
    getObjetivo();
    getEstrategia();
    getLineaDeAccion();
    getObjetivoDS();
    getMetaODS();
    getEjePND();
    getObjetivoPEENL();
  }, []);

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
  const [catalogoObjetivosDS, setCatalogoObjetivosDS] = useState([
    { Id: "", ObjetivoDS: "" },
  ]);
  const [catalogoMetasODS, setCatalogoMetasODS] = useState([
    { Id: "", MetaODS: "" },
  ]);
  const [catalogoEjesPND, setCatalogoEjesPND] = useState([
    { Id: "", EjePND: "" },
  ]);
  const [catalogoObjetivosPEENL, setCatalogoObjetivosPEENL] = useState([
    { Id: "", ObjetivoPEENL: "" },
  ]);

  const [errorForm, setErrorsForm] = useState({
    visible: false,
    text: "",
    type: "",
  });

  const AlertForm = () => {
    return (
      <Box sx={{ mt: "1vh", mb: "2vh" }}>
        <Alert severity={errorForm.type as AlertColor}>{errorForm.text}</Alert>
      </Box>
    );
  };

  const checkForm = () => {
    setErrorsForm({
      visible: false,
      text: "",
      type: "",
    });

    if (eje === "0") {
      setErrorsForm({
        visible: true,
        text: "Selecciona eje.",
        type: "error",
      });
    } else if (tematica === "0") {
      setErrorsForm({
        visible: true,
        text: "Selecciona tematica.",
        type: "error",
      });
    } else if (objetivo === "0") {
      setErrorsForm({
        visible: true,
        text: "Selecciona objetivo.",
        type: "error",
      });
    } else if (estrategia === "0") {
      setErrorsForm({
        visible: true,
        text: "Selecciona estrategia.",
        type: "error",
      });
    } else if (lineasDeAccion[0].Id === "") {
      setErrorsForm({
        visible: true,
        text: "Selecciona linea de acción.",
        type: "error",
      });
    } else if (objetivosDs[0].Id === "") {
      setErrorsForm({
        visible: true,
        text: "Selecciona objetivo DS.",
        type: "error",
      });
    } else if (metasODs[0].Id === "") {
      setErrorsForm({
        visible: true,
        text: "Selecciona meta ODS.",
        type: "error",
      });
    } else if (ejesPND[0].Id === "") {
      setErrorsForm({
        visible: true,
        text: "Selecciona ejePND.",
        type: "error",
      });
    } else if (objetivosPEENL[0].Id === "") {
      setErrorsForm({
        visible: true,
        text: "Selecciona objetivoPEENL.",
        type: "error",
      });
    } else {
      postPED();
    }
  };



  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        {errorForm.visible ? (
          <AlertForm />
        ) : (
          <Typography
            sx={{
              m: "2vh",
              width: "20vw",
              fontFamily: "Montserrat",
              fontSize: "1vw",
            }}
          >
            Seleccione elementos
          </Typography>
        )}

        <Autocomplete
          disablePortal
          sx={{ m: "1vh 1vh 0 1vh" }}
          options={catalogoEjes}
          getOptionLabel={(option) => option.Eje}
          renderInput={(params) => <TextField {...params} label="Eje" />}
          onChange={(event, value) => setEje(value?.Id as string)}
          isOptionEqualToValue={(option, value) => option.Id === value.Id}

        />

        <Autocomplete
          disablePortal
          sx={{ m: "1vh 1vh 0 1vh" }}
          options={catalogoTematicas}
          getOptionLabel={(option) => option.Tematica}
          renderInput={(params) => <TextField {...params} label="Tematica" />}
          onChange={(event, value) => setTematica(value?.Id as string)}
          isOptionEqualToValue={(option, value) => option.Id === value.Id}

        />

        <Autocomplete
          disablePortal
          sx={{ m: "1vh 1vh 0 1vh" }}
          options={catalogoObjetivos}
          getOptionLabel={(option) => option.Objetivo}
          renderInput={(params) => <TextField {...params} label="Objetivo" />}
          onChange={(event, value) => setObjetivo(value?.Id as string)}
          isOptionEqualToValue={(option, value) => option.Id === value.Id}

        />

        <Autocomplete
          disablePortal
          sx={{ m: "1vh 1vh 0 1vh" }}
          options={catalogoEstrategias}
          getOptionLabel={(option) => option.Estrategia}
          renderInput={(params) => <TextField {...params} label="Estrategia" />}
          onChange={(event, value) => setEstrategia(value?.Id as string)}
          isOptionEqualToValue={(option, value) => option.Id === value.Id}

        />

        <Autocomplete
          multiple
          disablePortal
          sx={{ m: "1vh 1vh 0 1vh" }}
          options={catalogoLineasDeAccion}
          getOptionLabel={(option) => option.LineaDeAccion}
          renderInput={(params) => (
            <TextField {...params} label="Linea de Acción" />
          )}
          onChange={(event, value) => setLineasDeAccion(value)}
          isOptionEqualToValue={(option, value) => option.Id === value.Id}
        />

        <Autocomplete
          multiple
          disablePortal
          sx={{ m: "1vh 1vh 0 1vh" }}
          options={catalogoObjetivosDS}
          getOptionLabel={(option) => option.ObjetivoDS}
          renderInput={(params) => (
            <TextField {...params} label="Objetivo DS" />
          )}
          onChange={(event, value) => setObjetivosDs(value)}
          isOptionEqualToValue={(option, value) => option.Id === value.Id}
        />

        <Autocomplete
          multiple
          disablePortal
          sx={{ m: "1vh 1vh 0 1vh" }}
          options={catalogoMetasODS}
          getOptionLabel={(option) => option.MetaODS}
          renderInput={(params) => <TextField {...params} label="Meta ODS" />}
          onChange={(event, value) => setMetasODs(value)}
          isOptionEqualToValue={(option, value) => option.Id === value.Id}
        />

 
        
<Autocomplete
          multiple
          disablePortal
          sx={{ m: "1vh 1vh 0 1vh" }}
          options={catalogoEjesPND}
          getOptionLabel={(option) => option.EjePND}
          renderInput={(params) => <TextField {...params} label="Eje PND" />}        
          onChange={(event, value) => setEjesPND(value)}
          isOptionEqualToValue={(option, value) => option.Id === value.Id}
        />

<Autocomplete
          multiple
          disablePortal
          sx={{ m: "1vh 1vh 0 1vh" }}
          options={catalogoObjetivosPEENL}
          getOptionLabel={(option) => option.ObjetivoPEENL}
          renderInput={(params) => (
            <TextField {...params} label="Objetivo PEENL" />
          )}          
          onChange={(event, value) => setObjetivosPEENL(value)}
          isOptionEqualToValue={(option, value) => option.Id === value.Id}
        />

        
      </Box>
      <Box sx={{ mt: "3vh", mb: "2vh", textAlign: "end" }}>
        <DialogActions>
          <Button
            sx={{
              position: "absolute",
              backgroundColor: "#15212f",
              color: "#fff",
            }}
            onClick={checkForm}
          >
            Agregar
          </Button>
        </DialogActions>
      </Box>
    </Box>
  );
};
