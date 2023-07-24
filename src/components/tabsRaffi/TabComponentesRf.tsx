import {Grid, TextField, ListItemButton, Typography, Divider, List, Box, Paper, styled} from '@mui/material';
import { useEffect, useState } from "react";
import { IComponenteMA } from "./Interfaces";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

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



const GridTable = () => {
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
            <td>100</td>
            <td>100</td>
            <td>100</td>
            <td>100</td>
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
const GridTableMetas = () => {
  return (
    
    <div className="grid-container" style={{width:"100%",textAlign:"center"}}>
      <table style={{width:"100%"}}>
       
        <tbody>
          
          <tr style={{borderColor:"black"}}>
            <td style={{width:"25%",backgroundColor:"#CEE9B6",borderColor:"black"}}>100</td>
            <td style={{width:"25%",backgroundColor:"#CEE9B6"}}>100</td>
            <td style={{width:"25%",backgroundColor:"#CEE9B6"}}>100</td>
            <td style={{width:"25%"}}> <TextField
         
         
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
     
       /></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default GridTable;

export const TabComponenteRf = ({
  MIR,
  MA,
  noComponentes,
  valoresComponenteMAFnc,
}: {
  MA: string;
  MIR: string;
  noComponentes: number[];
  valoresComponenteMAFnc: Function;
}) => {

  let encabezado = JSON.parse(MIR).encabezado;
  const [componentSelect, setComponentSelect] = useState(1);

  
  const [componentesValues, setComponentesValues] = useState<
    Array<IComponenteMA>
  >([]);

  let jsonMA =
    MA === ""
      ? ""
      : JSON.parse(MA).length > 1
      ? JSON.parse(MA)[0]
      : JSON.parse(MA);

      
  useEffect(() => {
    let comp: IComponenteMA[] = [];

    noComponentes.map((x, index) => {
      return comp.push({
        componentes: "C" + (index + 1),
        // frecuencia: MA === "" ? "" : jsonMA?.componentes.frecuencia || "",
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
              <Grid item xs={6}><GridTablePer{"a"} /></Grid>
          </Grid>


          <Grid container item sx={{display:"flex",justifyContent:"center"}} xs={12}>
              <Grid item xs={6}><GridTable /></Grid>
          </Grid>


          <Grid container item sx={{display:"flex",justifyContent:"center"}} xs={12}>
              <Grid item xs={6}><GridTableMetasTitulo /></Grid>
          </Grid>


          <Grid container item sx={{display:"flex",justifyContent:"center"}} xs={12}>
              <Grid item xs={6}><GridTableMetas /></Grid>
          </Grid>
        </Grid>
        </>
  );
};




