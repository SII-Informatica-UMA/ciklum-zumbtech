import { Component } from '@angular/core';
import { UsuarioD, usuarioDummy } from '../../entities/usuarioD';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // Importa NgbModal
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-contacto-sesion',
  templateUrl: './contacto-sesion.component.html',
  styleUrls: ['./contacto-sesion.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class ContactoSesionComponent {
  // Variables
  usuario: UsuarioD = usuarioDummy; // Utilizar la instancia usuarioDummy como usuario
  mensajes: { usuario: string, mensajeEnviado: string }[] = []; // Array para almacenar los mensajes enviados
  nuevoMensaje: string = ''; // Variable para almacenar el nuevo mensaje a enviar


  // Constructor
  constructor(public modalService: NgbModal, private router: Router) {} // Inyecta NgbModal en el constructor


  vueltaAlHome(): void {
    //this.estadoPestanaService.cambiarMostrarPestana(true);
    this.router.navigateByUrl('entrenamiento');
  }

  // Funciones

  // Función para formatear los enlaces en el mensaje de texto
  formatearEnlaces(mensaje: string): string {
    const regex = /(https?:\/\/[^\s]+)/g;
    // Reemplazar cada enlace encontrado con un enlace HTML
    return mensaje.replace(regex, '<a href="$1" target="_blank">$1</a>');
  }

  enviarMensaje() {
    if (this.nuevoMensaje.trim() !== '') { // Verificar que el mensaje no esté vacío
      // Agregar el mensaje al array de mensajes
      this.mensajes.push({ usuario: this.usuario.nombre, mensajeEnviado: this.nuevoMensaje });
      // Limpiar el campo de nuevo mensaje
      this.nuevoMensaje = '';
    }
  }

}
