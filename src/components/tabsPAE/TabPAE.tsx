import {
  Box,
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  List,
  Divider,
  ListItemButton,
  Typography,
  Grid,
  TableSortLabel,
} from "@mui/material";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import VisualizarPAE from "../../components/modalsPAE/ModalVisualizacionPAE";

export const TabPAE = ({
  value
}: {
  value: number;
}) => {
  interface Registro {
    Id: string;
    Anio: string;
    Nombre: string;
    Ruta: string;
    PerteneceA: string;
    FechaCreacion: string;
  }
  const [open, setOpen] = useState(1);
  const [componenteSelect, setComponenteSelect] = useState(0);
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [registrosFiltrados, setRegistrosFiltrados] = useState<Registro[]>([]);
  const handleClickComponente = (index: number) => {
    setOpen(index);
  };
  const fileInputRef = useRef<HTMLInputElement | null>(null);;
  const [PerteneceAValue, setPerteneceAValue] = useState("");
  const [reloadPage, setReloadPage] = useState(false); // Add state variable for page reload


  const getPerteneceAValue = (value: number) => {
    switch (value) {
      case 10:
        setPerteneceAValue("Todos los documentos");
        break;
      case 20:
        setPerteneceAValue("PAE");
        break;
      case 30:
        setPerteneceAValue("Terminos de referencia");
        break;
      case 40:
        setPerteneceAValue("Bitacora de informacion");
        break;
      case 50:
        setPerteneceAValue("Informe calidad");
        break;
      case 60:
        setPerteneceAValue("Informe final");
        break;
      case 70:
        setPerteneceAValue("Anexo CONAC");
        break;
      case 80:
        setPerteneceAValue("Reporte Evaluacion");
        break;
    }
  };


  const tabsRegistros = (value: number, anio: string) => {
    getListaPae();
    switch (anio) {
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
    getListaPae();
    tabsRegistros(value, "2022");
    setBanderaEdit(false);
    getPerteneceAValue(value);
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

  const [editMode, setEditMode] = useState(registrosFiltrados.map(() => false));
  const [editedDate, setEditedDate] = useState(registrosFiltrados.map((row) => row.FechaCreacion));
  const [finalDate, setFinalDate] = useState("");
  const [banderaEdit, setBanderaEdit] = useState(false);

  const handleDoubleClick = (rowIndex: number) => {
    const updatedEditModes = [...editMode];
    updatedEditModes[rowIndex] = true;
    setEditedDate(registrosFiltrados.map((row) => row.FechaCreacion.substring(0, 10)));
    setEditMode(updatedEditModes);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, rowIndex: number) => {
    // Create a copy of editedDates to avoid mutating state directly
    const updatedEditedDates = [...editedDate];
    updatedEditedDates[rowIndex] = e.target.value;
    setEditedDate(updatedEditedDates);
  };

  const saveEditedDate = (id: string, rowIndex: number) => {
    setEditMode(registrosFiltrados.map(() => false));
    modifyPAE("FechaCaptura", editedDate[rowIndex], id);
    setBanderaEdit(true);
    setFinalDate(editedDate[rowIndex]);
  };

  useEffect(() => {
    setBanderaEdit(false);
    getPerteneceAValue(value);
  }, [value]);

  useEffect(() => {
    setBanderaEdit(false);
    getPerteneceAValue(value);
  }, [componenteSelect]);

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

  const creaPAE = (Nombre: string, Ruta: string, Anio: string, PerteneceA: string) => {
    axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/create-pae",
        {
          Nombre: Nombre,
          Tipo: "pdf",
          Ruta: Ruta,
          Anio: Anio,
          PerteneceA: PerteneceA,
          CreadoPor: localStorage.getItem("IdUsuario"),
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

  const modifyPAE = (CampoModificar: string, Campo: string, Id: string,) => {
    axios
      .get(
        process.env.REACT_APP_APPLICATION_BACK + "/api/modify-pae",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("jwtToken") || ""

          },
          params: {
            CampoModificar: CampoModificar,
            Campo: Campo,
            IdPAE: Id,
          }
        }
      )
      .then((r) => {
        Toast.fire({
          icon: "success",
          title: "Fecha actualizada correctamente",
        });
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: "Hubo un error al actualizar la fecha",
        });
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
        setRegistros(r.data.data);
      })
      .catch((err) => {
      });
  };

  const guardarDoc = (archivo: { archivo: File; nombreArchivo: string }, perteneceA: string) => {
    const url = new File([archivo.archivo], archivo.nombreArchivo);
    let ruta = "/SIEDNL_DEV/PAE/"+perteneceA+"/";
    ruta = ((process.env.REACT_APP_DOC_ROUTE || "") + ruta).trim();
    // console.log("ruta:", ruta)
    let dataArray = new FormData();
    dataArray.append("ROUTE", `${ruta}`);
    dataArray.append("CN", "true");
    dataArray.append("ADDROUTE", "true");
    dataArray.append("FILE", url);
    dataArray.append("TOKEN", localStorage.getItem("jwtToken") || "");
    console.log("route:",`${ruta}`,".file:",url);
    
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
        console.log(data.RESPONSE.FILE);
      })
      .catch((e) => { });
  };

  useEffect(() => {
    tabsRegistros(value, componenteSelect === 0 ? "2022" : componenteSelect === 1 ? "2021" : "2020");
  }, [value]);

  useEffect(() => {
    tabsRegistros(value, componenteSelect === 0 ? "2022" : componenteSelect === 1 ? "2021" : "2020");
  }, [componenteSelect]);

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
      guardarDoc({ archivo: (fileInputRef.current.children[0] as HTMLInputElement).files![0], nombreArchivo: (fileInputRef.current.children[0] as HTMLInputElement).files![0].name }, (componenteSelect === 0 ? "2022" : componenteSelect === 1 ? "2021" : "2020") + "/" + PerteneceAValue.replaceAll(" ","_"));
      fileInputRef.current.click();
      creaPAE((fileInputRef.current.children[0] as HTMLInputElement).files![0].name, (process.env.REACT_APP_DOC_ROUTE || "") + "/SIEDNL_DEV/PAE/"+(componenteSelect === 0 ? "2022" : componenteSelect === 1 ? "2021" : "2020") + "/" + PerteneceAValue.replaceAll(" ","_")+"/", componenteSelect === 0 ? "2022" : componenteSelect === 1 ? "2021" : "2020", PerteneceAValue)
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(e, componenteSelect.toString(), value.toString());
  };

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
                      {item === 1 ? "2022" : item === 2 ? "2021" : "2020"}
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
          </Typography>

          <Typography sx={{ fontFamily: "MontserratMedium", fontSize: "0.7vw", heigh: "1px", marginBottom: "1%", alignContent: "right", textAlign: "right" }}>
          </Typography>
          <Grid container item xs={12} sx={{ height: "-webkit-fill-available" }}>
            {localStorage.getItem("Rol") === "Administrador" || value === 40 ?
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
                            <VisualizarPAE
                              ruta={(process.env.REACT_APP_DOC_ROUTE || "") + "/SIEDNL_DEV/PAE/" + (componenteSelect === 0 ? "2022" : componenteSelect === 1 ? "2021" : "2020") + "/" + + PerteneceAValue.replaceAll(" ","_") + "/"}
                              nombre={row.Nombre}
                              tipo={"pdf"}
                              anio={componenteSelect === 0 ? "2022" : componenteSelect === 1 ? "2021" : "2020"}
                              perteneceA={PerteneceAValue}
                            />
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