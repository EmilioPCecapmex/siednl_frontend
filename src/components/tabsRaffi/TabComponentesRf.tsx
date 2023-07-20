import {Grid, TextField, ListItemButton, Typography, Divider, List, Box, Paper, styled} from '@mui/material';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const GridTablePer = () => {
  return (
    <div className="grid-container" style={{backgroundColor:"lightgray",boxShadow:"1px 2px 2px",textAlign:"center",width:"100%"}}>
      <table style={{width:"100%",textAlign:"center"}}>
        <thead style={{width:"100%",textAlign:"center"}}>
          <tr>
            <th style={{textAlign:"center"}}>TRIMESTRAL</th>
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

export const TabComponenteRf = () => {
  return (
    <Grid
      container
      position="absolute"
      sx={{
        display: "flex",
        width: "75vw",
        height: "75vh",
        boxShadow: 10,
        borderRadius: 5,
        flexDirection: "column",
        backgroundColor: "#fff",
      }}
    >
      <Grid item container>
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Divider />
            <ListItemButton
              // selected={showFin}
              // onClick={() => {
              //   setShowFin(true);
              //   setShowProposito(false);
              // }}
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
                COMPONENTE 1
              </Typography>
            </ListItemButton>
            <Divider />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <ListItemButton
              // selected={showProposito}
              // onClick={() => {
              //   setShowProposito(true);
              //   setShowFin(false);
              // }}
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
                COMPONENTE 2
              </Typography>
            </ListItemButton>
            <Divider />
          </Box>
        </List>



        </Grid>
        {/* RESTO DE CONTENEDOR EN DONDE SE MOSTRARÁ LA TABLE */}
        <Grid item container xs={10} spacing={4}>
        
          <Grid item container>
            <Grid item xs={8}></Grid>
            <Grid item xs={4}>
            
            <Typography
              sx={{
                mr: "1vw",
                fontFamily: "MontserratSemiBold",
                fontSize: "1.5vw",
              }}
            >
                    COMPONENTE 
                  </Typography>
                
            </Grid>
          </Grid>
          <Grid item container>
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
              <Typography
                sx={{
                  mr: "1vw",
                  fontFamily: "MontserratSemiBold",
                  fontSize: "1.0vw",
                  fontStyle: "bold"
                }}
              >
                SERVICIOS DE ALBERGUE O ESTANCIA TEMPORAL BRINDADOS
              </Typography>
              </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
          <Grid item container >
            <Grid item xs={3}> 
            <TextField
         
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
          
            />
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={3}>

            <TextField
         
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
          
            />
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
          <Grid container item>
              <Grid item xs={2}></Grid>
              <Grid item xs={6}>
              <GridTablePer />
              </Grid>
              <Grid item xs={4}></Grid>
          </Grid>
          <Grid container item>
              
          <Grid item xs={2}></Grid>
              <Grid item xs={6}>
              <GridTable />
              </Grid>
              <Grid item xs={4}></Grid>
          
          </Grid>
          <Grid container item>
              
          <Grid item xs={2}></Grid>
              <Grid item xs={6}>
              <GridTableMetasTitulo />
              </Grid>
              <Grid item xs={4}></Grid>
          
          </Grid>
          <Grid container item>
              
          <Grid item xs={2}></Grid>
              <Grid item xs={6}>
              <GridTableMetas />
              </Grid>
              <Grid item xs={4}></Grid>
          
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

