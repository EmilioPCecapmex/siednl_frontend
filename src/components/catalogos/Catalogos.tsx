import * as React from "react";
import {
  ListItemButton,
  TableCell,
  List,
  Paper,
  Divider,
  Typography,
  TableRow,
  TableContainer,
  Table,
  TableBody,
  Input,
  Grid,
  TablePagination,
  IconButton,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Accordion from "@mui/material/Accordion";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import axios from "axios";
import DeleteDialogCatalogos from "./DeleteDialogCatalogos";
import AddDialogCatalogo from "./AddDialogCatalogo";
import ModifyDialogCatalogos from "./ModifyDialogCatalogo";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { CSVCatalogo } from "./CSVCatalogo";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { listaGenericaCatalogos } from "./AxiosCatalogo";
import DataGridTable from "../genericComponents/DataGridTable";
import { GridColDef } from "@mui/x-data-grid";
import { ButtonAdd } from "../genericComponents/AddButton";
import { IObjetoBeneficiario, IObjetoCatalogo, IObjetoFechaDeCaptura, IObjetoPed, IObjetoProgramasInstitucionales, IObjetoProgramasPresupuestarios } from "./InterfacesCatalogos";
import { configOptions, newBeneficiario, newCatalogo, newFecha, newPed, newProgramas, newProgramasPresupuestario } from "./ExportsCatalogos";



 

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
                  console.log(v.row);
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
                  console.log(v.row);
                  setCatalogoSelected(v.row);

                  setOpenMody(true);
                  //eliminar(v)
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
    // ...(opcionCatalogo.toUpperCase() === "PROGRAMAS PRESUPUESTARIOS"
    //   ? [
    //       {
    //         field: "Id",
    //         headerName: "CONAC",
    //         description: "Id Beneficiario",
    //         flex: 2,
    //       },
    //       {
    //         field: "",
    //         headerName: "CONSECUTIVO",
    //         description: "Tipo Beneficiario",
    //         flex: 2,
    //       },
    //       {
    //         field: "INSTITUCION",
    //         headerName: "INSTITUCION",
    //         description: "Tipo",
    //         flex: 2,
    //       },
    //     ]
    //   : []),
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
                  console.log(v.row);
                  setFechaDeCapturaSelected(v.row);
                  setOpenDel(true);
                  //eliminar(v)
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
                  console.log(v.row);
                  setProgramasISelected(v.row);
                  setOpenDel(true);
                  //eliminar(v)
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
                  console.log(v.row);
                  return (
                    <Grid>
                      <Tooltip title="Editar descripcion">
                        <IconButton
                          onClick={() => {
                            console.log(v.row);
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
                  //eliminar(v)
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
                  console.log(v.row.Id);
                  setBeneficiarioSelected(v.row);
                  setOpenDel(true);
                  //eliminar(v)
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
                  console.log(v.row);
                  setProgramasPresupuestariosISelected(v.row);

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
                  console.log(v.row);
                  setProgramasPresupuestariosISelected(v.row);

                  setOpenMody(true);
                  //eliminar(v)
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
  const [openMody, setOpenMody] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [actualizacion, setActualizacion] = useState(0);
  const [updata, setUpdata] = useState("");

  const handleClose = () => {
    UpdateInfo();
    setOpenAdd(false);
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
    UpdateInfo();
  }, [updata]);

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

  useEffect(() => {
    console.log("objetoBeneficiario: ", objetoBeneficiario, objetoCatalogo);
  }, [
    objetoCatalogo,
    objetoPed,
    objetoProgramasInstitucionales,
    objetoProgamaPresupuestario,
    objetoFechaDeCaptura,
    objetoBeneficiario,
  ]);

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
      sx={{ backgroundColor: "white" }}
    >
      {/* Grid de la lista de configuracion */}
      <Grid
        item
        xl={2}
        lg={2}
        md={2}
        sm={12}
        xs={12}
        sx={{ display: "flex", overflow: "auto", height: "100%" }}
      >
        <List sx={{}}>
          {configOptions.map((item) => {
            return (
              <ListItemButton
                //className="aceptar"
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "#af8c55",
                    color:
                      item.Desc.toUpperCase() === opcionCatalogo
                        ? "white"
                        : "inherit",
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: "#af8c55",
                    color:
                      item.Desc.toUpperCase() === opcionCatalogo
                        ? "white"
                        : "inherit",
                  },
                }}
                onClick={() => {
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

                  setOpcionCatalogo(item.Desc.toUpperCase());
                  setUpdata(item.Desc);
                }}
                selected={item.Desc.toUpperCase() === opcionCatalogo}
              >
                {item.Desc.toUpperCase()}
              </ListItemButton>
            );
          })}
        </List>
      </Grid>

      <Grid
        item
        container
        xl={10}
        lg={10}
        md={10}
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
            height: "13vh",
            alignItems: "center",
          }}
        >
          <Grid
            item
            xl={8}
            lg={8}
            md={8}
            sm={8}
            xs={8}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Tooltip
              //sx={{ fontFamily: "Montserrat-Bold"}}

              title={opcionCatalogo}
            >
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
            md={2}
            sm={2}
            xs={2}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <ButtonAdd agregar={true} handleOpen={() => setOpenAdd(true)} />
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
          sx={{ display: "flex", height: "80vh" }}
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
        //setOpenDel={setOpenDel}
        handleCloseDel={handleCloseDel}
        UpdateInfo={UpdateInfo}
      />

      <AddDialogCatalogo
        open={openAdd}
        handleClose={handleClose}
        catalogo={opcionCatalogo || ""}
        tabla={opcionCatalogo || ""}
        select={updata}

        //UpdateInfo ={UpdateInfo}
      />

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
    </Grid>
  );
};


