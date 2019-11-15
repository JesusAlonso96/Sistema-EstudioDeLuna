import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../servicio-empleado/empleado.service';
import { Notificacion } from 'src/app/comun/modelos/notificacion.model';
import { ServicioAutenticacionService } from 'src/app/autenticacion/servicio-autenticacion/servicio-autenticacion.service';
import * as momento from 'moment';
declare var $: any;
@Component({
  selector: 'app-empleado-notificaciones',
  templateUrl: './empleado-notificaciones.component.html',
  styleUrls: ['./empleado-notificaciones.component.scss']
})
export class EmpleadoNotificacionesComponent implements OnInit {
  notificaciones: Notificacion[];
  constructor(private empleadoService: EmpleadoService, private autService: ServicioAutenticacionService) {
    this.notificaciones = [];
  }

  ngOnInit() {
    var hoy = new Date();
    var fecha = momento(hoy).format('YYYY-MM-DD');
    this.empleadoService.obtenerNotificaciones(this.autService.getIdUsuario(), fecha).subscribe(
      (notificaciones) => {
        this.notificaciones = notificaciones;
        console.log(notificaciones)
      }
    );
    $(document).ready(function () {
      $(".on").click(function () {
        $(this).toggleClass("open");
        $("#notificationMenu").toggleClass("open");
      });
    });
  }


}
