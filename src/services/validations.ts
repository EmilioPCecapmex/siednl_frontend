import { alertaError } from "../components/genericComponents/Alertas";

export const validarNumero = (dato: string, state: any) => {
    if (/^[0-9]+$/.test(dato)) {
      return dato;
    } else if (dato.length === 0) {
      return "";
    }
    alertaError("Este campo solo acepta numeros.")
    return state;
  };

  
  export function validaCadena(cadena: string | null | undefined): boolean {
    return cadena !== null && cadena !== undefined && typeof cadena === 'string' && cadena.trim() !== "";
  }


  export const moneyMask = (value: string) => {
    value = value.replace(/\D/g, "");
    const options = { minimumFractionDigits: 2 };
    const result = new Intl.NumberFormat("en-US", options).format(
      parseInt(value) / 100
    );
    return "$ " + result;
  };
  