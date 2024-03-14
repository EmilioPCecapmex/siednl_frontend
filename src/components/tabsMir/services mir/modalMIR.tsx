import ListAltIcon from '@mui/icons-material/ListAlt';
import { useState } from "react";
import {
  Box,
  Tooltip,
  IconButton,
  Grid,
  Button,
  Paper,
  Dialog,
  DialogContent,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Typography,
} from "@mui/material";

export const MostrarLista = ({
   st
}: {
    st:string;
}) => {

    const steps = [
        {
          label: 'LABEL 1',
          description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
        },
        {
          label: 'LABEL 2',
          description:
            'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
        },
        {
          label: 'LABEL 3',
          description: `Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
        },
      ];
      const [activeStep, setActiveStep] = useState(0);

      const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      };
    
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };
    
      const handleReset = () => {
        setActiveStep(0);
      };
    
      const [open, setOpen] = useState(false);
      
    
      const handleClickOpen = () => {
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
      };
    return (
        
<Box>
<Tooltip title="LISTA">
  <span>
    <IconButton onClick={handleClickOpen}>
      <ListAltIcon
       sx={{
        fontSize: "24px", // Tamaño predeterminado del icono

        "@media (max-width: 600px)": {
          fontSize: 20, // Pantalla extra pequeña (xs y sm)
        },

        "@media (min-width: 601px) and (max-width: 960px)":
          {
            fontSize: 20, // Pantalla pequeña (md)
          },

          "@media (min-width: 961px) and (max-width: 1280px)": {
            fontSize: 20, // Pantalla mediana (lg)
          },

        "@media (min-width: 1281px)": {
          fontSize: 25, // Pantalla grande (xl)
        },

        "@media (min-width: 2200px)": {
          ffontSize: 25, // Pantalla grande (xl)
        },
      }}
      />
    </IconButton>
  </span>
</Tooltip>

<Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
  <DialogContent
    sx={{
      display: "flex",
      flexDirection: "column",
    }}
  >

            <Grid container sx={{ }}>

                <Grid item   container xs={12} sm={12} md={12} lg={12} sx={{}}>
                <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Último paso</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Grid sx={{ mb: 2 }}> 
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Terminar' : 'Continuar'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Atrás
                  </Button>
                </div>
              </Grid>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>Has finalizado todos los pasos</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
                </Grid>
            </Grid>
            <Button
                className="cancelar"
                variant="contained"
                onClick={handleClose}
              >
                <Typography
                  sx={{ fontFamily: "MontserratMedium",  }}
                >
                  Cerrar
                </Typography>{" "}
              </Button>
            </DialogContent>
      </Dialog>
    </Box>
    )
}


