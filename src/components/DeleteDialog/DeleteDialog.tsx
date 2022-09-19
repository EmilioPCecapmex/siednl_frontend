import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export const DeleteDialog = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton>
        <DeleteIcon
          sx={[
            {
              "&:hover": {
                color: "red",
              },
            },
          ]}
          onClick={handleClickOpen}
        />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"¿Desea eliminar este usuario?"}</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Al confirmar, se eliminara todo registro de este usuario.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleClose} autoFocus>
            De Acuerdo
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteDialog;
