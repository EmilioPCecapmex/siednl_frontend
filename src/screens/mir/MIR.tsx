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
  Autocomplete,
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
import FullModalMir from "../../components/tabsMir/FullModalMir";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

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

  const [catalogoAniosFiscales, setCatalogoAniosFiscales] = useState([
    { Id: "", AnioFiscal: "" },
  ]);
  const [anioFiscal, setAnioFiscal] = useState("");
  const [institution, setInstitution] = useState("");
  const [programaPresupuestario, setProgramaPresupuestario] = useState("");

  const [mirs, setMirs] = useState([
    {
      Id: "",
      AnioFiscal: "",
      Institucion: "",
      Programa: "",
      Eje: "",
      Tematica: "",
      MIR: "",
      Estado: "",
    },
  ]);

  //
  const [mirsFiltered, setMirsFiltered] = useState([
    {
      Id: "",
      AnioFiscal: "",
      Institucion: "",
      Programa: "",
      Eje: "",
      Tematica: "",
      MIR: "",
      Estado: "",
    },
  ]);

  const [txtFiltered, setTxtFiltered] = useState("");

  // Filtrado por caracter
  const findText = () => {
    if (txtFiltered !== '') {
      setMirsFiltered(
        mirs.filter(
          (x) =>
            x.AnioFiscal.includes(txtFiltered) ||
            x.Institucion.toLowerCase().includes(txtFiltered.toLowerCase()) ||
            x.Programa.toLowerCase().includes(txtFiltered.toLowerCase())
        )
      );
    } else {
      setMirsFiltered(mirs);
    }
  };

  useEffect(() => {
    findText();
  }, [txtFiltered]);

  const getAniosFiscales = () => {
    axios
      .get("http://10.200.4.105:8000/api/aniosFiscales", {
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
      .get("http://10.200.4.105:8000/api/usuarioInsitucion", {
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

  const getMIRs = () => {
    axios
      .get("http://localhost:8000/api/mir", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setMirs(r.data.data);
        setMirsFiltered(r.data.data);
      });
  };

  useEffect(() => {
    getMIRs();
    getAniosFiscales();
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

  const handleClickOpen = () => {
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
      <LateralMenu selection={2} />
      <Header
        details={{
          name1: "Inicio",
          path1: "../home",
          name2: "MIR",
          path2: "../mir",
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
                options={catalogoAniosFiscales}
                getOptionLabel={(option) => option.AnioFiscal}
                getOptionDisabled={(option) =>
                  option.Id === "0" ? true : false
                }
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.Id}>
                      <div
                        style={{
                          fontFamily: "MontserratRegular",
                          fontSize: ".8vw",
                        }}
                      >
                        {option.AnioFiscal}
                      </div>
                    </li>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Ejercicio Fiscal"
                    placeholder="Ejercicio Fiscal"
                    onChange={(v) => setTxtFiltered(v.target.value)}
                    InputLabelProps={{
                      style: {
                        fontFamily: "MontserratSemiBold",
                        fontSize: ".7vw",
                      },
                    }}
                  ></TextField>
                )}
                onChange={(event, value) => {
                  setAnioFiscal(value?.AnioFiscal as string);
                  setTxtFiltered(value?.AnioFiscal as string || '');
                }}
                isOptionEqualToValue={(option, value) => option.Id === value.Id}
              />
            </Box>

            <Box sx={{ width: "20vw", height: "5vh" }}>
              <Autocomplete
                disablePortal
                size="small"
                getOptionDisabled={(option) =>
                  option.Id === "0" ? true : false
                }
                options={catalogoProgramasPresupuestarios}
                getOptionLabel={(option) => option.NombrePrograma}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.Id}>
                      <div
                        style={{
                          fontFamily: "MontserratRegular",
                          fontSize: ".8vw",
                        }}
                      >
                        {option.NombrePrograma}
                      </div>
                    </li>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Nombre del Programa"
                    placeholder="Nombre del Programa"
                    onChange={(v) => setTxtFiltered(v.target.value)}
                    InputLabelProps={{
                      style: {
                        fontFamily: "MontserratSemiBold",
                        fontSize: ".7vw",
                      },
                    }}
                  ></TextField>
                )}
                onChange={(event, value) =>{
                  setProgramaPresupuestario(value?.NombrePrograma as string);
                  setTxtFiltered(value?.NombrePrograma as string || '');
                }}
                isOptionEqualToValue={(option, value) => option.Id === value.Id}
              />
            </Box>

            <Box sx={{ width: "20vw", height: "5vh" }}>
              <Autocomplete
                disablePortal
                size="small"
                options={catalogoInstituciones}
                getOptionLabel={(option) => option.NombreInstitucion}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.Id}>
                      <div
                        style={{
                          fontFamily: "MontserratRegular",
                          fontSize: ".8vw",
                        }}
                      >
                        {option.NombreInstitucion}
                      </div>
                    </li>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Institución"
                    placeholder="Institución"
                    onChange={(v) => setTxtFiltered(v.target.value)}
                    InputLabelProps={{
                      style: {
                        fontFamily: "MontserratSemiBold",
                        fontSize: ".7vw",
                      },
                    }}
                  ></TextField>
                )}
                onChange={(event, value) =>{
                  setInstitution(value?.NombreInstitucion as string);
                  setTxtFiltered(value?.NombreInstitucion as string || '');
                }}
                isOptionEqualToValue={(option, value) => option.Id === value.Id}
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
              onClick={() => handleClickOpen()}
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
                    {mirsFiltered
                      // .slice(
                      //   page * rowsPerPage,
                      //   page * rowsPerPage + rowsPerPage
                      // )
                      .map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>{row.AnioFiscal}</TableCell>
                          <TableCell>{row.Institucion}</TableCell>
                          <TableCell>{row.Programa}</TableCell>
                          <TableCell>{row.Eje}</TableCell>
                          <TableCell>{row.Tematica}</TableCell>
                          <TableCell align="center">{row.Estado}</TableCell>

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
                      ))}

                    {/* ))} */}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Box sx={{ width: "100%" }}>
              <TablePagination
                rowsPerPageOptions={[renglonesPagina]}
                component="div"
                count={mirs.length}
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
            width: "85%",
            height: "92%",
            flexWrap: "wrap",
          }}
        >
          <FullModalMir />
        </Box>
      )}
    </Box>
  );
};
