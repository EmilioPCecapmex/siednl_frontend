import { useState } from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import { TextField, Typography, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";

export function DialogCcp({
  open,
  handleClose,
  setTexto,
  fncSetCcp,
  setCcpCorreos,
  setCCp,
}: {
  open: boolean;
  handleClose: Function;
  setTexto: Function;
  fncSetCcp: Function;
  setCcpCorreos: Function;
  setCCp: Function;
}) {
  const [cc, setCc] = useState<Array<ICCP>>([
    {
      nombre: "",
      puesto: "",
      correo: "",
    },
  ]);

  const [noCc, setNoCc] = useState([1]);

  const fncAgregar = () => {
    let v = noCc.length + 1;
    setNoCc([...noCc, v]);

    let prevState = [...cc];
    prevState.push({
      nombre: "",
      puesto: "",
      correo: "",
    });
    setCc(prevState);
  };

  const fncEliminar = () => {
    let v = noCc.length - 1;
    if (v < 1) {
    } else {
      setNoCc(noCc.splice(0, v));
      let prevState = [...cc];
      prevState.pop();
      setCc(prevState);
    }
  };

  const confirmar = () => {
    let txt = "";
    let err = 0;

    cc.map((value: ICCP, index: number) => {
      if (
        /^[\s]*$/.test(value.nombre) ||
        /^[\s]*$/.test(value.puesto) ||
        !/^(([^<>()[\],;:\s@]+([^<>()[\],;:\s@]+)*)|(.+))@(([^<>()[\],;:\s@]+)+[^<>()[\],;:\s@]{2,})$/i.test(
          value.correo
        )
      ) {
        setError(true);
        err = 1;
        return err;
      } else {
        if (index === cc.length - 1) {
          txt = txt + value.nombre + " - " + value.puesto;
          return txt;
        } else {
          txt = txt + value.nombre + " - " + value.puesto + ", ";
          return txt;
        }
      }
    });

    if (err === 0) {
      handleClose();
    }
    setCCp(cc);
    setTexto(txt);
    fncSetCcp(cc);
    setCcpCorreos(JSON.stringify(cc));
  };

  const [error, setError] = useState(false);

  return (
    <Dialog fullWidth maxWidth="md" onClose={() => handleClose()} open={open}>
      <DialogTitle
        sx={{
          fontFamily: "MontserratBold",
          borderBottom: 1,
          height: "1vh",
          mb: 2,
          fontSize: {
            xs: "90%",
            sm: "90%",
            md: "80%",
            lg: "80%",
            xl: "100%",
          },
        }}
      >
        CCP
        {
          <Tooltip
            title="Cerrar Ventana"
            sx={{ position: "absolute", right: 20, cursor: "pointer" }}
            onClick={() => {
              handleClose();
            }}
          >
            <CloseIcon></CloseIcon>
          </Tooltip>
        }
        {
          <Tooltip
            title="Agregar usuario"
            sx={{ position: "absolute", right: 60, cursor: "pointer" }}
            onClick={() => {
              fncAgregar();
            }}
          >
            <AddIcon></AddIcon>
          </Tooltip>
        }
        {noCc.length === 1 ? null : (
          <Tooltip
            title="Remover usuario"
            sx={{ position: "absolute", right: 100, cursor: "pointer" }}
            onClick={() => {
              fncEliminar();
            }}
          >
            <RemoveIcon></RemoveIcon>
          </Tooltip>
        )}
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "&::-webkit-scrollbar": {
            width: ".3vw",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,.5)",
            outline: "1px solid slategrey",
            borderRadius: 10,
          },
        }}
      >
        <Typography
          sx={{
            fontFamily: "MontserratSemiBold",
            textAlign: "justify",
            fontSize: {
              xs: "60%",
              sm: "70%",
              md: "80%",
              lg: "80%",
              xl: "100%",
            },
            mb: 1,
          }}
        >
          Llenar informacion de los usuarios a los que se les adjuntará copia
          del documento
        </Typography>
        {noCc.map((item, index) => {
          return (
            <Box
              key={item}
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "1fr 3fr 2fr 4fr",
                  md: "1fr 3fr 2fr 4fr",
                  lg: "1fr 3fr 2fr 4fr",
                  xl: "1fr 3fr 2fr 4fr",
                },
                justifyContent: "center",
                justifyItems: "center",
                alignItems:'center'
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: "70%",
                    sm: "80%",
                    md: "80%",
                    lg: "80%",
                    xl: "100%",
                  },
                  fontFamily: "MontserratMedium",
                }}
              >
                Usuario {index + 1}
              </Typography>
              <TextField
                size="small"
                label={
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "80%",
                        sm: "80%",
                        md: "80%",
                        lg: "80%",
                        xl: "100%",
                      },
                      fontFamily: "MontserratSemiBold",
                    }}
                  >
                    Nombre
                  </Typography>
                }
                sx={{ width: "98%", m: 0.5 }}
                inputProps={{
                  sx: {
                    fontSize: {
                      xs: "70%",
                      sm: "80%",
                      md: "80%",
                      lg: "80%",
                      xl: "100%",
                    },
                  },
                }}
                value={cc[item - 1]?.nombre || ""}
                onChange={(c) => {
                  let prev = [...cc];
                  prev[item - 1].nombre = c.target.value;
                  setCc(prev);
                }}
                error={error && /^[\s]*$/.test(cc[item - 1]?.nombre)}
              ></TextField>
              <TextField
                size="small"
                label={
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "80%",
                        sm: "80%",
                        md: "80%",
                        lg: "80%",
                        xl: "100%",
                      },
                      fontFamily: "MontserratSemiBold",
                    }}
                  >
                    Puesto
                  </Typography>
                }
                sx={{ width: "98%", m: 0.5 }}
                inputProps={{
                  sx: {
                    fontSize: {
                      xs: "70%",
                      sm: "80%",
                      md: "80%",
                      lg: "80%",
                      xl: "100%",
                    },
                  },
                }}
                value={cc[item - 1]?.puesto || ""}
                onChange={(c) => {
                  let prev = [...cc];
                  prev[item - 1].puesto = c.target.value;
                  setCc(prev);
                }}
                error={error && /^[\s]*$/.test(cc[item - 1]?.puesto)}
              ></TextField>
              <TextField
                size="small"
                label={
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "80%",
                        sm: "80%",
                        md: "80%",
                        lg: "80%",
                        xl: "100%",
                      },
                      fontFamily: "MontserratSemiBold",
                    }}
                  >
                    Correo Electrónico
                  </Typography>
                }
                sx={{ width: "98%", m: 0.5 }}
                inputProps={{
                  sx: {
                    fontSize: {
                      xs: "70%",
                      sm: "80%",
                      md: "80%",
                      lg: "80%",
                      xl: "100%",
                    },
                  },
                }}
                value={cc[item - 1]?.correo || ""}
                onChange={(c) => {
                  let prev = [...cc];
                  prev[item - 1].correo = c.target.value.replace(" ", "");
                  setCc(prev);
                }}
                error={
                  error &&
                  (!/^(([^<>()[\],;:\s@]+([^<>()[\],;:\s@]+)*)|(.+))@(([^<>()[\],;:\s@]+)+[^<>()[\],;:\s@]{2,})$/i.test(
                    cc[item - 1]?.correo
                  ) ||
                    /^[\s]*$/.test(cc[item - 1]?.correo))
                }
                helperText={
                  !/^(([^<>()[\],;:\s@]+([^<>()[\],;:\s@]+)*)|(.+))@(([^<>()[\],;:\s@]+)+[^<>()[\],;:\s@]{2,})$/i.test(
                    cc[item - 1]?.correo
                  ) ? (
                    <Typography
                      sx={{
                        fontSize: {
                          xs: "80%",
                          sm: "80%",
                          md: "80%",
                          lg: "80%",
                          xl: "100%",
                        },
                        fontFamily: "MontserratSemiBold",
                      }}
                    >
                      Formato: correo123@dominio.com
                    </Typography>
                  ) : null
                }
              ></TextField>
            </Box>
          );
        })}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            confirmar();
          }}
          sx={{
            fontSize: {
              xs: "80%",
              sm: "80%",
              md: "80%",
              lg: "80%",
              xl: "100%",
            },
            fontFamily: "MontserratSemiBold",
          }}
        >
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export interface ICCP {
  nombre: string;
  puesto: string;
  correo: string;
}
