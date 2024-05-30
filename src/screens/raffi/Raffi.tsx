import {
  Autocomplete,
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
  TextField,
  Tooltip,
  useMediaQuery,
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
import { MostrarLista } from "../../components/genericComponents/ModalTrazabilidad";
import { GridColDef } from "@mui/x-data-grid";
import DataGridTable from "../../components/genericComponents/DataGridTable";
import { TableCellFormat, widthCondition } from "../../components/genericComponents/GenericMethods";

export const Raffi = () => {
  const [actionNumber, setActionNumber] = useState(0);

  const [opentabs, setOpenTabs] = useState(true);

  const [rf, setRf] = useState<Array<IRaffi>>([]);
  const [rfFiltered, setRfFiltered] = useState<Array<IRaffi>>([]);
  const [rfxFiltered, setRfxFiltered] = useState<Array<IRaffi>>([]);
  const [rfEdit, setRfEdit] = useState<Array<IRaffi>>([]);

  const [validaFecha, setValidaFecha] = useState(true);

  const [findTextStr, setFindTextStr] = useState("");
  const [findInstStr, setFindInstStr] = useState("TODOS");
  const [findSelectStr, setFindSelectStr] = useState("TODOS");
  const renglonesPagina = 7;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [page, setPage] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [rowsPerPage, setRowsPerPage] = useState(renglonesPagina);

  const [estadorf, setEstadoRF] = useState("TODOS");
  const [estado, setEstado] = useState("");
  const [IdEntidad, setIdEntidad] = useState("");

  const [institucionesb, setInstitucionesb] = useState("TODOS");

  const objetiInstitucion: IEntidad = {
    //ClaveSiregob: null,
    //ControlInterno: "",
    Id: "0",
    Nombre: "TODOS",
    NombreTipoEntidad: "",
    EntidadPerteneceA: "",
    Direccion: "",
    Telefono: "",
    IdEntidadPerteneceA: "",
    IdTipoEntidad: "",
    FechaCreacion: "",
    CreadoPor: "",
    UltimaActualizacion: "",
    ModificadoPor: "",
    Titular: "",
  };

  const [instituciones, setInstituciones] = useState<IEntidad>();
  const [catalogoInstituciones, setCatalogoInstituciones] = useState<
    Array<IEntidad>
  >([]);

  useEffect(() => {
    if (opentabs) {
      listaRaffi(setRf, estadorf, setUrl);
      validaFechaCaptura();
      setOpenTabs(true);
    }
  }, [opentabs]);

  useEffect(() => {
    setRfFiltered(rf);
    setEstadoRF("TODOS");
  }, [rf]);

  useEffect(() => {
    getListadoRF()
  }, []);
  

  useEffect(() => {
    setRfxFiltered(rfFiltered);
  }, [rfFiltered]);

  const returnMain = () => {
    getListadoRF()
    setOpenTabs(true);
    setActionNumber(1);
  };

  const findText = (v: string, est: string, inst: string) => {
    if (
      v !== "" &&
      est !== "0" &&
      est !== "TODOS" &&
      inst !== "0" &&
      inst !== "TODOS"
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
      ((est !== "0" && est !== "TODOS") || (inst !== "0" && inst !== "TODOS"))
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
      (est === "0" || est === "TODOS") &&
      (inst === "0" || inst === "TODOS")
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
      est !== "TODOS" &&
      inst !== "0" &&
      inst !== "TODOS"
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
      ((est !== "0" && est !== "TODOS") || (inst !== "0" && inst !== "TODOS"))
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
    getInstituciones(setCatalogoInstituciones);
  }, []);

  const handleChange = (dato: string) => {
    setFindTextStr(dato);
  };

  const filtrarDatos = () => {
    // eslint-disable-next-line array-callback-return

    getListadoRF().then(() => {

    let Arrayfiltro: IRaffi[];
    Arrayfiltro = [];
    Arrayfiltro = rfxFiltered;
  
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
  });
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

  const [url, setUrl] = useState(window.location.href);

  
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  const columsRf: GridColDef[] = [
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

            {v.row.Estado !== ("Sin Asignar" || "SIN ASIGNAR") && (
              <Tooltip title="EDITAR">
                <IconButton
                  disabled={
                    (v.row.Estado === "En Captura" &&
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
                      : true || !validaFecha
                  }
                  type="button"
                  onClick={() => {
                    let auxArrayMIR = JSON.parse(v.row.MIR);
                    let auxArrayMIR2 = JSON.stringify(auxArrayMIR[0]);

                    if (auxArrayMIR[1]) {
                      setRfEdit([
                        {
                          IdRaffi: v.row.IdRaffi,
                          IdMir: v.row.IdMir,
                          IdMetaAnual: v.row.IdMetaAnual,
                          IdEntidad: v.row.IdEntidad,
                          RAFFI: v.row.RAFFI,
                          Estado: v.row.Estado,
                          CreadoPor: v.row.CreadoPor,
                          FechaCreacion: v.row.FechaCreacion,
                          ModificadoPor: v.row.ModificadoPor,
                          AnioFiscal: v.row.AnioFiscal,
                          Entidad: v.row.Entidad,
                          Programa: v.row.Programa,
                          MIR: auxArrayMIR2,
                          //Array.isArray(row.MIR) ? row.MIR[0] : row.MIR,

                          MetaAnual: v.row.MetaAnual,
                          Conac: v.row.Conac,
                          Consecutivo: v.row.Consecutivo,
                          Opciones: v.row.Opciones,
                        },
                      ]);
                    } else {
                      setRfEdit([
                        {
                          IdRaffi: v.row.IdRaffi,
                          IdMir: v.row.IdMir,
                          IdMetaAnual: v.row.IdMetaAnual,
                          IdEntidad: v.row.IdEntidad,
                          RAFFI: v.row.RAFFI,
                          Estado: v.row.Estado,
                          CreadoPor: v.row.CreadoPor,
                          FechaCreacion: v.row.FechaCreacion,
                          ModificadoPor: v.row.ModificadoPor,
                          AnioFiscal: v.row.AnioFiscal,
                          Entidad: v.row.Entidad,
                          Programa: v.row.Programa,
                          MIR:
                            //Array.isArray(row.MIR) ? row.MIR[0] : row.MIR,
                            v.row.MIR,
                          MetaAnual: v.row.MetaAnual,
                          Conac: v.row.Conac,
                          Consecutivo: v.row.Consecutivo,
                          Opciones: v.row.Opciones,
                        },
                      ]);
                    }
                    setEstado(v.row.Estado);
                    setIdEntidad(v.row.IdEntidad);
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
                  {v.row.Opciones}
                </IconButton>
              </Tooltip>
            )}

            {v.row.Estado === ("Sin Asignar" || "SIN ASIGNAR") && (
              <Tooltip title="REGISTRAR RAFFI">
                <IconButton
                  type="button"
                  onClick={() => {
                    let auxArrayMIR = JSON.parse(v.row.MIR);
                    let auxArrayMIR2 = JSON.stringify(auxArrayMIR[0]);
                    if (auxArrayMIR[1]) {
                      setRfEdit([
                        {
                          IdRaffi: v.row.IdRaffi,
                          IdMir: v.row.IdMir,
                          IdMetaAnual: v.row.IdMetaAnual,
                          IdEntidad: v.row.IdEntidad,
                          RAFFI: v.row.RAFFI,
                          Estado: v.row.Estado,
                          CreadoPor: v.row.CreadoPor,
                          FechaCreacion: v.row.FechaCreacion,
                          ModificadoPor: v.row.ModificadoPor,
                          AnioFiscal: v.row.AnioFiscal,
                          Entidad: v.row.Entidad,
                          Programa: v.row.Programa,
                          MIR: auxArrayMIR2,
                          //Array.isArray(row.MIR) ? row.MIR[0] : row.MIR,

                          MetaAnual: v.row.MetaAnual,
                          Conac: v.row.Conac,
                          Consecutivo: v.row.Consecutivo,
                          Opciones: v.row.Opciones,
                        },
                      ]);
                    } else {
                      setRfEdit([
                        {
                          IdRaffi: v.row.IdRaffi,
                          IdMir: v.row.IdMir,
                          IdMetaAnual: v.row.IdMetaAnual,
                          IdEntidad: v.row.IdEntidad,
                          RAFFI: v.row.RAFFI,
                          Estado: v.row.Estado,
                          CreadoPor: v.row.CreadoPor,
                          FechaCreacion: v.row.FechaCreacion,
                          ModificadoPor: v.row.ModificadoPor,
                          AnioFiscal: v.row.AnioFiscal,
                          Entidad: v.row.Entidad,
                          Programa: v.row.Programa,
                          MIR:
                            //Array.isArray(row.MIR) ? row.MIR[0] : row.MIR,
                            v.row.MIR,
                          MetaAnual: v.row.MetaAnual,
                          Conac: v.row.Conac,
                          Consecutivo: v.row.Consecutivo,
                          Opciones: v.row.Opciones,
                        },
                      ]);
                    }
                    setEstado(v.row.Estado);
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
                  {v.row.Opciones}
                </IconButton>
              </Tooltip>
            )}

            <Tooltip title="DESCARGAR">
              <span>
                <IconButton
                  onClick={() => {
                    let auxArrayMIR = JSON.parse(v.row.MIR);
                    let auxArrayMIR2 = JSON.stringify(auxArrayMIR[0]);
                    if (auxArrayMIR[1]) {
                      getFichaRaffiDownload(
                        auxArrayMIR2,
                        v.row.MetaAnual,
                        v.row.RAFFI,
                        v.row.Programa,
                        v.row.FechaCreacion,
                        v.row.Entidad
                      );
                    } else {
                      getFichaRaffiDownload(
                        v.row.MIR,
                        v.row.MetaAnual,
                        v.row.RAFFI,
                        v.row.Programa,
                        v.row.FechaCreacion,
                        v.row.Entidad
                      );
                    }
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

            <ComentDialogRF
              estado={v.row.Estado}
              id={v.row.IdMir}
              MIR={rfEdit[0]?.MIR || ""}
              IdEntidad={v.row.IdEntidad}
            />

            <MostrarLista st="" Id={v.row.IdRaffi} />
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

 

  const getListadoRF = () => {
    return new Promise((resolve, reject) => {
    buscador(
      estadorf,
      localStorage.getItem("Rol")?.toUpperCase() === "ADMINISTRADOR"
        ? "TODOS"
        : localStorage.getItem("IdEntidad"),
      setRf,
      "list-raffis",
   
    );
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
        <LateralMenu
          selection={"RAFFI"}
          actionNumber={actionNumber}
          restore={setOpenTabs}
          fnc={getListadoRF}
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
          justifyContent: "center",
          display: "flex",
          height: "93vh",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        {opentabs ? (
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
                        getOptionLabel={(option) => option.Nombre || ""}
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
                              <p style={{ fontFamily: "MontserratRegular" }}>
                                {option.Nombre}
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
                          />
                        )}
                        onChange={(event, value) =>
                          setInstituciones(value || objetiInstitucion)
                        }
                        isOptionEqualToValue={(option, value) =>
                          option.Id === value.Id
                        }
                      />
                    </FormControl>
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
                          ? estadorf.toUpperCase()
                          : findSelectStr.toUpperCase()) || estados[0]
                      }
                      options={estados}
                      onChange={(event, newValue) => {
                        // Access the value using newValue

                        if (
                          localStorage.getItem("Rol") === "Administrador" ||
                          localStorage.getItem("Rol") === "ADMINISTRADOR"
                        ) {
                          setEstadoRF(newValue || "");
                        } else {
                          setFindSelectStr(newValue || "");
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={"FILTRO POR ESTADO DE LA RF"}
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

                {localStorage.getItem("Rol") === "Administrador" && (
                  <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                    <IconButton
                      // disabled ={estadoma === "TODOS" && institucionesb === "TODOS" }
                      onClick={() => {
                        buscador(
                          estadorf,
                          institucionesb,
                          setRf,
                          "list-raffis",
                          
                        );
                      }}
                    >
                      <SearchIcon sx={{ fontSize: [20, 20, 20, 25, 25] }} />
                    </IconButton>
                  </Grid>
                )}
              </Grid>

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
                    <SearchIcon sx={{ fontSize: [20, 20, 20, 25, 25] }} />
                  </IconButton>
                </Paper>
              </Grid>
            </Grid>
            {/* TABLA */}
            <Grid
              container
              item
              xl={11}
              lg={11}
              md={11}
              sm={11}
              xs={11}
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
                            {TableCellFormat(row.AnioFiscal)}
                            {TableCellFormat(row.Entidad?.toUpperCase())}
                            {TableCellFormat(row.Programa?.toUpperCase())}

                            {TableCellFormat(
                              (row.Estado === "En Captura" &&
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
                              ).toUpperCase()
                            )}

                            {TableCellFormat(
                              moment(row.FechaCreacion, moment.ISO_8601)
                                .format("DD/MM/YYYY HH:mm:SS")
                                .toString()
                            )}

                            {TableCellFormat(
                              row.Estado === "SIN ASIGNAR" || "Sin Asignar"
                                ? "SIN ASIGNAR"
                                :  row.CreadoPor?.toUpperCase() || ""
                            )}

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
                                            IdEntidad: row.IdEntidad,
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
                                        setIdEntidad(row.IdEntidad);
                                      } else {
                                        setRfEdit([
                                          {
                                            IdRaffi: row.IdRaffi,
                                            IdMir: row.IdMir,
                                            IdMetaAnual: row.IdMetaAnual,
                                            IdEntidad: row.IdEntidad,
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
                                      setIdEntidad(row.IdEntidad);
                                      console.log("row.Estado; ",row.Estado)
                                      console.log("row.IdEntidad; ",row.IdEntidad)
                                      setOpenTabs(false);
                                      setActionNumber(1); //Revisar esta funcionalidad
                                    }}
                                  >
                                    <EditIcon
                                      sx={{ fontSize: [20, 20, 20, 25, 25] }}
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
                                            IdEntidad: row.IdEntidad,
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
                                        setIdEntidad(row.IdEntidad);
                                      } else {
                                        setRfEdit([
                                          {
                                            IdRaffi: row.IdRaffi,
                                            IdMir: row.IdMir,
                                            IdMetaAnual: row.IdMetaAnual,
                                            IdEntidad: row.IdEntidad,
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
                                      setIdEntidad(row.IdEntidad);
                                      setEstado(row.Estado);
                                      
                                      console.log("row.Estado; ",row.Estado)
                                      console.log("row.IdEntidad; ",row.IdEntidad)
                                      setOpenTabs(false);
                                      setActionNumber(1); //Revisar esta funcionalidad
                                    }}
                                  >
                                    <AddCircleOutlineIcon
                                      sx={{ fontSize: [20, 20, 20, 25, 25] }}
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
                                      sx={{ fontSize: [20, 20, 20, 25, 25] }}
                                    />
                                  </IconButton>
                                </span>
                              </Tooltip>

                              <ComentDialogRF
                                estado={row.Estado}
                                id={row.IdMir}
                                MIR={rfEdit[0]?.MIR || ""}
                                IdEntidad={row.IdEntidad}
                              />
                              <MostrarLista st="" Id={row.IdRaffi} />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* <DataGridTable
                id={(row: any) => row.IdRaffi || Math.random}
                columns={columsRf}
                rows={rfxFiltered}
                camposCsv={[]}
                exportTitle={"Columnas"}
              /> */}
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
              IdEntidad={IdEntidad}
            />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export interface IRaffi {
  IdRaffi: string;
  IdMir: string;
  IdMetaAnual: string;
  IdEntidad: string;
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
