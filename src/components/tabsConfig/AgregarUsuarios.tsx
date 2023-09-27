import { Button, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router";
// import { getToken } from from "./localStorage";
import { LateralMenu } from "../../components/lateralMenu/LateralMenu";
import './Iframe.css';

export const IFrame = ({
  baseURL,
  source,
}: {
  source: string;
  baseURL: string;
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    // getToken();
  }, []);

  if (!source) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* <Grid item width={"100%"}>
        <LateralMenu selection={"Usuarios"} actionNumber={0}/>
      </Grid> */}

      {/* <Grid
        display={"flex"}
        width={"100%"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
        height={"5vh"}
      >
        <Grid width={"100%"} display={"flex"}>
          <Grid width={"43%"} ml={2}>
            <Button
              sx={{
                backgroundColor: "#15212f",
                color: "white",
                "&&:hover": {
                  backgroundColor: "rgba(47, 47, 47, 0.4)",
                  color: "#000",
                },
                //fontSize: "90%",
                borderRadius: "0.8vh",
                textTransform: "capitalize",
                fontSize: "50%",
                "@media (min-width: 480px)": {
                  fontSize: "70%",
                },

                "@media (min-width: 768px)": {
                  fontSize: "80%",
                },
              }}
              onClick={() => navigate("../users")}
            >
              Volver
            </Button>
          </Grid>

          <Typography
            sx={{
              fontSize: "2.3ch",
              fontFamily: "MontserratBold",
              color: "#AF8C55",
              "@media (max-width: 600px)": {
                // XS (extra small) screen
                fontSize: "1rem",
              },
              "@media (min-width: 601px) and (max-width: 900px)": {
                // SM (small) screen
                fontSize: "1.5ch",
              },
            }}
          >
            Agregar Usuario
          </Typography>
        </Grid>
      </Grid> */}

      {/* <Grid width={"100%"} height={"85vh"}>
        <object
          style={{ width: "100%", height: "100%" }}
          data={String(baseURL) + String(source)}
          type="text/html"
          aria-label="Agregar Usuario"
        ></object>
        
      </Grid> */}
      {/* {String(baseURL) + String(source)} */}
      {/* <Grid
          container
          item
          sx={{
            display: "flex",
            width: "93vw",
            height: "82vh",
            boxShadow: 10,
            borderRadius: 5,
            flexDirection: "column",
            backgroundColor: "#fff",
          }}
        > */}
        
      <div className="contenedor">
      <iframe
        className="iframe"
        src={String(baseURL) + String(source)}
        title="Embedded PDF"
      ></iframe>
    </div>
    {/* </Grid> */}
    </>
  );
};

export default IFrame;
