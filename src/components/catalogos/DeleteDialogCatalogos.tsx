import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Grid, Typography } from "@mui/material";
import Swal from "sweetalert2";
import { queries } from "../../queries";
export const DeleteDialogCatalogos = ({
  deleteText,
  id,
  tabla,
  actualizado,
  open,

  handleCloseDel,
}: {
  deleteText: string;
  tabla: string;
  id: string;
  actualizado: Function;
  open: boolean;
  
  handleCloseDel: Function;

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

  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  

  const cerrardialog = () =>{
    handleCloseDel();
   // actualizado();
    
    
  }

  const opendialog = () =>{
    handleCloseDel();
    //actualizado();
    deletePorCatalogo()
  }

  const deletePorCatalogo = () => {
    if (tabla === "PEDs") {
      axios
        .delete(process.env.REACT_APP_APPLICATION_BACK + "/api/delete-ped", {
          data: {
            IdPED: id,
            ModificadoPor: localStorage.getItem("IdUsuario"),
            Rol: localStorage.getItem("Rol"),
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
    } else if (tabla === "ProgramasPresupuestarios") {
      axios
        .delete(
          process.env.REACT_APP_APPLICATION_BACK +
            "/api/delete-programaPresupuestario",
          {
            data: {
              IdProgramaPresupuestario: id,
              ModificadoPor: localStorage.getItem("IdUsuario"),
              Rol: localStorage.getItem("Rol"),
            },
            headers: {
              Authorization: localStorage.getItem("jwtToken") || "",
            },
          }
        )
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
    } else {
      axios
        .delete(process.env.REACT_APP_APPLICATION_BACK + "/api/delete-catalogo", {
          data: {
            Id: id,
            Tabla: tabla,
            ModificadoPor: localStorage.getItem("IdUsuario"),
            Rol: localStorage.getItem("Rol"),
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
    }
    //handleCloseDel();

  };

  return (
    <Grid>
      {/* <IconButton onClick={cerrardialog}>
        <DeleteIcon
          sx={[
            {
              "&:hover": {
                color: "red",
              },
            },
          ]}
        />
      </IconButton> */}
      <Dialog fullWidth open={open} onClose={cerrardialog}>
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
            ¿Desea eliminar elemento?
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
          <Typography sx={{ fontFamily: "MontserratLight", fontSize: [10, 15, 15, 15, 15], }}>
            {deleteText}
          </Typography>
        </DialogContent>

        <DialogActions
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button className="cancelar" onClick={cerrardialog}>
            <Typography
              sx={{ fontFamily: "MontserratMedium", fontSize: [10, 15, 15, 15, 15], }}
            >
              Cancelar
            </Typography>
          </Button>

          <Button className="aceptar" onClick={opendialog} color="error" autoFocus>
            <Typography
              sx={{ fontFamily: "MontserratMedium", fontSize: [10, 15, 15, 15, 15], }}
            >
              De Acuerdo
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default DeleteDialogCatalogos;
