import React, { useEffect, useState } from "react";
import {
  FormControl,
  TextField,
  Box,
  Typography,
  Alert,
  Button,
  Autocomplete,
} from "@mui/material";
import axios from "axios";

export function TabFinProposito({ show }: { show: boolean }) {

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
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "1fr 1fr 1fr 2fr",
      }}
    >
    </Box>
  );
}

export default TabFinProposito;
