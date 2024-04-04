import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { ContactoSesionComponent } from '../detalles-sesion/contacto-sesion/contacto-sesion.component';

@Component({
  selector: 'app-entrenamiento',
  templateUrl: './entrenamiento.html', 
  styleUrls: ['./entrenamiento.css'],
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, FormsModule, TitleCasePipe],
})
export class Entrenamiento implements OnInit {
  sesiones: any[] = [];

  constructor(private router: Router) {
  }

  

  vueltaAlHome(): void {
    //this.estadoPestanaService.cambiarMostrarPestana(true);
    this.router.navigateByUrl('principal');
  }

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
    this.router.navigate(['detalle']);
    
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
