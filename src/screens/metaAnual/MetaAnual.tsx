/* eslint-disable react-hooks/exhaustive-deps */
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DownloadIcon from "@mui/icons-material/Download";
import {
  Grid,
  FormControl,
  IconButton,
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
  InputLabel,
  Paper,
  InputBase,
  Button,
  TableSortLabel,
} from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { IEntidad } from "../../components/appsDialog/AppsDialog";
import { LateralMenu } from "../../components/lateralMenu/LateralMenu";
import ComentDialogMA from "../../components/modalsMA/ModalComentariosMA";
import AddMetaAnual from "../../components/tabsMetaAnual/AddMetaAnual";
import { queries } from "../../queries";
import { buscador } from "../../services/servicesGlobals";
import SearchIcon from "@mui/icons-material/Search";
import { estados, heads } from "../../services/validations";
import { MostrarLista } from "../../components/tabsMir/services mir/modalMIR";
export let ResumeDefaultMA = true;
export let setResumeDefaultMA = () => {
  ResumeDefaultMA = !ResumeDefaultMA;
};

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
  const [title_texto, setTitle] = useState("");

  const [validaFecha, setValidaFecha] = useState(true);
  const [ma, setMa] = useState<Array<IIMa>>([]);
  const [maEdit, setMaEdit] = useState<Array<IIMa>>([]);
  const [maFiltered, setMaFiltered] = useState<Array<IIMa>>([]);
  const [maxFiltered, setMaxFiltered] = useState<Array<IIMa>>([]);

  const [instituciones, setInstituciones] = useState<Array<IEntidad>>();

  const [estadoma, setEstadoMA] = useState("Todos");
  const [estado, setEstado] = useState("");
  const [institucionesb, setInstitucionesb] = useState("Todos");

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
          let aux = r.data.data;

          aux.unshift({
            ClaveSiregob: null,
            ControlInterno: "",
            Direccion: "",
            EntidadPerteneceA: "",
            FechaCreacion: "",
            Id: "",
            IdEntidadPerteneceA: "",
            IdTipoEntidad: "",
            IdTitular: null,
            Nombre: "TODOS",
            NombreTipoEntidad: "",
            Telefono: "",
            Titular: "",
            UltimaActualizacion: "",
          });

          setstate(aux);
        }
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

  // useEffect(() => {
  //   const url = window.location.href;

  //   const urlSearchParams = new URLSearchParams(url);

  //   const id = url.split("?")[1].split("=")[1];

  //   //let id = urlParams.get("Id");
  //   setMaFiltered(ma.filter((x) => x.IdMa.toLowerCase().includes(id || "")));
  // }, [ma]);

  useEffect(() => {
    const url = window.location.href;

    // Verificar si el parámetro 'Id' está presente en la URL
    if (url.includes("?Id=")) {
      const id = url.split("?")[1].split("=")[1];

      // Verificar si 'id' no es undefined o null antes de incluirlo en la comparación
      if (id) {
        setMaFiltered(
          ma.filter((x) => x.IdMa.toLowerCase().includes(id || ""))
        );
      }
    }
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
        if (r.data.data.valida === "true") {
          setValidaFecha(true);
          setTitle("REGISTRAR META ANUAL");
        } else {
          setValidaFecha(false);
          setTitle("FECHA CAPTURA FINALIZADA");
        }
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
        // headers: {
        //   Authorization: localStorage.getItem("jwtToken") || "",
        // },
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
          Estado: estadoma || "",
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
        lg={12}
        md={12}
        sm={12}
        xs={12}
        sx={{ height: "7vh", whitespace: "nowrap" }}
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
                {localStorage.getItem("Rol") === "Administrador" ? (
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
                          disabled={
                            localStorage.getItem("Rol") !== "Administrador"
                          }
                          sx={{
                            fontFamily: "MontserratRegular",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            //textAlign: "center",
                            fontSize: [10, 10, 15, 15, 18, 20],
                          }}
                          value={institucionesb}
                          // sx={{ fontFamily: "MontserratRegular" }}

                          onChange={(v) => {
                            setInstitucionesb(v.target.value);
                          }}
                        >
                          <MenuItem
                            value={institucionesb}
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
                ) : null}

                <Grid
                  item
                  xl={
                    localStorage.getItem("Rol") === "Administrador" ||
                    localStorage.getItem("Rol") === "ADMINISTRADOR"
                      ? 5
                      : 11
                  }
                  lg={
                    localStorage.getItem("Rol") === "Administrador" ||
                    localStorage.getItem("Rol") === "ADMINISTRADOR"
                      ? 5
                      : 11
                  }
                  md={
                    localStorage.getItem("Rol") === "Administrador" ||
                    localStorage.getItem("Rol") === "ADMINISTRADOR"
                      ? 5
                      : 11
                  }
                  sm={
                    localStorage.getItem("Rol") === "Administrador" ||
                    localStorage.getItem("Rol") === "ADMINISTRADOR"
                      ? 5
                      : 11
                  }
                  xs={
                    localStorage.getItem("Rol") === "Administrador" ||
                    localStorage.getItem("Rol") === "ADMINISTRADOR"
                      ? 5
                      : 11
                  }
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
                        title={"FILTRO POR ESTADO DE LA MA"}
                      >
                        <span>FILTRO POR ESTADO DE LA MA</span>
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
                      value={
                        localStorage.getItem("Rol") === "Administrador" ||
                        localStorage.getItem("Rol") === "ADMINISTRADOR"
                          ? estadoma
                          : findSelectStr
                      }
                      onChange={(v) => {
                        // v.target.value === "Todos"
                        //   ? findText(
                        //       findTextStr,
                        //       "0",
                        //       findInstStr === "Todos" ? "0" : findInstStr
                        //     )
                        //   : findText(findTextStr, v.target.value, findInstStr);
                        if (
                          localStorage.getItem("Rol") === "Administrador" ||
                          localStorage.getItem("Rol") === "ADMINISTRADOR"
                        ) {
                          setEstadoMA(v.target.value);
                        } else {
                          setFindSelectStr(v.target.value);
                        }
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

                {localStorage.getItem("Rol") === "Administrador" && (
                  <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                    <IconButton
                      // disabled ={estadoma === "Todos" && institucionesb === "Todos" }
                      onClick={() => {
                        buscador(
                          estadoma,
                          institucionesb,
                          setMa,
                          "list-metaAnual"
                        );
                      }}
                    >
                      <SearchIcon
                        sx={{
                          fontSize: "24px", // Tamaño predeterminado del icono
                          "@media (max-width: 600px)": {
                            fontSize: 20, // Pantalla extra pequeña (xs y sm)
                          },
                          "@media (min-width: 601px) and (max-width: 960px)": {
                            fontSize: 20, // Pantalla pequeña (md)
                          },
                          "@media (min-width: 961px) and (max-width: 1280px)": {
                            fontSize: 20, // Pantalla mediana (lg)
                          },
                          "@media (min-width: 1281px)": {
                            fontSize: 25, // Pantalla grande (xl)
                          },
                          "@media (min-width: 2200px)": {
                            fontSize: 25, // Pantalla grande (xl)
                          },
                        }}
                        onClick={() => {
                          // Acciones adicionales al hacer clic en el ícono de búsqueda
                        }}
                      ></SearchIcon>
                    </IconButton>
                  </Grid>
                )}
              </Grid>

              <Grid
                // item
                container
                xl={12}
                lg={12}
                md={12}
                sm={11}
                xs={11}
                sx={{
                  direction: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Grid
                  sx={{ fontFamily: "MontserratRegular" }}
                  item
                  xl={validaFecha ? 11 : 7}
                  lg={validaFecha ? 11 : 6}
                  md={validaFecha ? 11 : 6}
                  sm={validaFecha ? 11 : 11}
                  xs={validaFecha ? 11 : 11}
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
                </Grid>
                {validaFecha ? (
                  ""
                ) : (
                  <Grid
                    sx={{ fontFamily: "MontserratRegular" }}
                    item
                    xl={4}
                    lg={3}
                    md={3}
                    sm={4}
                  >
                    <Button
                      disabled={true}
                      className="aceptar"
                      sx={{
                        //backgroundColor: "#c2a37b",
                        // width: "10vw",
                        // height: "3.3vh",
                        width: ["80px", "120px", "160px", "180px", "250px"],
                        height: ["30px", "20px", "30px", "40px", "50px"],
                        //color: "black",
                        fontFamily: "MontserratMedium",
                        fontSize: [5, 7, 10, 12, 16, 20],
                      }}
                    >
                      {!validaFecha
                        ? "Fecha de captura terminada"
                        : "Añadir registro"}
                    </Button>
                  </Grid>
                )}
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
                            <Grid sx={{ display: "flex" }}>
                              <Tooltip
                                title={title_texto}
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
                                      ((row.Estado === "En Autorización" ||
                                        row.Estado === "Autorizada") &&
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
                                      let auxArrayMIR = JSON.parse(row.MIR);
                                      let auxArrayMIR2 = JSON.stringify(
                                        auxArrayMIR[0]
                                      );
                                      if (auxArrayMIR[1]) {
                                        setMaEdit([
                                          {
                                            IdMa: row.IdMa,
                                            IdMir: row.IdMir,
                                            AnioFiscal: row.AnioFiscal,
                                            Entidad: row.Entidad,
                                            Programa: row.Programa,
                                            MIR: auxArrayMIR2,
                                            //meta anual completa
                                            MetaAnual: row.MetaAnual,
                                            Estado: row.Estado,
                                            CreadoPor: row.CreadoPor,
                                            FechaCreacion: row.FechaCreacion,
                                            Opciones: row.Opciones,
                                          },
                                        ]);
                                      } else {
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
                                      }

                                      setEstado(row.Estado);
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

                              <ComentDialogMA
                                estado={row.Estado}
                                id={row.IdMir}
                                actualizado={actualizaContador}
                              />

                              <MostrarLista st="" Id={row.IdMa} />
                            </Grid>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Grid sx={{ width: "100%", fontSize: [10, 10, 10, 15, 18] }}>
                <TablePagination
                  rowsPerPageOptions={[renglonesPagina]}
                  component="div"
                  count={ma.length}
                  rowsPerPage={renglonesPagina}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Grid>
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
              estado={estado}
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
