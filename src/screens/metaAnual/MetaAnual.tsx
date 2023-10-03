/* eslint-disable react-hooks/exhaustive-deps */
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DownloadIcon from "@mui/icons-material/Download";
import {
  Grid,
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
  Box,
  TableSortLabel,
} from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { IEntidad } from "../../components/appsDialog/AppsDialog";
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

interface Head {
  id: keyof IIMa;
  isNumeric: boolean;
  label: string;
}

const heads: readonly Head[] = [
  {
    id: "AnioFiscal",
    isNumeric: true,
    label: "EJERCICIO FISCAL",
  },
  {
    id: "Entidad",
    isNumeric: true,
    label: "ENTIDAD",
  },
  {
    id: "Programa",
    isNumeric: true,
    label: "NOMBRE DEL PROGRAMA",
  },
  {
    id: "Estado",
    isNumeric: true,
    label: "ESTADO",
  },
  {
    id: "FechaCreacion",
    isNumeric: true,
    label: "FECHA DE CREACIÓN",
  },
  {
    id: "CreadoPor",
    isNumeric: true,
    label: "CREADO POR",
  },
  {
    id: "Opciones",
    isNumeric: true,
    label: "OPCIONES",
  },
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

  const [validaFecha, setValidaFecha] = useState(true);
  const [ma, setMa] = useState<Array<IIMa>>([]);
  const [maEdit, setMaEdit] = useState<Array<IIMa>>([]);
  const [maFiltered, setMaFiltered] = useState<Array<IIMa>>([]);
  const [maxFiltered, setMaxFiltered] = useState<Array<IIMa>>([]);

  const [instituciones, setInstituciones] = useState<Array<IEntidad>>();

  const getInstituciones = (setstate: Function) => {
    // axios
    //   .get(process.env.REACT_APP_APPLICATION_BACK + "/api/usuarioInsitucion", {
    //     params: {
    //       IdUsuario: localStorage.getItem("IdUsuario"),
    //       Rol: localStorage.getItem("Rol"),
    //     },
    //     headers: {
    //       Authorization: localStorage.getItem("jwtToken") || "",
    //     },
    //   })
    //   .then((r) => {
    //     if (r.status === 200) {
    //       setstate(r.data.data);
    //     }
    //   });
    axios
      .get(process.env.REACT_APP_APPLICATION_LOGIN + "/api/lista-entidades", {
        params: {
          IdUsuario: localStorage.getItem("IdUsuario"),
          Rol: localStorage.getItem("Rol"),
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setstate(r.data.data);
      });
  };

  useEffect(() => {
    getMA(setMa);
  }, [showResume]);

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

  const validaFechaCaptura = () => {
    axios
      .get(
        process.env.REACT_APP_APPLICATION_BACK + "/api/valida-fechaDeCaptura",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("jwtToken") || "",
          },
          params: {
            Rol: localStorage.getItem("Rol"),
            Modulo: "Meta Anual",
          },
        }
      )
      .then((r) => {
        r.data.data.valida == "true"
          ? setValidaFecha(true)
          : setValidaFecha(false);
      })
      .catch((err) => {});
  };

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
    validaFechaCaptura();
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
              x.Entidad.toLowerCase().includes(v.toLowerCase()) ||
              x.Programa.toLowerCase().includes(v.toLowerCase()) ||
              x.FechaCreacion.toLowerCase().includes(v.toLowerCase()) ||
              x.CreadoPor.toLowerCase().includes(v.toLowerCase())) &&
            x.Estado.toLowerCase().includes(est.toLowerCase()) &&
            x.Entidad.toLowerCase().includes(inst.toLowerCase())
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
              x.Entidad.toLowerCase().includes(v.toLowerCase()) ||
              x.Programa.toLowerCase().includes(v.toLowerCase()) ||
              x.FechaCreacion.toLowerCase().includes(v.toLowerCase()) ||
              x.CreadoPor.toLowerCase().includes(v.toLowerCase())) &&
            (x.Estado.toLowerCase().includes(est.toLowerCase()) ||
              x.Entidad.toLowerCase().includes(inst.toLowerCase()))
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
            x.Entidad.toLowerCase().includes(v.toLowerCase()) ||
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
            x.Entidad.toLowerCase().includes(inst.toLowerCase())
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
            x.Entidad.toLowerCase().includes(inst.toLowerCase())
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
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/list-metaAnual", {
        params: {
          IdUsuario: localStorage.getItem("IdUsuario"),
          IdEntidad: localStorage.getItem("IdEntidad"),
          Rol: localStorage.getItem("Rol"),
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
    // console.log("Entra");
    let Arrayfiltro: IIMa[];
    Arrayfiltro = [];

    if (maxFiltered.length !== 0) {
      Arrayfiltro = maxFiltered;
    } else {
      Arrayfiltro = maxFiltered;
    }

    let ResultadoBusqueda = Arrayfiltro.filter((elemento) => {
      // console.log("entre");
      // console.log(elemento);
      // console.log(findTextStr);
      // console.log(maxFiltered);

      if (
        elemento.AnioFiscal.toString()
          .toLocaleLowerCase()
          .includes(findTextStr.toLocaleLowerCase()) ||
        elemento.Entidad.toString()
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
        // console.log(elemento);
        return elemento;
      }
    });

    setMaFiltered(ResultadoBusqueda);
  };

  const handleChange = (dato: string) => {
    setFindTextStr(dato);
  };

  return (
    <Grid container justifyContent={"space-between"}>
      <Grid
        item
        xl={12}
        height={"7vh"}
        // sx={{ mr: showResume ? 8 : 0 }}
      >
        <LateralMenu selection={"META ANUAL"} actionNumber={actionNumber} />
      </Grid>

      {/* <Grid gridArea={"header"} sx={{ height: "8vh" }}>
        <Header
          details={{
            name1: "Inicio",
            path1: "../home",
            name2: "Meta Anual",
            path2: "../metaAnual",
            name3: "",
          }}
        />
      </Grid> */}
      <Grid
        justifyContent={"center"}
        display={"flex"}
        container
        height={"93vh"}
        alignItems={"center"}
        item
        xl={12}
        lg={12}
        md={12}
        sm={7.5}
        xs={6}
        sx={{ backgroundColor: "white" }}
      >
        {showResume ? (
          <>
            {/* Filtros */}

            <Grid
              container
              item
              xl={8}
              lg={7}
              md={6}
              height="15vh"
              direction="row"
              sx={{
                boxShadow: 5,
                backgroundColor: "#FFFF",
                borderRadius: 5,
                justifyContent: "space-evenly",
                alignItems: "center",
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
                  height: "6vh",
                }}
              >
                <InputBase
                  sx={{
                    ml: 1,
                    flex: 1,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    //textAlign: "center",
                    fontSize: [10, 10, 15, 15, 18, 20],
                  }}
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
                  <SearchIcon
                    sx={{
                      fontSize: "24px", // Tamaño predeterminado del icono

                      "@media (max-width: 600px)": {
                        fontSize: 25, // Pantalla extra pequeña (xs y sm)
                      },

                      "@media (min-width: 601px) and (max-width: 960px)": {
                        fontSize: 25, // Pantalla pequeña (md)
                      },

                      "@media (min-width: 961px) and (max-width: 1280px)": {
                        fontSize: 30, // Pantalla mediana (lg)
                      },

                      "@media (min-width: 1281px)": {
                        fontSize: 30, // Pantalla grande (xl)
                      },

                      "@media (min-width: 2200px)": {
                        fontSize: 30, // Pantalla grande (xl)
                      },
                    }}
                  />
                </IconButton>
              </Paper>

              <Grid
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
                    FILTRO POR ESTADO DE LA MA
                  </InputLabel>
                  <Select
                    size="small"
                    fullWidth
                    variant="outlined"
                    label="FILTRO POR ESTADO DE LA MA"
                    sx={{
                      fontFamily: "MontserratRegular",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      //textAlign: "center",
                      fontSize: [10, 10, 15, 15, 18, 20],
                      // Tamaños de fuente para diferentes breakpoints
                    }}
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
                        {estado.toUpperCase()}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Tooltip title={findInstStr}>
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
                      FILTRO POR INSTITUCION
                    </InputLabel>

                    <Select
                      size="small"
                      variant="outlined"
                      fullWidth
                      label="FILTRO POR INSTITUCION"
                      sx={{
                        fontFamily: "MontserratRegular",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        //textAlign: "center",
                        fontSize: [10, 10, 15, 15, 18, 20],
                      }}
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
                        TODOS
                      </MenuItem>

                      {instituciones?.map((item) => {
                        return (
                          <MenuItem value={item.Nombre} key={item.Id}>
                            {item.Nombre.toUpperCase()}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Tooltip>
              </Grid>
            </Grid>

            {/* TABLA */}
            <Grid
              container
              item
              lg={10}
              md={9}
              height="65vh"
              direction="row"
              sx={{ backgroundColor: "#FFFF", borderRadius: 5, boxShadow: 5 }}
            >
              <TableContainer
                sx={{
                  borderRadius: 5,
                  height: 450,
                  overflow: "auto",
                  "&::-webkit-scrollbar": {
                    width: ".5vw",
                    mt: 1,
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#edeaea",
                    //outline: "1px solid slategrey",
                    borderRadius: 1,
                  },
                }}
              >
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow
                      sx={{
                        gridTemplateColumns: "repeat(7,1fr)",
                      }}
                    >
                      {heads.map((head, index) => (
                        <TableCell
                          sx={{
                            backgroundColor: "#edeaea",
                            fontFamily: "MontserratBold",
                            borderBottom: 0,
                            fontSize: [10, 10, 10, 15, 16, 18],
                            // fontFamily: "MontserratRegular",
                            //   fontSize: ".7vw",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          align="center"
                          key={index}
                        >
                          <TableSortLabel>{head.label}</TableSortLabel>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {maFiltered
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => (
                        <TableRow>
                          <TableCell
                            sx={{
                              padding: "1px 15px 1px 0",
                              fontFamily: "MontserratRegular",
                              fontSize: [10, 10, 10, 15, 15, 18],
                              textAlign: "center",
                            }}
                          >
                            {row.AnioFiscal}
                          </TableCell>
                          <TableCell
                            sx={{
                              padding: "1px 15px 1px 0",
                              fontFamily: "MontserratRegular",
                              fontSize: [10, 10, 10, 15, 15, 18],
                              textAlign: "center",
                            }}
                          >
                            {row.Entidad?.toUpperCase()}
                          </TableCell>
                          <TableCell
                            sx={{
                              padding: "1px 15px 1px 0",
                              fontFamily: "MontserratRegular",
                              fontSize: [10, 10, 10, 15, 15, 18],
                              textAlign: "center",
                            }}
                          >
                            {row.Programa.toUpperCase()}
                          </TableCell>
                          <TableCell
                            sx={{
                              padding: "1px 15px 1px 0",
                              fontFamily: "MontserratRegular",
                              fontSize: [10, 10, 10, 15, 15, 18],
                              textAlign: "center",
                            }}
                          >
                            {(row.Estado === "En Captura" &&
                            localStorage.getItem("Rol") === "Capturador"
                              ? "Borrador Capturador"
                              : row.Estado === "En Revisión" &&
                                localStorage.getItem("Rol") === "Verificador"
                              ? "Esperando revisión"
                              : row.Estado === "En Autorización" &&
                                localStorage.getItem("Rol") === "Administrador"
                              ? "Esperando autorización"
                              : row.Estado
                            ).toUpperCase()}
                          </TableCell>
                          <TableCell
                            sx={{
                              padding: "1px 15px 1px 0",
                              fontFamily: "MontserratRegular",
                              fontSize: [10, 10, 10, 15, 15, 18],
                              textAlign: "center",
                            }}
                          >
                            {moment(row.FechaCreacion, moment.ISO_8601)
                              .format("DD/MM/YYYY HH:mm:SS")
                              .toString()}
                          </TableCell>

                          
                          <TableCell
                            sx={{
                              padding: "1px 15px 1px 0",
                              fontFamily: "MontserratRegular",
                              fontSize: [10, 10, 10, 15, 15, 18],
                              textAlign: "center",
                            }}
                          >
                            {row.Estado === "En Captura"
                              ? "SIN ASIGNAR"
                              : row.CreadoPor.toUpperCase()}
                          </TableCell>

                          <TableCell
                            sx={{
                              flexDirection: "row",
                              //display: "grid",
                              //padding: "2px 20px 2px 10",
                              gridTemplateColumns: "repeat(4,1fr)",
                              fontSize: [10, 10, 10, 15, 15, 18],
                              textAlign: "center",
                            }}
                          >
                            <Tooltip
                              title="REGISTRAR META ANUAL"
                              // {!(row.Estado === "En Captura" &&
                              //         localStorage.getItem("Rol") ===
                              //           "Capturador"
                              //           ? false
                              //           : row.Estado === "En Revisión" &&

                              //             localStorage.getItem("Rol") ===
                              //               "Verificador"
                              //           ? false
                              //           : row.Estado === "En Autorización" &&

                              //             localStorage.getItem("Rol") ===
                              //               "Administrador"
                              //           ? false
                              //           : true)?"REGISTRAR META ANUAL":(validaFecha?"FECHA CAPTURA TERMINADA":"REGISTRAR META ANUAL")
                              //       }
                            >
                              <span>
                                <IconButton
                                  disabled={
                                    (row.Estado === "En Captura" &&
                                      validaFecha &&
                                      localStorage.getItem("Rol") ===
                                        "Capturador") ||
                                    (row.Estado === "En Revisión" &&
                                      validaFecha &&
                                      localStorage.getItem("Rol") ===
                                        "Verificador") ||
                                    (row.Estado === "Borrador Verificador" &&
                                      validaFecha &&
                                      localStorage.getItem("Rol") ===
                                        "Verificador") ||
                                    (row.Estado === "En Autorización" &&
                                      validaFecha &&
                                      localStorage.getItem("Rol") ===
                                        "Administrador") ||
                                    (row.Estado === "Borrador Autorizador" &&
                                      validaFecha &&
                                      localStorage.getItem("Rol") ===
                                        "Administrador")
                                      ? false
                                      : true
                                  }
                                  sx={{
                                    fontSize: "24px", // Tamaño predeterminado del icono

                                    "@media (max-width: 600px)": {
                                      fontSize: 20, // Pantalla extra pequeña (xs y sm)
                                    },

                                    "@media (min-width: 601px) and (max-width: 960px)":
                                      {
                                        fontSize: 20, // Pantalla pequeña (md)
                                      },

                                      "@media (min-width: 961px) and (max-width: 1280px)": {
                                        fontSize: 20, // Pantalla mediana (lg)
                                      },

                                    "@media (min-width: 1281px)": {
                                      fontSize: 25, // Pantalla grande (xl)
                                    },

                                    "@media (min-width: 2200px)": {
                                      ffontSize: 25, // Pantalla grande (xl)
                                    },
                                  }}
                                  onClick={() => {
                                    setMaEdit([
                                      {
                                        IdMa: row.IdMa,
                                        IdMir: row.IdMir,
                                        AnioFiscal: row.AnioFiscal,
                                        Entidad: row.Entidad,
                                        Programa: row.Programa,
                                        MIR: row.MIR,
                                        //meta anual completa
                                        MetaAnual: row.MetaAnual,
                                        Estado: row.Estado,
                                        CreadoPor: row.CreadoPor,
                                        FechaCreacion: row.FechaCreacion,
                                        Opciones: row.Opciones,
                                      },
                                    ]);
                                    setShowResume(false);
                                    setActionNumber(1);
                                  }}
                                >
                                  <AddCircleOutlineIcon
                                    sx={{
                                      fontSize: "24px", // Tamaño predeterminado del icono
  
                                      "@media (max-width: 600px)": {
                                        fontSize: 20, // Pantalla extra pequeña (xs y sm)
                                      },
  
                                      "@media (min-width: 601px) and (max-width: 960px)":
                                        {
                                          fontSize: 20, // Pantalla pequeña (md)
                                        },
  
                                        "@media (min-width: 961px) and (max-width: 1280px)": {
                                          fontSize: 20, // Pantalla mediana (lg)
                                        },
  
                                      "@media (min-width: 1281px)": {
                                        fontSize: 25, // Pantalla grande (xl)
                                      },
  
                                      "@media (min-width: 2200px)": {
                                        ffontSize: 25, // Pantalla grande (xl)
                                      },
                                    }}
                                  />
                                </IconButton>
                              </span>
                            </Tooltip>

                            <Tooltip title="DESCARGAR">
                              <span>
                                <IconButton
                                  onClick={() => {
                                    getMetaAnualDownload(
                                      row.MIR,
                                      row.MetaAnual,
                                      row.Programa,
                                      row.FechaCreacion,
                                      row.Entidad
                                    );
                                  }}
                                  disabled={
                                    row.Estado === "Autorizada" && validaFecha
                                      ? false
                                      : true
                                  }
                                >
                                  <DownloadIcon
                                     sx={{
                                      fontSize: "24px", // Tamaño predeterminado del icono
  
                                      "@media (max-width: 600px)": {
                                        fontSize: 20, // Pantalla extra pequeña (xs y sm)
                                      },
  
                                      "@media (min-width: 601px) and (max-width: 960px)":
                                        {
                                          fontSize: 20, // Pantalla pequeña (md)
                                        },
  
                                        "@media (min-width: 961px) and (max-width: 1280px)": {
                                          fontSize: 20, // Pantalla mediana (lg)
                                        },
  
                                      "@media (min-width: 1281px)": {
                                        fontSize: 25, // Pantalla grande (xl)
                                      },
  
                                      "@media (min-width: 2200px)": {
                                        ffontSize: 25, // Pantalla grande (xl)
                                      },
                                    }}
                                  />
                                </IconButton>
                              </span>
                            </Tooltip>

                            <ComentDialogMA
                              estado={row.Estado}
                              id={row.IdMir}
                              actualizado={actualizaContador}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box sx={{ width: "100%", fontSize: [10, 10, 10, 15, 18] }}>
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
            </Grid>
          </>
        ) : (
          <Grid
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
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export interface IIMa {
  IdMa: string;
  IdMir: string;
  AnioFiscal: string;
  Entidad: string;
  Programa: string;
  MIR: string;
  MetaAnual: string;
  Estado: string;
  CreadoPor: string;
  FechaCreacion: string;
  Opciones: string;
}

export interface IDownloadMA {
  MaId: string;
  MetaAnual: string;
  MirId: string;
  MIR: string;
  MaCompleta: string;
}
