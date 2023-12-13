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
import {
  alertaError,
  alertaExito,
  alertaEliminar,
} from "../genericComponents/Alertas";

export const DeleteDialogMIR = ({
  disab,
  id,
  actualizado,
}: {
  disab: boolean;
  id: string;
  actualizado: Function;
}) => {
  // const Toast = Swal.mixin({
  //   toast: true,
  //   position: "top-end",
  //   showConfirmButton: false,
  //   timer: 5000,
  //   timerProgressBar: true,
  //   didOpen: (toast) => {
  //     toast.addEventListener("mouseenter", Swal.stopTimer);
  //     toast.addEventListener("mouseleave", Swal.resumeTimer);
  //   },
  // });

  

  const handleClickOpen = () => {
    //setOpen(true);
    alertaEliminar(() => {deleteMIR()},() => {},"Deseas eliminar la MIR y los documentos ligados?");
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

        alertaExito(() => {}, "Eliminado con éxito");
      })

      .catch((err) => alertaError());
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

                "@media (min-width: 601px) and (max-width: 960px)": {
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
      
    </Box>
  );
};

export default DeleteDialogMIR;
