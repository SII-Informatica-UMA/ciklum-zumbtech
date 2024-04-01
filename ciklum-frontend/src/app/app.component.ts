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
  usuarios: Usuario[] = [];

  togglePanel(): void {
    this.isRightPanelActive = !this.isRightPanelActive;
    this.errorMessageR = "";
    this.successMessageR = "";
    this.errorMessageI = "";
    this.successMessageI = "";
  }

  constructor(private usuarioService: UsuarioService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.usuarios = this.usuarioService.getContactos();
  }

  registrarUsuario(user: Usuario) {
    this.successMessageR = "";
    this.errorMessageR = "";
    for(let i = 0; i < this.usuarios.length; ++i) {
        if(this.usuarios[i].email === user.email) {
          this.errorMessageR = 'Correo asociado a una cuenta ya existente';
          return; 
        }
    }
    this.usuarioService.addContacto(user);
    this.successMessageI = "Usuario registrado";
    this.isRightPanelActive = !this.isRightPanelActive;
  }

  iniciarSesionUsuario(log: Login) {
    this.successMessageI = "";
    this.successMessageI = "";
    for(let i = 0; i < this.usuarios.length; ++i) {
      if(this.usuarios[i].email === log.email) {
        if(this.usuarios[i].password === log.password) {
            console.log("logeaste");
        }
        else {
          this.errorMessageI = 'Contraseña incorrecta';
        }
        return;
      }
      if(i == this.usuarios.length-1) {
        this.errorMessageI = 'Correo no asociado a ningún usuario';
        return;
      }
    }
    
  }

  onClickRegistrar() {
    const user: Usuario = { 
      id: this.usuarios.length,
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
