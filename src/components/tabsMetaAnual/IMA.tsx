import { IFinMA, IPropositoMA } from "./IFin";
import { IActividadesMA, IComponenteMA } from "./Interfaces";

export interface IMA {
  fin: IFinMA;

  proposito: IPropositoMA;

  componentes: Array<IComponenteMA>;

  actividades: Array<IActividadesMA>;
}
