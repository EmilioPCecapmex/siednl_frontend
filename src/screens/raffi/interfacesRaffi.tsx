//import { IComponenteRF } from "../../components/tabsRaffi/Interfaces";
import { IFrecuencias, IFrecuenciasAct } from "../../components/tabsMetaAnual/Interfaces";

export interface IAvanceFinancieroRF {
    nombrePrograma: string;
    valorProgramaPresupuestario: string;
    
    monto:{
        devengadoModificado:IVTrimestral
        modificadoAutorizado:IVTrimestral
        ejercidoModificado:IVTrimestral
    }
    porcentaje:{
        porcentajeDevengadoModificado:IVPTrimestral
        procentajeModificadoAutorizado:IVPTrimestral
        porcentajeEjercidoModificado:IVPTrimestral
    }

}

export interface IVTrimestral{
    t1: {
        valor1: string;
        valor2: string;
        resultado: string;
    }
    t2: {
        valor1: string;
        valor2: string;
        resultado: string;
    }
    t3: {
        valor1: string;
        valor2: string;
        resultado: string;
    }
    t4: {
        valor1: string;
        valor2: string;
        resultado: string;
    }
    total: string;
    cuentaPublica: string;
}

export interface IVPTrimestral{
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

export interface IRF{
    avanceFinanciero: IAvanceFinancieroRF,
    fin: IFinRF,
    proposito: IPropositoRF,
    componentes: IComponenteRF[], 

}

export interface IComponenteRF {
    componentes: string;
    metasPorFrecuencia: IFrecuencias[];
    numeradorPorFrecuencia: IFrecuencias[];
    denominadorPorFrecuencia: IFrecuencias[];
    actividades: IActividadesRF[];
  }

  export interface IActividadesRF {
    actividad: string;
    metasPorFrecuencia: Array<IFrecuenciasAct>;
  }