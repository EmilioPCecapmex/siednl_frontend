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
import moment from "moment";
import AddMetaAnual from "../../components/tabsMetaAnual/AddMetaAnual";
import ComentDialogMA from "../../components/modalsMA/ModalComentariosMA";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { IInstituciones } from "../../components/appsDialog/AppsDialog";
import { TutorialBox } from "../../components/tutorialBox/tutorialBox";
import Swal from "sweetalert2";
export let ResumeDefaultMA = true;
export let setResumeDefaultMA = () => {
  ResumeDefaultMA = !ResumeDefaultMA;
};

export const MetaAnual = () => {
  useEffect(() => {
    setShowResume(true);
    getMA();
  }, [ResumeDefaultMA]);

  const returnMain = () => {
    setShowResume(true);
    setActionNumber(1);
    getMA();
  };

  const [showResume, setShowResume] = useState(true);
  const [page, setPage] = useState(0);

  const renglonesPagina = 7;
  const [rowsPerPage, setRowsPerPage] = useState(renglonesPagina);

  const [actionNumber, setActionNumber] = useState(0);

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

  const [metaAnualDownloadDetails, setMetaAnualDownloadDetails] =
    useState<IDownloadMA>();

  const [ma, setMa] = useState<Array<IIMa>>([]);
  const [maEdit, setMaEdit] = useState<Array<IIMa>>([]);

  const [maFiltered, setMaFiltered] = useState<Array<IIMa>>([]);

  const [instituciones, setInstituciones] = useState<Array<IInstituciones>>();

  const getInstituciones = () => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/usuarioInsitucion", {
        params: {
          IdUsuario: localStorage.getItem("IdUsuario"),
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          setInstituciones(r.data.data);
        }
      });
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const getMetaAnualDownload = (
    MIR: string,
    MetaAnual: string,
    inst: string,
    Programa: string,
    FechaCreacion: string,
    
  ) => {
    //JSON.parse(),
    const fullMA = [JSON.parse(MIR), JSON.parse(MetaAnual)];

    axios
      .post("http://192.168.137.152:7001/api/fill_ma", fullMA, {
        responseType: "blob",
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        Toast.fire({
          icon: "success",
          title: "La descarga comenzara en un momento.",
        });
        const href = URL.createObjectURL(r.data);

        // create "a" HTML element with href to file & click
        const link = document.createElement("a");
        link.href = href;
        link.setAttribute(
          "download",
          "MA_" + FechaCreacion + "_" + inst + "_" + Programa + ".xlsx"
        ); //or any other extension
        document.body.appendChild(link);

        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      })
      .catch((err) => {

        Toast.fire({
          icon: "error",
          title: "Error al intentar descargar el documento.",
        });
      });
  };

  useEffect(() => {
    getInstituciones();
  }, []);

  // Filtrado por caracter
  const findText = (v: string, est: string, inst: string) => {
    if (v !== "" || est !== "0" || inst !== "0") {
      setMaFiltered(
        ma.filter(
          (x) =>
            x.AnioFiscal.includes(findTextStr) ||
            x.Institucion.toLowerCase().includes(findTextStr.toLowerCase()) ||
            x.Programa.toLowerCase().includes(findTextStr.toLowerCase()) ||
            x.FechaCreacion.toLowerCase().includes(findTextStr.toLowerCase())
        )
      );

      if (est !== "0" && inst !== "0") {
        setMaFiltered(
          ma.filter(
            (x) =>
              x.Estado.toLowerCase().includes(est.toLowerCase()) &&
              x.Institucion.toLowerCase().includes(inst.toLowerCase())
          )
        );
      } else if (est !== "0") {
        setMaFiltered(
          ma.filter((x) => x.Estado.toLowerCase().includes(est.toLowerCase()))
        );
      } else if (inst !== "0") {
        setMaFiltered(
          ma.filter((x) =>
            x.Institucion.toLowerCase().includes(inst.toLowerCase())
          )
        );
      } else {
        setMaFiltered(ma);
      }
    } else {
      setMaFiltered(ma);
    }
  };

  const getMA = () => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/Lista-MetaAnual", {
        params: {
          IdUsuario: localStorage.getItem("IdUsuario"),
          IdInstitucion: localStorage.getItem("IdInstitucion"),
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setMa(r.data.data);
        setMaFiltered(r.data.data);
      });
  };

  useEffect(() => {
    getMA();
  }, []);

  const [actualizacion, setActualizacion] = useState(0);

  useEffect(() => {
    getMA();
  }, [actualizacion]);

  const actualizaContador = () => {
    setActualizacion(actualizacion + 1);
  };

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
      <LateralMenu selection={3} actionNumber={actionNumber} />
      <Header
        details={{
          name1: "Inicio",
          path1: "../home",
          name2: "Meta Anual",
          path2: "../metaAnual",
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
          <TutorialBox initialState={35} endState={39} />
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
                onChange={(v) => {
                  setFindTextStr(v.target.value);
                  findText(v.target.value, findSelectStr, "");
                }}
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
                value={findSelectStr}
                sx={{ fontFamily: "MontserratRegular" }}
                fullWidth
                disableUnderline
                onChange={(v) => {
                  v.target.value === "Todos"
                    ? findText(
                        findTextStr,
                        "0",
                        findInstStr === "Todos" ? "0" : findInstStr
                      )
                    : findText(findTextStr, v.target.value, findInstStr);
                  setFindSelectStr(v.target.value);
                }}
              >
                <MenuItem
                  value={"0"}
                  sx={{ fontFamily: "MontserratRegular" }}
                  disabled
                  selected
                >
                  Filtro por estado de la Meta Anual
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
                onChange={(v) => {
                  v.target.value === "Todos"
                    ? findText(
                        findTextStr,
                        findSelectStr === "Todos" ? "0" : findSelectStr,
                        "0"
                      )
                    : findText(findTextStr, findSelectStr, v.target.value);
                  setFindInstStr(v.target.value);
                }}
              >
                <MenuItem
                  value={"0"}
                  sx={{ fontFamily: "MontserratRegular" }}
                  disabled
                  selected
                >
                  Filtro por institución
                </MenuItem>

                <MenuItem
                  value={"Todos"}
                  sx={{ fontFamily: "MontserratRegular" }}
                >
                  Todos
                </MenuItem>

                {instituciones?.map((item) => {
                  return (
                    <MenuItem value={item.NombreInstitucion} key={item.Id}>
                      {item.NombreInstitucion}
                    </MenuItem>
                  );
                })}
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
              <TableContainer>
                <Table>
                  <TableBody>
                    {maFiltered
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
                            {row.Institucion?.toUpperCase()}
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
                                {(row.Estado === "En Captura" &&
                                localStorage.getItem("Rol") === "Capturador"
                                  ? "Esperando captura"
                                  : row.Estado === "En Revisión" &&
                                    localStorage.getItem("Rol") ===
                                      "Verificador"
                                  ? "Esperando revisión"
                                  : row.Estado === "En Autorización" &&
                                    localStorage.getItem("Rol") ===
                                      "Administrador"
                                  ? "Esperando autorización"
                                  : row.Estado
                                ).toUpperCase()}
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
                              <Tooltip title="REGISTRAR META ANUAL">
                                <span>
                                  <IconButton
                                    disabled={
                                      row.Estado === "En Captura" &&
                                      localStorage.getItem("Rol") ===
                                        "Capturador"
                                        ? false
                                        : row.Estado === "En Revisión" &&
                                          localStorage.getItem("Rol") ===
                                            "Verificador"
                                        ? false
                                        : row.Estado === "En Autorización" &&
                                          localStorage.getItem("Rol") ===
                                            "Administrador"
                                        ? false
                                        : true
                                    }
                                    sx={{
                                      color: "#616161",
                                      "&:hover": {
                                        color: "blue",
                                      },
                                    }}
                                    onClick={() => {
                                      setMaEdit([
                                        {
                                          IdMa: row.IdMa,
                                          IdMir: row.IdMir,
                                          AnioFiscal: row.AnioFiscal,
                                          Institucion: row.Institucion,
                                          Programa: row.Programa,
                                          MIR: row.MIR,
                                          //meta anual completa
                                          MetaAnual: row.MetaAnual,
                                          Estado: row.Estado,
                                          CreadoPor: row.CreadoPor,
                                          FechaCreacion: row.FechaCreacion,
                                        },
                                      ]);
                                      setShowResume(false);
                                      setActionNumber(1);
                                    }}
                                  >
                                    <AddCircleOutlineIcon
                                      sx={{
                                        "&:hover": {
                                          color: "lightBlue",
                                        },
                                        width: "1.2vw",
                                        height: "1.2vw",
                                      }}
                                    />
                                  </IconButton>
                                </span>
                              </Tooltip>
                            </Box>

                            <Box sx={{ display: "flex" }}>
                              <Tooltip title="DESCARGAR">
                                <span>
                                  <IconButton
                                    onClick={() => {
                                      getMetaAnualDownload(
                                        row.MIR,
                                        row.MetaAnual,
                                        row.Programa,
                                        row.FechaCreacion,
                                        row.Institucion
                                      );
                                    }}
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
                              <ComentDialogMA
                                estado={row.Estado}
                                id={row.IdMir}
                                actualizado={actualizaContador}
                              />
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
                count={ma.length}
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
          <AddMetaAnual
            MIR={maEdit[0]?.MIR || ""}
            MA={maEdit[0]?.MetaAnual || ""}
            showResume={returnMain}
            IdMir={maEdit[0]?.IdMir || ""}
            IdMA={maEdit[0]?.IdMa || ""}
          />
        </Box>
      )}
    </Box>
  );
};

export interface IIMa {
  IdMa: string;
  IdMir: string;
  AnioFiscal: string;
  Institucion: string;
  Programa: string;
  MIR: string;
  MetaAnual: string;
  Estado: string;
  CreadoPor: string;
  FechaCreacion: string;
}

export interface IDownloadMA {
  MaId: string;
  MetaAnual: string;
  MirId: string;
  MIR: string;
  MaCompleta: string;
}
