import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './autenticacion/login/login.component';
//guardias
import { AdminGuard } from './administrador/compartido/admin.guard';
import { SupervisorGuard } from './supervisor/compartido/supervisor.guard';
import { EmpleadoGuard } from './empleado/compartido/empleado.guard';
import { AutenticacionGuard } from './autenticacion/compartido/autenticacion.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  //{
    //path: '**',
    //redirectTo: '',
  //},
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AutenticacionGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
