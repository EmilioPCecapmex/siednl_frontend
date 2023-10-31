import { Box, Grid, IconButton, Tooltip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import PreviewIcon from '@mui/icons-material/Preview';
import ModalForm from "../../components/ModalForm";
import MUIXDataGrid from "../../components/MUIXDataGrid";
import { MostrarArchivos } from "./MostrarArchivos";


export interface IInfoFile {
    nombre: string;
    ruta: string;
  }
  export const VisualizadorAyudas = ({
    handleClose,
    arrayAyudas,
    value,
    //openState,
  }: {
    handleClose: Function
    arrayAyudas: any[]
    value: string
    //openState: boolean;

  }) => {
  
    const [open, setOpen] = useState(false);
    const [infoFile, setInfoFile] = useState<IInfoFile>({ nombre: "", ruta: "" });
  
    const columnsVideo: GridColDef[] = [
      {
        field: "Acciones",
        disableExport: true,
        headerName: "Acciones",
        description: "Acciones",
        sortable: false,
        width: 80,
        renderCell: (v: any) => {
          return (
            <Box>
  
  
              <Tooltip title={"Visualizar"+value} >
                <IconButton onClick={() => {
                  setOpen(true);
                  setInfoFile({ ruta: v?.row?.RutaVideo, nombre: v?.row?.NombreArchivoServidor })
                }}>
                  <PreviewIcon />
                </IconButton>
              </Tooltip>
            </Box>
  
          );
        },
      },
      { field: "Menu", headerName: "Menú", description: "Menú", width: 250 },
      {
        field: "NombreArchivo",
        headerName: "Nombre Video",
        description: "Nombre Video",
        width: 600,
      },
      {
        field: "Nombre",
        headerName: "Rol",
        description: "Rol",
        width: 600,
      },
  
    ];
  
    const columnsGuia: GridColDef[] = [
  
      {
        field: "Acciones",
        disableExport: true,
        headerName: "Acciones",
        description: "Acciones",
        sortable: false,
        width: 80,
        renderCell: (v: any) => {
          return (
            <Box>
              <Tooltip title="Visualizar">
                <IconButton onClick={() => {
                  setOpen(true)
                  setInfoFile({ ruta: v?.row?.RutaGuia, nombre: v?.row?.NombreArchivoServidor })
                }}>
                  <PreviewIcon />
                </IconButton>
              </Tooltip>
            </Box>
          );
        },
      },
      { field: "Menu", headerName: "Menú", description: "Menú", width: 250 },
      {
        field: "Pregunta",
        headerName: "Pregunta",
        description: "Pregunta",
        width: 600,
      },
      {
        field: "NombreArchivo",
        headerName: "Nombre Guía",
        description: "Nombre Guía",
        width: 600,
      },
      {
        field: "Nombre",
        headerName: "Rol",
        description: "Rol",
        width: 600,
      },
  
    ];
  
    const columnsPreguntas: GridColDef[] = [
  
      { field: "Menu", headerName: "Menú", description: "Menú", width: 250 },
      {
        field: "Pregunta",
        headerName: "Pregunta",
        description: "Pregunta",
        width: 600,
      },
      {
        field: "Texto",
        headerName: "Respuesta",
        description: "Respuesta",
        width: 800,
      },
      {
        field: "Nombre",
        headerName: "Rol",
        description: "Rol",
        width: 600,
      },
    ];
  
    const handleCloseModal = () => {
      setOpen(false);
    };
  
    return (
      (<ModalForm title="Visualizar" handleClose={() => { handleClose() }}>

        <Grid item sx={{ width: "100vw", height: "90vh", justifyContent:"center",alignItems:"center",displa:"flex" }}>
          {/* cambio a tabla preguntas */}
          {value == "Preguntas" ? (
            <MUIXDataGrid id={(row: any) => row.Id} columns={columnsPreguntas} rows={arrayAyudas} />
  
          ) : null}
          {/* cambio a tabla videos*/}
          {value == "Videos" ? (
            <MUIXDataGrid id={(row: any) => row.Id} columns={columnsVideo} rows={arrayAyudas} />
          ) : null}
          {/* cambio a tabla guías */}
          {value == "Guías" ? (
            <MUIXDataGrid id={(row: any) => row.Id} columns={columnsGuia} rows={arrayAyudas} />
          ) : null}
  
        </Grid>
        {open ? <MostrarArchivos
          handleClose={handleCloseModal}
          infoFile={infoFile}
          value={value}
        />
          : null}
  
      </ModalForm>)
    )
  }