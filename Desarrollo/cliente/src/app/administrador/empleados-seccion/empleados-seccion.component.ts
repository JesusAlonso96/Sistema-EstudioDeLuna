import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empleados-seccion',
  templateUrl: './empleados-seccion.component.html',
  styleUrls: ['./empleados-seccion.component.scss']
})
export class EmpleadosSeccionComponent implements OnInit {
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  constructor() { }

  ngOnInit() {
  }

}
