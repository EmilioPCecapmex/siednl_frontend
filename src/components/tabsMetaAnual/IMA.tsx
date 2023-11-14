import { IFinMA, IPropositoMA } from "./IFin";
import { IComponenteMA } from "./Interfaces";

export interface IMA {
  fin: IFinMA;

  proposito: IPropositoMA;

  componentes: Array<IComponenteMA>;
}
