export interface accionTurno {
    accion : string;
    permisos : {
        [index : string] : boolean;
        paciente : boolean;
        profesional : boolean;
        admin : boolean;
    };
    nuevoEstado? : string;
    route? : string;
}