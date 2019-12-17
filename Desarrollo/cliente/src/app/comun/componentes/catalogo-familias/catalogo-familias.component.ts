import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../servicios/productos.service';
import { Familia } from '../../modelos/familia.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-catalogo-familias',
  templateUrl: './catalogo-familias.component.html',
  styleUrls: ['./catalogo-familias.component.scss']
})
export class CatalogoFamiliasComponent implements OnInit {
  familias: Familia[];
  cargando: boolean = false;

  constructor(private productosService: ProductosService, private toastr: ToastrService) {
    this.familias = [];
   }

  ngOnInit() {
    this.obtenerFamilias();
  }
  obtenerFamilias(){
    this.cargando = true;
    this.productosService.obtenerFamiliasProductos().subscribe(
      (familias)=>{
        this.familias = familias;
        this.cargando = false;
      },
      (err)=>{
        this.toastr.error(err.error.detalles, err.error.titulo)
      }
    );
  }

}
