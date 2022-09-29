import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function Render(){
    return ;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Item One" value={10}/>
          <Tab label="Item Two" value={20}/>
          <Tab label="Item Three" value={30} />
        </Tabs>
      </Box>
        
      {value===10? 
        <Box  sx={{backgroundColor:"black", with:"100vw", height:"80vh"}}>
          <Box></Box>
        </Box>
      :null}

      {value ===20 ?
        <Box visibility={value==20?'visible':'hidden'} sx={{backgroundColor:"pink", with:"100vw", height:"80vh"}}>
        <Box></Box>
      </Box>
      : null}  

      {value ===30 ?
        <Box  visibility={value==30?'visible':'hidden'} sx={{backgroundColor:"brown", with:"100vw", height:"80vh"}}>
          <Box>
            
          </Box>
        </Box>
      : null}  

    </Box>
  );
}

