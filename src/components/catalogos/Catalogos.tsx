import * as React from "react";
import { Box } from "@mui/system";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Divider from "@mui/material/Divider";

import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SourceIcon from "@mui/icons-material/Source";
import Input from "@mui/material/Input";
import axios from "axios";



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
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
    { id: 1, Desc: "Años Fiscales", fnc: 'getAniosFiscales()'},
    { id: 2, Desc: "Beneficiarios" , fnc: 'getBeneficiarios()'},
    { id: 3, Desc: "Clasificaciones Programaticas" , fnc: 'getClasificacionesProgramaticas()'},
    { id: 4, Desc: "Dimensiones del Indicador" , fnc: 'getDimensionesDelIndicador()'},
    { id: 5, Desc: "Ejes", fnc: 'getEjes()'},
    { id: 6, Desc: "Estrategias", fnc: 'getEstrategias()' },
    { id: 7, Desc: "Fechas de Captura", fnc: 'getFechasDeCaptura()' },
    { id: 8, Desc: "Formulas", fnc: 'getFormulas()' },
    { id: 9, Desc: "Frecuencias" , fnc: 'getFrecuencias()'},
    { id: 10, Desc: "Instituciones" , fnc: 'getInstituciones()'},
    { id: 11, Desc: "Lineas de Acción" , fnc: 'getLineasDeAccion()'},
    { id: 12, Desc: "Metas ODS", fnc: 'getMetasODS()' },
    { id: 13, Desc: "Modalidades" , fnc: 'getModalidades()'},
    { id: 14, Desc: "Objetivos", fnc: 'getObjetivos()' },
    { id: 15, Desc: "Objetivos DS", fnc: 'getObjetivosDS()' },
    { id: 16, Desc: "Objetivos PEENL", fnc: 'getObjetivosPEENL()' },
    { id: 17, Desc: "PED" , fnc: 'getRoles()'},
    { id: 18, Desc: "Programas Presupestarios", fnc: 'getProgramaPresupuestario()' },
    { id: 19, Desc: "Roles", fnc: 'getRoles()' },
    { id: 20, Desc: "Tematicas", fnc: 'getTematicas()' },
    { id: 21, Desc: "Tipos de Formula", fnc: 'getTipoDeFormula()' },
    { id: 22, Desc: "Tipos de Indicador" , fnc: 'getTipoDeIndicador()'},
    { id: 23, Desc: "Unidades de Medida", fnc: 'getUnidadDeMedida()' },
    { id: 24, Desc: "Usuarios", fnc: 'getRoles()' },
  ];
  


export const Catalogos = () => {

  

  const [datosTabla, setDatosTabla] = React.useState([
    {
      Id: "",
      Desc: "",
    },
  ]);

  
  const getAniosFiscales = () => {
    setCatalogoActual("Años Fiscales");
    axios
      .get("http://10.200.4.105:8000/api/AniosFiscales", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || ""
                },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: { Id: string; AnioFiscal: string }) => {
              return { Id: item.Id, Desc: item.AnioFiscal };
            }
          );
          setDatosTabla(update);
          
        }
      });
  };

  const getBeneficiarios = () => {
    setCatalogoActual("Beneficiarios");
    axios
      .get("http://10.200.4.105:8000/api/Beneficiarios", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || ""
                },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: { Id: string; Beneficiario: string }) => {
              return { Id: item.Id, Desc: item.Beneficiario };
            }
          );
          setDatosTabla(update);
        }
      });
  };

  const getClasificacionesProgramaticas = () => {
    setCatalogoActual("Clasificaciones Programaticas");
    axios
      .get("http://10.200.4.105:8000/api/clasificacionesProgramaticas", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || ""
                },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: { Id: string; ClasificacionProgramatica: string }) => {
              return { Id: item.Id, Desc: item.ClasificacionProgramatica };
            }
          );
          setDatosTabla(update);
        }
      });
  };

  const getDimensionesDelIndicador = () => {
    setCatalogoActual("Dimension del indicador");
    axios
      .get("http://10.200.4.105:8000/api/dimensionesDelIndicador", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || ""
                },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: { Id: string; DimensionDelIndicador: string }) => {
              return { Id: item.Id, Desc: item.DimensionDelIndicador };
            }
          );
          setDatosTabla(update);
        }
      });
  };

  const getEjes = () => {
    setCatalogoActual("Ejes");
    axios
      .get("http://10.200.4.105:8000/api/ejes", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || ""
                },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: { Id: string; Eje: string }) => {
              return { Id: item.Id, Desc: item.Eje };
            }
          );
          setDatosTabla(update);
        }
      });
  };

  const getEstrategias = () => {
    setCatalogoActual("Estrategias");
    axios
      .get("http://10.200.4.105:8000/api/Estrategias", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || ""
                },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: { Id: string; Estrategia: string }) => {
              return { Id: item.Id, Desc: item.Estrategia };
            }
          );
          setDatosTabla(update);
        }
      });
  };


  const getFormulas = () => {
    setCatalogoActual("Formulas");
    axios
      .get("http://10.200.4.105:8000/api/Formulas", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || ""
                },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: { Id: string; Formula: string }) => {
              return { Id: item.Id, Desc: item.Formula };
            }
          );
          setDatosTabla(update);
        }
      });
  };

  const getFechasDeCaptura = () => {
    setCatalogoActual("Fechas de captura");
    axios
      .get("http://10.200.4.105:8000/api/fechasDeCaptura", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || ""
                },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: { Id: string; FechaDeCaptura: string }) => {
              return { Id: item.Id, Desc: item.FechaDeCaptura };
            }
          );
          setDatosTabla(update);
        }
      });
  };

  const getFrecuencias = () => {
    setCatalogoActual("Frecuencias");
    axios
      .get("http://10.200.4.105:8000/api/Frecuencias", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || ""
                },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: { Id: string; Frecuencia: string }) => {
              return { Id: item.Id, Desc: item.Frecuencia };
            }
          );
          setDatosTabla(update);
        }
      });
  };

  const getInstituciones = () => {
    setCatalogoActual("Instituciones");
    axios
      .get("http://10.200.4.105:8000/api/instituciones", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || ""
        },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: { Id: string; NombreInstitucion: string }) => {
              return { Id: item.Id, Desc: item.NombreInstitucion };
            }
          );
          setDatosTabla(update);
        }
      });
  };
  const getLineasDeAccion = () => {
    setCatalogoActual("Lineas de accion");
    axios
      .get("http://10.200.4.105:8000/api/lineasDeAccion", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || ""
                },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: { Id: string; LineaDeAccion: string }) => {
              return { Id: item.Id, Desc: item.LineaDeAccion };
            }
          );
          setDatosTabla(update);
        }
      });
  };

  const getMetasODS = () => {
    setCatalogoActual("Meta ODS");
    axios
      .get("http://10.200.4.105:8000/api/metasODS", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || ""
                },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: { Id: string; MetaODS: string }) => {
              return { Id: item.Id, Desc: item.MetaODS };
            }
          );
          setDatosTabla(update);
        }
      });
  };

  const getModalidades = () => {
    setCatalogoActual("Modalidades");
    axios
      .get("http://10.200.4.105:8000/api/modalidades", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || ""
                },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: { Id: string; Modalidad: string }) => {
              return { Id: item.Id, Desc: item.Modalidad };
            }
          );
          setDatosTabla(update);
        }
      });
  };

  const getObjetivos = () => {
    setCatalogoActual("Objetivos");
    axios
      .get("http://10.200.4.105:8000/api/objetivos", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || ""
                },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: { Id: string; Objetivo: string }) => {
              return { Id: item.Id, Desc: item.Objetivo };
            }
          );
          setDatosTabla(update);
        }
      });
  };

  const getObjetivosPEENL = () => {
    setCatalogoActual("Ojetivos PEENL");
    axios
      .get("http://10.200.4.105:8000/api/objetivosPEENL", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || ""
                },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: { Id: string; ObjetivoPEENL: string }) => {
              return { Id: item.Id, Desc: item.ObjetivoPEENL };
            }
          );
          setDatosTabla(update);
        }
      });
  };

  const getObjetivosDS = () => {
    setCatalogoActual("Objetivos DS");
    axios
      .get("http://10.200.4.105:8000/api/objetivosDS", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || ""
                },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: { Id: string; ObjetivoDS: string }) => {
              return { Id: item.Id, Desc: item.ObjetivoDS };
            }
          );
          setDatosTabla(update);
        }
      });
  };
  
  const getProgramaPresupuestario = () => {
    setCatalogoActual("Programas Presupuestarios");
    axios
      .get("http://10.200.4.105:8000/api/programaPresupuestario", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || ""
                },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: { Id: string; NombrePrograma: string }) => {
              return { Id: item.Id, Desc: item.NombrePrograma };
            }
          );
          setDatosTabla(update);
        }
      });
  };

  const getRoles = () => {
    setCatalogoActual("Roles");
    axios
      .get("http://10.200.4.105:8000/api/roles", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || ""
                },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: { Id: string; Rol: string }) => {
              return { Id: item.Id, Desc: item.Rol };
            }
          );
          setDatosTabla(update);
        }
      });
  };

  const getTematicas = () => {
    setCatalogoActual("Tematicas");
    axios
      .get("http://10.200.4.105:8000/api/tematica", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || ""
        },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: { Id: string; Tematica: string }) => {
              return { Id: item.Id, Desc: item.Tematica };
            }
          );
          setDatosTabla(update);
        }
      });
  };

  React.useEffect(() => {
    getRoles();
  }, []);

  const getTipoDeFormula = () => {
    setCatalogoActual("Tipos de formulas");
    axios
      .get("http://10.200.4.105:8000/api/TipoDeFormula", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || ""
        },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: { Id: string; TipoDeFormula: string }) => {
              return { Id: item.Id, Desc: item.TipoDeFormula };
            }
          );
          setDatosTabla(update);
        }
      });
  };

  React.useEffect(() => {
    getRoles();
  }, []);

  const getTipoDeIndicador = () => {
    setCatalogoActual("Tipos de indicadores");
    axios
      .get("http://10.200.4.105:8000/api/tipoDeIndicador", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || ""
        },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: { Id: string; TipoDeIndicador: string }) => {
              return { Id: item.Id, Desc: item.TipoDeIndicador };
            }
          );
          setDatosTabla(update);
        }
      });
  };

  const getUnidadDeMedida = () => {
    setCatalogoActual("Unidades de medidas");
    axios
      .get("http://10.200.4.105:8000/api/unidadDeMedida", {
        headers: {
          Authorization: localStorage.getItem("jwtToken") || ""
        },
      })
      .then((r) => {
        if (r.status === 200) {
          let update = r.data.data;
          update = update.map(
            (item: { Id: string; UnidadDeMedida: string }) => {
              return { Id: item.Id, Desc: item.UnidadDeMedida };
            }
          );
          setDatosTabla(update);
        }
      });
  };


  React.useEffect(() => {
    getRoles();
  }, []);

  const [catalogoActual,setCatalogoActual]=React.useState("");
  
  
  
  return (
    <Box sx={{ width: "100vw", height: "100%", display: "flex" }}>
      <Box
        sx={{
          width: "22%",
          height: "100%",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <List sx={{ border: "solid 1px", overflow:"auto", borderRadius:"15px", borderColor:"#BCBCBC"}}>
          <ListItemButton>
            <ListItemIcon>
              <SourceIcon />
            </ListItemIcon>
            <ListItemText primary="Lista de catalogos" />
          </ListItemButton>
          <Divider />

        
            <List component="div" disablePadding >
            
           

            {configOptions.map((item) => {
            return (
                <>
                    <ListItemButton key={item.id} sx={{ pl: 4 }} onClick={() =>eval(item.fnc)}>
                    <ListItemText primary={item.Desc}/>
                    </ListItemButton>

                    <Divider />
                </>
            );
          })}

          </List>


        </List>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", mt: "3vh" }}>
        <Box
          sx={{
            width: "120%",
            height: "10%",
            display: "flex",
            ml: "2vw",
            justifyContent: "space-evenly",
            alignItems: "center",
            border: "solid 1px",
            borderRadius: "30px",
          }}
        >
          <Input sx={{width:"50%"}} disableUnderline value={catalogoActual} />

          <Button
            variant="outlined"
            color="success"
            startIcon={<AddCircleOutlineIcon />}
          >
            Agregar Nuevo
          </Button>
        </Box>

        <Box sx={{ width: "100%", height: "0.5vh", mt: "2vh" }} />

        <Box
          sx={{
            width: "115%",
            height: "80%",
            backgroundColor: "#BF75EC",
            display: "flex",
            ml: "3vw",
            justifyContent: "center",
            mt: "2vh",
          }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow >
                  <StyledTableCell>Descripción</StyledTableCell>
                  <StyledTableCell align="right">Acciones</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {datosTabla.map((item) => {
                  return (
                    <StyledTableRow key={item.Id}>
                      <StyledTableCell component="th" scope="row" >
                        {item.Desc}
                      </StyledTableCell>
                      <Stack direction="row" spacing={5} sx={{display:"flex", justifyContent:"flex-end"}}>
                        <IconButton aria-label="delete" color="info">
                          <EditIcon />
                        </IconButton>

                        <IconButton aria-label="delete" color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default Catalogos;
