import { Component, ViewChild } from '@angular/core';
import { UsuarioService } from './services/usuario.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Usuario} from './entities/usuario'
import {Login} from './entities/login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isRightPanelActive: boolean = false;
  errorMessageR: string = "";
  successMessageR: string = "";
  errorMessageI: string = "";
  successMessageI: string = "";
  public mostrarComponente: boolean = true;

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

  constructor(private usuarioService: BackendService, private modalService: NgbModal) { }

  registrarUsuario(user: Usuario) {
    this.successMessageR = "";
    this.errorMessageR = "";
    this.usuarioService.postUsuario(user).subscribe({
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
    this.usuarioService.login(log).subscribe({
      next: (usuario) => {
        this.successMessageI = "Loggeado";
      },
      error: (error) => {
        this.errorMessageI = 'Credenciales no correctas';
      }
    });
  }

  onClickRegistrar() {
    this.clearMessages();
    const user: Usuario = { 
      id: 0,
      nombre: (document.getElementById('nameR') as HTMLInputElement).value,
      apellido1: (document.getElementById('surname1R') as HTMLInputElement).value,
      apellido2:(document.getElementById('surname2R') as HTMLInputElement).value,
      email:(document.getElementById('emailR') as HTMLInputElement).value,
      password: (document.getElementById('passwordR') as HTMLInputElement).value,
      administrador: false
    };
    const password2: string = (document.getElementById('password2R') as HTMLInputElement).value;

    if(!user.nombre || !user.apellido1 || !user.apellido2 || !user.email || !user.password) {
      this.errorMessageR = 'Por favor, complete todos los campos';
      return;
    }
    else if(!(user.password === password2)) {
      this.errorMessageR = 'Las dos contraseñas deben ser iguales';
      return; 
    }
    this.registrarUsuario(user);
  }

  onClickIniciarSesion() {
    this.clearMessages();
    const log: Login = { 
      email:(document.getElementById('emailL') as HTMLInputElement).value,
      password: (document.getElementById('passwordL') as HTMLInputElement).value
    };
    if (!log.email || !log.password) {
      this.errorMessageI = 'Por favor, complete todos los campos';
      return;
    }
    this.iniciarSesionUsuario(log);
  }

}
