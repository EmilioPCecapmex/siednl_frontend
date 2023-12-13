import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import { ResumenFichaTecnica } from "../resumenFichaTecnica/ResumenFichaTecnica";
import { alertaEliminar, alertaExito } from "../genericComponents/Alertas";

export default function ModalVerResumenFT({
  open,
  handleClose,
  MIR,
  MA,
  FT,
  Conac,
  Consecutivo,
}: {
  MIR: string;
  MA: string;
  FT: string;
  open: boolean;
  handleClose: Function;
  Conac: string;
  Consecutivo: string;
}) {
  return (
    <Dialog
      fullWidth
      maxWidth="xl"
      open={open}
      onClose={() => handleClose()}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <DialogTitle
        sx={{
          fontFamily: "MontserratBold",
          borderBottom: 1,
          height: "2vh",
          mb: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        FICHA TÉCNICA
        <Button onClick={() => handleClose()}>X</Button>
      </DialogTitle>

      <DialogContent
        sx={{
          display: "flex",
          width: "60vw",
          height: "85vh",
          borderRadius: 5,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          backgroundColor: "#fff",
          p: 0,
        }}
      >
        <ResumenFichaTecnica
          MIR={MIR}
          MA={MA}
          FT={FT}
          Conac={Conac}
          Consecutivo={Consecutivo}
        />
      </DialogContent>
    </Dialog>
  );
}
