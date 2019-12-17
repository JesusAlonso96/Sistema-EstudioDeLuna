import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/comun/modelos/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  constructor(private http: HttpClient) { }
  //get
  public obtenerVentasDia(): Observable<any>{
    return this.http.get('/api/v1/admins/obtenerVentasDia');
  }
  public obtenerVentasRango(fechaInicio: string, fechaFin: string): Observable<any>{
    return this.http.get(`/api/v1/admins/obtenerVentasRango/${fechaInicio}/${fechaFin}`);
  }
  public obtener10MasVendidos(fechaInicio: string, fechaFin: string): Observable<any>{
    return this.http.get(`/api/v1/admins/obtenerMasVendidos/${fechaInicio}/${fechaFin}`)
  }
  public obtenerVentasPorFamilia(fechaInicio: string, fechaFin: string): Observable<any>{
    return this.http.get(`/api/v1/admins/obtenerVentasPorFamilia/${fechaInicio}/${fechaFin}`)
  }
  public obtenerVentasMes(fechaInicio: string, fechaFin: string): Observable<any>{
    return this.http.get(`/api/v1/admins/obtenerVentasMes/${fechaInicio}/${fechaFin}`)
  }

  //post
  public crearUsuario(usuario: Usuario): Observable<any>{
    return this.http.post('/api/v1/admins/empleado', usuario);
  }
}
