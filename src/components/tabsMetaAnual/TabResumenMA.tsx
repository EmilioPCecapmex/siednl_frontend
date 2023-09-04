import { Box, Typography, Button, Checkbox } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ModalEnviarMA from "../modalsMA/ModalEnviarMA";
import ModalSolicitaModif from "../modalsMA/ModalSolicitaModifMA";
import { IFinMA, IPropositoMA } from "./IFin";
import { IMA } from "./IMA";
import { IActividadesMA, IComponenteMA, ICValorMA } from "./Interfaces";
import { queries } from "../../queries";
export function TabResumenMA({
  show,
  fin,
  proposito,
  componentes,
  componenteValor,
  cValor,
  IdMir,
  IdMA,
  MIR,
  showResume,
}: {
  show: boolean;
  fin: Array<IFinMA>;
  proposito: Array<IPropositoMA>;
  componentes: number[];
  componenteValor: Array<IComponenteMA>;
  cValor: Array<ICValorMA>;
  IdMir: string;
  IdMA: string;
  MIR: string;
  showResume: Function;
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
        process.env.REACT_APP_APPLICATION_BACK + "/api/create-MetaAnual",
        {
          MetaAnual: JSON.stringify(MA),
          CreadoPor: localStorage.getItem("IdUsuario"),
          IdMir: IdMir,
          Estado: estado,
          Id: IdMA,
          Rol: localStorage.getItem("Rol")
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      )
      .then((r) => {
        console.log("Hola soy la respuesta");
        console.log("r: ",r);
        Toast.fire({
          icon: "success",
          title: r.data.data.message,
        });
        showResume();
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: err.response.data.result.error,
        });
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
    let cEdit = componenteValor.map((item) => {
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

    asignarMA(fin, proposito, componenteValor, arr);
  }, [componenteValor, proposito, fin, cValor, show]);

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

  function mapeaindice(c=0,a=0){
    let x=0;
    //Componente 1
    (c==0&&a==0)?x=0:(c==0&&a==1)?x=1:
    (c==1&&a==0)?x=2:x=3;
    
    return x;
   }

   

  return (
    <Box
      visibility={show ? "visible" : "hidden"}
      position="absolute"
      sx={{
        display: "flex",
        width: "93vw",
        height: "82vh",
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
            {localStorage.getItem("Rol") ==="Capturador" ? null : (
              <Checkbox
                value={!editFin.metaAnual}
                onChange={(v) => {
                  setEditFin({ ...editFin, metaAnual: !v.target.checked });
                }}
              />
            )}
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
            {localStorage.getItem("Rol") ==="Capturador" ? null : (
              <Checkbox
                value={!editFin.lineaBase}
                onChange={(v) => {
                  setEditFin({ ...editFin, lineaBase: !v.target.checked });
                }}
              />
            )}
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
            {localStorage.getItem("Rol") ==="Capturador" ? null : (
              <Checkbox
                value={!editFin.valorNumerador}
                onChange={(v) => {
                  setEditFin({ ...editFin, valorNumerador: !v.target.checked });
                }}
              />
            )}
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              {JSON.parse(MIR).fin.indicador.toLowerCase().includes("indice") ||
              JSON.parse(MIR).fin.indicador.toLowerCase().includes("índice")
                ? "Índice: "
                : "Valor Numerador:"}
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {fin[0]?.valorNumerador}
            </Typography>
          </Box>

          {JSON.parse(MIR).fin.indicador.toLowerCase().includes("indice") ||
          JSON.parse(MIR)
            .fin.indicador.toLowerCase()
            .includes("índice") ? null : (
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
              {localStorage.getItem("Rol") ==="Capturador" ? null : (
                <Checkbox
                  value={!editFin.valorDenominador}
                  onChange={(v) => {
                    setEditFin({
                      ...editFin,
                      valorDenominador: !v.target.checked,
                    });
                  }}
                />
              )}
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Valor Denomidador:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                {fin[0]?.valorDenominador}
              </Typography>
            </Box>
          )}

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
            {localStorage.getItem("Rol") ==="Capturador" ? null : (
              <Checkbox
                value={!editFin.sentidoDelIndicador}
                onChange={(v) => {
                  setEditFin({
                    ...editFin,
                    sentidoDelIndicador: !v.target.checked,
                  });
                }}
              />
            )}
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
            {localStorage.getItem("Rol") ==="Capturador" ? null : (
              <Checkbox
                value={!editFin.unidadResponsable}
                onChange={(v) => {
                  setEditFin({
                    ...editFin,
                    unidadResponsable: !v.target.checked,
                  });
                }}
              />
            )}
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
            {localStorage.getItem("Rol") ==="Capturador" ? null : (
              <Checkbox
                value={!editFin.descIndicador}
                onChange={(v) => {
                  setEditFin({ ...editFin, descIndicador: !v.target.checked });
                }}
              />
            )}
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
            {localStorage.getItem("Rol") ==="Capturador" ? null : (
              <Checkbox
                value={!editFin.descNumerador}
                onChange={(v) => {
                  setEditFin({ ...editFin, descNumerador: !v.target.checked });
                }}
              />
            )}
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
            {localStorage.getItem("Rol") ==="Capturador" ? null : (
              <Checkbox
                value={!editFin.descDenominador}
                onChange={(v) => {
                  setEditFin({
                    ...editFin,
                    descDenominador: !v.target.checked,
                  });
                }}
              />
            )}
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
            {localStorage.getItem("Rol") ==="Capturador" ? null : (
              <Checkbox
                value={!editProposito.metaAnual}
                onChange={(v) => {
                  setEditProposito({
                    ...editProposito,
                    metaAnual: !v.target.checked,
                  });
                }}
              />
            )}
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
            {localStorage.getItem("Rol") ==="Capturador" ? null : (
              <Checkbox
                value={!editProposito.lineaBase}
                onChange={(v) => {
                  setEditProposito({
                    ...editProposito,
                    lineaBase: !v.target.checked,
                  });
                }}
              />
            )}
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
            {localStorage.getItem("Rol") ==="Capturador" ? null : (
              <Checkbox
                value={!editProposito.valorNumerador}
                onChange={(v) => {
                  setEditProposito({
                    ...editProposito,
                    valorNumerador: !v.target.checked,
                  });
                }}
              />
            )}
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              {JSON.parse(MIR)
                .proposito.indicador.toLowerCase()
                .includes("indice") ||
              JSON.parse(MIR)
                .proposito.indicador.toLowerCase()
                .includes("índice")
                ? "Índice: "
                : "Valor Numerador:"}
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {proposito[0]?.valorNumerador}
            </Typography>
          </Box>

          {JSON.parse(MIR)
            .proposito.indicador.toLowerCase()
            .includes("indice") ||
          JSON.parse(MIR)
            .proposito.indicador.toLowerCase()
            .includes("índice") ? null : (
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
              {localStorage.getItem("Rol") ==="Capturador" ? null : (
                <Checkbox
                  value={!editProposito.valorDenominador}
                  onChange={(v) => {
                    setEditProposito({
                      ...editProposito,
                      valorDenominador: !v.target.checked,
                    });
                  }}
                />
              )}
              <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
                Valor Denominador:
              </Typography>
              <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                {proposito[0]?.valorDenominador}
              </Typography>
            </Box>
          )}

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
            {localStorage.getItem("Rol") ==="Capturador" ? null : (
              <Checkbox
                value={!editProposito.sentidoDelIndicador}
                onChange={(v) => {
                  setEditProposito({
                    ...editProposito,
                    sentidoDelIndicador: !v.target.checked,
                  });
                }}
              />
            )}
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
            {localStorage.getItem("Rol") ==="Capturador" ? null : (
              <Checkbox
                value={!editProposito.unidadResponsable}
                onChange={(v) => {
                  setEditProposito({
                    ...editProposito,
                    unidadResponsable: !v.target.checked,
                  });
                }}
              />
            )}
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
            {localStorage.getItem("Rol") ==="Capturador" ? null : (
              <Checkbox
                value={!editProposito.descIndicador}
                onChange={(v) => {
                  setEditProposito({
                    ...editProposito,
                    descIndicador: !v.target.checked,
                  });
                }}
              />
            )}
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
            {localStorage.getItem("Rol") ==="Capturador" ? null : (
              <Checkbox
                value={!editProposito.descNumerador}
                onChange={(v) => {
                  setEditProposito({
                    ...editProposito,
                    descNumerador: !v.target.checked,
                  });
                }}
              />
            )}
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
            {localStorage.getItem("Rol") ==="Capturador" ? null : (
              <Checkbox
                value={!editProposito.descDenominador}
                onChange={(v) => {
                  setEditProposito({
                    ...editProposito,
                    descDenominador: !v.target.checked,
                  });
                }}
              />
            )}
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
                  {localStorage.getItem("Rol") ==="Capturador" ? null : (
                    <Checkbox
                      value={!editComponentes[index - 1]?.metaAnual}
                      onChange={(v) => {
                        let past = [...editComponentes];
                        past[index - 1].metaAnual = !v.target.checked;
                        setEditComponentes(past);
                      }}
                    />
                  )}
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
                  {localStorage.getItem("Rol") ==="Capturador" ? null : (
                    <Checkbox
                      value={!editComponentes[index - 1]?.lineaBase}
                      onChange={(v) => {
                        let past = [...editComponentes];
                        past[index - 1].lineaBase = !v.target.checked;
                        setEditComponentes(past);
                      }}
                    />
                  )}
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
                    ?.trimestre1 === "" &&
                  componenteValor[index - 1]?.metasPorFrecuencia[0]
                    ?.trimestre2 === "" &&
                  componenteValor[index - 1]?.metasPorFrecuencia[0]
                    ?.trimestre3 === "" &&
                  componenteValor[index - 1]?.metasPorFrecuencia[0]
                    ?.trimestre4 === "" ? (
                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {localStorage.getItem("Rol") ===
                        "Capturador" ? null : (
                          <Checkbox
                            value={
                              !editComponentes[index - 1]?.metasPorFrecuencia[0]
                                .semestre1
                            }
                            onChange={(v) => {
                              let past = [...editComponentes];
                              past[index - 1].metasPorFrecuencia[0].semestre1 =
                                !v.target.checked;
                              setEditComponentes(past);
                            }}
                          />
                        )}
                        <Typography
                          sx={{ fontFamily: "MontserratMedium", width: "100%" }}
                        >
                          Semestre 1:
                        </Typography>
                        <Typography
                          sx={{ fontFamily: "MontserratLight", ml: 1 }}
                        >
                          {
                            componenteValor[index - 1]?.metasPorFrecuencia[0]
                              ?.semestre1
                          }
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {localStorage.getItem("Rol") ===
                        "Capturador" ? null : (
                          <Checkbox
                            value={
                              !editComponentes[index - 1]?.metasPorFrecuencia[0]
                                .semestre2
                            }
                            onChange={(v) => {
                              let past = [...editComponentes];
                              past[index - 1].metasPorFrecuencia[0].semestre2 =
                                !v.target.checked;
                              setEditComponentes(past);
                            }}
                          />
                        )}
                        <Typography
                          sx={{ fontFamily: "MontserratMedium", width: "100%" }}
                        >
                          Semestre 2:
                        </Typography>
                        <Typography
                          sx={{ fontFamily: "MontserratLight", ml: 1 }}
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
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {localStorage.getItem("Rol") ===
                        "Capturador" ? null : (
                          <Checkbox
                            value={
                              !editComponentes[index - 1]?.metasPorFrecuencia[0]
                                .trimestre1
                            }
                            onChange={(v) => {
                              let past = [...editComponentes];
                              past[index - 1].metasPorFrecuencia[0].trimestre1 =
                                !v.target.checked;
                              setEditComponentes(past);
                            }}
                          />
                        )}
                        <Typography
                          sx={{ fontFamily: "MontserratMedium", width: "100%" }}
                        >
                          Trimestre 1:
                        </Typography>
                        <Typography
                          sx={{ fontFamily: "MontserratLight", ml: 1 }}
                        >
                          {
                            componenteValor[index - 1]?.metasPorFrecuencia[0]
                              ?.trimestre1
                          }
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {localStorage.getItem("Rol") ===
                        "Capturador" ? null : (
                          <Checkbox
                            value={
                              !editComponentes[index - 1]?.metasPorFrecuencia[0]
                                .trimestre2
                            }
                            onChange={(v) => {
                              let past = [...editComponentes];
                              past[index - 1].metasPorFrecuencia[0].trimestre2 =
                                !v.target.checked;
                              setEditComponentes(past);
                            }}
                          />
                        )}
                        <Typography
                          sx={{ fontFamily: "MontserratMedium", width: "100%" }}
                        >
                          Trimestre 2:
                        </Typography>
                        <Typography
                          sx={{ fontFamily: "MontserratLight", ml: 1 }}
                        >
                          {
                            componenteValor[index - 1]?.metasPorFrecuencia[0]
                              ?.trimestre2
                          }
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {localStorage.getItem("Rol") ===
                        "Capturador" ? null : (
                          <Checkbox
                            value={
                              !editComponentes[index - 1]?.metasPorFrecuencia[0]
                                .trimestre3
                            }
                            onChange={(v) => {
                              let past = [...editComponentes];
                              past[index - 1].metasPorFrecuencia[0].trimestre3 =
                                !v.target.checked;
                              setEditComponentes(past);
                            }}
                          />
                        )}
                        <Typography
                          sx={{ fontFamily: "MontserratMedium", width: "100%" }}
                        >
                          Trimestre 3:
                        </Typography>
                        <Typography
                          sx={{ fontFamily: "MontserratLight", ml: 1 }}
                        >
                          {
                            componenteValor[index - 1]?.metasPorFrecuencia[0]
                              ?.trimestre3
                          }
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {localStorage.getItem("Rol") ===
                        "Capturador" ? null : (
                          <Checkbox
                            value={
                              !editComponentes[index - 1]?.metasPorFrecuencia[0]
                                .trimestre4
                            }
                            onChange={(v) => {
                              let past = [...editComponentes];
                              past[index - 1].metasPorFrecuencia[0].trimestre4 =
                                !v.target.checked;
                              setEditComponentes(past);
                            }}
                          />
                        )}
                        <Typography
                          sx={{ fontFamily: "MontserratMedium", width: "100%" }}
                        >
                          Trimestre 4:
                        </Typography>
                        <Typography
                          sx={{ fontFamily: "MontserratLight", ml: 1 }}
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
                  {localStorage.getItem("Rol") ==="Capturador" ? null : (
                    <Checkbox
                      value={!editComponentes[index - 1]?.valorNumerador}
                      onChange={(v) => {
                        let past = [...editComponentes];
                        past[index - 1].valorNumerador = !v.target.checked;
                        setEditComponentes(past);
                      }}
                    />
                  )}
                  <Typography
                    sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                  >
                    {JSON.parse(MIR)
                      .componentes[index - 1]?.indicador.toUpperCase()
                      .includes("INDICE") ||
                    JSON.parse(MIR)
                      .componentes[index - 1]?.indicador.toUpperCase()
                      .includes("ÍNDICE")
                      ? "Índice: "
                      : "Valor Numerador: "}
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "MontserratLight", width: "80%" }}
                  >
                    {componenteValor[index - 1]?.valorNumerador}
                  </Typography>
                </Box>

                {JSON.parse(MIR)
                  .componentes[index - 1]?.indicador.toUpperCase()
                  .includes("INDICE") ||
                JSON.parse(MIR)
                  .componentes[index - 1]?.indicador.toUpperCase()
                  .includes("ÍNDICE") ? null : (
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
                    {localStorage.getItem("Rol") ==="Capturador" ? null : (
                      <Checkbox
                        value={!editComponentes[index - 1]?.valorDenominador}
                        onChange={(v) => {
                          let past = [...editComponentes];
                          past[index - 1].valorDenominador = !v.target.checked;
                          setEditComponentes(past);
                        }}
                      />
                    )}
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
                )}

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
                  {localStorage.getItem("Rol") ==="Capturador" ? null : (
                    <Checkbox
                      value={!editComponentes[index - 1]?.sentidoDelIndicador}
                      onChange={(v) => {
                        let past = [...editComponentes];
                        past[index - 1].sentidoDelIndicador = !v.target.checked;
                        setEditComponentes(past);
                      }}
                    />
                  )}
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
                  {localStorage.getItem("Rol") ==="Capturador" ? null : (
                    <Checkbox
                      value={!editComponentes[index - 1]?.unidadResponsable}
                      onChange={(v) => {
                        let past = [...editComponentes];
                        past[index - 1].unidadResponsable = !v.target.checked;
                        setEditComponentes(past);
                      }}
                    />
                  )}
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
                  {localStorage.getItem("Rol") ==="Capturador" ? null : (
                    <Checkbox
                      value={!editComponentes[index - 1]?.descIndicador}
                      onChange={(v) => {
                        let past = [...editComponentes];
                        past[index - 1].descIndicador = !v.target.checked;
                        setEditComponentes(past);
                      }}
                    />
                  )}
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
                  {localStorage.getItem("Rol") ==="Capturador" ? null : (
                    <Checkbox
                      value={!editComponentes[index - 1]?.descNumerador}
                      onChange={(v) => {
                        let past = [...editComponentes];
                        past[index - 1].descNumerador = !v.target.checked;
                        setEditComponentes(past);
                      }}
                    />
                  )}
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
                  {localStorage.getItem("Rol") ==="Capturador" ? null : (
                    <Checkbox
                      value={!editComponentes[index - 1]?.descDenominador}
                      onChange={(v) => {
                        let past = [...editComponentes];
                        past[index - 1].descDenominador = !v.target.checked;
                        setEditComponentes(past);
                      }}
                    />
                  )}
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
                    {localStorage.getItem("Rol") ==="Capturador" ? null : (
                      <Checkbox
                        value={!editActividades[indexComponentes]?.metaAnual}
                        onChange={(v) => {
                          let past = [...editActividades];
                          past[indexComponentes].metaAnual = !v.target.checked;
                          setEditActividades(past);
                        }}
                      />
                    )}
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
                    {localStorage.getItem("Rol") ==="Capturador" ? null : (
                      <Checkbox
                        value={!editActividades[indexComponentes]?.lineaBase}
                        onChange={(v) => {
                          let past = [...editActividades];
                          past[indexComponentes].lineaBase = !v.target.checked;
                          setEditActividades(past);
                        }}
                      />
                    )}
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
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {localStorage.getItem("Rol") ===
                        "Capturador" ? null : (
                          <Checkbox
                            value={
                              !editActividades[mapeaindice(indexComponentes,indexActividades)]
                                ?.metasPorFrecuencia[0].trimestre1
                            }
                            onChange={(v) => {
                              let past = [...editActividades];
                              past[
                                mapeaindice(indexComponentes,indexActividades)
                              ].metasPorFrecuencia[0].trimestre1 =
                                !v.target.checked;
                              setEditActividades(past);
                            }}
                          />
                        )}
                        <Typography
                          sx={{ fontFamily: "MontserratMedium", width: "100%" }}
                        >
                          Trimestre 1:
                        </Typography>
                        <Typography
                          sx={{ fontFamily: "MontserratLight", ml: 1 }}
                        >
                          {
                            cValor[0]?.componentes[indexComponentes]
                              ?.actividades[indexActividades]
                              .metasPorFrecuencia[0]?.trimestre1
                          }
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {localStorage.getItem("Rol") ===
                        "Capturador" ? null : (
                          <Checkbox
                            value={
                              !editActividades[mapeaindice(indexComponentes,indexActividades)]
                                ?.metasPorFrecuencia[0].trimestre2
                            }
                            onChange={(v) => {
                              let past = [...editActividades];
                              past[
                                mapeaindice(indexComponentes,indexActividades)
                              ].metasPorFrecuencia[0].trimestre2 =
                                !v.target.checked;
                              setEditActividades(past);
                            }}
                          />
                        )}
                        <Typography
                          sx={{ fontFamily: "MontserratMedium", width: "100%" }}
                        >
                          Trimestre 2:
                        </Typography>
                        <Typography
                          sx={{ fontFamily: "MontserratLight", ml: 1 }}
                        >
                          {
                            cValor[0].componentes[indexComponentes].actividades[
                              indexActividades
                            ].metasPorFrecuencia[0].trimestre2
                          }
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {localStorage.getItem("Rol") ===
                        "Capturador" ? null : (
                          <Checkbox
                            value={
                              !editActividades[mapeaindice(indexComponentes,indexActividades)]
                                ?.metasPorFrecuencia[0].trimestre3
                            }
                            onChange={(v) => {
                              let past = [...editActividades];
                              past[
                                mapeaindice(indexComponentes,indexActividades)
                              ].metasPorFrecuencia[0].trimestre3 =
                                !v.target.checked;
                              setEditActividades(past);
                            }}
                          />
                        )}
                        <Typography
                          sx={{ fontFamily: "MontserratMedium", width: "100%" }}
                        >
                          Trimestre 3:
                        </Typography>
                        <Typography
                          sx={{ fontFamily: "MontserratLight", ml: 1 }}
                        >
                          {
                            cValor[0].componentes[indexComponentes].actividades[
                              indexActividades
                            ].metasPorFrecuencia[0].trimestre3
                          }
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {localStorage.getItem("Rol") ===
                        "Capturador" ? null : (
                          <Checkbox
                            value={
                              !editActividades[mapeaindice(indexComponentes,indexActividades)]
                                ?.metasPorFrecuencia[0].trimestre4
                            }
                            onChange={(v) => {
                              let past = [...editActividades];
                              past[
                                mapeaindice(indexComponentes,indexActividades)
                              ].metasPorFrecuencia[0].trimestre4 =
                                !v.target.checked;
                              setEditActividades(past);
                            }}
                          />
                        )}
                        <Typography
                          sx={{ fontFamily: "MontserratMedium", width: "100%" }}
                        >
                          Trimestre 4:
                        </Typography>
                        <Typography
                          sx={{ fontFamily: "MontserratLight", ml: 1 }}
                        >
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
                    {localStorage.getItem("Rol") ==="Capturador" ? null : (
                      <Checkbox
                        value={
                          !editActividades[indexComponentes]?.valorNumerador
                        }
                        onChange={(v) => {
                          let past = [...editActividades];
                          past[indexComponentes].valorNumerador =
                            !v.target.checked;
                          setEditActividades(past);
                        }}
                      />
                    )}
                    <Typography
                      sx={{ fontFamily: "MontserratMedium", width: "20%" }}
                    >
                      {JSON.parse(MIR)
                        .actividades[indexActividades].indicador.toUpperCase()
                        .includes("INDICE") ||
                      JSON.parse(MIR)
                        .actividades[indexActividades].indicador.toUpperCase()
                        .includes("ÍNDICE")
                        ? "Índice: "
                        : "Valor numerador: "}
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

                  {JSON.parse(MIR)
                    .actividades[indexActividades].indicador.toUpperCase()
                    .includes("INDICE") ||
                  JSON.parse(MIR)
                    .actividades[indexActividades].indicador.toUpperCase()
                    .includes("ÍNDICE") ? null : (
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
                      {localStorage.getItem("Rol") ===
                      "Capturador" ? null : (
                        <Checkbox
                          value={
                            !editActividades[indexComponentes]?.valorDenominador
                          }
                          onChange={(v) => {
                            let past = [...editActividades];
                            past[indexComponentes].valorDenominador =
                              !v.target.checked;
                            setEditActividades(past);
                          }}
                        />
                      )}
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
                  )}

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
                    {localStorage.getItem("Rol") ==="Capturador" ? null : (
                      <Checkbox
                        value={
                          !editActividades[indexComponentes]
                            ?.sentidoDelIndicador
                        }
                        onChange={(v) => {
                          let past = [...editActividades];
                          past[indexComponentes].sentidoDelIndicador =
                            !v.target.checked;
                          setEditActividades(past);
                        }}
                      />
                    )}
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
                    {localStorage.getItem("Rol") ==="Capturador" ? null : (
                      <Checkbox
                        value={
                          !editActividades[indexComponentes]?.unidadResponsable
                        }
                        onChange={(v) => {
                          let past = [...editActividades];
                          past[indexComponentes].unidadResponsable =
                            !v.target.checked;
                          setEditActividades(past);
                        }}
                      />
                    )}
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
                    {localStorage.getItem("Rol") ==="Capturador" ? null : (
                      <Checkbox
                        value={
                          !editActividades[indexComponentes]?.descIndicador
                        }
                        onChange={(v) => {
                          let past = [...editActividades];
                          past[indexComponentes].descIndicador =
                            !v.target.checked;
                          setEditActividades(past);
                        }}
                      />
                    )}
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
                    {localStorage.getItem("Rol") ==="Capturador" ? null : (
                      <Checkbox
                        value={
                          !editActividades[indexComponentes]?.descNumerador
                        }
                        onChange={(v) => {
                          let past = [...editActividades];
                          past[indexComponentes].descNumerador =
                            !v.target.checked;
                          setEditActividades(past);
                        }}
                      />
                    )}
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
                    {localStorage.getItem("Rol") ==="Capturador" ? null : (
                      <Checkbox
                        value={
                          !editActividades[indexComponentes]?.descDenominador
                        }
                        onChange={(v) => {
                          let past = [...editActividades];
                          past[indexComponentes].descDenominador =
                            !v.target.checked;
                          setEditActividades(past);
                        }}
                      />
                    )}
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
            creaMA(
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

        <ModalSolicitaModif
          open={openModalSolicitarModif}
          handleClose={handleCloseModif}
          MA={JSON.stringify(MA)}
          MIR={MIR}
          showResume={showResume}
          IdMA={IdMA}
          IdMIR={IdMir}
          MAEdit={
            localStorage.getItem("Rol") ==="Capturador"
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
        ></ModalEnviarMA>
      </Box>
    </Box>
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
