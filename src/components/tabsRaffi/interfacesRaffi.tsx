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

//////////////////////////////// boolean

export interface IAvanceFinancieroRFEdit {
  nombrePrograma: boolean;
  valorProgramaPresupuestario: boolean;

  monto: {
    devengadoModificado: IVTrimestralEdit;
    modificadoAutorizado: IVTrimestralEdit;
    ejercidoModificado: IVTrimestralEdit;
  };
  porcentaje: {
    porcentajeDevengadoModificado: IVPTrimestralEdit;
    procentajeModificadoAutorizado: IVPTrimestralEdit;
    porcentajeEjercidoModificado: IVPTrimestralEdit;
  };
}

export interface IVTrimestralEdit {
  t1: {
    valor1: boolean;
    valor2: boolean;
    resultado: boolean;
  };
  t2: {
    valor1: boolean;
    valor2: boolean;
    resultado: boolean;
  };
  t3: {
    valor1: boolean;
    valor2: boolean;
    resultado: boolean;
  };
  t4: {
    valor1: boolean;
    valor2: boolean;
    resultado: boolean;
  };
  total: boolean;
  cuentaPublica: boolean;
}

export interface IVPTrimestralEdit {
  pt1: boolean;
  pt2: boolean;
  pt3: boolean;
  pt4: boolean;
  ptotal: boolean;
  porcentajeCuentaPublica: boolean;
}

export interface IperiodoEdit {
  periodo1: boolean;
  periodo2: boolean;
  periodo3: boolean;
  periodo4: boolean;
}

export interface IFinRFEdit {
  añoAvanceFisico: boolean;
  valorAvanceFisico: boolean;
}

export interface IPropositoRFEdit {
  añoAvanceFisico: boolean;
  valorAvanceFisico: boolean;
}

export interface IComponenteRFEdit {
  componentes: string;
  metasPorFrecuencia: Array<IFrecuenciasEdit>;
  numeradorPorFrecuencia: Array<IFrecuenciasEdit>;
  denominadorPorFrecuencia: Array<IFrecuenciasEdit>;
  actividades: Array<IActividadesRFEdit>;
}

export interface IActividadesRFEdit {
  actividad: string;
  metasPorFrecuencia: Array<IFrecuenciasActEdit>;
}

export interface IFrecuenciasEdit {
  semestre1: boolean;
  semestre2: boolean;
  trimestre1: boolean;
  trimestre2: boolean;
  trimestre3: boolean;
  trimestre4: boolean;
}

export interface IFrecuenciasActEdit {
  trimestre1: boolean;
  trimestre2: boolean;
  trimestre3: boolean;
  trimestre4: boolean;
}

export interface IRFEdit {
  avanceFinanciero: IAvanceFinancieroRFEdit;
  fin: IFinRFEdit;
  proposito: IPropositoRFEdit;
  componentes: IComponenteRFEdit[];
}
