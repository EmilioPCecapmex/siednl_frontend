import {
  Autocomplete,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ModalForm from "../../components/ModalForm";
import { alertaError } from "../../components/genericComponents/Alertas";
import { queries } from "../../queries";
import { createAyuda, getMenus, getRoles, saveFile } from "./ServicesAyuda";

export interface ILista {
  Id: string;
  Label: string;
}

export interface IListaRoles {
  Id: string;
  Nombre: string;
}

export interface Tabla {
  Opcion: string;
  IdMenu: string;
}

export interface MenuItem {
  Id: string;
  Label: string;
  Path: string;
}

export interface IFile {
  archivo: File;
  nombreArchivo: string;
}

export const AyudasModal = ({
  value,
  handleClose,
}: {
  value: string;
  handleClose: Function;
}) => {
  const [menu, setMenu] = useState<ILista>({ Id: "", Label: "" });
  const [menus, setMenus] = useState<ILista[]>([]);

  const [rol, setRol] = useState<IListaRoles>({ Id: "", Nombre: "" });
  const [roles, setRoles] = useState<IListaRoles[]>([]);

  const [newVideo, setNewVideo] = useState<File>(new File([], ""));
  const [nombreArchivo, setNombreArchivo] = useState("");
  const [pregunta, setPregunta] = useState("");
  const [respuesta, setRespuesta] = useState("");

  const [videoPreview, setVideoPreview] = useState("");

  function enCambioFile(event: any) {
    if (
      event?.target?.files[0] &&
      event.target.files[0].type.split("/")[0] == "video"
    ) {
      setNombreArchivo(event?.target?.value?.split("\\")[2]);
      let file = event?.target!?.files[0]!;
      setNewVideo(file);
      setVideoPreview(URL.createObjectURL(event.target.files[0]));
    } else if (
      event?.target?.files[0] &&
      event.target.files[0].type == "application/pdf"
    ) {
      setNombreArchivo(event?.target?.value?.split("\\")[2]);
      let file = event?.target!?.files[0]!;
      setVideoPreview(URL.createObjectURL(event.target.files[0]));

      setNewVideo(file);
    } else {
      alertaError("¡NO ES UN ARCHIVO VALIDO!");
    }
  }

  useEffect(() => {
    getMenus(setMenus);

    getRoles(setRoles);
  }, []);

  return (
    <ModalForm
      title={"ADMINISTRACIÓN DE " + value.toUpperCase()}
      handleClose={handleClose}
    >
      <Grid
        container
        item
        xl={11}
        lg={11}
        md={11}
        sm={11}
        xs={11}
        direction="row"
        justifyContent={[
          "center",
          "center",
          "center",
          "space-between",
          "space-between",
        ]}
        alignItems="center"
      >
        {/* ROL */}
        <Grid item xl={3.5} lg={3.5} md={8} sm={12} xs={12}>
          <Typography variant="h6">ROL</Typography>
          <Autocomplete
            noOptionsText="NO SE ENCONTRARON OPCIONES"
            clearText="BORRAR"
            closeText="CERRAR"
            openText="ABRIR"
            options={roles}
            getOptionLabel={(rol) => rol.Nombre || "SELECCIONE ROL"}
            value={rol}
            onChange={(event, newValue) => {
              if (newValue != null) {
                setRol(newValue);
              }
            }}
            renderInput={(params) => (
              <TextField key={params.id} {...params} variant="outlined" />
            )}
          />
        </Grid>
        {/* MENU */}
        <Grid item xl={3.5} lg={3.5} md={8} sm={12} xs={12}>
          <Typography variant="h6">MENÚ</Typography>
          <Autocomplete
            noOptionsText="NO SE ENCONTRARON OPCIONES"
            clearText="BORRAR"
            closeText="CERRAR"
            openText="ABRIR"
            options={menus}
            getOptionLabel={(menu) => menu.Label || "SELECCIONE MENÚ"}
            value={menu}
            onChange={(event, newValue) => {
              if (newValue != null) {
                setMenu(newValue);
              }
            }}
            renderInput={(params) => (
              <TextField key={params.id} {...params} variant="outlined" />
            )}
          />
        </Grid>
        {/* Boton */}
        <Grid
          item
          xl={3.5}
          lg={3.5}
          md={8}
          sm={12}
          xs={12}
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          paddingTop={3}
        >
          {value !== "Preguntas" ? (
            <Button
              variant="contained"
              sx={queries.buttonCancelarSolicitudInscripcion}
              component="label"
            >
              SELECCIONAR {value.toUpperCase()}
              <input
                hidden
                accept={value == "Videos" ? "video/*" : "application/pdf"}
                onChange={(v) => {
                  enCambioFile(v);
                }}
                type="file"
              />
            </Button>
          ) : (
            ""
          )}

          {value == "Videos" && nombreArchivo !== "" ? (
            <>
              <Button
                variant="contained"
                sx={{...queries.buttonContinuarSolicitudInscripcion,ml:"1vw"}}
                className="aceptar"
                //hidden
                //disabled={modo == "Editar Nombre Video" || !TabValue}
                component="label"
                //className="aceptar"
                onClick={() => {
                  if (rol.Id !== "") {
                    if (menu.Id !== "") {
                      saveFile(
                        value,
                        { nombreArchivo: nombreArchivo, archivo: newVideo },
                        menu.Id,
                        rol.Id,
                        pregunta,
                        respuesta,
                        handleClose
                      );
                    } else {
                      alertaError("SELECCIONE UN MENÚ");
                    }
                  } else {
                    alertaError("SELECCIONE UN ROL");
                  }
                }}
              >
                GUARDAR
              </Button>
            </>
          ) : (
            ""
          )}

          {value == "Guías" && nombreArchivo !== "" ? (
            <>
              <Button
                 sx={{...queries.buttonContinuarSolicitudInscripcion,ml:"1vw"}}
                className="aceptar"
                onClick={() => {
                  if (rol.Id !== "") {
                    if (menu.Id !== "") {
                      if (pregunta !== "") {
                        saveFile(
                          value,
                          { nombreArchivo: nombreArchivo, archivo: newVideo },
                          menu.Id,
                          rol.Id,
                          pregunta,
                          respuesta,
                          handleClose
                        );
                      } else {
                        alertaError("ESCRIBA TÍTULO DE GUÍA");
                      }
                    } else {
                      alertaError("SELECCIONE UN MENÚ");
                    }
                  } else {
                    alertaError("SELECCIONE UN ROL");
                  }
                }}
              >
                GUARDAR
              </Button>
            </>
          ) : (
            ""
          )}

          {value == "Preguntas" ? (
            <>
              <Button
                 sx={{...queries.buttonContinuarSolicitudInscripcion,ml:"1vw"}}
                className="aceptar"
                onClick={() => {
                  if (rol.Id !== "") {
                    if (menu.Id !== "") {
                      if (pregunta !== "") {
                        if (respuesta !== "") {
                          let datos = {
                            IdMenu: menu.Id,
                            IdRol: rol.Id,
                            Pregunta: pregunta,
                            Texto: respuesta,
                            RutaGuia: "",
                            RutaVideo: "",
                            NombreArchivo: "",
                            NombreArchivoServidor: "",
                            IdUsuario: localStorage.getItem("IdUsuario") || "",
                          };
                          createAyuda(datos, handleClose);
                        } else {
                          alertaError("ESCRIBA UNA RESPUESTA");
                        }
                      } else {
                        alertaError("ESCRIBA UNA PREGUNTA");
                      }
                    } else {
                      alertaError("SELECCIONE UN MENÚ");
                    }
                  } else {
                    alertaError("SELECCIONE UN ROL");
                  }
                }}
              >
                GUARDAR
              </Button>
            </>
          ) : null}
        </Grid>
      </Grid>

      {value == "Videos" || value == "Guías" ? (
        <>
          <Grid
            container
            item
            xs={11}
            sm={11}
            md={11}
            lg={11}
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            sx={{ mt: "1vh" }}
          >
            <Typography variant="h6">NOMBRE DEL ARCHIVO: </Typography>

            <TextField
              disabled
              margin="dense"
              id="nombreEvento"
              value={nombreArchivo}
              fullWidth
              variant="outlined"
              size="small"
              onChange={(v) => setNombreArchivo(v.target.value)}
              sx={{ paddingBottom: "10px" }}
            />
          </Grid>

          {value == "Guías" ? (
            <>
              <Grid
                container
                item
                
                xs={11}
                sm={11}
                md={11}
                lg={11}
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                sx={{ mt: "1vh" }}
              >
                <Typography variant="h6">PREGUNTA / TÍTULO DE GUÍA:</Typography>

                <TextField
                  margin="dense"
                  id="nombreEvento"
                  value={pregunta}
                  fullWidth
                  variant="outlined"
                  size="small"
                  inputProps={{ maxLength: 300 }}
                  onChange={(v) => setPregunta(v.target.value)}
                  
                />
              </Grid>
            </>
          ) : (
            ""
          )}
        </>
      ) : null}

      {value == "Preguntas" ? (
        <>
          <Grid
            container
            item
            spacing={1}
            xs={11}
            sm={11}
            md={11}
            lg={11}
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            sx={{ padding: "1%" }}
          >
          
            
              <Typography variant="h6">PREGUNTA</Typography>
              <TextField
                inputProps={{ maxLength: 300 }}
                margin="dense"
                id="nombreEvento"
                value={pregunta}
                fullWidth
                variant="outlined"
                size="small"
                onChange={(v) => setPregunta(v.target.value)}
                sx={{ paddingBottom: "10px" }}
              />
            
              <Typography variant="h6">RESPUESTA</Typography>
              <TextField
                inputProps={{ maxLength: 700 }}
                margin="dense"
                id="nombreEvento"
                value={respuesta}
                fullWidth
                variant="outlined"
                size="small"
                onChange={(v) => setRespuesta(v.target.value)}
                sx={{ paddingBottom: "10px" }}
              />
            
          </Grid>
        </>
      ) : null}

      {value == "Videos" || value == "Guías" ? (
        <Grid
          container
          item
          height={"100vh"}
          width={"100vw"}
          sx={{
            display: "flex",
            justifyContent: "Center",
            alignItems: "center",
          }}
        >
          {value == "Videos" ? (
            <video
              loop
              autoPlay
              width={"98%"}
              height={"98%"}
              src={videoPreview}
              id="videoPlayer"
              controls
            />
          ) : (
            <iframe
              src={videoPreview}
              width="98%"
              height="98%"
              title="PDF Viewer"
            ></iframe>
          )}
        </Grid>
      ) : null}

      <Grid></Grid>
    </ModalForm>
    // </Dialog>
  );
};

export default AyudasModal;
