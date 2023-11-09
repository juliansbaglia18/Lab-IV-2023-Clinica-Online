import { accionTurno } from "src/app/Entities/accion-turno";

export const accionesHome : accionTurno[] = [
    {
      accion : 'NUEVO TURNO',
      permisos : {
        paciente : true,
        profesional : false,
        admin : true
      },
      route: 'private/nuevo-turno'
    },
    {
      accion : 'TURNOS',
      permisos : {
        paciente : true,
        profesional : true,
        admin : true
      },
      route: 'private/mis-turnos'
    },
    {
      accion : 'MIS PACIENTES',
      permisos : {
        paciente : false,
        profesional : true,
        admin : false
      },
      route: 'private/mis-pacientes'
    },
    {
      accion : 'INFORMES',
      permisos : {
        paciente : false,
        profesional : false,
        admin : true
      },
      route: 'private/informes'
    },
    {
      accion : 'ESPECIALIDADES',
      permisos : {
        paciente : false,
        profesional : false,
        admin : true
      },
      route: 'especialidades'
    },
  ];