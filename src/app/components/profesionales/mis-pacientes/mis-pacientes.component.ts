import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/Entities/paciente';
import { Profesional } from 'src/app/Entities/profesional';
import { UserFactory } from 'src/app/Entities/user-factory';
import { TurnosService } from 'src/app/services/turnos.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-mis-pacientes',
  templateUrl: './mis-pacientes.component.html',
  styleUrls: ['./mis-pacientes.component.scss']
})
export class MisPacientesComponent implements OnInit {

  pacientes? : Paciente[];
  pacienteSeleccionado? : Paciente;
  profesional? : Profesional;
  idsPacientesAtendidos? : string[];
  loading = false;

  constructor(private _usuariosService : UsersService, private _turnosService : TurnosService) { }

  ngOnInit(): void {
    this.profesional = this._usuariosService.getCurrentUser();
    this._turnosService.getTurnosUsuario(this.profesional?.uid!,this.profesional?.typename!)?.subscribe((turnos)=>{
      this.idsPacientesAtendidos = turnos
      .filter((t : any)=> t.estado == 'FINALIZADO')
      .map((t:any)=> t.idPaciente);
      this.traerPacientes();
    })
  }

  traerPacientes(){
    this.loading = true;
    this._usuariosService.getUsuarios()
      .subscribe(data => {
        //save current for reasignment after fetching
      let indexOfCurrent = this.pacientes?.indexOf(this.pacienteSeleccionado!);
      this.pacientes = data
      .filter((obj : any) => {
        return (obj.typename.toLowerCase() == 'paciente' && 
          this.idsPacientesAtendidos!.indexOf(obj.uid!) >= 0)
      })
      .map((obj : any) => {
        return this.parseUser(obj);    
      });
      //reasign last selected to update data if changed.
      if (indexOfCurrent != undefined){
        this.pacienteSeleccionado = this.pacientes![indexOfCurrent];
      }
      this.loading = false;
    })
  }


  parseUser(obj : any){
    return UserFactory.constructUser(obj);
  }

  setPacienteSeleccionado(paciente : Paciente){
    this.pacienteSeleccionado = paciente;
  }

}
