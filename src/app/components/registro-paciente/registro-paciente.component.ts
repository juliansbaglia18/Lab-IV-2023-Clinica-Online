import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CustomValidator } from 'src/app/Entities/custom-validator';
import { MyErrorStateMatcher } from 'src/app/Entities/my-error-state-matcher';
import { User } from 'src/app/Entities/user';
// import { FilesService } from 'src/app/services/files.service';
import { UsersService } from 'src/app/services/users.service';
import { Paciente } from 'src/app/Entities/paciente';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
// import { CaptchaDialogComponent } from 'src/app/dialogs/captcha-dialog/captcha-dialog.component';
import {lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-registro-paciente',
  templateUrl: './registro-paciente.component.html',
  styleUrls: ['./registro-paciente.component.scss']
})

export class RegistroPacienteComponent implements OnInit {

  hidePassword : Boolean[] = [true,true];
  matcher = new MyErrorStateMatcher();
  public registerForm! : FormGroup;
  emailAlreadyInUse = false;
  invalidEmail = false;
  profileImages : string[] = [];
  loadedImages : Boolean = true;
  buffering = false;

  constructor(public auth: AuthService, private fb: FormBuilder, public usersService : UsersService, private router : Router, private dialog : MatDialog) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      'nombre' :  ['', [Validators.required]],
      'apellido' :  ['', [Validators.required]],
      'edad' :  ['', [Validators.required, Validators.min(1)]],
      'dni' :  ['', [Validators.required, Validators.minLength(8),Validators.maxLength(8)]],
      'obraSocial' :  ['', [Validators.required]],
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
    if(!this.ambasImagenesCargadas()){
      this.loadedImages = false;
      return;
    }
    
    this.buffering = true;
    this.usersService.registerNewUser(
      this.constructUser(),
      this.registerForm.get('password')!.value,
      this.profileImages)
      .then((response)=>{
        if (response == "success"){
          this.router.navigate(['home'])
        } else {
          this.buffering = false;
          if ((<{ code : string, customData : any, name : string}>response).code === "auth/email-already-in-use"){
            this.emailAlreadyInUse = true;
          } 
          else if ((<{ code : string, customData : any, name : string}>response).code === "auth/invalid-email"){         
            this.invalidEmail = true;
          }  
        }
      })   
  }

  constructUser() : Paciente{
    return new Paciente(
      this.registerForm.get('email')!.value,
      this.registerForm.get('nombre')!.value,
      this.registerForm.get('apellido')!.value,
      this.registerForm.get('edad')!.value,
      this.registerForm.get('dni')!.value,
      [],
      this.registerForm.get('obraSocial')!.value,      
      )    
  }

  getImage( imagen : any, index : number){
    this.profileImages[index] = imagen;
    this.loadedImages = true;
  }

  ambasImagenesCargadas() : boolean {
    return this.profileImages.length == 2;
  }
}
