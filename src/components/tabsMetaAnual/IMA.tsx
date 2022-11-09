import { IActividadesMirEdit, IComponenteMirEdit, IFinEdit, IPropositoEdit } from "../tabsMir/TabResumen2";
import { IFinMA, IPropositoMA } from "./IFin";
import { IActividadesMA, IComponenteMA } from "./Interfaces";

export interface IMA {
  fin: IFinMA;

  proposito: IPropositoMA;

  componentes: Array<IComponenteMA>;

  actividades: Array<IActividadesMA>;
}

export interface IMIREdit {

  fin: IFinEdit;

  proposito: IPropositoEdit;

  componentes: Array<IComponenteMirEdit>;

  actividades: Array<IActividadesMirEdit>;
}
