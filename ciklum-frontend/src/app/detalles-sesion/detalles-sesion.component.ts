import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // Importa NgbModal
import { TablaInfoSesionComponent } from './tabla-info-sesion/tabla-info-sesion.component';
import { RouterOutlet, RouterLink, Router } from '@angular/router';


@Component({
  selector: 'app-detalles-sesion',
  templateUrl: './detalles-sesion.component.html',
  standalone: true,
  imports: [TablaInfoSesionComponent, RouterOutlet, RouterLink],
  styleUrls: ['./detalles-sesion.component.css']
})
export class DetallesSesionComponent {

  constructor(public modalService: NgbModal, private router: Router) {
  }

  vueltaASesiones(): void {
    this.router.navigateByUrl('sesiones');
  }
}



