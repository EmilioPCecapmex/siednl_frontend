import { IIdentificacion } from "../../components/tabsActividadesInstitucionales/IAlineacionPlaneacion";
import { IAccion } from "../../components/tabsActividadesInstitucionales/IAccion1";
export interface IActividadesInstitucionales {
    IdActividadInstitucional: string;
    IdMir: string;
    IdFichaTecnica: string;
    AnioFiscal: string; //viene de la mir
    Entidad: string;
    Programa: string;
    Eje: string;
    Tematica: string;
    ActividadInstitucional: string;
    MIR: string;
    FichaTecnica: string;
    AI: string;
    Estado: string;
    FechaCreacion: string;
    ModificadoPor: string;
    CreadoPor: string;
    Conac: string;
    Consecutivo: String;
    Opciones: string;
  }

  export interface IAI {
    identificacion: IIdentificacion;
    //acciones: IAccion[];
    acciones: Array<IAccion>;
    //avancefisicofinanciero: string;
  }