import { Paciente } from "./paciente";
import { Profesional } from "./profesional";
import { User } from "./user";
import { accionTurno } from "./accion-turno";

export class UserFactory {

    public static constructUser(obj : any) : any{
        if (obj == null){
            return undefined;
        }
        switch (obj.typename) {
            case 'Paciente':
                return new Paciente(
                    obj.email,obj.nombre,obj.apellido,obj.edad,obj.dni,obj.imagenes,obj.obraSocial,obj.uid
                )
            case 'Profesional':
                return new Profesional(
                    obj.email,obj.nombre,obj.apellido,obj.edad,obj.dni,obj.imagenes,obj.especialidades,obj.habilitado,obj.uid, obj.horarios
                )
            default:
                return new User(
                    obj.email,obj.nombre,obj.apellido,obj.edad,obj.dni,obj.imagenes,obj.isAdmin,obj.uid,obj.typename
                )
        }
    }

    public static generateAcciones(estadoTurno : string) : accionTurno[] {
        switch (estadoTurno.toUpperCase()) {
            case 'PENDIENTE':
                return [
                    {
                    accion : 'CANCELAR',
                    permisos : {
                        paciente : true,
                        profesional : false,
                        admin : true
                        },
                    nuevoEstado : 'CANCELADO'
                    },
                    {
                    accion : 'ACEPTAR',
                    permisos : {
                        paciente : false,
                        profesional : true,
                        admin : false
                        },
                    nuevoEstado : 'ACEPTADO'
                    },
                    {
                    accion : 'RECHAZAR',
                    permisos : {
                        paciente : false,
                        profesional : true,
                        admin : false
                        },
                    nuevoEstado : 'RECHAZADO'
                    },
                ]
            case 'ACEPTADO':
                return [
                    {
                    accion : 'CANCELAR',
                    permisos : {
                        paciente : true,
                        profesional : true,
                        admin : false
                        },
                        nuevoEstado : 'CANCELADO'
                    },
                    {
                    accion : 'FINALIZAR',
                    permisos : {
                        paciente : false,
                        profesional : true,
                        admin : false
                        },
                        nuevoEstado : 'FINALIZADO'
                    }
                ]
            case 'FINALIZADO':
                return [
                    {
                    accion : 'COMPLETAR ENCUESTA',
                    permisos : {
                        paciente : true,
                        profesional : false,
                        admin : false
                        },
                    nuevoEstado : 'FINALIZADO'
                    },
                    {
                        accion: 'VER HISTORIA CLINICA',
                        permisos : {
                            paciente : false,
                            profesional : true,
                            admin : true
                        }
                    },
                    {
                        accion: 'VER RESENIA',
                        permisos : {
                            paciente : true,
                            profesional : true,
                            admin : true
                        }
                    },
                    
                ]
            default :
                return [];
        }
    }
}

