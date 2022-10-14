export interface ICValor {
    [x: string]: any;
    componentes: {
        actividades: {
            resumen: string;
            indicador: string;
            formula: string;
            frecuencia: string;
            medios: string;
            supuestos: string;
        }[];
    }[];
}[]