import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import axios from "axios";
import { Typography } from "@mui/material";
import Swal from "sweetalert2";
import {
  TextField,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  IconButton,
  Button,
} from "@mui/material";

import MessageIcon from "@mui/icons-material/Message";
import moment from "moment";
import { IIUserXInst } from "./ModalEnviarMIR";
import { alertaError, alertaExito } from "../genericComponents/Alertas";
import { create_coment_mir, soliModyNoty, obtenerComentarios, enviarNotificacionRol } from "../genericComponents/axiosGenericos";

export const ComentDialogMir = ({
  estado,
  id,
  actualizado,
}: {
  estado: string;
  id: string;
  actualizado: Function;
}) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const [coments, setComents] = React.useState([
    {
      Comentario: "",
      NombreUsuario: "",
      FechaCreacion: "DD/MM/YYYY HH:mm:SS",
      Deleted: 0,
      error: "",
      MIR_MA: "",
    },
  ]);

  const [open, setOpen] = React.useState(false);
  const [newComent, setNewComent] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewComent(false);
    setComent("");
  };

  const [userXInst, setUserXInst] = React.useState<Array<IIUserXInst>>([]);

  const getUsuariosXInstitucion = () => {
    axios
      .post(process.env.REACT_APP_APPLICATION_BACK + "/api/tipo-usuario", 
        {
          TipoUsuario: localStorage.getItem("Rol"),
          IdEntidad: localStorage.getItem("IdEntidad"),
          IdApp: localStorage.getItem("dApp"),
       },
       {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },

      })
      .then((r) => {
        if (r.status === 200) {
          setUserXInst(r.data.data);
        }
      });
  };

  React.useEffect(() => {
    if (open) {
      getUsuariosXInstitucion();
    }
  }, [open]);

  const [coment, setComent] = React.useState("");

  

  const comentMir = () => {
    
      create_coment_mir(id, coment, "MIR")
      .then((r) => {
        if (estado !== "En Captura") {
          // eslint-disable-next-line array-callback-return
          enviarNotificacionRol("FT", "Nuevo comentario Ficha Tecnica", id, ["Verificador"])
        }
       
        setNewComent(false);
        setComent("");
        handleClose();
        actualizado();
        alertaExito(()=>{}, "Comentario añadido")
       
      })
      .catch((err) => {
        alertaError("Se produjo un error")
       
      });
  };



  // React.useEffect(() => {
  //   axios
  //     .get(process.env.REACT_APP_APPLICATION_BACK + "/api/get-coment-mir", {
  //       params: {
  //         IdMir: id,
  //       },
  //       headers: {
  //         Authorization: localStorage.getItem("jwtToken") || "",
  //       },
  //     })
  //     .then((r) => {
  //       setComents(r.data.data);
  //     });
  // }, [actualizado, id]);

  React.useEffect(() => {
    obtenerComentarios(id,  setComents);
  }, [actualizado, id]);

  const isComentEmpty = () => {
    return !/^\s*$/.test(coment);
  };

  return (
    <Box>
      <Tooltip title="COMENTARIOS">
        <span>
          <IconButton onClick={handleClickOpen}>
            <MessageIcon
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

      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
          >
            <TableContainer
              sx={{
                borderRadius: 1,
                "&::-webkit-scrollbar": {
                  width: ".1vw",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "rgba(0,0,0,.5)",
                  outline: "1px solid slategrey",
                  borderRadius: 10,
                },
              }}
            >
              <Table>
                <TableHead sx={{ backgroundColor: "#edeaea" }}>
                  <TableRow>
                    <TableCell
                      sx={{ fontFamily: "MontserratBold" }}
                      align="center"
                    >
                      Usuario
                    </TableCell>
                    <TableCell
                      sx={{ fontFamily: "MontserratBold" }}
                      align="center"
                    >
                      Comentario
                    </TableCell>
                    <TableCell
                      sx={{ fontFamily: "MontserratBold" }}
                      align="center"
                    >
                      Fecha de envío
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {coments.length >= 1 && !coments[0]?.error ? (
                    coments.map((row, index) =>
                      row.MIR_MA === "MIR" ? (
                        <TableRow key={index}>
                          <TableCell
                            sx={{
                              fontFamily: "MontserratRegular",
                              fontSize: ".7vw",
                            }}
                            align="center"
                          >
                            {row.NombreUsuario}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontFamily: "MontserratRegular",
                              fontSize: ".7vw",
                            }}
                            align="center"
                          >
                            {row.Comentario}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontFamily: "MontserratRegular",
                              fontSize: ".7vw",
                            }}
                            align="center"
                          >
                            {moment(row.FechaCreacion, moment.ISO_8601)
                              .format("DD/MM/YYYY HH:mm:SS")
                              .toString()}
                          </TableCell>
                        </TableRow>
                      ) : null
                    )
                  ) : (
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "MontserratRegular",
                          fontSize: ".7vw",
                        }}
                        align="center"
                      >
                        Sin Comentarios
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <TextField
              multiline
              rows={3}
              InputProps={{
                style: {
                  fontFamily: "MontserratRegular",
                },
              }}
              sx={{ width: "30vw" }}
              placeholder="Añada un comentario para poder Agregar"
              onChange={(v) => setComent(v.target.value)}
            ></TextField>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBlockEnd: "1vh",
              paddingBlockEnd: "1vh",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-evenly",
                width: "100vw",
                mt: "4vh",
              }}
            >
              <Button
                className="cancelar"
                variant="contained"
                onClick={handleClose}
              >
                <Typography
                  sx={{ fontFamily: "MontserratMedium",  }}
                >
                  Cancelar
                </Typography>{" "}
              </Button>
              <Button
               // sx={queries.buttonContinuarSolicitudInscripcion}
               className="aceptar"
                variant="contained"
                disabled={estado === "Autorizada" && isComentEmpty()}
                color="info"
                onClick={() => {
                  if (isComentEmpty()) {
                    comentMir();
                  }
                }}
              >
                <Typography
                  sx={{ fontFamily: "MontserratMedium",  }}
                >
                  {"Agregar"}
                </Typography>
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ComentDialogMir;
