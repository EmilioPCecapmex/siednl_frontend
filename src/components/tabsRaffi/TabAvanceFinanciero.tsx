import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import axios from "axios";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { queries } from "../../queries";
import { IMIR } from "../tabsMir/interfaces mir/IMIR";
import {
  IAvanceFinancieroRF,
  IRFEdit,
  IVPTrimestral,
  IVTrimestral,
} from "./interfacesRaffi";
import { DialogMonto } from "../formulasDialog/FormulaDialogRaffiAvanceFinanciero";
import { alertaInfo } from "../genericComponents/Alertas";
import { validarNumero } from "../../services/validations";

export const VTrimestral = {
  t1: {
    valor1: "",
    valor2: "",
    resultado: "",
  },
  t2: {
    valor1: "",
    valor2: "",
    resultado: "",
  },
  t3: {
    valor1: "",
    valor2: "",
    resultado: "",
  },
  t4: {
    valor1: "",
    valor2: "",
    resultado: "",
  },
  total: "",
  cuentaPublica: "",
};
export const VPTrimestral = {
  pt1: "",
  pt2: "",
  pt3: "",
  pt4: "",
  ptotal: "",
  porcentajeCuentaPublica: "",
};
export const VTrimestralboolean = {
  t1: {
    valor1: false,
    valor2: false,
    resultado: false,
  },
  t2: {
    valor1: false,
    valor2: false,
    resultado: false,
  },
  t3: {
    valor1: false,
    valor2: false,
    resultado: false,
  },
  t4: {
    valor1: false,
    valor2: false,
    resultado: false,
  },
  total: false,
  cuentaPublica: false,
};


export const VPTrimestralboolean = {
  pt1: false,
  pt2: false,
  pt3: false,
  pt4: false,
  ptotal: false,
  porcentajeCuentaPublica: false,
};

export function TabAvanceFinanciero({
  edit,
  MIR,
  MA,
  avanceFinancieroRF,
  setAvanceFinancieroRF,
  raffiboolean,
}: {
  edit: boolean;
  MIR: string;
  MA: string;
  avanceFinancieroRF: IAvanceFinancieroRF;
  setAvanceFinancieroRF: Function;
  raffiboolean: IRFEdit;
}) {
  const jsonMir: IMIR = JSON.parse(MIR);
  type Programa = {
    Id: string;
    NombrePrograma: string;
    IdEntidad: string;
  };
  const [trimestre, setTrimestre] = useState("0");
  const [programa, setPrograma] = useState<Programa | null>(null);
  interface VistaFinanciera {
    PROY_PROG: string;
    T1_APROBADO: string;
    T2_APROBADO: string;
    T3_APROBADO: string;
    T4_APROBADO: string;
    T1_MODIFICADO: string;
    T2_MODIFICADO: string;
    T3_MODIFICADO: string;
    T4_MODIFICADO: string;
    T1_DEVENGADO: string;
    T2_DEVENGADO: string;
    T3_DEVENGADO: string;
    T4_DEVENGADO: string;
    T1_EJERCIDO: string;
    T2_EJERCIDO: string;
    T3_EJERCIDO: string;
    T4_EJERCIDO: string;
  }
  
  const [vista, setVista] = useState<VistaFinanciera[]>([]);

  const [nombrePrograma, setNombrePrograma] = useState("Sin Información");
  const [valorProgramaPresupuestario, setValorProgramaPresupuestario] =
    useState(avanceFinancieroRF.valorProgramaPresupuestario);

  const [devengadoModificado, setDevengadoModificado] = useState<IVTrimestral>(
    avanceFinancieroRF.monto.devengadoModificado
  );
  const [ejercidoModificado, setEjercidoModificado] = useState<IVTrimestral>(
    avanceFinancieroRF.monto.ejercidoModificado
  );
  const [modificadoAutorizado, setModificadoAutorizado] =
    useState<IVTrimestral>(avanceFinancieroRF.monto.modificadoAutorizado);

  const [PDevengadoModificado, setPDevengadoModificado] =
    useState<IVPTrimestral>(
      avanceFinancieroRF.porcentaje.porcentajeDevengadoModificado
    );
  const [PEjercidoModificado, setPEjercidoModificado] = useState<IVPTrimestral>(
    avanceFinancieroRF.porcentaje.porcentajeEjercidoModificado
  );
  const [PModificadoAutorizado, setPModificadoAutorizado] =
    useState<IVPTrimestral>(
      avanceFinancieroRF.porcentaje.porcentajeModificadoAutorizado
    );

  const year = new Date().getFullYear();
  const dateTrim = [
    new Date(year, 2, 31),
    new Date(year, 5, 30),
    new Date(year, 8, 30),
    new Date(year, 11, 31),
  ];
  useEffect(() => {
    if (programa?.IdEntidad) {
      getVista();
    }
  }, [programa]);
  const cargado = useRef(false);

  useEffect(() => {
    if (vista && vista.length > 0 && !cargado.current) {
      cargado.current = true;
      cargaInformacion();
    }
  }, [vista]);
  useEffect(() => {
    if (valorProgramaPresupuestario !== "" && edit) { 
      setNombrePrograma(avanceFinancieroRF.nombrePrograma);
      setValorProgramaPresupuestario(avanceFinancieroRF.valorProgramaPresupuestario);
      setDevengadoModificado(avanceFinancieroRF.monto.devengadoModificado);
      setEjercidoModificado(avanceFinancieroRF.monto.ejercidoModificado);
      setModificadoAutorizado(avanceFinancieroRF.monto.modificadoAutorizado);
      setPDevengadoModificado(avanceFinancieroRF.porcentaje.porcentajeDevengadoModificado);
      setPEjercidoModificado(avanceFinancieroRF.porcentaje.porcentajeEjercidoModificado);
      setPModificadoAutorizado(avanceFinancieroRF.porcentaje.porcentajeModificadoAutorizado);
    }
  }, [avanceFinancieroRF]);

  useEffect(() => {
    let auxRaffi: IAvanceFinancieroRF = {
      nombrePrograma: nombrePrograma,
      valorProgramaPresupuestario: valorProgramaPresupuestario,

      monto: {
        devengadoModificado: devengadoModificado,
        modificadoAutorizado: modificadoAutorizado,
        ejercidoModificado: ejercidoModificado,
      },
      porcentaje: {
        porcentajeDevengadoModificado: PDevengadoModificado,
        porcentajeModificadoAutorizado: PModificadoAutorizado,
        porcentajeEjercidoModificado: PEjercidoModificado,
      },
    };

    if (
      devengadoModificado.t1.resultado !== "" ||
      devengadoModificado.t2.resultado !== "" ||
      devengadoModificado.t3.resultado !== "" ||
      devengadoModificado.t4.resultado !== "" ||
      ejercidoModificado.t1.resultado !== "" ||
      ejercidoModificado.t2.resultado !== "" ||
      ejercidoModificado.t3.resultado !== "" ||
      ejercidoModificado.t4.resultado !== "" ||
      modificadoAutorizado.t1.resultado !== "" ||
      modificadoAutorizado.t2.resultado !== "" ||
      modificadoAutorizado.t3.resultado !== "" ||
      modificadoAutorizado.t4.resultado !== ""
    ) {
      setAvanceFinancieroRF(auxRaffi);
    }
  }, [
    valorProgramaPresupuestario,
    devengadoModificado,
    ejercidoModificado,
    modificadoAutorizado,
    PDevengadoModificado,
    PModificadoAutorizado,
    PEjercidoModificado,
  ]);

  useEffect(() => {
    let auxPModificadoAutorizado: IVPTrimestral = {
      pt1: getProcentajeActualizado(modificadoAutorizado.t1.resultado),
      pt2: getProcentajeActualizado(modificadoAutorizado.t2.resultado),
      pt3: getProcentajeActualizado(modificadoAutorizado.t3.resultado),
      pt4: getProcentajeActualizado(modificadoAutorizado.t4.resultado),
      ptotal: getProcentajeActualizado(modificadoAutorizado.total),
      porcentajeCuentaPublica: getProcentajeActualizado(
        modificadoAutorizado.cuentaPublica
      ),
    };

    let auxPDevengadoModificado: IVPTrimestral = {
      pt1: getProcentajeActualizado(devengadoModificado.t1.resultado),
      pt2: getProcentajeActualizado(devengadoModificado.t2.resultado),
      pt3: getProcentajeActualizado(devengadoModificado.t3.resultado),
      pt4: getProcentajeActualizado(devengadoModificado.t4.resultado),
      ptotal: getProcentajeActualizado(devengadoModificado.total),
      porcentajeCuentaPublica: getProcentajeActualizado(
        devengadoModificado.cuentaPublica
      ),
    };

    let auxPEjercidoModificado: IVPTrimestral = {
      pt1: getProcentajeActualizado(ejercidoModificado.t1.resultado),
      pt2: getProcentajeActualizado(ejercidoModificado.t2.resultado),
      pt3: getProcentajeActualizado(ejercidoModificado.t3.resultado),
      pt4: getProcentajeActualizado(ejercidoModificado.t4.resultado),
      ptotal: getProcentajeActualizado(ejercidoModificado.total),
      porcentajeCuentaPublica: getProcentajeActualizado(
        ejercidoModificado.cuentaPublica
      ),
    };

    setPModificadoAutorizado(auxPModificadoAutorizado);
    setPDevengadoModificado(auxPDevengadoModificado);
    setPEjercidoModificado(auxPEjercidoModificado);
  }, [
    valorProgramaPresupuestario,
    PDevengadoModificado,
    PModificadoAutorizado,
    PEjercidoModificado,
  ]);

  const [selector, setSelector] = useState("MODIFICADO/AUTORIZADO");

  const [openFormulaDialog, setOpenFormulaDialog] = useState(false);

  const handleClose = () => {
    setOpenFormulaDialog(false);
  };

  const handleClickOpen = () => {
    setOpenFormulaDialog(true);
  };



  const cargaInformacion = () => {
    const datos = vista?.[0];
    if (!datos) return;
  
    const num = (v: string | number | undefined | null) =>
      v === undefined || v === null ? "" : v.toString();
  
    const toNum = (v: string | number | undefined | null) =>
      typeof v === "number" ? v : parseFloat(String(v ?? "")) || 0;
  
    const sumaModificado =
    toNum(datos.T1_MODIFICADO) +
    toNum(datos.T2_MODIFICADO) +
    toNum(datos.T3_MODIFICADO) +
    toNum(datos.T4_MODIFICADO);

  const sumaDevengado =
    toNum(datos.T1_DEVENGADO) +
    toNum(datos.T2_DEVENGADO) +
    toNum(datos.T3_DEVENGADO) +
    toNum(datos.T4_DEVENGADO);

  const sumaEjercido =
    toNum(datos.T1_EJERCIDO) +
    toNum(datos.T2_EJERCIDO) +
    toNum(datos.T3_EJERCIDO) +
    toNum(datos.T4_EJERCIDO);

  const totalPrograma = Math.max(sumaModificado, sumaDevengado, sumaEjercido);


  const baseStr = totalPrograma.toString();
  setValorProgramaPresupuestario(baseStr);

    const pct = (v: string | number | undefined | null) => {
      const base = parseFloat(valorProgramaPresupuestario);
      const val = typeof v === "number" ? v : parseFloat(String(v ?? ""));
      if (!base || isNaN(val)) return "";
      return ((val / base) * 100).toString();
    };
  
    setModificadoAutorizado((prev) => ({
      ...prev,
      t1: { valor1: num(datos.T1_MODIFICADO), valor2: num(datos.T1_APROBADO), resultado: num(datos.T1_MODIFICADO) },
      t2: { valor1: num(datos.T2_MODIFICADO), valor2: num(datos.T2_APROBADO), resultado: num(datos.T2_MODIFICADO) },
      t3: { valor1: num(datos.T3_MODIFICADO), valor2: num(datos.T3_APROBADO), resultado: num(datos.T3_MODIFICADO) },
      t4: { valor1: num(datos.T4_MODIFICADO), valor2: num(datos.T4_APROBADO), resultado: num(datos.T4_MODIFICADO) },
    }));
    setPModificadoAutorizado((prev) => ({
      ...prev,
      pt1: pct(datos.T1_MODIFICADO), pt2: pct(datos.T2_MODIFICADO),
      pt3: pct(datos.T3_MODIFICADO), pt4: pct(datos.T4_MODIFICADO),
    }));
  
    setDevengadoModificado((prev) => ({
      ...prev,
      t1: { valor1: num(datos.T1_DEVENGADO), valor2: num(datos.T1_MODIFICADO), resultado: num(datos.T1_DEVENGADO) },
      t2: { valor1: num(datos.T2_DEVENGADO), valor2: num(datos.T2_MODIFICADO), resultado: num(datos.T2_DEVENGADO) },
      t3: { valor1: num(datos.T3_DEVENGADO), valor2: num(datos.T3_MODIFICADO), resultado: num(datos.T3_DEVENGADO) },
      t4: { valor1: num(datos.T4_DEVENGADO), valor2: num(datos.T4_MODIFICADO), resultado: num(datos.T4_DEVENGADO) },
    }));
    setPDevengadoModificado((prev) => ({
      ...prev,
      pt1: pct(datos.T1_DEVENGADO), pt2: pct(datos.T2_DEVENGADO),
      pt3: pct(datos.T3_DEVENGADO), pt4: pct(datos.T4_DEVENGADO),
    }));
  
    setEjercidoModificado((prev) => ({
      ...prev,
      t1: { valor1: num(datos.T1_EJERCIDO), valor2: num(datos.T1_MODIFICADO), resultado: num(datos.T1_EJERCIDO) },
      t2: { valor1: num(datos.T2_EJERCIDO), valor2: num(datos.T2_MODIFICADO), resultado: num(datos.T2_EJERCIDO) },
      t3: { valor1: num(datos.T3_EJERCIDO), valor2: num(datos.T3_MODIFICADO), resultado: num(datos.T3_EJERCIDO) },
      t4: { valor1: num(datos.T4_EJERCIDO), valor2: num(datos.T4_MODIFICADO), resultado: num(datos.T4_EJERCIDO) },
    }));
    setPEjercidoModificado((prev) => ({
      ...prev,
      pt1: pct(datos.T1_EJERCIDO), pt2: pct(datos.T2_EJERCIDO),
      pt3: pct(datos.T3_EJERCIDO), pt4: pct(datos.T4_EJERCIDO),
    }));
  };


  // const cargaInformacion = (
  // ) => {
  //   let auxMonto: IVTrimestral;
  //   let auxPorcentaje: IVPTrimestral;
  //   const datos = vista?.[0];
  //   console.log(datos);
  //       auxMonto = { ...modificadoAutorizado };
  //       auxPorcentaje = { ...PModificadoAutorizado };
       
  //           auxMonto.t1 = { valor1: datos?.T1_MODIFICADO ?? 0, valor2: datos?.T1_APROBADO ?? 0, resultado: datos?.T1_MODIFICADO ?? 0 };
  //           auxPorcentaje.pt1 = (parseFloat(datos?.T1_MODIFICADO)/parseFloat(valorProgramaPresupuestario)*100).toString();
  //           setModificadoAutorizado(auxMonto);
  //           setPModificadoAutorizado(auxPorcentaje);

            
  //           auxMonto.t2 = { valor1: datos?.T2_MODIFICADO ?? 0, valor2: datos?.T2_APROBADO ?? 0, resultado: datos?.T2_MODIFICADO ?? 0 };
  //           auxPorcentaje.pt2 = (parseFloat(datos?.T2_MODIFICADO)/parseFloat(valorProgramaPresupuestario)*100).toString();
  //           setModificadoAutorizado(auxMonto);
  //           setPModificadoAutorizado(auxPorcentaje);

           
  //           auxMonto.t3 = { valor1: datos?.T3_MODIFICADO ?? 0, valor2: datos?.T3_APROBADO ?? 0, resultado: datos?.T3_MODIFICADO ?? 0 };
  //           auxPorcentaje.pt3 = (parseFloat(datos?.T3_MODIFICADO)/parseFloat(valorProgramaPresupuestario)*100).toString();
  //           setModificadoAutorizado(auxMonto);
  //           setPModificadoAutorizado(auxPorcentaje);
            
  //           auxMonto.t4 = { valor1: datos?.T4_MODIFICADO ?? 0, valor2: datos?.T4_APROBADO ?? 0, resultado: datos?.T4_MODIFICADO ?? 0 };
  //           auxPorcentaje.pt4 = (parseFloat(datos?.T4_MODIFICADO)/parseFloat(valorProgramaPresupuestario)*100).toString();
  //           setModificadoAutorizado(auxMonto);
  //           setPModificadoAutorizado(auxPorcentaje);
            

  //       auxMonto = { ...devengadoModificado };
  //       auxPorcentaje = { ...PDevengadoModificado };
       
        
  //           auxMonto.t1 = { valor1: datos?.T1_DEVENGADO ?? 0, valor2: datos?.T1_MODIFICADO ?? 0, resultado: datos?.T1_DEVENGADO?? 0 };
  //           auxPorcentaje.pt1 = (parseFloat(datos?.T1_DEVENGADO)/parseFloat(valorProgramaPresupuestario)*100).toString();
  //           setDevengadoModificado(auxMonto);
  //           setPDevengadoModificado(auxPorcentaje);

  //           auxMonto.t2 = { valor1: datos?.T2_DEVENGADO ?? 0, valor2: datos?.T2_MODIFICADO ?? 0, resultado: datos?.T2_DEVENGADO?? 0 };
  //           auxPorcentaje.pt2 = (parseFloat(datos?.T2_DEVENGADO)/parseFloat(valorProgramaPresupuestario)*100).toString();
  //           setDevengadoModificado(auxMonto);
  //           setPDevengadoModificado(auxPorcentaje);

          
  //           auxMonto.t3 = { valor1: datos?.T3_DEVENGADO ?? 0, valor2: datos?.T3_MODIFICADO ?? 0, resultado: datos?.T3_DEVENGADO?? 0 };
  //           auxPorcentaje.pt3 = (parseFloat(datos?.T3_DEVENGADO)/parseFloat(valorProgramaPresupuestario)*100).toString();
  //           setDevengadoModificado(auxMonto);
  //           setPDevengadoModificado(auxPorcentaje);

           
  //           auxMonto.t4 = { valor1: datos?.T4_DEVENGADO ?? 0, valor2: datos?.T4_MODIFICADO ?? 0, resultado: datos?.T4_DEVENGADO?? 0 };
  //           auxPorcentaje.pt4 = (parseFloat(datos?.T4_DEVENGADO)/parseFloat(valorProgramaPresupuestario)*100).toString();
  //           setDevengadoModificado(auxMonto);
  //           setPDevengadoModificado(auxPorcentaje);

          
  //       auxMonto = { ...ejercidoModificado };
  //       auxPorcentaje = { ...PEjercidoModificado };
       
  //           auxMonto.t1 = { valor1: datos?.T1_EJERCIDO ?? 0, valor2: datos?.T1_MODIFICADO ?? 0, resultado: datos?.T1_EJERCIDO?? 0 };
  //           auxPorcentaje.pt1 = (parseFloat(datos?.T1_EJERCIDO)/parseFloat(valorProgramaPresupuestario)*100).toString();
  //           setEjercidoModificado(auxMonto);
  //           setPEjercidoModificado(auxPorcentaje);

           
  //           auxMonto.t2 = { valor1: datos?.T2_EJERCIDO ?? 0, valor2: datos?.T2_MODIFICADO ?? 0, resultado: datos?.T2_EJERCIDO?? 0 };
  //           auxPorcentaje.pt2 = (parseFloat(datos?.T2_EJERCIDO)/parseFloat(valorProgramaPresupuestario)*100).toString();
  //           setEjercidoModificado(auxMonto);
  //           setPEjercidoModificado(auxPorcentaje);

           
  //           auxMonto.t3 = { valor1: datos?.T3_EJERCIDO ?? 0, valor2: datos?.T3_MODIFICADO ?? 0, resultado: datos?.T3_EJERCIDO?? 0 };
  //           auxPorcentaje.pt3 = (parseFloat(datos?.T3_EJERCIDO)/parseFloat(valorProgramaPresupuestario)*100).toString();
  //           setEjercidoModificado(auxMonto);
  //           setPEjercidoModificado(auxPorcentaje);
           
  //           auxMonto.t4 = { valor1: datos?.T4_EJERCIDO ?? 0, valor2: datos?.T4_MODIFICADO ?? 0, resultado: datos?.T4_EJERCIDO?? 0 };
  //           auxPorcentaje.pt4 = (parseFloat(datos?.T4_EJERCIDO)/parseFloat(valorProgramaPresupuestario)*100).toString();
  //           setEjercidoModificado(auxMonto);
  //           setPEjercidoModificado(auxPorcentaje);
           
  //   }

  const assignValue = (
    valor: string,
    calculo: string,
    trimestre: string,
    valor1: string,
    valor2: string
  ) => {
    let porcentaje =
      (parseFloat(valor) / parseFloat(valorProgramaPresupuestario)) * 100;
    let auxMonto: IVTrimestral;
    let auxPorcentaje: IVPTrimestral;
    switch (calculo) {
      case "MODIFICADO/AUTORIZADO":
        auxMonto = { ...modificadoAutorizado };
        auxPorcentaje = { ...PModificadoAutorizado };
        switch (trimestre) {
          case "TRIMESTRE 1":
            auxMonto.t1 = { valor1: valor1, valor2: valor2, resultado: valor };
            auxPorcentaje.pt1 = porcentaje.toString();
            setModificadoAutorizado(auxMonto);
            setPModificadoAutorizado(auxPorcentaje);

            break;
          case "TRIMESTRE 2":
            auxMonto.t2 = { valor1: valor1, valor2: valor2, resultado: valor };
            auxPorcentaje.pt2 = porcentaje.toString();
            setModificadoAutorizado(auxMonto);
            setPModificadoAutorizado(auxPorcentaje);

            break;
          case "TRIMESTRE 3":
            auxMonto.t3 = { valor1: valor1, valor2: valor2, resultado: valor };
            auxPorcentaje.pt3 = porcentaje.toString();
            setModificadoAutorizado(auxMonto);
            setPModificadoAutorizado(auxPorcentaje);
            break;
          case "TRIMESTRE 4":
            auxMonto.t4 = { valor1: valor1, valor2: valor2, resultado: valor };
            auxPorcentaje.pt4 = porcentaje.toString();
            setModificadoAutorizado(auxMonto);
            setPModificadoAutorizado(auxPorcentaje);
            break;
        }

        break;
      case "DEVENGADO/MODIFICADO":
        auxMonto = { ...devengadoModificado };
        auxPorcentaje = { ...PDevengadoModificado };
        switch (trimestre) {
          case "TRIMESTRE 1":
            auxMonto.t1 = { valor1: valor1, valor2: valor2, resultado: valor };
            auxPorcentaje.pt1 = porcentaje.toString();
            setDevengadoModificado(auxMonto);
            setPDevengadoModificado(auxPorcentaje);

            break;
          case "TRIMESTRE 2":
            auxMonto.t2 = { valor1: valor1, valor2: valor2, resultado: valor };
            auxPorcentaje.pt2 = porcentaje.toString();
            setDevengadoModificado(auxMonto);
            setPDevengadoModificado(auxPorcentaje);

            break;
          case "TRIMESTRE 3":
            auxMonto.t3 = { valor1: valor1, valor2: valor2, resultado: valor };
            auxPorcentaje.pt3 = porcentaje.toString();
            setDevengadoModificado(auxMonto);
            setPDevengadoModificado(auxPorcentaje);

            break;
          case "TRIMESTRE 4":
            auxMonto.t4 = { valor1: valor1, valor2: valor2, resultado: valor };
            auxPorcentaje.pt4 = porcentaje.toString();
            setDevengadoModificado(auxMonto);
            setPDevengadoModificado(auxPorcentaje);

            break;
        }

        break;
      case "EJERCIDO/MODIFICADO":
        auxMonto = { ...ejercidoModificado };
        auxPorcentaje = { ...PEjercidoModificado };
        switch (trimestre) {
          case "TRIMESTRE 1":
            auxMonto.t1 = { valor1: valor1, valor2: valor2, resultado: valor };
            auxPorcentaje.pt1 = porcentaje.toString();
            setEjercidoModificado(auxMonto);
            setPEjercidoModificado(auxPorcentaje);

            break;
          case "TRIMESTRE 2":
            auxMonto.t2 = { valor1: valor1, valor2: valor2, resultado: valor };
            auxPorcentaje.pt2 = porcentaje.toString();
            setEjercidoModificado(auxMonto);
            setPEjercidoModificado(auxPorcentaje);

            break;
          case "TRIMESTRE 3":
            auxMonto.t3 = { valor1: valor1, valor2: valor2, resultado: valor };
            auxPorcentaje.pt3 = porcentaje.toString();
            setEjercidoModificado(auxMonto);
            setPEjercidoModificado(auxPorcentaje);
            break;
          case "TRIMESTRE 4":
            auxMonto.t4 = { valor1: valor1, valor2: valor2, resultado: valor };
            auxPorcentaje.pt4 = porcentaje.toString();
            setEjercidoModificado(auxMonto);
            setPEjercidoModificado(auxPorcentaje);
            break;
        }
        break;
    }
  };

  const getProcentajeActualizado = (monto: string) => {
    let porcentaje =
      (parseFloat(monto) / parseFloat(valorProgramaPresupuestario)) * 100;
    if (isNaN(porcentaje)) {
      return "";
    } else {
      return porcentaje.toString();
    }
  };

  useEffect(() => {
    getDetallePrograma();
  }, []);

  const block = (valor: string) => {
    return valor === "0" || valor === null || valor === "";
  };

  const getDetallePrograma = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_APPLICATION_BACK + "/api/detail-program",
        {
          params: {
            IdPP: jsonMir.encabezado.programa.Id,
          },
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      );
  
      if (response.status === 200) {
        setPrograma(response.data.data); 
      }
    } catch (error) {
      console.error("Error al obtener detalle:", error);
    }
  };

  const getVista = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_APPLICATION_BACK + "/api/consulta-vista",
        {
          params: {
            str_proy: programa?.IdEntidad,
          },
          headers: {
            Authorization: localStorage.getItem("jwtToken") || "",
          },
        }
      );
  
      setVista(response.data.data); 
    } catch (error) {
      console.error("Error:", error);
    }
  };

  function getTrimestre2() {
    switch (selector) {
      case "DEVENGADO/MODIFICADO":
        return devengadoModificado.t1.resultado;

      case "EJERCIDO/MODIFICADO":
        return ejercidoModificado.t1.resultado;

      case "MODIFICADO/AUTORIZADO":
        return modificadoAutorizado.t1.resultado;

      default:
        return null;
    }
  }
  function getTrimestre3() {}
  function getTrimestre4() {}

  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  return (
    <>
      <Grid
        container
        direction={"row"}
        sx={{
          width: "93vw",
          height: ["90vh", "82vh", "82vh", "82vh", "82vh"],
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          ...(!isSmallScreen ? { boxShadow: 10, borderRadius: 5 } : {}),
          overflow: "auto",
        }}
      >
        <Grid item xl={11} lg={11} md={11} sm={11} xs={11} gap={2}>
          <InputLabel sx={queries.medium_text}>NOMBRE DEL PROGRAMA</InputLabel>
          <TextField
            fullWidth
            sx={queries.medium_text}
            variant="standard"
            value={jsonMir.encabezado.programa.Label}
            InputLabelProps={{
              style: {
                fontFamily: "PoppinsMedium",
              },
            }}
            InputProps={{
              readOnly: true,
              style: {
                fontFamily: "PoppinsMedium",
              },
            }}
          />
        </Grid>

        <Grid
          justifyContent={"space-between"}
          container
          direction={"row"}
          item
          xl={11}
          lg={11}
          md={11}
          sm={11}
          xs={11}
          gap={2}
          sx={{}}
        >
          <Grid
            item
            xl={5}
            lg={5}
            md={10}
            sm={11}
            xs={11}
            sx={{ marginTop: 2 }}
          >
            <TextField
              fullWidth
              size="small"
              placeholder="0"
              onChange={(a) => {
                if (parseInt(a.target.value) > 0) {
                  if (
                    a.target.value === "0" ||
                    a.target.value === null ||
                    a.target.value === ""
                  ) {
                    alertaInfo(
                      "Se necesita un valor para capturar los campos de trimestre"
                    );
                  }

                  setValorProgramaPresupuestario(
                    validarNumero(a.target.value, valorProgramaPresupuestario)
                  );
                  let prevLocal = avanceFinancieroRF;
                  prevLocal.valorProgramaPresupuestario = a.target.value;
                  setAvanceFinancieroRF(prevLocal);
                } else {
                  setValorProgramaPresupuestario("");
                }
              }}
              value={
                parseInt(valorProgramaPresupuestario) <= 0
                  ? ""
                  : valorProgramaPresupuestario
              }
              label={"VALOR DEL PROGRAMA PRESUPUESTARIO"}
              sx={queries.medium_text}
              InputLabelProps={{
                style: {
                  fontFamily: "PoppinsMedium",
                },
              }}
              InputProps={{
                style: {
                  fontFamily: "PoppinsMedium",
                },
                startAdornment: <AttachMoneyIcon />,
              }}
            />
          </Grid>

          <Grid
            item
            xl={5}
            lg={5}
            md={10}
            sm={11}
            xs={11}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              // boxShadow: 2,
              // border: "1px solid #ccc",
              // height: "24vh",
            }}
          >
            <FormControl fullWidth>
              <InputLabel
                sx={{
                  fontFamily: "PoppinsBold",
                }}
              >
                CALCULO
              </InputLabel>
              <Select
                value={selector}
                onChange={(e) => setSelector(e.target.value)}
                label="CALCULO"
                sx={{
                  fontFamily: "PoppinsMedium",
                }}
              >
                <MenuItem value={"MODIFICADO/AUTORIZADO"}>
                  <Typography
                    sx={{
                      fontFamily: "PoppinsMedium",
                      fontSize: ["2vh", "2vh", "2vh", "2vh", "2vh"],
                    }}
                  >
                    MODIFICADO/AUTORIZADO
                  </Typography>
                </MenuItem>
                <MenuItem value={"DEVENGADO/MODIFICADO"}>
                  <Typography
                    sx={{
                      fontFamily: "PoppinsMedium",
                      fontSize: ["2vh", "2vh", "2vh", "2vh", "2vh"],
                    }}
                  >
                    DEVENGADO/MODIFICADO
                  </Typography>
                </MenuItem>
                <MenuItem value={"EJERCIDO/MODIFICADO"}>
                  <Typography
                    sx={{
                      fontFamily: "PoppinsMedium",
                      fontSize: ["2vh", "2vh", "2vh", "2vh", "2vh"],
                    }}
                  >
                    EJERCIDO/MODIFICADO
                  </Typography>
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container direction={"row"}>
          <Grid
            container
            item
            direction={"row"}
            sx={{
              justifyContent: "space-around",
              alignItems: "center",
            }}
            gap={2}
          >
            <Grid
              lg={1}
              gap={1}
              sx={{
                display: "flex",

                justifyContent: "space-around",
              }}
              item
              direction={"column"}
            >
              <Grid item>
                <Typography sx={queries.medium_text}>TIPO</Typography>
              </Grid>
              <Grid item>
                <Typography sx={queries.medium_text}>MONTO</Typography>
              </Grid>

              <Grid item>
                <Typography sx={queries.medium_text}>PORCENTAJE</Typography>
              </Grid>
            </Grid>

            <Grid
              item
              gap={1}
              lg={1.6}
              direction={"column"}
              sx={{
                display: "flex",

                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Grid item>
                <InputLabel sx={queries.medium_text}>TRIMESTRE 1</InputLabel>
              </Grid>

              <Grid item>
                <TextField
                  fullWidth
                  size="small"
                  disabled={


                    localStorage.getItem("Rol") === "Administrador" ? false :
                    (valorProgramaPresupuestario === "0" ||
                    valorProgramaPresupuestario === null ||
                    valorProgramaPresupuestario === "" ||
                    (edit &&
                      (raffiboolean?.avanceFinanciero?.monto
                        ?.devengadoModificado?.t1?.resultado ||
                        raffiboolean?.avanceFinanciero?.monto
                          ?.modificadoAutorizado?.t1?.resultado ||
                        raffiboolean?.avanceFinanciero?.monto
                          ?.ejercidoModificado?.t1?.resultado)))?false:
                    ((edit &&
                      (!raffiboolean?.avanceFinanciero?.monto
                        ?.devengadoModificado?.t1?.resultado ||
                        !raffiboolean?.avanceFinanciero?.monto
                          ?.modificadoAutorizado?.t1?.resultado ||
                        !raffiboolean?.avanceFinanciero?.monto
                          ?.ejercidoModificado?.t1?.resultado)) ||
                          new Date() > dateTrim[0])
                  }
                  placeholder="SIN CAPTURAR"
                  onClick={(a) => {
                    setTrimestre("TRIMESTRE 1");
                    handleClickOpen();
                  }}
                  value={
                    selector === "DEVENGADO/MODIFICADO"
                      ? devengadoModificado.t1.resultado
                      : selector === "EJERCIDO/MODIFICADO"
                      ? ejercidoModificado.t1.resultado
                      : selector === "MODIFICADO/AUTORIZADO"
                      ? modificadoAutorizado.t1.resultado
                      : null
                  }
                  sx={queries.medium_text}
                  InputLabelProps={{
                    style: {
                      fontFamily: "PoppinsMedium",
                    },
                  }}
                  InputProps={{
                    style: {
                      fontFamily: "PoppinsMedium",
                    },
                  }}
                />
              </Grid>
              
              <Grid item>
                <TextField
                  fullWidth
                  disabled={
                    localStorage.getItem("Rol") === "Administrador" ? false :
                    (valorProgramaPresupuestario === "0" ||
                    valorProgramaPresupuestario === null ||
                    valorProgramaPresupuestario === "" ||
                    (edit &&
                      (!raffiboolean?.avanceFinanciero?.monto
                        ?.devengadoModificado?.t1?.resultado ||
                        !raffiboolean?.avanceFinanciero?.monto
                          ?.modificadoAutorizado?.t1?.resultado ||
                        !raffiboolean?.avanceFinanciero?.monto
                          ?.ejercidoModificado?.t1?.resultado)) ||
                    new Date() > dateTrim[0])
                  }
                  size="small"
                  placeholder="SIN PORCENTAJE"
                  sx={queries.medium_text}
                  value={
                    selector === "DEVENGADO/MODIFICADO"
                      ? PDevengadoModificado.pt1
                      : selector === "EJERCIDO/MODIFICADO"
                      ? PEjercidoModificado.pt1
                      : selector === "MODIFICADO/AUTORIZADO"
                      ? PModificadoAutorizado.pt1
                      : null
                  }
                  InputLabelProps={{
                    style: {
                      fontFamily: "PoppinsMedium",
                    },
                  }}
                  InputProps={{
                    style: {
                      fontFamily: "PoppinsMedium",
                    },
                  }}
                />
              </Grid>
            </Grid>

            <Grid
              item
              gap={1}
              lg={1.6}
              direction={"column"}
              sx={{
                display: "flex",

                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Grid item>
                <InputLabel sx={queries.medium_text}>TRIMESTRE 2</InputLabel>
              </Grid>

              <Grid item>
                <TextField
                  fullWidth
                  disabled={
                    localStorage.getItem("Rol") === "Administrador" ? false :
                    (valorProgramaPresupuestario === "0" ||
                    valorProgramaPresupuestario === null ||
                    valorProgramaPresupuestario === "" ||
                    (edit &&
                      (raffiboolean?.avanceFinanciero?.monto
                        ?.devengadoModificado?.t2?.resultado ||
                        raffiboolean?.avanceFinanciero?.monto
                          ?.modificadoAutorizado?.t2?.resultado ||
                        raffiboolean?.avanceFinanciero?.monto
                          ?.ejercidoModificado?.t2?.resultado)))?false:
                    ((edit &&
                      (!raffiboolean?.avanceFinanciero?.monto
                        ?.devengadoModificado?.t2?.resultado ||
                        !raffiboolean?.avanceFinanciero?.monto
                          ?.modificadoAutorizado?.t2?.resultado ||
                        !raffiboolean?.avanceFinanciero?.monto
                          ?.ejercidoModificado?.t2?.resultado)) ||
                    !(new Date() < dateTrim[1] && new Date() > dateTrim[0]))
                  }
                  size="small"
                  placeholder="SIN CAPTURAR"
                  onClick={(a) => {
                    if (selector === "DEVENGADO/MODIFICADO") {
                      setTrimestre("TRIMESTRE 2");
                      handleClickOpen();
                    } else if (selector === "EJERCIDO/MODIFICADO") {
                      setTrimestre("TRIMESTRE 2");
                      handleClickOpen();
                    } else if (selector === "MODIFICADO/AUTORIZADO") {
                      setTrimestre("TRIMESTRE 2");
                      handleClickOpen();
                    }
                  }}
                  value={
                    selector === "DEVENGADO/MODIFICADO"
                      ? devengadoModificado.t2.resultado
                      : selector === "EJERCIDO/MODIFICADO"
                      ? ejercidoModificado.t2.resultado
                      : selector === "MODIFICADO/AUTORIZADO"
                      ? modificadoAutorizado.t2.resultado
                      : null
                  }
                  sx={queries.medium_text}
                  InputLabelProps={{
                    style: {
                      fontFamily: "PoppinsMedium",
                    },
                  }}
                  InputProps={{
                    style: {
                      fontFamily: "PoppinsMedium",
                    },
                  }}
                />
              </Grid>

              <Grid item>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="SIN PORCENTAJE"
                  disabled={
                    localStorage.getItem("Rol") === "Administrador" ? false :
                    (valorProgramaPresupuestario === "0" ||
                    valorProgramaPresupuestario === null ||
                    valorProgramaPresupuestario === "" ||
                    (edit &&
                      (!raffiboolean?.avanceFinanciero?.monto
                        ?.devengadoModificado?.t2?.resultado ||
                        !raffiboolean?.avanceFinanciero?.monto
                          ?.modificadoAutorizado?.t2?.resultado ||
                        !raffiboolean?.avanceFinanciero?.monto
                          ?.ejercidoModificado?.t2?.resultado)) ||
                    !
                    (
                       new Date() < dateTrim[1] 
                    && new Date() > dateTrim[0]))
                  }
                  sx={queries.medium_text}
                  value={
                    selector === "DEVENGADO/MODIFICADO"
                      ? PDevengadoModificado.pt2
                      : selector === "EJERCIDO/MODIFICADO"
                      ? PEjercidoModificado.pt2
                      : selector === "MODIFICADO/AUTORIZADO"
                      ? PModificadoAutorizado.pt2
                      : null
                  }
                  InputLabelProps={{
                    style: {
                      fontFamily: "PoppinsMedium",
                    },
                  }}
                  InputProps={{
                    //readOnly: true,
                    style: {
                      fontFamily: "PoppinsMedium",
                    },
                  }}
                />
              </Grid>
            </Grid>

            <Grid
              item
              gap={1}
              lg={1.6}
              direction={"column"}
              sx={{
                display: "flex",

                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Grid item>
                <InputLabel sx={queries.medium_text}>TRIMESTRE 3</InputLabel>
              </Grid>

              <Grid item>
                <TextField
                  disabled={
                    localStorage.getItem("Rol") === "Administrador" ? false :
                    (valorProgramaPresupuestario === "0" ||
                    valorProgramaPresupuestario === null ||
                    valorProgramaPresupuestario === "" ||
                    (edit &&
                      (raffiboolean?.avanceFinanciero?.monto
                        ?.devengadoModificado?.t3?.resultado ||
                        raffiboolean?.avanceFinanciero?.monto
                          ?.modificadoAutorizado?.t3?.resultado ||
                        raffiboolean?.avanceFinanciero?.monto
                          ?.ejercidoModificado?.t3?.resultado)))?false:
                    ((edit &&
                      (!raffiboolean?.avanceFinanciero?.monto
                        ?.devengadoModificado?.t3?.resultado ||
                        !raffiboolean?.avanceFinanciero?.monto
                          ?.modificadoAutorizado?.t3?.resultado ||
                        !raffiboolean?.avanceFinanciero?.monto
                          ?.ejercidoModificado?.t3?.resultado)) ||
                    !(new Date() < dateTrim[2] && new Date() > dateTrim[1]))
                  }
                  fullWidth
                  size="small"
                  placeholder="SIN CAPTURAR"
                  onClick={(a) => {
                    if (selector === "DEVENGADO/MODIFICADO") {
                      setTrimestre("TRIMESTRE 3");
                      handleClickOpen();
                    } else if (selector === "EJERCIDO/MODIFICADO") {
                      setTrimestre("TRIMESTRE 3");
                      handleClickOpen();
                    } else if (selector === "MODIFICADO/AUTORIZADO") {
                      setTrimestre("TRIMESTRE 3");
                      handleClickOpen();
                    }
                  }}
                  value={
                    selector === "DEVENGADO/MODIFICADO"
                      ? devengadoModificado.t3.resultado
                      : selector === "EJERCIDO/MODIFICADO"
                      ? ejercidoModificado.t3.resultado
                      : selector === "MODIFICADO/AUTORIZADO"
                      ? modificadoAutorizado.t3.resultado
                      : null
                  }
                  sx={queries.medium_text}
                  InputLabelProps={{
                    style: {
                      fontFamily: "PoppinsMedium",
                    },
                  }}
                  InputProps={{
                    style: {
                      fontFamily: "PoppinsMedium",
                    },
                  }}
                />
              </Grid>

              <Grid item>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="SIN PORCENTAJE"
                  disabled={
                    localStorage.getItem("Rol") === "Administrador" ? false :
                    (valorProgramaPresupuestario === "0" ||
                    valorProgramaPresupuestario === null ||
                    valorProgramaPresupuestario === "" ||
                    (edit &&
                      (!raffiboolean?.avanceFinanciero?.monto
                        ?.devengadoModificado?.t3?.resultado ||
                        !raffiboolean?.avanceFinanciero?.monto
                          ?.modificadoAutorizado?.t3?.resultado ||
                        !raffiboolean?.avanceFinanciero?.monto
                          ?.ejercidoModificado?.t3?.resultado)) ||
                    !(new Date() < dateTrim[2] && new Date() > dateTrim[1]))
                    
                  }
                  sx={queries.medium_text}
                  value={
                    selector === "DEVENGADO/MODIFICADO"
                      ? PDevengadoModificado.pt3
                      : selector === "EJERCIDO/MODIFICADO"
                      ? PEjercidoModificado.pt3
                      : selector === "MODIFICADO/AUTORIZADO"
                      ? PModificadoAutorizado.pt3
                      : null
                  }
                  InputLabelProps={{
                    style: {
                      fontFamily: "PoppinsMedium",
                    },
                  }}
                  InputProps={{
                    style: {
                      fontFamily: "PoppinsMedium",
                    },
                  }}
                />
              </Grid>
            </Grid>

            <Grid
              item
              gap={1}
              lg={1.6}
              direction={"column"}
              sx={{
                display: "flex",

                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Grid item>
                <InputLabel sx={queries.medium_text}>TRIMESTRE 4</InputLabel>
              </Grid>

              <Grid item>
                <TextField
                  fullWidth
                  disabled={
                    localStorage.getItem("Rol") === "Administrador" ? false :
                    (valorProgramaPresupuestario === "0" ||
                    valorProgramaPresupuestario === null ||
                    valorProgramaPresupuestario === "" ||
                    (edit &&
                      (raffiboolean?.avanceFinanciero?.monto
                        ?.devengadoModificado?.t4?.resultado ||
                        raffiboolean?.avanceFinanciero?.monto
                          ?.modificadoAutorizado?.t4?.resultado ||
                        raffiboolean?.avanceFinanciero?.monto
                          ?.ejercidoModificado?.t4?.resultado)))?false:
                    ((edit &&
                      (!raffiboolean?.avanceFinanciero?.monto
                        ?.devengadoModificado?.t4?.resultado ||
                        !raffiboolean?.avanceFinanciero?.monto
                          ?.modificadoAutorizado?.t4?.resultado ||
                        !raffiboolean?.avanceFinanciero?.monto
                          ?.ejercidoModificado?.t4?.resultado)) ||
                    !(new Date() < dateTrim[3] && new Date() > dateTrim[2]))
                  }
                  size="small"
                  placeholder="SIN CAPTURAR"
                  onClick={(a) => {
                    if (selector === "DEVENGADO/MODIFICADO") {
                      setTrimestre("TRIMESTRE 4");
                      handleClickOpen();
                    } else if (selector === "EJERCIDO/MODIFICADO") {
                      setTrimestre("TRIMESTRE 4");
                      handleClickOpen();
                    } else if (selector === "MODIFICADO/AUTORIZADO") {
                      setTrimestre("TRIMESTRE 4");
                      handleClickOpen();
                    }
                  }}
                  value={
                    selector === "DEVENGADO/MODIFICADO"
                      ? devengadoModificado.t4.resultado
                      : selector === "EJERCIDO/MODIFICADO"
                      ? ejercidoModificado.t4.resultado
                      : selector === "MODIFICADO/AUTORIZADO"
                      ? modificadoAutorizado.t4.resultado
                      : null
                  }
                  sx={queries.medium_text}
                  InputLabelProps={{
                    style: {
                      fontFamily: "PoppinsMedium",
                    },
                  }}
                  InputProps={{
                    style: {
                      fontFamily: "PoppinsMedium",
                    },
                  }}
                />
              </Grid>

              <Grid item>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="SIN PORCENTAJE"
                  disabled={
                    localStorage.getItem("Rol") === "Administrador" ? false :
                    (valorProgramaPresupuestario === "0" ||
                    valorProgramaPresupuestario === null ||
                    valorProgramaPresupuestario === "" ||
                    (edit &&
                      (!raffiboolean?.avanceFinanciero?.monto
                        ?.devengadoModificado?.t4?.resultado ||
                        !raffiboolean?.avanceFinanciero?.monto
                          ?.modificadoAutorizado?.t4?.resultado ||
                        !raffiboolean?.avanceFinanciero?.monto
                          ?.ejercidoModificado?.t4?.resultado)) ||
                    !(new Date() < dateTrim[3] && new Date() > dateTrim[2]))
                  }
                  sx={queries.medium_text}
                  value={
                    selector === "DEVENGADO/MODIFICADO"
                      ? PDevengadoModificado.pt4
                      : selector === "EJERCIDO/MODIFICADO"
                      ? PEjercidoModificado.pt4
                      : selector === "MODIFICADO/AUTORIZADO"
                      ? PModificadoAutorizado.pt4
                      : null
                  }
                  InputLabelProps={{
                    style: {
                      fontFamily: "PoppinsMedium",
                    },
                  }}
                  InputProps={{
                    //readOnly: true,
                    style: {
                      fontFamily: "PoppinsMedium",
                    },
                  }}
                />
              </Grid>
            </Grid>

            <Grid
              item
              gap={1}
              lg={1.6}
              direction={"column"}
              sx={{
                display: "flex",

                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Grid item>
                <InputLabel sx={queries.medium_text}>CUENTA PUBLICA</InputLabel>
              </Grid>

              <Grid item>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="SIN CAPTURAR"
                  onChange={(a) => {
                    let valor: Number;
                    valor =
                      selector === "DEVENGADO/MODIFICADO"
                        ? Number(devengadoModificado.cuentaPublica)
                        : selector === "EJERCIDO/MODIFICADO"
                        ? Number(ejercidoModificado.cuentaPublica)
                        : selector === "MODIFICADO/AUTORIZADO"
                        ? Number(modificadoAutorizado.cuentaPublica)
                        : 0;
                    valor = validarNumero(a.target.value, valor);

                    let porcentaje: number = 0;
                    if (selector === "DEVENGADO/MODIFICADO") {
                      setDevengadoModificado({
                        ...devengadoModificado,
                        cuentaPublica: valor.toString(),
                      });
                      porcentaje =
                        (Number(a.target.value) /
                          Number(valorProgramaPresupuestario)) *
                        100;

                      setPDevengadoModificado({
                        ...PDevengadoModificado,
                        porcentajeCuentaPublica: porcentaje.toString(),
                      });
                    } else if (selector === "EJERCIDO/MODIFICADO") {
                      setEjercidoModificado({
                        ...ejercidoModificado,
                        cuentaPublica: valor.toString(),
                      });
                      porcentaje =
                        (Number(a.target.value) /
                          Number(valorProgramaPresupuestario)) *
                        100;
                      setPEjercidoModificado({
                        ...PEjercidoModificado,
                        porcentajeCuentaPublica: porcentaje.toString(),
                      });
                    } else if (selector === "MODIFICADO/AUTORIZADO") {
                      setModificadoAutorizado({
                        ...modificadoAutorizado,
                        cuentaPublica: valor.toString(),
                      });
                      porcentaje =
                        (Number(a.target.value) /
                          Number(valorProgramaPresupuestario)) *
                        100;

                      setPModificadoAutorizado({
                        ...PModificadoAutorizado,
                        porcentajeCuentaPublica: porcentaje.toString(),
                      });
                    }
                  }}
                  value={
                    selector === "DEVENGADO/MODIFICADO"
                      ? devengadoModificado.cuentaPublica
                      : selector === "EJERCIDO/MODIFICADO"
                      ? ejercidoModificado.cuentaPublica
                      : selector === "MODIFICADO/AUTORIZADO"
                      ? modificadoAutorizado.cuentaPublica
                      : null
                  }
                  sx={queries.medium_text}
                  InputLabelProps={{
                    style: {
                      fontFamily: "PoppinsMedium",
                    },
                  }}
                  InputProps={{
                    //readOnly: true,
                    style: {
                      fontFamily: "PoppinsMedium",
                    },
                  }}
                />
              </Grid>

              <Grid item>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="SIN PORCENTAJE"
                  sx={queries.medium_text}
                  value={
                    selector === "DEVENGADO/MODIFICADO"
                      ? PDevengadoModificado.porcentajeCuentaPublica
                      : selector === "EJERCIDO/MODIFICADO"
                      ? PEjercidoModificado.porcentajeCuentaPublica
                      : selector === "MODIFICADO/AUTORIZADO"
                      ? PModificadoAutorizado.porcentajeCuentaPublica
                      : null
                  }
                  InputLabelProps={{
                    style: {
                      fontFamily: "PoppinsMedium",
                    },
                  }}
                  InputProps={{
                    //readOnly: true,
                    style: {
                      fontFamily: "PoppinsMedium",
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {openFormulaDialog ? (
          <DialogMonto
            open={openFormulaDialog}
            close={handleClose}
            trimestre={trimestre}
            selector={selector}
            setValor={assignValue}
          />
        ) : null}
      </Grid>
    </>
  );
}