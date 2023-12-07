import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Input, TextField, Tooltip, useMediaQuery, useTheme } from "@mui/material";
import { useRef, useState } from "react";
import { guardarDoc } from "./Services/ServicesPAE";

export function DialogCargaArchivo({ Tabs, Tab }: { Tabs: string[], Tab: string }) {

  const [open, setOpen] = useState(false);
  const [tabSelected, setTabSelected] = useState(Tab);
  const 

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClickAddPDF = () => {
    console.log("fileInputRef",(fileInputRef?.current?.children[0] as HTMLInputElement).files![0]);
    
    if (fileInputRef.current) {
      guardarDoc({ archivo: (fileInputRef.current.children[0] as HTMLInputElement).files![0], nombreArchivo: (fileInputRef.current.children[0] as HTMLInputElement).files![0].name }, "2022" + "/" + tabSelected.replaceAll(" ", "_"));
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
                  label={"UNIDAD RESPONSABLE"}
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
                console.log("value", value);
                setTabSelected(value || "")
              }}
              isOptionEqualToValue={(option, value) => option === value}
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
              Disagree
            </Button>
            <Button onClick={()=>handleClickAddPDF()} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>


        : null}
    </>

  )
}