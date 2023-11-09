import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-subir-imagen',
  templateUrl: './subir-imagen.component.html',
  styleUrls: ['./subir-imagen.component.scss']
})
export class SubirImagenComponent implements OnInit {

  @Output() datosImagen = new EventEmitter<any>();

  imgURL : any;
  archivoForm = new FormGroup({
    archivo: new FormControl(null, Validators.required),
  });
  randomId = Math.floor(Math.random()*9999);

  constructor() { }

  ngOnInit(): void {
  }

  public cambioArchivo(event : any) {
    [...event.target.files].forEach((file : any) => {
      this.preview(event.target.files);
      this.datosImagen.emit(file);
    });
  }
  
  preview (files : any){
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      // convert image file to base64 string
      this.imgURL = reader.result;
    }, false);
    if (files.length > 0){
      reader.readAsDataURL(files[0]);
    }
  }

  pressFileBtn(){
    document.getElementById(this.randomId.toString())!.click();
  }
}
