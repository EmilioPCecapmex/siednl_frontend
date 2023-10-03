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
  List,
  Divider,
  ListItemButton,
  Collapse,
  Typography,
  Grid,
  TableSortLabel,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { InsertarComponentePDF } from "./InsertarPDF";
import LaunchIcon from '@mui/icons-material/Launch';
import DownloadIcon from "@mui/icons-material/Download";
import axios from "axios";
import Swal from "sweetalert2";
import VisualizarPAE from "../../components/modalsPAE/ModalVisualizacionPAE";


export const TabPAE = ({
  anios,
  idPAE,
  Anio,
  Numero,
  Nombre,
  Ruta,
  value
}: {
  anios: number[];
  idPAE: string;
  Anio: string;
  Numero: string;
  Nombre: string;
  Ruta: string;
  value: number;
}) => {
  interface Registro {
    Id: string;
    Anio: string;
    Nombre: string;
    Ruta: string;
    PerteneceA: string;

  }
  const [open, setOpen] = useState(1);
  const [componenteSelect, setComponenteSelect] = useState(0);
  const [noAnios, setAnios] = useState([1]);
  const [noNumeros, setNumeros] = useState([1]);
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [registrosFiltrados, setRegistrosFiltrados] = useState<Registro[]>([]);
  const handleClickComponente = (index: number) => {
    setOpen(index);
  };
  const [actividadSelect, setActividadSelect] = useState(0);

  const tabsRegistros = (value:number,anio:string) => {
    getListaPae();
    switch(anio) {
      case "2020":
        switch (value) {
          case 10:
            setRegistrosFiltrados(registros.filter(
              (x) =>
                (
                x.Anio.includes("2020")
                )
            ));
            break;
          case 20:
            setRegistrosFiltrados(registros.filter(
              (x) =>
                (x.PerteneceA.includes("PAE") &&
                x.Anio.includes("2020")
                )
            ));
            break;
          case 30:
            setRegistrosFiltrados(registros.filter(
              (x) =>
                (x.PerteneceA.includes("Terminos de referencia") &&
                x.Anio.includes("2020")
                )
            ));
            break;
            case 40:
              setRegistrosFiltrados(registros.filter(
                (x) =>
                  (x.PerteneceA.includes("Bitacora de informacion") &&
                  x.Anio.includes("2020")
                  )
              ));
              break;
              case 50:
            setRegistrosFiltrados(registros.filter(
              (x) =>
                (x.PerteneceA.includes("Informe calidad") &&
                x.Anio.includes("2020")
                )
            ));
            break;
            case 60:
            setRegistrosFiltrados(registros.filter(
              (x) =>
                (x.PerteneceA.includes("Informe final") &&
                x.Anio.includes("2020")
                )
            ));
            break;
            case 70:
            setRegistrosFiltrados(registros.filter(
              (x) =>
                (x.PerteneceA.includes("Anexo CONAC") &&
                x.Anio.includes("2020")
                )
            ));
            break;
            case 80:
            setRegistrosFiltrados(registros.filter(
              (x) =>
                (x.PerteneceA.includes("Reporte Evaluacion") &&
                x.Anio.includes("2020")
                )
            ));
            break;
          }
        break;
        case "2021":
          switch (value) {
            case 10:
              setRegistrosFiltrados(registros.filter(
                (x) =>
                  (
                  x.Anio.includes("2021")
                  )
              ));
              break;
            case 20:
              setRegistrosFiltrados(registros.filter(
                (x) =>
                  (x.PerteneceA.includes("PAE") &&
                  x.Anio.includes("2021")
                  )
              ));
              break;
            case 30:
              setRegistrosFiltrados(registros.filter(
                (x) =>
                  (x.PerteneceA.includes("Terminos de referencia") &&
                  x.Anio.includes("2021")
                  )
              ));
              break;
              case 40:
                setRegistrosFiltrados(registros.filter(
                  (x) =>
                    (x.PerteneceA.includes("Bitacora de informacion") &&
                    x.Anio.includes("2021")
                    )
                ));
                break;
                case 50:
              setRegistrosFiltrados(registros.filter(
                (x) =>
                  (x.PerteneceA.includes("Informe calidad") &&
                  x.Anio.includes("2021")
                  )
              ));
              break;
              case 60:
              setRegistrosFiltrados(registros.filter(
                (x) =>
                  (x.PerteneceA.includes("Informe final") &&
                  x.Anio.includes("2021")
                  )
              ));
              break;
              case 70:
              setRegistrosFiltrados(registros.filter(
                (x) =>
                  (x.PerteneceA.includes("Anexo CONAC") &&
                  x.Anio.includes("2021")
                  )
              ));
              break;
              case 80:
              setRegistrosFiltrados(registros.filter(
                (x) =>
                  (x.PerteneceA.includes("Reporte Evaluacion") &&
                  x.Anio.includes("2021")
                  )
              ));
              break;
            }
          break;
          case "2022":
            switch (value) {
              case 10:
                setRegistrosFiltrados(registros.filter(
                  (x) =>
                    (
                    x.Anio.includes("2022")
                    )
                ));
                break;
              case 20:
                setRegistrosFiltrados(registros.filter(
                  (x) =>
                    (x.PerteneceA.includes("PAE") &&
                    x.Anio.includes("2022")
                    )
                ));
                break;
              case 30:
                setRegistrosFiltrados(registros.filter(
                  (x) =>
                    (x.PerteneceA.includes("Terminos de referencia") &&
                    x.Anio.includes("2022")
                    )
                ));
                break;
                case 40:
                  setRegistrosFiltrados(registros.filter(
                    (x) =>
                      (x.PerteneceA.includes("Bitacora de informacion") &&
                      x.Anio.includes("2022")
                      )
                  ));
                  break;
                  case 50:
                setRegistrosFiltrados(registros.filter(
                  (x) =>
                    (x.PerteneceA.includes("Informe calidad") &&
                    x.Anio.includes("2022")
                    )
                ));
                break;
                case 60:
                setRegistrosFiltrados(registros.filter(
                  (x) =>
                    (x.PerteneceA.includes("Informe final") &&
                    x.Anio.includes("2022")
                    )
                ));
                break;
                case 70:
                setRegistrosFiltrados(registros.filter(
                  (x) =>
                    (x.PerteneceA.includes("Anexo CONAC") &&
                    x.Anio.includes("2022")
                    )
                ));
                break;
                case 80:
                setRegistrosFiltrados(registros.filter(
                  (x) =>
                    (x.PerteneceA.includes("Reporte Evaluacion") &&
                    x.Anio.includes("2022")
                    )
                ));
                break;
              }
            break;
          
    }
  };

  useEffect(() => {
    getAniosPae("2023");
    getNumeroPae("2023", "1");
    getListaPae();
    tabsRegistros(value,"2020");
    // console.log(noAnios+","+noNumeros)
  }, []);

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


  

  interface Head {
    id: string;
    isNumeric: boolean;
    label: string;
  }
  
  const heads: readonly Head[] = [
    {
      id: "Titulo",
      isNumeric: true,
      label: "TÍTULO ARCHIVO",
    },
    
    {
      id: "Opciones",
      isNumeric: true,
      label: "OPCIONES",
    },
  ];
  
  const [page, setPage] = useState(0);
  const renglonesPagina = 6;
  const [rowsPerPage, setRowsPerPage] = useState(renglonesPagina);
  const [mirsFiltered, setMirsFiltered] = useState<Array<IIPAE>>([]);

  const creaPAE = (Anio: string, Numero: string, Nombre: string, Ruta: string) => {
    axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/create-Pae",
        {
          Id: idPAE,
          Anio: Anio,
          Numero: Numero,
          Nombre: Nombre,
          Ruta: Ruta,
          CreadoPor: localStorage.getItem("IdUsuario"),
          Rol: "Administrador", //REVISAR
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        console.log("Hola soy la respuesta");
        console.log("r: ", r);
        Toast.fire({
          icon: "success",
          title: r.data.data.message,
        });
        // showResume();
      })
      .catch((err) => {
        console.log(err)
        console.log(err.response.data)
        Toast.fire({
          icon: "error",
          title: "err.response.data,"
        });
      });
  };

  const getAniosPae = (Anio: string) => {

    axios
      .get(
        process.env.REACT_APP_APPLICATION_BACK + "/api/anio-pae",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("jwtToken") || ""

          },
          params: {
            Anio: Anio,
          }

        }
      )
      .then((r) => {
        setAnios(r.data.data.length)
      })
      .catch((err) => {

      });
  };

  const getNumeroPae = (Anio: string, Numero: string) => {

    axios
      .get(
        process.env.REACT_APP_APPLICATION_BACK + "/api/numero-pae",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("jwtToken") || ""

          },
          params: {
            Anio: Anio,
            Numero: Numero,
          }

        }
      )
      .then((r) => {
        setNumeros(r.data.data.length)
      })
      .catch((err) => {

      });
  };


  const getListaPae = () => {

    axios
      .get(
        process.env.REACT_APP_APPLICATION_BACK + "/api/list-pae",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("jwtToken") || ""

          }


        }
      )
      .then((r) => {
        setRegistros(r.data.data)
      })
      .catch((err) => {

      });
  };




  const guardarDoc = (ruta:string,url:string) => {
    let dataArray = new FormData();
    dataArray.append("ROUTE", `${ruta}`);
    dataArray.append("ADDROUTE", "true");
    dataArray.append("FILE", url);
    axios
      .post(
        process.env.REACT_APP_APPLICATION_FILES + "/api/ApiDoc/SaveFile",
        dataArray,
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then(({ data }) => {
        // state.savePathDocAut(
        //   idRegistro,
        //   data.RESPONSE.RUTA,
        //   data.RESPONSE.NOMBREIDENTIFICADOR,
        //   data.RESPONSE.NOMBREARCHIVO
        // );
      })
      .catch((e) => {});
  };

  const getDocumento = async (
    ROUTE: string,
    NOMBRE: string,
    setState: Function
  ) => {
    await axios
      .post(
        process.env.REACT_APP_APPLICATION_FILES + "/api/ApiDoc/GetByName",
        {
          ROUTE: ROUTE,
          NOMBRE: NOMBRE,
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
            responseType: "blob",
          },
        }
      )
      .then(({ data }) => {
        let file = data.RESPONSE.FILE;
        setState(file);
      })
      .catch((r) => {});
  };

  useEffect(() => {
    tabsRegistros(value,componenteSelect==0?"2022":componenteSelect==1?"2021":"2020");
  }, [value]);

  useEffect(() => {
    tabsRegistros(value,componenteSelect==0?"2022":componenteSelect==1?"2021":"2020");
  }, [componenteSelect]);

  return (
    <>
      <Grid
        container
        sx={{
          display: "flex",
          width: "93vw",
          height: "85vh",
          boxShadow: 10,
          borderRadius: 5,
          flexDirection: "column",
          backgroundColor: "#fff",
          justifyContent: "center",
          alignItems: "center",
        }}
      >



        <Grid item xs={2}>
          <List
            sx={{
              width: "10vw",
              height: "65vh",
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
            {[1, 2, 3].map((item, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Divider />
                  <ListItemButton
                    selected={item === componenteSelect + 1 ? true : false}
                    key={item}
                    onClick={() => {
                      setComponenteSelect(item - 1);
                      handleClickComponente(item);
                      setActividadSelect(0);
                    }}
                    sx={{
                      height: "7vh",
                      "&.Mui-selected ": {
                        backgroundColor: "#c4a57b",
                      },
                      "&.Mui-selected:hover": {
                        backgroundColor: "#cbcbcb",
                      },
                    }}
                  >
                    <Typography
                      sx={{ fontFamily: "MontserratMedium", fontSize: "0.7vw" }}
                    >
                      {item == 1 ? "2022" : item == 2 ? "2021" : "2020"}
                      {/* {(item == 1 || item == 3) && localStorage.getItem("Rol") === "Administrador" && open === item ?
                        <IconButton
                          onClick={() => {
                            creaPAE("2023", "6", "PAE_V2.pdf", "/prueba/");
                          }}
                        >
                          <AddCircleIcon fontSize="small" sx={{ display: "flex", justifyContent: "flex-end" }} />
                        </IconButton>
                        : ""} */}
                    </Typography>


                  </ListItemButton>
                  

                  <Divider />
                </Box>
              );
            })}
          </List>
        </Grid>

        <Grid container item xs={10}>
          <Typography sx={{ fontFamily: "MontserratMedium", fontSize: "0.7vw", heigh: "1px", marginBottom: "1%" }}>
            {/* {componenteSelect+"  "}
             
             {componenteSelect==0&&actividadSelect==0?
          "Programa Anual de evaluación 2022, Versión 2":
          componenteSelect==0&&actividadSelect==1?
          "Programa Anual de evaluación 2022, Versión 1":
          componenteSelect==1&&actividadSelect==0?
          "Programa Anual de evaluación 2021, Versión 2":
          componenteSelect==1&&actividadSelect==1?
          "Programa Anual de evaluación 2021, Versión 1":
          componenteSelect==2&&actividadSelect==0?
          "Programa Anual de evaluación 2020, Versión 2":
          componenteSelect==2&&actividadSelect==1?
          "Programa Anual de evaluación 2020, Versión 1":
          componenteSelect==3&&actividadSelect==0?
          "Programa Anual de evaluación 2019, Versión 2":
          "Programa Anual de evaluación 2019, Versión 1"}
          .Publicado el:   */}
          </Typography>

          <Typography sx={{ fontFamily: "MontserratMedium", fontSize: "0.7vw", heigh: "1px", marginBottom: "1%", alignContent: "right", textAlign: "right" }}>
            {/* {componenteSelect == 0 && actividadSelect == 0 ?
              "20/Abril/2022" :
              componenteSelect == 0 && actividadSelect == 1 ?
                "19/Abril/2022" :
                componenteSelect == 1 && actividadSelect == 0 ?
                  "19/Abril/2021" :
                  componenteSelect == 1 && actividadSelect == 1 ?
                    "18/Abril/2022" :
                    componenteSelect == 2 && actividadSelect == 0 ?
                      "18/Abril/2020" :
                      componenteSelect == 2 && actividadSelect == 1 ?
                        "17/Abril/2020" :
                        componenteSelect == 3 && actividadSelect == 0 ?
                          "17/Abril/2019" :
                          "16/Abril/2019"} */}
          </Typography>
          <Grid container item xs={12} sx={{ height: "-webkit-fill-available" }}>
            {/* <InsertarComponentePDF Nombre={"C" + (componenteSelect + 1) + "A" + (actividadSelect + 1)} /> */}

                          



              {/* TABLA */}

            <Grid
              container
              item
              height="65vh"
              direction="row"
              sx={{ backgroundColor: "#FFFF", borderRadius: 5, boxShadow: 5 }}
            >
             

              <TableContainer sx={{ borderRadius: 5, height: 450,
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
             }}>
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
                    {registrosFiltrados
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
                            {row.Nombre}
                          </TableCell>

                          <TableCell
                            sx={{
                              flexDirection: "row",
                              display: "grid",
                              gridTemplateColumns: "repeat(2,1fr)",
                            }}
                            align="center"
                            component="th"
                            scope="row"
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
                                title="DESCARGAR ARCHIVO"
                              >
                                <span>
                                  <IconButton
                                    
                                    // onClick={() =>
                                    //   downloadMIR(
                                    //     row.AnioFiscal,
                                    //     row.Entidad,
                                    //     row.Programa,
                                    //     row.MIR
                                    //   )
                                    // }
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

                              <VisualizarPAE
                                estado={row.Nombre}
                                id={row.Id}
                              
                              />
{/* 
                              <DeleteDialogMIR
                                disab={
                                  row.Estado === "En Captura" && validaFecha &&
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
                                id={row.Id}
                                actualizado={actualizaContador}
                              /> */}
                              
                            
                          </TableCell>
                        </TableRow>
                      ))}

                    {/* ))} */}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* <Box sx={{ width: "100%" }}>
                 <TablePagination
                  rowsPerPageOptions={[renglonesPagina]}
                  component="div"
                  count={mirs.length}
                  rowsPerPage={renglonesPagina}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                /> 
              </Box> */}
            </Grid>












          </Grid>
        </Grid>



      </Grid>
    </>
  );
};
export interface IIPAE {
  Id: string;
  AnioFiscal: string;
  Entidad: string;
  Programa: string;
  Eje: string;
  Tematica: string;
  MIR: string;
  Estado: string;
  FechaCreacion: string;
  CreadoPor: string;
  Conac: string;
  Consecutivo: String;
  Opciones: string;
}