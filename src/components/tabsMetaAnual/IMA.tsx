import { IFinMA, IPropositoMA } from "./IFin";
import { IComponenteMA } from "./Interfaces";
import { IComponenteEditMA, IFinEditMA, IPropositoEditMA } from "./TabResumenMA";

export interface IMA {
  fin: IFinMA;

  proposito: IPropositoMA;

  componentes: Array<IComponenteMA>;
}

export interface IMAEdit {
  fin: IFinEditMA;

  proposito: IPropositoEditMA;

  componentes: Array<IComponenteEditMA>;
}