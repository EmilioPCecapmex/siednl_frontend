/* eslint-disable react-hooks/exhaustive-deps */
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DownloadIcon from "@mui/icons-material/Download";
import SearchIcon from "@mui/icons-material/Search";
import {
  Autocomplete,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Tooltip,
  useMediaQuery
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { MostrarLista } from "../../components/genericComponents/ModalTrazabilidad";
import { LateralMenu } from "../../components/lateralMenu/LateralMenu";
import ComentDialogMA from "../../components/modalsMA/ModalComentariosMA";
import AddMetaAnual from "../../components/tabsMetaAnual/AddMetaAnual";
import { buscador } from "../../services/servicesGlobals";
import { estados, heads } from "../../services/validations";
export let ResumeDefaultMA = true;
export let setResumeDefaultMA = () => {
  ResumeDefaultMA = !ResumeDefaultMA;
};

export const MetaAnual = () => {
  const queryString = window.location.search;

  useEffect(() => {
    setShowResume(true);
  }, [ResumeDefaultMA]);

  const returnMain = () => {
    setShowResume(true);
    setActionNumber(1);
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
  const [findInstStr, setFindInstStr] = useState("TODOS");
  const [findSelectStr, setFindSelectStr] = useState("TODOS");
  const [title_texto, setTitle] = useState("");

  const [validaFecha, setValidaFecha] = useState(true);
  const [ma, setMa] = useState<Array<IIMa>>([]);
  const [maEdit, setMaEdit] = useState<Array<IIMa>>([]);
  const [maFiltered, setMaFiltered] = useState<Array<IIMa>>([]);
  const [maxFiltered, setMaxFiltered] = useState<Array<IIMa>>([]);

  const [estadoma, setEstadoMA] = useState("TODOS");
  const [estado, setEstado] = useState("");
  const [IdEntidad, setIdEntidad] = useState("");

  interface IEntidadLabel {
    Id: string;
    Label: string;
  }

  const objetiInstitucion: IEntidadLabel = {
    Id: "0",
    Label: "TODOS",
  };

  const [instituciones, setInstituciones] = useState<IEntidadLabel>();
  const [catalogoInstituciones, setCatalogoInstituciones] = useState<
    Array<IEntidadLabel>
  >([]);

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
    setEstadoMA("TODOS");
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

  const [url, setUrl] = useState(window.location.href);

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
    getInstituciones(setCatalogoInstituciones);
  }, []);

  // Filtrado por caracter
  const findText = (v: string, est: string, inst: string) => {
    if (
      v !== "" &&
      est !== "0" &&
      est !== "TODOS" &&
      inst !== "0" &&
      inst !== "TODOS"
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
      ((est !== "0" && est !== "TODOS") || (inst !== "0" && inst !== "TODOS"))
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
      (est === "0" || est === "TODOS") &&
      (inst === "0" || inst === "TODOS")
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
      est !== "TODOS" &&
      inst !== "0" &&
      inst !== "TODOS"
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
      ((est !== "0" && est !== "TODOS") || (inst !== "0" && inst !== "TODOS"))
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

  const getListadoMA = () => {
    buscador(
      estadoma,
      localStorage.getItem("Rol")?.toUpperCase() === "ADMINISTRADOR"
        ? "TODOS"
        : localStorage.getItem("IdEntidad"),
      setMa,
      "list-metaAnual",
      setUrl
    );
  };

  useEffect(() => {
    getListadoMA();
    console.log(ma);
    
  }, []); //actualizacion

  const [actualizacion, setActualizacion] = useState(0);

  const actualizaContador = () => {
    setActualizacion(actualizacion + 1);
  };

  const filtrarDatos = () => {
    // eslint-disable-next-line array-callback-return
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

  const columsMa: GridColDef[] = [
    {
      field: "Acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "Acciones",
      sortable: false,
      width: 230,
      renderCell: (v: any) => {
        return (
          <Grid sx={{ display: "flex" }}>
            {/* <Tooltip title="Eliminar Mir">
              <IconButton onClick={() => {}}>
                <DeleteIcon />
              </IconButton>
            </Tooltip> */}

            <Tooltip title="Descargar Ma">
              <span>
                <IconButton
                  onClick={() => {
                    getMetaAnualDownload(
                      v.row.MIR,
                      v.row.MetaAnual,
                      v.row.Programa,
                      v.row.FechaCreacion,
                      v.row.Entidad
                    );
                  }}
                  disabled={
                    v.row.Estado === "Autorizada" && validaFecha ? false : true
                  }
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
                    let auxArrayMIR = JSON.parse(v.row.MIR);
                    let auxArrayMIR2 = JSON.stringify(auxArrayMIR[0]);
                    if (auxArrayMIR[1]) {
                      setMaEdit([
                        {
                          IdMa: v.row.IdMa,
                          IdMir: v.row.IdMir,
                          IdEntidad: v.row.IdEntidad,
                          AnioFiscal: v.row.AnioFiscal,
                          Entidad: v.row.Entidad,
                          Programa: v.row.Programa,
                          MIR: auxArrayMIR2,
                          //meta anual completa
                          MetaAnual: v.row.MetaAnual,
                          Estado: v.row.Estado,
                          CreadoPor: v.row.CreadoPor,
                          FechaCreacion: v.row.FechaCreacion,
                          Opciones: v.row.Opciones,
                        },
                      ]);
                    } else {
                      setMaEdit([
                        {
                          IdMa: v.row.IdMa,
                          IdMir: v.row.IdMir,
                          IdEntidad: v.row.IdEntidad,
                          AnioFiscal: v.row.AnioFiscal,
                          Entidad: v.row.Entidad,
                          Programa: v.row.Programa,
                          MIR: v.row.MIR,
                          //meta anual completa
                          MetaAnual: v.row.MetaAnual,
                          Estado: v.row.Estado,
                          CreadoPor: v.row.CreadoPor,
                          FechaCreacion: v.row.FechaCreacion,
                          Opciones: v.row.Opciones,
                        },
                      ]);
                    }

                    setEstado(v.row.Estado);
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

            <ComentDialogMA
              estado={v.row.Estado}
              id={v.row.Id}
              actualizado={actualizaContador}
              MIR={maEdit[0]?.MIR || ""}
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
      width: 200,
    },
    {
      field: "Programa",
      headerName: "Programa",
      description: "Programa",
      width: 200,
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

  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  const widthCondition = () => {
    return (
      localStorage.getItem("Rol") === "Administrador" ||
      localStorage.getItem("Rol") === "ADMINISTRADOR"
    );
  };

  const TableCellFormat = (data: any) => {
    return (
      <>
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
          {data}
        </TableCell>
      </>
    );
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
        <LateralMenu
          selection={"META ANUAL"}
          actionNumber={actionNumber}
          restore={setShowResume}
          fnc={getListadoMA}
        />
      </Grid>

     
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
          height: "93vh",
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
                          getOptionLabel={(option) => option.Label || ""}
                          value={instituciones || objetiInstitucion}
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
                  item
                  xl={widthCondition() ? 5 : 11}
                  lg={widthCondition() ? 5 : 11}
                  md={widthCondition() ? 5 : 11}
                  sm={widthCondition() ? 5 : 11}
                  xs={widthCondition() ? 11 : 11}
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
                          ? estadoma.toUpperCase()
                          : findSelectStr.toUpperCase()) || estados[0]
                      }
                      options={estados}
                      onChange={(event, newValue) => {
                      
                        if (widthCondition()) {
                          setEstadoMA(newValue || "");
                        } else {
                          setFindSelectStr(newValue || "");
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={"FILTRO POR ESTADO DE LA MA"}
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
                </Grid>

                
                  <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                    <IconButton
                      // disabled ={estadoma === "TODOS" && institucionesb === "TODOS" }
                      onClick={() => {
                        getListadoMA();
                      }}
                    >
                      <SearchIcon sx={{ fontSize: [20, 20, 20, 25, 25] }} />
                    </IconButton>
                  </Grid>
                
              </Grid>

              <Grid
                // item
                container
                xl={12}
                lg={12}
                md={12}
                sm={11}
                xs={12}
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
                      <SearchIcon sx={{ fontSize: [20, 20, 20, 25, 25] }} />
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
                          {TableCellFormat(row.AnioFiscal)}
                          {TableCellFormat(row.Entidad)}
                          {TableCellFormat(row.Programa.toUpperCase())}
                          {TableCellFormat(
                            ((row.Estado === "En Captura" ||
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
                            ).toUpperCase()
                          )}

                          {TableCellFormat(
                            moment(row.FechaCreacion, moment.ISO_8601)
                              .format("DD/MM/YYYY HH:mm:SS")
                              .toString()
                          )}

                          {TableCellFormat(
                            row.Estado === "En Captura"
                              ? "SIN ASIGNAR"
                              : row.CreadoPor.toUpperCase()
                          )}

                          {TableCellFormat(
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
                                    sx={{ fontSize: [20, 20, 20, 25, 25] }}
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
                                            IdEntidad: row.IdEntidad,
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
                                        setIdEntidad(row.IdEntidad);
                                      } else {
                                        setMaEdit([
                                          {
                                            IdMa: row.IdMa,
                                            IdMir: row.IdMir,
                                            IdEntidad: row.IdEntidad,
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
                                      setIdEntidad(row.IdEntidad);
                                      setEstado(row.Estado);
                                      setShowResume(false);
                                      setActionNumber(1);
                                    }}
                                  >
                                    <AddCircleOutlineIcon
                                      sx={{ fontSize: [20, 20, 20, 25, 25] }}
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
                                      sx={{ fontSize: [20, 20, 20, 25, 25] }}
                                    />
                                  </IconButton>
                                </span>
                              </Tooltip>

                              <ComentDialogMA
                                estado={row.Estado}
                                id={row.IdMir}
                                actualizado={actualizaContador}
                                MIR={maEdit[0]?.MIR || ""}
                                IdEntidad={row.IdEntidad}
                              />

                              <MostrarLista st="" Id={row.IdMa} />
                            </Grid>
                          )}
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
              IdEntidad={IdEntidad}
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
  IdEntidad: string;
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
