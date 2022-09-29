import React, { useEffect, useState } from "react";
import { LateralMenu } from "../../components/lateralMenu/LateralMenu";
import { Header } from "../../components/header/Header";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input,
  TextField,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Tooltip,
  IconButton,
  Button,
  TablePagination,
} from "@mui/material";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import DownloadIcon from "@mui/icons-material/Download";
import FullModalMir from "../../components/modalMir/FullModalMir";
import FullModalMir2 from "../../components/modalMir/FullModalMir copy";

export const MIR = () => {
  const [showResume, setShowResume] = useState(true);
  const [page, setPage] = useState(0);
  const renglonesPagina = 6;
  const [rowsPerPage, setRowsPerPage] = useState(renglonesPagina);

  // Realiza el cambio de pagina
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0);
  };

  const [institution, setInstitution] = useState("0");
  const [programaPresupuestario, setProgramaPresupuestario] = useState("0");
  const [descripctionFiltered, setDescripctionFiltered] = useState("");

  const dataFilter = (text: string) => {
    setDescripctionFiltered(text);
  };

  const [dataDescripctionFiltered, setDataDescripctionFiltered] = useState([
    {
      Id: "",
      Desc: "",
      fnc: "",
      Tabla: "",
      selected: "",
    },
  ]);

  const [datosTabla, setDatosTabla] = React.useState([
    {
      Id: "",
      Desc: "",
      fnc: "",
      Tabla: "",
      selected: "",
    },
  ]);

  const findText = () => {
    if (descripctionFiltered !== "") {
      setDataDescripctionFiltered(
        dataDescripctionFiltered.filter((x) =>
          x.Desc.toLowerCase().includes(descripctionFiltered)
        )
      );
    } else {
      setDataDescripctionFiltered(datosTabla);
    }
  };

  const getInstituciones = () => {
    axios
      .get("http://10.200.4.105:8000/api/instituciones", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setDatosTabla(r.data.data);
      });
  };

  const getProgramaPresupuestario = () => {
    axios
      .get("http://10.200.4.105:8000/api/programaPresupuestario", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setCatalogoProgramasPresupuestarios(r.data.data);
      });
  };

  useEffect(() => {
    getInstituciones();
    getProgramaPresupuestario();
  }, []);

  const [catalogoInstituciones, setCatalogoInstituciones] = useState([
    { Id: "", NombreInstitucion: "" },
  ]);

  const [
    catalogoProgramasPresupuestarios,
    setCatalogoProgramasPresupuestarios,
  ] = useState([{ Id: "", NombrePrograma: "" }]);

  const [openModalEditarUsuario, setOpenModalEditarUsuario] = useState(false);

  const handleCloseModalEditarUsuario = () => {
    setOpenModalEditarUsuario(false);
  };
  const [idUsuarioEditar, setIdUsuarioEditar] = useState("");

  const handleClickOpen = () => {
    setShowResume(false);
  };

  const [actualizacion, setActualizacion] = useState(0);
  useEffect(() => {
    getInstituciones();
  }, [actualizacion]);

  const actualizaContador = () => {
    setActualizacion(actualizacion + 1);
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
      <LateralMenu selection={2} />
      <Header 
        details={{
          name1: "Inicio",
          path1: "../home",
          name2: "MIR",
          path2: "../MIR",
          name3: "",
        }}
        
      />
      {showResume ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "87%",
            height: "92%",
            mt: "8vh",
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              mt: "3vh",
              width: "50vw",
              height: "15vh",
              backgroundColor: "#fff",
              borderRadius: 5,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            <Box sx={{ width: "20vw", height: "5vh" }}>
              <FormControl sx={{ width: "20vw", height: "5vh" }}>
                <TextField
                  label="Ejercicio Fiscal"
                  variant="outlined"
                  sx={{}}
                  onChange={(v) => dataFilter(v.target.value)}
                />
              </FormControl>
            </Box>

            <Box sx={{ width: "20vw", height: "5vh" }}>
              <FormControl sx={{ width: "20vw", height: "5vh" }}>
                <InputLabel id="demo-simple-select-label">
                  Programa Presupuestario
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={programaPresupuestario}
                  label="Programa Presupuestario"
                  onChange={(x) => setProgramaPresupuestario(x.target.value)}
                >
                  <MenuItem value={"0"} key={0} disabled>
                    Programa
                  </MenuItem>
                  {catalogoProgramasPresupuestarios.map((item) => {
                    return (
                      <MenuItem value={item.Id} key={item.Id}>
                        {item.NombrePrograma}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>

            <Box>
              <FormControl sx={{ width: "20vw", height: "5vh" }}>
                <InputLabel id="demo-simple-select-label">
                  Institución
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={institution}
                  label="Instituciónes"
                  onChange={(x) => setInstitution(x.target.value)}
                  sx={{}}
                >
                  <MenuItem value={"0"} key={0} disabled>
                    Institución
                  </MenuItem>
                  {catalogoInstituciones.map((item) => {
                    return (
                      <MenuItem value={item.Id} key={item.Id}>
                        {item.NombreInstitucion}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>

            <Box>
              <Button
                sx={{
                  backgroundColor: "#c2a37b",
                  width: "10vw",
                  height: "4vh",
                  color: "black",
                  fontFamily: "montserrat",
                  fontSize: "0.6vw",
                }}
                onClick={() => handleClickOpen()}
              >
                Añadir nuevo registro
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              width: "70vw",
              height: "65vh",
              backgroundColor: "#ffff",
              borderRadius: 5,
              display: "flex",
              alignItems: "center",
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
                    {/* {descripctionFiltered
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => ( */}
                    <TableRow>
                      <TableCell>Institucion</TableCell>
                      <TableCell>Programa</TableCell>
                      <TableCell>Eje</TableCell>
                      <TableCell>Tema</TableCell>
                      <TableCell align="center">Estado</TableCell>
                      {/* {row.Institucion} */}

                      <TableCell align="center">
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
              <TablePagination
                rowsPerPageOptions={[renglonesPagina]}
                component="div"
                count={institution.length}
                rowsPerPage={renglonesPagina}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "87%",
        height: "92%",
        mt: "8vh",
        flexWrap: "wrap",
      }}
    >
      <Box
        sx={{
          width: "80vw",
          height: "86vh",
          backgroundColor: "#fff",
          borderRadius: 5,
        }}
      >
        <FullModalMir />
        </Box>
        </Box>
      )}
    </Box>
  );
};
