import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
import { Sesion } from '../entities/sesion';
import { Plan } from '../entities/sesion';
import { PlanService } from '../services/plan.service';

@Component({
  selector: 'app-entrenamiento',
  templateUrl: './entrenamiento.html', 
  styleUrls: ['./entrenamiento.css'],
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, FormsModule, TitleCasePipe],
})
export class Entrenamiento implements OnInit {
  planes: Plan[] = [];
  idUser: number | undefined = this.userService.getUsuarioSesion()?.id;

  constructor(private router: Router, private userService: UsuariosService, private planService: PlanService) {
  }

  

  vueltaAlHome(): void {
    //this.estadoPestanaService.cambiarMostrarPestana(true);
    this.router.navigateByUrl('principal');
  }

  ngOnInit(): void {
    // Aquí podrías cargar las sesiones desde algún servicio o una API
    this.actualizarPlanes();
    console.log(this.idUser);
  
  }

  verPlan(idPlan: Number) {
    // Navegar a la ruta 'contacto-sesion'
    localStorage.removeItem('plan');
    for(const plan of this.planes) {
      if(plan.planId === idPlan) {
        localStorage.setItem('plan', JSON.stringify(plan));
      }
    }
    this.router.navigate(['sesiones']);
  }

  editarPlan(planes: any) {
    // Lógica para editar la sesión
  }

  eliminarPlan(plan: Plan) {
    // Lógica para eliminar la sesión
    this.planService.deletePlan(plan.planId.valueOf());
    this.actualizarPlanes();
  }

  agregarPlan() {
    // Lógica para añadir una nueva sesión
    // Aquí podrías abrir un formulario para añadir una nueva sesión
    this.planService.postPlan(new Date(), new Date(), "Caca", this.idUser).subscribe(() => {
      this.actualizarPlanes();
    });
  }

  actualizarPlanes() {
    this.planService.getPlanes(this.idUser).subscribe(planes => {
      this.planes = planes;
    });
  }
}
