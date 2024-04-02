import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { BackendService } from './services/backend.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from './entities/usuario';
import { Login } from './entities/login';
import { PrincipalComponent } from './principal/principal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, FormsModule, TitleCasePipe, PrincipalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
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

  constructor(private usuarioService: BackendService, private modalService: NgbModal, private router: Router, ) { }

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
        this.isLoggedIn = true;
        // No detecta los cambios el HTML
        this.router.navigate(['/principal']);
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
