import React from "react";
import {
  Badge,
  IconButton,
  Typography,
  Box,
  Breadcrumbs,
  Link,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import FullscreenIcon from "@mui/icons-material/Fullscreen";

interface BreadcrumbsDetails {
    name1: string;
    path1: string;
    name2: string;
    path2: string;
    name3: string;
}

export const Header = ({
  details,
}: {
  details: BreadcrumbsDetails;
}) => {
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
          <Link underline="hover" color="inherit" href={details.path1}>
            {details.name1}
          </Link>
          <Link underline="hover" color="inherit" href={details.path2}>
            {details.name2}
          </Link>
          <Typography color="text.primary">{details.name3}</Typography>
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
              <MailIcon color="action" />
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
