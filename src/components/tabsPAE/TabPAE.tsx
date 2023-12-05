import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Input,
  List,
  ListItemButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import VisualizarPAE from "../../components/modalsPAE/ModalVisualizacionPAE";
import { creaPAE, getListaPae, guardarDoc, modifyPAE } from "./Services/ServicesPAE";
import SliderProgress from "../genericComponents/SliderProgress";
import { MostrarArchivos } from "../../screens/Ayuda/MostrarArchivos";
import LaunchIcon from '@mui/icons-material/Launch';
import { IInfoFile } from "../../screens/Ayuda/VisualizadorAyudas";

export const TabPAE = ({
  TabSelect,
  Tabs
}: {
  TabSelect: string;
  Tabs: string[];
}) => {
  interface Registro {
    Id: string;
    Anio: string;
    Nombre: string;
    Ruta: string;
    PerteneceA: string;
    FechaCreacion: string;
  }


  const [componenteSelect, setComponenteSelect] = useState(0);
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [registrosFiltrados, setRegistrosFiltrados] = useState<Registro[]>([]);
  const [openVisualizador,setOpenVisualizador]=useState(false);
  const [infoFile,setInfoFile]=useState<IInfoFile>({nombre:"",ruta:""});


  const fileInputRef = useRef<HTMLInputElement | null>(null);;
  // const [PerteneceAValue, setPerteneceAValue] = useState("");


  // const getPerteneceAValue = (value: number) => {
  //   switch (value) {
  //     case 0:
  //       setPerteneceAValue("Todos los documentos");
  //       break;
  //     case 1:
  //       setPerteneceAValue("PAE");
  //       break;
  //     case 2:
  //       setPerteneceAValue("Terminos de referencia");
  //       break;
  //     case 3:
  //       setPerteneceAValue("Bitacora de informacion");
  //       break;
  //     case 4:
  //       setPerteneceAValue("Informe calidad");
  //       break;
  //     case 5:
  //       setPerteneceAValue("Informe final");
  //       break;
  //     case 6:
  //       setPerteneceAValue("Anexo CONAC");
  //       break;
  //     case 7:
  //       setPerteneceAValue("Reporte Evaluacion");
  //       break;
  //   }
  // };


  // const tabsRegistros = (value: number, anio: string) => {
  //   getListaPae(setRegistros)
  //   switch (anio) {
  //     case "2020":
  //       switch (value) {
  //         case 0:
  //           setRegistrosFiltrados(registros.filter(
  //             (x) =>
  //             (
  //               x.Anio.includes("2020")
  //             )
  //           ));
  //           break;
  //         case 1:
  //           setRegistrosFiltrados(registros.filter(
  //             (x) =>
  //             (x.PerteneceA.includes("PAE") &&
  //               x.Anio.includes("2020")
  //             )
  //           ));
  //           break;
  //         case 2:
  //           setRegistrosFiltrados(registros.filter(
  //             (x) =>
  //             (x.PerteneceA.includes("Terminos de referencia") &&
  //               x.Anio.includes("2020")
  //             )
  //           ));
  //           break;
  //         case 3:
  //           setRegistrosFiltrados(registros.filter(
  //             (x) =>
  //             (x.PerteneceA.includes("Bitacora de informacion") &&
  //               x.Anio.includes("2020")
  //             )
  //           ));
  //           break;
  //         case 4:
  //           setRegistrosFiltrados(registros.filter(
  //             (x) =>
  //             (x.PerteneceA.includes("Informe calidad") &&
  //               x.Anio.includes("2020")
  //             )
  //           ));
  //           break;
  //         case 5:
  //           setRegistrosFiltrados(registros.filter(
  //             (x) =>
  //             (x.PerteneceA.includes("Informe final") &&
  //               x.Anio.includes("2020")
  //             )
  //           ));
  //           break;
  //         case 6:
  //           setRegistrosFiltrados(registros.filter(
  //             (x) =>
  //             (x.PerteneceA.includes("Anexo CONAC") &&
  //               x.Anio.includes("2020")
  //             )
  //           ));
  //           break;
  //         case 7:
  //           setRegistrosFiltrados(registros.filter(
  //             (x) =>
  //             (x.PerteneceA.includes("Reporte Evaluacion") &&
  //               x.Anio.includes("2020")
  //             )
  //           ));
  //           break;
  //       }
  //       break;
  //     case "2021":
  //       switch (value) {
  //         case 0:
  //           setRegistrosFiltrados(registros.filter(
  //             (x) =>
  //             (
  //               x.Anio.includes("2021")
  //             )
  //           ));
  //           break;
  //         case 1:
  //           setRegistrosFiltrados(registros.filter(
  //             (x) =>
  //             (x.PerteneceA.includes("PAE") &&
  //               x.Anio.includes("2021")
  //             )
  //           ));
  //           break;
  //         case 2:
  //           setRegistrosFiltrados(registros.filter(
  //             (x) =>
  //             (x.PerteneceA.includes("Terminos de referencia") &&
  //               x.Anio.includes("2021")
  //             )
  //           ));
  //           break;
  //         case 3:
  //           setRegistrosFiltrados(registros.filter(
  //             (x) =>
  //             (x.PerteneceA.includes("Bitacora de informacion") &&
  //               x.Anio.includes("2021")
  //             )
  //           ));
  //           break;
  //         case 4:
  //           setRegistrosFiltrados(registros.filter(
  //             (x) =>
  //             (x.PerteneceA.includes("Informe calidad") &&
  //               x.Anio.includes("2021")
  //             )
  //           ));
  //           break;
  //         case 5:
  //           setRegistrosFiltrados(registros.filter(
  //             (x) =>
  //             (x.PerteneceA.includes("Informe final") &&
  //               x.Anio.includes("2021")
  //             )
  //           ));
  //           break;
  //         case 6:
  //           setRegistrosFiltrados(registros.filter(
  //             (x) =>
  //             (x.PerteneceA.includes("Anexo CONAC") &&
  //               x.Anio.includes("2021")
  //             )
  //           ));
  //           break;
  //         case 7:
  //           setRegistrosFiltrados(registros.filter(
  //             (x) =>
  //             (x.PerteneceA.includes("Reporte Evaluacion") &&
  //               x.Anio.includes("2021")
  //             )
  //           ));
  //           break;
  //       }
  //       break;
  //     case "2022":
  //       switch (value) {
  //         case 0:
  //           setRegistrosFiltrados(registros.filter(
  //             (x) =>
  //             (
  //               x.Anio.includes("2022")
  //             )
  //           ));
  //           break;
  //         case 1:
  //           setRegistrosFiltrados(registros.filter(
  //             (x) =>
  //             (x.PerteneceA.includes("PAE") &&
  //               x.Anio.includes("2022")
  //             )
  //           ));
  //           break;
  //         case 2:
  //           setRegistrosFiltrados(registros.filter(
  //             (x) =>
  //             (x.PerteneceA.includes("Terminos de referencia") &&
  //               x.Anio.includes("2022")
  //             )
  //           ));
  //           break;
  //         case 3:
  //           setRegistrosFiltrados(registros.filter(
  //             (x) =>
  //             (x.PerteneceA.includes("Bitacora de informacion") &&
  //               x.Anio.includes("2022")
  //             )
  //           ));
  //           break;
  //         case 4:
  //           setRegistrosFiltrados(registros.filter(
  //             (x) =>
  //             (x.PerteneceA.includes("Informe calidad") &&
  //               x.Anio.includes("2022")
  //             )
  //           ));
  //           break;
  //         case 5:
  //           setRegistrosFiltrados(registros.filter(
  //             (x) =>
  //             (x.PerteneceA.includes("Informe final") &&
  //               x.Anio.includes("2022")
  //             )
  //           ));
  //           break;
  //         case 6:
  //           setRegistrosFiltrados(registros.filter(
  //             (x) =>
  //             (x.PerteneceA.includes("Anexo CONAC") &&
  //               x.Anio.includes("2022")
  //             )
  //           ));
  //           break;
  //         case 7:
  //           setRegistrosFiltrados(registros.filter(
  //             (x) =>
  //             (x.PerteneceA.includes("Reporte Evaluacion") &&
  //               x.Anio.includes("2022")
  //             )
  //           ));
  //           break;
  //       }
  //       break;

  //   }
  // };

  useEffect(() => {
    getListaPae(listaDeAnios[componenteSelect].toString(), setRegistros);
  }, [componenteSelect]);

  useEffect(() => {
    setRegistrosFiltrados(registros)
    if (TabSelect !== "Todos los Documentos") {
      let aux = registros.filter((registro) => { return registro.PerteneceA === TabSelect })
      setRegistrosFiltrados(aux)
    }
    setProgressBar(false)
  }, [registros, TabSelect])


  const [editMode, setEditMode] = useState(registrosFiltrados.map(() => false));
  const [editedDate, setEditedDate] = useState(registrosFiltrados.map((row) => row.FechaCreacion));
  const [banderaEdit, setBanderaEdit] = useState(false);

  const handleDoubleClick = (rowIndex: number) => {
    const updatedEditModes = [...editMode];
    updatedEditModes[rowIndex] = true;
    setEditedDate(registrosFiltrados.map((row) => row.FechaCreacion.substring(0, 10)));
    setEditMode(updatedEditModes);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, rowIndex: number) => {
    const updatedEditedDates = [...editedDate];
    updatedEditedDates[rowIndex] = e.target.value;
    setEditedDate(updatedEditedDates);
  };

  const saveEditedDate = (id: string, rowIndex: number) => {
    setEditMode(registrosFiltrados.map(() => false));
    modifyPAE("FechaCaptura", editedDate[rowIndex], id);
    setBanderaEdit(true);
  };

  // useEffect(() => {
  //   setBanderaEdit(false);
  //   getPerteneceAValue(value);
  // }, [value]);

  // useEffect(() => {
  //   setBanderaEdit(false);
  //   getPerteneceAValue(value);
  // }, [componenteSelect]);

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
      id: "Fecha",
      isNumeric: true,
      label: "FECHA PUBLICACIÓN",
    },

    {
      id: "Opciones",
      isNumeric: true,
      label: "OPCIONES",
    },
  ];



  // useEffect(() => {
  //   tabsRegistros(value, componenteSelect === 0 ? "2022" : componenteSelect === 1 ? "2021" : "2020");
  // }, [value]);

  // useEffect(() => {
  //   tabsRegistros(value, componenteSelect === 0 ? "2022" : componenteSelect === 1 ? "2021" : "2020");
  // }, [componenteSelect]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, Anio: string, tab: string) => {
    const fileList = e.target.files;

    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      const newPdf = {
        Id: String(Date.now()),
        Anio: Anio,
        Nombre: file.name,
        Ruta: "/SIEDNL_DEV/",
        PerteneceA: "PerteneceA",
        FechaCreacion: Date.now().toString()
      };
      setRegistros([...registros, newPdf]);
    }
  };

  const handleClickAddPDF = () => {
    if (fileInputRef.current) {
      guardarDoc({ archivo: (fileInputRef.current.children[0] as HTMLInputElement).files![0], nombreArchivo: (fileInputRef.current.children[0] as HTMLInputElement).files![0].name }, (componenteSelect === 0 ? "2022" : componenteSelect === 1 ? "2021" : "2020") + "/" + TabSelect.replaceAll(" ", "_"));
      fileInputRef.current.click();
      creaPAE((fileInputRef.current.children[0] as HTMLInputElement).files![0].name, (process.env.REACT_APP_DOC_ROUTE || "") + "/SIEDNL_DEV/PAE/" + (componenteSelect === 0 ? "2022" : componenteSelect === 1 ? "2021" : "2020") + "/" + TabSelect.replaceAll(" ", "_") + "/", componenteSelect === 0 ? "2022" : componenteSelect === 1 ? "2021" : "2020", TabSelect)
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(e, componenteSelect.toString(), TabSelect);
  };

  const obtenerListaDeAnios = () => {
    let anioInicial = 2020;
    let fechaActual = new Date();
    let anoActual = fechaActual.getFullYear();
    const listaDeAnios: number[] = [];
    for (let i = anoActual; i >= anioInicial; i--) {
      listaDeAnios.push(i);
    }
    return listaDeAnios;
  };
  const listaDeAnios = obtenerListaDeAnios();

  const [progressBar, setProgressBar] = useState(true)


  return (
    <>
      <SliderProgress open={progressBar} texto="" />
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
            {listaDeAnios.map((item, index) => {
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
                    selected={index === componenteSelect}
                    key={item}
                    onClick={() => {
                      setComponenteSelect(index);
                      setRegistros([])

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
                      {item}
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
          </Typography>

          <Typography sx={{ fontFamily: "MontserratMedium", fontSize: "0.7vw", heigh: "1px", marginBottom: "1%", alignContent: "right", textAlign: "right" }}>
          </Typography>
          <Grid container item xs={12} sx={{ height: "-webkit-fill-available" }}>
            {localStorage.getItem("Rol") === "Administrador" ?//|| value === 40
              <>
                <Typography sx={{ fontFamily: "MontserratMedium", fontSize: "0.7vw", heigh: "1px", marginBottom: "1%", alignContent: "right", textAlign: "right" }}>
                  Cargar Archivo:
                </Typography>
                <Grid

                  item
                  direction="row"
                  sx={{ margin: '2vw' }}
                >
                  <Input
                    type="file"
                    inputProps={{
                      accept: ".pdf,application/pdf",
                      'aria-label': 'Upload PDF',
                    }}
                    style={{
                      width: "45vw", backgroundColor: "transparent",
                      opacity: 0.5,
                    }}
                    onChange={handleFileInputChange}
                    ref={fileInputRef}
                  />
                  <Button
                    variant="outlined"
                    onClick={handleClickAddPDF}
                    style={{ cursor: 'pointer', border: 'none', background: 'none', opacity: 1 }}
                  >
                    CARGAR ARCHIVO
                  </Button>
                </Grid>
              </>
              : ""}

            <Grid
              container
              item
              height="65vh"
              direction="row"
              sx={{ backgroundColor: "#FFFF", borderRadius: 5, boxShadow: 5 }}
            >
              <TableContainer sx={{
                borderRadius: 5, height: 450,
                overflow: "auto",
                "&::-webkit-scrollbar": {
                  width: ".5vw",
                  mt: 1,
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#edeaea",
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
                          {localStorage.getItem("Rol") === "Administrador" ?
                            <>
                              {editMode[index] ? (
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
                                  <input
                                    type="date"
                                    value={editedDate[index]}
                                    onChange={(e) => handleDateChange(e, index)}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") {
                                        saveEditedDate(row.Id, index);
                                      }
                                    }}
                                    onBlur={() => saveEditedDate(row.Id, index)}
                                    autoFocus
                                    style={{
                                      border: "1px solid #ccc",
                                      padding: "4px",
                                      borderRadius: "4px",
                                      fontSize: "0.7vw",
                                      fontFamily: "MontserratMedium",
                                    }}
                                  />
                                </TableCell>
                              ) : (
                                <TableCell
                                  onDoubleClick={() => handleDoubleClick(index)}
                                  sx={{
                                    padding: "1px 15px 1px 0",
                                    fontFamily: "MontserratRegular",
                                    fontSize: ".7vw",
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
                                    title="DA DOBLE CLICK PARA EDITAR"
                                  >
                                    <span>
                                      {banderaEdit ? editedDate[index] : row.FechaCreacion.substring(0, 10)}
                                    </span>
                                  </Tooltip>
                                </TableCell>
                              )}
                            </>
                            :
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
                              {row.FechaCreacion.substring(0, 10)}
                            </TableCell>
                          }

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
                            <Tooltip title="VISUALIZAR">
                              <span>
                                <IconButton onClick={()=>{
                                 setInfoFile({ nombre: row.Nombre, ruta: (process.env.REACT_APP_DOC_ROUTE || "") + "/SIEDNL_DEV/PAE/" + listaDeAnios[componenteSelect] + "/" + TabSelect + "/" }) 
                                  setOpenVisualizador(true);
                                }}>
                                  <LaunchIcon
                                    sx={[
                                      {
                                        "&:hover": {
                                          color: "indigo",
                                        },
                                        fontSize: "24px", // Tamaño predeterminado del icono
                                        "@media (max-width: 600px)": {
                                          fontSize: 25, // Pantalla extra pequeña (xs y sm)
                                        },
                                        "@media (min-width: 601px) and (max-width: 960px)": {
                                          fontSize: 25, // Pantalla pequeña (md)
                                        },
                                        "@media (min-width: 961px) and (max-width: 1280px)": {
                                          fontSize: 30, // Pantalla mediana (lg)
                                        },
                                        "@media (min-width: 1281px)": {
                                          fontSize: 30, // Pantalla grande (xl)
                                        },
                                        "@media (min-width: 2200px)": {
                                          fontSize: 30, // Pantalla grande (xl)
                                        }
                                      },



                                    ]}
                                  />
                                </IconButton>
                              </span>
                            </Tooltip>
                            {/* <VisualizarPAE
                              ruta={(process.env.REACT_APP_DOC_ROUTE || "") + "/SIEDNL_DEV/PAE/" + (componenteSelect === 0 ? "2022" : componenteSelect === 1 ? "2021" : "2020") + "/" + TabSelect.replaceAll(" ", "_") + "/"}
                              nombre={row.Nombre}
                              tipo={"pdf"}
                              anio={componenteSelect === 0 ? "2022" : componenteSelect === 1 ? "2021" : "2020"}
                              perteneceA={TabSelect}
                            /> */}
                          </TableCell>
                        </TableRow>

                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

     {openVisualizador?
      <MostrarArchivos value="PDF" infoFile={infoFile} handleClose={()=>{setOpenVisualizador(false)} }/>:null
      }                    
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