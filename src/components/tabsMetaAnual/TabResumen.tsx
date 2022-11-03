import { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import axios from "axios";
import { IFin, IProposito } from "./TabFinProposito";
import Swal from "sweetalert2";
import ModalEnviarMIR from "../modalsMIR/ModalEnviarMIR";
import { IComponente } from "../tabsMir/IComponente";
import { ICValor } from "../tabsMir/ICValor";
import { IMIR } from "../tabsMir/IMIR";
import { IActividadesMir } from "./AddMetaAnual";
import { IEncabezado } from "./TabEncabezado";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";


export function TabResumenMR({
  show,
  encabezado,
  fin,
  proposito,
  componentes,
  componenteValor,
  cValor,
  showResume,
  IdMir,

}: {
  show: boolean;
  encabezado: Array<IEncabezado>;
  fin: Array<IFin>;
  proposito: Array<IProposito>;
  componentes: number[];
  componenteValor: Array<IComponente>;
  cValor: Array<ICValor>;
  showResume: Function;
  IdMir: string;
}) {
  const [MIR, setMIR] = useState<IMIR>();

  const [openModalEnviar, setOpenModalEnviar] = useState(false);
  const handleCloseEnviar = () => {
    setOpenModalEnviar(false);
  };

  const [openModalSolicitarModif, setOpenModalSolicitarModif] = useState(false);
  const [openFin, setOpenFin] = useState(false);
  const handleClickOpen = () => {
    setOpenFin(false);
  };

  const [openProposito, setOpenProposito] = useState(false);
  const handleClickOpenP = () => {
    setOpenProposito(false);
  };

  const [openComponentes, setOpenComponentes] = useState(false);
  const [numComponente, setNumComponente] = useState(0);
  const handleClickOpenC = () => {
    setOpenComponentes(false);
  };


  const [openComponentesActividades, setOpenComponentesActividades] = useState(false);
  const [numComponenteActividades, setNumComponenteActividades] = useState(0);
  const handleClickOpenCA = () => {
    setOpenComponentesActividades(false);
  };

  const handleCloseModif = () => {
    setOpenModalSolicitarModif(false);
  };



  let asignarMIR = (
    encabezadoM: Array<IEncabezado>,
    finM: Array<IFin>,
    propositoM: Array<IProposito>,
    componentesM: Array<IComponente>,
    actividadesM: Array<IActividadesMir>
  ) => {
    setMIR({
      encabezado: encabezadoM[0],
      fin: finM[0],
      proposito: propositoM[0],
      componentes: componentesM,
      actividades: actividadesM,
    });
  };

  const checkMir = (v: string) => {
    if (MIR?.encabezado.ejercicioFiscal === "") {
      return Toast.fire({
        icon: "error",
        title: "Selecciona año fiscal.",
      });
    } else if (MIR?.encabezado.institucion === "") {
      return Toast.fire({
        icon: "error",
        title: "Selecciona institución.",
      });
    } else if (MIR?.encabezado.nombre_del_programa === "") {
      return Toast.fire({
        icon: "error",
        title: "Selecciona programa.",
      });
    } else {
      createMIR(v);
    }
  };

  const createMIR = (estado: string) => {
    axios
      .post(
        "http://10.200.4.105:8000/api/create-mir",
        {
          MIR: JSON.stringify(MIR),
          Estado: estado,
          CreadoPor: localStorage.getItem("IdUsuario"),
          AnioFiscal: MIR?.encabezado.ejercicioFiscal,
          Institucion: MIR?.encabezado.institucion,
          Programa: MIR?.encabezado.nombre_del_programa,
          Eje: MIR?.encabezado.eje,
          Tematica: MIR?.encabezado.tema,
          IdMir: IdMir,
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
        if (err.response.status === 409) {
          Toast.fire({
            icon: "error",
            title: err.response.data.result.error,
          });
        }
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

    asignarMIR(encabezado, fin, proposito, componenteValor, arr);
  }, [encabezado, componenteValor, proposito, fin, cValor, show]);

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

  return (
    <Box>

      <Dialog open={openFin} fullWidth={true}
        maxWidth={'xl'}>
        {/* aqui, termina la apertura del dialog*/}
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
            Resumen Narrativo:
          </Typography>
          <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
            {fin[0]?.resumen}
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
            Indicador:
          </Typography>
          <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
            {fin[0]?.indicador}
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
            Fórmula:
          </Typography>
          <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
            {fin[0]?.formula}
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
            Frecuencia:
          </Typography>
          <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
            {fin[0]?.frecuencia}
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
            Medios de Verificación:
          </Typography>
          <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
            {fin[0]?.medios}
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
            Supuestos:
          </Typography>
          <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
            {fin[0]?.supuestos}
          </Typography>

        </Box>
        {/* aqui,el cierre del dialog*/}
        <Button onClick={handleClickOpen}>salir</Button>

      </Dialog>

      <Dialog open={openProposito} fullWidth={true}
        maxWidth={'xl'}>
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
            Resumen Narrativo:
          </Typography>
          <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
            {proposito[0]?.resumen}
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
            Indicador:
          </Typography>
          <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
            {proposito[0]?.indicador}
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
            Fórmula:
          </Typography>
          <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
            {proposito[0]?.formula}
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
            Frecuencia:
          </Typography>
          <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
            {proposito[0]?.frecuencia}
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
            Medios de Verificación:
          </Typography>
          <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
            {proposito[0]?.medios_verificacion}
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
            Supuestos:
          </Typography>
          <Typography sx={{ fontFamily: "MontserratLight", width: "80%" }}>
            {proposito[0]?.supuestos}
          </Typography>
        </Box>
        <Button onClick={handleClickOpenP}>salir</Button>
      </Dialog>

      <Dialog open={openComponentes} fullWidth={true} maxWidth={'xl'}>
        <Typography
          sx={{
            fontFamily: "MontserratMedium",
            borderBottom: 1,
            mt: 5,
            textAlign: "center",
          }}
        >
          Componente {numComponente}
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
            Resumen Narrativo:
          </Typography>
          <Typography
            sx={{ fontFamily: "MontserratLight", width: "80%" }}
          >
            {componenteValor[numComponente - 1]?.resumen}
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
            Indicador:
          </Typography>
          <Typography
            sx={{ fontFamily: "MontserratLight", width: "80%" }}
          >
            {componenteValor[numComponente - 1]?.indicador}
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
            Fórmula:
          </Typography>
          <Typography
            sx={{ fontFamily: "MontserratLight", width: "80%" }}
          >
            {componenteValor[numComponente - 1]?.formula}
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
            Frecuencia:
          </Typography>
          <Typography
            sx={{ fontFamily: "MontserratLight", width: "80%" }}
          >
            {componenteValor[numComponente - 1]?.frecuencia}
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
            Medios de Verificación:
          </Typography>
          <Typography
            sx={{ fontFamily: "MontserratLight", width: "80%" }}
          >
            {componenteValor[numComponente - 1]?.medios}
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
            Supuestos:
          </Typography>
          <Typography
            sx={{ fontFamily: "MontserratLight", width: "80%" }}
          >
            {componenteValor[numComponente - 1]?.supuestos}
          </Typography>
        </Box>


        <Button onClick={handleClickOpenC}>salir</Button>
      </Dialog>

      <Dialog open={openComponentesActividades} fullWidth={true} maxWidth={'xl'}>

        <Typography
          sx={{
            fontFamily: "MontserratMedium",
            borderBottom: 1,
            mt: 5,
            textAlign: "center",
          }}
        >
          Componente {numComponente + 1} - Actividad{" "}
          {numComponenteActividades + 1}
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
            Resumen Narrativo:
          </Typography>
          <Typography
            sx={{ fontFamily: "MontserratLight", width: "80%" }}
          >
            {
              cValor[0].componentes[numComponente].actividades[numComponenteActividades
              ].resumen
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
            Indicador:
          </Typography>
          <Typography
            sx={{ fontFamily: "MontserratLight", width: "80%" }}
          >
            {
              cValor[0].componentes[numComponente].actividades[
                numComponenteActividades
              ].indicador
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
            Fórmula:
          </Typography>
          <Typography
            sx={{ fontFamily: "MontserratLight", width: "80%" }}
          >
            {
              cValor[0].componentes[numComponente].actividades[
                numComponenteActividades
              ].formula
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
            Frecuencia:
          </Typography>
          <Typography
            sx={{ fontFamily: "MontserratLight", width: "80%" }}
          >
            {
              cValor[0].componentes[numComponente].actividades[
                numComponenteActividades
              ].frecuencia
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
            Medios de Verificación:
          </Typography>
          <Typography
            sx={{ fontFamily: "MontserratLight", width: "80%" }}
          >
            {
              cValor[0].componentes[numComponente].actividades[
                numComponenteActividades
              ].medios
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
            Supuestos:
          </Typography>
          <Typography
            sx={{ fontFamily: "MontserratLight", width: "80%" }}
          >
            {
              cValor[0].componentes[numComponente].actividades[
                numComponenteActividades
              ].supuestos
            }
          </Typography>
        </Box>
        <Button onClick={handleClickOpenCA}>salir</Button>
      </Dialog>
    </Box >
  );
}

export default TabResumenMR;
