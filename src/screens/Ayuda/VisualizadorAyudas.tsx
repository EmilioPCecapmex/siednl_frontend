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
        headerName: "ACCIONES",
        //description: "",
        sortable: false,
        width: 100,
        renderCell: (v: any) => {
          return (
            <Box>
  
  
              <Tooltip title={"VISUALIZAR "+value.toUpperCase()} >
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
      { field: "Menu", 
      headerName: "MENÚ", 
      //description: "Menú", 
      width: 250 },
      {
        field: "NombreArchivo",
        headerName: "NOMBRE VIDEO",
        //description: "Nombre Video",
        width: 550,
      },
      {
        field: "Nombre",
        headerName: "ROL",
        //description: "Rol",
        width: 200,
      },
  
    ];
  
    const columnsGuia: GridColDef[] = [
  
      {
        field: "Acciones",
        disableExport: true,
        headerName: "ACCIONES",
        //description: "Acciones",
        sortable: false,
        width: 100,
        renderCell: (v: any) => {
          return (
            <Box>
              <Tooltip title={"VISUALIZAR "+value.toUpperCase()}>
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
      { field: "Menu", 
      headerName: "MENÚ", 
      //description: "Menú", 
      width: 250 },
      {
        field: "Pregunta",
        headerName: "PREGUNTA",
        description: "Pregunta",
        width: 600,
      },
      {
        field: "NombreArchivo",
        headerName: "NOMBRE GUÍA",
        //description: "Nombre Guía",
        width: 550,
      },
      {
        field: "Nombre",
        headerName: "ROL",
        //description: "Rol",
        width: 200,
      },
  
    ];
  
    const columnsPreguntas: GridColDef[] = [
  
      { field: "Menu", 
      headerName: "MENÚ", 
      //description: "Menú", 
      width: 250 },
      {
        field: "Pregunta",
        headerName: "PREGUNTA",
        //description: "Pregunta",
        width: 600,
      },
      {
        field: "Texto",
        headerName: "RESPUESTA",
        //description: "Respuesta",
        width: 800,
      },
      {
        field: "Nombre",
        headerName: "ROL",
        //description: "Rol",
        width: 200,
      },
    ];
  
    const handleCloseModal = () => {
      setOpen(false);
    };
  
    return (
      (<ModalForm title="VISUALIZAR" handleClose={() => { handleClose() }}>

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