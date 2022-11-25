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
  Typography,
} from "@mui/material";
import axios from "axios";
import DownloadIcon from "@mui/icons-material/Download";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import moment from "moment";
import AddFichaTecnica from "../../components/tabsFichaTecnica/AddFichaTecnica";
export let resumeDefaultFT = true;
export let setResumeDefaultFT = () => {
  resumeDefaultFT = !resumeDefaultFT;
};

export const FichaTecnica = () => {
  useEffect(() => {
    setShowResume(true);
    getFT();
  }, [resumeDefaultFT]);

  const returnMain = () => {
    setShowResume(true);
    getFT();
  };

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

  const [findTextStr, setFindTextStr] = useState("");
  const [findSelectStr, setFindSelectStr] = useState("0");

  const [ft, setft] = useState<Array<IIFT>>([]);
  const [FTEdit, setFTEdit] = useState<Array<IIFT>>([]);

  //
  const [ftFiltered, setftFiltered] = useState<Array<IIFT>>([]);

  // Filtrado por caracter
  const findText = (v: string, select: string) => {
    if (v !== "" || select !== "0") {
      setftFiltered(
        ft.filter(
          (x) =>
            x.AnioFiscal.includes(findTextStr) ||
            x.Institucion.toLowerCase().includes(findTextStr.toLowerCase()) ||
            x.Programa.toLowerCase().includes(findTextStr.toLowerCase()) ||
            x.FechaCreacion.toLowerCase().includes(findTextStr.toLowerCase())
        )
      );

      if (select !== "0") {
        setftFiltered(
          ft.filter((x) =>
            x.Estado.toLowerCase().includes(select.toLowerCase())
          )
        );
      }
    } else {
      setftFiltered(ft);
    }
  };

  const getFT = () => {
    axios
      .get(
        process.env.REACT_APP_APPLICATION_BACK + "/api/Lista-Ficha-tecnica",
        {
          params: {
            IdUsuario: localStorage.getItem("IdUsuario"),
            IdInstitucion: localStorage.getItem("IdInstitucion"),
          },
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        setft(r.data.data);
        setftFiltered(r.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
                        sx={{
                          fontFamily: "MontserratBold",
                          borderBottom: 0,
                          fontSize: "0.8vw",
                        }}
                        align="center"
                      >
                        EJERCICIO FISCAL
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "MontserratBold",
                          borderBottom: 0,
                          fontSize: "0.8vw",
                        }}
                        align="center"
                      >
                        INSTITUCIÓN
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "MontserratBold",
                          borderBottom: 0,
                          fontSize: "0.8vw",
                        }}
                        align="center"
                      >
                        NOMBRE DEL PROGRAMA
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "MontserratBold",
                          borderBottom: 0,
                          fontSize: "0.8vw",
                        }}
                        align="center"
                      >
                        ESTADO
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "MontserratBold",
                          borderBottom: 0,
                          fontSize: "0.8vw",
                        }}
                        align="center"
                      >
                        FECHA DE CREACIÓN
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "MontserratBold",
                          borderBottom: 0,
                          fontSize: "0.8vw",
                        }}
                        align="center"
                      >
                        CREADO POR
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "MontserratBold",
                          borderBottom: 0,
                          fontSize: "0.8vw",
                        }}
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
                      .map((row, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(7,1fr)",
                          }}
                        >
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
                            {row.Estado === "En Captura"
                              ? "SIN ASIGNAR"
                              : row.CreadoPor.toUpperCase()}
                          </TableCell>

                          <TableCell
                            align="center"
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
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
                                      row.Estado === "Autorizada" ? false : true
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
                                      sx={{
                                        "&:hover": {
                                          color: "blue",
                                        },
                                        width: "1.2vw",
                                        height: "1.2vw",
                                      }}
                                      onClick={() => {
                                        setFTEdit([
                                          {
                                            Id: row.Id,
                                            IdMir: row.IdMir,
                                            IdMa: row.IdMa,
                                            FichaTecnica: row.FichaTecnica,
                                            Estado: row.Estado,
                                            CreadoPor: row.CreadoPor,
                                            FechaCreacion: row.FechaCreacion,
                                            AnioFiscal: row.AnioFiscal,
                                            Institucion: row.Institucion,
                                            Programa: row.Programa,
                                            MIR: row.MIR,
                                            MetaAnual: row.MetaAnual,
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
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Box sx={{ width: "100%" }}>
              <TablePagination
                rowsPerPageOptions={[renglonesPagina]}
                component="div"
                count={ft.length}
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
          <AddFichaTecnica
          MIR={FTEdit[0].MIR}
          showResume={returnMain}
          IdMir={FTEdit[0].IdMir}
          IdMA={FTEdit[0].IdMa}
          anioFiscalEdit={FTEdit[0].AnioFiscal}
          MA={FTEdit[0].MetaAnual}
          />
        </Box>
      )}
    </Box>
  );
};

export interface IIFT {
  Id: string;
  IdMir: string;
  IdMa: string;
  FichaTecnica: string;
  Estado: string;
  CreadoPor: string;
  FechaCreacion: string;
  AnioFiscal: string;
  Institucion: string;
  Programa: string;
  MIR: string;
  MetaAnual: string;
}
