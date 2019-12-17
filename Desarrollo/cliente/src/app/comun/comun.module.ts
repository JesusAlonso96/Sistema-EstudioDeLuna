import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//componentes
import { AltaClienteComponent } from './componentes/alta-cliente/alta-cliente.component';
import { NotaCompraComponent } from './componentes/nota-compra/nota-compra.component';
import { CatalogoFamiliasComponent } from './componentes/catalogo-familias/catalogo-familias.component';
import { CatalogoProductosComponent } from './componentes/catalogo-productos/catalogo-productos.component';
import { InfoSucursalesComponent } from './componentes/info-sucursales/info-sucursales.component';

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
        PaginacionPipe
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
    ],
    providers: [
        EstadosService,
        ClienteService,
        UsuarioService,

    ],
    bootstrap: []
})
export class ComunModule { }
