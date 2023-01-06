import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import axios from "axios";
import DownloadIcon from "@mui/icons-material/Download";
import SearchIcon from "@mui/icons-material/Search";
import { LateralMenu } from "../../../lateralMenu/LateralMenu";
import { Header } from "../../../header/Header";

export const TablaDocs = () => {
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
  const [findInstStr, setFindInstStr] = useState("0");
  const [findSelectStr, setFindSelectStr] = useState("0");

  const [docs, setDocs] = useState([]);

  const [docsFiltered, setDocsFiltered] = useState([]);


  // Filtrado por caracter
  //   const findText = (v: string, est: string, inst: string) => {
  //     if (v !== "" || est !== "0" || inst !== "0") {
  //       setDocsFiltered(
  //         docs.filter(
  //           (x) =>
  //             x.AnioFiscal.includes(findTextStr) ||
  //             x.Institucion.toLowerCase().includes(findTextStr.toLowerCase()) ||
  //             x.Programa.toLowerCase().includes(findTextStr.toLowerCase()) ||
  //             x.FechaCreacion.toLowerCase().includes(findTextStr.toLowerCase())
  //         )
  //       );

  //       if (est !== "0" && inst !== "0") {
  //         setDocsFiltered(
  //           docs.filter(
  //             (x) =>
  //               x.Estado.toLowerCase().includes(est.toLowerCase()) &&
  //               x.Institucion.toLowerCase().includes(inst.toLowerCase())
  //           )
  //         );
  //       } else if (est !== "0") {
  //         setDocsFiltered(
  //           docs.filter((x) => x.Estado.toLowerCase().includes(est.toLowerCase()))
  //         );
  //       } else if (inst !== "0") {
  //         setDocsFiltered(
  //           docs.filter((x) =>
  //             x.Institucion.toLowerCase().includes(inst.toLowerCase())
  //           )
  //         );
  //       } else {
  //         setDocsFiltered(docs);
  //       }
  //     } else {
  //       setDocsFiltered(docs);
  //     }
  //   };

  //   const getDocs = () => {
  //     axios
  //       .get(
  //         process.env.REACT_APP_APPLICATION_BACK + "/api/Lista-Docs",
  //         {
  //           params: {
  //             IdInstitucion: localStorage.getItem("IdInstitucion"),
  //           },
  //           headers: {
  //             Authorization: localStorage.getItem("jwtToken") || "",
  //           },
  //         }
  //       )
  //       .then((r) => {
  //         setDocs(r.data.data);
  //         setDocsFiltered(r.data.data);
  //       })
  //       .catch((err) => {});
  //   };

  //   useEffect(() => {
  //     getDocs();
  //   }, []);

  const [actualizacion, setActualizacion] = useState(0);

  //   useEffect(() => {
  //     getDocs();
  //   }, [actualizacion]);

  const actualizaContador = () => {
    setActualizacion(actualizacion + 1);
  };

  const color = (v: string, m: string) => {
    if (m !== undefined) {
      let isModification = m;
      // isModification = JSON.parse(m);
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
      <LateralMenu selection={9} actionNumber={0} />
      <Header
        details={{
          name1: "Inicio",
          path1: "../home",
          name2: "Documentos Firmados",
          path2: "../tabla",
          name3: "",
        }}
      />
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
            gridTemplateColumns: "repeat(2, 1fr)",
            boxShadow: 5,
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "70%",
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
              placeholder="Búsqueda"
              sx={{ width: "90%", fontFamily: "MontserratRegular" }}
              disableUnderline
              // onChange={(v) => {
              //   setFindTextStr(v.target.value);
              //   findText(v.target.value, findSelectStr, "");
              // }}
            />
            <SearchIcon />
          </Box>

          <FormControl
            sx={{
              display: "flex",
              width: "70%",
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
              value={findInstStr}
              sx={{ fontFamily: "MontserratRegular" }}
              fullWidth
              disableUnderline
              // onChange={(v) => {
              //   v.target.value === "Todos"
              //     ? findText(
              //         findTextStr,
              //         findSelectStr === "Todos" ? "0" : findSelectStr,
              //         "0"
              //       )
              //     : findText(findTextStr, findSelectStr, v.target.value);
              //   setFindInstStr(v.target.value);
              // }}
            >
              <MenuItem
                value={"0"}
                sx={{ fontFamily: "MontserratRegular" }}
                disabled
                selected
              >
                Filtro por sistema
              </MenuItem>

              <MenuItem
                value={"Todos"}
                sx={{ fontFamily: "MontserratRegular" }}
              >
                Todos
              </MenuItem>

              {/* {instituciones?.map((item) => {
                  return (
                    <MenuItem value={item.NombreInstitucion} key={item.Id}>
                      {item.NombreInstitucion}
                    </MenuItem>
                  );
                })} */}
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
          <Table>
            <TableHead sx={{ backgroundColor: "#edeaea", width: "100%" }}>
              <TableRow
                sx={{
                  width: "100%",
                  display: "grid",
                  gridTemplateColumns: "repeat(8, 1fr)",
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
                  NO. DE OFICIO
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "MontserratBold",
                    borderBottom: 0,
                    fontSize: "0.8vw",
                  }}
                  align="center"
                >
                  NO. DE SERIE
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "MontserratBold",
                    borderBottom: 0,
                    fontSize: "0.8vw",
                  }}
                  align="center"
                >
                  SISTEMA
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "MontserratBold",
                    borderBottom: 0,
                    fontSize: "0.8vw",
                  }}
                  align="center"
                >
                  ASUNTO
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "MontserratBold",
                    borderBottom: 0,
                    fontSize: "0.8vw",
                  }}
                  align="center"
                >
                  FIRMANTE
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "MontserratBold",
                    borderBottom: 0,
                    fontSize: "0.8vw",
                  }}
                  align="center"
                >
                  RFC
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "MontserratBold",
                    borderBottom: 0,
                    fontSize: "0.8vw",
                  }}
                  align="center"
                >
                  FECHA DE FIRMADO
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "MontserratBold",
                    borderBottom: 0,
                    fontSize: "0.8vw",
                  }}
                  align="center"
                >
                  DOCUMENTO
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>

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
            <TableContainer sx={{ overflow: "unset" }}>
              <Table>
                <TableBody>
                  {/* {docsFiltered
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => ( */}
                  <TableRow
                    //   key={index}
                    sx={{
                      width: "100%",
                      display: "grid",
                      gridTemplateColumns: "repeat(8, 1fr)",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <TableCell
                      sx={{
                        fontFamily: "MontserratRegular",
                        fontSize: "0.8vw",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      align="center"
                    >
                      {"1"}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "MontserratRegular",
                        fontSize: "0.8vw",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      align="center"
                    >
                      {"2"}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "MontserratRegular",
                        fontSize: "0.8vw",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      align="center"
                    >
                      {"Sistema del Presupuesto Basado en Resultados"}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "MontserratRegular",
                        fontSize: "0.8vw",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      align="center"
                    >
                      {"Prueba"}
                    </TableCell>

                    <TableCell
                      sx={{
                        fontFamily: "MontserratRegular",
                        fontSize: "0.8vw",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      align="center"
                    >
                      {"JESUS ALEJANDRO GONZALEZ TOXTLE"}
                    </TableCell>

                    <TableCell
                      sx={{
                        fontFamily: "MontserratRegular",
                        fontSize: "0.8vw",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      align="center"
                    >
                      {"GOTJ971127BF8"}
                    </TableCell>

                    <TableCell
                      sx={{
                        fontFamily: "MontserratRegular",
                        fontSize: "0.8vw",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      align="center"
                    >
                      {'2023-01-05 11:24:23'}
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
                      <Box sx={{ display: "flex" }}>
                        <Tooltip title="DESCARGAR DOCUMENTO">
                          <span>
                            <IconButton
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
                      </Box>
                    </TableCell>
                  </TableRow>
                  {/* ))} */}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box sx={{ width: "100%" }}>
            <TablePagination
              rowsPerPageOptions={[renglonesPagina]}
              component="div"
              count={docs.length}
              rowsPerPage={renglonesPagina}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
