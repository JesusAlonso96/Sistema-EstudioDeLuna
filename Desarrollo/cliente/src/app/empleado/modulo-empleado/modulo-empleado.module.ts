import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/comun/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

//componentes
import { EmpleadoComponent } from '../empleado.component';
import { MainNavEmpleadoComponent } from '../main-nav-empleado/main-nav-empleado.component';
import { EmpleadoPerfilComponent } from '../empleado-perfil/empleado-perfil.component';
import { EmpleadoRoutingModule } from './empleado-routing.module';
import { RegistroUsuarioComponent } from '../registro-usuario/registro-usuario.component';
import { EmpleadoVentaComponent, Modal, Modal2 } from '../empleado-venta/empleado-venta.component';
import { EmpleadoPedidosRealizadosComponent } from '../empleado-pedidos-realizados/empleado-pedidos-realizados.component';
import { EmpleadoPedidosProcesoComponent } from '../empleado-pedidos-proceso/empleado-pedidos-proceso.component';
import { EmpleadoNotificacionesComponent } from '../empleado-notificaciones/empleado-notificaciones.component';
import { ModalDetallesProductoComponent } from '../empleado-venta/modal-detalles-producto/modal-detalles-producto.component';

//servicios
import { EmpleadoService } from '../servicio-empleado/empleado.service';
import { EstadosService } from 'src/app/comun/servicios/estados.service';
import { ProductosService } from 'src/app/comun/servicios/productos.service';
import { EmpleadoGuard } from '../compartido/empleado.guard';
import { UsuarioService } from 'src/app/comun/servicios/usuario.service';
import { WebSocketService } from 'src/app/comun/servicios/socket.service';

//modulos
import { ComunModule } from 'src/app/comun/comun.module';

//pipes
import { ProductosFiltroPipe } from '../compartido/productos-filtro.pipe';


@NgModule({
  declarations: [
    EmpleadoComponent,
    MainNavEmpleadoComponent,
    EmpleadoPerfilComponent,
    RegistroUsuarioComponent,
    EmpleadoVentaComponent,
    ProductosFiltroPipe,
    Modal,
    Modal2,
    ModalDetallesProductoComponent,
    EmpleadoPedidosRealizadosComponent,
    EmpleadoPedidosProcesoComponent,
    EmpleadoNotificacionesComponent


  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    EmpleadoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComunModule
  ],
  providers: [
    EmpleadoService,
    EmpleadoGuard,
    EstadosService,
    ProductosService,
    UsuarioService,
    WebSocketService
  ],
  entryComponents: [ Modal,Modal2, ModalDetallesProductoComponent ]
})
export class EmpleadoModule { }
