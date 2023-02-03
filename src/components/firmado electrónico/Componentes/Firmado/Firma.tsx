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
        width: "25%",
        height: "50%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: "0.9vw",
          fontFamily: "MontserratBold",
          textAlign: "center",
        }}
      >
        SECRETARÍA DE FINANZAS Y TESORERÍA GENERAL DEL ESTADO DE NUEVO LEÓN
      </Typography>
      <Box
        sx={{
          display: "grid",
          height: "30vh",
          gridTemplateColumns: "1fr",
          border: "2px solid black",
          boxShadow: 10,
        }}
      >
        <Box
          sx={{
            p: 2,
            width: "90%",
            borderRight: "2px solid black",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "flex-start",
          }}
        >
          <Typography
            sx={{
              fontSize: "0.7vw",
              fontFamily: "MontserratMedium",
            }}
          >
            <strong> FIRMADO DIGITALMENTE POR: </strong>
            {nombre || ""}
          </Typography>

          <Typography
            sx={{
              fontSize: "0.7vw",
              fontFamily: "MontserratMedium",
            }}
          >
            <strong> ASUNTO: </strong>
            {asunto || ""}
          </Typography>

          <Typography
            sx={{
              fontSize: "0.7vw",
              fontFamily: "MontserratMedium",
            }}
          >
            <strong> FECHA DE FIRMADO: </strong>
            {date}
          </Typography>

          <Typography
            sx={{
              fontSize: "0.7vw",
              fontFamily: "MontserratMedium",
            }}
          >
            <strong> ID DEL DOCUMENTO FIRMADO: </strong>
            {id}
          </Typography>
        </Box>

        <Box
          sx={{
            ml: 2,
            mr: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <QRCode
            value={qr}
            size={100}
            bgColor="#fff"
            fgColor="#000"
            level="H"
          />
        </Box>

        <Box
          sx={{
            gridColumn: "1/3",
            border: "2px solid black",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "50%",
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
            onClick={() => {
              downLoadDoc();
            }}
          >
            <Typography
              sx={{
                fontSize: "70%",
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
    </Box>
  );
};
