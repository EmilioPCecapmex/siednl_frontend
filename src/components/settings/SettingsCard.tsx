import { Box, Button, Typography } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';

export const SettingsCard = ({showConfig} : {showConfig: Function}) => {
  const navigate = useNavigate();

    const configOptions = [
        { id: 1, label: "Años Fiscales" },
        { id: 2, label: "Beneficiarios" },
        { id: 3, label: "Clasificaciones Programaticas" },
        { id: 4, label: "Dimensiones del Indicador" },
        { id: 5, label: "Ejes" },
        { id: 6, label: "Estrategias" },
        { id: 7, label: "Fechas de Captura" },
        { id: 8, label: "Formulas" },
        { id: 9, label: "Frecuencias" },
        { id: 10, label: "Instituciones" },
        { id: 11, label: "Lineas de Acción" },
        { id: 12, label: "Metas ODS" },
        { id: 13, label: "Modalidades" },
        { id: 14, label: "Objetivos" },
        { id: 15, label: "Objetivos DS" },
        { id: 16, label: "Objetivos PEENL" },
        { id: 17, label: "PED" },
        { id: 18, label: "Programas Presupuestarios" },
        { id: 19, label: "Roles" },
        { id: 20, label: "Tematicas" },
        { id: 21, label: "Tipos de Formula" },
        { id: 22, label: "Tipos de Indicador" },
        { id: 23, label: "Unidades de Medida" },
        { id: 24, label: "Usuarios" },
      ];

      const navigationOptions = (value: number, label: string) => {
        if(value === 24){
          navigate('../users')
        }else{
          showConfig(label);
        }
      }
  return (
    <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "92%",
          mt: "8vh",
        }}
      >
        <Box
          sx={{
            display: "grid",
            width: "70%",
            height: "60%",
            backgroundColor: '#fff',
            borderRadius: 5,
            boxShadow: 10,
            pt: 2,
            pb: 1,
            pl:3,
            gridTemplateColumns: "repeat(4,1fr)",
          }}
        >
         
          {configOptions.map((item) => {
            return (
                <Button
                  variant="text"
                  key={item.id}
                  onClick={() => navigationOptions(item.id, item.label)}
                  sx={{ width: "90%", height: "7vh", ":hover": {
                    backgroundColor: '#c4a55a'
                  }, 
                  background: 'linear-gradient(135deg, #E4E4E470 90%, #bbb 100%)',
                  
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
  )
}
