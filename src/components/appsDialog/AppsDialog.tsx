import React, { useState, useLayoutEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import { Box, Autocomplete, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";
import { queries } from "../../queries";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

export const AppsDialog = ({
  id,
  actualizado,
}: {
  id: string;
  actualizado: Function;
}) => {
  const [open, setOpen] = React.useState(false);

  const [instituciones, setInstituciones] = useState<Array<IInstituciones>>([]);

  const [instSel, setInstSel] = useState<Array<IInstituciones>>([]);

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const verifica = () => {
    if (instSel.length <= 0) {
      Toast.fire({
        icon: "error",
        title: "Debes seleccionar al menos una institución.",
      });
    } else {
      agregaVinculo();
    }
  };

  const agregaVinculo = () => {
    axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK +
          "/api/vincular-usuarioInsitucion",
        {
          IdUsuario: id,
          IdInstitucion: instSel.map((item) => {
            return { IdInstitucion: item.Id };
          }),
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
          handleClose();
          Toast.fire({
            icon: "success",
            title: "Vinculación exitosa",
          });
          actualizado();
        }
      })
      .catch((err) =>
        Toast.fire({
          icon: "error",
          title: "Permisos denegados.",
        })
      );
  };

  useLayoutEffect(() => {
    if (open) {
      axios
        .get(
          process.env.REACT_APP_APPLICATION_BACK + "/api/usuarioInsitucion",
          {
            params: {
              IdUsuario: id,
              Rol: localStorage.getItem("Rol"),
            },
            headers: {
              Authorization: localStorage.getItem("jwtToken") || "",
            },
          }
        )
        .then((r) => {
          if (r.status === 200) {
            setInstSel(r.data.data);
          }
        });
        
      axios
        .get(process.env.REACT_APP_APPLICATION_BACK + "/api/instituciones", {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
          params: {
            IdUsuario: localStorage.getItem("IdUsuario"),
            IdInstitucion: localStorage.getItem("IdInstitucion"),
            Rol: localStorage.getItem("Rol") 
          },
        })
        .then((r) => {
          if (r.status === 200) {
            setInstituciones(r.data.data);
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Box>
      <Tooltip title="Instituciones">
        <span>
          <IconButton
            onClick={handleClickOpen}
            disabled={
              localStorage.getItem("Rol") === "Capturador" ? true : false
            }
          >
            <AppRegistrationIcon
              sx={[
                {
                  "&:hover": {
                    color: "red",
                  },
                },
              ]}
            />
          </IconButton>
        </span>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <Box
          sx={{
            width: "100%",
            height: "4vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: 1,
            boxShadow: 1,
            borderColor: "#cbcbcb",
          }}
        >
          <Typography sx={{ fontFamily: "MontserratBold", fontSize: "1vw" }}>
            Vincular Usuario - Institución
          </Typography>
        </Box>

        <DialogContent
          sx={{
            height: "40vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Autocomplete
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            multiple
            sx={{ width: "95%" }}
            options={instituciones}
            getOptionLabel={(option) => option.NombreInstitucion}
            value={instSel}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.Id}>
                  <div
                    style={{
                      fontFamily: "MontserratSemiBold",
                      fontSize: ".8vw",
                    }}
                  >
                    {option.NombreInstitucion}
                    <br></br>
                    <div
                      style={{
                        fontFamily: "MontserratLight",
                        fontSize: ".6vw",
                      }}
                    >
                      {option.Secretaria}
                    </div>
                  </div>
                </li>
              );
            }}
            renderInput={(params) => (
              <TextField {...params} label="Institución" />
            )}
            onChange={(event, value) => setInstSel(value)}
            isOptionEqualToValue={(option, value) => {
              if (value.Id === "" || value.Id === option.Id) {
                return true;
              } else {
                return false;
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
          <Button sx={queries.buttonCancelarSolicitudInscripcion} color="error" onClick={handleClose}>
            <Typography
              sx={{ fontFamily: "MontserratMedium", fontSize: ".8vw" }}
            >
              Cancelar
            </Typography>
          </Button>

          <Button sx={queries.buttonContinuarSolicitudInscripcion} onClick={verifica} autoFocus>
            <Typography
              sx={{ fontFamily: "MontserratMedium", fontSize: ".8vw" }}
            >
              De Acuerdo
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AppsDialog;

export interface IInstituciones {
  Id: string;
  NombreInstitucion: string;
  FechaCreacion: string;
  CreadoPor: string;
  UltimaModificacion: string;
  ModificadoPor: string;
  Deleted: number;
  Secretaria: string;
}
