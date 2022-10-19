import { Autocomplete, Box, Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from "@mui/material";
import { Header } from "../../components/header/Header";
import { LateralMenu } from "../../components/lateralMenu/LateralMenu";
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import { TabActividades } from "../../components/tabsMir/TabActividades";
import TabsActividadesInstitucionales from "../../components/tabsActividadesInstitucionales/TabsActividadesInstitucionales";

export const ActividadesInstitucionales = () => {
  const [showActInstitucionales, setShowActInstitucionales] = useState(true);

  const handleClickOpenTabsActInst = () => {
    setShowActInstitucionales(false);
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
{showActInstitucionales ? (
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
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Movie" />}
            />
          </Box>
          <Box sx={{ width: "20vw", height: "5vh" }}>
            <Autocomplete
              disablePortal
              size="small"
              options={top100Films()}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Movie" />}
            />
          </Box>
          <Box sx={{ width: "20vw", height: "5vh" }}>
            <Autocomplete
              disablePortal
              size="small"
              options={top100Films()}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Movie" />}
            />
          </Box>
          <Button
              sx={{
                backgroundColor: "#c2a37b",
                width: "10vw",
                height: "4vh",
                color: "black",
                fontFamily: "montserrat",
                fontSize: "0.6vw",
              }}
              onClick={() => {handleClickOpenTabsActInst()}}
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
                    <TableRow key={"a"}>
                      <TableCell sx={{ fontFamily: "MontserratBold" }}>
                        Ejercicio Fiscal
                      </TableCell>
                      <TableCell sx={{ fontFamily: "MontserratBold" }}>
                        Institución
                      </TableCell>
                      <TableCell
                        sx={{ fontFamily: "MontserratBold" }}
                        align="left"
                      >
                        Nombre del Programa
                      </TableCell>
                      <TableCell
                        sx={{ fontFamily: "MontserratBold" }}
                        align="left"
                      >
                        Eje
                      </TableCell>
                      <TableCell
                        sx={{ fontFamily: "MontserratBold" }}
                        align="left"
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
                        Opciones
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    
                        <TableRow >
                          <TableCell>{"AnioFiscal"}</TableCell>
                          <TableCell>{"Institucion"}</TableCell>
                          <TableCell>{"Programa"}</TableCell>
                          <TableCell>{"Eje"}</TableCell>
                          <TableCell>{"Tematica"}</TableCell>
                          <TableCell align="center">{"Estado"}</TableCell>

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
          <TabsActividadesInstitucionales show={true} />
        </Box>
      )}
    </Box>
  );
};


const top100Films = () => [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },];