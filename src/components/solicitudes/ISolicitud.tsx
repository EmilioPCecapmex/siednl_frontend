export interface ISolicitud{
        Respuesta: string,
        Mensaje:string,
        Id: string,
        IdUsuario: string,
        DatosAdicionales: string,
        Estatus: string,
        TipoSolicitud: string,
        tipoSoli: string,
        CreadoPor: string,
        FechaDeCreacion: string,
        UltimaModificacion: string,
        ModificadoPor: string,
        IdApp: string,
        AppNombre: string,
    }


export interface IDetalleSolicitud {
        Respuesta:         string;
        Mensaje:           string;
        Id:                string;
        Nombre:            string;
        ApellidoPaterno:   string;
        ApellidoMaterno:   string;
        NombreUsuario:     string;
        CorreoElectronico: string;
        Curp:              string;
        Rfc:               string;
        Telefono:          string;
        Ext:               string;
        Celular:           string;
        IdTipoUsuario:     string;
        EstaActivo:        number;
        Deleted:           number;
        FechaDeCreacion:   string;
        CreadoPor:         string;
        Estatus:           number;
        DatosAdicionales:  string;
        NombreApp:      string;
        NombreSolicitante: string;
}


