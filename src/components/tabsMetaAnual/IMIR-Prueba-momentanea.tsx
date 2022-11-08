import { IComponente } from "./IComponente-Prueba-momentanea";
import { IActividadesMir, ICValor } from "./ICValor-Prueba-momentanea";
import { IEncabezado } from "./TabEncabezado";
import { IFinMA, IPropositoMA } from "./IFin";
import {
  IActividadesMirEdit,
  IComponenteMirEdit,
  IEncabezadoEdit,
  IFinEdit,
  IPropositoEdit,
} from "./TabResumenMir";

export interface IMIR {
  encabezado: IEncabezado;

  fin: IFinMA;

  proposito: IPropositoMA;

  componentes: Array<IComponente>;

  actividades: Array<IActividadesMir>;
}

export interface IMIREdit {
  encabezado: IEncabezadoEdit;

  fin: IFinEdit;

  proposito: IPropositoEdit;

  componentes: Array<IComponenteMirEdit>;

  actividades: Array<IActividadesMirEdit>;
}
