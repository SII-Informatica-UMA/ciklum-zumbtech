import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { Plan, Sesion, SesionImpl } from '../../entities/sesion';
import { UsuariosService } from '../../services/usuarios.service';
import { PlanService } from '../../services/plan.service';

@Component({
  selector: 'app-sesiones-lista',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, FormsModule, TitleCasePipe],
  templateUrl: './sesiones-lista.component.html',
  styleUrl: './sesiones-lista.component.css'
})
export class SesionesListaComponent {
  sesiones: Sesion[] = [];
  idPlan: Number = 0;

  constructor(private router: Router, private userService: UsuariosService, private planService: PlanService) {
  }

  
  backToEntrenamientos(): void {
    //this.estadoPestanaService.cambiarMostrarPestana(true);
    this.router.navigateByUrl('entrenamientos');
  }


  ngOnInit(): void {
    // Aquí podrías cargar las sesiones desde algún servicio o una API
    const sesiones = localStorage.getItem('plan');
    const aux: Plan = sesiones ? JSON.parse(sesiones) : undefined;
    this.idPlan = aux.planId;
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

  eliminarSesion(sesion: Sesion) {
    // Lógica para eliminar la sesión
    this.planService.deleteSesion(this.idPlan,sesion.id);
    this.actualizarSesiones();
    console.log('Eliminar sesión:', sesion);
  }

  agregarSesion() {
    // Lógica para añadir una nueva sesión
    console.log('Añadir nueva sesión');
    this.planService.postSesion(new SesionImpl(),this.idPlan).subscribe(() => {
      this.actualizarSesiones();
    })
    // Aquí podrías abrir un formulario para añadir una nueva sesión
  }

  actualizarSesiones() {
    this.planService.getSesiones(this.idPlan).subscribe(sesion => {
      this.sesiones = sesion;
    });
  }

}
