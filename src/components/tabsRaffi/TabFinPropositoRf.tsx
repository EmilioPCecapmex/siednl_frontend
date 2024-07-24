import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Grid, TextField, Tooltip, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { queries } from "../../queries";
import { validarNumero } from "../../services/validations";
import { DialogFinPropositoRaffi } from "../formulasDialog/FormulaDialogRaffiFinProposito";
import { IMIR } from "../tabsMir/interfaces mir/IMIR";
import { IFinRF, IPropositoRF, IRFEdit } from "./interfacesRaffi";
import { clearInfo } from "../genericComponents/GenericMethods";

export function TabFinPropositoRF({
  edit,
  setRFFinPadre,
  setRFPropositoPadre,
  MIR,
  finRF,
  propositoRF,
  raffiboolean,
  MA,
}: {
  edit:boolean;
  setRFFinPadre: Function;
  setRFPropositoPadre: Function;
  MIR: string;
  finRF: IFinRF;
  propositoRF: IPropositoRF;
  RF: string;
  raffiboolean: IRFEdit;
  MA: string;
}) {
  const jsonMir: IMIR = JSON.parse(MIR) || "";
  let jsonMA =
    MA === ""
      ? ""
      : JSON.parse(MA).length > 1
      ? JSON.parse(MA)[0]
      : JSON.parse(MA);

  const [fin, setFin] = useState<IFinRF>(finRF);

  const [proposito, setProposito] = useState<IPropositoRF>(propositoRF);

  // Estados para almacenar las palabras a buscar en los TextField
  const [palabraABuscar1, setPalabraABuscar1] = useState(""); // Para Fin
  const [palabraABuscar2, setPalabraABuscar2] = useState(""); //Para Propostio
  const [unico, setUnico] = useState("");
  const [apartado, SetApartado] = useState("");

  const [openFormulaDialog, setOpenFormulaDialog] = useState(false);

  const handleClose = () => {
    setOpenFormulaDialog(false);
  };

  const handleClickOpen = () => {
    setOpenFormulaDialog(true);
  };

  const palabra = (texto: string) => {
    const palabrasABuscar: string[] = [
      "PORCENTAJE",
      "INDICE",
      "PROMEDIO",
      "TASA",
    ];

    for (const palabraABuscar of palabrasABuscar) {
      if (texto.toLowerCase().includes(palabraABuscar.toLowerCase())) {
        return palabraABuscar; // Devolver la palabra encontrada
      }
    }
    return "No existo"; // Devolver "No existo" si ninguna palabra se encontró
  };

  
  useEffect(() => {
    const palabraEncontrada1 = palabra(jsonMir.fin.indicador); // Buscar palabra en el primer texto
    const palabraEncontrada2 = palabra(jsonMir.proposito.indicador); // Buscar palabra en el segundo texto
    setPalabraABuscar1(palabraEncontrada1); // Almacenar la palabra encontrada en el primer estado
    setPalabraABuscar2(palabraEncontrada2); // Almacenar la palabra encontrada en el segundo estado
  }, []);

  useEffect(() => {
    setRFPropositoPadre(proposito);
  }, [proposito]);

  useEffect(() => {
    setRFFinPadre(fin);
  }, [fin]);

  const assignValue = (valor: string, elemento: string, tipo: string) => {
    switch (tipo) {
      case "FIN":
        switch (elemento) {
          case "PORCENTAJE":
            setFin({ ...fin, valorAvanceFisico: valor });
            break;
          case "INDICE":
            setFin({ ...fin, valorAvanceFisico: valor });
            break;
          case "PROMEDIO":
            setFin({ ...fin, valorAvanceFisico: valor });
            break;
          case "TASA":
            setFin({ ...fin, valorAvanceFisico: valor });
            break;
        }

        break;
      case "PROPOSITO":
        switch (elemento) {
          case "PORCENTAJE":
            setProposito({ ...proposito, valorAvanceFisico: valor });
            break;
          case "INDICE":
            setProposito({ ...proposito, valorAvanceFisico: valor });
            break;
          case "PROMEDIO":
            setProposito({ ...proposito, valorAvanceFisico: valor });
            break;
          case "TASA":
            setProposito({ ...proposito, valorAvanceFisico: valor });
            break;
        }
        break;
    }
  };
  
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  return (
    <>
      <Grid
        container
        sx={{
          width: "93vw",
          height: ["90vh", "82vh", "82vh", "82vh", "82vh"],
          justifyContent: "space-around",
          alignItems: "flex-start",
          backgroundColor: "#fff",
          ...(!isSmallScreen
            ? {boxShadow: 10,
              borderRadius: 5,}
            : {
                
              }),
          overflow: "auto",
        }}
      >
      
        <Grid
          item
          container
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          sx={{
         
            display: "flex",
          
            justifyContent: "flex-end",
            alignItems: "center",
          }}
         
        >
          <Tooltip title="RESUMEN COMPONENTE">
            <InfoOutlinedIcon
              onClick={() => {
               
              }}
              fontSize="large"
              sx={{ cursor: "pointer" }}
            ></InfoOutlinedIcon>
          </Tooltip>
          <Typography
            sx={{
              mr: "1vw",
              fontFamily: "MontserratSemiBold",
              fontSize: [10, 10, 10, 13, 15, 18],
            }}
          >
            FIN
          </Typography>

          <Tooltip title="RESUMEN COMPONENTE">
            <InfoOutlinedIcon
              onClick={() => {
              
              }}
              fontSize="large"
              sx={{ cursor: "pointer" }}
            ></InfoOutlinedIcon>
          </Tooltip>
          <Typography
            sx={{
              mr: "1vw",
              fontFamily: "MontserratSemiBold",
              fontSize: [10, 10, 10, 13, 15, 18],
            }}
          >
            PROPÓSITO
          </Typography>
        </Grid>

        <Grid
          item
          lg={5}
          sx={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography sx={{ ...queries.bold_text, width: "100%" }}>
            FIN
          </Typography>

          <Grid
            item
            lg={12}
            container
            direction={"column"}
            sx={{
              
              display: "flex",
              
              alignItems: "center",
              justifyContent: "center",
              boxShadow: 2,
              border: "1px solid #ccc",
              height: window.innerHeight >= 700 ? "45vh" : "35vh",
              "& > .MuiGrid-item": {
                marginBottom: "10px",
                marginTop: "10px",
               
              },
            }}
          >
            <Grid mt={{ lg: 2 }} mb={{ lg: 2 }} item lg={6}>
              <TextField
                disabled={edit && !raffiboolean?.fin?.añoAvanceFisico}
                fullWidth
                size="small"
                label="AÑO DEL AVANCE FÍSICO"
                value={fin.añoAvanceFisico}
                onChange={(c) => {
                  setFin({
                    ...fin,
                    añoAvanceFisico: validarNumero(
                      clearInfo(c.target.value),
                      fin.añoAvanceFisico
                    ),
                  });
                }}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
                InputProps={{
                 
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
              />
            </Grid>

            <Grid item mt={{ lg: 2 }} mb={{ lg: 2 }} lg={6}>
              <TextField
              
                fullWidth
                size="small"
               

                value={palabraABuscar1}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
                InputProps={{
                 
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
              />
            </Grid>

            <Typography sx={{ ...queries.bold_text, width: "100%", textAlign:"center"}}>
            META
          </Typography>

          <Grid item mt={{ lg: 2 }} mb={{ lg: 2 }} lg={6}>
              <TextField
                disabled={true}
                fullWidth
                size="small"
                
                value={jsonMA.fin.metaAnual}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
                InputProps={{
                  
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
              />
            </Grid>
            <Typography sx={{ ...queries.bold_text, width: "100%", textAlign:"center"}}>
            CAPTURA FIN
          </Typography>
            <Grid item mt={{ lg: 2 }} mb={{ lg: 2 }} lg={6}>
              <TextField
                disabled={edit && !raffiboolean?.fin?.valorAvanceFisico}
                fullWidth
                size="small"
                label="VALOR DEL AVANCE FÍSICO"
                onClick={(a) => {
                  SetApartado("FIN");
                  setUnico(palabraABuscar1);

                  handleClickOpen();
                }}
                value={fin.valorAvanceFisico}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
                InputProps={{
                  
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          lg={5}
          sx={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography sx={{ ...queries.bold_text, width: "100%" }}>
            PROPÓSITO
          </Typography>

          <Grid
            item
            lg={12}
            container
            direction={"column"}
            sx={{
             
              display: "flex",
            
              alignItems: "center",
              justifyContent: "center",
              boxShadow: 2,
              border: "1px solid #ccc",
              height: window.innerHeight >= 700 ? "45vh" : "35vh",
              "& > .MuiGrid-item": {
                marginBottom: "10px",
                marginTop: "10px",
                
              },
            }}
          >
            <Grid mt={{ lg: 2 }} mb={{ lg: 2 }} item lg={6}>
              <TextField
                disabled={edit && !raffiboolean?.proposito?.añoAvanceFisico}
                fullWidth
                size="small"
                label="AÑO DEL AVANCE FÍSICO"
                value={proposito.añoAvanceFisico}
                onChange={(c) => {
                  setProposito({
                    ...proposito,
                    añoAvanceFisico: validarNumero(
                      clearInfo(c.target.value),
                      proposito.añoAvanceFisico
                    ),
                  });
                }}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
                InputProps={{
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
              />
            </Grid>

            <Grid item mt={{ lg: 2 }} mb={{ lg: 2 }} lg={6}>
              <TextField
                fullWidth
                size="small"
                

                value={palabraABuscar2}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
                InputProps={{
                  readOnly: true,
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
              />
            </Grid>

            <Typography sx={{ ...queries.bold_text, width: "100%", textAlign:"center"}}>
            META
          </Typography>




            <Grid item mt={{ lg: 2 }} mb={{ lg: 2 }} lg={6}>
              <TextField
                disabled={true}
                fullWidth
                size="small"
                
                value={jsonMA.proposito.metaAnual}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
                InputProps={{
                  
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
              />
            </Grid>
          
            <Typography sx={{ ...queries.bold_text, width: "100%", textAlign:"center"}}>
            CAPTURA PROPÓSITO
          </Typography>



            <Grid item mt={{ lg: 2 }} mb={{ lg: 2 }} lg={6}>
              <TextField
                disabled={edit && !raffiboolean?.proposito?.valorAvanceFisico}
                fullWidth
                size="small"
                label="VALOR DEL AVANCE FÍSICO"
                onClick={(a) => {
                  SetApartado("PROPOSITO");
                  setUnico(palabraABuscar2);
                  handleClickOpen();
                }}
                value={proposito.valorAvanceFisico}
                InputLabelProps={{
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
                InputProps={{
                  
                  style: {
                    fontFamily: "MontserratMedium",
                  },
                }}
              />
            </Grid>
          </Grid>
        </Grid>

        <DialogFinPropositoRaffi
          open={openFormulaDialog}
          close={handleClose}
          elemento={unico}
          tipo={apartado}
          MA={MA}
          setValor={assignValue}
        />
      </Grid>
    </>
  );
}
