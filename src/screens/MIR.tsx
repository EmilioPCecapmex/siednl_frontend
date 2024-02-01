/* eslint-disable react-hooks/exhaustive-deps */
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
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
  InputBase,
  Paper,
  Grid,
  TableSortLabel,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { LateralMenu } from "../components/lateralMenu/LateralMenu";
import { queries } from "../queries";
import moment from "moment";
import Swal from "sweetalert2";
import { IEntidad } from "../components/appsDialog/AppsDialog";
import ComentDialogMir from "../components/modalsMIR/ModalComentariosMir";
import DeleteDialogMIR from "../components/modalsMIR/ModalEliminarMIR";
import FullModalMir from "../components/tabsMir/AddMir";
import SearchIcon from "@mui/icons-material/Search";
import { alertaError } from "../components/genericComponents/Alertas";
import { estados, heads } from "../services/validations";
export let resumeDefaultMIR = true;

export let setResumeDefaultMIR = () => {
  resumeDefaultMIR = !resumeDefaultMIR;
};


export const MIR = () => {
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

  const getMIRs = (setState: Function) => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/list-mir", {
        params: {
          IdUsuario: localStorage.getItem("IdUsuario"),
          IdEntidad: localStorage.getItem("IdEntidad"),
          Rol: localStorage.getItem("Rol"),
          Estado: estadomir || "",
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setAnioFiscalEdit(r.data.data[0]?.AnioFiscal);

        setState(r.data.data);
      });
  };

  const [instituciones, setInstituciones] = useState<Array<IEntidad>>();
  // cambiado
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
          let aux=r.data.data
          
          aux.unshift( {
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
            UltimaActualizacion: ""
          })
          setstate(aux);
        }
      });
  };

  useEffect(() => {
    setShowResume(true);
   
  }, []);

  const returnMain = () => {
    setShowResume(true);
    
  };
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
            Modulo: "Mir",
          },
        }
      )
      .then((r) => {
        if (r.data.data.valida === "true") {
          setValidaFecha(true);
          setTitle("EDITAR");
        } else {
          setValidaFecha(false);
          setTitle("FECHA CAPTURA FINALIZADA");
        }
      })
      .catch((err) => {});
  };

  const [showResume, setShowResume] = useState(true);
  const [validaFecha, setValidaFecha] = useState(true);
  const [page, setPage] = useState(0);
  const renglonesPagina = 6;
  const [rowsPerPage, setRowsPerPage] = useState(renglonesPagina);
  const [actionNumber, setActionNumber] = useState(0);

  const onChangeActionNumberValue = () => {
    setActionNumber(1);
  };

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
  const [title_texto, setTitle] = useState("");

  const [findTextStr, setFindTextStr] = useState("");
  const [findInstStr, setFindInstStr] = useState("Todos");
  const [findSelectStr, setFindSelectStr] = useState("Todos");

  const [institucionesb, setInstitucionesb] = useState("Todos");

  const [estadomir, setEstadoMIR] = useState("Todos");

  const [mirEdit, setMirEdit] = useState<Array<IIMir>>([]);

  const [mirs, setMirs] = useState<Array<IIMir>>([]);
  const [mirsFiltered, setMirsFiltered] = useState<Array<IIMir>>([]);
  const [mirxFiltered, setMirxFiltered] = useState<Array<IIMir>>([]);
  // Filtrado por caracter

  useEffect(() => {
    validaFechaCaptura();
    getMIRs(setMirs);
  }, [showResume]);

  useEffect(() => {
    setMirsFiltered(mirs);
  }, [mirs]);

  useEffect(() => {
    setMirxFiltered(mirsFiltered);
  }, [mirsFiltered]);

  const findText = (v: string, est: string, inst: string) => {
    if (
      v !== "" &&
      est !== "0" &&
      est !== "Todos" &&
      inst !== "0" &&
      inst !== "Todos"
    ) {
      setMirsFiltered(
        mirs.filter(
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
      setMirsFiltered(
        mirs.filter(
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
      setMirsFiltered(
        mirs.filter(
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
      setMirsFiltered(
        mirs.filter(
          (x) =>
            x.Estado.toLowerCase().includes(est.toLowerCase()) &&
            x.Entidad.toLowerCase().includes(inst.toLowerCase())
        )
      );
    } else if (
      v === "" &&
      ((est !== "0" && est !== "Todos") || (inst !== "0" && inst !== "Todos"))
    ) {
      setMirsFiltered(
        mirs.filter(
          (x) =>
            x.Estado.toLowerCase().includes(est.toLowerCase()) ||
            x.Entidad.toLowerCase().includes(inst.toLowerCase())
        )
      );
    } else {
      setMirsFiltered(mirs);
    }
  };

  useEffect(() => {
    findText(findTextStr, findSelectStr, findInstStr);
  }, [findTextStr, findInstStr, findSelectStr]);

  const handleChange = (dato: string) => {
    setFindTextStr(dato);
  };

  useEffect(() => {
   

    getInstituciones(setInstituciones);
  }, []);

  const handleClickOpen = () => {
    setShowResume(false);
    onChangeActionNumberValue();
  };

  useEffect(() => {
    let id = urlParams.get("Id");
    setMirsFiltered(mirs.filter((x) => x.Id.toLowerCase().includes(id || "")));
  }, [mirs]);

  const [actualizacion, setActualizacion] = useState(0);

  useEffect(() => {
    getMIRs(setMirs);
  }, [actualizacion]);

  const actualizaContador = () => {
    setActualizacion(actualizacion + 1);
  };
  ///////////////////////////////////////////////////
  const downloadMIR = (
    anio: string,
    inst: string,
    prog: string,
    mir: string
  ) => {
    axios

      .post(
        process.env.REACT_APP_APPLICATION_FILL + "/api/fill_mir",
        JSON.parse(mir),
        {
          responseType: "blob",
          // headers: {
          //   Authorization: localStorage.getItem("jwtToken") || "",
          // },
        }
      )
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
          "MIR_" + anio + "_" + inst + "_" + prog + ".xlsx"
        ); //or any other extension
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      })
      .catch((err) => {
        alertaError("Error al intentar descargar el documento.")
        // Toast.fire({
        //   icon: "error",
        //   title: "Error al intentar descargar el documento.",
        // });

      });
  };
  ///////////////////////////////////////

  const filtrarDatos = () => {
    // eslint-disable-next-line array-callback-return

    let Arrayfiltro: IIMir[];
    Arrayfiltro = [];

    if (mirxFiltered.length !== 0) {
      Arrayfiltro = mirxFiltered;
    } else {
      Arrayfiltro = mirxFiltered;
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

    setMirsFiltered(ResultadoBusqueda);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    findTextStr.length !== 0 ? setMirsFiltered(mirsFiltered) : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [findTextStr]);

  const [estado, setEstado] = useState("");

  const buscador = (estado: any, Ins: any) => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/list-mir", {
        params: {
          IdUsuario: localStorage.getItem("IdUsuario"),
          IdEntidad: Ins || "",
          //IdEntidad: localStorage.getItem("IdEntidad"),
          Rol: localStorage.getItem("Rol"),
          Estado: estado || "",
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        //setAnioFiscalEdit(r.data.data[0]?.AnioFiscal);

        setMirs(r.data.data);
        //setInstitucionesb("Todos")
      });
  };

  return (
    <Grid container sx={{ justifyContent: "space-between" }}>
      <Grid
        item
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        // height={"7vh"}
        sx={{ height: "7vh", whitespace: "nowrap" }}
        // sx={{ mr: showResume ? 8 : 0 }}
      >
        <LateralMenu selection={"MIR"} actionNumber={actionNumber} />
      </Grid>
      {/* //boxShadow: 10, */}

      <Grid
        // justifyContent={"center"}
        // display={"flex"}
        height={"93vh"}
        // alignItems={"center"}

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
          // height: "90vh",
          alignItems: "center",
        }}
      >
        {showResume ? (
          <>
            {/* FILTROS */}
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
              <Grid
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                container
                item
                // direction="row"
                // justifyContent="space-around"
                // alignItems="center"
                sx={{
                  justifyContent: "space-around",
                  alignItems: "center",
                  direction: "row",
                }}
              >
                <Grid item xl={5} lg={5} md={5} sm={5} xs={5}>
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
                    title={findInstStr}
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
                        label="FILTRO POR INSTITUCION"
                        value={institucionesb}
                        disabled={
                          localStorage.getItem("Rol") !== "Administrador"
                        }
                        sx={{
                          fontFamily: "MontserratRegular",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          // textAlign: "center",
                          fontSize: [10, 10, 15, 15, 18, 20], // Tamaños de fuente para diferentes breakpoints
                          // color: "#AF8C55"
                        }}
                        fullWidth
                        onChange={(v) => {
                          //setFindInstStr(v.target.value);
                          
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
                              {item.Nombre}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Tooltip>
                </Grid>

                <Grid
                  // sx={{ fontFamily: "MontserratRegular" }}
                  item
                  xl={5}
                  lg={5}
                  md={5}
                  sm={5}
                  xs={5}
                >
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
                    title={findSelectStr}
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
                          title={"FILTRO POR ESTADO DE LA MIR"}
                        >
                          <span>FILTRO POR ESTADO DE LA MIR</span>
                        </Tooltip>
                      </InputLabel>
                      <Select
                        size="small"
                        variant="outlined"
                        value={
                          localStorage.getItem("Rol") === "Administrador" ||
                          localStorage.getItem("Rol") === "ADMINISTRADOR"
                            ? estadomir
                            : findSelectStr
                        }
                        label="FILTRO POR ESTADO DE LA MIR"
                        sx={{
                          fontFamily: "MontserratRegular",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          // textAlign: "center",
                          fontSize: [10, 10, 15, 15, 18, 20], // Tamaños de fuente para diferentes breakpoints
                          // color: "#AF8C55"
                        }}
                        fullWidth
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
                            setEstadoMIR(v.target.value);
                          } else {
                            setFindSelectStr(v.target.value);
                          }

                          //
                        }}
                      >
                        {estados.map((estado) => (
                          <MenuItem key={estado} value={estado}>
                            {estado.toUpperCase()}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Tooltip>
                </Grid>
                {localStorage.getItem("Rol") === "Administrador" && (
                  <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                    <IconButton
                   // disabled ={estadomir === "Todos" && institucionesb === "Todos" }
                      onClick={() => {
                        buscador(estadomir, institucionesb);
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
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                container
                // direction="row"
                // justifyContent="space-around"
                // alignItems="center"
                sx={{
                  direction: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Grid
                  sx={{ fontFamily: "MontserratRegular" }}
                  item
                  xl={7}
                  lg={6}
                  md={6}
                  sm={7}
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
                        fontSize: [10, 10, 15, 15, 18, 20],
                        textAlign: "center",
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
                      aria-label="Buscar"
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

                <Grid item xl={3} lg={3} md={4} sm={3}>
                  <Button
                    disabled={!validaFecha}
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
                    onClick={() => {
                      setMirEdit([
                        {
                          Id: "",
                          AnioFiscal: "",
                          Entidad: "",
                          Programa: "",
                          Eje: "",
                          Tematica: "",
                          MIR: "",
                          Estado: "",
                          FechaCreacion: "",
                          CreadoPor: "",
                          Conac: "",
                          Consecutivo: "",
                          Opciones: "",
                        },
                      ]);
                      handleClickOpen();
                    }}
                  >
                    {!validaFecha
                      ? "Fecha de captura terminada"
                      : "Añadir registro"}
                  </Button>
                </Grid>
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
              //width={"80%"}
              // height="65vh"
              // direction="row"
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
                            textAlign: "center",
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
                    {mirsFiltered
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
                            align="center"
                            component="th"
                            scope="row"
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
                            align="center"
                            component="th"
                            scope="row"
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
                            align="center"
                            component="th"
                            scope="row"
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
                            align="center"
                            component="th"
                            scope="row"
                          >
                            {(row.Estado === "En Captura" &&
                            localStorage.getItem("Rol") === "Capturador"
                              ? "Borrador Capturador"
                              : row.Estado === "En Revisión" &&
                                localStorage.getItem("Rol") === "Verificador"
                              ? "Esperando revisión"
                              : row.Estado === "En Autorización" &&
                                localStorage.getItem("Rol") === "Administrador"
                              ? "En Autorización"
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
                            align="center"
                            component="th"
                            scope="row"
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
                            align="center"
                            component="th"
                            scope="row"
                          >
                            {row.CreadoPor.toUpperCase()}
                          </TableCell>

                          <TableCell
                            sx={{
                              flexDirection: "row",
                              //display: "grid",
                              gridTemplateColumns: "repeat(2,2fr)",
                              fontSize: [10, 10, 10, 15, 15, 18],
                              textAlign: "center",
                            }}
                            align="center"
                            component="th"
                            scope="row"
                          >
                            <Grid sx={{ display: "flex" }}>
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
                                title="DESCARGAR MIR"
                              >
                                <span>
                                  <IconButton
                                    disabled={
                                      row.Estado === "Autorizada" && validaFecha
                                        ? false
                                        : true
                                    }
                                    onClick={() =>
                                      downloadMIR(
                                        row.AnioFiscal,
                                        row.Entidad,
                                        row.Programa,
                                        row.MIR
                                      )
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

                              <ComentDialogMir
                                estado={row.Estado}
                                id={row.Id}
                                actualizado={actualizaContador}
                              />

                              <DeleteDialogMIR
                                disab={
                                  row.Estado === "En Captura" &&
                                  validaFecha &&
                                  localStorage.getItem("Rol") === "Capturador"
                                    ? false
                                    : row.Estado === "En Revisión" &&
                                      localStorage.getItem("Rol") ===
                                        "Verificador"
                                    ? false
                                    : (row.Estado === "En Autorización" || row.Estado === "Autorizada" ) &&
                                      localStorage.getItem("Rol") ===
                                        "Administrador"
                                    ? false
                                    : true
                                }
                                id={row.Id}
                                actualizado={actualizaContador}
                              />
                              <Tooltip
                                title={title_texto}
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
                                    onClick={() => {
                                      setMirEdit([
                                        {
                                          Id: row.Id,
                                          AnioFiscal: row.AnioFiscal,
                                          Entidad: row.Entidad,
                                          Programa: row.Programa,
                                          Eje: row.Eje,
                                          Tematica: row.Tematica,
                                          MIR: row.MIR,
                                          Estado: row.Estado,
                                          FechaCreacion: row.FechaCreacion,
                                          CreadoPor: row.CreadoPor,
                                          Conac: row.Conac,
                                          Consecutivo: row.Consecutivo,
                                          Opciones: row.Opciones,
                                        },
                                      ]);
                                      setShowResume(false);
                                      setActionNumber(1);
                                      setEstado(row.Estado);
                                    }}
                                  >
                                    <EditIcon
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
                            </Grid>
                            
                          </TableCell>
                        </TableRow>
                      ))}

                    {/* ))} */}
                  </TableBody>
                </Table>
              </TableContainer>

              <Grid sx={{ width: "100%" }}>
                <TablePagination
                  rowsPerPageOptions={[renglonesPagina]}
                  component="div"
                  count={mirs.length}
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
              height: "93vh",
            }}
            gridArea={"main"}
          >
            <FullModalMir
              anioFiscalEdit={anioFiscalEdit}
              MIR={mirEdit[0]?.MIR || ""}
              showResume={returnMain}
              IdMir={mirEdit[0]?.Id || ""}
              estado={estado}
            />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export interface IIMir {
  Id: string;
  AnioFiscal: string;
  Entidad: string;
  Programa: string;
  Eje: string;
  Tematica: string;
  MIR: string;
  Estado: string;
  FechaCreacion: string;
  CreadoPor: string;
  Conac: string;
  Consecutivo: String;
  Opciones: string;
}
