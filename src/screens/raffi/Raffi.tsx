import {
  Button,
  Grid,
  Typography,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  InputBase,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  LateralMenu,
  IInstituciones,
} from "../../components/lateralMenu/LateralMenu";
import React, { useEffect, useState } from "react";
import { Header } from "../../components/header/Header";
import CapturaRaffi from "../../components/tabsRaffi/CapturaRaffi";
import { SelectChangeEvent } from "@mui/material/Select";
import { queries } from "../../queries";
import { listaRaffi } from "../../services/raffi_services/raffi_endpoints";
import { getInstituciones } from "../../services/instituciones_services/instituciones";
import moment from "moment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import CommentIcon from "@mui/icons-material/Comment";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const estados = [
  "Todos",
  "En Captura",
  "En Revisión",
  "En Autorización",
  "Autorizada",
  "Sin Asignar",
];

interface Head {
  id: keyof IRaffi;
  isNumeric: boolean;
  label: string;
}

const heads: readonly Head[] = [
  {
    id: "AnioFiscal",
    isNumeric: true,
    label: "EJERCICIO FISCAL",
  },
  {
    id: "Institucion",
    isNumeric: true,
    label: "INSTITUCIÓN",
  },
  {
    id: "Programa",
    isNumeric: true,
    label: "NOMBRE DEL PROGRAMA",
  },
  {
    id: "Estado",
    isNumeric: true,
    label: "ESTADO",
  },
  {
    id: "FechaCreacion",
    isNumeric: true,
    label: "FECHA DE CREACIÓN",
  },
  {
    id: "CreadoPor",
    isNumeric: true,
    label: "CREADO POR",
  },
  {
    id: "Opciones",
    isNumeric: true,
    label: "OPCIONES",
  },
];

export const Raffi = () => {
  const [actionNumber, setActionNumber] = useState(0);
  const [showResume, setShowResume] = useState(true);

  const [opentabs, setOpenTabs] = useState(true);

  const [sinasignar, setSinAsignar] = useState(true);

  const [rf, setRf] = useState<Array<IRaffi>>([]);
  const [rfFiltered, setRfFiltered] = useState<Array<IRaffi>>([]);
  const [rfxFiltered, setRfxFiltered] = useState<Array<IRaffi>>([]);
  const [rfEdit, setRtEdit] = useState<IRaffi>();
  const [instituciones, setInstituciones] = useState<Array<IInstituciones>>();

  const [findTextStr, setFindTextStr] = useState("");
  const [findInstStr, setFindInstStr] = useState("Todos");
  const [findSelectStr, setFindSelectStr] = useState("Todos");
  const renglonesPagina = 7;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(renglonesPagina);

  useEffect(() => {
    listaRaffi(setRf);
  }, []);

  useEffect(() => {
    setRfFiltered(rf);
  }, [rf]);

  useEffect(() => {
    setRfxFiltered(rfFiltered);
  }, [rfFiltered]);

  const returnMain = () => {
    setShowResume(true);
    listaRaffi(setRf);
  };

  const findText = (v: string, est: string, inst: string) => {
    if (
      v !== "" &&
      est !== "0" &&
      est !== "Todos" &&
      inst !== "0" &&
      inst !== "Todos"
    ) {
      setRfFiltered(
        rf.filter(
          (x) =>
            (x.AnioFiscal.includes(v) ||
              x.Institucion.toLowerCase().includes(v.toLowerCase()) ||
              x.Programa.toLowerCase().includes(v.toLowerCase()) ||
              x.FechaCreacion.toLowerCase().includes(v.toLowerCase()) ||
              x.CreadoPor.toLowerCase().includes(v.toLowerCase())) &&
            x.Estado.toLowerCase().includes(est.toLowerCase()) &&
            x.Institucion.toLowerCase().includes(inst.toLowerCase())
        )
      );
    } else if (
      v !== "" &&
      ((est !== "0" && est !== "Todos") || (inst !== "0" && inst !== "Todos"))
    ) {
      setRfFiltered(
        rf.filter(
          (x) =>
            (x.AnioFiscal.includes(v) ||
              x.Institucion.toLowerCase().includes(v.toLowerCase()) ||
              x.Programa.toLowerCase().includes(v.toLowerCase()) ||
              x.FechaCreacion.toLowerCase().includes(v.toLowerCase()) ||
              x.CreadoPor.toLowerCase().includes(v.toLowerCase())) &&
            (x.Estado.toLowerCase().includes(est.toLowerCase()) ||
              x.Institucion.toLowerCase().includes(inst.toLowerCase()))
        )
      );
    } else if (
      v !== "" &&
      (est === "0" || est === "Todos") &&
      (inst === "0" || inst === "Todos")
    ) {
      setRfFiltered(
        rf.filter(
          (x) =>
            x.AnioFiscal.includes(v) ||
            x.Institucion.toLowerCase().includes(v.toLowerCase()) ||
            x.Programa.toLowerCase().includes(v.toLowerCase()) ||
            x.FechaCreacion.toLowerCase().includes(v.toLowerCase()) ||
            x.CreadoPor.toLowerCase().includes(v.toLowerCase())
        )
      );
    } else if (
      v === "" &&
      est !== "0" &&
      est !== "Todos" &&
      inst !== "0" &&
      inst !== "Todos"
    ) {
      setRfFiltered(
        rf.filter(
          (x) =>
            x.Estado.toLowerCase().includes(est.toLowerCase()) &&
            x.Institucion.toLowerCase().includes(inst.toLowerCase())
        )
      );
    } else if (
      v === "" &&
      ((est !== "0" && est !== "Todos") || (inst !== "0" && inst !== "Todos"))
    ) {
      setRfFiltered(
        rf.filter(
          (x) =>
            x.Estado.toLowerCase().includes(est.toLowerCase()) ||
            x.Institucion.toLowerCase().includes(inst.toLowerCase())
        )
      );
    } else {
      setRfFiltered(rf);
    }
  };

  useEffect(() => {
    findText(findTextStr, findSelectStr, findInstStr);
  }, [findTextStr, findInstStr, findSelectStr]);

  useEffect(() => {
    getInstituciones(setInstituciones);
  }, []);

  const handleChange = (dato: string) => {
    setFindTextStr(dato);
  };

  const filtrarDatos = () => {
    // eslint-disable-next-line array-callback-return
    console.log("Entra");
    let Arrayfiltro: IRaffi[];
    Arrayfiltro = [];

    if (rfxFiltered.length !== 0) {
      Arrayfiltro = rfxFiltered;
    } else {
      Arrayfiltro = rfFiltered;
    }

  function veropciones  (estado: string) {
    if(estado === "En Captura"){
      return true
    }
    if(estado === "En Revisión"){
      return true
    }
    if(estado === "En Autorización"){
      return true
    }
    if(estado === "Sin Asignar"){
      return false
    }
    return true;
  }

    let ResultadoBusqueda = Arrayfiltro.filter((elemento) => {
      console.log("entre");
      console.log(elemento);
      console.log(findTextStr);
      console.log(rfxFiltered);

      if (
        elemento.AnioFiscal.toString()
          .toLocaleLowerCase()
          .includes(findTextStr.toLocaleLowerCase()) ||
        elemento.Institucion.toString()
          .toLocaleLowerCase()
          .includes(findTextStr.toLocaleLowerCase()) ||
        elemento.Programa.toString()
          .toLocaleLowerCase()
          .includes(findTextStr.toLocaleLowerCase()) ||
        elemento.Estado.toString()
          .toLocaleLowerCase()
          .includes(findTextStr.toLocaleLowerCase()) ||
        elemento.FechaCreacion.toString()
          .toLocaleLowerCase()
          .includes(findTextStr.toLocaleLowerCase()) ||
        elemento.CreadoPor.toString()
          .toLocaleLowerCase()
          .includes(findTextStr.toLocaleLowerCase())
      ) {
        console.log(elemento);
        return elemento;
      }
    });

    setRfxFiltered(ResultadoBusqueda);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    findTextStr.length !== 0 ? setRfFiltered(rfFiltered) : null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [findTextStr]);

  return (
    <Grid container direction="row" height={"100vh"} width={"100vw"}>

      <Grid item height={"100vh"}>
        <LateralMenu selection={"Raffi"} actionNumber={actionNumber} />
      </Grid>

      <Grid
        justifyContent={"center"}
        display={"flex"}
        container
        item
        xl={10.2}
        lg={9.9}
        md={9.4}
        sm={7.5}
        xs={6}
        sx={{ backgroundColor: "#F2F2F2" }}
      >
        <Grid sx={{ height: "8vh", marginLeft: "4vw" }}>
          <Header
            details={{
              name1: "Inicio",
              path1: "../home",
              name2: "Raffi",
              path2: "../raffi",
              name3: "",
            }}
          />
        </Grid>

        {opentabs ? (
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
                  xl={11}
                  lg={10}
                  md={8}
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
                      aria-label="search"
                      onClick={() => filtrarDatos()}
                    >
                      <SearchIcon />
                    </IconButton>
                  </Paper>
                </Grid>

                {/* <Grid item xl={5} lg={4} md={3}>
                  <Button
                    fullWidth
                    sx={queries.buttonContinuarSolicitudInscripcion}
                    onClick={() => {
                      setOpenTabs(false);
                    }}
                  >
                    Buscar
                  </Button>
                </Grid> */}
              </Grid>

              <Grid
                xl={12}
                lg={12}
                md={12}
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
              >
                <Grid item xl={5} lg={4} md={3} sm={2}>
                  <FormControl fullWidth>
                    <InputLabel sx={queries.text}>
                      Filtro por institución
                    </InputLabel>
                    <Select
                      size="small"
                      fullWidth
                      variant="outlined"
                      label="Filtro por institución"
                      value={findInstStr}
                      onChange={(v) => {
                        // v.target.value === "Todos"
                        //   ? findText(
                        //       findTextStr,
                        //       findSelectStr === "Todos" ? "0" : findSelectStr,
                        //       "0"
                        //     )
                        //   : findText(findTextStr, findSelectStr, v.target.value);
                        setFindInstStr(v.target.value);
                      }}
                    >
                      <MenuItem
                        value={"Todos"}
                        sx={{ fontFamily: "MontserratRegular" }}
                      >
                        Todos
                      </MenuItem>

                      {instituciones?.map((item) => {
                        return (
                          <MenuItem
                            value={item.NombreInstitucion}
                            key={item.Id}
                          >
                            {item.NombreInstitucion}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xl={5} lg={4} md={3}>
                  <FormControl fullWidth>
                    <InputLabel sx={queries.text}>
                      Filtro por estado de la Raffi
                    </InputLabel>
                    <Select
                      size="small"
                      fullWidth
                      variant="outlined"
                      label="Filtro por estado de la Raffi"
                      value={findSelectStr}
                      onChange={(v) => {
                        // v.target.value === "Todos"
                        //   ? findText(
                        //       findTextStr,
                        //       "0",
                        //       findInstStr === "Todos" ? "0" : findInstStr
                        //     )
                        //   : findText(findTextStr, v.target.value, findInstStr);
                        setFindSelectStr(v.target.value);
                      }}
                    >
                      {estados.map((estado) => (
                        <MenuItem key={estado} value={estado}>
                          {estado}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
              <TableContainer sx={{ borderRadius: 5 }}>
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
                    {rfxFiltered
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        return (
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
                              {row.AnioFiscal}
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
                              {row.Institucion.toUpperCase()}
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
                              {row.Programa.toUpperCase()}
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
                              {row.Estado === "En Captura" &&
                              localStorage.getItem("Rol") === "Capturador"
                                ? "Borrador"
                                : row.Estado === "En Revisión" &&
                                  localStorage.getItem("Rol") === "Verificador"
                                ? "En Revisión"
                                : row.Estado === "En Autorización" &&
                                  localStorage.getItem("Rol") ===
                                    "Administrador"
                                ? "En Autorización"
                                : row.Estado}
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
                              {moment(row.FechaCreacion, moment.ISO_8601)
                                .format("DD/MM/YYYY HH:mm:SS")
                                .toString()}
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
                              {row.CreadoPor.toUpperCase()}
                            </TableCell>
                            <TableCell
                              sx={{
                                flexDirection: "row",
                                display: "grid",
                                gridTemplateColumns: "repeat(4,1fr)",
                              }}
                              align="center"
                              component="th"
                              scope="row"
                            >
                              {  row.Estado !=="Sin Asignar" && (
                                  <Tooltip title="EDITAR">
                                  <IconButton
                                    type="button"
                                    onClick={() => {
                                      setRtEdit({
                                        IdRf: row.IdRf,
                                        IdMir: row.IdMir,
                                        IdMa: row.IdMa,
                                        RAFFI: row.RAFFI,
                                        Estado: row.Estado,
                                        CreadoPor: row.CreadoPor,
                                        FechaCreacion: row.FechaCreacion,
                                        ModificadoPor: row.ModificadoPor,
                                        AnioFiscal: row.AnioFiscal,
                                        Institucion: row.Institucion,
                                        Programa: row.Programa,
                                        MIR: row.MIR,
                                        MetaAnual: row.MetaAnual,
                                        Conac: row.Conac,
                                        Consecutivo: row.Consecutivo,
                                        Opciones: row.Opciones,
                                      });
                                      setOpenTabs(false);
                                      setActionNumber(1); //Revisar esta funcionalidad
                                    }}
                                  >
                                    <EditIcon />
                                    {row.Opciones}
                                  </IconButton></Tooltip>) 
                              }

                              { 
                                <Tooltip title="REGISTRAR RAFFI">
                                <IconButton
                                // disabled={
                                //   row.Estado === "En Captura" &&
                                //   localStorage.getItem("Rol") ===
                                //     "Capturador"
                                //     ? false
                                //     : row.Estado === "En Revisión" &&
                                //       localStorage.getItem("Rol") ===
                                //         "Verificador"
                                //     ? false
                                //     : row.Estado === "En Autorización" &&
                                //       localStorage.getItem("Rol") ===
                                //         "Administrador"
                                //     ? false
                                //     : true
                                // }
                                  type="button"
                                  onClick={() => {
                                    setRtEdit({
                                      IdRf: row.IdRf,
                                      IdMir: row.IdMir,
                                      IdMa: row.IdMa,
                                      RAFFI: row.RAFFI,
                                      Estado: row.Estado,
                                      CreadoPor: row.CreadoPor,
                                      FechaCreacion: row.FechaCreacion,
                                      ModificadoPor: row.ModificadoPor,
                                      AnioFiscal: row.AnioFiscal,
                                      Institucion: row.Institucion,
                                      Programa: row.Programa,
                                      MIR: row.MIR,
                                      MetaAnual: row.MetaAnual,
                                      Conac: row.Conac,
                                      Consecutivo: row.Consecutivo,
                                      Opciones: row.Opciones,
                                    });
                                    setOpenTabs(false);
                                    setActionNumber(1); //Revisar esta funcionalidad
                                  }}
                                >
                                  <AddCircleOutlineIcon />
                                  {row.Opciones}
                                </IconButton>
                              </Tooltip>
                              }
                              
                              
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

          </>
        ) : (
          <CapturaRaffi
            MIR={rfEdit?.MIR || ""}
            MA={rfEdit?.MetaAnual || ""}
            RF={rfEdit?.RAFFI || ""}
            opentabs={returnMain}
            IdMir={rfEdit?.IdMir || ""}
            IdMA={rfEdit?.IdMa || ""}
            IdRf={rfEdit?.IdRf || ""}
          />
        )}
      </Grid>

    </Grid>
  );
};

export interface IRaffi {
  IdRf: string;
  IdMir: string;
  IdMa: string;
  RAFFI: string;
  Estado: string;
  CreadoPor: string;
  FechaCreacion: string;
  ModificadoPor: string;
  AnioFiscal: string; //viene de la mir
  Institucion: string;
  Programa: string;
  MIR: string;
  MetaAnual: string;
  Conac: string;
  Consecutivo: string;
  Opciones: string;
}
