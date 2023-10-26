import { useEffect, useState } from "react";
import { Autocomplete, Button, Grid, TextField, Typography } from "@mui/material";
import ModalForm from "../../components/ModalForm";
import { createAyuda, getMenus, saveFile } from "./ServicesAyuda";
import { alertaError } from "../../components/alertas/Alertas";

export interface ILista {
  Id: string;
  Label: string;
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

export interface IFile { archivo: File; nombreArchivo: string }

export const AyudasModal = ({
  value,
  handleClose,
}: {
  value: string;
  handleClose: Function;
}) => {

  const [menu, setMenu] = useState<ILista>({ Id: "", Label: "" });
  const [menus, setMenus] = useState<ILista[]>([]);

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
      alertaError("¡No es un archivo valido!")

    }
  }


  useEffect(() => { getMenus(setMenus) }, [])


  return (

    <ModalForm title={"Administración de " + value} handleClose={handleClose}>
      {/* <SliderProgress open={slideropen} texto={"Cargando..."}></SliderProgress> */}

      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={12} md={6.5} lg={8.2}>
          <Typography variant="h6">Menú</Typography>
          <Autocomplete
            noOptionsText="No se encontraron opciones"
            clearText="Borrar"
            closeText="Cerrar"
            openText="Abrir"
            options={menus}
            getOptionLabel={(menu) =>
              menu.Label || "Seleccione Menú"
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

              className="aceptar"
              //hidden
              //disabled={modo == "Editar Nombre Video" || !TabValue}
              component="label"
            >

              Seleccionar {value}
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

                className="aceptar"
                onClick={() => {
                  if (menu.Id !== "") {
                    setslideropen(true)

                    saveFile(value, { nombreArchivo: nombreArchivo, archivo: newVideo }, menu.Id, pregunta, respuesta, handleClose);

                  }
                  else {
                    alertaError("Seleccione un menú")
                  }
                }

                }
              >
                Guardar
              </Button>
            </>
          ) : (
            ""
          )}

          {value == "Guías" && nombreArchivo !== '' ? (
            <>
              <Button

                className="aceptar"
                onClick={() => {
                  if (menu.Id !== "") {
                    if (pregunta !== "") {
                      setslideropen(true)

                      saveFile(value, { nombreArchivo: nombreArchivo, archivo: newVideo }, menu.Id, pregunta, respuesta, handleClose)
                    }
                    else {
                      alertaError("Escriba título de guía")
                    }
                  }
                  else {
                    alertaError("Seleccione un menú")
                  }
                }

                }
              >
                Guardar
              </Button>
            </>
          ) : (
            ""
          )}

          {value == "Preguntas" ? (
            <>
              <Button

                className="aceptar"
                onClick={() => {
           
                  if (menu.Id !== "") {
                    if (pregunta !== "") {
                      if (respuesta !== "") {
                        setslideropen(true)

                        let datos = {
                          IdMenu: menu.Id,
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
                        alertaError("Escriba una respuesta")

                      }
                    }
                    else {
                      alertaError("Escriba una pregunta")
                    }
                  }

                  else {
                    alertaError("Seleccione un menú")
                  }
                }

                }
              >
                Guardar
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
              <Typography variant="h6">Nombre del archivo: </Typography>
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
                  Pregunta / Título de guía:{" "}
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
              <Typography variant="h6">Pregunta</Typography>
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
              <Typography variant="h6">Respuesta</Typography>
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
  );
};

export default AyudasModal;

