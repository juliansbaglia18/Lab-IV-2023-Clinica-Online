import { Especialidad } from "./especialidad";

export interface Horario{
    especialidad : string;
    dia : string;
    inicia : string;
    finaliza : string;
    duracion : number;
    atiende? : boolean;
}