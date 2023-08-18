import { useEffect, useState } from "react";
import {
  TextField,
  Grid,
  Typography,
  Autocomplete,
  List,
  FormControl,
  Divider,
  ListItemButton,

} from "@mui/material";
import { IAlineacionPlaneacion } from "./IAlineacionPlaneacion";
import { IObjetivosActividadInstitucional } from "./IObjetivosActividadInstitucional";
import axios from "axios";

export function TabIdentificacion({ show }: { show: boolean }) {
  const [componentSelect, setComponentSelect] = useState(1);

  //catalogos

  const [catalogoAniosFiscales, setCatalogoAniosFiscales] = useState([
    { Id: "0", AnioFiscal: "" },
  ]);

  const [catalogoInstituciones, setCatalogoInstituciones] = useState([
    { Id: "0", NombreInstitucion: "" },
  ]);

  function enCambioAnio(Id: string, Anio: string) {
    setAnioFiscal(Anio);
  }

  function enCambioInstitucion(Id: string, Inst: string) {
    setInstitution(Inst);
  }

  const [anioFiscal, setAnioFiscal] = useState("2022");
  const [institution, setInstitution] = useState("");

  const [alineacionPlaneacion, setAlineacionPlaneacion] =
    useState<IAlineacionPlaneacion>({
      temaPED: "",
      objetivoPED: "",
      estrategiaPED: "",
      programaSectorial: "",
      objetivoProgramaSectorial: "",
      meta1: "",
      meta2: "",
    });

  const [objetivosActividadInstitucional, setobjetivosActividadInstitucional] =
    useState<IObjetivosActividadInstitucional>({
      objetivoGeneral: "",
      objetivoEspecifico1: "",
      objetivoEspecifico2: "",
    });

  ///////////////// axios

  const getAniosFiscales = () => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/aniosFiscales", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setCatalogoAniosFiscales(r.data.data);
      });
  };

  const getInstituciones = () => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/usuarioInsitucion", {
        params: {
          IdUsuario: localStorage.getItem("IdUsuario"),
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setCatalogoInstituciones(r.data.data);
      });
  };

  ////////////// Use Effects

  useEffect(() => {
    getAniosFiscales();
    getInstituciones();
  }, []);

  

  return (
    <Grid
      visibility={show ? "visible" : "hidden"}
      position="absolute"
      sx={{
        width: "75vw",
        height: "77vh",
        justifyContent: "center",
        alignItems: "center",
        justifyItems: "center",
        backgroundColor: "#fff",
        GridShadow: 20,
        borderRadius: 5,
      }}
    >
      <Grid
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
        }}
      >
        <List
          sx={{
            width: "15vw",
            height: "100%",
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
              height: "15vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Divider />

            <ListItemButton
              selected={componentSelect === 1 ? true : false}
              onClick={() => setComponentSelect(1)}
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
                Identificación
              </Typography>
            </ListItemButton>
            <Divider />

            <ListItemButton
              selected={componentSelect === 2 ? true : false}
              onClick={() => setComponentSelect(2)}
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
                Alineación
              </Typography>
            </ListItemButton>
            <Divider />

            <ListItemButton
              selected={componentSelect === 3 ? true : false}
              onClick={() => setComponentSelect(3)}
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
                Objetivos
              </Typography>
            </ListItemButton>

            <Divider />
          </Grid>
        </List>

        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "90%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Identificacion de la Actividad Institucion --------------------------------------------------------------------------------- */}
          {componentSelect === 1 ? (
            <Grid
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Grid
                sx={{
                  width: "90%",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{ fontFamily: "MontserratBold", fontSize: "1vw" }}
                >
                  Identificación
                </Typography>
              </Grid>
              <Grid
                sx={{
                  height: "30%",
                  width: "90%",
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <FormControl sx={{ gridRow: "1", width: "20%" }}>
                  <Autocomplete
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
                    disablePortal
                    size="small"
                    options={catalogoAniosFiscales}
                    getOptionLabel={(option) => option.AnioFiscal}
                    value={{
                      Id: catalogoAniosFiscales[0].Id,
                      AnioFiscal: anioFiscal,
                    }}
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
                              fontSize: ".7vw",
                            }}
                          >
                            {option.AnioFiscal}
                          </p>
                        </li>
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={"Ejercicio Fiscal"}
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
                    onChange={(event, value) =>
                      enCambioAnio(
                        value?.Id as string,
                        (value?.AnioFiscal as string) || ""
                      )
                    }
                    isOptionEqualToValue={(option, value) =>
                      option.Id === value.Id
                    }
                  />
                </FormControl>

                <FormControl sx={{ gridRow: "1", width: "35%" }}>
                  <Autocomplete
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
                    disablePortal
                    size="small"
                    options={top100Films()}
                    getOptionLabel={(option) => option}
                    value={alineacionPlaneacion.temaPED}
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={Math.random()}>
                          <p
                            style={{
                              fontFamily: "MontserratRegular",
                              fontSize: ".7vw",
                            }}
                          >
                            {option}
                          </p>
                        </li>
                      );
                    }}
                    onChange={(event, value) => {
                      setAlineacionPlaneacion({
                        ...alineacionPlaneacion,
                        temaPED: value as string,
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        variant="standard"
                        {...params}
                        label="Clasificación Programatica"
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
                  />
                </FormControl>
                <FormControl sx={{ gridRow: "1", width: "35%" }}>
                  <Autocomplete
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
                    disablePortal
                    options={catalogoInstituciones}
                    getOptionLabel={(option) => option.NombreInstitucion}
                    value={{
                      Id: catalogoInstituciones[0].Id,
                      NombreInstitucion: institution,
                    }}
                    size="small"
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={option.Id}>
                          <p
                            style={{
                              fontFamily: "MontserratRegular",
                              fontSize: ".7vw",
                            }}
                          >
                            {option.NombreInstitucion}
                          </p>
                        </li>
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={"Institución"}
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
                    onChange={(event, value) =>
                      enCambioInstitucion(
                        value?.Id as string,
                        (value?.NombreInstitucion as string) || ""
                      )
                    }
                    isOptionEqualToValue={(option, value) =>
                      option.Id === value.Id
                    }
                  />
                </FormControl>
              </Grid>

              <Grid
                sx={{
                  height: "30%",
                  width: "90%",
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <FormControl sx={{ gridRow: "1", width: "35%" }}>
                  <Autocomplete
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
                    options={top100Films()}
                    size="small"
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={Math.random()}>
                          <p
                            style={{
                              fontFamily: "MontserratRegular",
                              fontSize: ".7vw",
                            }}
                          >
                            {option}
                          </p>
                        </li>
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={"Temática"}
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
                  />
                </FormControl>

                <FormControl sx={{ gridRow: "1", width: "35%" }}>
                  <Autocomplete
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
                    options={top100Films()}
                    size="small"
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={Math.random()}>
                          <p
                            style={{
                              fontFamily: "MontserratRegular",
                              fontSize: ".7vw",
                            }}
                          >
                            {option}
                          </p>
                        </li>
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={"Objetivo"}
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
                  />
                </FormControl>
                <FormControl sx={{ gridRow: "1", width: "20%" }}>
                  <Autocomplete
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
                    options={top100Films()}
                    size="small"
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={Math.random()}>
                          <p
                            style={{
                              fontFamily: "MontserratRegular",
                              fontSize: ".7vw",
                            }}
                          >
                            {option}
                          </p>
                        </li>
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={"CONAC"}
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
                  />
                </FormControl>
              </Grid>
              <Grid
                sx={{
                  height: "30%",
                  width: "90%",
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <FormControl sx={{ gridRow: "1", width: "30%" }}>
                  <Autocomplete
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
                    options={top100Films()}
                    size="small"
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={Math.random()}>
                          <p
                            style={{
                              fontFamily: "MontserratRegular",
                              fontSize: ".7vw",
                            }}
                          >
                            {option}
                          </p>
                        </li>
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={"Tipo Beneficiario"}
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
                  />
                </FormControl>

                <FormControl sx={{ gridRow: "1", width: "30%" }}>
                  <Autocomplete
                    clearText="Borrar"
                    noOptionsText="Sin opciones"
                    closeText="Cerrar"
                    openText="Abrir"
                    options={top100Films()}
                    size="small"
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={Math.random()}>
                          <p
                            style={{
                              fontFamily: "MontserratRegular",
                              fontSize: ".7vw",
                            }}
                          >
                            {option}
                          </p>
                        </li>
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={"Lineas de Accion"}
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
                  />
                </FormControl>

                <FormControl sx={{ gridRow: "1", width: "30%" }}>
                  <Autocomplete
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
                    options={top100Films()}
                    size="small"
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={Math.random()}>
                          <p
                            style={{
                              fontFamily: "MontserratRegular",
                              fontSize: ".7vw",
                            }}
                          >
                            {option}
                          </p>
                        </li>
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={"Programa"}
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
                  />
                </FormControl>
              </Grid>
            </Grid>
          ) : null}

          {/* ---------------------------------------------------------------------------------------------------------------------------- */}

          {/*  ALINEACIÓN A LA PLANEACIÓN DEL DESARROLLO---------------------------------------------------------------------------------- */}
          {componentSelect === 2 ? (
            <Grid
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Grid
                sx={{
                  width: "90%",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{ fontFamily: "MontserratBold", fontSize: "1vw" }}
                >
                  Alineación
                </Typography>
              </Grid>
              <Grid
                sx={{
                  height: "45%",
                  width: "90%",
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <FormControl sx={{ gridRow: "1", width: "30%" }}>
                  <Autocomplete
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
                    options={top100Films()}
                    size="small"
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={Math.random()}>
                          <p
                            style={{
                              fontFamily: "MontserratRegular",
                              fontSize: ".7vw",
                            }}
                          >
                            {option}
                          </p>
                        </li>
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={"Tema PED"}
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
                  />
                </FormControl>

                <FormControl sx={{ gridRow: "1", width: "30%" }}>
                  <Autocomplete
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
                    options={top100Films()}
                    size="small"
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={Math.random()}>
                          <p
                            style={{
                              fontFamily: "MontserratRegular",
                              fontSize: ".7vw",
                            }}
                          >
                            {option}
                          </p>
                        </li>
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={"Objetivo"}
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
                  />
                </FormControl>

                <FormControl sx={{ gridRow: "1", width: "30%" }}>
                  <Autocomplete
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
                    options={top100Films()}
                    size="small"
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={Math.random()}>
                          <p
                            style={{
                              fontFamily: "MontserratRegular",
                              fontSize: ".7vw",
                            }}
                          >
                            {option}
                          </p>
                        </li>
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={"Estrategia"}
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
                  />
                </FormControl>
              </Grid>
              
              <Grid
                sx={{
                  height: "45%",
                  width: "90%",
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <FormControl sx={{ gridRow: "1", width: "40%" }}>
                <TextField
                // disabled={mirEdit?.fin.resumen && fin.resumen !== ""}
               // rows={8}
                multiline
                //sx={{ width: "90%", GridShadow: 2 }}
                variant={"standard"}
                label={"Programa Sectorial"}
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
                  setAlineacionPlaneacion({
                    ...alineacionPlaneacion,
                    programaSectorial: c.target.value
                      .replaceAll('"', "")
                      .replaceAll("'", "")
                      .replaceAll("\n", ""),
                  });
                }}
                value={alineacionPlaneacion.programaSectorial}
              />
                </FormControl>

                <FormControl sx={{ gridRow: "1", width: "40%" }}>
                  <TextField
                // disabled={mirEdit?.fin.resumen && fin.resumen !== ""}
               // rows={8}
                multiline
                //sx={{ width: "90%", GridShadow: 2 }}
                variant={"standard"}
                label={"Objetivo Programa Sectorial"}
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
                  setAlineacionPlaneacion({
                    ...alineacionPlaneacion,
                    objetivoProgramaSectorial: c.target.value
                      .replaceAll('"', "")
                      .replaceAll("'", "")
                      .replaceAll("\n", ""),
                  });
                }}
                value={alineacionPlaneacion.objetivoProgramaSectorial}
              />
                </FormControl>
              </Grid>

              <Grid
                sx={{
                  height: "45%",
                  width: "90%",
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <FormControl sx={{ gridRow: "1", width: "40%" }}>
                <TextField
                // disabled={mirEdit?.fin.resumen && fin.resumen !== ""}
               // rows={8}
                multiline
                //sx={{ width: "90%", GridShadow: 2 }}
                variant={"standard"}
                label={"Meta 1"}
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
                  setAlineacionPlaneacion({
                    ...alineacionPlaneacion,
                    meta1: c.target.value
                      .replaceAll('"', "")
                      .replaceAll("'", "")
                      .replaceAll("\n", ""),
                  });
                }}
                value={alineacionPlaneacion.meta1}
              />
                </FormControl>

                <FormControl sx={{ gridRow: "1", width: "40%" }}>
                  <TextField
                // disabled={mirEdit?.fin.resumen && fin.resumen !== ""}
               // rows={8}
                multiline
                //sx={{ width: "90%", GridShadow: 2 }}
                variant={"standard"}
                label={"Meta 2"}
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
                  setAlineacionPlaneacion({
                    ...alineacionPlaneacion,
                    meta2: c.target.value
                      .replaceAll('"', "")
                      .replaceAll("'", "")
                      .replaceAll("\n", ""),
                  });
                }}
                value={alineacionPlaneacion.meta2}
              />
                </FormControl>
              </Grid>
            </Grid>
          ) : null}

          {/* ---------------------------------------------------------------------------------------------------------------------------- */}

          {/* Identificacion de la Actividad Institucion --------------------------------------------------------------------------------- */}
          {componentSelect === 3 ? (
            <Grid
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Grid
                sx={{
                  width: "90%",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{ fontFamily: "MontserratBold", fontSize: "1vw" }}
                >
                  Objetivos
                </Typography>
              </Grid>
              <Grid
                sx={{
                  height: "45%",
                  width: "90%",
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <TextField
                  multiline
                  rows={6}
                  variant="filled"
                  sx={{ width: "80%", GridShadow: 2 }}
                  InputLabelProps={{ style: { fontFamily: "MontserratBold" } }}
                  InputProps={{ style: { fontFamily: "MontserratRegular" } }}
                  label={"Objetivo General"}
                  value={objetivosActividadInstitucional.objetivoGeneral}
                  onChange={(c) => {
                    setobjetivosActividadInstitucional({
                      ...objetivosActividadInstitucional,
                      objetivoGeneral: c.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid
                sx={{
                  height: "45%",
                  width: "90%",
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <TextField
                  multiline
                  rows={6}
                  variant="filled"
                  sx={{ width: "40%", GridShadow: 2 }}
                  label={"Objetivo Especifico 1"}
                  InputLabelProps={{ style: { fontFamily: "MontserratBold" } }}
                  InputProps={{ style: { fontFamily: "MontserratRegular" } }}
                  value={objetivosActividadInstitucional.objetivoEspecifico1}
                  onChange={(c) => {
                    setobjetivosActividadInstitucional({
                      ...objetivosActividadInstitucional,
                      objetivoEspecifico1: c.target.value,
                    });
                  }}
                />

                <TextField
                  multiline
                  rows={6}
                  variant="filled"
                  sx={{ width: "40%", GridShadow: 2 }}
                  label={"Objetivo Especifico 2"}
                  value={objetivosActividadInstitucional.objetivoEspecifico2}
                  InputLabelProps={{ style: { fontFamily: "MontserratBold" } }}
                  InputProps={{ style: { fontFamily: "MontserratRegular" } }}
                  onChange={(c) => {
                    setobjetivosActividadInstitucional({
                      ...objetivosActividadInstitucional,
                      objetivoEspecifico2: c.target.value,
                    });
                  }}
                />
              </Grid>
              
            </Grid>
          ) : null}
          {/* ---------------------------------------------------------------------------------------------------------------------------- */}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default TabIdentificacion;

const top100Films = () => [
  "Lorem ipsum dolor",
  "Sit amet consectetur",
  "Itaque facere ut voluptatum",
  "Ullam voluptatem accusantium",
];