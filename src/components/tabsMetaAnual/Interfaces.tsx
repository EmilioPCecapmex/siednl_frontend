export interface IComponenteMA {
  componentes: string;
  metaAnual: string;
  lineaBase: string;
  metasPorFrecuencia: Array<IFrecuencias>;
  valorNumerador: string;
  valorDenominador: string;
  sentidoDelIndicador: string;
  unidadResponsable: string;
  descIndicador: string;
  descNumerador: string;
  descDenominador: string;
  actividades: IActividadesMA[]
}

export interface IFrecuencias {
  semestre1: string;
  semestre2: string;
  trimestre1: string;
  trimestre2: string;
  trimestre3: string;
  trimestre4: string;
}

export interface IFrecuenciasAct {
  trimestre1: string;
  trimestre2: string;
  trimestre3: string;
  trimestre4: string;
}

export interface IActividadesMA {
  actividad: string;
  metaAnual: string;
  lineaBase: string;
  metasPorFrecuencia: Array<IFrecuenciasAct>;
  valorNumerador: string;
  valorDenominador: string;
  sentidoDelIndicador: string;
  unidadResponsable: string;
  descIndicador: string;
  descNumerador: string;
  descDenominador: string;
}

export interface ICValorMA {
  [x: string]: any;
  componentes: {
    actividades: {
      actividad: string;
      metaAnual: string;
      lineaBase: string;
      metasPorFrecuencia: Array<IFrecuenciasAct>;
      valorNumerador: string;
      valorDenominador: string;
      sentidoDelIndicador: string;
      unidadResponsable: string;
      descIndicador: string;
      descNumerador: string;
      descDenominador: string;
    }[];
  }[];
}

