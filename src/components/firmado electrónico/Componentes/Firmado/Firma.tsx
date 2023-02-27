import { Box, Typography } from "@mui/material";
import QRCode from "react-qr-code";

export const Firma = ({
  show,
  nombreDoc,
  nombre,
  asunto,
  id,
  url,
  date,
}: {
  show: boolean;
  nombreDoc: string;
  nombre: string;
  asunto: string;
  id: string;
  url: string;
  date: string;
}) => {
  const qr = `http://10.200.4.199:3000/validador?Id=${id}`;

  function downLoadDoc() {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${nombreDoc}-firmado.pdf`);
    document.body.appendChild(link);
    link.click();
  }

  return (
    <Box
      visibility={show ? "visible" : "hidden"}
      position="absolute"
      sx={{
        width: {
          xs: "64%",
          sm: "44.3%",
          md: "46.5%",
          lg: "39.7%",
          xl: "35%",
        },
        height: "50%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: {
            xs: "0.6rem",
            sm: "0.8rem",
            md: "1rem",
            lg: "1rem",
            xl: "1.5rem",
          },
          fontFamily: "MontserratBold",
          textAlign: "center",
        }}
      >
        El documento se ha firmado con éxito con los siguientes datos
      </Typography>
      <Box
        sx={{
          height: "80%",
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr",
            md: "4fr 1fr",
            lg: "4fr 1fr",
            xl: "4fr 1fr",
          },
          alignItems: "center",
          justifyItems: "center",
          border: "2px solid black",
          boxShadow: 10,
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            width: ".3vw",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,.5)",
            outline: "1px solid slategrey",
            borderRadius: 10,
          },
        }}
      >
        <Box sx={{ p: 1 }}>
          <Typography
            sx={{
              fontSize: {
                xs: "50%",
                sm: "60%",
                md: "60%",
                lg: "70%",
                xl: "100%",
              },
              fontFamily: "MontserratMedium",
            }}
          >
            <strong> REFERENCIA DEL DOCUMENTO:</strong> Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Ipsum exercitationem consequuntur
            nulla debitis autem. Tempora, autem magnam in, repellat facilis
            unde, doloremque excepturi temporibus obcaecati ullam quos! Dolorum,
            assumenda ex.
            {nombre || ""}
          </Typography>

          <Typography
            sx={{
              fontSize: {
                xs: "50%",
                sm: "60%",
                md: "60%",
                lg: "70%",
                xl: "100%",
              },
              fontFamily: "MontserratMedium",
            }}
          >
            <strong> TIPO DE DOCUMENTO: </strong>Lorem ipsum dolor
            {nombre || ""}
          </Typography>

          <Typography
            sx={{
              fontSize: {
                xs: "50%",
                sm: "60%",
                md: "60%",
                lg: "70%",
                xl: "100%",
              },
              fontFamily: "MontserratMedium",
            }}
          >
            <strong> FECHA DEL DOCUMENTO: </strong>Lorem ipsum dolor sit
            {nombre || ""}
          </Typography>

          <Typography
            sx={{
              fontSize: {
                xs: "50%",
                sm: "60%",
                md: "60%",
                lg: "70%",
                xl: "100%",
              },
              fontFamily: "MontserratMedium",
            }}
          >
            <strong> FIRMADO DIGITALMENTE POR: </strong>Lorem ipsum dolor sit
            amet consectetur
            {nombre || ""}
          </Typography>

          <Typography
            sx={{
              fontSize: {
                xs: "50%",
                sm: "60%",
                md: "60%",
                lg: "70%",
                xl: "100%",
              },
              fontFamily: "MontserratMedium",
            }}
          >
            <strong> ASUNTO: </strong> Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Ipsum exercitationem consequuntur nulla debitis
            autem. Tempora, autem magnam in, repellat facilis unde, doloremque
            excepturi temporibus obcaecati ullam quos! Dolorum, assumenda ex.
            {asunto || ""}
          </Typography>

          <Typography
            sx={{
              fontSize: {
                xs: "50%",
                sm: "60%",
                md: "60%",
                lg: "70%",
                xl: "100%",
              },
              fontFamily: "MontserratMedium",
            }}
          >
            <strong> FECHA DE FIRMADO: </strong>Lorem ipsum dolor sit
            {date}
          </Typography>

          <Typography
            sx={{
              fontSize: {
                xs: "50%",
                sm: "60%",
                md: "60%",
                lg: "70%",
                xl: "100%",
              },
              fontFamily: "MontserratMedium",
            }}
          >
            <strong> ID DEL DOCUMENTO FIRMADO: </strong>
            {id}
          </Typography>
        </Box>

        <Box
          sx={{
            mr: {
              xs: 0,
              sm: 2,
              md: 2,
              lg: 4,
              xl: 6,
            },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <QRCode
            value={qr}
            size={150}
            bgColor="#fff"
            fgColor="#000"
            level="H"
          />
        </Box>
        <Box
          sx={{
            gridColumn: {
              xs: 0,
              sm: 0,
              md: "1/3",
              lg: "1/3",
              xl: "1/3",
            },
            width: {
              xs: "50%",
              sm: "30%",
              md: "30%",
              lg: "30%",
              xl: "30%",
            },
            height: {
              xs: "80%",
              sm: "55%",
              md: "55%",
              lg: "55%",
              xl: "30%",
            },
            backgroundColor: "lightGrey",
            color: "black",
            "&:hover": { backgroundColor: "Grey", color: "white" },
            cursor: "pointer",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            m: 1,
          }}
          onClick={() => {
            downLoadDoc();
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: "40%",
                sm: "45%",
                md: "50%",
                lg: "60%",
                xl: "80%",
              },
              fontFamily: "MontserratMedium",
            }}
          >
            DESCARGAR DOCUMENTO FIRMADO
          </Typography>
        </Box>
        {/* <Box
            sx={{
              width: "30%",
              height: "50%",
              backgroundColor: "#b0d9ff",
              color: "black",
              "&:hover": { backgroundColor: "#54adff", color: "white" },
              cursor: "pointer",
              display: "flex",
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
              m: 1,
            }}
          >
            <Typography
              onClick={() =>
                window.open(`http://10.200.4.199:3001/tabla`, "blank")
              }
              sx={{
                cursor: "pointer",
                fontSize: "80%",
                fontFamily: "MontserratMedium",
              }}
            >
              VER MIS DOCUMENTOS FIRMADOS
            </Typography>
          </Box> */}
      </Box>
    </Box>
  );
};
