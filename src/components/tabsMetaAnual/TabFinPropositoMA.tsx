import { useEffect, useState } from "react";
import {
  TextField,
  Box,
  Typography,
  List,
  ListItemButton,
  Divider,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
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
  let jsonMA = MA === "" ? "" : JSON.parse(MA);

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
  // variable para la lista
  //const [unidadR, SetUnidadR] = useState(MA === '' ? '' : JSON.parse(MA).proposito.UnidadResponsable);
  // catalogo de la lista

  const [Catalogounidadresponsable, setCatalogounidadResponsable] = useState([
    {
      Id: 0,
      UnidadResponsable: "",
    },
  ]);

  const [showProposito, setShowProposito] = useState(false);

  useEffect(() => {
    resumenFinMa(valueFin);
    resumenPropositoMa(valueProposito);
    getUnidades();
  }, [valueFin, valueProposito]);

  const [openFormulaDialog, setOpenFormulaDialog] = useState(false);
  const [tipoFormula, setTipoFormula] = useState("");
  const [elementoFormula, setElementoFormula] = useState("");

  const handleClickOpen = () => {
    if (showFin) {
      setTipoFormula(
        JSON.parse(MIR).fin.indicador.includes("PORCENTAJE")
          ? "Porcentaje"
          : JSON.parse(MIR).fin.indicador.includes("TASA")
          ? "Tasa"
          : JSON.parse(MIR).fin.indicador.includes("INDICE" || "ÍNDICE")
          ? "Indice"
          : JSON.parse(MIR).fin.indicador.includes("PROMEDIO")
          ? "Promedio"
          : ""
      );
      setElementoFormula("Fin");
      setOpenFormulaDialog(true);
    }
    if (showProposito) {
      setTipoFormula(
        JSON.parse(MIR).fin.indicador.includes("PORCENTAJE")
          ? "Porcentaje"
          : JSON.parse(MIR).fin.indicador.includes("TASA")
          ? "Tasa"
          : JSON.parse(MIR).fin.indicador.includes("INDICE")
          ? "Indice"
          : "Promedio"
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
      valueFin[0].valorNumerador = txt.split(",")[0];
      valueFin[0].valorDenominador = txt.split(",")[1];
      valueFin[0].metaAnual = txt.split(",")[2] + "%";
      setValueFin([...valueFin]);
    } else if (elementoFormula === "Propósito") {
      valueProposito[0].valorNumerador = txt.split(",")[0];
      valueProposito[0].valorDenominador = txt.split(",")[1];
      valueProposito[0].metaAnual = txt.split(",")[2] + "%";
      setValueProposito([...valueProposito]);
    }
  };

  const getUnidades = () => {
    axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/listadoUnidadesInst",
        {
          params: {
            Institucion: "a51c0b8b-56cf-11ed-a988-040300000000",
          },

          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )

      .then((r) => {
        setCatalogounidadResponsable(r.data.data);
        console.log(r.data);
      })

      .catch((err) => {});
  };
  //carga el codigo y trae la info del catalogo
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
                value={valueFin[0]?.metaAnual || ""}
                error={parseFloat(valueFin[0]?.metaAnual) < 0 ? true : false}
                helperText={
                  parseFloat(valueFin[0]?.metaAnual) < 0
                    ? "Meta Anual debe ser valor mayor que 0"
                    : null
                }
              />
              <TextField
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
                  valueFin[0].lineaBase = c.target.value;
                  setValueFin([...valueFin]);
                }}
                value={valueFin[0]?.lineaBase || ""}
              />
              <TextField
                sx={{ width: "18%", boxShadow: 2 }}
                variant={"filled"}
                label={
                  <Typography
                    sx={{ fontSize: "0.7vw", fontFamily: "MontserratMedium" }}
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
                sx={{ width: "18%", boxShadow: 2 }}
                variant={"filled"}
                label={
                  <Typography
                    sx={{ fontSize: "0.7vw", fontFamily: "MontserratMedium" }}
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
              <FormControl
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
              <FormControl sx={{ width: "40%", boxShadow: 2 }}>
                <Autocomplete
                  disabled={false}
                  disablePortal
                  options={Catalogounidadresponsable}
                  getOptionLabel={(option) => option.UnidadResponsable}
                  value={{
                    Id: Catalogounidadresponsable[0].Id,
                    UnidadResponsable: valueFin[0].unidadResponsable,
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
                          {option.unidadResponsable}
                        </p>
                      </li>
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={"UNIDADE RESPONSABLE"}
                      variant="standard"
                      InputLabelProps={{
                        style: {
                          fontFamily: "MontserratSemiBold",
                          fontSize: ".8vw",
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
                    //SetUnidadR(value?.UnidadResponsable as string)
                    valueFin[0].unidadResponsable =
                      value?.UnidadResponsable as string;
                    setValueFin([...valueFin]);
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option.Id === value.Id
                  }
                />
              </FormControl>

              <TextField
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
                  valueFin[0].descIndicador = c.target.value;
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
                  valueFin[0].descNumerador = c.target.value;
                  setValueFin([...valueFin]);
                }}
                value={valueFin[0]?.descNumerador || ""}
              />
              <TextField
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
                  valueFin[0].descDenominador = c.target.value;
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
                  valueProposito[0].lineaBase = c.target.value;
                  setValueProposito([...valueProposito]);
                }}
                value={valueProposito[0]?.lineaBase || ""}
              />
              <TextField
                sx={{ width: "18%", boxShadow: 2 }}
                variant={"filled"}
                label={
                  <Typography
                    sx={{ fontSize: "0.7vw", fontFamily: "MontserratMedium" }}
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
                sx={{ width: "18%", boxShadow: 2 }}
                variant={"filled"}
                label={
                  <Typography
                    sx={{ fontSize: "0.7vw", fontFamily: "MontserratMedium" }}
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
              <FormControl
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
              <FormControl sx={{ width: "40%", boxShadow: 2 }}>
                <Autocomplete
                  disabled={false}
                  disablePortal
                  options={Catalogounidadresponsable}
                  getOptionLabel={(option) => option.UnidadResponsable}
                  value={{
                    Id: Catalogounidadresponsable[0].Id,
                    UnidadResponsable: valueProposito[0].unidadResponsable,
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
                          {option.unidadResponsable}
                        </p>
                      </li>
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={"UNIDADE RESPONSABLE"}
                      variant="standard"
                      InputLabelProps={{
                        style: {
                          fontFamily: "MontserratSemiBold",
                          fontSize: ".8vw",
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
                    //SetUnidadR(value?.UnidadResponsable as string)
                    valueProposito[0].unidadResponsable =
                      value?.UnidadResponsable as string;
                    setValueProposito([...valueProposito]);
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option.Id === value.Id
                  }
                />
              </FormControl>

              <TextField
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
                  valueProposito[0].descIndicador = c.target.value;
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
                  valueProposito[0].descNumerador = c.target.value;
                  setValueProposito([...valueProposito]);
                }}
                value={valueProposito[0]?.descNumerador || ""}
              />
              <TextField
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
                  valueProposito[0].descDenominador = c.target.value;
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
