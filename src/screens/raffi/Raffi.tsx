import {
  Button,
  Grid,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  IconButton,
  TablePagination,
  Input,
  Select,
  FormControl,
  MenuItem,
  Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  IInstituciones,LateralMenu } from "../../components/lateralMenu/LateralMenu";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import { Header } from "../../components/header/Header";
import Swal from "sweetalert2";
import CapturaRaffi from "../../components/tabsRaffi/CapturaRaffi";
export let resumeDefaultFT = true;
export interface IIFT {
  IdFt: string;
  IdMir: string;
  IdMa: string;
  FichaT: string;
  Estado: string;
  CreadoPor: string;
  FechaCreacion: string;
  AnioFiscal: string;
  Institucion: string;
  Programa: string;
  MIR: string;
  MetaAnual: string;
  Conac: string;
  Consecutivo: string;
}

export interface IDownloadFT {
  MaId: string;
  MetaAnual: string;
  MirId: string;
  MIR: string;
  MaCompleta: string;
  FT: string;
}

export const Raffi = () => {
 
  // const [actionNumber, setActionNumber] = useState(0);

  const [opentabs, setOpenTabs] = useState(false);

  useEffect(() => {
    setShowResume(true);
    getFT();
  }, [resumeDefaultFT]);

  const returnMain = () => {
    setShowResume(true);
    getFT();
  };

  const [openModalVerResumenFT, setOpenModalVerResumenFT] = useState(false);

  const handleCloseVerResumenFT = () => {
    setOpenModalVerResumenFT(false);
  };

  const [showResume, setShowResume] = useState(true);
  const [page, setPage] = useState(0);

  const renglonesPagina = 7;
  const [rowsPerPage, setRowsPerPage] = useState(renglonesPagina);

  const [actionNumber, setActionNumber] = useState(0);

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
  const [findInstStr, setFindInstStr] = useState("0");
  const [findSelectStr, setFindSelectStr] = useState("0");

  const [ft, setft] = useState<Array<IIFT>>([]);
  const [FTEdit, setFTEdit] = useState<Array<IIFT>>([]);
  const [FTShow, setFTShow] = useState<Array<IIFT>>([]);

  const [ftFiltered, setFtFiltered] = useState<Array<IIFT>>([]);

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

  /////////////////////////////////////////
  const getFichaTecnicaDownload = (
    MIR: string,
    MetaAnual: string,
    FT: string,
    inst: string,
    Programa: string,
    FechaCreacion: string
  ) => {
    const fullft = [JSON.parse(MIR), JSON.parse(MetaAnual), JSON.parse(FT)];

    axios
      .post(process.env.REACT_APP_APPLICATION_FILL + "/api/fill_ft", fullft, {
        responseType: "blob",
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
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
          "FT_" + FechaCreacion + "_" + inst + "_" + Programa + ".xlsx"
        ); //or any other extension
        document.body.appendChild(link);

        link.click();

        // clean up "a" element & remove ObjectURL

        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      })
      .catch((err) => {
        console.log(err);
        
        Toast.fire({
          icon: "error",
          title: "Error al intentar descargar el documento.",
        });
      });
  };

  ///////////////////////////////////////////////////
  useEffect(() => {
    getInstituciones();
  }, []);
  ///////////
  // Filtrado por caracter
  const findText = (v: string, est: string, inst: string) => {
    if (
      v !== "" &&
      est !== "0" &&
      est !== "Todos" &&
      inst !== "0" &&
      inst !== "Todos"
    ) {
      setFtFiltered(
        ft.filter(
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
      setFtFiltered(
        ft.filter(
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
      setFtFiltered(
        ft.filter(
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
      setFtFiltered(
        ft.filter(
          (x) =>
            x.Estado.toLowerCase().includes(est.toLowerCase()) &&
            x.Institucion.toLowerCase().includes(inst.toLowerCase())
        )
      );
    } else if (
      v === "" &&
      ((est !== "0" && est !== "Todos") || (inst !== "0" && inst !== "Todos"))
    ) {
      setFtFiltered(
        ft.filter(
          (x) =>
            x.Estado.toLowerCase().includes(est.toLowerCase()) ||
            x.Institucion.toLowerCase().includes(inst.toLowerCase())
        )
      );
    } else {
      setFtFiltered(ft);
    }
  };

  useEffect(() => {
    findText(findTextStr, findSelectStr, findInstStr);
  }, [findTextStr, findInstStr, findSelectStr]);

  const getFT = () => {
    axios
      .get(
        process.env.REACT_APP_APPLICATION_BACK + "/api/Lista-Ficha-tecnica",
        {
          params: {
            IdUsuario: localStorage.getItem("IdUsuario"),
            IdInstitucion: localStorage.getItem("IdInstitucion"),
          },
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        setft(r.data.data);
        setFtFiltered(r.data.data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getFT();
  }, []);

  const [actualizacion, setActualizacion] = useState(0);

  useEffect(() => {
    console.log("ft: ",ft);
    
    let id = urlParams.get("Id");
    setFtFiltered(ft.filter((x) => x.IdFt.toLowerCase().includes(id || "")));
  }, [ft]);

  useEffect(() => {
    getFT();
  }, [actualizacion]);

  const actualizaContador = () => {
    setActualizacion(actualizacion + 1);
  };

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
    <Grid container display="flex">
      <Grid item height={"100vh"}>
          <LateralMenu selection={"Raffi"} actionNumber={actionNumber} />
      </Grid>
      





      



        
      <Grid item sx={{ backgroundColor: "#F2F2F2", flexGrow: 1 }}>

        <Grid sx={{ width: "80%", height: "8vh", marginLeft: "4vw" }}>
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

        <Grid item sx ={{display: "flex",  justifyContent: "center"}}>
            {!opentabs && (
              <Grid>
                <Button
                  onClick={() => {
                    setOpenTabs(true);
                  }}
                >
                  Ir a tabs
                </Button>
              </Grid>
            )}
            {opentabs && <CapturaRaffi />}
          </Grid>

      </Grid>




      {/*  */}
      {/* <Grid gridArea={"header"} sx={{ height: "8vh" }}>
        <Header
          details={{
            name1: "Inicio",
            path1: "../home",
            name2: "Ficha Técnica",
            path2: "../fichatecnica",
            name3: "",
          }}
        />
      </Grid> */}

      {/* {showResume ? ( */}
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
          <Grid
            sx={{
              width: "60%",
              height: "15vh",
              backgroundColor: "#fff",
              borderRadius: 5,
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gridTemplateRows: "repeat(2, 1fr)",
              GridShadow: 5,
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            {/* <TutorialGrid initialState={45} endState={49} /> */}
            <Grid
              // sx={{
              //   display: "flex",
              //   width: "70%",
              //   alignItems: "center",
              //   justifyContent: "center",
              //   border: 1,
              //   borderRadius: 2,
              //   borderColor: "#616161",
              // }}
            >
              <Input
                size="small"
                value={findTextStr}
                placeholder="Búsqueda"
                sx={{ width: "90%", fontFamily: "MontserratRegular" }}
                disableUnderline
                onChange={(v) => {
                  setFindTextStr(v.target.value);
                }}
              />
              <SearchIcon />
            </Grid>

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
                  setFindSelectStr(v.target.value);
                }}
              >
                <MenuItem
                  value={"0"}
                  sx={{ fontFamily: "MontserratRegular" }}
                  disabled
                  selected
                >
                  Filtro por estado de la Ficha Técnica
                </MenuItem>
                <MenuItem
                  value={"Todos"}
                  sx={{ fontFamily: "MontserratRegular" }}
                >
                  Todos
                </MenuItem>

                <MenuItem
                  value={"En Captura"}
                  sx={{ fontFamily: "MontserratRegular" }}
                >
                  En Captura
                </MenuItem>
                <MenuItem
                  value={"En Revisión"}
                  sx={{ fontFamily: "MontserratRegular" }}
                >
                  Esperando Revisión
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
                  setFindInstStr(v.target.value);
                }}
              >
                <MenuItem
                  value={"0"}
                  sx={{ fontFamily: "MontserratRegular" }}
                  disabled
                  selected
                >
                  Filtro por institución
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
          </Grid>

          <Grid
            // sx={{
            //   width: "80%",
            //   height: "65vh",
            //   backgroundColor: "#ffff",
            //   borderRadius: 5,
            //   display: "flex",
            //   alignItems: "center",
            //   flexDirection: "column",
            //   GridShadow: 5,
            // }}
          >
            
          </Grid>
        

        {/* TERMINA */}












    </Grid>
    </Grid>
  );
};
