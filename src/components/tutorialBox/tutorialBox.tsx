import React, { useState, useEffect } from "react";
import {
  Button,
  Drawer,
  List,
  Divider,
  ListItem,
  Badge,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  ToggleButton,
} from "@mui/material";

export const TutorialBox = () => {
  const [tutorialPosition, setTutorialPosition] = useState(0);

  const [top, setTop] = useState("");
  const [right, setRight] = useState("");
  const [left, setLeft] = useState("");

  const [message, setMessage] = useState("");
  const [show, setShow] = useState(true);

  const [topArrow, setTopArrow] = useState(true);
  const [leftArrow, setLeftArrow] = useState(false);
  const [bottomArrow, setBottomArrow] = useState(false);


  useEffect(() => {
if(tutorialPosition === 8){
    setShow(false)
}
  },[tutorialPosition])

  useEffect(() => {
    switch (tutorialPosition) {
      case 0:
        setTop("6.5vh");
        setRight("10.5vw");
        setLeft("");
        setTopArrow(true);
        setLeftArrow(false);
        setBottomArrow(false)
        setMessage(
          "Dentro de este apartado podrás consultar las notificaciones pendientes del sistema."
        );
        break;
      case 1:
        setTop("6.5vh");
        setRight("7vw");
        setLeft("");
        setTopArrow(true);
        setLeftArrow(false);
        setBottomArrow(false)

        setMessage(
          "Al iniciar sesión, contaras con 45 minutos para realizar tus tareas. Una vez concluido este tiempo puedes renovar tu sesión."
        );
        break;
      case 2:
        setTop("6.5vh");
        setRight("3.5vw");
        setLeft("");
        setTopArrow(true);
        setLeftArrow(false);
        setBottomArrow(false)

        setMessage(
          "Tambien podras ocupar el 100% de tu pantalla para navegar por el sistema."
        );
        break;
      case 3:
        setTop("30vh");
        setRight("");
        setLeft("15vw");
        setTopArrow(false);
        setLeftArrow(true);
        setBottomArrow(false)

        setMessage(
          "Si tu usuario cuenta con acceso a mas de una institución, en esta sección podras navegar entre ellas."
        );
        break;

        case 4:
            setTop("40vh");
            setRight("");
            setLeft("15vw");
            setTopArrow(false);
            setLeftArrow(true);
            setBottomArrow(false)

            setMessage(
              "Accede a las diferentes opciones de los programas presupuestarios."
            );
            break;
            case 5:
                setTop("65vh");
                setRight("");
                setLeft("15vw");
                setTopArrow(false);
                setLeftArrow(true);
                setBottomArrow(false)

                setMessage(
                  "Como usuario administrador, podras enviar notificaciones a diferentes usuarios."
                );
                break;
                case 6:
                    setTop("74vh");
                    setRight("");
                    setLeft("15vw");
                    setTopArrow(false);
                    setLeftArrow(true);
                    setBottomArrow(true)

                    setMessage(
                      "El usuario administrador puede acceder a información de los catálogos con opcion de añadir o modificar registros."
                    );
                    break;

                    case 7:
                        setTop("78vh");
                        setRight("");
                        setLeft("15vw");
                        setTopArrow(false);
                        setLeftArrow(true);
                        setBottomArrow(true)
    
                        setMessage(
                          "¿Quieres cambiar tu contraseña? puedes hacerlo con esta opción."
                        );
                        break;

      default:
        break;
    }

    console.log(tutorialPosition);
  }, [tutorialPosition]);

  return (
    <Box
      visibility={show ? "visible" : "hidden"}
      sx={{
        backgroundColor: "#61616199",
        opacity: 10,
        width: "100vw",
        height: "100vh",
        position: "absolute",
        zIndex: 10,
        top: 0,
        left: 0,
      }}
    >
      <Box
              flexDirection={topArrow ? "column" : "row"}

        sx={{
          position: "absolute",
          top: top,
          bottom: null,
          right: right,
          left: left,
          zIndex: 1,
          width: "15vw",
          height: "15vh",
          display: "flex",
        }}
      >
        <Box
        justifyContent={topArrow ? "flex-end" : "flex-start"}
        width={topArrow ? "100%" : "6%"}
        alignItems={bottomArrow ? 'flex-end' : "flex-start"}
          sx={{ display: "flex"}}
        >
          {leftArrow ? (
            <Box
              sx={{
                width: 0,
                height: 0,
                backgroundColor: "transparent",
                borderStyle: "solid",
                borderTopWidth: 20,
                borderRightWidth: 20,
                borderBottomWidth: 20,
                borderLeftWidth: 0,
                borderTopColor: "transparent",
                borderRightColor: "#E1B264",
                borderBottomColor: "transparent",
                borderLeftColor: "transparent",
              }}
            />
          ) : null}

          {topArrow ? (
            <Box
              sx={{
                width: 0,
                height: 0,
                backgroundColor: "transparent",
                borderStyle: "solid",
                borderTopWidth: 0,
                borderRightWidth: 20,
                borderBottomWidth: 20,
                borderLeftWidth: 20,
                borderTopColor: "transparent",
                borderRightColor: "transparent",
                borderBottomColor: "#E1B264",
                borderLeftColor: "transparent",
              }}
            />
          ) : null}
        </Box>

        <Box
          sx={{
            width: "99%",
            height: "15vh",
            border: 1,
            borderColor: "#E1B264",
            borderStyle: "dashed",
            backgroundColor: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              fontFamily: "MontserratRegular",
              width: "90%",
              textAlign: "center",
              mt: "1vh",
              color: "#00004d",
              fontSize: ".7vw",
            }}
          >
            {message}
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
            <Button
              color="error"
              onClick={() => setTutorialPosition(tutorialPosition - 1)}
            >
              <Typography
                sx={{ fontFamily: "MontserratSemiBold", fontSize: ".6vw" }}
              >
                Anterior
              </Typography>
            </Button>
            <Button
              color="primary"
              onClick={() => setTutorialPosition(tutorialPosition + 1)}
            >
              <Typography
                sx={{ fontFamily: "MontserratSemiBold", fontSize: ".6vw" }}
              >
                {tutorialPosition === 7 ? "Finalizar" : "Siguiente"}
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
