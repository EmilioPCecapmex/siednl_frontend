import { useState } from "react";
import {
    TextField,
    Box,
    Typography,
    Autocomplete,
    List,
    Divider,
    ListItemButton,
} from "@mui/material";

export function TabAccion2({
    show,

}: {
    show: boolean;
}) {

    const [componentSelect, setComponentSelect] = useState(1);

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
                            <Typography sx={{ fontFamily: "MontserratMedium" }}>ACCIÓN 2</Typography>
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
                                <Autocomplete
                                    disablePortal
                                    size="small"
                                    options={top100Films()}
                                    sx={{ width: "40%" }}
                                    renderInput={(params) => <TextField {...params} multiline rows={6.7} sx={{ width: "100%", boxShadow: 2 }} label="DESCRIPCIÓN" />}
                                />
                                <Autocomplete
                                    disablePortal
                                    size="small"
                                    options={top100Films()}
                                    sx={{ width: "40%" }}
                                    renderInput={(params) => <TextField {...params} multiline rows={6.7} sx={{ width: "100%", boxShadow: 2 }} label="NOMBRE DEL INDICADOR" />}
                                />


                            </Box>

                            <Box sx={{ backgroundColor: "", height: "35%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <TextField
                                    multiline
                                    rows={4}
                                    variant="filled"
                                    sx={{ width: "14%", boxShadow: 2 }}
                                    label={` LINEA BASE ${periodo[0]} `}
                                />



                                {periodo.map((x, y) => {
                                    if (y >= 1)
                                        return (<TextField
                                            key={x}
                                            multiline
                                            rows={4}
                                            variant="filled"
                                            sx={{ width: "14%", boxShadow: 2 ,}}
                                            label={y === 6 ? `META SEXENAL ${periodo[y]} ` : `META:${periodo[y]} `}
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

                                <Autocomplete
                                    disablePortal
                                    size="small"
                                    options={top100Films()}
                                    sx={{ width: "95%" }}
                                    renderInput={(params) => <TextField {...params} multiline rows={4.7} sx={{ width: "100%", boxShadow: 2 }} label="FÓRMULA DE CÁLCULO:" />}
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
                            <Box sx={{ height: "48%", width: "100%", display: "flex", justifyContent: "space-around", alignItems: "baseline", flexDirection: "column" }}>

                                <Box sx={{ height: "24%", display: "flex", justifyContent: "space-evenly", alignItems: "center", width: "100%" }}>

                                    <Autocomplete
                                        disablePortal
                                        size="small"
                                        options={top100Films()}
                                        sx={{ width: "40%" }}
                                        renderInput={(params) => <TextField {...params} multiline rows={4.7} sx={{ width: "100%", boxShadow: 2 }} label="NUMERADOR" />}
                                    />

                                    <TextField
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
                                <Box sx={{ height: "24%", display: "flex", justifyContent: "space-evenly", alignItems: "center", width: "100%" }}>

                                    <Autocomplete
                                        disablePortal
                                        size="small"
                                        options={top100Films()}
                                        sx={{ width: "40%" }}
                                        renderInput={(params) => <TextField {...params} multiline rows={4.7} sx={{ width: "100%", boxShadow: 2 }} label="DENOMINADOR" />}
                                    />
                                    <TextField
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

export default TabAccion2;

const top100Films = () => [
    { label: 'La religión pura y sin mancha delante de Dios nuestro Padre es esta: atender a los huérfanos y a las viudas en sus aflicciones, y conservarse limpio de la corrupción del mundo.', year: 1994 },
    { label: 'Que el favor del Señor nuestro Dios esté sobre nosotros.Confirma en nosotros la obra de nuestras manos; sí, confirma la obra de nuestras manos.', year: 1972 },
    { label: 'Por eso Dios lo exaltó hasta lo sumo y le otorgó el nombre que está sobre todo nombre, para que ante el nombre de Jesús se doble toda rodilla en el cielo y en la tierra y debajo de la tierra.', year: 1974 },
    { label: 'Háganlo todo sin quejas ni contiendas, para que sean intachables y puros, hijos de Dios sin culpa en medio de una generación torcida y depravada. En ella ustedes brillan como estrellas en el firmamento, manteniendo en alto la palabra de vida.', year: 2008 },];

const periodo = [2021, 2022, 2023, 2024, 2025, 2026, 2027,];