import { Box, Typography } from "@mui/material";
import logo from "../../assets/logos/Coat_of_arms_of_Nuevo_Leon.svg";

export const ResumenFichaTecnica = () => {
  let show = 1;

  const sxSubtitleNormalSize = {
    width: "22vw",
    height: "3vh",
    backgroundColor: "#2FC5CE",
    display: "flex",
    alignItems: "center",
  };

  const headerTextsValue = [
    "GOBIERNO DEL ESTADO DE NUEVO LEÓN",
    "SECRETARÍA DE FINANZAS Y TESORERÍA GENERAL DEL ESTADO",
    "PRESUPUESTO POR RESULTADOS",
    "FICHA TECNICA DE INDICADORES 2022",
    "PROGRAMAS PRESUPUESTARIOS",
  ];

  const clasificacionProgramaticaValue = [
    "TEMA PED",
    "OBJETIVO PED",
    "CONAC",
    "TIPO BENEFICIARIO",
    "PROGRAMA",
  ];

  const titleColumnsNormalPag1Value = [
    "IDENTIFICACIÓN DEL PROGRAMA PRESUPUESTARIO:",
    "ALINEACIÓN A LA PLANEACIÓN DEL DESARROLLO",
    "ALINEACIÓN ODS",
  ];

  const subTitleColumnsNormalPag1Value = [
    "NOMBRE DEL PROGRAMA",
    "CLASIFICACIÓN PROGRAMÁTICA",
    "INSTITUCIÓN",
    "TIPO BENEFICIARIO",
    "BENEFICIARIO",
    "TEMA PED",
    "OBJETIVO PED",
    "ESTRATEGÍA PED",
    "PROGRAMA SECTORIAL",
    "OBJETIVO PROGRAMA SECTORIAL",
    "OBJETIVO ODS",
    "META ODS",
  ];

  const headerTypography = [];

  const clasificacionProgramaticaTypography = [];

  const titleColumnsNormalPag1Design = [];

  const Page1Content = [];

  //RECORRE EL ARREGLO PARA POSICIONAR LAS COSAS EN EL HEADER DE headerTextsValue
  for (let i = 0; i < 5; i++) {
    headerTypography.push(
      <Typography sx={{ fontFamily: "MontserratBold", textAlign: "center" }}>
        {headerTextsValue[i]}
      </Typography>
    );
  }

  //RECCORRE EL ARREGLO PARA POSICIONAR LOS ENCABEZADOS POR TEXTO DE clasificacionProgramaticaValue
  //FALTA RECORRER EL ARREGLO DE LOS VALORES DONDE SE POSICIONA DE VALOR
  for (let i = 0; i < 5; i++) {
    clasificacionProgramaticaTypography.push(
      <Box
        
      >
        <Box>
          <Typography>{clasificacionProgramaticaValue[i]}</Typography>
        </Box>
        <Box>
          <Typography>L</Typography>
        </Box>
      </Box>
    );
  }

  //RECORRE EL ARREGLO DE LOS TITULOS Y LES DA DISEÑO
  for (let i = 0; i < 3; i++) {
    titleColumnsNormalPag1Design.push(
      <Box
        sx={{
          ml: 8,
          width: "30vw",
          height: "5vh",
          display: "flex",
          justifyContent: "start",
        }}
      >
        <Typography sx={{ fontFamily: "MontserratBold", textAlign: "center" }}>
          {titleColumnsNormalPag1Value[i]}
        </Typography>
      </Box>
    );
  }

  //RECORRE EL ARREGLO DE LOS SUBTITULOS Y LES DA DISEÑO y USARA TERNARIOS PARA ACOMODAR TODO EL CONTENIDO
  for (let i = 0; i < 12; i++) {
    Page1Content.push(
      i === 0 ? (
        <>
          {titleColumnsNormalPag1Design[0]}
          <Box
            sx={{
              width: "62vw",
              height: "3vh",
              display: "flex",
              flexDirection: "row",
              ml: 7,
              mt: 1,
            }}
          >
            {/*ROW*/}
            <Box sx={sxSubtitleNormalSize}>
              <Typography sx={{ fontFamily: "MontserratSemiBold", ml: 2 }}>
                {subTitleColumnsNormalPag1Value[i]}
              </Typography>
            </Box>
            {/*ROW*/}
            <Box
              sx={{
                width: "40vw",
                height: "3vh",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontFamily: "MontserratRegular", ml: 3 }}>
                NOMBRE DE UN PROGRAMA MUY MUY MUY MUY MUY MUY EXTENSO
              </Typography>
            </Box>
          </Box>
        </>
      ) : i === 1 ? (
        //SE AGREGA DISEÑO DE CLASIFICACION PROGRAMATICA
        <Box
          sx={{
            width: "62vw",
            height: "8vh",
            display: "flex",
            flexDirection: "row",
            ml: 7,
            mt: 1,
          }}
        >
          {/*ROW*/}
          <Box
            sx={{
              width: "22vw",
              height: "8vh",
              backgroundColor: "#2FC5CE",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontFamily: "MontserratSemiBold", ml: 2 }}>
              {subTitleColumnsNormalPag1Value[i]}
            </Typography>
          </Box>
          {/*ROW*/}
          <Box
            sx={{
              width: "7vw",
              height: "8vh",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontFamily: "MontserratRegular", ml: 3 }}>
              L19E11339
            </Typography>
          </Box>
          {/*ROW*/}
          {clasificacionProgramaticaTypography}
        </Box>
      ) : i === 4 ? (
        <>
          {titleColumnsNormalPag1Design[1]}
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            {/*ROW*/}
            <Box sx={{ width: "", height: "", backgroundColor: "skyblue" }}>
              <Typography>{subTitleColumnsNormalPag1Value[i]}</Typography>
            </Box>
            {/*ROW*/}
            <Box>
              <Typography>SALUD</Typography>
            </Box>
          </Box>
        </>
      ) : i === 5 ? (
        //AMPLIAR TAMAÑO NORMAL OBJETIVO PED
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          {/*ROW*/}
          <Box sx={{ width: "", height: "", backgroundColor: "skyblue" }}>
            <Typography>{subTitleColumnsNormalPag1Value[i]}</Typography>
          </Box>
          {/*ROW*/}
          <Box>
            <Typography>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet
              aperiam assumenda, consectetur perferendis, ipsam iure neque atque
              ducimus exercitationem numquam eligendi suscipit ullam unde
              nesciunt eaque quas sapiente doloremque totam.
            </Typography>
          </Box>
        </Box>
      ) : i === 9 ? (
        <>
          {titleColumnsNormalPag1Design[2]}
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            {/*ROW*/}
            <Box sx={{ width: "", height: "", backgroundColor: "skyblue" }}>
              <Typography>{subTitleColumnsNormalPag1Value[i]}</Typography>
            </Box>
            {/*ROW*/}
            <Box>
              <Typography>SALUD Y BIENESTAR</Typography>
            </Box>
          </Box>
        </>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          {/*ROW*/}
          <Box sx={{ width: "", height: "", backgroundColor: "skyblue" }}>
            <Typography>{subTitleColumnsNormalPag1Value[i]}</Typography>
          </Box>
          {/*ROW*/}
          <Box>
            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </Typography>
          </Box>
        </Box>
      )
    );
  }
  return (
    <Box
      visibility={show ? "visible" : "hidden"}
      position="absolute"
      sx={{
        display: "flex",
        width: "75vw",
        height: "85vh",
        boxShadow: 10,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "#fff",
      }}
    >
      <Box
        sx={{
          width: "90%",
          border: 0.1,
          borderColor: "#909090",
          height: "80%",
          overflow: "auto",
          borderRadius: 1,
          "&::-webkit-scrollbar": {
            width: ".3vw",
            mt: 1,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,5)",
            outline: "1px solid slategrey",
            borderRadius: 1,
          },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "20vh",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* <Box sx={{}}>
         <img src={logo} alt="Logo" style={{ width:"3vw", height:"4vh"}} />
         </Box> */}

          <Box
            sx={{
              width: "30vw",
              height: "20vh",

              display: "flex",
              justifyContent: "center",
              alignItems: "end",
            }}
          >
            <Box
              sx={{
                width: "29vw",
                height: "15vh",

                display: "flex",
                flexDirection: "column",
              }}
            >
              {headerTypography}
            </Box>
          </Box>
        </Box>
        {/*COLUMN*/}
        {Page1Content}
        {/*COLUMN*/}
      </Box>
    </Box>
  );
};
