import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/comun/modelos/usuario.model';
import { CorteCaja } from 'src/app/comun/modelos/corte_caja.model';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  constructor(private http: HttpClient) { }
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
  //post
  public crearUsuario(usuario: Usuario): Observable<any> {
    return this.http.post('/api/v1/admins/empleado', usuario);
  }
  public crearCorteCaja(corteCaja: CorteCaja): Observable<any> {
    return this.http.post('/api/v1/admins/crearCorteCaja', corteCaja);
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
}
