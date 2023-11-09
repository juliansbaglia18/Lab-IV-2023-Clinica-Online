import { Component, OnInit } from '@angular/core';
import { Feature } from 'src/app/classes/feature';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})


export class RegisterComponent implements OnInit {

  opcionesRegistro : Feature[] = [
    { id: 'feature-paciente', label : "Paciente", color : 'white', backgroundImg: 'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80'},
    { id: 'feature-profesional', label : "Profesional", color : 'white', backgroundImg: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'}
  ];
  opcionSeleccionada? : Feature;

  // constructor(public auth: Auth, public firestore: Firestore, private fb: FormBuilder) { }
  constructor() { }

  ngOnInit(): void {
        
  }

  mostrarFormRegistro(feature : Feature){
    this.opcionSeleccionada = feature;
  }

}

