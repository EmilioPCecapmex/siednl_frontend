import { useEffect, useState } from "react";
import {
  TextField,
  Box,
  Typography,
  List,
  ListItemButton,
  Divider,
  Pagination,
  Stack,
  IconButton,
} from "@mui/material";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

export function TabFinPropositoMA({
  show,
  resumenFin,
  resumenProposito,
  cargaFin,
  cargaProposito,
}: {
  show: boolean;
  resumenFin: Function;
  resumenProposito: Function;
  cargaFin: Array<IFin>;
  cargaProposito: Array<IProposito>;
}) {
  const [tabFin, setTabFin] = useState([
    {
      resumen: "",
      indicador: "",
      formula: "",
      frecuencia: "",
      medios: "",
      supuestos: "",
    },
  ]);

  const [tabProposito, setTabProposito] = useState([
    {
      resumen: "",
      indicador: "",
      formula: "",
      frecuencia: "",
      medios_verificacion: "",
      supuestos: "",
    },
  ]);

  const [fin, setFin] = useState({
    resumen: "",
    indicador: "",
    formula: "",
    frecuencia: "",
    medios: "",
    supuestos: "",
  });
  //Apartado que me interesa usar
  const [finMA, setFinMA] = useState({
    metaAnual: '',
    lineaBase: '',

    valorNumerador: "",
    valorDenominador: "",

    orden: "",

    unidadResponsable: "",
    descIndicador: "",
    descNumerador: "",
    descDenominador: "",
  });

  const [proposito, setProposito] = useState({
    resumen: "",
    indicador: "",
    formula: "",
    frecuencia: "",
    medios_verificacion: "",
    supuestos: "",
  });

  const [showFin, setShowFin] = useState(true);
  const [showProposito, setShowProposito] = useState(false);

  const [showPagina1, setShowPagina1] = useState(true);
  const [showPagina2, setShowPagina2] = useState(false);
  const [showPagina3, setShowPagina3] = useState(false);

  useEffect(() => {
    setTabFin([
      {
        resumen: fin.resumen,
        indicador: fin.indicador,
        formula: fin.formula,
        frecuencia: fin.frecuencia,
        medios: fin.medios,
        supuestos: fin.supuestos,
      },
    ]);
    setTabProposito([
      {
        resumen: proposito.resumen,
        indicador: proposito.indicador,
        formula: proposito.formula,
        frecuencia: proposito.frecuencia,
        medios_verificacion: proposito.medios_verificacion,
        supuestos: proposito.supuestos,
      },
    ]);
  }, [fin, proposito]);

  useEffect(() => {
    setFin({
      resumen: cargaFin[0]?.resumen,
      indicador: cargaFin[0]?.indicador,
      formula: cargaFin[0]?.formula,
      frecuencia: cargaFin[0]?.frecuencia,
      medios: cargaFin[0]?.medios,
      supuestos: cargaFin[0]?.supuestos,
    });

    setTimeout(() => {
      setProposito({
        resumen: cargaProposito[0]?.resumen,
        indicador: cargaProposito[0]?.indicador,
        formula: cargaProposito[0]?.formula,
        frecuencia: cargaProposito[0]?.frecuencia,
        medios_verificacion: cargaProposito[0]?.medios_verificacion,
        supuestos: cargaProposito[0]?.supuestos,
      });
    }, 1000);
  }, [cargaFin, cargaProposito]);

  useEffect(() => {
    resumenFin(tabFin);
    resumenProposito(tabProposito);
  }, [tabFin, tabProposito]);

  return (
    <Box
      visibility={show ? "visible" : "hidden"}
      position="absolute"
      sx={{
        display: "flex",
        width: "75vw",
        height: "77vh",
        boxShadow: 10,
        borderRadius: 5,
        flexDirection: "column",
        backgroundColor: "#fff",
      }}
    >
      {/*Este me sirve para mis botones de pagina 1 y 2*/}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          height: "7vh",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        {/* Botones Componentes */}
        <Typography
          sx={{
            mr: "1vw",
            fontFamily: "MontserratSemiBold",
            fontSize: "1.5vw",
          }}
        >
          {showFin ? "Fin" : null}
          {showProposito ? "Propósito" : null}

        </Typography>

      </Box>

      {/*box 2*/}
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",

        }}
      >
        <List
          //esto no me sirve para mis botones
          sx={{
            width: "10vw",
            height: "65vh",
            borderRight: "solid",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            borderColor: "#BCBCBC",
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
          {/* esto tampoco me sirve para mis botones*/}
          <Box
            sx={{
              height: "10vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",


            }}
          >
            <Divider />
            <ListItemButton
              selected={showFin}
              onClick={() => {
                setShowFin(!showFin);
                setShowProposito(false);
              }}
              sx={{
                "&.Mui-selected ": {
                  //esto cambia el color de los botones de fin y el de despues el de proposito entonces puede servirme
                  backgroundColor: "#c4a57b",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "#cbcbcb",

                },
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                Fin
              </Typography>
            </ListItemButton>

            <Divider />
          </Box>

          {/* esto tampoco me sirve para mis botones lo mismo de arriba como tal no me sirve pero podria usarlo para pintar mis botones*/}
          <Box
            sx={{
              height: "10vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",



            }}
          >
            <ListItemButton
              selected={showProposito}
              onClick={() => {
                setShowProposito(!showProposito);
                setShowFin(false);
              }}
              sx={{
                "&.Mui-selected ": {
                  backgroundColor: "#c4a57b",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "#cbcbcb",
                },
              }}
            >
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                Propósito
              </Typography>
            </ListItemButton>
            <Divider />
          </Box>

        </List>

        {showFin ? (
          <>
            {/*Aqui comienza el pedo*/}
            {showPagina1 ? (
              <>
                {/*Aqui esta lo que muestra el boton 1*/}
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    width: "90%",
                    alignItems: "center",
                    justifyItems: "center",
                    //backgroundColor: "red"


                  }}
                >

                  <TextField
                    rows={4}
                    disabled
                    multiline
                    sx={{ width: "90%", boxShadow: 2 }}
                    variant="filled"
                    InputLabelProps={{
                      style: {
                        fontFamily: "MontserratMedium",
                      },
                    }}
                    InputProps={{
                      style: {
                        fontFamily: "MontserratRegular",
                      },
                    }}
                    label={"Indicador"}
                    value={fin.indicador}
                  />
                  <TextField
                    rows={4}
                    disabled
                    multiline
                    variant="filled"
                    InputLabelProps={{
                      style: {
                        fontFamily: "MontserratMedium",
                      },
                    }}
                    InputProps={{
                      readOnly: true,
                      style: {
                        fontFamily: "MontserratRegular",
                      },
                    }}
                    sx={{ width: "90%", boxShadow: 2, }}
                    label={"Fórmula"}
                    value={fin.formula}

                  />

                  <TextField
                    rows={4}
                    disabled
                    multiline
                    variant="filled"
                    sx={{ width: "90%", boxShadow: 2 }}
                    label={"Frecuencia"}
                    InputLabelProps={{
                      style: {
                        fontFamily: "MontserratMedium",
                      },
                    }}
                    InputProps={{
                      style: {
                        fontFamily: "MontserratRegular",
                      },
                    }}
                    value={fin.frecuencia}
                  />
                  <TextField
                    rows={4}
                    multiline
                    variant="filled"
                    sx={{ width: "90%", boxShadow: 2 }}
                    label={"Meta Anual 2023"}
                    InputLabelProps={{
                      style: {
                        fontFamily: "MontserratMedium",

                      },
                    }}
                    InputProps={{
                      style: {
                        fontFamily: "MontserratRegular",
                      },
                    }}
                    error={parseInt(finMA.metaAnual) < 0 || parseInt(finMA.metaAnual) > 100 || isNaN(parseInt(finMA.metaAnual)) ? true : false}
                    helperText={
                      parseInt(finMA.metaAnual) < 0 || parseInt(finMA.metaAnual) > 100 || isNaN(parseInt(finMA.metaAnual)) ? "Valor debe ser entre 0 y 100 "
                        : null
                    }
                    onChange={(v) => setFinMA({ ...finMA, metaAnual: v.target.value })}
                    value={finMA.metaAnual}
                  />
                  <TextField
                    rows={4}
                    multiline
                    variant="filled"
                    sx={{ width: "90%", boxShadow: 2 }}
                    label={"Línea Base 2021"}
                    InputLabelProps={{
                      style: {
                        fontFamily: "MontserratMedium",
                      },
                    }}
                    InputProps={{
                      style: {
                        fontFamily: "MontserratRegular",
                      },
                    }}

                    error={parseInt(finMA.lineaBase) < 0 || parseInt(finMA.lineaBase) > 100 || isNaN(parseInt(finMA.lineaBase)) ? true : false}
                    helperText={
                      parseInt(finMA.lineaBase) < 0 || parseInt(finMA.lineaBase) > 100 || isNaN(parseInt(finMA.lineaBase)) ? "Valor debe ser entre 0 y 100 "
                        : null
                    }
                    onChange={(v) => setFinMA({ ...finMA, lineaBase: v.target.value })}
                    value={finMA.lineaBase}
                  />
                  <TextField
                    rows={4}
                    multiline
                    variant="filled"
                    sx={{ width: "90%", boxShadow: 2 }}
                    label={"Orden"}
                    InputLabelProps={{
                      style: {
                        fontFamily: "MontserratMedium",
                      },
                    }}
                    InputProps={{
                      style: {
                        fontFamily: "MontserratRegular",
                      },
                    }}
                    error={finMA.orden.toLowerCase() !== "ascendente" && finMA.orden !== "normal" && finMA.orden !== "descendente" ? true : false}
                    helperText={
                      finMA.orden.toLowerCase() !== "ascendente" && finMA.orden !== "normal" && finMA.orden !== "descendente" ? "Incluir tipo de orden: Ascendente, Descendente ó Normal. "
                        : null
                    }
                    onChange={(v) => setFinMA({ ...finMA, orden: v.target.value })}
                    value={finMA.orden}
                  />
                  {/* Aquu comienza la pagina 2*/}
                </Box >
              </>
            ) : null}
            {/*Aqui esta el box de los primeros textos de Fin acontinuacion pondre los de la pagina 2*/}



            {showPagina2 ? (
              <>
                {/*Aqui esta lo que muestra el boton 2*/}
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    width: "90%",
                    alignItems: "center",
                    justifyItems: "center",
                    //backgroundColor: "red"


                  }}
                >
                  {/*-----------------------Valor numerador falta logica para calculos----------------------------------*/}
                  <TextField
                    rows={4}
                    multiline
                    variant="filled"
                    sx={{ width: "90%", boxShadow: 2 }}
                    label={"Valor Numerador"}
                    InputLabelProps={{
                      style: {
                        fontFamily: "MontserratMedium",
                      },
                    }}
                    InputProps={{
                      style: {
                        fontFamily: "MontserratRegular",
                      },
                    }}


                    onChange={(v) => setFinMA({ ...finMA, valorDenominador: v.target.value })}
                    value={finMA.valorDenominador}
                  />

                  {/*---------------------------------------------------------*/}


                  {/*-----------------------VALOR DENOMINADOR falta logica para calculos----------------------------------*/}
                  <TextField
                    rows={4}
                    multiline
                    variant="filled"
                    sx={{ width: "90%", boxShadow: 2 }}
                    label={"Valor Denominador"}
                    InputLabelProps={{
                      style: {
                        fontFamily: "MontserratMedium",
                      },
                    }}
                    InputProps={{
                      style: {
                        fontFamily: "MontserratRegular",
                      },
                    }}


                    onChange={(v) => setFinMA({ ...finMA, valorNumerador: v.target.value })}
                    value={finMA.valorNumerador}
                  />

                  {/*---------------------------------------------------------*/}



                  <TextField
                    rows={4}
                    multiline
                    variant="filled"
                    sx={{ width: "90%", boxShadow: 2 }}
                    label={"Unidad Responsable"}
                    InputLabelProps={{
                      style: {
                        fontFamily: "MontserratMedium",
                      },
                    }}
                    InputProps={{
                      style: {
                        fontFamily: "MontserratRegular",
                      },
                    }}
                    onChange={(v) => setFinMA({ ...finMA, unidadResponsable: v.target.value })}
                    value={finMA.unidadResponsable}
                  />

                  <TextField
                    rows={4}
                    multiline
                    variant="filled"
                    sx={{ width: "90%", boxShadow: 2 }}
                    label={"Descripción del Indicador"}
                    InputLabelProps={{
                      style: {
                        fontFamily: "MontserratMedium",
                      },

                    }}
                    InputProps={{
                      style: {
                        fontFamily: "MontserratRegular",
                      },
                    }}
                    onChange={(v) => setFinMA({ ...finMA, descIndicador: v.target.value })}
                    value={finMA.descIndicador}
                  />
                  <TextField
                    rows={4}
                    multiline
                    variant="filled"
                    sx={{ width: "90%", boxShadow: 2 }}
                    label={"Descripción del Numerador "}
                    InputLabelProps={{
                      style: {
                        fontFamily: "MontserratMedium",
                      },
                    }}
                    InputProps={{
                      style: {
                        fontFamily: "MontserratRegular",
                      },
                    }}
                    onChange={(v) => setFinMA({ ...finMA, descNumerador: v.target.value })}
                    value={finMA.descNumerador}
                  />

                  <TextField
                    rows={4}
                    multiline
                    variant="filled"
                    sx={{ width: "90%", boxShadow: 2 }}
                    label={"Descripción del Denominador"}
                    InputLabelProps={{
                      style: {
                        fontFamily: "MontserratMedium",
                      },
                    }}
                    InputProps={{
                      style: {
                        fontFamily: "MontserratRegular",
                      },
                    }}

                    onChange={(v) => setFinMA({ ...finMA, descDenominador: v.target.value })}
                    value={finMA.descDenominador}
                  />
                  {/* Aquu comienza la pagina 2*/}
                </Box >
              </>
            ) : null}
          </>
        ) : null}




        {showProposito ? (
          <>
            {showPagina1 ? (
              <>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    width: "90%",
                    alignItems: "center",
                    justifyItems: "center",

                  }}
                >
                  <TextField
                    rows={4}
                    disabled
                    multiline
                    variant="filled"
                    sx={{ width: "90%", boxShadow: 2 }}
                    label={"Resumen Narrativo"}
                    InputLabelProps={{
                      style: {
                        fontFamily: "MontserratMedium",
                      },
                    }}
                    InputProps={{
                      style: {
                        fontFamily: "MontserratRegular",
                      },
                    }}
                    value={proposito.resumen}
                  />

                  <TextField
                    rows={4}
                    disabled
                    multiline
                    sx={{ width: "90%", boxShadow: 2 }}
                    variant="filled"
                    InputLabelProps={{
                      style: {
                        fontFamily: "MontserratMedium",
                      },
                    }}
                    InputProps={{
                      style: {
                        fontFamily: "MontserratRegular",
                      },
                    }}
                    label={"Indicador"}
                    value={proposito.indicador}
                  />
                  <TextField
                    rows={4}
                    disabled
                    multiline
                    variant="filled"
                    InputLabelProps={{
                      style: {
                        fontFamily: "MontserratMedium",
                      },
                    }}
                    InputProps={{
                      readOnly: true,
                      style: {
                        fontFamily: "MontserratRegular",
                      },
                    }}
                    sx={{ width: "90%", boxShadow: 2 }}
                    label={"Fórmula"}
                    value={proposito.formula}
                  />

                  <TextField
                    rows={4}
                    disabled
                    multiline
                    variant="filled"
                    sx={{ width: "90%", boxShadow: 2 }}
                    label={"Frecuencia"}
                    InputLabelProps={{
                      style: {
                        fontFamily: "MontserratMedium",
                      },
                    }}
                    InputProps={{
                      style: {
                        fontFamily: "MontserratRegular",
                      },
                    }}
                    value={proposito.frecuencia}
                  />
                  <TextField
                    rows={4}
                    disabled
                    multiline
                    variant="filled"
                    sx={{ width: "90%", boxShadow: 2 }}
                    InputLabelProps={{
                      style: {
                        fontFamily: "MontserratMedium",
                      },
                    }}
                    InputProps={{
                      style: {
                        fontFamily: "MontserratRegular",
                      },
                    }}
                    label={"Medios de Verificación"}
                    value={proposito.medios_verificacion}
                  />
                  <TextField
                    rows={4}
                    disabled
                    multiline
                    variant="filled"
                    sx={{ width: "90%", boxShadow: 2 }}
                    label={"Supuestos"}
                    InputLabelProps={{
                      style: {
                        fontFamily: "MontserratMedium",
                      },
                    }}
                    InputProps={{
                      style: {
                        fontFamily: "MontserratRegular",
                      },
                    }}
                    value={proposito.supuestos}
                  />
                </Box>
              </>
            ) : null}

            {showPagina2 ? (
              <>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    width: "90%",
                    alignItems: "center",
                    justifyItems: "center",

                  }}
                >

                  <TextField
                    rows={4}
                    multiline
                    variant="filled"
                    sx={{ width: "90%", boxShadow: 2 }}
                    label={"Meta Anual 2023"}
                    InputLabelProps={{
                      style: {
                        fontFamily: "MontserratMedium",

                      },
                    }}
                    InputProps={{
                      style: {
                        fontFamily: "MontserratRegular",
                      },
                    }}
                    error={parseInt(finMA.metaAnual) < 0 || parseInt(finMA.metaAnual) > 100 || isNaN(parseInt(finMA.metaAnual)) ? true : false}
                    helperText={
                      parseInt(finMA.metaAnual) < 0 || parseInt(finMA.metaAnual) > 100 || isNaN(parseInt(finMA.metaAnual)) ? "Valor debe ser entre 0 y 100 "
                        : null
                    }
                    onChange={(v) => setFinMA({ ...finMA, metaAnual: v.target.value })}
                    value={finMA.metaAnual}
                  />
                  <TextField
                    rows={4}
                    multiline
                    variant="filled"
                    sx={{ width: "90%", boxShadow: 2 }}
                    label={"Línea Base 2021"}
                    InputLabelProps={{
                      style: {
                        fontFamily: "MontserratMedium",
                      },
                    }}
                    InputProps={{
                      style: {
                        fontFamily: "MontserratRegular",
                      },
                    }}

                    error={parseInt(finMA.lineaBase) < 0 || parseInt(finMA.lineaBase) > 100 || isNaN(parseInt(finMA.lineaBase)) ? true : false}
                    helperText={
                      parseInt(finMA.lineaBase) < 0 || parseInt(finMA.lineaBase) > 100 || isNaN(parseInt(finMA.lineaBase)) ? "Valor debe ser entre 0 y 100 "
                        : null
                    }
                    onChange={(v) => setFinMA({ ...finMA, lineaBase: v.target.value })}
                    value={finMA.lineaBase}
                  />
                  <TextField
                    rows={4}
                    multiline
                    variant="filled"
                    sx={{ width: "90%", boxShadow: 2 }}
                    label={"Orden"}
                    InputLabelProps={{
                      style: {
                        fontFamily: "MontserratMedium",
                      },
                    }}
                    InputProps={{
                      style: {
                        fontFamily: "MontserratRegular",
                      },
                    }}
                    error={finMA.orden.toLowerCase() !== "ascendente" && finMA.orden !== "normal" && finMA.orden !== "descendente" ? true : false}
                    helperText={
                      finMA.orden.toLowerCase() !== "ascendente" && finMA.orden !== "normal" && finMA.orden !== "descendente" ? "Incluir tipo de orden: Ascendente, Descendente ó Normal. "
                        : null
                    }
                    onChange={(v) => setFinMA({ ...finMA, orden: v.target.value })}
                    value={finMA.orden}
                  />

                     {/*-----------------------Valor numerador falta logica para calculos----------------------------------*/}
                  <TextField
                    rows={4}
                    multiline
                    variant="filled"
                    sx={{ width: "90%", boxShadow: 2 }}
                    label={"Valor Numerador"}
                    InputLabelProps={{
                      style: {
                        fontFamily: "MontserratMedium",
                      },
                    }}
                    InputProps={{
                      style: {
                        fontFamily: "MontserratRegular",
                      },
                    }}


                    onChange={(v) => setFinMA({ ...finMA, valorDenominador: v.target.value })}
                    value={finMA.valorDenominador}
                  />

                  {/*---------------------------------------------------------*/}


                  {/*-----------------------VALOR DENOMINADOR falta logica para calculos----------------------------------*/}
                  <TextField
                    rows={4}
                    multiline
                    variant="filled"
                    sx={{ width: "90%", boxShadow: 2 }}
                    label={"Valor Denominador"}
                    InputLabelProps={{
                      style: {
                        fontFamily: "MontserratMedium",
                      },
                    }}
                    InputProps={{
                      style: {
                        fontFamily: "MontserratRegular",
                      },
                    }}


                    onChange={(v) => setFinMA({ ...finMA, valorNumerador: v.target.value })}
                    value={finMA.valorNumerador}
                  />

                  {/*---------------------------------------------------------*/}



                  <TextField
                    rows={4}
                    multiline
                    variant="filled"
                    sx={{ width: "90%", boxShadow: 2 }}
                    label={"Unidad Responsable"}
                    InputLabelProps={{
                      style: {
                        fontFamily: "MontserratMedium",
                      },
                    }}
                    InputProps={{
                      style: {
                        fontFamily: "MontserratRegular",
                      },
                    }}
                    onChange={(v) => setFinMA({ ...finMA, unidadResponsable: v.target.value })}
                    value={finMA.unidadResponsable}
                  />

                  <TextField
                    rows={4}
                    multiline
                    variant="filled"
                    sx={{ width: "90%", boxShadow: 2 }}
                    label={"Descripción del Indicador"}
                    InputLabelProps={{
                      style: {
                        fontFamily: "MontserratMedium",
                      },

                    }}
                    InputProps={{
                      style: {
                        fontFamily: "MontserratRegular",
                      },
                    }}
                    onChange={(v) => setFinMA({ ...finMA, descIndicador: v.target.value })}
                    value={finMA.descIndicador}
                  />
                  <TextField
                    rows={4}
                    multiline
                    variant="filled"
                    sx={{ width: "90%", boxShadow: 2 }}
                    label={"Descripción del Numerador "}
                    InputLabelProps={{
                      style: {
                        fontFamily: "MontserratMedium",
                      },
                    }}
                    InputProps={{
                      style: {
                        fontFamily: "MontserratRegular",
                      },
                    }}
                    onChange={(v) => setFinMA({ ...finMA, descNumerador: v.target.value })}
                    value={finMA.descNumerador}
                  />

                  <TextField
                    rows={4}
                    multiline
                    variant="filled"
                    sx={{ width: "90%", boxShadow: 2 }}
                    label={"Descripción del Denominador"}
                    InputLabelProps={{
                      style: {
                        fontFamily: "MontserratMedium",
                      },
                    }}
                    InputProps={{
                      style: {
                        fontFamily: "MontserratRegular",
                      },
                    }}

                    onChange={(v) => setFinMA({ ...finMA, descDenominador: v.target.value })}
                    value={finMA.descDenominador}
                  />
                </Box>
              </>
            ) : null}

          </>
        ) : null}
      </Box>

      {/*box 3*/}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          height: "7vh",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <IconButton aria-label="arrowcircleright" onClick={() => {
          setShowPagina1(true);
          setShowPagina2(false);
        }}>

          <ArrowCircleLeftIcon />
        </IconButton>

        <IconButton aria-label="arrowcircleright" onClick={() => {
          setShowPagina1(false);
          setShowPagina2(true);
        }}>
          <ArrowCircleRightIcon />
        </IconButton>

      </Box>

    </Box>
  );
}

export default TabFinPropositoMA;

export interface IIndicadores {
  Id: string;
  TipoDeIndicador: string;
  FechaCreacion: string;
  CreadoPor: string;
  UltimaModificacion: string;
  ModificadoPor: string;
  Deleted: number;
}

export interface IFrecuencias {
  Id: string;
  Frecuencia: string;
  FechaCreacion: string;
  CreadoPor: string;
  UltimaModificacion: string;
  ModificadoPor: string;
  Deleted: number;
}

export interface IFin {
  resumen: string;
  indicador: string;
  formula: string;
  frecuencia: string;
  medios: string;
  supuestos: string;
}
export interface IProposito {
  resumen: string;
  indicador: string;
  formula: string;
  frecuencia: string;
  medios_verificacion: string;
  supuestos: string;
}
