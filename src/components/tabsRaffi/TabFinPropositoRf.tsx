import {
    Grid,
  } from "@mui/material";
  import './CapturaRaffi.css';
  
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
        <GridTable />
      </Grid>
    );
  };
  
  