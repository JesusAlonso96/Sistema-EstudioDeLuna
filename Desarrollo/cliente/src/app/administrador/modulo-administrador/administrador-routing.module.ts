import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//componentes de modulo
import { AdministradorPerfilComponent } from '../administrador-perfil/administrador-perfil.component';
import { AdministradorComponent } from '../administrador.component';
import { AutenticacionGuard } from 'src/app/autenticacion/compartido/autenticacion.guard';
import { EmpleadosSeccionComponent } from '../empleados-seccion/empleados-seccion.component';
import { EmpleadoAltaComponent } from '../empleados-seccion/empleado-alta/empleado-alta.component';
import { EmpleadoBajaComponent } from '../empleados-seccion/empleado-baja/empleado-baja.component';
import { EmpleadoConsultaComponent } from '../empleados-seccion/empleado-consulta/empleado-consulta.component';
import { InfoSeccionComponent } from '../info-seccion/info-seccion.component';
import { CatalogoFamiliasComponent } from '../info-seccion/catalogo-familias/catalogo-familias.component';
import { CatalogoProductosComponent } from '../info-seccion/catalogo-productos/catalogo-productos.component';
import { AdministradorVentasSeccionComponent } from '../administrador-ventas-seccion/administrador-ventas-seccion.component';
import { AdministradorReporteVentasComponent } from '../administrador-ventas-seccion/administrador-reporte-ventas/administrador-reporte-ventas.component';




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
            { path: 'perfil', component: AdministradorPerfilComponent },
            {
                path: 'usuarios',
                component: EmpleadosSeccionComponent,
                children: [
                    { path: 'alta', component: EmpleadoAltaComponent },
                    { path: 'baja', component: EmpleadoBajaComponent },
                    { path: 'consulta', component: EmpleadoConsultaComponent }
                ]

            },
            {
                path: 'ventas',
                component: AdministradorVentasSeccionComponent,
                children: [
                    { path: 'reportes-ventas', component: AdministradorReporteVentasComponent },
                ]
            },
            {
                path: 'info',
                component: InfoSeccionComponent,
                children: [
                    { path: 'familias', component: CatalogoFamiliasComponent },
                    { path: 'productos', component: CatalogoProductosComponent }
                ]
            }
        ]

    }
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AdministradorRoutingModule { }