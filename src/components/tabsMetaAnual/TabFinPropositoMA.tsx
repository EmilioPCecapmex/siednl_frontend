import { useEffect, useState } from "react";
import {
  TextField,
  Grid,
  Typography,
  List,
  ListItemButton,
  Divider,
  FormControl,
  Autocomplete,
  Tooltip,
  useMediaQuery,
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
      Nombre: "",
    },
  ]);

  const [showProposito, setShowProposito] = useState(false);

  useEffect(() => {
    resumenFinMa(valueFin);
    resumenPropositoMa(valueProposito);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // axios
    //   .get(
    //     process.env.REACT_APP_APPLICATION_BACK + "/api/listadoUnidadesInst",
    //     {
    //       params: {
    //         Institucion: JSON.parse(MIR).encabezado.institucion,
    //       },

    //       headers: {
    //         Authorization: localStorage.getItem("jwtToken") || "",
    //       },
    //     }
    //   )

    //   .then((r) => {
    //     setCatalogounidadResponsable(r.data.data);
    //   })

    //   .catch((err) => {});

    axios
      .get(process.env.REACT_APP_APPLICATION_LOGIN + "/api/lista-entidades", {
        params: {
          IdUsuario: localStorage.getItem("IdUsuario"),
          Rol: localStorage.getItem("Rol"),
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setCatalogounidadResponsable(r.data.data);
      });
  };

  useEffect(() => {
    getUnidades();
  }, []);

  const style = {
    fontFamily: "MontserratSemiBold",
    fontSize: "14px", // Tamaño de fuente predeterminado

    // Media queries definidas como objetos separados y combinadas con merge
    "@media (max-width: 600px)": {
      fontSize: 12, // Tamaño de fuente para pantallas pequeñas
    },
    "@media (min-width: 601px) and (max-width: 960px)": {
      fontSize: 16, // Tamaño de fuente para pantallas medianas
    },
    "@media (min-width: 961px) and (max-width: 1280px)": {
      fontSize: 18, // Tamaño de fuente para pantallas más grandes
    },
    "@media (min-width: 1281px)": {
      fontSize: 20, // Tamaño de fuente para pantallas muy grandes
    },
    "@media (min-width: 2200px)": {
      fontSize: 24, // Tamaño de fuente para pantallas extremadamente grandes
    },
  };

  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  return (
    <Grid
      visibility={show ? "visible" : "hidden"}
      position="absolute"
      sx={{
        display: "flex",
        width: "93vw",
        height: "82vh",
        boxShadow: 10,
        borderRadius: 5,
        flexDirection: "column",
        backgroundColor: "#fff",
        overflow: "auto",
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

      {!isSmallScreen ? (
        <Grid
          sx={{
            width: "100%",
            display: "flex",
            height: "7vh",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Tooltip title="RESUMEN FIN Y PROPOSITO">
            <InfoOutlinedIcon
              onClick={() => {
                showMirFnc(true);
                showFin ? setTxtShowFnc("Fin") : setTxtShowFnc("Proposito");
              }}
              fontSize="large"
              sx={{ cursor: "pointer" }}
            ></InfoOutlinedIcon>
          </Tooltip>
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
        </Grid>
      ) : null}

      <Grid
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
        }}
      >
        {!isSmallScreen && (
          <List
            sx={{
              width: "15vw",
              height: "95%",
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
            <Grid
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
                  sx={{
                    fontFamily: "MontserratMedium",
                    fontSize: [10, 10, 10, 13, 15, 18],
                  }}
                >
                  FIN
                </Typography>
              </ListItemButton>
              <Divider />
            </Grid>

            <Grid
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
                  sx={{
                    fontFamily: "MontserratMedium",
                    fontSize: [10, 10, 10, 13, 15, 18],
                  }}
                >
                  PROPÓSITO
                </Typography>
              </ListItemButton>
              <Divider />
            </Grid>
          </List>
        )}

        {showFin ? (
          <>
            <Grid
              item
              container
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                "& > .MuiGrid-item": {
                  marginBottom: "20px", // Ajusta la cantidad de espacio vertical entre los elementos
                },
              }}
            >
              {isSmallScreen && (
                <Grid>
                  <List>
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
                        sx={{
                          fontFamily: "MontserratMedium",
                          fontSize: [10, 10, 10, 13, 15, 18],
                        }}
                      >
                        FIN
                      </Typography>
                    </ListItemButton>
                    <Divider />

                    <Grid
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
                          sx={{
                            fontFamily: "MontserratMedium",
                            fontSize: [10, 10, 10, 13, 15, 18],
                          }}
                        >
                          PROPÓSITO
                        </Typography>
                      </ListItemButton>
                      <Divider />
                    </Grid>
                  </List>
                </Grid>
              )}

              <Grid
                item
                xl={3}
                lg={3}
                md={2}
                sm={2}
                xs={12}
                sx={{
                  alignContent: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <TextField
                  disabled={
                    MAEdit?.fin?.metaAnual && valueFin[0].metaAnual !== ""
                  }
                  sx={{
                    boxShadow: 2,
                    fontSize: [10, 10, 10, 15, 15, 18],
                  }}
                  variant={"filled"}
                  label={
                    <Typography
                      sx={{
                        fontSize: [10, 10, 10, 15, 15, 18],
                        fontFamily: "MontserratMedium",
                      }}
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
                  onClick={() =>
                    MAEdit?.fin?.metaAnual && valueFin[0].metaAnual !== ""
                      ? ""
                      : handleClickOpen()
                  }
                  value={valueFin[0]?.metaAnual || ""}
                  error={parseFloat(valueFin[0]?.metaAnual) < 0 ? true : false}
                  helperText={
                    parseFloat(valueFin[0]?.metaAnual) < 0
                      ? "Meta Anual debe ser valor mayor que 0"
                      : null
                  }
                />
              </Grid>

              <Grid
                item
                xl={3}
                lg={3}
                md={2}
                sm={2}
                xs={12}
                sx={{
                  alignContent: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <TextField
                  disabled={
                    MAEdit?.fin?.lineaBase && valueFin[0].lineaBase !== ""
                  }
                  sx={{
                    boxShadow: 2,
                    fontSize: [10, 10, 10, 15, 15, 18],
                  }}
                  variant={"filled"}
                  label={
                    <Typography
                      sx={{
                        fontSize: [10, 10, 10, 15, 15, 18],
                        fontFamily: "MontserratMedium",
                      }}
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
              </Grid>

              {JSON.parse(MIR).fin.indicador.toLowerCase().includes("indice") ||
              JSON.parse(MIR).fin.indicador.toLowerCase().includes("índice") ? (
                <Grid
                  item
                  xl={3}
                  lg={3}
                  md={2}
                  sm={2}
                  xs={12}
                  sx={{
                    alignContent: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <TextField
                    disabled={
                      MAEdit?.fin?.valorNumerador &&
                      valueFin[0].valorNumerador !== ""
                    }
                    sx={{
                      fontSize: [10, 10, 10, 15, 15, 18],
                      boxShadow: 2,
                    }}
                    variant={"filled"}
                    label={
                      <Typography
                        sx={{
                          fontSize: [10, 10, 10, 15, 15, 18],
                          fontFamily: "MontserratMedium",
                        }}
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
                    onClick={() =>
                      MAEdit?.fin?.valorNumerador &&
                      valueFin[0].valorNumerador !== ""
                        ? ""
                        : handleClickOpen()
                    }
                    value={valueFin[0]?.valorNumerador || ""}
                  />
                </Grid>
              ) : (
                <Grid
                  item
                  xl={3}
                  lg={3}
                  md={2}
                  sm={2}
                  xs={12}
                  sx={{
                    alignContent: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <TextField
                    disabled={
                      MAEdit?.fin?.valorNumerador &&
                      valueFin[0].valorNumerador !== ""
                    }
                    sx={{
                      boxShadow: 2,
                      //mr: "2%",
                      fontSize: [10, 10, 10, 15, 15, 18],
                    }}
                    variant={"filled"}
                    label={
                      <Typography
                        sx={{
                          fontSize: [10, 10, 10, 15, 15, 18],
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
                    onClick={() =>
                      MAEdit?.fin?.valorNumerador &&
                      valueFin[0].valorNumerador !== ""
                        ? ""
                        : handleClickOpen()
                    }
                    value={valueFin[0]?.valorNumerador || ""}
                  />
                  <TextField
                    disabled={
                      MAEdit?.fin?.valorDenominador &&
                      valueFin[0].valorDenominador !== ""
                    }
                    sx={{
                      boxShadow: 2,
                      fontSize: [10, 10, 10, 15, 15, 18],
                    }}
                    variant={"filled"}
                    label={
                      <Typography
                        sx={{
                          fontSize: [10, 10, 10, 15, 15, 18],
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
                    onClick={() =>
                      MAEdit?.fin?.valorDenominador &&
                      valueFin[0].valorDenominador !== ""
                        ? ""
                        : handleClickOpen()
                    }
                    value={valueFin[0]?.valorDenominador || ""}
                  />
                </Grid>
              )}

              <Grid
                item
                xl={3}
                lg={3}
                md={4}
                sm={4}
                xs={12}
                sx={{
                  alignContent: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <FormControl
                  disabled={
                    MAEdit?.fin?.sentidoDelIndicador &&
                    valueFin[0].sentidoDelIndicador !== ""
                  }
                  sx={{
                    backgroundColor: "#f0f0f0",
                    boxShadow: 6,
                    fontFamily: "MontserratMedium",
                    justifyContent: "space-evenly",
                    alignItems: "flex-start",
                  }}
                >
                  <FormLabel
                    sx={{
                      fontFamily: "MontserratBold",
                      fontSize: [10, 10, 10, 11, 12, 13],
                    }}
                  >
                    SENTIDO DEL INDICADOR
                  </FormLabel>
                  <FormControlLabel
                    value={"ASCENDENTE"}
                    label={
                      <Typography
                        sx={{
                          fontSize: [10, 10, 10, 11, 12, 13],
                          fontFamily: "MontserratMedium",
                        }}
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
                        sx={{
                          fontSize: [10, 10, 10, 11, 12, 13],
                          fontFamily: "MontserratMedium",
                        }}
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
                        sx={{
                          fontSize: [10, 10, 10, 11, 12, 13],
                          fontFamily: "MontserratMedium",
                        }}
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
              </Grid>

              <Grid
                item
                xl={2}
                lg={2}
                md={4}
                sm={4}
                xs={11}
                sx={{
                  alignContent: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <FormControl required fullWidth>
                  <Autocomplete
                    clearText="Borrar"
                    noOptionsText="Sin opciones"
                    closeText="Cerrar"
                    openText="Abrir"
                    disabled={
                      MAEdit?.fin?.unidadResponsable &&
                      valueFin[0].unidadResponsable !== ""
                    }
                    options={catalogoUnidadResponsable}
                    getOptionLabel={(option) => option.Nombre}
                    value={{
                      Id: catalogoUnidadResponsable[0].Id || "",
                      Nombre: valueFin[0].unidadResponsable || "",
                    }}
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={option.Id}>
                          <p
                            style={{
                              fontFamily: "MontserratRegular",
                              //fontSize: ".7vw",
                            }}
                          >
                            {option.Nombre}
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
                            //fontSize: "1vw",
                          },
                        }}
                        sx={{
                          fontFamily: "MontserratRegular",
                          fontSize: [10, 10, 10, 13, 15, 18],
                        }}
                      ></TextField>
                    )}
                    onChange={(event, value) => {
                      valueFin[0].unidadResponsable =
                        (value?.Nombre as string) || "";
                      setValueFin([...valueFin]);
                    }}
                    isOptionEqualToValue={(option, value) =>
                      option.Id === value.Id
                    }
                  />
                </FormControl>{" "}
              </Grid>


              <Grid
                item
                xl={3}
                lg={3}
                md={2}
                sm={2}
                xs={12}
                sx={{
                  alignContent: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <TextField
                  disabled={
                    MAEdit?.fin?.descIndicador &&
                    valueFin[0].descIndicador !== ""
                  }
                  rows={5}
                  multiline
                  sx={{ boxShadow: 2 }}
                  variant={"filled"}
                  label={
                    <Typography
                      sx={{
                        fontSize: [10, 10, 10, 13, 15, 18],
                        fontFamily: "MontserratMedium",
                      }}
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
              </Grid>

              <Grid
                item
                xl={3}
                lg={3}
                md={2}
                sm={2}
                xs={12}
                sx={{
                  alignContent: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <TextField
                  disabled={
                    MAEdit?.fin?.descNumerador &&
                    valueFin[0].descNumerador !== ""
                  }
                  rows={5}
                  multiline
                  sx={{ boxShadow: 2 }}
                  variant={"filled"}
                  label={
                    <Typography
                      sx={{
                        fontSize: [10, 10, 10, 13, 15, 18],
                        fontFamily: "MontserratMedium",
                      }}
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
              </Grid>

              <Grid
                item
                xl={3}
                lg={3}
                md={2}
                sm={2}
                xs={12}
                sx={{
                  alignContent: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <TextField
                  disabled={
                    MAEdit?.fin?.descDenominador &&
                    valueFin[0].descDenominador !== ""
                  }
                  rows={5}
                  multiline
                  sx={{ boxShadow: 2 }}
                  variant={"filled"}
                  label={
                    <Typography
                      sx={{
                        fontSize: [10, 10, 10, 13, 15, 18],
                        fontFamily: "MontserratMedium",
                      }}
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
              </Grid>
              
            </Grid>
          </>
        ) : null}

        {showProposito ? (
          <>
            <Grid
              item
              container
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                "& > .MuiGrid-item": {
                  marginBottom: "20px", // Ajusta la cantidad de espacio vertical entre los elementos
                },
              }}
            >
              {isSmallScreen && (
                <Grid>
                  <List>
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
                        sx={{
                          fontFamily: "MontserratMedium",
                          fontSize: [10, 10, 10, 13, 15, 18],
                        }}
                      >
                        FIN
                      </Typography>
                    </ListItemButton>
                    <Divider />

                    <Grid
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
                          sx={{
                            fontFamily: "MontserratMedium",
                            fontSize: [10, 10, 10, 13, 15, 18],
                          }}
                        >
                          PROPÓSITO
                        </Typography>
                      </ListItemButton>
                      <Divider />
                    </Grid>
                  </List>
                </Grid>
              )}

              <Grid
                item
                xl={3}
                lg={3}
                md={2}
                sm={2}
                xs={12}
                sx={{
                  alignContent: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <TextField
                  disabled={
                    MAEdit?.proposito?.metaAnual &&
                    valueProposito[0].metaAnual !== ""
                  }
                  sx={{ boxShadow: 2 }}
                  variant={"filled"}
                  label={
                    <Typography
                      sx={{
                        fontSize: [10, 10, 10, 13, 15, 18],
                        fontFamily: "MontserratMedium",
                      }}
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
                  onClick={() =>
                    MAEdit?.proposito?.metaAnual &&
                    valueProposito[0].metaAnual !== ""
                      ? ""
                      : handleClickOpen()
                  }
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
              </Grid>

              <Grid
                item
                xl={3}
                lg={3}
                md={2}
                sm={2}
                xs={12}
                sx={{
                  alignContent: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <TextField
                  disabled={
                    MAEdit?.proposito?.lineaBase &&
                    valueProposito[0].lineaBase !== ""
                  }
                  sx={{
                    fontSize: [10, 10, 10, 13, 15, 18],
                    boxShadow: 2,
                  }}
                  variant={"filled"}
                  label={
                    <Typography
                      sx={{
                        fontSize: [10, 10, 10, 13, 15, 18],
                        fontFamily: "MontserratMedium",
                      }}
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
              </Grid>

              {JSON.parse(MIR)
                .proposito.indicador.toLowerCase()
                .includes("indice") ||
              JSON.parse(MIR)
                .proposito.indicador.toLowerCase()
                .includes("índice") ? (
                <Grid
                  item
                  xl={3}
                  lg={3}
                  md={2}
                  sm={2}
                  xs={12}
                  sx={{
                    alignContent: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <TextField
                    disabled={
                      MAEdit?.proposito?.valorNumerador &&
                      valueProposito[0].valorNumerador !== ""
                    }
                    sx={{
                      boxShadow: 2,
                    }}
                    variant={"filled"}
                    label={
                      <Typography
                        sx={{
                          fontSize: [10, 10, 10, 13, 15, 18],
                          fontFamily: "MontserratMedium",
                        }}
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
                    onClick={() =>
                      MAEdit?.proposito?.valorNumerador &&
                      valueProposito[0].valorNumerador !== ""
                        ? ""
                        : handleClickOpen()
                    }
                    value={valueProposito[0]?.valorNumerador || ""}
                  />
                </Grid>
              ) : (
                <Grid
                  item
                  xl={3}
                  lg={3}
                  md={2}
                  sm={2}
                  xs={12}
                  sx={{
                    alignContent: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <TextField
                    disabled={
                      MAEdit?.proposito?.valorNumerador &&
                      valueProposito[0].valorNumerador !== ""
                    }
                    sx={{
                      fontSize: [10, 10, 10, 13, 15, 18],
                      width: "45%",
                      boxShadow: 2,
                      mr: "2%",
                    }}
                    variant={"filled"}
                    label={
                      <Typography
                        sx={{
                          fontSize: [10, 10, 10, 13, 15, 18],
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
                    onClick={() =>
                      MAEdit?.proposito?.valorNumerador &&
                      valueProposito[0].valorNumerador !== ""
                        ? ""
                        : handleClickOpen()
                    }
                    value={valueProposito[0]?.valorNumerador || ""}
                  />
                  <TextField
                    disabled={
                      MAEdit?.proposito?.valorDenominador &&
                      valueProposito[0].valorDenominador !== ""
                    }
                    sx={{ fontSize: [10, 10, 10, 13, 15, 18], boxShadow: 2 }}
                    variant={"filled"}
                    label={
                      <Typography
                        sx={{
                          fontSize: [10, 10, 10, 13, 15, 18],
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
                    onClick={() =>
                      MAEdit?.proposito?.valorDenominador &&
                      valueProposito[0].valorDenominador !== ""
                        ? ""
                        : handleClickOpen()
                    }
                    value={valueProposito[0]?.valorDenominador || ""}
                  />
                </Grid>
              )}

              <Grid
                item
                xl={3}
                lg={3}
                md={4}
                sm={4}
                xs={12}
                sx={{
                  alignContent: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <FormControl
                  disabled={
                    MAEdit?.proposito?.sentidoDelIndicador &&
                    valueProposito[0].sentidoDelIndicador !== ""
                  }
                  sx={{
                    backgroundColor: "#f0f0f0",
                    boxShadow: 6,
                    fontFamily: "MontserratMedium",
                    justifyContent: "space-evenly",
                    alignItems: "flex-start",
                  }}
                >
                  <FormLabel
                    sx={{
                      fontFamily: "MontserratBold",
                      fontSize: [10, 10, 10, 11, 12, 13],
                    }}
                  >
                    SENTIDO DEL INDICADOR
                  </FormLabel>
                  <FormControlLabel
                    value={"ASCENDENTE"}
                    label={
                      <Typography
                        sx={{
                          fontSize: [10, 10, 10, 11, 12, 13],
                          fontFamily: "MontserratMedium",
                        }}
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
                          valueProposito[0]?.sentidoDelIndicador ===
                          "ASCENDENTE"
                        }
                        onChange={(c) => {
                          valueProposito[0].sentidoDelIndicador =
                            c.target.value;
                          setValueProposito([...valueProposito]);
                        }}
                      />
                    }
                  />
                  <FormControlLabel
                    value={"DESCENDENTE"}
                    label={
                      <Typography
                        sx={{
                          fontSize: [10, 10, 10, 11, 12, 13],
                          fontFamily: "MontserratMedium",
                        }}
                      >
                        DESCENDENTE
                      </Typography>
                    }
                    control={
                      <Radio
                        checked={
                          valueProposito[0]?.sentidoDelIndicador ===
                          "DESCENDENTE"
                        }
                        onChange={(c) => {
                          valueProposito[0].sentidoDelIndicador =
                            c.target.value;
                          setValueProposito([...valueProposito]);
                        }}
                      />
                    }
                  />
                  <FormControlLabel
                    value={"NORMAL"}
                    label={
                      <Typography
                        sx={{
                          fontSize: [10, 10, 10, 11, 12, 13],
                          fontFamily: "MontserratMedium",
                        }}
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
                          valueProposito[0].sentidoDelIndicador =
                            c.target.value;
                          setValueProposito([...valueProposito]);
                        }}
                      />
                    }
                  />
                </FormControl>
              </Grid>

              <Grid
                item
                xl={2}
                lg={2}
                md={4}
                sm={4}
                xs={11}
                sx={{
                  alignContent: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <FormControl required fullWidth >
                  <Autocomplete
                    clearText="Borrar"
                    noOptionsText="Sin opciones"
                    closeText="Cerrar"
                    openText="Abrir"
                    disabled={
                      MAEdit?.fin?.unidadResponsable &&
                      valueProposito[0].unidadResponsable !== ""
                    }
                    options={catalogoUnidadResponsable}
                    getOptionLabel={(option) => option.Nombre}
                    value={{
                      Id: catalogoUnidadResponsable[0].Id || "",
                      Nombre: valueProposito[0].unidadResponsable || "",
                    }}
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={option.Id}>
                          <p
                            style={{
                              fontFamily: "MontserratRegular",
                             
                            }}
                          >
                            {option.Nombre}
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
                            
                          },
                        }}
                        sx={{
                          fontFamily: "MontserratRegular",
                          fontSize: [10, 10, 10, 13, 15, 18],
                        }}
                      ></TextField>
                    )}
                    style={style}
                    onChange={(event, value) => {
                      valueProposito[0].unidadResponsable =
                        (value?.Nombre as string) || "";
                      setValueProposito([...valueProposito]);
                    }}
                    isOptionEqualToValue={(option, value) =>
                      option.Id === value.Id
                    }
                  />
                </FormControl>{" "}
              </Grid>

              <Grid
                item
                xl={3}
                lg={3}
                md={2}
                sm={2}
                xs={12}
                sx={{
                  alignContent: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <TextField
                  disabled={
                    MAEdit?.proposito?.descIndicador &&
                    valueProposito[0].descIndicador !== ""
                  }
                  rows={5}
                  multiline
                  sx={{ boxShadow: 2 }}
                  variant={"filled"}
                  label={
                    <Typography
                      sx={{
                        fontSize: [10, 10, 10, 13, 15, 18],
                        fontFamily: "MontserratMedium",
                      }}
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
              </Grid>

              <Grid
                item
                xl={3}
                lg={3}
                md={2}
                sm={2}
                xs={12}
                sx={{
                  alignContent: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <TextField
                  disabled={
                    MAEdit?.proposito?.descNumerador &&
                    valueProposito[0].descNumerador !== ""
                  }
                  rows={5}
                  multiline
                  sx={{ boxShadow: 2 }}
                  variant={"filled"}
                  label={
                    <Typography
                      sx={{
                        fontSize: [10, 10, 10, 13, 15, 18],
                        fontFamily: "MontserratMedium",
                      }}
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
              </Grid>
              <Grid
                item
                xl={3}
                lg={3}
                md={2}
                sm={2}
                xs={12}
                sx={{
                  alignContent: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <TextField
                  disabled={
                    MAEdit?.proposito?.descDenominador &&
                    valueProposito[0].descDenominador !== ""
                  }
                  rows={5}
                  multiline
                  sx={{ boxShadow: 2 }}
                  variant={"filled"}
                  label={
                    <Typography
                      sx={{
                        fontSize: [10, 10, 10, 13, 15, 18],
                        fontFamily: "MontserratMedium",
                      }}
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
              </Grid>
            </Grid>
          </>
        ) : null}
      </Grid>
    </Grid>
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
