import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AltaClienteComponent } from './componentes/alta-cliente/alta-cliente.component';
import { MaterialModule } from './material.module';
import { EstadosService } from './servicios/estados.service';
import { ClienteService } from './servicios/cliente.service';
import { UsuarioService } from './servicios/usuario.service';


@NgModule({
    declarations: [
        AltaClienteComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,  
    ],
    exports: [
        AltaClienteComponent
    ],
    providers: [
        EstadosService,
        ClienteService,
        UsuarioService
    ],
    bootstrap: []
})
export class ComunModule { }
