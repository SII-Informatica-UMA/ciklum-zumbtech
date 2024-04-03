import { UsuarioSesion } from './../entities/login';
import { Component } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { Usuario, UsuarioImpl } from '../entities/usuario';
import { Rol } from '../entities/login';
import { FormularioUsuarioComponent } from '../formulario-usuario/formulario-usuario.component';

@Component({
  selector: 'app-listado-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listado-usuario.component.html',
  styleUrl: './listado-usuario.component.css'
})
export class ListadoUsuarioComponent {
  usuarios: Usuario [] = [];

  constructor(private usuariosService: UsuariosService, private modalService: NgbModal) {
    this.actualizarUsuarios();
   }

  private get rol() {
    return this.usuariosService.rolCentro;
  }

  isAdministrador(): boolean {
    console.log("Pregunta admin: "+this.rol);
    return this.rol?.rol == Rol.ADMINISTRADOR;
  }

  ngOnInit(): void {
    this.actualizarUsuarios();
  }

  actualizarUsuarios() {
    this.usuariosService.getUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
    });
  }

  aniadirUsuario(): void {
    let ref = this.modalService.open(FormularioUsuarioComponent);
    ref.componentInstance.accion = "Añadir";
    ref.componentInstance.usuario = new UsuarioImpl();
    ref.result.then((usuario: Usuario) => {
      this.usuariosService.aniadirUsuario(usuario).subscribe(usuario => {
        this.actualizarUsuarios();
      });
    }, (reason) => {});

  }
  private usuarioEditado(usuario: Usuario): void {
    this.usuariosService.editarUsuario(usuario).subscribe(() => {
      this.actualizarUsuarios();
    });
  }

  eliminarUsuario(id: number): void {
    this.usuariosService.eliminarUsuario(id).subscribe(() => {
      this.actualizarUsuarios();
    });
  }

  editarUsuario(usuario: Usuario): void {
    let ref = this.modalService.open(FormularioUsuarioComponent);
    ref.componentInstance.accion = "Editar";
    ref.componentInstance.usuario = {...usuario};
    ref.result.then((usuario: Usuario) => {
      this.usuarioEditado(usuario);
    }, (reason) => {});
  }
}
