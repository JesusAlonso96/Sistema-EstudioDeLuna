import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './comun/material.module';
//modulos de componentes
import { AdministradorModule } from './administrador/modulo-administrador/modulo-administrador.module';
import { EmpleadoModule } from './empleado/modulo-empleado/modulo-empleado.module';
import { SupervisorModule } from './supervisor/modulo-supervisor/modulo-supervisor.module';
import { ComunModule } from './comun/comun.module';

//componentes
import { LoginComponent } from './autenticacion/login/login.component';
import { TokenInterceptor } from './autenticacion/compartido/token.interceptor';
import { ToastrModule } from 'ngx-toastr';

//guardias
import { AutenticacionGuard } from './autenticacion/compartido/autenticacion.guard';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdministradorModule,
    EmpleadoModule,
    SupervisorModule,
    ComunModule,
    ToastrModule.forRoot() // ToastrModule added

  ],
  providers: [
    AutenticacionGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
