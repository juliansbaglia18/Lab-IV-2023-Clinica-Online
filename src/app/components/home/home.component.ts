import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Feature } from 'src/app/classes/feature';
import { accionTurno } from 'src/app/Entities/accion-turno';
import { UsersService } from 'src/app/services/users.service';
import { accionesHome } from 'src/assets/constants/accionesHome';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loading : boolean = true;

  acciones? : accionTurno[];
  accionesBtns : Feature[] = [];
  accionesColores : string[] = ["#d8fcca", "#d4d4ff", "#ffd4e6c5", "#fff9a7"];
  tipoUsuario? : string;
  visibility? : 'public' | 'private';

  constructor(private router : Router, private usersService : UsersService) { }

  ngOnInit(): void {
    let currentAuthData = this.usersService.getCurrentAuthData();
    if (currentAuthData == undefined){
      this.loading = false;
      this.visibility = 'public';
    } else {
      this.usersService.getUsuario(this.usersService.getCurrentAuthData().uid).subscribe(user => {
        this.tipoUsuario = user.data().typename;
        this.acciones = accionesHome
          .filter(a => a.permisos[this.tipoUsuario!.toLowerCase()]);
        this.acciones
        .forEach((a,i) => {
          this.accionesBtns.push(
            {
              id : i.toString(),
              color : 'black',
              label : a.accion,
              backgroundImg : '',
              backgroundColor : this.accionesColores[i]
            }
          )
        });
        this.loading = false;
        this.visibility = 'private';
      });
    }
    
  }

  ejecutarAccion(buttonPressed : Feature){
        this.router.navigateByUrl(this.acciones![parseInt(buttonPressed.id)].route!);
  }
}
