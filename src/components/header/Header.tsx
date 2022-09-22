import React from "react";
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
import { useNavigate } from "react-router-dom";


interface BreadcrumbsDetails {
  name1: string;
  path1: string;
  name2: string;
  path2: string;
  name3: string;
}

export const Header = ({ details }: { details: BreadcrumbsDetails }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        width: "87vw",
        height: "8vh",
        justifyContent: "space-between",
        alignItems: "center",
        left: "13vw",
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
          <Link underline="hover" color="inherit" onClick={() => navigate(details.path1)}>
            {details.name1}
          </Link>

          {details.name2 != "" ? (
            <Link underline="hover" color="inherit" onClick={() => navigate(details.path2)}>
              {details.name2}
            </Link>
          ) : null}

          {details.name3 != "" ? (
            <Typography
              color="text.primary"
              sx={{ fontFamily: "MontserratMedium", fontSize: "1.5vw" }}
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
          width: "6vw",
          height: "5vh",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: 10,
        }}
      >
        <Box sx={{ ml: ".5vw" }}>
          <IconButton>
            <Badge badgeContent={4} color="primary">
              <NotificationsIcon color="action" />
            </Badge>
          </IconButton>
        </Box>
        <Box
          sx={{ backgroundColor: "#ccc", width: ".5%", height: "100%" }}
        ></Box>
        <Box sx={{ mr: ".5vw" }}>
          <IconButton>
            <FullscreenIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};
