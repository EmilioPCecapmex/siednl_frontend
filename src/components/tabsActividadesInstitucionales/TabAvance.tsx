import { useState } from "react";
import {
  TextField,
  Box,
  Typography,
  List,
  Divider,
  ListItemButton,
  Autocomplete,
  FormControl,
} from "@mui/material";
import { IAccion1 } from "./IAccion1";

export function TabAvance({ show }: { show: boolean }) {
  return (
    <Box
      visibility={show ? "visible" : "hidden"}
      position="absolute"
      sx={{
        width: "75vw",
        height: "77vh",
        justifyContent: "center",
        alignItems: "center",
        justifyItems: "center",
        backgroundColor: "#fff",
        boxShadow: 20,
        borderRadius: 5,
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
        }}
      >
        

       
      </Box>
    </Box>
  );
}

export default TabAvance;

