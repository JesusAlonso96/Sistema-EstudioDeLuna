import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//componentes de modulo
import { EmpleadoComponent } from '../empleado.component';
import { EmpleadoPerfilComponent } from '../empleado-perfil/empleado-perfil.component';
import { RegistroUsuarioComponent } from '../registro-usuario/registro-usuario.component';
//guardia
import { AutenticacionGuard } from 'src/app/autenticacion/compartido/autenticacion.guard';



const routes: Routes = [
    {
        path: 'usuario',
        component: EmpleadoComponent,
        canActivate: [AutenticacionGuard],
        children: [
            { path: 'perfil', component: EmpleadoPerfilComponent },
            { path: 'registrar', component: RegistroUsuarioComponent }
        ]
    }
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class EmpleadoRoutingModule { }