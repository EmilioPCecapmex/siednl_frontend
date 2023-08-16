import { Grid, TextField, ListItemButton, Typography, Divider, List, Box, Paper, styled, Tooltip, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ModalEnviarFT from "../modalsFT/ModalEnviarFT";
import ModalsSolicitModifFT from "../modalsFT/ModalsSolicitModifFT";
import { IActividadesRF, IComponenteRF, ICValorRF, IEncabezadoRF, IRF} from "./Interfaces";
import { queries } from "../../queries";
import {
  IAvanceFinancieroRF,
  IFinRF,
  IPropositoRF
} from "../../screens/raffi/interfacesRaffi";


export const TabResumenRF = ({
  show,
  // encabezado,
  fin,
  proposito,
  componentes,
  componenteValor,
  cValor,
  AFinanciero,
  IdMir,
  IdRF,
  IdMA,
  showResume,
  MIR,
  MA,
}: {
  show: boolean;
  // encabezado: Array<IEncabezadoRF>;
  fin: Array<IFinRF>;
  proposito: Array<IPropositoRF>;
  componentes: number[];
  componenteValor: Array<IComponenteRF>;
  cValor: Array<ICValorRF>;
  AFinanciero: Array<IAvanceFinancieroRF>
  IdMir: string;
  IdRF: string;
  IdMA: string;
  MIR: string;
  MA: string;
  showResume: Function;
}) => {

  const [openModalEnviar, setOpenModalEnviar] = useState(false);

  const handleCloseEnviar = () => {
    setOpenModalEnviar(false);
  };

  const [openModalSolicitarModif, setOpenModalSolicitarModif] = useState(false);

  const handleCloseModif = () => {
    setOpenModalSolicitarModif(false);
  };

  const isCapturador = localStorage.getItem("Rol") === "Capturador";
  const buttonStyles = {
    ...queries.buttonContinuarSolicitudInscripcion,
    ...(isCapturador && {
      "&.Mui-disabled": {
        backgroundColor: "rgba(175, 140, 85, 0.6)",
        color: "white",
        "&:hover": {
          backgroundColor: "rgba(175, 140, 85, 0.6)",
        },
      },
    }),
  };


  useEffect(() => {

    asignarRF(componenteValor, cValor);
  }, [componenteValor, cValor]);

  const [RF, setRF] = useState<IRF>();

  let asignarRF = (
    componentesM: Array<IComponenteRF>,
    actividadesM: Array<ICValorRF>
  ) => {
    setRF({
      componentes: componentesM,
      actividades: actividadesM,
    });
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

  const creaRF = (estado: string) => {
    axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/create-Raffi",
        {
          Raffi: JSON.stringify(RF),
          CreadoPor: localStorage.getItem("IdUsuario"),
          IdMir: IdMir,
          IdMa: IdMA,
          Estado: estado,
          Id: IdRF,
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        console.log("Hola soy la respuesta");
        console.log("r: ", r);
        Toast.fire({
          icon: "success",
          title: r.data.data.message,
        });
        showResume();
      })
      .catch((err) => {
        console.log(err)
        console.log(err.response.data)
        Toast.fire({
          icon: "error",
          title: err.response.data,
        });
      });
  };


  let jsonMA =
    MA === ""
      ? ""
      : JSON.parse(MA).length > 1
        ? JSON.parse(MA)[0]
        : JSON.parse(MA);

  function mapeaindice(c = 0, a = 0) {
    let x = 0;
    //Componente 1
    (c == 0 && a == 0) ? x = 0 : (c == 0 && a == 1) ? x = 1 :
      (c == 1 && a == 0) ? x = 2 : x = 3;

    return x;
  }
  return (
    <>
      <Grid
        visibility={show ? "visible" : "hidden"}
        position="absolute"
        sx={{
          display: "flex",
          width: "75vw",
          height: "77vh",
          boxShadow: 10,
          borderRadius: 5,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          backgroundColor: "#fff",
        }}
      >
        {/* prueba
        {JSON.stringify(AFinanciero)} */}
        <Grid
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
          <Grid sx={{ p: 5, display: "flex", flexDirection: "column" }}>
            <Typography
              sx={{ fontFamily: "MontserratBold", borderBottom: 1, mt: 5 }}
            >
              Avance Financiero
            </Typography>

            {/* ######################################################
            ############ INICIA DISPLAY DE AVANCE FINANCIERO ########
            #########################################################*/}
            {/* Nota: son tres tablas, devengadoModificado, modificadoAutorizado y ejercidoModificado
            Por lo que si se encuentran valores de alguna de las 3, solo entonces, se montrará la tabla correspondiente */}
            {/* avanceFinanciero.porcentaje.devengadoModificado.pt1 */}
            {/* ######################### TABLA DEVENGADOMODIFICADO #################### */}
            {(AFinanciero[0]?.monto.modificadoAutorizado.t1 || "" === "") ? "" : (
              <>
                <Typography
                  sx={{
                    fontFamily: "MontserratMedium",
                    borderBottom: 1,
                    mt: 5,
                    textAlign: "center",
                  }}
                >
                  Modificado Autorizado
                </Typography>
                <Grid container item sx={{ display: "flex", justifyContent: "center" }} xs={12}>
                  <Grid item xs={6}>
                    <div className="grid-container" style={{ width: "100%" }}>
                      <table style={{ width: "100%" }}>
                        <thead style={{ backgroundColor: "lightgray", boxShadow: "1px 2px 2px", textAlign: "center" }}>
                          <tr>
                            <th colSpan={5}>
                              TRIMESTRE
                            </th>
                          </tr>
                          <tr>
                            <th>I</th>
                            <th>II</th>
                            <th>III</th>
                            <th>IV</th>
                            <th>CP</th>
                          </tr>
                        </thead>
                        <tbody style={{ width: "100%", textAlign: "center", boxShadow: "1px 2px 2px" }}>
                          <tr style={{ backgroundColor: "lightgray", boxShadow: "1px 2px 2px", textAlign: "center" }}>
                            <td colSpan={5}>
                              MONTO
                            </td>
                          </tr>
                          <tr>
                            <td>{AFinanciero[0]?.monto.devengadoModificado.t1.resultado}</td>
                            <td>{AFinanciero[0]?.monto.devengadoModificado.t2.resultado}</td>
                            <td>{AFinanciero[0]?.monto.devengadoModificado.t3.resultado}</td>
                            <td>{AFinanciero[0]?.monto.devengadoModificado.t4.resultado}</td>
                            <td>{AFinanciero[0]?.monto.devengadoModificado.cuentaPublica}</td>
                          </tr>
                          <tr style={{ backgroundColor: "lightgray", boxShadow: "1px 2px 2px", textAlign: "center" }}>
                            <td colSpan={5}>
                              PORCENTAJE
                            </td>
                          </tr>
                          <tr>
                            <td>{AFinanciero[0]?.porcentaje.porcentajeDevengadoModificado.pt1}</td>
                            <td>{AFinanciero[0]?.porcentaje.porcentajeDevengadoModificado.pt2}</td>
                            <td>{AFinanciero[0]?.porcentaje.porcentajeDevengadoModificado.pt3}</td>
                            <td>{AFinanciero[0]?.porcentaje.porcentajeDevengadoModificado.pt4}</td>
                            <td>{AFinanciero[0]?.porcentaje.porcentajeDevengadoModificado.porcentajeCuentaPublica}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </Grid>
                </Grid>
              </>
            )}
            {(AFinanciero[0]?.monto.modificadoAutorizado.t1 || "" === "") ? "" : (
              <>
                <Typography
                  sx={{
                    fontFamily: "MontserratMedium",
                    borderBottom: 1,
                    mt: 5,
                    textAlign: "center",
                  }}
                >
                  Modificado Autorizado
                </Typography>
                <Grid container item sx={{ display: "flex", justifyContent: "center" }} xs={12}>
                  <Grid item xs={6}>
                    <div className="grid-container" style={{ width: "100%" }}>
                      <table style={{ width: "100%" }}>
                        <thead style={{ backgroundColor: "lightgray", boxShadow: "1px 2px 2px", textAlign: "center" }}>
                          <tr>
                            <th colSpan={5}>
                              TRIMESTRE
                            </th>
                          </tr>
                          <tr>
                            <th>I</th>
                            <th>II</th>
                            <th>III</th>
                            <th>IV</th>
                            <th>CP</th>
                          </tr>
                        </thead>
                        <tbody style={{ width: "100%", textAlign: "center", boxShadow: "1px 2px 2px" }}>
                          <tr style={{ backgroundColor: "lightgray", boxShadow: "1px 2px 2px", textAlign: "center" }}>
                            <td colSpan={5}>
                              MONTO
                            </td>
                          </tr>
                          <tr>
                            <td>{AFinanciero[0]?.monto.modificadoAutorizado.t1.resultado}</td>
                            <td>{AFinanciero[0]?.monto.modificadoAutorizado.t2.resultado}</td>
                            <td>{AFinanciero[0]?.monto.modificadoAutorizado.t3.resultado}</td>
                            <td>{AFinanciero[0]?.monto.modificadoAutorizado.t4.resultado}</td>
                            <td>{AFinanciero[0]?.monto.modificadoAutorizado.cuentaPublica}</td>
                          </tr>
                          <tr style={{ backgroundColor: "lightgray", boxShadow: "1px 2px 2px", textAlign: "center" }}>
                            <td colSpan={5}>
                              PORCENTAJE
                            </td>
                          </tr>
                          <tr>
                            <td>{AFinanciero[0]?.porcentaje.procentajeModificadoAutorizado.pt1}</td>
                            <td>{AFinanciero[0]?.porcentaje.procentajeModificadoAutorizado.pt2}</td>
                            <td>{AFinanciero[0]?.porcentaje.procentajeModificadoAutorizado.pt3}</td>
                            <td>{AFinanciero[0]?.porcentaje.procentajeModificadoAutorizado.pt4}</td>
                            <td>{AFinanciero[0]?.porcentaje.procentajeModificadoAutorizado.porcentajeCuentaPublica}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </Grid>
                </Grid>
              </>
            )}
            {/* ######################### TABLA EJERCIDOMODIFICADO #################### */}
            {(AFinanciero[0]?.monto.ejercidoModificado.t1 || "" === "") ? "" : (
              <>
                <Typography
                  sx={{
                    fontFamily: "MontserratMedium",
                    borderBottom: 1,
                    mt: 5,
                    textAlign: "center",
                  }}
                >
                  Ejercido Modificado
                </Typography>
                <Grid container item sx={{ display: "flex", justifyContent: "center" }} xs={12}>
                  <Grid item xs={6}>
                    <div className="grid-container" style={{ width: "100%" }}>
                      <table style={{ width: "100%" }}>
                        <thead style={{ backgroundColor: "lightgray", boxShadow: "1px 2px 2px", textAlign: "center" }}>
                          <tr>
                            <th colSpan={5}>
                              TRIMESTRE
                            </th>
                          </tr>
                          <tr>
                            <th>I</th>
                            <th>II</th>
                            <th>III</th>
                            <th>IV</th>
                            <th>CP</th>
                          </tr>
                        </thead>
                        <tbody style={{ width: "100%", textAlign: "center", boxShadow: "1px 2px 2px" }}>
                          <tr style={{ backgroundColor: "lightgray", boxShadow: "1px 2px 2px", textAlign: "center" }}>
                            <td colSpan={5}>
                              MONTO
                            </td>
                          </tr>
                          <tr>
                            <td>{AFinanciero[0]?.monto.ejercidoModificado.t1.resultado}</td>
                            <td>{AFinanciero[0]?.monto.ejercidoModificado.t2.resultado}</td>
                            <td>{AFinanciero[0]?.monto.ejercidoModificado.t3.resultado}</td>
                            <td>{AFinanciero[0]?.monto.ejercidoModificado.t4.resultado}</td>
                            <td>{AFinanciero[0]?.monto.ejercidoModificado.cuentaPublica}</td>
                          </tr>
                          <tr style={{ backgroundColor: "lightgray", boxShadow: "1px 2px 2px", textAlign: "center" }}>
                            <td colSpan={5}>
                              PORCENTAJE
                            </td>
                          </tr>
                          <tr>
                            <td>{AFinanciero[0]?.porcentaje.porcentajeEjercidoModificado.pt1}</td>
                            <td>{AFinanciero[0]?.porcentaje.porcentajeEjercidoModificado.pt2}</td>
                            <td>{AFinanciero[0]?.porcentaje.porcentajeEjercidoModificado.pt3}</td>
                            <td>{AFinanciero[0]?.porcentaje.porcentajeEjercidoModificado.pt4}</td>
                            <td>{AFinanciero[0]?.porcentaje.porcentajeEjercidoModificado.porcentajeCuentaPublica}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </Grid>
                </Grid>
              </>
            )}
            {/* ###################################################
            ############ FINALIZA DISPLAY DE AFINANCIERO ########
            ###################################################*/}



        {/* #######################################
            ############ INICIA DISPLAY DE FIN ########
            ###########################################*/}
            <Typography
              sx={{ fontFamily: "MontserratBold", borderBottom: 1, mt: 5 }}
            >
              Fin
            </Typography>

          
            



            {/* #######################################
            ############ FINALIZA DISPLAY DE FIN ########
            ###########################################*/}

        {/* #######################################
            ############ INICIA DISPLAY DE PROPOSITO ########
            ###########################################*/}
            <Typography
              sx={{ fontFamily: "MontserratBold", borderBottom: 1, mt: 5 }}
            >
              Proposito
            </Typography>

          
            



            {/* #######################################
            ############ FINALIZA DISPLAY DE PROPOSITO ########
            ###########################################*/}

            {/* ###################################################
            ############ INICIA DISPLAY DE COMPONENTES ########
            ###################################################*/}
            <Typography
              sx={{ fontFamily: "MontserratBold", borderBottom: 1, mt: 5 }}
            >
              Componentes
            </Typography>
            {componentes.map((index) => {
              return (
                <Grid key={index}>
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
                  {jsonMA?.componentes[index - 1]?.metasPorFrecuencia[0]?.trimestre1 === "" ? (
                    <Grid container item sx={{ display: "flex", justifyContent: "center" }} xs={12}>
                      <Grid item xs={6}>
                        <div className="grid-container" style={{ width: "100%" }}>
                          <table style={{ width: "100%" }}>
                            <thead style={{ backgroundColor: "lightgray", boxShadow: "1px 2px 2px", textAlign: "center" }}>
                              <tr>
                                <th colSpan={2}>
                                  SEMESTRE
                                </th>
                              </tr>
                              <tr>
                                <th>I</th>
                                <th>II</th>
                              </tr>
                            </thead>
                            <tbody style={{ width: "100%", textAlign: "center", boxShadow: "1px 2px 2px" }}>
                              <tr>
                                <td>{jsonMA?.componentes[index - 1]?.metasPorFrecuencia[0]?.semestre1}</td>
                                <td>{jsonMA?.componentes[index - 1]?.metasPorFrecuencia[0]?.semestre2}</td>
                              </tr>

                              <tr style={{ backgroundColor: "lightgray", boxShadow: "1px 2px 2px", textAlign: "center" }}>

                                <td colSpan={2}>
                                  METAS
                                </td>
                              </tr>
                              <tr>
                                <td>{componenteValor[index - 1]?.metasPorFrecuencia[0]?.semestre1}</td>
                                <td>{componenteValor[index - 1]?.metasPorFrecuencia[0]?.semestre2}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </Grid>
                    </Grid>
                  ) : (
                    <Grid container item sx={{ display: "flex", justifyContent: "center" }} xs={12}>
                      <Grid item xs={6}>
                        <div className="grid-container" style={{ width: "100%" }}>
                          <table style={{ width: "100%" }}>
                            <thead style={{ backgroundColor: "lightgray", boxShadow: "1px 2px 2px", textAlign: "center" }}>
                              <tr>
                                <th colSpan={4}>
                                  TRIMESTRE
                                </th>
                              </tr>
                              <tr>
                                <th>I</th>
                                <th>II</th>
                                <th>III</th>
                                <th>IV</th>
                              </tr>
                            </thead>
                            <tbody style={{ width: "100%", textAlign: "center", boxShadow: "1px 2px 2px" }}>
                              <tr>
                                <td>{jsonMA?.componentes[index - 1]?.metasPorFrecuencia[0]?.trimestre1}</td>
                                <td>{jsonMA?.componentes[index - 1]?.metasPorFrecuencia[0]?.trimestre2}</td>
                                <td>{jsonMA?.componentes[index - 1]?.metasPorFrecuencia[0]?.trimestre3}</td>
                                <td>{jsonMA?.componentes[index - 1]?.metasPorFrecuencia[0]?.trimestre4}</td>
                              </tr>

                              <tr style={{ backgroundColor: "lightgray", boxShadow: "1px 2px 2px", textAlign: "center" }}>

                                <td colSpan={4}>
                                  METAS
                                </td>
                              </tr>
                              <tr>
                                <td>{componenteValor[index - 1]?.metasPorFrecuencia[0]?.trimestre1}</td>
                                <td>{componenteValor[index - 1]?.metasPorFrecuencia[0]?.trimestre2}</td>
                                <td>{componenteValor[index - 1]?.metasPorFrecuencia[0]?.trimestre3}</td>
                                <td>{componenteValor[index - 1]?.metasPorFrecuencia[0]?.trimestre4}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              );
            })}

            {/* ###################################################
            ############ INICIA DISPLAY DE ACTIVIDADES ########
            ###################################################*/}
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

                  <Grid key={indexActividades}>
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

                    <Grid container item sx={{ display: "flex", justifyContent: "center" }} xs={12}>
                      <Grid item xs={6}>
                        <div className="grid-container" style={{ width: "100%" }}>
                          <table style={{ width: "100%" }}>
                            <thead style={{ backgroundColor: "lightgray", boxShadow: "1px 2px 2px", textAlign: "center" }}>
                              <tr>
                                <th colSpan={4}>
                                  TRIMESTRE
                                </th>
                              </tr>
                              <tr>
                                <th>I</th>
                                <th>II</th>
                                <th>III</th>
                                <th>IV</th>
                              </tr>
                            </thead>
                            <tbody style={{ width: "100%", textAlign: "center", boxShadow: "1px 2px 2px" }}>
                              <tr>
                                <td>{jsonMA?.actividades[mapeaindice(indexComponentes, indexActividades)]?.metasPorFrecuencia[0]?.trimestre1}</td>
                                <td>{jsonMA?.actividades[mapeaindice(indexComponentes, indexActividades)]?.metasPorFrecuencia[0]?.trimestre2}</td>
                                <td>{jsonMA?.actividades[mapeaindice(indexComponentes, indexActividades)]?.metasPorFrecuencia[0]?.trimestre3}</td>
                                <td>{jsonMA?.actividades[mapeaindice(indexComponentes, indexActividades)]?.metasPorFrecuencia[0]?.trimestre4}</td>
                              </tr>

                              <tr style={{ backgroundColor: "lightgray", boxShadow: "1px 2px 2px", textAlign: "center" }}>

                                <td colSpan={4}>
                                  METAS
                                </td>
                              </tr>
                              <tr>
                                <td>{cValor[0]?.componentes[indexComponentes]?.actividades[indexActividades]?.metasPorFrecuencia[0]?.trimestre1}</td>
                                <td>{cValor[0]?.componentes[indexComponentes]?.actividades[indexActividades]?.metasPorFrecuencia[0]?.trimestre2}</td>
                                <td>{cValor[0]?.componentes[indexComponentes]?.actividades[indexActividades]?.metasPorFrecuencia[0]?.trimestre3}</td>
                                <td>{cValor[0]?.componentes[indexComponentes]?.actividades[indexActividades]?.metasPorFrecuencia[0]?.trimestre4}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              });
            })}

            {/* {componenteValor[0].metasPorFrecuencia[0].semestre1} */}
            {/* {JSON.stringify(cValor)} */}
          </Grid>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "100%",
            mt: 2,
          }}
        >
          <Button sx={queries.buttonCancelarSolicitudInscripcion} onClick={() => showResume()}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              Cancelar
            </Typography>
          </Button>
          <Button
            disabled={isCapturador ? true : false}
            sx={buttonStyles}
            onClick={() => setOpenModalSolicitarModif(true)}
          >
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              Solicitar Modificación
            </Typography>
          </Button>

          <Button
            sx={queries.buttonContinuarSolicitudInscripcion}
            onClick={() =>
              creaRF(
                localStorage.getItem("Rol") === "Capturador"
                  ? "En Captura"
                  : localStorage.getItem("Rol") === "Verificador"
                    ? "En Revisión"
                    : "En Autorización"
              )
            }
          >
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              Borrador
            </Typography>
          </Button>

          <Button
            sx={queries.buttonContinuarSolicitudInscripcion}
            onClick={() => setOpenModalEnviar(true)}
          >
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              {localStorage.getItem("Rol") === "Administrador"
                ? "Autorizar"
                : "Enviar"}
            </Typography>
          </Button>

          {/* <ModalSolicitaModif
          open={openModalSolicitarModif}
          handleClose={handleCloseModif}
          MA={JSON.stringify(MA)}
          MIR={MIR}
          showResume={showResume}
          IdMA={IdMA}
          IdMIR={IdMir}
          MAEdit={
            localStorage.getItem("Rol") === "Capturador"
              ? ""
              : JSON.stringify({
                fin: editFin,
                proposito: editProposito,
                componentes: editComponentes,
                actividades: editActividades,
              })
          }
        ></ModalSolicitaModif>

        <ModalEnviarMA
          open={openModalEnviar}
          handleClose={handleCloseEnviar}
          MA={JSON.stringify(MA)}
          MIR={MIR}
          IdMA={IdMA}
          IdMIR={IdMir}
          showResume={showResume}
        ></ModalEnviarMA> */}
        </Grid>
      </Grid>
    </>

  );
};
