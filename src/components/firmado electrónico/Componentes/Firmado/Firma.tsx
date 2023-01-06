import { Box, Typography } from "@mui/material";
import QRCode from "react-qr-code";

import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";

export const Firma = ({
  show,
  nombreDoc,
  nombre,
  asunto,
  id,
  url,
}: {
  show: boolean;
  nombreDoc: string;
  nombre: string;
  asunto: string;
  id: string;
  url: string;
}) => {
  const qr = `http://localhost:3001/documentos/?Id=${id}`;

  let today = new Date();
  let date = today.toLocaleDateString();
  let hour = today.toTimeString();

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
        height: "30%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
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
              fontFamily: "MontserratBold",
            }}
          >
            FIRMA ELECTRÓNICA SECRETARÍA DE FINANZAS Y TESORERÍA GENERAL DEL
            ESTADO
          </Typography>

          <Typography
            sx={{
              fontFamily: "MontserratBold",
            }}
          >
            ID: {id}
          </Typography>
        </Box>

        <Box sx={{ m: 2 }}>
          <QRCode
            value={qr}
            size={256}
            bgColor="#fff"
            fgColor="#000"
            level="H"
          />
        </Box>

        <Box sx={{ gridColumn: "1/3", border: "2px solid black", textAlign:'center'}}>
            <Link
              onClick={() => window.open(`../documentos/?Id=${id}`, "blank")}
              sx={{ cursor: "pointer", fontFamily:'MontserratBold' }}

            >
              Valida la firma aquí
            </Link>
        </Box>
        <Box
          sx={{
            gridColumn: "1/3",
            border: "2px solid black",
            display: "flex",
          }}
        >
          <Typography
            sx={{
              width: "4.5vw",
              fontSize: "100%",
              fontFamily: "MontserratBold",
              textTransform: "uppercase",
              mr: 2,
            }}
          >
            {nombre || ""}
          </Typography>

          <Box
            sx={{
              width: "15vw",
            }}
          >
            <Typography
              sx={{
                fontSize: "70%",
                fontFamily: "MontserratBold",
              }}
            >
              Digitally signed by {nombre || ""}
            </Typography>
            <Typography
              sx={{
                fontSize: "70%",
                fontFamily: "MontserratBold",
              }}
            >
              Date: {date + " " + hour}
            </Typography>
            <Typography
              sx={{
                fontSize: "70%",
                fontFamily: "MontserratBold",
              }}
            >
              Reason: {asunto || ""}
            </Typography>
          </Box>

          <Box
            sx={{
              width: "20%",
              backgroundColor: "#b0d9ff",
              color: "black",
              "&:hover": { backgroundColor: "#54adff", color: "white" },
              cursor: "pointer",
              display: "flex",
              textAlign: "center",
              alignItems: "center",
            }}
            onClick={() => {
              downLoadDoc();
            }}
          >
            <Typography
              sx={{
                fontSize: "90%",
                fontFamily: "MontserratMedium",
              }}
            >
              DESCARGAR DOCUMENTO FIRMADO
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
