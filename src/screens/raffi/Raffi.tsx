import {
  FormControl,
  Grid,
  InputBase,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from "@mui/material";
//import { useNavigate } from "react-router-dom";
import DownloadIcon from "@mui/icons-material/Download";
import { useEffect, useState } from "react";
import { LateralMenu } from "../../components/lateralMenu/LateralMenu";
import CapturaRaffi from "../../components/tabsRaffi/CapturaRaffi";

import moment from "moment";
import { queries } from "../../queries";
import { getInstituciones } from "../../services/instituciones_services/instituciones";
import { listaRaffi } from "../../services/raffi_services/raffi_endpoints";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
//import CommentIcon from "@mui/icons-material/Comment";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";
import Swal from "sweetalert2";
import { IEntidad } from "../../components/appsDialog/AppsDialog";
import { buscador } from "../../services/servicesGlobals";
import { estados, heads } from "../../services/validations";
import ComentDialogRF from "../../components/modalsRF/ModalComentariosRF";

export const Raffi = () => {
  const [actionNumber, setActionNumber] = useState(0);

  const [opentabs, setOpenTabs] = useState(true);

  const [rf, setRf] = useState<Array<IRaffi>>([]);
  const [rfFiltered, setRfFiltered] = useState<Array<IRaffi>>([]);
  const [rfxFiltered, setRfxFiltered] = useState<Array<IRaffi>>([]);
  const [rfEdit, setRfEdit] = useState<Array<IRaffi>>([]);
  const [instituciones, setInstituciones] = useState<Array<IEntidad>>();
  const [validaFecha, setValidaFecha] = useState(true);

  const [findTextStr, setFindTextStr] = useState("");
  const [findInstStr, setFindInstStr] = useState("Todos");
  const [findSelectStr, setFindSelectStr] = useState("Todos");
  const renglonesPagina = 7;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [page, setPage] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [rowsPerPage, setRowsPerPage] = useState(renglonesPagina);

  const [estadorf, setEstadoRF] = useState("Todos");
  const [estado, setEstado] = useState("");
  const [institucionesb, setInstitucionesb] = useState("Todos");

  useEffect(() => {
    if (opentabs) {
      listaRaffi(setRf, estadorf);
      validaFechaCaptura();
      setOpenTabs(true);
    }
  }, [opentabs]);

  useEffect(() => {
    setRfFiltered(rf);
  }, [rf]);

  useEffect(() => {
    setRfxFiltered(rfFiltered);
  }, [rfFiltered]);

  const returnMain = () => {
    setOpenTabs(true);
    setActionNumber(1);
  };

  const findText = (v: string, est: string, inst: string) => {
    if (
      v !== "" &&
      est !== "0" &&
      est !== "Todos" &&
      inst !== "0" &&
      inst !== "Todos"
    ) {
      setRfFiltered(
        rf.filter(
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
      setRfFiltered(
        rf.filter(
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
      setRfFiltered(
        rf.filter(
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
      setRfFiltered(
        rf.filter(
          (x) =>
            x.Estado.toLowerCase().includes(est.toLowerCase()) &&
            x.Entidad.toLowerCase().includes(inst.toLowerCase())
        )
      );
    } else if (
      v === "" &&
      ((est !== "0" && est !== "Todos") || (inst !== "0" && inst !== "Todos"))
    ) {
      setRfFiltered(
        rf.filter(
          (x) =>
            x.Estado.toLowerCase().includes(est.toLowerCase()) ||
            x.Entidad.toLowerCase().includes(inst.toLowerCase())
        )
      );
    } else {
      setRfFiltered(rf);
    }
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
            Modulo: "Raffi",
          },
        }
      )
      .then((r) => {
        r.data.data.valida === "true"
          ? setValidaFecha(true)
          : setValidaFecha(false);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    findText(findTextStr, findSelectStr, findInstStr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [findTextStr, findInstStr, findSelectStr]);

  useEffect(() => {
    validaFechaCaptura();
    getInstituciones(setInstituciones);
  }, []);

  const handleChange = (dato: string) => {
    setFindTextStr(dato);
  };

  const filtrarDatos = () => {
    // eslint-disable-next-line array-callback-return

    let Arrayfiltro: IRaffi[];
    Arrayfiltro = [];

    if (rfxFiltered.length !== 0) {
      Arrayfiltro = rfxFiltered;
    } else {
      Arrayfiltro = rfFiltered;
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

    setRfxFiltered(ResultadoBusqueda);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    findTextStr.length !== 0 ? setRfFiltered(rfFiltered) : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [findTextStr]);

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

  const getFichaRaffiDownload = (
    MIR: string,
    MetaAnual: string,
    RF: string,
    inst: string,
    Programa: string,
    FechaCreacion: string
  ) => {
    const fullRF = [JSON.parse(MIR), JSON.parse(MetaAnual), JSON.parse(RF)];

    axios
      .post(
        // process.env.REACT_APP_APPLICATION_FILL + "/api/fill_rf",
        process.env.REACT_APP_APPLICATION_FILL + "/api/fill_raffi",
        fullRF,
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
          "RF_" + FechaCreacion + "_" + inst + "_" + Programa + ".xlsx"
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
        <LateralMenu selection={"RAFFI"} actionNumber={actionNumber} />
      </Grid>

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
          //backgroundColor: "white",
          justifyContent: "center",
          display: "flex",
          //height: "93vh",
          alignItems: "center",
        }}
      >
        {/* <Grid sx={{ height: "8vh", marginLeft: "4vw" }}>
          <Header
            details={{
              name1: "Inicio",
              path1: "../home",
              name2: "Raffi",
              path2: "../raffi",
              name3: "",
            }}
          />
        </Grid> */}

        {opentabs ? (
          <>
            {/* FILTROS */}
            <Grid
              container
              item
              xl={8}
              lg={8}
              md={8}
              sm={8}
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
                item
                container
                sx={{
                  justifyContent: "space-around",
                  alignItems: "center",
                  direction: "row",
                }}
              >
                <Grid
                  sx={{ fontFamily: "MontserratRegular" }}
                  item
                  xl={11}
                  lg={10}
                  md={8}
                  sm={11}
                  xs={11}
                >
                  <Paper
                    component="form"
                    sx={{
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                      justifyItems: "center",
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

                {/* <Grid item xl={5} lg={4} md={3}>
                  <Button
                    fullWidth
                    sx={queries.buttonContinuarSolicitudInscripcion}
                    onClick={() => {
                      setOpenTabs(false);
                    }}
                  >
                    Buscar
                  </Button>
                </Grid> */}
              </Grid>

              <Grid
                item
                xl={12}
                lg={12}
                md={12}
                
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
              >
                {localStorage.getItem("Rol") === "Administrador" ? (
                   <Grid item xl={5} lg={5} md={5} sm={5} xs={5}>
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
                        fullWidth
                        variant="outlined"
                        label="FILTRO POR INSTITUCION"
                        sx={{
                          fontFamily: "MontserratRegular",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          //textAlign: "center",
                          fontSize: [10, 10, 15, 15, 18, 20],
                        }}
                        value={institucionesb}
                        disabled={
                          localStorage.getItem("Rol") !== "Administrador"
                        }
                        onChange={(v) => {
                          // v.target.value === "Todos"
                          //   ? findText(
                          //       findTextStr,
                          //       findSelectStr === "Todos" ? "0" : findSelectStr,
                          //       "0"
                          //     )
                          //   : findText(findTextStr, findSelectStr, v.target.value);
                          setInstitucionesb(v.target.value);
                        }}
                      >
                        <MenuItem
                          value={institucionesb}
                          sx={{ fontFamily: "MontserratRegular" }}
                        >
                          Todos
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
                      FILTRO POR ESTADO DE LA RAFFI
                    </InputLabel>
                    <Select
                      size="small"
                      fullWidth
                      variant="outlined"
                      label="FILTRO POR ESTADO DE LA Raffi"
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
                          ? estadorf
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
                          setEstadoRF(v.target.value);
                        } else {
                          setFindSelectStr(v.target.value);
                        }
                      }}
                    >
                      {estados.map((estado) => (
                        <MenuItem key={estado} value={estado}>
                          {estado}
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
                          estadorf,
                          institucionesb,
                          setRf,
                          "list-raffis"
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
            </Grid>
            {/* TABLA */}
            <Grid
              container
              item
              xl={10}
              lg={10}
              md={10}
              sm={10}
              xs={10}
              height="65vh"
              direction="row"
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
                    {rfxFiltered
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        return (
                          <TableRow>
                            <TableCell
                              sx={{
                                padding: "1px 15px 1px 0",
                                fontFamily: "MontserratRegular",
                                fontSize: [10, 10, 10, 15, 15, 18],
                                textAlign: "center",
                              }}
                            >
                              {row.AnioFiscal.toUpperCase()}
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
                                  localStorage.getItem("Rol") ===
                                    "Administrador"
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
                              {row.CreadoPor?.toUpperCase()}
                            </TableCell>
                            <TableCell
                              sx={{
                                flexDirection: "row",
                                display: "grid",
                                gridTemplateColumns: "repeat(4,1fr)",
                                fontSize: [10, 10, 10, 15, 15, 18],
                                textAlign: "center",
                              }}
                            >
                              {row.Estado !==
                                ("Sin Asignar" || "SIN ASIGNAR") && (
                                <Tooltip title="EDITAR">
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
                                        : true || !validaFecha
                                    }
                                    type="button"
                                    onClick={() => {
                                      let auxArrayMIR = JSON.parse(row.MIR);
                                      let auxArrayMIR2 = JSON.stringify(
                                        auxArrayMIR[0]
                                      );

                                      if (auxArrayMIR[1]) {
                                        setRfEdit([
                                          {
                                            IdRaffi: row.IdRaffi,
                                            IdMir: row.IdMir,
                                            IdMetaAnual: row.IdMetaAnual,
                                            RAFFI: row.RAFFI,
                                            Estado: row.Estado,
                                            CreadoPor: row.CreadoPor,
                                            FechaCreacion: row.FechaCreacion,
                                            ModificadoPor: row.ModificadoPor,
                                            AnioFiscal: row.AnioFiscal,
                                            Entidad: row.Entidad,
                                            Programa: row.Programa,
                                            MIR: auxArrayMIR2,
                                            //Array.isArray(row.MIR) ? row.MIR[0] : row.MIR,

                                            MetaAnual: row.MetaAnual,
                                            Conac: row.Conac,
                                            Consecutivo: row.Consecutivo,
                                            Opciones: row.Opciones,
                                          },
                                        ]);
                                      } else {
                                        setRfEdit([
                                          {
                                            IdRaffi: row.IdRaffi,
                                            IdMir: row.IdMir,
                                            IdMetaAnual: row.IdMetaAnual,
                                            RAFFI: row.RAFFI,
                                            Estado: row.Estado,
                                            CreadoPor: row.CreadoPor,
                                            FechaCreacion: row.FechaCreacion,
                                            ModificadoPor: row.ModificadoPor,
                                            AnioFiscal: row.AnioFiscal,
                                            Entidad: row.Entidad,
                                            Programa: row.Programa,
                                            MIR:
                                              //Array.isArray(row.MIR) ? row.MIR[0] : row.MIR,
                                              row.MIR,
                                            MetaAnual: row.MetaAnual,
                                            Conac: row.Conac,
                                            Consecutivo: row.Consecutivo,
                                            Opciones: row.Opciones,
                                          },
                                        ]);
                                      }
                                      setEstado(row.Estado);
                                      setOpenTabs(false);
                                      setActionNumber(1); //Revisar esta funcionalidad
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
                                    {row.Opciones}
                                  </IconButton>
                                </Tooltip>
                              )}

                              {row.Estado ===
                                ("Sin Asignar" || "SIN ASIGNAR") && (
                                <Tooltip title="REGISTRAR RAFFI">
                                  <IconButton
                                    type="button"
                                    onClick={() => {
                                      let auxArrayMIR = JSON.parse(row.MIR);
                                      let auxArrayMIR2 = JSON.stringify(
                                        auxArrayMIR[0]
                                      );
                                      if (auxArrayMIR[1]) {
                                        setRfEdit([
                                          {
                                            IdRaffi: row.IdRaffi,
                                            IdMir: row.IdMir,
                                            IdMetaAnual: row.IdMetaAnual,
                                            RAFFI: row.RAFFI,
                                            Estado: row.Estado,
                                            CreadoPor: row.CreadoPor,
                                            FechaCreacion: row.FechaCreacion,
                                            ModificadoPor: row.ModificadoPor,
                                            AnioFiscal: row.AnioFiscal,
                                            Entidad: row.Entidad,
                                            Programa: row.Programa,
                                            MIR: auxArrayMIR2,
                                            //Array.isArray(row.MIR) ? row.MIR[0] : row.MIR,

                                            MetaAnual: row.MetaAnual,
                                            Conac: row.Conac,
                                            Consecutivo: row.Consecutivo,
                                            Opciones: row.Opciones,
                                          },
                                        ]);
                                      } else {
                                        setRfEdit([
                                          {
                                            IdRaffi: row.IdRaffi,
                                            IdMir: row.IdMir,
                                            IdMetaAnual: row.IdMetaAnual,
                                            RAFFI: row.RAFFI,
                                            Estado: row.Estado,
                                            CreadoPor: row.CreadoPor,
                                            FechaCreacion: row.FechaCreacion,
                                            ModificadoPor: row.ModificadoPor,
                                            AnioFiscal: row.AnioFiscal,
                                            Entidad: row.Entidad,
                                            Programa: row.Programa,
                                            MIR:
                                              //Array.isArray(row.MIR) ? row.MIR[0] : row.MIR,
                                              row.MIR,
                                            MetaAnual: row.MetaAnual,
                                            Conac: row.Conac,
                                            Consecutivo: row.Consecutivo,
                                            Opciones: row.Opciones,
                                          },
                                        ]);
                                      }
                                      setEstado(row.Estado);
                                      setOpenTabs(false);
                                      setActionNumber(1); //Revisar esta funcionalidad
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
                                    {row.Opciones}
                                  </IconButton>
                                </Tooltip>
                              )}

                              <Tooltip title="DESCARGAR">
                                <span>
                                  <IconButton
                                    onClick={() => {
                                      let auxArrayMIR = JSON.parse(row.MIR);
                                      let auxArrayMIR2 = JSON.stringify(
                                        auxArrayMIR[0]
                                      );
                                      if (auxArrayMIR[1]) {
                                        getFichaRaffiDownload(
                                          auxArrayMIR2,
                                          row.MetaAnual,
                                          row.RAFFI,
                                          row.Programa,
                                          row.FechaCreacion,
                                          row.Entidad
                                        );
                                      } else {
                                        getFichaRaffiDownload(
                                          row.MIR,
                                          row.MetaAnual,
                                          row.RAFFI,
                                          row.Programa,
                                          row.FechaCreacion,
                                          row.Entidad
                                        );
                                      }
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

                              <ComentDialogRF
                                estado={row.Estado}
                                id={row.IdMir}
                                //actualizado={actualizaContador}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
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
            <CapturaRaffi
              MIR={rfEdit[0].MIR || ""}
              MA={rfEdit[0].MetaAnual || ""}
              RF={rfEdit[0].RAFFI || ""}
              opentabs={returnMain}
              IdMir={rfEdit[0].IdMir || ""}
              IdMA={rfEdit[0].IdMetaAnual || ""}
              IdRf={rfEdit[0].IdRaffi || ""}
              estado={estado}
            />
          </Grid>
        )}
        {/* rdEdit: 
        {JSON.stringify(rfEdit[0]?.MIR)} */}
      </Grid>
    </Grid>
  );
};

export interface IRaffi {
  IdRaffi: string;
  IdMir: string;
  IdMetaAnual: string;
  RAFFI: string;
  Estado: string;
  CreadoPor: string;
  FechaCreacion: string;
  ModificadoPor: string;
  AnioFiscal: string; //viene de la mir
  Entidad: string;
  Programa: string;
  MIR: string;
  MetaAnual: string;
  Conac: string;
  Consecutivo: string;
  Opciones: string;
}
