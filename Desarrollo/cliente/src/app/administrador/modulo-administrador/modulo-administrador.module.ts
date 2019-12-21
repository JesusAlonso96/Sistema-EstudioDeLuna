import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/comun/material.module';
import { ChartsModule } from 'ng2-charts';
import { NgxPrintModule } from 'ngx-print';

//componentes
import { AdministradorComponent } from '../administrador.component';
import { AdministradorPerfilComponent } from '../administrador-perfil/administrador-perfil.component';
import { MainNavAdminComponent } from '../main-nav-admin/main-nav-admin.component';
import { AdministradorVentasSeccionComponent } from '../administrador-ventas-seccion/administrador-ventas-seccion.component'
    //seccion de empleados
    import { EmpleadosSeccionComponent } from '../empleados-seccion/empleados-seccion.component';
    import { EmpleadoAltaComponent } from '../empleados-seccion/empleado-alta/empleado-alta.component';
    import { EmpleadoBajaComponent } from '../empleados-seccion/empleado-baja/empleado-baja.component';
    import { EmpleadoConsultaComponent } from '../empleados-seccion/empleado-consulta/empleado-consulta.component';
    //seccion de informacion
    import { InfoSeccionComponent } from '../info-seccion/info-seccion.component';
    import { CatalogoFamiliasComponent } from '../info-seccion/catalogo-familias/catalogo-familias.component';
    import { CatalogoProductosComponent } from '../info-seccion/catalogo-productos/catalogo-productos.component';
    //seccion de ventas
    import { CorteCajaComponent } from '../administrador-ventas-seccion/administrador-reporte-ventas/corte-caja/corte-caja.component';
    import { AdministradorReporteVentasComponent } from '../administrador-ventas-seccion/administrador-reporte-ventas/administrador-reporte-ventas.component';
    import { EditarCantidadComponent } from '../administrador-ventas-seccion/administrador-reporte-ventas/corte-caja/editar-cantidad/editar-cantidad.component';
    import { HistorialCortesCajaComponent } from '../administrador-ventas-seccion/administrador-reporte-ventas/historial-cortes-caja/historial-cortes-caja.component';
      //seccion de reportes de ventas
      import { ReporteVentasDiaComponent } from '../administrador-ventas-seccion/administrador-reporte-ventas/reporte-ventas-dia/reporte-ventas-dia.component'
      import { ReporteVentasFechaComponent } from '../administrador-ventas-seccion/administrador-reporte-ventas/reporte-ventas-fecha/reporte-ventas-fecha.component';
      import { ReporteVentasFamiliaComponent } from '../administrador-ventas-seccion/administrador-reporte-ventas/reporte-ventas-fecha/reporte-ventas-familia/reporte-ventas-familia.component';
      import { ReporteVentasMesComponent } from '../administrador-ventas-seccion/administrador-reporte-ventas/reporte-ventas-mes/reporte-ventas-mes.component';
      import { ListadoVentasMesComponent } from '../administrador-ventas-seccion/administrador-reporte-ventas/reporte-ventas-mes/listado-ventas-mes/listado-ventas-mes.component';



//servicios
import { AdministradorService } from '../servicio-administrador/servicio-administrador.service';
//modulos
import { ComunModule } from 'src/app/comun/comun.module';
import { AdministradorRoutingModule } from './administrador-routing.module';
//guardia
import { AutenticacionGuard } from 'src/app/autenticacion/compartido/autenticacion.guard';


@NgModule({
  declarations: [
    AdministradorComponent,
    AdministradorPerfilComponent,
    MainNavAdminComponent,
    EmpleadosSeccionComponent,
    EmpleadoAltaComponent,
    EmpleadoBajaComponent,
    EmpleadoConsultaComponent,
    InfoSeccionComponent,
    CatalogoFamiliasComponent,
    CatalogoProductosComponent,
    AdministradorVentasSeccionComponent,
    AdministradorReporteVentasComponent,
    ReporteVentasFechaComponent,
    ReporteVentasDiaComponent,
    ReporteVentasFamiliaComponent,
    ReporteVentasMesComponent,
    ListadoVentasMesComponent,
    CorteCajaComponent,
    EditarCantidadComponent,
    HistorialCortesCajaComponent

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    AdministradorRoutingModule,
    ComunModule,
    ChartsModule,
    NgxPrintModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [
    ListadoVentasMesComponent,
    EditarCantidadComponent
  ],
  providers: [
    AdministradorService,
    AutenticacionGuard
  ]
})
export class AdministradorModule { }
