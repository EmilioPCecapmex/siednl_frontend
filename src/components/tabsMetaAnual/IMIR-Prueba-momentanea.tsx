import { IComponente } from "./IComponente-Prueba-momentanea";
import { IActividadesMir, ICValor } from "./ICValor-Prueba-momentanea";
import { IFinMA, IPropositoMA } from "./IFin";
import { IEncabezado } from "./TabEncabezadoMIR";
import { IActividadesMirEdit, IComponenteMirEdit, IEncabezadoEdit, IFinEdit, IPropositoEdit } from "./TabResumenMA";

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
