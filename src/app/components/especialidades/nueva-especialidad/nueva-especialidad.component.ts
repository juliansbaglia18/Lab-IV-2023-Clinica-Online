import { Component, OnInit } from '@angular/core';
import { Especialidad } from 'src/app/Entities/especialidad';
import { CapitalizePipe } from 'src/app/pipes/capitalize.pipe';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { FilesService } from 'src/app/services/files.service';

@Component({
  selector: 'app-nueva-especialidad',
  templateUrl: './nueva-especialidad.component.html',
  styleUrls: ['./nueva-especialidad.component.scss']
})
export class NuevaEspecialidadComponent implements OnInit {
  
  especialidades : Especialidad[] = [];
  nuevaEspecialidad : string = "";
  yaExiste = false;
  loading = true;
  updating = false;
  imagen? : any;

  constructor(private _especialidadesService : EspecialidadesService, private capitalizePipe : CapitalizePipe, private _fileService : FilesService) { }

  ngOnInit(): void {
    this.traerEspecialidades();
  }

  traerEspecialidades() : void {
    this._especialidadesService.getEspecialidades()
      .subscribe(data => {
      this.loading = true;
      this.especialidades = data.map((obj : any) => {
        return new Especialidad(obj.descripcion, obj.id, obj.imagen ?? "");
      });
      this.loading = false;
    })
  }

  tryAgregarEspecialidad() : void{
    if(!this.especialidadExiste()){
      this.agregarEspecialidad();
    } else {
      this.yaExiste = true;
      setTimeout(() => {
      this.yaExiste = false;
      }, 5000);
    }
  }

  especialidadExiste() : boolean {
    return this.especialidades.find((e => e.descripcion.toLowerCase() == this.nuevaEspecialidad.toLowerCase())) == undefined ? false : true;
  }

  async agregarEspecialidad(){
    this.updating = true;
    let nueva = new Especialidad(this.capitalizePipe.transform(this.nuevaEspecialidad));

    if (this.imagen !== undefined) {
      let img = await this._fileService.uploadFile(this.nuevaEspecialidad,this.imagen!,{ name : this.nuevaEspecialidad});
      let url = await img.ref.getDownloadURL();
      nueva.imagen = url;
    } else {
      nueva.imagen = 'https://firebasestorage.googleapis.com/v0/b/clinica-online-ed9da.appspot.com/o/especialidad_default.png?alt=media&token=9eea795c-8e6e-4284-b4a3-818cf8b84d93';
    }
    
    this._especialidadesService.addEspecialidad(nueva).then(()=>{
      this.nuevaEspecialidad = "";
      this.updating = false;
    });
  }

  getImage(imagen : any){
    this.imagen = imagen;
  }
}
