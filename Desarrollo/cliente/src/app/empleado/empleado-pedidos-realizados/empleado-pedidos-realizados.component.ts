import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../servicio-empleado/empleado.service';
import { Pedido } from 'src/app/comun/modelos/pedido.model';
import { ServicioAutenticacionService } from 'src/app/autenticacion/servicio-autenticacion/servicio-autenticacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleado-pedidos-realizados',
  templateUrl: './empleado-pedidos-realizados.component.html',
  styleUrls: ['./empleado-pedidos-realizados.component.scss']
})
export class EmpleadoPedidosRealizadosComponent implements OnInit {
  status = ['En retoque','Imprimiendo', 'Adherible', 'Finalizado','Vendido']
  pedidos: any[];
  cargandoPedidos: boolean;
  constructor(private empleadoService: EmpleadoService, private autenticacionService: ServicioAutenticacionService) {
    this.pedidos = [];
    this.cargandoPedidos = false;
  }

  ngOnInit() {
    this.cargandoPedidos = true
    this.empleadoService.obtenerPedidosRealizados(this.autenticacionService.getIdUsuario()).subscribe(
      (pedidos) => {
        this.pedidos = pedidos[0].pedido;
        this.cargandoPedidos = false;
        this.statusActual(0);
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
  statusActual(indicePedido){
    let indice = 0;
    for(let i =0 ; i < this.status.length; i++){
      if(this.status[i] == this.pedidos[indicePedido].status){
        indice = i;
        break;
      }
    }
    console.log(indice);
  }
  ultimo(indice): boolean{
    if(indice == (this.status.length - 1)){
      return true;
    }
    return false;
  }

}
