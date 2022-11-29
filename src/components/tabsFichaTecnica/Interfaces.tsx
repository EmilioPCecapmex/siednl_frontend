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
  catalogoObjetivoODS: string;
  catalogoMetaODS: string;
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

export interface IComponenteFT {
  componentes: string;
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

export interface IActividadesFT {
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
}
