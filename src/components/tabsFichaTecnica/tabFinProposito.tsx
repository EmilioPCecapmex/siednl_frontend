import {
  Box,
  Typography,
  List,
  Divider,
  ListItemButton,
  TextField,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { IFinFT, IPropositoFT } from "./Interfaces";
export function TabFinPropositoFT({
  show,
  resumenFinFT,
  resumenPropositoFT,
  FT,
  MIR,
  
}: {
  show: boolean;
  resumenFinFT: Function;
  resumenPropositoFT: Function;
  FT: string;
  MIR: string;
}) {

  
  let jsonFT = FT === "" ? "" : JSON.parse(FT);

  const [fin, setFin] = useState<Array<IFinFT>>([
    {
      tipoDeIndicador: jsonFT?.fin?.tipoDeIndicador || "",
      claridad: jsonFT?.fin?.claridad || "",
      relevancia: jsonFT?.fin?.relevancia || "",
      economia: jsonFT?.fin?.economia || "",
      monitoreable: jsonFT?.fin?.monitoreable || "",
      adecuado: jsonFT?.fin?.adecuado || "",
      aporte_marginal: jsonFT?.fin?.aporte_marginal || "",
      dimension: jsonFT?.fin?.dimension || "",
      unidadDeMedida: jsonFT?.fin?.unidadDeMedida || "",
    },
  ]);

  const [proposito, setProposito] = useState<Array<IPropositoFT>>([
    {
      tipoDeIndicador: jsonFT?.fin?.tipoDeIndicador || "",
      claridad: jsonFT?.fin?.claridad || "",
      relevancia: jsonFT?.fin?.relevancia || "",
      economia: jsonFT?.fin?.economia || "",
      monitoreable: jsonFT?.fin?.monitoreable || "",
      adecuado: jsonFT?.fin?.adecuado || "",
      aporte_marginal: jsonFT?.fin?.aporte_marginal || "",
      dimension: jsonFT?.fin?.dimension || "",
      unidadDeMedida: jsonFT?.fin?.unidadDeMedida || "",
    },
  ]);
  
  const [showFin, setShowFin] = useState(true);
  const [showProposito, setShowProposito] = useState(false);

  useEffect(() => {
    resumenFinFT(fin);
    resumenPropositoFT(proposito);
  }, [fin, proposito]);


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
                    label={
                      <Typography
                        sx={{
                          fontSize: "0.8vw",
                          fontFamily: "MontserratMedium",
                        }}
                      >
                        SELECCIÓN ESTRATEGICO
                      </Typography>
                    }
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={
                          fin[0].tipoDeIndicador === "SELECCIÓN ESTRATEGICO"
                        }
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
                    label={
                      <Typography
                        sx={{
                          fontSize: "0.8vw",
                          fontFamily: "MontserratMedium",
                        }}
                      >
                        DE GESTIÓN
                      </Typography>
                    }
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

                <Box sx={{ display: "grid", gridTemplateColumns:'repeat(2,1fr)' }}>
                    <FormControlLabel
                      value={"EFICIENCIA"}
                      label={
                      <Typography
                        sx={{
                          fontSize: "0.8vw",
                          fontFamily: "MontserratMedium",
                        }}
                      >
                        EFICIENCIA
                      </Typography>
                    }
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
                      label={
                      <Typography
                        sx={{
                          fontSize: "0.8vw",
                          fontFamily: "MontserratMedium",
                        }}
                      >
                        EFICACIA
                      </Typography>
                    }
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
                      label={
                      <Typography
                        sx={{
                          fontSize: "0.8vw",
                          fontFamily: "MontserratMedium",
                        }}
                      >
                        CALIDAD
                      </Typography>
                    }
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
                      label={
                      <Typography
                        sx={{
                          fontSize: "0.8vw",
                          fontFamily: "MontserratMedium",
                        }}
                      >
                        ECONOMÍA
                      </Typography>
                    }
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
                    label={
                      <Typography
                        sx={{
                          fontSize: "0.8vw",
                          fontFamily: "MontserratMedium",
                        }}
                      >
                        SI
                      </Typography>
                    }
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
                    label={
                      <Typography
                        sx={{
                          fontSize: "0.8vw",
                          fontFamily: "MontserratMedium",
                        }}
                      >
                        NO
                      </Typography>
                    }
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
                    label={
                      <Typography
                        sx={{
                          fontSize: "0.8vw",
                          fontFamily: "MontserratMedium",
                        }}
                      >
                        SI
                      </Typography>
                    }
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
                    label={
                      <Typography
                        sx={{
                          fontSize: "0.8vw",
                          fontFamily: "MontserratMedium",
                        }}
                      >
                        NO
                      </Typography>
                    }
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
                    label={
                      <Typography
                        sx={{
                          fontSize: "0.8vw",
                          fontFamily: "MontserratMedium",
                        }}
                      >
                        SI
                      </Typography>
                    }
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
                    label={
                      <Typography
                        sx={{
                          fontSize: "0.8vw",
                          fontFamily: "MontserratMedium",
                        }}
                      >
                        NO
                      </Typography>
                    }
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
                    label={
                      <Typography
                        sx={{
                          fontSize: "0.8vw",
                          fontFamily: "MontserratMedium",
                        }}
                      >
                        SI
                      </Typography>
                    }
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
                    label={
                      <Typography
                        sx={{
                          fontSize: "0.8vw",
                          fontFamily: "MontserratMedium",
                        }}
                      >
                        NO
                      </Typography>
                    }
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
                    label={
                      <Typography
                        sx={{
                          fontSize: "0.8vw",
                          fontFamily: "MontserratMedium",
                        }}
                      >
                        SI
                      </Typography>
                    }
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
                    label={
                      <Typography
                        sx={{
                          fontSize: "0.8vw",
                          fontFamily: "MontserratMedium",
                        }}
                      >
                        NO
                      </Typography>
                    }
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
                    label={
                      <Typography
                        sx={{
                          fontSize: "0.8vw",
                          fontFamily: "MontserratMedium",
                        }}
                      >
                        SI
                      </Typography>
                    }
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
                    label={
                      <Typography
                        sx={{
                          fontSize: "0.8vw",
                          fontFamily: "MontserratMedium",
                        }}
                      >
                        NO
                      </Typography>
                    }
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
                    label={
                      <Typography
                        sx={{
                          fontSize: "0.8vw",
                          fontFamily: "MontserratMedium",
                        }}
                      >
                        NA
                      </Typography>
                    }
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
                    label={
                      <Typography
                        sx={{
                          fontSize: "0.8vw",
                          fontFamily: "MontserratMedium",
                        }}
                      >
                        SELECCIÓN ESTRATEGICO
                      </Typography>
                    }
                    sx={{
                      fontFamily: "MontserratMedium",
                    }}
                    control={
                      <Radio
                        checked={
                          proposito[0].tipoDeIndicador ===
                          "SELECCIÓN ESTRATEGICO"
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
                    label={
                      <Typography
                        sx={{
                          fontSize: "0.8vw",
                          fontFamily: "MontserratMedium",
                        }}
                      >
                        DE GESTIÓN
                      </Typography>
                    }
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
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <FormControlLabel
                      value={"EFICIENCIA"}
                      label={
                      <Typography
                        sx={{
                          fontSize: "0.8vw",
                          fontFamily: "MontserratMedium",
                        }}
                      >
                        EFICIENCIA
                      </Typography>
                    }
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
                      label={
                      <Typography
                        sx={{
                          fontSize: "0.8vw",
                          fontFamily: "MontserratMedium",
                        }}
                      >
                        EFICACIA
                      </Typography>
                    }
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
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <FormControlLabel
                      value={"CALIDAD"}
                      label={
                      <Typography
                        sx={{
                          fontSize: "0.8vw",
                          fontFamily: "MontserratMedium",
                        }}
                      >
                        CALIDAD
                      </Typography>
                    }
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
                      label={
                      <Typography
                        sx={{
                          fontSize: "0.8vw",
                          fontFamily: "MontserratMedium",
                        }}
                      >
                        ECONOMÍA
                      </Typography>
                    }
                      sx={{
                        fontFamily: "MontserratMedium",
                        ml: "0.4vw",
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
                    label={
                      <Typography
                        sx={{
                          fontSize: "0.8vw",
                          fontFamily: "MontserratMedium",
                        }}
                      >
                        SI
                      </Typography>
                    }
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
                    label={
                      <Typography
                        sx={{
                          fontSize: "0.8vw",
                          fontFamily: "MontserratMedium",
                        }}
                      >
                        NO
                      </Typography>
                    }
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
                    label={
                      <Typography
                        sx={{
                          fontSize: "0.8vw",
                          fontFamily: "MontserratMedium",
                        }}
                      >
                        SI
                      </Typography>
                    }
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
                    label={
                      <Typography
                        sx={{
                          fontSize: "0.8vw",
                          fontFamily: "MontserratMedium",
                        }}
                      >
                        NO
                      </Typography>
                    }
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
                    label={
                      <Typography
                        sx={{
                          fontSize: "0.8vw",
                          fontFamily: "MontserratMedium",
                        }}
                      >
                        SI
                      </Typography>
                    }
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
                    label={
                      <Typography
                        sx={{
                          fontSize: "0.8vw",
                          fontFamily: "MontserratMedium",
                        }}
                      >
                        NO
                      </Typography>
                    }
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
                    label={
                      <Typography
                        sx={{
                          fontSize: "0.8vw",
                          fontFamily: "MontserratMedium",
                        }}
                      >
                        SI
                      </Typography>
                    }
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
                    label={
                      <Typography
                        sx={{
                          fontSize: "0.8vw",
                          fontFamily: "MontserratMedium",
                        }}
                      >
                        NO
                      </Typography>
                    }
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
                    label={
                      <Typography
                        sx={{
                          fontSize: "0.8vw",
                          fontFamily: "MontserratMedium",
                        }}
                      >
                        SI
                      </Typography>
                    }
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
                    label={
                      <Typography
                        sx={{
                          fontSize: "0.8vw",
                          fontFamily: "MontserratMedium",
                        }}
                      >
                        NO
                      </Typography>
                    }
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
                    label={
                      <Typography
                        sx={{
                          fontSize: "0.8vw",
                          fontFamily: "MontserratMedium",
                        }}
                      >
                        SI
                      </Typography>
                    }
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
                    label={
                      <Typography
                        sx={{
                          fontSize: "0.8vw",
                          fontFamily: "MontserratMedium",
                        }}
                      >
                        NO
                      </Typography>
                    }
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
