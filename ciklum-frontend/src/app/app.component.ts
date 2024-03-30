import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ContactosService } from './usuario.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Usuario} from './usuario'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isRightPanelActive: boolean = false;
  errorMessageR: string = "";
  errorMessageI: string = "";

  togglePanel(): void {
    this.isRightPanelActive = !this.isRightPanelActive;
  }


  constructor(private contactosService: ContactosService, private modalService: NgbModal) { }

  registrarUsuario(user: Usuario) {
    this.contactosService.addContacto(user).subscribe(
      (response) => {
        console.log('Usuario registrado exitosamente:', response);
        // Puedes manejar la respuesta del backend aquí, por ejemplo, mostrar un mensaje de éxito al usuario
      },
      (error) => {
        console.error('Error al registrar usuario:', error);
        // Puedes manejar el error aquí, por ejemplo, mostrar un mensaje de error al usuario
      }
    );
  }

  onClickRegistrar() {
    const nombre = (document.getElementById('nameR') as HTMLInputElement).value;
    const surname1 = (document.getElementById('surname1R') as HTMLInputElement).value;
    const surname2 = (document.getElementById('surname2R') as HTMLInputElement).value;
    const email = (document.getElementById('emailR') as HTMLInputElement).value;
    const password = (document.getElementById('passwordR') as HTMLInputElement).value;
    const password2 = (document.getElementById('password2R') as HTMLInputElement).value;
    if (!nombre || !surname1 || !surname2 || !email || !password) {
      // Actualizar el mensaje de error
      this.errorMessageR = 'Por favor, complete todos los campos';
      return; // Cancelar el registro
    }
    else if(!(password === password2)) {
      this.errorMessageR = 'Las dos contraseñas deben ser iguales';
      return; // Cancelar el registro
    }
    const user: Usuario = { 
      nombre: nombre,
      apellido1: surname1,
      apellido2:surname2,
      email:email,
      password: password,
      administrador: false
    };
    this.registrarUsuario(user);
  }

  onClickIniciarSesion() {
    const email = (document.getElementById('emailR') as HTMLInputElement).value;
    const password = (document.getElementById('passwordR') as HTMLInputElement).value;
    if (!email || !password) {
      // Actualizar el mensaje de error
      this.errorMessageI = 'Por favor, complete todos los campos';
      return; // Cancelar el registro
    }
    else {
      this.errorMessageI = '';
      return;
    }
  }

}
