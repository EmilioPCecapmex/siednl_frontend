/* eslint-disable react-hooks/exhaustive-deps */
import { MostrarLista } from "../../components/genericComponents/ModalTrazabilidad";
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
  TextField,
  Autocomplete,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { LateralMenu } from "../../components/lateralMenu/LateralMenu";
import { queries } from "../../queries";
import moment from "moment";
import Swal from "sweetalert2";
import { IEntidad } from "../../components/appsDialog/AppsDialog";
import ComentDialogMir from "../../components/modalsMIR/ModalComentariosMir";
import DeleteDialogMIR from "../../components/modalsMIR/ModalEliminarMIR";
import FullModalMir from "../../components/tabsMir/AddMir";
import SearchIcon from "@mui/icons-material/Search";
import { alertaError } from "../../components/genericComponents/Alertas";
import { estados, heads } from "../../services/validations";
import DataGridTable from "../../components/genericComponents/DataGridTable";
import { GridColDef } from "@mui/x-data-grid";

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

  interface IEntidadLabel {
    Id: string;
    Label: string;
  }

  const getMIRs = (setState: Function) => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/list-mir", {
        params: {
          IdUsuario: localStorage.getItem("IdUsuario"),
          IdEntidad: localStorage.getItem("IdEntidad"),
          Rol: localStorage.getItem("Rol"),
          Estado: estadomir || "TODOS",
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

  const objetiInstitucion: IEntidadLabel = {
    //ClaveSiregob: null,
    //ControlInterno: "",
    Id: "0",
    Label: "TODOS",
  };

 // const [instituciones, setInstituciones] = useState<IEntidad>(objetiInstitucion || "");
  const [instituciones, setInstituciones] = useState<IEntidadLabel>();
  const [catalogoInstituciones, setCatalogoInstituciones] = useState<
    Array<IEntidadLabel>
  >([]);

  // cambiado
  const getInstituciones = (setstate: Function) => {
    axios
      .get(
        process.env.REACT_APP_APPLICATION_BACK + "/api/entidades-relacionadas",
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        if (r.status === 200) {
          let aux = r.data.data;
          aux.unshift({
            Id: "0",
            Label: "TODOS",
          });
          setstate(r.data.data);
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
  const [findInstStr, setFindInstStr] = useState("TODOS");
  const [findSelectStr, setFindSelectStr] = useState("TODOS");

  const [institucionesb, setInstitucionesb] = useState("TODOS");

  const [estadomir, setEstadoMIR] = useState("TODOS");

  const [mirEdit, setMirEdit] = useState<Array<IIMir>>([]);

  const [mirs, setMirs] = useState<Array<IIMir>>([]);
  const [mirsFiltered, setMirsFiltered] = useState<Array<IIMir>>([]);
  const [mirxFiltered, setMirxFiltered] = useState<Array<IIMir>>([]);
  // Filtrado por caracter

  useEffect(() => {
    validaFechaCaptura();
    getMIRs(setMirs);
    setEstadoMIR("TODOS");
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
      est !== "TODOS" &&
      inst !== "0" &&
      inst !== "TODOS"
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
      ((est !== "0" && est !== "TODOS") || (inst !== "0" && inst !== "TODOS"))
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
      (est === "0" || est === "TODOS") &&
      (inst === "0" || inst === "TODOS")
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
      est !== "TODOS" &&
      inst !== "0" &&
      inst !== "TODOS"
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
      ((est !== "0" && est !== "TODOS") || (inst !== "0" && inst !== "TODOS"))
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
    //getInstituciones(setInstituciones);
    getInstituciones(setCatalogoInstituciones);
  }, []);

  const handleClickOpen = () => {
    setShowResume(false);
    onChangeActionNumberValue();
  };

  useEffect(() => {
    const url = window.location.href;

    // Verificar si el parámetro 'Id' está presente en la URL
    if (url.includes("?Id=")) {
      const id = url.split("?")[1].split("=")[1];

      // Verificar si 'id' no es undefined o null antes de incluirlo en la comparación
      if (id) {
        setMirsFiltered(
          mirs.filter((x) => x.Id.toLowerCase().includes(id || ""))
        );
      }
    }
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
        alertaError("Error al intentar descargar el documento.");
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

  const [IdEntidad, setIdEntidad] = useState("");

  const buscador = (estado: any, Ins: any) => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/list-mir", {
        params: {
          IdUsuario: localStorage.getItem("IdUsuario"),
          IdEntidad: Ins || "Todos" || localStorage.getItem("IdEntidad"),
          Rol: localStorage.getItem("Rol"),
          Estado: estado || "TODOS",
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        //setAnioFiscalEdit(r.data.data[0]?.AnioFiscal);

        if (r.data.data.length === 0) {
          alertaError("El DOCUMENTO NO ESTA DISPONIBLE O NO HAY DOCUMENTOS PARA LLENAR")
          setMirs(r.data.data);
        }else{
          setMirs(r.data.data);
          
        }

        //setInstitucionesb("TODOS")
      });
  };

  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  const columsMir: GridColDef[] = [
    {
      field: "Acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "Acciones",
      sortable: false,
      width: 230,

      renderCell: (v: any) => {
        return (
          <Grid
            container
            sx={{
              display: "flex",
              //, flexDirection: "column"
            }}
          >
            {/* <Tooltip title="Eliminar Mir">
              <IconButton onClick={() => {}}>
                <DeleteIcon />
              </IconButton>
            </Tooltip> */}

            <DeleteDialogMIR
              disab={
                v.row.Estado === "En Captura" &&
                // || row.Estado === "Borrador Capturador"
                validaFecha &&
                localStorage.getItem("Rol") === "Capturador"
                  ? false
                  : v.row.Estado === "En Revisión" &&
                    localStorage.getItem("Rol") === "Verificador"
                  ? false
                  : (v.row.Estado === "En Autorización" ||
                      v.row.Estado === "Autorizada") &&
                    localStorage.getItem("Rol") === "Administrador"
                  ? false
                  : true
              }
              id={v.row.Id}
              actualizado={actualizaContador}
            />

            <Tooltip title="Descargar Mir">
              <span>
                <IconButton
                  onClick={() => {
                    downloadMIR(
                      v.row.AnioFiscal,
                      v.row.Entidad,
                      v.row.Programa,
                      v.row.MIR
                    );
                  }}
                >
                  <DownloadIcon
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
                        ffontSize: 25, // Pantalla grande (xl)
                      },
                    }}
                  />
                </IconButton>
              </span>
            </Tooltip>

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
                    ((v.row.Estado === "En Captura" ||
                      v.row.Estado === "Borrador Capturador") &&
                      validaFecha &&
                      localStorage.getItem("Rol") === "Capturador") ||
                    (v.row.Estado === "En Revisión" &&
                      validaFecha &&
                      localStorage.getItem("Rol") === "Verificador") ||
                    (v.row.Estado === "Borrador Verificador" &&
                      validaFecha &&
                      localStorage.getItem("Rol") === "Verificador") ||
                    ((v.row.Estado === "En Autorización" ||
                      v.row.Estado === "Autorizada") &&
                      validaFecha &&
                      localStorage.getItem("Rol") === "Administrador") ||
                    (v.row.Estado === "Borrador Autorizador" &&
                      validaFecha &&
                      localStorage.getItem("Rol") === "Administrador")
                      ? false
                      : true
                  }
                  onClick={() => {
                    setMirEdit([
                      {
                        Id: v.row.Id,
                        AnioFiscal: v.row.AnioFiscal,
                        Entidad: v.row.Entidad,
                        IdEntidad: v.row.IdEntidad,
                        Programa: v.row.Programa,
                        Eje: v.row.Eje,
                        Tematica: v.row.Tematica,
                        MIR: v.row.MIR,
                        Estado: v.row.Estado,
                        FechaCreacion: v.row.FechaCreacion,
                        CreadoPor: v.row.CreadoPor,
                        Conac: v.row.Conac,
                        Consecutivo: v.row.Consecutivo,
                        Opciones: v.row.Opciones,
                      },
                    ]);
                    setShowResume(false);
                    setActionNumber(1);
                    setEstado(v.row.Estado);
                  }}
                >
                  <EditIcon
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
                        ffontSize: 25, // Pantalla grande (xl)
                      },
                    }}
                  />
                </IconButton>
              </span>
            </Tooltip>

            <ComentDialogMir
              estado={v.row.Estado}
              id={v.row.Id}
              actualizado={actualizaContador}
              MIR={mirEdit[0]?.MIR || ""}
              IdEntidad={v.row.IdEntidad}
            />

            <MostrarLista st="" Id={v.row.Id} />
          </Grid>
        );
      },
    },
    {
      field: "AnioFiscal",
      headerName: "Año Fiscal",
      description: "Año Fiscal",
      width: 100,
    },
    {
      field: "Entidad",
      headerName: "Entidad",
      description: "Entidad",
      width: isSmallScreen ? 200 : 285, // Ancho de 200px si la pantalla es pequeña, 300px si es grande
    },
    {
      field: "Programa",
      headerName: "Programa",
      description: "Programa",
      width: isSmallScreen ? 200 : 285, // Ancho de 200px si la pantalla es pequeña, 300px si es grande
    },
    {
      field: "Estado",
      headerName: "Estado",
      description: "Estado",
      width: 100,
    },
    {
      field: "FechaCreacion",
      headerName: "Fehca de creacion",
      description: "Fecha de creacion",
      width: 200,
    },
    {
      field: "CreadoPor",
      headerName: "Creado por",
      description: "Creado por",
      width: 200,
    },
  ];

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
        container
        item
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        sx={{
          backgroundColor: "white",
          justifyContent: "center",
          display: "flex",
          height: "93vh",
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
              sm={10}
              xs={11}
              // height="15vh"
              // direction="row"
              sx={{
                ...(!isSmallScreen
                  ? { boxShadow: 5, backgroundColor: "#FFFF", borderRadius: 5 }
                  : { marginBottom: "30px" }),

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
                  ...(!isSmallScreen ? {} : { marginBottom: "5px" }),
                }}
              >
                {localStorage.getItem("Rol") === "Administrador" ? (
                  <Grid
                    item
                    xl={5}
                    lg={5}
                    md={5}
                    sm={5}
                    xs={12}
                    sx={{
                      ...(!isSmallScreen ? {} : { marginBottom: "5px" }),
                    }}
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
                      title={findInstStr}
                    >
                      <FormControl required fullWidth>
                        <Autocomplete
                          //  disabled={edit && !mirEdit?.encabezado.ejercicioFiscal}
                          clearText="Borrar"
                          noOptionsText="Sin opciones"
                          closeText="Cerrar"
                          openText="Abrir"
                          disablePortal
                          size="small"
                          options={catalogoInstituciones}
                          getOptionLabel={(option) => option.Label|| ""}
                          value={instituciones || "" || objetiInstitucion}

                          // value={
                          //   (localStorage.getItem("Rol") === "Administrador" ||
                          //   localStorage.getItem("Rol") === "ADMINISTRADOR"
                          //     ? estadomir.toUpperCase()
                          //     : findSelectStr.toUpperCase()) || estados[0]
                          // }
                          // getOptionLabel={(option) => option.Label || ""}
                          // value={instituciones || objetiInstitucion}
                          getOptionDisabled={(option) => {
                            if (option.Id === "") {
                              return true;
                            }
                            return false;
                          }}
                          renderOption={(props, option) => {
                            return (
                              <li {...props} key={option.Id}>
                                <p
                                  style={{
                                    fontFamily: "MontserratRegular",
                                  }}
                                >
                                  {option.Label}
                                </p>
                              </li>
                            );
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="FILTRO POR INSTITUCIÓN"
                              variant="standard"
                              InputLabelProps={{
                                style: {
                                  fontFamily: "MontserratSemiBold",
                                },
                              }}
                              sx={{
                                "& .MuiAutocomplete-input": {
                                  fontFamily: "MontserratRegular",
                                },
                              }}
                            ></TextField>
                          )}
                          onChange={(event, value) =>
                            setInstituciones(value || objetiInstitucion)
                          }
                          isOptionEqualToValue={(option, value) =>
                            option.Id === value.Id
                          }
                        />
                      </FormControl>
                    </Tooltip>
                  </Grid>
                ) : null}

                <Grid
                  // sx={{ fontFamily: "MontserratRegular" }}
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
                      ? 11
                      : 11
                  }
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
                      <Autocomplete
                        clearText="Borrar"
                        noOptionsText="Sin opciones"
                        closeText="Cerrar"
                        openText="Abrir"
                        disablePortal
                        fullWidth
                        size="small"
                        value={
                          (localStorage.getItem("Rol") === "Administrador" ||
                          localStorage.getItem("Rol") === "ADMINISTRADOR"
                            ? estadomir.toUpperCase()
                            : findSelectStr.toUpperCase()) || estados[0]
                        }
                        options={estados}
                        onChange={(event, newValue) => {
                          // Access the value using newValue

                          if (
                            localStorage.getItem("Rol") === "Administrador" ||
                            localStorage.getItem("Rol") === "ADMINISTRADOR"
                          ) {
                            setEstadoMIR(newValue || "");
                          } else {
                            setFindSelectStr(newValue || "");
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={"FILTRO POR ESTADO DE LA MIR"}
                            variant="standard"
                            InputLabelProps={{
                              style: {
                                fontFamily: "MontserratSemiBold",
                              },
                            }}
                            sx={{
                              "& .MuiAutocomplete-input": {
                                fontFamily: "MontserratRegular",
                              },
                            }}
                          ></TextField>
                        )}
                      />
                    </FormControl>
                  </Tooltip>
                </Grid>

                {localStorage.getItem("Rol") === "Administrador" && (
                  <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                    <IconButton
                      // disabled ={estadomir === "TODOS" && institucionesb === "TODOS" }
                      onClick={() => {
                        buscador(estadomir, instituciones?.Label);
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
                      //sx={{ p: "10px" }}
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

                <Grid item xl={3} lg={3} md={4} sm={4} xs={4}>
                  <Button
                    disabled={!validaFecha}
                    className="aceptar"
                    sx={{
                      //backgroundColor: "#c2a37b",
                      // width: "10vw",
                      // height: "3.3vh",
                      width: ["100px", "120px", "160px", "180px", "250px"],
                      height: ["40px", "40px", "40px", "40px", "50px"],
                      //color: "black",
                      fontFamily: "MontserratMedium",
                      //fontSize: [3, 6, 10, 12, 16, 20],
                    }}
                    onClick={() => {
                      setMirEdit([
                        {
                          Id: "",
                          IdEntidad: "",
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
                      ? "FECHA DE CAPTURA TERMINADA"
                      : "AÑADIR REGISTRO"}
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
                            {((row.Estado === "En Captura" ||
                              row.Estado === "Borrador Capturador") &&
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
                                MIR={mirEdit[0]?.MIR || ""}
                                IdEntidad={row.IdEntidad}
                              />

                              <DeleteDialogMIR
                                disab={
                                  row.Estado === "En Captura" &&
                                  // || row.Estado === "Borrador Capturador"
                                  validaFecha &&
                                  localStorage.getItem("Rol") === "Capturador"
                                    ? false
                                    : row.Estado === "En Revisión" &&
                                      localStorage.getItem("Rol") ===
                                        "Verificador"
                                    ? false
                                    : (row.Estado === "En Autorización" ||
                                        row.Estado === "Autorizada") &&
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
                                      ((row.Estado === "En Captura" ||
                                        row.Estado === "Borrador Capturador") &&
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
                                          IdEntidad: row.IdEntidad,
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
                              <MostrarLista st="" Id={row.Id} />
                              {/* <Tooltip
                                title="Lista"
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
                                      ((row.Estado === "En Captura" || row.Estado === "Borrador Capturador") &&
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
                                      setOpenVisualizador(true)
                                    }}
                                  >
                                    <ListAltIcon
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

 */}
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
            {/* {openVisualizador ? (
              <MostrarLista
                handleClose={() => {
                  setOpenVisualizador(false);
                }}
              />
            ) : null} */}
            {/* {openVisualizador ? (
        <MostrarLista
          handleClose={() => {
            setOpenVisualizador(false);
          }}
        />
      ) : null} */}
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
              IdEntidad={IdEntidad}
              setIdEntidad={setIdEntidad}
            />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export interface IIMir {
  Id: string;
  IdEntidad: string;
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
