import ZoomInMapIcon from '@mui/icons-material/ZoomInMap';
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  InputBase,
  Paper,
  Grid,
  TableSortLabel,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { LateralMenu } from "../../components/lateralMenu/LateralMenu";
import Swal from "sweetalert2";
import SearchIcon from "@mui/icons-material/Search";
import Correos from "../../components/tabsConfig/Correos";
export let resumeDefaultMIR = true;

export let setResumeDefaultMIR = () => {
  resumeDefaultMIR = !resumeDefaultMIR;
};
const estados = [
  "Todos",
  "En Captura",
  "En Revisión",
  "En Autorización",
  "Autorizada",
];

interface Head {
  id: keyof IICorreos;
  isNumeric: boolean;
  label: string;
}

const heads: readonly Head[] = [
  {
    id: "Nombre",
    isNumeric: true,
    label: "CORREO ENVIADO A",
  },
  {
    id: "Correo",
    isNumeric: true,
    label: "CORREO",
  },
  {
    id: "Motivo",
    isNumeric: true,
    label: "MOTIVO",
  },
  {
    id: "Fecha",
    isNumeric: true,
    label: "FECHA",
  },
  {
    id: "Puesto",
    isNumeric: true,
    label: "PUESTO",
  },
  {
    id: "Opciones",
    isNumeric: true,
    label: "OPCIONES",
  },
];

export const PanelCorreos = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const getUsuarios = (setState: Function) => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/list-correos", {
        params: {
          
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setState(r.data.data);
      });
  };

  
  useEffect(() => {
    setShowResume(true);
  }, []);

  const returnMain = () => {
    setShowResume(true);
    setBandera("");
  };
  
  const [showResume, setShowResume] = useState(true);
  const [page, setPage] = useState(0);
  const renglonesPagina = 6;
  const [rowsPerPage, setRowsPerPage] = useState(renglonesPagina);
  const [actionNumber, setActionNumber] = useState(0);


  const onChangeActionNumberValue = () => {
    setActionNumber(1);
  };

  // Realiza el cambio de pagina
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 6));
    setPage(0);
  };


  const [findTextStr, setFindTextStr] = useState("");

  const [usuarios, setUsuarios] = useState<Array<IICorreos>>([]);
  const [usuariosFiltered, setUsuariosFiltered] = useState<Array<IICorreos>>([]);
  const [usuariosxFiltered, setUsuariosxFiltered] = useState<Array<IICorreos>>([]);
  // Filtrado por caracter

  const [idCorreo, setidCorreo] = useState("");
  const [bandera, setBandera] = useState("");


  useEffect(() => {
    getUsuarios(setUsuarios);
  }, []);

  useEffect(() => {
    getUsuarios(setUsuarios);
  }, [showResume]);

  useEffect(() => {
    setUsuariosFiltered(usuarios);
  }, [usuarios]);

  useEffect(() => {
    setUsuariosxFiltered(usuariosFiltered);
  }, [usuariosFiltered]);

  const findText = (v: string) => {
    if (
      v !== "" 
    ) {
      setUsuariosFiltered(
        usuarios.filter(
          (x) =>
            (x.Nombre.includes(v) ||
              x.Correo.toLowerCase().includes(v.toLowerCase()) ||
              x.Motivo.toLowerCase().includes(v.toLowerCase())  ||
              x.Puesto.toLowerCase().includes(v.toLowerCase())) 
        )
      );
   
    } else {
      setUsuariosFiltered(usuarios);
    }
  };

  useEffect(() => {
    findText(findTextStr);
  }, [findTextStr]);

  const handleChange = (dato: string) => {
    setFindTextStr(dato);
  };


  const handleClickOpen = (bandera:string,idCorreo:string) => {
    setShowResume(false);
    setidCorreo(idCorreo);
    setBandera(bandera);
  };

 

  const [actualizacion, setActualizacion] = useState(0);

  const actualizaContador = () => {
    setActualizacion(actualizacion + 1);
  };
  
  const filtrarDatos = () => {
    let Arrayfiltro: IICorreos[];
    Arrayfiltro = [];

    if (usuariosxFiltered.length !== 0) {
      Arrayfiltro = usuariosxFiltered;
    } else {
      Arrayfiltro = usuariosxFiltered;
    }

    let ResultadoBusqueda = Arrayfiltro.filter((elemento) => {

      if (
        elemento.Nombre.toString()
          .toLocaleLowerCase()
          .includes(findTextStr.toLocaleLowerCase()) ||
        elemento.Correo.toString()
          .toLocaleLowerCase()
          .includes(findTextStr.toLocaleLowerCase()) ||
        elemento.Motivo.toString()
          .toLocaleLowerCase()
          .includes(findTextStr.toLocaleLowerCase()) ||
        elemento.Fecha.toString()
          .toLocaleLowerCase()
          .includes(findTextStr.toLocaleLowerCase()) ||
        elemento.Puesto.toString()
          .toLocaleLowerCase()
          .includes(findTextStr.toLocaleLowerCase()) 
      ) {
        return elemento;
      }
    });

    setUsuariosFiltered(ResultadoBusqueda);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    findTextStr.length !== 0 ? setUsuariosFiltered(usuariosFiltered) : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [findTextStr]);

  return (
    <Grid container justifyContent={"space-between"}>
      <Grid
        item
        xl={12}
        height={"7vh"}
        // sx={{ mr: showResume ? 8 : 0 }}
      >
        <LateralMenu selection={"CORREOS ELECTRÓNICOS"} actionNumber={actionNumber} restore={setShowResume}/>
      </Grid>
      {/* //boxShadow: 10, */}

      <Grid
        justifyContent={"center"}
        display={"flex"}
        container
        height={"93vh"}
        alignItems={"center"}
        item
        xl={12}
        lg={12}
        md={12}
        sm={7.5}
        xs={6}
        sx={{ backgroundColor: "white" }}
      >
        {showResume ? (
          <>
            {/* FILTROS */}
            <Grid
              container
              item
              xl={8}
              lg={7}
              md={6}
              height="10vh"
              direction="row"
              sx={{
                boxShadow: 5,
                backgroundColor: "#FFFF",
                borderRadius: 5,
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              

              <Grid
                xl={12}
                lg={12}
                md={12}
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
              >
                <Grid
                  sx={{ fontFamily: "PoppinsRegular" }}
                  item
                  xl={7}
                  lg={4}
                  md={3}
                  sm={2}
                >
                  <Paper
                    component="form"
                    sx={{
                      display: "flex",
                      width: "100%",
                    }}
                  >
                    <InputBase
                      sx={{ ml: 1, flex: 1 }}
                      placeholder="Buscar"
                      value={findTextStr}
                      onChange={(e) => {
                        handleChange(e.target.value);
                      }}
                      onKeyPress={(ev) => {
                        if (ev.key === "Enter") {
                          filtrarDatos();
                          ev.preventDefault();
                          return false;
                        }
                      }}
                    />
                    <IconButton
                      type="button"
                      sx={{ p: "10px" }}
                      aria-label="Buscar"
                      onClick={() => filtrarDatos()}
                    >
                      <SearchIcon />
                    </IconButton>
                  </Paper>
                </Grid>

                {/* <Grid item xl={3} lg={4} md={3} sm={2}>
                  <Button
                    sx={{
                      backgroundColor: "#c2a37b",
                      width: "10vw",
                      height: "3.3vh",
                      color: "black",
                      fontFamily: "PoppinsMedium",
                      fontSize: "0.6vw",
                    }}
                    onClick={() => {
                      
                      handleClickOpen("1","");
                    }}
                  >
                    Añadir usuario
                  </Button>
                </Grid> */}
              </Grid>
            </Grid>

            {/* TABLA */}

            <Grid
              container
              item
              lg={10}
              md={9}
              height="70vh"
              direction="row"
              sx={{ backgroundColor: "#FFFF", borderRadius: 5, boxShadow: 5 }}
            >
              <TableContainer
                sx={{
                  borderRadius: 5,
                  height: 450,
                  overflow: "auto",
                  "&::-webkit-scrollbar": {
                    width: ".5vw",
                    mt: 1,
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#edeaea",
                    //outline: "1px solid slategrey",
                    borderRadius: 1,
                  },
                }}
              >
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow
                      sx={{
                        gridTemplateColumns: "repeat(7,1fr)",
                      }}
                    >
                      {heads.map((head, index) => (
                        <TableCell
                          sx={{
                            backgroundColor: "#edeaea",
                            fontFamily: "PoppinsBold",
                            borderBottom: 0,
                            fontSize: "0.8vw",
                            // fontFamily: "PoppinsRegular",
                            //   fontSize: ".7vw",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          align="center"
                          key={index}
                        >
                          <TableSortLabel>{head.label}</TableSortLabel>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {usuariosFiltered
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => (
                        <TableRow>
                          <TableCell
                            sx={{
                              padding: "1px 15px 1px 0",
                              fontFamily: "PoppinsRegular",
                              fontSize: ".7vw",
                            }}
                            align="center"
                            component="th"
                            scope="row"
                          >
                            {row.Nombre}
                          </TableCell>
                          <TableCell
                            sx={{
                              padding: "1px 15px 1px 0",
                              fontFamily: "PoppinsRegular",
                              fontSize: ".7vw",
                            }}
                            align="center"
                            component="th"
                            scope="row"
                          >
                            {row.Correo}
                          </TableCell>
                          <TableCell
                            sx={{
                              padding: "1px 15px 1px 0",
                              fontFamily: "PoppinsRegular",
                              fontSize: ".7vw",
                            }}
                            align="center"
                            component="th"
                            scope="row"
                          >
                            {row.Motivo}
                          </TableCell>

                          <TableCell
                            sx={{
                              padding: "1px 15px 1px 0",
                              fontFamily: "PoppinsRegular",
                              fontSize: ".7vw",
                            }}
                            align="center"
                            component="th"
                            scope="row"
                          >
                            {row.Fecha ? new Date(row.Fecha).toISOString().split("T")[0] : ""}
  
                          </TableCell>

                          <TableCell
                            sx={{
                              padding: "1px 15px 1px 0",
                              fontFamily: "PoppinsRegular",
                              fontSize: ".7vw",
                            }}
                            align="center"
                            component="th"
                            scope="row"
                          >
                            {row.Puesto}
                          </TableCell>

                          <TableCell
                            sx={{
                              flexDirection: "row",
                              display: "grid",
                              gridTemplateColumns: "repeat(1,1fr)",
                            }}
                            align="center"
                            component="th"
                            scope="row"
                          >
                            
                            <Tooltip
                              title="DETALLES"
                              PopperProps={{
                                modifiers: [
                                  {
                                    name: "offset",
                                    options: {
                                      offset: [0, -13],
                                    },
                                  },
                                ],
                              }}
                            >
                              <span>
                                <IconButton
                                  
                                  onClick={() => {
                                    handleClickOpen("0",row.Id);
                                  }}
                                >
                                  <ZoomInMapIcon
                                    sx={[
                                      {
                                        
                                        width: "1.2vw",
                                        height: "1.2vw",
                                      },
                                    ]}
                                  />
                                </IconButton>
                              </span>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}

                    {/* ))} */}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box sx={{ width: "100%" }}>
                <TablePagination
                  rowsPerPageOptions={[renglonesPagina]}
                  component="div"
                  count={usuarios.length}
                  rowsPerPage={renglonesPagina}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Box>
            </Grid>
          </>
        ) : (
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "center",
              height: "92vh",
            }}
            gridArea={"main"}
          >
            <Correos
              idCorreo={idCorreo}
              idApp={localStorage.getItem("IdApp") || ""}
              banderaCrea={bandera}
              showResumen={returnMain}
            />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export interface IICorreos {
  Id: string;
  Nombre: string;
  Correo: string;
  Motivo: string;
  Fecha: string;
  Puesto: string;
  Opciones: string;
}
