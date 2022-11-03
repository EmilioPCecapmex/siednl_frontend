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
  metasPorFrecuencia: Array<IFrecuencias>;
  valorNumerador: string;
  valorDenominador: string;
  orden: string;
  unidadResponsable: string;
  descIndicador: string;
  descNumerador: string;
  descDenominador: string;
  }

export interface IFrecuencias {
  semestre1: string
  semestre2: string
  trimestre1: string
  trimestre2: string
  trimestre3: string
  trimestre4: string
}