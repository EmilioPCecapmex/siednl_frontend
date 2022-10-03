import { Box } from "@mui/material";
import React, { useState } from "react";
import { sessionUntil } from "../../funcs/validation";

export const TimerCounter = () => {
  const session = new Date(sessionUntil);
  const [actualDate, setActualDate] = useState(new Date());
  const [rest, setRest] = useState(0);

  setTimeout(() => {
    setActualDate(new Date());
    setRest(session.getTime() - actualDate.getTime());
  }, 1000);

  return (
    <Box
      sx={{
        fontFamily: "MontserratMedium",
        fontSize: ".8vw",
        width: "2vw",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#B70000",
      }}
    >
      {Math.round(rest / 1000 / 60).toString() +
        ":" +
        Math.round((rest / 1000) % 60).toString()}
    </Box>
  );
};
