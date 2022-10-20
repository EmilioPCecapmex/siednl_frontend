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

export function TabAccion1({
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
            
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                }}
            >
                <List
                    sx={{
                        width: "12vw",
                        height: "100%",
                        borderRight: "solid",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        borderColor: "#BCBCBC",
                        "&::-webkit-scrollbar": {
                            width: ".3vw",
                        },
                        "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "rgba(0,0,0,.5)",
                            outline: "1px solid slategrey",
                            borderRadius: 10,
                        },
                    }}
                >

                    <Box

                        sx={{
                            height: "15vh",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                        }}
                    >
                        <Divider />

                        <ListItemButton
                            selected={componentSelect === 1 ? true : false}
                            onClick={() => setComponentSelect(1)}
                            sx={{
                                "&.Mui-selected ": {
                                    backgroundColor: "#c4a57b",
                                },
                                "&.Mui-selected:hover": {
                                    backgroundColor: "#cbcbcb",
                                },
                            }}
                        >
                            <Typography sx={{ fontFamily: "MontserratMedium" }}>ACCIÓN 1</Typography>
                        </ListItemButton>
                        <Divider />

                        <ListItemButton
                            selected={componentSelect === 2 ? true : false}

                            onClick={() => setComponentSelect(2)}
                            sx={{
                                "&.Mui-selected ": {
                                    backgroundColor: "#c4a57b",
                                },
                                "&.Mui-selected:hover": {
                                    backgroundColor: "#cbcbcb",
                                },
                            }}
                        >
                            <Typography sx={{ fontFamily: "MontserratMedium" }}>
                                DATOS DEL INDICADOR
                            </Typography>
                        </ListItemButton>
                        <Divider />


                        <Divider />
                    </Box>

                </List>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "90%",
                        height: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >

                    {/* Identificacion de la Actividad Institucion --------------------------------------------------------------------------------- */}
                    {componentSelect === 1 ? <Box sx={{ width: "100%", height: "100%", backgroundColor: "", }}>


                        <Box sx={{ height: "100%" }}>
                            <Box sx={{ backgroundColor: "", height: "15%", display: "flex", justifyContent: "center", alignItems: "center", }}> <Typography>IDENTIFICACIÓN DE LA ACTIVIDAD INSTITUCIONAL</Typography></Box>
                            <Box sx={{ backgroundColor: "", height: "40%", display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
                                <TextField
                                    multiline
                                    rows={6}
                                    variant="filled"
                                    sx={{ width: "45%", boxShadow: 2 }}
                                    label={"DESCRIPCIÓN"}
                                />
                                <TextField
                                    multiline
                                    rows={6}
                                    variant="filled"
                                    sx={{ width: "45%", boxShadow: 2 }}
                                    label={"NOMBRE DEL INDICADOR"}
                                />

                            </Box>

                            <Box sx={{ backgroundColor: "", height: "35%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                {/* <TextField
                                    multiline
                                    rows={1}
                                    variant="filled"
                                    sx={{ width: "14%", boxShadow: 2 }}
                                    label={` LINEA BASE ${periodo[0]} `}
                                /> */}



                                {periodo.map((x, y) => {
                                    
                                        return (<TextField
                                            key={y}
                                            multiline
                                            rows={1}
                                            variant="filled"
                                            sx={{ width: "14%", boxShadow: 2 }}
                                            label={y===0? `LINEA BASE:${periodo[y]} `:  y===6? `META SEXENAL ${periodo[y]} ` :   ` META:${periodo[y]} `}


                                        />
                                        );
                                })}


                            </Box>

                        </Box>

                    </Box> : null}

                    {/* ---------------------------------------------------------------------------------------------------------------------------- */}

                    {/*  ALINEACIÓN A LA PLANEACIÓN DEL DESARROLLO---------------------------------------------------------------------------------- */}
                    {componentSelect === 2 ?
                        <Box sx={{ width: "100%", height: "100%", }}>

                            <Box sx={{ height: "15%", display: "flex", justifyContent: "center", alignItems: "center" }}><Typography>DATOS DEL INDICADOR</Typography></Box>
                            <Box sx={{ height: "25%", display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>

                                <TextField
                                    multiline
                                    rows={4}
                                    variant="filled"
                                    sx={{ width: "95%", boxShadow: 2 }}
                                    label={"FÓRMULA DE CÁLCULO:"}
                                />


                            </Box>
                            <Box sx={{ height: "12%", display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>


                                <TextField
                                    multiline
                                    rows={2}
                                    variant="filled"
                                    sx={{ width: "19%", boxShadow: 2 }}
                                    label={"UNIDAD DE MEDIDA"}
                                />
                                <TextField
                                    multiline
                                    rows={2}
                                    variant="filled"
                                    sx={{ width: "19%", boxShadow: 2 }}
                                    label={"TIPO DE FÓRMULA"}
                                />
                                <TextField
                                    multiline
                                    rows={2}
                                    variant="filled"
                                    sx={{ width: "19%", boxShadow: 2 }}
                                    label={"TIPO DE INDICADOR"}
                                />
                                <TextField
                                    multiline
                                    rows={2}
                                    variant="filled"
                                    sx={{ width: "19%", boxShadow: 2 }}
                                    label={"DIMENSIÓN DEL INDICADOR"}
                                />
                                <TextField
                                    multiline
                                    rows={2}
                                    variant="filled"
                                    sx={{ width: "19%", boxShadow: 2 }}
                                    label={"SENTIDO DEL INDICADOR"}
                                />
                            </Box>
                            <Box sx={{ height: "48%",width:"100%" ,display: "flex", justifyContent: "space-around", alignItems: "baseline", flexDirection:"column" }}>

                                <Box sx={{ height: "24%", display: "flex", justifyContent: "space-evenly", alignItems: "center" ,width:"100%" }}>
                                    <TextField
                                        multiline
                                        rows={4}
                                        variant="filled"
                                        sx={{ width: "40%", boxShadow: 2 }}
                                        label={"NUMERADOR:"}
                                    /><TextField
                                        multiline
                                        rows={4}
                                        variant="filled"
                                        sx={{ width: "19%", boxShadow: 2 }}
                                        label={"UNIDAD DE MEDIDA"}
                                    /><TextField
                                        multiline
                                        rows={4}
                                        variant="filled"
                                        sx={{ width: "29%", boxShadow: 2 }}
                                        label={"MEDIO DE VERIFICACIÓN / FUENTE DE INFORMACIÓN"}
                                    />
                                </Box>
                                <Box sx={{ height: "24%", display: "flex", justifyContent: "space-evenly", alignItems: "center",width:"100%"  }}>
                                    <TextField
                                        multiline
                                        rows={4}
                                        variant="filled"
                                        sx={{ width: "40%", boxShadow: 2 }}
                                        label={"DENOMINADOR:"}
                                    /><TextField
                                        multiline
                                        rows={4}
                                        variant="filled"
                                        sx={{ width: "19%", boxShadow: 2 }}
                                        label={"UNIDAD DE MEDIDA"}
                                    /><TextField
                                        multiline
                                        rows={4}
                                        variant="filled"
                                        sx={{ width: "29%", boxShadow: 2 }}
                                        label={"MEDIO DE VERIFICACIÓN / FUENTE DE INFORMACIÓN"}
                                    />
                                </Box>

                            </Box>
                        </Box> : null}


                    {/* ---------------------------------------------------------------------------------------------------------------------------- */}


                </Box>


            </Box>



        </Box>

    );
}

export default TabAccion1;

const top100Films = () => [
    { label: 'CONTRIBUIR A INCREMENTAR LA TASA BRUTA DE COBERTURA EN EDUCACIÓN MEDIA SUPERIOR MEDIANTE LOS SERVICIOS QUE BRINDAN LAS INSTITUCIONES DE BACHILLERATO EN EL ESTADO'},
    { label: 'LOS ALUMNOS ASISTEN Y DAN CONTINUIDAD A SUS ESTUDIOS EN EL COLEGIO; LOS PADRES DE FAMILIA O TUTORES PERMITEN QUE SUS HIJOS RECIBAN APOYO INTEGRAL POR PARTE DEL COLEGIO'},
    { label: 'LOS PROCESOS DE LICITACIÓN DE LA SECRETARÍA DE ADMINISTRACIÓN DEL GOBIERNO DEL ESTADO SE DAN EN TIEMPO Y FORMA Y NO SON DECLARADAS DESIERTAS' },
    { label: 'LOS PROCESOS DE LICITACIÓN DE LA SECRETARÍA DE ADMINISTRACIÓN DEL GOBIERNO DEL ESTADO SE DAN EN TIEMPO Y FORMA Y NO SON DECLARADAS DESIERTAS Y LOS PROVEEDORES ENTREGAN LAS MATERIAS PRIMAS EN LAS FECHAS PROGRAMADAS Y EN LAS FORMAS INDICADAS'},];
    
const periodo = [2021, 2022, 2023, 2024, 2025, 2026, 2027,];