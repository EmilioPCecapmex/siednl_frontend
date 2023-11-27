export interface IAvanceFinancieroRF {
  nombrePrograma: string;
  valorProgramaPresupuestario: string;

  monto: {
    devengadoModificado: IVTrimestral;
    modificadoAutorizado: IVTrimestral;
    ejercidoModificado: IVTrimestral;
  };
  porcentaje: {
    porcentajeDevengadoModificado: IVPTrimestral;
    procentajeModificadoAutorizado: IVPTrimestral;
    porcentajeEjercidoModificado: IVPTrimestral;
  };
}

export interface IVTrimestral {
  t1: {
    valor1: string;
    valor2: string;
    resultado: string;
  };
  t2: {
    valor1: string;
    valor2: string;
    resultado: string;
  };
  t3: {
    valor1: string;
    valor2: string;
    resultado: string;
  };
  t4: {
    valor1: string;
    valor2: string;
    resultado: string;
  };
  total: string;
  cuentaPublica: string;
}

export interface IVPTrimestral {
  pt1: string;
  pt2: string;
  pt3: string;
  pt4: string;
  ptotal: string;
  porcentajeCuentaPublica: string;
}

export interface Iperiodo {
  periodo1: string;
  periodo2: string;
  periodo3: string;
  periodo4: string;
}

export interface IFinRF {
  añoAvanceFisico: string;
  valorAvanceFisico: string;
}

export interface IPropositoRF {
  añoAvanceFisico: string;
  valorAvanceFisico: string;
}

export interface IComponenteRF {
  componentes: string;
  metasPorFrecuencia: Array<IFrecuencias>;
  numeradorPorFrecuencia: Array<IFrecuencias>;
  denominadorPorFrecuencia: Array<IFrecuencias>;
  actividades: Array<IActividadesRF>;
}

export interface IRF {
  avanceFinanciero: IAvanceFinancieroRF;
  fin: IFinRF;
  proposito: IPropositoRF;
  componentes: IComponenteRF[];
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

export interface IActividadesRF {
    actividad: string;
    metasPorFrecuencia: Array<IFrecuenciasAct>;
  }