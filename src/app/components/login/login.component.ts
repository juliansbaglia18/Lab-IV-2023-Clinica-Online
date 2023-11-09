import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Entities/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Feature } from 'src/app/classes/feature';
import { mockUsers } from 'src/assets/constants/mockUsers';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  user!: User;
  hidePassword : Boolean = true;
  public loginForm! : FormGroup;
  invalidCredentials : boolean = false;
  mockUsersButtons : Feature[] = [];

  // constructor(public auth: Auth, private fb: FormBuilder, private _router : Router) { }
  constructor(public auth: AuthService, private fb: FormBuilder, private _router : Router) { }

  ngOnInit(): void {
    mockUsers.forEach(usr => {
      this.mockUsersButtons.push({id: usr.uid!, color:'grey', label: usr.label, backgroundImg: usr.imagen})
    })
    this.loginForm = this.fb.group({
      'email' :  ['', [Validators.required, Validators.email]],
      'password' : ['', [Validators.required]]
    })
    this.loginForm.valueChanges.subscribe(()=>{
      this.invalidCredentials = false;
    })
  }

  togglePasswordVisibility(){
    this.hidePassword = !this.hidePassword;
  }

  handleLogIn(){
    this.auth.SignIn(
      this.loginForm.get('email')!.value,
      this.loginForm.get('password')!.value)
      .then(() => {
        this.auth.afAuth.authState.subscribe((user) => {
          if (user) {
            this._router.navigate(['users/home']);
          }
        });
      })
      .catch((error) => {
        this.invalidCredentials = true;
      });
  }

  loadLoginForm(selectedMockUser : Feature){
    let selectedUser : any =  mockUsers.find(u => u.uid == selectedMockUser.id)!;
    this.loginForm.get('email')?.setValue(selectedUser.email);
    this.loginForm.get('password')?.setValue(selectedUser.password);
  }

  loadMockUser(email: string, password: string) {
    this.loginForm.get('email')?.setValue(email);
    this.loginForm.get('password')?.setValue(password);
  }


  //BORRRAR

  

}


