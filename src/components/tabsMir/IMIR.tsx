import { IComponente } from "./IComponente";
import { IActividadesMir, ICValor } from "./ICValor";
import { IEncabezado } from "./TabEncabezado";
import { IFin, IProposito } from "./TabFinProposito";
import { IEncabezadoEdit, IFinEdit, IPropositoEdit } from "./TabResumen2";

export interface IMIR {

    encabezado:IEncabezado;

      fin:IFin;

      proposito:IProposito;

      componentes:Array<IComponente>;

      actividades:Array<IActividadesMir>;
}


export interface IMIREdit {

  encabezado:IEncabezadoEdit;

    fin:IFinEdit;

    proposito:IPropositoEdit;
}