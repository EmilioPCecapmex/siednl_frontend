import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Box, Card, CardContent, IconButton, Tooltip, Button, Typography, TextField, FormGroup, FormControlLabel, Switch, List, ListItemButton, ListItemText, Divider, FormControl, InputLabel, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, FormLabel, RadioGroup, Radio, } from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { IDetalleSolicitud, ISolicitud } from "./ISolicitud";
import { IApps } from "./IApps";
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import CommentIcon from '@mui/icons-material/Comment';
import { parse } from "node:path/win32";
import { DialogComentarios } from "./DialogComentarios";

interface IFiltros {
    Estatus: number,
    Filtro: String,
}

export const DialogSolicitudes = ({

    open,
    handleClose,
}: {

    open: boolean;
    handleClose: Function;
}) => {

    const [solicitudes, setSolicitudes] = useState<Array<ISolicitud>>([])

    const [solicitudesFiltered, setSolicitudesFiltered] = useState<Array<ISolicitud>>(solicitudes)

    const [detalleSolicitud, setDetalleSolicitud] = useState<Array<IDetalleSolicitud>>([])

    const [solicitudSeleccionada, setSolicitudSeleccionada] = useState("")

   

    const getSolicitudes = () => {
        axios
            .get("http://10.200.4.200:5000/api/solicitudes-app", {
                params: {
                    IdUsuario: localStorage.getItem("IdCentral"),
                    IdApp: localStorage.getItem("IdApp"),
                },
                headers: {
                    Authorization: localStorage.getItem("jwtToken") || "",
                },
            })
            .then((r) => {
                if (r.status === 200) {
                    setSolicitudes(r.data.data);
                    setSolicitudesFiltered(r.data.data)
                }
            });
    };

    const getDetalleSolicitud = () => {
        axios
            .get("http://10.200.4.200:5000/api/detalleSol", {
                params: {
                    IdUsuario: localStorage.getItem("IdCentral"),
                    IdSolicitud: solicitudSeleccionada,

                },
                headers: {
                    Authorization: localStorage.getItem("jwtToken") || "",
                },
            })
            .then((r) => {
                if (r.status === 200) {
                    setDetalleSolicitud(r.data.data)
                }
            });
    };


    useEffect(() => {
        getSolicitudes()
    }, [])


    const navigate = useNavigate();
    //registro seleccionado
    const [selectedIndex, setSelectedIndex] = useState(-1);
    //filtrado port aplicacion
    const [filtroSelected, setFiltroSelected] = useState(3);

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    });

    const itemSelected = (x: number, id: string) => {
        setSelectedIndex(x);
        setSolicitudSeleccionada(id);
    }

    const flowSolicitudes = (x: number) => {
        setSolicitudSeleccionada(solicitudes[x].Id);
    }

    //cuando se seleciona un filtro, se establece en el primer registro
    useEffect(() => {
        setSelectedIndex(-1)
    }, [filtroSelected])

    useEffect(() => {
        getDetalleSolicitud()

    }, [selectedIndex])



    const [openDialogRechazar, setOpenDialogRechazar] = useState(false);
    const [openDialogAceptar, setOpenDialogAceptar] = useState(false);

    const handleCloseOpenDialogRechazar = () => {
        setOpenDialogRechazar(false);
    };

    const handleCloseOpenDialogAceptar = () => {
        setOpenDialogAceptar(false);
    };

    const filtros = ([
        { Estatus: 0, Filtro: "Solo pendientes" },
        { Estatus: 1, Filtro: "Solo aprovadas" },
        { Estatus: 2, Filtro: "Solo rechazadas" },
        { Estatus: 3, Filtro: "Todas las solicitudes" },
    ]);

    const filtroXApp = (x: number) => {
        if (x === 3) {
            setSolicitudesFiltered(solicitudes)
        } else {
            setSolicitudesFiltered(solicitudes.filter((item) => parseInt(item.Estatus) === x))
        }
    }

    const [openComments,setOpenComments]=useState(false);
    const handleCloseComments=()=>{
        setOpenComments(false)
    }


    return (
        <Dialog
            fullWidth maxWidth="xl" open={open} onClose={() => { handleClose() }}
        >


            <Box sx={{
                height: "80vh",
                width: "82vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Box sx={{
                    height: "95%",
                    width: "98%",
                    border: "1px solid #b3afaf",
                    borderRadius: 5,
                    backgroundColor: '#E4E4E4',
                    display: "flex",

                }}>
                    {/* Lateral  filtro y lista de informacion*/}
                    <Box sx={{ width: "35%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Box sx={{ width: "95%", height: "20%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <FormControl
                                fullWidth
                                sx={{ bgcolor: "#fff", borderRadius: ".4vw", boxShadow: "15" }}
                            >
                                <InputLabel><Typography sx={{ fontFamily: 'MontserratBold' }}>
                                    Filtro por aplicación
                                </Typography></InputLabel>
                                <Select value={filtroSelected} label="Filtar---por---aplicacion" onChange={(c) => { filtroXApp(parseInt(c.target.value.toString())) }}>
                                    
                                    {filtros.map((item, x) => {
                                        return (
                                            <MenuItem
                                                key={x}
                                                value={item.Estatus}
                                                onClick={() => {
                                                    setFiltroSelected(item.Estatus);
                                                }}
                                            >
                                                {item.Filtro}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>

                        </Box>

                        <Box sx={{
                            width: "95%", height: "72%", display: "flex", alignItems: "center", pb: 2, bgcolor: "#fff", boxShadow: "15",
                            pt: 2,
                            borderRight: "solid 1px",
                            overflow: "auto",
                            borderRadius: ".4vw",
                            borderColor: "#fff",
                            "&::-webkit-scrollbar": {
                                width: ".3vw",
                            },
                            "&::-webkit-scrollbar-thumb": {
                                backgroundColor: "rgba(0,0,0,.5)",
                                outline: "1px solid slategrey",
                                borderRadius: 10,
                            },
                        }}>
                            <List component="nav" aria-label="main mailbox folders"
                                sx={{ width: "100%", height: "100%", borderRadius: ".4vw", }}
                            >
                                <Divider />
                                {solicitudesFiltered?.map((item, x) => {


                                    return (
                                        <Box key={x}>
                                            <ListItemButton
                                                key={x}
                                                onClick={() => {
                                                    {
                                                        itemSelected(x, item.Id)

                                                    }
                                                }}
                                                sx={{
                                                    pl: 2,
                                                    "&.Mui-selected ": {
                                                        backgroundColor: "#c4a57b",
                                                    },
                                                    "&.Mui-selected:hover": {
                                                        backgroundColor: "#cbcbcb",
                                                    },
                                                }}
                                                selected={selectedIndex === x ? true : false}
                                            >
                                                <ListItemText
                                                    secondary={
                                                        <Fragment>

                                                            <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                                                                <Typography
                                                                    sx={{ display: 'inline', fontFamily: 'MontserratSemiBold' }}
                                                                    color="text.primary"
                                                                >
                                                                    {"NOMBRE:"}
                                                                </Typography>
                                                                <Typography sx={{ fontFamily: 'MontserratMedium', ml: 1, fontSize: '.9rem' }}>
                                                                    {item.NombreUsuario?.toUpperCase()}
                                                                </Typography>
                                                            </Box>


                                                            <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                                                                <Typography
                                                                    sx={{ display: 'inline', fontFamily: 'MontserratSemiBold' }}
                                                                    color="text.primary"
                                                                >
                                                                    {"TIPO DE SOLICITUD:"}
                                                                </Typography>
                                                                <Typography sx={{ fontFamily: 'MontserratMedium', ml: 1, fontSize: '.9rem' }}>
                                                                    {item.tipoSoli?.toUpperCase()}
                                                                </Typography>
                                                            </Box>


                                                            <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                                                                <Typography
                                                                    sx={{ display: 'inline', fontFamily: 'MontserratSemiBold' }}
                                                                    color="text.primary"
                                                                >
                                                                    {"SOLICITANTE:"}
                                                                </Typography>
                                                                <Typography sx={{ fontFamily: 'MontserratMedium', ml: 1, fontSize: '.9rem' }}>
                                                                    {item.NombreSolicitante?.toUpperCase()}
                                                                </Typography>
                                                            </Box>
                                                            <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                                                                <Typography
                                                                    sx={{ display: 'inline', fontFamily: 'MontserratSemiBold' }}
                                                                    color="text.primary"
                                                                >
                                                                    {"Estado:"}
                                                                </Typography>
                                                                <Typography sx={{ fontFamily: 'MontserratMedium', ml: 1, fontSize: '.9rem' }}>
                                                                    {parseInt(item.Estatus) === 0 ? "PENDIENTE" : null}
                                                                    {parseInt(item.Estatus) === 1 ? "ACEPTADO" : null}
                                                                    {parseInt(item.Estatus) === 2 ? "RECHAZADO" : null}
                                                                    {parseInt(item.Estatus) === 3 ? "MODIFICACION SOLICITADA" : null}
                                                                </Typography>
                                                            </Box>

                                                        </Fragment>

                                                    }
                                                />

                                            </ListItemButton>
                                            <Divider />
                                        </Box>
                                    )
                                })}

                            </List>

                        </Box>
                    </Box>

                    {solicitudes.length != 0 ?
                        <Box sx={{ width: "70%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                            <Box sx={{ width: "95%", height: "95%", display: "flex", flexDirection: "column", alignItems: "center", border: "1px solid #b3afaf", borderRadius: "15px", boxShadow: "15" }}>

                                <Box sx={{ width: "100%", height: "100%", bgcolor: "#fff", borderRadius: "15px", opacity: "80%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", boxShadow: "15" }}>

                                    {selectedIndex < 0 ?
                                        <Box sx={{ width: "100%", height: "80%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                                            <InfoTwoToneIcon sx={{ width: "100%", height: "80%", opacity: "20%" }} />
                                            <Typography sx={{ fontFamily: 'MontserratSemiBold' }}>Sin información</Typography>
                                            <Typography sx={{ fontFamily: 'MontserratSemiBold' }}>Seleccione un registro para visualizar la información</Typography>
                                        </Box> :
                                        <Box sx={{ width: "98%", height: "95%", display: "flex", alignItems: "flex-start", justifyContent: "center", flexDirection: "column", bgcolor: "#fff", borderRadius: "15px" }}>
                                            <Box sx={{ width: "98%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                                                <Box sx={{ width: "100%", height: "15%", display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                                                    <TextField
                                                        label={<Typography sx={{ fontFamily: 'MontserratSemiBold', }}>Aplicación</Typography>}
                                                        InputLabelProps={{}}
                                                        InputProps={{ readOnly: true, }}
                                                        sx={{ fontFamily: 'MontserratSemiBold', fontSize: "1.5vw", width: "32.5%" }}
                                                        value={detalleSolicitud[0]?.NombreApp || ''}
                                                        variant="standard" />
                                                    <TextField
                                                        label={<Typography sx={{ fontFamily: 'MontserratSemiBold', }}>SOLICITADO POR</Typography>}
                                                        sx={{ fontFamily: 'MontserratSemiBold', fontSize: "1.5vw", width: "30%" }}
                                                        value={detalleSolicitud[0]?.NombreSolicitante || ''}
                                                        variant="standard" />
                                                    <TextField
                                                        label={<Typography sx={{ fontFamily: 'MontserratSemiBold', }}>FECHA DE REGISTRO</Typography>}
                                                        InputProps={{ readOnly: true, }}
                                                        sx={{ fontFamily: 'MontserratSemiBold', fontSize: "1.5vw", width: "13.5%" }}
                                                        value={detalleSolicitud[0]?.FechaDeCreacion.split("T")[0] || ''}
                                                        variant="standard" />

                                                    <Box sx={{ width: "4%" }}>
                                                        <IconButton onClick={()=>{setOpenComments(true)}} >
                                                            <CommentIcon fontSize="large" />
                                                        </IconButton>
                                                    </Box>

                                                </Box>
                                                <Box sx={{ width: "100%", height: "15%", display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                                                    <TextField
                                                        label={<Typography sx={{ fontFamily: 'MontserratSemiBold', }}>NOMBRE(S)</Typography>}
                                                        InputProps={{ readOnly: true, }}
                                                        sx={{ fontFamily: 'MontserratSemiBold', fontSize: "1.5vw", width: "25%" }}
                                                        value={detalleSolicitud[0]?.Nombre || ''} variant="standard" />

                                                    <TextField
                                                        label={<Typography sx={{ fontFamily: 'MontserratSemiBold', }}>APELLIDO PATERNO</Typography>}
                                                        InputProps={{ readOnly: true, }}
                                                        sx={{ fontFamily: 'MontserratSemiBold', fontSize: "1.5vw", width: "25%" }}
                                                        value={detalleSolicitud[0]?.ApellidoPaterno || ''} variant="standard" />

                                                    <TextField
                                                        label={<Typography sx={{ fontFamily: 'MontserratSemiBold', }}>APELLIDO MATERNO</Typography>}
                                                        InputProps={{ readOnly: true, }}
                                                        sx={{ fontFamily: 'MontserratSemiBold', fontSize: "1.5vw", width: "25%" }}
                                                        value={detalleSolicitud[0]?.ApellidoMaterno || ''}
                                                        variant="standard" />
                                                </Box>
                                                <Box sx={{ width: "100%", height: "15%", display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                                                    <TextField
                                                        label={<Typography sx={{ fontFamily: 'MontserratSemiBold', }}>USUARIO</Typography>}
                                                        InputProps={{ readOnly: true, }}
                                                        sx={{ fontFamily: 'MontserratSemiBold', fontSize: "1.5vw", width: "25%" }}
                                                        value={detalleSolicitud[0]?.NombreUsuario || ''}
                                                        variant="standard" />
                                                    <TextField
                                                        label={<Typography sx={{ fontFamily: 'MontserratSemiBold', }}>CORREO ELECTRÓNICO</Typography>}
                                                        InputProps={{ readOnly: true, }}
                                                        sx={{ fontFamily: 'MontserratSemiBold', fontSize: "1.5vw", width: "25%" }}
                                                        value={detalleSolicitud[0]?.CorreoElectronico || ''}
                                                        variant="standard" />
                                                    <TextField
                                                        label={<Typography sx={{ fontFamily: 'MontserratSemiBold', }}>CELULAR</Typography>}
                                                        InputProps={{ readOnly: true, }}
                                                        sx={{ fontFamily: 'MontserratSemiBold', fontSize: "1.5vw", width: "25%" }}
                                                        value={detalleSolicitud[0]?.Celular || ''}
                                                        variant="standard" />
                                                </Box>
                                                <Box sx={{ width: "100%", height: "15%", display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                                                    <TextField
                                                        label={<Typography sx={{ fontFamily: 'MontserratSemiBold', }}>CURP</Typography>}
                                                        InputProps={{ readOnly: true, }}
                                                        sx={{ fontFamily: 'MontserratSemiBold', fontSize: "1.5vw", width: "25%" }}
                                                        value={detalleSolicitud[0]?.Curp || ''}
                                                        variant="standard" />
                                                    <TextField
                                                        label={<Typography sx={{ fontFamily: 'MontserratSemiBold', }}>RFC</Typography>}
                                                        InputProps={{ readOnly: true, }}
                                                        sx={{ fontFamily: 'MontserratSemiBold', fontSize: "1.5vw", width: "25%" }}
                                                        value={detalleSolicitud[0]?.Rfc || ''}
                                                        variant="standard" />
                                                    <TextField
                                                        label={<Typography sx={{ fontFamily: 'MontserratSemiBold', }}>TÉLEFONO</Typography>}
                                                        InputProps={{ readOnly: true, }}
                                                        sx={{ fontFamily: 'MontserratSemiBold', fontSize: "1.5vw", width: "15%" }}
                                                        value={detalleSolicitud[0]?.Telefono || ''}
                                                        variant="standard" />
                                                    <TextField
                                                        label={<Typography sx={{ fontFamily: 'MontserratSemiBold', }}>EXTENSIÓN</Typography>}
                                                        InputProps={{ readOnly: true, }}
                                                        sx={{ fontFamily: 'MontserratSemiBold', fontSize: "1.5vw", width: "10%" }}
                                                        value={detalleSolicitud[0]?.Ext || ''}
                                                        variant="standard" />
                                                </Box>

                                                <Box sx={{ width: "100%", height: "30%", display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                                                    <TextField
                                                        multiline
                                                        rows={8}
                                                        label={<Typography sx={{ fontFamily: 'MontserratSemiBold', }}>INFORMACIÓN ADICIONAL</Typography>}
                                                        sx={{ fontFamily: 'MontserratSemiBold', fontSize: "1.5vw", width: "90%" }}
                                                        value={detalleSolicitud[0]?.DatosAdicionales || ''}
                                                        variant="filled" />
                                                </Box>
                                                <Box sx={{ width: "100%", height: "10%", display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>


                                                    <Box sx={{ display: "flex", width: "40%", justifyContent: "flex-start" }}>
                                                        {solicitudesFiltered[selectedIndex]?.tipoSoli?.toUpperCase() === "ALTA" && parseInt(solicitudesFiltered[selectedIndex]?.Estatus) === 3
                                                        ? <Button variant="contained" color="info" onClick={() => { setOpenDialogRechazar(true); }}>MODIFICAR</Button> : null}
                                                    </Box>

                                                    <Box sx={{ display: "flex", width: "40%", justifyContent: "flex-end" }}>
                                                        <IconButton
                                                            onClick={() => {
                                                                let a = (selectedIndex)
                                                                a--;
                                                                if (a >= 0) {
                                                                    setSelectedIndex(a)
                                                                    flowSolicitudes(a)
                                                                }

                                                            }}
                                                        >
                                                            <SkipPreviousIcon fontSize="large" />
                                                        </IconButton>
                                                        <IconButton
                                                            onClick={() => {
                                                                let a = (selectedIndex)
                                                                a = a + 1;
                                                                if (a < solicitudes.length) {
                                                                    setSelectedIndex(a)
                                                                    flowSolicitudes(a)
                                                                }
                                                            }}
                                                        >
                                                            <SkipNextIcon fontSize="large" />
                                                        </IconButton>
                                                    </Box>

                                                    {/* accionesSolicitud("rechazar")  */}
                                                </Box>
                                            </Box>

                                        </Box>
                                    }


                                </Box>

                            </Box>
                        </Box> :
                        <Box sx={{ width: "70%", height: "100%", bgcolor: "#ECE8DA", borderRadius: "15px", opacity: "80%", display: "flex", alignItems: "flex-end", justifyContent: "center", flexDirection: "column", boxShadow: "15" }}>
                            <Box sx={{ width: "100%", height: "80%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                                <InfoTwoToneIcon sx={{ width: "100%", height: "80%", opacity: "20%" }} />
                                <Typography fontFamily="MontserratBold">Sin información</Typography>
                                <Typography fontFamily="MontserratBold">Seleccione un registro para visualizar la información</Typography>
                            </Box>
                        </Box>
                    }
                </Box>
            </Box>
            <DialogComentarios open={openComments} close={handleCloseComments} solicitud={solicitudSeleccionada}></DialogComentarios>
        </Dialog>

    );
}

export default DialogSolicitudes;




