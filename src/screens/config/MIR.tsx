import React, { useState } from "react";
import Box from "@mui/material/Box";
import { LateralMenu } from "../../components/lateralMenu/LateralMenu";
import { Header } from "../../components/header/Header";

export const MIR = () => {
  const [showCards, setShowCards] = useState(true);

  const resetView = () => {
    setShowCards(true);
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        backgroundColor: "#F2F2F2",
      }}
    >
      <LateralMenu selection={2} settingsCard={resetView} />
      <Header
        details={{
          name1: "Inicio",
          path1: "../home",
          name2: "MIR",
          path2: "../MIR",
          name3: "",
        }}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "87%",
          height: "92%",
          mt: "8vh",
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{
            mt: "3vh",
            width: "70vw",
            height: "10vh",
            backgroundColor: "#fff",
            borderRadius: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: 1,
              borderRadius: 2,
              ml: "1vw",
              color: "#ccc",
            }}
          ></Box>
        </Box>

        {/* ----- */}
        <Box
          sx={{
            width: "70vw",
            height: "65vh",
            backgroundColor: "#fff",
            borderRadius: 5,
            display: "flex",
            alignItems: "center",
          }}
        ></Box>
      </Box>
    </Box>
  );
};
