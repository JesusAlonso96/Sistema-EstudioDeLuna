import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pedido } from 'src/app/comun/modelos/pedido.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-detalles-modal',
  templateUrl: './detalles-modal.component.html',
  styleUrls: ['./detalles-modal.component.scss']
})
export class DetallesModalComponent {
  foto: string
  constructor(
    public dialogRef: MatDialogRef<DetallesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Pedido) {
      this.foto = environment.url_fotos + this.data.foto;
     }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
