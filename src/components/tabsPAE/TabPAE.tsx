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
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { InsertarComponentePDF } from "./InsertarPDF";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import axios from "axios";
import Swal from "sweetalert2";

export const TabPAE = ({
  anios,
  idPAE,
  Anio,
  Numero,
  Nombre,
  Ruta
}: {
  anios: number[];
  idPAE: string;
  Anio: string;
  Numero: string;
  Nombre: string;
  Ruta: string;
}) => {
  const [open, setOpen] = useState(1);
  const [componenteSelect, setComponenteSelect] = useState(0);
  const [noAnios, setAnios] = useState([1]);
  const [noNumeros, setNumeros] = useState([1]);
  const [registros, setRegistros] = useState<Registro[]>([]);
  const handleClickComponente = (index: number) => {
    setOpen(index);
  };
  const [actividadSelect, setActividadSelect] = useState(0);

  useEffect(() => {
    getAniosPae("2023");
    getNumeroPae("2023", "1");
    getListaPae();
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


  interface Registro {
    Id: string;
    Anio: string;
    Numero: string;
    Nombre: string;
    Ruta: string;
    CreadoPor: string;
    FechaCreacion: string;
    Deleted: number;
  }

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
        process.env.REACT_APP_APPLICATION_BACK + "/api/lista-pae",
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


  return (
    <>
      <Grid
        container
        sx={{
          display: "flex",
          width: "75vw",
          height: "90vh",
          boxShadow: 10,
          borderRadius: 5,
          flexDirection: "column",
          backgroundColor: "#fff",
        }}
      >



        <Grid item xs={2} sx={{ marginTop: "2%" }}>
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
            {[1, 2, 3, 4].map((item, index) => {
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
                      {item == 1 ? "2022" : item == 2 ? "2021" : item == 3 ? "2020" : "2019"}
                      {(item == 1 || item == 4) && localStorage.getItem("Rol") === "Administrador" && open === item ?
                        <IconButton
                          onClick={() => {
                            creaPAE("2023", "6", "PAE_V2.pdf", "/prueba/");
                          }}
                        >
                          <AddCircleIcon fontSize="small" sx={{ display: "flex", justifyContent: "flex-end" }} />
                        </IconButton>
                        : ""}
                    </Typography>


                  </ListItemButton>
                  <Collapse in={open === item} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {[1, 2].map((value, x) => {
                        return (
                          <ListItemButton
                            selected={x === actividadSelect ? true : false}
                            key={x}
                            onClick={() => {
                              setActividadSelect(x);
                            }}
                            sx={{
                              height: "3vh",
                              pl: 4,
                              "&.Mui-selected ": {
                                backgroundColor: "#efd8b9",
                              },
                              "&.Mui-selected:hover": {
                                backgroundColor: "#cbcbcb",
                              },
                              fontSize: "0.7vw",
                            }}
                          >
                            {x == 1 ? "Versión 1" : "Versión 2"}
                            {x != 1 && localStorage.getItem("Rol") === "Administrador" ?
                              <IconButton
                                onClick={() => {
                                  creaPAE("2023", "6", "PAE_V2.pdf", "/prueba/");
                                }}
                              >
                                <AddCircleIcon fontSize="small" sx={{ display: "flex", justifyContent: "flex-end" }} />
                              </IconButton>
                              : ""}
                          </ListItemButton>
                        );
                      })}
                    </List>
                  </Collapse>

                  <Divider />
                </Box>
              );
            })}
          </List>
        </Grid>

        <Grid container item xs={10} sx={{ marginTop: "2%" }}>
          <Typography sx={{ fontFamily: "MontserratMedium", fontSize: "0.7vw", heigh: "1px", marginBottom: "1%" }}>
            {/* {JSON.stringify(registros[0]?.Nombre)} */}
            {/* {registros[0]} */}
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
          .Creado el:  
          </Typography>

          <Typography sx={{ fontFamily: "MontserratMedium", fontSize: "0.7vw", heigh: "1px", marginBottom: "1%", alignContent: "right", textAlign: "right" }}>
            {componenteSelect == 0 && actividadSelect == 0 ?
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
                          "16/Abril/2019"}
          </Typography>
          <Grid container item xs={12} sx={{ height: "-webkit-fill-available" }}>
            <InsertarComponentePDF Nombre={"C" + (componenteSelect + 1) + "A" + (actividadSelect + 1)} />
          </Grid>
        </Grid>



      </Grid>
    </>
  );
};