import { Component } from '@angular/core';
import { sesion_user } from './sesion-usuario';

@Component({
  selector: 'app-tabla-info-sesion',
  templateUrl: './tabla-info-sesion.component.html',
  styleUrls: ['./tabla-info-sesion.component.css']
})
export class TablaInfoSesionComponent {
  /* Variables */
  sesion: sesion_user = {
    usuario: {id: 0, nombre: 'Pedro', apellidos: 'Armario', altura: 180, peso: 83, email: 'si@g.es', tlf: '666776677'},
    entrenador: {id: 1, nombre: 'Paco', apellidos: 'Torres', altura: 150, peso: 183, email: 'no@g.es', tlf: '888998899'},
    lpm: 80,
    cal_consumidas: 400,
    tiempo_ejercicio: 60
  };

  /* Constructor */
  constructor() {}

  /* Funciones */
}
