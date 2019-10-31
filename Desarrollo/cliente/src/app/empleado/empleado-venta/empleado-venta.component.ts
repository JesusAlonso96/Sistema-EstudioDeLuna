import { Component, OnInit, Inject } from '@angular/core';
import { ProductosService } from '../../comun/servicios/productos.service';
import { Producto } from 'src/app/comun/modelos/producto.model';
import { Familia } from 'src/app/comun/modelos/familia.model';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import swal from 'sweetalert2';
export interface DialogData {
  num: number,
  familia: string
}
@Component({
  selector: 'app-empleado-venta',
  templateUrl: './empleado-venta.component.html',
  styleUrls: ['./empleado-venta.component.scss']
})
export class EmpleadoVentaComponent implements OnInit {
  familias: Familia[];
  familiaSeleccionada: String;
  productos: Producto[];
  cargandoProductos: boolean;
  grupo: any[];
  num_fotos: number;
  constructor(private productosService: ProductosService, public dialog: MatDialog) {
    this.familiaSeleccionada = '';
    this.cargandoProductos = false;
  }

  ngOnInit() {
    this.productosService.obtenerFamiliasProductos().subscribe(
      (familias) => {
        this.familias = familias;
      },
      (err) => {
        swal.fire({
          type: 'error',
          title: err.error.titulo,
          text: err.error.detalles,
        })
      }
    )
  }
  obtenerProductosPorCantidad(nombre) {
    this.cargandoProductos = true;
    this.productosService.obtenerProductosPorCantidad(nombre).subscribe(
      (respuesta) => {
        console.log(respuesta);
        this.grupo = respuesta;
        this.cargandoProductos = false;
      },
      () => {
        this.cargandoProductos = false;
      }
    )
  }
  obtenerProductos(nombre) {
    this.grupo = [];
    this.familiaSeleccionada = nombre;
    this.obtenerProductosPorCantidad(nombre);
  }
  //MODAL PARA VER LOS PRODUCTOS
  abrirModal(num_fotos) {
    const dialogRef = this.dialog.open(Modal, {
      width: '400px',
      height: '70%',
      data: { num: num_fotos, familia: this.familiaSeleccionada }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("dialogo cerrado");

    })
  }
}


@Component({
  selector: 'modal',
  templateUrl: 'modal.html',
  styleUrls: ['modal.scss']

})
export class Modal {
  buscador: boolean = false;
  productoBuscar: any;
  constructor(
    public dialogRef: MatDialogRef<Modal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private productoService: ProductosService) {
     this.productoBuscar = new Producto();
     this.productoBuscar.num_fotos = this.data.num;
     this.productoBuscar.familia = this.data.familia;
     }
  onNoClick(): void {
    this.dialogRef.close();
  }
  buscar() {
    this.buscador = true;
    this.productoService.buscarProducto(this.productoBuscar).subscribe(
      (ok)=>{
        console.log(ok);
      },
      (err)=>{
        console.log(err);
      }
    )
    /*switch(this.data.familia){
      case 'Infantil':
        this.productoBuscar.nombre = 'Infantil';
        this.productoBuscar.num_fotos = this.data.num;
    }*/
    

  }
}