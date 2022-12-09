import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Divider,
  List,
  ListItemButton,
  FormControl,
  Autocomplete,
} from "@mui/material";
import { IComponenteMA } from "./Interfaces";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import { FormulaDialogMA } from "../formulasDialog/FormulaDialogMA";
import { FormulaDialogMACA } from "../formulasDialog/FormulaDialogMACA";
import axios from "axios";

export const TabComponenteMA = ({
  show,
  valoresComponenteMAFnc,
  noComponentes,
  showMirFnc,
  setTxtShowFnc,
  MA,
  MIR,
}: {
  show: boolean;
  valoresComponenteMAFnc: Function;
  noComponentes: number[];
  showMirFnc: Function;
  setTxtShowFnc: Function;
  MA: string;
  MIR: string;
}) => {
  const [componentSelect, setComponentSelect] = useState(1);

  const [componentesValues, setComponentesValues] = useState<
    Array<IComponenteMA>
  >([]);

  let jsonMA = MA === "" ? "" : JSON.parse(MA);

  useEffect(() => {
    let comp: IComponenteMA[] = [];

    noComponentes.map((x, index) => {
      return comp.push({
        componentes: "C" + (index + 1),
        metaAnual: MA === "" ? "" : jsonMA?.componentes[index]?.metaAnual || "",
        lineaBase: MA === "" ? "" : jsonMA?.componentes[index]?.lineaBase || "",
        metasPorFrecuencia: [
          {
            semestre1:
              MA === ""
                ? ""
                : jsonMA?.componentes[index]?.metasPorFrecuencia[0]
                    ?.semestre1 || "",
            semestre2:
              MA === ""
                ? ""
                : jsonMA?.componentes[index]?.metasPorFrecuencia[0]
                    ?.semestre2 || "",
            trimestre1:
              MA === ""
                ? ""
                : jsonMA?.componentes[index]?.metasPorFrecuencia[0]
                    ?.trimestre1 || "",
            trimestre2:
              MA === ""
                ? ""
                : jsonMA?.componentes[index]?.metasPorFrecuencia[0]
                    ?.trimestre2 || "",
            trimestre3:
              MA === ""
                ? ""
                : jsonMA?.componentes[index]?.metasPorFrecuencia[0]
                    ?.trimestre3 || "",
            trimestre4:
              MA === ""
                ? ""
                : jsonMA?.componentes[index]?.metasPorFrecuencia[0]
                    ?.trimestre4 || "",
          },
        ],

        valorNumerador:
          MA === "" ? "" : jsonMA?.componentes[index]?.valorNumerador || "",
        valorDenominador:
          MA === "" ? "" : jsonMA?.componentes[index]?.valorDenominador || "",
        sentidoDelIndicador:
          MA === ""
            ? ""
            : jsonMA?.componentes[index]?.sentidoDelIndicador || "",

        unidadResponsable:
          MA === "" ? "" : jsonMA?.componentes[index]?.unidadResponsable || "",

        descIndicador:
          MA === "" ? "" : jsonMA?.componentes[index]?.descIndicador || "",
        descNumerador:
          MA === "" ? "" : jsonMA?.componentes[index]?.descNumerador || "",
        descDenominador:
          MA === "" ? "" : jsonMA?.componentes[index]?.descDenominador || "",
      });
    });

    setComponentesValues(comp);
  }, [noComponentes]);

  useEffect(() => {
    valoresComponenteMAFnc(componentesValues);
  }, [componentesValues]);

  const [openFormulaDialog, setOpenFormulaDialog] = useState(false);
  const [tipoFormula, setTipoFormula] = useState("");
  const [elementoFormula, setElementoFormula] = useState("");

  const [openFormulaDialogMACA, setOpenFormulaDialogMACA] = useState(false);
  const [frecuencia, setFrecuencia] = useState("");

  const handleClickOpen = () => {
    setTipoFormula(
      JSON.parse(MIR).componentes[componentSelect - 1].indicador.includes(
        "PORCENTAJE"
      ) ||
        JSON.parse(MIR).componentes[
          componentSelect - 1
        ].indicador.toLowerCase() === "porcentaje"
        ? "Porcentaje"
        : JSON.parse(MIR).componentes[componentSelect - 1].indicador.includes(
            "TASA"
          ) ||
          JSON.parse(MIR).componentes[
            componentSelect - 1
          ].indicador.toLowerCase() === "tasa"
        ? "Tasa"
        : JSON.parse(MIR).componentes[componentSelect - 1].indicador.includes(
            "INDICE" || "ÍNDICE"
          ) ||
          JSON.parse(MIR).componentes[
            componentSelect - 1
          ].indicador.toLowerCase() === "indice" ||
          JSON.parse(MIR).componentes[
            componentSelect - 1
          ].indicador.toLowerCase() === "índice"
        ? "Indice"
        : JSON.parse(MIR).componentes[componentSelect - 1].indicador.includes(
            "PROMEDIO"
          ) ||
          JSON.parse(MIR).componentes[
            componentSelect - 1
          ].indicador.toLowerCase() === "promedio"
        ? "Promedio"
        : ""
    );
    setElementoFormula("Componente " + componentSelect.toString());
    setOpenFormulaDialog(true);
  };

  const handleClose = () => {
    setOpenFormulaDialog(false);
  };

  const handleClickOpen2 = () => {
    setTipoFormula(
      JSON.parse(MIR).componentes[componentSelect - 1].indicador.includes(
        "PORCENTAJE"
      ) ||
        JSON.parse(MIR).componentes[
          componentSelect - 1
        ].indicador.toLowerCase() === "porcentaje"
        ? "Porcentaje"
        : JSON.parse(MIR).componentes[componentSelect - 1].indicador.includes(
            "TASA"
          ) ||
          JSON.parse(MIR).componentes[
            componentSelect - 1
          ].indicador.toLowerCase() === "tasa"
        ? "Tasa"
        : JSON.parse(MIR).componentes[componentSelect - 1].indicador.includes(
            "INDICE" || "ÍNDICE"
          ) ||
          JSON.parse(MIR).componentes[
            componentSelect - 1
          ].indicador.toLowerCase() === "indice" ||
          JSON.parse(MIR).componentes[
            componentSelect - 1
          ].indicador.toLowerCase() === "índice"
        ? "Indice"
        : JSON.parse(MIR).componentes[componentSelect - 1].indicador.includes(
            "PROMEDIO"
          ) ||
          JSON.parse(MIR).componentes[
            componentSelect - 1
          ].indicador.toLowerCase() === "promedio"
        ? "Promedio"
        : ""
    );
    setElementoFormula("Componente " + componentSelect.toString());
    setOpenFormulaDialogMACA(true);
  };

  const handleClose2 = () => {
    setOpenFormulaDialogMACA(false);
  };

  const changeFormula = (txt: string) => {
    componentesValues[componentSelect - 1].valorNumerador = txt.split(",")[0];
    componentesValues[componentSelect - 1].valorDenominador = txt.split(",")[1];
    componentesValues[componentSelect - 1].metaAnual = txt.split(",")[2] ;
    setComponentesValues([...componentesValues]);
  };

  const changeFormula2 = (txt: string) => {
    if (frecuencia === "trimestral") {
      componentesValues[componentSelect - 1].metasPorFrecuencia[0].trimestre1 =
        txt.split(",")[0] ;
      componentesValues[componentSelect - 1].metasPorFrecuencia[0].trimestre2 =
        txt.split(",")[1] ;
      componentesValues[componentSelect - 1].metasPorFrecuencia[0].trimestre3 =
        txt.split(",")[2] ;
      componentesValues[componentSelect - 1].metasPorFrecuencia[0].trimestre4 =
        txt.split(",")[3] ;
    } else {
      componentesValues[componentSelect - 1].metasPorFrecuencia[0].semestre1 =
        txt.split(",")[0] ;
      componentesValues[componentSelect - 1].metasPorFrecuencia[0].semestre2 =
        txt.split(",")[1] ;
    }

    setComponentesValues([...componentesValues]);
  };

  const [catalogoUnidadResponsable, setCatalogoUnidadResponsable] = useState([
    {
      Id: 0,
      Unidad: "",
    },
  ]);

  const getUnidades = () => {
    axios
      .get("http://10.200.4.105:8000/api/listadoUnidadesInst", {
        params: {
          Institucion: "a52a01f1-56cf-11ed-a988-040300000000",
        },

        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })

      .then((r) => {
        setCatalogoUnidadResponsable(r.data.data);
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

      <FormulaDialogMACA
        open={openFormulaDialogMACA}
        close={handleClose2}
        textoSet={changeFormula2}
        tipo={tipoFormula}
        elemento={elementoFormula}
        MIR={MIR}
        frecuencia={frecuencia}
      />
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
            setTxtShowFnc("Componentes");
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
          COMPONENTE {componentSelect}
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
          {noComponentes.map((item) => {
            return (
              <Box
                key={item}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Divider />

                <ListItemButton
                  selected={item === componentSelect ? true : false}
                  key={item}
                  onClick={() => {
                    setComponentSelect(item);
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
                    COMPONENTE {item}
                  </Typography>
                </ListItemButton>

                <Divider />
              </Box>
            );
          })}
        </List>

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
              value={componentesValues[componentSelect - 1]?.metaAnual || ""}
              error={
                parseFloat(componentesValues[componentSelect - 1]?.metaAnual) <
                  0 ||
                (componentesValues[componentSelect - 1]?.metaAnual !==
                  componentesValues[componentSelect - 1]?.metasPorFrecuencia[0]
                    ?.trimestre4 &&
                  componentesValues[componentSelect - 1]?.metaAnual !==
                    componentesValues[componentSelect - 1]
                      ?.metasPorFrecuencia[0]?.semestre2)
                  ? true
                  : false
              }
              helperText={
                parseFloat(componentesValues[componentSelect - 1]?.metaAnual) <
                  0 ||
                (componentesValues[componentSelect - 1]?.metaAnual !==
                  componentesValues[componentSelect - 1]?.metasPorFrecuencia[0]
                    ?.trimestre4 &&
                  componentesValues[componentSelect - 1]?.metaAnual !==
                    componentesValues[componentSelect - 1]
                      ?.metasPorFrecuencia[0]?.semestre2)
                  ? JSON.parse(MIR).componentes[
                      componentSelect - 1
                    ].frecuencia?.toLowerCase() === "trimestral"
                    ? "El valor de la meta anual debe coincidir con el valor del trimestre 4, verifica los valores"
                    : "El valor de la meta anual debe coincidir con el valor del semestre 2, verifica los valores"
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
                (parseFloat(componentesValues[componentSelect - 1]?.lineaBase) <
                  0 ||
                  isNaN(
                    parseFloat(
                      componentesValues[componentSelect - 1]?.lineaBase
                    )
                  )) &&
                componentesValues[componentSelect - 1]?.lineaBase !== ""
                  ? true
                  : false
              }
              helperText={
                (parseFloat(componentesValues[componentSelect - 1]?.lineaBase) <
                  0 ||
                  isNaN(
                    parseFloat(
                      componentesValues[componentSelect - 1]?.lineaBase
                    )
                  )) &&
                componentesValues[componentSelect - 1]?.lineaBase !== ""
                  ? "Introducir valor mayor que 0."
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
                componentesValues[componentSelect - 1].lineaBase =
                  c.target.value;
                setComponentesValues([...componentesValues]);
              }}
              value={componentesValues[componentSelect - 1]?.lineaBase || ""}
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
              value={
                componentesValues[componentSelect - 1]?.valorNumerador || ""
              }
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
              value={
                componentesValues[componentSelect - 1]?.valorDenominador || ""
              }
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
                      componentesValues[componentSelect - 1]
                        ?.sentidoDelIndicador === "ASCENDENTE"
                    }
                    onChange={(c) => {
                      componentesValues[
                        componentSelect - 1
                      ].sentidoDelIndicador = c.target.value;
                      setComponentesValues([...componentesValues]);
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
                      componentesValues[componentSelect - 1]
                        ?.sentidoDelIndicador === "DESCENDENTE"
                    }
                    onChange={(c) => {
                      componentesValues[
                        componentSelect - 1
                      ].sentidoDelIndicador = c.target.value;
                      setComponentesValues([...componentesValues]);
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
                      componentesValues[componentSelect - 1]
                        ?.sentidoDelIndicador === "NORMAL"
                    }
                    onChange={(c) => {
                      componentesValues[
                        componentSelect - 1
                      ].sentidoDelIndicador = c.target.value;
                      setComponentesValues([...componentesValues]);
                    }}
                  />
                }
              />
            </FormControl>
          </Box>

          {JSON.parse(MIR).componentes[
            componentSelect - 1
          ].frecuencia?.toLowerCase() === "trimestral" ? (
            <Box
              sx={{
                display: "flex",
                width: "100%",
                height: "20%",
                alignItems: "center",
                justifyContent: "space-evenly",
                flexWrap: "wrap",
              }}
            >
              <TextField
                sx={{ width: "18%", boxShadow: 2 }}
                variant={"filled"}
                onClick={() => {
                  setFrecuencia(
                    JSON.parse(MIR).componentes[
                      componentSelect - 1
                    ].frecuencia?.toLowerCase()
                  );
                  handleClickOpen2();
                }}
                label={
                  <Typography
                    sx={{ fontSize: "0.7vw", fontFamily: "MontserratMedium" }}
                  >
                    TRIMESTRE 1
                  </Typography>
                }
                value={
                  componentesValues[componentSelect - 1]?.metasPorFrecuencia[0]
                    ?.trimestre1 || ""
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
              />

              <TextField
                sx={{ width: "18%", boxShadow: 2 }}
                variant={"filled"}
                onClick={() => {
                  setFrecuencia(
                    JSON.parse(MIR).componentes[
                      componentSelect - 1
                    ].frecuencia?.toLowerCase()
                  );
                  handleClickOpen2();
                }}
                label={
                  <Typography
                    sx={{ fontSize: "0.7vw", fontFamily: "MontserratMedium" }}
                  >
                    TRIMESTRE 2
                  </Typography>
                }
                value={
                  componentesValues[componentSelect - 1]?.metasPorFrecuencia[0]
                    ?.trimestre2 || ""
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
              />
              <TextField
                sx={{ width: "18%", boxShadow: 2 }}
                variant={"filled"}
                onClick={() => {
                  setFrecuencia(
                    JSON.parse(MIR).componentes[
                      componentSelect - 1
                    ].frecuencia?.toLowerCase()
                  );
                  handleClickOpen2();
                }}
                label={
                  <Typography
                    sx={{ fontSize: "0.7vw", fontFamily: "MontserratMedium" }}
                  >
                    TRIMESTRE 3
                  </Typography>
                }
                value={
                  componentesValues[componentSelect - 1]?.metasPorFrecuencia[0]
                    ?.trimestre3 || ""
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
              />
              <TextField
                sx={{ width: "18%", boxShadow: 2 }}
                variant={"filled"}
                onClick={() => {
                  setFrecuencia(
                    JSON.parse(MIR).componentes[
                      componentSelect - 1
                    ].frecuencia?.toLowerCase()
                  );
                  handleClickOpen2();
                }}
                label={
                  <Typography
                    sx={{ fontSize: "0.7vw", fontFamily: "MontserratMedium" }}
                  >
                    TRIMESTRE 4
                  </Typography>
                }
                value={
                  componentesValues[componentSelect - 1]?.metasPorFrecuencia[0]
                    ?.trimestre4 || ""
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
              />
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                width: "100%",
                height: "20%",
                alignItems: "center",
                justifyContent: "space-evenly",
                flexWrap: "wrap",
              }}
            >
              <TextField
                sx={{ width: "18%", boxShadow: 2 }}
                variant={"filled"}
                onClick={() => {
                  setFrecuencia(
                    JSON.parse(MIR).componentes[
                      componentSelect - 1
                    ].frecuencia?.toLowerCase()
                  );
                  handleClickOpen2();
                }}
                label={
                  <Typography
                    sx={{ fontSize: "0.7vw", fontFamily: "MontserratMedium" }}
                  >
                    SEMESTRE 1
                  </Typography>
                }
                value={
                  componentesValues[componentSelect - 1]?.metasPorFrecuencia[0]
                    ?.semestre1 || ""
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
              />
              <TextField
                sx={{ width: "18%", boxShadow: 2 }}
                variant={"filled"}
                onClick={() => {
                  setFrecuencia(
                    JSON.parse(MIR).componentes[
                      componentSelect - 1
                    ].frecuencia?.toLowerCase()
                  );
                  handleClickOpen2();
                }}
                label={
                  <Typography
                    sx={{ fontSize: "0.7vw", fontFamily: "MontserratMedium" }}
                  >
                    SEMESTRE 2
                  </Typography>
                }
                value={
                  componentesValues[componentSelect - 1]?.metasPorFrecuencia[0]
                    ?.semestre2 || ""
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
              />
            </Box>
          )}

          <Box
            sx={{
              display: "flex",
              width: "100%",
              height: "30%",
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
                  disabled={false}
                  options={catalogoUnidadResponsable}
                  getOptionLabel={(option) => option.Unidad}
                  value={{
                    Id: catalogoUnidadResponsable[0].Id,
                    Unidad:
                      componentesValues[componentSelect - 1]?.unidadResponsable,
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
                    componentesValues[componentSelect - 1].unidadResponsable =
                      value?.Unidad || "";
                    setComponentesValues([...componentesValues]);
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option.Id === value.Id
                  }
                />
              </FormControl>{" "}
            </Box>

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
              value={
                componentesValues[componentSelect - 1]?.descIndicador || ""
              }
              onChange={(c) => {
                componentesValues[componentSelect - 1].descIndicador =
                  c.target.value;
                setComponentesValues([...componentesValues]);
              }}
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
              value={
                componentesValues[componentSelect - 1]?.descNumerador || ""
              }
              onChange={(c) => {
                componentesValues[componentSelect - 1].descNumerador =
                  c.target.value;
                setComponentesValues([...componentesValues]);
              }}
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
              value={
                componentesValues[componentSelect - 1]?.descDenominador || ""
              }
              onChange={(c) => {
                componentesValues[componentSelect - 1].descDenominador =
                  c.target.value;
                setComponentesValues([...componentesValues]);
              }}
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
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
