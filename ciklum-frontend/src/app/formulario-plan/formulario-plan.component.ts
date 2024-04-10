import { Component, OnInit } from '@angular/core';
import { Plan, Sesion, SesionImpl } from '../entities/sesion';
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
  plan: Plan = {fechaInicio: new Date(), fechaFin: new Date(),
    reglaRecurrencia: "", idRutina: 0, planId: 0, userId: 0, sesiones: []};

  constructor(public modal: NgbActiveModal) { }

  guardarPlan(): void {
    this.modal.close(this.plan);
  }

}
