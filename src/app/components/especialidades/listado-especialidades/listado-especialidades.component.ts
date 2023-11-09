import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Especialidad } from 'src/app/Entities/especialidad';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { FilesService } from 'src/app/services/files.service';

@Component({
  selector: 'app-listado-especialidades',
  templateUrl: './listado-especialidades.component.html',
  styleUrls: ['./listado-especialidades.component.scss']
})
export class ListadoEspecialidadesComponent implements OnInit {

  especialidades : Especialidad[] = [];
  loading = true;
  updating = false;
  imagen? : any;

  constructor(private _especialidadesService : EspecialidadesService, private _fileService : FilesService, private dialog : MatDialog, private router : Router) { }

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

  // onEspecialidadSeleccionada(especialidad : string){
  //   let dialogRef = this.dialog.open(SubirImgDialogComponent, { data : {especialidad : especialidad}});
  //   dialogRef.afterClosed().subscribe((imagen)=> {
  //     if (imagen !== undefined){
  //       this._fileService.uploadFile(especialidad,imagen,{ name : especialidad}).then(aux => {
  //         aux.ref.getDownloadURL().then((url)=>{
  //           let e = this.especialidades.find(e => e.descripcion == especialidad)!;
  //           e.imagen = url;
  //           console.log(e);
  //           this._especialidadesService.updateEspecialidad(e);
  //         })
  //       })
  //     }
  //   })
  // }

  routeToNuevaEsp(){
    this.router.navigateByUrl('nueva-especialidad')
  }
}
