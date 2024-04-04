import { Component } from '@angular/core';
import { TablaInfoSesionComponent } from './tabla-info-sesion/tabla-info-sesion.component';
import { ContactoSesionComponent } from './contacto-sesion/contacto-sesion.component';
import { RouterOutlet, RouterLink, Router } from '@angular/router';


@Component({
  selector: 'app-detalles-sesion',
  templateUrl: './detalles-sesion.component.html',
  standalone: true,
  imports: [TablaInfoSesionComponent, ContactoSesionComponent, RouterOutlet, RouterLink],
  styleUrls: ['./detalles-sesion.component.css']
})
export class DetallesSesionComponent {

}



