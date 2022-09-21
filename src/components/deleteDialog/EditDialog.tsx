import * as React from "react";
import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import ModalEditarUsuario from "../modalUsuarios/ModalEditarUsuario";

export const EditDialog = ({
    IdUsuario
  }: {
    IdUsuario: string;
  }) => {
  const [openModalEditarUsuario, setOpenModalEditarUsuario] = useState(false);

  const handleCloseModalEditarUsuario = () => {
    setOpenModalEditarUsuario(false);
  };

  const handleClickOpen = () => {
    setOpenModalEditarUsuario(true);
  };

  return (
    <div>
      <Tooltip title="Eliminar">
        <IconButton onClick={handleClickOpen}>
          <EditIcon
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
            <ModalEditarUsuario
              title="Editar Usuario"
              open={openModalEditarUsuario}
              handleClose={handleCloseModalEditarUsuario}
              IdUsuario = {IdUsuario}
            />
    </div>
  );
};

export default EditDialog;
