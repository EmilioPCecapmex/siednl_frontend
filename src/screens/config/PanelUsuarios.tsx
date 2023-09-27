/* eslint-disable react-hooks/exhaustive-deps */
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  InputLabel,
  TextField,
  InputBase,
  Paper,
  Grid,
  TableSortLabel,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Header } from "../../components/header/Header";
import { LateralMenu } from "../../components/lateralMenu/LateralMenu";
import { queries } from "../../queries";
import moment from "moment";
import Swal from "sweetalert2";
import { IEntidad } from "../../components/appsDialog/AppsDialog";
import ComentDialogMir from "../../components/modalsMIR/ModalComentariosMir";
import DeleteDialogMIR from "../../components/modalsMIR/ModalEliminarMIR";
import FullModalMir from "../../components/tabsMir/AddMir";
import { SelectChangeEvent } from "@mui/material/Select";
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
        // setAnioFiscalEdit(r.data.data[0]?.AnioFiscal);

        setState(r.data.data);
      });
  };

  
  useEffect(() => {
    setShowResume(true);
    //getMIRs(setMirs);
  }, []);

  const returnMain = () => {
    setShowResume(true);
    setBandera("");
    //getMIRs(setMirs);
  };
  
  const [showResume, setShowResume] = useState(true);
  const [page, setPage] = useState(0);
  const renglonesPagina = 5;
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
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0);
  };


  const [findTextStr, setFindTextStr] = useState("");
  const [findInstStr, setFindInstStr] = useState("Todos");
  const [findSelectStr, setFindSelectStr] = useState("Todos");

//   const [mirEdit, setMirEdit] = useState<Array<IIMir>>([]);

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
    //   &&
    //   est !== "0" &&
    //   est !== "Todos" &&
    //   inst !== "0" &&
    //   inst !== "Todos"
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
    // } else if (
    //   v !== "" &&
    //   ((est !== "0" && est !== "Todos") || (inst !== "0" && inst !== "Todos"))
    // ) {
    //   setUsuariosFiltered(
    //     usuarios.filter(
    //       (x) =>
    //         (x.AnioFiscal.includes(v) ||
    //           x.Entidad.toLowerCase().includes(v.toLowerCase()) ||
    //           x.Programa.toLowerCase().includes(v.toLowerCase()) ||
    //           x.FechaCreacion.toLowerCase().includes(v.toLowerCase()) ||
    //           x.CreadoPor.toLowerCase().includes(v.toLowerCase())) &&
    //         (x.Estado.toLowerCase().includes(est.toLowerCase()) ||
    //           x.Entidad.toLowerCase().includes(inst.toLowerCase()))
    //     )
    //   );
    // } else if (
    //   v !== "" &&
    //   (est === "0" || est === "Todos") &&
    //   (inst === "0" || inst === "Todos")
    // ) {
    //   setUsuariosFiltered(
    //     usuarios.filter(
    //       (x) =>
    //         x.AnioFiscal.includes(v) ||
    //         x.Entidad.toLowerCase().includes(v.toLowerCase()) ||
    //         x.Programa.toLowerCase().includes(v.toLowerCase()) ||
    //         x.FechaCreacion.toLowerCase().includes(v.toLowerCase()) ||
    //         x.CreadoPor.toLowerCase().includes(v.toLowerCase())
    //     )
    //   );
    // } else if (
    //   v === "" &&
    //   est !== "0" &&
    //   est !== "Todos" &&
    //   inst !== "0" &&
    //   inst !== "Todos"
    // ) {
    //   setUsuariosFiltered(
    //     usuarios.filter(
    //       (x) =>
    //         x.Estado.toLowerCase().includes(est.toLowerCase()) &&
    //         x.Entidad.toLowerCase().includes(inst.toLowerCase())
    //     )
    //   );
    // } else if (
    //   v === "" &&
    //   ((est !== "0" && est !== "Todos") || (inst !== "0" && inst !== "Todos"))
    // ) {
    //   setUsuariosFiltered(
    //     usuarios.filter(
    //       (x) =>
    //         x.Estado.toLowerCase().includes(est.toLowerCase()) ||
    //         x.Entidad.toLowerCase().includes(inst.toLowerCase())
    //     )
    //   );
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

//   useEffect(() => {
//     //getMIRs(setMirs);
//     console.log("Entidades: ", instituciones);

//     getInstituciones(setInstituciones);
//   }, []);

  const handleClickOpen = (bandera:string,idUsuario:string) => {
    setShowResume(false);
    setIdUsuario(idUsuario);
    setBandera(bandera);
    // onChangeActionNumberValue();
  };

  useEffect(() => {
    let id = urlParams.get("Id");
    setUsuariosFiltered(usuarios.filter((x) => x.Id.toLowerCase().includes(id || "")));
  }, [usuarios]);

  const [actualizacion, setActualizacion] = useState(0);

//   useEffect(() => {usuariosxFiltered
//     getUsuarios(setUsuarios);
//   }, [actualizacion]);

  const actualizaContador = () => {
    setActualizacion(actualizacion + 1);
  };
  
  const filtrarDatos = () => {
    // eslint-disable-next-line array-callback-return
    console.log("Entra");
    let Arrayfiltro: IIUsuarios[];
    Arrayfiltro = [];

    if (usuariosxFiltered.length !== 0) {
      Arrayfiltro = usuariosxFiltered;
    } else {
      Arrayfiltro = usuariosxFiltered;
    }

    let ResultadoBusqueda = Arrayfiltro.filter((elemento) => {
      console.log("entre");
      console.log(elemento);
      console.log(findTextStr);
      console.log(usuariosxFiltered);

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
        console.log(elemento);
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
              height="15vh"
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
              height="65vh"
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
                            {/* {row.Nombre.toUpperCase()} */}
                            {row.Id}
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
                            {/* <Tooltip
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
                              title="DESCARGAR MIR"
                            >
                              <span>
                                <IconButton
                                  disabled={
                                    row.Estado === "Autorizada" && validaFecha
                                      ? false
                                      : true
                                  }
                                  onClick={() =>
                                    downloadMIR(
                                      row.AnioFiscal,
                                      row.Entidad,
                                      row.Programa,
                                      row.MIR
                                    )
                                  }
                                >
                                  <DownloadIcon
                                    sx={[
                                      {
                                        "&:hover": {
                                          color: "orange",
                                        },
                                        width: "1.2vw",
                                        height: "1.2vw",
                                      },
                                    ]}
                                  />
                                </IconButton>
                              </span>
                            </Tooltip> */}

                            {/* <ComentDialogMir
                              estado={row.Estado}
                              id={row.Id}
                              actualizado={actualizaContador}
                            /> */}

                            {/* <DeleteDialogMIR
                              
                              id={row.Id}
                              actualizado={actualizaContador}
                            /> */}
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
