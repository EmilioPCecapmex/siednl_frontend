import EditIcon from "@mui/icons-material/Edit";
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
import Usuarios from "../../components/tabsConfig/Usuarios";
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
  id: keyof IIUsuarios;
  isNumeric: boolean;
  label: string;
}

const heads: readonly Head[] = [
  {
    id: "NombreUsuario",
    isNumeric: true,
    label: "NOMBRE USUARIO",
  },
  {
    id: "Nombre",
    isNumeric: true,
    label: "NOMBRE",
  },
  {
    id: "ApellidoPaterno",
    isNumeric: true,
    label: "APELLIDO PATERNO",
  },
  {
    id: "ApellidoMaterno",
    isNumeric: true,
    label: "APELLIDO MATERNO",
  },
  {
    id: "CorreoElectronico",
    isNumeric: true,
    label: "CORREO ELECTRÓNICO",
  },
  {
    id: "Puesto",
    isNumeric: true,
    label: "PUESTO",
  },
  {
    id: "Opciones",
    isNumeric: true,
    label: "EDITAR",
  },
];

export const PanelUsuarios = () => {
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
      .get(process.env.REACT_APP_APPLICATION_LOGIN + "/api/users-app", {
        params: {
          IdApp: localStorage.getItem("IdApp"),
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

  const [usuarios, setUsuarios] = useState<Array<IIUsuarios>>([]);
  const [usuariosFiltered, setUsuariosFiltered] = useState<Array<IIUsuarios>>([]);
  const [usuariosxFiltered, setUsuariosxFiltered] = useState<Array<IIUsuarios>>([]);
  // Filtrado por caracter

  const [idUsuario, setIdUsuario] = useState("");
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
            (x.NombreUsuario.includes(v) ||
              x.Nombre.toLowerCase().includes(v.toLowerCase()) ||
              x.ApellidoPaterno.toLowerCase().includes(v.toLowerCase()) ||
              x.ApellidoMaterno.toLowerCase().includes(v.toLowerCase()) ||
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


  const handleClickOpen = (bandera:string,idUsuario:string) => {
    setShowResume(false);
    setIdUsuario(idUsuario);
    setBandera(bandera);
  };

  useEffect(() => {
    let id = urlParams.get("Id");
    setUsuariosFiltered(usuarios.filter((x) => x.Id.toLowerCase().includes(id || "")));
  }, [usuarios]);

  const [actualizacion, setActualizacion] = useState(0);

  const actualizaContador = () => {
    setActualizacion(actualizacion + 1);
  };
  
  const filtrarDatos = () => {
    console.log("Entra");
    let Arrayfiltro: IIUsuarios[];
    Arrayfiltro = [];

    if (usuariosxFiltered.length !== 0) {
      Arrayfiltro = usuariosxFiltered;
    } else {
      Arrayfiltro = usuariosxFiltered;
    }

    let ResultadoBusqueda = Arrayfiltro.filter((elemento) => {

      if (
        elemento.NombreUsuario.toString()
          .toLocaleLowerCase()
          .includes(findTextStr.toLocaleLowerCase()) ||
        elemento.Nombre.toString()
          .toLocaleLowerCase()
          .includes(findTextStr.toLocaleLowerCase()) ||
        elemento.ApellidoPaterno.toString()
          .toLocaleLowerCase()
          .includes(findTextStr.toLocaleLowerCase()) ||
        elemento.ApellidoMaterno.toString()
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
        <LateralMenu selection={bandera==""?"USUARIOS":bandera=="1"?"AGREGAR USUARIO":"MODIFICAR USUARIO"} actionNumber={actionNumber} />
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
                  sx={{ fontFamily: "MontserratRegular" }}
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

                <Grid item xl={3} lg={4} md={3} sm={2}>
                  <Button
                    sx={{
                      backgroundColor: "#c2a37b",
                      width: "10vw",
                      height: "3.3vh",
                      color: "black",
                      fontFamily: "MontserratMedium",
                      fontSize: "0.6vw",
                    }}
                    onClick={() => {
                      
                      handleClickOpen("1","");
                    }}
                  >
                    Añadir usuario
                  </Button>
                </Grid>
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
                            fontFamily: "MontserratBold",
                            borderBottom: 0,
                            fontSize: "0.8vw",
                            // fontFamily: "MontserratRegular",
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
                              fontFamily: "MontserratRegular",
                              fontSize: ".7vw",
                            }}
                            align="center"
                            component="th"
                            scope="row"
                          >
                            {row.NombreUsuario}
                          </TableCell>
                          <TableCell
                            sx={{
                              padding: "1px 15px 1px 0",
                              fontFamily: "MontserratRegular",
                              fontSize: ".7vw",
                            }}
                            align="center"
                            component="th"
                            scope="row"
                          >
                            {row.Nombre.toUpperCase()}
                          </TableCell>
                          <TableCell
                            sx={{
                              padding: "1px 15px 1px 0",
                              fontFamily: "MontserratRegular",
                              fontSize: ".7vw",
                            }}
                            align="center"
                            component="th"
                            scope="row"
                          >
                            {row.ApellidoPaterno.toUpperCase()}
                          </TableCell>

                          <TableCell
                            sx={{
                              padding: "1px 15px 1px 0",
                              fontFamily: "MontserratRegular",
                              fontSize: ".7vw",
                            }}
                            align="center"
                            component="th"
                            scope="row"
                          >
                            {row.ApellidoMaterno.toUpperCase()}
                          </TableCell>

                          <TableCell
                            sx={{
                              padding: "1px 15px 1px 0",
                              fontFamily: "MontserratRegular",
                              fontSize: ".7vw",
                            }}
                            align="center"
                            component="th"
                            scope="row"
                          >
                            {row.CorreoElectronico.toUpperCase()}
                          </TableCell>

                          <TableCell
                            sx={{
                              padding: "1px 15px 1px 0",
                              fontFamily: "MontserratRegular",
                              fontSize: ".7vw",
                            }}
                            align="center"
                            component="th"
                            scope="row"
                          >
                            {row.Puesto.toUpperCase()}
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
                              title="EDITAR"
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
                                  <EditIcon
                                    sx={[
                                      {
                                        "&:hover": {
                                          color: "blue",
                                        },
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
            <Usuarios
              idUsuario={idUsuario}
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

export interface IIUsuarios {
  Id: string;
  NombreUsuario: string;
  Nombre: string;
  ApellidoPaterno: string;
  ApellidoMaterno: string;
  CorreoElectronico: string;
  Puesto: string;
  Opciones: string;
}
