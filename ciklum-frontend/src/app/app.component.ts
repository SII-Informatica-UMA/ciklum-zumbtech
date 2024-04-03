import { Component } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { UsuariosService } from './services/usuarios.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, FormsModule, TitleCasePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  _rolIndex: number = 0

  constructor(private usuarioService: UsuariosService, private router: Router) {
    this.actualizarRol()
  }

  get rolIndex() {
    return this._rolIndex;
  }

  set rolIndex(i: number) {
    this._rolIndex = i;
    this.actualizarRol();
  }

  actualizarRol() {
    let u = this.usuarioSesion;
    if (u) {
      this.usuarioService.rolCentro = u.roles[this.rolIndex];
    } else {
      this.usuarioService.rolCentro = undefined;
    }
  }

  get rol() {
    return this.usuarioService.rolCentro;
  }

  get usuarioSesion() {
    return this.usuarioService.getUsuarioSesion();
  }

  logout() {
    this.usuarioService.doLogout();
    this.actualizarRol();
    this.router.navigateByUrl('/login');
  }
}
