import React from "react";
import { Box, Typography } from "@mui/material";

export const E404 = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "#F2F2F2",
      }}
    >
      <Typography sx={{ fontFamily: "MontserratBold", fontSize: "8vw" }}>
        404
      </Typography>

      <Typography sx={{ fontFamily: "MontserratSemiBold", fontSize: "4vw" }}>
        Pagina no encontrada
      </Typography>
    </Box>
  );
};
