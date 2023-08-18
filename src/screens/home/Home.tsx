import { Grid } from "@mui/material";
import { Header } from "../../components/header/Header";
import { LateralMenu } from "../../components/lateralMenu/LateralMenu";
import escudo from "../../assets/logos/escudo.png";
import { TutorialBox } from "../../components/tutorialBox/tutorialBox";
import { WelcomeBox } from "../../components/tutorialBox/WelcomeBox";

export const Home = () => {
  return (
    <Grid
      // sx={{
      //   width: "100vw",
      //   height: "100vh",
      //   display: "grid",
      //   backgroundColor: "#F2F2F2",
      //   gridTemplateAreas: `
      //                     'aside header'
      //                     'aside main'
      //                    `,
      //   alignItems: "start",
      // }}
      container direction="column"
    >
      <Grid>
        <LateralMenu selection={"Inicio"} actionNumber={0} />
      </Grid>

      {/* <Grid gridArea={"header"} sx={{ height: "8vh" }}>
        <Header
          details={{
            name1: "Inicio",
            path1: "../home",
            name2: "",
            path2: "#",
            name3: "",
          }}
        />
      </Grid> */}

      <Grid sx={{ display: "flex", justifyContent: "center" }} gridArea={"main"}>
        {/* <TutorialBox initialState={0} endState={8} /> */}
        <WelcomeBox />
        <img src={escudo} alt="Escudo" style={{ width: "25vw" }} />
      </Grid>
    </Grid>
  );
};
