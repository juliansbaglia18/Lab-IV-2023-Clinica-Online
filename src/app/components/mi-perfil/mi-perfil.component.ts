import { Component, OnInit } from '@angular/core';
import { TimeHandler } from 'src/app/Entities/time-handler';
import { Turno } from 'src/app/Entities/turno';
import { AuthService } from 'src/app/services/auth.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss']
})
export class MiPerfilComponent implements OnInit {

  user : any;
  
  constructor(public auth : AuthService, private usersService :  UsersService) { }

  ngOnInit(): void {
    this.user = this.usersService.getCurrentUser();
  }

}
