import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../servicios/productos.service';
import { ToastrService } from 'ngx-toastr';
import { Familia } from '../../modelos/familia.model';
import { Producto } from '../../modelos/producto.model';
import { PageEvent, MatDialog } from '@angular/material';
import { ModalDetallesProductoComponent } from 'src/app/empleado/empleado-venta/modal-detalles-producto/modal-detalles-producto.component';
export interface Agrupados {
  familia: Familia;
  productos: Producto;
}
@Component({
  selector: 'app-catalogo-productos',
  templateUrl: './catalogo-productos.component.html',
  styleUrls: ['./catalogo-productos.component.scss']
})
export class CatalogoProductosComponent implements OnInit {
  familias: Familia[];
  agrupados: Agrupados[];
  page_size: number = 12;
  page_number: number = 1;
  tabLoadTimes: Date[] = [];
  paginadorDesactivado: boolean = false;
  cargando: boolean = false;
  constructor(private productosService: ProductosService, private toastr: ToastrService, private dialog: MatDialog) {
    this.familias = [];
  }

  ngOnInit() {
    this.obtenerFamiliasYProductos();
  }
  obtenerFamiliasYProductos() {
    this.cargando = true;
    this.productosService.obtenerProductosPorFamilia().subscribe(
      (productos) => {
        this.cargando = false;
        this.agrupados = productos;
      }
    );
  }
  verDetalles(producto) {
    this.dialog.open(ModalDetallesProductoComponent, {
      data: { producto }
    })
  }

}
