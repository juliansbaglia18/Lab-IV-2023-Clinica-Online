import { Injectable } from '@angular/core';
import { User } from '../Entities/user';
import { AuthService } from './auth.service';
import { FilesService } from './files.service';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Profesional } from '../Entities/profesional';
import { UserFactory } from '../Entities/user-factory';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  usuarios: AngularFirestoreCollection<any>;

  constructor(public fileService : FilesService, public auth : AuthService, private _db : AngularFirestore) { 
    this.usuarios = this._db.collection('users');
  }

  async registerNewUser(user : User, password : string, imagenes : string[]){
    user.imagenes =  await this.uploadUserImages(user, imagenes);
    let response = await this.auth.SignUp(user, password);
    return new Promise( (res,rej)=>{
      res(response);
    })
  }

  async uploadUserImages(user : User, images : string[]) : Promise<string[]>{
    let urls : string[] = [];
    try {
      for (let i = 0; i < images.length; i++){
        let img = await this.fileService.uploadFile(
              `${user.email.substring(0, user.email.lastIndexOf("@"))}_${i}`,
              images[i],
              {nombre : user.nombre});
            let url = await img.ref.getDownloadURL();
            urls.push(url);
      }
    } catch (error) {
      urls = [];
    }
    return urls;
  }

  getUsuario(uid : string){
    return this.usuarios.doc(uid).get();
  }
  
  getUsuarios() : Observable<any>{
    return this.usuarios.valueChanges({idField : 'uid'});
  }

  getCurrentUser(){
    return UserFactory.constructUser(JSON.parse(localStorage.getItem('user')!));
  }

  getCurrentAuthData(){
    return UserFactory.constructUser(JSON.parse(localStorage.getItem('auth')!));
  }

  updateHorariosProfesional(prof : Profesional) : Promise<void>{
    return this.usuarios.doc(prof.uid).update({
      horarios : prof.horarios
    }).then();
  }

  getUserLogs(uid : string){
    return this._db.collection('logs').doc(uid).get();
  }
}
