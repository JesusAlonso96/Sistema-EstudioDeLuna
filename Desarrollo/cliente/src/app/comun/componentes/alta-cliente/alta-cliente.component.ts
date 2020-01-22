import { Component, OnInit } from '@angular/core';
import { Estado } from '../../modelos/estado.model';
import { Municipio } from '../../modelos/municipio.model';
import { Cliente } from '../../modelos/cliente.model';
import { EstadosService } from '../../servicios/estados.service';
import { ClienteService } from '../../servicios/cliente.service';
import swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-alta-cliente',
  templateUrl: './alta-cliente.component.html',
  styleUrls: ['./alta-cliente.component.scss']
})
export class AltaClienteComponent implements OnInit {
  conFactura: string = 'No';
  estados: Estado[];
  estado: Estado;
  municipios: Municipio[];
  municipio: Municipio;
  cliente: Cliente = new Cliente();
  cargando: boolean = false;
  constructor(private estadosService: EstadosService, private clienteService: ClienteService, private toastr: ToastrService) { }

  ngOnInit() {
    this.cliente.estado = '';
    this.obtenerEstados();
  }
  obtenerEstados() {
    this.estadosService.obtenerEstados().subscribe(
      (estados: Estado[]) => {
        this.estados = estados;
      },
      (err) => {
        this.toastr.error(err.error.detalles, err.error.titulo, { closeButton: true });
      }
    )
  }
  generarContrasena(): string {
    let contrasena = '';
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 14; i++) {
      contrasena += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return contrasena;
  }

  onChange(e) {
    this.conFactura = e.checked ? 'Si' : 'No';
  }
  seleccionoEstado() {
    if (this.estado) return true;
    return false;
  }
  registrarCliente() {
    swal.fire({
      title: 'Registrar cliente',
      text: "No se podra deshacer esta accion",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Registrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.cliente.fecha_registro = new Date(Date.now());
        this.cliente.contrasena = this.generarContrasena();
        this.clienteService.registrarCliente(this.cliente).subscribe(
          (ok) => {
            swal.fire(
              'Registrado',
              'El cliente ha sido registrado exitosamente',
              'success'
            )
          },
          (err) => {
            swal.fire(
              err.error.titulo,
              err.error.detalles,
              'error'
            )
          }
        );
      }
    })

  }
  buscarMunicipios() {
    this.cliente.estado = this.estado.nombre;
    this.cargando = true;
    this.estadosService.obtenerMunicipios(this.estado._id).subscribe(
      (municipios) => {
        this.cargando = false;
        this.municipios = municipios;
      },
      (err) => {
        this.cargando = false;
        this.toastr.error(err.error.detalles, err.error.titulo, { closeButton: true });
      }
    )

  }
  setMunicipio() {
    this.cliente.municipio = this.municipio.nombre;
  }
}
