import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Box, Typography, Tooltip } from "@mui/material";
import Swal from "sweetalert2";
import { queries } from "../../queries";
export const DeleteDialogMIR = ({
  disab,
  id,
  actualizado,
}: {
  disab: boolean;
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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteMIR = () => {
    axios
      .delete(process.env.REACT_APP_APPLICATION_BACK + "/api/delete-mir", {
        data: {
          Id: id,
          // se va a cambiar0
          ModificadoPor: localStorage.getItem("IdUsuario"),
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        actualizado();
        Toast.fire({
          icon: "success",
          title: "Eliminado con éxito.",
        });
      })
      .catch((err) =>
        Toast.fire({
          icon: "error",
          title: "Permisos denegados.",
        })
      );
  };

  return (
    <Box>
      <Tooltip title="ELIMINAR">
        <span>
          <IconButton onClick={handleClickOpen} disabled={disab ? true : false}>
            <DeleteIcon
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
      <Dialog fullWidth open={open} onClose={handleClose}>
        <Box
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
              fontSize: "1vw",
              textAlign: "center",
            }}
          >
            ¿Desea eliminar elemento?
          </Typography>
        </Box>

        <DialogActions
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button  sx ={queries.buttonCancelarSolicitudInscripcion} onClick={handleClose}>
            <Typography
              sx={{ fontFamily: "MontserratMedium", fontSize: ".7vw" }}
            >
              Cancelar
            </Typography>
          </Button>

          <Button
            onClick={() => {
              deleteMIR();
              handleClose();
            }}
            sx ={queries.buttonContinuarSolicitudInscripcion}
            autoFocus
          >
            <Typography
              sx={{ fontFamily: "MontserratMedium", fontSize: ".7vw" }}
            >
              De Acuerdo
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DeleteDialogMIR;
