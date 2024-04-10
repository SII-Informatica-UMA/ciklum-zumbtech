import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { Plan, Sesion, SesionImpl } from '../../entities/sesion';
import { UsuariosService } from '../../services/usuarios.service';
import { PlanService } from '../../services/plan.service';
import { FormularioSesionComponent } from '../../formulario-sesion/formulario-sesion.component';

@Component({
  selector: 'app-sesiones-lista',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, FormsModule, TitleCasePipe],
  templateUrl: './sesiones-lista.component.html',
  styleUrl: './sesiones-lista.component.css'
})
export class SesionesListaComponent {
  sesiones: Sesion[] = [];
  username: string = JSON.parse(localStorage.getItem('usuario') || "")?.nombre; // Nombre de usuario
  idPlan: Number = 0;

  constructor(private router: Router, private userService: UsuariosService, private planService: PlanService,
    private modalService: NgbModal
  ) {
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
    this.actualizarSesiones();
  }

  verSesion(sId: Number) {
    // Navegar a la ruta 'contacto-sesion'
    localStorage.removeItem('sesion');
    localStorage.setItem('sesion', JSON.stringify(this.sesiones[sId.valueOf()]));
    this.router.navigate(['detalles']);
    
  }

  editarSesion(sesion: Sesion) {
    // Lógica para editar la sesión
    let ref = this.modalService.open(FormularioSesionComponent);
    ref.componentInstance.accion = "Editar";
    ref.componentInstance.sesion = new SesionImpl();
    ref.result.then((sesion: Sesion) => {
      this.planService.putSesion(sesion,this.idPlan).subscribe(() => {
        this.actualizarSesiones();
      })
    });
  }

  eliminarSesion(sesion: Sesion) {
    // Lógica para eliminar la sesión
    this.planService.deleteSesion(this.idPlan,sesion.id);
    this.actualizarSesiones();
  }

  agregarSesion() {
    // Lógica para añadir una nueva sesión
    let ref = this.modalService.open(FormularioSesionComponent);
    ref.componentInstance.accion = "Añadir";
    ref.componentInstance.sesion = new SesionImpl();
    ref.result.then((sesion: Sesion) => {
      this.planService.postSesion(sesion,this.idPlan).subscribe(() => {
        this.actualizarSesiones();
      })
    });
    // Aquí podrías abrir un formulario para añadir una nueva sesión
  }

  actualizarSesiones() {
    this.planService.getSesiones(this.idPlan).subscribe(sesion => {
      this.sesiones = sesion;
    });
  }

}
