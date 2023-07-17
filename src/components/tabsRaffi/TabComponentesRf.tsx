import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import './CapturaRaffi.css';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const GridTable = () => {
  return (
    <div className="grid-container">
      <table>
        <thead>
          <tr>
            <th>I</th>
            <th>II</th>
            <th>III</th>
            <th>IV</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>100</td>
            <td>100</td>
            <td>100</td>
            <td></td>
          </tr>
          <tr>
            <td>100</td>
            <td>100</td>
            <td>100</td>
            <td></td>
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
      <Grid container>
        <Grid item xs={2}>
          <Item>
            {/* <Grid>
              Componente 1
            </Grid>
            <Grid>
              Componente 2
            </Grid> */}







            
          </Item>
        </Grid>
        <Grid item xs={10}>
          <Item>
            TÍTULO

            <GridTable />
          </Item>
        </Grid>
      </Grid>
    </Grid>
  );
};

