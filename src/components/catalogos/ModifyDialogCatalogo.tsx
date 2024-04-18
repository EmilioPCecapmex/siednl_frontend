/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import Swal from "sweetalert2";
import EditIcon from "@mui/icons-material/Edit";

import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";
import { queries } from "../../queries";
import { log } from "console";
import { ModifyPorCatalogo } from "./AxiosCatalogo";

export const ModifyDialogCatalogos = ({
  open,
  Id,
  tabla,
  descripcion,

  handleCloseMody,
}: {
  open: boolean;
  tabla: string;
  Id: string;
  descripcion: string;

  handleCloseMody: Function;
}) => {
  //const [open, setOpen] = React.useState(false);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const cerrardialog = () => {
    handleCloseMody();
  };

  const opendialog = () => {
    //handleClose();
    //actualizado();
    ModifyPorCatalogo(Id, tabla, nuevaDescripcion, handleCloseMody);
  };

  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();
  let date = today.getDate();
  let monthS = "";
  let dateS = "";

  React.useEffect(() => {
    today = new Date();
    year = today.getFullYear();
    month = today.getMonth();
    month = month + 1;
    date = today.getDate();

    if (month < 10) {
      monthS = "0" + month;
    } else {
      monthS = month.toString();
    }

    if (date < 10) {
      dateS = "0" + date;
    }

    setFechaCaptura(year + "-" + monthS + "-" + dateS);
  }, []);

  const [nuevaDescripcion, setnuevaDescripcion] = React.useState(descripcion || "");
  const [fechaCaptura, setFechaCaptura] = React.useState(
    year + "-" + monthS + "-" + dateS
  );

  

  const ModifyPorCatalogoProgramasP = () => {
    axios
      .put(
        process.env.REACT_APP_APPLICATION_BACK +
          "/api/modify-programaPresupuestario",
        {
          IdProgramaPresupuestario: Id,
          NuevoProgramaPresupuestario: nuevaDescripcion,
          //IdEntidad: institution,
          ModificadoPor: localStorage.getItem("IdUsuario"),
          Rol: localStorage.getItem("Rol"),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        cerrardialog();
      })
      .catch((err) =>
        Toast.fire({
          icon: "error",
          title: "Permisos denegados",
        })
      );
  };
  const [institution, setInstitution] = useState("0");

  // const getInstituciones = () => {
  //   axios
  //     .get(process.env.REACT_APP_APPLICATION_BACK + "/api/instituciones", {
  //       headers: {
  //         Authorization: localStorage.getItem("jwtToken") || "",
  //       },
  //       params: {
  //         IdUsuario: localStorage.getItem("IdUsuario"),
  //         IdEntidad: localStorage.getItem("IdEntidad"),
  //         Rol: localStorage.getItem("Rol")
  //       },
  //     })
  //     .then((r) => {
  //       setCatalogoInstituciones(r.data.data);
  //     });
  // };

  useEffect(() => {
    // getInstituciones();
  }, []);

  const [catalogoInstituciones, setCatalogoInstituciones] = useState([
    { Id: "", NombreInstitucion: "" },
  ]);

  if (tabla === "Programas Presupuestarios") {
    return (
      <Grid>
        <Dialog open={open} onClose={cerrardialog} fullWidth>
          <Grid
            sx={{
              width: "100%",
              height: "5vh",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              borderBottom: 0.5,
              borderColor: "#ccc",
              boxShadow: 1,
            }}
          >
            <Typography
              sx={{
                fontFamily: "MontserratSemiBold",
                width: "90%",
                fontSize: [10, 15, 15, 15, 15],
                textAlign: "center",
              }}
            >
              EDITAR ELEMENTO1
            </Typography>
          </Grid>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField
              multiline={descripcion.length < 10 ? false : true}
              sx={
                descripcion.length < 200 ? { width: "60%" } : { width: "80%" }
              }
              InputProps={{
                style: {
                  fontFamily: "MontserratLight",
                },
              }}
              rows={3}
              id="outlined-basic"
              // value={nuevaDescripcion || descripcion}
              // variant="outlined"
              value={nuevaDescripcion }
              variant="outlined"
              onChange={(v) => {
                let valor = v.target.value;
                if (valor === "") {
                  setnuevaDescripcion(""); // Establece la nueva descripción como una cadena vacía si el valor se borra
                } else {
                  setnuevaDescripcion(valor); // Establece la nueva descripción solo si el valor no es una cadena vacía
                }
              }}
            />

            <InputLabel>INSTITUCIÓN</InputLabel>
            <Select
              sx={
                descripcion.length < 200 ? { width: "60%" } : { width: "80%" }
              }
              value={institution}
              label="INSTITUCIÓN"
              onChange={(x) => setInstitution(x.target.value)}
            >
              <MenuItem value={"0"} key={0} disabled>
                SELECCIONA
              </MenuItem>
              {catalogoInstituciones.map((item) => {
                return (
                  <MenuItem value={item.NombreInstitucion} key={item.Id}>
                    {item.NombreInstitucion}
                  </MenuItem>
                );
              })}
            </Select>
          </DialogContent>

          <DialogActions
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button className="cacelar" onClick={cerrardialog}>
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                CANCELAR
              </Typography>
            </Button>

            <Button
              className="aceptar"
              onClick={ModifyPorCatalogoProgramasP}
              autoFocus
            >
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                DE ACUERDO
              </Typography>
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    );
  } else if (tabla === "PED") {
    return (
      <Grid>
        <Dialog open={open} onClose={cerrardialog}>
          <DialogTitle>{`Modificar  '${descripcion}'`}</DialogTitle>

          <DialogContent>
            <TextField
              id="outlined-basic"
              placeholder={"Introduzca elemento"}
              variant="outlined"
              onChange={(v) => setnuevaDescripcion(v.target.value)}
            />
          </DialogContent>

          <DialogActions onClick={cerrardialog}>
            <Button className="cancelar">CANCELAR</Button>

            <Button className="aceptar" onClick={opendialog} autoFocus>
              DE ACUERDO
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    );
  } else {
  
    return (
      <Grid>
        <Dialog open={open} onClose={cerrardialog} fullWidth>
          <Grid
            sx={{
              width: "100%",
              height: "5vh",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              borderBottom: 0.5,
              borderColor: "#ccc",
              //background: "Blue",
              boxShadow: 1,
            }}
          >
            <Typography
              sx={{
                fontFamily: "MontserratSemiBold",
                width: "90%",
                fontSize: [10, 15, 15, 15, 15],
                textAlign: "center",
              }}
            >
              EDITAR ELEMENTO
            </Typography>
          </Grid>

          <DialogContent
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField
              multiline={descripcion.length < 200 ? false : true}
              sx={
                descripcion.length < 200 ? { width: "60%" } : { width: "80%" }
              }
              InputProps={{
                style: {
                  fontFamily: "MontserratLight",
                },
              }}
              rows={5}
              id="outlined-basic" 
              value={nuevaDescripcion }
              variant="outlined"
              onChange={(v) => {
                let valor = v.target.value;
                if (valor === "") {
                  setnuevaDescripcion(""); // Establece la nueva descripción como una cadena vacía si el valor se borra
                } else {
                  setnuevaDescripcion(valor); // Establece la nueva descripción solo si el valor no es una cadena vacía
                }
              }}
            
            />
          </DialogContent>

          <DialogActions
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              // sx={queries.buttonCancelarSolicitudInscripcion}
              onClick={cerrardialog}
              className="cancelar"
            >
              <Typography
                sx={{
                  fontFamily: "MontserratMedium",
                  fontSize: [10, 15, 15, 15, 15],
                }}
              >
                CANCELAR
              </Typography>
            </Button>

            <Button
              //  sx={queries.buttonContinuarSolicitudInscripcion}
              onClick={opendialog}
              autoFocus
              className="aceptar"
            >
              <Typography
                sx={{
                  fontFamily: "MontserratMedium",
                  fontSize: [10, 15, 15, 15, 15],
                }}
              >
                DE ACUERDO
              </Typography>
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    );
  }
};

export default ModifyDialogCatalogos;
