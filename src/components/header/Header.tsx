import { Typography, Grid, Breadcrumbs, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TimerCounter } from "../timer/TimerCounter";
import NotificationsPanel from "../notifications/NotificationsPanel";

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
    <>
      <Grid
        container
        item
        xl={10}
        lg={10}
        md={10}
        sm={10}
        xs={10}
        sx={{
          display: "flex",
          textAlign:"center",
          alignItems: "center",
        }}
      >
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{
            fontFamily: "MontserratBold",
            fontSize: ["4vw","3vw","3vw","1.5vw","1.5vw",],
            color: "white",
          }}
        >
          <Link
            underline="hover"
            color="white"
            onClick={() => navigate(details.path1)}
            sx={{ cursor: "pointer" }}
          >
            {details.name1}
          </Link>

          {details.name2 !== "" ? (
            <Link
              underline="hover"
              color="white"
              onClick={() => navigate(details.path2)}
              sx={{ cursor: "pointer" }}
            >
              {details.name2}
            </Link>
          ) : null}

          {details.name3 !== "" ? (
            <Typography
              //color="text.primary"
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
      </Grid>
      <TimerCounter />
    </>
  );
};
