import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { Usuario } from '../entities/usuario';
import { Login, Rol } from '../entities/login';
import { UsuariosService } from '../services/usuarios.service';
import { PlanService } from '../services/plan.service';
import { EntrenadorP } from '../entities/sesion';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isLoggedIn: boolean = false;
  isRightPanelActive: boolean = false;
  errorMessageR: string = "";
  successMessageR: string = "";
  errorMessageI: string = "";
  successMessageI: string = "";
  login: Login = { email: '', password: '' };
  user: Usuario = { id: 0, nombre: '', apellido1: '', apellido2:'', email:'', password: '', administrador: false };
  password2: string = '';

  togglePanel(): void {
    this.isRightPanelActive = !this.isRightPanelActive;
    this.clearMessages();
  }
  
  clearMessages(): void {
    this.errorMessageR = "";
    this.successMessageR = "";
    this.errorMessageI = "";
    this.successMessageI = "";
  }

  constructor(private usuarioService: UsuariosService, private router: Router,
    private planService: PlanService) {}

  registrarUsuario(user: Usuario) {
    this.successMessageR = "";
    this.errorMessageR = "";
    this.usuarioService.aniadirUsuario(user).subscribe({
      next: (usuario) => {
        //const idEntrenador: string = JSON.parse(localStorage.getItem('Entrenador') || "");
        const entrenador: Usuario = { id: 0, nombre: usuario.nombre + "-Entrenador", apellido1: 'Paco', apellido2:'Gutierrez', email:"paco"+usuario.id+"@uma.es", password: '1234', administrador: true };
        this.usuarioService.aniadirUsuario(entrenador).subscribe({
          next: (userEntrenador) => {
            this.planService.postCentro("UMA", "Málaga").subscribe({
              next: (centro) => {
                const entrenadorP: EntrenadorP = { idUsuario: userEntrenador.id, telefono: "111111111", direccion: "Málaga", dni: "56565656T", fechaNacimiento: new Date(), fechaAlta: new Date(), fechaBaja: new Date(), especialidad: "Pesas", titulacion: "Pesas", experiencia: "Ninguna", observaciones: "Ninguna", }
                this.planService.postEntrenador(entrenadorP, centro.idCentro).subscribe({
                  next: (userEntrenadorRes) => {
                    this.planService.postAsociación(usuario.id, userEntrenador.id, "comer moscas").subscribe({});
                  }
                })
              }
            })
          }
        })
        this.successMessageI = "Usuario registrado";
        this.isRightPanelActive = !this.isRightPanelActive;
      },
      error: (error) => {
        if (error.status === 403) {
          this.errorMessageR = 'Acceso no autorizado';
        } else {
          this.errorMessageR = 'Correo asociado a una cuenta ya existente';
        }
      }
    });
  }

  iniciarSesionUsuario(log: Login) {
    this.usuarioService.doLogin(log).subscribe({
      next: (usuario) => {
        if(usuario.roles.length != 0 && usuario.roles[0].rol === Rol.ADMINISTRADOR) {
          if(!(usuario.email === "admin@uma.es")) {
            alert("No te puedes loguear como entrenador");
            return;
          }
        }
        this.planService.getAsociaciones(usuario.id).subscribe({
          next: (asociacion) => {
            if(!(usuario.email === "admin@uma.es")) {
              localStorage.setItem('Asociacion', JSON.stringify(asociacion[0].id));
            }
          }
        });
        this.router.navigateByUrl('principal');
      },
      error: (error) => {
        this.errorMessageI = 'Credenciales no correctas';
      }
    });
  }

  onClickRegistrar() {
    this.clearMessages();
    if(!this.user.nombre || !this.user.apellido1 || !this.user.apellido2 || !this.user.email || !this.user.password || !this.user.password) {
      this.errorMessageR = 'Por favor, complete todos los campos';
      return;
    }
    else if(!(this.user.password === this.password2)) {
      this.errorMessageR = 'Las dos contraseñas deben ser iguales';
      return; 
    }
    this.registrarUsuario(this.user);
  }

  onClickIniciarSesion() {
    this.clearMessages();
    if (!this.login.email || !this.login.password) {
      this.errorMessageI = 'Por favor, complete todos los campos';
      return;
    }
    this.iniciarSesionUsuario(this.login);
  }
}

