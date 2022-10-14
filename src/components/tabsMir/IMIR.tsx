import { IComponente } from "./IComponente";
import { ICValor } from "./ICValor";
import { IEncabezado } from "./TabEncabezado";
import { IFin, IProposito } from "./TabFinProposito";

export interface IMIR {

    Encabezado:IEncabezado;

      Fin:IFin;

      Proposito:IProposito;

      Componentes:IComponente;

      Actividades:ICValor;
}