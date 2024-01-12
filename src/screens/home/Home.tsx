import { Grid } from "@mui/material";
import { Header } from "../../components/header/Header";
import { LateralMenu } from "../../components/lateralMenu/LateralMenu";
import escudo from "../../assets/logos/escudo.png";
import { TutorialBox } from "../../components/tutorialBox/tutorialBox";
import { WelcomeBox } from "../../components/tutorialBox/WelcomeBox";

const estiloImagen = {
  width: "60%",
  height: "60%", // Valor predeterminado para pantallas menores de 600px
};

if (window.innerWidth >= 600) {
  estiloImagen.height = "60%";
  estiloImagen.width = "100%";
}

export const Home = () => {
  return (
    <Grid
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
       // background: "red",
      }}
      container
      direction="column"
      //overflow="auto"
    >
      <Grid sx={{height: "7vh",}} >
        <LateralMenu selection={""} actionNumber={0} />
      </Grid>

      <Grid
        item
        sx={{
          // height: "100%",
          height: "93vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* <TutorialBox initialState={0} endState={8} /> */}

        <img src={escudo} alt="Escudo" style={estiloImagen} />
      </Grid>
    </Grid>
  );
};

{
  /* <Grid gridArea={"header"} sx={{ height: "8vh" }}>
        <Header
          details={{
            name1: "Inicio",
            path1: "../home",
            name2: "",
            path2: "#",
            name3: "",
          }}
        />
      </Grid> */
}
