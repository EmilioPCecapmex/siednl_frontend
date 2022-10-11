import React, { useEffect, useState } from "react";
import {
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Input,
} from "@mui/material";
import { Header } from "../../components/header/Header";
import { LateralMenu } from "../../components/lateralMenu/LateralMenu";
import axios from "axios";
import { IUsuarios } from "./interfaces";
import Swal from "sweetalert2";
import SearchIcon from "@mui/icons-material/Search";

import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";

export const Notification = () => {
  const [usuarios, setUsuarios] = useState<Array<IUsuarios>>();
  const [titulo, setTitulo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState("");

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const [errorForm, setErrorForm] = useState({
    visible: false,
    text: "",
    type: "",
  });

  const limpiaForm = () => {
    setTitulo("");
    setMensaje("");
    setUsuarioSeleccionado("");
    setCheckedEmail(false)
    setErrorForm({
      visible: false,
      text: "",
      type: "",
    });
  };

  const revisaForm = () => {
    if (usuarioSeleccionado === "") {
      setErrorForm({
        visible: true,
        text: "Selecciona un usuario",
        type: "user",
      });
    } else if (titulo === "") {
      setErrorForm({
        visible: true,
        text: "Ingresa Titulo",
        type: "titulo",
      });
    } else if (mensaje === "") {
      setErrorForm({
        visible: true,
        text: "Ingresa Mensaje",
        type: "mensaje",
      });
    } else {
      enviarNotificacion();
    }
  };

  const enviarNotificacion = () => {
    axios
      .post(
        "http://10.200.4.105:8000/api/create-notif",
        {
          IdUsuarioDestino: usuarioSeleccionado,
          Titulo: titulo,
          Mensaje: mensaje,
          IdUsuarioCreador: localStorage.getItem("IdUsuario"),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        if (r.status === 200) {

          if(checkedEmail) {
            enviarNotificacionMail();
          }else{
            limpiaForm();
            getNotifEnviadas();
            Toast.fire({
              icon: "success",
              title: "Notificación enviada",
            });
          }
          }


     
      });
  };

  const enviarNotificacionMail = () => {
    axios
      .post(
        "http://10.200.4.105:8000/api/send-email",
        {
          IdDestinatario: usuarioSeleccionado,
          IdRemitente: localStorage.getItem("IdUsuario"),
          subject: titulo,
          message: mensaje
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        if (r.status === 201) {
          limpiaForm();
          getNotifEnviadas();
          Toast.fire({
            icon: "success",
            title: "Notificación enviada",
          });
        }
      });
  };

  const getUsuarios = () => {
    axios
      .get("http://10.200.4.105:8000/api/usuarios", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setUsuarios(response.data.data);
      });
  };

  useEffect(() => {
    getUsuarios();
  }, []);

  const [notif, setNotif] = useState<Array<INotificaciones>>([]);
  const [notifFilter, setNotifFilter] = useState<Array<INotificaciones>>([]);

  const filterN = (v: string) => {
    setNotifFilter(
      notif.filter(
        (x) =>
          x.NombreUsuarioDestino.toLowerCase().includes(v) ||
          x.FechaCreacion.toLowerCase().includes(v) ||
          (x.Deleted ? "Leído" : "No Leído").toLowerCase().split(" ")[0].includes(v) ||
          x.Titulo.toLowerCase().includes(v) ||
          x.Mensaje.toLowerCase().includes(v)
      )
    );
  };

  const getNotifEnviadas = () => {
    axios
      .post(
        "http://10.200.4.105:8000/api/notif-enviadas",
        {
          IdUsuario: localStorage.getItem("IdUsuario"),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        if (r.status === 200) {
          setNotif(r.data.data);
          setNotifFilter(r.data.data);
        }
      });
  };

  useEffect(() => {
    getNotifEnviadas();
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - notif.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [checkedEmail, setCheckedEmail] = useState(false)

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 10fr",
        backgroundColor: "#F2F2F2",
      }}
    >
      <LateralMenu selection={7} />
      <Header
        details={{
          name1: "Notificaciones",
          path1: "../notifications",
          name2: "",
          path2: "#",
          name3: "",
        }}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "30%",
            height: "15vh",
            backgroundColor: "#fff",
            display: "flex",
            borderRadius: 10,
            boxShadow: 5,
            alignItems: "center",
            justifyContent: "space-evenly",
            ml: "5vw",
          }}
        >
          <FormControl>
            <InputLabel id="UsuarioLabel" sx={{ fontFamily: "MontserratBold" }}>
              Usuario
            </InputLabel>
            <Select
              labelId="UsuarioLabel"
              error={errorForm.type === "user" ? errorForm.visible : false}
              label="Usuario"
              sx={{ width: "20vw" }}
              onChange={(v) => setUsuarioSeleccionado(v.target.value as string)}
              value={usuarioSeleccionado || ""}
            >
              <MenuItem value="00-00">
                <Typography sx={{ fontFamily: "MontserratMedium" }}>
                  Todos
                </Typography>
              </MenuItem>

              {usuarios?.map((item) => {
                return (
                  <MenuItem key={item.Id} value={item.Id}>
                    <Typography sx={{ fontFamily: "MontserratMedium" }}>
                      {item.Nombre +
                        " " +
                        item.ApellidoPaterno +
                        " " +
                        item.ApellidoMaterno}
                      {" | " + item.NombreUsuario}
                    </Typography>
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText sx={{ color: "#ff0000" }}>
              {errorForm.type === "user" ? errorForm.text : null}
            </FormHelperText>
          </FormControl>
        </Box>
        <Box sx={{ display: "flex", height: "60%", width: "100%" }}>
          <Box
            sx={{
              mt: "5vh",
              width: "30%",
              height: "100%",
              backgroundColor: "#fff",
              display: "flex",
              borderRadius: 10,
              boxShadow: 5,
              alignItems: "center",
              flexDirection: "column",
              ml: "5vw",
            }}
          >
            <TextField
              label="Titulo"
              sx={{ width: "70%", mt: "10vh" }}
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratBold",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratMedium",
                },
              }}
              onChange={(v) => setTitulo(v.target.value)}
              value={titulo}
              error={errorForm.type === "titulo" ? errorForm.visible : false}
              helperText={errorForm.type === "titulo" ? errorForm.text : null}
            />

            <TextField
              multiline
              rows={7}
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratBold",
                },
              }}
              label="Mensaje"
              value={mensaje}
              onChange={(v) => setMensaje(v.target.value)}
              sx={{ width: "70%", mt: "10vh" }}
              error={errorForm.type === "mensaje" ? errorForm.visible : false}
              helperText={errorForm.type === "mensaje" ? errorForm.text : null}
              InputProps={{
                style: {
                  fontFamily: "MontserratMedium",
                },
              }}
            />
            <FormGroup
              sx={{ width: "70%", display: "flex", alignItems: "center" }}
            >
              <FormControlLabel
                control={<Checkbox checked={checkedEmail} onChange={(v) => setCheckedEmail(v.target.checked)} />}
                label={
                  <Typography
                    sx={{ fontFamily: "MontserratMedium", fontSize: ".7vw" }}
                  >
                    Enviar notificación por email
                  </Typography>
                }
              />
            </FormGroup>

            <Button
              variant="contained"
              color="inherit"
              sx={{ mt: "2vh", ml: "60%" }}
              onClick={() => revisaForm()}
            >
              <Typography
                sx={{ fontFamily: "MontserratMedium", fontSize: ".7vw" }}
              >
                Enviar
              </Typography>
            </Button>
          </Box>
          <Box
            sx={{
              mt: "5vh",
              width: "50%",
              height: "100%",
              backgroundColor: "#fff",
              display: "flex",
              borderRadius: 10,
              boxShadow: 5,
              alignItems: "center",
              flexDirection: "column",
              ml: "5vw",
            }}
          >
            <Box
              sx={{
                display: "flex",
                borderBottom: 1,
                borderColor: "#D7D7D7",
                height: "6vh",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "MontserratBold",
                  fontSize: ".8vw",
                  width: "100%",
                  color: "#616161",
                  ml: "2vw",
                }}
              >
                HISTORIAL DE NOTIFICACIONES ENVIADAS
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Input
                  disableUnderline
                  sx={{
                    width: "10vw",
                    border: 1,
                    borderRadius: 5,
                    borderColor: "#ccc",
                    fontFamily: "MontserratLight",
                    fontSize: ".7vw",
                  }}
                  onChange={(x) => filterN(x.target.value)}
                />
                <SearchIcon sx={{ mr: "1vw", color: "#616161" }} />
              </Box>
            </Box>

            <Box sx={{ width: "100%", height: "100%", overflow: "hidden" }}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: '#E8E8E8',
                  height: "3vh",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "MontserratBold",
                    fontSize: ".7vw",
                    width: "20%",
                    textAlign: "center",
                  }}
                >
                  Usuario
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "MontserratBold",
                    fontSize: ".7vw",
                    width: "20%",
                    textAlign: "center",
                  }}
                >
                  Fecha Envío
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "MontserratBold",
                    fontSize: ".7vw",
                    width: "20%",
                    textAlign: "center",
                  }}
                >
                  Estatus
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "MontserratBold",
                    fontSize: ".7vw",
                    width: "20%",
                    textAlign: "center",
                  }}
                >
                  Título
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "MontserratBold",
                    fontSize: ".7vw",
                    width: "20%",
                    textAlign: "center",
                  }}
                >
                  Mensaje
                </Typography>
              </Box>
              <TableContainer
                component={Paper}
                sx={{
                  width: "100%",
                  height: "85%",
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
                <Table>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? notifFilter.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : notifFilter
                    ).map((row) => (
                      <TableRow key={row.Id}>
                        <TableCell
                          sx={{
                            fontFamily: "MontserratLight",
                            width: "20%",
                            textAlign: "center",
                          }}
                          component="th"
                          scope="row"
                        >
                          {row.NombreUsuarioDestino}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "MontserratLight",
                            width: "20%",
                            textAlign: "center",
                          }}
                          component="th"
                          scope="row"
                        >
                          {row.FechaCreacion.toString()
                            .replace("T", " ")
                            .replace(".000Z", "")}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "MontserratLight",
                            width: "20%",
                            textAlign: "center",
                          }}
                          component="th"
                          scope="row"
                        >
                          {row.Deleted ? "Leído" : "No Leído"}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "MontserratLight",
                            width: "20%",
                            textAlign: "center",
                          }}
                          component="th"
                          scope="row"
                        >
                          {row.Titulo}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "MontserratLight",
                            width: "20%",
                            textAlign: "center",
                          }}
                          component="th"
                          scope="row"
                        >
                          {row.Mensaje}
                        </TableCell>
                      </TableRow>
                    ))}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <TablePagination
                  rowsPerPageOptions={[7]}
                  colSpan={3}
                  count={notifFilter.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  component="div"
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                  sx={{ borderBottom: 0 }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export interface INotificaciones {
  Id: string;
  NombreUsuarioDestino: string;
  FechaCreacion: string;
  Titulo: string;
  Mensaje: string;
  Deleted: number;
}
