import { Component } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { UsuariosService } from './services/usuarios.service';
import { Usuario } from './entities/usuario';
import { PlanService } from './services/plan.service';
import { EntrenadorP } from './entities/sesion';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, FormsModule, TitleCasePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  _rolIndex: number = 0

  constructor(private usuarioService: UsuariosService, private router: Router, private planService: PlanService) {
    this.actualizarRol()
  }

  ngOnInit(): void {
    /*if(localStorage.getItem('Entrenador')) {

      return;
    }*/
    const entrenador: Usuario = { id: 0, nombre: 'Entrenador', apellido1: 'Paco', apellido2:'Gutierrez', email:'paco@uma.es', password: '1234', administrador: true };
    this.usuarioService.aniadirUsuario(entrenador).subscribe({
          next: (userEntrenador) => {
            this.planService.postCentro("UMA", "Málaga").subscribe({
              next: (centro) => {
                const entrenadorP: EntrenadorP = {
                  idUsuario: userEntrenador.id,
                  telefono: "111111111",
                  direccion: "Málaga",
                  dni: "56565656T",
                  fechaNacimiento: new Date(),
                  fechaAlta: new Date(),
                  fechaBaja: new Date(),
                  especialidad: "Pesas",
                  titulacion: "Pesas",
                  experiencia: "Ninguna",
                  observaciones: "Ninguna",
                }
                this.planService.postEntrenador(entrenadorP, centro.idCentro).subscribe({
                  next: (userEntrenadorRes) => {
                    localStorage.setItem("Entrenador", JSON.stringify(userEntrenadorRes.id));
                    localStorage.setItem("IdEntrenador", JSON.stringify(userEntrenadorRes.idUsuario))
                  }
                })
              }
            })
          }
        })
  }

  get rolIndex() {
    return this._rolIndex;
  }

  set rolIndex(i: number) {
    this._rolIndex = i;
    this.actualizarRol();
  }

  actualizarRol() {
    let u = this.usuarioSesion;
    if (u) {
      this.usuarioService.rolCentro = u.roles[this.rolIndex];
    } else {
      this.usuarioService.rolCentro = undefined;
    }
  }

  get rol() {
    return this.usuarioService.rolCentro;
  }

  get usuarioSesion() {
    return this.usuarioService.getUsuarioSesion();
  }

  logout() {
    this.usuarioService.doLogout();
    this.actualizarRol();
    this.router.navigateByUrl('/');
  }
}
