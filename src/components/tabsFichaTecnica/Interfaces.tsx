export interface ICValorFT {
  [x: string]: any;
  componentes: {
    actividades: {
      actividad: string;
      tipoDeIndicador: string;
      claridad: string;
      relevancia: string;
      economia: string;
      monitoreable: string;
      adecuado: string;
      aporte_marginal: string;
      dimension: string;
      unidadDeMedida: string;
    }[];
  }[];
}
[];

export interface IEncabezadoFT {
  programaSER: string;
  objetivoSER: string;
  objetivoODS: string;
  metaODS: string;
  unidadDeMedida: string;
}

export interface IFinFT {
  tipoDeIndicador: string;
  claridad: string;
  relevancia: string;
  economia: string;
  monitoreable: string;
  adecuado: string;
  aporte_marginal: string;
  dimension: string;
  unidadDeMedida: string;
}

export interface IPropositoFT {
  tipoDeIndicador: string;
  claridad: string;
  relevancia: string;
  economia: string;
  monitoreable: string;
  adecuado: string;
  aporte_marginal: string;
  dimension: string;
  unidadDeMedida: string;
}
export interface IComponentesFT {
  componentes: string;
  tipoDeIndicador: string;
   dimension: string;
  unidadDeMedida: string;
  claridad: string;
  relevancia: string;
  economia: string;
  monitoreable: string;
  adecuado: string;
  aporte_marginal: string;
 
}

export interface IActividadesFT {
  actividades: string;
  tipoDeIndicador: string;
  claridad: string;
  relevancia: string;
  economia: string;
  monitoreable: string;
  adecuado: string;
  aporte_marginal: string;
  dimension: string;
  unidadDeMedida: string;
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

export interface IFT {
  encabezado: IEncabezadoFT;
  fin: IFinFT;
  proposito: IPropositoFT;
  componentes: Array<IComponentesFT>;
  actividades: Array<IActividadesFT>;
}
