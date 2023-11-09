import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoEspecialidadesComponent } from './components/especialidades/listado-especialidades/listado-especialidades.component';
import { NuevaEspecialidadComponent } from './components/especialidades/nueva-especialidad/nueva-especialidad.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MisPacientesComponent } from './components/profesionales/mis-pacientes/mis-pacientes.component';
import { RegisterComponent } from './components/register/register.component';
import { RegistroAdminComponent } from './components/registro-admin/registro-admin.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { HabilitadoGuard } from './guards/habilitado.guard';
import { ProfesionalGuard } from './guards/profesional.guard';

const routes: Routes = [
  {path: 'home' , component: HomeComponent, data : { animation : 'HomePage'}},
  {path: 'login' , component: LoginComponent, data : { animation : 'LoginPage'}},
  {path: 'register' , component: RegisterComponent, data : { animation : 'RegisterPage'}},
  {path: 'mi-perfil' , component: MiPerfilComponent, canActivate : [AuthGuard]},
  {path: 'usuarios' , component: UsuariosComponent, canActivate : [AdminGuard]},
  {path: 'register-admin' , component: RegistroAdminComponent, canActivate : [AdminGuard]},
  {path: 'mis-pacientes' , component: MisPacientesComponent, canActivate : [ProfesionalGuard, HabilitadoGuard]},
  {path: 'nueva-especialidad' , component: NuevaEspecialidadComponent, canActivate : [AdminGuard]},
  {path: 'especialidades' , component: ListadoEspecialidadesComponent, canActivate : [AdminGuard]},
  {path: 'not-authorized' , component: NotAuthorizedComponent, canActivate : [AuthGuard], data : { animation : 'NotAuthorizedPage'}},
  { path: 'private', loadChildren: () => import ('./components/private/private.module').then(p=>p.PrivateModule)},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
