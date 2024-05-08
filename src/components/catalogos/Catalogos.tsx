import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Grid,
  Hidden,
  IconButton,
  List,
  ListItemButton,
  ToggleButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { ButtonAdd } from "../genericComponents/AddButton";
import DataGridTable from "../genericComponents/DataGridTable";
import AddDialogCatalogo from "./AddDialogCatalogo";
import { DescargarExcel, listaGenericaCatalogos } from "./AxiosCatalogo";
import DeleteDialogCatalogos from "./DeleteDialogCatalogos";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import CloseIcon from "@mui/icons-material/Close";

import {
  configOptions,
  newBeneficiario,
  newCatalogo,
  newFecha,
  newPed,
  newProgramas,
  newProgramasPresupuestario,
} from "./ExportsCatalogos";
import {
  IObjetoBeneficiario,
  IObjetoCatalogo,
  IObjetoFechaDeCaptura,
  IObjetoPed,
  IObjetoProgramasInstitucionales,
  IObjetoProgramasPresupuestarios,
} from "./InterfacesCatalogos";
import ModifyDialogCatalogos from "./ModifyDialogCatalogo";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export const Catalogos = ({ defSelected }: { defSelected: string }) => {
  const [opcionCatalogo, setOpcionCatalogo] = useState(defSelected);

  const columsCatalogo: GridColDef[] = [
    {
      field: "Acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "Acciones",
      sortable: false,
      flex: 1,
      renderCell: (v: any) => {
        return (
          <Grid>
            <Tooltip title="Eliminar descripcion">
              <IconButton
                onClick={() => {
                  setCatalogoSelected(v.row);

                  setOpenDel(true);
                  //eliminar(v)
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Editar descripcion">
              <IconButton
                onClick={() => {
                  setCatalogoSelected(v.row);
                  setOpenMody(true);
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        );
      },
    },
    {
      field: "descripcion",
      headerName: "Descripcion",
      description: "Descripcion",
      flex: 5,
    },
  ];

  const columsFechaDeCaptura: GridColDef[] = [
    {
      field: "Acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "Acciones",
      sortable: false,
      flex: 1,
      renderCell: (v: any) => {
        return (
          <Grid>
            <Tooltip title="Eliminar descripcion">
              <IconButton
                onClick={() => {
                  setFechaDeCapturaSelected(v.row);
                  setOpenDel(true);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        );
      },
    },
    {
      field: "descripcion",
      headerName: "Descripcion",
      description: "Descripcion",
      flex: 2,
    },

    {
      field: "fechaCapturaInicio",
      headerName: "FechaCapturaInicio",
      description: "FechaCapturaInicio",
      flex: 2,
    },
    {
      field: "fechaCapturaFinal",
      headerName: "FechaCapturaFinal",
      description: "FechaCapturaFinal",
      flex: 2,
    },
  ];

  const columsProgramasInstituciones: GridColDef[] = [
    {
      field: "Acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "Acciones",
      sortable: false,
      flex: 1,
      renderCell: (v: any) => {
        return (
          <Grid>
            <Tooltip title="Editar descripcion">
              <IconButton
                onClick={() => {
                  setProgramasISelected(v.row);
                  setOpenDel(true);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        );
      },
    },
    {
      field: "Nombre",
      headerName: "Nombre",
      description: "Nombre",
      flex: 2,
    },

    {
      field: "NombrePrograma",
      headerName: "Nombre Programa",
      description: "Nombre Programa",
      flex: 2,
    },
  ];

  const columsPed: GridColDef[] = [
    {
      field: "Acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "Acciones",
      sortable: false,
      flex: 1,
      renderCell: (v: any) => {
        return (
          <Grid>
            <Tooltip title="Editar descripcion">
              <IconButton
                onClick={() => {
                  return (
                    <Grid>
                      <Tooltip title="Editar descripcion">
                        <IconButton
                          onClick={() => {
                            setPedSelected(v.row);
                            setOpenDel(true);
                            //eliminar(v)
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  );
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        );
      },
    },
    {
      field: "Eje",
      headerName: "Eje",
      description: "Eje",
      flex: 1,
    },

    {
      field: "EjePND",
      headerName: "EjePND",
      description: "EjePND",
      flex: 1,
    },

    {
      field: "Estrategia",
      headerName: "Estrategia",
      description: "Estrategia",
      flex: 1,
    },

    {
      field: "LineaDeAccion",
      headerName: "Lineas de Accion",
      description: "Lineas de Accion",
      flex: 1,
    },

    {
      field: "MetaODS",
      headerName: "Metas ODS",
      description: "Metas ODS",
      flex: 1,
    },
    {
      field: "Objetivo",
      headerName: "Objetivo",
      description: "Objetivo",
      flex: 1,
    },
    {
      field: "ObjetivoDS",
      headerName: "ObjetivoDS",
      description: "ObjetivoDS",
      flex: 1,
    },
    {
      field: "ObjetivoPEENL",
      headerName: "ObjetivoPEENL",
      description: "ObjetivoPEENL",
      flex: 1,
    },
    {
      field: "Tematica",
      headerName: "Tematica",
      description: "Tematica",
      flex: 1,
    },
  ];

  const columsBeneficiario: GridColDef[] = [
    {
      field: "Acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "Acciones",
      sortable: false,
      flex: 1,
      renderCell: (v: any) => {
        return (
          <Grid>
            <Tooltip title="Eliminar descripcion">
              <IconButton
                onClick={() => {
                  setBeneficiarioSelected(v.row);
                  setOpenDel(true);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        );
      },
    },
    {
      field: "descripcion",
      headerName: "Descripcion",
      description: "Descripcion",
      flex: 5,
    },
    {
      field: "Idb",
      headerName: "Id Beneficiario",
      description: "Id Beneficiario",
      flex: 2,
    },
    {
      field: "tipoBeneficiario",
      headerName: "Tipo Beneficiario",
      description: "Tipo Beneficiario",
      flex: 2,
    },
    {
      field: "tipo",
      headerName: "Tipo",
      description: "Tipo",
      flex: 2,
    },
  ];

  const columProgramaPresupuestario: GridColDef[] = [
    {
      field: "Acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "Acciones",
      sortable: false,
      flex: 1,
      renderCell: (v: any) => {
        return (
          <Grid>
            <Tooltip title="Eliminar descripcion">
              <IconButton
                onClick={() => {
                  setProgramasPresupuestariosISelected(v.row);
                  setOpenDel(true);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Editar descripcion">
              <IconButton
                onClick={() => {
                  setProgramasPresupuestariosISelected(v.row);
                  setOpenMody(true);
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        );
      },
    },

    {
      field: "descripcion",
      headerName: "Descripcion",
      description: "Descripcion",
      flex: 3,
    },
    {
      field: "conac",
      headerName: "CONAC",
      description: "CONAC",
      flex: 1,
    },
    {
      field: "consecutivo",
      headerName: "CONSECUTIVO",
      description: "CONSECUTIVO",
      flex: 1,
    },
    {
      field: "institucion",
      headerName: "INSTITUCION",
      description: "INSTITUCION",
      flex: 2,
    },
  ];

  const [objetoCatalogo, setObjetoCatalogo] = useState<Array<IObjetoCatalogo>>(
    []
  );
  const [objetoProgramasInstitucionales, setObjetoProgramasInstitucionales] =
    useState<Array<IObjetoProgramasInstitucionales>>([]);
  const [objetoPed, setObjetoPed] = useState<Array<IObjetoPed>>([]);
  const [objetoFechaDeCaptura, setObjetoFechaDeCaptura] = useState<
    Array<IObjetoFechaDeCaptura>
  >([]);
  const [objetoBeneficiario, setObjetoBeneficiario] = useState<
    Array<IObjetoBeneficiario>
  >([]);

  const [objetoProgamaPresupuestario, setObjetoProgamaPresupuestario] =
    useState<Array<IObjetoProgramasPresupuestarios>>([]);

  const [catalogoSelected, setCatalogoSelected] =
    useState<IObjetoCatalogo>(newCatalogo);

  const [programasISelected, setProgramasISelected] =
    useState<IObjetoProgramasInstitucionales>(newProgramas);

  const [pedSelected, setPedSelected] = useState<IObjetoPed>();

  const [fechaDeCapturaSelected, setFechaDeCapturaSelected] =
    useState<IObjetoFechaDeCaptura>(newFecha);

  const [beneficiarioSelected, setBeneficiarioSelected] =
    useState<IObjetoBeneficiario>(newBeneficiario);

  const [
    programasPresupuestariosISelected,
    setProgramasPresupuestariosISelected,
  ] = useState<IObjetoProgramasPresupuestarios>(newProgramasPresupuestario);

  const [openAdd, setOpenAdd] = useState(false);

  const [openDownload, setOpenDownload] = useState(false);

  const [openMody, setOpenMody] = useState(false);
  const [openDel, setOpenDel] = useState(false);

  const [openSM, setOpenSM] = useState(false);
  const [openSM2, setOpenSM2] = useState(false);

  const [actualizacion, setActualizacion] = useState(0);
  const [updata, setUpdata] = useState("");

  const handleClose = () => {
    UpdateInfo();
    setOpenAdd(false);
  };

  const handleCloseDownload = () => {
    setOpenDownload(false);
  };

  const handleCloseDel = () => {
    setOpenDel(false);
  };

  const handleCloseMody = () => {
    UpdateInfo();
    setOpenMody(false);
  };

  const actualizaContador = () => {
    setActualizacion(actualizacion + 1);
  };

  useEffect(() => {
    // Este código se ejecuta solo una vez al cargar el componente
    setUpdata(defSelected);

    UpdateInfo();
  }, []); // Dependencia vacía significa que se ejecuta solo una vez al montar el componente

  useEffect(() => {
    UpdateInfo();
  }, [updata]);

  // useEffect(() => {
  //   if(!isSmallScreen){
  //     setOpenSM(false)
  //   }
  // }, [openSM]);

  const UpdateInfo = () => {
    listaGenericaCatalogos(
      updata,
      updata === "PED"
        ? setObjetoPed
        : updata === "Programas - Instituciones"
        ? setObjetoProgramasInstitucionales
        : updata === "Fechas de Captura"
        ? setObjetoFechaDeCaptura
        : updata === "Beneficiarios"
        ? setObjetoBeneficiario
        : updata === "Programas Presupuestarios"
        ? setObjetoProgamaPresupuestario
        : setObjetoCatalogo
    );
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.up("md"));
  const isSmallScreen2 = useMediaQuery('(max-width:768px)');

  const opcionesCatalogo = () => {
    return (
      <>
        <Grid
          item
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          sx={{ display: "flex", overflow: "auto", height: "93vh" }}
        >
          <List sx={{}}>
            {configOptions.map((item) => {
              return (
                <ListItemButton
                  //className="aceptar"
                  sx={{
                    "&.Mui-selected": {
                      backgroundColor: "#af8c55",
                      color: item.Desc === opcionCatalogo ? "white" : "inherit",
                    },
                    "&.Mui-selected:hover": {
                      backgroundColor: "#af8c55",
                      color: item.Desc === opcionCatalogo ? "white" : "inherit",
                    },
                  }}
                  onClick={() => {
                    if (!isSmallScreen) {
                      setOpenSM(true);
                      setOpenSM2(false);
                    }
                    setObjetoPed([]);
                    setObjetoProgramasInstitucionales([]);
                    setObjetoCatalogo([]);
                    setObjetoFechaDeCaptura([]);
                    setObjetoBeneficiario([]);
                    setObjetoProgamaPresupuestario([]);
                    setCatalogoSelected(newCatalogo);
                    setProgramasISelected(newProgramas);
                    setPedSelected(newPed);
                    setFechaDeCapturaSelected(newFecha);
                    setBeneficiarioSelected(newBeneficiario);
                    setProgramasPresupuestariosISelected(
                      newProgramasPresupuestario
                    );
                    setOpcionCatalogo(item.Desc);
                    setUpdata(item.Desc);
                  }}
                  selected={item.Desc === opcionCatalogo}
                >
                  {item.Desc.toUpperCase()}
                </ListItemButton>
              );
            })}
          </List>
        </Grid>
      </>
    );
  };

  const listasCatalogs = () => {
    return (
<>
      <Grid
        item
        container
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        sx={{ display: "flex", height: "93vh" }}
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
            display: "flex",
            justifyContent: "flex-end",
            height: "10vh",
            alignItems: "center",
            // ...(isSmallScreen && {
            //   overflow: "auto",
            // Otros estilos específicos para pantallas pequeñas
            // }),
          }}
        >
          <Grid
            item
            xl={8}
            lg={8}
            md={12}
            sm={12}
            xs={12}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Tooltip title={opcionCatalogo}>
              <Typography
                fontFamily={"'Montserrat', sans-serif"}
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  textAlign: "center",
                  fontSize: [30, 30, 30, 30, 40], // Tamaños de fuente para diferentes breakpoints
                  color: "#AF8C55",
                }}
              >
                {opcionCatalogo}
              </Typography>
            </Tooltip>
          </Grid>

          <Grid
            item
            xl={2}
            lg={2}
            md={12}
            sm={12}
            xs={12}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Grid item sx={{ marginLeft: 1 }}>
              <Grid>
                <Tooltip title={"Descargar"}>
                  <ToggleButton
                    className="aceptar"
                    value="check"
                    onClick={() => {
                      DescargarExcel(
                        () => {},
                        opcionCatalogo.toUpperCase() === "BENEFICIARIOS"
                          ? objetoBeneficiario
                          : opcionCatalogo.toUpperCase() === "FECHAS DE CAPTURA"
                          ? objetoFechaDeCaptura
                          : opcionCatalogo.toUpperCase() === "PED"
                          ? objetoPed
                          : opcionCatalogo.toUpperCase() ===
                            "PROGRAMAS - INSTITUCIONES"
                          ? objetoProgramasInstitucionales
                          : opcionCatalogo.toUpperCase() ===
                            "PROGRAMAS PRESUPUESTARIOS"
                          ? objetoProgamaPresupuestario
                          : objetoCatalogo,
                        opcionCatalogo
                      );
                    }}
                  >
                    <ArrowCircleDownIcon />
                  </ToggleButton>
                </Tooltip>
              </Grid>
            </Grid>

            <Grid item sx={{ marginLeft: 1 }}>
              <ButtonAdd agregar={true} handleOpen={() => setOpenAdd(true)} />
            </Grid>

            {!isSmallScreen && (
              <Grid item sx={{ marginLeft: 1 }}>
                <Grid>
                  <Tooltip title={"CERRAR"}>
                    <ToggleButton
                      value="check"
                      className="cancelar"
                      onClick={() => {
                        setOpenSM2(true);
                        setOpenSM(false);
                      }}
                    >
                      <CloseIcon />
                    </ToggleButton>
                  </Tooltip>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>

        <Grid
          item
          container
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          // esto no tiene necesidad de modificarse 
          sx={{ display: "flex", height: ["70vh", "70vh", "70vh", "80vh","80vh"] }}
        >
          <DataGridTable
            id={(row: any) => row.Id || Math.random}
            columns={
              opcionCatalogo.toUpperCase() === "BENEFICIARIOS"
                ? columsBeneficiario
                : opcionCatalogo.toUpperCase() === "FECHAS DE CAPTURA"
                ? columsFechaDeCaptura
                : opcionCatalogo.toUpperCase() === "PED"
                ? columsPed
                : opcionCatalogo.toUpperCase() === "PROGRAMAS - INSTITUCIONES"
                ? columsProgramasInstituciones
                : opcionCatalogo.toUpperCase() === "PROGRAMAS PRESUPUESTARIOS"
                ? columProgramaPresupuestario
                : columsCatalogo
            }
            rows={
              opcionCatalogo.toUpperCase() === "BENEFICIARIOS"
                ? objetoBeneficiario
                : opcionCatalogo.toUpperCase() === "FECHAS DE CAPTURA"
                ? objetoFechaDeCaptura
                : opcionCatalogo.toUpperCase() === "PED"
                ? objetoPed
                : opcionCatalogo.toUpperCase() === "PROGRAMAS - INSTITUCIONES"
                ? objetoProgramasInstitucionales
                : opcionCatalogo.toUpperCase() === "PROGRAMAS PRESUPUESTARIOS"
                ? objetoProgamaPresupuestario
                : objetoCatalogo
            }
            camposCsv={[]}
            exportTitle={"Columnas"}
          />
        </Grid>
      </Grid>
      </>
    );
  };

  return (
    //Grid Padre con tamaño de la pantalla a usar
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
      sm={12}
      xs={12}
      
    >
      {/* Grid de la lista de configuracion */}
      <Grid
        container
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        justifyContent="center"
        alignItems={"center"}
        sx={{ display: "flex" }}
        // bgcolor={"red"}
      >
        <Grid
          item
          //  bgcolor={"blue"}
          xl={2}
          lg={2}
          md={2}
          sm={12}
          xs={12}
        >
          <Hidden mdDown implementation="css">
            {opcionesCatalogo()}
          </Hidden>

          <Hidden mdUp implementation="css">
            {openSM === false ? opcionesCatalogo() : listasCatalogs()}
          </Hidden>
        </Grid>

        <Grid
          item
          //   bgcolor={"red"}
          xl={10}
          lg={10}
          md={10}
          sm={12}
          xs={12}
        >
          <Hidden mdDown implementation="css">
            {listasCatalogs()}
          </Hidden>
        </Grid>
      </Grid>

      {openDel ? (
        <DeleteDialogCatalogos
          deleteText={
            catalogoSelected?.descripcion !== ""
              ? catalogoSelected?.descripcion
              : fechaDeCapturaSelected?.descripcion !== ""
              ? fechaDeCapturaSelected?.descripcion
              : beneficiarioSelected?.descripcion !== ""
              ? beneficiarioSelected?.descripcion
              : programasISelected?.NombrePrograma !== ""
              ? programasISelected?.NombrePrograma
              : programasPresupuestariosISelected?.descripcion !== ""
              ? programasPresupuestariosISelected?.descripcion
              : "Objeto Ped"
          }
          Id={
            catalogoSelected?.Id !== ""
              ? catalogoSelected?.Id
              : fechaDeCapturaSelected?.Id !== ""
              ? fechaDeCapturaSelected?.Id
              : beneficiarioSelected?.Id !== ""
              ? beneficiarioSelected?.Id
              : programasISelected?.Id !== ""
              ? programasISelected?.Id
              : programasPresupuestariosISelected?.Id !== ""
              ? programasPresupuestariosISelected?.Id
              : pedSelected?.Id || ""
          }
          tabla={opcionCatalogo || ""}
          actualizado={actualizaContador}
          open={openDel}
          handleCloseDel={handleCloseDel}
          UpdateInfo={UpdateInfo}
        />
      ) : null}

      {openAdd ? (
        <AddDialogCatalogo
          open={openAdd}
          handleClose={handleClose}
          catalogo={opcionCatalogo || ""}
          tabla={opcionCatalogo || ""}
          select={updata}
        />
      ) : null}

      {openMody ? (
        <ModifyDialogCatalogos
          descripcion={
            catalogoSelected?.descripcion !== ""
              ? catalogoSelected?.descripcion
              : fechaDeCapturaSelected?.descripcion !== ""
              ? fechaDeCapturaSelected?.descripcion
              : beneficiarioSelected?.descripcion !== ""
              ? beneficiarioSelected?.descripcion
              : programasISelected?.NombrePrograma !== ""
              ? programasISelected?.NombrePrograma
              : programasPresupuestariosISelected?.descripcion !== ""
              ? programasPresupuestariosISelected?.descripcion
              : "Objeto Ped"
          }
          Id={
            catalogoSelected?.Id !== ""
              ? catalogoSelected?.Id
              : fechaDeCapturaSelected?.Id !== ""
              ? fechaDeCapturaSelected?.Id
              : beneficiarioSelected?.Id !== ""
              ? beneficiarioSelected?.Id
              : programasISelected?.Id !== ""
              ? programasISelected?.Id
              : programasPresupuestariosISelected?.Id !== ""
              ? programasPresupuestariosISelected?.Id
              : pedSelected?.Id || ""
          }
          tabla={opcionCatalogo || ""}
          open={openMody}
          handleCloseMody={handleCloseMody}
        />
      ) : null}
    </Grid>
  );
};
