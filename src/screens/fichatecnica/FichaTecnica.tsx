/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { LateralMenu } from "../../components/lateralMenu/LateralMenu";
import {
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  IconButton,
  TablePagination,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Paper,
  InputBase,
  TableSortLabel,
} from "@mui/material";
import axios from "axios";
import DownloadIcon from "@mui/icons-material/Download";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import moment from "moment";
import AddFichaTecnica from "../../components/tabsFichaTecnica/AddFichaTecnica";
import ComentDialogFT from "../../components/modalsFT/ModalComentariosFT";
import ModalVerResumenFT from "../../components/modalsFT/ModalVerResumenFT";
import Swal from "sweetalert2";
//import { TutorialGrid } from "../../components/tutorialGrid/tutorialGrid";
import { queries } from "../../queries";
import { IEntidad } from "../../components/appsDialog/AppsDialog";
export let resumeDefaultFT = true;
export let setResumeDefaultFT = () => {
  resumeDefaultFT = !resumeDefaultFT;
};

const estados = [
  "Todos",
  "En Captura",
  "En Revisión",
  "En Autorización",
  "Autorizada",
];

interface Head {
  id: keyof IIFT;
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

export const FichaTecnica = () => {
  useEffect(() => {
    setShowResume(true);
    getFT(setft);
  }, [resumeDefaultFT]);

  const returnMain = () => {
    setShowResume(true);
    getFT(setft);
  };

  const [openModalVerResumenFT, setOpenModalVerResumenFT] = useState(false);

  const handleCloseVerResumenFT = () => {
    setOpenModalVerResumenFT(false);
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [findTextStr, setFindTextStr] = useState("");
  const [findInstStr, setFindInstStr] = useState("Todos");
  const [findSelectStr, setFindSelectStr] = useState("Todos");

  const [ft, setft] = useState<Array<IIFT>>([]);
  const [FTEdit, setFTEdit] = useState<Array<IIFT>>([]);
  const [FTShow, setFTShow] = useState<Array<IIFT>>([]);
  const [ftxFiltered, setFtxFiltered] = useState<Array<IIFT>>([]);
  const [ftFiltered, setFtFiltered] = useState<Array<IIFT>>([]);

  const [instituciones, setInstituciones] = useState<Array<IEntidad>>();

  const getInstituciones = (setstate: Function) => {
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
        if (r.status === 200) {
          setstate(r.data.data);
        }
      });
  };

  useEffect(() => {
    getFT(setft);
    validaFechaCaptura();
  }, []);

  useEffect(() => {
    setFtFiltered(ft);
  }, [ft]);

  useEffect(() => {
    setFtxFiltered(ftFiltered);
  }, [ftFiltered]);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

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

  /////////////////////////////////////////
  const getFichaTecnicaDownload = (
    MIR: string,
    MetaAnual: string,
    FT: string,
    inst: string,
    Programa: string,
    FechaCreacion: string
  ) => {
    const fullft = [JSON.parse(MIR), JSON.parse(MetaAnual), JSON.parse(FT)];

    axios
      .post("http://192.168.137.152:7001/api/fill_ft", fullft, {
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
          "FT_" + FechaCreacion + "_" + inst + "_" + Programa + ".xlsx"
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

  ///////////////////////////////////////////////////
  useEffect(() => {
    getInstituciones(setInstituciones);
  }, []);
  ///////////
  // Filtrado por caracter
  const findText = (v: string, est: string, inst: string) => {
    if (
      v !== "" &&
      est !== "0" &&
      est !== "Todos" &&
      inst !== "0" &&
      inst !== "Todos"
    ) {
      setFtFiltered(
        ft.filter(
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
      setFtFiltered(
        ft.filter(
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
      setFtFiltered(
        ft.filter(
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
      setFtFiltered(
        ft.filter(
          (x) =>
            x.Estado.toLowerCase().includes(est.toLowerCase()) &&
            x.Entidad.toLowerCase().includes(inst.toLowerCase())
        )
      );
    } else if (
      v === "" &&
      ((est !== "0" && est !== "Todos") || (inst !== "0" && inst !== "Todos"))
    ) {
      setFtFiltered(
        ft.filter(
          (x) =>
            x.Estado.toLowerCase().includes(est.toLowerCase()) ||
            x.Entidad.toLowerCase().includes(inst.toLowerCase())
        )
      );
    } else {
      setFtFiltered(ft);
    }
  };

  useEffect(() => {
    findText(findTextStr, findSelectStr, findInstStr);
  }, [findTextStr, findInstStr, findSelectStr]);

  const getFT = (setstate: Function) => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/list-fichaTecnica", {
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
        //setFtFiltered(r.data.data);
      })
      .catch((err) => {});
  };

  // useEffect(() => {
  //   getFT();
  // }, []);
  const [title_texto, setTitle] = useState("");

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
            Modulo: "Ficha Tecnica",
          },
        }
      )
      .then((r) => {
        if (r.data.data.valida === "true") {
          setValidaFecha(true);
          setTitle("VER FICHA TÉCNICA");
        } else {
          setValidaFecha(false);
          setTitle("FECHA CAPTURA FINALIZADA");
        }
      })
      .catch((err) => {});
  };

  const [validaFecha, setValidaFecha] = useState(true);
  const [actualizacion, setActualizacion] = useState(0);

  useEffect(() => {
    let id = urlParams.get("Id");
    setFtFiltered(ft.filter((x) => x.IdFt.toLowerCase().includes(id || "")));
  }, [ft]);

  // useEffect(() => {
  //   getFT();
  // }, [actualizacion]);

  const actualizaContador = () => {
    setActualizacion(actualizacion + 1);
  };

  const filtrarDatos = () => {
    // eslint-disable-next-line array-callback-return

    let Arrayfiltro: IIFT[];
    Arrayfiltro = [];

    if (ftxFiltered.length !== 0) {
      Arrayfiltro = ftxFiltered;
    } else {
      Arrayfiltro = ftxFiltered;
    }

    // eslint-disable-next-line array-callback-return
    let ResultadoBusqueda = Arrayfiltro.filter((elemento) => {
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
        return elemento;
      }
    });

    setFtFiltered(ResultadoBusqueda);
  };

  // const handleChange = (dato: string) => {
  //   setFindTextStr(dato);
  // };

  return (
    <Grid container justifyContent={"space-between"}>
      <Grid
        item
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        sx={{ height: "7vh", whitespace: "nowrap" }}
      >
        <LateralMenu selection={"FICHA TECNICA"} actionNumber={actionNumber} />
      </Grid>

      {/* <Grid gridArea={"header"} sx={{ height: "8vh" }}>
        <Header
          details={{
            name1: "Inicio",
            path1: "../home",
            name2: "Ficha Técnica",
            path2: "../fichatecnica",
            name3: "",
          }}
        />
      </Grid> */}

      <Grid
        container
        item
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        sx={{
          //backgroundColor:"blue",
          justifyContent: "center",
          display: "flex",
          height: "90vh",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        {showResume ? (
          <>
            {/* Filtros */}

            <Grid
              container
              item
              xl={8}
              lg={8}
              md={8}
              sm={8}
              // height="15vh"
              // direction="row"
              sx={{
                boxShadow: 5,
                backgroundColor: "#FFFF",
                borderRadius: 5,
                justifyContent: "space-evenly",
                alignItems: "center",
                height: "15vh",
                direction: "row",
              }}
            >
              {/* <TutorialGrid initialState={35} endState={39} /> */}

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

              <Grid
                item
                container
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                // sx={{
                //
                //   //gridTemplateColumns: "repeat(2, 1fr)",
                //   //alignItems:"center",
                //   justifyItems: "space-evenly",
                //   gap: 2,
                //  // width: "90%",
                // }}
                sx={{
                  justifyContent: "space-around",
                  alignItems: "center",
                  //display: "flex",
                  direction: "row",
                }}
              >
                <Grid item xl={5} lg={5} md={5} sm={5} xs={5}>
                  <Tooltip
                    title={findInstStr}
                    PopperProps={{
                      modifiers: [
                        {
                          name: "offset",
                          options: {
                            offset: [0, -13],
                          },
                        },
                      ],
                    }}
                  >
                    <FormControl fullWidth>
                      <InputLabel sx={queries.text}>
                        <Tooltip
                          PopperProps={{
                            modifiers: [
                              {
                                name: "offset",
                                options: {
                                  offset: [0, -13],
                                },
                              },
                            ],
                          }}
                          title={"FILTRO POR INSTITUCION"}
                        >
                          <span>FILTRO POR INSTITUCION</span>
                        </Tooltip>
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
                              {item.Nombre}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Tooltip>
                </Grid>
                <Grid item xl={5} lg={5} md={5} sm={5} xs={5}>
                  <FormControl fullWidth>
                    <InputLabel sx={queries.text}>
                      <Tooltip
                        PopperProps={{
                          modifiers: [
                            {
                              name: "offset",
                              options: {
                                offset: [0, -13],
                              },
                            },
                          ],
                        }}
                        title={"FILTRO POR ESTADO DE LA FT"}
                      >
                        <span>FILTRO POR ESTADO DE LA FT</span>
                      </Tooltip>
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
                </Grid>
              </Grid>

              <Grid
                // item
                container
                xl={11}
                lg={11}
                md={11}
                sm={11}
                xs={11}
                sx={{
                  direction: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Paper
                  component="form"
                  sx={{
                    display: "flex",
                    width: "100%",
                  }}
                >
                  <InputBase
                    sx={{
                      ml: 1,
                      flex: 1,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      textAlign: "center",
                      fontSize: [10, 10, 15, 15, 18, 20],
                    }}
                    placeholder="Buscar"
                    value={findTextStr}
                    // onChange={(e) => {
                    //   handleChange(e.target.value);
                    // }}
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
              </Grid>
            </Grid>

            {/* TABLA */}
            <Grid
              item
              xl={10}
              lg={10}
              md={10}
              sm={10}
              xs={10}
              sx={{
                backgroundColor: "#FFFF",
                borderRadius: 5,
                boxShadow: 5,
                height: "65vh",
                direction: "row",
              }}
            >
              <TableContainer
                sx={{
                  borderRadius: 5,
                  height: "90%",
                  overflow: "auto",
                  "&::-webkit-scrollbar": {
                    width: ".5vw",
                    //mt: 1,
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "red",
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
                    {ftFiltered
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
                            {row.Entidad.toUpperCase()}
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
                            {row.Estado === "En Captura" &&
                            localStorage.getItem("Rol") === "Capturador"
                              ? "ESPERANDO CAPTURA"
                              : row.Estado === "En Revisión" &&
                                localStorage.getItem("Rol") === "Verificador"
                              ? "ESPERANDO REVISIÓN"
                              : row.Estado === "En Autorización" &&
                                localStorage.getItem("Rol") === "Administrador"
                              ? "ESPERANDO AUTORIZACIÓN"
                              : row.Estado.toUpperCase()}
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
                              // display: "grid",
                              padding: "1px 15px 1px 0",
                              gridTemplateColumns: "repeat(1,4fr)",
                              fontSize: [10, 10, 10, 15, 15, 18],
                              textAlign: "center",
                            }}
                            align="center"
                            component="th"
                            scope="row"
                          >
                            <Grid sx={{ display: "flex" }}>
                              <Tooltip title="REGISTRAR FICHA TÉCNICA">
                                <span>
                                  <IconButton
                                    disabled={
                                      (row.Estado === "En Captura" &&
                                        //validaFecha &&
                                        localStorage.getItem("Rol") ===
                                          "Capturador") ||
                                      (row.Estado === "En Revisión" &&
                                        //validaFecha &&
                                        localStorage.getItem("Rol") ===
                                          "Verificador") ||
                                      (row.Estado === "Borrador Verificador" &&
                                        //validaFecha &&
                                        localStorage.getItem("Rol") ===
                                          "Verificador") ||
                                      ((row.Estado === "En Autorización" ||
                                        row.Estado === "Autorizada") &&
                                        // validaFecha &&
                                        localStorage.getItem("Rol") ===
                                          "Administrador") ||
                                      (row.Estado === "Borrador Autorizador" &&
                                        // validaFecha &&
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

                                      "@media (min-width: 961px) and (max-width: 1280px)":
                                        {
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
                                      setFTEdit([
                                        {
                                          IdFt: row.IdFt,
                                          IdMir: row.IdMir,
                                          IdMa: row.IdMa,
                                          FichaT: row.FichaT,
                                          Estado: row.Estado,
                                          CreadoPor: row.CreadoPor,
                                          FechaCreacion: row.FechaCreacion,
                                          AnioFiscal: row.AnioFiscal,
                                          Entidad: row.Entidad,
                                          Programa: row.Programa,
                                          MIR: row.MIR,
                                          MetaAnual: row.MetaAnual,
                                          Conac: row.Conac,
                                          Consecutivo: row.Consecutivo,
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

                                        "@media (min-width: 961px) and (max-width: 1280px)":
                                          {
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
                                      getFichaTecnicaDownload(
                                        row.MIR,
                                        row.MetaAnual,
                                        row.FichaT,
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

                                        "@media (min-width: 961px) and (max-width: 1280px)":
                                          {
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

                              <Tooltip title={title_texto}>
                                <span>
                                  <IconButton
                                    disabled={
                                      row.Estado === "Autorizada" && validaFecha
                                        ? false
                                        : true
                                    }
                                    onClick={() => {
                                      setFTShow([
                                        {
                                          IdFt: row.IdFt,
                                          IdMir: row.IdMir,
                                          IdMa: row.IdMa,
                                          FichaT: row.FichaT,
                                          Estado: row.Estado,
                                          CreadoPor: row.CreadoPor,
                                          FechaCreacion: row.FechaCreacion,
                                          AnioFiscal: row.AnioFiscal,
                                          Entidad: row.Entidad,
                                          Programa: row.Programa,
                                          MIR: row.MIR,
                                          MetaAnual: row.MetaAnual,
                                          Conac: row.Conac,
                                          Consecutivo: row.Consecutivo,
                                          Opciones: row.Opciones,
                                        },
                                      ]);
                                      setOpenModalVerResumenFT(true);
                                    }}
                                  >
                                    <VisibilityIcon
                                      sx={{
                                        fontSize: "24px", // Tamaño predeterminado del icono

                                        "@media (max-width: 600px)": {
                                          fontSize: 20, // Pantalla extra pequeña (xs y sm)
                                        },

                                        "@media (min-width: 601px) and (max-width: 960px)":
                                          {
                                            fontSize: 20, // Pantalla pequeña (md)
                                          },

                                        "@media (min-width: 961px) and (max-width: 1280px)":
                                          {
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

                              <ComentDialogFT
                                estado={row.Estado}
                                id={row.IdMir}
                                actualizado={actualizaContador}
                              />
                            </Grid>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Grid sx={{ width: "100%" }}>
                <TablePagination
                  rowsPerPageOptions={[renglonesPagina]}
                  component="div"
                  count={ft.length}
                  rowsPerPage={renglonesPagina}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Grid>
            </Grid>

            <ModalVerResumenFT
              open={openModalVerResumenFT}
              handleClose={handleCloseVerResumenFT}
              MIR={FTShow[0]?.MIR}
              MA={FTShow[0]?.MetaAnual}
              FT={FTShow[0]?.FichaT}
              Conac={FTShow[0]?.Conac}
              Consecutivo={FTShow[0]?.Consecutivo}
            />
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
            <AddFichaTecnica
              MIR={FTEdit[0].MIR}
              MA={FTEdit[0].MetaAnual}
              FT={FTEdit[0].FichaT}
              showResume={returnMain}
              IdMir={FTEdit[0].IdMir}
              IdMA={FTEdit[0].IdMa}
              IdFT={FTEdit[0].IdFt}
            />
            {/* {FTEdit[0].FichaT} */}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export interface IIFT {
  IdFt: string;
  IdMir: string;
  IdMa: string;
  FichaT: string;
  Estado: string;
  CreadoPor: string;
  FechaCreacion: string;
  AnioFiscal: string;
  Entidad: string;
  Programa: string;
  MIR: string;
  MetaAnual: string;
  Conac: string;
  Consecutivo: string;
  Opciones: string;
}

export interface IDownloadFT {
  MaId: string;
  MetaAnual: string;
  MirId: string;
  MIR: string;
  MaCompleta: string;
  FT: string;
}
