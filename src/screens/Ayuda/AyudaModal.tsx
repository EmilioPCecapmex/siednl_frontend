import { Autocomplete, Button, Grid, TextField, Typography } from "@mui/material";
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
  nombreArchivo: string 
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
  const [slideropen, setslideropen] = useState(false);

  
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
      alertaError("¡NO ES UN ARCHIVO VALIDO!")

    }
  }


  useEffect(() => { getMenus(setMenus)


    getRoles(setRoles) }, [])

  return (
    // <Dialog open={true} fullScreen style={{ zIndex: 1000 }}>
    <ModalForm title={"ADMINISTRACIÓN DE " + value.toUpperCase()} handleClose={handleClose} >
      {/* <SliderProgress open={slideropen} texto={"Cargando..."}></SliderProgress> */}

      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        {/* <LateralMenu
          selection={"Administración de Ayudas"}
          actionNumber={0}
        /> */}
        <Grid item xs={12} md={6.5} lg={8.2}>
          <Typography variant="h6">ROL</Typography>
          <Autocomplete
            noOptionsText="NO SE ENCONTRARON OPCIONES"
            clearText="BORRAR"
            closeText="CERRAR"
            openText="ABRIR"
            options={roles}
            getOptionLabel={(rol) =>
              rol.Nombre || "SELECCIONE ROL"
            }
            value={rol}
            onChange={(event, newValue) => {
              if (newValue != null) {
                setRol(newValue);
                // setErrores({
                //   ...errores,
                //   secretaria: {
                //     valid: false,
                //     text: "Ingresa secretaria valida",
                //   },
                // });
              }
            }}
            renderInput={(params) => (
              <TextField
                key={params.id}
                {...params}
                variant="outlined"
              // error={errores.secretaria.valid}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6.5} lg={8.2}>
          <Typography variant="h6">MENÚ</Typography>
          <Autocomplete
            noOptionsText="NO SE ENCONTRARON OPCIONES"
            clearText="BORRAR"
            closeText="CERRAR"
            openText="ABRIR"
            options={menus}
            getOptionLabel={(menu) =>
              menu.Label || "SELECCIONE MENÚ"
            }
            value={menu}
            onChange={(event, newValue) => {
              if (newValue != null) {
                setMenu(newValue);
                // setErrores({
                //   ...errores,
                //   secretaria: {
                //     valid: false,
                //     text: "Ingresa secretaria valida",
                //   },
                // });
              }
            }}
            renderInput={(params) => (
              <TextField
                key={params.id}
                {...params}
                variant="outlined"
              // error={errores.secretaria.valid}
              />
            )}
          />
        </Grid>

        <Grid
          item
          xs={12}
          md={5.5}
          lg={3.8}
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          paddingTop={3}
        >


          {value !== "Preguntas" ? (

            <Button
              variant="contained"
              sx={queries.buttonCancelarSolicitudInscripcion}

              //className="aceptar"
              //hidden
              //disabled={modo == "Editar Nombre Video" || !TabValue}
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

          {value == "Videos" && nombreArchivo !== '' ? (
            <>
              <Button
                variant="contained"
                sx={queries.buttonContinuarSolicitudInscripcion}
                className="aceptar"
                //hidden
                //disabled={modo == "Editar Nombre Video" || !TabValue}
                component="label"
                //className="aceptar"
                onClick={() => {
                  if (rol.Id !== ""){
                    if (menu.Id !== "") {
                    setslideropen(true)

                    saveFile(value, { nombreArchivo: nombreArchivo, archivo: newVideo }, menu.Id, rol.Id, pregunta, respuesta, handleClose);

                  }
                  else {

                    alertaError("SELECCIONE UN MENÚ")
                  }
                  }
                  else {
                    alertaError("SELECCIONE UN ROL")
                  }
                  
                }

                }
              >
                GUARDAR
              </Button>
            </>
          ) : (
            ""
          )}

          {value == "Guías" && nombreArchivo !== '' ? (
            <>
              <Button
                sx={queries.buttonContinuarSolicitudInscripcion}

                className="aceptar"
                onClick={() => {
                  if (rol.Id !== ""){
                    if (menu.Id !== "") {
                    if (pregunta !== "") {
                      setslideropen(true)

                      saveFile(value, { nombreArchivo: nombreArchivo, archivo: newVideo }, menu.Id, rol.Id, pregunta, respuesta, handleClose)
                    }
                    else {
                      alertaError("ESCRIBA TÍTULO DE GUÍA")
                    }
                  }
                  else {
                    alertaError("SELECCIONE UN MENÚ")
                  }
                  }
                  else {
                    alertaError("SELECCIONE UN ROL")
                  }

                }

                }
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
                sx={queries.buttonContinuarSolicitudInscripcion}

                className="aceptar"
                onClick={() => {
                  if (rol.Id !== ""){
                    if (menu.Id !== "") {
                    if (pregunta !== "") {
                      if (respuesta !== "") {
                        setslideropen(true)

                        let datos = {
                          IdMenu: menu.Id,
                          IdRol: rol.Id,
                          Pregunta: pregunta,
                          Texto: respuesta,
                          RutaGuia: "",
                          RutaVideo: "",
                          NombreArchivo: "",
                          NombreArchivoServidor: "",
                          IdUsuario: localStorage.getItem("IdUsuario") || ""
                        }
                        createAyuda(datos, handleClose)
                      }
                      else {
                        alertaError("ESCRIBA UNA RESPUESTA")

                      }
                    }
                    else {
                      alertaError("ESCRIBA UNA PREGUNTA")
                    }
                  }

                  else {
                    alertaError("SELECCIONE UN MENÚ")
                  }
                  }
                  else {
                    alertaError("SELECCIONE UN ROL")
                  }
                  
                }

                }
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
            spacing={1}
            xs={12}
            sm={12}
            md={12}
            lg={12}
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ padding: "1%" }}
          ></Grid>
          <Grid container>
            <Grid>
              <Typography variant="h6">NOMBRE DEL ARCHIVO: </Typography>
            </Grid>
            <Grid item xs={12}>
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
          </Grid>
          {value == "Guías" ? (
            <Grid container>
              <Grid>
                <Typography variant="h6">
                PREGUNTA / TÍTULO DE GUÍA:{" "}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  id="nombreEvento"
                  value={pregunta}
                  fullWidth
                  variant="outlined"
                  size="small"
                  inputProps={{ maxLength: 300 }}


                  onChange={(v) => setPregunta(v.target.value)}
                  sx={{ paddingBottom: "10px" }}
                />
              </Grid>
            </Grid>
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
            xs={12}
            sm={12}
            md={12}
            lg={12}
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ padding: "1%" }}
          ></Grid>
          <Grid container>
            <Grid>
              <Typography variant="h6">PREGUNTA</Typography>
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
          </Grid>

          <Grid container>
            <Grid>
              <Typography variant="h6">RESPUESTA</Typography>
            </Grid>
            <Grid item xs={12}>
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
          </Grid>
        </>
      ) : null}

      {value == "Videos" || value == "Guías" ?

        (<Grid container item height={"100vh"} width={"100vw"} sx={{ display: "flex", justifyContent: "Center", alignItems: "center" }}>

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
        </Grid>) :
        null}

      <Grid>
      </Grid>


    </ModalForm>
    // </Dialog>
  );
};

export default AyudasModal;

