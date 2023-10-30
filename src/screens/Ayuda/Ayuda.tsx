import { BottomNavigation, BottomNavigationAction, Box, Button, Grid, IconButton, Paper, TableCell, TableContainer, Tooltip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { LateralMenu } from "../../components/lateralMenu/LateralMenu";
import MUIXDataGrid from "../../components/MUIXDataGrid";
import HelpIcon from "@mui/icons-material/Help";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import AyudasModal from "./AyudaModal";

import {deleteFile, getAyuda } from "./ServicesAyuda";
import { alertaError, alertaExito } from "../../components/alertas/Alertas";

export interface IAyudaVideo {
  Id: string,
  IdMenu: string,
  Menu: string,
  NombreArchivo: string,
  RutaVideo: string,
  UltimaActualizacion: string
}

export interface IAyudaGuia {
  Id: string,
  IdMenu: string,
  Menu: string,
  NombreArchivo: string,
  RutaGuia: string,
  Pregunta: string,
  UltimaActualizacion: string
}

export interface IAyudaPregunta {
  Id: string,
  IdMenu: string,
  Menu: string,
  Respuesta: string,
  Pregunta: string,
  UltimaActualizacion: string
}

const Ayuda = () => {

  const [Preguntas, setPreguntas] = useState<IAyudaPregunta[]>([]);
  const [Guías, setGuias] = useState<IAyudaGuia[]>([]);
  const [Videos, setVideos] = useState<IAyudaVideo[]>([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Videos");


  function eliminar(v: any) {
    Swal.fire({
      title: "¿Estás seguro de eliminar este registro?",
      icon: "question",
      showCancelButton: true,

      cancelButtonColor: "#af8c55",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar",
      confirmButtonColor: "#15212f",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("valor v", v);

        deleteFile(v?.row?.RutaGuia,v?.row?.NombreArchivoServidor,v?.row?.Id)
          .then((response)=>{
            alertaExito(()=>{},"¡Registro eliminado!");
            obtenerDatos();
                  })
          .catch((error)=>{
            alertaError();
          });
      }
    });
  }


  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const columnsGuia: GridColDef[] = [

    {
      field: "Acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "Acciones",
      sortable: false,
      width: 100,
      renderCell: (v: any) => {
        console.log("v", v);

        return (
          <Box>
            <Tooltip title="Eliminar Guía">
              <IconButton onClick={() => {
                eliminar(v)
              }
              }>
                <DeleteForeverIcon />
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
  ];

  const columnsVideo: GridColDef[] = [
    {
      field: "Acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "Acciones",
      sortable: false,
      width: 100,
      renderCell: (v: any) => {
        return (
          <Box>
            <Tooltip title="Eliminar Video">
              <IconButton onClick={() => { eliminar(v) }}>
                <DeleteForeverIcon />
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

  ];

  const columnsPreguntas: GridColDef[] = [
    {
      field: "Acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "Acciones",
      sortable: false,
      width: 100,
      renderCell: (v: any) => {
        return (
          <Box>
            <Tooltip title="Eliminar Pregunta">
              <IconButton onClick={() => { eliminar(v) }
              }>
                <DeleteForeverIcon />
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
      field: "Texto",
      headerName: "Respuesta",
      description: "Respuesta",
      width: 800,
    },
  ];

  const handleClose = () => {
    setOpen(false);
    obtenerDatos();
  };

  const obtenerDatos = () => {
    if (value === "Guías") {
      getAyuda(setGuias, "0", "Guías")
    }
    if (value === "Videos") {
      getAyuda(setVideos, "0", "Videos")
    }
    if (value === "Preguntas") {
      getAyuda(setPreguntas, "0", "Preguntas")
    }
  }

  const handleOpen = (v: any) => {

    setOpen(true);

  };

  useEffect(() => {
    obtenerDatos();
  }, [value])

  
  return (


    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ width: "100vw", height: "100vh", display: "flex" }}
    >
      {/* grid del header */}
      <Grid
        container
        item
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100vw", height: "7vh", display: "flex" }}
      >
        <LateralMenu
          selection={"Administración de Ayudas"}
          actionNumber={0}
        />

      </Grid>


      {/* grisd body */}
      <Grid
        container
        item
        sx={{ width: "100vw", height: "93vh", display: "flex", justifyContent: "center" }}
      >
        {/* grid de opciones iconos */}
        <Grid
          item
          xs={12}
          md={12}
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100vw", height: "10%", display: "flex" }}
        >

          <BottomNavigation
            showLabels
            sx={{ width: 500, borderRadius: "10px" }}
            //value={value}
            onChange={handleChange}
          >
            <BottomNavigationAction
              label="Videos de Ayuda"
              value="Videos"
              icon={<OndemandVideoIcon />}
            />
            <BottomNavigationAction
              label="Guía Rápida"
              value="Guías"
              icon={<MenuBookIcon />}
            />
            <BottomNavigationAction
              label="Preguntas Frecuentes"
              value="Preguntas"
              icon={<HelpIcon />}
            />
          </BottomNavigation>

          <Button
            sx={{
              backgroundColor: "#c2a37b",
              // width: "10vw",
              // height: "3.3vh",
              width: ["80px", "120px", "160px", "180px", "250px"],
              height: ["30px", "20px", "30px", "40px", "50px"],
              color: "black",
              fontFamily: "MontserratMedium",
              fontSize: [5, 7, 10, 12, 16, 20],
            }}
            onClick={() => {
              handleOpen(handleOpen)
              
            }}
            >
            "Agregar {value}"
          
          </Button>
        </Grid>
        {/* grid de tabla */}
        <Grid
          item
          xs={12}
          md={12}
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100vw", height: "90%", display: "flex" }}
        >
          {/* cambio a tabla preguntas */}
          {value == "Preguntas" ? (
            <MUIXDataGrid id={(row: any) => row.Id} columns={columnsPreguntas} rows={Preguntas} />

          ) : null}
          {/* cambio a tablas videos y guías */}
          {value == "Videos" ? (
            <MUIXDataGrid id={(row: any) => row.Id} columns={columnsVideo} rows={Videos} />
          ) : null}

          {value == "Guías" ? (
            <MUIXDataGrid id={(row: any) => row.Id} columns={columnsGuia} rows={Guías} />
          ) : null}
        </Grid>



        {open ? (
                <AyudasModal
                  value={value}
                  handleClose={handleClose}
                />
              ) :null}













      </Grid>
    </Grid>

  );
};
export default Ayuda;
