import { Injectable } from '@angular/core';
import { Especialidad } from '../Entities/especialidad';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {

  especialidades: AngularFirestoreCollection<any>;

  constructor(private _db : AngularFirestore) { 
    this.especialidades = this._db.collection('especialidades',ref => ref.orderBy('descripcion'));
  }

  getEspecialidades() : Observable<any>{
    return this.especialidades.valueChanges({idField : 'id'});
  }

  addEspecialidad(especialidad : any) : Promise<DocumentReference<any>>{
    return this.especialidades.add((Object.fromEntries(Object.entries(especialidad).filter(([key]) => !(key === 'id')))));
  }

  updateEspecialidad(especialidad : any){
    return this._db.collection('especialidades').doc(especialidad.id).set(JSON.parse(JSON.stringify(especialidad)));
  }
}
