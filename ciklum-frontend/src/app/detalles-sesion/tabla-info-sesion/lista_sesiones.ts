import { Component, Inject } from "@angular/core";
import { sesion_user } from "./sesion-usuario";

@Component({
    selector: 'app-lista-sesiones',
    templateUrl: 'lista_sesiones.html',
    styleUrls: ['lista_sesiones.css']
})
export class ListaSesionComponent {
    /* Variables */
    sesiones: sesion_user[] = [];

    /* Constructor */
    constructor() {}

    /* Funciones */
    listaUsuarios(_idUser: number): void {
        this.sesiones = [
            {
                usuario: {id: 0, nombre: 'Pedro', apellidos: 'Armario', altura: 180, peso: 83, email: 'si@g.es', tlf: '666776677'},
                entrenador: {id: 1, nombre: 'Paco', apellidos: 'Torres', altura: 150, peso: 183, email: 'no@g.es', tlf: '888998899'},
                lpm: 80,
                cal_consumidas: 400,
                tiempo_ejercicio: 60
            },
            {
                usuario: {id: 0, nombre: 'Pedro', apellidos: 'Armario', altura: 180, peso: 83, email: 'si@g.es', tlf: '666776677'},
                entrenador: {id: 1, nombre: 'Paco', apellidos: 'Torres', altura: 150, peso: 183, email: 'no@g.es', tlf: '888998899'},
                lpm: 80,
                cal_consumidas: 400,
                tiempo_ejercicio: 60
            },
            {
                usuario: {id: 0, nombre: 'Pedro', apellidos: 'Armario', altura: 180, peso: 83, email: 'si@g.es', tlf: '666776677'},
                entrenador: {id: 1, nombre: 'Paco', apellidos: 'Torres', altura: 150, peso: 183, email: 'no@g.es', tlf: '888998899'},
                lpm: 80,
                cal_consumidas: 400,
                tiempo_ejercicio: 60
            }
        ];
    }
}   