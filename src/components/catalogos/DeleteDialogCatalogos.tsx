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
import {  deletePorCatalogoTodos } from "./AxiosCatalogo";
import { useEffect, useState } from "react";
export const DeleteDialogCatalogos = ({
  deleteText,
  Id,
  tabla,
  actualizado,
  open,
  UpdateInfo,

  handleCloseDel,
}: {
  deleteText: string;
  tabla: string;
  Id: string;
  actualizado: Function;
  open: boolean;
  UpdateInfo: Function;
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

useEffect(() => {
  console.log("deleteText: ",deleteText);
  
}, [])
  

  const cerrardialog = () =>{
    handleCloseDel();
   // actualizado();
    
    
  }

  const opendialog = () =>{
    handleCloseDel();
    //actualizado();
    //deletePorCatalogo()
    //deletePorCatalogoGeneral()
    deletePorCatalogoTodos(Id, tabla, UpdateInfo)
  }

 

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
