import { Grid } from "@mui/material";
import { useState } from "react";
import ModalForm from "../../../components/ModalForm";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';


export const MostrarLista = ({
    handleClose
}: {
    handleClose: Function
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
    
    

    return (
        
<ModalForm title="LISTADO" handleClose={() => { handleClose() }}>
            <Grid container sx={{ width: "100vw", height: "92vh", display: "flex", justifyContent: "flex-end" }}>

                <Grid item   container xs={12} sm={12} md={12} lg={12} sx={{height:"90vh", display: "flex", justifyContent: "center",alignItems:"center"}}>
                <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
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
                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Grid>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
                </Grid>
            </Grid>
            </ModalForm>
    )
}


