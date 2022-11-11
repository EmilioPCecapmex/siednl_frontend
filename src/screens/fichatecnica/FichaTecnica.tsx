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
  Button,
  TablePagination,
  Input,
  Select,
  FormControl,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import SearchIcon from "@mui/icons-material/Search";
import moment from "moment";
import FullModalFichaTecnica from "../../components/tabsFichaTecnica/ResumenFT";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IIMir } from "../mir/MIR";
import { IIMa} from "../metaAnual/MetaAnual";
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
    .get("http://localhost:8000/api/Lista-Ficha-tecnica", {
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
              <TableContainer>
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
                    {ftFiltered
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) =>
                        row.Estado !== "Autorizada" ? null : (
                          <TableRow key={index}>
                            <TableCell
                              sx={{
                                fontFamily: "MontserratRegular",
                                fontSize: ".7vw",
                                width: "15%",
                              }}
                              align="center"
                            >
                              {row.AnioFiscal}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontFamily: "MontserratRegular",
                                fontSize: ".7vw",
                                width: "20%",
                              }}
                              align="center"
                            >
                              {row.Institucion}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontFamily: "MontserratRegular",
                                fontSize: ".7vw",
                                width: "20%",
                              }}
                              align="center"
                            >
                              {row.Programa}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontFamily: "MontserratRegular",
                                fontSize: ".7vw",
                                width: "20%",
                              }}
                              align="center"
                            >
                              {row.Estado}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontFamily: "MontserratRegular",
                                fontSize: ".7vw",
                                width: "15%",
                              }}
                              align="center"
                            >
                              {moment(row.FechaCreacion, moment.ISO_8601)
                                .format("DD/MM/YYYY HH:mm:SS")
                                .toString()}
                            </TableCell>
                            <TableCell align="center" sx={{ width: "10%" }}>
                              {/*----------Ficha tecnica--------------*/}

                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  flexDirection: "row",
                                }}
                              >
                                <Tooltip title="Descargar">
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

                                <Tooltip title="Ver">
                                  <span>
                                    <IconButton>
                                      <VisibilityIcon
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
                      )}

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
            mt: "8vh",
            }}
        >
          <FullModalFichaTecnica
            anioFiscalEdit={anioFiscalEdit}
            MIR={mirEdit[0]?.MIR || ""}
            MA={maEdit[0]?.MetaAnual || ""}
            showResume={returnMain}
            IdMir={mirEdit[0]?.ID || ""}
          />
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
  MIR: string
  MetaAnual: string;
  //FichaTecnica:String;
  Estado: string;
  CreadoPor: string;
  FechaCreacion: string;
}
