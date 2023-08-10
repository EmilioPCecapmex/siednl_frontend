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
    proposito: IPropositoRF

}