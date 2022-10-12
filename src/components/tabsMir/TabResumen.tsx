import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  Typography,
  TextField,
  Divider,
  List,
  ListItemButton,
} from "@mui/material";
import * as React from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import StarBorder from "@mui/icons-material/StarBorder";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import axios from "axios";

export function TabResumen({show,componentes}: {show: boolean;componentes: number[];}) {
  //
   //setComponentes(retornarComponentes());
  const [actividades, setActividades] = useState([1, 2, 3, 4, 5, 6]);

  const [componentSelect, setComponentSelect] = useState(1);
  const [activitySelect, setActivitySelect] = useState(1);

  const [openComponentes, setOpenComponentes] = useState(false);
  const [openActividades, setOpenActividades] = useState(false);

  return (
    <Box
      visibility={show ? "visible" : "hidden"}
      position="absolute"
      sx={{
        display: "flex",
        width: "75vw",
        height: "85vh",
        boxShadow: 10,
        borderRadius: 5,
        flexDirection: "row",
        backgroundColor: "#fff",
      }}
    >
      <Box>
        <List
        sx={{
          width: "10vw",
          height: "85vh",
          borderRight: "1px solid",
          display: "flex",
          flexDirection: "column",
          borderColor: "#BCBCBC",
          // overflow:'hidden',
          // overflowY:'scroll',
          // "&::-webkit-scrollbar": {
          //   width: ".3vw",
          // },
          // "&::-webkit-scrollbar-thumb": {
          //   backgroundColor: "rgba(0,0,0,.5)",
          //   outline: "1px solid slategrey",
          //   borderRadius: 10,
          // },
        }}
      >
        <ListItemButton
          key={100}
          selected={100 === componentSelect ? true : false}
          onClick={() => setComponentSelect(100)}
          sx={{
            "&.Mui-selected ": {
              backgroundColor: "#c4a57b",
            },
            "&.Mui-selected:hover": {
              backgroundColor: "#cbcbcb",
            },
          }}
        >
          <Typography sx={{ fontFamily: "MontserratMedium" }}>
            Encabezado
          </Typography>
        </ListItemButton>

        <Divider />

        <ListItemButton
          key={101}
          selected={101 === componentSelect ? true : false}
          onClick={() => setComponentSelect(101)}
          sx={{
            "&.Mui-selected ": {
              backgroundColor: "#c4a57b",
            },
            "&.Mui-selected:hover": {
              backgroundColor: "#cbcbcb",
            },
          }}
        >
          <Typography sx={{ fontFamily: "MontserratMedium" }}>Fin</Typography>
        </ListItemButton>

        <Divider />

        <ListItemButton
          key={102}
          selected={102 === componentSelect ? true : false}
          onClick={() => setComponentSelect(102)}
          sx={{
            "&.Mui-selected ": {
              backgroundColor: "#c4a57b",
            },
            "&.Mui-selected:hover": {
              backgroundColor: "#cbcbcb",
            },
          }}
        >
          <Typography sx={{ fontFamily: "MontserratMedium" }}>
            Proposito
          </Typography>
        </ListItemButton>

        <Divider />

        <ListItemButton
          key={103}
          selected={103 === componentSelect ? true : false}
          onClick={() => {
            setComponentSelect(103);
            setOpenComponentes(!openComponentes);
          }}
          sx={{
            fontFamily: "MontserratMedium",
            "&.Mui-selected ": {
              backgroundColor: "#c4a57b",
            },
            "&.Mui-selected:hover": {
              backgroundColor: "#cbcbcb",
            },
          }}
        >
          <ListItemText primary="Componentes" />
          {openComponentes ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openComponentes} timeout="auto" unmountOnExit>
          <List disablePadding>
            {componentes.map((item) => {
              return (
                <ListItemButton
                  selected={item === componentSelect ? true : false}
                  key={item}
                  onClick={() => {
                    setComponentSelect(item);
                  }}
                  sx={{
                    "&.Mui-selected ": {
                      backgroundColor: "#c4a57b",
                    },
                    "&.Mui-selected:hover": {
                      backgroundColor: "#cbcbcb",
                    },
                  }}
                >
                  <ListItemText primary={`Componente ${item}`} />
                 
                </ListItemButton>
              );
            })}
          </List>
        </Collapse>
      </List>
      </Box>
      
      <Box sx={{width:"65vw",}}>

        <Box>


        </Box>

        </Box>


      
      {componentes.map((item) => { 
        return(
          <Box>{componentes[item-1]}</Box>);})}
      
    </Box>
  );
}

export default TabResumen;
