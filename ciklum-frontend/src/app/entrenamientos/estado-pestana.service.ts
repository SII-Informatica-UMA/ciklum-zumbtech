import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EstadoPestanaService {
  mostrarPestana: boolean = true;

  constructor() {}

  mostrarEstadoPestana() {
    return this.mostrarPestana;    
  }
  cambiarMostrarPestana(valor: boolean) {
    this.mostrarPestana = valor;
  }
}
