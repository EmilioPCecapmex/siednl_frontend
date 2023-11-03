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
    <Grid
      container
      sx={{
        // display: "flex",
        //
        //width: "100vw",
        //height: "100%",
        justifyContent: "space-between",
        
        
        // alignItems: "center",
      }}
    >
      <Grid
        container
        item
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        sx={{
          width: "75vw",
          display: "flex",
          
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{
            fontFamily: "MontserratBold",
            fontSize: "1.5vw",
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

      {/* <Grid
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
        <Grid sx={{ ml: ".5vw", width: "2vw" }}>
          <NotificationsPanel />
        </Grid>
        <Grid sx={{ backgroundColor: "#ccc", width: ".5%", height: "100%" }} />
        <Grid
          sx={{
            width: "2vw",
          }}
        >
          <TimerCounter />
        </Grid>
        <Grid sx={{ backgroundColor: "#ccc", width: ".5%", height: "100%" }} />
        <Grid sx={{ mr: ".5vw", width: "2vw" }}></Grid>
      </Grid> */}
      <TimerCounter />
    </Grid>
  );
};
