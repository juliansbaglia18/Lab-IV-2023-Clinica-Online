import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Paciente } from 'src/app/Entities/paciente';
import { Profesional } from 'src/app/Entities/profesional';
import { User } from 'src/app/Entities/user';
import { UserFactory } from 'src/app/Entities/user-factory';
import { AuthService } from 'src/app/services/auth.service';
import { FilesService } from 'src/app/services/files.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit, AfterViewChecked {

  usuarios? : any[];
  usuarioSeleccionado? : User;
  filterValue = '';

  constructor(private _usuariosService : UsersService, public auth : AuthService, private cdRef : ChangeDetectorRef, private _router : Router, public dialog : MatDialog, private filesService : FilesService) { }
  

  ngOnInit(): void {
    this.traerUsuarios();
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  traerUsuarios() : void {
    this._usuariosService.getUsuarios()
      .subscribe(data => {
        //save current movie for reasignment
      let indexOfCurrent = this.usuarios?.indexOf(this.usuarioSeleccionado!);
      this.usuarios = data.map((obj : any) => {
        return this.parseUser(obj);    
      });
      //reasign current selected movie to update data if changed.
      if (indexOfCurrent != undefined){
        this.usuarioSeleccionado = this.usuarios![indexOfCurrent];
      }
    })
  }

  parseUser(obj : any){
    return UserFactory.constructUser(obj);
  }

  setUsuarioSeleccionado(usuario : User){
    this.usuarioSeleccionado = usuario
  }

  applyFilter(event : Event){
    this.filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  onUsuarioSeleccionado(usuarioSeleccionado : User){
    this.usuarioSeleccionado = usuarioSeleccionado;
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    }); 
  }

  onModificarUsuario(){
    console.log("modificar not implemented");
  }

  onEliminarUsuario(){
    //this._usuariosService.deletePelicula(this.peliculaSeleccionada!.id!.toString());
    console.log("eliminar usuario not implemented");
  }

  // onToggleHabilitarProf(){
  //   let dialogRef = this.dialog.open(OkCancelComponent, 
  //     {
  //       data : {
  //         title : `${(<Profesional>this.usuarioSeleccionado).habilitado ? 'Deshabilitar' : 'Habilitar'} Especialista`, 
  //         message : `Presione OK para confirmar`
  //       }
  //     }
  //   );
  //   dialogRef.afterClosed().subscribe((response)=>{
  //     if (response == "ok"){
  //       (<Profesional>this.usuarioSeleccionado).toggleHabilitacion();
  //       this.auth.SetUserData(this.usuarioSeleccionado?.uid!, this.usuarioSeleccionado);
  //     }
  //   });
  // }

  agregarNuevo(){
    this._router.navigateByUrl('/register-admin');
  }

  descargar(){
    this.filesService.exportUsersAsExcel(this.prepUsuarios(),this.prepPacientes(), this.prepProfesionales(), 'usuarios');
  }
  
  prepUsuarios() : any[]{
    return this.usuarios!.filter(u => u.typename.toLowerCase() == 'user' || u.typename.toLowerCase() == 'admin').map(u => {
      return {typename : u.typename, nombre : u.nombre, apellido : u.apellido, email : u.email, edad : u.edad, dni : u.dni, isAdmin : u.isAdmin, imagenes : JSON.stringify(u.imagenes)}
    })
  }

  prepPacientes(){
    return this.usuarios!.filter(u => u.typename.toLowerCase() == 'paciente').map(u => {
      return {typename : u.typename, nombre : u.nombre, apellido : u.apellido, email : u.email, edad : u.edad, dni : u.dni, obraSocial : u.obraSocial, imagenes : JSON.stringify(u.imagenes)}
    })
  }

  prepProfesionales(){
    return this.usuarios!.filter(u => u.typename.toLowerCase() == 'profesional').map(u => {
      return {typename : u.typename, nombre : u.nombre, apellido : u.apellido, email : u.email, edad : u.edad, dni : u.dni, habilitado : u.habilitado, especialidades : JSON.stringify(u.especialidades), horarios : JSON.stringify(u.horarios), imagenes : JSON.stringify(u.imagenes)}
    })
  }

}
