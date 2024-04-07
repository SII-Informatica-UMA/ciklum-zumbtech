import { Component } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Sesion } from '../../entities/sesion';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabla-info-sesion',
  templateUrl: './tabla-info-sesion.component.html',
  standalone: true,
  styleUrls: ['./tabla-info-sesion.component.css'],
  imports: [CommonModule]
})
export class TablaInfoSesionComponent {
  /* Variables */
  sesion: Sesion = {
    idPlan: 0,
    inicio: new Date(),
    fin: new Date(),
    trabajoRealizado: "",
    multimedia: [],
    decripcion: "",
    presencial: false,
    datosSalud: [],
    id: 0
  };

  ngOnInit(): void {
    // Aquí podrías cargar las sesiones desde algún servicio o una API
    const sesiones = localStorage.getItem('sesion');
    this.sesion = sesiones ? JSON.parse(sesiones) : undefined;
  }

  /* Constructor */
  constructor(private userService: UsuariosService) {}

  /* Funciones */
  getDate(dia: Date): number {
    return dia.getTime();
  }
}
