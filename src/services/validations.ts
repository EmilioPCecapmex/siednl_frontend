import Swal from "sweetalert2";
import { alertaError } from "../components/genericComponents/Alertas";
import axios from "axios";
import { IIFT } from "../screens/fichatecnica/FichaTecnica";

export const validarNumero = (dato: string, state: any) => {
 
    if (/^[0-9.]+$/.test(dato) ) {
      
        return dato;

    } else if (dato.length === 0) {
      return "";
    }

    alertaError("Este campo solo acepta numeros.")
    return state;

  };

  export const validarNumeroMayorCero = (dato: string, state: any) => {
    const numero = parseInt(dato, 10);
  
    if (isNaN(numero) || numero <= 0) {
      alertaError("Este campo solo acepta números mayores a 0.");
      return state;
    }
  
    return dato
  };

  
  export function validaCadena(cadena: string | null | undefined): boolean {
    return cadena !== null && cadena !== undefined && (typeof cadena === 'string') && cadena.trim() !== "";
  }


  export const moneyMask = (value: string) => {
    value = value.replace(/\D/g, "");
    const options = { minimumFractionDigits: 2 };
    const result = new Intl.NumberFormat("en-US", options).format(
      parseInt(value) / 100
    );
    return "$ " + result;
  };

  export const getValueOperacion=(txt:string, tipoFormula: string)=>{
    if(tipoFormula==="Índice"){
      return(txt)
    }
    return(txt.split(",")[2])
  }

  export const quitarEspaciosFinales =(str: string) => {
    // Eliminar las comillas dobles, las comillas simples y las nuevas líneas
    str = str.replaceAll('"', "").replaceAll("'", "").replaceAll("\n", "");
  
    // Eliminar los espacios en blanco al final de la cadena
    return str.replace(/\s+$/g, "");
  }

  export const estados = [
    "TODOS",
    "EN CAPTURA",
    "EN REVISIÓN",
    "EN AUTORIZACIÓN",
    "AUTORIZADA",
    "BORRADOR AUTORIZADOR",
    "BORRADOR VERIFICADOR"
    //"Borrador Capturador"
  ];
  
  export interface Head {
    id: keyof IIFT;
    isNumeric: boolean;
    label: string;
  }
  
  export const heads: readonly Head[] = [
    {
      id: "AnioFiscal",
      isNumeric: true,
      label: "EJERCICIO FISCAL",
    },
    {
      id: "Entidad",
      isNumeric: true,
      label: "ENTIDAD",
    },
    {
      id: "Programa",
      isNumeric: true,
      label: "NOMBRE DEL PROGRAMA",
    },
    {
      id: "Estado",
      isNumeric: true,
      label: "ESTADO",
    },
    {
      id: "FechaCreacion",
      isNumeric: true,
      label: "FECHA DE CREACIÓN",
    },
    {
      id: "CreadoPor",
      isNumeric: true,
      label: "CREADO POR",
    },
    {
      id: "Opciones",
      isNumeric: true,
      label: "OPCIONES",
    },
  ];

 

  