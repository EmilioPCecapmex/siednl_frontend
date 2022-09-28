import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Dialog from "@mui/material/Dialog";
import {
  Box,
  Alert,
  Select,
  MenuItem,
  Button,
  AlertColor,
  Typography,
  DialogActions
} from "@mui/material";

export const PED = () => {
  const [eje, setEje] = useState("0");
  const [tematica, setTematica] = useState("0");
  const [objetivo, setObjetivo] = useState("0");
  const [estrategia, setEstrategia] = useState("0");
  const [lineaDeAccion, setLineaDeAccion] = useState("0");
  const [objetivoDS, setObjetivoDS] = useState("0");
  const [metaODS, setMetaODS] = useState("0");
  const [ejePND, setEjePND] = useState("0");
  const [objetivoPEENL, setObjetivoPEENL] = useState("0");

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
        "http://10.200.4.105:8000/api/ped-add",
        {
          IdEje: eje,
          IdTematicas: tematica,
          IdObjetivos: objetivo,
          IdEstrategias: estrategia,
          IdLineasDeAccion: lineaDeAccion,
          IdObjetivosDS: objetivoDS,
          IdMetasODS: metaODS,
          IdEjePND: ejePND,
          IdObjetivosPEENL: objetivoPEENL,
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        // Swal.fire({
        //   position: "top-end",
        //   icon: "success",
        //   title: "!PED creado con éxito!",
        //   showConfirmButton: false,
        //   timer: 1500,
        // });
        setErrorsForm({
          visible: true,
          text: "!PED creado con éxito!",
          type: "success",
        });
      })
      .catch((err) => {
        setErrorsForm({
          visible: true,
          text: err.response.data.result.error,
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
    } else if (lineaDeAccion === "0") {
      setErrorsForm({
        visible: true,
        text: "Selecciona lineaDeAccion.",
        type: "error",
      });
    } else if (objetivoDS === "0") {
      setErrorsForm({
        visible: true,
        text: "Selecciona objetivoDS.",
        type: "error",
      });
    } else if (metaODS === "0") {
      setErrorsForm({
        visible: true,
        text: "Selecciona metaODS.",
        type: "error",
      });
    } else if (ejePND === "0") {
      setErrorsForm({
        visible: true,
        text: "Selecciona ejePND.",
        type: "error",
      });
    } else if (objetivoPEENL === "0") {
      setErrorsForm({
        visible: true,
        text: "Selecciona objetivoPEENL.",
        type: "error",
      });
    } else {
      postPED();
    }
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

        <Select
          sx={{ m: "1vh 1vh 0 1vh" }}
          value={eje}
          onChange={(x) => setEje(x.target.value)}
        >
          <MenuItem value={"0"} key={0} disabled>
            Selecciona Eje
          </MenuItem>
          {catalogoEjes.map((item) => {
            return (
              <MenuItem value={item.Id} key={item.Id}>
                {item.Eje}
              </MenuItem>
            );
          })}
        </Select>

        <Select
          sx={{ m: "1vh 1vh 0 1vh" }}
          value={tematica}
          onChange={(x) => setTematica(x.target.value)}
        >
          <MenuItem value={"0"} key={0} disabled>
            Selecciona Tematica
          </MenuItem>
          {catalogoTematicas.map((item) => {
            return (
              <MenuItem value={item.Id} key={item.Id}>
                {item.Tematica}
              </MenuItem>
            );
          })}
        </Select>

        <Select
          sx={{ m: "1vh 1vh 0 1vh" }}
          value={objetivo}
          onChange={(x) => setObjetivo(x.target.value)}
        >
          <MenuItem value={"0"} key={0} disabled>
            Selecciona Objetivo
          </MenuItem>
          {catalogoObjetivos.map((item) => {
            return (
              <MenuItem value={item.Id} key={item.Id}>
                {item.Objetivo}
              </MenuItem>
            );
          })}
        </Select>

        <Select
          sx={{ m: "1vh 1vh 0 1vh" }}
          value={estrategia}
          onChange={(x) => setEstrategia(x.target.value)}
        >
          <MenuItem value={"0"} key={0} disabled>
            Selecciona Estrategia
          </MenuItem>
          {catalogoEstrategias.map((item) => {
            return (
              <MenuItem value={item.Id} key={item.Id}>
                {item.Estrategia}
              </MenuItem>
            );
          })}
        </Select>

        <Select
          sx={{ m: "1vh 1vh 0 1vh" }}
          value={lineaDeAccion}
          onChange={(x) => setLineaDeAccion(x.target.value)}
        >
          <MenuItem value={"0"} key={0} disabled>
            Selecciona Linea de Accion
          </MenuItem>
          {catalogoLineasDeAccion.map((item) => {
            return (
              <MenuItem value={item.Id} key={item.Id}>
                {item.LineaDeAccion}
              </MenuItem>
            );
          })}
        </Select>

        <Select
          sx={{ m: "1vh 1vh 0 1vh" }}
          value={objetivoDS}
          onChange={(x) => setObjetivoDS(x.target.value)}
        >
          <MenuItem value={"0"} key={0} disabled>
            Selecciona Objetivo DS
          </MenuItem>
          {catalogoObjetivosDS.map((item) => {
            return (
              <MenuItem value={item.Id} key={item.Id}>
                {item.ObjetivoDS}
              </MenuItem>
            );
          })}
        </Select>

        <Select
          sx={{ m: "1vh 1vh 0 1vh" }}
          value={metaODS}
          onChange={(x) => setMetaODS(x.target.value)}
        >
          <MenuItem value={"0"} key={0} disabled>
            Selecciona Meta ODS
          </MenuItem>
          {catalogoMetasODS.map((item) => {
            return (
              <MenuItem value={item.Id} key={item.Id}>
                {item.MetaODS}
              </MenuItem>
            );
          })}
        </Select>

        <Select
          sx={{ m: "1vh 1vh 0 1vh" }}
          value={ejePND}
          onChange={(x) => setEjePND(x.target.value)}
        >
          <MenuItem value={"0"} key={0} disabled>
            Selecciona Eje PND
          </MenuItem>
          {catalogoEjesPND.map((item) => {
            return (
              <MenuItem value={item.Id} key={item.Id}>
                {item.EjePND}
              </MenuItem>
            );
          })}
        </Select>

        <Select
          sx={{ m: "1vh 1vh 0 1vh" }}
          value={objetivoPEENL}
          onChange={(x) => setObjetivoPEENL(x.target.value)}
        >
          <MenuItem value={"0"} key={0} disabled>
            Selecciona Objetivo PEENL
          </MenuItem>
          {catalogoObjetivosPEENL.map((item) => {
            return (
              <MenuItem value={item.Id} key={item.Id}>
                {item.ObjetivoPEENL}
              </MenuItem>
            );
          })}
        </Select>
      </Box>
      <Box sx={{ mt:'3vh', mb:"1vh", textAlign: "end" }}>
      <DialogActions onClick={handleClose}>

            <Button sx={{position:'absolute', backgroundColor:'lightGreen', color:'black'}} onClick={checkForm}> Agregar </Button>

      </DialogActions>
      </Box>
    </Box>
    
  );
};
