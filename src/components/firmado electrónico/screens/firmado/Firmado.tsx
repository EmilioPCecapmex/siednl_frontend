import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { Credenciales } from "../../Componentes/Firmado/Credenciales";
import { Documento } from "../../Componentes/Firmado/Documento";
import { Firma } from "../../Componentes/Firmado/Firma";
import axios from "axios";
import { ICCP } from "../../Componentes/DialogCCP";
import { LateralMenu } from "../../../lateralMenu/LateralMenu";
import { Header } from "../../../header/Header";

const steps = ["Credenciales", "Documento", "Firma"];

export const Firmado = () => {
  const [activeStep, setActiveStep] = useState(0);

  const [valido1, setValido1] = useState(false);
  const [valido2, setValido2] = useState(false);

  const [ccp, setCcp] = useState<Array<ICCP>>([
    {
      nombre: "",
      puesto: "",
      correo: "",
    },
  ]);

  const handleNext = () => {
    if (activeStep < 2) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      postCcp();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const fncSetCcp = (values: Array<ICCP>) => {
    setCcp(values);
  };

  const postCcp = () => {
    ccp.map((value) => {
      axios
        .post("http://10.200.4.105:8500/api/ccp", {
          params: {
            Nombre: value.nombre,
            Puesto: value.puesto,
            Correo: value.correo,
          },
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        })
        .then((r) => {
          if (r.status === 200) {
          }
        });
    });
  };

  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [cerFile, setCerFile] = useState("");
  const [keyFile, setKeyFile] = useState("");
  const [reason, setReason] = useState("");
  const [id, setId] = useState("");
  const [url, setUrl] = useState("");
  const [nombreDoc, setNombreDoc] = useState("");
  const [date, setDate] = useState("");

  const [noSerie, setNoSerie] = useState("");

  const [rfc, setRfc] = useState("");

  useEffect(() => {
    setId(uuidv4());
  }, []);

  useEffect(() => {
    if (valido1) {
      if (activeStep < 2) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else if (valido2) {
      if (activeStep < 2) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
  }, [valido1, valido2]);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        backgroundColor: "#F2F2F2",
      }}
    >
      <LateralMenu selection={8} actionNumber={0} />
      <Header
        details={{
          name1: "Inicio",
          path1: "../home",
          name2: "Firma Electrónica",
          path2: "../firmado",
          name3: "",
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "85%",
          height: "92%",
          mt: "8vh",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "45%",
            height: "65%",
            backgroundColor: "white",
            boxShadow: 20,
            borderRadius: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", sm: "90%", md: "90%", lg: "80%", xl: "80%" },
            }}
          >
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                return (
                  <Step key={label} sx={{ display: "flex" }}>
                    <StepLabel
                      StepIconProps={{
                        sx: {
                          width: {
                            xs: "50%",
                            sm: "60%",
                            md: "80%",
                            lg: "80%",
                            xl: "100%",
                          },
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "MontserratBold",
                          fontSize: {
                            xs: "1.5vw",
                            sm: "1vw",
                            md: "0.9vw",
                            lg: "0.7vw",
                            xl: "0.8vw",
                          },
                        }}
                      >
                        {label}
                      </Typography>
                    </StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </Box>

          <Credenciales
            show={activeStep === 0 ? true : false}
            validado={setValido1}
            setRFC={setRfc}
            setNombre={setNombre}
            setPassword={setPassword}
            setKFile={setKeyFile}
            setCFile={setCerFile}
            setNoSerie={setNoSerie}
            noSerie={noSerie}
          ></Credenciales>
          <Documento
            validado={setValido2}
            show={activeStep === 1 ? true : false}
            setNombreDoc={setNombreDoc}
            fncSetCcp={fncSetCcp}
            nombre={nombre}
            password={password}
            keyFile={keyFile}
            cerFile={cerFile}
            setReason={setReason}
            id={id}
            setUrl={setUrl}
            Rfc={rfc}
            noSerie={noSerie}
            setDate={setDate}
          ></Documento>
          <Firma
            show={activeStep === 2 ? true : false}
            nombreDoc={nombreDoc}
            nombre={nombre}
            asunto={reason}
            id={id}
            url={url}
            date={date}
          ></Firma>

          <Box sx={{ display: "flex", flexDirection: "row" }}>
            {activeStep === 0 ? null : (
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{
                  mr: 1,
                  fontSize: {
                    xs: "60%",
                    sm: "60%",
                    md: "60%",
                    lg: "60%",
                    xl: "100%",
                  },
                }}
              >
                Atrás
              </Button>
            )}
            <Box />

            {activeStep === steps.length - 1 ? null : (
              <Button
                onClick={handleNext}
                disabled={
                  (activeStep === 0 && !valido1) ||
                  (activeStep === 1 && !valido2)
                }
                sx={{
                  mr: 1,
                  fontSize: {
                    xs: "60%",
                    sm: "60%",
                    md: "60%",
                    lg: "60%",
                    xl: "100%",
                  },
                }}
              >
                {"Siguiente"}
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
