import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Input,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRef, useState, useEffect } from "react";
import { deletePAE, guardarDoc } from "./Services/ServicesPAE";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { queries } from "../../queries";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import {
  alertaError,
  alertaExito,
  alertaEliminar,
  alertaInfo,
} from "../genericComponents/Alertas";
export function DialogCargaArchivo({
  Tabs,
  Tab,
  updateData,
  open,
  setOpen,
}: {
  Tabs: string[];
  Tab: string;
  updateData: Function;
  open: boolean;
  setOpen: Function;
}) {
  const [tabSelected, setTabSelected] = useState(Tab);

  // const [fechaEdit, setFechaEdit] = useState(
  //   new Date().toISOString().split("T")[0]
  // );

  const [fechaEdit, setFechaEdit] = useState<string | null>(null);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const actualizarDatos = () => {
    updateData();
    setOpen(false);
  };

  const handleClickAddPDF = () => {
    if (fileInputRef.current) {
      let data = {
        archivo: (fileInputRef.current.children[0] as HTMLInputElement)
          .files![0],
        nombreArchivo: (fileInputRef.current.children[0] as HTMLInputElement)
          .files![0].name,
      };

      guardarDoc(
        data,
        "2022" + "/" + tabSelected.replaceAll(" ", "_"),
        fechaEdit || ""
      ).then(() => actualizarDatos());
      fileInputRef.current.click();
    }
  };

  const [fileName, setFileName] = useState("");

  const handleFileChange = () => {
    const selectedFile = (
      (fileInputRef?.current?.children[0] as HTMLInputElement) || ""
    )?.files![0];

    if (selectedFile) {
      setFileName(selectedFile.name);
    }
  };

  return (
    <>
      {open ? (
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle
            id="responsive-dialog-title"
            sx={{ width: ["100vw", "100vw", "60vw", "40vw", "40vw"] }}
          >
            SUBIR DOCUMENTO:
          </DialogTitle>
          <DialogContent
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              flexDirection: "column",
            }}
          >
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
                setTabSelected(value || "");
              }}
              isOptionEqualToValue={(option, value) => option === value}
            />
            <br />
            <Typography
              sx={{
                fontFamily: "MontserratMedium",
                fontSize: [15, 15, 15, 15, 15],
              }}
            >
              {" "}
              FECHA DE PUBLICACIÓN{" "}
            </Typography>
            <input
              type="date"
              value={fechaEdit || ""}
              onChange={(e) => setFechaEdit(e.target.value || null)}
              autoFocus
              style={{
                border: "1px solid #ccc",
                padding: "4px",
                borderRadius: "4px",
                fontFamily: "MontserratMedium",
              }}
            />
            <Tooltip title="Agregar Archivo">
              <Grid
                sx={{
                  position: "relative",
                  width: "100%",
                  height: ["40vh", "30vh", "20vh", "25vh", "25vh"],
                  border: "5px dashed",
                  borderRadius: "4px",
                  mt: ["5vh", "5vh", "2vh", "2vh", "2vh"],
                }}
              >
                {fileName === "" ? (
                  <UploadFileOutlinedIcon
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                ) : (
                  <>
                    <DescriptionOutlinedIcon
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "100%",
                        height: "70%",
                      }}
                    />
                    <Typography
                      sx={{
                        position: "absolute",
                        top: "80%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "100%",
                        textAlign: "center",
                        letterSpacing: "2px", // Ajusta el espacio entre las letras
                        fontSize: ["2em", "1.5em", "1.2em", "1.5em", "1.5em"], // Tamaños responsive
                      }}
                    >
                      {fileName}
                    </Typography>
                  </>
                )}
                <Input
                  type="file"
                  inputProps={{
                    accept: ".pdf,application/pdf",
                    "aria-label": "Upload PDF",
                  }}
                  style={{
                    zIndex: 2,
                    opacity: 0,
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    cursor: "pointer",
                  }}
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  sx={{ bgcolor: "red" }}
                />
              </Grid>
            </Tooltip>
          </DialogContent>
          <DialogActions>
            <Button
              className="cancelar"
              autoFocus
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>

            <Button
              className="aceptar"
              disabled={!fileName}
              onClick={() =>fechaEdit? handleClickAddPDF(): alertaInfo("SELECCIONE UNA FECHA")}
              autoFocus
            >
              Cargar
            </Button>

          </DialogActions>
        </Dialog>
      ) : null}
    </>
  );
}

export const DeleteDialogPAE = ({
  id,
  updateData,
}: {
  id: string;
  updateData: Function;
}) => {
  //const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    //setOpen(true);
    alertaEliminar(
      () => {
        deletePAE(id);
      },
      () => {},
      "Deseas eliminar el documento?"
    ).then(() => handleClose());
    //deletePAE(id).then(() => handleClose());
  };

  const handleClose = () => {
    updateData();
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
    </Grid>
  );
};
