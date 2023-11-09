import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-not-authorized',
  templateUrl: './not-authorized.component.html',
  styleUrls: ['./not-authorized.component.scss']
})
export class NotAuthorizedComponent implements OnInit {

  correoEnviado = false;

  constructor(private auth : AuthService) { }

  ngOnInit(): void {
  }

  reenviarCorreoVerificacion(){
    this.auth.SendVerificationMail();
    this.correoEnviado = true;
    setTimeout(() => {
      this.correoEnviado = false;
    }, 60000);
  }

}
