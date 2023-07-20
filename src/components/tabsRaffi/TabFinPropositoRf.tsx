import {
    Grid,
  } from "@mui/material";
  import './CapturaRaffi.css';
  import React from 'react';

  
const TablePage = () => {
  const data = {
    columns: [
      {
        label: '#',
        field: 'id',
        sort: 'asc'
      },
      {
        label: 'Heading',
        field: 'heading0',
        sort: 'asc'
      },
      {
        label: 'Heading',
        field: 'heading1',
        sort: 'asc'
      },
      {
        label: 'Heading',
        field: 'heading2',
        sort: 'asc'
      },
      {
        label: 'Heading',
        field: 'heading3',
        sort: 'asc'
      },
      {
        label: 'Heading',
        field: 'heading4',
        sort: 'asc'
      },
      {
        label: 'Heading',
        field: 'heading5',
        sort: 'asc'
      },
      {
        label: 'Heading',
        field: 'heading6',
        sort: 'asc'
      },
      {
        label: 'Heading',
        field: 'heading7',
        sort: 'asc'
      },
      {
        label: 'Heading',
        field: 'heading8',
        sort: 'asc'
      }
    ],
    rows: [
      {
        'id': 1,
        'heading0': 'Cell',
        'heading1': 'Cell',
        'heading2': 'Cell',
        'heading3': 'Cell',
        'heading4': 'Cell',
        'heading5': 'Cell',
        'heading6': 'Cell',
        'heading7': 'Cell',
        'heading8': 'Cell'
      },
      {
        'id': 2,
        'heading0': 'Cell',
        'heading1': 'Cell',
        'heading2': 'Cell',
        'heading3': 'Cell',
        'heading4': 'Cell',
        'heading5': 'Cell',
        'heading6': 'Cell',
        'heading7': 'Cell',
        'heading8': 'Cell'
      },
      {
        'id': 3,
        'heading0': 'Cell',
        'heading1': 'Cell',
        'heading2': 'Cell',
        'heading3': 'Cell',
        'heading4': 'Cell',
        'heading5': 'Cell',
        'heading6': 'Cell',
        'heading7': 'Cell',
        'heading8': 'Cell'
      }
    ]
  };

  


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
   
      </Grid>
    );
  
};
  