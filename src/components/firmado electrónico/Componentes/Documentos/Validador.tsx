import { Box, TextField, Typography, Button } from "@mui/material";

export const Validador = ({
  id,
}: {
  id: string;
}) => {
  return (
    <Box
      sx={{
        width: "50%",
        height: "60%",
        backgroundColor: "white",
        boxShadow: 20,
        borderRadius: 5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          width: "90%",
          fontSize: "1.5vw",
          fontFamily: "MontserratBold",
        }}
      >
        VALIDADOR DE FIRMA ELECTRÓNICA
      </Typography>

      <Box
        sx={{
          width: "90%",
          height: "90%",
          borderRadius: 5,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "90%",
            height: "32vh",
            display: "grid",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontFamily: "MontserratBold" }}>
            Datos de la firma
          </Typography>
          <TextField
            disabled
            size="small"
            label={
              <Typography
                sx={{
                  fontSize: "100%",
                  fontFamily: "MontserratBold",
                }}
              >
                Id
              </Typography>
            }
            sx={{ width: "100%" }}
            value={id || ''}
          ></TextField>
          <TextField
            disabled
            size="small"
            label={
              <Typography
                sx={{
                  fontSize: "100%",
                  fontFamily: "MontserratBold",
                }}
              >
                Firmante
              </Typography>
            }
            sx={{ width: "100%" }}
          ></TextField>
          <TextField
            disabled
            size="small"
            label={
              <Typography
                sx={{
                  fontSize: "100%",
                  fontFamily: "MontserratBold",
                }}
              >
                Serie
              </Typography>
            }
            sx={{ width: "100%" }}
          ></TextField>
        </Box>

        <Box
          sx={{
            width: "90%",
            height: "32.1vh",
            display: "grid",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontFamily: "MontserratBold" }}>OCSP</Typography>
          <TextField
            disabled
            size="small"
            label={
              <Typography
                sx={{
                  fontSize: "100%",
                  fontFamily: "MontserratBold",
                }}
              >
                Dato
              </Typography>
            }
            sx={{ width: "100%" }}
          ></TextField>
          <TextField
            disabled
            size="small"
            label={
              <Typography
                sx={{
                  fontSize: "100%",
                  fontFamily: "MontserratBold",
                }}
              >
                Serie Respondedor
              </Typography>
            }
            sx={{ width: "100%" }}
          ></TextField>
          <TextField
            disabled
            size="small"
            label={
              <Typography
                sx={{
                  fontSize: "100%",
                  fontFamily: "MontserratBold",
                }}
              >
                Respondedor
              </Typography>
            }
            sx={{ width: "100%" }}
          ></TextField>
          <TextField
            disabled
            size="small"
            label={
              <Typography
                sx={{
                  fontSize: "100%",
                  fontFamily: "MontserratBold",
                }}
              >
                Emisor
              </Typography>
            }
            sx={{ width: "100%" }}
          ></TextField>
        </Box>

        <Box
          sx={{
            width: "100%",
            height: "20vh",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            justifyItems: "center",
          }}
        >
          <Typography sx={{ gridColumn: "1/3", fontFamily: "MontserratBold" }}>
            Datos
          </Typography>
          <TextField
            disabled
            size="small"
            label={
              <Typography
                sx={{
                  fontSize: "100%",
                  fontFamily: "MontserratBold",
                }}
              >
                Dato
              </Typography>
            }
            sx={{ width: "99%" }}
          ></TextField>
          <TextField
            disabled
            size="small"
            label={
              <Typography
                sx={{
                  fontSize: "100%",
                  fontFamily: "MontserratBold",
                }}
              >
                Valor
              </Typography>
              
            }
            sx={{ width: "99%" }}
          ></TextField>
          <TextField
            disabled
            size="small"
            label={
              <Typography
                sx={{
                  fontSize: "100%",
                  fontFamily: "MontserratBold",
                }}
              >
                Dato
              </Typography>
            }
            sx={{ width: "99%" }}
          ></TextField>
          <TextField
            disabled
            size="small"
            label={
              <Typography
                sx={{
                  fontSize: "100%",
                  fontFamily: "MontserratBold",
                }}
              >
                Valor
              </Typography>
              
            }
            sx={{ width: "99%" }}
          ></TextField>
          
        </Box>
        <Box
          sx={{
            width: "90%",
            height: "70%",
            display: "grid",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontFamily: "MontserratBold" }}>
            Obtener documento firmado
          </Typography>
          <TextField
            disabled
            size="small"
            label={
              <Typography
                sx={{
                  fontSize: "100%",
                  fontFamily: "MontserratBold",
                }}
              >
                Id del documento
              </Typography>
            }
            sx={{ width: "auto" }}
          ></TextField>
          <Button
            sx={{
              backgroundColor: "Grey",
              "&:hover": { backgroundColor: "green" },
              color: "white",
              width: "auto",
              fontSize: "50%",
              fontFamily: "MontserratBold",
            }}
          >
            Obtener documento firmado
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
