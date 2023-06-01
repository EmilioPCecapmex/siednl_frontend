export interface ICValor {
  [x: string]: any;
  componentes: {
    actividades: {
      actividad: string;
      resumen: string;
      indicador: string;
      formula: string;
      frecuencia: string;
      medios: string;
      supuestos: string;
    }[];
  }[];
}


export interface IActividadesMir {
  actividad: string;
  formula: string;
  frecuencia: string;
  indicador: string;
  medios: string;
  resumen: string;
  supuestos: string;
}
