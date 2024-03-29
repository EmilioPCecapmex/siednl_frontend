export default interface IRegistroUsuario {
    Id:                string;
    EstaActivo:        0,
    Nombre:           string;
    ApellidoPaterno:   string;
    ApellidoMaterno:   string;
    NombreUsuario:     string;
    CorreoElectronico: string;
    CreadoPor:        string;
    ModificadoPor: string;
}

export  interface ITipoSolicitud{
    IdTipoSolicitud:string;
    TipoSolicitud:string;
}

export  interface IDatosAdicionales{
    institution: string;
    rol : string;
    userType : string;
}

