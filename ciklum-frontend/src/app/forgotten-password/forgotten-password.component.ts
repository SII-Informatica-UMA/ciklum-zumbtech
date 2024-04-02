import { Component } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { RouterLink  } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgotten-password',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './forgotten-password.component.html',
  styleUrl: './forgotten-password.component.css'
})
export class ForgottenPasswordComponent {
  mensaje?: string;
  email: string = '';
  error: boolean = false;

  constructor(private usuarioService: UsuariosService) {
  }

  get usuario() {
    return this.usuarioService.getUsuarioSesion();
  }

  recordar() {
    if (!this.email) {
      this.mensaje = "Debe introducir un email";
      this.error = true;
      return;
    }
    this.usuarioService.doForgottenPassword(this.email).subscribe(()=>{});
    this.mensaje = "Si la cuenta existe recibirá en su correo un  mensaje con instrucciones para recuperar la contraseña."
    this.error = false;
  }

}
