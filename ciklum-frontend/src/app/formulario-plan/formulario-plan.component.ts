import { Component } from '@angular/core';
import { PlanE, Rutina } from '../entities/sesion';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario-`plan`',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './formulario-plan.component.html',
  styleUrls: ['./formulario-plan.component.css']
})
export class FormularioPlanComponent {
  accion?: 'Añadir' | 'Editar';
  plan: PlanE = {fechaInicio: new Date(), fechaFin: new Date(),
    reglaRecurrencia: "", idRutina: 0};
  rutina: Rutina = {fechaInicio: new Date(), fechaFin: new Date(), reglaRecurrencia: "", idRutina: 0, id: 0}
  errorMensaje: string = '';

  constructor(public modal: NgbActiveModal) { }

  guardarPlan(): void {
    this.limpiarMensajes();
    if(!this.plan.reglaRecurrencia) {
      this.errorMensaje = 'Por favor, complete todos los campos';
      return;
    }
    this.modal.close(this.plan);
  }

  limpiarMensajes() {
    this.errorMensaje = '';
  }

}
