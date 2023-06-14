import { IComponenteActividad } from "./AddMir";
import { IComponente } from "./IComponente";
import { IActividadesMir } from "./ICValor";
import { IEncabezado } from "./TabEncabezado";
import { IFin, IProposito } from "./TabFinProposito";
import {
  IActividadesMirEdit,
  IComponenteMirEdit,
  IEncabezadoEdit,
  IFinEdit,
  IPropositoEdit,
} from "./TabResumen";

export interface IMIR {
  encabezado: IEncabezado;

  fin: IFin;

  proposito: IProposito;

  componentes: Array<IComponente>;

  actividades: Array<IActividadesMir>;

  componenteActividad: Array<IComponenteActividad>
}

export interface IMIREdit {
  encabezado: IEncabezadoEdit;

  fin: IFinEdit;

  proposito: IPropositoEdit;

  componentes: Array<IComponenteMirEdit>;

  actividades: Array<IActividadesMirEdit>;
}
