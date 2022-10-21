import React, { useEffect, useState } from "react";
import { LateralMenu } from "../../components/lateralMenu/LateralMenu";
import { Header } from "../../components/header/Header";
import {
  TextField,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Autocomplete,
  Tooltip,
  IconButton,
  Button,
  TablePagination,
  Input,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import FullModalMir from "../../components/tabsMir/FullModalMir";
import DeleteDialogMIR from "../../components/modalEnviarMIR/ModalEliminarMIR";
import MessageIcon from "@mui/icons-material/Message";
import SearchIcon from '@mui/icons-material/Search';
import moment from "moment";

export let resumeDefaultMIR = true;
export let setResumeDefaultMIR = () => {
  resumeDefaultMIR = !resumeDefaultMIR;
};

export const MIR = () => {


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

  const renglonesPagina = 7;
  const [rowsPerPage, setRowsPerPage] = useState(renglonesPagina);

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
  const [findTextStr, setFindTextStr] = useState("")
  const [findSelectStr, setFindSelectStr] = useState("0")



  const [mirs, setMirs] = useState<Array<IIMir>>([]);
  const [mirEdit, setMirEdit] = useState<Array<IIMir>>([]);

  //
  const [mirsFiltered, setMirsFiltered] = useState<Array<IIMir>>([]);
  // Filtrado por caracter
  const findText = (v: string, select: string) => {

    if (v !== "" || select !== "0") {
      
      setMirsFiltered(
        mirs.filter(
          (x) =>
            x.AnioFiscal.includes(findTextStr) ||
            x.Institucion.toLowerCase().includes(findTextStr.toLowerCase()) ||
            x.Programa.toLowerCase().includes(findTextStr.toLowerCase()) ||
            x.FechaCreacion.toLowerCase().includes(findTextStr.toLowerCase())
        )
      )

      if(select !== "0"){
        setMirsFiltered(
          mirs.filter(
            (x) =>
              x.Estado.toLowerCase().includes(select.toLowerCase())
          )
        )
      }
   
   
    }else {
      setMirsFiltered(mirs);
    }
  };

  const getMIRs = () => {
    axios
      .get("http://10.200.4.105:8000/api/mir", {
        params: {
          IdUsuario: localStorage.getItem("IdUsuario"),
          IdInstitucion: localStorage.getItem("IdInstitucion"),
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        setAnioFiscalEdit(r.data.data[0]?.AnioFiscal)
        setMirs(r.data.data);
        setMirsFiltered(r.data.data);
      });
  };

  useEffect(() => {
    getMIRs();
  }, []);

  const handleClickOpen = () => {
    setShowResume(false);
  };

  const [actualizacion, setActualizacion] = useState(0);

  useEffect(() => {
    getMIRs();
  }, [actualizacion]);

  const actualizaContador = () => {
    setActualizacion(actualizacion + 1);
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
      <LateralMenu selection={2} />
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
          <Box
            sx={{
              mt: "3vh",
              width: "60%",
              height: "15vh",
              backgroundColor: "#fff",
              borderRadius: 5,
              display: "flex",
              boxShadow: 5,
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <Box sx={{display: 'flex', width: '30%', alignItems: 'center', justifyContent: 'center', border: 1, borderRadius: 2, borderColor: '#616161'}}>
            <Input size="small" value={findTextStr}
            placeholder="Busqueda"
            sx={{width: '90%', fontFamily: 'MontserratRegular'}}
            disableUnderline onChange={(v) => {
              setFindTextStr(v.target.value)
              findText(v.target.value, findSelectStr)}} />
            <SearchIcon/>
            </Box>

            <FormControl sx={{display: 'flex', width: '30%', alignItems: 'center', justifyContent: 'center', border: 1, borderRadius: 2, borderColor: '#616161'}}>
  <Select size="small" variant="standard" value={findSelectStr}
  sx={{fontFamily: 'MontserratRegular'}}
  fullWidth
  disableUnderline
  onChange={(v) => {
    findText(findTextStr,v.target.value)
    setFindSelectStr(v.target.value)}}>
  <MenuItem value={"0"} sx={{fontFamily: 'MontserratRegular'}} disabled selected>Estado MIR</MenuItem>
  <MenuItem value={"Todos"} sx={{fontFamily: 'MontserratRegular'}}>Todos</MenuItem>

    <MenuItem value={"En Captura"} sx={{fontFamily: 'MontserratRegular'}}>En Captura</MenuItem>
    <MenuItem value={"En Revisión"} sx={{fontFamily: 'MontserratRegular'}}>Esperando Revisión</MenuItem>
    <MenuItem value={"En Autorización"} sx={{fontFamily: 'MontserratRegular'}}>Esperando autorización</MenuItem>
    <MenuItem value={"Autorizada"} sx={{fontFamily: 'MontserratRegular'}}>Autorizada</MenuItem>
  </Select>
</FormControl>
          

            <Button
              sx={{
                backgroundColor: "#c2a37b",
                width: "10vw",
                height: "4vh",
                color: "black",
                fontFamily: "montserrat",
                fontSize: "0.6vw",
              }}
              onClick={() => handleClickOpen()}
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
                  <TableHead sx={{ backgroundColor: "#edeaea" }}>
                    <TableRow>
                      <TableCell
                        sx={{ fontFamily: "MontserratBold" }}
                        align="center"
                      >
                        Ejercicio Fiscal
                      </TableCell>
                      <TableCell
                        sx={{ fontFamily: "MontserratBold" }}
                        align="center"
                      >
                        Institución
                      </TableCell>
                      <TableCell
                        sx={{ fontFamily: "MontserratBold" }}
                        align="center"
                      >
                        Nombre del Programa
                      </TableCell>
                      {/* <TableCell
                        sx={{ fontFamily: "MontserratBold" }}
                        align="center"
                      >
                        Eje
                      </TableCell> */}
                      {/* <TableCell
                        sx={{ fontFamily: "MontserratBold" }}
                        align="center"
                      >
                        Tema
                      </TableCell> */}
                      <TableCell
                        sx={{ fontFamily: "MontserratBold" }}
                        align="center"
                      >
                        Estado
                      </TableCell>
                      <TableCell
                        sx={{ fontFamily: "MontserratBold" }}
                        align="center"
                      >
                        Fecha Creación
                      </TableCell>
                      <TableCell
                        sx={{ fontFamily: "MontserratBold" }}
                        align="center"
                      >
                        Opciones
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {mirsFiltered
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => (
                        <TableRow key={index}>
                          <TableCell
                            sx={{
                              fontFamily: "MontserratRegular",
                              fontSize: ".7vw",width: '15%',
                            }}
                            align="center"
                          >
                            {row.AnioFiscal}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontFamily: "MontserratRegular",
                              fontSize: ".7vw",width: '20%',
                            }}
                            align="center"
                          >
                            {row.Institucion}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontFamily: "MontserratRegular",
                              fontSize: ".7vw",width: '20%',
                            }}
                            align="center"
                          >
                            {row.Programa}
                          </TableCell>
                          {/* <TableCell
                            sx={{
                              fontFamily: "MontserratRegular",
                              fontSize: ".7vw",width: '15%',
                            }}
                            align="center"
                          >
                            {row.Tematica}
                          </TableCell> */}
                          {/* <TableCell
                            sx={{
                              fontFamily: "MontserratRegular",
                              fontSize: ".7vw",width: '15%',
                            }}
                            align="center"
                          >
                            {row.Eje}
                          </TableCell> */}
                          <TableCell
                            sx={{
                              fontFamily: "MontserratRegular",
                              fontSize: ".7vw",width: '20%',
                            }}
                            align="center"
                          >
                            {row.Estado === "En Captura" &&
                            localStorage.getItem("Rol") === "Capturador"
                              ? "Borrador"
                              : row.Estado === "En Revisión" &&
                                localStorage.getItem("Rol") === "Verificador"
                              ? "Esperando revisión"
                              : row.Estado === "En Autorización" &&
                                localStorage.getItem("Rol") === "Administrador"
                              ? "Esperando autorización"
                              : row.Estado}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontFamily: "MontserratRegular",
                              fontSize: ".7vw",width: '15%',
                            }}
                            align="center"
                          >
                            {moment(row.FechaCreacion, moment.ISO_8601)
                              .format("DD/MM/YYYY HH:mm:SS")
                              .toString()}
                          </TableCell>
                          <TableCell align="center" sx={{width: '10%'}}>
                            <Box
                              sx={{ display: "flex", justifyContent: "center", alignItems: 'center', flexDirection: 'row' }}
                            >
                              <Tooltip title="Descargar">
                                <span>
                                  <IconButton>
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
                              <Tooltip title="Comentarios">
                                <span>
                                  <IconButton>
                                    <MessageIcon
                                      sx={[
                                        {
                                          "&:hover": {
                                            color: "indigo",
                                          },
                                          width: "1.2vw",
                                          height: "1.2vw",
                                        },
                                      ]}
                                    />
                                  </IconButton>
                                </span>
                              </Tooltip>
                        
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
                              <Tooltip title="Editar">
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
                                        },
                                      ]);
                                      setShowResume(false);
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
}