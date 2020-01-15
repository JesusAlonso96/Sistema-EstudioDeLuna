import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/comun/modelos/usuario.model';
import { UsuarioService } from 'src/app/comun/servicios/usuario.service';

@Component({
  selector: 'app-alta-usuario',
  templateUrl: './alta-usuario.component.html',
  styleUrls: ['./alta-usuario.component.scss']
})
export class AltaUsuarioComponent implements OnInit {
  hide: boolean = true;
  hide2: boolean = true;
  usuario: Usuario = new Usuario();
  confirmarContra: string;
  cargando: boolean = false;

  constructor(private toastr: ToastrService, private usuarioService: UsuarioService) { }
  
  ngOnInit() {
    this.valoresPorDefecto();
  }
  registrarUsuario(formulario: NgForm) {
    this.cargando = true;
    if (!this.rolValido()) {
      this.toastr.error('Favor de elegir el rol', '', { closeButton: true });
      return false;
    }
    if (!this.contrasenaValida()) {
      this.toastr.error('Las contraseñas no coinciden', '', { closeButton: true });
      return false;
    }
    this.usuarioService.registrarUsuario(this.usuario).subscribe(
      (usuarioRegistrado) => {
        this.toastr.success(usuarioRegistrado.detalles, usuarioRegistrado.titulo, { closeButton: true });
        this.cargando = false;
        this.usuario = new Usuario();
        this.valoresPorDefecto();
        this.confirmarContra = '';
        formulario.resetForm();
      },
      (err) => {
        this.toastr.error(err.error.detalles, err.error.titulo, { closeButton: true });
        this.cargando = false;
      }
    );

  }
  valoresPorDefecto() {
    this.usuario.rol_sec = 0;
  }
  rolValido(): boolean {
    if (this.usuario.rol == 0) {
      if (this.usuario.rol_sec != 0) return true;
      return false;
    } else return true;
  }
  contrasenaValida(): boolean {
    if (this.usuario.contrasena == this.confirmarContra) return true;
    return false;
  }
}
