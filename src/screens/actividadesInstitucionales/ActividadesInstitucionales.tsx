import { useEffect, useState } from "react";

import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Grid,
  TableSortLabel,
} from "@mui/material";
import { Header } from "../../components/header/Header";
import { LateralMenu } from "../../components/lateralMenu/LateralMenu";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import TabsActividadesInstitucionales from "../../components/tabsActividadesInstitucionales/TabsActividadesInstitucionales";
import { IActividadesInstitucionales } from "./InterfacesActividadesInstitucionales";

export let resumeDefaultAI = true;
export let setResumeDefaultAI = () => {
  resumeDefaultAI = !resumeDefaultAI;
};

const estados = [
  "Todos",
  "En Captura",
  "En Revisión",
  "En Autorización",
  "Autorizada",
];

interface Head {
  id: keyof IActividadesInstitucionales;
  isNumeric: boolean;
  label: string;
}

const heads: readonly Head[] = [
  {
    id: "AnioFiscal",
    isNumeric: true,
    label: "EJERCICIO FISCAL",
  },
  {
    id: "Institucion",
    isNumeric: true,
    label: "INSTITUCIÓN",
  },
  {
    id: "Programa",
    isNumeric: true,
    label: "NOMBRE DEL PROGRAMA",
  },
  {
    id: "Eje",
    isNumeric: true,
    label: "EJE",
  },
  {
    id: "Tematica",
    isNumeric: true,
    label: "Tema",
  },
  {
    id: "Estado",
    isNumeric: true,
    label: "ESTADO",
  },
  {
    id: "FechaCreacion",
    isNumeric: true,
    label: "FECHA DE CREACIÓN",
  },
  {
    id: "CreadoPor",
    isNumeric: true,
    label: "CREADO POR",
  },
  {
    id: "Opciones",
    isNumeric: true,
    label: "OPCIONES",
  },
];

export const ActividadesInstitucionales = () => {
  const [showResume, setShowResume] = useState(true);

  const returnMain = () => {
    setShowResume(true);
  };

  useEffect(() => {
    setShowResume(true);
  }, [resumeDefaultAI]);

  const handleClickOpenTabsActInst = () => {
    setShowResume(false);
  };

  const [actionNumber, setActionNumber] = useState(0);

  return (
    <Grid container direction="row" height={"100vh"} width={"100vw"}>
      <Grid
        item
        height={"100vh"}
        //</Grid>sx={{ mr: showResume ? 5 : 0 }}
      >
        <LateralMenu
          selection={"Actividades Institucionales"}
          actionNumber={actionNumber}
        />
      </Grid>

      <Grid
        justifyContent={"center"}
        display={"flex"}
        container
        item
        xl={10.2}
        lg={9.9}
        md={9.4}
        sm={7.5}
        xs={6}
        sx={{ backgroundColor: "#F2F2F2" }}
      >
        <Grid sx={{ height: "8vh", marginLeft: "4vw" }}>
          <Header
            details={{
              name1: "Inicio",
              path1: "../home",
              name2: "Actividades Institucionales",
              path2: "../actividades institucionales",
              name3: "",
            }}
          />
        </Grid>

        {showResume ? (
          <>
            {/* FILTROS */}

            <Grid
              container
              item
              xl={8}
              lg={7}
              md={6}
              height="15vh"
              direction="row"
              sx={{
                backgroundColor: "#FFFF",
                borderRadius: 5,
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <Grid
                xl={12}
                lg={12}
                md={12}
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
              >
                <Grid item xl={5} lg={4} md={3} sm={2}>
                  <Autocomplete
                    clearText="Borrar"
                    noOptionsText="Sin opciones"
                    closeText="Cerrar"
                    openText="Abrir"
                    disablePortal
                    size="small"
                    options={top100Films()}
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={Math.random()}>
                          <div
                            style={{
                              fontFamily: "MontserratRegular",
                              fontSize: ".8vw",
                            }}
                          >
                            {option.label}
                          </div>
                        </li>
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Ejercicio Fiscal"
                        placeholder="Ejercicio Fiscal"
                        InputLabelProps={{
                          style: {
                            fontFamily: "MontserratSemiBold",
                            fontSize: ".7vw",
                          },
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xl={5} lg={4} md={3} sm={2}>
                  <Autocomplete
                    clearText="Borrar"
                    noOptionsText="Sin opciones"
                    closeText="Cerrar"
                    openText="Abrir"
                    disablePortal
                    size="small"
                    options={top100Films()}
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={Math.random()}>
                          <div
                            style={{
                              fontFamily: "MontserratRegular",
                              fontSize: ".8vw",
                            }}
                          >
                            {option.label}
                          </div>
                        </li>
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Nombre del Programa"
                        placeholder="Nombre del Programa"
                        InputLabelProps={{
                          style: {
                            fontFamily: "MontserratSemiBold",
                            fontSize: ".7vw",
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <Grid
                xl={12}
                lg={12}
                md={12}
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
              >
                <Grid item xl={5} lg={4} md={3} sm={2}>
                  <Autocomplete
                    clearText="Borrar"
                    noOptionsText="Sin opciones"
                    closeText="Cerrar"
                    openText="Abrir"
                    disablePortal
                    size="small"
                    options={top100Films()}
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={Math.random()}>
                          <div
                            style={{
                              fontFamily: "MontserratRegular",
                              fontSize: ".8vw",
                            }}
                          >
                            {option.label}
                          </div>
                        </li>
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Instituciones"
                        placeholder="Instituciones"
                        InputLabelProps={{
                          style: {
                            fontFamily: "MontserratSemiBold",
                            fontSize: ".7vw",
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xl={5} lg={4} md={3} sm={2}>
                  <Button
                    sx={{
                      backgroundColor: "#c2a37b",
                      width: "10vw",
                      height: "4vh",
                      color: "black",
                      fontFamily: "MontserratMedium",
                      fontSize: "0.6vw",
                    }}
                    onClick={() => {
                      handleClickOpenTabsActInst();
                    }}
                  >
                    Añadir registro
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            {/* TABLA */}

            <Grid
              container
              item
              lg={10}
              md={9}
              height="65vh"
              direction="row"
              sx={{ backgroundColor: "#FFFF", borderRadius: 5, boxShadow: 5 }}
            >
              <TableContainer
                sx={{
                  borderRadius: 5,
                  height: 450,
                  overflow: "auto",
                  "&::-webkit-scrollbar": {
                    width: ".5vw",
                    mt: 1,
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#edeaea",
                    //outline: "1px solid slategrey",
                    borderRadius: 1,
                  },
                }}
              >
                <Table stickyHeader aria-label="sticky table">
                  <TableHead >
                    <TableRow
                      sx={{
                        gridTemplateColumns: "repeat(7,1fr)",
                      }}
                    >
                      {heads.map((head, index) => (
                        <TableCell
                          sx={{
                            backgroundColor: "#edeaea",
                            fontFamily: "MontserratBold",
                            borderBottom: 0,
                            fontSize: "0.8vw",
                            // fontFamily: "MontserratRegular",
                            //   fontSize: ".7vw",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          align="center"
                          key={index}
                        >
                          <TableSortLabel>{head.label}</TableSortLabel>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    <TableRow>
                      <TableCell
                        sx={{
                          padding: "1px 15px 1px 0",
                          fontFamily: "MontserratRegular",
                          fontSize: ".7vw",
                        }}
                        align="center"
                      >
                        {"AnioFiscal"}
                      </TableCell>
                      <TableCell
                        sx={{
                          padding: "1px 15px 1px 0",
                          fontFamily: "MontserratRegular",
                          fontSize: ".7vw",
                        }}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {"Institucion"}
                      </TableCell>
                      <TableCell
                        sx={{
                          padding: "1px 15px 1px 0",
                          fontFamily: "MontserratRegular",
                          fontSize: ".7vw",
                        }}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {"Programa"}
                      </TableCell>
                      <TableCell
                        sx={{
                          padding: "1px 15px 1px 0",
                          fontFamily: "MontserratRegular",
                          fontSize: ".7vw",
                        }}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {"Eje"}
                      </TableCell>
                      <TableCell
                        sx={{
                          padding: "1px 15px 1px 0",
                          fontFamily: "MontserratRegular",
                          fontSize: ".7vw",
                        }}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {"Tematica"}
                      </TableCell>
                      <TableCell
                        sx={{
                          padding: "1px 15px 1px 0",
                          fontFamily: "MontserratRegular",
                          fontSize: ".7vw",
                        }}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {"Estado"}
                      </TableCell>
                      <TableCell
                        sx={{
                          padding: "1px 15px 1px 0",
                          fontFamily: "MontserratRegular",
                          fontSize: ".7vw",
                        }}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {"20/10/2022"}
                      </TableCell>
                      <TableCell
                        sx={{
                          padding: "1px 15px 1px 0",
                          fontFamily: "MontserratRegular",
                          fontSize: ".7vw",
                        }}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {"Usuario"}
                      </TableCell>

                      <TableCell
                        sx={{
                          flexDirection: "row",
                          //display: "grid",
                          gridTemplateColumns: "repeat(4,1fr)",
                        }}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        <Tooltip title="Eliminar">
                          <IconButton>
                            <DeleteIcon
                              sx={[
                                {
                                  "&:hover": {
                                    color: "red",
                                  },
                                },
                              ]}
                            />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Enviar">
                          <IconButton>
                            <SendIcon
                              sx={[
                                {
                                  "&:hover": {
                                    color: "lightGreen",
                                  },
                                },
                              ]}
                            />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Descargar">
                          <IconButton>
                            <DownloadIcon
                              sx={[
                                {
                                  "&:hover": {
                                    color: "orange",
                                  },
                                },
                              ]}
                            />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Editar">
                          <IconButton>
                            <EditIcon
                              sx={[
                                {
                                  "&:hover": {
                                    color: "blue",
                                  },
                                },
                              ]}
                            />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                    
                    {/* ))} */}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            {/* <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
                height: "92%",
                //mt: "8vh",
                //flexWrap: "wrap",
              }}
              gridArea={"main"}
            >
              <Box
                sx={{
                  mt: "3vh",
                  width: "60%",
                  height: "15vh",
                  backgroundColor: "#fff",
                  borderRadius: 5,
                  display: "grid",
                  boxShadow: 5,
                  gridTemplateColumns: "1fr 1fr",
                  alignItems: "center",
                  justifyItems: "center",
                }}
              >
                <Box sx={{ width: "20vw", height: "5vh" }}>
                  <Autocomplete
                    clearText="Borrar"
                    noOptionsText="Sin opciones"
                    closeText="Cerrar"
                    openText="Abrir"
                    disablePortal
                    size="small"
                    options={top100Films()}
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={Math.random()}>
                          <div
                            style={{
                              fontFamily: "MontserratRegular",
                              fontSize: ".8vw",
                            }}
                          >
                            {option.label}
                          </div>
                        </li>
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Ejercicio Fiscal"
                        placeholder="Ejercicio Fiscal"
                        InputLabelProps={{
                          style: {
                            fontFamily: "MontserratSemiBold",
                            fontSize: ".7vw",
                          },
                        }}
                      />
                    )}
                  />
                </Box>
                <Box sx={{ width: "20vw", height: "5vh" }}>
                  <Autocomplete
                    clearText="Borrar"
                    noOptionsText="Sin opciones"
                    closeText="Cerrar"
                    openText="Abrir"
                    disablePortal
                    size="small"
                    options={top100Films()}
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={Math.random()}>
                          <div
                            style={{
                              fontFamily: "MontserratRegular",
                              fontSize: ".8vw",
                            }}
                          >
                            {option.label}
                          </div>
                        </li>
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Nombre del Programa"
                        placeholder="Nombre del Programa"
                        InputLabelProps={{
                          style: {
                            fontFamily: "MontserratSemiBold",
                            fontSize: ".7vw",
                          },
                        }}
                      />
                    )}
                  />
                </Box>
                <Box sx={{ width: "20vw", height: "5vh" }}>
                  <Autocomplete
                    clearText="Borrar"
                    noOptionsText="Sin opciones"
                    closeText="Cerrar"
                    openText="Abrir"
                    disablePortal
                    size="small"
                    options={top100Films()}
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={Math.random()}>
                          <div
                            style={{
                              fontFamily: "MontserratRegular",
                              fontSize: ".8vw",
                            }}
                          >
                            {option.label}
                          </div>
                        </li>
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Instituciones"
                        placeholder="Instituciones"
                        InputLabelProps={{
                          style: {
                            fontFamily: "MontserratSemiBold",
                            fontSize: ".7vw",
                          },
                        }}
                      />
                    )}
                  />
                </Box>
                <Button
                  sx={{
                    backgroundColor: "#c2a37b",
                    width: "10vw",
                    height: "4vh",
                    color: "black",
                    fontFamily: "MontserratMedium",
                    fontSize: "0.6vw",
                  }}
                  onClick={() => {
                    handleClickOpenTabsActInst();
                  }}
                >
                  Añadir registro
                </Button>
              </Box>

              <Box
                sx={{
                  width: "80%",
                  height: "65vh",
                  backgroundColor: "#ffff",
                  borderRadius: 5,
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  boxShadow: 5,
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "65vh",
                    overflow: "hidden",
                    overflowY: "unset",
                    "&::-webkit-scrollbar": {
                      width: ".3vw",
                      mt: 1,
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "rgba(0,0,0,.5)",
                      outline: "1px solid slategrey",
                      borderRadius: 1,
                    },
                  }}
                >
                  <TableContainer sx={{ borderRadius: 5 }}>
                    <Table>
                      <TableHead sx={{ backgroundColor: "#edeaea" }}>
                        <TableRow>
                          <TableCell
                            sx={{ fontFamily: "MontserratBold" }}
                            align="center"
                          >
                            Ejercicio Fiscal
                          </TableCell>
                          <TableCell
                            sx={{ fontFamily: "MontserratBold" }}
                            align="center"
                          >
                            Institución
                          </TableCell>
                          <TableCell
                            sx={{ fontFamily: "MontserratBold" }}
                            align="center"
                          >
                            Nombre del Programa
                          </TableCell>
                          <TableCell
                            sx={{ fontFamily: "MontserratBold" }}
                            align="center"
                          >
                            Eje
                          </TableCell>
                          <TableCell
                            sx={{ fontFamily: "MontserratBold" }}
                            align="center"
                          >
                            Tema
                          </TableCell>
                          <TableCell
                            sx={{ fontFamily: "MontserratBold" }}
                            align="center"
                          >
                            Estado
                          </TableCell>
                          <TableCell
                            sx={{ fontFamily: "MontserratBold" }}
                            align="center"
                          >
                            Fecha Creación
                          </TableCell>
                          <TableCell
                            sx={{ fontFamily: "MontserratBold" }}
                            align="center"
                          >
                            Opciones
                          </TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        <TableRow>
                          <TableCell
                            sx={{
                              fontFamily: "MontserratRegular",
                              fontSize: ".7vw",
                            }}
                            align="center"
                          >
                            {"AnioFiscal"}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontFamily: "MontserratRegular",
                              fontSize: ".7vw",
                            }}
                            align="center"
                          >
                            {"Institucion"}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontFamily: "MontserratRegular",
                              fontSize: ".7vw",
                            }}
                            align="center"
                          >
                            {"Programa"}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontFamily: "MontserratRegular",
                              fontSize: ".7vw",
                            }}
                            align="center"
                          >
                            {"Eje"}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontFamily: "MontserratRegular",
                              fontSize: ".7vw",
                            }}
                            align="center"
                          >
                            {"Tematica"}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontFamily: "MontserratRegular",
                              fontSize: ".7vw",
                            }}
                            align="center"
                          >
                            {"20/10/2022"}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontFamily: "MontserratRegular",
                              fontSize: ".7vw",
                            }}
                            align="center"
                          >
                            {"Estado"}
                          </TableCell>

                          <TableCell align="center">
                            <Box sx={{ display: "flex" }}>
                              <Tooltip title="Eliminar">
                                <IconButton>
                                  <DeleteIcon
                                    sx={[
                                      {
                                        "&:hover": {
                                          color: "red",
                                        },
                                      },
                                    ]}
                                  />
                                </IconButton>
                              </Tooltip>

                              <Tooltip title="Enviar">
                                <IconButton>
                                  <SendIcon
                                    sx={[
                                      {
                                        "&:hover": {
                                          color: "lightGreen",
                                        },
                                      },
                                    ]}
                                  />
                                </IconButton>
                              </Tooltip>
                            </Box>

                            <Box sx={{ display: "flex" }}>
                              <Tooltip title="Descargar">
                                <IconButton>
                                  <DownloadIcon
                                    sx={[
                                      {
                                        "&:hover": {
                                          color: "orange",
                                        },
                                      },
                                    ]}
                                  />
                                </IconButton>
                              </Tooltip>

                              <Tooltip title="Editar">
                                <IconButton>
                                  <EditIcon
                                    sx={[
                                      {
                                        "&:hover": {
                                          color: "blue",
                                        },
                                      },
                                    ]}
                                  />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                        </TableRow>
                        
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Box>
            </Box> */}
          </>
        ) : (
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "center",
              height: "92vh",
            }}
           // gridArea={"main"}

          >
            <TabsActividadesInstitucionales returnMain={returnMain} />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

const top100Films = () => [
  {
    label:
      "CONTRIBUIR A INCREMENTAR LA TASA BRUTA DE COBERTURA EN EDUCACIÓN MEDIA SUPERIOR MEDIANTE LOS SERVICIOS QUE BRINDAN LAS INSTITUCIONES DE BACHILLERATO EN EL ESTADO",
  },
  {
    label:
      "LOS ALUMNOS ASISTEN Y DAN CONTINUIDAD A SUS ESTUDIOS EN EL COLEGIO; LOS PADRES DE FAMILIA O TUTORES PERMITEN QUE SUS HIJOS RECIBAN APOYO INTEGRAL POR PARTE DEL COLEGIO",
  },
  {
    label:
      "LOS PROCESOS DE LICITACIÓN DE LA SECRETARÍA DE ADMINISTRACIÓN DEL GOBIERNO DEL ESTADO SE DAN EN TIEMPO Y FORMA Y NO SON DECLARADAS DESIERTAS",
  },
  {
    label:
      "LOS PROCESOS DE LICITACIÓN DE LA SECRETARÍA DE ADMINISTRACIÓN DEL GOBIERNO DEL ESTADO SE DAN EN TIEMPO Y FORMA Y NO SON DECLARADAS DESIERTAS Y LOS PROVEEDORES ENTREGAN LAS MATERIAS PRIMAS EN LAS FECHAS PROGRAMADAS Y EN LAS FORMAS INDICADAS",
  },
];
