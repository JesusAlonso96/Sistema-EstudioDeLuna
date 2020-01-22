import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/comun/modelos/usuario.model';
import { UsuarioService } from 'src/app/comun/servicios/usuario.service';
import { DesgloseVentasFotografosComponent } from '../desglose-ventas-fotografos/desglose-ventas-fotografos.component';

@Component({
  selector: 'app-mostrar-ventas-fotografos',
  templateUrl: './mostrar-ventas-fotografos.component.html',
  styleUrls: ['./mostrar-ventas-fotografos.component.scss']
})
export class MostrarVentasFotografosComponent {
  cargando: boolean = false;
  constructor(public dialogRef: MatDialogRef<MostrarVentasFotografosComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private usuarioService: UsuarioService, private toastr: ToastrService, private dialog: MatDialog) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  desglosarVentas(empleado: Usuario) {
    this.obtenerDesglose(<string>empleado._id);
  }
  obtenerDesglose(id: string) {
    this.cargando = true;
    this.usuarioService.obtenerDesglosePedidosCRetoque(id).subscribe(
      (desglose: any) => {
        this.cargando = false;
        this.dialog.open(DesgloseVentasFotografosComponent, {
          width: '20%',
          data: desglose
        })
      },
      (err) => {
        this.cargando = false;
        this.toastr.error(err.error.detalles, err.error.titulo, { closeButton: true });
      }
    );
  }
}
