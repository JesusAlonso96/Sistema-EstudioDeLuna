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
import { EmpleadoVentaComponent, Modal } from '../empleado-venta/empleado-venta.component';

//servicios
import { EmpleadoService } from '../servicio-empleado/empleado.service';
import { EstadosService } from 'src/app/comun/servicios/estados.service';
import { ProductosService } from 'src/app/comun/servicios/productos.service';
import { EmpleadoGuard } from '../compartido/empleado.guard';
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
    Modal

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    EmpleadoRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    EmpleadoService,
    EmpleadoGuard,
    EstadosService,
    ProductosService
  ],
  entryComponents: [ Modal ]
})
export class EmpleadoModule { }
