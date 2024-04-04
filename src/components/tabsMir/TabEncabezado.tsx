/* eslint-disable array-callback-return */

import React, { useEffect, useState } from "react";
import {
  FormControl,
  TextField,
  Grid,
  Autocomplete,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { ILista, IListaProgramas, IMIR, IMIREdit } from "./interfaces mir/IMIR";
import Stack from "@mui/material/Stack";
import {
  getListPedColumns,
  getLista,
  getListasLogin,
  getListasLoginProgramas,
} from "./services mir/servicesMIR";
import { alertaInfo } from "../genericComponents/Alertas";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
export function TabEncabezado({
  edit,
  show,
  MIR,
  setMIR,
  mirEdit,
  IdEntidad,
  setIdEntidad,
}: {
  edit: boolean;
  show: boolean;
  MIR: IMIR;
  setMIR: Function;
  mirEdit: IMIREdit;
  IdEntidad: string;
  setIdEntidad: Function;
}) {
  // const [nombreArchivo, setNombreArchivo] = useState(
  //   "ARRASTRE O DE CLICK AQUÍ PARA SELECCIONAR ARCHIVO"
  // );
  const objetoVacio: ILista = { Id: "", Label: "" };

  //Desactivar si el anterior no tiene value
  const [disabledProgramas, setDisabledProgramas] = useState(true);
  const [disabledTematicas, setDisabledTematicas] = useState(true);
  const [disabledObjetivos, setDisabledObjetivos] = useState(true);
  const [disabledEstrategias, setDisabledEstrategias] = useState(true);
  const [disabledLineasDeAccion, setDisabledLineasDeAccion] = useState(true);

  const [anticorrupcion, setAnticorrupcion] = React.useState(
    MIR.encabezado?.anticorrupcion || "NO"
  );

  //Catalogos
  const [catalogoAniosFiscales, setCatalogoAniosFiscales] = useState<
    Array<ILista>
  >([]);
  const [anioFiscal, setAnioFiscal] = useState<ILista>(
    MIR.encabezado.ejercicioFiscal || {
      Id: new Date().getFullYear().toString(),
      Label: new Date().getFullYear().toString(),
    }
  );

  const [catalogoInstituciones, setCatalogoInstituciones] = useState<
    Array<ILista>
  >([]);
  const [entidadSeleccionada, setEntidadSeleccionada] = useState(
    MIR.encabezado?.entidad || {
      Id: localStorage.getItem("IdEntidad") || "",
      Label: localStorage.getItem("Entidad") || "",
    }
  );

  const [catalogoProgramas, setCatalogoProgramas] = useState<
    Array<IListaProgramas>
  >([]);
  const [programa, setPrograma] = useState<IListaProgramas>(
    MIR.encabezado?.programa || { ...objetoVacio, Conac: "", Consecutivo: "" }
  );

  const [conac, setConac] = useState(MIR.encabezado?.conac || "");

  const [consecutivo, setConsecutivo] = useState(
    MIR.encabezado?.consecutivo || ""
  );

  const [catalogoEjes, setCatalogoEjes] = useState<Array<ILista>>([]);
  const [eje, setEje] = useState<ILista>(MIR.encabezado?.eje || objetoVacio);

  const [catalogoTematicas, setCatalogoTematicas] = useState<Array<ILista>>([]);
  const [tematica, setTematica] = useState<ILista>(
    MIR.encabezado?.tema || objetoVacio
  );

  const [catalogoObjetivos, setCatalogoObjetivos] = useState<Array<ILista>>([]);
  const [objetivo, setObjetivo] = useState<ILista>(
    MIR.encabezado?.objetivo || objetoVacio
  );

  const [catalogoEstrategias, setCatalogoEstrategias] = useState<Array<ILista>>(
    []
  );
  const [estrategia, setEstrategia] = useState<ILista>(
    MIR.encabezado?.estrategia || objetoVacio
  );

  const [catalogoLineasDeAccion, setCatalogoLineasDeAccion] = useState<
    Array<ILista>
  >([]);

  const [lineaDeAccion, setLineaDeAccion] = useState<Array<ILista>>(
    MIR.encabezado?.lineas_de_accion || []
  );

  const [catalogoBeneficiarios, setCatalogoBeneficiarios] = useState<
    Array<ILista>
  >([]);

  const [beneficiario, setBeneficiario] = useState<Array<ILista>>(
    MIR.encabezado?.beneficiario || []
  );

  useEffect(() => {
    getLista("AniosFiscales", "", setCatalogoAniosFiscales);

    getListasLoginProgramas(setCatalogoInstituciones);
    getListPedColumns({ Col: "Ejes", Id: "" }, setCatalogoEjes, () => {});
    getLista("Beneficiario", "", setCatalogoBeneficiarios);
    setEje(MIR.encabezado?.eje || objetoVacio);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (entidadSeleccionada?.Id) {
      getLista(
        "ProgramasXInstitucion",
        entidadSeleccionada?.Id,
        setCatalogoProgramas
      );

      setConac("");
      setConsecutivo("");
      setDisabledProgramas(false);
    }
  }, [entidadSeleccionada?.Id]);

  useEffect(() => {
    setDisabledObjetivos(true);

    setDisabledEstrategias(true);

    setDisabledLineasDeAccion(true);

    getListPedColumns(
      { Col: "Temáticas", Id: eje.Id },
      setCatalogoTematicas,
      setDisabledTematicas
    );
    setDisabledTematicas(false);
  }, [eje]);

  useEffect(() => {
    setDisabledEstrategias(true);

    setDisabledLineasDeAccion(true);
    getListPedColumns(
      { Col: "Objetivos", Id: tematica.Id },
      setCatalogoObjetivos,
      setDisabledObjetivos
    );
    setDisabledObjetivos(false);
  }, [tematica]);

  useEffect(() => {
    setDisabledLineasDeAccion(true);

    getListPedColumns(
      { Col: "Estrategias", Id: objetivo.Id },
      setCatalogoEstrategias,
      setDisabledEstrategias
    );
    setDisabledEstrategias(false);
  }, [objetivo]);

  useEffect(() => {
    getListPedColumns(
      { Col: "Lineas de Acción", Id: estrategia.Id },
      setCatalogoLineasDeAccion,
      setDisabledLineasDeAccion
    );
    setDisabledLineasDeAccion(false);
  }, [estrategia]);

  const onClearLineasDeAccion = () => {
    setLineaDeAccion([]);
  };

  const onClearBeneficiario = () => {
    setBeneficiario([]);
  };

  function RestaurarValores(tipo: string) {
    switch (tipo) {
      case "Eje":
        setTematica(objetoVacio);
        setObjetivo(objetoVacio);
        setEstrategia(objetoVacio);
        setLineaDeAccion([]);
        break;
      case "Tematica":
        setObjetivo(objetoVacio);
        setEstrategia(objetoVacio);
        setLineaDeAccion([]);
        break;
      case "Objetivo":
        setEstrategia(objetoVacio);
        setLineaDeAccion([]);
        break;
      case "Estrategia":
        setLineaDeAccion([]);
        break;
    }
  }

  useEffect(() => {
    setMIR((MIR: IMIR) => ({
      ...MIR,
      ...{
        encabezado: {
          ejercicioFiscal: anioFiscal,
          entidad: entidadSeleccionada,
          programa: programa,
          eje: eje,
          tema: tematica,
          objetivo: objetivo,
          estrategia: estrategia,
          lineas_de_accion: lineaDeAccion,
          beneficiario: beneficiario,
          conac: conac,
          consecutivo: consecutivo,
          anticorrupcion: anticorrupcion,
        },
      },
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    anioFiscal.Id,
    entidadSeleccionada.Id,
    programa.Id,
    eje.Id,
    tematica.Id,
    objetivo.Id,
    estrategia.Id,
    lineaDeAccion,
    beneficiario,
    conac,
    consecutivo,
    anticorrupcion,
  ]);

  useEffect(() => {
    setConac(programa.Conac);
    setConsecutivo(programa.Consecutivo);
  }, [programa]);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Grid
      container
      visibility={show ? "visible" : "hidden"}
      position="absolute"
      //height={"rem"}
      sx={{
        width: "93vw",
        height: ["90vh", "82vh", "82vh", "82vh", "82vh"],
        // justifyContent: "center",
        // alignItems: "center",
        // justifyItems: "center",
        backgroundColor: "#fff",
        ...(isSmallScreen
          ? {boxShadow: 10,
            borderRadius: 5,}
          : {
              
            }),
        ...(!isSmallScreen && {
          height: "85%",
          overflow: "auto",
          // Otros estilos específicos para pantallas pequeñas
        }),
        // display: "grid",
        // gridTemplateColumns: "repeat(3, 1fr)",
        // gridTemplateRows: "1fr 1fr 1fr 2fr",
      }}
    >
      {/* <Grid
        sx={{
          width: "5vw",
          height: "3vh",
          position: "absolute",
          top: "1vh",
          right: "1vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
         <Button href="/files/MIR_2023.xlsx" target="_blank" download>
          <Typography sx={{ fontFamily: "MontserratMedium", color: "#616161" }}>
            Plantilla
          </Typography>
        </Button> 
      </Grid> */}
      <Grid
        item
        container
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        display={"flex"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
      >
        <Grid
          xl={3}
          lg={3}
          md={3}
          sm={3}
          xs={10}
          item
          sx={{
            fontSize: [10, 10, 10, 13, 15, 18],
            margin: isSmallScreen ? "2px" : "5px",
          }}
        >
          <FormControl required fullWidth>
            <Autocomplete
              disabled={edit && !mirEdit?.encabezado.ejercicioFiscal}
              clearText="Borrar"
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"
              disablePortal
              size="small"
              options={catalogoAniosFiscales}
              getOptionLabel={(option) => option.Label || ""}
              value={anioFiscal}
              getOptionDisabled={(option) => {
                if (option.Id === "") {
                  return true;
                }
                return false;
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
                  label="EJERCICIO FISCAL"
                  variant="standard"
                  InputLabelProps={{
                    style: {
                      fontFamily: "MontserratSemiBold",
                    },
                  }}
                  sx={{
                    "& .MuiAutocomplete-input": {
                      fontFamily: "MontserratRegular",
                    },
                  }}
                ></TextField>
              )}
              onChange={(event, value) => setAnioFiscal(value || objetoVacio)}
              isOptionEqualToValue={(option, value) => option.Id === value.Id}
            />
          </FormControl>
        </Grid>

        <Grid
          xl={4}
          lg={4}
          md={4}
          sm={4}
          xs={10}
          item
          sx={{
            margin: isSmallScreen ? "2px" : "5px",
            fontSize: [10, 10, 10, 13, 15, 18],
          }}
        >
          <FormControl required fullWidth>
            <Autocomplete
              disabled={
                (edit && !mirEdit?.encabezado.institucion) ||
                localStorage.getItem("Rol") !== "Administrador"
              }
              clearText="Borrar"
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"
              options={catalogoInstituciones}
              getOptionLabel={(option) => option.Label || ""}
              value={entidadSeleccionada}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.Id}>
                    <p
                      style={{
                        fontFamily: "MontserratRegular",
                      }}
                    >
                      {option.Label?.toUpperCase()}
                    </p>
                  </li>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={"INSTITUCIÓN"}
                  size="small"
                  variant="standard"
                  InputLabelProps={{
                    style: {
                      fontFamily: "MontserratSemiBold",
                    },
                  }}
                  sx={{
                    "& .MuiAutocomplete-input": {
                      fontFamily: "MontserratRegular",
                      textTransform: "uppercase",
                    },
                  }}
                ></TextField>
              )}
              onChange={(event, value) => {
                setEntidadSeleccionada({
                  Id: value?.Id || "",
                  Label: value?.Label || "",
                });
                if(IdEntidad === undefined || IdEntidad === "" || IdEntidad === null || /^[\s]*$/.test(IdEntidad)){
                  setIdEntidad(value?.Id)
                }
          
                
              }}
              isOptionEqualToValue={(option, value) => option.Id === value.Id}
            />
          </FormControl>
        </Grid>

        <Grid
          xl={3}
          lg={3}
          md={3}
          sm={3}
          xs={10}
          item
          sx={{
            margin: isSmallScreen ? "2px" : "5px",
          }}
        >
          <FormControl required fullWidth>
            <Autocomplete
              clearText="Borrar"
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"
              disabled={
                (edit && !mirEdit?.encabezado.nombre_del_programa) ||
                disabledProgramas
              }
              options={catalogoProgramas}
              size="small"
              getOptionLabel={(option) => option.Label || ""}
              value={programa}
              onChange={(event, value) => {
                setPrograma(
                  value || { ...objetoVacio, Conac: "", Consecutivo: "" }
                );
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
                  size={"small"}
                  label={"PROGRAMA"}
                  variant="standard"
                  InputLabelProps={{
                    style: {
                      fontFamily: "MontserratSemiBold",
                    },
                  }}
                  sx={{
                    "& .MuiAutocomplete-input": {
                      fontFamily: "MontserratRegular",
                    },
                  }}
                ></TextField>
              )}
              isOptionEqualToValue={(option, value) => option.Id === value.Id}
            />
          </FormControl>
        </Grid>

        <Grid
          xl={3}
          lg={3}
          md={3}
          sm={3}
          xs={10}
          sx={{
            margin: isSmallScreen ? "2px" : "5px",
          }}
          item
        >
          <FormControlLabel
            label="ANTICORRUPCIÓN"
            control={
              <Checkbox
                checked={anticorrupcion === "SI"}
                onChange={() => {
                  anticorrupcion === "NO"
                    ? setAnticorrupcion("SI")
                    : setAnticorrupcion("NO");
                }}
              />
            }
          />
        </Grid>

        <Grid
          xl={4}
          lg={4}
          md={4}
          sm={4}
          xs={10}
          item
          sx={{
            margin: isSmallScreen ? "2px" : "5px",
          }}
        >
          <TextField
            fullWidth
            disabled
            size="small"
            label={"CONAC:"}
            value={conac}
          />
        </Grid>

        <Grid
          xl={3}
          lg={3}
          md={3}
          sm={3}
          xs={10}
          item
          sx={{
            margin: isSmallScreen ? "2px" : "5px",
          }}
        >
          <TextField
            fullWidth
            disabled
            size="small"
            label={"CLASIFICACIÓN PROGRAMÁTICA:"}
            value={consecutivo}
          />
        </Grid>

        <Grid
          xl={3}
          lg={3}
          md={3}
          sm={3}
          xs={10}
          sx={{
            margin: isSmallScreen ? "2px" : "5px",
          }}
          item
        >
          <FormControl required fullWidth>
            <Autocomplete
              clearText="Borrar"
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"
              disablePortal
              disabled={edit && !mirEdit?.encabezado.eje}
              size="small"
              options={catalogoEjes}
              getOptionLabel={(option) => option.Label || ""}
              value={eje}
              getOptionDisabled={(option) => {
                if (option.Id === "0") {
                  return true;
                }
                return false;
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
                  label={"EJE"}
                  variant="standard"
                  InputLabelProps={{
                    style: {
                      fontFamily: "MontserratSemiBold",
                    },
                  }}
                  sx={{
                    "& .MuiAutocomplete-input": {
                      fontFamily: "MontserratRegular",
                    },
                  }}
                />
              )}
              onChange={(event, value) => {
                setEje(value || objetoVacio);
                RestaurarValores("Eje");
              }}
              isOptionEqualToValue={(option, value) => option.Id === value.Id}
            />
          </FormControl>
        </Grid>

        <Grid
          xl={4}
          lg={4}
          md={4}
          sm={4}
          xs={10}
          sx={{
            margin: isSmallScreen ? "2px" : "5px",
          }}
          item
        >
          <FormControl required fullWidth>
            <Autocomplete
              clearText="Borrar"
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"
              disabled={
                (edit && !mirEdit?.encabezado.tema && tematica.Id !== "") ||
                disabledTematicas
              }
              options={catalogoTematicas}
              size="small"
              getOptionLabel={(option) => option.Label || ""}
              value={tematica}
              getOptionDisabled={(option) => {
                if (option.Id === "0") {
                  return true;
                }
                return false;
              }}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.Id}>
                    <p
                      style={{
                        fontFamily: "MontserratRegular",
                      }}
                    >
                      {option.Label.toUpperCase()}
                    </p>
                  </li>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={"TEMÁTICA"}
                  variant="standard"
                  InputLabelProps={{
                    style: {
                      fontFamily: "MontserratSemiBold",
                    },
                  }}
                  sx={{
                    "& .MuiAutocomplete-input": {
                      fontFamily: "MontserratRegular",
                      textTransform: "uppercase",
                    },
                  }}
                />
              )}
              onChange={(event, value) => {
                setTematica(value || objetoVacio);
                RestaurarValores("Tematica");
              }}
              isOptionEqualToValue={(option, value) => option.Id === value.Id}
            />
          </FormControl>
        </Grid>

        <Grid
          xl={3}
          lg={3}
          md={3}
          sm={3}
          xs={10}
          sx={{
            margin: isSmallScreen ? "2px" : "5px",
          }}
          item
        >
          <FormControl required fullWidth>
            <Autocomplete
              clearText="Borrar"
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"
              disabled={
                (edit && !mirEdit?.encabezado.objetivo && objetivo.Id !== "") ||
                disabledObjetivos
              }
              options={catalogoObjetivos}
              getOptionLabel={(option) => option.Label || ""}
              value={objetivo}
              size="small"
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.Id}>
                    <p
                      style={{
                        fontFamily: "MontserratRegular",
                      }}
                    >
                      {option.Label.toUpperCase()}
                    </p>
                  </li>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={"OBJETIVO"}
                  variant="standard"
                  InputLabelProps={{
                    style: {
                      fontFamily: "MontserratSemiBold",
                    },
                  }}
                  sx={{
                    "& .MuiAutocomplete-input": {
                      fontFamily: "MontserratRegular",
                      textTransform: "uppercase",
                    },
                  }}
                />
              )}
              onChange={(event, value) => {
                setObjetivo(value || objetoVacio);
                RestaurarValores("Objetivo");
              }}
              isOptionEqualToValue={(option, value) => option.Id === value.Id}
            />
          </FormControl>
        </Grid>

        <Grid
          xl={3}
          lg={3}
          md={3}
          sm={3}
          xs={10}
          sx={{
            margin: isSmallScreen ? "2px" : "5px",
          }}
          item
        >
          <FormControl required fullWidth>
            <Autocomplete
              clearText="Borrar"
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"
              disabled={
                (edit &&
                  !mirEdit?.encabezado.estrategia &&
                  estrategia.Id !== "") ||
                disabledEstrategias
              }
              options={catalogoEstrategias}
              size="small"
              getOptionLabel={(option) => option.Label || ""}
              value={estrategia}
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
                  label={"ESTRATEGIA"}
                  variant="standard"
                  InputLabelProps={{
                    style: {
                      fontFamily: "MontserratSemiBold",
                    },
                  }}
                  sx={{
                    "& .MuiAutocomplete-input": {
                      fontFamily: "MontserratRegular",
                    },
                  }}
                />
              )}
              onChange={(event, value) => {
                setEstrategia(value || objetoVacio);
                RestaurarValores("Estrategia");
              }}
              isOptionEqualToValue={(option, value) => option.Id === value.Id}
            />
          </FormControl>
        </Grid>

        <Grid
          xl={4}
          lg={4}
          md={4}
          sm={4}
          xs={10}
          sx={{
            margin: isSmallScreen ? "2px" : "5px",
          }}
          item
        >
          <FormControl required fullWidth>
            <Stack spacing={3}>
              <Autocomplete
                clearText="Borrar"
                noOptionsText="Sin opciones"
                closeText="Cerrar"
                openText="Abrir"
                disabled={
                  (edit &&
                    !mirEdit?.encabezado.lineas_de_accion &&
                    lineaDeAccion[0]?.Id === "") ||
                  disabledLineasDeAccion
                }
                multiple
                limitTags={4}
                options={catalogoLineasDeAccion}
                size="small"
                getOptionLabel={(option) => option.Label?.toUpperCase() || ""}
                value={lineaDeAccion}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.Id}>
                      <p
                        style={{
                          fontFamily: "MontserratRegular",
                        }}
                      >
                        {option.Label.toUpperCase()}
                      </p>
                    </li>
                  );
                }}
                onInputChange={() => onClearLineasDeAccion()}
                //--------------------------- esto si va --------------------------------------------
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={"LINEAS DE ACCIÓN"}
                    variant="standard"
                    InputLabelProps={{
                      style: {
                        fontFamily: "MontserratSemiBold",
                      },
                    }}
                    sx={{
                      "& .MuiAutocomplete-input": {
                        fontFamily: "MontserratRegular",
                        textTransform: "uppercase",
                      },
                    }}
                  />
                )}
                onChange={(event, value) => {
                  value.map((value2, index) => {
                    if (value2.Id !== "" && value2.Label !== "") {
                      setLineaDeAccion(value);
                    }
                  });
                }}
                isOptionEqualToValue={(
                  option: {
                    Id: string;
                    Label: string;
                  },
                  value: {
                    Id: string;
                    Label: string;
                  }
                ) => value.Id === option.Id}
              />
            </Stack>
          </FormControl>
        </Grid>

        <Grid
          xl={3}
          lg={3}
          md={3}
          sm={3}
          xs={10}
          sx={{
            margin: isSmallScreen ? "2px" : "5px",
          }}
          item
        >
          <FormControl required fullWidth>
            <Stack spacing={3}>
              <Autocomplete
                disabled={edit && !mirEdit?.encabezado.beneficiario}
                clearText="Borrar"
                noOptionsText="Sin opciones"
                closeText="Cerrar"
                openText="Abrir"
                disablePortal
                size="small"
                multiple
                limitTags={2}
                options={catalogoBeneficiarios}
                getOptionLabel={(option) => option.Label?.toUpperCase() || ""}
                value={beneficiario}
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
                    label={"BENEFICIARIO"}
                    variant="standard"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {beneficiario?.length > 2 && (
                            <Typography color="error" variant="caption">
                              MÁXIMO 2 BENEFIICARIOS
                            </Typography>
                          )}
                        </React.Fragment>
                      ),
                    }}
                    InputLabelProps={{
                      style: {
                        fontFamily: "MontserratSemiBold",
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
                  //setBeneficiario(value || objetoVacio);
                  if (value.length <= 2) {
                    setBeneficiario(value);
                  } else alertaInfo("MÁXIMO 2 BENEFIICARIOS");
                }}
                isOptionEqualToValue={(
                  option: {
                    Id: string;
                    Label: string;
                  },
                  value: {
                    Id: string;
                    Label: string;
                  }
                ) => value.Id === option.Id}
                onInputChange={() => onClearBeneficiario()}
              />
            </Stack>
          </FormControl>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default TabEncabezado;
