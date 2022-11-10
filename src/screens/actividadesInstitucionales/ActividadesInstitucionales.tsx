import React, { useEffect, useState } from "react";

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
} from "@mui/material";
import { Header } from "../../components/header/Header";
import { LateralMenu } from "../../components/lateralMenu/LateralMenu";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import TabsActividadesInstitucionales from "../../components/tabsActividadesInstitucionales/TabsActividadesInstitucionales";

export let resumeDefaultAI = true;
export let setResumeDefaultAI = () => {
  resumeDefaultAI = !resumeDefaultAI;
};

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

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        backgroundColor: "#F2F2F2",
      }}
    >
      <LateralMenu selection={5} />
      <Header
        details={{
          name1: "Inicio",
          path1: "../home",
          name2: "Actividades Institucionales",
          path2: "../Institutionalactivities",
          name3: "",
        }}
      />
      {showResume ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "85%",
            height: "92%",
            mt: "8vh",
            flexWrap: "wrap",
          }}
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
                    {/* ))} */}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "85%",
            height: "92%",
            flexWrap: "wrap",
          }}
        >
          <TabsActividadesInstitucionales returnMain={returnMain} />
        </Box>
      )}
    </Box>
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
