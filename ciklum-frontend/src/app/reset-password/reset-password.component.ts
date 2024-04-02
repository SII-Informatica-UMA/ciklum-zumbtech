import { Component, Input } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  password: string = '';
  repeatedPassword: string = '';
  error: boolean = false;
  mensaje?: string;

  @Input()
  token: string = '';

  constructor(private usuarioService: UsuariosService) {}

  get usuario() {
    return this.usuarioService.getUsuarioSesion();
  }

  cambiarContrasenia() {
    if (!this.password) {
      this.mensaje = 'La contraseña no puede estar vacía';
      this.error = true;
      return;
    }
    if (this.password !== this.repeatedPassword) {
      this.mensaje = 'Las contraseñas no coinciden';
      this.error = true;
      return;
    }
    this.mensaje = '';
    this.error = false;

    console.log('Token:'+this.token)
    this.usuarioService.doCambiarContrasenia(this.password, this.token).then(() => {
      this.mensaje = 'Contraseña cambiada correctamente';
      this.error = false;
    }).catch((e) => {
      this.mensaje = 'Error al cambiar la contraseña: '+e;
      this.error = true;
    });
  }


}
