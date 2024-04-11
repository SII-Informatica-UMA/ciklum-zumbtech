import { Component } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Sesion } from '../../entities/sesion';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; 

@Component({
  selector: 'app-tabla-info-sesion',
  templateUrl: './tabla-info-sesion.component.html',
  styleUrls: ['./tabla-info-sesion.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class TablaInfoSesionComponent {
  rodrigoIvan: number = 1;
  /* Variables */
  sesion: Sesion = {
    idPlan: 0,
    inicio: new Date(),
    fin: new Date(),
    trabajoRealizado: "",
    multimedia: [],
    descripcion: "",
    presencial: false,
    datosSalud: [],
    id: 0
  };
  link_video: string[] = []; 
  username: string = JSON.parse(localStorage.getItem('usuario') || "")?.nombre; // Nombre de usuario
  mensajes: { username: string, mensajeEnviado: string }[] = []; // Array para almacenar los mensajes enviados
  nuevoMensaje: string = ''; // Variable para almacenar el nuevo mensaje a enviar

  ngOnInit(): void {
    this.rodrigoIvan = Math.floor(Math.random() * 3) + 1;
    // Cargar sesiones y mensajes almacenados en localStorage si existen
    const sesionGuardada = localStorage.getItem('sesion');
    if (sesionGuardada) {
      this.sesion = JSON.parse(sesionGuardada);
    }

    // Cargar el array de mensajes desde la primera descripción en localStorage
    const primerDescripcion = this.sesion.descripcion.split('\n')[0];
    if (primerDescripcion) {
      const primerMensajeSeparado = primerDescripcion.split(':');
      this.mensajes.push({ username: primerMensajeSeparado[0], mensajeEnviado: primerMensajeSeparado[1] });
    }

    // Cargar mensajes adicionales desde las descripciones en localStorage
    const descripcionesRestantes = this.sesion.descripcion.split('\n').slice(1);
    for (const descripcion of descripcionesRestantes) {
      const mensajeSeparado = descripcion.split(':');
      this.mensajes.push({ username: mensajeSeparado[0], mensajeEnviado: mensajeSeparado[1] });
    }

    for (let i = 0; i < this.sesion.multimedia.length; i++) {
      let id = this.obtenerIdVideoYoutube(this.sesion.multimedia[i]);
      this.link_video[i] = 'https://img.youtube.com/vi/' +id + '/0.jpg';
    }
  }

  /* Constructor */
  constructor(private userService: UsuariosService, public modalService: NgbModal) {}

  /* Funciones */
  private obtenerIdVideoYoutube(url: string): string | null {
    // Expresión regular para buscar el ID del video en la URL de YouTube
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/|youtube\.com\/reels\/)([a-zA-Z0-9_-]{11})/;
    
    // Realizar la búsqueda del ID del video en la URL
    const match = url.match(regex);

    // Si se encuentra el ID del video, devolverlo
    if (match && match[1]) {
        return match[1];
    } else {
        // Si no se encuentra el ID del video, devolver null
        return null;
    }
}
  // Función para formatear los enlaces en el mensaje de texto
  formatearEnlaces(mensaje: string): string {
    const regex = /(https?:\/\/[^\s]+)/g;
    // Reemplazar cada enlace encontrado con un enlace HTML
    return mensaje.replace(regex, '<a href="$1" target="_blank">$1</a>');
  }

  enviarMensaje() {
    if (this.nuevoMensaje.trim() !== '') { // Verificar que el mensaje no esté vacío
      // Agregar el nuevo mensaje a la descripción de la sesión
      this.sesion.descripcion = (this.sesion.descripcion ? this.sesion.descripcion + '\n' : '') + `${this.nuevoMensaje}`;
      // Actualizar el array de mensajes
      const mensajeSeparado = this.nuevoMensaje.split(':');
      this.mensajes.push({ username: this.username, mensajeEnviado: mensajeSeparado[1] });
      console.log(this.mensajes);
      // Guardar la sesión en localStorage
      localStorage.setItem('sesion', JSON.stringify(this.sesion));
      // Limpiar el campo de nuevo mensaje
      this.nuevoMensaje = '';
    }
  }
  
}
