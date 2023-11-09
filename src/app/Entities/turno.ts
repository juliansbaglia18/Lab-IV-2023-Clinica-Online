import { EncuestaPaciente } from "./encuesta-paciente";
import { HistoriaClinica } from "./historia-clinica";
import { Paciente } from "./paciente";
import { Profesional } from "./profesional";

export interface Turno { 
    [index : string] : any;
    id? : string;
    especialidad : string;
    dia : string;
    inicia : string;
    finaliza : string;
    fecha : string;
    idProfesional : string;
    idPaciente? : string;
    profesional? : Profesional;
    paciente? : Paciente;
    estado : string;
    encuestaPaciente? : EncuestaPaciente;
    razonCancelacion? : string;
    razonRechazo? : string;
    historiaClinica? : HistoriaClinica;
    resenia? : string;
}