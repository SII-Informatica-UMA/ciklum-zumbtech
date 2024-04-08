import { Injectable, numberAttribute } from "@angular/core";
import { Login, UsuarioSesion, Rol, RolCentro } from "../entities/login";
import { Observable, of, forkJoin, concatMap, lastValueFrom } from "rxjs";
import {map} from 'rxjs/operators';
import * as jose from 'jose';

import { Usuario } from "../entities/usuario";
import { BackendFakeService } from "./backend.fake.service";
import { BackendService } from "./backend.service";
import { LoginComponent } from "../login/login.component";
import { Plan, Rutina, Sesion, entrenadorCliente } from "../entities/sesion";

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  _rolCentro?: RolCentro;

  constructor(private backend: BackendService) {}

  doLogin(login: Login): Observable<UsuarioSesion> {
    let jwtObs = this.backend.login(login.email, login.password);
    let usuarioObs = jwtObs.pipe(concatMap(jwt=>this.backend.getUsuario(this.getUsuarioIdFromJwt(jwt))));
    let join = forkJoin({jwt: jwtObs, usuario: usuarioObs});
    let usuarioSesion = join.pipe(map(obj => {
      return {
        id: obj.usuario.id,
        nombre: obj.usuario.nombre,
        apellido1: obj.usuario.apellido1,
        apellido2: obj.usuario.apellido2,
        email: obj.usuario.email,
        roles: obj.usuario.administrador?[{rol: Rol.ADMINISTRADOR}]:[],
        jwt: obj.jwt
      };
    }));
    return usuarioSesion
    .pipe(concatMap(usuarioSesion=>this.completarConRoles(usuarioSesion)))
    .pipe(map(usuarioSesion=>{
      localStorage.setItem('usuario', JSON.stringify(usuarioSesion));
      if (usuarioSesion.roles.length > 0) {
        this.rolCentro = usuarioSesion.roles[0];
      } else {
        //this.rolCentro = {rol:Rol.CLIENTE, centro:0, nombreCentro:""};
        this.rolCentro = undefined;
      }
      return usuarioSesion;
    }));

  }

  private completarConRoles(usuarioSesion: UsuarioSesion): Observable<UsuarioSesion> {
    // TODO: acceder a lo sotros servicios (o simular) para completar con los roles necesarios
    return of(usuarioSesion);
  }

  private getUsuarioIdFromJwt(jwt: string): number {
    let payload = jose.decodeJwt(jwt);
    console.log("Payload: "+JSON.stringify(payload));
    let id = payload.sub;
    if (id == undefined) {
      return 0;
    } else {
      return parseInt(id);
    }
  }

  get rolCentro(): RolCentro | undefined {
    return this._rolCentro;
  }

  set rolCentro(r: RolCentro | undefined) {
    this._rolCentro = r;
  }

  getUsuarioSesion(): UsuarioSesion | undefined {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : undefined;
  }

  doLogout() {
    localStorage.removeItem('usuario');
  }

  doForgottenPassword(email: string): Observable<void> {
    return this.backend.forgottenPassword(email);
  }

  doCambiarContrasenia(password: string, token: string): Promise<void> {
    return lastValueFrom(this.backend.resetPassword(token, password),{defaultValue:undefined});
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.backend.getUsuarios();
  }

  editarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.backend.putUsuario(usuario);
  }

  eliminarUsuario(id: number): Observable<void> {
    return this.backend.deleteUsuario(id);
  }

  aniadirUsuario(usuario: Usuario): Observable<Usuario> {
    this.postEntrena(usuario.id, "Entrenador").subscribe(info => {
      console.log(info.idCliente + "   " + info.idEntrenador);
    });
    return this.backend.postUsuario(usuario);
  }

  getSesion(id: number): Observable<Sesion> {
    return this.backend.getSesion(id);
  }

  getSesiones(id: number): Observable<Sesion[]> {
    return this.backend.getSesiones(id);
  }

  putSesion(id: number, sesion: Sesion): Observable<Sesion> {
    return this.backend.putSesion(id, sesion);
  }

  deleteSesion(id: number): Observable<void> {
    return this.backend.deleteSesion(id);
  }

  postSesion(id: number, sesion: Sesion) {
    return this.backend.postSesion(id, sesion);
  }

  /*getPlanes() {
    return this.backend.getPlanes();
  }*/

  postEntrena(idClienteEntrenador: number, especialidad: string): Observable<entrenadorCliente> {
    return this.backend.postEntrena(idClienteEntrenador, especialidad);
  }

  getPlanes(idE: number | undefined): Observable<Plan[]> {
    return this.backend.getPlanes(idE);
  }

  postPlan(fInicio: Date, fFinal: Date, rRecurrencia: string, idE: number | undefined): Observable<Rutina> {
    return this.backend.postPlan(fInicio, fFinal, rRecurrencia, idE);
  }
}
