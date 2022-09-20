import * as React from 'react';
import { Box } from '@mui/system';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';



import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Divider from '@mui/material/Divider';

import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SourceIcon from '@mui/icons-material/Source';
import Input from '@mui/material/Input';

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
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

function createData(
    Descripcion: string,
    
  ) {
    return { Descripcion};
  }
  
  const rows = [
    createData('Frozen yoghurt'),
    createData('Ice cream sandwich'),
    createData('Eclair'),
    createData('Cupcake'),
    createData('Gingerbread'),
  ];

export const Catalogos = () => {
    

    return (
        <Box sx={{width:"100vw",height:"100%",  display:"flex"}}>
            <Box sx={{width:"22%",height:"100%", display:"flex",justifyContent:"flex-start"}}>

                <List sx={{border:"solid 1px"}}>
                    <ListItemButton >
                    <ListItemIcon>
                        <SourceIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Lista de catalogos" />
                    </ListItemButton>
                    <Divider />
                    
                        <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="Starred" />
                        </ListItemButton>
                        <Divider />
                        </List>
                    
                </List>
            </Box>

        <Box sx={{display:"flex", flexDirection:"column", mt:"3vh"}}>       

                <Box sx={{width:"120%",
                height:"10%", 
                display:"flex",
                ml:"2vw",
                justifyContent:"space-evenly", 
                alignItems:"center", 
                border:"solid 1px",
                borderRadius:"30px"
                }}>
                    
                    <Input disableUnderline value={"CATALOGO ACTUAL"}/>
                    
                    <Button variant="outlined" color="success" startIcon={<AddCircleOutlineIcon/>}>
                        Agregar Nuevo
                    </Button>

                </Box>
                
                <Box sx={{ width:"100%",height:"0.5vh",mt:"2vh"}}/>

                <Box sx={{width:"115%",height:"80%", backgroundColor:"#BF75EC",display:"flex",ml:"3vw",justifyContent:"center",mt:"2vh"}}>
                    <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>Descripcion</StyledTableCell>
                        <StyledTableCell align="right">Accion</StyledTableCell>
                        
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.Descripcion}>
                        <StyledTableCell component="th" scope="row">
                            {row.Descripcion}
                        </StyledTableCell>
                            <Stack direction="row" spacing={1}>
                                <IconButton aria-label="delete" color="info">
                                    <EditIcon />
                                </IconButton>

                                <IconButton aria-label="delete" color="error" >
                                    <DeleteIcon />
                                </IconButton>
                                
                            </Stack>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                    </Table>
                </TableContainer>
  
            </Box>
        </Box>
       
            
        </Box>
    );
};

export default Catalogos;