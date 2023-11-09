import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Especialidad } from 'src/app/Entities/especialidad';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { CapitalizePipe } from 'src/app/pipes/capitalize.pipe';

@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.scss']
})
export class EspecialidadesComponent implements OnInit {

  especialidades : Especialidad[] = [];
  espSeleccionadas : Especialidad[] = [];
  nuevaEspecialidad : string = "";
  nuevaEspecialidadYaExiste : boolean = false;
  loading = true;
  updating = false;

  @Input() permitirNuevasEspecialidades? : boolean = true;
  @Output() especialidadAgregada = new EventEmitter<Especialidad[]>();
  @Output() especialidadesCargadas = new EventEmitter<void>();

  constructor(private _especialidadesService : EspecialidadesService, private capitalizePipe : CapitalizePipe) { }

  ngOnInit(): void {
    this.traerEspecialidades();
  }

  traerEspecialidades() : void {
    this._especialidadesService.getEspecialidades()
      .subscribe(data => {
      this.loading = true;
      this.especialidades = data.map((obj : any) => {
        return new Especialidad(obj.descripcion, obj.id);
      });
      this.refrescarSeleccionadas();
      this.loading = false;
      this.especialidadesCargadas.emit();
    })
  }

  tryAgregarEspecialidad() : void{
    if(!this.especialidadExiste()){
      this.agregarEspecialidad();
    } else {
      this.nuevaEspecialidadYaExiste = true;
      setTimeout(() => {
      this.nuevaEspecialidadYaExiste = false;
      }, 5000);
    }
  }

  especialidadExiste() : boolean {
    return this.especialidades.find((e => e.descripcion.toLowerCase() == this.nuevaEspecialidad.toLowerCase())) == undefined ? false : true;
  }

  agregarEspecialidad(){
    this.updating = true;
    this._especialidadesService.addEspecialidad(new Especialidad(this.capitalizePipe.transform(this.nuevaEspecialidad))).then((data)=>{
      this.espSeleccionadas.push(this.especialidades.find(x => x.id == data.id)!);
      this.nuevaEspecialidad = "";
      this.updating = false;
    });
  }

  refrescarSeleccionadas(){
    let aux : Especialidad[] = [] = this.espSeleccionadas.splice(0,this.espSeleccionadas.length);
    aux.forEach(e => {
      this.espSeleccionadas.push(this.especialidades.find(x => x.id == e.id)!);
    });
    this.especialidadAgregada.emit(this.espSeleccionadas);
  }

  onEspecialidadSeleccionada(){
    this.especialidadAgregada.emit(this.espSeleccionadas);
  }
}
