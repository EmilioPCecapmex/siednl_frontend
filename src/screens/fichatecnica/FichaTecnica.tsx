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
  Button,
  InputBase,
  TableSortLabel,
  Autocomplete,
  TextField,
  useMediaQuery,
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
import { queries } from "../../queries";
import { IEntidad } from "../../components/appsDialog/AppsDialog";
import { buscador } from "../../services/servicesGlobals";
import { estados, heads } from "../../services/validations";
import { MostrarLista } from "../../components/tabsMir/services mir/modalMIR";
import { GridColDef } from "@mui/x-data-grid";
import DataGridTable from "../../components/genericComponents/DataGridTable";
import { alertaError } from "../../components/genericComponents/Alertas";
export let resumeDefaultFT = true;
export let setResumeDefaultFT = () => {
  resumeDefaultFT = !resumeDefaultFT;
};

export const FichaTecnica = () => {
  const getFT = (setstate: Function, estado: any) => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/list-fichaTecnica", {
        params: {
          IdUsuario: localStorage.getItem("IdUsuario"),
          IdEntidad: localStorage.getItem("IdEntidad"),
          Rol: localStorage.getItem("Rol"),
          Estado: estado || "TODOS",
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        //setft(r.data.data)
        if (r.data.data.length === 0) {
          alertaError("El DOCUMENTO NO ESTA DISPONIBLE O NO HAY DOCUMENTOS PARA LLENAR")
          
        }else{
          
          setstate(r.data.data);
        }
        
        //setFtFiltered(r.data.data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    setShowResume(true);
  }, []);

  const returnMain = () => {
    setShowResume(true);
    getFT(setft, estadoft);
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
  const [findInstStr, setFindInstStr] = useState("TODOS");
  const [findSelectStr, setFindSelectStr] = useState("TODOS");

  const [ft, setft] = useState<Array<IIFT>>([]);
  const [FTEdit, setFTEdit] = useState<Array<IIFT>>([]);
  const [FTShow, setFTShow] = useState<Array<IIFT>>([]);
  const [ftxFiltered, setFtxFiltered] = useState<Array<IIFT>>([]);
  const [ftFiltered, setFtFiltered] = useState<Array<IIFT>>([]);

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

  const [estadoft, setEstadoFT] = useState("TODOS");
  const [IdEntidad, setIdEntidad] = useState("TODOS");
  const [institucionesb, setInstitucionesb] = useState("TODOS");

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
            Id: "0",
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
    getFT(setft, estadoft);
    validaFechaCaptura();
  }, [showResume]);

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
      .post(process.env.REACT_APP_APPLICATION_FILL + "/api/fill_ft", fullft, {
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
    getInstituciones(setCatalogoInstituciones);
  }, []);
  ///////////
  // Filtrado por caracter
  const findText = (v: string, est: string, inst: string) => {
    if (
      v !== "" &&
      est !== "0" &&
      est !== "TODOS" &&
      inst !== "0" &&
      inst !== "TODOS"
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
      ((est !== "0" && est !== "TODOS") || (inst !== "0" && inst !== "TODOS"))
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
      (est === "0" || est === "TODOS") &&
      (inst === "0" || inst === "TODOS")
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
      est !== "TODOS" &&
      inst !== "0" &&
      inst !== "TODOS"
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
      ((est !== "0" && est !== "TODOS") || (inst !== "0" && inst !== "TODOS"))
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
    const url = window.location.href;

    // Verificar si el parámetro 'Id' está presente en la URL
    if (url.includes("?Id=")) {
      const id = url.split("?")[1].split("=")[1];

      // Verificar si 'id' no es undefined o null antes de incluirlo en la comparación
      if (id) {
        setFtFiltered(ft.filter((x) => x.IdFt.includes(id || "")));
      }
    }
  }, [ft]);

  useEffect(() => {
    getFT(setft, estadoft);
  }, [actualizacion]);

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

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    findTextStr.length !== 0 ? setFtFiltered(ftFiltered) : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [findTextStr]);

  const [estado, setEstado] = useState("");

  const columsFt: GridColDef[] = [
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

            <Tooltip title="Descargar FT">
              <span>
                <IconButton
                  onClick={() => {
                    getFichaTecnicaDownload(
                      v.row.MIR,
                      v.row.MetaAnual,
                      v.row.FichaT,
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

            <Tooltip title="REGISTRAR FICHA TÉCNICA">
              <span>
                <IconButton
                  disabled={
                    (v.row.Estado === "En Captura" &&
                      //validaFecha &&
                      localStorage.getItem("Rol") === "Capturador") ||
                    (v.row.Estado === "En Revisión" &&
                      //validaFecha &&
                      localStorage.getItem("Rol") === "Verificador") ||
                    (v.row.Estado === "Borrador Verificador" &&
                      //validaFecha &&
                      localStorage.getItem("Rol") === "Verificador") ||
                    ((v.row.Estado === "En Autorización" ||
                      v.row.Estado === "Autorizada") &&
                      // validaFecha &&
                      localStorage.getItem("Rol") === "Administrador") ||
                    (v.row.Estado === "Borrador Autorizador" &&
                      // validaFecha &&
                      localStorage.getItem("Rol") === "Administrador")
                      ? false
                      : true
                  }
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
                  onClick={() => {
                    let auxArrayMIR = JSON.parse(v.row.MIR);
                    let auxArrayMIR2 = JSON.stringify(auxArrayMIR[0]);

                    if (auxArrayMIR[1]) {
                      setFTEdit([
                        {
                          IdFt: v.row.IdFt,
                          IdMir: v.row.IdMir,
                          IdMa: v.row.IdMa,
                          IdEntidad: v.row.IdEntidad,
                          FichaT: v.row.FichaT,
                          Estado: v.row.Estado,
                          CreadoPor: v.row.CreadoPor,
                          FechaCreacion: v.row.FechaCreacion,
                          AnioFiscal: v.row.AnioFiscal,
                          Entidad: v.row.Entidad,
                          Programa: v.row.Programa,
                          MIR: auxArrayMIR2,
                          MetaAnual: v.row.MetaAnual,
                          Conac: v.row.Conac,
                          Consecutivo: v.row.Consecutivo,
                          Opciones: v.row.Opciones,
                        },
                      ]);
                    } else {
                      setFTEdit([
                        {
                          IdFt: v.row.IdFt,
                          IdMir: v.row.IdMir,
                          IdMa: v.row.IdMa,
                          IdEntidad: v.row.IdEntidad,
                          FichaT: v.row.FichaT,
                          Estado: v.row.Estado,
                          CreadoPor: v.row.CreadoPor,
                          FechaCreacion: v.row.FechaCreacion,
                          AnioFiscal: v.row.AnioFiscal,
                          Entidad: v.row.Entidad,
                          Programa: v.row.Programa,
                          MIR: v.row.MIR,
                          MetaAnual: v.row.MetaAnual,
                          Conac: v.row.Conac,
                          Consecutivo: v.row.Consecutivo,
                          Opciones: v.row.Opciones,
                        },
                      ]);
                    }
                    setShowResume(false);
                    setActionNumber(1);
                    setEstado(v.row.Estado);
                    setIdEntidad(v.row.IdEntidad);
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

            <Tooltip title={title_texto}>
              <span>
                <IconButton
                  disabled={
                    v.row.Estado === "Autorizada" && validaFecha ? false : true
                  }
                  onClick={() => {
                    let auxArrayMIR = JSON.parse(v.row.MIR);
                    let auxArrayMIR2 = JSON.stringify(auxArrayMIR[0]);
                    if (auxArrayMIR[1]) {
                      setFTShow([
                        {
                          IdFt: v.row.IdFt,
                          IdMir: v.row.IdMir,
                          IdMa: v.row.IdMa,
                          IdEntidad: v.row.IdEntidad,
                          FichaT: v.row.FichaT,
                          Estado: v.row.Estado,
                          CreadoPor: v.row.CreadoPor,
                          FechaCreacion: v.row.FechaCreacion,
                          AnioFiscal: v.row.AnioFiscal,
                          Entidad: v.row.Entidad,
                          Programa: v.row.Programa,
                          MIR: auxArrayMIR2,
                          MetaAnual: v.row.MetaAnual,
                          Conac: v.row.Conac,
                          Consecutivo: v.row.Consecutivo,
                          Opciones: v.row.Opciones,
                        },
                      ]);
                    } else {
                      setFTShow([
                        {
                          IdFt: v.row.IdFt,
                          IdMir: v.row.IdMir,
                          IdMa: v.row.IdMa,
                          IdEntidad: v.row.IdEntidad,
                          FichaT: v.row.FichaT,
                          Estado: v.row.Estado,
                          CreadoPor: v.row.CreadoPor,
                          FechaCreacion: v.row.FechaCreacion,
                          AnioFiscal: v.row.AnioFiscal,
                          Entidad: v.row.Entidad,
                          Programa: v.row.Programa,
                          MIR: auxArrayMIR2,
                          MetaAnual: v.row.MetaAnual,
                          Conac: v.row.Conac,
                          Consecutivo: v.row.Consecutivo,
                          Opciones: v.row.Opciones,
                        },
                      ]);
                    }
                    setOpenModalVerResumenFT(true);
                  }}
                >
                  <VisibilityIcon
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

            <ComentDialogFT
              estado={v.row.Estado}
              id={v.row.IdMir}
              actualizado={actualizaContador}
              MIR={FTEdit[0]?.MIR || ""}
              IdEntidad={IdEntidad}
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
                  //display: "flex",
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
                                <p
                                  style={{
                                    fontFamily: "MontserratRegular",
                                  }}
                                >
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
                          ? estadoft.toUpperCase()
                          : findSelectStr.toUpperCase()) || estados[0]
                      }
                      options={estados}
                      onChange={(event, newValue) => {
                        // Access the value using newValue

                        if (
                          localStorage.getItem("Rol") === "Administrador" ||
                          localStorage.getItem("Rol") === "ADMINISTRADOR"
                        ) {
                          setEstadoFT(newValue || "");
                        } else {
                          setFindSelectStr(newValue || "");
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={"FILTRO POR ESTADO DE LA FT"}
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
                          estadoft,
                          institucionesb,
                          setft,
                          "list-fichaTecnica"
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
                sm={12}
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
              {/* <TableContainer
                sx={{
                  borderRadius: 5,
                  height: "90%",
                  overflow: "auto",
                  "&::-webkit-scrollbar": {
                    width: ".5vw",
                    //mt: 1,
                  },
                  "&::-webkit-scrollbar-thumb": {
                    //backgroundColor: "red",
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
                                      let auxArrayMIR = JSON.parse(row.MIR);
                                      let auxArrayMIR2 = JSON.stringify(
                                        auxArrayMIR[0]
                                      );

                                      if (auxArrayMIR[1]) {
                                        setFTEdit([
                                          {
                                            IdFt: row.IdFt,
                                            IdMir: row.IdMir,
                                            IdMa: row.IdMa,
                                            IdEntidad: row.IdEntidad,
                                            FichaT: row.FichaT,
                                            Estado: row.Estado,
                                            CreadoPor: row.CreadoPor,
                                            FechaCreacion: row.FechaCreacion,
                                            AnioFiscal: row.AnioFiscal,
                                            Entidad: row.Entidad,
                                            Programa: row.Programa,
                                            MIR: auxArrayMIR2,
                                            MetaAnual: row.MetaAnual,
                                            Conac: row.Conac,
                                            Consecutivo: row.Consecutivo,
                                            Opciones: row.Opciones,
                                          },
                                        ]);
                                      } else {
                                        setFTEdit([
                                          {
                                            IdFt: row.IdFt,
                                            IdMir: row.IdMir,
                                            IdMa: row.IdMa,
                                            IdEntidad: row.IdEntidad,
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
                                      }
                                      setShowResume(false);
                                      setActionNumber(1);
                                      setEstado(row.Estado);
                                      setIdEntidad(row.IdEntidad);
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
                                      let auxArrayMIR = JSON.parse(row.MIR);
                                      let auxArrayMIR2 = JSON.stringify(
                                        auxArrayMIR[0]
                                      );
                                      if (auxArrayMIR[1]) {
                                        setFTShow([
                                          {
                                            IdFt: row.IdFt,
                                            IdMir: row.IdMir,
                                            IdMa: row.IdMa,
                                            IdEntidad: row.IdEntidad,
                                            FichaT: row.FichaT,
                                            Estado: row.Estado,
                                            CreadoPor: row.CreadoPor,
                                            FechaCreacion: row.FechaCreacion,
                                            AnioFiscal: row.AnioFiscal,
                                            Entidad: row.Entidad,
                                            Programa: row.Programa,
                                            MIR: auxArrayMIR2,
                                            MetaAnual: row.MetaAnual,
                                            Conac: row.Conac,
                                            Consecutivo: row.Consecutivo,
                                            Opciones: row.Opciones,
                                          },
                                        ]);
                                      } else {
                                        setFTShow([
                                          {
                                            IdFt: row.IdFt,
                                            IdMir: row.IdMir,
                                            IdMa: row.IdMa,
                                            IdEntidad: row.IdEntidad,
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
                                      }
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
                                MIR={FTEdit[0]?.MIR || ""}
                                IdEntidad={IdEntidad}
                              />

                              <MostrarLista st="" Id={row.IdFt} />
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
              </Grid> */}
            <DataGridTable
                id={(row: any) => row.IdFt || Math.random}
                columns={columsFt}
                rows={ftFiltered}
                camposCsv={[]}
                exportTitle={"Columnas"}
              />


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
              MIR={FTEdit[0]?.MIR || ""}
              MA={FTEdit[0]?.MetaAnual || ""}
              FT={FTEdit[0]?.FichaT || ""}
              showResume={returnMain}
              IdMir={FTEdit[0]?.IdMir || ""}
              IdMA={FTEdit[0]?.IdMa || ""}
              IdFT={FTEdit[0]?.IdFt || ""}
              estado={estado}
              IdEntidad={IdEntidad}
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
  IdEntidad: string;
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
