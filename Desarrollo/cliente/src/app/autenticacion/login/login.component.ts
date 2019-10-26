import { Component, OnInit } from '@angular/core';
import { UsuarioLogin } from '../compartido/usuarioLogin.model';
import { ServicioAutenticacionService } from '../servicio-autenticacion/servicio-autenticacion.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  cargando: boolean;
  datosUsuario: UsuarioLogin;

  constructor(private autServicio: ServicioAutenticacionService) { }

  ngOnInit() {
    this.cargando = false;
    this.datosUsuario = new UsuarioLogin();
  }
  estaLogueado(): boolean {
    return this.autServicio.estaAutenticado()
  }
  login() {
    this.cargando = true;
    this.autServicio.login(this.datosUsuario).subscribe(
      () => {
        this.cargando = false;
        swal.fire({
          position: 'top-end',
          type: 'success',
          title: 'Bienvenido',
          showConfirmButton: false,
          timer: 1100
        })
        this.autServicio.redireccionarUsuario();
      },
      (err) => {
        this.cargando = false;
        swal.fire({
          position: 'top-end',
          type: 'error',
          title: err.error.titulo,
          text: err.error.detalles,
          showConfirmButton: false,
          timer: 1100
        })
      }
    )
  }

}
