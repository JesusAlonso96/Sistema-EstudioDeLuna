import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../modelos/producto.model';
import { Familia } from '../modelos/familia.model';
import { Usuario } from '../modelos/usuario.model';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    constructor(private http: HttpClient) { }
    //post
    public agregarNuevoProducto(producto: Producto): Observable<any> {
        return this.http.post('/api/v1/usuarios/agregarProducto', producto);
    }
    public agregarNuevaFamilia(familia: Familia): Observable<any> {
        return this.http.post('/api/v1/usuarios/agregarFamilia', familia);
    }
    public registrarUsuario(usuario: Usuario): Observable<any> {
        return this.http.post('/api/v1/usuarios/registrar', usuario);
    }
    public crearAsistencia(id: string): Observable<any> {
        return this.http.post(`/api/v1/usuarios/crearAsistencia/${id}`, null);
    }
    //get
    public obtenerUsuario(id: string): Observable<any> {
        return this.http.get(`/api/v1/usuarios/obtenerUsuario/${id}`);
    }
    public obtenerUsuarios(): Observable<any> {
        return this.http.get('/api/v1/usuarios/obtenerUsuarios');
    }
    public obtenerPedidosRealizados(): Observable<any> {
        return this.http.get('/api/v1/usuarios/obtenerPedidosRealizados')
    }
    public obtenerFotografos(): Observable<any> {
        return this.http.get('/api/v1/usuarios/obtenerFotografos');
    }
    public obtenerPedidosRealizadosPorFotografo(id: string): Observable<any> {
        return this.http.get(`/api/v1/usuarios/obtenerPedidosRealizadosPorFotografo/${id}`);
    }
    public obtenerPedidosVendidos(filtro: number): Observable<any> {
        return this.http.get(`/api/v1/usuarios/obtenerPedidosVendidos/${filtro}`);
    }
    public obtenerPedidosVendidosPorFotografo(id: string, filtro: number): Observable<any> {
        return this.http.get(`/api/v1/usuarios/obtenerPedidosVendidosPorFotografo/${id}/${filtro}`);
    }
    public obtenerVentasConRetoquePorFotografo(): Observable<any>{
        return this.http.get('/api/v1/usuarios/obtenerVentasConRetoquePorFotografo');
    }
    //patch
    public actualizarProducto(producto: Producto): Observable<any> {
        return this.http.patch('/api/v1/usuarios/actualizarProducto', producto);
    }
    public eliminarUsuario(id: string): Observable<any> {
        return this.http.patch(`/api/v1/usuarios/eliminarUsuario/${id}`, null);
    }
    public editarUsuario(usuario: Usuario): Observable<any> {
        return this.http.patch('/api/v1/usuarios/editarUsuario', usuario);
    }
    //delete
    public eliminarProducto(id: string, idFamilia: string): Observable<any> {
        return this.http.delete(`/api/v1/usuarios/eliminarProducto/${id}/${idFamilia}`);
    }
    public eliminarFamilia(id: string): Observable<any> {
        return this.http.delete(`/api/v1/usuarios/eliminarFamilia/${id}`);
    }
}