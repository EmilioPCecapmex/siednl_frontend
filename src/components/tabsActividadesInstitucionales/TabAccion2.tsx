import { useState } from "react";
import {
  TextField,
  Grid,
  Typography,
  List,
  Divider,
  ListItemButton,
  Autocomplete,
  FormControl,
} from "@mui/material";

export function TabAccion2({ }: {  }) {
  const [componentSelect, setComponentSelect] = useState(1);
  return (
    <Grid
     
      
      sx={{
        width: "75vw",
        height: "77vh",
        justifyContent: "center",
        alignItems: "center",
        justifyItems: "center",
        backgroundColor: "#fff",
        boxShadow: 20,
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
                Acción 2
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
                Datos del Indicador
              </Typography>
            </ListItemButton>
            <Divider />

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
                  Acción 2
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
                  InputLabelProps={{
                    style: { fontFamily: "MontserratSemiBold" },
                  }}
                  InputProps={{ style: { fontFamily: "MontserratRegular" } }}
                  variant="filled"
                  sx={{ width: "45%", boxShadow: 2 }}
                  label={"Descripción"}
                />
                <TextField
                  multiline
                  InputLabelProps={{
                    style: { fontFamily: "MontserratSemiBold" },
                  }}
                  InputProps={{ style: { fontFamily: "MontserratRegular" } }}
                  rows={6}
                  variant="filled"
                  sx={{ width: "45%", boxShadow: 2 }}
                  label={"Nombre del Indicador"}
                />
              </Grid>

              <Grid
                sx={{
                  height: "45%",
                  width: "90%",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  alignItems: "center",
                }}
              >
                {periodo.map((x, y) => {
                  return (
                    <TextField
                      key={y}
                      multiline
                      rows={1}
                      InputLabelProps={{
                        style: {
                          fontFamily: "MontserratSemiBold",
                          fontSize: ".7vw",
                        },
                      }}
                      InputProps={{
                        style: { fontFamily: "MontserratRegular" },
                      }}
                      variant="standard"
                      sx={{ width: "80%", gridColumn: y === 6 ? 2 : 0 }}
                      label={
                        y === 0
                          ? `Linea Base ${periodo[y]} `
                          : y === 6
                          ? `Meta Sexenal ${periodo[y]} `
                          : ` Meta ${periodo[y]} `
                      }
                    />
                  );
                })}
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
                  Acción 2 - Datos del Indicador
                </Typography>
              </Grid>
              <Grid
                sx={{
                  height: "20%",
                  width: "90%",
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <TextField
                  multiline
                  rows={3}
                  variant="filled"
                  InputLabelProps={{
                    style: { fontFamily: "MontserratSemiBold" },
                  }}
                  InputProps={{ style: { fontFamily: "MontserratRegular" } }}
                  sx={{ width: "40%", boxShadow: 2 }}
                  label={"Fórmula de Cálculo"}
                />
              </Grid>
              <Grid
                sx={{
                  height: "25%",
                  width: "95%",
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <FormControl sx={{ gridRow: "1", width: "18%" }}>
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
                        label={"Unidad de Medida"}
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
                  />
                </FormControl>
                <FormControl sx={{ gridRow: "1", width: "18%" }}>
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
                        label={"Tipo de Fórmula"}
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
                  />
                </FormControl>
                <FormControl sx={{ gridRow: "1", width: "18%" }}>
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
                        label={"Tipo de Indicador"}
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
                        label={"Dimensión del Indicador"}
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
                  />
                </FormControl>
                <FormControl sx={{ gridRow: "1", width: "18%" }}>
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
                        label={"Sentido del Indicador"}
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
                  />
                </FormControl>
              </Grid>
              <Grid
                sx={{
                  height: "45%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "baseline",
                  flexDirection: "column",
                }}
              >
                <Grid
                  sx={{
                    height: "24%",
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <TextField
                    multiline
                    rows={4}
                    variant="filled"
                    InputLabelProps={{
                      style: { fontFamily: "MontserratSemiBold" },
                    }}
                    InputProps={{ style: { fontFamily: "MontserratRegular" } }}
                    sx={{ width: "35%", boxShadow: 2 }}
                    label={"Numerador"}
                  />
                  <TextField
                    multiline
                    rows={4}
                    variant="filled"
                    sx={{ width: "20%", boxShadow: 2 }}
                    label={"Unidad de Medida"}
                    InputLabelProps={{
                      style: { fontFamily: "MontserratSemiBold" },
                    }}
                    InputProps={{ style: { fontFamily: "MontserratRegular" } }}
                  />
                  <TextField
                    multiline
                    rows={4}
                    variant="filled"
                    sx={{ width: "35%", boxShadow: 2 }}
                    label={"Medio de Verificación / Fuente de Información"}
                    InputLabelProps={{
                      style: { fontFamily: "MontserratSemiBold" },
                    }}
                    InputProps={{ style: { fontFamily: "MontserratRegular" } }}
                  />
                </Grid>
                <Grid
                  sx={{
                    height: "24%",
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <TextField
                    multiline
                    rows={4}
                    variant="filled"
                    sx={{ width: "35%", boxShadow: 2 }}
                    label={"Denominador"}
                    InputLabelProps={{
                      style: { fontFamily: "MontserratSemiBold" },
                    }}
                    InputProps={{ style: { fontFamily: "MontserratRegular" } }}
                  />
                  <TextField
                    multiline
                    rows={4}
                    variant="filled"
                    sx={{ width: "20%", boxShadow: 2 }}
                    label={"Unidad de Medida"}
                    InputLabelProps={{
                      style: { fontFamily: "MontserratSemiBold" },
                    }}
                    InputProps={{ style: { fontFamily: "MontserratRegular" } }}
                  />
                  <TextField
                    multiline
                    rows={4}
                    variant="filled"
                    InputLabelProps={{
                      style: { fontFamily: "MontserratSemiBold" },
                    }}
                    InputProps={{ style: { fontFamily: "MontserratRegular" } }}
                    sx={{ width: "35%", boxShadow: 2 }}
                    label={"Medio de Verificación / Fuente de Información"}
                  />
                </Grid>
              </Grid>
            </Grid>
          ) : null}

          {/* ---------------------------------------------------------------------------------------------------------------------------- */}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default TabAccion2;

const top100Films = () => [
  "Lorem ipsum dolor",
  "Sit amet consectetur",
  "Itaque facere ut voluptatum",
  "Ullam voluptatem accusantium",
];

const periodo = [2021, 2022, 2023, 2024, 2025, 2026, 2027];
