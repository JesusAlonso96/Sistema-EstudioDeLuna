import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { Usuario } from 'src/app/comun/modelos/usuario.model';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/comun/servicios/usuario.service';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';

@Component({
  selector: 'app-usuarios-consulta',
  templateUrl: './usuarios-consulta.component.html',
  styleUrls: ['./usuarios-consulta.component.scss']
})
export class UsuariosConsultaComponent implements OnInit {
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['nombre', 'ape_pat', 'ape_mat', 'rol', 'acciones'];
  usuarios: Usuario[];
  busquedaUsuario: string = '';
  cargando: boolean = false;

  constructor(public dialog: MatDialog, private usuarioService: UsuarioService, private toastr: ToastrService) { }

  ngOnInit() {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.cargando = true;
    this.usuarioService.obtenerUsuarios().subscribe(
      (usuarios) => {
        this.cargando = false;
        this.usuarios = usuarios;
        this.inicializarTabla();
      },
      (err) => {
        this.cargando = false;
        this.toastr.error(err.error.detalles, err.error.titulo, { closeButton: true });
      }
    );
  }
  aplicarFiltro() {
    this.listData.filter = this.busquedaUsuario.trim().toLowerCase();
  }
  borrarBusqueda() {
    this.busquedaUsuario = '';
    this.aplicarFiltro();
  }
  abrirEditarUsuario(usuario: Usuario) {
    console.log("usuario original", usuario)
    const usuarioAux: Usuario = new Usuario(usuario._id, usuario.nombre, usuario.username, usuario.ape_pat, usuario.ape_mat, usuario.email, usuario.telefono, usuario.rol, usuario.rol_sec, usuario.ocupado, usuario.asistencia, usuario.pedidosTomados, usuario.activo);
    console.log("usuario auxiliar", usuarioAux)
    const dialogRef = this.dialog.open(EditarUsuarioComponent, {
      data: usuario
    })
    dialogRef.afterClosed().subscribe(respuesta => {
      if (respuesta) {
        this.editarUsuario(usuario, usuarioAux);
      } else {
        this.restablecerDatosUsuario(usuario, usuarioAux);
      }
    })
  }
  editarUsuario(usuario: Usuario, usuarioAuxiliar: Usuario) {
    this.cargando = true;
    this.usuarioService.editarUsuario(usuario).subscribe(
      (usuarioActualizado) => {
        this.cargando = false;
        this.toastr.success(usuarioActualizado.detalles, usuarioActualizado.titulo, { closeButton: true });
      },
      (err) => {
        this.cargando = false;
        this.toastr.error(err.error.detalles, err.error.titulo, { closeButton: true });
        this.restablecerDatosUsuario(usuario, usuarioAuxiliar);
      }
    );
  }

  restablecerDatosUsuario(usuario: Usuario, usuarioAuxiliar: Usuario) {
    const indice = this.usuarios.indexOf(usuario);
    this.usuarios[indice] = usuarioAuxiliar;
    this.listData.data = this.usuarios;
  }
  inicializarTabla() {
    this.listData = new MatTableDataSource(this.usuarios);
    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;
    this.listData.filterPredicate = (usuario: Usuario, filtro: string) => {
      return usuario.nombre.trim().toLowerCase().indexOf(filtro) !== -1;
    }
  }
}
