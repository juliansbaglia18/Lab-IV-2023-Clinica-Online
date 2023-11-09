import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FirebaseAppModule, initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore, FirestoreModule } from '@angular/fire/firestore';

//Angular Material

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthService } from './services/auth.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { EspecialidadesComponent } from './components/especialidades/especialidades.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { RegistroPacienteComponent } from './components/registro-paciente/registro-paciente.component';
import { RegistroProfesionalComponent } from './components/registro-profesional/registro-profesional.component';
import { CustomButtonsComponent } from './components/custom-buttons/custom-buttons.component';
import { SubirImagenComponent } from './components/subir-imagen/subir-imagen.component';
import { FilesService } from './services/files.service';
import { UsersService } from './services/users.service';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';
import { RegistroAdminComponent } from './components/registro-admin/registro-admin.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UsuarioDetalleComponent } from './components/usuarios/usuario-detalle/usuario-detalle.component';
import { UsuarioListadoComponent } from './components/usuarios/usuario-listado/usuario-listado.component';
import { BoolESPipe } from './pipes/bool-es.pipe';
import { HorarioPipe } from './pipes/horario.pipe';
import { ProfesionalesComponent } from './components/profesionales/profesionales.component';
import { ListadoProfesionalesComponent } from './components/profesionales/listado-profesionales/listado-profesionales.component';
import { ProfesionalDetalleComponent } from './components/profesionales/profesional-detalle/profesional-detalle.component';
import { ListadoPacientesComponent } from './components/pacientes/listado-pacientes/listado-pacientes.component';
import { EncuestaPacienteComponent } from './components/pacientes/encuesta-paciente/encuesta-paciente.component';

//Other
import { StarRatingModule } from 'angular-star-rating';
import { MisPacientesComponent } from './components/profesionales/mis-pacientes/mis-pacientes.component';

//files
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import { HighligthDirective } from './directives/highligth.directive';
import { NuevaEspecialidadComponent } from './components/especialidades/nueva-especialidad/nueva-especialidad.component';
import { ListadoEspecialidadesComponent } from './components/especialidades/listado-especialidades/listado-especialidades.component';
import { AngularMaterialModule } from './material/angular-material/angular-material.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    NavbarComponent,
    EspecialidadesComponent,
    CapitalizePipe,
    RegistroPacienteComponent,
    RegistroProfesionalComponent,
    CustomButtonsComponent,
    SubirImagenComponent,
    MiPerfilComponent,
    RegistroAdminComponent,
    UsuariosComponent,
    UsuarioDetalleComponent,
    UsuarioListadoComponent,
    BoolESPipe,
    HorarioPipe,
    ProfesionalesComponent,
    ListadoProfesionalesComponent,
    ProfesionalDetalleComponent,
    ListadoPacientesComponent,
    EncuestaPacienteComponent,
    MisPacientesComponent,
    NotAuthorizedComponent,
    HighligthDirective,
    NuevaEspecialidadComponent,
    ListadoEspecialidadesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    StarRatingModule.forRoot(),
    ChartModule,
    AngularMaterialModule
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    AuthService,
    CapitalizePipe,
    FilesService,
    UsersService,
    { provide: HIGHCHARTS_MODULES, useFactory: () => [ more, exporting ] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
