import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ServicioAutenticacionService } from 'src/app/autenticacion/servicio-autenticacion/servicio-autenticacion.service';
export interface Cantidades{
  efectivo: number;
  tarjetas: number;
}
@Component({
  selector: 'app-corte-caja',
  templateUrl: './corte-caja.component.html',
  styleUrls: ['./corte-caja.component.scss']
})
export class CorteCajaComponent implements OnInit {
  fecha = new FormControl(new Date());
  usuario: any ;
  procesado: boolean = false;
  fondo: number;
  constructor(public authService: ServicioAutenticacionService) { }

  ngOnInit() {
    this.usuario = this.authService.getNombreUsuario();
  }
  procesar(){
    this.procesado = !this.procesado;
  }

}
