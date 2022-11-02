export interface IComponente {
  componentes: string;
    resumen: string;
    indicador: string;
    formula: string;
    frecuencia: string;
    medios: string;
    supuestos: string;
  }

export interface IComponenteMA {
  componentes: string;
  metaAnual: string,
  lineaBase: string;
  valorNumerador: string;
  valorDenominador: string;
  orden: string;
  unidadResponsable: string;
  descIndicador: string;
  descNumerador: string;
  descDenominador: string;
  }