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
import { ModaDetallesTamComponent } from './modal-detalles-tam/modal-detalles-tam.component';
import { ModalConfirmarCompraComponent } from './modal-confirmar-compra/modal-confirmar-compra.component';
import { ModalGenerarTicketComponent } from './modal-generar-ticket/modal-generar-ticket.component';

export interface DialogData {
  num: number,
  familia: string
}
export interface DialogData2 {
  crear: boolean,
  pedido: Pedido
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
  cargandoPedido: boolean;
  grupo: any[];
  num_fotos: number;
  pagado: Number;
  montoInvalido: boolean;
  imagen: any;
  pedidoCreado: Pedido;
  constructor(private usuarioService: UsuarioService, private toastr: ToastrService, private productosService: ProductosService, private clientesService: ClienteService, private empleadoService: EmpleadoService, public dialog: MatDialog) {
    this.familiaSeleccionada = '';
    this.cargando = false;
    this.cargandoFotografo = false;
    this.cargandoPedido = false;
    this.pedido = new Pedido();
    this.fecha_creacion = '';
    this.fecha_entrega = '';
    this.pagado = 0;
    this.montoInvalido = false;
    this.clientes = [];
    this.pedidoCreado = new Pedido();
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
  obtenerProductosPorTam(nombreFamilia) {
    this.cargando = true;
    this.productosService.obtenerProductosPorTam(nombreFamilia).subscribe(
      (respuesta) => {
        this.grupo = respuesta;
        this.cargando = false;
      },
      () => {
        this.cargando = false;
      }
    );
  }
  obtenerProductosEspeciales(idFamilia) {
    this.cargando = true;
    this.productosService.obtenerProductos(idFamilia).subscribe(
      (productos) => {
        this.grupo = productos;
        this.cargando = false;
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
      if (this.familiaSeleccionada == 'Sesiones') {
        this.obtenerProductosPorTam(nombreFamilia);
      } else {
        this.obtenerProductosEspeciales(idFamilia);
      }

    } else {
      this.obtenerProductosPorCantidad(nombreFamilia);
    }
  }
  esFamiliaEspecial(): boolean {
    if (this.familiaSeleccionada == 'Filiacion' || this.familiaSeleccionada == 'Pasaporte' || this.familiaSeleccionada == 'Visas' || this.familiaSeleccionada == 'Universidades' || this.familiaSeleccionada == 'Visas' || this.familiaSeleccionada == 'Sesiones' || this.familiaSeleccionada == 'Instituciones' || this.familiaSeleccionada == 'Combinadas') return true;
    return false
  }
  pedidoValido() {
    if (this.pedido.c_retoque) {
      this.pedido.status = 'En espera';
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
    if (this.clienteCtrl.value !== null && this.clienteCtrl.value !== '') {
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
  llevaAdherible(): boolean {
    for (let p of this.pedido.productos) {
      if (p.c_ad) {
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
    this.empleadoService.obtenerFotografo(pedidoCreado.fotografo).subscribe(
      (fotografo) => {
        var notificacion: Notificacion = new Notificacion('Nuevo pedido rapido', 'Existe un nuevo pedido rapido, verifica la seccion de pedidos realizados', fotografo, pedidoCreado.fecha_creacion, pedidoCreado.num_pedido, 0);
        this.empleadoService.crearNotificacion(notificacion).subscribe((ok) => { }, (err) => { });
        this.cargandoFotografo = false;
      }, (err) => { });
  }
  mandarNotificaciones(pedidoCreado) {
    this.cargandoFotografo = true;
    this.empleadoService.obtenerFotografos().subscribe(
      (fotografosEncontrados) => {
        this.fotografosDisponibles = fotografosEncontrados
        for (let i = 0; i < this.fotografosDisponibles.length; i++) {
          var notificacion: Notificacion = new Notificacion('Nuevo pedido', 'Existe un nuevo pedido en cola, verifica la seccion de Pedidos en cola', this.fotografosDisponibles[i], pedidoCreado.fecha_creacion, pedidoCreado.num_pedido, 1);
          this.empleadoService.crearNotificacion(notificacion).subscribe(
            (ok) => {
              this.cargandoFotografo = false;
            }, (err) => {
              this.cargandoFotografo = false;
            }
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
      console.log("entre aquiiiiiiiiiiiii")
      this.abrirModalPedido();
    } else {
      this.cargandoFotografo = true;
      var hoy = new Date(Date.now());
      var hoyFormateada = momento(hoy).format('YYYY-MM-DD');
      this.empleadoService.asignarFotografoLibre(hoyFormateada).subscribe(
        (fotografos) => {


          this.asignarFotografoAleatorio(fotografos.length, fotografos);
          this.cargandoFotografo = false;
          this.toastr.success('El pedido sera realizado por ' + <string>this.pedido.fotografo.nombre);
          this.abrirModalPedido();
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
                console.log(aux2)
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
            this.abrirModalPedido();
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
      this.pedido.status = 'En espera';
    } else {
      this.pedido.status = 'Finalizado';
    }
    this.pedido.anticipo = this.pagado;
    return true;
  }
  crearVenta(pedidoCreado) {
    if (!this.pedido.c_retoque) {
      this.empleadoService.crearVenta(pedidoCreado, pedidoCreado.anticipo, pedidoCreado.metodoPago).subscribe((ok) => {
        this.mandarNotificacion(pedidoCreado);
      }, (err) => { });
    } else {
      this.mandarNotificaciones(pedidoCreado);
      //actualizar caja
      this.empleadoService.actualizarCaja(pedidoCreado.anticipo, pedidoCreado.metodoPago).subscribe();
    }
  }
  crearPedido() {
    this.cargandoPedido = true;
    console.log(this.pedido);
    this.empleadoService.crearPedido(this.pedido, this.pedido.fotografo._id).subscribe(
      (pedidoCreado) => {
        if (this.imagen) {
          this.subirImagen(pedidoCreado._id);
        }
        this.toastr.success('El pedido ha sido creado con exito', 'Pedido creado');
        this.crearVenta(pedidoCreado);
        this.abrirModalTicket(pedidoCreado);
        this.cargandoPedido = false;
        this.pedido = new Pedido();
        this.pagado = 0;
      },
      (err) => {
        this.cargandoPedido = false;
        swal.fire(err.error.titulo, err.error.detalles, 'error')
      }
    );
  }
  agregarProducto(producto) {
    this.pedido.total = this.pedido.total + producto.precio;
    this.pedido.productos.push(producto);
    this.pedido.c_retoque = this.tieneRetoque();
    this.pedido.c_adherible = this.llevaAdherible();
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
  abrirModalTicket(pedidoCreado) {
    const dialogRef = this.dialog.open(ModalGenerarTicketComponent, {
      data: { pedido: pedidoCreado }
    });
    dialogRef.afterClosed().subscribe(producto => {

    })
  }
  abrirModalTamano(ancho, alto) {
    const dialogRef = this.dialog.open(ModaDetallesTamComponent, {

      data: { ancho: ancho, alto: alto }
    });
    dialogRef.afterClosed().subscribe(producto => {
      if (producto != null) {
        this.agregarProducto(producto);
      }
    })
  }
  abrirModalPedido() {
    const dialogRef = this.dialog.open(ModalConfirmarCompraComponent, {
      data: {
        crear: false,
        pedido: this.pedido
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
    return true;
  }
  abrirCrearPedido() {
    this.generarFechaEntrega();
    this.obtenerCliente();
    this.asignarValoresDefault();
    if (this.pedidoValido()) {
      this.asignarFotografo();
    }
  }
  //SECCION PARA IMAGENES
  obtenerImagen(e) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      this.imagen = file;
      console.log(this.imagen)
    }
  }
  subirImagen(id) {
    const image = new FormData();
    image.append('image', this.imagen);
    this.empleadoService.crearFoto(image, id).subscribe(
      () => {

      },
      () => {

      }
    );
  }
}

//MODALES
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
    console.log(this.productoBuscar)
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
