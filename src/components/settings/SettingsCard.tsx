import { Box, Button, Typography } from "@mui/material";
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
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "92vh",
      }}
    >
      <Box
        sx={{
          display: "grid",
          width: "70%",
          height: "60%",
          backgroundColor: "#fff",
          borderRadius: 5,
          boxShadow: 10,
          pt: 2,
          pb: 1,
          pl: 3,
          gridTemplateColumns: "repeat(4,1fr)",
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
                  fontSize: ".7vw",
                  color: "#000",
                }}
              >
                {item.label}
              </Typography>
            </Button>
          );
        })}
      </Box>
    </Box>
  );
};
