import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RatingChangeEvent } from 'angular-star-rating';
import { EncuestaPaciente } from 'src/app/Entities/encuesta-paciente';

@Component({
  selector: 'app-encuesta-paciente',
  templateUrl: './encuesta-paciente.component.html',
  styleUrls: ['./encuesta-paciente.component.scss']
})
export class EncuestaPacienteComponent implements OnInit {

  encuesta : EncuestaPaciente = {
    puntuacionClinica : 3,
    puntualidadTurno : 3,
    puntuacionEspecialista : 3,
    comentario : "" 
  };

  ratings = ['Muy malo', 'Malo', 'Normal', 'Bueno', 'Muy bueno']

  constructor(public dialogRef: MatDialogRef<EncuestaPacienteComponent>, @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitDialog(){
    console.log("star dialog", this.encuesta);
      this.dialogRef.close(this.encuesta);
  }

  onRatingChangeClinica(rating : RatingChangeEvent){
    this.encuesta.puntuacionClinica = rating.rating;
  }

  onRatingChangeTurno(rating : RatingChangeEvent){
    this.encuesta.puntualidadTurno = rating.rating;

  }

  onRatingChangeEspecialista(rating : RatingChangeEvent){
    this.encuesta.puntuacionEspecialista = rating.rating;
  }
}
