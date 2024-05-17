/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grid, Typography, Button, Checkbox } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ModalEnviarMA from "../modalsMA/ModalEnviarMA";
import ModalSolicitaModif from "../modalsMA/ModalSolicitaModifMA";
import { IFinMA, IPropositoMA } from "./IFin";
import { IMA, IMAEdit } from "./IMA";
import { IActividadesMA, IComponenteMA, ICValorMA } from "./Interfaces";
import { queries } from "../../queries";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import "../../../src/Globals.css"
import { alertaError, alertaExito } from "../genericComponents/Alertas";

export function TabResumenMA({
  maPadre,
  IdMir,
  IdMA,
  MIR,
  showResume,
  maPadreEdit,
  setMAPadreEdit,
  estadoma,
  IdEntidad,
}: {
  IdMir: string;
  IdMA: string;
  MIR: string;
  showResume: Function;
  maPadre: IMA;
  maPadreEdit: IMAEdit;
  setMAPadreEdit: Function;
  estadoma: string;
  IdEntidad: string;
}) {
  const [MA, setMA] = useState<IMA>(maPadre);

  let asignarMA = (
    finM: Array<IFinMA>,
    propositoM: Array<IPropositoMA>,
    componentesM: Array<IComponenteMA>
    //actividadesM: Array<IActividadesMA>
  ) => {
    setMA({
      fin: finM[0],
      proposito: propositoM[0],
      componentes: componentesM,
      //actividades: actividadesM,
    });
  };

  const [openModalEnviar, setOpenModalEnviar] = useState(false);

  const handleCloseEnviar = () => {
    setOpenModalEnviar(false);
  };

  const [openModalSolicitarModif, setOpenModalSolicitarModif] = useState(false);

  const handleCloseModif = () => {
    setOpenModalSolicitarModif(false);
  };

  const creaMA = (estado: string) => {
    axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/create-ma-generic",
        {
          MetaAnual: JSON.stringify(MA),
          CreadoPor: localStorage.getItem("IdUsuario"),
          IdMir: IdMir,
          Estado: estado,
          Id: IdMA,
          Rol: localStorage.getItem("Rol"),
          IdEntidad: localStorage.getItem("IdEntidad"),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
       
        alertaExito(() => {}, r.data.data.message.toUpperCase());
        showResume();
      })
      .catch((err) => {
        alertaError(err.response.data.result.error.toUpperCase());
      });
  };

  useEffect(() => {
    let arr: any[] = [];
    // eslint-disable-next-line array-callback-return
    let cEdit = maPadre.componentes.map((item) => {
      return {
        componentes: item.componentes,
        metaAnual: true,
        lineaBase: true,
        metasPorFrecuencia: [
          {
            semestre1: true,
            semestre2: true,
            trimestre1: true,
            trimestre2: true,
            trimestre3: true,
            trimestre4: true,
          },
        ],
        valorNumerador: true,
        valorDenominador: true,
        sentidoDelIndicador: true,
        unidadResponsable: true,
        descIndicador: true,
        descNumerador: true,
        descDenominador: true,
        actividades: item.actividades.map((actividad) => ({
          actividad: actividad.actividad, // Reemplaza con la propiedad correcta de IActividadesEditMA
          metaAnual: true,
          lineaBase: true,
          metasPorFrecuencia: [
            {
              semestre1: true,
              semestre2: true,
              trimestre1: true,
              trimestre2: true,
              trimestre3: true,
              trimestre4: true,
            },
          ],
          valorNumerador: true,
          valorDenominador: true,
          sentidoDelIndicador: true,
          unidadResponsable: true,
          descIndicador: true,
          descNumerador: true,
          descDenominador: true,
        })),
      };
    });
    setEditComponentes(cEdit);

    let aEdit = arr.map((item) => {
      return {
        actividad: item.actividad,
        metaAnual: true,
        lineaBase: true,
        metasPorFrecuencia: [
          {
            semestre1: true,
            semestre2: true,
            trimestre1: true,
            trimestre2: true,
            trimestre3: true,
            trimestre4: true,
          },
        ],
        valorNumerador: true,
        valorDenominador: true,
        sentidoDelIndicador: true,
        unidadResponsable: true,
        descIndicador: true,
        descNumerador: true,
        descDenominador: true,
      };
    });

    setEditActividades(aEdit);

    
  }, []);

 

  const [editFin, setEditFin] = useState<IFinEditMA>({
    metaAnual: true,
    lineaBase: true,
    valorNumerador: true,
    valorDenominador: true,
    sentidoDelIndicador: true,
    unidadResponsable: true,
    descIndicador: true,
    descNumerador: true,
    descDenominador: true,
  });

  const [editProposito, setEditProposito] = useState<IPropositoEditMA>({
    metaAnual: true,
    lineaBase: true,
    valorNumerador: true,
    valorDenominador: true,
    sentidoDelIndicador: true,
    unidadResponsable: true,
    descIndicador: true,
    descNumerador: true,
    descDenominador: true,
  });

  const [editComponentes, setEditComponentes] = useState<
    Array<IComponenteEditMA>
  >([]);

  const [editActividades, setEditActividades] = useState<
    Array<IActividadesEditMA>
  >([]);

  const [disablebutton2, setDisablebutton2] = useState(false);

  const [disablebutton3, setDisablebutton3] = useState(false);

  const [disablebuttoncomponentes, setDisablebuttoncomponentes] =
    useState(false);

  const [disablebuttonactividades, setDisablebuttonactividades] =
    useState(false);

  useEffect(() => {
    let arrayFin = Object.entries(editFin);
    let arrayProposito = Object.entries(editProposito);

    let arrayComponentes = editComponentes.map((item) => {
      let a = [
        item.metaAnual,
        item.lineaBase,
        item.valorNumerador,
        item.valorDenominador,
        item.metasPorFrecuencia,
        item.sentidoDelIndicador,
        item.unidadResponsable,
        item.descIndicador,
        item.descNumerador,
        item.descDenominador,
      ];

      let x = a.every((value) => value === true);
      return x;
    });

    let arrayActividad = editActividades.map((item) => {
      let a = [
        item.metaAnual,
        item.lineaBase,
        item.valorNumerador,
        item.valorDenominador,
        item.metasPorFrecuencia,
        item.sentidoDelIndicador,
        item.unidadResponsable,
        item.descIndicador,
        item.descNumerador,
        item.descDenominador,
      ];

      let x = a.every((value) => value === true);
      return x;
    });

    let respFin = arrayFin.every((item) => item[1] === true);
    let respProposito = arrayProposito.every((item) => item[1] === true);
    let respuestaComponentes = arrayComponentes.every((item) => item === true);
    let respuestaActividades = arrayActividad.every((item) => item === true);

    setDisablebutton2(respFin);

    setDisablebutton3(respProposito);

    setDisablebuttoncomponentes(respuestaComponentes);

    setDisablebuttonactividades(respuestaActividades);
  }, [editFin, editProposito, editComponentes, editActividades]);

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

  

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Grid
      sx={{
        //display: "flex",
        width: "93vw",
        height: "82vh",
        ...(isSmallScreen
          ? {boxShadow: 10,
            borderRadius: 5,}
          : {
              
            }),
        // alignItems: "center",
        // justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "#fff",
        ...(!isSmallScreen && {
          height: "100%",
          overflow: "auto",
          // Otros estilos específicos para pantallas pequeñas
        }),
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
        display={"flex"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
        sx={{
          ...(isSmallScreen && {
            height: "85%",
            overflow: "auto",
            // Otros estilos específicos para pantallas pequeñas
          }),
        }}
      >
        <Grid
          item
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            //display: "flex",
            //flexDirection: "row",

            //mt: 1,
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          <Typography
            sx={{
              fontFamily: "MontserratBold",
              borderBottom: 1,
              mt: 1,
              textTransform: "uppercase",
            }}
          >
            Fin
          </Typography>
        </Grid>

        <Grid
          item
          container
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",

            //mt: 1,
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          {localStorage.getItem("Rol") === "Capturador" ? null : (
            <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
              <Checkbox
                // value={!editFin.metaAnual}
                // onChange={(v) => {
                //   setEditFin({ ...editFin, metaAnual: !v.target.checked });
                // }}
                // onChange={(v) => {
                //   let aux = mirEdit.fin
                //   aux = {...aux, frecuencia: v.target.checked }
                //   setMIREDITPADRE({...mirEdit, fin: aux  })
                // }}
                checked={maPadreEdit.fin?.metaAnual}
                onChange={(v) => {
                  let aux = maPadreEdit.fin;
                  aux = { ...aux, metaAnual: v.target.checked };
                  setMAPadreEdit({ ...maPadreEdit, fin: aux });
                }}
              />
            </Grid>
          )}
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              META ANUAL:
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {maPadre.fin?.metaAnual}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",

            //mt: 1,
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          {localStorage.getItem("Rol") === "Capturador" ? null : (
            <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
              <Checkbox
                // checked={!editFin.lineaBase}
                // onChange={(v) => {
                //   setEditFin({ ...editFin, lineaBase: !v.target.checked });
                // }}
                checked={maPadreEdit.fin?.lineaBase}
                onChange={(v) => {
                  let aux = maPadreEdit.fin;
                  aux = { ...aux, lineaBase: v.target.checked };
                  setMAPadreEdit({ ...maPadreEdit, fin: aux });
                }}
              />
            </Grid>
          )}
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              LÍNEA BASE:
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {maPadre.fin?.lineaBase}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          container
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",

            //mt: 1,
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          {localStorage.getItem("Rol") === "Capturador" ? null : (
            <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
              <Checkbox
                // checked={!editFin.valorNumerador}
                // onChange={(v) => {
                //   setEditFin({ ...editFin, valorNumerador: !v.target.checked });
                // }}
                checked={maPadreEdit.fin?.valorNumerador}
                onChange={(v) => {
                  let aux = maPadreEdit.fin;
                  aux = { ...aux, valorNumerador: v.target.checked };
                  setMAPadreEdit({ ...maPadreEdit, fin: aux });
                }}
              />
            </Grid>
          )}

          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              {JSON.parse(MIR).fin.indicador.toLowerCase().includes("indice") ||
              JSON.parse(MIR).fin.indicador.toLowerCase().includes("índice")
                ? "ÍNDICE: "
                : "VALOR NUMERADOR:"}
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {maPadre.fin?.valorNumerador}
            </Typography>
          </Grid>
        </Grid>

        {JSON.parse(MIR).fin.indicador.toLowerCase().includes("indice") ||
        JSON.parse(MIR)
          .fin.indicador.toLowerCase()
          .includes("índice") ? null : (
          <Grid
            item
            container
            xl={11}
            lg={11}
            md={12}
            sm={12}
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "row",

              //mt: 1,
              alignItems: "center",
              borderBottom: 1,
              borderColor: "#cfcfcf",
            }}
          >
            {localStorage.getItem("Rol") === "Capturador" ? null : (
              <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                <Checkbox
                  // checked={!editFin.valorDenominador}
                  // onChange={(v) => {
                  //   setEditFin({
                  //     ...editFin,
                  //     valorDenominador: !v.target.checked,
                  //   });
                  // }}
                  checked={maPadreEdit.fin?.valorDenominador}
                  onChange={(v) => {
                    let aux = maPadreEdit.fin;
                    aux = { ...aux, valorDenominador: v.target.checked };
                    setMAPadreEdit({ ...maPadreEdit, fin: aux });
                  }}
                />
              </Grid>
            )}
            <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                VALOR DENOMINADOR:
              </Typography>
            </Grid>

            <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
              <Typography sx={{ fontFamily: "MontserratLight" }}>
                {maPadre.fin?.valorDenominador}
              </Typography>
            </Grid>
          </Grid>
        )}

        <Grid
          item
          container
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",

            //mt: 1,
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          {localStorage.getItem("Rol") === "Capturador" ? null : (
            <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
              <Checkbox
                // checked={!editFin.sentidoDelIndicador}
                // onChange={(v) => {
                //   setEditFin({
                //     ...editFin,
                //     sentidoDelIndicador: !v.target.checked,
                //   });
                // }}
                checked={maPadreEdit.fin?.sentidoDelIndicador}
                onChange={(v) => {
                  let aux = maPadreEdit.fin;
                  aux = { ...aux, sentidoDelIndicador: v.target.checked };
                  setMAPadreEdit({ ...maPadreEdit, fin: aux });
                }}
              />
            </Grid>
          )}
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
             SENTIDO DEL INDICADOR:
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {maPadre.fin?.sentidoDelIndicador}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          container
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",

            //mt: 1,
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          {localStorage.getItem("Rol") === "Capturador" ? null : (
            <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
              <Checkbox
                // checked={!editFin.unidadResponsable}
                // onChange={(v) => {
                //   setEditFin({
                //     ...editFin,
                //     unidadResponsable: !v.target.checked,
                //   });
                // }}
                checked={maPadreEdit.fin?.unidadResponsable}
                onChange={(v) => {
                  let aux = maPadreEdit.fin;
                  aux = { ...aux, unidadResponsable: v.target.checked };
                  setMAPadreEdit({ ...maPadreEdit, fin: aux });
                }}
              />
            </Grid>
          )}
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              UNIDAD RESPONSABLE DE REPORTAR EL INDICADOR:
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {maPadre.fin?.unidadResponsable}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          container
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",

            //mt: 1,
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          {localStorage.getItem("Rol") === "Capturador" ? null : (
            <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
              <Checkbox
                // checked={!editFin.descIndicador}
                // onChange={(v) => {
                //   setEditFin({ ...editFin, descIndicador: !v.target.checked });
                // }}
                checked={maPadreEdit.fin?.descIndicador}
                onChange={(v) => {
                  let aux = maPadreEdit.fin;
                  aux = { ...aux, descIndicador: v.target.checked };
                  setMAPadreEdit({ ...maPadreEdit, fin: aux });
                }}
              />
            </Grid>
          )}
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              DESCRIPCIÓN DEL INDICADOR:
            </Typography>
          </Grid>
          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {maPadre.fin?.descIndicador}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          container
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",

            //mt: 1,
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          {localStorage.getItem("Rol") === "Capturador" ? null : (
            <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
              <Checkbox
                // checked={!editFin.descNumerador}
                // onChange={(v) => {
                //   setEditFin({ ...editFin, descNumerador: !v.target.checked });
                // }}
                checked={maPadreEdit.fin?.descNumerador}
                onChange={(v) => {
                  let aux = maPadreEdit.fin;
                  aux = { ...aux, descNumerador: v.target.checked };
                  setMAPadreEdit({ ...maPadreEdit, fin: aux });
                }}
              />
            </Grid>
          )}
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              DESCRIPCIÓN DEL NUMERADOR:
            </Typography>
          </Grid>
          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {maPadre.fin?.descNumerador}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          container
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",

            //mt: 1,
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          {localStorage.getItem("Rol") === "Capturador" ? null : (
            <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
              <Checkbox
                // checked={!editFin.descDenominador}
                // onChange={(v) => {
                //   setEditFin({
                //     ...editFin,
                //     descDenominador: !v.target.checked,
                //   });
                // }}
                checked={maPadreEdit.fin?.descDenominador}
                onChange={(v) => {
                  let aux = maPadreEdit.fin;
                  aux = { ...aux, descDenominador: v.target.checked };
                  setMAPadreEdit({ ...maPadreEdit, fin: aux });
                }}
              />
            </Grid>
          )}
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              DESCRIPCIÓN DEL DENOMINADOR:
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {maPadre.fin?.descDenominador}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            //display: "flex",
            //flexDirection: "row",

            //mt: 1,
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          <Typography
            sx={{ fontFamily: "MontserratBold", borderBottom: 1, mt: 5 }}
          >
            PROPÓSITO
          </Typography>
        </Grid>

        <Grid
          item
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",

            //mt: 1,
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          {localStorage.getItem("Rol") === "Capturador" ? null : (
            <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
              <Checkbox
                // checked={!editProposito.metaAnual}
                // onChange={(v) => {
                //   setEditProposito({
                //     ...editProposito,
                //     metaAnual: !v.target.checked,
                //   });
                // }}
                checked={maPadreEdit.proposito?.metaAnual}
                onChange={(v) => {
                  let aux = maPadreEdit.proposito;
                  aux = { ...aux, metaAnual: v.target.checked };
                  setMAPadreEdit({ ...maPadreEdit, proposito: aux });
                }}
              />
            </Grid>
          )}
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              META ANUAL:
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {maPadre.proposito?.metaAnual}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          container
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",

            //mt: 1,
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          {localStorage.getItem("Rol") === "Capturador" ? null : (
            <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
              <Checkbox
                // checked={!editProposito.lineaBase}
                // onChange={(v) => {
                //   setEditProposito({
                //     ...editProposito,
                //     lineaBase: !v.target.checked,
                //   });
                // }}
                checked={maPadreEdit.proposito?.lineaBase}
                onChange={(v) => {
                  let aux = maPadreEdit.proposito;
                  aux = { ...aux, lineaBase: v.target.checked };
                  setMAPadreEdit({ ...maPadreEdit, proposito: aux });
                }}
              />
            </Grid>
          )}
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              LINEA BASE:
            </Typography>
          </Grid>
          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {maPadre.proposito.lineaBase}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          container
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",

            //mt: 1,
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          {localStorage.getItem("Rol") === "Capturador" ? null : (
            <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
              <Checkbox
                // checked={!editProposito.valorNumerador}
                // onChange={(v) => {
                //   setEditProposito({
                //     ...editProposito,
                //     valorNumerador: !v.target.checked,
                //   });
                // }}
                checked={maPadreEdit.proposito?.valorNumerador}
                onChange={(v) => {
                  let aux = maPadreEdit.proposito;
                  aux = { ...aux, valorNumerador: v.target.checked };
                  setMAPadreEdit({ ...maPadreEdit, proposito: aux });
                }}
              />
            </Grid>
          )}
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              {JSON.parse(MIR)
                .proposito.indicador.toLowerCase()
                .includes("indice") ||
              JSON.parse(MIR)
                .proposito.indicador.toLowerCase()
                .includes("índice")
                ? "ÍNDICE: "
                : "VALOR NUMERADOR:"}
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {maPadre.proposito?.valorNumerador}
            </Typography>
          </Grid>
        </Grid>

        {JSON.parse(MIR).proposito.indicador.toLowerCase().includes("indice") ||
        JSON.parse(MIR)
          .proposito.indicador.toLowerCase()
          .includes("índice") ? null : (
          <Grid
            item
            container
            xl={11}
            lg={11}
            md={12}
            sm={12}
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "row",

              //mt: 1,
              alignItems: "center",
              borderBottom: 1,
              borderColor: "#cfcfcf",
            }}
          >
            {localStorage.getItem("Rol") === "Capturador" ? null : (
              <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                <Checkbox
                  // checked={!editProposito.valorDenominador}
                  // onChange={(v) => {
                  //   setEditProposito({
                  //     ...editProposito,
                  //     valorDenominador: !v.target.checked,
                  //   });
                  // }}
                  checked={maPadreEdit.proposito?.valorDenominador}
                  onChange={(v) => {
                    let aux = maPadreEdit.proposito;
                    aux = { ...aux, valorDenominador: v.target.checked };
                    setMAPadreEdit({ ...maPadreEdit, proposito: aux });
                  }}
                />
              </Grid>
            )}

            <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                VALOR DENOMINADOR:
              </Typography>
            </Grid>

            <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
              <Typography sx={{ fontFamily: "MontserratLight" }}>
                {maPadre.proposito?.valorDenominador}
              </Typography>
            </Grid>
          </Grid>
        )}

        <Grid
          item
          container
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",

            //mt: 1,
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          {localStorage.getItem("Rol") === "Capturador" ? null : (
            <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
              <Checkbox
                // checked={!editProposito.sentidoDelIndicador}
                // onChange={(v) => {
                //   setEditProposito({
                //     ...editProposito,
                //     sentidoDelIndicador: !v.target.checked,
                //   });
                // }}
                checked={maPadreEdit.proposito?.sentidoDelIndicador}
                onChange={(v) => {
                  let aux = maPadreEdit.proposito;
                  aux = { ...aux, sentidoDelIndicador: v.target.checked };
                  setMAPadreEdit({ ...maPadreEdit, proposito: aux });
                }}
              />
            </Grid>
          )}
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
             SENTIDO DEL INDICADOR:
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {maPadre.proposito?.sentidoDelIndicador}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          container
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",

            //mt: 1,
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          {localStorage.getItem("Rol") === "Capturador" ? null : (
            <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
              <Checkbox
                // checked={!editProposito.unidadResponsable}
                // onChange={(v) => {
                //   setEditProposito({
                //     ...editProposito,
                //     unidadResponsable: !v.target.checked,
                //   });
                // }}
                checked={maPadreEdit.proposito?.unidadResponsable}
                onChange={(v) => {
                  let aux = maPadreEdit.proposito;
                  aux = { ...aux, unidadResponsable: v.target.checked };
                  setMAPadreEdit({ ...maPadreEdit, proposito: aux });
                }}
              />
            </Grid>
          )}
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              UNIDAD RESPONSABLE DE REPORTAR EL INDICADOR:
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {maPadre.proposito?.unidadResponsable}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",

            //mt: 1,
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          {localStorage.getItem("Rol") === "Capturador" ? null : (
            <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
              <Checkbox
                // checked={!editProposito.descIndicador}
                // onChange={(v) => {
                //   setEditProposito({
                //     ...editProposito,
                //     descIndicador: !v.target.checked,
                //   });
                // }}
                checked={maPadreEdit.proposito?.descIndicador}
                onChange={(v) => {
                  let aux = maPadreEdit.proposito;
                  aux = { ...aux, descIndicador: v.target.checked };
                  setMAPadreEdit({ ...maPadreEdit, proposito: aux });
                }}
              />
            </Grid>
          )}
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              DESCRIPCIÓN DEL INDICADOR:
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {maPadre.proposito?.descIndicador}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          container
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",

            //mt: 1,
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          {localStorage.getItem("Rol") === "Capturador" ? null : (
            <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
              <Checkbox
                // checked={!editProposito.descNumerador}
                // onChange={(v) => {
                //   setEditProposito({
                //     ...editProposito,
                //     descNumerador: !v.target.checked,
                //   });
                // }}
                checked={maPadreEdit.proposito?.descNumerador}
                onChange={(v) => {
                  let aux = maPadreEdit.proposito;
                  aux = { ...aux, descNumerador: v.target.checked };
                  setMAPadreEdit({ ...maPadreEdit, proposito: aux });
                }}
              />
            </Grid>
          )}
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              DESCRIPCIÓN DEL NUMERADOR:
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {maPadre.proposito?.descNumerador}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          container
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",

            //mt: 1,
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          {localStorage.getItem("Rol") === "Capturador" ? null : (
            <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
              <Checkbox
                // checked={!editProposito.descDenominador}
                // onChange={(v) => {
                //   setEditProposito({
                //     ...editProposito,
                //     descDenominador: !v.target.checked,
                //   });
                // }}
                checked={maPadreEdit.proposito?.descDenominador}
                onChange={(v) => {
                  let aux = maPadreEdit.proposito;
                  aux = { ...aux, descDenominador: v.target.checked };
                  setMAPadreEdit({ ...maPadreEdit, proposito: aux });
                }}
              />
            </Grid>
          )}
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              DESCRIPCIÓN DEL DENOMINADOR:
            </Typography>
          </Grid>

          <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
            <Typography sx={{ fontFamily: "MontserratLight" }}>
              {maPadre.proposito?.descDenominador}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            //display: "flex",
            //flexDirection: "row",

            //mt: 1,
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          <Typography
            sx={{ fontFamily: "MontserratBold", borderBottom: 1, mt: 5 }}
          >
            Componentes
          </Typography>
        </Grid>

        {maPadre.componentes.map((componente, index) => {
          return (
            <Grid
              item
              container
              xl={11}
              lg={11}
              md={12}
              sm={12}
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "row",

                mt: 1,
                alignItems: "center",
                borderBottom: 1,
                borderColor: "#cfcfcf",
              }}
              key={index}
            >
              <Grid item>
                <Typography
                  sx={{
                    fontFamily: "MontserratMedium",
                    borderBottom: 1,
                    mt: 5,
                    textAlign: "center",
                  }}
                >
                  Componente {index + 1}
                </Typography>
              </Grid>

              <Grid
                item
                container
                xl={11}
                lg={11}
                md={12}
                sm={12}
                xs={12}
                sx={{
                  display: "flex",
                  flexDirection: "row",

                  //mt: 1,
                  alignItems: "center",
                  borderBottom: 1,
                  borderColor: "#cfcfcf",
                }}
              >
                {localStorage.getItem("Rol") === "Capturador" ? null : (
                  <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                    <Checkbox
                      // checked={maPadreEdit.componentes[index]?.metaAnual}
                      // onChange={(v) => {
                      //   let aux = maPadreEdit.componentes[index]
                      //   aux = {...aux, metaAnual: v.target.checked }
                      //   setMAPadreEdit({...maPadreEdit, componentes: aux  })
                      // }}
                      checked={maPadreEdit.componentes[index]?.metaAnual}
                      onChange={(v) => {
                        let auxC = maPadreEdit.componentes;
                        auxC[index].metaAnual = v.target.checked;
                        setMAPadreEdit({ ...maPadreEdit, componentes: auxC });
                      }}
                    />
                  </Grid>
                )}
                <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                  <Typography sx={{ fontFamily: "MontserratMedium" }}>
                    META ANUAL:
                  </Typography>
                </Grid>

                <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
                  <Typography sx={{ fontFamily: "MontserratLight" }}>
                    {componente?.metaAnual}
                  </Typography>
                </Grid>
              </Grid>

              <Grid
                item
                container
                xl={11}
                lg={11}
                md={12}
                sm={12}
                xs={12}
                sx={{
                  display: "flex",
                  flexDirection: "row",

                  //mt: 1,
                  alignItems: "center",
                  borderBottom: 1,
                  borderColor: "#cfcfcf",
                }}
              >
                {localStorage.getItem("Rol") === "Capturador" ? null : (
                  <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                    <Checkbox
                      // checked={!editComponentes[index - 1]?.lineaBase}
                      // onChange={(v) => {
                      //   let past = [...editComponentes];
                      //   past[index - 1].lineaBase = !v.target.checked;
                      //   setEditComponentes(past);
                      // }}
                      checked={maPadreEdit.componentes[index]?.lineaBase}
                      // onChange={(v) => {
                      //   let aux = maPadreEdit.componentes[index]
                      //   aux = {...aux, lineaBase: v.target.checked }
                      //   setMAPadreEdit({...maPadreEdit, componentes: aux  })
                      // }}
                      onChange={(v) => {
                        let auxC = maPadreEdit.componentes;
                        auxC[index].lineaBase = v.target.checked;
                        setMAPadreEdit({ ...maPadreEdit, componentes: auxC });
                      }}
                    />
                  </Grid>
                )}
                <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                  <Typography sx={{ fontFamily: "MontserratMedium" }}>
                    LÍNEA BASE:
                  </Typography>
                </Grid>
                <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
                  <Typography sx={{ fontFamily: "MontserratLight" }}>
                    {componente?.lineaBase}
                  </Typography>
                </Grid>
              </Grid>

              <Grid
                item
                container
                xl={11}
                lg={11}
                md={12}
                sm={12}
                xs={12}
                sx={{
                  display: "flex",
                  flexDirection: "row",

                  //mt: 1,
                  alignItems: "center",
                  borderBottom: 1,
                  borderColor: "#cfcfcf",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "MontserratMedium",
                  }}
                >
                 METAS POR FRECUENCIA
                </Typography>

                {componente?.metasPorFrecuencia[0]?.trimestre1 === "" &&
                componente?.metasPorFrecuencia[0]?.trimestre2 === "" &&
                componente?.metasPorFrecuencia[0]?.trimestre3 === "" &&
                componente?.metasPorFrecuencia[0]?.trimestre4 === "" ? (
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
                      flexDirection: "row",

                      //mt: 1,
                      alignItems: "center",
                      borderBottom: 1,
                      borderColor: "#cfcfcf",
                    }}
                  >
                    {localStorage.getItem("Rol") === "Capturador" ? null : (
                      <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                        <Checkbox
                          // checked={
                          //   !editComponentes[index - 1]?.metasPorFrecuencia[0]
                          //     .semestre1
                          // }
                          // onChange={(v) => {
                          //   let past = [...editComponentes];
                          //   past[index - 1].metasPorFrecuencia[0].semestre1 =
                          //     !v.target.checked;
                          //   setEditComponentes(past);
                          // }}
                          checked={
                            maPadreEdit.componentes[index]
                              ?.metasPorFrecuencia[0].semestre1
                          }
                          onChange={(v) => {
                            let auxC = maPadreEdit.componentes;
                            auxC[index].metasPorFrecuencia[0].semestre1 =
                              v.target.checked;
                            setMAPadreEdit({
                              ...maPadreEdit,
                              componentes: auxC,
                            });
                          }}
                        />
                      </Grid>
                    )}

                    
                    <Grid item xl={1} lg={1} md={12} sm={12} xs={12}>
                      <Typography sx={{ fontFamily: "MontserratMedium" }}>
                       SEMESTRE 1:
                      </Typography>
                    </Grid>

                    <Grid item xl={1} lg={1} md={12} sm={12} xs={12}>
                      <Typography sx={{ fontFamily: "MontserratLight", ml: 1 }}>
                        {componente?.metasPorFrecuencia[0]?.semestre1}
                      </Typography>
                    </Grid>

                    {localStorage.getItem("Rol") === "Capturador" ? null : (
                      <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                        <Checkbox
                          // checked={
                          //   !editComponentes[index - 1]?.metasPorFrecuencia[0]
                          //     .semestre2
                          // }
                          // onChange={(v) => {
                          //   let past = [...editComponentes];
                          //   past[index - 1].metasPorFrecuencia[0].semestre2 =
                          //     !v.target.checked;
                          //   setEditComponentes(past);
                          // }}
                          checked={
                            maPadreEdit.componentes[index]
                              ?.metasPorFrecuencia[0].semestre2
                          }
                          onChange={(v) => {
                            let auxC = maPadreEdit.componentes;
                            auxC[index].metasPorFrecuencia[0].semestre2 =
                              v.target.checked;
                            setMAPadreEdit({
                              ...maPadreEdit,
                              componentes: auxC,
                            });
                          }}
                        />
                      </Grid>
                    )}

                    <Grid item xl={1} lg={1} md={12} sm={12} xs={12}>
                      <Typography sx={{ fontFamily: "MontserratMedium" }}>
                        SEMESTRE  2:
                      </Typography>
                    </Grid>

                    <Grid item xl={1} lg={1} md={12} sm={12} xs={12}>
                      <Typography sx={{ fontFamily: "MontserratLight", ml: 1 }}>
                        {componente?.metasPorFrecuencia[0]?.semestre2}
                      </Typography>
                    </Grid>

                  </Grid>
                ) : (
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
                      flexDirection: "row",

                      //mt: 1,
                      alignItems: "center",
                      borderBottom: 1,
                      borderColor: "#cfcfcf",
                    }}
                  >
                    {localStorage.getItem("Rol") === "Capturador" ? null : (
                      <Grid item xl={1} lg={1} md={12} sm={12} xs={12}>
                        <Checkbox
                          // checked={
                          //   !editComponentes[index - 1]?.metasPorFrecuencia[0]
                          //     .trimestre1
                          // }
                          // onChange={(v) => {
                          //   let past = [...editComponentes];
                          //   past[index - 1].metasPorFrecuencia[0].trimestre1 =
                          //     !v.target.checked;
                          //   setEditComponentes(past);
                          // }}
                          checked={
                            maPadreEdit.componentes[index]
                              ?.metasPorFrecuencia[0].trimestre1
                          }
                          onChange={(v) => {
                            let auxC = maPadreEdit.componentes;
                            auxC[index].metasPorFrecuencia[0].trimestre1 =
                              v.target.checked;
                            setMAPadreEdit({
                              ...maPadreEdit,
                              componentes: auxC,
                            });
                          }}
                        />
                      </Grid>
                    )}

                    <Grid item xl={1} lg={1} md={12} sm={12} xs={12}>
                      <Typography sx={{ fontFamily: "MontserratMedium" }}>
                        TRIMESTRE 1:
                      </Typography>
                    </Grid>

                    <Grid item xl={1} lg={1} md={12} sm={12} xs={12}>
                      <Typography sx={{ fontFamily: "MontserratLight", ml: 1 }}>
                        {componente?.metasPorFrecuencia[0]?.trimestre1}
                      </Typography>
                    </Grid>

                    {localStorage.getItem("Rol") === "Capturador" ? null : (
                      <Grid item xl={1} lg={1} md={12} sm={12} xs={12}>
                        <Checkbox
                          // checked={
                          //   !editComponentes[index - 1]?.metasPorFrecuencia[0]
                          //     .trimestre2
                          // }
                          // onChange={(v) => {
                          //   let past = [...editComponentes];
                          //   past[index - 1].metasPorFrecuencia[0].trimestre2 =
                          //     !v.target.checked;
                          //   setEditComponentes(past);
                          // }}
                          checked={
                            maPadreEdit.componentes[index]
                              ?.metasPorFrecuencia[0].trimestre2
                          }
                          onChange={(v) => {
                            let auxC = maPadreEdit.componentes;
                            auxC[index].metasPorFrecuencia[0].trimestre2 =
                              v.target.checked;
                            setMAPadreEdit({
                              ...maPadreEdit,
                              componentes: auxC,
                            });
                          }}
                        />
                      </Grid>
                    )}
                    <Grid item xl={1} lg={1} md={12} sm={12} xs={12}>
                      <Typography sx={{ fontFamily: "MontserratMedium" }}>
                        TRIMESTRE 2:
                      </Typography>
                    </Grid>

                    <Grid item xl={1} lg={1} md={12} sm={12} xs={12}>
                      <Typography sx={{ fontFamily: "MontserratLight", ml: 1 }}>
                        {componente?.metasPorFrecuencia[0]?.trimestre2}
                      </Typography>
                    </Grid>

                    {localStorage.getItem("Rol") === "Capturador" ? null : (
                      <Grid item xl={1} lg={1} md={12} sm={12} xs={12}>
                        <Checkbox
                          // checked={
                          //   !editComponentes[index - 1]?.metasPorFrecuencia[0]
                          //     .trimestre3
                          // }
                          // onChange={(v) => {
                          //   let past = [...editComponentes];
                          //   past[index - 1].metasPorFrecuencia[0].trimestre3 =
                          //     !v.target.checked;
                          //   setEditComponentes(past);
                          // }}
                          checked={
                            maPadreEdit.componentes[index]
                              ?.metasPorFrecuencia[0].trimestre3
                          }
                          onChange={(v) => {
                            let auxC = maPadreEdit.componentes;
                            auxC[index].metasPorFrecuencia[0].trimestre3 =
                              v.target.checked;
                            setMAPadreEdit({
                              ...maPadreEdit,
                              componentes: auxC,
                            });
                          }}
                        />
                      </Grid>
                    )}
                    <Grid item xl={1} lg={1} md={12} sm={12} xs={12}>
                      <Typography sx={{ fontFamily: "MontserratMedium" }}>
                        TRIMESTRE 3:
                      </Typography>
                    </Grid>

                    <Grid item xl={1} lg={1} md={12} sm={12} xs={12}>
                      <Typography sx={{ fontFamily: "MontserratLight", ml: 1 }}>
                        {componente?.metasPorFrecuencia[0]?.trimestre3}
                      </Typography>
                    </Grid>

                    {localStorage.getItem("Rol") === "Capturador" ? null : (
                      <Grid item xl={1} lg={1} md={12} sm={12} xs={12}>
                        <Checkbox
                          // checked={
                          //   !editComponentes[index - 1]?.metasPorFrecuencia[0]
                          //     .trimestre4
                          // }
                          // onChange={(v) => {
                          //   let past = [...editComponentes];
                          //   past[index - 1].metasPorFrecuencia[0].trimestre4 =
                          //     !v.target.checked;
                          //   setEditComponentes(past);
                          // }}
                          checked={
                            maPadreEdit.componentes[index]
                              ?.metasPorFrecuencia[0].trimestre4
                          }
                          onChange={(v) => {
                            let auxC = maPadreEdit.componentes;
                            auxC[index].metasPorFrecuencia[0].trimestre4 =
                              v.target.checked;
                            setMAPadreEdit({
                              ...maPadreEdit,
                              componentes: auxC,
                            });
                          }}
                        />
                      </Grid>
                    )}
                    <Grid item xl={1} lg={1} md={12} sm={12} xs={12}>
                      <Typography sx={{ fontFamily: "MontserratMedium" }}>
                        TRIMESTRE 4:
                      </Typography>
                    </Grid>

                    <Grid item xl={1} lg={1} md={12} sm={12} xs={12}>
                      <Typography sx={{ fontFamily: "MontserratLight", ml: 1 }}>
                        {componente?.metasPorFrecuencia[0]?.trimestre4}
                      </Typography>
                    </Grid>
                  </Grid>
                )}
              </Grid>

              <Grid
                item
                container
                xl={11}
                lg={11}
                md={12}
                sm={12}
                xs={12}
                sx={{
                  display: "flex",
                  flexDirection: "row",

                  //mt: 1,
                  alignItems: "center",
                  borderBottom: 1,
                  borderColor: "#cfcfcf",
                }}
              >
                {localStorage.getItem("Rol") === "Capturador" ? null : (
                  <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                    <Checkbox
                      // checked={!editComponentes[index - 1]?.valorNumerador}
                      // onChange={(v) => {
                      //   let past = [...editComponentes];
                      //   past[index - 1].valorNumerador = !v.target.checked;
                      //   setEditComponentes(past);
                      // }}
                      checked={maPadreEdit.componentes[index]?.valorNumerador}
                      onChange={(v) => {
                        let auxC = maPadreEdit.componentes;
                        auxC[index].valorNumerador = v.target.checked;
                        setMAPadreEdit({ ...maPadreEdit, componentes: auxC });
                      }}
                    />
                  </Grid>
                )}
                <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                  <Typography sx={{ fontFamily: "MontserratMedium" }}>
                    {JSON.parse(MIR)
                      .componentes[index - 1]?.indicador.toUpperCase()
                      .includes("INDICE") ||
                    JSON.parse(MIR)
                      .componentes[index - 1]?.indicador.toUpperCase()
                      .includes("ÍNDICE")
                      ? "ÍNDICE: "
                      : "VALOR NUMERADOR: "}
                  </Typography>
                </Grid>
                <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
                  <Typography sx={{ fontFamily: "MontserratLight" }}>
                    {componente?.valorNumerador}
                  </Typography>
                </Grid>
              </Grid>

              {JSON.parse(MIR)
                .componentes[index - 1]?.indicador.toUpperCase()
                .includes("INDICE") ||
              JSON.parse(MIR)
                .componentes[index - 1]?.indicador.toUpperCase()
                .includes("ÍNDICE") ? null : (
                <Grid
                  item
                  container
                  xl={11}
                  lg={11}
                  md={12}
                  sm={12}
                  xs={12}
                  sx={{
                    display: "flex",
                    flexDirection: "row",

                    //mt: 1,
                    alignItems: "center",
                    borderBottom: 1,
                    borderColor: "#cfcfcf",
                  }}
                >
                  {localStorage.getItem("Rol") === "Capturador" ? null : (
                    <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                      <Checkbox
                      
                        checked={
                          maPadreEdit.componentes[index]?.valorDenominador
                        }
                        onChange={(v) => {
                          let auxC = maPadreEdit.componentes;
                          auxC[index].valorDenominador = v.target.checked;
                          setMAPadreEdit({ ...maPadreEdit, componentes: auxC });
                        }}
                      />
                    </Grid>
                  )}
                  <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                    <Typography sx={{ fontFamily: "MontserratMedium" }}>
                      VALOR DENOMINADOR:
                    </Typography>
                  </Grid>
                  <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
                    <Typography sx={{ fontFamily: "MontserratLight" }}>
                      {componente?.valorDenominador}
                    </Typography>
                  </Grid>
                </Grid>
              )}

              <Grid
                item
                container
                xl={11}
                lg={11}
                md={12}
                sm={12}
                xs={12}
                sx={{
                  display: "flex",
                  flexDirection: "row",

                  //mt: 1,
                  alignItems: "center",
                  borderBottom: 1,
                  borderColor: "#cfcfcf",
                }}
              >
                {localStorage.getItem("Rol") === "Capturador" ? null : (
                  <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                    <Checkbox
                      // checked={!editComponentes[index - 1]?.sentidoDelIndicador}
                      // onChange={(v) => {
                      //   let past = [...editComponentes];
                      //   past[index - 1].sentidoDelIndicador = !v.target.checked;
                      //   setEditComponentes(past);
                      // }}
                      checked={
                        maPadreEdit.componentes[index]?.sentidoDelIndicador
                      }
                      onChange={(v) => {
                        let auxC = maPadreEdit.componentes;
                        auxC[index].sentidoDelIndicador = v.target.checked;
                        setMAPadreEdit({ ...maPadreEdit, componentes: auxC });
                      }}
                    />
                  </Grid>
                )}
                <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                  <Typography sx={{ fontFamily: "MontserratMedium" }}>
                   SENTIDO DEL INDICADOR:
                  </Typography>
                </Grid>

                <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
                  <Typography sx={{ fontFamily: "MontserratLight" }}>
                    {componente?.sentidoDelIndicador}
                  </Typography>
                </Grid>
              </Grid>

              <Grid
                item
                container
                xl={11}
                lg={11}
                md={12}
                sm={12}
                xs={12}
                sx={{
                  display: "flex",
                  flexDirection: "row",

                  //mt: 1,
                  alignItems: "center",
                  borderBottom: 1,
                  borderColor: "#cfcfcf",
                }}
              >
                {localStorage.getItem("Rol") === "Capturador" ? null : (
                  <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                    <Checkbox
                      // checked={!editComponentes[index - 1]?.unidadResponsable}
                      // onChange={(v) => {
                      //   let past = [...editComponentes];
                      //   past[index - 1].unidadResponsable = !v.target.checked;
                      //   setEditComponentes(past);
                      // }}
                      checked={maPadreEdit.componentes[index]?.unidadResponsable}
                      onChange={(v) => {
                        let auxC = maPadreEdit.componentes;
                        auxC[index].unidadResponsable = v.target.checked;
                        setMAPadreEdit({ ...maPadreEdit, componentes: auxC });
                      }}
                    />
                  </Grid>
                )}
                <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                  <Typography sx={{ fontFamily: "MontserratMedium" }}>
                    UNIDAD RESPONSABLE DE REPORTAR EL INDICADOR:
                  </Typography>
                </Grid>
                <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                  <Typography sx={{ fontFamily: "MontserratLight" }}>
                    {componente?.unidadResponsable}
                  </Typography>
                </Grid>
              </Grid>

              <Grid
                item
                container
                xl={11}
                lg={11}
                md={12}
                sm={12}
                xs={12}
                sx={{
                  display: "flex",
                  flexDirection: "row",

                  //mt: 1,
                  alignItems: "center",
                  borderBottom: 1,
                  borderColor: "#cfcfcf",
                }}
              >
                {localStorage.getItem("Rol") === "Capturador" ? null : (
                  <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                    <Checkbox
                      // checked={!editComponentes[index - 1]?.descIndicador}
                      // onChange={(v) => {
                      //   let past = [...editComponentes];
                      //   past[index - 1].descIndicador = !v.target.checked;
                      //   setEditComponentes(past);
                      // }}
                      checked={maPadreEdit.componentes[index]?.descIndicador}
                      onChange={(v) => {
                        let auxC = maPadreEdit.componentes;
                        auxC[index].descIndicador = v.target.checked;
                        setMAPadreEdit({ ...maPadreEdit, componentes: auxC });
                      }}
                    />
                  </Grid>
                )}
                <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                  <Typography sx={{ fontFamily: "MontserratMedium" }}>
                    DESCRIPCIÓN DEL INDICADOR:
                  </Typography>
                </Grid>
                <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
                  <Typography sx={{ fontFamily: "MontserratLight" }}>
                    {componente?.descIndicador}
                  </Typography>
                </Grid>
              </Grid>

              <Grid
                item
                container
                xl={11}
                lg={11}
                md={12}
                sm={12}
                xs={12}
                sx={{
                  display: "flex",
                  flexDirection: "row",

                  //mt: 1,
                  alignItems: "center",
                  borderBottom: 1,
                  borderColor: "#cfcfcf",
                }}
              >
                {localStorage.getItem("Rol") === "Capturador" ? null : (
                  <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                    <Checkbox
                      // checked={!editComponentes[index - 1]?.descNumerador}
                      // onChange={(v) => {
                      //   let past = [...editComponentes];
                      //   past[index - 1].descNumerador = !v.target.checked;
                      //   setEditComponentes(past);
                      // }}
                      checked={maPadreEdit.componentes[index]?.descNumerador}
                      onChange={(v) => {
                        let auxC = maPadreEdit.componentes;
                        auxC[index].descNumerador = v.target.checked;
                        setMAPadreEdit({ ...maPadreEdit, componentes: auxC });
                      }}
                    />
                  </Grid>
                )}
                <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                  <Typography sx={{ fontFamily: "MontserratMedium" }}>
                    DESCRIPCIÓN DEL NUMERADOR:
                  </Typography>
                </Grid>
                <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
                  <Typography sx={{ fontFamily: "MontserratLight" }}>
                    {componente?.descNumerador}
                  </Typography>
                </Grid>
              </Grid>

              <Grid
                item
                xl={11}
                lg={11}
                md={12}
                sm={12}
                xs={12}
                sx={{
                  display: "flex",
                  flexDirection: "row",

                  //mt: 1,
                  alignItems: "center",
                  borderBottom: 1,
                  borderColor: "#cfcfcf",
                }}
              >
                {localStorage.getItem("Rol") === "Capturador" ? null : (
                  <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                    <Checkbox
                      // checked={!editComponentes[index - 1]?.descDenominador}
                      // onChange={(v) => {
                      //   let past = [...editComponentes];
                      //   past[index - 1].descDenominador = !v.target.checked;
                      //   setEditComponentes(past);
                      // }}
                      checked={maPadreEdit.componentes[index]?.descDenominador}
                      onChange={(v) => {
                        let auxC = maPadreEdit.componentes;
                        auxC[index].descDenominador = v.target.checked;
                        setMAPadreEdit({ ...maPadreEdit, componentes: auxC });
                      }}
                    />
                  </Grid>
                )}
                <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                  <Typography sx={{ fontFamily: "MontserratMedium" }}>
                    DESCRIPCIÓN DEL DENOMINADOR:
                  </Typography>
                </Grid>
                <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
                  <Typography sx={{ fontFamily: "MontserratLight" }}>
                    {componente?.descDenominador}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          );
        })}

        <Grid
          item
          xl={11}
          lg={11}
          md={12}
          sm={12}
          xs={12}
          sx={{
            //display: "flex",
            //flexDirection: "row",

            //mt: 1,
            alignItems: "center",
            borderBottom: 1,
            borderColor: "#cfcfcf",
          }}
        >
          <Typography
            sx={{
              fontFamily: "MontserratBold",
              borderBottom: 1,
              mt: 1,
              textTransform: "uppercase",
            }}
          >
            Actividades
          </Typography>
        </Grid>

        {maPadre.componentes.map(
          (componente: IComponenteMA, indexComponentes) => {
            let i = 0;
            return componente.actividades.map(
              (actividad: IActividadesMA, indexActividades) => {
                i++;
                return (
                  <Grid
                    item
                    container
                    xl={11}
                    lg={11}
                    md={12}
                    sm={12}
                    xs={12}
                    sx={{
                      display: "flex",
                      flexDirection: "row",

                      //mb: 1,
                      alignItems: "center",
                      borderBottom: 1,
                      borderColor: "#cfcfcf",
                    }}
                    key={indexActividades}
                  >
                    <Grid item>
                      <Typography
                        sx={{
                          fontFamily: "MontserratMedium",
                          borderBottom: 1,
                          mt: 1,
                          textAlign: "center",
                          textTransform: "uppercase",
                        }}
                      >
                        Componente {indexComponentes + 1} - Actividad{" "}
                        {indexActividades + 1}
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      container
                      xl={11}
                      lg={11}
                      md={12}
                      sm={12}
                      xs={12}
                      sx={{
                        display: "flex",
                        flexDirection: "row",

                        //mt: 1,
                        alignItems: "center",
                        borderBottom: 1,
                        borderColor: "#cfcfcf",
                      }}
                    >
                      {localStorage.getItem("Rol") === "Capturador" ? null : (
                        <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                          <Checkbox
                            checked={
                              maPadreEdit.componentes[indexComponentes]
                                ?.actividades[indexActividades]?.metaAnual
                            }
                            onChange={(v) => {
                              let auxC = maPadreEdit.componentes;
                              auxC[indexComponentes].actividades[
                                indexActividades
                              ].metaAnual = v.target.checked;
                              setMAPadreEdit({
                                ...maPadreEdit,
                                componentes: auxC,
                              });
                            }}
                          />
                        </Grid>
                      )}
                      <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                        <Typography sx={{ fontFamily: "MontserratMedium" }}>
                          META ANUAL:
                        </Typography>
                      </Grid>
                      <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
                        <Typography sx={{ fontFamily: "MontserratLight" }}>
                          {actividad.metaAnual}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid
                      item
                      container
                      xl={11}
                      lg={11}
                      md={12}
                      sm={12}
                      xs={12}
                      sx={{
                        display: "flex",
                        flexDirection: "row",

                        //mt: 1,
                        alignItems: "center",
                        borderBottom: 1,
                        borderColor: "#cfcfcf",
                      }}
                    >
                      {localStorage.getItem("Rol") === "Capturador" ? null : (
                        <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                          <Checkbox
                            // checked={
                            //   !editActividades[indexComponentes]?.lineaBase
                            // }
                            // onChange={(v) => {
                            //   let past = [...editActividades];
                            //   past[indexComponentes].lineaBase =
                            //     !v.target.checked;
                            //   setEditActividades(past);
                            // }}
                            checked={
                              maPadreEdit.componentes[indexComponentes]
                                ?.actividades[indexActividades]?.lineaBase
                            }
                            onChange={(v) => {
                              let auxC = maPadreEdit.componentes;
                              auxC[indexComponentes].actividades[
                                indexActividades
                              ].lineaBase = v.target.checked;
                              setMAPadreEdit({
                                ...maPadreEdit,
                                componentes: auxC,
                              });
                            }}
                          />
                        </Grid>
                      )}
                      <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                        <Typography sx={{ fontFamily: "MontserratMedium" }}>
                          LÍNEA BASE:
                        </Typography>
                      </Grid>
                      <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
                        <Typography sx={{ fontFamily: "MontserratLight" }}>
                          {actividad.lineaBase}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid
                      item
                      container
                      xl={11}
                      lg={11}
                      md={12}
                      sm={12}
                      xs={12}
                      sx={{
                        display: "flex",
                        flexDirection: "row",

                        //mt: 1,
                        alignItems: "center",
                        borderBottom: 1,
                        borderColor: "#cfcfcf",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "MontserratMedium",
                        }}
                      >
                       METAS POR FRECUENCIA
                      </Typography>

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
                          flexDirection: "row",

                          //mt: 1,
                          alignItems: "center",
                          borderBottom: 1,
                          borderColor: "#cfcfcf",
                        }}
                      >
                        {localStorage.getItem("Rol") === "Capturador" ? null : (
                          <Grid item xl={1} lg={1} md={12} sm={12} xs={12}>
                            <Checkbox
                              // checked={
                              //   !editActividades[
                              //     mapeaindice(
                              //       indexComponentes,
                              //       indexActividades
                              //     )
                              //   ]?.metasPorFrecuencia[0].trimestre1
                              // }
                              // onChange={(v) => {
                              //   let past = [...editActividades];
                              //   past[
                              //     mapeaindice(
                              //       indexComponentes,
                              //       indexActividades
                              //     )
                              //   ].metasPorFrecuencia[0].trimestre1 =
                              //     !v.target.checked;
                              //   setEditActividades(past);
                              // }}
                              checked={
                                maPadreEdit.componentes[indexComponentes]
                                  ?.actividades[indexActividades]
                                  ?.metasPorFrecuencia[0].trimestre1
                              }
                              onChange={(v) => {
                                let auxC = maPadreEdit.componentes;
                                auxC[indexComponentes].actividades[
                                  indexActividades
                                ].metasPorFrecuencia[0].trimestre1 =
                                  v.target.checked;
                                setMAPadreEdit({
                                  ...maPadreEdit,
                                  componentes: auxC,
                                });
                              }}
                            />
                          </Grid>
                        )}
                        <Grid item xl={1} lg={1} md={12} sm={12} xs={12}>
                          <Typography sx={{ fontFamily: "MontserratMedium" }}>
                            TRIMESTRE 1:
                          </Typography>
                        </Grid>
                        <Grid item xl={1} lg={1} md={12} sm={12} xs={12}>
                          <Typography
                            sx={{ fontFamily: "MontserratLight", ml: 1 }}
                          >
                            {actividad.metasPorFrecuencia[0].trimestre1}
                          </Typography>
                        </Grid>

                        {localStorage.getItem("Rol") === "Capturador" ? null : (
                          <Grid item xl={1} lg={1} md={12} sm={12} xs={12}>
                            <Checkbox
                              // checked={
                              //   !editActividades[
                              //     mapeaindice(
                              //       indexComponentes,
                              //       indexActividades
                              //     )
                              //   ]?.metasPorFrecuencia[0].trimestre2
                              // }
                              // onChange={(v) => {
                              //   let past = [...editActividades];
                              //   past[
                              //     mapeaindice(
                              //       indexComponentes,
                              //       indexActividades
                              //     )
                              //   ].metasPorFrecuencia[0].trimestre2 =
                              //     !v.target.checked;
                              //   setEditActividades(past);
                              // }}
                              checked={
                                maPadreEdit.componentes[indexComponentes]
                                  ?.actividades[indexActividades]
                                  ?.metasPorFrecuencia[0].trimestre2
                              }
                              onChange={(v) => {
                                let auxC = maPadreEdit.componentes;
                                auxC[indexComponentes].actividades[
                                  indexActividades
                                ].metasPorFrecuencia[0].trimestre2 =
                                  v.target.checked;
                                setMAPadreEdit({
                                  ...maPadreEdit,
                                  componentes: auxC,
                                });
                              }}
                            />
                          </Grid>
                        )}
                        <Grid item xl={1} lg={1} md={12} sm={12} xs={12}>
                          <Typography sx={{ fontFamily: "MontserratMedium" }}>
                            TRIMESTRE 2:
                          </Typography>
                        </Grid>
                        <Grid item xl={1} lg={1} md={12} sm={12} xs={12}>
                          <Typography
                            sx={{ fontFamily: "MontserratLight", ml: 1 }}
                          >
                            {actividad.metasPorFrecuencia[0].trimestre2}
                          </Typography>
                        </Grid>

                        {localStorage.getItem("Rol") === "Capturador" ? null : (
                          <Grid item xl={1} lg={1} md={12} sm={12} xs={12}>
                            <Checkbox
                              // checked={
                              //   !editActividades[
                              //     mapeaindice(
                              //       indexComponentes,
                              //       indexActividades
                              //     )
                              //   ]?.metasPorFrecuencia[0].trimestre3
                              // }
                              // onChange={(v) => {
                              //   let past = [...editActividades];
                              //   past[
                              //     mapeaindice(
                              //       indexComponentes,
                              //       indexActividades
                              //     )
                              //   ].metasPorFrecuencia[0].trimestre3 =
                              //     !v.target.checked;
                              //   setEditActividades(past);
                              // }}
                              checked={
                                maPadreEdit.componentes[indexComponentes]
                                  ?.actividades[indexActividades]
                                  ?.metasPorFrecuencia[0].trimestre3
                              }
                              onChange={(v) => {
                                let auxC = maPadreEdit.componentes;
                                auxC[indexComponentes].actividades[
                                  indexActividades
                                ].metasPorFrecuencia[0].trimestre3 =
                                  v.target.checked;
                                setMAPadreEdit({
                                  ...maPadreEdit,
                                  componentes: auxC,
                                });
                              }}
                            />
                          </Grid>
                        )}
                        <Grid item xl={1} lg={1} md={12} sm={12} xs={12}>
                          <Typography sx={{ fontFamily: "MontserratMedium" }}>
                            TRIMESTRE 3:
                          </Typography>
                        </Grid>
                        <Grid item xl={1} lg={1} md={12} sm={12} xs={12}>
                          <Typography
                            sx={{ fontFamily: "MontserratLight", ml: 1 }}
                          >
                            {actividad.metasPorFrecuencia[0].trimestre3}
                          </Typography>
                        </Grid>

                        {localStorage.getItem("Rol") === "Capturador" ? null : (
                          <Grid item xl={1} lg={1} md={12} sm={12} xs={12}>
                            <Checkbox
                              // checked={
                              //   !editActividades[
                              //     mapeaindice(
                              //       indexComponentes,
                              //       indexActividades
                              //     )
                              //   ]?.metasPorFrecuencia[0].trimestre4
                              // }
                              // onChange={(v) => {
                              //   let past = [...editActividades];
                              //   past[
                              //     mapeaindice(
                              //       indexComponentes,
                              //       indexActividades
                              //     )
                              //   ].metasPorFrecuencia[0].trimestre4 =
                              //     !v.target.checked;
                              //   setEditActividades(past);
                              // }}
                              checked={
                                maPadreEdit.componentes[indexComponentes]
                                  ?.actividades[indexActividades]
                                  ?.metasPorFrecuencia[0].trimestre4
                              }
                              onChange={(v) => {
                                let auxC = maPadreEdit.componentes;
                                auxC[indexComponentes].actividades[
                                  indexActividades
                                ].metasPorFrecuencia[0].trimestre4 =
                                  v.target.checked;
                                setMAPadreEdit({
                                  ...maPadreEdit,
                                  componentes: auxC,
                                });
                              }}
                            />
                          </Grid>
                        )}

                        <Grid item xl={1} lg={1} md={12} sm={12} xs={12}>
                          <Typography sx={{ fontFamily: "MontserratMedium" }}>
                            TRIMESTRE 4:
                          </Typography>
                        </Grid>
                        <Grid item xl={1} lg={1} md={12} sm={12} xs={12}>
                          <Typography
                            sx={{ fontFamily: "MontserratLight", ml: 1 }}
                          >
                            {actividad.metasPorFrecuencia[0].trimestre4}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid
                      item
                      container
                      xl={11}
                      lg={11}
                      md={12}
                      sm={12}
                      xs={12}
                      sx={{
                        display: "flex",
                        flexDirection: "row",

                        //mt: 1,
                        alignItems: "center",
                        borderBottom: 1,
                        borderColor: "#cfcfcf",
                      }}
                    >
                      {localStorage.getItem("Rol") === "Capturador" ? null : (
                        <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                          <Checkbox
                            checked={
                             ( maPadreEdit.componentes[indexComponentes]
                                ?.actividades[indexActividades]?.valorNumerador) 

                                // || 

                                // ( maPadreEdit.componentes[indexComponentes]
                                //   ?.actividades[indexActividades]?.valorDenominador)
                            }
                            onChange={(v) => {
                              let auxC = maPadreEdit.componentes;

                              auxC[indexComponentes].actividades[
                                indexActividades
                              ].valorNumerador = v.target.checked;

                              

                              setMAPadreEdit({
                                ...maPadreEdit,
                                componentes: auxC,
                              });
                            }}
                          />
                        </Grid>
                      )}
                      <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                        <Typography sx={{ fontFamily: "MontserratMedium" }}>
                          {JSON.parse(MIR)
                            .componentes[indexComponentes].actividades[
                              indexActividades
                            ].indicador.toUpperCase()
                            .includes("INDICE") ||
                          JSON.parse(MIR)
                            .componentes[indexComponentes].actividades[
                              indexActividades
                            ].indicador.toUpperCase()
                            .includes("ÍNDICE")
                            ? "ÍNDICE: "
                            : "VALOR NUMERADOR: "}
                        </Typography>
                      </Grid>
                      <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
                        <Typography sx={{ fontFamily: "MontserratLight" }}>
                          {actividad.valorNumerador}
                        </Typography>
                      </Grid>
                    </Grid>

                    {JSON.parse(MIR)
                      .componentes[indexComponentes].actividades[
                        indexActividades
                      ].indicador.toUpperCase()
                      .includes("INDICE") ||
                    JSON.parse(MIR)
                      .componentes[indexComponentes].actividades[
                        indexActividades
                      ].indicador.toUpperCase()
                      .includes("ÍNDICE") ? null : (
                      <Grid
                        item
                        container
                        xl={11}
                        lg={11}
                        md={12}
                        sm={12}
                        xs={12}
                        sx={{
                          display: "flex",
                          flexDirection: "row",

                          //mt: 1,
                          alignItems: "center",
                          borderBottom: 1,
                          borderColor: "#cfcfcf",
                        }}
                      >
                        {localStorage.getItem("Rol") === "Capturador" ? null : (
                          <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                            <Checkbox
                              // checked={
                              //   !editActividades[indexComponentes]
                              //     ?.valorDenominador
                              // }
                              // onChange={(v) => {
                              //   let past = [...editActividades];
                              //   past[indexComponentes].valorDenominador =
                              //     !v.target.checked;
                              //   setEditActividades(past);
                              // }}
                              checked={
                                maPadreEdit.componentes[indexComponentes]
                                  ?.actividades[indexActividades]
                                  ?.valorDenominador
                              }
                              onChange={(v) => {
                                let auxC = maPadreEdit.componentes;
                                auxC[indexComponentes].actividades[
                                  indexActividades
                                ].valorDenominador = v.target.checked;
                                setMAPadreEdit({
                                  ...maPadreEdit,
                                  componentes: auxC,
                                });
                              }}
                            />
                          </Grid>
                        )}
                        <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                          <Typography sx={{ fontFamily: "MontserratMedium" }}>
                            VALOR DENOMINADOR:
                          </Typography>
                        </Grid>
                        <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
                          <Typography sx={{ fontFamily: "MontserratLight" }}>
                            {actividad.valorDenominador}
                          </Typography>
                        </Grid>
                      </Grid>
                    )}

                    <Grid
                      item
                      container
                      xl={11}
                      lg={11}
                      md={12}
                      sm={12}
                      xs={12}
                      sx={{
                        display: "flex",
                        flexDirection: "row",

                        //mt: 1,
                        alignItems: "center",
                        borderBottom: 1,
                        borderColor: "#cfcfcf",
                      }}
                    >
                      {localStorage.getItem("Rol") === "Capturador" ? null : (
                        <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                          <Checkbox
                            // checked={
                            //   !editActividades[indexComponentes]
                            //     ?.sentidoDelIndicador
                            // }
                            // onChange={(v) => {
                            //   let past = [...editActividades];
                            //   past[indexComponentes].sentidoDelIndicador =
                            //     !v.target.checked;
                            //   setEditActividades(past);
                            // }}
                            checked={
                              maPadreEdit.componentes[indexComponentes]
                                ?.actividades[indexActividades]
                                ?.sentidoDelIndicador
                            }
                            onChange={(v) => {
                              let auxC = maPadreEdit.componentes;
                              auxC[indexComponentes].actividades[
                                indexActividades
                              ].sentidoDelIndicador = v.target.checked;
                              setMAPadreEdit({
                                ...maPadreEdit,
                                componentes: auxC,
                              });
                            }}
                          />
                        </Grid>
                      )}
                      <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                        <Typography sx={{ fontFamily: "MontserratMedium" }}>
                         SENTIDO DEL INDICADOR:
                        </Typography>
                      </Grid>
                      <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
                        <Typography sx={{ fontFamily: "MontserratLight" }}>
                          {actividad.sentidoDelIndicador}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid
                      item
                      container
                      xl={11}
                      lg={11}
                      md={12}
                      sm={12}
                      xs={12}
                      sx={{
                        display: "flex",
                        flexDirection: "row",

                        //mt: 1,
                        alignItems: "center",
                        borderBottom: 1,
                        borderColor: "#cfcfcf",
                      }}
                    >
                      {localStorage.getItem("Rol") === "Capturador" ? null : (
                        <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                          <Checkbox
                            // checked={
                            //   !editActividades[indexComponentes]
                            //     ?.unidadResponsable
                            // }
                            // onChange={(v) => {
                            //   let past = [...editActividades];
                            //   past[indexComponentes].unidadResponsable =
                            //     !v.target.checked;
                            //   setEditActividades(past);
                            // }}
                            checked={
                              maPadreEdit.componentes[indexComponentes]
                                ?.actividades[indexActividades]
                                ?.unidadResponsable
                            }
                            onChange={(v) => {
                              let auxC = maPadreEdit.componentes;
                              auxC[indexComponentes].actividades[
                                indexActividades
                              ].unidadResponsable = v.target.checked;
                              setMAPadreEdit({
                                ...maPadreEdit,
                                componentes: auxC,
                              });
                            }}
                          />
                        </Grid>
                      )}
                      <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                        <Typography sx={{ fontFamily: "MontserratMedium" }}>
                          UNIDAD RESPONSABLE DE REPORTAR EL INDICADOR:
                        </Typography>
                      </Grid>
                      <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
                        <Typography sx={{ fontFamily: "MontserratLight" }}>
                          {actividad.unidadResponsable}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid
                      item
                      container
                      xl={11}
                      lg={11}
                      md={12}
                      sm={12}
                      xs={12}
                      sx={{
                        display: "flex",
                        flexDirection: "row",

                        //mt: 1,
                        alignItems: "center",
                        borderBottom: 1,
                        borderColor: "#cfcfcf",
                      }}
                    >
                      {localStorage.getItem("Rol") === "Capturador" ? null : (
                        <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                          <Checkbox
                            // checked={
                            //   !editActividades[indexComponentes]?.descIndicador
                            // }
                            // onChange={(v) => {
                            //   let past = [...editActividades];
                            //   past[indexComponentes].descIndicador =
                            //     !v.target.checked;
                            //   setEditActividades(past);
                            // }}
                            checked={
                              maPadreEdit.componentes[indexComponentes]
                                ?.actividades[indexActividades]?.descIndicador
                            }
                            onChange={(v) => {
                              let auxC = maPadreEdit.componentes;
                              auxC[indexComponentes].actividades[
                                indexActividades
                              ].descIndicador = v.target.checked;
                              setMAPadreEdit({
                                ...maPadreEdit,
                                componentes: auxC,
                              });
                            }}
                          />
                        </Grid>
                      )}
                      <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                        <Typography sx={{ fontFamily: "MontserratMedium" }}>
                          DESCRIPCIÓN DEL INDICADOR:
                        </Typography>
                      </Grid>
                      <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
                        <Typography sx={{ fontFamily: "MontserratLight" }}>
                          {actividad.descIndicador}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid
                      item
                      container
                      xl={11}
                      lg={11}
                      md={12}
                      sm={12}
                      xs={12}
                      sx={{
                        display: "flex",
                        flexDirection: "row",

                        //mt: 1,
                        alignItems: "center",
                        borderBottom: 1,
                        borderColor: "#cfcfcf",
                      }}
                    >
                      {localStorage.getItem("Rol") === "Capturador" ? null : (
                        <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                          <Checkbox
                            // checked={
                            //   !editActividades[indexComponentes]?.descNumerador
                            // }
                            // onChange={(v) => {
                            //   let past = [...editActividades];
                            //   past[indexComponentes].descNumerador =
                            //     !v.target.checked;
                            //   setEditActividades(past);
                            // }}
                            checked={
                              maPadreEdit.componentes[indexComponentes]
                                ?.actividades[indexActividades]?.descNumerador
                            }
                            onChange={(v) => {
                              let auxC = maPadreEdit.componentes;
                              auxC[indexComponentes].actividades[
                                indexActividades
                              ].descNumerador = v.target.checked;
                              setMAPadreEdit({
                                ...maPadreEdit,
                                componentes: auxC,
                              });
                            }}
                          />
                        </Grid>
                      )}
                      <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                        <Typography sx={{ fontFamily: "MontserratMedium" }}>
                          DESCRIPCIÓN DEL NUMERADOR:
                        </Typography>
                      </Grid>
                      <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
                        <Typography sx={{ fontFamily: "MontserratLight" }}>
                          {actividad.descNumerador}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid
                      item
                      container
                      xl={11}
                      lg={11}
                      md={12}
                      sm={12}
                      xs={12}
                      sx={{
                        display: "flex",
                        flexDirection: "row",

                        //mt: 1,
                        alignItems: "center",
                        borderBottom: 1,
                        borderColor: "#cfcfcf",
                      }}
                    >
                      {localStorage.getItem("Rol") === "Capturador" ? null : (
                        <Grid item xl={1} lg={4} md={12} sm={12} xs={12}>
                          <Checkbox
                            // checked={
                            //   !editActividades[indexComponentes]
                            //     ?.descDenominador
                            // }
                            // onChange={(v) => {
                            //   let past = [...editActividades];
                            //   past[indexComponentes].descDenominador =
                            //     !v.target.checked;
                            //   setEditActividades(past);
                            // }}
                            checked={
                              maPadreEdit.componentes[indexComponentes]
                                ?.actividades[indexActividades]?.descDenominador
                            }
                            onChange={(v) => {
                              let auxC = maPadreEdit.componentes;
                              auxC[indexComponentes].actividades[
                                indexActividades
                              ].descDenominador = v.target.checked;
                              setMAPadreEdit({
                                ...maPadreEdit,
                                componentes: auxC,
                              });
                            }}
                          />
                        </Grid>
                      )}
                      <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
                        <Typography sx={{ fontFamily: "MontserratMedium" }}>
                          DESCRIPCIÓN DEL DENOMINADOR:
                        </Typography>
                      </Grid>
                      <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
                        <Typography sx={{ fontFamily: "MontserratLight" }}>
                          {actividad.descDenominador}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              }
            );
          }
        )}
      </Grid>

      <Grid
        item
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        sx={{
          ...(isSmallScreen && {
            display: "flex",
            // Otros estilos específicos para pantallas pequeñas
          }),
          //flexDirection: "row",

          //mt: 1,
          alignItems: "center",
          justifyContent: "center",

          borderBottom: 1,
          borderColor: "#cfcfcf",

          ...(isSmallScreen && {
            height: "15%",
          }),
        }}
      >
        <Grid
          sx={{ justifyContent: "center", display: "flex",  margin: isSmallScreen ? "2px" : "5px", }}
          item
          xl={3}
          lg={3}
          md={3}
          sm={12}
          xs={12}
        >
          <Button
            className="cancelar"
            onClick={() => showResume()}
            sx={{ width: !isSmallScreen ? "100%" : "auto" }}
          >
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              CANCELAR
            </Typography>
          </Button>
        </Grid>

        <Grid
          sx={{
            justifyContent: "center",
            display: "flex",
            margin: isSmallScreen ? "2px" : "5px",
            width: "100%", // Ajusta el ancho del Grid al 100% en pantallas pequeñas
          }}
          item
          xl={3}
          lg={3}
          md={3}
          sm={12}
          xs={12}
        >
          <Button
            disabled={
              localStorage.getItem("Rol") === "Capturador" ? true : false
            }
            className="aceptar"
            sx={{ width: !isSmallScreen ? "100%" : "auto" }}
            onClick={() => setOpenModalSolicitarModif(true)}
          >
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
            SOLICITAR MODIFICACIÓN
            </Typography>
          </Button>
        </Grid>

        <Grid
          sx={{
            justifyContent: "center",
            display: "flex",
            margin: isSmallScreen ? "2px" : "5px",
            width: "100%", // Ajusta el ancho del Grid al 100% en pantallas pequeñas
          }}
            item
          xl={3}
          lg={3}
          md={3}
          sm={12}
          xs={12}
        >
          <Button
            className="aceptar"
            sx={{ width: !isSmallScreen ? "100%" : "auto" }}
            onClick={() => {
              let estado = "";
              if (localStorage.getItem("Rol") === "Capturador") {
                estado = "En Captura";
              }
              if (localStorage.getItem("Rol") === "Verificador") {
                estado = "Borrador Verificador";
              }
              if (localStorage.getItem("Rol") === "Administrador") {
                estado = "Borrador Autorizador";
              }

              creaMA(estado);
            }}
          >
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
              GUARDAR BORRADOR
            </Typography>
          </Button>
        </Grid>

        <Grid
          sx={{
            justifyContent: "center",
            display: "flex",
            margin: isSmallScreen ? "2px" : "5px",
            width: "100%", // Ajusta el ancho del Grid al 100% en pantallas pequeñas
          }}
          item
          xl={3}
          lg={3}
          md={3}
          sm={12}
          xs={12}
        >
          <Button
            className="aceptar"
            sx={{ width: !isSmallScreen ? "100%" : "auto" }}
            onClick={() => {
              setOpenModalEnviar(true);
            }}
          >
            <Typography sx={{ fontFamily: "MontserratMedium" }}>
            {localStorage.getItem("Rol") === "Administrador"
                ? estadoma === "Autorizada"
                  ? "MODIFICAR MA AUTORIZADA"
                  : "AUTORIZAR"
                : "ENVIAR"}
            </Typography>
          </Button>
        </Grid>

        <ModalSolicitaModif
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
              : JSON.stringify(maPadreEdit)
          }
          IdEntidad={IdEntidad}
        />

        <ModalEnviarMA
          open={openModalEnviar}
          handleClose={handleCloseEnviar}
          MA={JSON.stringify(MA)}
          MIR={MIR}
          IdMA={IdMA}
          IdMIR={IdMir}
          showResume={showResume}
          IdEntidad={IdEntidad}
        ></ModalEnviarMA>
      </Grid>

    </Grid>
  );
}

export default TabResumenMA;

export interface IFinEditMA {
  metaAnual: boolean;
  lineaBase: boolean;
  valorNumerador: boolean;
  valorDenominador: boolean;
  sentidoDelIndicador: boolean;
  unidadResponsable: boolean;
  descIndicador: boolean;
  descNumerador: boolean;
  descDenominador: boolean;
}

export interface IPropositoEditMA {
  metaAnual: boolean;
  lineaBase: boolean;
  valorNumerador: boolean;
  valorDenominador: boolean;
  sentidoDelIndicador: boolean;
  unidadResponsable: boolean;
  descIndicador: boolean;
  descNumerador: boolean;
  descDenominador: boolean;
}

export interface IActividadesEditMA {
  actividad: string;
  metaAnual: boolean;
  lineaBase: boolean;
  metasPorFrecuencia: Array<IFrecuenciasActEdit>;
  valorNumerador: boolean;
  valorDenominador: boolean;
  sentidoDelIndicador: boolean;
  unidadResponsable: boolean;
  descIndicador: boolean;
  descNumerador: boolean;
  descDenominador: boolean;
}

export interface IComponenteEditMA {
  componentes: string;
  metaAnual: boolean;
  lineaBase: boolean;
  metasPorFrecuencia: Array<IFrecuenciasEdit>;
  valorNumerador: boolean;
  valorDenominador: boolean;
  sentidoDelIndicador: boolean;
  unidadResponsable: boolean;
  descIndicador: boolean;
  descNumerador: boolean;
  descDenominador: boolean;
  actividades: IActividadesEditMA[];
}

export interface IFrecuenciasEdit {
  semestre1: boolean;
  semestre2: boolean;
  trimestre1: boolean;
  trimestre2: boolean;
  trimestre3: boolean;
  trimestre4: boolean;
}

export interface IFrecuenciasActEdit {
  semestre1: boolean;
  semestre2: boolean;
  trimestre1: boolean;
  trimestre2: boolean;
  trimestre3: boolean;
  trimestre4: boolean;
}
