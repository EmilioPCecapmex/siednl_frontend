import { useEffect, useState } from "react";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import {
  Box,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  DialogTitle,
} from "@mui/material";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import { Typography, FormControl } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { queries } from "../../queries";
import { alertaError } from "../alertas/Alertas";
import { createFechaDeCaptua } from "./AxiosCatalogo";

const modulo = [
  "Mir",
  "Meta Anual",
  "Ficha Tecnica",
  "Raffi",
  "Actividades Institucionales",
];

export const CapturarFechas = ({
  actualizado,
  open,
  close,
}: {
  actualizado: Function;
  open: boolean;
  close: Function;
}) => {
  const [modulos, setModulos] = useState("Mir");

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  //   const handleClose = () => {
  //     setOpen(false);
  //     actualizado();
  //   };

  const handleClose = () => {
    close(false); // Call the close function provided as a prop when the dialog should be closed.
  };

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  const monthS = month < 10 ? "0" + month : month.toString();
  const dateS = date < 10 ? "0" + date : date.toString();

  const [fechaCaptura1, setFechaCaptura1] = useState<string>(
    `${year}-${monthS}-${dateS}`
  );

  const [fechaCaptura2, setFechaCaptura2] = useState<string>(
    `${year}-${monthS}-${dateS}`
  );

  const [descripcion, setDescripcion] = useState("");

  const [fechaError, setFechaError] = useState(false);

  const handleFechaCaptura1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    
    const selectedDate = event.target.value;
    console.log(selectedDate);
    if (selectedDate <= fechaCaptura2) {
      setFechaCaptura1(selectedDate);
    
    
    }else{
      alertaError("Error fecha descuadrada")
    }
  };

  const handleFechaCaptura2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    const selectedDate = event.target.value;
    console.log(selectedDate);
    if (selectedDate >= fechaCaptura1) {
      setFechaCaptura2(selectedDate);
    }else{
      alertaError("Error fecha descuadrada")
    }
  };

  const handleClick = (modulo: string, fecha1: any, fecha2: any) => {
    console.log("modulo: ",modulo);
    console.log("fecha1: ",fecha1);
    console.log("fecha2: ",fecha2);
    createFechaDeCaptua(modulo, fecha1, fecha2)
    
  };

  return (
    <Grid container lg={12}>
    

      <Dialog fullWidth open={open} onClose={handleClose} keepMounted>
        <DialogTitle>
          <Typography sx={queries.medium_text}>
            Añadir Rango de Fecha de Captura
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            sx={
              {
                //width: "100%",
                //justifyContent: "space-evenly",
                //display: "flex",
                // height: "16vh",
                //alignItems: "center",
              }
            }
            lg={12}
            direction={"column"}
          >
            
            <Grid item lg={4}>
            <InputLabel sx={{ fontFamily: "MontserratMedium" }}>
                Modulo
              </InputLabel>
              <FormControl variant="outlined" fullWidth size="small">
                <Select
                  value={modulos}
                  onChange={(v) => {
                    setModulos(v.target.value);
                  }}
                >
                  {modulo.map((mod) => (
                    <MenuItem key={mod} value={mod}>
                      {mod}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            

            <Grid item lg={4}>
               <InputLabel sx={{ fontFamily: "MontserratMedium" }}>
               Inicio
              </InputLabel> 
              <FormControl variant="outlined" fullWidth size="small">
                
                <TextField
                  variant="outlined"
                  
                  onChange={
                    handleFechaCaptura1Change
                  }
                  multiline={descripcion.length < 20 ? false : true}
                  value={fechaCaptura1}
                  
                  //style={{ marginTop: "2vh" }}
                  type="date"
                  InputProps={{
                    style: {
                      fontFamily: "MontserratLight",
                      borderColor: fechaError ? "red" : undefined,
                    },
                  }}
                  InputLabelProps={{
                    shrink: true,
                    style: {
                      fontFamily: "MontserratRegular",
                    },
                  }}
                  rows={3}
                />
              </FormControl>
            </Grid>

            <Grid item lg={4}>
               <InputLabel sx={{ fontFamily: "MontserratMedium" }}>
                Fin
              </InputLabel> 

              <FormControl variant="outlined" fullWidth size="small">
                <TextField
                  variant="outlined"
                  onChange={handleFechaCaptura2Change}
                  multiline={descripcion.length < 20 ? false : true}
                  value={fechaCaptura2}
                
                  //style={{ marginTop: "2vh" }}
                  type="date"
                  InputProps={{
                    style: {
                      fontFamily: "MontserratLight",
                      borderColor: fechaError ? "red" : undefined,
                    },
                  }}
                  InputLabelProps={{
                    shrink: true,
                    style: {
                      fontFamily: "MontserratRegular",
                    },
                  }}
                  rows={3}
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            sx={queries.buttonCancelarSolicitudInscripcion}
            onClick={handleClose}
          >
            <Typography
              sx={{ fontFamily: "MontserratMedium", fontSize: ".7vw" }}
            >
              Cancelar
            </Typography>
          </Button>

          <Button
            sx={queries.buttonContinuarSolicitudInscripcion}
            onClick={() => handleClick(modulos, fechaCaptura1, fechaCaptura2)}
            //autoFocus
          >
            <Typography
              sx={{ fontFamily: "MontserratMedium", fontSize: ".7vw" }}
            >
              De Acuerdo
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};
