import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ManageSearchOutlinedIcon from "@mui/icons-material/ManageSearchOutlined";
import SafetyCheckOutlinedIcon from "@mui/icons-material/SafetyCheckOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Tooltip,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { TrazabilidadI } from "../../genericComponents/InterfacesGenerci";
import { getMovimientosTrazabilidad } from "../../genericComponents/axiosGenericos";

function IconSwitch({ Estado }: { Estado: string }) {
  if (Estado.toUpperCase().includes("BORRADOR"))
    return <BorderColorOutlinedIcon style={{ fontSize: "5em" }} />;
  if (Estado.toUpperCase().includes("CAPTURA"))
    return <DriveFileRenameOutlineOutlinedIcon style={{ fontSize: "5em" }} />;
  else if (Estado.toUpperCase().includes("REVISIÓN"))
    return <ManageSearchOutlinedIcon style={{ fontSize: "5em" }} />;
  else if (Estado.toUpperCase().includes("AUTORIZACIÓN"))
    return <SafetyCheckOutlinedIcon style={{ fontSize: "5em" }} />;
  else if (Estado.toUpperCase().includes("AUTORIZADA"))
    return <VerifiedUserOutlinedIcon style={{ fontSize: "5em" }} />;
  else return <HelpOutlineOutlinedIcon style={{ fontSize: "5em" }} />;
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
        {trazabilidad.map((step, index) => (
          <Grid
            item
            xs={11.5}
            sm={11.5}
            md={11}
            lg={10}
            xl={10}
            key={index}
            sx={{ display: "flex", justifyContent:['space-between','space-evenly','space-evenly','space-evenly','space-evenly',], mb: "5vh",alignItems:'center',border:'solid 1px'}}
           
          >
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
               
              }}
            >
              <IconSwitch Estado={step.Estatus} />
            </Grid>
            <Grid sx={{ justifyContent: ["","center","center","center","center",], alignItems: "center", ml:["2","","","2vw","",] }}>
            <Typography>
                {`Documento:`}

                {` ${step.Documentos}`}
              </Typography>
              <Typography>
                {`Movimiento:`}

                {` ${step.Estatus}`}
              </Typography>
              <Typography>
                {`Modificado por: `}

                {`${step.Nombre}`}
              </Typography>
              <Typography>
                {`Usuario: `}

                {`${step.NombreUsuario}`}
              </Typography>
              <Typography>
                {`Fecha de Modificación: `}

                {`${step.FechaModificacion}`}
              </Typography>
              <Typography>
                {`Hora de Modificación: `}

                {`${step.Hora}`}
              </Typography>
              {/* Agrega más detalles según tus necesidades */}
            </Grid>
          </Grid>
        ))}
      </>
    );
  };

  return (
    <Grid>
      <Tooltip title="LISTA">
        <span>
          <IconButton  onClick={handleClickOpen}>
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
        <DialogTitle>Historial de movimientos del documento</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            maxHeight: "90vh",
            overflow: "auto",
          }}
        >
          <Grid
            xs={12}
            sm={12}
            md={12}
            lg={12}
            container
            item
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Grid
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              container
              item
              sx={{
                height: "90%",
                overflow: "auto",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <TrazabilidadStepper />
            </Grid>

            <Grid
              sx={{
                justifyContent: "center",
                alignItems: "flex-end",
                display: "flex",
                height: "10%",
              }}
              item
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
            >
              <Button
                fullWidth
                className="cancelar"
                variant="contained"
                onClick={handleClose}
              >
                <Typography sx={{ fontFamily: "MontserratMedium" }}>
                  Cerrar
                </Typography>{" "}
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Grid>
  );
};
