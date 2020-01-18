import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-mostrar-ventas-fotografos',
  templateUrl: './mostrar-ventas-fotografos.component.html',
  styleUrls: ['./mostrar-ventas-fotografos.component.scss']
})
export class MostrarVentasFotografosComponent  {

  constructor(
    public dialogRef: MatDialogRef<MostrarVentasFotografosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(this.data);
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
