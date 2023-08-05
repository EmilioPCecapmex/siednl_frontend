export interface IAvanceFinancieroRF {
    NombrePrograma: string;
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
    t1: string;
    t2: string;
    t3: string;
    t4: string;
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

export interface IFinRF {
    AñoAvanceFisico: string;
    ValorAvanceFisico: string;
}

export interface IPropositoRF {
    AñoAvanceFisico: string;
    ValorAvanceFisico: string;
}