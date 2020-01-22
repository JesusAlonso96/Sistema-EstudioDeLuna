import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//componentes
import { AltaClienteComponent } from './componentes/alta-cliente/alta-cliente.component';
import { NotaCompraComponent } from './componentes/nota-compra/nota-compra.component';
import { CatalogoFamiliasComponent } from './componentes/catalogo-familias/catalogo-familias.component';
import { CatalogoProductosComponent } from './componentes/catalogo-productos/catalogo-productos.component';
import { InfoSucursalesComponent } from './componentes/info-sucursales/info-sucursales.component';
import { EncabezadoTituloComponent } from './componentes/encabezado-titulo/encabezado-titulo.component';
import { AgregarProductoComponent } from './componentes/catalogo-productos/agregar-producto/agregar-producto.component';
import { EliminarProductoComponent } from './componentes/catalogo-productos/eliminar-producto/eliminar-producto.component';
import { EditarProductoComponent } from './componentes/catalogo-productos/editar-producto/editar-producto.component';
import { AgregarFamiliaComponent } from './componentes/catalogo-familias/agregar-familia/agregar-familia.component';
import { EliminarFamiliaComponent } from './componentes/catalogo-familias/eliminar-familia/eliminar-familia.component';
import { BajaClienteComponent } from './componentes/baja-cliente/baja-cliente.component';
import { RestaurarClienteComponent } from './componentes/restaurar-cliente/restaurar-cliente.component';
import { ConsultaClienteComponent } from './componentes/consulta-cliente/consulta-cliente.component';
import { DatosClienteComponent } from './componentes/consulta-cliente/datos-cliente/datos-cliente.component';
import { EditarClienteComponent } from './componentes/consulta-cliente/editar-cliente/editar-cliente.component';
import { PedidosClienteComponent } from './componentes/consulta-cliente/datos-cliente/pedidos-cliente/pedidos-cliente.component';
import { CargandoComponent } from './componentes/cargando/cargando.component';
import { ConfirmarRestauracionComponent } from './componentes/restaurar-cliente/confirmar-restauracion/confirmar-restauracion.component';
import { ModalConfirmacionComponent } from './componentes/modal-confirmacion/modal-confirmacion.component';
import { ConsultaUsuarioComponent } from './componentes/consulta-usuario/consulta-usuario.component';
import { AltaUsuarioComponent } from './componentes/alta-usuario/alta-usuario.component';
import { EditarUsuarioComponent } from './componentes/consulta-usuario/editar-usuario/editar-usuario.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { SeleccionarEmpleadoComponent } from './componentes/modales/seleccionar-empleado/seleccionar-empleado.component';
import { DetallesProductoComponent } from './componentes/modales/detalles-producto/detalles-producto.component';
import { ListaPedidosComponent } from './componentes/lista-pedidos/lista-pedidos.component';
import { MostrarVentasFotografosComponent } from './componentes/modales/mostrar-ventas-fotografos/mostrar-ventas-fotografos.component';
import { DesgloseVentasFotografosComponent } from './componentes/modales/desglose-ventas-fotografos/desglose-ventas-fotografos.component';
import { EditarProveedorComponent } from './componentes/modales/editar-proveedor/editar-proveedor.component';
import { SeleccionarProveedorComponent } from './componentes/modales/seleccionar-proveedor/seleccionar-proveedor.component';

//modulos
import { MaterialModule } from './material.module';

//servicios
import { EstadosService } from './servicios/estados.service';
import { ClienteService } from './servicios/cliente.service';
import { UsuarioService } from './servicios/usuario.service';

//pipes
import { FiltroPedidosPipe } from './pipes/filtro-pedidos.pipe';
import { FormatoFechaPipe } from './pipes/formato-fecha.pipe';
import { PaginacionPipe } from './pipes/paginacion.pipe';



@NgModule({
    declarations: [
        AltaClienteComponent,
        NotaCompraComponent,
        InfoSucursalesComponent,
        CatalogoFamiliasComponent,
        CatalogoProductosComponent,
        FiltroPedidosPipe,
        FormatoFechaPipe,
        PaginacionPipe,
        EncabezadoTituloComponent,
        AgregarProductoComponent,
        EliminarProductoComponent,
        EditarProductoComponent,
        AgregarFamiliaComponent,
        EliminarFamiliaComponent,
        BajaClienteComponent,
        RestaurarClienteComponent,
        ConsultaClienteComponent,
        DatosClienteComponent,
        EditarClienteComponent,
        PedidosClienteComponent,
        CargandoComponent,
        ConfirmarRestauracionComponent,
        ModalConfirmacionComponent,
        ConsultaUsuarioComponent,
        AltaUsuarioComponent,
        EditarUsuarioComponent,
        PerfilComponent,
        SeleccionarEmpleadoComponent,
        DetallesProductoComponent,
        ListaPedidosComponent,
        MostrarVentasFotografosComponent,
        DesgloseVentasFotografosComponent,
        EditarProveedorComponent,
        SeleccionarProveedorComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,

    ],
    exports: [
        AltaClienteComponent,
        NotaCompraComponent,
        FiltroPedidosPipe,
        FormatoFechaPipe,
        PaginacionPipe,
        InfoSucursalesComponent,
        CatalogoFamiliasComponent,
        CatalogoProductosComponent,
        EncabezadoTituloComponent,
        BajaClienteComponent,
        RestaurarClienteComponent,
        ConsultaClienteComponent,
        CargandoComponent,
        ConsultaUsuarioComponent,
        AltaUsuarioComponent,
        PerfilComponent,
        ListaPedidosComponent

    ],
    entryComponents: [
        AgregarProductoComponent,
        EliminarProductoComponent,
        EditarProductoComponent,
        AgregarFamiliaComponent,
        EliminarFamiliaComponent,
        DatosClienteComponent,
        EditarClienteComponent,
        PedidosClienteComponent,
        ConfirmarRestauracionComponent,
        ModalConfirmacionComponent,
        EditarUsuarioComponent,
        SeleccionarEmpleadoComponent,
        DetallesProductoComponent,
        MostrarVentasFotografosComponent,
        DesgloseVentasFotografosComponent,
        EditarProveedorComponent,
        SeleccionarProveedorComponent
    ],
    providers: [
        EstadosService,
        ClienteService,
        UsuarioService,

    ],
    bootstrap: []
})
export class ComunModule { }
