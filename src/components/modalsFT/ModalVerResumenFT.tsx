import {
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Button,
    Typography,
  } from "@mui/material";
import { ResumenFichaTecnica } from "../resumenFichaTecnica/ResumenFichaTecnica";

export default function ModalVerResumenFT({
    open,
    handleClose,
    MIR,
    MA,
    FT,
    Conac,
    Consecutivo,
}:{
    MIR:string;
    MA:string;
    FT:string;
    open:boolean;
    handleClose: Function;
    Conac:string;
    Consecutivo:string;
}){

  //const jsonMir = JSON.parse(MIR);

    return( 
    <Dialog fullWidth maxWidth="xl" open={open} onClose={() => handleClose()}>
        <DialogTitle
        sx={{
          fontFamily: "MontserratBold",
          borderBottom: 1,
          height: "2vh",
          mb: 2,
        }}
      >
        FICHA TÉCNICA
        {/*  - }{jsonMir.encabezado.nombre_del_programa} - {jsonMir.encabezado.ejercicioFiscal} */}
      </DialogTitle>
      
      <DialogContent
       sx={{
        display: "flex",
        width: "75vw",
        height: "85vh",
        
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "#fff",
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