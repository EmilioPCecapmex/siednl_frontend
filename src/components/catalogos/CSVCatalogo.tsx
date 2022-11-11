import { Dialog, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import logoExcell from "../../assets/img/xlsx_Logo.png"

export const CSVCatalogo = ({
    tabla,
}:{
    tabla:string,
}) => {
    const [open, setOpen] = React.useState(false);
    
    const handleClose = () => {
        setOpen(false);
      };

     
  
        return (
          <>
            
            
         <img src={logoExcell} alt="Logo" style={{ width:"2.5vw", height:"3.5vh"}}  onClick={()=>setOpen(true)}/>
         <Dialog open={open} onClose={handleClose} fullWidth>
            {tabla}
            </Dialog>
         </>
        );
      
}