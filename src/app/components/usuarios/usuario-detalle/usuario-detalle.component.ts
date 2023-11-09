import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Paciente } from 'src/app/Entities/paciente';
import { Profesional } from 'src/app/Entities/profesional';
import { User } from 'src/app/Entities/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-usuario-detalle',
  templateUrl: './usuario-detalle.component.html',
  styleUrls: ['./usuario-detalle.component.scss']
})
export class UsuarioDetalleComponent implements OnInit, OnChanges {

  @Input() usuario! : any;
  
  @Output() toggleHabilitarEvent = new EventEmitter<void>;
  @Output() modificarEvent = new EventEmitter<void>;
  @Output() eliminarEvent = new EventEmitter<void>;

  constructor(public auth : AuthService) { }

  ngOnInit(): void {
  }

  ngOnChanges(){
  }

  modificarUsuario(){
    this.modificarEvent.emit();
  }

  eliminarUsuario(){
    this.eliminarEvent.emit();
  }

  toggleHabilitarUsuario(){
    this.toggleHabilitarEvent.emit();
  }
}