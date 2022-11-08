import React, { useState } from "react";
import {
  Badge,
  IconButton,
  Typography,
  Box,
  Breadcrumbs,
  Link,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/NotificationsNone";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";
import { TimerCounter } from "../timer/TimerCounter";
import NotificationsPanel from "../notifications/NotificationsPanel";
import { TutorialBox } from "../tutorialBox/tutorialBox";

interface BreadcrumbsDetails {
  name1: string;
  path1: string;
  name2: string;
  path2: string;
  name3: string;
}

export const Header = ({ details }: { details: BreadcrumbsDetails }) => {
  const navigate = useNavigate();

  const [helpBoxes, setHelpBoxes] = useState(false);

  const onClickHelp = () => {
    setHelpBoxes(!helpBoxes);
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "80vw",
        height: "8vh",
        justifyContent: "space-between",
        alignItems: "center",
        left: "19vw",
        position: "absolute",
      }}
    >
      <Box
        sx={{
          ml: "2vw",
          width: "30vw",
          height: "4vh",
        }}
      >
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{ fontFamily: "MontserratBold", fontSize: "1.5vw" }}
        >
          <Link
            underline="hover"
            color="inherit"
            onClick={() => navigate(details.path1)}
            sx={{ cursor: "pointer" }}
          >
            {details.name1}
          </Link>

          {details.name2 !== "" ? (
            <Link
              underline="hover"
              color="inherit"
              onClick={() => navigate(details.path2)}
              sx={{ cursor: "pointer" }}
            >
              {details.name2}
            </Link>
          ) : null}

          {details.name3 !== "" ? (
            <Typography
              color="text.primary"
              sx={{
                fontFamily: "MontserratMedium",
                fontSize: "1.5vw",
                cursor: "pointer",
              }}
            >
              {details.name3}
            </Typography>
          ) : null}
        </Breadcrumbs>
      </Box>

      <Box
        sx={{
          mr: "2vw",
          backgroundColor: "#fff",
          width: "10vw",
          height: "5vh",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: 10,
        }}
      >
        <Box sx={{ ml: ".5vw", width: "2vw" }}>
          <NotificationsPanel />
        </Box>
        <Box sx={{ backgroundColor: "#ccc", width: ".5%", height: "100%" }} />
        <Box
          sx={{
            width: "2vw",
          }}
        >
          <TimerCounter />
        </Box>
        <Box sx={{ backgroundColor: "#ccc", width: ".5%", height: "100%" }} />
        <Box sx={{ mr: ".5vw", width: "2vw" }}>
          {/* <IconButton onClick={() => onClickHelp()}>
            <InfoIcon fontSize="medium"/>
          </IconButton> */}
        </Box>
      </Box>
    </Box>
  );
};
