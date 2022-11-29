import { Box, Typography, Button, Checkbox } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ModalEnviarFT from "../modalsFT/ModalEnviarFT";
import ModalSolicitaModif from "../modalsMA/ModalSolicitaModifMA";
import { IFT } from "../tabsFichaTecnica/IFT";
import {
  IActividadesEditMA,
  IComponenteEditMA,
  IFinEditMA,
  IPropositoEditMA,
} from "../tabsMetaAnual/TabResumenMA";
import { IActividadesFT, IComponenteFT, ICValorFT, IEncabezadoFT, IFinFT, IPropositoFT } from "./Interfaces";

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
  IdFT,
  MIR,
  showResume,
}: {
  show: boolean;
  encabezado: Array<IEncabezadoFT>;
  fin: Array<IFinFT>;
  proposito: Array<IPropositoFT>;
  componentes: number[];
  componenteValor: Array<IComponenteFT>;
  cValor: Array<ICValorFT>;
  IdMir: string;
  IdMA: string;
  IdFT: string;
  MIR: string;
  showResume: Function;
}) {
  const [FT, setFT] = useState<IFT>();
  

  let asignarFT = (
    encabezadoM: Array<IEncabezadoFT>,
    finM: Array<IFinFT>,
    propositoM: Array<IPropositoFT>,
    componentesM: Array<IComponenteFT>,
    actividadesM: Array<IActividadesFT>
  ) => {
    setFT({
      encabezado: encabezadoM[0],
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
        tipoDeIndicador: true,
        claridad: true,
        relevancia: true,
        economia: true,
        monitoreable: true,
        adecuado: true,
        aporte_marginal: true,
        dimension: true,
        unidadDeMedida: true,
      };
    });
    setEditComponentes(cEdit);

    let aEdit = arr.map((item) => {
      return {
        actividad: item.actividad,
        tipoDeIndicador: true,
        claridad: true,
        relevancia: true,
        economia: true,
        monitoreable: true,
        adecuado: true,
        aporte_marginal: true,
        dimension: true,
        unidadDeMedida: true,
      };
    });

    setEditActividades(aEdit);

    // asignarMA(fin, proposito, componenteValor, arr);
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

  const creaFT = (estado: string) => {
    axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/create-MetaAnual",
        {
          MetaAnual: JSON.stringify(FT),
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
  const [editEncabezado, setEditEncabezado] = useState<IEncabezadoEditFT>({
    programaSER: true,
    objetivoSER: true,
    catalogoObjetivoODS: true,
    catalogoMetaODS: true,
  });

  const [editFin, setEditFin] = useState<IFinEditFT>({
    tipoDeIndicador: true,
    claridad: true,
    relevancia: true,
    economia: true,
    monitoreable: true,
    adecuado: true,
    aporte_marginal: true,
    dimension: true,
    unidadDeMedida: true,
  });

  const [editProposito, setEditProposito] = useState<IPropositoEditFT>({
    tipoDeIndicador: true,
    claridad: true,
    relevancia: true,
    economia: true,
    monitoreable: true,
    adecuado: true,
    aporte_marginal: true,
    dimension: true,
    unidadDeMedida: true,
  });

  const [editComponentes, setEditComponentes] = useState<
    Array<IComponenteEditFT>
  >([]);

  const [editActividades, setEditActividades] = useState<
    Array<IActividadesEditFT>
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
                value={!editEncabezado.programaSER}
                onChange={(v) => {
                  setEditEncabezado({ ...editEncabezado, programaSER: !v.target.checked });
                }}
              />
            )}
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              PROGRAMA SECTORIAL SECTORIAL, ESPECIAL O REGIONAL:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {encabezado[0]?.programaSER}
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
                value={!editEncabezado.objetivoSER}
                onChange={(v) => {
                  setEditEncabezado({ ...editEncabezado, objetivoSER: !v.target.checked });
                }}
              />
            )}
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              OBJETIVO PROGRAMA SECTORIAL, ESPECIAL O REGIONAL:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {encabezado[0]?.objetivoSER}
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
                value={!editEncabezado.catalogoObjetivoODS}
                onChange={(v) => {
                  setEditEncabezado({ ...editEncabezado, catalogoObjetivoODS: !v.target.checked });
                }}
              />
            )}
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              OBJETIVO ODS:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {encabezado[0]?.catalogoObjetivoODS}
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
                value={!editEncabezado.catalogoMetaODS}
                onChange={(v) => {
                  setEditEncabezado({
                    ...editEncabezado,
                    catalogoMetaODS: !v.target.checked,
                  });
                }}
              />
            )}
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              META ODS:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {encabezado[0]?.catalogoMetaODS}
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
                value={!editFin.tipoDeIndicador}
                onChange={(v) => {
                  setEditFin({
                    ...editFin,
                    tipoDeIndicador: !v.target.checked,
                  });
                }}
              />
            )}
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              TIPO DE INDICADOR:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {fin[0]?.tipoDeIndicador}
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
                value={!editFin.dimension}
                onChange={(v) => {
                  setEditFin({
                    ...editFin,
                    dimension: !v.target.checked,
                  });
                }}
              />
            )}
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              DIMENSIÓN:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {fin[0]?.dimension}
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
                value={!editFin.unidadDeMedida}
                onChange={(v) => {
                  setEditFin({
                    ...editFin,
                    unidadDeMedida: !v.target.checked,
                  });
                }}
              />
            )}
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              UNIDAD DE MEDIDA:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {fin[0]?.unidadDeMedida}
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
              value={!editFin.claridad}
              onChange={(v) => {
                setEditFin({
                  ...editFin,
                  claridad: !v.target.checked,
                });
                }}
              />
            )}
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              CLARIDAD:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {fin[0]?.claridad}
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
              value={!editFin.relevancia}
              onChange={(v) => {
                setEditFin({
                  ...editFin,
                  relevancia: !v.target.checked,
                });
                }}
              />
            )}
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              RELEVANCIA:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {fin[0]?.relevancia}
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
              value={!editFin.economia}
              onChange={(v) => {
                setEditFin({
                  ...editFin,
                  economia: !v.target.checked,
                });
                }}
              />
            )}
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              ECONOMÍA:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {fin[0]?.economia}
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
              value={!editFin.monitoreable}
              onChange={(v) => {
                setEditFin({
                  ...editFin,
                  monitoreable: !v.target.checked,
                });
                }}
              />
            )}
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              MONITOREABLE:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {fin[0]?.monitoreable}
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
              value={!editFin.adecuado}
              onChange={(v) => {
                setEditFin({
                  ...editFin,
                  adecuado: !v.target.checked,
                });
                }}
              />
            )}
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              ADECUADO:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {fin[0]?.adecuado}
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
              value={!editFin.aporte_marginal}
              onChange={(v) => {
                setEditFin({
                  ...editFin,
                  aporte_marginal: !v.target.checked,
                });
                }}
              />
            )}
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              APORTE MARGINAL:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {fin[0]?.aporte_marginal}
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
                value={!editProposito.tipoDeIndicador}
                onChange={(v) => {
                  setEditProposito({
                    ...editProposito,
                    tipoDeIndicador: !v.target.checked,
                  });
                }}
              />
            )}
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              TIPO DE INDICADOR:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {proposito[0]?.tipoDeIndicador}
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
                value={!editProposito.dimension}
                onChange={(v) => {
                  setEditProposito({
                    ...editProposito,
                    dimension: !v.target.checked,
                  });
                }}
              />
            )}
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              DIMENSIÓN:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {proposito[0]?.dimension}
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
                value={!editProposito.unidadDeMedida}
                onChange={(v) => {
                  setEditProposito({
                    ...editProposito,
                    unidadDeMedida: !v.target.checked,
                  });
                }}
              />
            )}
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              UNIDAD DE MEDIDA:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {proposito[0]?.unidadDeMedida}
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
                value={!editProposito.claridad}
                onChange={(v) => {
                  setEditProposito({
                    ...editProposito,
                    claridad: !v.target.checked,
                  });
                }}
              />
            )}
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              CLARIDAD:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {proposito[0]?.claridad}
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
                value={!editProposito.relevancia}
                onChange={(v) => {
                  setEditProposito({
                    ...editProposito,
                    relevancia: !v.target.checked,
                  });
                }}
              />
            )}
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              RELEVANCIA:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {proposito[0]?.relevancia}
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
                value={!editProposito.economia}
                onChange={(v) => {
                  setEditProposito({
                    ...editProposito,
                    economia: !v.target.checked,
                  });
                }}
              />
            )}
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              ECONOMÍA:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {proposito[0]?.economia}
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
                value={!editProposito.monitoreable}
                onChange={(v) => {
                  setEditProposito({
                    ...editProposito,
                    monitoreable: !v.target.checked,
                  });
                }}
              />
            )}
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              MONITOREABLE:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {proposito[0]?.monitoreable}
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
                value={!editProposito.adecuado}
                onChange={(v) => {
                  setEditProposito({
                    ...editProposito,
                    adecuado: !v.target.checked,
                  });
                }}
              />
            )}
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              ADECUADO:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {proposito[0]?.adecuado}
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
                value={!editProposito.aporte_marginal}
                onChange={(v) => {
                  setEditProposito({
                    ...editProposito,
                    aporte_marginal: !v.target.checked,
                  });
                }}
              />
            )}
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              APORTE MARGINAL:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
              {proposito[0]?.aporte_marginal}
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
                value={!editComponentes[index - 1]?.tipoDeIndicador}
                onChange={(v) => {
                  let past = [...editComponentes];
                  past[index - 1].tipoDeIndicador = !v.target.checked;
                  setEditComponentes(past);
                }}
              />
            )}
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              TIPO DE INDICADOR:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
            {componenteValor[index - 1]?.tipoDeIndicador}
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
              value={!editComponentes[index - 1]?.dimension}
              onChange={(v) => {
                let past = [...editComponentes];
                past[index - 1].dimension = !v.target.checked;
                setEditComponentes(past);
              }}
              />
            )}
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              DIMENSIÓN:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
            {componenteValor[index - 1]?.dimension}
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
              value={!editComponentes[index - 1]?.unidadDeMedida}
              onChange={(v) => {
                let past = [...editComponentes];
                past[index - 1].unidadDeMedida = !v.target.checked;
                setEditComponentes(past);
              }}
              />
            )}
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              UNIDAD DE MEDIDA:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
            {componenteValor[index - 1]?.unidadDeMedida}
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
              value={!editComponentes[index - 1]?.claridad}
              onChange={(v) => {
                let past = [...editComponentes];
                past[index - 1].claridad = !v.target.checked;
                setEditComponentes(past);
              }}
              />
            )}
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              CLARIDAD:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
            {componenteValor[index - 1]?.claridad}
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
              value={!editComponentes[index - 1]?.relevancia}
              onChange={(v) => {
                let past = [...editComponentes];
                past[index - 1].relevancia = !v.target.checked;
                setEditComponentes(past);
              }}
              />
            )}
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              RELEVANCIA:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
            {componenteValor[index - 1]?.relevancia}
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
              value={!editComponentes[index - 1]?.economia}
              onChange={(v) => {
                let past = [...editComponentes];
                past[index - 1].economia = !v.target.checked;
                setEditComponentes(past);
              }}
              />
            )}
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              ECONOMÍA:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
            {componenteValor[index - 1]?.economia}
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
              value={!editComponentes[index - 1]?.monitoreable}
              onChange={(v) => {
                let past = [...editComponentes];
                past[index - 1].monitoreable = !v.target.checked;
                setEditComponentes(past);
              }}
              />
            )}
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              MONITOREABLE:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
            {componenteValor[index - 1]?.monitoreable}
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
              value={!editComponentes[index - 1]?.adecuado}
              onChange={(v) => {
                let past = [...editComponentes];
                past[index - 1].adecuado = !v.target.checked;
                setEditComponentes(past);
              }}
              />
            )}
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              ADECUADO:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
            {componenteValor[index - 1]?.adecuado}
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
              value={!editComponentes[index - 1]?.aporte_marginal}
              onChange={(v) => {
                let past = [...editComponentes];
                past[index - 1].aporte_marginal = !v.target.checked;
                setEditComponentes(past);
              }}
              />
            )}
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              APORTE MARGINAL:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
            {componenteValor[index - 1]?.aporte_marginal}
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
                        value={!editActividades[indexComponentes]?.tipoDeIndicador}
                        onChange={(v) => {
                          let past = [...editActividades];
                          past[indexComponentes].tipoDeIndicador = !v.target.checked;
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
                                .actividades[indexActividades].tipoDeIndicador
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
                value={!editActividades[indexComponentes]?.dimension}
                onChange={(v) => {
                  let past = [...editActividades];
                  past[indexComponentes].dimension = !v.target.checked;
                  setEditActividades(past);
                }}
              />
            )}
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              DIMENSIÓN:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
            {
                              cValor[0].componentes[indexComponentes]
                                .actividades[indexActividades].dimension
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
              value={!editActividades[indexComponentes]?.unidadDeMedida}
              onChange={(v) => {
                let past = [...editActividades];
                past[indexComponentes].unidadDeMedida = !v.target.checked;
                setEditActividades(past);
              }}
              />
            )}
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              UNIDAD DE MEDIDA:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
            {
                              cValor[0].componentes[indexComponentes]
                                .actividades[indexActividades].unidadDeMedida
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
              value={!editActividades[indexComponentes]?.claridad}
              onChange={(v) => {
                let past = [...editActividades];
                past[indexComponentes].claridad = !v.target.checked;
                setEditActividades(past);
              }}
              />
            )}
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              CLARIDAD:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
            {
                              cValor[0].componentes[indexComponentes]
                                .actividades[indexActividades].claridad
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
              value={!editActividades[indexComponentes]?.relevancia}
              onChange={(v) => {
                let past = [...editActividades];
                past[indexComponentes].relevancia = !v.target.checked;
                setEditActividades(past);
              }}
              />
            )}
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              RELEVANCIA:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
            {
                              cValor[0].componentes[indexComponentes]
                                .actividades[indexActividades].relevancia
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
              value={!editActividades[indexComponentes]?.economia}
              onChange={(v) => {
                let past = [...editActividades];
                past[indexComponentes].economia = !v.target.checked;
                setEditActividades(past);
              }}
              />
            )}
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              ECONOMÍA:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
            {
                              cValor[0].componentes[indexComponentes]
                                .actividades[indexActividades].economia
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
              value={!editActividades[indexComponentes]?.monitoreable}
              onChange={(v) => {
                let past = [...editActividades];
                past[indexComponentes].monitoreable = !v.target.checked;
                setEditActividades(past);
              }}
              />
            )}
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              MONITOREABLE:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
            {
                              cValor[0].componentes[indexComponentes]
                                .actividades[indexActividades].monitoreable
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
              value={!editActividades[indexComponentes]?.adecuado}
              onChange={(v) => {
                let past = [...editActividades];
                past[indexComponentes].adecuado = !v.target.checked;
                setEditActividades(past);
              }}
              />
            )}
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              ADECUADO:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
            {
                              cValor[0].componentes[indexComponentes]
                                .actividades[indexActividades].adecuado
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
              value={!editActividades[indexComponentes]?.aporte_marginal}
              onChange={(v) => {
                let past = [...editActividades];
                past[indexComponentes].aporte_marginal = !v.target.checked;
                setEditActividades(past);
              }}
              />
            )}
            <Typography sx={{ fontFamily: "MontserratMedium", width: "20%" }}>
              APORTE MARGINAL:
            </Typography>
            <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
                            {
                              cValor[0].componentes[indexComponentes]
                                .actividades[indexActividades].aporte_marginal
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
            creaFT(
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

        {/*CAMBIAR POR EL MODAL DE MODIFICAR DE FICHA TÉCNICA*/}
        <ModalSolicitaModif
          open={openModalSolicitarModif}
          handleClose={handleCloseModif}
          MA={JSON.stringify(FT)}
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

        <ModalEnviarFT
          open={openModalEnviar}
          handleClose={handleCloseEnviar}
          MIR={MIR}
          IdMA={IdMA}
          IdMIR={IdMir}
          showResume={showResume}
          FT={JSON.stringify(FT)}
          IdFT={IdFT}
        ></ModalEnviarFT>
      </Box>
    </Box>
  );
}

export default TabResumenFT;

export interface IEncabezadoEditFT {
  programaSER: boolean;
  objetivoSER: boolean;
  catalogoObjetivoODS: boolean;
  catalogoMetaODS: boolean;
}

export interface IFinEditFT {
  tipoDeIndicador: boolean;
  claridad: boolean;
  relevancia: boolean;
  economia: boolean;
  monitoreable: boolean;
  adecuado: boolean;
  aporte_marginal: boolean;
  dimension: boolean;
  unidadDeMedida: boolean;
}

export interface IPropositoEditFT {
  tipoDeIndicador: boolean;
  claridad: boolean;
  relevancia: boolean;
  economia: boolean;
  monitoreable: boolean;
  adecuado: boolean;
  aporte_marginal: boolean;
  dimension: boolean;
  unidadDeMedida: boolean;
}

export interface IActividadesEditFT {
  actividad: string;
  tipoDeIndicador: boolean;
  claridad: boolean;
  relevancia: boolean;
  economia: boolean;
  monitoreable: boolean;
  adecuado: boolean;
  aporte_marginal: boolean;
  dimension: boolean;
  unidadDeMedida: boolean;
}

export interface IComponenteEditFT {
  componentes: string;
  tipoDeIndicador: boolean;
  claridad: boolean;
  relevancia: boolean;
  economia: boolean;
  monitoreable: boolean;
  adecuado: boolean;
  aporte_marginal: boolean;
  dimension: boolean;
  unidadDeMedida: boolean;
}


