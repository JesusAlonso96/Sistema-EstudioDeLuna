import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//componentes de modulo
import { AdministradorPerfilComponent } from '../administrador-perfil/administrador-perfil.component';
import { AdministradorComponent } from '../administrador.component';
import { AdminGuard } from '../compartido/admin.guard';
import { AutenticacionGuard } from 'src/app/autenticacion/compartido/autenticacion.guard';




const routes: Routes = [
    {
        path: 'admin',
        redirectTo: 'admin/perfil',
        pathMatch: 'full'
    },
    {
        path: 'admin',
        component: AdministradorComponent,
        canActivate: [AutenticacionGuard],
        children: [
            { path: 'perfil', component: AdministradorPerfilComponent }
        ]

    }
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AdministradorRoutingModule { }