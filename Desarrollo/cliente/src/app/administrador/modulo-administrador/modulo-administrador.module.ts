import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/comun/material.module';
import { AdministradorPerfilComponent } from '../administrador-perfil/administrador-perfil.component';
import { AdministradorRoutingModule } from './administrador-routing.module';
import { AdministradorService } from '../servicio-administrador/servicio-administrador.service';
import { AdministradorComponent } from '../administrador.component';
import { MainNavAdminComponent } from '../main-nav-admin/main-nav-admin.component';
import { AdminGuard } from '../compartido/admin.guard';
import { AutenticacionGuard } from 'src/app/autenticacion/compartido/autenticacion.guard';



@NgModule({
  declarations: [
    AdministradorComponent,
    AdministradorPerfilComponent,
    MainNavAdminComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    AdministradorRoutingModule
  ],
  providers: [
    AdministradorService,
    AdminGuard,
    AutenticacionGuard
  ]
})
export class AdministradorModule { }
