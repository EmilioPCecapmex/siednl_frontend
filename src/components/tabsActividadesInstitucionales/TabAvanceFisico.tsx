import { useState } from "react";
import {
    TextField,
    Box,
    Typography,
    List,
    Divider,
    ListItemButton,
} from "@mui/material";
import { IAccion1 } from "./IAccion1";

export function TabAvanceFisico({
    show,

}: {
    show: boolean;
}) {

    const [componentSelect, setComponentSelect] = useState(1);
    const [accion1,setAccion1]=useState<IAccion1>();
    return (


        <Box
            visibility={show ? "visible" : "hidden"}
            position="absolute"
            sx={{
                width: "75vw",
                height: "77vh",
                justifyContent: "center",
                alignItems: "center",
                justifyItems: "center",
                backgroundColor: "#fff",
                boxShadow: 20,
                borderRadius: 5,
            }}
        >
            
           



        </Box>

    );
}

export default TabAvanceFisico;

const top100Films = () => [
    { label: 'CONTRIBUIR A INCREMENTAR LA TASA BRUTA DE COBERTURA EN EDUCACIÓN MEDIA SUPERIOR MEDIANTE LOS SERVICIOS QUE BRINDAN LAS INSTITUCIONES DE BACHILLERATO EN EL ESTADO'},
    { label: 'LOS ALUMNOS ASISTEN Y DAN CONTINUIDAD A SUS ESTUDIOS EN EL COLEGIO; LOS PADRES DE FAMILIA O TUTORES PERMITEN QUE SUS HIJOS RECIBAN APOYO INTEGRAL POR PARTE DEL COLEGIO'},
    { label: 'LOS PROCESOS DE LICITACIÓN DE LA SECRETARÍA DE ADMINISTRACIÓN DEL GOBIERNO DEL ESTADO SE DAN EN TIEMPO Y FORMA Y NO SON DECLARADAS DESIERTAS' },
    { label: 'LOS PROCESOS DE LICITACIÓN DE LA SECRETARÍA DE ADMINISTRACIÓN DEL GOBIERNO DEL ESTADO SE DAN EN TIEMPO Y FORMA Y NO SON DECLARADAS DESIERTAS Y LOS PROVEEDORES ENTREGAN LAS MATERIAS PRIMAS EN LAS FECHAS PROGRAMADAS Y EN LAS FORMAS INDICADAS'},];
const periodo = [2021, 2022, 2023, 2024, 2025, 2026, 2027,];