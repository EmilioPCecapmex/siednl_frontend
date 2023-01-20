import React, { useEffect, useState } from "react";
import { LateralMenu } from "../../components/lateralMenu/LateralMenu";
import { Header } from "../../components/header/Header";
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  IconButton,
  Button,
  TablePagination,
  Input,
  Select,
  FormControl,
  MenuItem,
  Typography,
} from "@mui/material";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";

import FullModalMir from "../../components/tabsMir/AddMir";
import DeleteDialogMIR from "../../components/modalsMIR/ModalEliminarMIR";
import SearchIcon from "@mui/icons-material/Search";
import moment from "moment";
import ComentDialogMir from "../../components/modalsMIR/ModalComentariosMir";
import Swal from "sweetalert2";
import { TutorialBox } from "../../components/tutorialBox/tutorialBox";
import { IInstituciones } from "../../components/appsDialog/AppsDialog";

export let resumeDefaultMIR = true;

export let setResumeDefaultMIR = () => {
  resumeDefaultMIR=!resumeDefaultMIR;
};

export const MIR = () => {
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

  const [instituciones, setInstituciones] = useState<Array<IInstituciones>>();

  const getInstituciones = () => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/usuarioInsitucion", {
        params: {
          IdUsuario: localStorage.getItem("IdUsuario"),
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          setInstituciones(r.data.data);
        }
      });
  };

  useEffect(() => {
    setShowResume(true);
    getMIRs();
  }, [resumeDefaultMIR]);

  const returnMain = () => {
    setShowResume(true);
    getMIRs();
  };

  const [showResume, setShowResume] = useState(true);
  const [page, setPage] = useState(0);
  const renglonesPagina = 6;
  const [rowsPerPage, setRowsPerPage] = useState(renglonesPagina);
  const [actionNumber, setActionNumber] = useState(0);

  const onChangeActionNumberValue = () => {
    setActionNumber(1)
  }

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

  const [anioFiscalEdit, setAnioFiscalEdit] = useState("");
  const [findTextStr, setFindTextStr] = useState("");
  const [findInstStr, setFindInstStr] = useState("0");
  const [findSelectStr, setFindSelectStr] = useState("0");

  const [mirs, setMirs] = useState<Array<IIMir>>([]);
  const [mirEdit, setMirEdit] = useState<Array<IIMir>>([]);

  //
  const [mirsFiltered, setMirsFiltered] = useState<Array<IIMir>>([]);
  // Filtrado por caracter

  const findText = (v: string, est: string, inst: string) => {
    if (v !== "" || est !== "0" || inst !== "0") {
      setMirsFiltered(
        mirs.filter(
          (x) =>
            x.AnioFiscal.includes(findTextStr) ||
            x.Institucion.toLowerCase().includes(findTextStr.toLowerCase()) ||
            x.Programa.toLowerCase().includes(findTextStr.toLowerCase()) ||
            x.FechaCreacion.toLowerCase().includes(findTextStr.toLowerCase())
        )
      );

      if (est !== "0" && inst !== "0") {
        setMirsFiltered(
          mirs.filter(
            (x) =>
              x.Estado.toLowerCase().includes(est.toLowerCase()) &&
              x.Institucion.toLowerCase().includes(inst.toLowerCase())
          )
        );
      } else if (est !== "0") {
        setMirsFiltered(
          mirs.filter((x) => x.Estado.toLowerCase().includes(est.toLowerCase()))
        );
      } else if (inst !== "0") {
        setMirsFiltered(
          mirs.filter((x) =>
            x.Institucion.toLowerCase().includes(inst.toLowerCase())
          )
        );
      } else {
        setMirsFiltered(mirs);
      }
    } else {
      setMirsFiltered(mirs);
    }
  };




  const getMIRs = () => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/mir", {
        params: {
          IdUsuario: localStorage.getItem("IdUsuario"),
          IdInstitucion: localStorage.getItem("IdInstitucion"),
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        
        
        setAnioFiscalEdit(r.data.data[0]?.AnioFiscal);
        setMirs(r.data.data);
        setMirsFiltered(r.data.data);
        
      });
  };

  useEffect(() => {
    getMIRs();
    getInstituciones();
  }, []);

  const handleClickOpen = () => {
    setShowResume(false);
    onChangeActionNumberValue();
  };

  const [actualizacion, setActualizacion] = useState(0);

  useEffect(() => {
    getMIRs();
  }, [actualizacion]);

  const actualizaContador = () => {
    setActualizacion(actualizacion + 1);
  };
///////////////////////////////////////////////////
  const downloadMIR = (
    anio: string,
    inst: string,
    prog: string,
    mir: string
  ) => {
    axios
      .post(
       "http://10.200.4.46:7001/api/fill_mir",
        JSON.parse(mir),
        {
          responseType: "blob",
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        Toast.fire({
          icon: "success",
          title: "La descarga comenzara en un momento.",
        });
        const href = URL.createObjectURL(r.data);
        
        
        // create "a" HTML element with href to file & click
        const link = document.createElement("a");
        link.href = href;
        link.setAttribute(
          "download",
          "MIR_" + anio + "_" + inst + "_" + prog + ".xlsx"
        ); //or any other extension
        document.body.appendChild(link);
        
        
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: "Error al intentar descargar el documento.",
        });
      });
  };
///////////////////////////////////////
  const colorMir = (v: string, mEdit: string) => {
    if (mEdit !== undefined) {
      let isModification = mEdit;
      isModification = JSON.parse(mEdit);
      if (isModification[1]) {
        return "#cccc00";
      }
    }
    if (v === "En Captura") {
      return "#b3e6b3";
    } else if (v === "En Revisión") {
      return "#e6e6ff";
    } else if (v === "En Autorización") {
      return "#b3b3ff";
    } else if (v === "Autorizada") {
      return "#0000ff";
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        backgroundColor: "#F2F2F2",
      }}
    >
      <LateralMenu selection={2} actionNumber={actionNumber}/>
      <Header
        details={{
          name1: "Inicio",
          path1: "../home",
          name2: "MIR",
          path2: "../mir",
          name3: "",
        }}
      />
      {showResume ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "85%",
            height: "92%",
            mt: "8vh",
            flexWrap: "wrap",
          }}
        >
          <TutorialBox initialState={8} endState={13} />

          <Box
            sx={{
              mt: "3vh",
              width: "60%",
              height: "15vh",
              backgroundColor: "#fff",
              borderRadius: 5,
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              boxShadow: 5,
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "70%",
                alignItems: "center",
                justifyContent: "center",
                border: 1,
                borderRadius: 2,
                borderColor: "#616161",
              }}
            >
              <Input
                size="small"
                value={findTextStr}
                placeholder="Búsqueda"
                sx={{ width: "90%", fontFamily: "MontserratRegular" }}
                disableUnderline
                onChange={(v) => {
                  setFindTextStr(v.target.value);
                  findText(v.target.value, findSelectStr, "");
                }}
              />
              <SearchIcon />
            </Box>

            <FormControl
              sx={{
                display: "flex",
                width: "70%",
                alignItems: "center",
                justifyContent: "center",
                border: 1,
                borderRadius: 2,
                borderColor: "#616161",
              }}
            >
              <Select
                size="small"
                variant="standard"
                value={findSelectStr}
                sx={{ fontFamily: "MontserratRegular" }}
                fullWidth
                disableUnderline
                onChange={(v) => {
                  v.target.value === "Todos"
                    ? findText(
                        findTextStr,
                        "0",
                        findInstStr === "Todos" ? "0" : findInstStr
                      )
                    : findText(findTextStr, v.target.value, findInstStr);
                  setFindSelectStr(v.target.value);
                }}
              >
                <MenuItem
                  value={"0"}
                  sx={{ fontFamily: "MontserratRegular" }}
                  disabled
                  selected
                >
                  Filtro por estado de la MIR
                </MenuItem>
                <MenuItem
                  value={"Todos"}
                  sx={{ fontFamily: "MontserratRegular" }}
                >
                  Todos
                </MenuItem>

                <MenuItem
                  value={"En captura"}
                  sx={{ fontFamily: "MontserratRegular" }}
                >
                  En captura
                </MenuItem>
                <MenuItem
                  value={"En Revisión"}
                  sx={{ fontFamily: "MontserratRegular" }}
                >
                  Esperando revisión
                </MenuItem>
                <MenuItem
                  value={"En Autorización"}
                  sx={{ fontFamily: "MontserratRegular" }}
                >
                  Esperando autorización
                </MenuItem>
                <MenuItem
                  value={"Autorizada"}
                  sx={{ fontFamily: "MontserratRegular" }}
                >
                  Autorizada
                </MenuItem>
              </Select>
            </FormControl>

            <FormControl
              sx={{
                display: "flex",
                width: "70%",
                alignItems: "center",
                justifyContent: "center",
                border: 1,
                borderRadius: 2,
                borderColor: "#616161",
              }}
            >
              <Select
                size="small"
                variant="standard"
                value={findInstStr}
                sx={{ fontFamily: "MontserratRegular" }}
                fullWidth
                disableUnderline
                onChange={(v) => {
                  v.target.value === "Todos"
                    ? findText(
                        findTextStr,
                        findSelectStr === "Todos" ? "0" : findSelectStr,
                        "0"
                      )
                    : findText(findTextStr, findSelectStr, v.target.value);
                  setFindInstStr(v.target.value);
                }}
              >
                <MenuItem
                  value={"0"}
                  sx={{ fontFamily: "MontserratRegular" }}
                  disabled
                  selected
                >
                  Filtro por institución de la MIR
                </MenuItem>

                <MenuItem
                  value={"Todos"}
                  sx={{ fontFamily: "MontserratRegular" }}
                >
                  Todos
                </MenuItem>

                {instituciones?.map((item) => {
                  return (
                    <MenuItem value={item.NombreInstitucion} key={item.Id}>
                      {item.NombreInstitucion}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

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
                setMirEdit([
                  {
                    ID: "",
                    AnioFiscal: "",
                    Institucion: "",
                    Programa: "",
                    Eje: "",
                    Tematica: "",
                    MIR: "",
                    Estado: "",
                    FechaCreacion: "",
                    CreadoPor: "",
                  },
                ]);
                handleClickOpen();
              }}
            >
              Añadir registro
            </Button>
          </Box>

          <Box
            sx={{
              width: "80%",
              height: "65vh",
              backgroundColor: "#ffff",
              borderRadius: 5,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              boxShadow: 5,
            }}
          >
            <Table>
              <TableHead sx={{ backgroundColor: "#edeaea", width: "100%" }}>
                <TableRow
                  sx={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <TableCell
                    sx={{
                      fontFamily: "MontserratBold",
                      borderBottom: 0,
                      fontSize: "0.8vw",
                    }}
                    align="center"
                  >
                    EJERCICIO FISCAL
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: "MontserratBold",
                      borderBottom: 0,
                      fontSize: "0.8vw",
                    }}
                    align="center"
                  >
                    INSTITUCIÓN
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: "MontserratBold",
                      borderBottom: 0,
                      fontSize: "0.8vw",
                    }}
                    align="center"
                  >
                    NOMBRE DEL PROGRAMA
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: "MontserratBold",
                      borderBottom: 0,
                      fontSize: "0.8vw",
                    }}
                    align="center"
                  >
                    ESTADO
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: "MontserratBold",
                      borderBottom: 0,
                      fontSize: "0.8vw",
                    }}
                    align="center"
                  >
                    FECHA DE CREACIÓN
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: "MontserratBold",
                      borderBottom: 0,
                      fontSize: "0.8vw",
                    }}
                    align="center"
                  >
                    CREADO POR
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: "MontserratBold",
                      borderBottom: 0,
                      fontSize: "0.8vw",
                    }}
                    align="center"
                  >
                    OPCIONES
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
            
            <Box
              sx={{
                width: "100%",
                height: "65vh",
                overflow: "hidden",
                overflowY: "unset",
                "&::-webkit-scrollbar": {
                  width: ".3vw",
                  mt: 1,
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "rgba(0,0,0,.5)",
                  outline: "1px solid slategrey",
                  borderRadius: 1,
                },
              }}
            >
              <TableContainer>
                <Table>
                  <TableBody>
                    {mirsFiltered
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(7,1fr)",
                          }}
                        >
                          <TableCell
                            sx={{
                              fontFamily: "MontserratRegular",
                              fontSize: ".7vw",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            align="center"
                          >
                            {row.AnioFiscal}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontFamily: "MontserratRegular",
                              fontSize: ".7vw",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            align="center"
                          >
                            {row.Institucion.toUpperCase()}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontFamily: "MontserratRegular",
                              fontSize: ".7vw",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            align="center"
                          >
                            {row.Programa.toUpperCase()}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontFamily: "MontserratRegular",
                              fontSize: ".7vw",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            align="center"
                          >
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                width: "100%",
                                height: "5vh",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Box
                                sx={{
                                  width: ".5vw",
                                  height: "1vh",
                                  borderRadius: 100,
                                  backgroundColor: colorMir(
                                    row.Estado,
                                    row.MIR
                                  ),
                                }}
                              />
                              <Typography
                                sx={{
                                  width: "60%",
                                  fontFamily: "MontserratRegular",
                                  color: "#616161",
                                  fontSize: ".7vw",
                                  ml: "10%",
                                  textAlign: "center",
                                }}
                              >
                                {row.Estado === "En Captura" &&
                                localStorage.getItem("Rol") === "Capturador"
                                  ? "Borrador"
                                  : row.Estado === "En Revisión" &&
                                    localStorage.getItem("Rol") ===
                                      "Verificador"
                                  ? "Esperando revisión"
                                  : row.Estado === "En Autorización" &&
                                    localStorage.getItem("Rol") ===
                                      "Administrador"
                                  ? "Esperando autorización"
                                  : row.Estado}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell
                            sx={{
                              fontFamily: "MontserratRegular",
                              fontSize: ".7vw",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            align="center"
                          >
                            {moment(row.FechaCreacion, moment.ISO_8601)
                              .format("DD/MM/YYYY HH:mm:SS")
                              .toString()}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontFamily: "MontserratRegular",
                              fontSize: ".7vw",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            align="center"
                          >
                            {row.CreadoPor.toUpperCase()}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "row",
                              }}
                            >
                              <Tooltip
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
                                      row.Estado === "Autorizada" ? false : true
                                    }
                                    
                                    onClick={() =>
                                      downloadMIR(
                                        row.AnioFiscal,
                                        row.Institucion,
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
                              </Tooltip>

                              <ComentDialogMir
                                estado={row.Estado}
                                id={row.ID}
                                actualizado={actualizaContador}
                              />

                              <DeleteDialogMIR
                                disab={
                                  row.Estado === "En Captura" &&
                                  localStorage.getItem("Rol") === "Capturador"
                                    ? false
                                    : row.Estado === "En Revisión" &&
                                      localStorage.getItem("Rol") ===
                                        "Verificador"
                                    ? false
                                    : row.Estado === "En Autorización" &&
                                      localStorage.getItem("Rol") ===
                                        "Administrador"
                                    ? false
                                    : true
                                }
                                id={row.ID}
                                actualizado={actualizaContador}
                              />
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
                                    disabled={
                                      row.Estado === "En Captura" &&
                                      localStorage.getItem("Rol") ===
                                        "Capturador"
                                        ? false
                                        : row.Estado === "En Revisión" &&
                                          localStorage.getItem("Rol") ===
                                            "Verificador"
                                        ? false
                                        : row.Estado === "En Autorización" &&
                                          localStorage.getItem("Rol") ===
                                            "Administrador"
                                        ? false
                                        : true
                                    }
                                    onClick={() => {
                                      setMirEdit([
                                        {
                                          ID: row.ID,
                                          AnioFiscal: row.AnioFiscal,
                                          Institucion: row.Institucion,
                                          Programa: row.Programa,
                                          Eje: row.Eje,
                                          Tematica: row.Tematica,
                                          MIR: row.MIR,
                                          Estado: row.Estado,
                                          FechaCreacion: row.FechaCreacion,
                                          CreadoPor: row.CreadoPor,
                                        },
                                      ]);
                                      setShowResume(false);
                                      setActionNumber(1);
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
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}

                    {/* ))} */}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Box sx={{ width: "100%" }}>
              <TablePagination
                rowsPerPageOptions={[renglonesPagina]}
                component="div"
                count={mirs.length}
                rowsPerPage={renglonesPagina}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
          </Box>
        </Box>
      ) : ( 
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "85%",
            height: "92%",
            flexWrap: "wrap",
          }}
        >
          <FullModalMir
            anioFiscalEdit={anioFiscalEdit}
            MIR={mirEdit[0]?.MIR || ""}
            showResume={returnMain}
            IdMir={mirEdit[0]?.ID || ""}
          />
          
        </Box>
      )}
    </Box>
  );
};

export interface IIMir {
  ID: string;
  AnioFiscal: string;
  Institucion: string;
  Programa: string;
  Eje: string;
  Tematica: string;
  MIR: string;
  Estado: string;
  FechaCreacion: string;
  CreadoPor: string;
}
