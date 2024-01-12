import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import ModalForm from "../../components/ModalForm";
import { getFileByName } from "./ServicesAyuda";
import { IInfoFile } from "./VisualizadorAyudas";
import { alertaError } from "../../components/genericComponents/Alertas";


export const MostrarArchivos = ({
    handleClose,
    value,
    infoFile,
}: {
    handleClose: Function
    value: string
    infoFile:IInfoFile
}) => {

    const [archivoUrl, setArchivoUrl] = useState<string>("");

    const savePDF =(data:string)=>{
        setArchivoUrl(`data:application/pdf;base64,${data}`);
    }

    const saveVideo =(data:string)=>{
        setArchivoUrl(`data:video/mp4;base64,${data}`);
    }

    useEffect(() => {
        switch(value){
            case "Videos":getFileByName(process.env.REACT_APP_DOC_ROUTE+'/VIDEOS/TUTORIALES/',infoFile.nombre, saveVideo);
            break;
            case "Guías" : getFileByName(process.env.REACT_APP_DOC_ROUTE+'/GUIAS/', infoFile.nombre,savePDF);
            break;
            case "PAE" : getFileByName(infoFile.ruta, infoFile.nombre,savePDF);
            break;
            default:
                alertaError("Opcion invalida");
        }
        
    }, [])

    return (
        
<ModalForm title="VISUALIZAR" handleClose={() => { handleClose() }}>

            <Grid container sx={{ width: "100vw", height: "92vh", display: "flex", justifyContent: "flex-end" }}>

                <Grid item   container xs={12} sm={12} md={12} lg={12} sx={{height:"90vh", display: "flex", justifyContent: "center",alignItems:"center"}}>
                    {
                        value === "Videos" ? (

                            <video
                                //autoFocus
                                loop
                                autoPlay
                                width={"98%"}
                                height={"98%"}
                                src={archivoUrl}
                                id="video_player"
                                controls
                            />

                        ) : (

                            <iframe
                                style={{
                                    width: "98%",
                                    height: "98%",
                                }}
                                src={`${archivoUrl}`}
                                title="description"
                            />
                        )
                    }
                </Grid>
            </Grid>
            </ModalForm>
    )
}


