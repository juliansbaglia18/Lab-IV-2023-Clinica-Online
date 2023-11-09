import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CustomValidator } from 'src/app/Entities/custom-validator';
import { MyErrorStateMatcher } from 'src/app/Entities/my-error-state-matcher';
import { User } from 'src/app/Entities/user';
import { Especialidad } from 'src/app/Entities/especialidad';
import { UsersService } from 'src/app/services/users.service';
import { Profesional } from 'src/app/Entities/profesional';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-registro-profesional',
  templateUrl: './registro-profesional.component.html',
  styleUrls: ['./registro-profesional.component.scss']
})

export class RegistroProfesionalComponent implements OnInit {

  hidePassword : Boolean[] = [true,true];
  matcher = new MyErrorStateMatcher();
  public registerForm! : FormGroup;
  emailAlreadyInUse = false;
  profileImages : string[] = [];
  loadedImage : Boolean = true;
  invalidEmail = false;
  visible : Boolean = false;
  especialidades : Especialidad[] = [];
  buffering = false;

  constructor(public auth: AuthService, private fb: FormBuilder, public usersService : UsersService, private router : Router, public dialog : MatDialog) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      'nombre' :  ['', [Validators.required]],
      'apellido' :  ['', [Validators.required]],
      'edad' :  ['', [Validators.required, Validators.min(1)]],
      'dni' :  ['', [Validators.required, Validators.minLength(8),Validators.maxLength(8)]],
      'email' : ['', [Validators.required, Validators.email]],
      'password' : ['', [Validators.required,Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})')]],
      'confirmPassword' : ['']
    }, { validators: CustomValidator.checkPasswords});
    
    this.registerForm.valueChanges.subscribe(()=>{
      this.emailAlreadyInUse = false;
    })    
  }

  togglePasswordVisibility(index : number){
    this.hidePassword[index] = !this.hidePassword[index];
  }

  async handleRegister(){
    if(!this.imagenCargada()){
      this.loadedImage = false;
      return;
    }
    
    this.buffering = true;
    this.usersService.registerNewUser(
      this.constructUser(),
      this.registerForm.get('password')!.value,
      this.profileImages)
      .then((response)=>{
        if (response == "success"){
          setTimeout(() => {
            this.router.navigate(['alta-horarios']);
          }, 2200);          
        } else {
          this.buffering = false;
          if ((<{ code : string, customData : any, name : string}>response).code === "auth/email-already-in-use"){
            this.emailAlreadyInUse = true;
          } 
          else if ((<{ code : string, customData : any, name : string}>response).code === "auth/invalid-email"){         
            this.invalidEmail = true;
          }  
        }
      });
  }

  constructUser() : Profesional{
    return new Profesional(
      this.registerForm.get('email')!.value,
      this.registerForm.get('nombre')!.value,
      this.registerForm.get('apellido')!.value,
      this.registerForm.get('edad')!.value,
      this.registerForm.get('dni')!.value,
      this.profileImages,
      this.especialidades
      )    
  }

  refrescarEspecialidades(especialidades : Especialidad[]){
    this.especialidades = especialidades;
  }

  mostrarFormulario(c : any){
    this.visible = true;
  }

  getImage( imagen : any){
    this.profileImages[0] = imagen;
    this.loadedImage = true;
  }

  imagenCargada() : boolean {
    return this.profileImages.length == 1;
  }
}


