import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
import { PlanD, PlanE, Rutina, Sesion } from '../entities/sesion';
import { Plan } from '../entities/sesion';
import { PlanService } from '../services/plan.service';
import { FormularioPlanComponent } from '../formulario-plan/formulario-plan.component';


@Component({
  selector: 'app-entrenamiento',
  templateUrl: './entrenamiento.html', 
  styleUrls: ['./entrenamiento.css'],
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, FormsModule, TitleCasePipe],
})
export class Entrenamiento implements OnInit {
  asociacion: string = this.userService.getUsuarioSesion()?.email ? "" : JSON.parse(localStorage.getItem('Asociacion') || "");
  planes: PlanD[] = [];
  idUser: number | undefined = this.userService.getUsuarioSesion()?.id;
  username: string = JSON.parse(localStorage.getItem('usuario') || "")?.email; // Nombre de usuario  

  constructor(private router: Router, private userService: UsuariosService, private planService: PlanService, private modalService: NgbModal) {
  }

  isAdministrador() {
    return (this.userService.getUsuarioSesion()?.email === "admin@uma.es");
  }

  vueltaAlHome(): void {
    //this.estadoPestanaService.cambiarMostrarPestana(true);
    this.router.navigateByUrl('principal');
  }

  ngOnInit(): void {
    // Aquí podrías cargar las sesiones desde algún servicio o una API
    this.actualizarPlanes();
  
  }

  verPlan(idPlan: Number) {
    // Navegar a la ruta 'contacto-sesion'
    localStorage.removeItem('plan');
    for(const plan of this.planes) {
      if(plan.id === idPlan) {
        localStorage.setItem('plan', JSON.stringify(plan));
      }
    }
    this.router.navigate(['sesiones']);
  }

  editarPlan(plan: PlanD) {
    // Lógica para editar la sesión
    alert("Solo los entrenadores pueden actualizar un plan");
    return;

  }

  eliminarPlan(plan: PlanD) {
    // Lógica para eliminar la sesión
    console.log(plan.id);
    this.planService.deletePlan(plan.id.valueOf()).subscribe(() => {
      this.actualizarPlanes();
    });
  }

  agregarPlan() {
    // Lógica para añadir una nueva sesión
    // Aquí podrías abrir un formulario para añadir una nueva sesión
  


    let ref = this.modalService.open(FormularioPlanComponent);
    ref.componentInstance.accion = "Añadir";
    ref.componentInstance.plan = {fechaInicio: new Date(), fechaFin: new Date(),
      reglaRecurrencia: "", idRutina: 0, planId: 0, userId: 0, sesiones: []};
    ref.result.then((plan) => {
      this.planService.postPlan(plan, parseInt(this.asociacion)).subscribe(() => {
        this.actualizarPlanes();
      })
    });
  }

  actualizarPlanes() {
    this.planService.getPlanes(parseInt(this.asociacion)).subscribe(planes => {
      this.planes = planes;
    });
  }
}
