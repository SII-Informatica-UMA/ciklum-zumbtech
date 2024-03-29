import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isRightPanelActive: boolean = false;

  togglePanel(): void {
    this.isRightPanelActive = !this.isRightPanelActive;
  }


  constructor(private http: HttpClient) { }

  registrarUsuario(nombre: string, email: string, password: string) {
    const url = 'http://localhost:8080'; // Reemplaza con la URL y el endpoint correctos
    const body = { 
      nombre: nombre,
      apellido1: email,
      apellido2:email,
      email:email 
    }; // Datos del usuario a enviar al backend

    this.http.post(url, body).subscribe(
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
    const email = (document.getElementById('emailR') as HTMLInputElement).value;
    const password = (document.getElementById('passwordR') as HTMLInputElement).value;
    this.registrarUsuario(nombre, email, password);
  }

}
