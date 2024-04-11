import { Component } from '@angular/core';
import { SesionP } from '../entities/sesion';
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
  errorMensaje: string = '';

  constructor(public modal: NgbActiveModal) { }

  guardarSesion(): void {
    this.limpiarMensajes();
    if(!this.sesion.trabajoRealizado || this.sesion.multimedia.length == 0 
       || this.sesion.datosSalud.length == 0) {
        this.errorMensaje = 'Por favor, complete todos los campos';
        return;
      }
    this.modal.close(this.sesion);
  }
  limpiarMensajes(): void {
    this.errorMensaje = '';
  }

}
