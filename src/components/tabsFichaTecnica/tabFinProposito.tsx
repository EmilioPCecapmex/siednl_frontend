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
export function TabFinProposito({
  show,
  resumenFin,
  resumenProposito,
  cargaFin,
  cargaProposito,
  mirEdit,
}: {
  show: boolean;
  resumenFin: Function;
  resumenProposito: Function;
  cargaFin: Array<any>;
  cargaProposito: Array<any>;
  mirEdit?: any;
}) {
  const [fin, setFin] = useState([
    {
      tipoDeIndicador: "",
      claridad: "",
      relevancia: "",
      economia: "",
      monitoreable: "",
      adecuado: "",
      aporte_marginal: "",
      dimension: "",
      unidadDeMedida: "",
    },
  ]);

  
  const [proposito, setProposito] = useState([
    {
      tipoDeIndicador: "",
      claridad: "",
      relevancia: "",
      economia: "",
      monitoreable: "",
      adecuado: "",
      aporte_marginal: "",
      dimension: "",
      unidadDeMedida: "",
    },
  ]);
  
  useEffect(() => {
    resumenFin(fin);
    resumenProposito(proposito);
  }, [fin, proposito]);
  
  const [showFin, setShowFin] = useState(true);
  const [showProposito, setShowProposito] = useState(false);

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
            display: "flex",
            height: "7vh",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              mr: "1vw",
              fontFamily: "MontserratSemiBold",
              fontSize: "1.5vw",
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
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Divider />
            <ListItemButton
              selected={showFin}
              onClick={() => {
                setShowFin(true);
                setShowProposito(false);
              }}
              sx={{
                height: "7vh",
                "&.Mui-selected ": {
                  backgroundColor: "#c4a57b",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "#cbcbcb",
                },
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                FIN
              </Typography>
            </ListItemButton>
            <Divider />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <ListItemButton
              selected={showProposito}
              onClick={() => {
                setShowProposito(true);
                setShowFin(false);
              }}
              sx={{
                height: "7vh",
                "&.Mui-selected ": {
                  backgroundColor: "#c4a57b",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "#cbcbcb",
                },
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                PROPÓSITO
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
                <FormLabel
                  sx={{
                    fontFamily: "MontserratBold",
                    fontSize: "0.6vw",
                  }}
                >
                  TIPO DE INDICADOR
                </FormLabel>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <FormControlLabel
                    value={"SELECCIÓN ESTRATEGICO"}
                    label={"SELECCIÓN ESTRATEGICO"}
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={fin[0].tipoDeIndicador === "SELECCIÓN ESTRATEGICO"}
                        onChange={(c) => {
                          fin[0].tipoDeIndicador = c.target.value;
                          setFin({
                            ...fin,
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
                        checked={fin[0].tipoDeIndicador === "DE GESTIÓN"}
                        onChange={(c) => {
                          fin[0].tipoDeIndicador = c.target.value;
                          setFin({
                            ...fin,
                          });
                        }}
                      />
                    }
                  />
                </Box>
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
                <FormLabel
                  sx={{
                    fontFamily: "MontserratBold",
                    fontSize: "0.6vw",
                  }}
                >
                  DIMENSIÓN
                </FormLabel>

                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <FormControlLabel
                    value={"EFICIENCIA"}
                    label={"EFICIENCIA"}
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={fin[0].dimension === "EFICIENCIA"}
                        onChange={(c) => {
                          fin[0].dimension = c.target.value;
                          setFin({
                            ...fin,
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
                        checked={fin[0].dimension === "EFICACIA"}
                        onChange={(c) => {
                          fin[0].dimension = c.target.value;
                          setFin({
                            ...fin,
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
                        checked={fin[0].dimension === "CALIDAD"}
                        onChange={(c) => {
                          fin[0].dimension = c.target.value;
                          setFin({
                            ...fin,
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
                        checked={fin[0].dimension === "ECONOMÍA"}
                        onChange={(c) => {
                          fin[0].dimension = c.target.value;
                          setFin({
                            ...fin,
                          });
                        }}
                      />
                    }
                  />
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
                value={fin[0].unidadDeMedida}
                onChange={(c) => {
                  fin[0].unidadDeMedida = c.target.value;
                  setFin({
                    ...fin,
                  });
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
                <FormLabel
                  sx={{
                    fontFamily: "MontserratBold",
                    fontSize: "0.6vw",
                  }}
                >
                  CLARIDAD
                </FormLabel>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <FormControlLabel
                    value={"SI"}
                    label={"SI"}
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={fin[0].claridad === "SI"}
                        onChange={(c) => {
                          fin[0].claridad = c.target.value;
                          setFin({
                            ...fin,
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
                        checked={fin[0].claridad === "NO"}
                        onChange={(c) => {
                          fin[0].claridad = c.target.value;
                          setFin({
                            ...fin,
                          });
                        }}
                      />
                    }
                  />
                </Box>
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
                <FormLabel
                  sx={{
                    fontFamily: "MontserratBold",
                    fontSize: "0.6vw",
                  }}
                >
                  RELEVANCIA
                </FormLabel>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <FormControlLabel
                    value={"SI"}
                    label={"SI"}
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={fin[0].relevancia === "SI"}
                        onChange={(c) => {
                          fin[0].relevancia = c.target.value;
                          setFin({
                            ...fin,
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
                        checked={fin[0].relevancia === "NO"}
                        onChange={(c) => {
                          fin[0].relevancia = c.target.value;
                          setFin({
                            ...fin,
                          });
                        }}
                      />
                    }
                  />
                </Box>
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
                <FormLabel
                  sx={{
                    fontFamily: "MontserratBold",
                    fontSize: "0.6vw",
                  }}
                >
                  ECONOMÍA
                </FormLabel>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <FormControlLabel
                    value={"SI"}
                    label={"SI"}
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={fin[0].economia === "SI"}
                        onChange={(c) => {
                          fin[0].economia = c.target.value;
                          setFin({
                            ...fin,
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
                        checked={fin[0].economia === "NO"}
                        onChange={(c) => {
                          fin[0].economia = c.target.value;
                          setFin({
                            ...fin,
                          });
                        }}
                      />
                    }
                  />
                </Box>
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
                <FormLabel
                  sx={{
                    fontFamily: "MontserratBold",
                    fontSize: "0.6vw",
                  }}
                >
                  MONITOREABLE
                </FormLabel>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <FormControlLabel
                    value={"SI"}
                    label={"SI"}
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={fin[0].monitoreable === "SI"}
                        onChange={(c) => {
                          fin[0].monitoreable = c.target.value;
                          setFin({
                            ...fin,
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
                        checked={fin[0].monitoreable === "NO"}
                        onChange={(c) => {
                          fin[0].monitoreable = c.target.value;
                          setFin({
                            ...fin,
                          });
                        }}
                      />
                    }
                  />
                </Box>
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
                <FormLabel
                  sx={{
                    fontFamily: "MontserratBold",
                    fontSize: "0.6vw",
                  }}
                >
                  ADECUADO
                </FormLabel>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <FormControlLabel
                    value={"SI"}
                    label={"SI"}
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={fin[0].adecuado === "SI"}
                        onChange={(c) => {
                          fin[0].adecuado = c.target.value;
                          setFin({
                            ...fin,
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
                        checked={fin[0].adecuado === "NO"}
                        onChange={(c) => {
                          fin[0].adecuado = c.target.value;
                          setFin({
                            ...fin,
                          });
                        }}
                      />
                    }
                  />
                </Box>
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
                <FormLabel
                  sx={{
                    fontFamily: "MontserratBold",
                    fontSize: "0.6vw",
                  }}
                >
                  APORTE MARGINAL
                </FormLabel>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <FormControlLabel
                    value={"SI"}
                    label={"SI"}
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={fin[0].aporte_marginal === "SI"}
                        onChange={(c) => {
                          fin[0].aporte_marginal = c.target.value;
                          setFin({
                            ...fin,
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
                        checked={fin[0].aporte_marginal === "NO"}
                        onChange={(c) => {
                          fin[0].aporte_marginal = c.target.value;
                          setFin({
                            ...fin,
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
                        checked={fin[0].aporte_marginal === "NA"}
                        onChange={(c) => {
                          fin[0].aporte_marginal = c.target.value;
                          setFin({
                            ...fin,
                          });
                        }}
                      />
                    }
                  />
                </Box>
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
                <FormLabel
                  sx={{
                    fontFamily: "MontserratBold",
                    fontSize: "0.6vw",
                  }}
                >
                  TIPO DE INDICADOR
                </FormLabel>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <FormControlLabel
                    value={"SELECCIÓN ESTRATEGICO"}
                    label={"SELECCIÓN ESTRATEGICO"}
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={
                          proposito[0].tipoDeIndicador === "SELECCIÓN ESTRATEGICO"
                        }
                        onChange={(c) => {
                          proposito[0].tipoDeIndicador = c.target.value;
                          setProposito({
                            ...proposito,
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
                        checked={proposito[0].tipoDeIndicador === "DE GESTIÓN"}
                        onChange={(c) => {
                          proposito[0].tipoDeIndicador = c.target.value;
                          setProposito({
                            ...proposito,
                          });
                        }}
                      />
                    }
                  />
                </Box>
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
                <FormLabel
                  sx={{
                    fontFamily: "MontserratBold",
                    fontSize: "0.6vw",
                  }}
                >
                  DIMENSIÓN
                </FormLabel>

                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <FormControlLabel
                    value={"EFICIENCIA"}
                    label={"EFICIENCIA"}
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={proposito[0].dimension === "EFICIENCIA"}
                        onChange={(c) => {
                          proposito[0].dimension = c.target.value;
                          setProposito({
                            ...proposito,
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
                        checked={proposito[0].dimension === "EFICACIA"}
                        onChange={(c) => {
                          proposito[0].dimension = c.target.value;
                          setProposito({
                            ...proposito,
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
                        checked={proposito[0].dimension === "CALIDAD"}
                        onChange={(c) => {
                          proposito[0].dimension = c.target.value;
                          setProposito({
                            ...proposito,
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
                        checked={proposito[0].dimension === "ECONOMÍA"}
                        onChange={(c) => {
                          proposito[0].dimension = c.target.value;
                          setProposito({
                            ...proposito,
                          });
                        }}
                      />
                    }
                  />
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
                value={proposito[0].unidadDeMedida}
                onChange={(c) => {
                  proposito[0].unidadDeMedida = c.target.value;
                  setProposito({
                    ...proposito,
                  });
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
                <FormLabel
                  sx={{
                    fontFamily: "MontserratBold",
                    fontSize: "0.6vw",
                  }}
                >
                  CLARIDAD
                </FormLabel>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <FormControlLabel
                    value={"SI"}
                    label={"SI"}
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={proposito[0].claridad === "SI"}
                        onChange={(c) => {
                          proposito[0].claridad = c.target.value;
                          setProposito({
                            ...proposito,
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
                        checked={proposito[0].claridad === "NO"}
                        onChange={(c) => {
                          proposito[0].claridad = c.target.value;
                          setProposito({
                            ...proposito,
                          });
                        }}
                      />
                    }
                  />
                </Box>
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
                <FormLabel
                  sx={{
                    fontFamily: "MontserratBold",
                    fontSize: "0.6vw",
                  }}
                >
                  RELEVANCIA
                </FormLabel>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <FormControlLabel
                    value={"SI"}
                    label={"SI"}
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={proposito[0].relevancia === "SI"}
                        onChange={(c) => {
                          proposito[0].relevancia = c.target.value;
                          setProposito({
                            ...proposito,
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
                        checked={proposito[0].relevancia === "NO"}
                        onChange={(c) => {
                          proposito[0].relevancia = c.target.value;
                          setProposito({
                            ...proposito,
                          });
                        }}
                      />
                    }
                  />
                </Box>
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
                <FormLabel
                  sx={{
                    fontFamily: "MontserratBold",
                    fontSize: "0.6vw",
                  }}
                >
                  ECONOMÍA
                </FormLabel>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <FormControlLabel
                    value={"SI"}
                    label={"SI"}
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={proposito[0].economia === "SI"}
                        onChange={(c) => {
                          proposito[0].economia = c.target.value;
                          setProposito({
                            ...proposito,
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
                        checked={proposito[0].economia === "NO"}
                        onChange={(c) => {
                          proposito[0].economia = c.target.value;
                          setProposito({
                            ...proposito,
                          });
                        }}
                      />
                    }
                  />
                </Box>
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
                <FormLabel
                  sx={{
                    fontFamily: "MontserratBold",
                    fontSize: "0.6vw",
                  }}
                >
                  MONITOREABLE
                </FormLabel>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <FormControlLabel
                    value={"SI"}
                    label={"SI"}
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={proposito[0].monitoreable === "SI"}
                        onChange={(c) => {
                          proposito[0].monitoreable = c.target.value;
                          setProposito({
                            ...proposito,
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
                        checked={proposito[0].monitoreable === "NO"}
                        onChange={(c) => {
                          proposito[0].monitoreable = c.target.value;
                          setProposito({
                            ...proposito,
                          });
                        }}
                      />
                    }
                  />
                </Box>
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
                <FormLabel
                  sx={{
                    fontFamily: "MontserratBold",
                    fontSize: "0.6vw",
                  }}
                >
                  ADECUADO
                </FormLabel>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <FormControlLabel
                    value={"SI"}
                    label={"SI"}
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={proposito[0].adecuado === "SI"}
                        onChange={(c) => {
                          proposito[0].adecuado = c.target.value;
                          setProposito({
                            ...proposito,
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
                        checked={proposito[0].adecuado === "NO"}
                        onChange={(c) => {
                          proposito[0].adecuado = c.target.value;
                          setProposito({
                            ...proposito,
                          });
                        }}
                      />
                    }
                  />
                </Box>
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
                <FormLabel
                  sx={{
                    fontFamily: "MontserratBold",
                    fontSize: "0.6vw",
                  }}
                >
                  APORTE MARGINAL
                </FormLabel>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <FormControlLabel
                    value={"SI"}
                    label={"SI"}
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={proposito[0].aporte_marginal === "SI"}
                        onChange={(c) => {
                          proposito[0].aporte_marginal = c.target.value;
                          setProposito({
                            ...proposito,
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
                        checked={proposito[0].aporte_marginal === "NO"}
                        onChange={(c) => {
                          proposito[0].aporte_marginal = c.target.value;
                          setProposito({
                            ...proposito,
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
                        checked={proposito[0].aporte_marginal === "NA"}
                        onChange={(c) => {
                          proposito[0].aporte_marginal = c.target.value;
                          setProposito({
                            ...proposito,
                          });
                        }}
                      />
                    }
                  />
                </Box>
              </FormControl>
            </Box>
          </>
        ) : null}
      </Box>
    </Box>
  );
}
