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

export interface IComponenteRF {
  componentes: string;
  metasPorFrecuencia: Array<IFrecuencias>;
  numeradorPorFrecuencia: Array<IFrecuencias>;
  denominadorPorFrecuencia: Array<IFrecuencias>;
  actividades: Array<IActividadesRF>
}
//
//[];

export interface IActividadesRF {
  actividad: string;
  metasPorFrecuencia: Array<IFrecuenciasAct>;
}

// export interface IFinRF {
//   tipoDeIndicador: string;
//   claridad: string;
//   relevancia: string;
//   economia: string;
//   monitoreable: string;
//   adecuado: string;
//   aporte_marginal: string;
//   dimension: string;
//   unidadDeMedida: string;
// }

// export interface IPropositoRF {
//   tipoDeIndicador: string;
//   claridad: string;
//   relevancia: string;
//   economia: string;
//   monitoreable: string;
//   adecuado: string;
//   aporte_marginal: string;
//   dimension: string;
//   unidadDeMedida: string;
// }
export interface IEncabezadoRF {
  programaSER: string;
  objetivoSER: string;
  objetivoODS: string;
  metaODS: string;
}
export interface IRF {
  avanceFinanciero: "";
  fin: IFinRF;
  proposito: IPropositoRF;
  componentes: Array<IComponenteRF>;
  //actividades: Array<ICValorRF>;
}

export interface IFinRF {
  añoAvanceFisico: string;
  valorAvanceFisico: string;
}

export interface IPropositoRF {
  añoAvanceFisico: string;
  valorAvanceFisico: string;
}

export interface ICValorRF {
  [x: string]: any;
  componentes: {
    actividades: {
      actividad: string;
      metasPorFrecuencia: Array<IFrecuenciasAct>;
      numeradorPorFrecuencia: Array<IFrecuenciasAct>;
      denominadorPorFrecuencia: Array<IFrecuenciasAct>;
    }[];
  }[];
}
//[];

// export interface ICValorRF {
//   [x: string]: any;
//   componentes: {
//     actividades: {
//       actividad: string;
//       metaAnual: string;
//       lineaBase: string;
//       metasPorFrecuencia: Array<IFrecuenciasAct>;
//       valorNumerador: string;
//       valorDenominador: string;
//       sentidoDelIndicador: string;
//       unidadResponsable: string;
//       descIndicador: string;
//       descNumerador: string;
//       descDenominador: string;
//     }[];
//   }[];
// }
