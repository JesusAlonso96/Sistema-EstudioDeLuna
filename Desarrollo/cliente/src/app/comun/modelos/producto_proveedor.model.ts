import { Proveedor } from './proveedor.model';

export class ProductoProveedor {
    nombre: string;
    costo: number;
    proveedor: Proveedor;
    detalles: string;
    existencias: number;

    constructor() { }
}