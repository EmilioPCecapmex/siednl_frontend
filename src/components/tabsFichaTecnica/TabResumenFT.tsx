import { Box, Typography, Button, Checkbox } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ModalEnviarMA from "../modalsMA/ModalEnviarMA";
import ModalSolicitaModif from "../modalsMA/ModalSolicitaModifMA";
import { IFinMA, IPropositoMA } from "../tabsMetaAnual/IFin";
import { IMA } from "../tabsMetaAnual/IMA";
import {
  IActividadesMA,
  IComponenteMA,
  ICValorMA,
} from "../tabsMetaAnual/Interfaces";
import {
  IActividadesEditMA,
  IComponenteEditMA,
  IFinEditMA,
  IPropositoEditMA,
} from "../tabsMetaAnual/TabResumenMA";

export function TabResumenFT({
  show,
  encabezado,
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
  encabezado: Array<any>;
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
    axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/create-MetaAnual",
        {
          MetaAnual: JSON.stringify(MA),
          CreadoPor: localStorage.getItem("IdUsuario"),
          IdMir: IdMir,
          Estado: estado,
          Id: IdMA,
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
            ENCABEZADO
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
              <Checkbox
                value={!editFin.metaAnual}
                onChange={(v) => {
                  setEditFin({ ...editFin, metaAnual: !v.target.checked });
                }}
              />
            )}
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              PROGRAMA SECTORIAL SECTORIAL, ESPECIAL O REGIONAL:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {encabezado[0]?.metaAnual}
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
              <Checkbox
                value={!editFin.lineaBase}
                onChange={(v) => {
                  setEditFin({ ...editFin, lineaBase: !v.target.checked });
                }}
              />
            )}
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              OBJETIVO PROGRAMA SECTORIAL, ESPECIAL O REGIONAL:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {encabezado[0]?.lineaBase}
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
              <Checkbox
                value={!editFin.valorNumerador}
                onChange={(v) => {
                  setEditFin({ ...editFin, valorNumerador: !v.target.checked });
                }}
              />
            )}
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              OBJETIVO ODS:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {encabezado[0]?.valorNumerador}
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
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
              META ODS:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {encabezado[0]?.valorDenominador}
            </Typography>
          </Box>

          {/*FIN INICIO*/}
          <Typography
            sx={{ fontFamily: "MontserratBold", borderBottom: 1, mt: 5 }}
          >
            FIN
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
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
              TIPO DE INDICADOR:
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
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
              DIMENSIÓN:
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
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
              UNIDAD DE MEDIDA:
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
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
              CLARIDAD:
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
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
              RELEVANCIA:
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
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
              ECONOMÍA:
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
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
              MONITOREABLE:
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
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
              ADECUADO:
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
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
              APORTE MARGINAL:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {fin[0]?.descDenominador}
            </Typography>
          </Box>
          {/*FIN DE FIN QUE IRÓNICO NO?*/}

          {/*PROPÓSITO INICIO*/}
          <Typography
            sx={{ fontFamily: "MontserratBold", borderBottom: 1, mt: 5 }}
          >
            PROPÓSITO
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
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
              TIPO DE INDICADOR:
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
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
              DIMENSIÓN:
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
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
              UNIDAD DE MEDIDA:
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
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
              CLARIDAD:
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
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
              RELEVANCIA:
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
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
              ECONOMÍA:
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
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
              MONITOREABLE:
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
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
              ADECUADO:
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
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
              APORTE MARGINAL:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {proposito[0]?.descDenominador}
            </Typography>
          </Box>
          {/*PROPÓSITO FIN*/}
          <Typography
            sx={{ fontFamily: "MontserratBold", borderBottom: 1, mt: 5 }}
          >
            COMPONENTES
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
                  COMPONENTE {index}
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
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
              TIPO DE INDICADOR:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
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
              DIMENSIÓN:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
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
              UNIDAD DE MEDIDA:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
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
              CLARIDAD:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
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
              RELEVANCIA:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
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
              ECONOMÍA:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
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
              MONITOREABLE:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
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
              ADECUADO:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
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
              APORTE MARGINAL:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
            {componenteValor[index - 1]?.lineaBase}
            </Typography>
          </Box>
                {/*COMPONENTE*/}
              </Box>
            );
          })}
          

          <Typography
            sx={{ fontFamily: "MontserratBold", borderBottom: 1, mt: 5 }}
          >
            ACTIVIDADES
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
                    COMPONENTE {indexComponentes + 1} - ACTIVIDAD{" "}
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
                    {localStorage.getItem("Rol") !== "Administrador" ? null : (
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
                      TIPO DE INDICADOR:
                    </Typography>
                    <Typography
                      sx={{ fontFamily: "MontserratLight", width: "80%" }}
                    >
                      {
                              cValor[0].componentes[indexComponentes]
                                .actividades[indexActividades].lineaBase
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
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
              DIMENSIÓN:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
            {
                              cValor[0].componentes[indexComponentes]
                                .actividades[indexActividades].lineaBase
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
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
              UNIDAD DE MEDIDA:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
            {
                              cValor[0].componentes[indexComponentes]
                                .actividades[indexActividades].lineaBase
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
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
              CLARIDAD:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
            {
                              cValor[0].componentes[indexComponentes]
                                .actividades[indexActividades].lineaBase
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
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
              RELEVANCIA:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
            {
                              cValor[0].componentes[indexComponentes]
                                .actividades[indexActividades].lineaBase
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
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
              ECONOMÍA:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
            {
                              cValor[0].componentes[indexComponentes]
                                .actividades[indexActividades].lineaBase
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
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
              MONITOREABLE:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
            {
                              cValor[0].componentes[indexComponentes]
                                .actividades[indexActividades].lineaBase
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
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
              ADECUADO:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
            {
                              cValor[0].componentes[indexComponentes]
                                .actividades[indexActividades].lineaBase
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
            {localStorage.getItem("Rol") !== "Administrador" ? null : (
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
              APORTE MARGINAL:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                            {
                              cValor[0].componentes[indexComponentes]
                                .actividades[indexActividades].lineaBase
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
        <Button color="error" variant="outlined" onClick={() => showResume()}>
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

        <Button
          color="success"
          variant="outlined"
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
          color="primary"
          variant="outlined"
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
            localStorage.getItem("Rol") !== "Administrador"
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

export default TabResumenFT;
