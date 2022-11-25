import {
  Box,
  Typography,
  Button,
  Checkbox,
  List,
  Divider,
  ListItemButton,
  TextField,
  FormControlLabel,
  Radio,
  Autocomplete,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Tooltip } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
export function TabFinPropositoFT() {
  //este expor necesita variables

  {
    /*----------Funcionalidad del texto escrito por el usuario----------*/
  }
  {
    /* Funcionalidad sacada de mir  */
  }
  const [fin, setFin] = useState({
    frecuencia: "",
    claridad: "",
    relevancia: "",
    economia: "",
    monitoreable: "",
    adecuado: "",
    aporte_marginal: "",
    dimension:"",
  });

  const [proposito, setProposito] = useState({
    frecuencia: "SELECCIÓN ESTRATEGICO",
    claridad: "NO",
    relevancia: "NO",
    economia: "NO",
    monitoreable: "NO",
    adecuado: "NO",
    aporte_marginal: "NA",
    dimension:"EFICIENCIA",
  });
  {
    /* Funcionalidad sacada de mir  */
  }
  const [showFin, setShowFin] = useState(true);
  const [showProposito, setShowProposito] = useState(false);
  const [checked, setChecked] = React.useState(true);

  const [showSeleccionEstrategica, setSeleccionEstrategica] = useState(true);
  const [showDeGestion, setShowDeGestion] = useState(false);

  const [tipodeIndicador, setTipoDeIndicador] = useState();
  const [dimension, setDimension] = useState();
  const [unidadDeMedida, setUnidadDeMedida] = useState();
  const [claridad, setClaridad] = useState();
  const [relevancia, setRelevancia] = useState();
  const [economia, setEconomia] = useState();
  const [montoreable, setMontoreable] = useState();
  const [adecuado, setAdecuado] = useState();
  const [aporteMarginal, setAporteMarginal] = useState();

  {
    /*Esto es un json de prueba*/
  }
  const top100Films = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
  ];
  {
    /*Esto es un json de prueba*/
  }

  {
    /*----------Funcionalidad del texto escrito por el usuario----------*/
  }

  {
    return (
      <Box
        sx={{
          display: "flex",
          width: "75vw",
          height: "75vh",
          boxShadow: 10,
          borderRadius: 5,
          flexDirection: "column",
          backgroundColor: "#fff",
        }}
      >
        {/* Aqui va un FormulaDialog */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            height: "7vh",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {/* Botones Componentes */}
          <Typography
            sx={{
              mr: "1vw",
              fontFamily: "MontserratSemiBold",
              fontSize: "1.2vw",
            }}
          >
            {showFin ? "FIN" : null}
            {showProposito ? "PROPÓSITO" : null}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
          }}
        >
          <List
            sx={{
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
                height: "10vh",
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
                <Typography
                  sx={{
                    fontFamily: "MontserratMedium",
                    textTransform: "uppercase",
                  }}
                >
                  Fin
                </Typography>
              </ListItemButton>
              <Divider />
            </Box>
            {/*--------------------------------Aqui esta el boton de Fin--------------------------*/}
            <Box
              sx={{
                height: "10vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
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
                <Typography
                  sx={{
                    fontFamily: "MontserratMedium",
                    textTransform: "uppercase",
                  }}
                >
                  Propósito
                </Typography>
              </ListItemButton>
              <Divider />
            </Box>
            {/*--------------------------------Aqui esta el boton de  proposito--------------------------*/}
          </List>
          {/*--------------------------------Aqui termina la lista y empieza el diseño de Fin--------------------------*/}
          {showFin ? (
            <>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  width: "90%",
                  alignItems: "center",
                  justifyItems: "center",
                }}
              >
                <FormControl
                  sx={{
                    width: "90%",
                    height: "60%",
                    boxShadow: 2,
                    fontFamily: "MontserratMedium",
                    justifyContent: "space-evenly",
                    backgroundColor: "#f0f0f0",
                    alignItems: "center",
                    justifyItems: "center",
                  }}
                >
                  <FormLabel>FRECUENCIA</FormLabel>
                  <Box
                    sx={{
                      width: "90%",
                      height: "60%",
                      backgroundColor: "#f0f0f0",
                      justifyItems: "center",
                      alignItems: "center",
                    }}
                  >
                    <FormControl
                      sx={{
                        width: "90%",
                        height: "60%",
                        backgroundColor: "#f0f0f0",
                        justifyItems: "center",
                        alignItems: "center",
                      }}
                    >
                      <FormControlLabel
                        value={"SELECCIÓN ESTRATEGICO"}
                        label={"SELECCIÓN ESTRATEGICO"}
                        sx={{
                          fontFamily: "MontserratMedium",
                        }}
                        control={
                          <Radio
                            checked={fin.frecuencia === "SELECCIÓN ESTRATEGICO"}
                            onChange={(c) => {
                              setFin({
                                ...fin,
                                frecuencia: c.target.value,
                              });
                            }}
                          />
                        }
                      />
                      <FormControlLabel
                        value={"DE GESTIÓN"}
                        label={"DE GESTIÓN"}
                        sx={{
                          fontFamily: "MontserratMedium",
                        }}
                        control={
                          <Radio
                            checked={fin.frecuencia === "DE GESTIÓN"}
                            onChange={(c) => {
                              setFin({
                                ...fin,
                                frecuencia: c.target.value,
                              });
                            }}
                          />
                        }
                      />
                    </FormControl>
                  </Box>
                </FormControl>

                <FormControl
                  sx={{
                    width: "90%",
                    height: "60%",
                    boxShadow: 2,
                    fontFamily: "MontserratMedium",
                    justifyContent: "space-evenly",
                    backgroundColor: "#f0f0f0",
                    alignItems: "center",
                    justifyItems: "center",
                  }}
                >
                  <FormLabel>DIMENSIÓN</FormLabel>

                  <Box
                    sx={{
                      width: "90%",

                      backgroundColor: "#f0f0f0",
                      justifyItems: "center",
                      alignItems: "center",
                    }}
                  >
                    <FormControl
                      sx={{
                        width: "90%",
                        height: "60%",
                        backgroundColor: "#f0f0f0",
                        justifyItems: "center",
                      }}
                    >
                      <FormControlLabel
                        value={"EFICIENCIA"}
                        label={"EFICIENCIA"}
                        sx={{
                          fontFamily: "MontserratMedium",
                        }}
                        control={
                          <Radio
                            checked={fin.dimension === "EFICIENCIA"}
                            onChange={(c) => {
                              setFin({
                                ...fin,
                                dimension: c.target.value,
                              });
                            }}
                          />
                        }
                      />

                      <FormControlLabel
                        value={"EFICACIA"}
                        label={"EFICACIA"}
                        sx={{
                          fontFamily: "MontserratMedium",
                        }}
                        control={
                          <Radio
                            checked={fin.dimension === "EFICACIA"}
                            onChange={(c) => {
                              setFin({
                                ...fin,
                                dimension: c.target.value,
                              });
                            }}
                          />
                        }
                      />
                      <FormControlLabel
                        value={"CALIDAD"}
                        label={"CALIDAD"}
                        sx={{
                          fontFamily: "MontserratMedium",
                        }}
                        control={
                          <Radio
                            checked={fin.dimension === "CALIDAD"}
                            onChange={(c) => {
                              setFin({
                                ...fin,
                                dimension: c.target.value,
                              });
                            }}
                          />
                        }
                      />

                      <FormControlLabel
                        value={"ECONOMÍA"}
                        label={"ECONOMÍA"}
                        sx={{
                          fontFamily: "MontserratMedium",
                        }}
                        control={
                          <Radio
                            checked={fin.dimension === "ECONOMÍA"}
                            onChange={(c) => {
                              setFin({
                                ...fin,
                                dimension: c.target.value,
                              });
                            }}
                          />
                        }
                      />
                    </FormControl>
                  </Box>
                </FormControl>

                <TextField
                  rows={8}
                  multiline
                  variant="filled"
                  sx={{ width: "90%", boxShadow: 2 }}
                  label={"UNIDAD DE MEDIDA"}
                  InputLabelProps={{
                    style: {
                      fontFamily: "MontserratMedium",
                      fontSize: ".8vw",
                    },
                  }}
                  InputProps={{
                    style: {
                      fontFamily: "MontserratRegular",
                    },
                  }}
                />

                <FormControl
                  sx={{
                    width: "90%",
                    height: "60%",
                    backgroundColor: "#f0f0f0",
                    boxShadow: 2,
                    fontFamily: "MontserratMedium",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <FormLabel>CLARIDAD</FormLabel>
                  <FormControlLabel
                    value={"SI"}
                    label={"SI"}
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={fin.claridad === "SI"}
                        onChange={(c) => {
                          setFin({
                            ...fin,
                            claridad: c.target.value,
                          });
                        }}
                      />
                    }
                  />
                  <FormControlLabel
                    value={"NO"}
                    label={"NO"}
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={fin.claridad === "NO"}
                        onChange={(c) => {
                          setFin({
                            ...fin,
                            claridad: c.target.value,
                          });
                        }}
                      />
                    }
                  />
                </FormControl>

                <FormControl
                  sx={{
                    width: "90%",
                    height: "60%",
                    backgroundColor: "#f0f0f0",
                    boxShadow: 2,
                    fontFamily: "MontserratMedium",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <FormLabel>RELEVANCIA</FormLabel>
                  <FormControlLabel
                    value={"SI"}
                    label={"SI"}
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={fin.relevancia === "SI"}
                        onChange={(c) => {
                          setFin({
                            ...fin,
                            relevancia: c.target.value,
                          });
                        }}
                      />
                    }
                  />
                  <FormControlLabel
                    value={"NO"}
                    label={"NO"}
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={fin.relevancia === "NO"}
                        onChange={(c) => {
                          setFin({
                            ...fin,
                            relevancia: c.target.value,
                          });
                        }}
                      />
                    }
                  />
                </FormControl>

                <FormControl
                  sx={{
                    width: "90%",
                    height: "60%",
                    backgroundColor: "#f0f0f0",
                    boxShadow: 2,
                    fontFamily: "MontserratMedium",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <FormLabel>ECONOMÍA</FormLabel>
                  <FormControlLabel
                    value={"SI"}
                    label={"SI"}
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={fin.economia === "SI"}
                        onChange={(c) => {
                          setFin({
                            ...fin,
                            economia: c.target.value,
                          });
                        }}
                      />
                    }
                  />
                  <FormControlLabel
                    value={"NO"}
                    label={"NO"}
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={fin.economia === "NO"}
                        onChange={(c) => {
                          setFin({
                            ...fin,
                            economia: c.target.value,
                          });
                        }}
                      />
                    }
                  />
                </FormControl>

                <FormControl
                  sx={{
                    width: "90%",
                    height: "60%",
                    backgroundColor: "#f0f0f0",
                    boxShadow: 2,
                    fontFamily: "MontserratMedium",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <FormLabel>MONITOREABLE</FormLabel>
                  <FormControlLabel
                    value={"SI"}
                    label={"SI"}
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={fin.monitoreable === "SI"}
                        onChange={(c) => {
                          setFin({
                            ...fin,
                            monitoreable: c.target.value,
                          });
                        }}
                      />
                    }
                  />
                  <FormControlLabel
                    value={"NO"}
                    label={"NO"}
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={fin.monitoreable === "NO"}
                        onChange={(c) => {
                          setFin({
                            ...fin,
                            monitoreable: c.target.value,
                          });
                        }}
                      />
                    }
                  />
                </FormControl>

                <FormControl
                  sx={{
                    width: "90%",
                    height: "60%",
                    backgroundColor: "#f0f0f0",
                    boxShadow: 2,
                    fontFamily: "MontserratMedium",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <FormLabel>ADECUADO</FormLabel>
                  <FormControlLabel
                    value={"SI"}
                    label={"SI"}
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={fin.adecuado === "SI"}
                        onChange={(c) => {
                          setFin({
                            ...fin,
                            adecuado: c.target.value,
                          });
                        }}
                      />
                    }
                  />
                  <FormControlLabel
                    value={"NO"}
                    label={"NO"}
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={fin.adecuado === "NO"}
                        onChange={(c) => {
                          setFin({
                            ...fin,
                            adecuado: c.target.value,
                          });
                        }}
                      />
                    }
                  />
                </FormControl>

                <FormControl
                  sx={{
                    width: "90%",
                    height: "60%",
                    backgroundColor: "#f0f0f0",
                    boxShadow: 2,
                    fontFamily: "MontserratMedium",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <FormLabel>APORTE MARGINAL</FormLabel>
                  <FormControlLabel
                    value={"SI"}
                    label={"SI"}
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={fin.aporte_marginal === "SI"}
                        onChange={(c) => {
                          setFin({
                            ...fin,
                            aporte_marginal: c.target.value,
                          });
                        }}
                      />
                    }
                  />
                  <FormControlLabel
                    value={"NO"}
                    label={"NO"}
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={fin.aporte_marginal === "NO"}
                        onChange={(c) => {
                          setFin({
                            ...fin,
                            aporte_marginal: c.target.value,
                          });
                        }}
                      />
                    }
                  />
                  <FormControlLabel
                    value={"NA"}
                    label={"NA"}
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={fin.aporte_marginal === "NA"}
                        onChange={(c) => {
                          setFin({
                            ...fin,
                            aporte_marginal: c.target.value,
                          });
                        }}
                      />
                    }
                  />
                </FormControl>
              </Box>
            </>
          ) : null}

          {showProposito ? (
            <>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  width: "90%",
                  alignItems: "center",
                  justifyItems: "center",
                }}
              >
                <FormControl
                  sx={{
                    width: "90%",
                    height: "60%",
                    backgroundColor: "#f0f0f0",
                    boxShadow: 2,
                    fontFamily: "MontserratMedium",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <FormLabel>FRECUENCIA</FormLabel>
                  <FormControlLabel
                    value={"SELECCIÓN ESTRATEGICO"}
                    label={"SELECCIÓN ESTRATEGICO"}
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={
                          proposito.frecuencia === "SELECCIÓN ESTRATEGICO"
                        }
                        onChange={(c) => {
                          setProposito({
                            ...proposito,
                            frecuencia: c.target.value,
                          });
                        }}
                      />
                    }
                  />
                  <FormControlLabel
                    value={"DE GESTIÓN"}
                    label={"DE GESTIÓN"}
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={proposito.frecuencia === "DE GESTIÓN"}
                        onChange={(c) => {
                          setProposito({
                            ...proposito,
                            frecuencia: c.target.value,
                          });
                        }}
                      />
                    }
                  />
                </FormControl>

                <FormControl
                  sx={{
                    width: "90%",
                    height: "60%",
                    backgroundColor: "#f0f0f0",
                    boxShadow: 2,
                    fontFamily: "MontserratMedium",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <FormLabel>DIMENSIÓN</FormLabel>
                  <FormControlLabel
                    value={"EFICIENCIA"}
                    label={"EFICIENCIA"}
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={proposito.dimension === "EFICIENCIA"}
                        onChange={(c) => {
                          setProposito({
                            ...proposito,
                            dimension: c.target.value,
                          });
                        }}
                      />
                    }
                  />
                  <FormControlLabel
                    value={"EFICACIA"}
                    label={"EFICACIA"}
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={proposito.dimension === "EFICACIA"}
                        onChange={(c) => {
                          setProposito({
                            ...proposito,
                            dimension: c.target.value,
                          });
                        }}
                      />
                    }
                  />
                  <FormControlLabel
                    value={"CALIDAD"}
                    label={"CALIDAD"}
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={proposito.dimension === "CALIDAD"}
                        onChange={(c) => {
                          setProposito({
                            ...proposito,
                            dimension: c.target.value,
                          });
                        }}
                      />
                    }
                  />

                  <FormControlLabel
                    value={"ECONOMÍA"}
                    label={"ECONOMÍA"}
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={proposito.dimension === "ECONOMÍA"}
                        onChange={(c) => {
                          setProposito({
                            ...proposito,
                            dimension: c.target.value,
                          });
                        }}
                      />
                    }
                  />
                </FormControl>
                <TextField
                  rows={8}
                  multiline
                  variant="filled"
                  sx={{ width: "90%", boxShadow: 2 }}
                  label={"UNIDAD DE MEDIDA"}
                  InputLabelProps={{
                    style: {
                      fontFamily: "MontserratMedium",
                      fontSize: ".8vw",
                    },
                  }}
                  InputProps={{
                    style: {
                      fontFamily: "MontserratRegular",
                    },
                  }}
                />

                <FormControl
                  sx={{
                    width: "90%",
                    height: "60%",
                    backgroundColor: "#f0f0f0",
                    boxShadow: 2,
                    fontFamily: "MontserratMedium",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <FormLabel>CLARIDAD</FormLabel>
                  <FormControlLabel
                    value={"SI"}
                    label={"SI"}
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={proposito.claridad === "SI"}
                        onChange={(c) => {
                          setProposito({
                            ...proposito,
                            claridad: c.target.value,
                          });
                        }}
                      />
                    }
                  />
                  <FormControlLabel
                    value={"NO"}
                    label={"NO"}
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={proposito.claridad === "NO"}
                        onChange={(c) => {
                          setProposito({
                            ...proposito,
                            claridad: c.target.value,
                          });
                        }}
                      />
                    }
                  />
                </FormControl>

                <FormControl
                  sx={{
                    width: "90%",
                    height: "60%",
                    backgroundColor: "#f0f0f0",
                    boxShadow: 2,
                    fontFamily: "MontserratMedium",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <FormLabel>RELEVANCIA</FormLabel>
                  <FormControlLabel
                    value={"SI"}
                    label={"SI"}
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={proposito.relevancia === "SI"}
                        onChange={(c) => {
                          setProposito({
                            ...proposito,
                            relevancia: c.target.value,
                          });
                        }}
                      />
                    }
                  />
                  <FormControlLabel
                    value={"NO"}
                    label={"NO"}
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={proposito.relevancia === "NO"}
                        onChange={(c) => {
                          setProposito({
                            ...proposito,
                            relevancia: c.target.value,
                          });
                        }}
                      />
                    }
                  />
                </FormControl>

                <FormControl
                  sx={{
                    width: "90%",
                    height: "60%",
                    backgroundColor: "#f0f0f0",
                    boxShadow: 2,
                    fontFamily: "MontserratMedium",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <FormLabel>ECONOMÍA</FormLabel>
                  <FormControlLabel
                    value={"SI"}
                    label={"SI"}
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={proposito.economia === "SI"}
                        onChange={(c) => {
                          setProposito({
                            ...proposito,
                            economia: c.target.value,
                          });
                        }}
                      />
                    }
                  />
                  <FormControlLabel
                    value={"NO"}
                    label={"NO"}
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={proposito.economia === "NO"}
                        onChange={(c) => {
                          setProposito({
                            ...proposito,
                            economia: c.target.value,
                          });
                        }}
                      />
                    }
                  />
                </FormControl>

                <FormControl
                  sx={{
                    width: "90%",
                    height: "60%",
                    backgroundColor: "#f0f0f0",
                    boxShadow: 2,
                    fontFamily: "MontserratMedium",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <FormLabel>MONITOREABLE</FormLabel>
                  <FormControlLabel
                    value={"SI"}
                    label={"SI"}
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={proposito.monitoreable === "SI"}
                        onChange={(c) => {
                          setProposito({
                            ...proposito,
                            monitoreable: c.target.value,
                          });
                        }}
                      />
                    }
                  />
                  <FormControlLabel
                    value={"NO"}
                    label={"NO"}
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={proposito.monitoreable === "NO"}
                        onChange={(c) => {
                          setProposito({
                            ...proposito,
                            monitoreable: c.target.value,
                          });
                        }}
                      />
                    }
                  />
                </FormControl>

                <FormControl
                  sx={{
                    width: "90%",
                    height: "60%",
                    backgroundColor: "#f0f0f0",
                    boxShadow: 2,
                    fontFamily: "MontserratMedium",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <FormLabel>ADECUADO</FormLabel>
                  <FormControlLabel
                    value={"SI"}
                    label={"SI"}
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={proposito.adecuado === "SI"}
                        onChange={(c) => {
                          setProposito({
                            ...proposito,
                            adecuado: c.target.value,
                          });
                        }}
                      />
                    }
                  />
                  <FormControlLabel
                    value={"NO"}
                    label={"NO"}
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={proposito.adecuado === "NO"}
                        onChange={(c) => {
                          setProposito({
                            ...proposito,
                            adecuado: c.target.value,
                          });
                        }}
                      />
                    }
                  />
                </FormControl>

                <FormControl
                  sx={{
                    width: "90%",
                    height: "60%",
                    backgroundColor: "#f0f0f0",
                    boxShadow: 2,
                    fontFamily: "MontserratMedium",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <FormLabel>APORTE MARGINAL</FormLabel>
                  <FormControlLabel
                    value={"SI"}
                    label={"SI"}
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={proposito.aporte_marginal === "SI"}
                        onChange={(c) => {
                          setProposito({
                            ...proposito,
                            
                            aporte_marginal: c.target.value,
                          });
                        }}
                      />
                    }
                  />
                  <FormControlLabel
                    value={"NO"}
                    label={"NO"}
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={proposito.aporte_marginal === "NO"}
                        onChange={(c) => {
                          setProposito({
                            ...proposito,
                            aporte_marginal: c.target.value,
                          });
                        }}
                      />
                    }
                  />
                  <FormControlLabel
                    value={"NA"}
                    label={"NA"}
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={proposito.aporte_marginal === "NA"}
                        onChange={(c) => {
                          setProposito({
                            ...proposito,
                            aporte_marginal: c.target.value,
                          });
                        }}
                      />
                    }
                  />
                </FormControl>
              </Box>
            </>
          ) : null}
        </Box>
      </Box>
    );
  }
}
