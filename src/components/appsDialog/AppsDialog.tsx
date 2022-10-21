import React, { useState, useEffect, useLayoutEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import { Box, Autocomplete, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";
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

    if(instSel.length <= 0){
      Toast.fire({
        icon: "error",
        title: "Debes seleccionar al menos una institución.",
      });
    }else{
      agregaVinculo()
    }
  }

  const agregaVinculo = () => {
    axios
      .post("http://10.200.4.105:8000/api/vincular-usuarioInsitucion",
       {
          IdUsuario: id,
          IdInstitucion: instSel.map((item) => {
            return {IdInstitucion: item.Id}
          }),
          CreadoPor: localStorage.getItem("IdUsuario"),
        },
       { 
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        }
      }
      )
      .then((r) => {
        if(r.status === 200){
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

  const getInstitucionesX = () => {
    axios
      .get("http://10.200.4.105:8000/api/usuarioInsitucion", {
        params: {
          IdUsuario: id,
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          console.log(r.data)
          setInstSel(r.data.data);
        }
      });
  };

  const getInstituciones = () => {
    axios
      .get("http://10.200.4.105:8000/api/instituciones", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          setInstituciones(r.data.data);
        }
      });
  };

  useLayoutEffect(() => {
    if(open){
      getInstitucionesX();
      getInstituciones();

    }
  }, [open]);

  return (
    <Box>
      <Tooltip title="Instituciones">
        <IconButton onClick={handleClickOpen}>
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
              <TextField {...params} label="Institucion" />
            )}
            onChange={(event, value) => setInstSel(value)}
            isOptionEqualToValue={(option, value) => {
              if (value.Id === "" || value.Id === option.Id){
                return true
              }else{
                return false
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
          <Button color="error" onClick={handleClose}>
            <Typography
              sx={{ fontFamily: "MontserratMedium", fontSize: ".8vw" }}
            >
              Cancelar
            </Typography>
          </Button>

          <Button onClick={verifica} autoFocus>
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
