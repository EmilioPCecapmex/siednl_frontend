import React, { useEffect, useState } from "react";
import {
  Grid,
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
import { useNavigate } from "react-router-dom";
//import { TutorialGrid } from "../../components/tutorialGrid/tutorialGrid";
import { queries } from "../../queries";

export const Notification = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("Rol") !== "Administrador") {
      navigate("../home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    setCheckedEmail(false);
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
      soliModyNoty();
      enviarNotificacionMail();
    }
  };

  const soliModyNoty = () => {
    axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/create-notif",
        {
          IdUsuarioDestino: usuarioSeleccionado,
          Titulo: titulo,
          Mensaje: mensaje,
          CreadoPor: localStorage.getItem("IdUsuario"),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        if (r.status === 200) {
          if (checkedEmail) {
            enviarNotificacionMail();
          } else {
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
        process.env.REACT_APP_APPLICATION_BACK + "/api/send-email",
        {
          IdDestinatario: usuarioSeleccionado,
          IdRemitente: localStorage.getItem("IdUsuario"),
          subject: titulo,
          message: mensaje,
          Rol: localStorage.getItem("Rol")
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

  // const getUsuarios = () => {
  //   axios
  //     .get(
  //       process.env.REACT_APP_APPLICATION_BACK + "/api/usuarios",

  //       {
  //         params: {
  //           IdUsuario: localStorage.getItem("IdUsuario"),
  //           IdEntidad: "",
  //           Rol: localStorage.getItem("Rol"),
  //         },
  //         headers: {
  //           Authorization: localStorage.getItem("jwtToken") || "",
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       setUsuarios(response.data.data);
  //     });
  // };

  useEffect(() => {
    //getUsuarios();
    getNotifEnviadas();
  }, []);

  const [notif, setNotif] = useState<Array<INotificaciones>>([]);
  const [notifFilter, setNotifFilter] = useState<Array<INotificaciones>>([]);

  const filterN = (v: string) => {
    setNotifFilter(
      notif.filter(
        (x) =>
          x.NombreUsuarioDestino.toLowerCase().includes(v) ||
          x.FechaCreacion.toLowerCase().includes(v) ||
          (x.Deleted ? "Leído" : "No Leído")
            .toLowerCase()
            .split(" ")[0]
            .includes(v) ||
          x.Titulo.toLowerCase().includes(v) ||
          x.Mensaje.toLowerCase().includes(v)
      )
    );
  };

  const getNotifEnviadas = () => {
    axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/notif-enviadas",
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

  const [checkedEmail, setCheckedEmail] = useState(false);

  return (
    <Grid
    container justifyContent={"space-between"}
    >
      <Grid item xl={12 } height={"7vh"}>
        <LateralMenu selection={"Notificaciones"} actionNumber={0} />
        {/* <TutorialGrid initialState={13} endState={17} /> */}
      </Grid>

      {/* <Grid gridArea={"header"} sx={{ height: "8vh" }}>
        <Header
          details={{
            name1: "Notificaciones",
            path1: "../notifications",
            name2: "",
            path2: "#",
            name3: "",
          }}
        />
      </Grid> */}

      <Grid
        sx={{
          display: "grid",
          width: "100%",
          height: "92vh",
          flexDirection: "column",
          alignItems: "center",
          justifyItems: "center",
          gridTemplateAreas: `
                            'send hist'
                           `,
        }}
        gridArea={"main"}
      >
        <Grid
          sx={{
            width: "90%",
            height: "70%",
            backgroundColor: "#fff",
            display: "flex",
            borderRadius: 10,
            boxShadow: 20,
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
          gridArea={"send"}
        >
          <Typography>Enviar notificación</Typography>

          <FormControl>
            <InputLabel
              id="UsuarioLabel"
              sx={{ fontFamily: "MontserratSemiBold" }}
            >
              Usuario
            </InputLabel>
            <Select
              labelId="UsuarioLabel"
              error={errorForm.type === "user" ? errorForm.visible : false}
              label="Usuario"
              sx={{ width: "22vw" }}
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
          <TextField
            label="Titulo"
            sx={{ width: "70%" }}
            InputLabelProps={{
              style: {
                fontFamily: "MontserratSemiBold",
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
                fontFamily: "MontserratSemiBold",
              },
            }}
            label="Mensaje"
            value={mensaje}
            onChange={(v) => setMensaje(v.target.value)}
            sx={{ width: "70%" }}
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
              control={
                <Checkbox
                  checked={checkedEmail}
                  onChange={(v) => setCheckedEmail(v.target.checked)}
                />
              }
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
            
            sx={queries.buttonContinuarSolicitudInscripcion}
            onClick={() => revisaForm()}
          >
            <Typography
              sx={{ fontFamily: "MontserratMedium", fontSize: ".7vw" }}
            >
              Enviar
            </Typography>
          </Button>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            borderBottom: 1,
            borderColor: "#D7D7D7",
            height: "70vh",
            width: "35vw",
            alignItems: "center",
            bgcolor: "#fff",
            boxShadow: 20,
            borderRadius: 10,
          }}
          gridArea={"hist"}
        >
          <Typography
            sx={{
              fontFamily: "MontserratSemiBold",
              fontSize: ".8vw",
              width: "100%",
              color: "#616161",
              textAlign: "center",
            }}
          >
            HISTORIAL DE NOTIFICACIONES ENVIADAS
          </Typography>

          <Grid sx={{ display: "flex", alignItems: "center" }}>
            <Input
              disableUnderline
              sx={{
                width: "15vw",
                border: 1,
                borderRadius: 5,
                borderColor: "#ccc",
                fontFamily: "MontserratLight",
                fontSize: ".7vw",
                m: 1,
              }}
              onChange={(x) => filterN(x.target.value)}
            />
            <SearchIcon sx={{ mr: "1vw", color: "#616161" }} />
          </Grid>
          <Grid
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              backgroundColor: "#E8E8E8",
              height: "3vh",
            }}
          >
            <Typography
              sx={{
                fontFamily: "MontserratSemiBold",
                fontSize: ".7vw",
                width: "20%",
                textAlign: "center",
              }}
            >
              Usuario
            </Typography>
            <Typography
              sx={{
                fontFamily: "MontserratSemiBold",
                fontSize: ".7vw",
                width: "20%",
                textAlign: "center",
              }}
            >
              Fecha Envío
            </Typography>
            <Typography
              sx={{
                fontFamily: "MontserratSemiBold",
                fontSize: ".7vw",
                width: "20%",
                textAlign: "center",
              }}
            >
              Estatus
            </Typography>
            <Typography
              sx={{
                fontFamily: "MontserratSemiBold",
                fontSize: ".7vw",
                width: "15%",
                textAlign: "center",
              }}
            >
              Título
            </Typography>
            <Typography
              sx={{
                fontFamily: "MontserratSemiBold",
                fontSize: ".7vw",
                width: "25%",
                textAlign: "center",
              }}
            >
              Mensaje
            </Typography>
          </Grid>
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
                  <TableRow key={row.Id || 0}>
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
                      {row.FechaCreacion?.toString()
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
                      {row.Deleted
                        ? "Leído"
                        : row.Deleted === 0
                        ? "No Leído"
                        : "Sin historial"}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "MontserratLight",
                        width: "15%",
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
                        width: "25%",
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
            sx={{
              width: "100%",
              bgcolor: "#fff",
              overflow: "hidden",
              borderRadius: 10,
            }}
          />
        </Grid>
      </Grid>
    </Grid>
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
