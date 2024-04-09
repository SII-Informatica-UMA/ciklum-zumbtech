/*import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Login } from '../entities/login';
import { UsuariosService } from '../services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginInfo: Login = {email: '', password: ''};
  error: string = '';

  constructor(private usuarioService: UsuariosService, private router: Router) {}

  login() {
    this.usuarioService.doLogin(this.loginInfo).subscribe({
      next: (usuario) => {
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        this.loginInfo = {email: '', password: ''};
        if (error.status === 401) {
          this.error = 'Usuario o contraseña incorrectos';
        } else {
          this.error = error.statusText;
        }

      }
    });
  }

  get usuario() {
    return this.usuarioService.getUsuarioSesion();
  }

}*/

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { Usuario } from '../entities/usuario';
import { Login } from '../entities/login';
import { UsuariosService } from '../services/usuarios.service';
import { PlanService } from '../services/plan.service';

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
  user: Usuario = { id: 0, nombre: '', apellido1: '', apellido2:'', email:'', password: '', administrador: true };
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
        console.log(usuario.id);
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

