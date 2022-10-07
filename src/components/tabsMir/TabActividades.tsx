import React, { useState, useEffect } from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    IconButton,
    Typography,
    TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import { IComponente } from "./IComponente";
//funcion main
export const TabActividades = () => {

    //return main
    return (<></>
        // <Box sx={{ display: "flex", backgroundColor: "", width: "100%", height: "100%", justifyContent: "center", flexDirection: "column", alignItems: "center",boxShadow: 20,
        // borderRadius: 5,}}>

        //     <Box sx={{ display: "flex", backgroundColor: "", width: "100%", height: "10%", alignItems: "center", justifyContent: "space-between" }}>
        //         {/* Render seleccionar componente */}
        //         <Box sx={{
        //             display: 'flex',
        //             flexDirection: 'column',
        //             alignItems: 'center',
        //             justifyContent: "center",
        //             '& > *': {
        //                 m: 1,
        //             },
        //         }}
        //         >
        //             <ButtonGroup variant="text" sx={{}}>
        //                 {componentes.map((x) => {
        //                     return (
        //                         <Button
        //                             key={x}
        //                             onClick={() => {
        //                                 setActividades([1, 2]);
        //                                 setComponenteSelect((x - 1).toString());
        //                                 let xArray = [...componenteActividad];

        //                                 xArray[0]["componentes"][x - 1] = xArray[0]["componentes"][
        //                                     x - 1
        //                                 ] || [1, 2];

        //                                 setComponenteActividad(xArray);
        //                             }}
        //                         >
        //                             Componente No. {x}
        //                         </Button>
        //                     );
        //                 })}
        //             </ButtonGroup>

        //         </Box >

        //         <Box sx={{ display: "flex", mr: "9vw" }}>
        //             <IconButton onClick={() => { agregarAFnc(parseInt(componenteSelect)); }}>
        //                 <AddCircleIcon fontSize="large" />
        //             </IconButton >

        //             <IconButton onClick={() => eliminarAFnc()}>
        //                 <DoDisturbOnIcon fontSize="large" />
        //             </IconButton >
        //         </Box>
        //     </Box>
        //     <Box sx={{
        //         width: "95%",
        //         height: "90%",
        //         backgroundColor: "",
        //         pb: 2,
        //         pt: 2,
        //         borderRight: "solid 1px",
        //         overflow: "auto",
        //         borderRadius: ".4vw",
        //         borderColor: "#BCBCBC",
        //         display: "flex",
        //         flexDirection: "column",
        //         justifyContent: "flex-start",
        //         alignItems: "center",
        //         "&::-webkit-scrollbar": {
        //             width: ".3vw",
        //         },
        //         "&::-webkit-scrollbar-thumb": {
        //             backgroundColor: "rgba(0,0,0,.5)",
        //             outline: "1px solid slategrey",
        //             borderRadius: 10,

        //         },
        //     }}>
        //         {/* Renderizado de Actividades */}


        //         {componenteActividad[0]["componentes"][parseInt(componenteSelect)].map(
        //             (x) => {
        //                 return (
        //                     <AcordeonActividades
        //                         comp={(parseInt(componenteSelect) + 1).toString()}
        //                         key={x.toString()}
        //                         x={x}
        //                     />
        //                 );
        //             }
        //         )}


        //     </Box>

        // </Box>
    );
}