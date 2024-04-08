import { Component } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Sesion } from '../../entities/sesion';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabla-info-sesion',
  templateUrl: './tabla-info-sesion.component.html',
  standalone: true,
  styleUrls: ['./tabla-info-sesion.component.css'],
  imports: [CommonModule]
})
export class TablaInfoSesionComponent {
  /* Variables */
  sesion: Sesion = {
    idPlan: 0,
    inicio: new Date(),
    fin: new Date(),
    trabajoRealizado: "",
    multimedia: [],
    decripcion: "",
    presencial: false,
    datosSalud: [],
    id: 0
  };
  link_video: string[] = [];

  ngOnInit(): void {
    // Aquí podrías cargar las sesiones desde algún servicio o una API
    const sesiones = localStorage.getItem('sesion');
    this.sesion = sesiones ? JSON.parse(sesiones) : undefined;
    for (let i = 0; i < this.sesion.multimedia.length; i++) {
      let id = this.obtenerIdVideoYoutube(this.sesion.multimedia[i]);
      this.link_video[i] = 'https://img.youtube.com/vi/' +id + '/0.jpg';
    }
  }

  /* Constructor */
  constructor(private userService: UsuariosService) {}

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
}
