import { Grid, TextField, ListItemButton, Typography, Divider, List, Box, Paper, styled,Tooltip } from '@mui/material';
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useEffect, useState } from "react";
import { IComponenteMA, IComponenteRF } from "./Interfaces";
import { IComponente } from "../tabsMetaAnual/IComponente";
import { ClassNames } from '@emotion/react';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const dateSem = [new Date("2023-06-30"),new Date("2023-12-31")]
const dateTrim = [new Date("2023-03-31"),new Date("2023-06-30"),new Date("2023-09-30"),new Date("2023-12-31")]

const d1="",d2="",d3="",d4="",r1="",r2="",r3="",r4=""

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
  d2,
  r1,
  r2
}: {
  d1:string,
  d2:string,
  r1:string,
  r2:string
}) => {

  return (
    
    <div className="grid-container" style={{width:"100%",textAlign:"center"}}>
      <table style={{width:"100%"}}>
       
        <tbody>
          
          <tr style={{borderColor:"black"}}>
            <td style={{width:"25%"}}>

              <TextField
                sx={{
                  backgroundColor: (d1==""
                  ?""
                  :(parseInt(r1)-parseInt(d1))/parseInt(d1)<.05
                  ? "#CEE9B6"
                  : (parseInt(r1)-parseInt(d1))/parseInt(d1)<.1
                  ? "#FFDE6A"
                  : "#EF6969")
                }}
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
                  ?""
                  :d1}
              />
              
            </td>
            <td style={{width:"25%"}}>
            <TextField
              sx={{
                backgroundColor: (d2==""
                ?""
                :(parseInt(r2)-parseInt(d2))/parseInt(d2)<.05
                ? "#CEE9B6"
                : (parseInt(r2)-parseInt(d2))/parseInt(d2)<.1
                ? "#FFDE6A"
                : "#EF6969")
              }}
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
                  ?""
                  :d2}
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
  d4,
  r1,
  r2,
  r3,
  r4,
}: {
  d1:string,
  d2:string,
  d3:string,
  d4:string,
  r1:string,
  r2:string,
  r3:string,
  r4:string
}) => {
  return (
    
    <div className="grid-container" style={{width:"100%",textAlign:"center"}}>
      <table style={{width:"100%"}}>
       
        <tbody>
          
          <tr style={{borderColor:"black"}}>
            <td style={{width:"25%"}}>

              <TextField
              sx={{
                backgroundColor: (d1==""
                ?""
                :(parseInt(r1)-parseInt(d1))/parseInt(d1)<.05
                ? "#CEE9B6"
                : (parseInt(r1)-parseInt(d1))/parseInt(d1)<.1
                ? "#FFDE6A"
                : "#EF6969")
              }}
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
                  ?""
                  :d1}
              />
              
            </td>
            <td style={{width:"25%"}}>
            <TextField
            sx={{
              backgroundColor: (d2==""
              ?""
              :(parseInt(r2)-parseInt(d2))/parseInt(d2)<.05
              ? "#CEE9B6"
              : (parseInt(r2)-parseInt(d2))/parseInt(d2)<.1
              ? "#FFDE6A"
              : "#EF6969")
            }}
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
                  ?""
                  :d2}
              />
            </td>
            <td style={{width:"25%"}}>

              <TextField
              sx={{
                backgroundColor: (d3==""
                ?""
                :(parseInt(r3)-parseInt(d3))/parseInt(d3)<.05
                ? "#CEE9B6"
                : (parseInt(r3)-parseInt(d3))/parseInt(d3)<.1
                ? "#FFDE6A"
                : "#EF6969")
              }}
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
                  ?""
                  :d3}
              />
              
            </td>
            <td style={{width:"25%"}}>
            <TextField
            sx={{
              backgroundColor: (d4==""
              ?""
              :(parseInt(r4)-parseInt(d4))/parseInt(d4)<.05
              ? "#CEE9B6"
              : (parseInt(r4)-parseInt(d4))/parseInt(d4)<.1
              ? "#FFDE6A"
              : "#EF6969")
            }}
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
                  ?""
                  :d4}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
// export default GridTable;

export const TabComponenteRf = ({
  MIR,
  MA,
  RF,
  noComponentes,
  valoresComponenteMAFnc,
  showMirFnc,
  setTxtShowFnc
}: {
  MA: string;
  MIR: string;
  RF: string;
  noComponentes: number[];
  valoresComponenteMAFnc: Function;
  showMirFnc: Function;
  setTxtShowFnc: Function;
}) => {

  let encabezado = JSON.parse(MIR).encabezado;
  const [componentSelect, setComponentSelect] = useState(1);

  

  const [componentesValues, setComponentesValues] = useState<
    Array<IComponenteMA>
  >([]);

  const [componentesValuesRF, setComponentesValuesRF] = useState<
    Array<IComponenteRF>
  >([]);

  let jsonMA =
    MA === ""
      ? ""
      : JSON.parse(MA).length > 1
      ? JSON.parse(MA)[0]
      : JSON.parse(MA);

  let jsonRF=
    RF === ""
        ? ""
        : JSON.parse(RF).length > 1
        ? JSON.parse(RF)[0]
        : JSON.parse(RF);


  useEffect(() => {
    let comp: IComponenteRF[] = [];

    noComponentes.map((x, index) => {
      return comp.push({
        
            semestre1:
              RF === ""
                ? ""
                : jsonRF?.componentes[index]?.metasPorFrecuencia[0]
                    ?.semestre1 || "",
            semestre2:
              RF === ""
                ? ""
                : jsonRF?.componentes[index]?.metasPorFrecuencia[0]
                    ?.semestre2 || "",
            trimestre1:
              RF === ""
                ? ""
                : jsonRF?.componentes[index]?.metasPorFrecuencia[0]
                    ?.trimestre1 || "",
            trimestre2:
              RF === ""
                ? ""
                : jsonRF?.componentes[index]?.metasPorFrecuencia[0]
                    ?.trimestre2 || "",
            trimestre3:
              RF === ""
                ? ""
                : jsonRF?.componentes[index]?.metasPorFrecuencia[0]
                    ?.trimestre3 || "",
            trimestre4:
              RF === ""
                ? ""
                : jsonRF?.componentes[index]?.metasPorFrecuencia[0]
                    ?.trimestre4 || ""
          
        

      });
    });

    setComponentesValuesRF(comp);
  }, [noComponentes]);


  useEffect(() => {
    valoresComponenteMAFnc(componentesValues);
  }, [componentesValues]);

  useEffect(() => {
    let comp: IComponenteMA[] = [];

    noComponentes.map((x, index) => {
      return comp.push({
        componentes: "C" + (index + 1),
        // frecuencia: MA === "" ? "" : jsonMA?.componentes[index]?.frecuencia || "",
        metaAnual: MA === "" ? "" : jsonMA?.componentes[index]?.metaAnual || "",
        lineaBase: MA === "" ? "" : jsonMA?.componentes[index]?.lineaBase || "",
        metasPorFrecuencia: [
          {
            semestre1:
              MA === ""
                ? ""
                : jsonMA?.componentes[index]?.metasPorFrecuencia[0]
                    ?.semestre1 || "",
            semestre2:
              MA === ""
                ? ""
                : jsonMA?.componentes[index]?.metasPorFrecuencia[0]
                    ?.semestre2 || "",
            trimestre1:
              MA === ""
                ? ""
                : jsonMA?.componentes[index]?.metasPorFrecuencia[0]
                    ?.trimestre1 || "",
            trimestre2:
              MA === ""
                ? ""
                : jsonMA?.componentes[index]?.metasPorFrecuencia[0]
                    ?.trimestre2 || "",
            trimestre3:
              MA === ""
                ? ""
                : jsonMA?.componentes[index]?.metasPorFrecuencia[0]
                    ?.trimestre3 || "",
            trimestre4:
              MA === ""
                ? ""
                : jsonMA?.componentes[index]?.metasPorFrecuencia[0]
                    ?.trimestre4 || "",
          },
        ],

        valorNumerador:
          MA === "" ? "" : jsonMA?.componentes[index]?.valorNumerador || "",
        valorDenominador:
          MA === "" ? "" : jsonMA?.componentes[index]?.valorDenominador || "",
        sentidoDelIndicador:
          MA === ""
            ? ""
            : jsonMA?.componentes[index]?.sentidoDelIndicador || "",

        unidadResponsable:
          MA === "" ? "" : jsonMA?.componentes[index]?.unidadResponsable || "",

        descIndicador:
          MA === "" ? "" : jsonMA?.componentes[index]?.descIndicador || "",
        descNumerador:
          MA === "" ? "" : jsonMA?.componentes[index]?.descNumerador || "",
        descDenominador:
          MA === "" ? "" : jsonMA?.componentes[index]?.descDenominador || "",
      });
    });

    setComponentesValues(comp);
  }, [noComponentes]);




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
          {noComponentes.map((item) => {
            return (
              <Box
                key={item}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Divider />
                <ListItemButton
                  selected={item === componentSelect ? true : false}
                  key={item}
                  onClick={() => {
                    setComponentSelect(item);
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
                </ListItemButton>

                <Divider />
              </Box>
            );
          })}
          
        </List>

        </Grid>


        {/* RESTO DE CONTENEDOR EN DONDE SE MOSTRARÁ LA TABLE */}
        <Grid container item  xs={10}>
        
          <Grid container item xs={12} sx={{display:"flex",justifyContent:"flex-end"}}>
          <Tooltip title="RESUMEN COMPONENTE">
            <InfoOutlinedIcon
              onClick={() => {
                showMirFnc(true);
                setTxtShowFnc("Componentes");
              }}
              fontSize="large"
              sx={{ cursor: "pointer" }}
            ></InfoOutlinedIcon>
          </Tooltip>
            <Typography
              sx={{
                mr: "1vw",
                fontFamily: "MontserratSemiBold",
                fontSize: "1.5vw",
              }}
            >
                    COMPONENTE {componentSelect}
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
          value={componentesValues[componentSelect - 1]?.metaAnual || ""}
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
          value={componentesValues[componentSelect - 1]?.lineaBase || ""}
            />
            </Grid>
            
          </Grid>


          <Grid container item sx={{display:"flex",justifyContent:"center"}} xs={12}>
              <Grid item xs={6}><GridTablePer 
              periodo={componentesValues[componentSelect - 1]?.metasPorFrecuencia[0]?.semestre1===""
              ? "TRIMESTRE"
              : "SEMESTRE"} /></Grid>
          </Grid>


          <Grid container item sx={{display:"flex",justifyContent:"center"}} xs={12}>
              <Grid item xs={6}>
                {componentesValues[componentSelect - 1]?.metasPorFrecuencia[0]?.semestre1===""
              ? <GridTableTrim 
                  d1={componentesValues[componentSelect - 1]?.metasPorFrecuencia[0]?.trimestre1}
                  d2={componentesValues[componentSelect - 1]?.metasPorFrecuencia[0]?.trimestre2}
                  d3={componentesValues[componentSelect - 1]?.metasPorFrecuencia[0]?.trimestre3}
                  d4={componentesValues[componentSelect - 1]?.metasPorFrecuencia[0]?.trimestre4}/>
              : <GridTableSem 
                  d1={componentesValues[componentSelect - 1]?.metasPorFrecuencia[0]?.semestre1}
                  d2={componentesValues[componentSelect - 1]?.metasPorFrecuencia[0]?.semestre2}/>}
                </Grid>
          </Grid>


          <Grid container item sx={{display:"flex",justifyContent:"center"}} xs={12}>
              <Grid item xs={6}><GridTableMetasTitulo /></Grid>
          </Grid>


          <Grid container item sx={{display:"flex",justifyContent:"center"}} xs={12}>
              <Grid item xs={6}>
               
              {componentesValues[componentSelect - 1]?.metasPorFrecuencia[0]?.semestre1===""
              ? 
    
                <div className="grid-container" style={{width:"100%",textAlign:"center"}}>
                  <table style={{width:"100%"}}>
                   
                    <tbody>
                      
                      <tr style={{borderColor:"black"}}>
                        <td style={{width:"25%"}}>
            
                          <TextField
                          sx={{
                            backgroundColor: (d1==""
                            ?""
                            :(parseInt(r1)-parseInt(d1))/parseInt(d1)<.05
                            ? "#CEE9B6"
                            : (parseInt(r1)-parseInt(d1))/parseInt(d1)<.1
                            ? "#FFDE6A"
                            : "#EF6969")
                          }}
                            disabled={new Date()>dateTrim[0]}
                            variant={"filled"}
                            label={
                              <Typography
                                sx={{ fontSize: "0.7vw", fontFamily: "MontserratMedium" }}
                              >
                                DATO I
                                
                              </Typography>
                            }
                            onChange={(c) => {
                              componentesValues[componentSelect - 1].descNumerador =
                                c.target.value
                                  .replaceAll('"', "")
                                  .replaceAll("'", "")
                                  .replaceAll("\n", "");
                              setComponentesValues([...componentesValues]);
                            }}
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
                              ?""
                              :componentesValues[componentSelect - 1]?.descNumerador || ""}
                          />
                          
                        </td>
                        <td style={{width:"25%"}}>
                        <TextField
                        sx={{
                          backgroundColor: (d2==""
                          ?""
                          :(parseInt(r2)-parseInt(d2))/parseInt(d2)<.05
                          ? "#CEE9B6"
                          : (parseInt(r2)-parseInt(d2))/parseInt(d2)<.1
                          ? "#FFDE6A"
                          : "#EF6969")
                        }}
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
                              ?""
                              :d2}
                          />
                        </td>
                        <td style={{width:"25%"}}>
            
                          <TextField
                          sx={{
                            backgroundColor: (d3==""
                            ?""
                            :(parseInt(r3)-parseInt(d3))/parseInt(d3)<.05
                            ? "#CEE9B6"
                            : (parseInt(r3)-parseInt(d3))/parseInt(d3)<.1
                            ? "#FFDE6A"
                            : "#EF6969")
                          }}
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
                              ?""
                              :d3}
                          />
                          
                        </td>
                        <td style={{width:"25%"}}>
                        <TextField
                        sx={{
                          backgroundColor: (d4==""
                          ?""
                          :(parseInt(r4)-parseInt(d4))/parseInt(d4)<.05
                          ? "#CEE9B6"
                          : (parseInt(r4)-parseInt(d4))/parseInt(d4)<.1
                          ? "#FFDE6A"
                          : "#EF6969")
                        }}
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
                              ?""
                              :d4}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
             
              : <div className="grid-container" style={{width:"100%",textAlign:"center"}}>
              <table style={{width:"100%"}}>
               
                <tbody>
                  
                  <tr style={{borderColor:"black"}}>
                    <td style={{width:"25%"}}>
        
                      <TextField
                        sx={{
                          backgroundColor: (d1==""
                          ?""
                          :(parseInt(r1)-parseInt(d1))/parseInt(d1)<.05
                          ? "#CEE9B6"
                          : (parseInt(r1)-parseInt(d1))/parseInt(d1)<.1
                          ? "#FFDE6A"
                          : "#EF6969")
                        }}
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
                        onChange={(c) => {
                          componentesValues[componentSelect - 1].descNumerador =
                            c.target.value
                              .replaceAll('"', "")
                              .replaceAll("'", "")
                              .replaceAll("\n", "");
                          setComponentesValues([...componentesValues]);
                        }}
                        value={new Date()<=dateSem[0]
                          ?""
                          :componentesValues[componentSelect - 1]?.descNumerador || ""}
                      />
                      
                    </td>
                    <td style={{width:"25%"}}>
                    <TextField
                      sx={{
                        backgroundColor: (d2==""
                        ?""
                        :(parseInt(r2)-parseInt(d2))/parseInt(d2)<.05
                        ? "#CEE9B6"
                        : (parseInt(r2)-parseInt(d2))/parseInt(d2)<.1
                        ? "#FFDE6A"
                        : "#EF6969")
                      }}
                        disabled={new Date()>dateSem[1]}
                        variant={"filled"}
                        label={
                          <Typography
                            sx={{ fontSize: "0.7vw", fontFamily: "MontserratMedium" }}
                          >
                            DATO II
                          </Typography>
                        }
                        onChange={(c) => {
                          componentesValuesRF[componentSelect - 1].semestre2 =
                            c.target.value
                              .replaceAll('"', "")
                              .replaceAll("'", "")
                              .replaceAll("\n", "");
                          setComponentesValuesRF([...componentesValuesRF]);
                        }}
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
                        value={componentesValuesRF[componentSelect - 1]?.semestre2 || ""}
                      />
                    </td>
                    
                  </tr>
                </tbody>
              </table>
            </div>
            }
                
                
               </Grid>
          </Grid>
        </Grid>
        </>
  );
};




