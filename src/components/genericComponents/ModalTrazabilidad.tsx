import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import CloseIcon from "@mui/icons-material/Close";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ManageSearchOutlinedIcon from "@mui/icons-material/ManageSearchOutlined";
import SafetyCheckOutlinedIcon from "@mui/icons-material/SafetyCheckOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator } from "@mui/lab";
import {
  Dialog,
  Grid,
  IconButton,
  Tooltip,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { TrazabilidadI } from "./InterfacesGenerci";
import { getMovimientosTrazabilidad } from "./axiosGenericos";


function IconSwitch({ Estado }: { Estado: string }) {
  if (Estado.toUpperCase().includes("BORRADOR"))
    return <BorderColorOutlinedIcon  />;
  if (Estado.toUpperCase().includes("CAPTURA"))
    return <DriveFileRenameOutlineOutlinedIcon  />;
  else if (Estado.toUpperCase().includes("REVISIÓN"))
    return <ManageSearchOutlinedIcon  />;
  else if (Estado.toUpperCase().includes("AUTORIZACIÓN"))
    return <SafetyCheckOutlinedIcon  />;
  else if (Estado.toUpperCase().includes("AUTORIZADA"))
    return <VerifiedUserOutlinedIcon  />;
  else return <HelpOutlineOutlinedIcon  />;
}

export const MostrarLista = ({ st, Id }: { st: string; Id: string }) => {
  const [trazabilidad, setTrazabilidad] = useState<TrazabilidadI[]>([]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (open) {
      getMovimientosTrazabilidad(Id, setTrazabilidad);
    }
  }, [open]);

  const TrazabilidadStepper = () => {
    return (
      <>
        {trazabilidad.map((step, index) => {
          // console.log(step.Contenido);

          // let auxContenido: IHApp | IHRol | IHRolMenu | IHMenu = JSON.parse(
          //   step.Contenido
          // );

          return (
            <TimelineItem>
              <TimelineOppositeContent
                sx={{ m: "auto 0" }}
                align="right"
                variant="body2"
                color="text.secondary"
              >
                <Typography variant="h6" component="span">
                {`${step.FechaModificacion} ${step.Hora}`}
                </Typography>
                <Typography> {step.Nombre}</Typography>\
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot color="primary">
                  <IconSwitch Estado={step.Estatus} />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: "12px", px: 2 }}>
                <Typography variant="h6" component="span">
                  {`${step.Documentos} ${step.Estatus}`}
                </Typography>
               
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </>
    );
  };

  return (
    <Grid>
      <Tooltip title="LISTA">
        <span>
          <IconButton onClick={handleClickOpen}>
            <ListAltIcon
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

      <Dialog open={open} onClose={handleClose} fullScreen>
      <Grid
          container
          sx={{
            width: "100%",
            height: "100%",
            display:'flex',
            justifyContent:'center',
            alignItems:'flex-start'
          }}
        >
          <Grid
            container
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            sx={{
              height: "8vh",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              borderBottom: "1px solid",
            }}
          >
            <Grid
              item
              xs={8}
              sm={8}
              md={10}
              lg={10}
              xl={10}
              sx={{
                height: "8vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography fontFamily={"'Montserrat', sans-serif"}
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  textAlign: "center",
                  fontSize: [30, 30, 30, 30, 40], // Tamaños de fuente para diferentes breakpoints
                  color: "#AF8C55"
                }}
              >
                Historial de movimientos del registro
              </Typography>
            </Grid>
            <Grid
              item
              xs={2}
              sm={2}
              md={1}
              lg={1}
              xl={1}
              sx={{
                height: "8vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Tooltip title="Salir">
                <IconButton

                  onClick={() => {
                    handleClose();
                  }}
                >
                  <CloseIcon sx={{
                    fontSize: '24px', // Tamaño predeterminado del icono
                    '@media (max-width: 600px)': {
                      fontSize: 30, // Pantalla extra pequeña (xs y sm)
                    },
                    '@media (min-width: 601px) and (max-width: 960px)': {
                      fontSize: 30, // Pantalla pequeña (md)
                    },
                    '@media (min-width: 961px) and (max-width: 1280px)': {
                      fontSize: 40, // Pantalla mediana (lg)
                    },
                    '@media (min-width: 1281px)': {
                      fontSize: 40, // Pantalla grande (xl)
                    },
                  }} />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>

                <Grid
                  item
                  container
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}

                  sx={{
                    display: "flex",
                    height: "90%",
                    overflow: "auto",
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  <Timeline position="right" sx={{height:'100%'}}>
                    <TrazabilidadStepper />
                  </Timeline>

              </Grid>
        </Grid>
      </Dialog>
    </Grid>
  );
};
