export interface IObjetoCatalogo {
    Id: string;
    descripcion: string;
  }
  
  export interface IObjetoProgramasPresupuestarios {
    Id: string;
    descripcion: string;
    conac: string;
    consecutivo: string;
    institucion: string;
  }
  
  export interface IObjetoBeneficiario {
    Id: string;
    Idb: number;
    descripcion: string;
    tipoBeneficiario: string;
    tipo: string;
  }
  
  export interface IObjetoFechaDeCaptura {
    Id: string;
    descripcion: string;
    FechaCapturaFinal: string;
    FechaCapturaInicio: string;
  }
  
  export interface IObjetoPed {
    Id: string;
    //Descripcion: string;
    Eje: string;
    Tematica: string;
    Objetivo: string;
    Estrategia: string;
    LineaDeAccion: string;
    MetaODS: string;
    EjePND: string;
    ObjetivoPEENL: string;
  }
  
  export interface IObjetoProgramasInstitucionales {
    Id: string;
    IdEntidad: string;
    IdPrograma: string;
    //Descripcion: string;
    Nombre: string;
    NombrePrograma: string;
  }

  export interface Head {
    id: keyof ITablaCatalogos;
    isNumeric: boolean;
    label: string;
  }

  export interface IDatosTabla {
    Id: string;
    Desc: string;
    fnc: string;
    Tabla: string;
    selected: string;
  }
  
  export interface ITablaCatalogos {
    Descripcion: string;
    Acciones: string;
  }