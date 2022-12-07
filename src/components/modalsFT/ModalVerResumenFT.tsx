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
    
}:{
    MIR:string;
    MA:string;
    FT:string;
    open:boolean;
    handleClose: Function;
}){
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
        Nombre de la MIR o por definir
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
        />
    </DialogContent>
    </Dialog>
        );
}