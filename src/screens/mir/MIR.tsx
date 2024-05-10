import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
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
  useMediaQuery,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { MostrarLista } from "../../components/genericComponents/ModalTrazabilidad";
import { LateralMenu } from "../../components/lateralMenu/LateralMenu";
import ComentDialogMir from "../../components/modalsMIR/ModalComentariosMir";
import DeleteDialogMIR from "../../components/modalsMIR/ModalEliminarMIR";
import FullModalMir from "../../components/tabsMir/AddMir";
import { IIMir, ILista } from "../../components/tabsMir/interfaces mir/IMIR";

import {
  buscador,
  downloadMIR,
  validaFechaCaptura,
} from "../../services/servicesGlobals";
import { estados, heads } from "../../services/validations";
import { getInstituciones } from "../../services/mir_services/servicesMIR";

export let resumeDefaultMIR = true;

export let setResumeDefaultMIR = () => {
  resumeDefaultMIR = !resumeDefaultMIR;
};

export const MIR = () => {

  const objetiInstitucion: ILista = { Id: "0", Label: "TODOS" };

  const [instituciones, setInstituciones] = useState<ILista>();
  const [catalogoInstituciones, setCatalogoInstituciones] = useState<ILista[]>(
    []
  );

  const [showResume, setShowResume] = useState(true);
  const [validaFecha, setValidaFecha] = useState(true);
  const [page, setPage] = useState(0);
  const renglonesPagina = 6;
  const [rowsPerPage, setRowsPerPage] = useState(renglonesPagina);
  const [actionNumber, setActionNumber] = useState(0);

  const returnMain = () => {
    setShowResume(true);
  };

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

  const [estadomir, setEstadoMIR] = useState("TODOS");

  const [mirEdit, setMirEdit] = useState<Array<IIMir>>([]);

  const [mirs, setMirs] = useState<Array<IIMir>>([]);
  const [mirsFiltered, setMirsFiltered] = useState<Array<IIMir>>([]);
  const [mirxFiltered, setMirxFiltered] = useState<Array<IIMir>>([]);
  // Filtrado por caracter

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

  const handleChange = (dato: string) => {
    setFindTextStr(dato);
  };

  const handleClickOpen = () => {
    setShowResume(false);
    onChangeActionNumberValue();
  };

  
  const [actualizacion, setActualizacion] = useState(0);

  const actualizaContador = () => {
    setActualizacion(actualizacion + 1);
  };

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

  const [estado, setEstado] = useState("");

  const [IdEntidad, setIdEntidad] = useState("");

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
  const getListadoMirs=()=>{
    buscador(
      estadomir,
      localStorage.getItem("Rol")?.toUpperCase()==='ADMINISTRADOR'?'TODOS':localStorage.getItem("IdEntidad"),
      setMirs,
      "list-mir",
      setUrl
    );
  }
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    findTextStr.length !== 0 ? setMirsFiltered(mirsFiltered) : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [findTextStr]);

  const [url, setUrl] = useState(window.location.href);
  
  useEffect(() => {
    // Verificar si el parámetro 'Id' está presente en la URL
    
    if (url.includes("?Id=")) {
      const id = url.split("?")[1].split("=")[1];
      setUrl(id)
      // Verificar si 'id' no es undefined o null antes de incluirlo en la comparación
      if (id) {
        setMirsFiltered(
          mirs.filter((x) => x.Id.toLowerCase().includes(id || ""))
        );
      }
    } 
  }, [mirs]);

  useEffect(() => {
    getListadoMirs()
  }, []);//actualizacion

  useEffect(() => {
    getInstituciones(setCatalogoInstituciones);
  }, []);
  useEffect(() => {
    findText(findTextStr, findSelectStr, findInstStr);
  }, [findTextStr, findInstStr, findSelectStr]);

  useEffect(() => {
    validaFechaCaptura(setValidaFecha, setTitle, "Mir");
    setEstadoMIR("TODOS");
  }, [showResume]);


  useEffect(() => {
    setMirsFiltered(mirs);
  }, [mirs]);

  useEffect(() => {
    setMirxFiltered(mirsFiltered);
  }, [mirsFiltered]);

  useEffect(() => {
    setShowResume(true);
  }, []);

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
    <Grid container sx={{ justifyContent: "space-between" }}>
      <Grid
        item
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        sx={{ height: "7vh", whitespace: "nowrap" }}
      >
        <LateralMenu
          selection={"MIR"}
          actionNumber={actionNumber}
          restore={setShowResume}
          fnc={getListadoMirs}
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
                          clearText="Borrar"
                          noOptionsText="Sin opciones"
                          closeText="Cerrar"
                          openText="Abrir"
                          disablePortal
                          size="small"
                          options={catalogoInstituciones}
                          getOptionLabel={(option) => option.Label || ""}
                          value={instituciones || "" || objetiInstitucion}
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
                          if (widthCondition()) {
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
                      onClick={() => {
                        localStorage.setItem("IdNotificacion", "");
                        buscador(
                          estadomir,
                          instituciones?.Label,
                          setMirs,
                          "list-mir",
                          setUrl,
                        );
                      }}
                    >
                      <SearchIcon sx={{ fontSize: [20, 20, 20, 25, 25] }}/>
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
                      aria-label="Buscar"
                      onClick={() => filtrarDatos()}
                    >
                      <SearchIcon sx={{ fontSize: [25, 25, 30, 30, 30] }} />
                    </IconButton>
                  </Paper>
                </Grid>

                <Grid item xl={3} lg={3} md={4} sm={4} xs={4}>
                  <Button
                    disabled={!validaFecha}
                    className="aceptar"
                    sx={{
                      width: ["100px", "120px", "160px", "180px", "250px"],
                      height: ["40px", "40px", "40px", "40px", "50px"],
                      fontFamily: "MontserratMedium",
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
                          {TableCellFormat(row.AnioFiscal)}
                          {TableCellFormat(row.Entidad.toUpperCase())}
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
                          {TableCellFormat(row.CreadoPor.toUpperCase())}
                          {TableCellFormat( 
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
                                        fontSize: [20, 20, 20, 25, 25],
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
                                      sx={{ fontSize: [20, 20, 20, 25, 25] }}
                                    />
                                  </IconButton>
                                </span>
                              </Tooltip>
                              <MostrarLista st="" Id={row.Id} />
                            </Grid>)}

                        </TableRow>
                      ))}

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


