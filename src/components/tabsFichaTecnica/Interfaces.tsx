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

export interface IEncabezadoFT {
  programaSER: string;
  objetivoSER: string;
  objetivoODS: string;
  metaODS: string;
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
  actividades: IActividadesFT[];
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
  actividades: IActividadesEditFT[];
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

export interface IEncabezadoEditFT {
  programaSER: boolean;
  objetivoSER: boolean;
  objetivoODS: boolean;
  metaODS: boolean;
}

export interface IFT {
  encabezado: IEncabezadoFT;
  fin: IFinFT;
  proposito: IPropositoFT;
  componentes: Array<IComponentesFT>;
}

export interface IFTEdit {
  encabezado: IEncabezadoEditFT;
  fin: IFinEditFT;
  proposito: IPropositoEditFT;
  componentes: Array<IComponenteEditFT>;
}
