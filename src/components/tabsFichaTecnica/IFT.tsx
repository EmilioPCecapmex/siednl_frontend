import { IActividadesFT, IComponenteFT, IEncabezadoFT, IFinFT, IPropositoFT } from "./Interfaces";

export interface IFT {
    encabezado: IEncabezadoFT;

    fin: IFinFT;
  
    proposito: IPropositoFT;
  
    componentes: Array<IComponenteFT>;
  
    actividades: Array<IActividadesFT>;
  }