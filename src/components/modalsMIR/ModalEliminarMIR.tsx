import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Box, Tooltip, Typography } from "@mui/material";
import Swal from "sweetalert2";

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
      .delete("http://10.200.4.105:8000/api/delete-mir", {
        data: {
          Id: id,
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
      <Tooltip title={"Eliminar"}>
        <span>
          <IconButton onClick={handleClickOpen} disabled={disab ? true : false}>
            <DeleteIcon
              sx={[
                {
                  "&:hover": {
                    color: "red",
                  },
                  width: "1.2vw",
                  height: "1.2vw",
                },
              ]}
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
          <Button onClick={handleClose}>
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
            color="error"
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
