import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { ContactoSesionComponent } from '../detalles-sesion/contacto-sesion/contacto-sesion.component';
import { UsuariosService } from '../services/usuarios.service';
import { Sesion } from '../entities/sesion';
import { Plan } from '../entities/sesion';

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

  constructor(private router: Router, private userService: UsuariosService) {
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
    localStorage.setItem('plan', JSON.stringify(this.planes[idPlan.valueOf()]));
    this.router.navigate(['sesiones']);
    
  }

  editarPlan(planes: any) {
    // Lógica para editar la sesión
  }

  eliminarPlan(planes: any) {
    // Lógica para eliminar la sesión
  }

  agregarPlan() {
    // Lógica para añadir una nueva sesión
    // Aquí podrías abrir un formulario para añadir una nueva sesión
    this.userService.postPlan(new Date(), new Date(), "Caca", this.idUser).subscribe(() => {
      this.actualizarPlanes();
    });
  }

  actualizarPlanes() {
    this.userService.getPlanes(this.idUser).subscribe(planes => {
      this.planes = planes;
    });
  }
}
