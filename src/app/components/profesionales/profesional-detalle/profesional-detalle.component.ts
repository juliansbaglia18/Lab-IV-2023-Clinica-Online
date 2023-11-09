import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profesional-detalle',
  templateUrl: './profesional-detalle.component.html',
  styleUrls: ['./profesional-detalle.component.scss']
})
export class ProfesionalDetalleComponent implements OnInit {

  @Input() profesional! : any;

  constructor() { }

  ngOnInit(): void {
  }
  
}
