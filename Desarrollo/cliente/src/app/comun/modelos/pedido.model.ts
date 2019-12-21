import { Usuario } from './usuario.model';
import { Cliente } from './cliente.model';
import { Producto } from './producto.model';

export class Pedido {
    _id: string;
    fotografo: Usuario;
    cliente: Cliente;
    fecha_creacion: Date;
    fecha_entrega: Date;
    comentarios: String;
    productos: Producto[];
    status: String;
    urgente: Boolean;
    total: Number;
    c_retoque: Boolean;
    c_adherible: Boolean;
    importante: Boolean;
    anticipo: Number;
    foto: any;
    num_pedido: Number;
    metodoPago: String;
    constructor() {
        this.total = 0;
        this.c_retoque = false;
        this.c_adherible = false;
        this.importante = false;
        this.cliente = new Cliente();
        this.productos = [];
        this.fotografo = new Usuario();
        this.comentarios=' ';
        this.foto = '';
    }
}