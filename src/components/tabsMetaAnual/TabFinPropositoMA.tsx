import { useEffect, useState } from "react";
import {
  TextField,
  Box,
  Typography,
  List,
  ListItemButton,
  Divider,
  FormControl,
  Autocomplete,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { IFinMA } from "./IFin";
import { IPropositoMA } from "./IFin";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import { FormulaDialogMA } from "../formulasDialog/FormulaDialogMA";
import axios from "axios";

export function TabFinPropositoMA({
  show,
  resumenFinMa,
  resumenPropositoMa,
  showMirFnc,
  setTxtShowFnc,
  MA,
  MIR,
}: {
  show: boolean;
  resumenFinMa: Function;
  resumenPropositoMa: Function;
  showMirFnc: Function;
  setTxtShowFnc: Function;
  MA: string;
  MIR: string;
}) {
  
  
  let jsonMA =
    MA === ""
      ? ""
      : JSON.parse(MA).length > 1
      ? JSON.parse(MA)[0]
      : JSON.parse(MA);

  let MAEdit =
    MA === "" ? "" : JSON.parse(MA).length > 1 ? JSON.parse(MA)[1] : "";

  const [valueFin, setValueFin] = useState<Array<IFinMA>>([
    {
      metaAnual: jsonMA?.fin?.metaAnual || "",
      lineaBase: jsonMA?.fin?.lineaBase || "",
      valorNumerador: jsonMA?.fin?.valorNumerador || "",
      valorDenominador: jsonMA?.fin?.valorDenominador || "",
      sentidoDelIndicador: jsonMA?.fin?.sentidoDelIndicador || "",

      unidadResponsable: jsonMA?.fin?.unidadResponsable || "",

      descIndicador: jsonMA?.fin?.descIndicador || "",
      descNumerador: jsonMA?.fin?.descNumerador || "",
      descDenominador: jsonMA?.fin?.descDenominador || "",
    },
  ]);

  //values
  const [valueProposito, setValueProposito] = useState<Array<IPropositoMA>>([
    {
      metaAnual: jsonMA?.proposito?.metaAnual || "",
      lineaBase: jsonMA?.proposito?.lineaBase || "",
      valorNumerador: jsonMA?.proposito?.valorNumerador || "",
      valorDenominador: jsonMA?.proposito?.valorDenominador || "",
      sentidoDelIndicador: jsonMA?.proposito?.sentidoDelIndicador || "",
      unidadResponsable: jsonMA?.proposito?.unidadResponsable || "",

      descIndicador: jsonMA?.proposito?.descIndicador || "",
      descNumerador: jsonMA?.proposito?.descNumerador || "",
      descDenominador: jsonMA?.proposito?.descDenominador || "",
    },
  ]);

  const [showFin, setShowFin] = useState(true);

  const [catalogoUnidadResponsable, setCatalogounidadResponsable] = useState([
    {
      Id: "",
      Unidad: "",
    },
  ]);

  const [showProposito, setShowProposito] = useState(false);

  useEffect(() => {
    resumenFinMa(valueFin);
    resumenPropositoMa(valueProposito);
  }, [valueFin, valueProposito]);

  const [openFormulaDialog, setOpenFormulaDialog] = useState(false);
  const [tipoFormula, setTipoFormula] = useState("");
  const [elementoFormula, setElementoFormula] = useState("");

  const handleClickOpen = () => {
    if (showFin) {
      setTipoFormula(
        JSON.parse(MIR).fin.indicador.toUpperCase().includes("PORCENTAJE") ||
          JSON.parse(MIR).fin.indicador.toUpperCase().includes("PORCENTAJE")
          ? "Porcentaje"
          : JSON.parse(MIR).fin.indicador.toUpperCase().includes("TASA") ||
            JSON.parse(MIR).fin.indicador.toUpperCase().includes("TASA")
          ? "Tasa"
          : JSON.parse(MIR)
              .fin.indicador.toUpperCase()
              .includes("INDICE" || "ÍNDICE") ||
            JSON.parse(MIR).fin.indicador.toUpperCase().includes("INDICE") ||
            JSON.parse(MIR).fin.indicador.toUpperCase().includes("ÍNDICE")
          ? "Indice"
          : JSON.parse(MIR).fin.indicador.toUpperCase().includes("PROMEDIO") ||
            JSON.parse(MIR).fin.indicador.toUpperCase().includes("PROMEDIO")
          ? "Promedio"
          : ""
      );
      setElementoFormula("Fin");
      setOpenFormulaDialog(true);
    }
    if (showProposito) {
      setTipoFormula(
        JSON.parse(MIR)
          .proposito.indicador.toUpperCase()
          .includes("PORCENTAJE") ||
          JSON.parse(MIR)
            .proposito.indicador.toUpperCase()
            .includes("PORCENTAJE")
          ? "Porcentaje"
          : JSON.parse(MIR)
              .proposito.indicador.toUpperCase()
              .includes("TASA") ||
            JSON.parse(MIR).proposito.indicador.toUpperCase().includes("TASA")
          ? "Tasa"
          : JSON.parse(MIR)
              .proposito.indicador.toUpperCase()
              .includes("INDICE" || "ÍNDICE") ||
            JSON.parse(MIR)
              .proposito.indicador.toUpperCase()
              .includes("INDICE") ||
            JSON.parse(MIR).proposito.indicador.toUpperCase().includes("ÍNDICE")
          ? "Índice"
          : JSON.parse(MIR)
              .proposito.indicador.toUpperCase()
              .includes("PROMEDIO") ||
            JSON.parse(MIR)
              .proposito.indicador.toUpperCase()
              .includes("PROMEDIO")
          ? "Promedio"
          : ""
      );
      setElementoFormula("Propósito");
      setOpenFormulaDialog(true);
    }
  };

  const handleClose = () => {
    setOpenFormulaDialog(false);
  };

  const changeFormula = (txt: string) => {
    if (elementoFormula === "Fin") {
      if (
        JSON.parse(MIR).fin.indicador.toLowerCase().includes("indice") ||
        JSON.parse(MIR).fin.indicador.toLowerCase().includes("índice")
      ) {
        valueFin[0].valorNumerador = txt.split(",")[0];
        valueFin[0].metaAnual = txt.split(",")[0];
      } else {
        valueFin[0].valorNumerador = txt.split(",")[0];
        valueFin[0].valorDenominador = txt.split(",")[1];
        valueFin[0].metaAnual = txt.split(",")[2];
      }
      setValueFin([...valueFin]);
    } else if (elementoFormula === "Propósito") {
      if (
        JSON.parse(MIR).proposito.indicador.toLowerCase().includes("indice") ||
        JSON.parse(MIR).proposito.indicador.toLowerCase().includes("índice")
      ) {
        valueProposito[0].valorNumerador = txt.split(",")[0];
        valueProposito[0].metaAnual = txt.split(",")[0];
      } else {
        valueProposito[0].valorNumerador = txt.split(",")[0];
        valueProposito[0].valorDenominador = txt.split(",")[1];
        valueProposito[0].metaAnual = txt.split(",")[2];
      }
      setValueProposito([...valueProposito]);
    }
  };

  const getUnidades = () => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/listadoUnidadesInst", {
        params: {
          Institucion: JSON.parse(MIR).encabezado.institucion,
        },

        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })

      .then((r) => {
        setCatalogounidadResponsable(r.data.data);
      })

      .catch((err) => {});
  };

  useEffect(() => {
    getUnidades();
  }, []);

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
      <FormulaDialogMA
        open={openFormulaDialog}
        close={handleClose}
        textoSet={changeFormula}
        tipo={tipoFormula}
        elemento={elementoFormula}
        MIR={MIR}
      />
      {showFin || showProposito ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            height: "7vh",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <InfoOutlinedIcon
            onClick={() => {
              showMirFnc(true);
              showFin ? setTxtShowFnc("Fin") : setTxtShowFnc("Proposito");
            }}
            fontSize="large"
            sx={{ cursor: "pointer" }}
          ></InfoOutlinedIcon>
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
      ) : (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            height: "7vh",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        ></Box>
      )}

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
              <Typography
                sx={{ fontFamily: "MontserratMedium", fontSize: "0.7vw" }}
              >
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
              <Typography
                sx={{ fontFamily: "MontserratMedium", fontSize: "0.7vw" }}
              >
                PROPÓSITO
              </Typography>
            </ListItemButton>
            <Divider />
          </Box>
        </List>

        {showFin ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "90%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "100%",
                height: "33%",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <TextField
                disabled={
                  MAEdit?.fin?.metaAnual && valueFin[0].metaAnual !== ""
                }
                sx={{ width: "18%", boxShadow: 2 }}
                variant={"filled"}
                label={
                  <Typography
                    sx={{ fontSize: "0.7vw", fontFamily: "MontserratMedium" }}
                  >
                    META ANUAL 2023
                  </Typography>
                }
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
                onClick={() => handleClickOpen()}
                value={valueFin[0]?.metaAnual || ""}
                error={parseFloat(valueFin[0]?.metaAnual) < 0 ? true : false}
                helperText={
                  parseFloat(valueFin[0]?.metaAnual) < 0
                    ? "Meta Anual debe ser valor mayor que 0"
                    : null
                }
              />
              <TextField
                disabled={
                  MAEdit?.fin?.lineaBase && valueFin[0].lineaBase !== ""
                }
                sx={{ width: "18%", boxShadow: 2 }}
                variant={"filled"}
                label={
                  <Typography
                    sx={{ fontSize: "0.7vw", fontFamily: "MontserratMedium" }}
                  >
                    LÍNEA BASE 2021
                  </Typography>
                }
                error={
                  parseFloat(valueFin[0].lineaBase) < 0 ||
                  (isNaN(parseFloat(valueFin[0].lineaBase)) &&
                    valueFin[0].lineaBase !== "")
                    ? true
                    : false
                }
                helperText={
                  parseFloat(valueFin[0].lineaBase) < 0 ||
                  (isNaN(parseFloat(valueFin[0].lineaBase)) &&
                    valueFin[0].lineaBase !== "")
                    ? "Introducir valor mayor que 0"
                    : null
                }
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
                onChange={(c) => {
                  valueFin[0].lineaBase = c.target.value
                    .replaceAll('"', "")
                    .replaceAll("'", "")
                    .replaceAll("\n", "");
                  setValueFin([...valueFin]);
                }}
                value={valueFin[0]?.lineaBase || ""}
              />
              {JSON.parse(MIR).fin.indicador.toLowerCase().includes("indice") ||
              JSON.parse(MIR).fin.indicador.toLowerCase().includes("índice") ? (
                <TextField
                  disabled={
                    MAEdit?.fin?.valorNumerador &&
                    valueFin[0].valorNumerador !== ""
                  }
                  sx={{ width: "18%", boxShadow: 2 }}
                  variant={"filled"}
                  label={
                    <Typography
                      sx={{ fontSize: "0.7vw", fontFamily: "MontserratMedium" }}
                    >
                      ÍNDICE
                    </Typography>
                  }
                  InputLabelProps={{
                    style: {
                      fontFamily: "MontserratMedium",
                    },
                  }}
                  InputProps={{
                    style: {
                      fontFamily: "MontserratRegular",
                    },
                  }}
                  onClick={() => handleClickOpen()}
                  value={valueFin[0]?.valorNumerador || ""}
                />
              ) : (
                <Box sx={{ width: "45%" }}>
                  <TextField
                    disabled={
                      MAEdit?.fin?.valorNumerador &&
                      valueFin[0].valorNumerador !== ""
                    }
                    sx={{ width: "45%", boxShadow: 2, mr: "2%" }}
                    variant={"filled"}
                    label={
                      <Typography
                        sx={{
                          fontSize: "0.7vw",
                          fontFamily: "MontserratMedium",
                        }}
                      >
                        VALOR DEL NUMERADOR
                      </Typography>
                    }
                    InputLabelProps={{
                      style: {
                        fontFamily: "MontserratMedium",
                      },
                    }}
                    InputProps={{
                      style: {
                        fontFamily: "MontserratRegular",
                      },
                    }}
                    onClick={() => handleClickOpen()}
                    value={valueFin[0]?.valorNumerador || ""}
                  />
                  <TextField
                    disabled={
                      MAEdit?.fin?.valorDenominador &&
                      valueFin[0].valorDenominador !== ""
                    }
                    sx={{ width: "45%", boxShadow: 2 }}
                    variant={"filled"}
                    label={
                      <Typography
                        sx={{
                          fontSize: "0.7vw",
                          fontFamily: "MontserratMedium",
                        }}
                      >
                        VALOR DEL DENOMINADOR
                      </Typography>
                    }
                    InputLabelProps={{
                      style: {
                        fontFamily: "MontserratMedium",
                      },
                    }}
                    InputProps={{
                      style: {
                        fontFamily: "MontserratRegular",
                      },
                    }}
                    onClick={() => handleClickOpen()}
                    value={valueFin[0]?.valorDenominador || ""}
                  />
                </Box>
              )}

              <FormControl
                disabled={
                  MAEdit?.fin?.sentidoDelIndicador &&
                  valueFin[0].sentidoDelIndicador !== ""
                }
                sx={{
                  width: "15%",
                  height: "80%",
                  backgroundColor: "#f0f0f0",
                  boxShadow: 2,
                  fontFamily: "MontserratMedium",
                  justifyContent: "space-evenly",
                  alignItems: "flex-start",
                }}
              >
                <FormLabel
                  sx={{
                    fontFamily: "MontserratBold",
                    fontSize: "0.6vw",
                  }}
                >
                  SENTIDO DEL INDICADOR
                </FormLabel>
                <FormControlLabel
                  value={"ASCENDENTE"}
                  label={
                    <Typography
                      sx={{ fontSize: "0.6vw", fontFamily: "MontserratMedium" }}
                    >
                      ASCENDENTE
                    </Typography>
                  }
                  sx={{
                    fontFamily: "MontserratMedium",
                  }}
                  control={
                    <Radio
                      checked={
                        valueFin[0]?.sentidoDelIndicador === "ASCENDENTE"
                      }
                      onChange={(c) => {
                        valueFin[0].sentidoDelIndicador = c.target.value;
                        setValueFin([...valueFin]);
                      }}
                    />
                  }
                />
                <FormControlLabel
                  value={"DESCENDENTE"}
                  label={
                    <Typography
                      sx={{ fontSize: "0.6vw", fontFamily: "MontserratMedium" }}
                    >
                      DESCENDENTE
                    </Typography>
                  }
                  control={
                    <Radio
                      checked={
                        valueFin[0]?.sentidoDelIndicador === "DESCENDENTE"
                      }
                      onChange={(c) => {
                        valueFin[0].sentidoDelIndicador = c.target.value;
                        setValueFin([...valueFin]);
                      }}
                    />
                  }
                />
                <FormControlLabel
                  value={"NORMAL"}
                  label={
                    <Typography
                      sx={{ fontSize: "0.6vw", fontFamily: "MontserratMedium" }}
                    >
                      NORMAL
                    </Typography>
                  }
                  control={
                    <Radio
                      checked={valueFin[0]?.sentidoDelIndicador === "NORMAL"}
                      onChange={(c) => {
                        valueFin[0].sentidoDelIndicador = c.target.value;
                        setValueFin([...valueFin]);
                      }}
                    />
                  }
                />
              </FormControl>
            </Box>

            <Box
              sx={{
                display: "flex",
                width: "100%",
                height: "50%",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: 2,
                  width: "40%",
                  height: "12vh",
                  backgroundColor: "#f0f0f0",
                }}
              >
                <FormControl sx={{ width: "25vw" }}>
                  <Autocomplete
                    disabled={
                      MAEdit?.fin?.unidadResponsable &&
                      valueFin[0].unidadResponsable !== ""
                    }
                    options={catalogoUnidadResponsable}
                    getOptionLabel={(option) => option.Unidad}
                    value={{
                      Id: catalogoUnidadResponsable[0].Id || "",
                      Unidad: valueFin[0].unidadResponsable || "",
                    }}
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={option.Id}>
                          <p
                            style={{
                              fontFamily: "MontserratRegular",
                              fontSize: ".7vw",
                            }}
                          >
                            {option.Unidad}
                          </p>
                        </li>
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={"UNIDAD RESPONSABLE"}
                        variant="standard"
                        InputLabelProps={{
                          style: {
                            fontFamily: "MontserratSemiBold",
                            fontSize: ".7vw",
                          },
                        }}
                        sx={{
                          "& .MuiAutocomplete-input": {
                            fontFamily: "MontserratRegular",
                          },
                        }}
                      ></TextField>
                    )}
                    onChange={(event, value) => {
                      valueFin[0].unidadResponsable =
                        (value?.Unidad as string) || "";
                      setValueFin([...valueFin]);
                    }}
                    isOptionEqualToValue={(option, value) =>
                      option.Id === value.Id
                    }
                  />
                </FormControl>{" "}
              </Box>

              <TextField
                disabled={
                  MAEdit?.fin?.descIndicador && valueFin[0].descIndicador !== ""
                }
                rows={5}
                multiline
                sx={{ width: "40%", boxShadow: 2 }}
                variant={"filled"}
                label={
                  <Typography
                    sx={{ fontSize: "0.7vw", fontFamily: "MontserratMedium" }}
                  >
                    DESCRIPCIÓN DEL INDICADOR
                  </Typography>
                }
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
                onChange={(c) => {
                  valueFin[0].descIndicador = c.target.value
                    .replaceAll('"', "")
                    .replaceAll("'", "")
                    .replaceAll("\n", "");
                  setValueFin([...valueFin]);
                }}
                value={valueFin[0]?.descIndicador || ""}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                height: "30%",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <TextField
                disabled={
                  MAEdit?.fin?.descNumerador && valueFin[0].descNumerador !== ""
                }
                rows={5}
                multiline
                sx={{ width: "40%", boxShadow: 2 }}
                variant={"filled"}
                label={
                  <Typography
                    sx={{ fontSize: "0.7vw", fontFamily: "MontserratMedium" }}
                  >
                    DESCRIPCIÓN DEL NUMERADOR
                  </Typography>
                }
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
                onChange={(c) => {
                  valueFin[0].descNumerador = c.target.value
                    .replaceAll('"', "")
                    .replaceAll("'", "")
                    .replaceAll("\n", "");
                  setValueFin([...valueFin]);
                }}
                value={valueFin[0]?.descNumerador || ""}
              />
              <TextField
                disabled={
                  MAEdit?.fin?.descDenominador &&
                  valueFin[0].descDenominador !== ""
                }
                rows={5}
                multiline
                sx={{ width: "40%", boxShadow: 2 }}
                variant={"filled"}
                label={
                  <Typography
                    sx={{ fontSize: "0.7vw", fontFamily: "MontserratMedium" }}
                  >
                    DESCRIPCIÓN DEL DENOMINADOR
                  </Typography>
                }
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
                onChange={(c) => {
                  valueFin[0].descDenominador = c.target.value
                    .replaceAll('"', "")
                    .replaceAll("'", "")
                    .replaceAll("\n", "");
                  setValueFin([...valueFin]);
                }}
                value={valueFin[0]?.descDenominador || ""}
              />
            </Box>
          </Box>
        ) : null}

        {showProposito ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "90%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "100%",
                height: "33%",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <TextField
                disabled
                sx={{ width: "18%", boxShadow: 2 }}
                variant={"filled"}
                label={
                  <Typography
                    sx={{ fontSize: "0.7vw", fontFamily: "MontserratMedium" }}
                  >
                    META ANUAL 2023
                  </Typography>
                }
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
                onClick={() => handleClickOpen()}
                value={valueProposito[0]?.metaAnual || ""}
                error={
                  parseFloat(valueProposito[0]?.metaAnual) < 0 ? true : false
                }
                helperText={
                  parseFloat(valueProposito[0]?.metaAnual) < 0
                    ? "Meta Anual debe ser valor mayor que 0"
                    : null
                }
              />
              <TextField
                disabled={
                  MAEdit?.fin?.lineaBase && valueFin[0].lineaBase !== ""
                }
                sx={{ width: "18%", boxShadow: 2 }}
                variant={"filled"}
                label={
                  <Typography
                    sx={{ fontSize: "0.7vw", fontFamily: "MontserratMedium" }}
                  >
                    LÍNEA BASE 2021
                  </Typography>
                }
                error={
                  parseFloat(valueProposito[0].lineaBase) < 0 ||
                  (isNaN(parseFloat(valueProposito[0].lineaBase)) &&
                    valueProposito[0].lineaBase !== "")
                    ? true
                    : false
                }
                helperText={
                  parseFloat(valueProposito[0].lineaBase) < 0 ||
                  (isNaN(parseFloat(valueProposito[0].lineaBase)) &&
                    valueProposito[0].lineaBase !== "")
                    ? "Introducir valor mayor que 0"
                    : null
                }
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
                onChange={(c) => {
                  valueProposito[0].lineaBase = c.target.value
                    .replaceAll('"', "")
                    .replaceAll("'", "")
                    .replaceAll("\n", "");
                  setValueProposito([...valueProposito]);
                }}
                value={valueProposito[0]?.lineaBase || ""}
              />

              {JSON.parse(MIR)
                .proposito.indicador.toLowerCase()
                .includes("indice") ||
              JSON.parse(MIR)
                .proposito.indicador.toLowerCase()
                .includes("índice") ? (
                <TextField
                  disabled={
                    MAEdit?.fin?.valorNumerador &&
                    valueFin[0].valorNumerador !== ""
                  }
                  sx={{ width: "18%", boxShadow: 2 }}
                  variant={"filled"}
                  label={
                    <Typography
                      sx={{ fontSize: "0.7vw", fontFamily: "MontserratMedium" }}
                    >
                      ÍNDICE
                    </Typography>
                  }
                  InputLabelProps={{
                    style: {
                      fontFamily: "MontserratMedium",
                    },
                  }}
                  InputProps={{
                    style: {
                      fontFamily: "MontserratRegular",
                    },
                  }}
                  onClick={() => handleClickOpen()}
                  value={valueProposito[0]?.valorNumerador || ""}
                />
              ) : (
                <Box sx={{ width: "45%" }}>
                  <TextField
                    disabled={
                      MAEdit?.fin?.valorNumerador &&
                      valueFin[0].valorNumerador !== ""
                    }
                    sx={{ width: "45%", boxShadow: 2, mr: "2%" }}
                    variant={"filled"}
                    label={
                      <Typography
                        sx={{
                          fontSize: "0.7vw",
                          fontFamily: "MontserratMedium",
                        }}
                      >
                        VALOR DEL NUMERADOR
                      </Typography>
                    }
                    InputLabelProps={{
                      style: {
                        fontFamily: "MontserratMedium",
                      },
                    }}
                    InputProps={{
                      style: {
                        fontFamily: "MontserratRegular",
                      },
                    }}
                    onClick={() => handleClickOpen()}
                    value={valueProposito[0]?.valorNumerador || ""}
                  />
                  <TextField
                    disabled={
                      MAEdit?.fin?.valorDenominador &&
                      valueFin[0].valorDenominador !== ""
                    }
                    sx={{ width: "45%", boxShadow: 2 }}
                    variant={"filled"}
                    label={
                      <Typography
                        sx={{
                          fontSize: "0.7vw",
                          fontFamily: "MontserratMedium",
                        }}
                      >
                        VALOR DEL DENOMINADOR
                      </Typography>
                    }
                    InputLabelProps={{
                      style: {
                        fontFamily: "MontserratMedium",
                      },
                    }}
                    InputProps={{
                      style: {
                        fontFamily: "MontserratRegular",
                      },
                    }}
                    onClick={() => handleClickOpen()}
                    value={valueProposito[0]?.valorDenominador || ""}
                  />
                </Box>
              )}

              <FormControl
                disabled={
                  MAEdit?.fin?.sentidoDelIndicador &&
                  valueFin[0].sentidoDelIndicador !== ""
                }
                sx={{
                  width: "15%",
                  height: "80%",
                  backgroundColor: "#f0f0f0",
                  boxShadow: 2,
                  fontFamily: "MontserratMedium",
                  justifyContent: "space-evenly",
                  alignItems: "flex-start",
                }}
              >
                <FormLabel
                  sx={{
                    fontFamily: "MontserratBold",
                    fontSize: "0.6vw",
                  }}
                >
                  SENTIDO DEL INDICADOR
                </FormLabel>
                <FormControlLabel
                  value={"ASCENDENTE"}
                  label={
                    <Typography
                      sx={{ fontSize: "0.6vw", fontFamily: "MontserratMedium" }}
                    >
                      ASCENDENTE
                    </Typography>
                  }
                  sx={{
                    fontFamily: "MontserratMedium",
                  }}
                  control={
                    <Radio
                      checked={
                        valueProposito[0]?.sentidoDelIndicador === "ASCENDENTE"
                      }
                      onChange={(c) => {
                        valueProposito[0].sentidoDelIndicador = c.target.value;
                        setValueProposito([...valueProposito]);
                      }}
                    />
                  }
                />
                <FormControlLabel
                  value={"DESCENDENTE"}
                  label={
                    <Typography
                      sx={{ fontSize: "0.6vw", fontFamily: "MontserratMedium" }}
                    >
                      DESCENDENTE
                    </Typography>
                  }
                  control={
                    <Radio
                      checked={
                        valueProposito[0]?.sentidoDelIndicador === "DESCENDENTE"
                      }
                      onChange={(c) => {
                        valueProposito[0].sentidoDelIndicador = c.target.value;
                        setValueProposito([...valueProposito]);
                      }}
                    />
                  }
                />
                <FormControlLabel
                  value={"NORMAL"}
                  label={
                    <Typography
                      sx={{ fontSize: "0.6vw", fontFamily: "MontserratMedium" }}
                    >
                      NORMAL
                    </Typography>
                  }
                  control={
                    <Radio
                      checked={
                        valueProposito[0]?.sentidoDelIndicador === "NORMAL"
                      }
                      onChange={(c) => {
                        valueProposito[0].sentidoDelIndicador = c.target.value;
                        setValueProposito([...valueProposito]);
                      }}
                    />
                  }
                />
              </FormControl>
            </Box>

            <Box
              sx={{
                display: "flex",
                width: "100%",
                height: "50%",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: 2,
                  width: "40%",
                  height: "12vh",
                  backgroundColor: "#f0f0f0",
                }}
              >
                <FormControl
                  disabled={
                    MAEdit?.fin?.unidadResponsable &&
                    valueFin[0].unidadResponsable !== ""
                  }
                  sx={{ width: "25vw" }}
                >
                  <Autocomplete
                    disabled={false}
                    options={catalogoUnidadResponsable}
                    getOptionLabel={(option) => option.Unidad}
                    value={{
                      Id: catalogoUnidadResponsable[0].Id,
                      Unidad: valueProposito[0].unidadResponsable,
                    }}
                    renderOption={(props: any, option: any) => {
                      return (
                        <li {...props}>
                          <p
                            style={{
                              fontFamily: "MontserratRegular",
                              fontSize: ".7vw",
                            }}
                          >
                            {option.Unidad}
                          </p>
                        </li>
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={"UNIDAD RESPONSABLE"}
                        variant="standard"
                        InputLabelProps={{
                          style: {
                            fontFamily: "MontserratSemiBold",
                            fontSize: ".7vw",
                          },
                        }}
                        sx={{
                          "& .MuiAutocomplete-input": {
                            fontFamily: "MontserratRegular",
                          },
                        }}
                      ></TextField>
                    )}
                    onChange={(event, value) => {
                      valueProposito[0].unidadResponsable =
                        (value?.Unidad as string) || "";
                      setValueProposito([...valueProposito]);
                    }}
                    isOptionEqualToValue={(option, value) =>
                      option.Id === value.Id
                    }
                  />
                </FormControl>
              </Box>

              <TextField
                disabled={
                  MAEdit?.fin?.descIndicador && valueFin[0].descIndicador !== ""
                }
                rows={5}
                multiline
                sx={{ width: "40%", boxShadow: 2 }}
                variant={"filled"}
                label={
                  <Typography
                    sx={{ fontSize: "0.7vw", fontFamily: "MontserratMedium" }}
                  >
                    DESCRIPCIÓN DEL INDICADOR
                  </Typography>
                }
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
                onChange={(c) => {
                  valueProposito[0].descIndicador = c.target.value
                    .replaceAll('"', "")
                    .replaceAll("'", "")
                    .replaceAll("\n", "");
                  setValueProposito([...valueProposito]);
                }}
                value={valueProposito[0]?.descIndicador || ""}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                height: "30%",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <TextField
                disabled={
                  MAEdit?.fin?.descNumerador && valueFin[0].descNumerador !== ""
                }
                rows={5}
                multiline
                sx={{ width: "40%", boxShadow: 2 }}
                variant={"filled"}
                label={
                  <Typography
                    sx={{ fontSize: "0.7vw", fontFamily: "MontserratMedium" }}
                  >
                    DESCRIPCIÓN DEL NUMERADOR
                  </Typography>
                }
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
                onChange={(c) => {
                  valueProposito[0].descNumerador = c.target.value
                    .replaceAll('"', "")
                    .replaceAll("'", "")
                    .replaceAll("\n", "");
                  setValueProposito([...valueProposito]);
                }}
                value={valueProposito[0]?.descNumerador || ""}
              />
              <TextField
                disabled={
                  MAEdit?.fin?.descDenominador &&
                  valueFin[0].descDenominador !== ""
                }
                rows={5}
                multiline
                sx={{ width: "40%", boxShadow: 2 }}
                variant={"filled"}
                label={
                  <Typography
                    sx={{ fontSize: "0.7vw", fontFamily: "MontserratMedium" }}
                  >
                    DESCRIPCIÓN DEL DENOMINADOR
                  </Typography>
                }
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
                onChange={(c) => {
                  valueProposito[0].descDenominador = c.target.value
                    .replaceAll('"', "")
                    .replaceAll("'", "")
                    .replaceAll("\n", "");
                  setValueProposito([...valueProposito]);
                }}
                value={valueProposito[0]?.descDenominador || ""}
              />
            </Box>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}

export default TabFinPropositoMA;

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
  medios_verificacion: string;
  supuestos: string;
}
