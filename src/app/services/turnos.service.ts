import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore,DocumentData } from '@angular/fire/compat/firestore';
import { Turno } from '../Entities/turno';
import {lastValueFrom, Observable } from 'rxjs';
import {  } from '@angular/fire/firestore';
import { Paciente } from '../Entities/paciente';
import * as firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  turnos: AngularFirestoreCollection<any>;

  constructor(private _db : AngularFirestore) { 
    this.turnos = this._db.collection('turnos');
  }

  async guardarTurno(turno : Turno) : Promise<boolean>{
    let existeTurno = await this.turnoExiste(turno);
    if (!existeTurno){
      this.turnos.add(JSON.parse(JSON.stringify(turno)));
    }
    return new Promise((res) => {
      res(!existeTurno);
    });
  }

  async turnoExiste(turno : Turno) : Promise<boolean> {
    const data = await lastValueFrom(this._db.collection('turnos', ref => 
    ref.where('idProfesional','==', turno.idProfesional)
    .where('fecha','==',turno.fecha)
    .where('inicia','==', turno.inicia)
    .where('estado','in',['PENDIENTE','ACEPTADO'])
    )
    .get())
    return new Promise((res, rej) => {
      data.size >= 1 ? res(true) : res(false);
    });
  }

  getTurnosUsuario(uid : string, typename : string){
    switch (typename.toLowerCase()) {
      case 'paciente':
        return this.getTurnosPaciente(uid);
      case 'profesional':
        return this.getTurnosProfesional(uid);
      case 'admin':
        return this._db.collection('turnos').valueChanges({idField : "id"});
      default :
        return undefined;
    }
  }

  getTurnosPaciente(idPaciente : string) : Observable<any>{
    return this._db.collection('turnos', ref => 
    ref.where('idPaciente','==', idPaciente)).valueChanges({idField : "id"});
  }

  pacienteConverter = {
    toFirestore(paciente: Paciente): DocumentData {
      return {...paciente};
    },
    fromFirestore(
      snapshot: firebase.default.firestore.QueryDocumentSnapshot,
      options: firebase.default.firestore.SnapshotOptions
    ): Paciente {
      const data = snapshot.data(options)!;
      return new Paciente(data["email"],data["nombre"],data["apellido"],data["edad"],data["dni"],data["imagenes"], data["obraSocial"], data['uid']);
    }
  };

  getTurnosProfesional(idProfesional : string){
    return this._db.collection('turnos', ref => 
    ref.where('idProfesional','==', idProfesional)).valueChanges({idField : "id"});
  }

  async getTurnosNoDisponibles(idProfesional : string, fecha : string) : Promise<Turno[]>{
    const data = await lastValueFrom(this._db.collection('turnos', ref => 
    ref.where('idProfesional','==', idProfesional)
    .where('fecha','==',fecha)
    )
    .get())
    return new Promise((res) => {
      res(data.docs.map( d => <Turno>d.data()).filter(d => d.estado == 'PENDIENTE' ||  d.estado == 'ACEPTADO'));
    });
  }

  currentTurnosNoDisponibles (idProfesional : string, fecha : string){
    return this._db.collection('turnos', ref => 
    ref.where('idProfesional','==', idProfesional)
    .where('fecha','==',fecha).where('estado','in',['PENDIENTE','ACEPTADO'])
    ).valueChanges({idField : "id"});
  }

  updateTurno(turno : Turno){
    this.turnos.doc(turno.id).set(turno, {merge : true});
  }

  async getCountByField(field : string, estado : string = 'CANCELADO', operator : '!=' | '==' = '!=') {
    const map = new Map();
    let turnos = await lastValueFrom(this._db.collection('turnos', ref => 
      ref.where('estado',operator, estado))
    .get());
    turnos.docs.forEach((t)=> {
      let aux = (<Turno>t.data())[field];
      if (map.has(aux)){
        map.set(aux, [...map.get(aux),(<Turno>t.data())]) 
      } else {
        map.set(aux, [(<Turno>t.data())])
      }
    });
    return map;
  }
}
