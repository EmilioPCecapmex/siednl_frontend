import LaunchIcon from '@mui/icons-material/Launch';
import {
  Divider,
  Grid,
  IconButton,
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
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { MostrarArchivos } from "../../screens/Ayuda/MostrarArchivos";
import { IInfoFile } from "../../screens/Ayuda/VisualizadorAyudas";
import SliderProgress from "../genericComponents/SliderProgress";
import { DialogCargaArchivo, DeleteDialogPAE } from "./DialogCargaArchivo";
import { getListaPae, modifyPAE } from "./Services/ServicesPAE";

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
    FechaPublicacion: string;
  }

  const [componenteSelect, setComponenteSelect] = useState(0);
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [registrosFiltrados, setRegistrosFiltrados] = useState<Registro[]>([]);
  const [openVisualizador, setOpenVisualizador] = useState(false);
  const [infoFile, setInfoFile] = useState<IInfoFile>({ nombre: "", ruta: "" });

  const actuaizarDatos=()=>{getListaPae(listaDeAnios[componenteSelect].toString(), setRegistros);}


  useEffect(() => {
    actuaizarDatos();
  }, [componenteSelect]);

  useEffect(() => {
    
    setRegistrosFiltrados(registros)
    
    if (TabSelect !== "Todos los Documentos") {
      let aux = registros.filter((registro) => {return registro.PerteneceA === TabSelect })
      setRegistrosFiltrados(aux)
    }
    setProgressBar(false)
  }, [registros, TabSelect])


  const [editMode, setEditMode] = useState(registrosFiltrados.map(() => false));
  const [editedDate, setEditedDate] = useState(registrosFiltrados.map((row) => row.FechaPublicacion));
  const [banderaEdit, setBanderaEdit] = useState(false);

  const handleDoubleClick = (rowIndex: number) => {
    const updatedEditModes = [...editMode];
    updatedEditModes[rowIndex] = true;
    setEditedDate(registrosFiltrados.map((row) => row.FechaPublicacion.substring(0, 10)));
    setEditMode(updatedEditModes);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, rowIndex: number) => {
    const updatedEditedDates = [...editedDate];
    updatedEditedDates[rowIndex] = e.target.value;
    setEditedDate(updatedEditedDates);
  };

  const saveEditedDate = (id: string, rowIndex: number) => {
    setEditMode(registrosFiltrados.map(() => false));
    modifyPAE("FechaCaptura", editedDate[rowIndex], id).then(()=>{actuaizarDatos()});
    setBanderaEdit(true);
  };

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
      id: "Apartado",
      isNumeric: true,
      label: "APARTADO",
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
          backgroundColor: "#fff",
          alignItems: "center"
        }}
      >


        <Grid container item
          xl={1.5}
          lg={1.5}
          md={2}
          sm={2}
          xs={2}
          sx={{
            minHeight: "70vh",
            borderRight: "solid",
            display: "flex",
            alignItems: "center",
            borderColor: "#BCBCBC",
            "&::-webkit-scrollbar": {
              width: ".3vw",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,0,.5)",
              outline: "1px solid slategrey",
              borderRadius: 10,
            }
          }}>
          <List sx={{width:"100%"}}>
            {listaDeAnios.map((item, index) => {
              return (
                <>
                
                    <Divider />
                    <ListItemButton
                      selected={index === componenteSelect}
                      key={item}
                      onClick={() => {
                        setComponenteSelect(index);
                        setRegistros([])
                      }}
                      sx={{
                        height: "7vh",width:"100%",
                        "&.Mui-selected ": {
                          backgroundColor: "#c4a57b",
                        },
                        "&.Mui-selected:hover": {
                          backgroundColor: "#cbcbcb",
                        },
                      }}
                    >
                      <Typography
                        sx={{ fontFamily: "MontserratMedium", fontSize: [15,15,15,15,15] }}
                      >
                        {item}
                      </Typography>
                    </ListItemButton>
                    <Divider />
                
                </>

              );
            })}
          </List>
        </Grid>



        <Grid container item  
              xl={10.5}
              lg={10.5}
              md={10}
              sm={10}
              xs={10} sx={{
              height: "70vh",
            
              display: "flex",
              justifyContent: "center",
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0,0,0,.5)",
                outline: "1px solid slategrey",
                borderRadius: 10,
              },
            }}>
          
          
            {localStorage.getItem("Rol") === "Administrador" ?//|| value === 40\
            <Grid
            container
            item
            xl={11}
            lg={11}
            md={11}
            sm={11}
            xs={11}
            sx={{display:"flex",height:"5vh",justifyContent:"flex-end"}}
          >
            <DialogCargaArchivo Tabs={Tabs.filter((tab)=>tab!=="Todos los Documentos")} Tab={TabSelect==="Todos los Documentos"?Tabs[1]:TabSelect} updateData={()=>actuaizarDatos()}/>
          </Grid>
           
              : ""}

            <Grid
              container
              item
              xl={11}
              lg={11}
              md={11}
              sm={11}
              xs={11}
              height="65vh"
              direction="row"
              sx={{ backgroundColor: "#FFFF", borderRadius: 5, boxShadow: 5 }}
            >
              <TableContainer sx={{
                borderRadius: 5,
                overflow: "auto",
                "&::-webkit-scrollbar": {
                  width: ".5vw",
                  mt: 1,
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#edeaea",
                  borderRadius: 1,
                }, maxHeight: ["65vh","65vh","65vh","65vh","65vh"],
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

                  <TableBody sx={{overflow:"auto",height:"90%"}}>
                    {registrosFiltrados
                      .map((row, index) => (

                        <TableRow>
                          <TableCell
                            sx={{
                              padding: "1px 15px 1px 0",
                              fontFamily: "MontserratRegular",
                              fontSize: ["15","15","15","15","15",],
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
                              fontFamily: "MontserratRegular",
                              fontSize: ["15","15","15","15","15",],
                            }}
                            align="center"
                            component="th"
                            scope="row"
                          >
                            {row.PerteneceA}
                          </TableCell>
                          {localStorage.getItem("Rol") === "Administrador" ?
                            <>
                              {editMode[index] ? (
                                <TableCell
                                  sx={{
                                    padding: "1px 15px 1px 0",
                                    fontFamily: "MontserratRegular",
                                    fontSize: ["15","15","15","15","15",],
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
                                      {banderaEdit ? editedDate[index] : row.FechaPublicacion.substring(0, 10)}
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
                              {row.FechaPublicacion.substring(0, 10)}
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
                                <IconButton 
                                onClick={()=>{
                                 setInfoFile({ nombre: row.Nombre, ruta:row.Ruta}) 
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
                            <DeleteDialogPAE id={row.Id} updateData={()=>{actuaizarDatos()}}/>
                          </TableCell>
                        </TableRow>

                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          
        </Grid>
      </Grid>

      {openVisualizador ?
        <MostrarArchivos value="PAE" infoFile={infoFile} handleClose={() => { setOpenVisualizador(false) }} /> : null
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
  FechaPublicacion: string;
  CreadoPor: string;
  Conac: string;
  Consecutivo: String;
  Opciones: string;
}