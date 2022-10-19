import { IComponente } from "./IComponente";
import { ICValor } from "./ICValor";
import { IEncabezado } from "./TabEncabezado";
import { IFin, IProposito } from "./TabFinProposito";

export interface IMIR {

    encabezado:IEncabezado;

      fin:IFin;

      proposito:IProposito;

      componentes:Array<IComponente>;

      actividades:ICValor;
}