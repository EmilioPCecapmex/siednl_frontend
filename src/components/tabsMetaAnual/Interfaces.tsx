export interface IComponenteMA {
  componentes: string;
  metaAnual: string;
  lineaBase: string;
  metasPorFrecuencia: Array<IFrecuencias>;
  valoresPorFrecuencia: Array<valor>;
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
  valoresPorFrecuencia: Array<valor>;
  valorNumerador: string;
  valorDenominador: string;
  sentidoDelIndicador: string;
  unidadResponsable: string;
  descIndicador: string;
  descNumerador: string;
  descDenominador: string;
}

export interface valor {
  valorA: string;
  valorB: string;
  valorC: string;
  valorD: string;
  valorE: string;
  valorF: string;
  valorG: string;
  valorH: string;
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

