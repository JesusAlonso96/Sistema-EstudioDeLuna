import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/comun/modelos/pedido.model';
import { EmpleadoService } from '../servicio-empleado/empleado.service';
import { ServicioAutenticacionService } from 'src/app/autenticacion/servicio-autenticacion/servicio-autenticacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleado-pedidos-proceso',
  templateUrl: './empleado-pedidos-proceso.component.html',
  styleUrls: ['./empleado-pedidos-proceso.component.scss']
})
export class EmpleadoPedidosProcesoComponent implements OnInit {
  pedidos: Pedido[];
  cargandoPedidos: boolean;

  constructor(private empleadoService: EmpleadoService, private authService: ServicioAutenticacionService) {
    this.pedidos = [];
    this.cargandoPedidos = false;
   }

  ngOnInit() {
    this.cargandoPedidos = true;
    this.empleadoService.obtenerPedidosEnProceso(this.authService.getIdUsuario()).subscribe(
      (pedidos)=>{
        this.pedidos = pedidos[0].pedido;
        this.cargandoPedidos = false;
      },
      (err)=>{
        Swal.fire({
          title:err.error.titulo,
          text:err.error.detalles,
          type: 'error'
        })
        this.cargandoPedidos = false;

      }
    );
  }

}
