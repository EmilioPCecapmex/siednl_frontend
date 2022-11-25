import React, { useEffect, useState } from "react";
import { LateralMenu } from "../../components/lateralMenu/LateralMenu";
import { Header } from "../../components/header/Header";
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  IconButton,
  TablePagination,
  Input,
  Select,
  FormControl,
  MenuItem,
  Autocomplete,
  Divider,
  ListItemButton,
  List,
  Typography,
  TextField,
  Radio,
  FormLabel,
} from "@mui/material";
import axios from "axios";
import DownloadIcon from "@mui/icons-material/Download";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import moment from "moment";
import { IIMir } from "../mir/MIR";
import { IIMa } from "../metaAnual/MetaAnual";
import FormControlLabel from "@mui/material/FormControlLabel";
export let resumeDefaultFT = true;
export let setResumeDefaultFT = () => {
  resumeDefaultFT = !resumeDefaultFT;
};

{
  /*Esto es un json de prueba*/
}
const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
];
{
  /*Esto es un json de prueba*/
}

export const FichaTecnica = () => {
  useEffect(() => {
    setShowResume(true);
    getFT();
  }, [resumeDefaultFT]);

  const returnMain = () => {
    setShowResume(true);
    getFT();
  };

  {
    /* Funcionalidad sacada de mir  */
  }
  const [fin, setFin] = useState({
    frecuencia: "",
    claridad: "",
    relevancia: "",
    economia: "",
    monitoreable: "",
    Adecuado: "",
    aporte_marginal: "",
  });

  const [proposito, setProposito] = useState({
    frecuencia: "SELECCIÓN ESTRATEGICO",
    claridad: "No",
    relevancia: "No",
    economia: "No",
    monitoreable: "No",
    Adecuado: "No",
    aporte_marginal: "Na",
  });
  {
    /* Funcionalidad sacada de mir  */
  }

  const [showResume, setShowResume] = useState(true);
  const [page, setPage] = useState(0);

  const renglonesPagina = 7;
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

  const [anioFiscalEdit, setAnioFiscalEdit] = useState("");
  const [findTextStr, setFindTextStr] = useState("");
  const [findSelectStr, setFindSelectStr] = useState("0");
  //---------------------No los estoy usando-------------------------
  const [mirs, setMirs] = useState<Array<IIMir>>([]);
  const [mirEdit, setMirEdit] = useState<Array<IIMir>>([]);

  const [ma, setMa] = useState<Array<IIMa>>([]);
  const [maEdit, setMaEdit] = useState<Array<IIMa>>([]);

  const [maFiltered, setMaFiltered] = useState<Array<IIMa>>([]);
  //---------------------No los estoy usando-------------------------

  const [ft, setft] = useState<Array<IIFT>>([]);
  const [FTEdit, setFTEdit] = useState<Array<IIFT>>([]);

  //
  const [ftFiltered, setftFiltered] = useState<Array<IIMir>>([]);
  // Filtrado por caracter
  const findText = (v: string, select: string) => {
    if (v !== "" || select !== "0") {
      setMaFiltered(
        ma.filter(
          (x) =>
            x.AnioFiscal.includes(findTextStr) ||
            x.Institucion.toLowerCase().includes(findTextStr.toLowerCase()) ||
            x.Programa.toLowerCase().includes(findTextStr.toLowerCase()) ||
            x.FechaCreacion.toLowerCase().includes(findTextStr.toLowerCase())
        )
      );

      if (select !== "0") {
        setMaFiltered(
          ma.filter((x) =>
            x.Estado.toLowerCase().includes(select.toLowerCase())
          )
        );
      }
    } else {
      setMaFiltered(ma);
    }
  };

  const getFT = () => {
    axios
    .get(process.env.REACT_APP_APPLICATION_BACK + "/api/Lista-Ficha-tecnica", {
        params: {
          IdUsuario: localStorage.getItem("IdUsuario"),
          IdInstitucion: localStorage.getItem("IdInstitucion"),
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setft(r.data.data);
        setftFiltered(r.data.data);
      }).catch((err) => {
        console.log(err)
      })
  };

  useEffect(() => {
    getFT();
  }, []);

  const handleClickOpen = () => {
    setShowResume(false);
  };

  const [actualizacion, setActualizacion] = useState(0);

  useEffect(() => {
    getFT();
  }, [actualizacion]);

  const actualizaContador = () => {
    setActualizacion(actualizacion + 1);
  };

  const [openModalComents, setOpenModalComents] = useState(false);

  const handleCloseComents = () => {
    setOpenModalComents(false);
  };
  const [showFin, setShowFin] = useState(true);
  const [showProposito, setShowProposito] = useState(false);

  const colorMir = (v: string, mEdit: string) => {
    if (mEdit !== undefined) {
      let isModification = mEdit;
      isModification = JSON.parse(mEdit);
      if (isModification[1]) {
        return "#cccc00";
      }
    }
    if (v === "En Captura") {
      return "#b3e6b3";
    } else if (v === "En Revisión") {
      return "#e6e6ff";
    } else if (v === "En Autorización") {
      return "#b3b3ff";
    } else if (v === "Autorizada") {
      return "#0000ff";
    }
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
      <LateralMenu selection={4} />
      <Header
        details={{
          name1: "Inicio",
          path1: "../home",
          name2: "Ficha Técnica",
          path2: "../fichatecnica",
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
              display: "flex",
              boxShadow: 5,
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "30%",
                alignItems: "center",
                justifyContent: "center",
                border: 1,
                borderRadius: 2,
                borderColor: "#616161",
              }}
            >
              <Input
                size="small"
                value={findTextStr}
                placeholder="Busqueda"
                sx={{ width: "90%", fontFamily: "MontserratRegular" }}
                disableUnderline
                onChange={(v) => {
                  setFindTextStr(v.target.value);
                  findText(v.target.value, findSelectStr);
                }}
              />
              <SearchIcon />
            </Box>

            <FormControl
              sx={{
                display: "flex",
                width: "30%",
                alignItems: "center",
                justifyContent: "center",
                border: 1,
                borderRadius: 2,
                borderColor: "#616161",
              }}
            >
              <Select
                size="small"
                variant="standard"
                value={findSelectStr}
                sx={{ fontFamily: "MontserratRegular" }}
                fullWidth
                disableUnderline
                onChange={(v) => {
                  v.target.value === "Todos"
                    ? findText(findTextStr, "")
                    : findText(findTextStr, v.target.value);
                  setFindSelectStr(v.target.value);
                }}
              >
                <MenuItem
                  value={"0"}
                  sx={{ fontFamily: "MontserratRegular" }}
                  disabled
                  selected
                >
                  Estado MIR
                </MenuItem>
                <MenuItem
                  value={"Todos"}
                  sx={{ fontFamily: "MontserratRegular" }}
                >
                  Todos
                </MenuItem>

                <MenuItem
                  value={"En Captura"}
                  sx={{ fontFamily: "MontserratRegular" }}
                >
                  En Captura
                </MenuItem>
                <MenuItem
                  value={"En Revisión"}
                  sx={{ fontFamily: "MontserratRegular" }}
                >
                  Esperando Revisión
                </MenuItem>
                <MenuItem
                  value={"En Autorización"}
                  sx={{ fontFamily: "MontserratRegular" }}
                >
                  Esperando autorización
                </MenuItem>
                <MenuItem
                  value={"Autorizada"}
                  sx={{ fontFamily: "MontserratRegular" }}
                >
                  Autorizada
                </MenuItem>
              </Select>
            </FormControl>
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
              <button
                onClick={() => {
                  setShowResume(!showResume);
                }}
              >
                FichaTecnica
              </button>
              <TableContainer>
                <Table>
                <TableHead sx={{ backgroundColor: "#edeaea", width: "100%" }}>
                <TableRow
                  sx={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <TableCell
                    sx={{ fontFamily: "MontserratBold", borderBottom: 0, fontSize:'0.8vw' }}
                    align="center"
                  >
                    EJERCICIO FISCAL
                  </TableCell>
                  <TableCell
                    sx={{ fontFamily: "MontserratBold", borderBottom: 0, fontSize:'0.8vw' }}
                    align="center"
                  >
                    INSTITUCIÓN
                  </TableCell>
                  <TableCell
                    sx={{ fontFamily: "MontserratBold", borderBottom: 0, fontSize:'0.8vw' }}
                    align="center"
                  >
                    NOMBRE DEL PROGRAMA
                  </TableCell>
                  <TableCell
                    sx={{ fontFamily: "MontserratBold", borderBottom: 0, fontSize:'0.8vw' }}
                    align="center"
                  >
                    ESTADO
                  </TableCell>
                  <TableCell
                    sx={{ fontFamily: "MontserratBold", borderBottom: 0, fontSize:'0.8vw' }}
                    align="center"
                  >
                    FECHA DE CREACIÓN
                  </TableCell>
                  <TableCell
                    sx={{ fontFamily: "MontserratBold", borderBottom: 0, fontSize:'0.8vw' }}
                    align="center"
                  >
                    CREADO POR
                  </TableCell>
                  <TableCell
                    sx={{ fontFamily: "MontserratBold", borderBottom: 0, fontSize:'0.8vw' }}
                    align="center"
                  >
                    OPCIONES
                  </TableCell>
                </TableRow>
              </TableHead>

                  <TableBody>
                    {ftFiltered
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) =>
                        
                          <TableRow key={index}
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(7,1fr)",
                          }}>
                            <TableCell
                              sx={{
                                fontFamily: "MontserratRegular",
                                fontSize: ".7vw",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                              align="center"
                            >
                              {row.AnioFiscal}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontFamily: "MontserratRegular",
                              fontSize: ".7vw",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            align="center"
                            >
                              {row.Institucion.toUpperCase()}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontFamily: "MontserratRegular",
                              fontSize: ".7vw",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            align="center"
                            >
                              {row.Programa.toUpperCase()}
                            </TableCell>
                            <TableCell
                            sx={{
                              fontFamily: "MontserratRegular",
                              fontSize: ".7vw",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            align="center"
                          >
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                width: "100%",
                                height: "5vh",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Box
                                sx={{
                                  width: ".5vw",
                                  height: "1vh",
                                  borderRadius: 100,
                                  backgroundColor: colorMir(
                                    row.Estado,
                                    row.MIR
                                  ),
                                }}
                              />
                              <Typography
                                sx={{
                                  width: "60%",
                                  fontFamily: "MontserratRegular",
                                  color: "#616161",
                                  fontSize: ".7vw",
                                  ml: "10%",
                                  textAlign: "center",
                                }}
                              >
                                 {row.Estado === "En Captura" &&
                                localStorage.getItem("Rol") === "Capturador"
                                  ? "BORRADOR"
                                  : row.Estado === "En Revisión" &&
                                    localStorage.getItem("Rol") ===
                                      "Verificador"
                                  ? "ESPERANDO REVISIÓN"
                                  : row.Estado === "En Autorización" &&
                                    localStorage.getItem("Rol") ===
                                      "Administrador"
                                  ? "ESPERANDO AUTORIZACIÓN"
                                  : row.Estado.toUpperCase()}
                              </Typography>
                            </Box>
                          </TableCell>
                            <TableCell
                              sx={{
                                fontFamily: "MontserratRegular",
                                fontSize: ".7vw",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                              align="center"
                            >
                              {moment(row.FechaCreacion, moment.ISO_8601)
                                .format("DD/MM/YYYY HH:mm:SS")
                                .toString()} 
                            </TableCell>
                            <TableCell
                            sx={{
                              fontFamily: "MontserratRegular",
                              fontSize: ".7vw",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            align="center"
                          >
                            {row.Estado === "En Captura" ? 'SIN ASIGNAR' : row.CreadoPor.toUpperCase()}
                          </TableCell>

                            <TableCell  align="center"
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                            }}>
                              {/*----------Ficha tecnica--------------*/}

                              <Box
                                sx={{
                                  display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "row",
                                }}
                              >
                                <Tooltip title="DESCARGAR">
                                  <span>
                                    <IconButton
                                      disabled={
                                        row.Estado === "Autorizada"
                                          ? false
                                          : true
                                      }
                                    >
                                      <DownloadIcon
                                        sx={[
                                          {
                                            "&:hover": {
                                              color: "orange",
                                            },
                                            width: "1.2vw",
                                            height: "1.2vw",
                                          },
                                        ]}
                                      />
                                    </IconButton>
                                  </span>
                                </Tooltip>

                                <Tooltip title="REGISTRAR FICHA TÉCNICA">
                                  <span>
                                    <IconButton>
                                      <AddCircleOutlineIcon
                                        sx={[
                                          {
                                            "&:hover": {
                                              color: "blue",
                                            },
                                            width: "1.2vw",
                                            height: "1.2vw",
                                          },
                                        ]}
                                        onClick={() => {
                                          setAnioFiscalEdit(row.AnioFiscal);
                                          setMirEdit([
                                            {
                                              ID: row.ID,
                                              AnioFiscal: row.AnioFiscal,
                                              Institucion: row.Institucion,
                                              Programa: row.Programa,
                                              Eje: row.Eje,
                                              Tematica: row.Tematica,
                                              MIR: row.MIR,
                                              Estado: row.Estado,
                                              FechaCreacion: row.FechaCreacion,
                                              CreadoPor: row.CreadoPor,
                                            },
                                          ]);
                                          setShowResume(false);
                                        }}
                                      />
                                    </IconButton>
                                  </span>
                                </Tooltip>
                              </Box>
                            </TableCell>
                          </TableRow>
                        )
                      }

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
            width: "100%",
            heigth: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "75vw",
              height: "75vh",
              boxShadow: 10,
              borderRadius: 5,
              flexDirection: "column",
              backgroundColor: "#fff",
            }}
          >
            {/* Aqui va un FormulaDialog */}
            <Box
              sx={{
                width: "100%",
                display: "flex",
                height: "7vh",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              {/* Botones Componentes */}
              <Typography
                sx={{
                  mr: "1vw",
                  fontFamily: "MontserratSemiBold",
                  fontSize: "1.2vw",
                }}
              >
                {showFin ? "FIN" : null}
                {showProposito ? "PROPÓSITO" : null}
              </Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
              }}
            >
              <List
                sx={{
                  width: "10vw",
                  height: "65vh",
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
                <Box
                  sx={{
                    height: "10vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Divider />
                  <ListItemButton
                    selected={showFin}
                    onClick={() => {
                      setShowFin(!showFin);
                      setShowProposito(false);
                    }}
                    sx={{
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
                        textTransform: "uppercase",
                      }}
                    >
                      Fin
                    </Typography>
                  </ListItemButton>
                  <Divider />
                </Box>
                {/*--------------------------------Aqui esta el boton de Fin--------------------------*/}
                <Box
                  sx={{
                    height: "10vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <ListItemButton
                    selected={showProposito}
                    onClick={() => {
                      setShowProposito(!showProposito);
                      setShowFin(false);
                    }}
                    sx={{
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
                        textTransform: "uppercase",
                      }}
                    >
                      Propósito
                    </Typography>
                  </ListItemButton>
                  <Divider />
                </Box>
                {/*--------------------------------Aqui esta el boton de  proposito--------------------------*/}
              </List>
              {/*--------------------------------Aqui termina la lista y empieza el diseño de Fin--------------------------*/}
              {showFin ? (
                <>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      width: "90%",
                      alignItems: "center",
                      justifyItems: "center",
                    }}
                  >
                    <FormControl
                      sx={{
                        width: "90%",
                        height: "60%",
                        backgroundColor: "#f0f0f0",
                        boxShadow: 2,
                        fontFamily: "MontserratMedium",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                      }}
                    >
                      <FormLabel>FRECUENCIA</FormLabel>
                      <FormControlLabel
                        value={"SELECCIÓN ESTRATEGICO"}
                        label={"SELECCIÓN ESTRATEGICO"}
                        sx={{
                          fontFamily: "MontserratMedium",
                        }}
                        control={
                          <Radio
                            checked={fin.frecuencia === "SELECCIÓN ESTRATEGICO"}
                            onChange={(c) => {
                              setFin({
                                ...fin,
                                frecuencia: c.target.value,
                              });
                            }}
                          />
                        }
                      />
                      <FormControlLabel
                        value={"DE GESTIÓN"}
                        label={"DE GESTIÓN"}
                        sx={{
                          fontFamily: "MontserratMedium",
                        }}
                        control={
                          <Radio
                            checked={fin.frecuencia === "DE GESTIÓN"}
                            onChange={(c) => {
                              setFin({
                                ...fin,
                                frecuencia: c.target.value,
                              });
                            }}
                          />
                        }
                      />
                    </FormControl>
                    <Autocomplete
                      disabled={false}
                      disablePortal
                      size="medium"
                      fullWidth
                      options={top100Films}
                      renderOption={(props, option) => {
                        return (
                          <li {...props} key={option.label}>
                            <p
                              style={{
                                fontFamily: "MontserratRegular",
                                fontSize: ".7vw",
                              }}
                            >
                              {option.label}
                            </p>
                          </li>
                        );
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={"DIMENSIÓN"}
                          variant="filled"
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
                      onChange={() => {}}
                    />
                    <TextField
                      rows={8}
                      multiline
                      variant="filled"
                      sx={{ width: "90%", boxShadow: 2 }}
                      label={"UNIDAD DE MEDIDA"}
                      InputLabelProps={{
                        style: {
                          fontFamily: "MontserratMedium",
                          fontSize: ".8vw",
                        },
                      }}
                      InputProps={{
                        style: {
                          fontFamily: "MontserratRegular",
                        },
                      }}
                    />

                    <FormControl
                      sx={{
                        width: "90%",
                        height: "60%",
                        backgroundColor: "#f0f0f0",
                        boxShadow: 2,
                        fontFamily: "MontserratMedium",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                      }}
                    >
                      <FormLabel>CLARIDAD</FormLabel>
                      <FormControlLabel
                        value={"SI"}
                        label={"SI"}
                        sx={{
                          fontFamily: "MontserratMedium",
                        }}
                        control={
                          <Radio
                            checked={fin.claridad === "SI"}
                            onChange={(c) => {
                              setFin({
                                ...fin,
                                claridad: c.target.value,
                              });
                            }}
                          />
                        }
                      />
                      <FormControlLabel
                        value={"NO"}
                        label={"NO"}
                        sx={{
                          fontFamily: "MontserratMedium",
                        }}
                        control={
                          <Radio
                            checked={fin.claridad === "NO"}
                            onChange={(c) => {
                              setFin({
                                ...fin,
                                claridad: c.target.value,
                              });
                            }}
                          />
                        }
                      />
                    </FormControl>

                    <FormControl
                      sx={{
                        width: "90%",
                        height: "60%",
                        backgroundColor: "#f0f0f0",
                        boxShadow: 2,
                        fontFamily: "MontserratMedium",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                      }}
                    >
                      <FormLabel>RELEVANCIA</FormLabel>
                      <FormControlLabel
                        value={"SI"}
                        label={"SI"}
                        sx={{
                          fontFamily: "MontserratMedium",
                        }}
                        control={
                          <Radio
                            checked={fin.relevancia === "SI"}
                            onChange={(c) => {
                              setFin({
                                ...fin,
                                relevancia: c.target.value,
                              });
                            }}
                          />
                        }
                      />
                      <FormControlLabel
                        value={"NO"}
                        label={"NO"}
                        sx={{
                          fontFamily: "MontserratMedium",
                        }}
                        control={
                          <Radio
                            checked={fin.relevancia === "NO"}
                            onChange={(c) => {
                              setFin({
                                ...fin,
                                relevancia: c.target.value,
                              });
                            }}
                          />
                        }
                      />
                    </FormControl>

                    <FormControl
                      sx={{
                        width: "90%",
                        height: "60%",
                        backgroundColor: "#f0f0f0",
                        boxShadow: 2,
                        fontFamily: "MontserratMedium",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                      }}
                    >
                      <FormLabel>ECONOMÍA</FormLabel>
                      <FormControlLabel
                        value={"SI"}
                        label={"SI"}
                        sx={{
                          fontFamily: "MontserratMedium",
                        }}
                        control={
                          <Radio
                            checked={fin.relevancia === "SI"}
                            onChange={(c) => {
                              setFin({
                                ...fin,
                                relevancia: c.target.value,
                              });
                            }}
                          />
                        }
                      />
                      <FormControlLabel
                        value={"NO"}
                        label={"NO"}
                        sx={{
                          fontFamily: "MontserratMedium",
                        }}
                        control={
                          <Radio
                            checked={fin.relevancia === "NO"}
                            onChange={(c) => {
                              setFin({
                                ...fin,
                                relevancia: c.target.value,
                              });
                            }}
                          />
                        }
                      />
                    </FormControl>
                  </Box>
                </>



              ) : null}

              {showProposito ? (
                <>
                  <Box></Box>
                </>
              ) : null}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export interface IIFT {
  IdMa: string;
  IdMir: string;
  AnioFiscal: string;
  Institucion: string;
  Programa: string;
  MIR: string;
  MetaAnual: string;
  //FichaTecnica:String;
  Estado: string;
  CreadoPor: string;
  FechaCreacion: string;
}
