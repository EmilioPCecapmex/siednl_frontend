import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const tabStyle={
    borderRight: "1px solid #b3afaf",
    color: "black",
    fontFamily: "MontserratBold",
  }

const GenericTabs = ({ tabsData,tabSelect }:{tabsData:string[];tabSelect:Function}) => {
  const [value, setValue] = useState(0);

  const handleTabClick = (newValue:number) => {
    tabSelect(newValue);
    setValue(newValue);
  };

  return (
    <Tabs
      value={value}
      textColor="inherit"
      sx={{
        backgroundColor: '#e0e0e0',
        borderRadius: '10px 10px 0 0',
        boxShadow: 20,
        width: '90vw',
      }}
      variant="scrollable"
      scrollButtons="auto"
    >
      {tabsData.map((tab, index) => (
        <Tab
          key={index}
          label={tab}
          value={index}
          onClick={() => handleTabClick(index)}
          sx={tabStyle}
        />
      ))}
    </Tabs>
  );
};

export default GenericTabs;
