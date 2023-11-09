import { User } from "./user";

export class Paciente extends User{

    public obraSocial : string;
    
    constructor(email : string, nombre: string,apellido: string,edad: number, dni : string,imagenes : string[], obraSocial : string, uid? : string){
        super(email,nombre,apellido,edad, dni, imagenes,false, uid);
        this.obraSocial = obraSocial;
        this.typename = "Paciente";
    }

    static filterPublic(user : any){
        return Object.values(
        Object.fromEntries(
            Object.entries(user)
            .filter(([key]) => ['nombre','apellido','obraSocial','dni'].includes(key))
        ));
    }
}
