import {Grid, TextField, ListItemButton, Typography, Divider, List, Box, Paper, styled, Collapse} from '@mui/material';
import { useEffect, useState } from "react";
import { IComponenteMA } from "./Interfaces";
import { IComponenteActividad } from "../tabsMir/AddMir";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const dateSem = [new Date("2023-06-30"),new Date("2023-12-31")]
const dateTrim = [new Date("2023-03-31"),new Date("2023-06-30"),new Date("2023-09-30"),new Date("2023-12-31")]

const GridTablePer = ({
  periodo
}: {
  periodo:string
}) => {
  return (
    <div className="grid-container" style={{backgroundColor:"lightgray",boxShadow:"1px 2px 2px",textAlign:"center",width:"100%"}}>
      <table style={{width:"100%",textAlign:"center"}}>
        <thead style={{width:"100%",textAlign:"center"}}>
          <tr>
            <th style={{textAlign:"center"}}>{periodo}</th>
            </tr>
            </thead></table>
            </div>);
}



const GridTableTrim = ({
  d1,
  d2,
  d3,
  d4
}: {
  d1:string,
  d2:string,
  d3:string,
  d4:string
}) => {
  return (
    <div className="grid-container" style={{width:"100%"}}>
      <table style={{width:"100%"}}>
        <thead style={{backgroundColor:"lightgray",boxShadow:"1px 2px 2px",textAlign:"center"}}>
          <tr>
            <th>I</th>
            <th>II</th>
            <th>III</th>
            <th>IV</th>
          </tr>
        </thead>
        <tbody style={{width:"100%",textAlign:"center"}}>
          <tr>
            <td>{d1}</td>
            <td>{d2}</td>
            <td>{d3}</td>
            <td>{d4}</td>
          </tr>
          {/* <tr>
            <td>100</td>
            <td>100</td>
            <td>100</td>
            <td><input></input></td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

const GridTableSem = ({
  d1,
  d2
}: {
  d1:string,
  d2:string
}) => {
  return (
    <div className="grid-container" style={{width:"100%"}}>
      <table style={{width:"100%"}}>
        <thead style={{backgroundColor:"lightgray",boxShadow:"1px 2px 2px",textAlign:"center"}}>
          <tr>
            <th>I</th>
            <th>II</th>
          </tr>
        </thead>
        <tbody style={{width:"100%",textAlign:"center"}}>
          <tr>
            <td>{d1}</td>
            <td>{d2}</td>
          </tr>
          {/* <tr>
            <td>100</td>
            <td>100</td>
            <td>100</td>
            <td><input></input></td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};


const GridTableMetasTitulo = () => {
  return (
    <div style={{backgroundColor:"lightgray",boxShadow:"1px 2px 2px",textAlign:"center",width:"100%"}}>
      <table style={{width:"100%",textAlign:"center"}}>
        <thead style={{width:"100%",textAlign:"center"}}>
          <tr>
            <th style={{width:"100%",textAlign:"center"}}>METAS</th>
            </tr>
            </thead></table>
            </div>);
}
const GridTableMetasSem = ({
  d1,
  d2
}: {
  d1:string,
  d2:string
}) => {
  return (
    
    <div className="grid-container" style={{width:"100%",textAlign:"center"}}>
      <table style={{width:"100%"}}>
       
        <tbody>
          
          <tr style={{borderColor:"black"}}>
            <td style={{width:"25%",backgroundColor:"#CEE9B6"}}>

              <TextField
                disabled={new Date()>dateSem[0]}
                variant={"filled"}
                label={
                  <Typography
                    sx={{ fontSize: "0.7vw", fontFamily: "MontserratMedium" }}
                  >
                    DATO I
                  </Typography>
                }
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
                value={new Date()<=dateSem[0]
                  ?d1
                  :""}
              />
              
            </td>
            <td style={{width:"25%",backgroundColor:"#CEE9B6"}}>
            <TextField
                disabled={new Date()>dateSem[1]}
                variant={"filled"}
                label={
                  <Typography
                    sx={{ fontSize: "0.7vw", fontFamily: "MontserratMedium" }}
                  >
                    DATO II
                  </Typography>
                }
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
                value={new Date()<=dateSem[1]
                  ?d2
                  :""}
              />
            </td>
            
          </tr>
        </tbody>
      </table>
    </div>
  );
};


const GridTableMetasTrim = ({
  d1,
  d2,
  d3,
  d4
}: {
  d1:string,
  d2:string,
  d3:string,
  d4:string
}) => {
  return (
    
    <div className="grid-container" style={{width:"100%",textAlign:"center"}}>
      <table style={{width:"100%"}}>
       
        <tbody>
          
          <tr style={{borderColor:"black"}}>
            <td style={{width:"25%",backgroundColor:"#CEE9B6"}}>

              <TextField
                disabled={new Date()>dateTrim[0]}
                variant={"filled"}
                label={
                  <Typography
                    sx={{ fontSize: "0.7vw", fontFamily: "MontserratMedium" }}
                  >
                    DATO I
                  </Typography>
                }
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
                value={new Date()<=dateTrim[0]
                  ?d1
                  :""}
              />
              
            </td>
            <td style={{width:"25%",backgroundColor:"#CEE9B6"}}>
            <TextField
                disabled={new Date()>dateTrim[1]}
                variant={"filled"}
                label={
                  <Typography
                    sx={{ fontSize: "0.7vw", fontFamily: "MontserratMedium" }}
                  >
                    DATO II
                  </Typography>
                }
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
                value={new Date()<=dateTrim[1]
                  ?d2
                  :""}
              />
            </td>
            <td style={{width:"25%",backgroundColor:"#CEE9B6"}}>

              <TextField
                disabled={new Date()>dateTrim[2]}
                variant={"filled"}
                label={
                  <Typography
                    sx={{ fontSize: "0.7vw", fontFamily: "MontserratMedium" }}
                  >
                    DATO III
                  </Typography>
                }
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
                value={new Date()<=dateTrim[2]
                  ?d3
                  :""}
              />
              
            </td>
            <td style={{width:"25%",backgroundColor:"#CEE9B6"}}>
            <TextField
                disabled={new Date()>dateTrim[3]}
                variant={"filled"}
                label={
                  <Typography
                    sx={{ fontSize: "0.7vw", fontFamily: "MontserratMedium" }}
                  >
                    DATO IV
                  </Typography>
                }
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
                InputProps={{
                  style: {
                    fontFamily: "MontserratRegular",
                  },
                }}
                value={new Date()<=dateTrim[3]
                  ?d4
                  :""}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
// export default GridTable;

export const TabActividadRf = ({
  MIR,
  MA,
  componentes,
  asignarCValor,
  compAct,
  valoresComponenteMAFnc,
}: {
  MA: string;
  MIR: string;
  componentes: number[];
  asignarCValor: Function;
  compAct: Array<IComponenteActividad>;
  valoresComponenteMAFnc: Function;
}) => {


  const componenteActividad = [
    {
      componentes: componentes.map((x) => compAct),
    },
  ];

  const [componenteSelect, setComponenteSelect] = useState(0);
  const [actividadSelect, setActividadSelect] = useState(0);

  const [open, setOpen] = useState(1);

  const handleClickComponente = (index: number) => {
    setOpen(index);
  };


  
  let encabezado = JSON.parse(MIR).encabezado;
  

  


  let jsonMA =
    MA === ""
      ? ""
      : JSON.parse(MA).length > 1
      ? JSON.parse(MA)[0]
      : JSON.parse(MA);

      useEffect(() => {
        if (compAct.length > 0) {
          loadActividadesMA();
        }
      }, [compAct]);

      let aument_number = -1;

 const [aValorMA, setAValorMA] = useState(
    componenteActividad.map((item) => {
      return {
        componentes: item.componentes.map((x, index) => {
          return {
            actividades: x.map((c, index2) => {
              return {
                actividad: "A" + (index2 + 1) + "C" + (index + 1),
                metaAnual: "",
                lineaBase: "",
                metasPorFrecuencia: [
                  {
                    trimestre1: "",
                    trimestre2: "",
                    trimestre3: "",
                    trimestre4: "",
                  },
                ],
                valorNumerador: "",
                valorDenominador: "",
                sentidoDelIndicador: "",
                unidadResponsable: "",
                descIndicador: "",
                descNumerador: "",
                descDenominador: "",
              };
            }),
          };
        }),
      };
    })
  );

  const loadActividadesMA = () => {
    let y = componenteActividad.map((item) => {
      return {
        componentes: compAct.map((x, index) => {
          return {
            actividades: x.actividades.map((c, index2) => {
              aument_number++;

              return {
                actividad: "A" + (index2 + 1) + "C" + (index + 1),
                metaAnual:
                  MA === ""
                    ? ""
                    : jsonMA.actividades[aument_number]?.metaAnual || "",
                lineaBase:
                  MA === ""
                    ? ""
                    : jsonMA.actividades[aument_number]?.lineaBase || "",
                metasPorFrecuencia: [
                  {
                    trimestre1:
                      MA === ""
                        ? ""
                        : jsonMA.actividades[aument_number]
                            ?.metasPorFrecuencia[0]?.trimestre1 || "",
                    trimestre2:
                      MA === ""
                        ? ""
                        : jsonMA.actividades[aument_number]
                            ?.metasPorFrecuencia[0]?.trimestre2 || "",
                    trimestre3:
                      MA === ""
                        ? ""
                        : jsonMA.actividades[aument_number]
                            ?.metasPorFrecuencia[0]?.trimestre3 || "",
                    trimestre4:
                      MA === ""
                        ? ""
                        : jsonMA.actividades[aument_number]
                            ?.metasPorFrecuencia[0]?.trimestre4 || "",
                  },
                ],
                valorNumerador:
                  MA === ""
                    ? ""
                    : jsonMA.actividades[aument_number]?.valorNumerador || "",
                valorDenominador:
                  MA === ""
                    ? ""
                    : jsonMA.actividades[aument_number]?.valorDenominador || "",
                sentidoDelIndicador:
                  MA === ""
                    ? ""
                    : jsonMA.actividades[aument_number]?.sentidoDelIndicador ||
                      "",
                unidadResponsable:
                  MA === ""
                    ? ""
                    : jsonMA.actividades[aument_number]?.unidadResponsable ||
                      "",
                descIndicador:
                  MA === ""
                    ? ""
                    : jsonMA.actividades[aument_number]?.descIndicador || "",
                descNumerador:
                  MA === ""
                    ? ""
                    : jsonMA.actividades[aument_number]?.descNumerador || "",
                descDenominador:
                  MA === ""
                    ? ""
                    : jsonMA.actividades[aument_number]?.descDenominador || "",
              };
            }),
          };
        }),
      };
    });

    setAValorMA(y);
  };

  useEffect(() => {
    asignarCValor(aValorMA);
  }, [aValorMA]);
  return (
    <>
    
        {/* COLUMNA IZQUIERDA QUE MUESTRA LOS COMPONENTES */}
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
          {componentes.map((item, index) => {
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
                    COMPONENTE {item}
                  </Typography>
                
                  {open === item ? <ExpandLess /> : <ExpandMore />}
                
                </ListItemButton>
                <Collapse in={open === item} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {aValorMA[0].componentes[componenteSelect].actividades.map(
                      (value, x) => {
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
                            ACTIVIDAD {x + 1}
                          </ListItemButton>
                        );
                      }
                    )}
                  </List>
                </Collapse>

                <Divider />
              </Box>
            );
          })}
          
        </List>

        </Grid>


        {/* RESTO DE CONTENEDOR EN DONDE SE MOSTRARÁ LA TABLE */}
        <Grid container item  xs={10}>
        
          <Grid container item xs={12} sx={{display:"flex",justifyContent:"flex-end"}}>
            <Typography
              sx={{
                mr: "1vw",
                fontFamily: "MontserratSemiBold",
                fontSize: "1.5vw",
              }}
            >
                    COMPONENTE #{componenteSelect + 1} - ACTIVIDAD # {actividadSelect + 1}
                  </Typography>
          </Grid>

          <Grid container item xs={10} sx={{display:"flex",justifyContent:"center"}}>
              <TextField fullWidth variant='standard' value={encabezado?.nombre_del_programa === "Selecciona"
                    ? ""
                    : encabezado?.nombre_del_programa}
               label='INSTITUCION'></TextField>
          </Grid>

          <Grid container item xs={12} sx={{display:"flex",justifyContent:"space-around"}}>
            <Grid item xs={3} > 
            <TextField
              fullWidth
              sx={{boxShadow: 2 }}
              variant={"filled"}
              label={
                <Typography
                  sx={{ fontSize: "0.7vw", fontFamily: "MontserratMedium" }}
                >
                  META ANUAL 2023
                </Typography>
              }
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratMedium",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratRegular",
                },
              }}
          value={
            aValorMA[0].componentes[componenteSelect].actividades[
              actividadSelect
            ]?.metaAnual || ""
          }
            />
            </Grid>
            
            <Grid item xs={3}>

            <TextField
         fullWidth
              sx={{boxShadow: 2 }}
              variant={"filled"}
              label={
                <Typography
                  sx={{ fontSize: "0.7vw", fontFamily: "MontserratMedium" }}
                >
                  LINEA BASE 2021
                </Typography>
              }
              InputLabelProps={{
                style: {
                  fontFamily: "MontserratMedium",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "MontserratRegular",
                },
              }}
          value={
            aValorMA[0].componentes[componenteSelect].actividades[
              actividadSelect
            ]?.lineaBase || ""
          }
            />
            </Grid>
            
          </Grid>


          <Grid container item sx={{display:"flex",justifyContent:"center"}} xs={12}>
              <Grid item xs={6}><GridTablePer 
              periodo="TRIMESTRE" /></Grid>
          </Grid>


          <Grid container item sx={{display:"flex",justifyContent:"center"}} xs={12}>
              <Grid item xs={6}>
                <GridTableTrim 
                  // d1={componentesValues[componenteSelect - 1]?.metasPorFrecuencia[0]?.trimestre1}
                  d1={
                    aValorMA[0].componentes[componenteSelect].actividades[
                      actividadSelect
                    ]?.metasPorFrecuencia[0]?.trimestre1 || ""
                  }
                  d2={
                    aValorMA[0].componentes[componenteSelect].actividades[
                      actividadSelect
                    ]?.metasPorFrecuencia[0]?.trimestre2 || ""
                  }
                  d3={
                    aValorMA[0].componentes[componenteSelect].actividades[
                      actividadSelect
                    ]?.metasPorFrecuencia[0]?.trimestre3 || ""
                  }
                  d4={
                    aValorMA[0].componentes[componenteSelect].actividades[
                      actividadSelect
                    ]?.metasPorFrecuencia[0]?.trimestre4 || ""
                  }/>
           
                </Grid>
          </Grid>


          <Grid container item sx={{display:"flex",justifyContent:"center"}} xs={12}>
              <Grid item xs={6}><GridTableMetasTitulo /></Grid>
          </Grid>


          <Grid container item sx={{display:"flex",justifyContent:"center"}} xs={12}>
              <Grid item xs={6}>
               <GridTableMetasTrim 
                  d1={"404"}
                  d2={"404"}
                  d3={"404"}
                  d4={"404"}/>
             
                
                
               </Grid>
          </Grid> 
        </Grid>
        </>
  );
};




