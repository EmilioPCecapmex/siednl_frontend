import { Box, Typography, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ModalEnviarMA from "../modalsMA/ModalEnviarMA";
import ModalSolicitaModif from "../modalsMA/ModalSolicitaModifMA";
import { IFinMA, IPropositoMA } from "./IFin";
import { IMA } from "./IMA";
import { IActividadesMA, IComponenteMA, ICValorMA } from "./Interfaces";

export function TabResumenMA({
  show,
  fin,
  proposito,
  componentes,
  componenteValor,
  cValor,
  IdMir,
  IdMA,
}: {
  show: boolean;
  fin: Array<IFinMA>;
  proposito: Array<IPropositoMA>;
  componentes: number[];
  componenteValor: Array<IComponenteMA>;
  cValor: Array<ICValorMA>;
  
  IdMir: string;
  IdMA: string;
}) {
  const [MA, setMA] = useState<IMA>();

  let asignarMA = (
    finM: Array<IFinMA>,
    propositoM: Array<IPropositoMA>,
    componentesM: Array<IComponenteMA>,
    actividadesM: Array<IActividadesMA>
  ) => {
    setMA({
      fin: finM[0],
      proposito: propositoM[0],
      componentes: componentesM,
      actividades: actividadesM,
    });
  };

  useEffect(() => {
    let arr: any[] = [];
    cValor[0].componentes.map((a) => {
      a.actividades.map((b) => {
        Object.assign(b);
        arr.push(b);
      });
    });

    asignarMA(fin, proposito, componenteValor, arr);
  }, [componenteValor, proposito, fin, cValor, show]);

  const [openModalSolicitarModif, setOpenModalSolicitarModif] = useState(false);

  const handleCloseModif = () => {
    setOpenModalSolicitarModif(false);
  };

  const [openModalEnviar, setOpenModalEnviar] = useState(false);

  const handleCloseEnviar = () => {
    setOpenModalEnviar(false);
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const creaMA = (estado: string) => {
    console.log(IdMA);
    
    axios
      .post(
        "http://localhost:8000/api/create-MetaAnual",
        {
          MetaAnual: JSON.stringify(MA),
          CreadoPor: localStorage.getItem("IdUsuario"),
          IdMir: IdMir,
          Estado: estado,
          IdMA: IdMA,
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        Toast.fire({
          icon: "success",
          title: 'r.data.data.message',
        });
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: 'err.response.data.result.error',
        });
      });
  };

  return (
    <Box
      visibility={show ? "visible" : "hidden"}
      position="absolute"
      sx={{
        display: "flex",
        width: "75vw",
        height: "85vh",
        boxShadow: 10,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "#fff",
      }}
    >
      <Box
        sx={{
          width: "90%",
          border: 0.1,
          borderColor: "#909090",
          height: "80%",
          overflow: "auto",
          borderRadius: 1,
          "&::-webkit-scrollbar": {
            width: ".3vw",
            mt: 1,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,.5)",
            outline: "1px solid slategrey",
            borderRadius: 1,
          },
        }}
      >
        <Box sx={{ p: 5, display: "flex", flexDirection: "column" }}>
          <Typography
            sx={{ fontFamily: "MontserratBold", borderBottom: 1, mt: 5 }}
          >
            Fin
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              mt: 1,
              alignItems: "center",
              borderBottom: 1,
              borderColor: "#cfcfcf",
            }}
          >
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              Meta Anual:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {fin[0]?.metaAnual}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              mt: 1,
              alignItems: "center",
              borderBottom: 1,
              borderColor: "#cfcfcf",
            }}
          >
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              Línea Base:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {fin[0]?.lineaBase}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              mt: 1,
              alignItems: "center",
              borderBottom: 1,
              borderColor: "#cfcfcf",
            }}
          >
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              Valor Numerador:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {fin[0]?.valorNumerador}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              mt: 1,
              alignItems: "center",
              borderBottom: 1,
              borderColor: "#cfcfcf",
            }}
          >
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              Valor Denomidador:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {fin[0]?.valorDenominador}
            </Typography>
          </Box>
         
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              mt: 1,
              alignItems: "center",
              borderBottom: 1,
              borderColor: "#cfcfcf",
            }}
          >
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              Sentido del indicador:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {fin[0]?.sentidoDelIndicador}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              mt: 1,
              alignItems: "center",
              borderBottom: 1,
              borderColor: "#cfcfcf",
            }}
          >
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              Unidad responsable de reportar el indicador:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {fin[0]?.unidadResponsable}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              mt: 1,
              alignItems: "center",
              borderBottom: 1,
              borderColor: "#cfcfcf",
            }}
          >
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              Descripción del indicador:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {fin[0]?.descIndicador}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              mt: 1,
              alignItems: "center",
              borderBottom: 1,
              borderColor: "#cfcfcf",
            }}
          >
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              Descripción del numerador:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {fin[0]?.descNumerador}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              mt: 1,
              alignItems: "center",
              borderBottom: 1,
              borderColor: "#cfcfcf",
            }}
          >
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              Descripción del denominador:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {fin[0]?.descDenominador}
            </Typography>
          </Box>

          <Typography
            sx={{ fontFamily: "MontserratBold", borderBottom: 1, mt: 5 }}
          >
            Propósito
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              mt: 1,
              alignItems: "center",
              borderBottom: 1,
              borderColor: "#cfcfcf",
            }}
          >
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              Meta anual:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {proposito[0]?.metaAnual}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              mt: 1,
              alignItems: "center",
              borderBottom: 1,
              borderColor: "#cfcfcf",
            }}
          >
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              Linea Base:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {proposito[0]?.lineaBase}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              mt: 1,
              alignItems: "center",
              borderBottom: 1,
              borderColor: "#cfcfcf",
            }}
          >
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              Valor Numerador:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {proposito[0]?.valorNumerador}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              mt: 1,
              alignItems: "center",
              borderBottom: 1,
              borderColor: "#cfcfcf",
            }}
          >
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              Valor Denominador:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {proposito[0]?.valorDenominador}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              mt: 1,
              alignItems: "center",
              borderBottom: 1,
              borderColor: "#cfcfcf",
            }}
          >
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              Sentido del indicador:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {proposito[0]?.sentidoDelIndicador}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              mt: 1,
              alignItems: "center",
              borderBottom: 1,
              borderColor: "#cfcfcf",
            }}
          >
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              Unidad responsable de reportar el indicador:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {proposito[0]?.unidadResponsable}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              mt: 1,
              alignItems: "center",
              borderBottom: 1,
              borderColor: "#cfcfcf",
            }}
          >
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              Descripción del indicador:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {proposito[0]?.descIndicador}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              mt: 1,
              alignItems: "center",
              borderBottom: 1,
              borderColor: "#cfcfcf",
            }}
          >
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              Descripción del numerador:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {proposito[0]?.descNumerador}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              mt: 1,
              alignItems: "center",
              borderBottom: 1,
              borderColor: "#cfcfcf",
            }}
          >
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              Descripción del denominador:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {proposito[0]?.descDenominador}
            </Typography>
          </Box>

          <Typography
            sx={{ fontFamily: "MontserratBold", borderBottom: 1, mt: 5 }}
          >
            Componentes
          </Typography>

          {componentes.map((index) => {
            return (
              <Box key={index}>
                <Typography
                  sx={{
                    fontFamily: "MontserratMedium",
                    borderBottom: 1,
                    mt: 5,
                    textAlign: "center",
                  }}
                >
                  Componente {index}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    mt: 1,
                    alignItems: "center",
                    borderBottom: 1,
                    borderColor: "#cfcfcf",
                  }}
                >
                  <Typography
                    sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                  >
                    Meta Anual:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
                    {componenteValor[index - 1]?.metaAnual}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    mt: 1,
                    alignItems: "center",
                    borderBottom: 1,
                    borderColor: "#cfcfcf",
                  }}
                >
                  <Typography
                    sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                  >
                    Línea Base:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
                    {componenteValor[index - 1]?.lineaBase}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    mt: 1,
                    alignItems: "center",
                    borderBottom: 1,
                    borderColor: "#cfcfcf",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "MontserratMedium",
                      width: "20%",
                    }}
                  >
                    Metas por frecuencia:
                  </Typography>

                  {componenteValor[index - 1]?.metasPorFrecuencia[0]
                    ?.trimestre1 === "" ||
                  componenteValor[index - 1]?.metasPorFrecuencia[0]
                    ?.trimestre2 === "" ||
                  componenteValor[index - 1]?.metasPorFrecuencia[0]
                    ?.trimestre3 === "" ||
                  componenteValor[index - 1]?.metasPorFrecuencia[0]
                    ?.trimestre4 === "" ? (
                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <Box sx={{ width: "15%", display: "flex" }}>
                        <Typography
                          sx={{ fontFamily: "MontserratMedium", width: "100%" }}
                        >
                          Semestre 1:
                        </Typography>
                        <Typography
                          sx={{ fontFamily: "MontserratLight", width: "100%" }}
                        >
                          {
                            componenteValor[index - 1]?.metasPorFrecuencia[0]
                              ?.semestre1
                          }
                        </Typography>
                      </Box>

                      <Box sx={{ width: "15%", display: "flex" }}>
                        <Typography
                          sx={{ fontFamily: "MontserratMedium", width: "100%" }}
                        >
                          Semestre 2:
                        </Typography>
                        <Typography
                          sx={{ fontFamily: "MontserratLight", width: "100%" }}
                        >
                          {
                            componenteValor[index - 1]?.metasPorFrecuencia[0]
                              ?.semestre2
                          }
                        </Typography>
                      </Box>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <Box sx={{ width: "15%", display: "flex" }}>
                        <Typography
                          sx={{ fontFamily: "MontserratMedium", width: "100%" }}
                        >
                          Trimestre 1:
                        </Typography>
                        <Typography
                          sx={{ fontFamily: "MontserratLight", width: "100%" }}
                        >
                          {
                            componenteValor[index - 1]?.metasPorFrecuencia[0]
                              ?.trimestre1
                          }
                        </Typography>
                      </Box>
                      <Box sx={{ width: "15%", display: "flex" }}>
                        <Typography
                          sx={{ fontFamily: "MontserratMedium", width: "100%" }}
                        >
                          Trimestre 2:
                        </Typography>
                        <Typography
                          sx={{ fontFamily: "MontserratLight", width: "100%" }}
                        >
                          {
                            componenteValor[index - 1]?.metasPorFrecuencia[0]
                              ?.trimestre2
                          }
                        </Typography>
                      </Box>
                      <Box sx={{ width: "15%", display: "flex" }}>
                        <Typography
                          sx={{ fontFamily: "MontserratMedium", width: "100%" }}
                        >
                          Trimestre 3:
                        </Typography>
                        <Typography
                          sx={{ fontFamily: "MontserratLight", width: "100%" }}
                        >
                          {
                            componenteValor[index - 1]?.metasPorFrecuencia[0]
                              ?.trimestre3
                          }
                        </Typography>
                      </Box>
                      <Box sx={{ width: "15%", display: "flex" }}>
                        <Typography
                          sx={{ fontFamily: "MontserratMedium", width: "100%" }}
                        >
                          Trimestre 4:
                        </Typography>
                        <Typography
                          sx={{ fontFamily: "MontserratLight", width: "100%" }}
                        >
                          {
                            componenteValor[index - 1]?.metasPorFrecuencia[0]
                              ?.trimestre4
                          }
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    mt: 1,
                    alignItems: "center",
                    borderBottom: 1,
                    borderColor: "#cfcfcf",
                  }}
                >
                  <Typography
                    sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                  >
                    Valor numerador:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
                    {componenteValor[index - 1]?.valorNumerador}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    mt: 1,
                    alignItems: "center",
                    borderBottom: 1,
                    borderColor: "#cfcfcf",
                  }}
                >
                  <Typography
                    sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                  >
                    Valor Denominador:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
                    {componenteValor[index - 1]?.valorDenominador}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    mt: 1,
                    alignItems: "center",
                    borderBottom: 1,
                    borderColor: "#cfcfcf",
                  }}
                >
                  <Typography
                    sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                  >
                    Sentido del indicador:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
                    {componenteValor[index - 1]?.sentidoDelIndicador}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    mt: 1,
                    alignItems: "center",
                    borderBottom: 1,
                    borderColor: "#cfcfcf",
                  }}
                >
                  <Typography
                    sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                  >
                    Unidad responsable de reportar el indicador:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
                    {componenteValor[index - 1]?.unidadResponsable}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    mt: 1,
                    alignItems: "center",
                    borderBottom: 1,
                    borderColor: "#cfcfcf",
                  }}
                >
                  <Typography
                    sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                  >
                    Descripción del indicador:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
                    {componenteValor[index - 1]?.descIndicador}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    mt: 1,
                    alignItems: "center",
                    borderBottom: 1,
                    borderColor: "#cfcfcf",
                  }}
                >
                  <Typography
                    sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                  >
                    Descripción del numerador:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
                    {componenteValor[index - 1]?.descNumerador}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    mt: 1,
                    alignItems: "center",
                    borderBottom: 1,
                    borderColor: "#cfcfcf",
                  }}
                >
                  <Typography
                    sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                  >
                    Descripción del denominador:
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
                    {componenteValor[index - 1]?.descDenominador}
                  </Typography>
                </Box>
              </Box>
            );
          })}

          <Typography
            sx={{ fontFamily: "MontserratBold", borderBottom: 1, mt: 5 }}
          >
            Actividades
          </Typography>

          {cValor[0].componentes.map((item, indexComponentes) => {
            let i = 0;
            return item.actividades.map((value, indexActividades) => {
              i++;
              return (
                <Box key={indexActividades}>
                  <Typography
                    sx={{
                      fontFamily: "MontserratMedium",
                      borderBottom: 1,
                      mt: 5,
                      textAlign: "center",
                    }}
                  >
                    Componente {indexComponentes + 1} - Actividad{" "}
                    {indexActividades + 1}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      mt: 1,
                      alignItems: "center",
                      borderBottom: 1,
                      borderColor: "#cfcfcf",
                    }}
                  >
                    <Typography
                      sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                    >
                      Meta Anual:
                    </Typography>
                    <Typography
                      sx={{ fontFamily: "MontserratLight", width: "80%" }}
                    >
                      {
                        cValor[0].componentes[indexComponentes].actividades[
                          indexActividades
                        ].metaAnual
                      }
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      mt: 1,
                      alignItems: "center",
                      borderBottom: 1,
                      borderColor: "#cfcfcf",
                    }}
                  >
                    <Typography
                      sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                    >
                      Línea Base:
                    </Typography>
                    <Typography
                      sx={{ fontFamily: "MontserratLight", width: "80%" }}
                    >
                      {
                        cValor[0].componentes[indexComponentes].actividades[
                          indexActividades
                        ].lineaBase
                      }
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      mt: 1,
                      alignItems: "center",
                      borderBottom: 1,
                      borderColor: "#cfcfcf",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "MontserratMedium",
                        width: "20%",
                      }}
                    >
                      Metas por frecuencia:
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <Box sx={{ width: "8%", display: "flex" }}>
                        <Typography
                          sx={{ fontFamily: "MontserratMedium", width: "100%" }}
                        >
                          Trimestre 1:
                        </Typography>
                        <Typography sx={{ fontFamily: "MontserratLight" }}>
                          {
                            cValor[0]?.componentes[indexComponentes]
                              ?.actividades[indexActividades]
                              .metasPorFrecuencia[0]?.trimestre1
                          }
                        </Typography>
                      </Box>

                      <Box sx={{ width: "8%", display: "flex" }}>
                        <Typography
                          sx={{ fontFamily: "MontserratMedium", width: "100%" }}
                        >
                          Trimestre 2:
                        </Typography>
                        <Typography sx={{ fontFamily: "MontserratLight" }}>
                          {
                            cValor[0].componentes[indexComponentes].actividades[
                              indexActividades
                            ].metasPorFrecuencia[0].trimestre2
                          }
                        </Typography>
                      </Box>

                      <Box sx={{ width: "8%", display: "flex" }}>
                        <Typography
                          sx={{ fontFamily: "MontserratMedium", width: "100%" }}
                        >
                          Trimestre 3:
                        </Typography>
                        <Typography sx={{ fontFamily: "MontserratLight" }}>
                          {
                            cValor[0].componentes[indexComponentes].actividades[
                              indexActividades
                            ].metasPorFrecuencia[0].trimestre3
                          }
                        </Typography>
                      </Box>

                      <Box sx={{ width: "8%", display: "flex" }}>
                        <Typography
                          sx={{ fontFamily: "MontserratMedium", width: "100%" }}
                        >
                          Trimestre 4:
                        </Typography>
                        <Typography sx={{ fontFamily: "MontserratLight" }}>
                          {
                            cValor[0].componentes[indexComponentes].actividades[
                              indexActividades
                            ].metasPorFrecuencia[0].trimestre4
                          }
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      mt: 1,
                      alignItems: "center",
                      borderBottom: 1,
                      borderColor: "#cfcfcf",
                    }}
                  >
                    <Typography
                      sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                    >
                      Valor numerador:
                    </Typography>
                    <Typography
                      sx={{ fontFamily: "MontserratLight", width: "80%" }}
                    >
                      {
                        cValor[0].componentes[indexComponentes].actividades[
                          indexActividades
                        ].valorNumerador
                      }
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      mt: 1,
                      alignItems: "center",
                      borderBottom: 1,
                      borderColor: "#cfcfcf",
                    }}
                  >
                    <Typography
                      sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                    >
                      Valor denominador:
                    </Typography>
                    <Typography
                      sx={{ fontFamily: "MontserratLight", width: "80%" }}
                    >
                      {
                        cValor[0].componentes[indexComponentes].actividades[
                          indexActividades
                        ].valorDenominador
                      }
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      mt: 1,
                      alignItems: "center",
                      borderBottom: 1,
                      borderColor: "#cfcfcf",
                    }}
                  >
                    <Typography
                      sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                    >
                      Sentido del Indicador:
                    </Typography>
                    <Typography
                      sx={{ fontFamily: "MontserratLight", width: "80%" }}
                    >
                      {
                        cValor[0].componentes[indexComponentes].actividades[
                          indexActividades
                        ].sentidoDelIndicador
                      }
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      mt: 1,
                      alignItems: "center",
                      borderBottom: 1,
                      borderColor: "#cfcfcf",
                    }}
                  >
                    <Typography
                      sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                    >
                      Unidad responsable de reportar el indicador:
                    </Typography>
                    <Typography
                      sx={{ fontFamily: "MontserratLight", width: "80%" }}
                    >
                      {
                        cValor[0].componentes[indexComponentes].actividades[
                          indexActividades
                        ].unidadResponsable
                      }
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      mt: 1,
                      alignItems: "center",
                      borderBottom: 1,
                      borderColor: "#cfcfcf",
                    }}
                  >
                    <Typography
                      sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                    >
                      Descripción del indicador:
                    </Typography>
                    <Typography
                      sx={{ fontFamily: "MontserratLight", width: "80%" }}
                    >
                      {
                        cValor[0].componentes[indexComponentes].actividades[
                          indexActividades
                        ].descIndicador
                      }
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      mt: 1,
                      alignItems: "center",
                      borderBottom: 1,
                      borderColor: "#cfcfcf",
                    }}
                  >
                    <Typography
                      sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                    >
                      Descripción del numerador:
                    </Typography>
                    <Typography
                      sx={{ fontFamily: "MontserratLight", width: "80%" }}
                    >
                      {
                        cValor[0].componentes[indexComponentes].actividades[
                          indexActividades
                        ].descNumerador
                      }
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      mt: 1,
                      alignItems: "center",
                      borderBottom: 1,
                      borderColor: "#cfcfcf",
                    }}
                  >
                    <Typography
                      sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                    >
                      Descripción del denominador:
                    </Typography>
                    <Typography
                      sx={{ fontFamily: "MontserratLight", width: "80%" }}
                    >
                      {
                        cValor[0].componentes[indexComponentes].actividades[
                          indexActividades
                        ].descDenominador
                      }
                    </Typography>
                  </Box>
                </Box>
              );
            });
          })}
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          width: "100%",
          mt: 2,
        }}
      >
        <Button color="error" variant="outlined" onClick={() => ""}>
          <Typography sx={{ fontFamily: "MontserratMedium" }}>
            Cancelar
          </Typography>
        </Button>
        <Button
          disabled={localStorage.getItem("Rol") === "Capturador" ? true : false}
          color="warning"
          variant="outlined"
          onClick={() => setOpenModalSolicitarModif(true)}
        >
          <Typography sx={{ fontFamily: "MontserratMedium" }}>
            Solicitar Modificación
          </Typography>
        </Button>

        <Button color="success" variant="outlined" onClick={() =>
            creaMA(
              localStorage.getItem("Rol") === "Capturador"
                ? "En Captura"
                : localStorage.getItem("Rol") === "Verificador"
                ? "En Revisión"
                : "En Autorización"
            )
          }>
          <Typography sx={{ fontFamily: "MontserratMedium" }}>
            Borrador
          </Typography>
        </Button>
        <Button
          color="primary"
          variant="outlined"
          onClick={() => ''
            // checkMir(
            //   localStorage.getItem("Rol") === "Capturador"
            //     ? "En Captura"
            //     : localStorage.getItem("Rol") === "Verificador"
            //     ? "En Revisión"
            //     : "En Autorización"
            // )
          }
        >
          <Typography sx={{ fontFamily: "MontserratMedium" }}>
            Enviar
          </Typography>
        </Button>

        <ModalSolicitaModif
          open={openModalSolicitarModif}
          handleClose={handleCloseModif}
          MA={JSON.stringify(MA)}
        ></ModalSolicitaModif>

        <ModalEnviarMA
          open={openModalEnviar}
          handleClose={handleCloseEnviar}
          MA={JSON.stringify(MA)}
          IdMA={IdMA}
          IdMIR={IdMir}
        ></ModalEnviarMA>
      </Box>
    </Box>
  );
}

export default TabResumenMA;
