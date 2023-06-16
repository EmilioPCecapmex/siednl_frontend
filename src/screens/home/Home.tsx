import { Box } from "@mui/material";
import { Header } from "../../components/header/Header";
import { LateralMenu } from "../../components/lateralMenu/LateralMenu";
import escudo from "../../assets/logos/escudo.png";
import { TutorialBox } from "../../components/tutorialBox/tutorialBox";
import { WelcomeBox } from "../../components/tutorialBox/WelcomeBox";

export const Home = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "grid",
        backgroundColor: "#F2F2F2",
        gridTemplateAreas: `
                          'aside header'
                          'aside main'
                         `,
        alignItems: "start",
      }}
    >
      <Box gridArea={"aside"}>
        <LateralMenu selection={0} actionNumber={0} />
      </Box>

      <Box gridArea={"header"} sx={{ height: "8vh" }}>
        <Header
          details={{
            name1: "Inicio",
            path1: "../home",
            name2: "",
            path2: "#",
            name3: "",
          }}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center" }} gridArea={"main"}>
        {/* <TutorialBox initialState={0} endState={8} /> */}
        <WelcomeBox />
        <img src={escudo} alt="Escudo" style={{ width: "25vw" }} />
      </Box>
    </Box>
  );
};
