import { Component, OnInit } from '@angular/core';
import { Sesion, SesionImpl, SesionP } from '../entities/sesion';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario-sesion',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './formulario-sesion.component.html',
  styleUrls: ['./formulario-sesion.component.css']
})
export class FormularioSesionComponent {
  accion?: 'Añadir' | 'Editar';
  sesion: SesionP = {idPlan: 0,
    inicio: new Date(),
    fin: new Date(),
    trabajoRealizado: "",
    multimedia: [],
    descripcion: "",
    presencial: false,
    datosSalud: [],}

  constructor(public modal: NgbActiveModal) { }

  guardarSesion(): void {
    this.modal.close(this.sesion);
  }

}
