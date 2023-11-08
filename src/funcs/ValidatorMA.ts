import { IFinMA, IPropositoMA } from "../components/tabsMetaAnual/IFin";
import { IMA } from "../components/tabsMetaAnual/IMA";
import {
  IActividadesMA,
  IComponenteMA,
  IFrecuencias,
  IFrecuenciasAct,
} from "../components/tabsMetaAnual/Interfaces";

export function isValidIMA(obj: any): obj is IMA {
  if (
    obj &&
    obj.fin &&
    isValidFinMA(obj.fin) &&
    obj.proposito &&
    isValidPropositoMA(obj.proposito) &&
    obj.componentes &&
    Array.isArray(obj.componentes) &&
    obj.componentes.every(isValidComponenteMA)
  ) {
    return true;
  }
  return false;
}

export function isValidFinMA(obj: any): obj is IFinMA {
  if (
    obj &&
    typeof obj.metaAnual === "string" &&
    typeof obj.lineaBase === "string" &&
    typeof obj.valorNumerador === "string" &&
    typeof obj.valorDenominador === "string" &&
    typeof obj.sentidoDelIndicador === "string" &&
    typeof obj.unidadResponsable === "string" &&
    typeof obj.descIndicador === "string" &&
    typeof obj.descNumerador === "string" &&
    typeof obj.descDenominador === "string"
  ) {
    return true;
  }
  return false;
}

export function isValidPropositoMA(obj: any): obj is IPropositoMA {
  if (
    obj &&
    typeof obj.metaAnual === "string" &&
    typeof obj.lineaBase === "string" &&
    typeof obj.valorNumerador === "string" &&
    typeof obj.valorDenominador === "string" &&
    typeof obj.sentidoDelIndicador === "string" &&
    typeof obj.unidadResponsable === "string" &&
    typeof obj.descIndicador === "string" &&
    typeof obj.descNumerador === "string" &&
    typeof obj.descDenominador === "string"
  ) {
    return true;
  }
  return false;
}

export function isValidComponenteMA(obj: any): obj is IComponenteMA {
  if (
    obj &&
    typeof obj.componentes === "string" &&
    typeof obj.metaAnual === "string" &&
    typeof obj.lineaBase === "string" &&
    Array.isArray(obj.metasPorFrecuencia) &&
    obj.metasPorFrecuencia.every(isValidFrecuencias) &&
    typeof obj.valorNumerador === "string" &&
    typeof obj.valorDenominador === "string" &&
    typeof obj.sentidoDelIndicador === "string" &&
    typeof obj.unidadResponsable === "string" &&
    typeof obj.descIndicador === "string" &&
    typeof obj.descNumerador === "string" &&
    typeof obj.descDenominador === "string" &&
    Array.isArray(obj.actividades) &&
    obj.actividades.every(isValidActividadesMA)
  ) {
    return true;
  }
  return false;
}

export function isValidActividadesMA(obj: any): obj is IActividadesMA {
  if (
    obj &&
    typeof obj.actividad === "string" &&
    typeof obj.metaAnual === "string" &&
    typeof obj.lineaBase === "string" &&
    Array.isArray(obj.metasPorFrecuenciaAct) &&
    obj.metasPorFrecuenciaAct.every(isValidFrecuenciasAct) &&
    typeof obj.valorNumerador === "string" &&
    typeof obj.valorDenominador === "string" &&
    typeof obj.sentidoDelIndicador === "string" &&
    typeof obj.unidadResponsable === "string" &&
    typeof obj.descIndicador === "string" &&
    typeof obj.descNumerador === "string" &&
    typeof obj.descDenominador === "string"
  ) {
    return true;
  }
  return false;
}

export function isValidFrecuencias(obj: any): obj is IFrecuencias {
  if (
    obj &&
    typeof obj.semestre1 === "string" &&
    typeof obj.semestre2 === "string" &&
    typeof obj.trimestre1 === "string" &&
    typeof obj.trimestre2 === "string" &&
    typeof obj.trimestre3 === "string" &&
    typeof obj.trimestre4 === "string"
  ) {
    return true;
  }
  return false;
}

export function isValidFrecuenciasAct(obj: any): obj is IFrecuenciasAct {
  if (
    obj &&
    typeof obj.trimestre1 === "string" &&
    typeof obj.trimestre2 === "string" &&
    typeof obj.trimestre3 === "string" &&
    typeof obj.trimestre4 === "string"
  ) {
    return true;
  }
  return false;
}
