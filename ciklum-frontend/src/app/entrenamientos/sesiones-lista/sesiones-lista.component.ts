import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { Plan, Sesion } from '../../entities/sesion';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-sesiones-lista',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, FormsModule, TitleCasePipe],
  templateUrl: './sesiones-lista.component.html',
  styleUrl: './sesiones-lista.component.css'
})
export class SesionesListaComponent {
  sesiones: Sesion[] = [];

  constructor(private router: Router, private userService: UsuariosService) {
  }

  
  backToEntrenamientos(): void {
    //this.estadoPestanaService.cambiarMostrarPestana(true);
    this.router.navigateByUrl('entrenamientos');
  }


  ngOnInit(): void {
    // Aquí podrías cargar las sesiones desde algún servicio o una API
    const sesiones = localStorage.getItem('plan');
    const aux: Plan = sesiones ? JSON.parse(sesiones) : undefined;
    this.sesiones = aux.sesiones;
  }

  verSesion(sId: Number) {
    // Navegar a la ruta 'contacto-sesion'
    localStorage.removeItem('sesion');
    localStorage.setItem('sesion', JSON.stringify(this.sesiones[sId.valueOf()]));
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
