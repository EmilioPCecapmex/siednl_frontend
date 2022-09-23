import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  ListItemButton,
  TableCell,
  tableCellClasses,
  List,
  Paper,
  Divider,
  IconButton,
  Stack,
  Typography,
  TableRow,
  TableContainer,
  Table,
  TableBody,
  Input,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import DeleteDialog from "../deleteDialog/DeleteDialog";
import Add from "@mui/icons-material/Add";
import DeleteDialogCatalogos from "../deleteDialog/DeleteDialogCatalogos";

export const Catalogos = ({ defSelected }: { defSelected: string }) => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#ccc",
      color: "#000",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const configOptions = [
    {
      id: 1,
      Desc: "Años Fiscales",
      fnc: "getAniosFiscales()",
      Tabla:"AniosFiscales",
      selected: false,
    },
    {
      id: 2,
      Desc: "Beneficiarios",
      fnc: "getBeneficiarios()",
      Tabla:"Beneficiarios",
      selected: false,
    },
    {
      id: 3,
      Desc: "Clasificaciones Programaticas",
      fnc: "getClasificacionesProgramaticas()",
      Tabla:"ClasificacionesProgramaticas",
      selected: false,
    },
    {
      id: 4,
      Desc: "Dimensiones del Indicador",
      fnc: "getDimensionesDelIndicador()",
      Tabla:"DimensionesDelIndicador",
      selected: false,
    },
    { id: 5, Desc: "Ejes", fnc: "getEjes()",Tabla:"Ejes", selected: true },
    { id: 6, Desc: "Estrategias", fnc: "getEstrategias()",Tabla:"Estrategias", selected: false },
    {
      id: 7,
      Desc: "Fechas de Captura",
      fnc: "getFechasDeCaptura()",
      Tabla:"FechasDeCaptura",
      selected: false,
    },
    { id: 8, Desc: "Formulas", fnc: "getFormulas()",Tabla:"Formulas", selected: false },
    { id: 9, Desc: "Frecuencias", fnc: "getFrecuencias()",Tabla:"Frecuencias", selected: false },
    {
      id: 10,
      Desc: "Instituciones",
      fnc: "getInstituciones()",
      Tabla:"Instituciones",
      selected: false,
    },
    {
      id: 11,
      Desc: "Lineas de Acción",
      fnc: "getLineasDeAccion()",
      Tabla:"LineasDeAccion",
      selected: false,
    },
    { id: 12, Desc: "Metas ODS", fnc: "getMetasODS()",Tabla:"MetasODS", selected: false },
    { id: 13, Desc: "Modalidades", fnc: "getModalidades()",Tabla:"Modalidades", selected: false },
    { id: 14, Desc: "Objetivos", fnc: "getObjetivos()", Tabla:"Objetivos",selected: false },
    { id: 15, Desc: "Objetivos DS", fnc: "getObjetivosDS()",Tabla:"ObjetivosDS", selected: false },
    {
      id: 16,
      Desc: "Objetivos PEENL",
      fnc: "getObjetivosPEENL()",
      Tabla:"ObjetivosPEENL",
      selected: false,
    },
    {
      id: 18,
      Desc: "Programas Presupuestarios",
      fnc: "getProgramaPresupuestario()",
      Tabla:"ProgramasPresupuestarios",
      selected: false,
    },
    { id: 19, Desc: "Roles", fnc: "getRoles()", Tabla:"Roles",selected: false },
    { id: 20, Desc: "Tematicas", fnc: "getTematicas()", Tabla:"Tematicas",selected: false },
    {
      id: 21,
      Desc: "Tipos de Formula",
      fnc: "getTipoDeFormula()",
      Tabla:"TiposDeFormula",
      selected: false,
    },
    {
      id: 22,
      Desc: "Tipos de Indicador",
      fnc: "getTipoDeIndicador()",
      Tabla:"TiposDeIndicador",
      selected: false,
    },
    {
      id: 23,
      Desc: "Unidades de Medida",
      fnc: "getUnidadDeMedida()",
      Tabla:"UnidadesDeMedida",
      selected: false,
    },
  ];

  const [datosTabla, setDatosTabla] = React.useState([
    {
      Id: "",
      Desc: "",
      fnc:"",
      Tabla:"",
      selected:"",
    },
  ]);

  const getAniosFiscales = () => {
    setSelected("Años Fiscales");
    setCatalogoActual("Años Fiscales");
    axios
      .get("http://10.200.4.105:8000/api/AniosFiscales", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        
        
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map((item: { Id: string; AnioFiscal: string, Tabla: string }) => {
            return { Id: item.Id, Desc: item.AnioFiscal, Tabla: "AniosFiscales" };
          });
          setDatosTabla(update);
        }
      });
  };

  const getBeneficiarios = () => {
    setSelected("Beneficiarios");

    setCatalogoActual("Beneficiarios");
    axios
      .get("http://10.200.4.105:8000/api/Beneficiarios", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map((item: { Id: string; Beneficiario: string; Tabla: string}) => {
            return { Id: item.Id, Desc: item.Beneficiario, Tabla: "Beneficiarios" };
          });
          setDatosTabla(update);
        }
      });
  };

  const getClasificacionesProgramaticas = () => {
    setSelected("Clasificaciones Programaticas");

    setCatalogoActual("Clasificaciones Programaticas");
    axios
      .get("http://10.200.4.105:8000/api/clasificacionesProgramaticas", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: { Id: string; ClasificacionProgramatica: string; Tabla: string }) => {
              return { Id: item.Id, Desc: item.ClasificacionProgramatica, Tabla: "ClasificacionesProgramaticas" };
            }
          );
          setDatosTabla(update);
        }
      });
  };

  const getDimensionesDelIndicador = () => {
    setSelected("Dimensiones del Indicador");

    setCatalogoActual("Dimension del indicador");
    axios
      .get("http://10.200.4.105:8000/api/dimensionesDelIndicador", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: { Id: string; DimensionDelIndicador: string; Tabla: string }) => {
              return { Id: item.Id, Desc: item.DimensionDelIndicador, Tabla: "DimensionesDelIndicador" };
            }
          );
          setDatosTabla(update);
        }
      });
  };

  const getEjes = () => {
    setSelected("Ejes");

    setCatalogoActual("Ejes");
    axios
      .get("http://10.200.4.105:8000/api/ejes", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map((item: { Id: string; Eje: string; Tabla: string }) => {
            return { Id: item.Id, Desc: item.Eje, Tabla: "Ejes" };
          });
          setDatosTabla(update);
        }
      });
  };

  const getEstrategias = () => {
    setSelected("Estrategias");

    setCatalogoActual("Estrategias");
    axios
      .get("http://10.200.4.105:8000/api/Estrategias", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map((item: { Id: string; Estrategia: string; Tabla: string }) => {
            return { Id: item.Id, Desc: item.Estrategia, Tabla: "Estrategias" };
          });
          setDatosTabla(update);
        }
      });
  };

  const getFormulas = () => {
    setSelected("Formulas");

    setCatalogoActual("Formulas");
    axios
      .get("http://10.200.4.105:8000/api/Formulas", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map((item: { Id: string; Formula: string; Tabla: string }) => {
            return { Id: item.Id, Desc: item.Formula, Tabla: "Formulas" };
          });
          setDatosTabla(update);
        }
      });
  };

  const getFechasDeCaptura = () => {
    setSelected("Fechas de Captura");

    setCatalogoActual("Fechas de captura");
    axios
      .get("http://10.200.4.105:8000/api/fechasDeCaptura", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: { Id: string; FechaDeCaptura: string; Tabla: string }) => {
              return { Id: item.Id, Desc: item.FechaDeCaptura, Tabla: "FechasDeCaptura" };
            }
          );
          setDatosTabla(update);
        }
      });
  };

  const getFrecuencias = () => {
    setSelected("Frecuencias");

    setCatalogoActual("Frecuencias");
    axios
      .get("http://10.200.4.105:8000/api/Frecuencias", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map((item: { Id: string; Frecuencia: string; Tabla: string }) => {
            return { Id: item.Id, Desc: item.Frecuencia, Tabla: "Frecuencias" };
          });
          setDatosTabla(update);
        }
      });
  };

  const getInstituciones = () => {
    setSelected("Instituciones");

    setCatalogoActual("Instituciones");
    axios
      .get("http://10.200.4.105:8000/api/instituciones", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: { Id: string; NombreInstitucion: string; Tabla: string }) => {
              return { Id: item.Id, Desc: item.NombreInstitucion, Tabla: "Instituciones" };
            }
          );
          setDatosTabla(update);
        }
      });
  };
  const getLineasDeAccion = () => {
    setSelected("Lineas de Acción");

    setCatalogoActual("Lineas de accion");
    axios
      .get("http://10.200.4.105:8000/api/lineasDeAccion", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map((item: { Id: string; LineaDeAccion: string; Tabla: string }) => {
            return { Id: item.Id, Desc: item.LineaDeAccion, Tabla: "LineasDeAccion" };
          });
          setDatosTabla(update);
        }
      });
  };

  const getMetasODS = () => {
    setSelected("Metas ODS");

    setCatalogoActual("Meta ODS");
    axios
      .get("http://10.200.4.105:8000/api/metasODS", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map((item: { Id: string; MetaODS: string; Tabla: string }) => {
            return { Id: item.Id, Desc: item.MetaODS, Tabla: "MetasODS" };
          });
          setDatosTabla(update);
        }
      });
  };

  const getModalidades = () => {
    setSelected("Modalidades");

    setCatalogoActual("Modalidades");
    axios
      .get("http://10.200.4.105:8000/api/modalidades", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map((item: { Id: string; Modalidad: string; Tabla: string }) => {
            return { Id: item.Id, Desc: item.Modalidad, Tabla: "Modalidades" };
          });
          setDatosTabla(update);
        }
      });
  };

  const getObjetivos = () => {
    setSelected("Objetivos");

    setCatalogoActual("Objetivos");
    axios
      .get("http://10.200.4.105:8000/api/objetivos", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map((item: { Id: string; Objetivo: string; Tabla: string }) => {
            return { Id: item.Id, Desc: item.Objetivo , Tabla: "Objetivos"};
          });
          setDatosTabla(update);
        }
      });
  };

  const getObjetivosPEENL = () => {
    setSelected("Objetivos PEENL");

    setCatalogoActual("Ojetivos PEENL");
    axios
      .get("http://10.200.4.105:8000/api/objetivosPEENL", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map((item: { Id: string; ObjetivoPEENL: string; Tabla: string }) => {
            return { Id: item.Id, Desc: item.ObjetivoPEENL, Tabla: "ObjetivosPEENL" };
          });
          setDatosTabla(update);
        }
      });
  };

  const getObjetivosDS = () => {
    setSelected("Objetivos DS");

    setCatalogoActual("Objetivos DS");
    axios
      .get("http://10.200.4.105:8000/api/objetivosDS", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map((item: { Id: string; ObjetivoDS: string; Tabla: string }) => {
            return { Id: item.Id, Desc: item.ObjetivoDS, Tabla: "ObjetivosDS" };
          });
          setDatosTabla(update);
        }
      });
  };

  const getProgramaPresupuestario = () => {
    setSelected("Programas Presupuestarios");

    setCatalogoActual("Programas Presupuestarios");
    axios
      .get("http://10.200.4.105:8000/api/programaPresupuestario", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: { Id: string; NombrePrograma: string; Tabla: string }) => {
              return { Id: item.Id, Desc: item.NombrePrograma, Tabla: "ProgramasPresupuestarios" };
            }
          );
          setDatosTabla(update);
        }
      });
  };

  const getRoles = () => {
    setSelected("Roles");

    setCatalogoActual("Roles");
    axios
      .get("http://10.200.4.105:8000/api/roles", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map((item: { Id: string; Rol: string; Tabla: string }) => {
            return { Id: item.Id, Desc: item.Rol, Tabla: "Roles" };
          });
          setDatosTabla(update);
        }
      });
  };

  const getTematicas = () => {
    setSelected("Tematicas");

    setCatalogoActual("Tematicas");
    axios
      .get("http://10.200.4.105:8000/api/tematica", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map((item: { Id: string; Tematica: string; Tabla: string }) => {
            return { Id: item.Id, Desc: item.Tematica, Tabla: "Tematicas" };
          });
          setDatosTabla(update);
        }
      });
  };

  const getTipoDeFormula = () => {
    setSelected("Tipos de Formula");

    setCatalogoActual("Tipos de Formula");
    axios
      .get("http://10.200.4.105:8000/api/TipoDeFormula", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map((item: { Id: string; TipoDeFormula: string; Tabla: string }) => {
            return { Id: item.Id, Desc: item.TipoDeFormula, Tabla: "TiposDeFormula" };
          });
          setDatosTabla(update);
        }
      });
  };

  const getTipoDeIndicador = () => {
    setSelected("Tipos de Indicador");

    setCatalogoActual("Tipos de indicadores");
    axios
      .get("http://10.200.4.105:8000/api/tipoDeIndicador", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: { Id: string; TipoDeIndicador: string; Tabla: string }) => {
              return { Id: item.Id, Desc: item.TipoDeIndicador, Tabla: "TiposDeIndicador" };
            }
          );
          setDatosTabla(update);
        }
      });
  };

  const getUnidadDeMedida = () => {
    setSelected("Unidades de Medida");

    setCatalogoActual("Unidades de medidas");
    axios
      .get("http://10.200.4.105:8000/api/unidadDeMedida", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || "",
        },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: { Id: string; UnidadDeMedida: string; Tabla: string }) => {
              return { Id: item.Id, Desc: item.UnidadDeMedida, Tabla: "UnidadesDeMedida" };
            }
          );
          setDatosTabla(update);
        }
      });
  };

  const [catalogoActual, setCatalogoActual] = React.useState("");
  const [selected, setSelected] = React.useState(defSelected);

  React.useEffect(() => {
    configOptions.map((item) => {
      if (item.Desc === defSelected) {
        eval(item.fnc);
      }
    });
  }, []);

  const [actualizacion, setActualizacion] = useState(0);

  useEffect(() => {

    configOptions.map((item) => {
      if (item.Desc === defSelected) {
        eval(item.fnc);
      }
    });

  }, [actualizacion]);



  const actualizaContador = () => {

    setActualizacion(actualizacion + 1);

  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "87%",
        height: "92%",
        mt: "8vh",
      }}
    >
      <Box
        sx={{
          width: "70%",
          height: "80%",
          backgroundColor: "#ffffff",
          borderRadius: 5,
          display: "flex",
          alignItems: "center",
          mt: "5vh",
          boxShadow: 10,
        }}
      >
        <Box sx={{ width: "100vw", height: "100%", display: "flex" }}>
          <Box
            sx={{
              width: "22%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Divider />

            <List
              disablePadding
              sx={{
                borderRight: "solid 1px",
                overflow: "auto",
                borderRadius: ".4vw",
                borderColor: "#BCBCBC",
                "&::-webkit-scrollbar": {
                  width: ".3vw",
                  mt: 10,
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "rgba(0,0,0,.5)",
                  outline: "1px solid slategrey",
                  borderRadius: 10,
                },
              }}
            >
              {configOptions.map((item) => {
                return (
                  <Box key={item.id}>
                    <ListItemButton
                      key={item.id}
                      sx={{
                        pl: 2,
                        "&.Mui-selected ": {
                          backgroundColor: "#c4a57b",
                        },
                        "&.Mui-selected:hover": {
                          backgroundColor: "#cbcbcb",
                        },
                      }}
                      selected={selected == item.Desc ? true : false}
                      onClick={() => eval(item.fnc)}
                    >
                      <Typography sx={{ fontFamily: "MontserratMedium" }}>
                        {item.Desc}
                      </Typography>
                    </ListItemButton>

                    <Divider />
                  </Box>
                );
              })}
            </List>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "60%",
              ml: "8%",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "10%",
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                borderRadius: "30px",
                mt: 5,
              }}
            >
              <Typography
                sx={{ fontFamily: "MontserratSemiBold", fontSize: "2vw" }}
              >
                {catalogoActual}
              </Typography>
            </Box>

            <Box
              sx={{
                width: "100%",
                height: "80%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  backgroundColor: "#ccc",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  height: "4vh",
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "MontserratSemiBold",
                    ml: "1vw",
                    fontSize: ".9vw",
                  }}
                >
                  Descripción
                </Typography>
                <Box
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    width: "30%",
                    backgroundColor: "#EBEBEB",
                    border: 1,
                    borderRadius: 10,
                    borderColor: "#ccc",
                  }}
                >
                  <Input
                    disableUnderline
                    size="small"
                    sx={{
                      backgroundColor: "#EBEBEB",
                      fontFamily: "MontserratLight",
                    }}
                  />
                  <SearchIcon />
                </Box>

                <Typography
                  sx={{
                    fontFamily: "MontserratSemiBold",
                    mr: "1vw",
                    fontSize: ".9vw",
                  }}
                >
                  Acciones
                </Typography>
              </Box>
              <TableContainer
                component={Paper}
                sx={{
                  width: "100%",
                  height: "40vh",
                  boxShadow: 10,
                  mt: 1,
                  "&::-webkit-scrollbar": {
                    width: ".3vw",
                    mt: 10,
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "rgba(0,0,0,.5)",
                    outline: "1px solid slategrey",
                    borderRadius: 10,
                  },
                }}
              >
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableBody>
                    {datosTabla.map((item) => {
                      return (
                        <StyledTableRow key={item.Id}>
                          <TableCell sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '1.1vh', fontFamily: 'MontserratMedium'}}>
                              {item.Desc}
                            <Stack
                              sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                flexDirection: 'row',
                              }}
                            >
                              <IconButton aria-label="edit" color="info">
                                <EditIcon />
                              </IconButton>

                              <DeleteDialogCatalogos deleteText={item.Desc} id={item.Id} tabla={item.Tabla} actualizado={actualizaContador}/>
                            </Stack>
                          </TableCell>
                        </StyledTableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>

          <IconButton
          title="Agregar"
            sx={{
              width: 50,
              height: 50,
              backgroundColor: "#c4a57b",
              position: "absolute",
              ":hover": {
                backgroundColor: "#ffdcac",
              },
              right: "30vh",
              bottom: "17vh",
            }}
          >
            <AddIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};
