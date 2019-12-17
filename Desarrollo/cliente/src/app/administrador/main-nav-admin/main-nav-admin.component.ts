import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ServicioAutenticacionService } from 'src/app/autenticacion/servicio-autenticacion/servicio-autenticacion.service';


@Component({
  selector: 'app-main-nav-admin',
  templateUrl: './main-nav-admin.component.html',
  styleUrls: ['./main-nav-admin.component.scss']
})
export class MainNavAdminComponent {
  

  constructor(private breakpointObserver: BreakpointObserver,  private autenticacionService: ServicioAutenticacionService, private rutas: Router) {
  }
  

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    cerrarSesion(){
      this.autenticacionService.cerrarSesion();
      this.rutas.navigate(['/login']);
    }

}
