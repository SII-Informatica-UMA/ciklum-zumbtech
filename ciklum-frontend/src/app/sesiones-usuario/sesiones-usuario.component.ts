// sesiones-usuario.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sesiones-usuario',
  templateUrl: './sesiones-usuario.component.html',
  styleUrls: ['./sesiones-usuario.component.css']
})
export class SesionesUsuarioComponent implements OnInit {
  sesiones: any[] = []; // Debes inicializar esta variable con tus sesiones reales


  constructor(private router: Router) { }

  ngOnInit(): void {
    // Aquí podrías cargar las sesiones desde algún servicio o una API
    this.sesiones = [
      { nombre: 'Sesión 1', descripcion: 'Descripción de la sesión 1' },
      { nombre: 'Sesión 2', descripcion: 'Descripción de la sesión 2' },
      // Agrega más sesiones si es necesario
    ];
  }

  verSesion() {
    // Navegar a la ruta 'contacto-sesion'
    this.router.navigate(['detalles']);
    
  }

  editarSesion(sesion: any) {
    // Lógica para editar la sesión
    console.log('Editar sesión:', sesion);
  }

  eliminarSesion(sesion: any) {
    // Lógica para eliminar la sesión
    console.log('Eliminar sesión:', sesion);
  }

  agregarSesion() {
    // Lógica para añadir una nueva sesión
    console.log('Añadir nueva sesión');
    // Aquí podrías abrir un formulario para añadir una nueva sesión
  }
}
