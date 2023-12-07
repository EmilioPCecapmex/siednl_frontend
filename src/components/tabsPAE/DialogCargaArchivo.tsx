import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Input, TextField, Tooltip, useMediaQuery, useTheme, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { guardarDoc,deletePAE } from "./Services/ServicesPAE";

import * as React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import Swal from "sweetalert2";
import { queries } from "../../queries";

export function DialogCargaArchivo({ Tabs, Tab, updateData }: { Tabs: string[], Tab: string, updateData:Function  }) {

  const [open, setOpen] = useState(false);
  const [tabSelected, setTabSelected] = useState(Tab);
  
  const [fechaEdit, setFechaEdit] = useState(new Date().toISOString().split('T')[0]);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  
  const actualizarDatos=()=>{
    updateData();
    setOpen(false);
  }

  const handleClickAddPDF = () => {
    if (fileInputRef.current) {
      guardarDoc({ archivo: (fileInputRef.current.children[0] as HTMLInputElement).files![0], nombreArchivo: (fileInputRef.current.children[0] as HTMLInputElement).files![0].name }, "2022" + "/" + tabSelected.replaceAll(" ", "_"),fechaEdit).then(()=>actualizarDatos());
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Cargar Archivo
      </Button>
      {open ?

        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title" sx={{ width: ["100vw", "100vw", "60vw", "40vw", "40vw"] }}>
            Subir Documento:
          </DialogTitle>
          <DialogContent sx={{ display: "flex", justifyContent: "center", alignContent: "center", flexDirection: "column" }}>
            <Autocomplete
              clearText="Borrar"
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"

              options={Tabs}
              getOptionLabel={(option) => option}
              value={tabSelected}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option}>
                    <p
                      style={{
                        fontFamily: "MontserratRegular",
                        fontSize: "15",
                      }}
                    >
                      {option}
                    </p>
                  </li>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={"APARTADO"}
                  variant="standard"
                  InputLabelProps={{
                    style: {
                      fontFamily: "MontserratSemiBold",
                      fontSize: "15",
                    },
                  }}
                  sx={{
                    "& .MuiAutocomplete-input": {
                      fontFamily: "MontserratRegular",
                    },
                  }}
                ></TextField>
              )}
              onChange={(event, value) => {
                setTabSelected(value || "")
              }}
              isOptionEqualToValue={(option, value) => option === value}
            />
            <br/>
            <Typography
                        sx={{ fontFamily: "MontserratMedium", fontSize: [15,15,15,15,15] }}
                      >
                        Fecha de publicación
                      </Typography>
            <input
              type="date"
              value={fechaEdit}
              onChange={(e) => setFechaEdit(e.target.value)}
              autoFocus
              style={{
                border: "1px solid #ccc",
                padding: "4px",
                borderRadius: "4px",
                fontSize: "0.7vw",
                fontFamily: "MontserratMedium",
              }}
            />
            <Tooltip title="Agregar Archivo">
              <Grid sx={{ position: 'relative', width: '100%', height: ['40vh', '30vh', '20vh', '25vh', '25vh'], border: '5px dashed', borderRadius: '4px', mt: ["5vh", "5vh", "2vh", "2vh", "2vh"] }}>
              <Input
                    type="file"
                    inputProps={{
                      accept: ".pdf,application/pdf",
                      'aria-label': 'Upload PDF',
                    }}
                    style={{ zIndex: 2, opacity: 0, width: '100%', height: '100%', position: "absolute", cursor: "pointer", }}
                    // onChange={handleFileInputChange}
                    ref={fileInputRef}
                  />
                {/* <input
                  accept=".pdf"  // Restringe la aceptación a archivos PDF
                  onChange={(v) => { handleFileInputChange(v) }}
                  type="file"
                  style={{ zIndex: 2, opacity: 0, width: '100%', height: '100%', position: "absolute", cursor: "pointer", }}
                  ref={fileInputRef}
                /> */}
               { <AddOutlinedIcon
                  sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%' }}
                />}
              </Grid>
            </Tooltip>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Cancelar
            </Button>
            <Button onClick={()=>handleClickAddPDF()} autoFocus>
              Cargar
            </Button>
          </DialogActions>
        </Dialog>


        : null}
    </>

  )
}

export const DeleteDialogPAE = ({
  id,
  updateData
}: {
  id: string;
  updateData:Function;
}) => {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    updateData();
    setOpen(false);
  };

  

  return (
    <Grid>
      <Tooltip title="ELIMINAR">
        <span>
          <IconButton onClick={handleClickOpen}>
            <DeleteIcon
              sx={{
                fontSize: "24px", // Tamaño predeterminado del icono

                "@media (max-width: 600px)": {
                  fontSize: 20, // Pantalla extra pequeña (xs y sm)
                },

                "@media (min-width: 601px) and (max-width: 960px)":
                  {
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
      <Dialog fullWidth open={open} onClose={handleClose}>
        <Grid
          sx={{
            width: "100%",
            height: "5vh",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            borderBottom: 0.5,
            borderColor: "#ccc",
            gridShadow: 1,
          }}
        >
          <Typography
            sx={{
              fontFamily: "MontserratSemiBold",
              width: "90%",
              fontSize: "1vw",
              textAlign: "center",
            }}
          >
            ¿Desea eliminar elemento?
          </Typography>
        </Grid>

        <DialogActions
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button  sx ={queries.buttonCancelarSolicitudInscripcion} onClick={handleClose}>
            <Typography
              sx={{ fontFamily: "MontserratMedium", fontSize: ".7vw" }}
            >
              Cancelar
            </Typography>
          </Button>

          <Button
            onClick={() => {
              deletePAE(id).then(()=>handleClose());
              
            }}
            sx ={queries.buttonContinuarSolicitudInscripcion}
            autoFocus
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