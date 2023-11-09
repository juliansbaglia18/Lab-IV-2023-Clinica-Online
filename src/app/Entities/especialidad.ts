
export class Especialidad{

    public id : string | undefined;
    public descripcion : string;
    public imagen : string;

    constructor(  descripcion : string, id?:string, imagen? : string){
        this.descripcion = descripcion;
        this.id = id;
        this.imagen = imagen ?? "";
    }
}