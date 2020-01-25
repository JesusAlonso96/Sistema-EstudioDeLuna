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
import { AdministradorVentasSeccionComponent } from '../administrador-ventas-seccion/administrador-ventas-seccion.component';
//seccion de tablero principal
import { AdministradorTableroSeccionComponent } from '../administrador-tablero-seccion/administrador-tablero-seccion.component';
import { PedidosColaComponent } from '../administrador-tablero-seccion/pedidos-cola/pedidos-cola.component';
import { PedidosVendidosComponent } from '../administrador-tablero-seccion/pedidos-vendidos/pedidos-vendidos.component';
import { PedidosCompletadosComponent } from '../administrador-tablero-seccion/pedidos-completados/pedidos-completados.component';
//seccion de inventario
import { AdministradorInventarioSeccionComponent } from '../administrador-inventario-seccion/administrador-inventario-seccion.component';
//seccion de productos
import { ProductosSeccionComponent } from '../productos-seccion/productos-seccion.component';
//seccion de familias de productos
import { FamiliasProductosSeccionComponent } from '../familias-productos-seccion/familias-productos-seccion.component';
//seccion de usuarios
import { AdministradorUsuariosSeccionComponent } from '../administrador-usuarios-seccion/administrador-usuarios-seccion.component';
import { UsuariosAltaComponent } from '../administrador-usuarios-seccion/usuarios-alta/usuarios-alta.component';
import { UsuariosBajaComponent } from '../administrador-usuarios-seccion/usuarios-baja/usuarios-baja.component';
import { UsuariosConsultaComponent } from '../administrador-usuarios-seccion/usuarios-consulta/usuarios-consulta.component';
import { UsuariosRestaurarComponent } from '../administrador-usuarios-seccion/usuarios-restaurar/usuarios-restaurar.component';
import { CambiarPermisosComponent } from '../administrador-usuarios-seccion/usuarios-consulta/cambiar-permisos/cambiar-permisos.component';
//seccion de clientes
import { AdministradorClientesSeccionComponent } from '../administrador-clientes-seccion/administrador-clientes-seccion.component';
//seccion de ABD DE CLIENTES
import { ClientesAltaComponent } from '../administrador-clientes-seccion/clientes-alta/clientes-alta.component';
import { ClientesBajaComponent } from '../administrador-clientes-seccion/clientes-baja/clientes-baja.component';
import { ClientesConsultaComponent } from '../administrador-clientes-seccion/clientes-consulta/clientes-consulta.component';
import { ClientesRestaurarComponent } from '../administrador-clientes-seccion/clientes-restaurar/clientes-restaurar.component';
//seccion de compras
import { AdministradorComprasSeccionComponent } from '../administrador-compras-seccion/administrador-compras-seccion.component';
//seccion de proveedores
import { AdministradorProveedoresSeccionComponent } from '../administrador-proveedores-seccion/administrador-proveedores-seccion.component';
import { ProveedoresAltaComponent } from '../administrador-proveedores-seccion/proveedores-alta/proveedores-alta.component';
import { ProveedoresBajaComponent } from '../administrador-proveedores-seccion/proveedores-baja/proveedores-baja.component';
import { ProveedoresEditarComponent } from '../administrador-proveedores-seccion/proveedores-editar/proveedores-editar.component';
import { ProveedoresAgregarProductoComponent } from '../administrador-proveedores-seccion/proveedores-agregar-producto/proveedores-agregar-producto.component';
import { ProveedoresEditarProductoComponent } from '../administrador-proveedores-seccion/proveedores-editar-producto/proveedores-editar-producto.component';
import { ProveedoresRestaurarComponent } from '../administrador-proveedores-seccion/proveedores-restaurar/proveedores-restaurar.component';
//seccion de sucursales
import { AdministradorSucursalesSeccionComponent } from '../administrador-sucursales-seccion/administrador-sucursales-seccion.component';
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
//seccion de ayuda
import { AdministradorAyudaSeccionComponent } from '../administrador-ayuda-seccion/administrador-ayuda-seccion.component';

//servicios
import { AdministradorService } from '../servicio-administrador/servicio-administrador.service';
//modulos
import { ComunModule } from 'src/app/comun/comun.module';
import { AdministradorRoutingModule } from './administrador-routing.module';
//guardia
import { AutenticacionGuard } from 'src/app/autenticacion/compartido/autenticacion.guard';
import { ProveedoresRestaurarProductoComponent } from '../administrador-proveedores-seccion/proveedores-restaurar-producto/proveedores-restaurar-producto.component';


@NgModule({
  declarations: [
    AdministradorComponent,
    AdministradorPerfilComponent,
    MainNavAdminComponent,
    AdministradorVentasSeccionComponent,
    AdministradorReporteVentasComponent,
    ReporteVentasFechaComponent,
    ReporteVentasDiaComponent,
    ReporteVentasFamiliaComponent,
    ReporteVentasMesComponent,
    ListadoVentasMesComponent,
    CorteCajaComponent,
    EditarCantidadComponent,
    HistorialCortesCajaComponent,
    FamiliasProductosSeccionComponent,
    ProductosSeccionComponent,
    AdministradorClientesSeccionComponent,
    AdministradorComprasSeccionComponent,
    AdministradorUsuariosSeccionComponent,
    AdministradorInventarioSeccionComponent,
    AdministradorProveedoresSeccionComponent,
    AdministradorSucursalesSeccionComponent,
    ClientesAltaComponent,
    ClientesBajaComponent,
    ClientesConsultaComponent,
    ClientesRestaurarComponent,
    UsuariosAltaComponent,
    UsuariosBajaComponent,
    UsuariosConsultaComponent,
    UsuariosRestaurarComponent,
    CambiarPermisosComponent,
    AdministradorTableroSeccionComponent,
    PedidosColaComponent,
    PedidosVendidosComponent,
    PedidosCompletadosComponent,
    ProveedoresAltaComponent,
    ProveedoresBajaComponent,
    ProveedoresEditarComponent,
    ProveedoresAgregarProductoComponent,
    ProveedoresEditarProductoComponent,
    ProveedoresRestaurarComponent,
    ProveedoresRestaurarProductoComponent,
    AdministradorAyudaSeccionComponent,
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
    EditarCantidadComponent,
    CambiarPermisosComponent
  ],
  providers: [
    AdministradorService,
    AutenticacionGuard
  ]
})
export class AdministradorModule { }
