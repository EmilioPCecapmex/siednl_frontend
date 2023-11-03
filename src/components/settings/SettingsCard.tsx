import { Grid, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const SettingsCard = ({ showConfig }: { showConfig: Function }) => {
  const navigate = useNavigate();

  const configOptions = [
    { id: 1, label: "Años Fiscales" },
    { id: 2, label: "Beneficiarios" },
    { id: 3, label: "Clasificación Programática" },
    { id: 4, label: "Dimensiones del Indicador" },
    { id: 5, label: "Ejes" },
    { id: 6, label: "Ejes del Plan Nacional de Desarrollo" },
    { id: 7, label: "Estrategias" },
    { id: 8, label: "Fechas de Captura" },
    { id: 9, label: "Fórmulas" },
    { id: 10, label: "Frecuencias" },
    //{ id: 11, label: "Instituciones" },
    { id: 12, label: "Lineas de Acción" },
    { id: 13, label: "Metas ODS" },
    { id: 14, label: "Modalidades" },
    { id: 15, label: "Objetivos" },
    { id: 16, label: "Objetivos Desarrollo Sostenible" },
    {
      id: 17,
      label: "Objetivos del Plan Estrategico del Estado de Nuevo León",
    },
    { id: 18, label: "PED" },
    { id: 19, label: "Programas - Instituciones" },
    { id: 20, label: "Programas Presupuestarios" },
    { id: 21, label: "Temáticas" },
    { id: 22, label: "Tipos de Fórmula" },
    { id: 23, label: "Tipos de Indicador" },
    { id: 24, label: "Unidades de Medida" },
    { id: 25, label: "Usuarios" },
  ];

  const navigationOptions = (value: number, label: string) => {
    if (value === 25) {
      navigate("../users");
    } else {
      showConfig(label);
    }
  };
  return (

    <Grid
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "210vh",
      }}
    >
    <Grid
      container
      sx={{
        pt: 2,
        pb: 1,
        pl: 3,
        display: "grid",
        width: "93vw",
        height: "82vh",
        boxShadow: 10,
        borderRadius: 5,
        flexDirection: "column",
        backgroundColor: "#fff",
        overflow: "auto",
        "@media (max-width: 600px)": {
          gridTemplateColumns: "repeat(2,1fr)", // Pantalla extra pequeña (xs y sm)
        },

        "@media (min-width: 601px) and (max-width: 960px)": {
          gridTemplateColumns: "repeat(3,1fr)", // Pantalla pequeña (md)
        },

        "@media (min-width: 961px) and (max-width: 1280px)": {
          gridTemplateColumns: "repeat(4,1fr)", // Pantalla mediana (lg)
        },

        "@media (min-width: 1281px)": {
          gridTemplateColumns: "repeat(4,1fr)", // Pantalla grande (xl)
        },

        "@media (min-width: 2200px)": {
          gridTemplateColumns: "repeat(4,1fr)", // Pantalla grande (xl)
        },
      }}
    >
         
        {configOptions.map((item) => {
          return (
            <Button
              variant="text"
              key={item.id}
              onClick={() => navigationOptions(item.id, item.label)}
              sx={{
                width: "90%",
                height: "7vh",
                ":hover": {
                  backgroundColor: "#c4a55a",
                },
                background: "linear-gradient(135deg, #E4E4E470 90%, #bbb 100%)",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "MontserratMedium",
                  color: "#000",
                  "@media (max-width: 600px)": {
                    fontSize: "2vw", // Pantalla extra pequeña (xs y sm)
                  },
          
                  "@media (min-width: 601px) and (max-width: 960px)": {
                    fontSize: "1.5vw", // Pantalla pequeña (md)
                  },
          
                  "@media (min-width: 961px) and (max-width: 1280px)": {
                    fontSize: "1vw", // Pantalla mediana (lg)
                  },
          
                  "@media (min-width: 1281px)": {
                    fontSize: ".7vw", // Pantalla grande (xl)
                  },
          
                  "@media (min-width: 2200px)": {
                    fontSize: ".7vw", // Pantalla grande (xl)
                  },
                }}
              >
                {item.label}
              </Typography>
            </Button>
          );
        })}
        </Grid>
    
    </Grid>
  );
};
