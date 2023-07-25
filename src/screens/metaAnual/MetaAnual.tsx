/* eslint-disable react-hooks/exhaustive-deps */
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DownloadIcon from "@mui/icons-material/Download";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  InputLabel,
  TextField,
  Paper,
  InputBase,
} from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { IInstituciones } from "../../components/appsDialog/AppsDialog";
import { Header } from "../../components/header/Header";
import { LateralMenu } from "../../components/lateralMenu/LateralMenu";
import ComentDialogMA from "../../components/modalsMA/ModalComentariosMA";
import AddMetaAnual from "../../components/tabsMetaAnual/AddMetaAnual";
import { SelectChangeEvent } from "@mui/material/Select";
import { queries } from "../../queries";
import SearchIcon from "@mui/icons-material/Search";
export let ResumeDefaultMA = true;
export let setResumeDefaultMA = () => {
  ResumeDefaultMA = !ResumeDefaultMA;
};
const estados = [
  "Todos",
  "En Captura",
  "En Revisión",
  "En Autorización",
  "Autorizada",
];
export const MetaAnual = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  useEffect(() => {
    setShowResume(true);
    //getMA();
  }, [ResumeDefaultMA]);

  const returnMain = () => {
    setShowResume(true);
    setActionNumber(1);
    //getMA();
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
  const [findInstStr, setFindInstStr] = useState("Todos");
  const [findSelectStr, setFindSelectStr] = useState("Todos");

  const [ma, setMa] = useState<Array<IIMa>>([]);
  const [maEdit,  setMaEdit] = useState<Array<IIMa>>([]);
  const [maFiltered, setMaFiltered] = useState<Array<IIMa>>([]);
  const [maxFiltered, setMaxFiltered] = useState<Array<IIMa>>([]);

  const [instituciones, setInstituciones] = useState<Array<IInstituciones>>();

  const getInstituciones = (setstate: Function) => {
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
          setstate(r.data.data);
        }
      });
  };

  useEffect(() => {
    getMA(setMa);
  }, []);

  useEffect(() => {
    setMaFiltered(ma);
  }, [ma]);

  useEffect(() => {
    setMaxFiltered(maFiltered);
  }, [maFiltered]);

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

  useEffect(() => {
    let id = urlParams.get("Id");
    setMaFiltered(ma.filter((x) => x.IdMa.toLowerCase().includes(id || "")));
  }, [ma]);

  const getMetaAnualDownload = (
    MIR: string,
    MetaAnual: string,
    inst: string,
    Programa: string,
    FechaCreacion: string
  ) => {
    //JSON.parse(),
    const fullMA = [JSON.parse(MIR), JSON.parse(MetaAnual)];

    axios
      .post(process.env.REACT_APP_APPLICATION_FILL + "/api/fill_ma", fullMA, {
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
    getInstituciones(setInstituciones);
  }, []);

  // Filtrado por caracter
  const findText = (v: string, est: string, inst: string) => {
    if (
      v !== "" &&
      est !== "0" &&
      est !== "Todos" &&
      inst !== "0" &&
      inst !== "Todos"
    ) {
      setMaFiltered(
        ma.filter(
          (x) =>
            (x.AnioFiscal.includes(v) ||
              x.Institucion.toLowerCase().includes(v.toLowerCase()) ||
              x.Programa.toLowerCase().includes(v.toLowerCase()) ||
              x.FechaCreacion.toLowerCase().includes(v.toLowerCase()) ||
              x.CreadoPor.toLowerCase().includes(v.toLowerCase())) &&
            x.Estado.toLowerCase().includes(est.toLowerCase()) &&
            x.Institucion.toLowerCase().includes(inst.toLowerCase())
        )
      );
    } else if (
      v !== "" &&
      ((est !== "0" && est !== "Todos") || (inst !== "0" && inst !== "Todos"))
    ) {
      setMaFiltered(
        ma.filter(
          (x) =>
            (x.AnioFiscal.includes(v) ||
              x.Institucion.toLowerCase().includes(v.toLowerCase()) ||
              x.Programa.toLowerCase().includes(v.toLowerCase()) ||
              x.FechaCreacion.toLowerCase().includes(v.toLowerCase()) ||
              x.CreadoPor.toLowerCase().includes(v.toLowerCase())) &&
            (x.Estado.toLowerCase().includes(est.toLowerCase()) ||
              x.Institucion.toLowerCase().includes(inst.toLowerCase()))
        )
      );
    } else if (
      v !== "" &&
      (est === "0" || est === "Todos") &&
      (inst === "0" || inst === "Todos")
    ) {
      setMaFiltered(
        ma.filter(
          (x) =>
            x.AnioFiscal.includes(v) ||
            x.Institucion.toLowerCase().includes(v.toLowerCase()) ||
            x.Programa.toLowerCase().includes(v.toLowerCase()) ||
            x.FechaCreacion.toLowerCase().includes(v.toLowerCase()) ||
            x.CreadoPor.toLowerCase().includes(v.toLowerCase())
        )
      );
    } else if (
      v === "" &&
      est !== "0" &&
      est !== "Todos" &&
      inst !== "0" &&
      inst !== "Todos"
    ) {
      setMaFiltered(
        ma.filter(
          (x) =>
            x.Estado.toLowerCase().includes(est.toLowerCase()) &&
            x.Institucion.toLowerCase().includes(inst.toLowerCase())
        )
      );
    } else if (
      v === "" &&
      ((est !== "0" && est !== "Todos") || (inst !== "0" && inst !== "Todos"))
    ) {
      setMaFiltered(
        ma.filter(
          (x) =>
            x.Estado.toLowerCase().includes(est.toLowerCase()) ||
            x.Institucion.toLowerCase().includes(inst.toLowerCase())
        )
      );
    } else {
      setMaFiltered(ma);
    }
  };

  useEffect(() => {
    findText(findTextStr, findSelectStr, findInstStr);
  }, [findTextStr, findInstStr, findSelectStr]);

  const getMA = (setstate: Function) => {
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
        setstate(r.data.data);
        //setMaFiltered(r.data.data);
      });
  };

  // useEffect(() => {
  //   getMA();
  // }, []);

  const [actualizacion, setActualizacion] = useState(0);

  // useEffect(() => {
  //   getMA();
  // }, [actualizacion]);

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

  const [estadosR, SetEstadosR] = useState<string[]>([]);

  const filtrarDatos = () => {
    // eslint-disable-next-line array-callback-return
    console.log("Entra");
    let Arrayfiltro: IIMa[];
    Arrayfiltro = [];

    if (maxFiltered.length !== 0) {
      Arrayfiltro = maxFiltered;
    } else {
      Arrayfiltro = maxFiltered;
    }

    let ResultadoBusqueda = Arrayfiltro.filter((elemento) => {
      console.log("entre");
      console.log(elemento);
      console.log(findTextStr);
      console.log(maxFiltered);

      if (
        elemento.AnioFiscal.toString()
          .toLocaleLowerCase()
          .includes(findTextStr.toLocaleLowerCase()) ||
        elemento.Institucion.toString()
          .toLocaleLowerCase()
          .includes(findTextStr.toLocaleLowerCase()) ||
        elemento.Programa.toString()
          .toLocaleLowerCase()
          .includes(findTextStr.toLocaleLowerCase()) ||
        elemento.Estado.toString()
          .toLocaleLowerCase()
          .includes(findTextStr.toLocaleLowerCase()) ||
        elemento.FechaCreacion.toString()
          .toLocaleLowerCase()
          .includes(findTextStr.toLocaleLowerCase()) ||
        elemento.CreadoPor.toString()
          .toLocaleLowerCase()
          .includes(findTextStr.toLocaleLowerCase())
      ) {
        console.log(elemento);
        return elemento;
      }
    });

    setMaFiltered(ResultadoBusqueda);
  };

  const handleChange = (dato: string) => {
    setFindTextStr(dato);
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "grid",
        backgroundColor: "#F2F2F2",
        gridTemplateAreas: `
                            'aside header'
                            'aside main'
                           `,
      }}
    >
      <Box gridArea={"aside"} sx={{ mr: showResume ? 8 : 0 }}>
        <LateralMenu selection={"Meta Anual"} actionNumber={actionNumber} />
      </Box>

      <Box gridArea={"header"} sx={{ height: "8vh" }}>
        <Header
          details={{
            name1: "Inicio",
            path1: "../home",
            name2: "Meta Anual",
            path2: "../metaAnual",
            name3: "",
          }}
        />
      </Box>

      {showResume ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            height: "92vh",
          }}
          gridArea={"main"}
        >
          <Box
            sx={{
              width: "60%",
              height: "16vh",
              backgroundColor: "#fff",
              borderRadius: 5,
              display: "flex",
              //gridTemplateColumns: "repeat(2, 1fr)",
              flexDirection: "column",
              boxShadow: 5,
              justifyContent:"space-evenly",
              alignItems: "center"
              //flexDirection: "row",
              
            }}
          >
            {/* <TutorialBox initialState={35} endState={39} /> */}
            
              {/* <TextField
                size="small"
                value={findTextStr}
                label="Busqueda"
                sx={{ width: "100%", fontFamily: "MontserratRegular" }}
                variant="outlined"
                onChange={(v) => {
                  setFindTextStr(v.target.value);
                }}
              /> */}
              <Paper
                component="form"
                sx={{
                  alignItems: "center",
                  justifyItems: "center",
                  display: "flex",
                  width: "90%",
                  height:"6vh"
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Buscar"
                  value={findTextStr}
                  onChange={(e) => {
                    handleChange(e.target.value);
                  }}
                  onKeyPress={(ev) => {
                    if (ev.key === "Enter") {
                      filtrarDatos();
                      ev.preventDefault();
                      return false;
                    }
                  }}
                />
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                  onClick={() => filtrarDatos()}
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
            

            <Box
              sx={{
                display: "flex",
                //gridTemplateColumns: "repeat(2, 1fr)",
                //alignItems:"center",
                justifyItems: "space-evenly",
                gap: 2,
                width: "90%",
              }}
            >
              <FormControl
                sx={{
                  display: "flex",
                  width: "100%",
                  // alignItems: "center",
                  // justifyContent: "center",

                   borderRadius: 2,
                   borderColor: "#616161",
                   
                }}
              >
                <InputLabel sx={queries.text}>
                  Filtro por Estado de la MA
                </InputLabel>
                <Select
                  size="small"
                  fullWidth
                  variant="outlined"
                  label="Filtro por estado de la MA"
                  sx={{ fontFamily: "MontserratRegular" }}
                  value={findSelectStr}
                  onChange={(v) => {
                    // v.target.value === "Todos"
                    //   ? findText(
                    //       findTextStr,
                    //       "0",
                    //       findInstStr === "Todos" ? "0" : findInstStr
                    //     )
                    //   : findText(findTextStr, v.target.value, findInstStr);
                    setFindSelectStr(v.target.value);
                  }}
                >
                  {estados.map((estado) => (
                    <MenuItem key={estado} value={estado}>
                      {estado}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl
                sx={{
                  display: "flex",
                  width: "100%",
                  // alignItems: "center",
                  // justifyContent: "center",
                  // //border: 1,
                   borderRadius: 2,
                   borderColor: "#616161",
                   
                }}
              >
                <InputLabel sx={queries.text}>
                  Filtro por institución
                </InputLabel>
                <Select
                  size="small"
                  variant="outlined"
                  fullWidth
                  label="Filtro por institución"
                  sx={{ fontFamily: "MontserratRegular" }}
                  value={findInstStr}
                  // sx={{ fontFamily: "MontserratRegular" }}

                  onChange={(v) => {
                    setFindInstStr(v.target.value);
                  }}
                >
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
                              //flexDirection: "column",
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
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            height: "92vh",
          }}
          gridArea={"main"}
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
