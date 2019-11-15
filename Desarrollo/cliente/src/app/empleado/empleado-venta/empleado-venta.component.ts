import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ProductosService } from '../../comun/servicios/productos.service';
import { Producto } from 'src/app/comun/modelos/producto.model';
import { Familia } from 'src/app/comun/modelos/familia.model';
import * as momento from 'moment';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import swal from 'sweetalert2';
import { Pedido } from 'src/app/comun/modelos/pedido.model';
import { EmpleadoService } from '../servicio-empleado/empleado.service';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/comun/modelos/usuario.model';
import { Cliente } from 'src/app/comun/modelos/cliente.model';
import { ClienteService } from 'src/app/comun/servicios/cliente.service';
import { UsuarioService } from 'src/app/comun/servicios/usuario.service';
import Swal from 'sweetalert2';
import { Notificacion } from 'src/app/comun/modelos/notificacion.model';
import { ModalDetallesProductoComponent } from './modal-detalles-producto/modal-detalles-producto.component';

export interface DialogData {
  num: number,
  familia: string
}
export interface DialogData2 {
  crear: boolean,
  fecha_creacion: string,
  fecha_entrega: string,
  cliente: Cliente,
  productos: Producto[],
  total: Number,
  anticipo: Number,
  fotografo: Usuario
}
export interface DialogData3 {
  pedido: Pedido;
}
@Component({
  selector: 'app-empleado-venta',
  templateUrl: './empleado-venta.component.html',
  styleUrls: ['./empleado-venta.component.scss']
})
export class EmpleadoVentaComponent implements OnInit {
  familias: Familia[];
  pedido: Pedido;
  clientes: Cliente[];
  clientesFiltrados: Observable<Cliente[]>;
  clienteCtrl = new FormControl();
  familiaSeleccionada: String;
  productos: Producto[];
  fecha_creacion: string;
  fecha_entrega: string;
  fotografosDisponibles: Usuario[];
  cargando: boolean;
  cargandoFotografo: boolean;
  grupo: any[];
  num_fotos: number;
  pagado: Number;
  montoInvalido: boolean;
  constructor(private usuarioService: UsuarioService, private toastr: ToastrService, private productosService: ProductosService, private clientesService: ClienteService, private empleadoService: EmpleadoService, public dialog: MatDialog) {
    this.familiaSeleccionada = '';
    this.cargando = false;
    this.cargandoFotografo = false;
    this.pedido = new Pedido();
    this.fecha_creacion = '';
    this.fecha_entrega = '';
    this.pagado = 0;
    this.montoInvalido = false;
    this.clientes = [];
    this.clientesService.obtenerClientes().subscribe(
      (clientes) => {
        this.clientes = clientes;
      }
    );
    this.clientesFiltrados = this.clienteCtrl.valueChanges
      .pipe(
        startWith(''),
        map(cliente => cliente ? this._clientesFiltrados(cliente) : this.clientes.slice())
      );
  }

  ngOnInit() {
    this.cargando = true;
    this.productosService.obtenerFamiliasProductos().subscribe(
      (familias) => {
        this.familias = familias;
        this.cargando = false;
      },
      (err) => {
        swal.fire({
          type: 'error',
          title: err.error.titulo,
          text: err.error.detalles,
        })
        this.cargando = false;
      }
    )

  }
  private _clientesFiltrados(value: string): Cliente[] {
    const filterValue = value.toLowerCase();
    return this.clientes.filter(cliente => cliente.nombre.toLowerCase().indexOf(filterValue) === 0);
  }
  obtenerProductosPorCantidad(nombreFamilia) {
    this.cargando = true;
    this.productosService.obtenerProductosPorCantidad(nombreFamilia).subscribe(
      (respuesta) => {
        this.grupo = respuesta;
        this.cargando = false;
      },
      () => {
        this.cargando = false;
      }
    )
  }
  obtenerProductosEspeciales(idFamilia) {
    this.cargando = true;
    this.productosService.obtenerProductos(idFamilia).subscribe(
      (productos) => {
        this.grupo = productos;
        this.cargando = false;
        console.log(this.grupo);

      },
      () => {
        this.cargando = false;

      }
    );
  }
  obtenerProductos(nombreFamilia, idFamilia) {
    this.grupo = [];
    this.familiaSeleccionada = nombreFamilia;
    //si es filiacion
    if (this.esFamiliaEspecial()) {
      this.obtenerProductosEspeciales(idFamilia);
    } else {
      this.obtenerProductosPorCantidad(nombreFamilia);
    }
  }
  esFamiliaEspecial(): boolean {
    if (this.familiaSeleccionada == 'Filiacion' || this.familiaSeleccionada == 'Pasaporte' || this.familiaSeleccionada == 'Visas' || this.familiaSeleccionada == 'Universidades' || this.familiaSeleccionada == 'Visas' || this.familiaSeleccionada == 'Sesiones' || this.familiaSeleccionada == 'Instituciones') return true;
    return false
  }
  pedidoValido() {
    if (this.pedido.c_retoque) {
      this.pedido.status = 'En retoque';
      if (this.pedido.importante) {
        this.pedido.total = <number>this.pedido.total + 30;
        this.toastr.warning("Se agregaron $30 pesos por ser pedido urgente")
      }
      //verificar que el total y el anticipo
      if (this.pagado > this.pedido.total) {
        this.pedido.total = <number>this.pedido.total - 30;
        this.toastr.error("El anticipo es mayor al total del pedido");
        return false;
      }
    } else {
      this.pedido.status = 'Finalizado';
      if (this.pagado < this.pedido.total || this.pagado > this.pedido.total) {
        this.toastr.error("Debes cubrir el monto exacto");
        return false;
      }
    }
    return true;
  }
  obtenerCliente() {
    if (this.clienteCtrl.value !== null) {
      var valores = this.clienteCtrl.value;
      var separado = valores.split(" | ", 2);
      this.clientesService.obtenerClientePorEmailYNombre(separado[0], separado[1]).subscribe(
        (cliente) => {
          this.pedido.cliente = cliente;
        },
        (err) => {
        }
      );
    } else {
      this.pedido.cliente = null;
    }
    return true;
  }
  tieneRetoque(): boolean {
    for (let p of this.pedido.productos) {
      if (p.c_r) {
        return true;
      }
    }
    return false;
  }
  generarFechaEntrega() {
    if (this.pedido.c_retoque) { // si tiene retoque
      this.pedido.fecha_creacion = new Date(Date.now());
      if (this.pedido.importante) { //si tiene retoque y es un pedido importante
        //si es sabado no se cierra a medio dia
        if (momento(this.pedido.fecha_creacion).day() == 6) { //si es sabado se agrega la hora normal
          this.pedido.fecha_entrega = momento(this.pedido.fecha_creacion).add(60, 'm').toDate();
        } else {
          var aux = momento(this.pedido.fecha_creacion).add(60, 'm').toDate();
          if (aux.getHours() >= 14) {
            aux.setHours(16);
            aux.setMinutes(0);
            aux.setSeconds(0);
            this.pedido.fecha_entrega = aux;
          } else if (aux.getHours() >= 20) {
            aux.setHours(12);
            aux.setMinutes(0);
            aux.setSeconds(0);
            aux = momento(this.pedido.fecha_creacion).add(1, 'days').toDate();
          } else {
            this.pedido.fecha_entrega = momento(this.pedido.fecha_creacion).add(60, 'm').toDate();
          }
        }
      } else {
        //si no es importante y es sabado
        let domingo = momento(this.pedido.fecha_creacion).add(1, 'days');
        //si el siguiente dia es domingo se recorre al lunes
        if (domingo.day() == 0) {
          var a = momento(this.pedido.fecha_creacion).add(2, 'days').toDate();
        } else {
          var a = momento(this.pedido.fecha_creacion).add(1, 'days').toDate();
        }
        a.setMinutes(0);
        a.setSeconds(0);
        if (a.getHours() < 14) {
          a.setHours(12);
        } else if (a.getHours() >= 14) {
          a.setHours(18);
        }
        this.pedido.fecha_entrega = a;
      }
    } else {
      this.pedido.fecha_creacion = new Date(Date.now());
      this.pedido.fecha_entrega = momento(this.pedido.fecha_creacion).add(15, 'm').toDate();

    }
    this.fecha_creacion = momento(this.pedido.fecha_creacion).locale('es').format('LLLL');
    this.fecha_entrega = momento(this.pedido.fecha_entrega).locale('es').format('LLLL');
    return true;
  }
  asignarFotografoAleatorio(num_fotografos, fotografos) {
    var random = Math.floor(Math.random() * num_fotografos) + 0;
    this.pedido.fotografo = fotografos[random];
  }
  mandarNotificacion(pedidoCreado) {
    this.cargandoFotografo = true;
    console.log(pedidoCreado);
    this.empleadoService.obtenerFotografo(pedidoCreado.fotografo).subscribe(
      (fotografo) => {
        var notificacion: Notificacion = new Notificacion('Nuevo pedido rapido', 'Existe un nuevo pedido rapido, verifica la seccion de pedidos realizados', fotografo, pedidoCreado.fecha_creacion, pedidoCreado.num_pedido);
        this.empleadoService.crearNotificacion(notificacion).subscribe((ok) => {
          console.log(ok)
        }, (err) => { }
        );
      },
      (err) => {
        console.log(err)
      }
    );

  }
  mandarNotificaciones(pedidoCreado) {
    this.cargandoFotografo = true;
    this.empleadoService.obtenerFotografos().subscribe(
      (fotografosEncontrados) => {
        this.fotografosDisponibles = fotografosEncontrados
        for (let i = 0; i < this.fotografosDisponibles.length; i++) {
          var notificacion: Notificacion = new Notificacion('Nuevo pedido', 'Existe un nuevo pedido en cola, verifica la seccion de Pedidos en cola', this.fotografosDisponibles[i], pedidoCreado.fecha_creacion, pedidoCreado.num_pedido);
          this.empleadoService.crearNotificacion(notificacion).subscribe(
            (ok) => {
              this.cargandoFotografo = false;

            }, (err) => { }
          );
        }
      },
      (err) => {
        Swal.fire({ title: err.error.titulo, text: err.error.detalles, type: 'error' });
      }
    );
  }
  asignarFotografo() {
    if (this.pedido.c_retoque) {
      this.pedido.fotografo._id = undefined;
    } else {
      this.cargandoFotografo = true;
      var hoy = new Date(Date.now());
      var hoyFormateada = momento(hoy).format('YYYY-MM-DD');
      this.empleadoService.asignarFotografoLibre(hoyFormateada).subscribe(
        (fotografos) => {
          this.asignarFotografoAleatorio(fotografos.length, fotografos);
          this.cargandoFotografo = false;
          this.toastr.success('El pedido sera realizado por ' + <string>this.pedido.fotografo.nombre);
          return true;
        },
        (err) => {
          if (err.error.titulo == 'No hay ningun fotografo desocupado') {
            this.empleadoService.numPedidosFotografo().subscribe(
              (conteo) => {
                var aux = 1000000000000000000000000000000;
                var aux2 = conteo;
                for (let i = 0; i < conteo.length; i++) {
                  if (conteo[i].count < aux) {
                    aux = conteo[i].count;
                    aux2 = conteo[i];
                  }
                }
                this.usuarioService.obtenerUsuario(aux2._id).subscribe(
                  (fotografo) => {
                    this.pedido.fotografo = fotografo;
                    this.toastr.success('El pedido sera realizado por ' + <string>this.pedido.fotografo.nombre);
                  }
                );
                this.cargandoFotografo = false;
              },
              () => {

              }
            );
            return false;
          }
        }
      );
    }
    return true;
  }
  quitarProducto(item) {
    var i = this.pedido.productos.indexOf(item);
    this.pedido.total = <any>this.pedido.total - <any>this.pedido.productos[i].precio;
    this.pedido.productos.splice(i, 1);
    this.pedido.c_retoque = this.tieneRetoque();
    this.pedido.importante = false;
  }
  agregarPedidoUrgente() {
    this.pedido.total = <number>this.pedido.total + 30;
  }
  asignarValoresDefault() {
    if (this.pedido.c_retoque) {
      this.pedido.status = 'En retoque';
    } else {
      this.pedido.status = 'Finalizado';
    }
    this.pedido.anticipo = this.pagado;
    return true;
  }
  crearVenta() {
    if (!this.pedido.c_retoque) {

    }
  }
  crearPedido() {
    this.empleadoService.crearPedido(this.pedido, this.pedido.fotografo._id).subscribe(
      (pedidoCreado) => {
        swal.fire('Pedido creado', 'El pedido ha sido creado con exito', 'success')
        if (!this.pedido.c_retoque) {
          this.empleadoService.crearVenta(pedidoCreado).subscribe((ok) => {
            this.mandarNotificacion(pedidoCreado);
          }, (err) => {
            console.log(err);
          });
        } else {
          this.mandarNotificaciones(pedidoCreado);
        }
        this.pedido = new Pedido();
      },
      (err) => {
        swal.fire(err.error.titulo, err.error.detalles, 'error')
      }
    );
  }
  agregarProducto(producto) {
    this.pedido.total = this.pedido.total + producto.precio;
    this.pedido.productos.push(producto);
    this.pedido.c_retoque = this.tieneRetoque();
  }
  //MODAL PARA VER LOS PRODUCTOS
  verDetalles(producto) {
    const dialogRef = this.dialog.open(ModalDetallesProductoComponent, {
      data: { producto }
    });

  }
  abrirModal(num_fotos) {
    const dialogRef = this.dialog.open(Modal, {
      height: '55%',
      width: '55%',
      data: { num: num_fotos, familia: this.familiaSeleccionada }
    });
    dialogRef.afterClosed().subscribe(producto => {
      if (producto != null) {
        this.agregarProducto(producto);
      }
    })
  }
  abrirModalPedido() {
    const dialogRef = this.dialog.open(Modal2, {
      data: {
        crear: false,
        fecha_creacion: this.fecha_creacion,
        fecha_entrega: this.fecha_entrega,
        cliente: this.pedido.cliente,
        productos: this.pedido.productos,
        total: this.pedido.total,
        anticipo: this.pedido.anticipo,
      }
    });
    dialogRef.afterClosed().subscribe(crear => {
      if (crear) {
        this.crearPedido();

      } else {
        if (this.pedido.c_retoque && this.pedido.importante) {
          this.pedido.total = <number>this.pedido.total - 30;
        }
        this.pedido = new Pedido();
      }
    })
  }
  abrirCrearPedido() {
    if (this.generarFechaEntrega() && this.obtenerCliente() && this.asignarValoresDefault() && this.pedidoValido() && this.asignarFotografo()) {
      this.abrirModalPedido();
    }
  }
}
@Component({
  selector: 'modal',
  templateUrl: 'modal.html',
  styleUrls: ['modal.scss']
})
export class Modal {
  buscador: boolean = false;
  productoBuscar: any;
  productosEncontrados: Producto;
  error: Array<any>;
  constructor(
    public dialogRef: MatDialogRef<Modal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private productoService: ProductosService) {
    this.productoBuscar = new Producto();
    this.productoBuscar.num_fotos = this.data.num;
    this.productoBuscar.familia = this.data.familia;
    this.buscador = false;
  }
  onNoClick(): void {
    this.productoBuscar = null;
    this.dialogRef.close();
  }
  buscar() {
    this.productosEncontrados = null;
    this.error = null;
    this.buscador = true;
    this.productoService.buscarProducto(this.productoBuscar).subscribe(
      (productos) => {
        this.productosEncontrados = productos;
        this.buscador = false;
      },
      (err) => {
        this.error = err.error;
        this.buscador = false;
      }
    )
  }
}
@Component({
  selector: 'modal2',
  templateUrl: 'modal2.html',
  styleUrls: ['modal2.scss']

})
export class Modal2 {
  buscador: boolean = false;
  productoBuscar: any;
  error: Array<any>;
  constructor(
    public dialogRef: MatDialogRef<Modal2>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData2) {
    this.data.crear = true;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
