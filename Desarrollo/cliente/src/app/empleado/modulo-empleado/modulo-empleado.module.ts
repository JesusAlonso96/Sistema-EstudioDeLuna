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
//servicios
import { EmpleadoService } from '../servicio-empleado/empleado.service';
import { EmpleadoGuard } from '../compartido/empleado.guard';
import { EstadosService } from 'src/app/comun/servicios/estados.service';


@NgModule({
  declarations: [
    EmpleadoComponent,
    MainNavEmpleadoComponent,
    EmpleadoPerfilComponent,
    RegistroUsuarioComponent

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
    EstadosService
  ]
})
export class EmpleadoModule { }
