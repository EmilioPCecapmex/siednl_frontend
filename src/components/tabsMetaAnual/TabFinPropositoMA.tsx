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
import { IMAEdit } from "./IMA";

export function TabFinPropositoMA({
  edit,
  //show,
  setMAFinPadre,
  setMAPropositoPadre,
  showMirFnc,
  setTxtShowFnc,
  finPadre,
  propositoPadre,
  MA,
  MIR,
  maPadreEdit,
}: {
  edit: boolean;
  //show: boolean;
  setMAFinPadre: Function;
  setMAPropositoPadre: Function;
  showMirFnc: Function;
  setTxtShowFnc: Function;
  finPadre: IFinMA;
  propositoPadre: IPropositoMA;
  MA: string;
  MIR: string;
  maPadreEdit: IMAEdit;
}) {
  let jsonMA =
    MA === ""
      ? ""
      : JSON.parse(MA).length > 1
      ? JSON.parse(MA)[0]
      : JSON.parse(MA);

  let MAEdit =
    MA === "" ? "" : JSON.parse(MA).length > 1 ? JSON.parse(MA)[1] : "";

  const [valueFin, setValueFin] = useState<IFinMA>(finPadre);

  //values
  const [valueProposito, setValueProposito] =
    useState<IPropositoMA>(propositoPadre);

  const [showFin, setShowFin] = useState(true);

  const [catalogoUnidadResponsable, setCatalogounidadResponsable] = useState([
    {
      Id: "",
      Label: "",
    },
  ]);

  const [showProposito, setShowProposito] = useState(false);

  // useEffect(() => {
  //   resumenFinMa(valueFin);
  //   resumenPropositoMa(valueProposito);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [valueFin, valueProposito]);

  useEffect(() => {
    setValueFin(finPadre);
  }, [finPadre]);

  useEffect(() => {
    setValueProposito(propositoPadre);
  }, [propositoPadre]);

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
    let auxFin = valueFin;
    let auxProposito = valueProposito;
    if (elementoFormula === "Fin") {
      if (
        JSON.parse(MIR).fin.indicador.toLowerCase().includes("indice") ||
        JSON.parse(MIR).fin.indicador.toLowerCase().includes("índice")
      ) {
        auxFin.valorNumerador = txt.split(",")[0];
        auxFin.metaAnual = txt.split(",")[0];
      } else {
        auxFin.valorNumerador = txt.split(",")[0];
        auxFin.valorDenominador = txt.split(",")[1];
        auxFin.metaAnual = txt.split(",")[2];
      }
      setValueFin({ ...auxFin });
    } else if (elementoFormula === "Propósito") {
      if (
        JSON.parse(MIR).proposito.indicador.toLowerCase().includes("indice") ||
        JSON.parse(MIR).proposito.indicador.toLowerCase().includes("índice")
      ) {
        auxProposito.valorNumerador = txt.split(",")[0];
        auxProposito.metaAnual = txt.split(",")[0];
      } else {
        auxProposito.valorNumerador = txt.split(",")[0];
        auxProposito.valorDenominador = txt.split(",")[1];
        auxProposito.metaAnual = txt.split(",")[2];
      }
      setValueProposito({ ...auxProposito });
    }
  };

  const getUnidades = () => {
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

  const getListasLogin = (datos: any, setState: Function) => {
    axios
      .get(process.env.REACT_APP_APPLICATION_LOGIN + "/api/listas", {
        params: datos,
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setState(r.data.data);
      });
  };

  useEffect(() => {
    // getUnidades();

    setMAFinPadre(valueFin);

    getListasLogin(
      {
        Tabla: "EntidadesHijas",
        ValorCondicion: JSON.parse(MIR).encabezado.entidad.Id,
      },
      setCatalogounidadResponsable
    );
  }, [valueFin]);

  useEffect(() => {
    if (valueProposito?.lineaBase !== "") {
      setMAPropositoPadre(valueProposito);
    }

    getListasLogin(
      {
        Tabla: "EntidadesHijas",
        ValorCondicion: JSON.parse(MIR).encabezado.entidad.Id,
      },
      setCatalogounidadResponsable
    );
  }, [valueProposito]);

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
      // visibility={show ? "visible" : "hidden"}
      //position="absolute"
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
        elementoA={""}
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
                    edit &&
                    !MAEdit?.fin?.metaAnual &&
                    valueFin?.metaAnual !== ""
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
                    MAEdit?.fin?.metaAnual && valueFin?.metaAnual !== ""
                      ? ""
                      : handleClickOpen()
                  }
                  value={valueFin?.metaAnual || ""}
                  error={parseFloat(valueFin?.metaAnual) < 0 ? true : false}
                  helperText={
                    parseFloat(valueFin?.metaAnual) < 0
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
                    edit &&
                    !MAEdit?.fin?.lineaBase &&
                    valueFin?.lineaBase !== ""
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
                    parseFloat(valueFin?.lineaBase) < 0 ||
                    (isNaN(parseFloat(valueFin?.lineaBase)) &&
                      valueFin?.lineaBase !== "")
                      ? true
                      : false
                  }
                  helperText={
                    parseFloat(valueFin?.lineaBase) < 0 ||
                    (isNaN(parseFloat(valueFin?.lineaBase)) &&
                      valueFin?.lineaBase !== "")
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
                    let auxFin = valueFin;
                    auxFin.lineaBase = c.target.value
                      .replaceAll('"', "")
                      .replaceAll("'", "")
                      .replaceAll("\n", "");
                    setValueFin({ ...auxFin });
                  }}
                  value={valueFin?.lineaBase || ""}
                />
              </Grid>

              {JSON.parse(MIR).fin.indicador.toLowerCase().includes("indice") ||
              JSON.parse(MIR).fin.indicador.toLowerCase().includes("INDICE") ||
              JSON.parse(MIR).fin.indicador.toLowerCase().includes("ÍNDICE") ||
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
                      edit &&
                      !MAEdit?.fin?.valorNumerador &&
                      valueFin?.valorNumerador !== ""
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
                      valueFin?.valorNumerador !== ""
                        ? ""
                        : handleClickOpen()
                    }
                    value={valueFin?.valorNumerador || ""}
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
                    columnGap: 2,
                  }}
                >
                  <TextField
                    disabled={
                      edit &&
                      !MAEdit?.fin?.valorNumerador &&
                      valueFin?.valorNumerador !== ""
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
                         NUMERADOR
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
                      valueFin?.valorNumerador !== ""
                        ? ""
                        : handleClickOpen()
                    }
                    value={valueFin?.valorNumerador || ""}
                  />

                  <TextField
                    disabled={
                      edit &&
                      !MAEdit?.fin?.valorDenominador &&
                      valueFin?.valorDenominador !== ""
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
                         DENOMINADOR
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
                      valueFin?.valorDenominador !== ""
                        ? ""
                        : handleClickOpen()
                    }
                    value={valueFin?.valorDenominador || ""}
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
                    edit &&
                    !MAEdit?.fin?.sentidoDelIndicador &&
                    valueFin?.sentidoDelIndicador !== ""
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
                        checked={valueFin?.sentidoDelIndicador === "ASCENDENTE"}
                        onChange={(c) => {
                          let auxFin = valueFin;
                          auxFin.sentidoDelIndicador = c.target.value;
                          setValueFin({ ...auxFin });
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
                          valueFin?.sentidoDelIndicador === "DESCENDENTE"
                        }
                        onChange={(c) => {
                          let auxFin = valueFin;
                          auxFin.sentidoDelIndicador = c.target.value;
                          setValueFin({ ...auxFin });
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
                        checked={valueFin?.sentidoDelIndicador === "NORMAL"}
                        onChange={(c) => {
                          let auxFin = valueFin;
                          auxFin.sentidoDelIndicador = c.target.value;
                          setValueFin({ ...auxFin });
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
                      edit &&
                      !MAEdit?.fin?.unidadResponsable &&
                      valueFin?.unidadResponsable !== ""
                    }
                    options={catalogoUnidadResponsable}
                    getOptionLabel={(option) => option.Label}
                    value={{
                      Id: catalogoUnidadResponsable[0].Id || "",
                      Label: valueFin?.unidadResponsable || "",
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
                            {option.Label}
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
                      let auxFin = valueFin;
                      valueFin.unidadResponsable =
                        (value?.Label as string) || "";

                      setValueFin({ ...auxFin });
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
                    edit &&
                    !MAEdit?.fin?.descIndicador &&
                    valueFin?.descIndicador !== ""
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
                    let auxFin = valueFin;
                    auxFin.descIndicador = c.target.value
                      .replaceAll('"', "")
                      .replaceAll("'", "")
                      .replaceAll("\n", "");
                    setValueFin({ ...auxFin });
                  }}
                  value={valueFin?.descIndicador || ""}
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
                    edit &&
                    !MAEdit?.fin?.descNumerador &&
                    valueFin?.descNumerador !== ""
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
                    let auxFin = valueFin;
                    auxFin.descNumerador = c.target.value
                      .replaceAll('"', "")
                      .replaceAll("'", "")
                      .replaceAll("\n", "");
                    setValueFin({ ...auxFin });
                  }}
                  value={valueFin?.descNumerador || ""}
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
                    edit &&
                    !MAEdit?.fin?.descDenominador &&
                    valueFin?.descDenominador !== ""
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
                    let auxFin = valueFin;
                    auxFin.descDenominador = c.target.value
                      .replaceAll('"', "")
                      .replaceAll("'", "")
                      .replaceAll("\n", "");
                    setValueFin({ ...auxFin });
                  }}
                  value={valueFin?.descDenominador || ""}
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
                    edit &&
                    !MAEdit?.proposito?.metaAnual &&
                    valueProposito?.metaAnual !== ""
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
                    valueProposito.metaAnual !== ""
                      ? ""
                      : handleClickOpen()
                  }
                  value={valueProposito?.metaAnual || ""}
                  error={
                    parseFloat(valueProposito?.metaAnual) < 0 ? true : false
                  }
                  helperText={
                    parseFloat(valueProposito?.metaAnual) < 0
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
                    edit &&
                    !MAEdit?.proposito?.lineaBase &&
                    valueProposito?.lineaBase !== ""
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
                    parseFloat(valueProposito?.lineaBase) < 0 ||
                    (isNaN(parseFloat(valueProposito?.lineaBase)) &&
                      valueProposito?.lineaBase !== "")
                      ? true
                      : false
                  }
                  helperText={
                    parseFloat(valueProposito?.lineaBase) < 0 ||
                    (isNaN(parseFloat(valueProposito?.lineaBase)) &&
                      valueProposito?.lineaBase !== "")
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
                    let auxProposito = valueProposito;
                    auxProposito.lineaBase = c.target.value
                      .replaceAll('"', "")
                      .replaceAll("'", "")
                      .replaceAll("\n", "");
                    setValueProposito({ ...auxProposito });
                  }}
                  value={valueProposito?.lineaBase || ""}
                />
              </Grid>

              {JSON.parse(MIR).fin.indicador.toLowerCase().includes("indice") ||
              JSON.parse(MIR).fin.indicador.toLowerCase().includes("INDICE") ||
              JSON.parse(MIR).fin.indicador.toLowerCase().includes("ÍNDICE") ||
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
                      edit &&
                      !MAEdit?.proposito?.valorNumerador &&
                      valueProposito.valorNumerador !== ""
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
                      valueProposito.valorNumerador !== ""
                        ? ""
                        : handleClickOpen()
                    }
                    value={valueProposito?.valorNumerador || ""}
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
                    columnGap: 2,
                  }}
                >
                  <TextField
                    disabled={
                      edit &&
                      !MAEdit?.proposito?.valorNumerador &&
                      valueProposito.valorNumerador !== ""
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
                        NUMERADOR
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
                      valueProposito.valorNumerador !== ""
                        ? ""
                        : handleClickOpen()
                    }
                    value={valueProposito?.valorNumerador || ""}
                  />
                  <TextField
                    disabled={
                      edit &&
                      !MAEdit?.proposito?.valorDenominador &&
                      valueProposito.valorDenominador !== ""
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
                        DENOMINADOR
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
                      valueProposito.valorDenominador !== ""
                        ? ""
                        : handleClickOpen()
                    }
                    value={valueProposito?.valorDenominador || ""}
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
                    edit &&
                    !MAEdit?.proposito?.sentidoDelIndicador &&
                    valueProposito.sentidoDelIndicador !== ""
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
                          valueProposito?.sentidoDelIndicador === "ASCENDENTE"
                        }
                        onChange={(c) => {
                          let auxProposito = valueProposito;
                          auxProposito.sentidoDelIndicador = c.target.value;
                          setValueProposito({ ...auxProposito });
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
                          valueProposito?.sentidoDelIndicador === "DESCENDENTE"
                        }
                        onChange={(c) => {
                          let auxProposito = valueProposito;
                          auxProposito.sentidoDelIndicador = c.target.value;
                          setValueProposito({ ...auxProposito });
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
                          valueProposito?.sentidoDelIndicador === "NORMAL"
                        }
                        onChange={(c) => {
                          let auxProposito = valueProposito;
                          auxProposito.sentidoDelIndicador = c.target.value;
                          setValueProposito({ ...auxProposito });
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
                      edit &&
                      !MAEdit?.fin?.unidadResponsable &&
                      valueProposito.unidadResponsable !== ""
                    }
                    options={catalogoUnidadResponsable}
                    getOptionLabel={(option) => option.Label}
                    value={{
                      Id: catalogoUnidadResponsable[0].Id || "",
                      Label: valueProposito.unidadResponsable || "",
                    }}
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={option.Id}>
                          <p
                            style={{
                              fontFamily: "MontserratRegular",
                            }}
                          >
                            {option.Label}
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
                      let auxProposito = valueProposito;
                      auxProposito.unidadResponsable =
                        (value?.Label as string) || "";
                      setValueProposito({ ...auxProposito });
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
                    edit &&
                    !MAEdit?.proposito?.descIndicador &&
                    valueProposito.descIndicador !== ""
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
                    let auxProposito = valueProposito;
                    auxProposito.descIndicador = c.target.value
                      .replaceAll('"', "")
                      .replaceAll("'", "")
                      .replaceAll("\n", "");
                    setValueProposito({ ...auxProposito });
                  }}
                  value={valueProposito?.descIndicador || ""}
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
                    edit &&
                    !MAEdit?.proposito?.descNumerador &&
                    valueProposito.descNumerador !== ""
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
                    let auxProposito = valueProposito;
                    auxProposito.descNumerador = c.target.value
                      .replaceAll('"', "")
                      .replaceAll("'", "")
                      .replaceAll("\n", "");
                    setValueProposito({ ...auxProposito });
                  }}
                  value={valueProposito.descNumerador || ""}
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
                    edit &&
                    !MAEdit?.proposito?.descDenominador &&
                    valueProposito.descDenominador !== ""
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
                    let auxProposito = valueProposito;
                    auxProposito.descDenominador = c.target.value
                      .replaceAll('"', "")
                      .replaceAll("'", "")
                      .replaceAll("\n", "");
                    setValueProposito({ ...auxProposito });
                  }}
                  value={valueProposito.descDenominador || ""}
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
