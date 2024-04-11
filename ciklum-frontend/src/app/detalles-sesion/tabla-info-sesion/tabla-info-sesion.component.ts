import { Component } from '@angular/core';
import { Sesion } from '../../entities/sesion';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; 
import { PlanService } from '../../services/plan.service';

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
    // console.log(this.mensajes);
    this.rodrigoIvan = Math.floor(Math.random() * 3) + 1;
    // Cargar sesiones y mensajes almacenados en localStorage si existen
    const sesionGuardada = localStorage.getItem('sesion');
    if (sesionGuardada) {
      this.sesion = JSON.parse(sesionGuardada);
      // Separar los mensajes guardados en la descripción y agregarlos al array de mensajes
      if (this.sesion.descripcion) {
        const mensajesSeparados = this.sesion.descripcion.split('\n');
        console.log(mensajesSeparados);
        //console.log("AAAAAAAAAAAAAAAAAAAAAAAA");
        for (let i = 0; i < mensajesSeparados.length; ++i) {
          this.mensajes.push({ username: this.username, mensajeEnviado: mensajesSeparados[i] });
        }        
      }
    }

    for (let i = 0; i < this.sesion.multimedia.length; i++) {
      let id = this.obtenerIdVideoYoutube(this.sesion.multimedia[i]);
      this.link_video[i] = 'https://img.youtube.com/vi/' +id + '/0.jpg';
    }
  }

  /* Constructor */
  constructor(private planService: PlanService, public modalService: NgbModal) {}

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
      //console.log(JSON.stringify(this.sesion)); // antes de modificar
      this.sesion.descripcion = (this.sesion.descripcion ? this.sesion.descripcion + '\n' : '') + this.nuevoMensaje;
      // Agregar el nuevo mensaje al array de mensajes
      this.mensajes.push({ username: this.username, mensajeEnviado: this.nuevoMensaje });
      // Guardar la sesión en localStorage y actualiza todo
      this.planService.putSesion(this.sesion, this.sesion.id).subscribe(() => {
        this.sesion;
      });
      //this.planService.postSesion(this.sesion, this.sesion.idPlan);
      //localStorage.setItem('sesion', JSON.stringify(this.sesion));
      //console.log(JSON.stringify(this.sesion)); // despues de modificar
      // Limpiar el campo de nuevo mensaje
      this.nuevoMensaje = '';
    }
  }
  borrarMensaje(i: number, mensaje: string): void {
    // Verificar que el índice esté dentro del rango del array de mensajes
    /*for(let i = 0; i < this.mensajes.length; i++) {
      console.log(this.mensajes[i]);
    }*/
    if (i >= 0 && i < this.mensajes.length) {
      // Eliminar el mensaje en el índice i del array de mensajes
      this.mensajes.splice(i, 1);
      // Buscar el mensaje en la descripción de la sesión y eliminarlo
      const mensajesSeparados = this.sesion.descripcion.split('\n');
      const mensajeIndex = mensajesSeparados.indexOf(mensaje);
      if (mensajeIndex !== -1) {
        mensajesSeparados.splice(mensajeIndex, 1);
        // Actualizar la descripción en la sesión con los mensajes actualizados
        this.sesion.descripcion = mensajesSeparados.join('\n');
        // Guardar la sesión actualizada en el servicio PlanService
        this.planService.putSesion(this.sesion, this.sesion.id).subscribe(() => {
          this.sesion;
        });
      }
    }
  }
  
  
}
