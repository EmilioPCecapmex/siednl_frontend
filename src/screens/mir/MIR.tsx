/* eslint-disable react-hooks/exhaustive-deps */
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
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
  InputBase,
  Paper,
  Grid,
  TableSortLabel,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Header } from "../../components/header/Header";
import { LateralMenu } from "../../components/lateralMenu/LateralMenu";
import { queries } from "../../queries";
import moment from "moment";
import Swal from "sweetalert2";
import { IInstituciones } from "../../components/appsDialog/AppsDialog";
import ComentDialogMir from "../../components/modalsMIR/ModalComentariosMir";
import DeleteDialogMIR from "../../components/modalsMIR/ModalEliminarMIR";
import FullModalMir from "../../components/tabsMir/AddMir";
import { SelectChangeEvent } from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
export let resumeDefaultMIR = true;

export let setResumeDefaultMIR = () => {
  resumeDefaultMIR = !resumeDefaultMIR;
};
const estados = [
  "Todos",
  "En Captura",
  "En Revisión",
  "En Autorización",
  "Autorizada",
];

interface Head {
  id: keyof IIMir;
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
    id: "Institucion",
    isNumeric: true,
    label: "INSTITUCIÓN",
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
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/mir", {
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
        setAnioFiscalEdit(r.data.data[0]?.AnioFiscal);

        setState(r.data.data);
      });
  };

  const [instituciones, setInstituciones] = useState<Array<IInstituciones>>();

  const getInstituciones = (setstate: Function) => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/usuarioInsitucion", {
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
    setShowResume(true);
    //getMIRs(setMirs);
  }, []);

  const returnMain = () => {
    setShowResume(true);
    //getMIRs(setMirs);
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
        r.data.data.valida == "true"
          ? setValidaFecha(true)
          : setValidaFecha(false);
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

  const [findTextStr, setFindTextStr] = useState("");
  const [findInstStr, setFindInstStr] = useState("Todos");
  const [findSelectStr, setFindSelectStr] = useState("Todos");

  const [mirEdit, setMirEdit] = useState<Array<IIMir>>([]);

  const [mirs, setMirs] = useState<Array<IIMir>>([]);
  const [mirsFiltered, setMirsFiltered] = useState<Array<IIMir>>([]);
  const [mirxFiltered, setMirxFiltered] = useState<Array<IIMir>>([]);
  // Filtrado por caracter

  useEffect(() => {
    validaFechaCaptura();
    getMIRs(setMirs);
  }, []);

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
      setMirsFiltered(
        mirs.filter(
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
      setMirsFiltered(
        mirs.filter(
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
      setMirsFiltered(
        mirs.filter(
          (x) =>
            x.Estado.toLowerCase().includes(est.toLowerCase()) &&
            x.Institucion.toLowerCase().includes(inst.toLowerCase())
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
            x.Institucion.toLowerCase().includes(inst.toLowerCase())
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
    //getMIRs(setMirs);
    getInstituciones(setInstituciones);
  }, []);

  const handleClickOpen = () => {
    setShowResume(false);
    onChangeActionNumberValue();
  };

  useEffect(() => {
    let id = urlParams.get("Id");
    setMirsFiltered(mirs.filter((x) => x.ID.toLowerCase().includes(id || "")));
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
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
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
        Toast.fire({
          icon: "error",
          title: "Error al intentar descargar el documento.",
        });
      });
  };
  ///////////////////////////////////////
  const colorMir = (v: string, mEdit: string) => {
    // if (mEdit !== undefined) {
    //   let isModification = mEdit;
    //   isModification = JSON.parse(mEdit);
    //   if (isModification[1]) {
    //     return "#cccc00";
    //   }
    // }
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

  const filtrarDatos = () => {
    // eslint-disable-next-line array-callback-return
    console.log("Entra");
    let Arrayfiltro: IIMir[];
    Arrayfiltro = [];

    if (mirxFiltered.length !== 0) {
      Arrayfiltro = mirxFiltered;
    } else {
      Arrayfiltro = mirxFiltered;
    }

    let ResultadoBusqueda = Arrayfiltro.filter((elemento) => {
      console.log("entre");
      console.log(elemento);
      console.log(findTextStr);
      console.log(mirxFiltered);

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

    setMirsFiltered(ResultadoBusqueda);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    findTextStr.length !== 0 ? setMirsFiltered(mirsFiltered) : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [findTextStr]);

  return (
    <Grid container justifyContent={"space-between"} >
      <Grid item xl={12 } height={"7vh"}
     // sx={{ mr: showResume ? 8 : 0 }}
      >
        <LateralMenu selection={"MIR"} actionNumber={actionNumber} />
      </Grid>
{/* //boxShadow: 10, */}

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
        sx={{ backgroundColor: "white", }}
      >

        {showResume ? (

          
          <>
            {/* FILTROS */}
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


              <Grid
                xl={12}
                lg={12}
                md={12}
                container
                item
                direction="row"
                justifyContent="space-around"
                alignItems="center"
              >
                <Grid item xl={5} lg={4} md={3} sm={2}>
                  <FormControl fullWidth>
                    <InputLabel sx={queries.text}>
                      FILTRO POR INSTITUCION
                    </InputLabel>
                    <Select
                      size="small"
                      variant="outlined"
                      label="FILTRO POR INSTITUCION"
                      value={findInstStr}
                      sx={{ fontFamily: "MontserratRegular" }}
                      fullWidth
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
                          <MenuItem
                            value={item.NombreInstitucion}
                            key={item.Id}
                          >
                            {item.NombreInstitucion}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid
                  // sx={{ fontFamily: "MontserratRegular" }}
                  item
                  xl={5}
                  lg={4}
                  md={3}
                >
                  <FormControl fullWidth>
                    <InputLabel sx={queries.text}>
                      FILTRO POR ESTADO DE LA MIR
                    </InputLabel>
                    <Select
                      size="small"
                      variant="outlined"
                      value={findSelectStr}
                      label="FILTRO POR ESTADO DE LA MIR"
                      sx={{ fontFamily: "MontserratRegular" }}
                      fullWidth
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
                xl={12}
                lg={12}
                md={12}
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
              >
                <Grid
                  sx={{ fontFamily: "MontserratRegular" }}
                  item
                  xl={7}
                  lg={4}
                  md={3}
                  sm={2}
                >
                  <Paper
                    component="form"
                    sx={{
                      display: "flex",
                      width: "100%",
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
                      aria-label="Buscar"
                      onClick={() => filtrarDatos()}
                    >
                      <SearchIcon />
                    </IconButton>
                  </Paper>
                </Grid>

                <Grid item xl={3} lg={4} md={3} sm={2}>
                  
                  <Button
                    disabled={!validaFecha}
                    sx={{
                      backgroundColor: "#c2a37b",
                      width: "10vw",
                      height: "3.3vh",
                      color: "black",
                      fontFamily: "MontserratMedium",
                      fontSize: "0.6vw",
                    }}
                    onClick={() => {
                      setMirEdit([
                        {
                          ID: "",
                          AnioFiscal: "",
                          Institucion: "",
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
                    {!validaFecha?"Fecha de captura terminada":"Añadir registro"}
                  </Button>
                </Grid>
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
             

              <TableContainer sx={{ borderRadius: 5, height: 450,
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
             }}>
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
                            fontSize: "0.8vw",
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
                              fontSize: ".7vw",
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
                              fontSize: ".7vw",
                            }}
                            align="center"
                            component="th"
                            scope="row"
                          >
                            {row.Institucion.toUpperCase()}
                          </TableCell>
                          <TableCell
                            sx={{
                              padding: "1px 15px 1px 0",
                              fontFamily: "MontserratRegular",
                              fontSize: ".7vw",
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
                              fontSize: ".7vw",
                            }}
                            align="center"
                            component="th"
                            scope="row"
                          >
                            {row.Estado === "En Captura" &&
                            localStorage.getItem("Rol") === "Capturador"
                              ? "Borrador"
                              : row.Estado === "En Revisión" &&
                                localStorage.getItem("Rol") === "Verificador"
                              ? "Esperando revisión"
                              : row.Estado === "En Autorización" &&
                                localStorage.getItem("Rol") === "Administrador"
                              ? "En Autorización"
                              : row.Estado}
                          </TableCell>

                          <TableCell
                            sx={{
                              padding: "1px 15px 1px 0",
                              fontFamily: "MontserratRegular",
                              fontSize: ".7vw",
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
                              fontSize: ".7vw",
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
                              display: "grid",
                              gridTemplateColumns: "repeat(4,1fr)",
                            }}
                            align="center"
                            component="th"
                            scope="row"
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
                                title="DESCARGAR MIR"
                              >
                                <span>
                                  <IconButton
                                    disabled={
                                      row.Estado === "Autorizada" && validaFecha ? false : true
                                    }
                                    onClick={() =>
                                      downloadMIR(
                                        row.AnioFiscal,
                                        row.Institucion,
                                        row.Programa,
                                        row.MIR
                                      )
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

                              <ComentDialogMir
                                estado={row.Estado}
                                id={row.ID}
                                actualizado={actualizaContador}
                              />

                              <DeleteDialogMIR
                                disab={
                                  row.Estado === "En Captura" && validaFecha &&
                                  localStorage.getItem("Rol") === "Capturador"
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
                                id={row.ID}
                                actualizado={actualizaContador}
                              />
                              <Tooltip
                                title="EDITAR"
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
                                      row.Estado === "En Captura" && validaFecha &&
                                      localStorage.getItem("Rol") ===
                                        "Capturador"
                                        ? false
                                        : row.Estado === "En Revisión" && validaFecha &&
                                          localStorage.getItem("Rol") ===
                                            "Verificador"
                                        ? false
                                        : row.Estado === "En Autorización" && validaFecha &&
                                          localStorage.getItem("Rol") ===
                                            "Administrador"
                                        ? false
                                        : true
                                    }
                                    onClick={() => {
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
                                          Conac: row.Conac,
                                          Consecutivo: row.Consecutivo,
                                          Opciones: row.Opciones,
                                        },
                                      ]);
                                      setShowResume(false);
                                      setActionNumber(1);
                                    }}
                                  >
                                    <EditIcon
                                      sx={[
                                        {
                                          "&:hover": {
                                            color: "blue",
                                          },
                                          width: "1.2vw",
                                          height: "1.2vw",
                                        },
                                      ]}
                                    />
                                  </IconButton>
                                </span>
                              </Tooltip>
                            
                          </TableCell>
                        </TableRow>
                      ))}

                    {/* ))} */}
                  </TableBody>
                </Table>
              </TableContainer>

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
            <FullModalMir
              anioFiscalEdit={anioFiscalEdit}
              MIR={mirEdit[0]?.MIR || ""}
              showResume={returnMain}
              IdMir={mirEdit[0]?.ID || ""}
            />
          </Grid>
        )}
        
      </Grid>

    </Grid>
  );
};

export interface IIMir {
  ID: string;
  AnioFiscal: string;
  Institucion: string;
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
