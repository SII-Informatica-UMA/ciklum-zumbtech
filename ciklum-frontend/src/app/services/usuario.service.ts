import { Injectable } from '@angular/core';
import {Usuario } from '../entities/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private contactos: Usuario [] = [
    {id: 0, nombre: 'Juan', apellido1: 'Pérez', apellido2: 'Márquez', email: 'perez@uma.es', password: '666666666', administrador: true},
    {id: 1, nombre: 'Ana', apellido1: 'García', apellido2: 'Márquez', email: 'ana@uma.es', password: '55555555', administrador: false},
  ];

  constructor() { }

  getContactos(): Usuario [] {
    return this.contactos;
  }

  addContacto(contacto: Usuario) {
    contacto.id = Math.max(...this.contactos.map(c => c.id)) + 1;
    this.contactos.push(contacto);
  }

  editarContacto(contacto: Usuario) {
    let indice = this.contactos.findIndex(c => c.id == contacto.id);
    this.contactos[indice] = contacto;
  }

  eliminarContacto(id: number) {
    let indice = this.contactos.findIndex(c => c.id == id);
    this.contactos.splice(indice, 1);
  }
}