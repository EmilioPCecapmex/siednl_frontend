export interface ILista {
  Id: string;
  Label: string;
}

export interface IListaProgramas {
  Id: string;
  Label: string;
  Conac: string;
  Consecutivo: string;
}


export interface IAI {
  encabezado: IEncabezado;
  acciones: IAcciones[];
}

export interface IEncabezado {
  ejercicioFiscal: ILista;
  entidad: ILista;
  programa: IListaProgramas;
  eje: ILista;
  tema: ILista;
  objetivo: ILista;
  estrategia: ILista;
  lineas_de_accion: Array<ILista>;
  beneficiario: Array<ILista>;
  conac: string;
  consecutivo: string;
  anticorrupcion: string;
}

export interface IAcciones {
  acciones: string;
  descripcion: string;
  indicador: string;
  formulaCalculo: string;
  mv: string;
  frecuencia: string;
  unidadMedida: string;
  sentidoDelIndicador: string;
  descIndicador: string;
  metasPorFrecuencia: Array<IFrecuencias>;
  programas: IProgramas[];
  
}

export interface IFrecuencias {
  lineaBase: string;
  trimestre1: string;
  trimestre2: string;
  trimestre3: string;
  trimestre4: string;
  anual: string;
}


export interface IProgramas {
  programas: string;
  descripcion: string;
  indicador: string;
  formulaCalculo: string;
  mv: string;
  frecuencia: string;
  unidadMedida: string;
  sentidoDelIndicador: string;
  descIndicador: string;
  metasPorFrecuencia: Array<IFrecuencias>;
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

// export interface ICValorMA {
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

