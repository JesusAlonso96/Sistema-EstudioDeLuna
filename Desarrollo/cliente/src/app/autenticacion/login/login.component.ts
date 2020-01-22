import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/comun/servicios/usuario.service';
import { UsuarioLogin } from '../compartido/usuarioLogin.model';
import { ServicioAutenticacionService } from '../servicio-autenticacion/servicio-autenticacion.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  cargando: boolean;
  datosUsuario: UsuarioLogin;

  constructor(private autServicio: ServicioAutenticacionService, private usuarioService: UsuarioService, private toastr: ToastrService) { }

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
      (usr) => {
        this.usuarioService.crearAsistencia(this.autServicio.getIdUsuario()).subscribe((ok) => { }, (err) => { });
        this.cargando = false;
        this.toastr.success('', 'Bienvenido', { closeButton: true });
        this.autServicio.redireccionarUsuario();
      },
      (err) => {
        this.cargando = false;
        this.toastr.error(err.error.detalles, err.error.titulo, { closeButton: true });
      }
    )
  }

}
