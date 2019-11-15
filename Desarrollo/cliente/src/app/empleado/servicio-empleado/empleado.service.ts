import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Pedido } from 'src/app/comun/modelos/pedido.model';
import { WebSocketService } from '../../comun/servicios/socket.service';
import { Notificacion } from 'src/app/comun/modelos/notificacion.model';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  socket;

  constructor(private http: HttpClient, private wsService: WebSocketService) {

  }
  //get
  public asignarFotografoLibre(fecha): Observable<any> {
    return this.http.get(`/api/v1/empleados/asignarFotografo/${fecha}`);
  }
  public numPedidosFotografo(): Observable<any> {
    return this.http.get('/api/v1/empleados/numPedidos');
  }
  public obtenerPedidosRealizados(id): Observable<any> {
    return this.http.get(`/api/v1/empleados/obtenerPedidosPorEmpleado/${id}`)
  }
  public obtenerPedidosEnProceso(id): Observable<any> {
    return this.http.get(`/api/v1/empleados/obtenerPedidosEnProceso/${id}`)
  }
  public obtenerFotografos(): Observable<any> {
    return this.http.get('/api/v1/empleados/fotografos');
  }
  public obtenerFotografo(id): Observable<any>{
    return this.http.get(`/api/v1/empleados/fotografo/${id}`)
  }
  public obtenerNotificaciones(id, fecha): Observable<any> {
    return this.http.get(`/api/v1/empleados/obtenerNotificaciones/${id}/${fecha}`)
  }
  //post
  public crearPedido(pedido: Pedido, id?: String): Observable<any> {
    return this.http.post(`/api/v1/empleados/crearPedido/${id}`, pedido);
  }
  public crearVenta(pedido: Pedido): Observable<any> {
    return this.http.post('/api/v1/empleados/crearVenta', pedido);
  }
  public crearNotificacion(notificacion: Notificacion): Observable<any> {
    return this.http.post('/api/v1/empleados/crearNotificacion', notificacion);
  }

}
