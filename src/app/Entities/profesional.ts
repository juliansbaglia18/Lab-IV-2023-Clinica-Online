import { Horario } from "./horario";
import { Especialidad } from "./especialidad";
import { User } from "./user";
import { TimeHandler } from "./time-handler";
import { horariosEstandar } from "src/assets/constants/horariosEstandar";
import { Turno } from "./turno";
import { WeekDay } from "../classes/weekDay";

export class Profesional extends User{

    public especialidades : Especialidad[];
    public habilitado : boolean;
    public horarios : Horario[];
    
    constructor(email : string, nombre: string,apellido: string,edad: number, dni : string, imagenes : string[], especialidades : Especialidad[], habilitado : boolean = false, uid? : string, horarios? : Horario[]){
        super(email,nombre,apellido,edad,dni, imagenes,false, uid);
        this.especialidades = especialidades;
        this.typename = "Profesional";
        this.habilitado = habilitado;
        if (horarios !== undefined && horarios.length > 0){
            this.horarios = horarios;
        } else {
            this.horarios = JSON.parse(JSON.stringify(horariosEstandar));
            this.horarios.forEach(h => {
                h.especialidad = especialidades[0].descripcion;
            })
        }      
    }

    public get especialidadesAsString() : string {
        return this.especialidades
        .map(e => e.descripcion)
        .join(",");
    }

    public get especialidadesAsArray() : string[]{
        return this.especialidades.map(e => e.descripcion);
    }

    public get horariosAsString() : string[] {
        return this.horarios
        .filter(h => h.atiende)
        .map(h => `${h.dia.toUpperCase()}: ${h.inicia} - ${h.finaliza} (${h.especialidad})`);
    }

    toggleHabilitacion(){
        this.habilitado = !this.habilitado
    }

    setHorario(horario : Horario){
        if (this.tieneEspecialidad(horario.especialidad)){
            let i = this.horarios.findIndex(h=>h.dia == horario.dia);
            if(i == -1){
                this.horarios.push(horario)
            } else {
                this.horarios[i] = horario;
            }
        }
    }

    tieneEspecialidad(especialidadDesc : string) : boolean{ 
        return (this.especialidades.findIndex(e => e.descripcion == especialidadDesc) >= 0)
    }

    constructTurnos(fechaInicio : Date, diasFuturos : number) : Turno[]{
        let turnos : Turno[] = [];
        let auxFecha = new Date(fechaInicio);
        for (let i = 0; i <= diasFuturos; i++) {            
            let dayDescription = TimeHandler.getDayDescription(auxFecha);
            this
            .getHorarioPorDia(dayDescription)
            .forEach(horario => {
                turnos.push(...this.generarTurnosDelDia(horario,auxFecha));
            });
            auxFecha = TimeHandler.addDays(auxFecha,1);
        }
        return turnos;
    }

    getHorarioPorDia(dia : string){
        return this.horarios.filter(h => TimeHandler.daysAreEqual(h.dia.toLowerCase(),dia) && h.atiende);
    }

    generarTurnosDelDia(horario : Horario, fecha : Date){
        let turnos : Turno[] = [];
        let duracion = horario.duracion;
        let tiempoInicio = TimeHandler.toNumber(horario.inicia);
        let tiempoFin = TimeHandler.toNumber(horario.finaliza);
        while (tiempoInicio <= TimeHandler.substractTime(tiempoFin,duracion)){
            turnos.push({
                especialidad : horario.especialidad,
                dia : horario.dia,
                inicia : TimeHandler.toString(tiempoInicio),
                finaliza : TimeHandler.toString(TimeHandler.addTime(tiempoInicio, duracion)),
                fecha : TimeHandler.formatDate(fecha),
                idProfesional : this.uid!,
                estado : ""
            });
            tiempoInicio = TimeHandler.addTime(tiempoInicio, duracion);                
        }
        return turnos;
    }

    constructDias(especialidad : string, diasFuturos : number) : WeekDay[] {
        let dias : WeekDay[] = [];
        let auxFecha = new Date();
        for (let i = 0; i <= diasFuturos; i++) {            
            let dayDescription = TimeHandler.getDayDescription(auxFecha);
            this
            .getHorarioPorDia(dayDescription)
            .filter(h => h.especialidad.toLowerCase() == especialidad.toLowerCase())
            .forEach(() => {
                dias.push({ dia : dayDescription, fecha : TimeHandler.formatDate(auxFecha)});
            });
            auxFecha = TimeHandler.addDays(auxFecha,1);
        }
        return dias;
    }
}
