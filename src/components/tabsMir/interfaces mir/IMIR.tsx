import { IFin, IProposito } from "../TabFinProposito";
import {
  IActividadesMirEdit,
  IComponenteMirEdit,
  IEncabezadoEdit,
  IFinEdit,
  IPropositoEdit,
} from "../TabResumen";

export interface IMIR {
  encabezado: IEncabezado;

  fin: IFin;

  proposito: IProposito;

  componentes: IComponente[];
}

export interface IComponente {
  componente: string;
  resumen: string;
  indicador: string;
  formula: string;
  frecuencia: string;
  medios: string;
  supuestos: string;
  actividades:IActividad[]
}

export interface IActividad {
    actividad:string;
    resumen: string;
    indicador: string;
    formula: string;
    frecuencia: string;
    medios: string;
    supuestos: string;
}


export interface IMIREdit {
  encabezado: IEncabezadoEdit;

  fin: IFinEdit;

  proposito: IPropositoEdit;

  componentes: Array<IComponenteMirEdit>;

  // actividades: Array<IActividadesMirEdit>;
}

export interface ICValor {
  [x: string]: any;
  componentes: {
    actividades: {
      actividad: string;
      resumen: string;
      indicador: string;
      formula: string;
      frecuencia: string;
      medios: string;
      supuestos: string;
    }[];
  }[];
}

export interface ILista{
  Id:string;
  Label:string;
}

export interface IListaProgramas{
  Id:string;
  Label:string;
  Conac:string;
  Consecutivo:string;
}

export interface IComponenteActividad {
  actividades: number[];
  componente: string;
}

export interface IEncabezado {
  ejercicioFiscal: ILista;
  entidad: ILista;
  programa: IListaProgramas;
  eje: ILista;
  tema: ILista;
  objetivo: ILista;
  estrategia: ILista;
  lineas_de_accion: Array<ILista>;
  beneficiario: ILista;
  conac: string;
  consecutivo: string;
  anticorrupcion: string;
}