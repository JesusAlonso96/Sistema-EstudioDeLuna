import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../servicio-empleado/empleado.service';
import { Pedido } from 'src/app/comun/modelos/pedido.model';
import { ServicioAutenticacionService } from 'src/app/autenticacion/servicio-autenticacion/servicio-autenticacion.service';
import Swal from 'sweetalert2';
import {environment} from '../../../environments/environment'
import { MatDialog } from '@angular/material';
import { DetallesModalComponent } from '../empleado-pedidos-proceso/detalles-modal/detalles-modal.component';

@Component({
  selector: 'app-empleado-pedidos-realizados',
  templateUrl: './empleado-pedidos-realizados.component.html',
  styleUrls: ['./empleado-pedidos-realizados.component.scss']
})
export class EmpleadoPedidosRealizadosComponent implements OnInit {
  status = ['En retoque','Imprimiendo', 'Adherible', 'Finalizado','Vendido']
  pedidos: any[];
  cargandoPedidos: boolean;
  url_fotos: string;
  parametroBusqueda: string;
  constructor(public dialog: MatDialog,private empleadoService: EmpleadoService, private autenticacionService: ServicioAutenticacionService) {
    this.pedidos = [];
    this.parametroBusqueda = '';
    this.cargandoPedidos = false;
    this.url_fotos = environment.url_fotos;
  }

  ngOnInit() {
    this.cargandoPedidos = true
    this.empleadoService.obtenerPedidosRealizados(this.autenticacionService.getIdUsuario()).subscribe(
      (pedidos) => {
        this.pedidos = pedidos[0].pedido;
        this.cargandoPedidos = false;
        console.log(this.pedidos);
      },
      (err) => {
        Swal.fire({
          title: err.error.titulo,
          text: err.error.detalles,
          type: 'info'
        })
        this.cargandoPedidos = false;

      }
    );

  }
  borrarBusqueda(){
    this.parametroBusqueda = '';
  }
  verDetalles(pedido){
    console.log(pedido._id)
    this.empleadoService.obtenerProductosPorPedido(pedido._id).subscribe(
      (productos)=>{
        pedido.productos = productos;
        console.log(pedido.productos)
        const dialogRef = this.dialog.open(DetallesModalComponent, {
          width:'60%',
          data: pedido
        });
      },
      ()=>{

      }
    );
  }
}
