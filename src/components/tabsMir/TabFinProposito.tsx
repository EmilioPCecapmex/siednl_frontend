import React, { useEffect, useState } from "react";
import {
  FormControl,
  TextField,
  Box,
  Typography,
  IconButton,
  Autocomplete,
  List,
  ListItemButton,
  Divider,
} from "@mui/material";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { fontFamily } from "@mui/system";

export function TabFinProposito({
  show,
  resumenFin,
  resumenProposito,
  cargaFin,
  cargaProposito,
}: {
  show: boolean;
  resumenFin: Function;
  resumenProposito: Function;
  cargaFin: Array<IFin>;
  cargaProposito: Array<IProposito>;
}) {
  const [tabFin, setTabFin] = useState([
    {
      resumen: "",
      indicador: "",
      formula: "",
      frecuencia: "",
      medios: "",
      supuestos: "",
    },
  ]);

  const [tabProposito, setTabProposito] = useState([
    {
      resumen: "",
      indicador: "",
      formula: "",
      frecuencia: "",
      medios: "",
      supuestos: "",
    },
  ]);

  const [fin, setFin] = useState({
    resumen: "",
    indicador: "",
    formula: "",
    frecuencia: "",
    medios: "",
    supuestos: "",
  });

  const [proposito, setProposito] = useState({
    resumen: "",
    indicador: "",
    formula: "",
    frecuencia: "",
    medios: "",
    supuestos: "",
  });

  const [showFin, setShowFin] = useState(false);
  const [showProposito, setShowProposito] = useState(false);

  const [indicador, setIndicador] = useState<Array<IIndicadores>>([]);

  const [frecuencias, setFrecuencias] = useState<Array<IFrecuencias>>([]);

  const getIndicadores = () => {
    axios
      .get("http://10.200.4.105:8000/api/tipoDeIndicador", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          setIndicador(r.data.data);
        }
      });
  };

  useEffect(() => {
    getIndicadores();
    getFrecuencias();
  }, []);

  const [errorIndicador, setErrorIndicador] = useState("");

  const evalueTxtindicador = (v: string) => {
    const findicador = fin.indicador.toLowerCase();
    const pindicador = proposito.indicador.toLowerCase();

    if (
      findicador.includes("porcentaje") ||
      findicador.includes("tasa") ||
      findicador.includes("indice" || "índice") ||
      findicador.includes("promedio")
    ) {
      setErrorIndicador("");
    } else if (
      pindicador.includes("porcentaje") ||
      pindicador.includes("tasa") ||
      pindicador.includes("indice" || "índice") ||
      pindicador.includes("promedio")
    ) {
      setErrorIndicador("");
    } else {
      setErrorIndicador(v);
    }
  };

  useEffect(() => {
    setTabFin([
      {
        resumen: fin.resumen,
        indicador: fin.indicador,
        formula: fin.formula,
        frecuencia: fin.frecuencia,
        medios: fin.medios,
        supuestos: fin.supuestos,
      },
    ]);
    setTabProposito([
      {
        resumen: proposito.resumen,
        indicador: proposito.indicador,
        formula: proposito.formula,
        frecuencia: proposito.frecuencia,
        medios: proposito.medios,
        supuestos: proposito.supuestos,
      },
    ]);
  }, [fin, proposito]);

  useEffect(() => {
    setFin({
      resumen: cargaFin[0]?.resumen,
      indicador: cargaFin[0]?.indicador,
      formula: cargaFin[0]?.formula,
      frecuencia: cargaFin[0]?.frecuencia,
      medios: cargaFin[0]?.medios,
      supuestos: cargaFin[0]?.supuestos,
    });
    setProposito({
      resumen: cargaProposito[0]?.resumen,
      indicador: cargaProposito[0]?.indicador,
      formula: cargaProposito[0]?.formula,
      frecuencia: cargaProposito[0]?.frecuencia,
      medios: cargaProposito[0]?.medios,
      supuestos: cargaProposito[0]?.supuestos,
    });
  }, [cargaFin, cargaProposito]);

  useEffect(() => {
    resumenFin(tabFin);
    resumenProposito(tabProposito);
  }, [tabFin, tabProposito]);

  const getFrecuencias = () => {
    axios
      .get("http://10.200.4.105:8000/api/frecuencias", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          setFrecuencias(r.data.data);
        }
      });
  };

  return (
    <Box
      visibility={show ? "visible" : "hidden"}
      position="absolute"
      sx={{
        display: "flex",
        width: "75vw",
        height: "77vh",
        boxShadow: 10,
        borderRadius: 5,
        flexDirection: "column",
        backgroundColor: "#fff",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <List
          sx={{
            padding: 0,
            width: "10vw",
            height: "65vh",
            borderRight: "solid",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            borderColor: "#BCBCBC",
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
          <Box
            sx={{
              height: "35vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Divider />
            <ListItemButton
              selected={showFin}
              onClick={() => {
                setShowFin(!showFin);
                setShowProposito(false);
              }}
              sx={{
                "&.Mui-selected ": {
                  backgroundColor: "#c4a57b",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "#cbcbcb",
                },
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                Fin
              </Typography>
            </ListItemButton>

            <Divider />

            <ListItemButton
              selected={showProposito}
              onClick={() => {
                setShowProposito(!showProposito);
                setShowFin(false);
              }}
              sx={{
                "&.Mui-selected ": {
                  backgroundColor: "#c4a57b",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "#cbcbcb",
                },
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                Proposito
              </Typography>
            </ListItemButton>
            <Divider />
          </Box>
        </List>

        {showFin ? (
          <>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                width: "80%",
                height: "50vh",
                alignItems: "center",
                justifyItems: "center",
              }}
            >
              <TextField
                rows={4}
                multiline
                sx={{ width: "90%", boxShadow: 4 }}
                variant={"filled"}
                label={"Resumen Narrativo"}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                  },
                }}
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
                onChange={(c) => {
                  setFin({ ...fin, resumen: c.target.value });
                }}
                value={fin.resumen}
              />
              <TextField
                rows={4}
                multiline
                sx={{ width: "90%", boxShadow: 4 }}
                variant="filled"
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                  },
                }}
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
                onBlur={() =>
                  fin.indicador === "" ? null : evalueTxtindicador("fin")
                }
                label={"Indicador"}
                error={errorIndicador === "fin" ? true : false}
                helperText={
                  errorIndicador
                    ? "Incluir tipo de indicador: Porcentaje, Tasa, Indice ó Promedio. "
                    : null
                }
                onChange={(c) => {
                  setFin({ ...fin, indicador: c.target.value });
                }}
                value={fin.indicador}
              />
              <TextField
                rows={4}
                multiline
                variant="filled"
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                  },
                }}
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
                sx={{ width: "90%", boxShadow: 4 }}
                label={"Fórmula"}
                onChange={(c) => {
                  setFin({ ...fin, formula: c.target.value });
                }}
                value={fin.formula}
              />

              <Autocomplete
                disablePortal
                sx={{ width: "90%", boxShadow: 4 }}
                options={frecuencias}
                renderOption={(props, option) => {
                  if (
                    option.Frecuencia === "Anual" ||
                    option.Frecuencia === "Bienal"
                  ) {
                    return (
                      <li {...props} key={option.Id}>
                        <p
                          style={{
                            fontFamily: "MontserratRegular",
                            fontSize: ".7vw",
                          }}
                        >
                          {option.Frecuencia}
                        </p>
                      </li>
                    );
                  }
                }}
                getOptionLabel={(option) => option.Frecuencia}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    InputLabelProps={{
                      style: {
                        fontFamily: "MontserratSemiBold",
                      },
                    }}
                    inputProps={{
                      ...params.inputProps,
                      style: { fontFamily: "MontserratRegular" },
                    }}
                    variant="filled"
                    rows={3.6}
                    multiline
                    label="Frecuencias"
                  />
                )}
                onChange={(event, value) =>
                  setFin({ ...fin, frecuencia: value?.Frecuencia as string })
                }
                
                // value={fin.frecuencia}
              />

              <TextField
                rows={4}
                multiline
                variant="filled"
                sx={{ width: "90%", boxShadow: 4 }}
                label={"Medios de Verificación"}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                  },
                }}
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
                onChange={(c) => {
                  setFin({ ...fin, medios: c.target.value });
                }}
                value={fin.medios}
              />
              <TextField
                rows={4}
                multiline
                variant="filled"
                sx={{ width: "90%", boxShadow: 4 }}
                label={"Supuestos"}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                  },
                }}
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
                onChange={(c) => {
                  setFin({ ...fin, supuestos: c.target.value });
                }}
                value={fin.supuestos}
              />
            </Box>
          </>
        ) : null}

        {showProposito ? (
          <>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                width: "80%",
                height: "50vh",
                alignItems: "center",
                justifyItems: "center",
              }}
            >
              <TextField
                rows={4}
                multiline
                variant="filled"
                sx={{ width: "90%", boxShadow: 4 }}
                label={"Resumen Narrativo"}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                  },
                }}
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
                onChange={(c) => {
                  setProposito({ ...proposito, resumen: c.target.value });
                }}
                value={proposito.resumen}
              />

              <TextField
                rows={4}
                multiline
                sx={{ width: "90%", boxShadow: 4 }}
                variant="filled"
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                  },
                }}
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
                onBlur={() =>
                  proposito.indicador === ""
                    ? null
                    : evalueTxtindicador("proposito")
                }
                label={"Indicador"}
                error={errorIndicador === "proposito" ? true : false}
                helperText={
                  errorIndicador
                    ? "Incluir tipo de indicador: Porcentaje, Tasa, Indice ó Promedio. "
                    : null
                }
                onChange={(c) => {
                  setProposito({ ...proposito, indicador: c.target.value });
                }}
                value={proposito.indicador}
              />

              <TextField
                rows={4}
                multiline
                variant="filled"
                sx={{ width: "90%", boxShadow: 4 }}
                label={"Fórmula"}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                  },
                }}
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
                onChange={(c) => {
                  setProposito({ ...proposito, formula: c.target.value });
                }}
                value={proposito.formula}
              />
              <TextField
                rows={4}
                multiline
                variant="filled"
                sx={{ width: "90%", boxShadow: 4 }}
                label={"Frecuencia"}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                  },
                }}
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
                onChange={(c) => {
                  setProposito({ ...proposito, frecuencia: c.target.value });
                }}
                value={proposito.frecuencia}
              />
              <TextField
                rows={4}
                multiline
                variant="filled"
                sx={{ width: "90%", boxShadow: 4 }}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                  },
                }}
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
                label={"Medios de Verificación"}
                onChange={(c) => {
                  setProposito({ ...proposito, medios: c.target.value });
                }}
                value={proposito.medios}
              />
              <TextField
                rows={4}
                multiline
                variant="filled"
                sx={{ width: "90%", boxShadow: 4 }}
                label={"Supuestos"}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratSemiBold",
                  },
                }}
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
                onChange={(c) => {
                  setProposito({ ...proposito, supuestos: c.target.value });
                }}
                value={proposito.supuestos}
              />
            </Box>
          </>
        ) : null}
      </Box>
    </Box>
  );
}

export default TabFinProposito;

export interface IIndicadores {
  Id: string;
  TipoDeIndicador: string;
  FechaCreacion: string;
  CreadoPor: string;
  UltimaModificacion: string;
  ModificadoPor: string;
  Deleted: number;
}

export interface IFrecuencias {
  Id: string;
  Frecuencia: string;
  FechaCreacion: string;
  CreadoPor: string;
  UltimaModificacion: string;
  ModificadoPor: string;
  Deleted: number;
}

export interface IFin {
  resumen: string;
  indicador: string;
  formula: string;
  frecuencia: string;
  medios: string;
  supuestos: string;
}
export interface IProposito {
  resumen: string;
  indicador: string;
  formula: string;
  frecuencia: string;
  medios: string;
  supuestos: string;
}
