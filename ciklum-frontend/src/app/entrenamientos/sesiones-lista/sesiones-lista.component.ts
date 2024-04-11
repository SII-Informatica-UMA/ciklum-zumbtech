import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { PlanD, Sesion } from '../../entities/sesion';
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
  plan: PlanD = {fechaInicio: new Date(), fechaFin: new Date(), reglaRecurrencia: "", idRutina: 0, id: 0};
  idPlan: Number = 0;
  sesiones: Sesion[] = [];
  username: string = JSON.parse(localStorage.getItem('usuario') || "")?.nombre;

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

    const value = localStorage.getItem('plan');
    this.plan = value ? JSON.parse(value) : undefined;
    //const aux: Plan = sesiones ? JSON.parse(sesiones) : undefined;
    this.idPlan = this.plan.id;
    //this.sesiones = aux.sesiones;
    this.actualizarSesiones();

  }

  verSesion(sId: Number) {
    // Navegar a la ruta 'contacto-sesion'
    localStorage.removeItem('sesion');
    this.planService.getSesiones(this.idPlan).subscribe(sesiones => {
      for(const sesion of sesiones) {
        if(sesion.id === sId) {
          localStorage.setItem('sesion', JSON.stringify(sesion));
          this.router.navigate(['detalles']);
        }
      } 
    });
  }

  editarSesion(sesion: Sesion) {
    let ref = this.modalService.open(FormularioSesionComponent);
    ref.componentInstance.accion = "editar";
    ref.componentInstance.sesion = {idPlan: 0, inicio: new Date(), fin: new Date(), trabajoRealizado: "", multimedia: [], decripcion: sesion.descripcion, presencial: false,datosSalud: [],}
    ref.result.then((sesionAux) => {
      this.planService.putSesion(sesionAux,sesion.id).subscribe((sesionRes) => {
        sesionRes.descripcion = sesion.descripcion;
        this.planService.postSesion(sesionRes,this.idPlan).subscribe((sesionAux) => {
          //console.log(sesion);
          this.actualizarSesiones();
        })
      })
    });
  }

  eliminarSesion(sesion: Sesion) {
    // Lógica para eliminar la sesión
    this.planService.deleteSesion(sesion.id).subscribe(() => {
      this.actualizarSesiones();
    });
  }

  agregarSesion() {
    // Lógica para añadir una nueva sesión
    let ref = this.modalService.open(FormularioSesionComponent);
    ref.componentInstance.accion = "Añadir";
    ref.componentInstance.sesion = {idPlan: 0, inicio: new Date(), fin: new Date(), trabajoRealizado: "", multimedia: [], decripcion: "", presencial: false,datosSalud: [],}
    ref.result.then((sesion) => {
      this.planService.postSesion(sesion,this.idPlan).subscribe((sesionRes) => {
        //console.log(sesion);
        this.actualizarSesiones();
      })
    });
    // Aquí podrías abrir un formulario para añadir una nueva sesión
  }

  actualizarSesiones() {
    this.planService.getSesiones(this.idPlan).subscribe(sesiones => {
      this.sesiones = sesiones;
    });
  }

}
