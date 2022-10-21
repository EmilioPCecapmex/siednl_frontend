import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Typography } from "@mui/material";
import Swal from "sweetalert2";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input,
  TextField,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Autocomplete,
  Tooltip,
  IconButton,
  Button,
  TablePagination,
} from "@mui/material";

import MessageIcon from "@mui/icons-material/Message";
import moment from "moment";

export const ComentDialogMir = ({
  id,
  actualizado,
}: {
  id: string;
  actualizado: Function;
}) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 5000,
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
    setComent('');
  };


  const getComents = () => {
    console.log(id);

    axios
      .get("http://10.200.4.199:8000/api/coment-mir", {
        params: {
          IdMir: id,
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        console.log(r);

        setComents(r.data.data);
      });
  };

  const [coment, setComent] = React.useState("");

  const comentMir = () => {
    axios
      .post(
        "http://10.200.4.199:8000/api/coment-mir",
        {
          IdMir: id,
          Coment: coment,
          CreadoPor: localStorage.getItem("IdUsuario")
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        // console.log(r);
        setNewComent(false);
        setComent('');
        handleClose();
        actualizado();
        Toast.fire({
          icon: "success",
          title: "Comentario añadido",
        });
      })
      .catch((err) => {
        // console.log(err)
      });
  };

  

  React.useEffect(() => {
    getComents();
  }, [actualizado]);

  return (
    <Box>
      <IconButton onClick={handleClickOpen}>
        <MessageIcon
          sx={[
            {
              "&:hover": {
                color: "indigo",
              },
              width: "1.2vw",
              height: "1.2vw",
            },
          ]}
        />
      </IconButton>

      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {coments == null || coments[0].Comentario == null ? (
            <Typography
              sx={{ textAlign: "center", fontFamily: "MontserratBold" }}
            >
              {" "}
              Sin Comentarios{" "}
            </Typography>
          ) : (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
              }}
            >
              <TableContainer sx={{ borderRadius: 5 }}>
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
                    {coments.map((row, index) => (
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
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
          <Box sx={{display:'flex', justifyContent:'center'}}>
            {newComent ? (
            <TextField
              multiline
              rows={3}
              sx={{ width: "30vw", mt:2 }}
              placeholder="Agregar comentario"
              onChange={(v) => setComent(v.target.value)}
            ></TextField>
          ) : null}
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
                sx={{ display: "flex", width: "10vw" }}
                variant="contained"
                color="error"
                onClick={handleClose}
              >
                Cerrar ventana
              </Button>
              <Button
                sx={{ display: "flex", width: "10vw" }}
                variant="contained"
                color="info"
                onClick={() => {newComent ? comentMir() : setNewComent(true); }}
              >
                {newComent ? 'Añadir comentario' : 'Nuevo comentario' }
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ComentDialogMir;
