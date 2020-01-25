import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/comun/modelos/usuario.model';
import { CorteCaja } from 'src/app/comun/modelos/corte_caja.model';
import { Proveedor } from 'src/app/comun/modelos/proveedor.model';
import { ProductoProveedor } from 'src/app/comun/modelos/producto_proveedor.model';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  constructor(private http: HttpClient) { }
  //post
  public crearUsuario(usuario: Usuario): Observable<any> {
    return this.http.post('/api/v1/admins/empleado', usuario);
  }
  public crearCorteCaja(corteCaja: CorteCaja): Observable<any> {
    return this.http.post('/api/v1/admins/crearCorteCaja', corteCaja);
  }
  public registrarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post('/api/v1/admins/registrar', usuario);
  }
  //get
  public obtenerVentasDia(): Observable<any> {
    return this.http.get('/api/v1/admins/obtenerVentasDia');
  }
  public obtenerVentasRango(fechaInicio: string, fechaFin: string): Observable<any> {
    return this.http.get(`/api/v1/admins/obtenerVentasRango/${fechaInicio}/${fechaFin}`);
  }
  public obtener10MasVendidos(fechaInicio: string, fechaFin: string): Observable<any> {
    return this.http.get(`/api/v1/admins/obtenerMasVendidos/${fechaInicio}/${fechaFin}`);
  }
  public obtenerVentasPorFamilia(fechaInicio: string, fechaFin: string): Observable<any> {
    return this.http.get(`/api/v1/admins/obtenerVentasPorFamilia/${fechaInicio}/${fechaFin}`);
  }
  public obtenerVentasMes(fechaInicio: string, fechaFin: string): Observable<any> {
    return this.http.get(`/api/v1/admins/obtenerVentasMes/${fechaInicio}/${fechaFin}`);
  }
  public existeCorte(): Observable<any> {
    return this.http.get('/api/v1/admins/existeCorte');
  }
  public obtenerTotalCaja(): Observable<any> {
    return this.http.get('/api/v1/admins/obtenerTotalCaja');

  }
  public obtenerHistorialCortes(): Observable<any> {
    return this.http.get('/api/v1/admins/obtenerCortesCaja');
  }
  public obtenerUsuariosEliminados(): Observable<any> {
    return this.http.get('/api/v1/admins/obtenerUsuariosEliminados');
  }
  public obtenerProveedoresEliminados(): Observable<any> {
    return this.http.get('/api/v1/admins/obtenerProveedoresEliminados');
  }
  public obtenerProductosProveedorEliminados(): Observable<any>{
    return this.http.get('/api/v1/admins/obtenerProductosProveedorEliminados');
  }
  //patch
  public actualizarCaja(caja): Observable<any> {
    return this.http.patch('/api/v1/admins/actualizarCaja', caja);
  }
  public cambiarPermisos(usuario: Usuario): Observable<any> {
    return this.http.patch('/api/v1/admins/cambiarPermisos', usuario);
  }
  public restaurarUsuario(usuario: Usuario): Observable<any> {
    return this.http.patch('/api/v1/admins/restaurarUsuario', usuario);
  }
  public eliminarUsuario(id: string): Observable<any> {
    return this.http.patch(`/api/v1/admins/eliminarUsuario/${id}`, null);
  }
  public editarUsuario(usuario: Usuario): Observable<any> {
    return this.http.patch('/api/v1/admins/editarUsuario', usuario);
  }
  public editarProveedor(proveedor: Proveedor): Observable<any> {
    return this.http.patch('/api/v1/admins/editarProveedor', proveedor);
  }
  public eliminarProveedor(proveedor: Proveedor): Observable<any> {
    return this.http.patch('/api/v1/admins/eliminarProveedor', proveedor);
  }
  public restaurarProveedor(proveedor: Proveedor): Observable<any> {
    return this.http.patch('/api/v1/admins/restaurarProveedorEliminado', proveedor);
  }
  public eliminarProductoProveedor(producto: ProductoProveedor): Observable<any> {
    return this.http.patch('/api/v1/admins/eliminarProductoProveedor', producto);
  }
  public editarProductoProveedor(producto: ProductoProveedor): Observable<any>{
    return this.http.patch('/api/v1/admins/editarProductoProveedor', producto);
  }
  public restaurarProductoProveedorEliminado(producto: ProductoProveedor): Observable<any>{
    return this.http.patch('/api/v1/admins/restaurarProductoProveedorEliminado', producto);
  }


}
