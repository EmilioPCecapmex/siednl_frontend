import { useState, useEffect, useLayoutEffect } from "react";
import { Button, Typography, Box, IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

export const TutorialBox = ({
  initialState,
  endState,
}: {
  initialState: number;
  endState: number;
}) => {
  const [tutorialPosition, setTutorialPosition] = useState(initialState || 0);

  const [top, setTop] = useState("");
  const [right, setRight] = useState("");
  const [left, setLeft] = useState("");

  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  const [topArrow, setTopArrow] = useState(true);
  const [leftArrow, setLeftArrow] = useState(false);
  const [bottomArrow, setBottomArrow] = useState(false);

  const backButton = () => {
    if (tutorialPosition > initialState) {
      setTutorialPosition(tutorialPosition - 1);
    } else {
      setTutorialPosition(initialState);
    }
  };

  useEffect(() => {
    setTutorialPosition(initialState || 0);
  }, [initialState]);

  useEffect(() => {
    switch (tutorialPosition) {
      case 0:
        setTop("6.5vh");
        setRight("10.5vw");
        setLeft("");
        setTopArrow(true);
        setLeftArrow(false);
        setBottomArrow(false);
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
        setBottomArrow(false);

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
        setBottomArrow(false);

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
        setBottomArrow(false);

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
        setBottomArrow(false);

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
        setBottomArrow(false);

        setMessage(
          "Como usuario autorizador, podras enviar notificaciones a diferentes usuarios."
        );
        break;
      case 6:
        setTop("74vh");
        setRight("");
        setLeft("15vw");
        setTopArrow(false);
        setLeftArrow(true);
        setBottomArrow(true);

        setMessage(
          "El usuario autorizador puede acceder a información de los catálogos con opcion de añadir o modificar registros."
        );
        break;

      case 7:
        setTop("78vh");
        setRight("");
        setLeft("15vw");
        setTopArrow(false);
        setLeftArrow(true);
        setBottomArrow(true);

        setMessage(
          "¿Quieres cambiar tu contraseña? puedes hacerlo con esta opción."
        );

        break;
      //FINALIZA SECCIÓN 1
      case 8:
        setTop("6vh");
        setRight("");
        setLeft("14vw");
        setTopArrow(true);
        setLeftArrow(false);
        setBottomArrow(false);

        setMessage(
          "En la sección de MIR (Matriz Indicadora de Resultados) podras crear nuevas solicitudes y verificar el estado de MIRs anteriores."
        );

        break;

      case 9:
        setTop("25vh");
        setRight("");
        setLeft("37vw");
        setTopArrow(true);
        setLeftArrow(false);
        setBottomArrow(false);

        setMessage(
          "Filtra los registros ligados a tu usuario y/o institución."
        );
        break;

      case 10:
        setTop("34vh");
        setRight("33vw");
        setLeft("");
        setTopArrow(true);
        setLeftArrow(false);
        setBottomArrow(false);

        setMessage(
          "Existen 3 estados base de la MIR. En Captura, En Revisión y Autorizada."
        );
        break;

      case 11:
        setTop("21vh");
        setRight("23vw");
        setLeft("");
        setTopArrow(true);
        setLeftArrow(false);
        setBottomArrow(false);

        setMessage("Tu usuario cuenta con la función de crear nuevas MIR.");
        break;

      case 12:
        setTop("36vh");
        setRight("12vw");
        setLeft("");
        setTopArrow(true);
        setLeftArrow(false);
        setBottomArrow(false);

        setMessage(
          "Además, tendras posibilidad de modificar tus registros, eliminarlos y añadir comentarios."
        );
        break;

      case 13:
        setTop("7vh");
        setRight("");
        setLeft("12vw");
        setTopArrow(true);
        setLeftArrow(false);
        setBottomArrow(false);

        setMessage(
          "Envia notificaciones a los usuarios, dentro de la plataforma y a travez de correo electronico."
        );
        break;
      case 14:
        setTop("23vh");
        setRight("");
        setLeft("20vw");
        setTopArrow(true);
        setLeftArrow(false);
        setBottomArrow(false);

        setMessage(
          "Tienes la posibilidad de enviar notificaciones a usuarios especificos o de forma global."
        );
        break;

      case 15:
        setTop("50vh");
        setRight("");
        setLeft("20vw");
        setTopArrow(true);
        setLeftArrow(false);
        setBottomArrow(false);

        setMessage(
          "Solo agrega un titulo y cuerpo del mensaje. Marca la casilla inferior para enviar la notificacion por correo electronico."
        );
        break;
      case 16:
        setTop("36vh");
        setRight("");
        setLeft("50vw");
        setTopArrow(true);
        setLeftArrow(false);
        setBottomArrow(false);

        setMessage(
          "Revisa el historico de notificaciones enviadas y valida su estatus."
        );
        break;
      case 17:
        setTop("6vh");
        setRight("");
        setLeft("18vw");
        setTopArrow(true);
        setLeftArrow(false);
        setBottomArrow(false);

        setMessage(
          "Revisa, modifica, elimina y agrega registros a los diferentes catálogos usados en la plataforma."
        );
        break;
      case 18:
        setTop("82vh");
        setRight("");
        setLeft("43vw");
        setTopArrow(true);
        setLeftArrow(false);
        setBottomArrow(false);

        setMessage(
          "Accede directamente a los cátalogos mas relevantes. Podras encontrar mas opciones al seleccionar alguno de ellos."
        );
        break;
      case 19:
        setTop("50vh");
        setRight("");
        setLeft("41vw");
        setTopArrow(false);
        setLeftArrow(true);
        setBottomArrow(false);

        setMessage(
          "Dentro de esta lista puedes encontrar todos los catálogos disponibles."
        );
        break;
      case 20:
        setTop("38vh");
        setRight("");
        setLeft("50vw");
        setTopArrow(true);
        setLeftArrow(false);
        setBottomArrow(false);

        setMessage(
          "Filtra los resultados desplegados para cada uno de los catalogos"
        );
        break;
      case 21:
        setTop("38vh");
        setRight("21vw");
        setLeft("");
        setTopArrow(true);
        setLeftArrow(false);
        setBottomArrow(false);

        setMessage("Modifica y/o elimina registros del catálogo seleccionado.");
        break;
      case 22:
        setTop("13vh");
        setRight("");
        setLeft("30vw");
        setTopArrow(true);
        setLeftArrow(false);
        setBottomArrow(false);
        setMessage(
          "La MIR esta dividida en 4 pestañas. Encabezado, Fin / Proposito, Componentes y Actividades."
        );
        break;
      case 23:
        setTop("26vh");
        setRight("");
        setLeft("20vw");
        setTopArrow(true);
        setLeftArrow(false);
        setBottomArrow(false);
        setMessage(
          "Encontraras diferentes apartados de selección o escritura libre."
        );
        break;
      case 24:
        setTop("17vh");
        setRight("7vw");
        setLeft("");
        setTopArrow(true);
        setLeftArrow(false);
        setBottomArrow(false);
        setMessage(
          "Para el caso exclusivo de la MIR puedes descargar la plantilla de Excel y llenarla en tu PC."
        );
        break;
      case 25:
        setTop("29vh");
        setRight("27vw");
        setLeft("");
        setTopArrow(true);
        setLeftArrow(false);
        setBottomArrow(false);
        setMessage(
          "Una vez completa la plantilla de MIR puedes cargarla en el sistema y tener una prevalidación de la información."
        );
        break;
      case 26:
        setTop("42vh");
        setRight("");
        setLeft("18vw");
        setTopArrow(true);
        setLeftArrow(false);
        setBottomArrow(false);
        setMessage(
          "O si prefieres, puedes llenar la solicitud desde el sistema."
        );
        break;
      //FIN PROPOSITO
      case 27:
        setTop("40vh");
        setRight("");
        setLeft("30vw");
        setTopArrow(false);
        setLeftArrow(true);
        setBottomArrow(true);
        setMessage(
          "Navega entre las diferentes opciones del menú de opciones de la MIR."
        );
        break;
      //COMPONENTES MIR
      case 28:
        setTop("17vh");
        setRight("7.3vw");
        setLeft("");
        setTopArrow(true);
        setLeftArrow(false);
        setBottomArrow(false);
        setMessage("Agrega y/o elimina componentes para tu MIR.");
        break;
      case 29:
        setTop("40vh");
        setRight("");
        setLeft("30vw");
        setTopArrow(false);
        setLeftArrow(true);
        setBottomArrow(true);
        setMessage(
          "Navega entre las diferentes opciones del menú de opciones de la MIR."
        );
        break;
      //RESUMEN MIR
      case 30:
        setTop("13vh");
        setRight("27vw");
        setLeft("");
        setTopArrow(true);
        setLeftArrow(false);
        setBottomArrow(false);
        setMessage(
          "En esta pestaña encontraras el desglose de la información que se ha capturado para la MIR en curso."
        );
        break;
      case 31:
        setTop("28.3vh");
        setRight("");
        setLeft("12.5vw");
        setTopArrow(true);
        setLeftArrow(false);
        setBottomArrow(false);
        setMessage(
          "Como usuario autorizador puedes solicitar una modificación a la información de la MIR. Al seleccionar un campo este se habilitara para edición al usuario seleccionado."
        );
        break;
      case 32:
        setTop("77vh");
        setRight("0vw");
        setLeft("");
        setTopArrow(false);
        setLeftArrow(true);
        setBottomArrow(true);
        setMessage(
          "Cuentas con diversas opciones para almacenar la MIR como borrador, solicitar modificaciones o enviar para autorización."
        );
        break;
      //ACTIVIDADES MIR
      case 33:
        setTop("17vh");
        setRight("7.3vw");
        setLeft("");
        setTopArrow(true);
        setLeftArrow(false);
        setBottomArrow(false);
        setMessage(
          "Agrega y/o elimina actividades de tus componentes para tu MIR."
        );
        break;
      case 34:
        setTop("40vh");
        setRight("");
        setLeft("30vw");
        setTopArrow(false);
        setLeftArrow(true);
        setBottomArrow(true);
        setMessage(
          "Navega entre las diferentes opciones del menú de opciones de la MIR."
        );
        break;
      //MA inicio
      case 35:
        setTop("6vh");
        setRight("");
        setLeft("14vw");
        setTopArrow(true);
        setLeftArrow(false);
        setBottomArrow(false);

        setMessage(
          "En la sección de MA (Meta Anual) podras crear nuevas solicitudes y verificar el estado de las Metas Anuales anteriores."
        );

        break;

      case 36:
        setTop("25vh");
        setRight("");
        setLeft("37vw");
        setTopArrow(true);
        setLeftArrow(false);
        setBottomArrow(false);

        setMessage(
          "Filtra los registros ligados a tu usuario y/o institución."
        );
        break;

      case 37:
        setTop("36vh");
        setRight("42vw");
        setLeft("");
        setTopArrow(true);
        setLeftArrow(false);
        setBottomArrow(false);

        setMessage(
          "Existen 3 estados base de la Meta Anual. En Captura, En Revisión y Autorizada."
        );
        break;

      case 38:
        setTop("36vh");
        setRight("12vw");
        setLeft("");
        setTopArrow(true);
        setLeftArrow(false);
        setBottomArrow(false);

        setMessage(
          "Además, tendras posibilidad de agregar, modificar tus registros, eliminarlos y añadir comentarios a tus Metas Anuales."
        );
        break;
      //MA FIN PROPOSITO
      case 39:
        setTop("40vh");
        setRight("");
        setLeft("30vw");
        setTopArrow(false);
        setLeftArrow(true);
        setBottomArrow(true);
        setMessage(
          "Navega entre las diferentes opciones del menú de opciones de la Meta Anual."
        );
        break;
      case 40:
        setTop("40vh");
        setRight("");
        setLeft("30vw");
        setTopArrow(false);
        setLeftArrow(true);
        setBottomArrow(true);
        setMessage(
          "Navega entre las diferentes opciones del menú de opciones de la Meta Anual."
        );
        break;
      case 41:
        setTop("40vh");
        setRight("");
        setLeft("30vw");
        setTopArrow(false);
        setLeftArrow(true);
        setBottomArrow(true);
        setMessage(
          "Navega entre las diferentes opciones del menú de opciones de la Meta Anual."
        );
        break;
      //RESUMEN MA
      case 42:
        setTop("13vh");
        setRight("27vw");
        setLeft("");
        setTopArrow(true);
        setLeftArrow(false);
        setBottomArrow(false);
        setMessage(
          "En esta pestaña encontraras el desglose de la información que se ha capturado para la Meta Anual en curso."
        );
        break;
      case 43:
        setTop("28.3vh");
        setRight("");
        setLeft("12.5vw");
        setTopArrow(true);
        setLeftArrow(false);
        setBottomArrow(false);
        setMessage(
          "Como usuario autorizador puedes solicitar una modificación a la información de la Meta Anual. Al seleccionar un campo este se habilitara para edición al usuario seleccionado."
        );
        break;
      case 44:
        setTop("77vh");
        setRight("0vw");
        setLeft("");
        setTopArrow(false);
        setLeftArrow(true);
        setBottomArrow(true);
        setMessage(
          "Cuentas con diversas opciones para almacenar la Meta Anual como borrador, solicitar modificaciones o enviar para autorización."
        );
        break;
      //SECCIÓN FINAL
      default:
        break;
    }
  }, [tutorialPosition]);

  useLayoutEffect(() => {
    if (tutorialPosition === endState) {
      setShow(false);
      setTutorialPosition(initialState || 0);
    }
  }, [tutorialPosition]);

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          right: "3.7vw",
          top: "2.1vh",
          zIndex: 2,
        }}
      >
        <IconButton onClick={() => setShow(!show)}>
          <InfoIcon fontSize="medium" />
        </IconButton>
      </Box>
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
            alignItems={bottomArrow ? "flex-end" : "flex-start"}
            sx={{ display: "flex" }}
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
              {tutorialPosition === initialState ? null : (
                <Button color="error" onClick={() => backButton()}>
                  <Typography
                    sx={{ fontFamily: "MontserratSemiBold", fontSize: ".6vw" }}
                  >
                    Anterior
                  </Typography>
                </Button>
              )}

              <Button
                color="primary"
                onClick={() => setTutorialPosition(tutorialPosition + 1)}
              >
                <Typography
                  sx={{ fontFamily: "MontserratSemiBold", fontSize: ".6vw" }}
                >
                  {tutorialPosition + 1 === endState
                    ? "Finalizar"
                    : "Siguiente"}
                </Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export interface ITutorial {
  Inicio: number;
  MIR: number;
  MIRTabs: number;
  MetaAnual: number;
  MetaAnualTabs: number;
  FichaTecnica: number;
  ActividadesInst: number;
  Notificaciones: number;
  Configuracion: number;
  Usuarios: number;
}
